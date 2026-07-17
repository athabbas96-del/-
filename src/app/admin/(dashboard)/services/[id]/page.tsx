import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/fields";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { updateServiceAction } from "@/lib/actions/services";
import { getServiceById } from "@/lib/repo/services";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit Service" />
      <ServiceForm
        action={updateServiceAction.bind(null, id)}
        defaultValues={service}
      />
    </div>
  );
}
