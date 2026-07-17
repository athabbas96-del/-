import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { AdminPageHeader, EmptyState } from "@/components/admin/fields";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listClients } from "@/lib/repo/clients";
import { deleteClientAction } from "@/lib/actions/clients";

export default function AdminClientsPage() {
  const clients = listClients();

  return (
    <div>
      <AdminPageHeader
        title="Clients"
        description="Logo wall, marquee, and success stories on the Clients page."
        action={
          <Link
            href="/admin/clients/new"
            className={buttonVariants({ variant: "accent" })}
          >
            <Icon icon={Plus} size="sm" />
            Add Client
          </Link>
        }
      />

      {clients.length === 0 ? (
        <EmptyState label="No clients yet." />
      ) : (
        <div className="border-border bg-surface overflow-hidden rounded-[var(--radius-md)] border">
          {clients.map((client) => (
            <div
              key={client.id}
              className="border-border flex items-center gap-4 border-b p-4 last:border-b-0"
            >
              <div className="bg-background relative h-12 w-12 shrink-0 overflow-hidden rounded">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {client.name}
                </p>
                {client.slug && (
                  <p className="text-muted truncate text-xs">
                    Links to /work/{client.slug}
                  </p>
                )}
              </div>
              <Link
                href={`/admin/clients/${client.id}`}
                className="text-accent text-xs hover:underline"
              >
                Edit
              </Link>
              <DeleteButton action={deleteClientAction.bind(null, client.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
