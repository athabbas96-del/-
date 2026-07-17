"use client";

import { useState } from "react";
import {
  Field,
  TextInput,
  TextArea,
  Checkbox,
  AdminCard,
} from "@/components/admin/fields";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import type { ArticleRecord } from "@/lib/repo/types";

export function ArticleForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ArticleRecord;
}) {
  const [coverImage, setCoverImage] = useState<string | null>(
    defaultValues?.coverImage ?? null,
  );

  function handleSubmit(formData: FormData) {
    formData.set("coverImage", coverImage ?? "");
    return action(formData);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <AdminCard className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title">
            <TextInput
              name="title"
              required
              defaultValue={defaultValues?.title}
            />
          </Field>
          <Field label="Slug" hint="Used in the URL: /articles/your-slug">
            <TextInput
              name="slug"
              required
              defaultValue={defaultValues?.slug}
            />
          </Field>
        </div>

        <Field label="Excerpt" hint="Short summary shown on the articles list">
          <TextArea
            name="excerpt"
            required
            rows={2}
            defaultValue={defaultValues?.excerpt}
          />
        </Field>

        <MediaPicker
          label="Cover image (optional)"
          type="image"
          value={coverImage}
          onChange={setCoverImage}
        />

        <Field label="Tags" hint="Comma-separated, e.g. Branding, AI, Strategy">
          <TextInput
            name="tags"
            defaultValue={defaultValues?.tags.join(", ")}
          />
        </Field>

        <Field label="Content" hint="Separate paragraphs with a blank line.">
          <TextArea
            name="content"
            required
            rows={16}
            defaultValue={defaultValues?.content}
          />
        </Field>

        <Checkbox
          name="published"
          label="Published (visible on the live site)"
          defaultChecked={defaultValues?.published}
        />
      </AdminCard>

      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: "accent", size: "lg" }),
          "w-fit",
        )}
      >
        Save Article
      </button>
    </form>
  );
}
