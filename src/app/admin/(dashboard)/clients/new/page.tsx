import { AdminPageHeader } from "@/components/admin/fields";
import { ClientForm } from "@/components/admin/ClientForm";
import { createClientAction } from "@/lib/actions/clients";

export default function NewClientPage() {
  return (
    <div>
      <AdminPageHeader title="Add Client" />
      <ClientForm action={createClientAction} />
    </div>
  );
}
