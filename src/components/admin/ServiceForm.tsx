import {
  Field,
  TextInput,
  TextArea,
  AdminCard,
} from "@/components/admin/fields";
import { buttonVariants } from "@/components/ui/button-variants";
import type { ServiceRecord } from "@/lib/repo/types";

export function ServiceForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ServiceRecord;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <AdminCard className="flex flex-col gap-5">
        <Field
          label="Icon name"
          hint="A lucide-react icon name, e.g. Palette, Target, Sparkles — see lucide.dev/icons"
        >
          <TextInput
            name="icon"
            required
            defaultValue={defaultValues?.icon}
            placeholder="Palette"
          />
        </Field>
        <Field label="Title">
          <TextInput
            name="title"
            required
            defaultValue={defaultValues?.title}
          />
        </Field>
        <Field label="Description">
          <TextArea
            name="description"
            required
            rows={3}
            defaultValue={defaultValues?.description}
          />
        </Field>
      </AdminCard>

      <button type="submit" className={buttonVariants({ variant: "accent" })}>
        Save Service
      </button>
    </form>
  );
}
