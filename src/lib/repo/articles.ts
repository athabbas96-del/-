import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import {
  articleFromRow,
  type ArticleRecord,
  type ArticleRow,
} from "@/lib/repo/types";

export interface ArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  content: string;
  tags: string[];
  published: boolean;
}

export function listArticles(options?: {
  publishedOnly?: boolean;
}): ArticleRecord[] {
  const rows = (
    options?.publishedOnly
      ? db
          .prepare(
            "SELECT * FROM articles WHERE published = 1 ORDER BY publishedAt DESC",
          )
          .all()
      : db.prepare("SELECT * FROM articles ORDER BY createdAt DESC").all()
  ) as ArticleRow[];
  return rows.map(articleFromRow);
}

export function getArticleBySlug(slug: string): ArticleRecord | null {
  const row = db.prepare("SELECT * FROM articles WHERE slug = ?").get(slug) as
    ArticleRow | undefined;
  return row ? articleFromRow(row) : null;
}

export function getArticleById(id: string): ArticleRecord | null {
  const row = db.prepare("SELECT * FROM articles WHERE id = ?").get(id) as
    ArticleRow | undefined;
  return row ? articleFromRow(row) : null;
}

export function createArticle(input: ArticleInput): ArticleRecord {
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `
    INSERT INTO articles (
      id, slug, title, excerpt, coverImage, content, tagsJson, published,
      publishedAt, createdAt, updatedAt
    ) VALUES (@id, @slug, @title, @excerpt, @coverImage, @content, @tagsJson,
      @published, @publishedAt, @createdAt, @updatedAt)
  `,
  ).run({
    id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    coverImage: input.coverImage,
    content: input.content,
    tagsJson: JSON.stringify(input.tags),
    published: input.published ? 1 : 0,
    publishedAt: input.published ? now : null,
    createdAt: now,
    updatedAt: now,
  });

  return getArticleById(id)!;
}

export function updateArticle(id: string, input: ArticleInput): ArticleRecord {
  const now = new Date().toISOString();
  const existing = getArticleById(id);
  const publishedAt = input.published ? (existing?.publishedAt ?? now) : null;

  db.prepare(
    `
    UPDATE articles SET
      slug = @slug, title = @title, excerpt = @excerpt,
      coverImage = @coverImage, content = @content, tagsJson = @tagsJson,
      published = @published, publishedAt = @publishedAt, updatedAt = @updatedAt
    WHERE id = @id
  `,
  ).run({
    id,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    coverImage: input.coverImage,
    content: input.content,
    tagsJson: JSON.stringify(input.tags),
    published: input.published ? 1 : 0,
    publishedAt,
    updatedAt: now,
  });

  return getArticleById(id)!;
}

export function deleteArticle(id: string): void {
  db.prepare("DELETE FROM articles WHERE id = ?").run(id);
}
