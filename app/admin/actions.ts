"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod/v4";
import { MAJOR_TECH, type Project } from "@/data/projects";
import { requireAdmin } from "@/lib/admin/auth";
import { generateProjectDraft, type ProjectDraft } from "@/lib/admin/generate";
import { PROJECT_IMAGE_DIR, readProjects, updateProjects, type ExtraChange } from "@/lib/admin/project-store";
import { fetchRepoContext, parseGithubUrl } from "@/lib/admin/repo-context";

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };

function failure(err: unknown): { ok: false; error: string } {
  console.error(err);
  return { ok: false, error: err instanceof Error ? err.message : "Something went wrong" };
}

// ---------------------------------------------------------------------------
// AI draft

export async function generateDraftAction(input: {
  github: string;
  demo?: string;
  notes?: string;
}): Promise<ActionResult<ProjectDraft & { demo?: string }>> {
  try {
    await requireAdmin();
    const ref = parseGithubUrl(input.github);
    if (!ref) return { ok: false, error: "That doesn't look like a GitHub repository URL." };

    const [context, existing] = await Promise.all([fetchRepoContext(ref), readProjects()]);
    const draft = await generateProjectDraft(context, {
      demoUrl: input.demo?.trim() || undefined,
      notes: input.notes?.trim() || undefined,
      examples: existing,
    });
    // Suggest the repo's homepage as the demo link if none was given.
    return { ok: true, data: { ...draft, demo: input.demo?.trim() || context.homepage || undefined } };
  } catch (err) {
    return failure(err);
  }
}

// ---------------------------------------------------------------------------
// Create / update

const optionalUrl = z
  .string()
  .trim()
  .transform((v) => v || undefined)
  .pipe(z.url({ protocol: /^https?$/ }).optional());

const ProjectInput = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  tech: z.array(z.string().trim().min(1)),
  majorTech: z.array(z.enum(MAJOR_TECH)).min(1, "Pick at least one category"),
  github: optionalUrl,
  demo: optionalUrl,
  featured: z.boolean(),
  draft: z.boolean(),
});

const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .split(/\s[—–-]\s/)[0]
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "project";
}

function uniqueId(base: string, taken: Set<string>): string {
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  return id;
}

/** Only images the admin manages live under /projects/; older hand-added ones are left alone. */
function managedImagePath(image?: string): string | null {
  return image?.startsWith("/projects/") ? `public${image}` : null;
}

export async function saveProjectAction(formData: FormData): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const parsed = ProjectInput.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      tech: JSON.parse(String(formData.get("tech") ?? "[]")),
      majorTech: formData.getAll("majorTech"),
      github: formData.get("github") ?? "",
      demo: formData.get("demo") ?? "",
      featured: formData.get("featured") === "on",
      draft: formData.get("draft") === "on",
    });
    if (!parsed.success) {
      return { ok: false, error: parsed.error.issues.map((i) => i.message).join("; ") };
    }
    const input = parsed.data;
    const originalId = String(formData.get("id") ?? "") || null;
    const removeImage = formData.get("removeImage") === "on";
    const file = formData.get("image");
    const upload = file instanceof File && file.size > 0 ? file : null;

    if (upload) {
      if (!IMAGE_TYPES[upload.type]) return { ok: false, error: "Image must be PNG, JPEG, WebP or GIF." };
      if (upload.size > MAX_IMAGE_BYTES) return { ok: false, error: "Image must be 4 MB or smaller." };
    }

    const current = await readProjects();
    const existing = originalId ? current.find((p) => p.id === originalId) : undefined;
    if (originalId && !existing) return { ok: false, error: "That project no longer exists." };

    const id = existing?.id ?? uniqueId(slugify(input.title), new Set(current.map((p) => p.id)));

    const extra: ExtraChange[] = [];
    let image = existing?.image;
    const oldManaged = managedImagePath(existing?.image);
    if (upload) {
      // Unique filename so browsers and next/image don't serve the old picture.
      const filename = `${id}-${Date.now().toString(36)}.${IMAGE_TYPES[upload.type]}`;
      image = `/projects/${filename}`;
      extra.push({
        path: `${PROJECT_IMAGE_DIR}/${filename}`,
        base64: Buffer.from(await upload.arrayBuffer()).toString("base64"),
      });
      if (oldManaged) extra.push({ path: oldManaged, delete: true });
    } else if (removeImage) {
      image = undefined;
      if (oldManaged) extra.push({ path: oldManaged, delete: true });
    }

    const project: Project = {
      id,
      title: input.title,
      description: input.description,
      tech: input.tech,
      majorTech: input.majorTech,
      ...(input.github && { github: input.github }),
      ...(input.demo && { demo: input.demo }),
      ...(image && { image }),
      featured: input.featured,
      draft: input.draft,
    };

    await updateProjects(
      `content(projects): ${existing ? "update" : "add"} ${project.title}`,
      (projects) => {
        const index = projects.findIndex((p) => p.id === id);
        if (index === -1) return [project, ...projects]; // new projects go to the top
        const next = [...projects];
        next[index] = project;
        return next;
      },
      extra
    );

    revalidatePath("/admin");
    return { ok: true, data: { id } };
  } catch (err) {
    return failure(err);
  }
}

// ---------------------------------------------------------------------------
// List operations

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const current = await readProjects();
    const target = current.find((p) => p.id === id);
    if (!target) return { ok: false, error: "That project no longer exists." };

    const imagePath = managedImagePath(target.image);
    await updateProjects(
      `content(projects): delete ${target.title}`,
      (projects) => projects.filter((p) => p.id !== id),
      imagePath ? [{ path: imagePath, delete: true }] : []
    );
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    return failure(err);
  }
}

export async function reorderProjectsAction(ids: string[]): Promise<ActionResult> {
  try {
    await requireAdmin();
    await updateProjects("content(projects): reorder", (projects) => {
      const byId = new Map(projects.map((p) => [p.id, p]));
      const ordered = ids.flatMap((id) => byId.get(id) ?? []);
      // Anything added since the page loaded keeps its place at the end.
      const rest = projects.filter((p) => !ids.includes(p.id));
      return [...ordered, ...rest];
    });
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    return failure(err);
  }
}

export async function setProjectFlagAction(
  id: string,
  flag: "featured" | "draft",
  value: boolean
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const verb =
      flag === "draft" ? (value ? "unpublish" : "publish") : value ? "feature" : "unfeature";
    await updateProjects(`content(projects): ${verb} ${id}`, (projects) =>
      projects.map((p) => (p.id === id ? { ...p, [flag]: value } : p))
    );
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    return failure(err);
  }
}
