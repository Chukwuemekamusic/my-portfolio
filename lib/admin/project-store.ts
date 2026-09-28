import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Project } from "@/data/projects";
import { ContentRepo, type FileChange } from "./github";

// Where admin edits are persisted:
// - "github": commit to GITHUB_REPO@GITHUB_BRANCH; Vercel redeploys on push.
// - "local":  write straight to the working tree (npm run dev only).
// Defaults to github when a token is configured, otherwise local.

export const PROJECTS_PATH = "data/projects.json";
export const PROJECT_IMAGE_DIR = "public/projects";

type StoreMode = "github" | "local";

export function storeMode(): StoreMode {
  const explicit = process.env.PROJECTS_STORE;
  if (explicit === "github" || explicit === "local") return explicit;
  return process.env.GITHUB_TOKEN ? "github" : "local";
}

function contentRepo(): ContentRepo {
  const repo = process.env.GITHUB_REPO;
  if (!repo || !process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_REPO and GITHUB_TOKEN must be set to save projects");
  }
  return new ContentRepo(repo, process.env.GITHUB_BRANCH ?? "master");
}

function assertLocalAllowed() {
  if (process.env.NODE_ENV === "production") {
    // The deployed filesystem is read-only and ephemeral; writes would vanish.
    throw new Error("Local project store is only available in development. Configure GITHUB_TOKEN/GITHUB_REPO.");
  }
}

function serialize(projects: Project[]): string {
  return JSON.stringify(projects, null, 2) + "\n";
}

/** Latest saved projects (ahead of the deployed bundle in github mode). */
export async function readProjects(): Promise<Project[]> {
  if (storeMode() === "local") {
    const raw = await fs.readFile(path.join(process.cwd(), PROJECTS_PATH), "utf-8");
    return JSON.parse(raw) as Project[];
  }
  const repo = contentRepo();
  return JSON.parse(await repo.readText(PROJECTS_PATH, await repo.headSha())) as Project[];
}

export type ExtraChange =
  | { path: string; base64: string }
  | { path: string; delete: true };

/**
 * Read-modify-write the project list (plus optional image files) as one
 * change: a single commit in github mode.
 */
export async function updateProjects(
  message: string,
  mutate: (projects: Project[]) => Project[],
  extra: ExtraChange[] = []
): Promise<void> {
  if (storeMode() === "local") {
    assertLocalAllowed();
    const file = path.join(process.cwd(), PROJECTS_PATH);
    const current = JSON.parse(await fs.readFile(file, "utf-8")) as Project[];
    for (const change of extra) {
      const target = path.join(process.cwd(), change.path);
      if ("delete" in change) {
        await fs.rm(target, { force: true });
      } else {
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, Buffer.from(change.base64, "base64"));
      }
    }
    await fs.writeFile(file, serialize(mutate(current)));
    return;
  }

  const repo = contentRepo();
  const head = await repo.headSha();
  const current = JSON.parse(await repo.readText(PROJECTS_PATH, head)) as Project[];
  const changes: FileChange[] = [
    { path: PROJECTS_PATH, content: serialize(mutate(current)) },
    ...extra.map((c): FileChange =>
      "delete" in c
        ? { path: c.path, delete: true }
        : { path: c.path, content: c.base64, encoding: "base64" }
    ),
  ];
  await repo.commit(head, message, changes);
}
