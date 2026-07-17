"use client";

import { useState } from "react";
import {
  Field,
  TextInput,
  TextArea,
  AdminCard,
} from "@/components/admin/fields";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import type { SiteSettingsRecord } from "@/lib/repo/types";

export function SiteTextsForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues: SiteSettingsRecord;
}) {
  const [cvUrl, setCvUrl] = useState<string | null>(defaultValues.cvMediaUrl);
  const [portfolioUrl, setPortfolioUrl] = useState<string | null>(
    defaultValues.portfolioMediaUrl,
  );

  function handleSubmit(formData: FormData) {
    formData.set("cvMediaUrl", cvUrl ?? "");
    formData.set("portfolioMediaUrl", portfolioUrl ?? "");
    return action(formData);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <AdminCard className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-medium">
          Hero (Home page)
        </h3>
        <Field label="Name">
          <TextInput
            name="heroName"
            required
            defaultValue={defaultValues.heroName}
          />
        </Field>
        <Field label="Rotating roles" hint="One role per line">
          <TextArea
            name="heroRoles"
            required
            rows={4}
            defaultValue={defaultValues.heroRoles.join("\n")}
          />
        </Field>
        <Field label="Badge text">
          <TextInput
            name="heroBadge"
            required
            defaultValue={defaultValues.heroBadge}
          />
        </Field>
      </AdminCard>

      <AdminCard className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-medium">About page</h3>
        <Field label="Eyebrow">
          <TextInput
            name="aboutEyebrow"
            required
            defaultValue={defaultValues.aboutEyebrow}
          />
        </Field>
        <Field label="Heading">
          <TextInput
            name="aboutHeading"
            required
            defaultValue={defaultValues.aboutHeading}
          />
        </Field>
        <Field label="Story" hint="One paragraph per line">
          <TextArea
            name="aboutStory"
            required
            rows={6}
            defaultValue={defaultValues.aboutStory.join("\n")}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Vision label">
            <TextInput
              name="visionLabel"
              required
              defaultValue={defaultValues.visionLabel}
            />
          </Field>
          <Field label="Mission label">
            <TextInput
              name="missionLabel"
              required
              defaultValue={defaultValues.missionLabel}
            />
          </Field>
          <Field label="Vision text" className="sm:col-span-2">
            <TextArea
              name="visionText"
              required
              rows={2}
              defaultValue={defaultValues.visionText}
            />
          </Field>
          <Field label="Mission text" className="sm:col-span-2">
            <TextArea
              name="missionText"
              required
              rows={2}
              defaultValue={defaultValues.missionText}
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-medium">Contact page</h3>
        <Field label="Intro text">
          <TextArea
            name="contactIntro"
            required
            rows={2}
            defaultValue={defaultValues.contactIntro}
          />
        </Field>
      </AdminCard>

      <AdminCard className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-medium">Downloads</h3>
        <MediaPicker
          label="CV (PDF)"
          type="pdf"
          value={cvUrl}
          onChange={setCvUrl}
        />
        <MediaPicker
          label="Portfolio (PDF)"
          type="pdf"
          value={portfolioUrl}
          onChange={setPortfolioUrl}
        />
      </AdminCard>

      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: "accent", size: "lg" }),
          "w-fit",
        )}
      >
        Save Site Texts
      </button>
    </form>
  );
}
