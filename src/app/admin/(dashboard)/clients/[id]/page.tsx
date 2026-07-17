import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/fields";
import { ClientForm } from "@/components/admin/ClientForm";
import { updateClientAction } from "@/lib/actions/clients";
import { getClientById } from "@/lib/repo/clients";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClientById(id);
  if (!client) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Client" />
      <ClientForm
        action={updateClientAction.bind(null, id)}
        defaultValues={client}
      />
    </div>
  );
}
