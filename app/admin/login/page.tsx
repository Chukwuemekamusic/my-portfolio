import { redirect } from "next/navigation";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdminSession } from "@/lib/admin/auth";
import { isDevLoginEnabled } from "@/lib/admin/session";

const ERRORS: Record<string, string> = {
  state: "The sign-in request expired or was tampered with. Try again.",
  token: "GitHub didn't return an access token. Check the OAuth app settings.",
  user: "Couldn't load your GitHub profile.",
  forbidden: "That GitHub account isn't allowed to use the admin.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getAdminSession()) redirect("/admin");
  const { error } = await searchParams;
  const devLogin = isDevLoginEnabled();

  return (
    <div className="max-w-sm mx-auto py-16 text-center">
      <h1 className="font-display text-4xl mb-3">Admin</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
        {devLogin
          ? "Local development: no GitHub OAuth app configured."
          : "Sign in with the GitHub account allowed to manage this site."}
      </p>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-6">
          {ERRORS[error] ?? "Sign-in failed."}
        </p>
      )}
      <Button asChild>
        {/* A plain anchor: this is a full-page redirect to GitHub. */}
        <a href="/api/admin/auth/login" className="gap-2">
          <Github className="w-4 h-4" />
          {devLogin ? "Continue as local admin" : "Sign in with GitHub"}
        </a>
      </Button>
    </div>
  );
}
