import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type { MediaRecord } from "@/lib/repo/types";

export function listMedia(type?: MediaRecord["type"]): MediaRecord[] {
  const rows = (
    type
      ? db
          .prepare("SELECT * FROM media WHERE type = ? ORDER BY createdAt DESC")
          .all(type)
      : db.prepare("SELECT * FROM media ORDER BY createdAt DESC").all()
  ) as MediaRecord[];
  return rows;
}

export function getMediaById(id: string): MediaRecord | null {
  const row = db.prepare("SELECT * FROM media WHERE id = ?").get(id) as
    MediaRecord | undefined;
  return row ?? null;
}

export function createMedia(input: {
  url: string;
  type: MediaRecord["type"];
  filename: string;
  size: number;
}): MediaRecord {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO media (id, url, type, filename, size, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, input.url, input.type, input.filename, input.size, createdAt);
  return getMediaById(id)!;
}

export function deleteMedia(id: string): void {
  db.prepare("DELETE FROM media WHERE id = ?").run(id);
}
