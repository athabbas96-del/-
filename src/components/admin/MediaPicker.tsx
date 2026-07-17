"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, FileText, Video as VideoIcon, Check } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Uploader } from "@/components/admin/Uploader";
import { listMediaAction } from "@/lib/actions/media";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";
import type { MediaRecord } from "@/lib/repo/types";

interface MediaPickerProps {
  label: string;
  type: MediaRecord["type"];
  value: string | null;
  onChange: (url: string) => void;
}

export function MediaPicker({
  label,
  type,
  value,
  onChange,
}: MediaPickerProps) {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaRecord[] | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    listMediaAction(type).then((data) => {
      if (!cancelled) setItems(data);
    });
    return () => {
      cancelled = true;
    };
  }, [open, type]);

  const loading = items === null;

  const accept =
    type === "image"
      ? "image/*"
      : type === "video"
        ? "video/*"
        : "application/pdf";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
        {label}
      </span>

      <div className="flex items-center gap-3">
        <Preview type={type} value={value} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-border bg-background text-foreground hover:border-accent rounded-[var(--radius-xs)] border px-4 py-2 text-sm transition-colors"
        >
          {value ? "Change" : "Choose"}
        </button>
      </div>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
            <div className="bg-background border-border flex max-h-[85vh] w-full max-w-2xl flex-col rounded-[var(--radius-lg)] border">
              <div className="border-border flex items-center justify-between border-b px-5 py-4">
                <h3 className="text-foreground text-sm font-medium">
                  Choose {type}
                </h3>
                <button type="button" onClick={() => setOpen(false)}>
                  <Icon icon={X} size="sm" className="text-muted" />
                </button>
              </div>

              <div className="border-border border-b p-5">
                <Uploader
                  accept={accept}
                  label={`Upload new ${type}`}
                  onUploaded={(media) => {
                    setItems((prev) => [media, ...(prev ?? [])]);
                    onChange(media.url);
                    setOpen(false);
                  }}
                />
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {loading ? (
                  <p className="text-muted text-sm">Loading…</p>
                ) : items.length === 0 ? (
                  <p className="text-muted text-sm">
                    No {type} files uploaded yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onChange(item.url);
                          setOpen(false);
                        }}
                        className={cn(
                          "border-border relative aspect-square overflow-hidden rounded-[var(--radius-xs)] border",
                          value === item.url && "ring-accent ring-2",
                        )}
                      >
                        <MediaThumb item={item} />
                        {value === item.url && (
                          <span className="bg-accent absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full text-white">
                            <Icon icon={Check} size="sm" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function Preview({
  type,
  value,
}: {
  type: MediaRecord["type"];
  value: string | null;
}) {
  if (!value) {
    return (
      <div className="border-border bg-background text-muted flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border border-dashed text-xs">
        None
      </div>
    );
  }
  if (type === "image") {
    return (
      <div className="border-border relative h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-xs)] border">
        <Image src={value} alt="" fill className="object-cover" sizes="64px" />
      </div>
    );
  }
  return (
    <div className="border-border bg-background text-muted flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border">
      <Icon icon={type === "video" ? VideoIcon : FileText} size="md" />
    </div>
  );
}

function MediaThumb({ item }: { item: MediaRecord }) {
  if (item.type === "image") {
    return (
      <Image
        src={item.url}
        alt={item.filename}
        fill
        className="object-cover"
        sizes="120px"
      />
    );
  }
  return (
    <div className="bg-surface text-muted flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
      <Icon icon={item.type === "video" ? VideoIcon : FileText} size="md" />
      <span className="w-full truncate text-[10px]">{item.filename}</span>
    </div>
  );
}
