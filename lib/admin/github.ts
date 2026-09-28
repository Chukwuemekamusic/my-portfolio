import "server-only";

// Thin GitHub REST client. Uses GITHUB_TOKEN when present (needed for writes,
// private repos, and a higher rate limit on reads).

export class GitHubError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function githubFetch(
  path: string,
  init: RequestInit & { accept?: string } = {}
): Promise<Response> {
  const { accept, headers, ...rest } = init;
  const token = process.env.GITHUB_TOKEN;
  return fetch(`https://api.github.com${path}`, {
    ...rest,
    headers: {
      Accept: accept ?? "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: "no-store",
  });
}

async function githubJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await githubFetch(path, init);
  if (!res.ok) {
    const body = await res.text();
    throw new GitHubError(`GitHub ${init?.method ?? "GET"} ${path} failed (${res.status}): ${body}`, res.status);
  }
  return res.json() as Promise<T>;
}

export type FileChange =
  | { path: string; content: string; encoding?: "utf-8" }
  | { path: string; content: string; encoding: "base64" }
  | { path: string; delete: true };

export class ContentRepo {
  constructor(private repo: string, private branch: string) {}

  async headSha(): Promise<string> {
    const ref = await githubJson<{ object: { sha: string } }>(
      `/repos/${this.repo}/git/ref/heads/${this.branch}`
    );
    return ref.object.sha;
  }

  async readText(path: string, ref: string): Promise<string> {
    const res = await githubFetch(
      `/repos/${this.repo}/contents/${path}?ref=${ref}`,
      { accept: "application/vnd.github.raw+json" }
    );
    if (!res.ok) {
      throw new GitHubError(`Could not read ${path} (${res.status})`, res.status);
    }
    return res.text();
  }

  /**
   * One atomic commit on top of `parentSha`. The ref update is not forced, so
   * if someone else pushed in between, this fails instead of clobbering them.
   */
  async commit(parentSha: string, message: string, changes: FileChange[]): Promise<string> {
    const parent = await githubJson<{ tree: { sha: string } }>(
      `/repos/${this.repo}/git/commits/${parentSha}`
    );

    const tree = await Promise.all(
      changes.map(async (change) => {
        if ("delete" in change) {
          return { path: change.path, mode: "100644", type: "blob", sha: null };
        }
        if (change.encoding === "base64") {
          const blob = await githubJson<{ sha: string }>(`/repos/${this.repo}/git/blobs`, {
            method: "POST",
            body: JSON.stringify({ content: change.content, encoding: "base64" }),
          });
          return { path: change.path, mode: "100644", type: "blob", sha: blob.sha };
        }
        return { path: change.path, mode: "100644", type: "blob", content: change.content };
      })
    );

    const newTree = await githubJson<{ sha: string }>(`/repos/${this.repo}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
    });

    const commit = await githubJson<{ sha: string }>(`/repos/${this.repo}/git/commits`, {
      method: "POST",
      body: JSON.stringify({ message, tree: newTree.sha, parents: [parentSha] }),
    });

    const res = await githubFetch(`/repos/${this.repo}/git/refs/heads/${this.branch}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha, force: false }),
    });
    if (res.status === 422) {
      throw new GitHubError(
        "The branch moved while saving (someone else pushed). Reload and try again.",
        409
      );
    }
    if (!res.ok) {
      throw new GitHubError(`Updating ${this.branch} failed (${res.status}): ${await res.text()}`, res.status);
    }
    return commit.sha;
  }
}
