import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectList } from "@/components/admin/project-list";
import { requireAdminPage } from "@/lib/admin/auth";
import { readProjects } from "@/lib/admin/project-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminPage();
  const projects = await readProjects();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-4xl">Projects</h1>
        <Button asChild>
          <Link href="/admin/new" className="gap-2">
            <Plus className="w-4 h-4" />
            New project
          </Link>
        </Button>
      </div>
      <ProjectList initialProjects={projects} />
    </>
  );
}
