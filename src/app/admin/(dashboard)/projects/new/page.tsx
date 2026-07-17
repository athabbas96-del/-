import { AdminPageHeader } from "@/components/admin/fields";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="Add Project" />
      <ProjectForm action={createProjectAction} />
    </div>
  );
}
