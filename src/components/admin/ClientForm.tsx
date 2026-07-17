"use client";

import { useState } from "react";
import { Field, TextInput, AdminCard } from "@/components/admin/fields";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { buttonVariants } from "@/components/ui/button-variants";
import type { ClientRecord } from "@/lib/repo/types";

export function ClientForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ClientRecord;
}) {
  const [logo, setLogo] = useState<string | null>(defaultValues?.logo ?? null);

  return (
    <form action={action} className="flex flex-col gap-6">
      <AdminCard className="flex flex-col gap-5">
        <Field label="Name">
          <TextInput name="name" required defaultValue={defaultValues?.name} />
        </Field>

        <input type="hidden" name="logo" value={logo ?? ""} required />
        <MediaPicker
          label="Logo"
          type="image"
          value={logo}
          onChange={setLogo}
        />

        <Field
          label="Linked project slug (optional)"
          hint="If this client has a case study under /work, enter its slug so the logo links there."
        >
          <TextInput name="slug" defaultValue={defaultValues?.slug} />
        </Field>
      </AdminCard>

      <button type="submit" className={buttonVariants({ variant: "accent" })}>
        Save Client
      </button>
    </form>
  );
}
