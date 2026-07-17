import { AdminPageHeader } from "@/components/admin/fields";
import { SiteTextsForm } from "@/components/admin/SiteTextsForm";
import { updateSettingsAction } from "@/lib/actions/settings";
import { getSettings } from "@/lib/repo/settings";

export default function AdminTextsPage() {
  const settings = getSettings();

  return (
    <div>
      <AdminPageHeader
        title="Site Texts"
        description="Copy shown on the Home, About, and Contact pages."
      />
      <SiteTextsForm action={updateSettingsAction} defaultValues={settings} />
    </div>
  );
}
