"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { MediaRecord } from "@/lib/repo/types";

export function Uploader({
  accept,
  onUploaded,
  label = "Upload file",
}: {
  accept: string;
  onUploaded: (media: MediaRecord) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Upload failed");
      onUploaded(data.media as MediaRecord);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="border-border bg-background text-muted hover:border-accent hover:text-foreground flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-xs)] border border-dashed px-4 py-6 text-sm transition-colors">
        {busy ? (
          <Icon icon={Loader2} size="sm" className="animate-spin" />
        ) : (
          <Icon icon={Upload} size="sm" />
        )}
        {busy ? "Uploading…" : label}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          disabled={busy}
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
