import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import {
  projectFromRow,
  type ProjectRecord,
  type ProjectRow,
} from "@/lib/repo/types";
import type {
  ProjectCategory,
  MediaItem,
  BeforeAfter,
  Testimonial,
  Stat,
} from "@/types";

export interface ProjectInput {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  goal: string;
  strategy: string;
  execution: string;
  results: string;
  metrics: Stat[];
  year: number;
  tools: string[];
  coverImage: string;
  coverAlt: string;
  gallery: MediaItem[];
  video?: MediaItem;
  beforeAfter?: BeforeAfter;
  testimonial?: Testimonial;
  featured: boolean;
}

export function listProjects(): ProjectRecord[] {
  const rows = db
    .prepare("SELECT * FROM projects ORDER BY sortOrder ASC, createdAt ASC")
    .all() as ProjectRow[];
  return rows.map(projectFromRow);
}

export function getProjectBySlug(slug: string): ProjectRecord | null {
  const row = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug) as
    ProjectRow | undefined;
  return row ? projectFromRow(row) : null;
}

export function getProjectById(id: string): ProjectRecord | null {
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as
    ProjectRow | undefined;
  return row ? projectFromRow(row) : null;
}

export function createProject(input: ProjectInput): ProjectRecord {
  const id = randomUUID();
  const now = new Date().toISOString();
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM projects")
    .get() as { count: number };

  db.prepare(
    `
    INSERT INTO projects (
      id, slug, title, client, category, summary, problem, goal, strategy,
      execution, results, metricsJson, year, toolsJson, coverImage, coverAlt,
      galleryJson, videoJson, beforeAfterJson, testimonialJson, featured,
      sortOrder, createdAt, updatedAt
    ) VALUES (
      @id, @slug, @title, @client, @category, @summary, @problem, @goal,
      @strategy, @execution, @results, @metricsJson, @year, @toolsJson,
      @coverImage, @coverAlt, @galleryJson, @videoJson, @beforeAfterJson,
      @testimonialJson, @featured, @sortOrder, @createdAt, @updatedAt
    )
  `,
  ).run({
    id,
    slug: input.slug,
    title: input.title,
    client: input.client,
    category: input.category,
    summary: input.summary,
    problem: input.problem,
    goal: input.goal,
    strategy: input.strategy,
    execution: input.execution,
    results: input.results,
    metricsJson: JSON.stringify(input.metrics),
    year: input.year,
    toolsJson: JSON.stringify(input.tools),
    coverImage: input.coverImage,
    coverAlt: input.coverAlt,
    galleryJson: JSON.stringify(input.gallery),
    videoJson: input.video ? JSON.stringify(input.video) : null,
    beforeAfterJson: input.beforeAfter
      ? JSON.stringify(input.beforeAfter)
      : null,
    testimonialJson: input.testimonial
      ? JSON.stringify(input.testimonial)
      : null,
    featured: input.featured ? 1 : 0,
    sortOrder: count,
    createdAt: now,
    updatedAt: now,
  });

  return getProjectById(id)!;
}

export function updateProject(id: string, input: ProjectInput): ProjectRecord {
  const now = new Date().toISOString();
  db.prepare(
    `
    UPDATE projects SET
      slug = @slug, title = @title, client = @client, category = @category,
      summary = @summary, problem = @problem, goal = @goal,
      strategy = @strategy, execution = @execution, results = @results,
      metricsJson = @metricsJson, year = @year, toolsJson = @toolsJson,
      coverImage = @coverImage, coverAlt = @coverAlt,
      galleryJson = @galleryJson, videoJson = @videoJson,
      beforeAfterJson = @beforeAfterJson, testimonialJson = @testimonialJson,
      featured = @featured, updatedAt = @updatedAt
    WHERE id = @id
  `,
  ).run({
    id,
    slug: input.slug,
    title: input.title,
    client: input.client,
    category: input.category,
    summary: input.summary,
    problem: input.problem,
    goal: input.goal,
    strategy: input.strategy,
    execution: input.execution,
    results: input.results,
    metricsJson: JSON.stringify(input.metrics),
    year: input.year,
    toolsJson: JSON.stringify(input.tools),
    coverImage: input.coverImage,
    coverAlt: input.coverAlt,
    galleryJson: JSON.stringify(input.gallery),
    videoJson: input.video ? JSON.stringify(input.video) : null,
    beforeAfterJson: input.beforeAfter
      ? JSON.stringify(input.beforeAfter)
      : null,
    testimonialJson: input.testimonial
      ? JSON.stringify(input.testimonial)
      : null,
    featured: input.featured ? 1 : 0,
    updatedAt: now,
  });

  return getProjectById(id)!;
}

export function deleteProject(id: string): void {
  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
}
