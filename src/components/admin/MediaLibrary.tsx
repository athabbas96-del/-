"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Video as VideoIcon, Copy, Check } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Uploader } from "@/components/admin/Uploader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMediaAction } from "@/lib/actions/media";
import { AdminCard, EmptyState } from "@/components/admin/fields";
import type { MediaRecord } from "@/lib/repo/types";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibrary({
  initialMedia,
}: {
  initialMedia: MediaRecord[];
}) {
  const [items, setItems] = useState(initialMedia);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(item: MediaRecord) {
    navigator.clipboard.writeText(item.url).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <AdminCard>
        <div className="grid gap-4 sm:grid-cols-3">
          <Uploader
            accept="image/*"
            label="Upload image"
            onUploaded={(media) => setItems((prev) => [media, ...prev])}
          />
          <Uploader
            accept="video/*"
            label="Upload video"
            onUploaded={(media) => setItems((prev) => [media, ...prev])}
          />
          <Uploader
            accept="application/pdf"
            label="Upload PDF"
            onUploaded={(media) => setItems((prev) => [media, ...prev])}
          />
        </div>
      </AdminCard>

      {items.length === 0 ? (
        <EmptyState label="No media uploaded yet." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-border bg-surface overflow-hidden rounded-[var(--radius-md)] border"
            >
              <div className="bg-background relative aspect-video">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.filename}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                ) : item.type === "video" ? (
                  <div className="text-muted flex h-full items-center justify-center">
                    <Icon icon={VideoIcon} size="lg" />
                  </div>
                ) : (
                  <div className="text-muted flex h-full items-center justify-center">
                    <Icon icon={FileText} size="lg" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 p-3">
                <p className="text-foreground truncate text-xs font-medium">
                  {item.filename}
                </p>
                <p className="text-muted text-[11px]">
                  {item.type} · {formatSize(item.size)}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="text-muted hover:text-foreground flex items-center gap-1 text-[11px]"
                  >
                    <Icon
                      icon={copiedId === item.id ? Check : Copy}
                      size="sm"
                    />
                    {copiedId === item.id ? "Copied" : "Copy URL"}
                  </button>
                  <DeleteButton
                    action={deleteMediaAction.bind(null, item.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
