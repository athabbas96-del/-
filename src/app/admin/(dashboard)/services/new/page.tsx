import { AdminPageHeader } from "@/components/admin/fields";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { createServiceAction } from "@/lib/actions/services";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="Add Service" />
      <ServiceForm action={createServiceAction} />
    </div>
  );
}
