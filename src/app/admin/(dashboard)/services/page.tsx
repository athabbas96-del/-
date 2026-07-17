import Link from "next/link";
import { Plus } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  AdminPageHeader,
  AdminCard,
  EmptyState,
} from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listServices } from "@/lib/repo/services";
import { deleteServiceAction } from "@/lib/actions/services";

export default function AdminServicesPage() {
  const services = listServices();

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Shown in the Expertise section on the About page."
        action={
          <Link
            href="/admin/services/new"
            className={buttonVariants({ variant: "accent" })}
          >
            <Icon icon={Plus} size="sm" />
            Add Service
          </Link>
        }
      />

      {services.length === 0 ? (
        <EmptyState label="No services yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <AdminCard key={service.id} className="flex flex-col gap-2">
              <span className="text-accent font-mono text-xs">
                {service.icon}
              </span>
              <h3 className="text-foreground text-base font-medium">
                {service.title}
              </h3>
              <p className="text-muted text-sm">{service.description}</p>
              <div className="mt-2 flex items-center gap-4">
                <Link
                  href={`/admin/services/${service.id}`}
                  className="text-accent text-xs hover:underline"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={deleteServiceAction.bind(null, service.id)}
                />
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
