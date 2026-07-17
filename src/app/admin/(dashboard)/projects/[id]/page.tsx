import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/fields";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { updateProjectAction } from "@/lib/actions/projects";
import { getProjectById } from "@/lib/repo/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Project" />
      <ProjectForm
        action={updateProjectAction.bind(null, id)}
        defaultValues={project}
      />
    </div>
  );
}
