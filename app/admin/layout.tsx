import type { Metadata } from "next";
import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import { storeMode } from "@/lib/admin/project-store";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// AI generation and GitHub commits can take a while.
export const maxDuration = 60;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  const mode = storeMode();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-10">
      <div className="max-w-4xl mx-auto">
        {session && (
          <div
            className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 text-sm"
            style={{ borderBottom: "1px solid var(--brand-accent-border)" }}
          >
            <div className="flex items-center gap-4">
              <Link href="/admin" className="font-bold" style={{ color: "var(--brand-accent)" }}>
                Admin
              </Link>
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: "var(--brand-accent-dim)" }}
                title={
                  mode === "github"
                    ? "Saves commit to GitHub; Vercel redeploys in about a minute"
                    : "Saves write to the local working tree"
                }
              >
                {mode === "github" ? "saving to GitHub" : "saving locally"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <span>@{session.login}</span>
              <form action="/api/admin/auth/logout" method="post">
                <button type="submit" className="hover:underline">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
