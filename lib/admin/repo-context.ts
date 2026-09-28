import "server-only";
import { githubFetch } from "./github";

// Collects what Claude needs to describe a repo: metadata, language mix,
// README, and dependency manifests (the most reliable signal for the tech list).

const MANIFESTS = [
  "package.json",
  "requirements.txt",
  "pyproject.toml",
  "Pipfile",
  "go.mod",
  "Cargo.toml",
  "foundry.toml",
  "hardhat.config.ts",
  "hardhat.config.js",
  "docker-compose.yml",
  "docker-compose.yaml",
  "compose.yml",
  "Dockerfile",
  "composer.json",
  "Gemfile",
  "pubspec.yaml",
];

const README_LIMIT = 40_000;
const MANIFEST_LIMIT = 8_000;

export type RepoRef = { owner: string; repo: string };

export function parseGithubUrl(url: string): RepoRef | null {
  const match = url
    .trim()
    .match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:[/?#].*)?$/i);
  return match ? { owner: match[1], repo: match[2] } : null;
}

function clip(text: string, limit: number): string {
  return text.length > limit
    ? `${text.slice(0, limit)}\n[... truncated, ${text.length - limit} more characters]`
    : text;
}

async function getText(path: string): Promise<string | null> {
  const res = await githubFetch(path, { accept: "application/vnd.github.raw+json" });
  return res.ok ? res.text() : null;
}

async function getJson<T>(path: string): Promise<T | null> {
  const res = await githubFetch(path);
  return res.ok ? ((await res.json()) as T) : null;
}

export type RepoContext = {
  ref: RepoRef;
  htmlUrl: string;
  homepage: string | null;
  text: string;
};

export async function fetchRepoContext(ref: RepoRef): Promise<RepoContext> {
  const base = `/repos/${ref.owner}/${ref.repo}`;
  const meta = await getJson<{
    full_name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    topics?: string[];
    language: string | null;
    created_at: string;
    pushed_at: string;
    default_branch: string;
  }>(base);
  if (!meta) {
    throw new Error(
      `Couldn't read ${ref.owner}/${ref.repo} from GitHub. Check the URL, or give GITHUB_TOKEN read access if it's private.`
    );
  }

  const [languages, readme, rootListing, workflows] = await Promise.all([
    getJson<Record<string, number>>(`${base}/languages`),
    getText(`${base}/readme`),
    getJson<{ name: string; type: string }[]>(`${base}/contents`),
    getJson<{ name: string }[]>(`${base}/contents/.github/workflows`),
  ]);

  const rootNames = new Set((rootListing ?? []).map((e) => e.name));
  const manifests = await Promise.all(
    MANIFESTS.filter((name) => rootNames.has(name)).map(async (name) => {
      const content = await getText(`${base}/contents/${name}`);
      return content ? `--- ${name} ---\n${clip(content, MANIFEST_LIMIT)}` : null;
    })
  );

  const totalBytes = Object.values(languages ?? {}).reduce((a, b) => a + b, 0);
  const languageMix = Object.entries(languages ?? {})
    .map(([lang, bytes]) => `${lang} ${((bytes / totalBytes) * 100).toFixed(1)}%`)
    .join(", ");

  const sections = [
    `Repository: ${meta.full_name}`,
    `Description: ${meta.description ?? "(none)"}`,
    `Homepage: ${meta.homepage || "(none)"}`,
    `Topics: ${meta.topics?.join(", ") || "(none)"}`,
    `Languages: ${languageMix || meta.language || "(unknown)"}`,
    `Created: ${meta.created_at.slice(0, 10)}, last push: ${meta.pushed_at.slice(0, 10)}`,
    `Top-level files: ${[...rootNames].join(", ") || "(unavailable)"}`,
    workflows?.length ? `CI workflows: ${workflows.map((w) => w.name).join(", ")}` : null,
    `\n=== README ===\n${readme ? clip(readme, README_LIMIT) : "(no README)"}`,
    ...manifests.filter(Boolean).map((m) => `\n=== Manifest ===\n${m}`),
  ];

  return {
    ref,
    htmlUrl: meta.html_url,
    homepage: meta.homepage || null,
    text: sections.filter(Boolean).join("\n"),
  };
}
