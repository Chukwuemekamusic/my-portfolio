import { ProjectForm } from "@/components/admin/project-form";
import { requireAdminPage } from "@/lib/admin/auth";

export default async function NewProjectPage() {
  await requireAdminPage();
  return (
    <>
      <h1 className="font-display text-4xl mb-6">New project</h1>
      <ProjectForm />
    </>
  );
}
