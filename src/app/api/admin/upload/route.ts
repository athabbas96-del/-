import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createMedia } from "@/lib/repo/media";

export const runtime = "nodejs";

const ALLOWED = {
  image: {
    mimes: [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ],
    maxBytes: 15 * 1024 * 1024,
    dir: "images",
  },
  video: {
    mimes: ["video/mp4", "video/webm", "video/quicktime"],
    maxBytes: 300 * 1024 * 1024,
    dir: "videos",
  },
  pdf: {
    mimes: ["application/pdf"],
    maxBytes: 30 * 1024 * 1024,
    dir: "pdfs",
  },
} as const;

type Kind = keyof typeof ALLOWED;

function resolveKind(mime: string): Kind | null {
  for (const kind of Object.keys(ALLOWED) as Kind[]) {
    if ((ALLOWED[kind].mimes as readonly string[]).includes(mime)) return kind;
  }
  return null;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const kind = resolveKind(file.type);
  if (!kind) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type || "unknown"}` },
      { status: 400 },
    );
  }

  const config = ALLOWED[kind];
  if (file.size > config.maxBytes) {
    return NextResponse.json(
      {
        error: `File too large — max ${(config.maxBytes / (1024 * 1024)).toFixed(0)}MB for ${kind}.`,
      },
      { status: 400 },
    );
  }

  const ext = (
    path.extname(file.name) || `.${file.type.split("/")[1] ?? "bin"}`
  )
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "");
  const filename = `${randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", config.dir);
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, filename),
    Buffer.from(await file.arrayBuffer()),
  );

  const url = `/uploads/${config.dir}/${filename}`;
  const media = createMedia({
    url,
    type: kind,
    filename: file.name,
    size: file.size,
  });

  return NextResponse.json({ media });
}
