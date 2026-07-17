"use server";

import path from "node:path";
import { unlink } from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { getMediaById, deleteMedia, listMedia } from "@/lib/repo/media";
import type { MediaRecord } from "@/lib/repo/types";

export async function listMediaAction(
  type?: MediaRecord["type"],
): Promise<MediaRecord[]> {
  return listMedia(type);
}

export async function deleteMediaAction(id: string, _formData: FormData) {
  const media = getMediaById(id);
  if (!media) return;

  deleteMedia(id);

  if (media.url.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", media.url);
    try {
      await unlink(filePath);
    } catch {
      // File already gone or unreadable — DB row is the source of truth.
    }
  }

  revalidatePath("/admin/media");
}
