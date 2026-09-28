"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Sparkles, X } from "lucide-react";
import { MAJOR_TECH, type MajorTech, type Project } from "@/data/project-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { generateDraftAction, saveProjectAction } from "@/app/admin/actions";
import { knownTechNames } from "@/lib/tech-map";
import { cn } from "@/lib/utils";

const textareaClass =
  "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [github, setGithub] = useState(project?.github ?? "");
  const [demo, setDemo] = useState(project?.demo ?? "");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [tech, setTech] = useState<string[]>(project?.tech ?? []);
  const [techInput, setTechInput] = useState("");
  const [majorTech, setMajorTech] = useState<MajorTech[]>(project?.majorTech ?? []);
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [draft, setDraft] = useState(project?.draft ?? !project);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generating, startGenerate] = useTransition();
  const [saving, startSave] = useTransition();

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function addTech(raw: string) {
    const names = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      // Snap to the canonical spelling so badge colours/icons match.
      .map((t) => knownTechNames.find((k) => k.toLowerCase() === t.toLowerCase()) ?? t);
    setTech((prev) => [...prev, ...names.filter((n) => !prev.includes(n))]);
    setTechInput("");
  }

  function generate() {
    setError(null);
    const hasContent = title || description || tech.length;
    if (hasContent && !confirm("Replace the current title, description and tech with an AI draft?")) return;
    startGenerate(async () => {
      const result = await generateDraftAction({ github, demo, notes });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const d = result.data;
      setTitle(d.title);
      setDescription(d.description);
      setTech(d.tech);
      setMajorTech(d.majorTech);
      if (!demo && d.demo) setDemo(d.demo);
    });
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const pendingTech = techInput.trim() ? [...tech, techInput.trim()] : tech;
    const form = new FormData(event.currentTarget);
    form.set("tech", JSON.stringify(pendingTech));
    startSave(async () => {
      const result = await saveProjectAction(form);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin");
      router.refresh();
    });
  }

  const currentImage = removeImage ? undefined : imagePreview ?? project?.image;
  const preview: Project = {
    id: project?.id ?? "preview",
    title: title || "Project title",
    description: description || "The description appears here.",
    tech,
    majorTech,
    github: github || undefined,
    demo: demo || undefined,
    image: currentImage,
    featured,
  };
  const busy = generating || saving;

  return (
    <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)]">
      <div className="space-y-6">
        {project && <input type="hidden" name="id" value={project.id} />}

        <section
          className="space-y-4 rounded-lg border p-4"
          style={{ borderColor: "var(--brand-accent-border)" }}
        >
          <Field label="GitHub repository">
            <Input
              name="github"
              type="url"
              placeholder="https://github.com/you/repo"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Field>
          <Field label="Live URL" hint="Optional. If blank, the repo's homepage is suggested.">
            <Input
              name="demo"
              type="url"
              placeholder="https://…"
              value={demo}
              onChange={(e) => setDemo(e.target.value)}
            />
          </Field>
          <Field label="Notes for the AI" hint="Optional: context the repo doesn't show, e.g. who used it or what you're proudest of.">
            <textarea
              rows={2}
              className={textareaClass}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Field>
          <Button type="button" variant="outline" onClick={generate} disabled={!github || busy} className="gap-2">
            <Sparkles className="w-4 h-4" />
            {generating ? "Reading the repo…" : "Generate with AI"}
          </Button>
        </section>

        <Field label="Title">
          <Input name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>

        <Field label="Description">
          <textarea
            name="description"
            required
            rows={6}
            className={textareaClass}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Field label="Tech" hint="Press Enter or comma to add. Known names get brand colours.">
          <div className="flex flex-wrap gap-1.5 rounded-md border border-input p-2">
            {tech.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                {t}
                <button
                  type="button"
                  aria-label={`Remove ${t}`}
                  onClick={() => setTech(tech.filter((x) => x !== t))}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              list="known-tech"
              className="flex-1 min-w-32 bg-transparent text-sm outline-none"
              value={techInput}
              onChange={(e) => {
                const v = e.target.value;
                if (v.endsWith(",")) addTech(v);
                else setTechInput(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech(techInput);
                } else if (e.key === "Backspace" && !techInput && tech.length) {
                  setTech(tech.slice(0, -1));
                }
              }}
            />
            <datalist id="known-tech">
              {knownTechNames.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </div>
        </Field>

        <fieldset className="space-y-1.5">
          <legend className="text-sm font-medium mb-1.5">Categories</legend>
          <div className="flex flex-wrap gap-2">
            {MAJOR_TECH.map((m) => {
              const checked = majorTech.includes(m);
              return (
                <label
                  key={m}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors",
                    checked && "border-transparent"
                  )}
                  style={checked ? { background: "var(--brand-accent-dim)", color: "var(--brand-accent)" } : undefined}
                >
                  <input
                    type="checkbox"
                    name="majorTech"
                    value={m}
                    checked={checked}
                    onChange={() =>
                      setMajorTech(checked ? majorTech.filter((x) => x !== m) : [...majorTech, m])
                    }
                    className="sr-only"
                  />
                  {m}
                </label>
              );
            })}
          </div>
        </fieldset>

        <Field label="Image" hint="PNG, JPEG, WebP or GIF, up to 4 MB. Shown when hovering the card.">
          <input
            type="file"
            name="image"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => {
              setImageFile(e.target.files?.[0] ?? null);
              setRemoveImage(false);
            }}
            className="block text-sm"
          />
        </Field>
        {project?.image && !imageFile && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="removeImage"
              checked={removeImage}
              onChange={(e) => setRemoveImage(e.target.checked)}
            />
            Remove current image ({project.image})
          </label>
        )}

        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured (pinned first)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="draft" checked={draft} onChange={(e) => setDraft(e.target.checked)} />
            Draft (hidden from the site)
          </label>
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={busy}>
            {saving ? "Saving…" : project ? "Save changes" : "Create project"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin">Cancel</Link>
          </Button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 self-start space-y-2">
        <p className="text-xs uppercase tracking-wider text-slate-500">Preview</p>
        <ProjectCard project={preview} index={0} />
        {draft && <p className="text-xs text-slate-500">Draft: this won&apos;t appear on the site.</p>}
      </aside>
    </form>
  );
}
