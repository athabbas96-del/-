import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { AdminPageHeader, EmptyState } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listProjects } from "@/lib/repo/projects";
import { categoryLabel } from "@/content/projects";
import { deleteProjectAction } from "@/lib/actions/projects";

export default function AdminProjectsPage() {
  const projects = listProjects();

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Case studies shown on the Work page."
        action={
          <Link
            href="/admin/projects/new"
            className={buttonVariants({ variant: "accent" })}
          >
            <Icon icon={Plus} size="sm" />
            Add Project
          </Link>
        }
      />

      {projects.length === 0 ? (
        <EmptyState label="No projects yet." />
      ) : (
        <div className="border-border bg-surface overflow-hidden rounded-[var(--radius-md)] border">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-border flex items-center gap-4 border-b p-4 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-foreground flex items-center gap-2 truncate text-sm font-medium">
                  {project.title}
                  {project.featured && (
                    <Icon
                      icon={Star}
                      size="sm"
                      className="text-accent shrink-0"
                    />
                  )}
                </p>
                <p className="text-muted truncate text-xs">
                  {categoryLabel(project.category)} · {project.client} ·{" "}
                  {project.year}
                </p>
              </div>
              <Link
                href={`/work/${project.slug}`}
                target="_blank"
                className="text-muted text-xs hover:underline"
              >
                View
              </Link>
              <Link
                href={`/admin/projects/${project.id}`}
                className="text-accent text-xs hover:underline"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteProjectAction.bind(null, project.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
