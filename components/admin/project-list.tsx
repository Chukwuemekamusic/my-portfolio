"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Pencil, Star, Trash2, Eye, EyeOff } from "lucide-react";
import type { Project } from "@/data/project-types";
import { Button } from "@/components/ui/button";
import {
  deleteProjectAction,
  reorderProjectsAction,
  setProjectFlagAction,
  type ActionResult,
} from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [orderDirty, setOrderDirty] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<ActionResult>, success: string, rollback?: () => void) {
    setMessage(null);
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        setMessage({ kind: "ok", text: success });
        router.refresh();
      } else {
        rollback?.();
        setMessage({ kind: "error", text: result.error });
      }
    });
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    setOrderDirty(true);
  }

  function saveOrder() {
    run(() => reorderProjectsAction(projects.map((p) => p.id)), "Order saved.");
    setOrderDirty(false);
  }

  function toggle(project: Project, flag: "featured" | "draft") {
    const value = !project[flag];
    const previous = projects;
    setProjects(projects.map((p) => (p.id === project.id ? { ...p, [flag]: value } : p)));
    run(
      () => setProjectFlagAction(project.id, flag, value),
      flag === "draft" ? (value ? "Moved to drafts." : "Published.") : value ? "Featured." : "No longer featured.",
      () => setProjects(previous)
    );
  }

  function remove(project: Project) {
    if (!confirm(`Delete "${project.title}"? This can be undone only by reverting the commit.`)) return;
    const previous = projects;
    setProjects(projects.filter((p) => p.id !== project.id));
    run(() => deleteProjectAction(project.id), "Deleted.", () => setProjects(previous));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 min-h-9 text-sm">
        <p
          className={cn(
            message?.kind === "error" ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400"
          )}
          role="status"
        >
          {pending
            ? "Saving…"
            : message
              ? message.text
              : "Featured projects are pinned first on the site. Drafts are hidden."}
        </p>
        {orderDirty && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setProjects(initialProjects);
                setOrderDirty(false);
              }}
            >
              Reset
            </Button>
            <Button size="sm" onClick={saveOrder} disabled={pending}>
              Save order
            </Button>
          </div>
        )}
      </div>

      <ol className="space-y-2">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3 bg-white/50 dark:bg-slate-800/50",
              project.draft && "opacity-60"
            )}
          >
            <div className="flex flex-col">
              <button
                type="button"
                aria-label="Move up"
                onClick={() => move(index, -1)}
                disabled={index === 0 || pending}
                className="p-0.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-30"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Move down"
                onClick={() => move(index, 1)}
                disabled={index === projects.length - 1 || pending}
                className="p-0.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-30"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold truncate">{project.title}</span>
                {project.draft && (
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                    Draft
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 truncate">{project.tech.join(" · ")}</p>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <IconButton
                label={project.featured ? "Unfeature" : "Feature"}
                onClick={() => toggle(project, "featured")}
                disabled={pending || orderDirty}
                active={project.featured}
              >
                <Star className="w-4 h-4" fill={project.featured ? "currentColor" : "none"} />
              </IconButton>
              <IconButton
                label={project.draft ? "Publish" : "Move to drafts"}
                onClick={() => toggle(project, "draft")}
                disabled={pending || orderDirty}
              >
                {project.draft ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </IconButton>
              <Link
                href={`/admin/${project.id}/edit`}
                aria-label="Edit"
                title="Edit"
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <IconButton
                label="Delete"
                onClick={() => remove(project)}
                disabled={pending || orderDirty}
                className="hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </IconButton>
            </div>
          </li>
        ))}
      </ol>
      {projects.length === 0 && (
        <p className="text-center text-sm text-slate-500 py-12">No projects yet.</p>
      )}
    </div>
  );
}

function IconButton({
  label,
  active,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "p-2 rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 disabled:opacity-40",
        className
      )}
      style={active ? { color: "var(--brand-accent)" } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
