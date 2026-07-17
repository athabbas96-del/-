"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  AdminCard,
} from "@/components/admin/fields";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { categories } from "@/content/projects";
import type { ProjectRecord } from "@/lib/repo/types";
import type { MediaItem, BeforeAfter, Testimonial, Stat } from "@/types";

interface GalleryRow extends MediaItem {
  key: string;
}
interface MetricRow extends Stat {
  key: string;
}

function newKey() {
  return Math.random().toString(36).slice(2);
}

export function ProjectForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProjectRecord;
}) {
  const [coverImage, setCoverImage] = useState<string | null>(
    defaultValues?.coverImage ?? null,
  );
  const [gallery, setGallery] = useState<GalleryRow[]>(
    (defaultValues?.gallery ?? []).map((item) => ({ ...item, key: newKey() })),
  );
  const [metrics, setMetrics] = useState<MetricRow[]>(
    (defaultValues?.metrics ?? []).map((item) => ({ ...item, key: newKey() })),
  );

  const [hasVideo, setHasVideo] = useState(Boolean(defaultValues?.video));
  const [videoSrc, setVideoSrc] = useState<string | null>(
    defaultValues?.video?.src ?? null,
  );
  const [videoPoster, setVideoPoster] = useState<string | null>(
    defaultValues?.video?.poster ?? null,
  );
  const [videoAlt, setVideoAlt] = useState(defaultValues?.video?.alt ?? "");

  const [hasBeforeAfter, setHasBeforeAfter] = useState(
    Boolean(defaultValues?.beforeAfter),
  );
  const [beforeImg, setBeforeImg] = useState<string | null>(
    defaultValues?.beforeAfter?.before ?? null,
  );
  const [afterImg, setAfterImg] = useState<string | null>(
    defaultValues?.beforeAfter?.after ?? null,
  );
  const [beforeAlt, setBeforeAlt] = useState(
    defaultValues?.beforeAfter?.beforeAlt ?? "",
  );
  const [afterAlt, setAfterAlt] = useState(
    defaultValues?.beforeAfter?.afterAlt ?? "",
  );
  const [caption, setCaption] = useState(
    defaultValues?.beforeAfter?.caption ?? "",
  );

  const [hasTestimonial, setHasTestimonial] = useState(
    Boolean(defaultValues?.testimonial),
  );

  function handleSubmit(formData: FormData) {
    formData.set("coverImage", coverImage ?? "");
    formData.set(
      "galleryJson",
      JSON.stringify(
        gallery.map(({ type, src, alt, poster }) => ({
          type,
          src,
          alt,
          ...(poster ? { poster } : {}),
        })),
      ),
    );
    formData.set(
      "metricsJson",
      JSON.stringify(
        metrics.map(({ value, suffix, label }) => ({ value, suffix, label })),
      ),
    );

    if (hasVideo && videoSrc) {
      const video: MediaItem = { type: "video", src: videoSrc, alt: videoAlt };
      if (videoPoster) video.poster = videoPoster;
      formData.set("videoJson", JSON.stringify(video));
    }

    if (hasBeforeAfter && beforeImg && afterImg) {
      const beforeAfter: BeforeAfter = {
        before: beforeImg,
        after: afterImg,
        beforeAlt,
        afterAlt,
        ...(caption ? { caption } : {}),
      };
      formData.set("beforeAfterJson", JSON.stringify(beforeAfter));
    }

    if (hasTestimonial) {
      const testimonial: Testimonial = {
        quote: String(formData.get("testimonialQuote") ?? ""),
        author: String(formData.get("testimonialAuthor") ?? ""),
        role: String(formData.get("testimonialRole") ?? ""),
      };
      const rating = Number(formData.get("testimonialRating") ?? 0);
      if (rating) testimonial.rating = rating;
      formData.set("testimonialJson", JSON.stringify(testimonial));
    }

    return action(formData);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <AdminCard className="grid gap-5 sm:grid-cols-2">
        <Field label="Title">
          <TextInput
            name="title"
            required
            defaultValue={defaultValues?.title}
          />
        </Field>
        <Field label="Slug" hint="Used in the URL: /work/your-slug">
          <TextInput name="slug" required defaultValue={defaultValues?.slug} />
        </Field>
        <Field label="Client">
          <TextInput
            name="client"
            required
            defaultValue={defaultValues?.client}
          />
        </Field>
        <Field label="Category">
          <Select
            name="category"
            defaultValue={defaultValues?.category ?? categories[0].slug}
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Year">
          <TextInput
            name="year"
            type="number"
            required
            defaultValue={defaultValues?.year ?? new Date().getFullYear()}
          />
        </Field>
        <Field
          label="Tools"
          hint="Comma-separated, e.g. Illustrator, Photoshop"
        >
          <TextInput
            name="tools"
            defaultValue={defaultValues?.tools.join(", ")}
          />
        </Field>
        <Field label="Summary" className="sm:col-span-2">
          <TextArea
            name="summary"
            required
            rows={2}
            defaultValue={defaultValues?.summary}
          />
        </Field>
        <div className="sm:col-span-2">
          <Checkbox
            name="featured"
            label="Feature this project (Clients page success stories)"
            defaultChecked={defaultValues?.featured}
          />
        </div>
      </AdminCard>

      <AdminCard className="flex flex-col gap-5">
        <h3 className="text-foreground text-sm font-medium">
          Case Study Narrative
        </h3>
        {(
          [
            ["problem", "Problem"],
            ["goal", "Goal"],
            ["strategy", "Strategy"],
            ["execution", "Execution"],
            ["results", "Results"],
          ] as const
        ).map(([name, label]) => (
          <Field key={name} label={label}>
            <TextArea
              name={name}
              required
              rows={3}
              defaultValue={defaultValues?.[name]}
            />
          </Field>
        ))}
      </AdminCard>

      <AdminCard className="flex flex-col gap-4">
        <h3 className="text-foreground text-sm font-medium">Cover Image</h3>
        <MediaPicker
          label="Cover image"
          type="image"
          value={coverImage}
          onChange={setCoverImage}
        />
        <Field label="Cover alt text">
          <TextInput
            name="coverAlt"
            required
            defaultValue={defaultValues?.coverAlt}
          />
        </Field>
      </AdminCard>

      <AdminCard className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-sm font-medium">
            Numbers (Metrics)
          </h3>
          <button
            type="button"
            onClick={() =>
              setMetrics((prev) => [
                ...prev,
                { key: newKey(), value: 0, label: "" },
              ])
            }
            className="text-accent flex items-center gap-1 text-xs"
          >
            <Icon icon={Plus} size="sm" />
            Add metric
          </button>
        </div>
        {metrics.map((metric, index) => (
          <div
            key={metric.key}
            className="grid grid-cols-[1fr_1fr_2fr_auto] items-end gap-3"
          >
            <Field label="Value">
              <TextInput
                type="number"
                value={metric.value}
                onChange={(event) =>
                  setMetrics((prev) =>
                    prev.map((m, i) =>
                      i === index
                        ? { ...m, value: Number(event.target.value) }
                        : m,
                    ),
                  )
                }
              />
            </Field>
            <Field label="Suffix">
              <TextInput
                value={metric.suffix ?? ""}
                onChange={(event) =>
                  setMetrics((prev) =>
                    prev.map((m, i) =>
                      i === index ? { ...m, suffix: event.target.value } : m,
                    ),
                  )
                }
              />
            </Field>
            <Field label="Label">
              <TextInput
                value={metric.label}
                onChange={(event) =>
                  setMetrics((prev) =>
                    prev.map((m, i) =>
                      i === index ? { ...m, label: event.target.value } : m,
                    ),
                  )
                }
              />
            </Field>
            <button
              type="button"
              onClick={() =>
                setMetrics((prev) => prev.filter((_, i) => i !== index))
              }
              className="text-red-500"
            >
              <Icon icon={Trash2} size="sm" />
            </button>
          </div>
        ))}
      </AdminCard>

      <AdminCard className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-sm font-medium">Gallery</h3>
          <button
            type="button"
            onClick={() =>
              setGallery((prev) => [
                ...prev,
                { key: newKey(), type: "image", src: "", alt: "" },
              ])
            }
            className="text-accent flex items-center gap-1 text-xs"
          >
            <Icon icon={Plus} size="sm" />
            Add media
          </button>
        </div>
        {gallery.map((item, index) => (
          <div
            key={item.key}
            className="border-border flex flex-col gap-3 border-t pt-4 first:border-t-0 first:pt-0"
          >
            <div className="flex items-center justify-between">
              <Select
                value={item.type}
                onChange={(event) =>
                  setGallery((prev) =>
                    prev.map((g, i) =>
                      i === index
                        ? {
                            ...g,
                            type: event.target.value as "image" | "video",
                            src: "",
                          }
                        : g,
                    ),
                  )
                }
                className="w-fit"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </Select>
              <button
                type="button"
                onClick={() =>
                  setGallery((prev) => prev.filter((_, i) => i !== index))
                }
                className="text-red-500"
              >
                <Icon icon={Trash2} size="sm" />
              </button>
            </div>
            <MediaPicker
              label={item.type === "image" ? "Image" : "Video"}
              type={item.type}
              value={item.src || null}
              onChange={(url) =>
                setGallery((prev) =>
                  prev.map((g, i) => (i === index ? { ...g, src: url } : g)),
                )
              }
            />
            <Field label="Alt text">
              <TextInput
                value={item.alt}
                onChange={(event) =>
                  setGallery((prev) =>
                    prev.map((g, i) =>
                      i === index ? { ...g, alt: event.target.value } : g,
                    ),
                  )
                }
              />
            </Field>
          </div>
        ))}
      </AdminCard>

      <AdminCard className="flex flex-col gap-4">
        <Checkbox
          label="Include a video showcase"
          checked={hasVideo}
          onChange={(event) => setHasVideo(event.target.checked)}
        />
        {hasVideo && (
          <div className="flex flex-col gap-4">
            <MediaPicker
              label="Video"
              type="video"
              value={videoSrc}
              onChange={setVideoSrc}
            />
            <MediaPicker
              label="Poster image (optional)"
              type="image"
              value={videoPoster}
              onChange={setVideoPoster}
            />
            <Field label="Alt text">
              <TextInput
                value={videoAlt}
                onChange={(e) => setVideoAlt(e.target.value)}
              />
            </Field>
          </div>
        )}
      </AdminCard>

      <AdminCard className="flex flex-col gap-4">
        <Checkbox
          label="Include a before / after comparison"
          checked={hasBeforeAfter}
          onChange={(event) => setHasBeforeAfter(event.target.checked)}
        />
        {hasBeforeAfter && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <MediaPicker
                label="Before image"
                type="image"
                value={beforeImg}
                onChange={setBeforeImg}
              />
              <Field label="Before alt text">
                <TextInput
                  value={beforeAlt}
                  onChange={(e) => setBeforeAlt(e.target.value)}
                />
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <MediaPicker
                label="After image"
                type="image"
                value={afterImg}
                onChange={setAfterImg}
              />
              <Field label="After alt text">
                <TextInput
                  value={afterAlt}
                  onChange={(e) => setAfterAlt(e.target.value)}
                />
              </Field>
            </div>
            <Field label="Caption (optional)" className="sm:col-span-2">
              <TextInput
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </Field>
          </div>
        )}
      </AdminCard>

      <AdminCard className="flex flex-col gap-4">
        <Checkbox
          label="Include a client testimonial"
          checked={hasTestimonial}
          onChange={(event) => setHasTestimonial(event.target.checked)}
        />
        {hasTestimonial && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Quote" className="sm:col-span-2">
              <TextArea
                name="testimonialQuote"
                rows={3}
                defaultValue={defaultValues?.testimonial?.quote}
              />
            </Field>
            <Field label="Author">
              <TextInput
                name="testimonialAuthor"
                defaultValue={defaultValues?.testimonial?.author}
              />
            </Field>
            <Field label="Role">
              <TextInput
                name="testimonialRole"
                defaultValue={defaultValues?.testimonial?.role}
              />
            </Field>
            <Field label="Rating (1-5, optional)">
              <TextInput
                name="testimonialRating"
                type="number"
                min={1}
                max={5}
                defaultValue={defaultValues?.testimonial?.rating}
              />
            </Field>
          </div>
        )}
      </AdminCard>

      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: "accent", size: "lg" }),
          "w-fit",
        )}
      >
        Save Project
      </button>
    </form>
  );
}
