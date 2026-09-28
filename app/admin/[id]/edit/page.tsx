import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdminPage } from "@/lib/admin/auth";
import { readProjects } from "@/lib/admin/project-store";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  const project = (await readProjects()).find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <h1 className="font-display text-4xl mb-6">Edit project</h1>
      <ProjectForm project={project} />
    </>
  );
}
