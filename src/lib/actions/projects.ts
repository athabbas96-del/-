"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
  type ProjectInput,
} from "@/lib/repo/projects";
import type {
  ProjectCategory,
  MediaItem,
  BeforeAfter,
  Testimonial,
  Stat,
} from "@/types";

function parseJsonField<T>(formData: FormData, key: string): T | undefined {
  const raw = formData.get(key);
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function parseInput(formData: FormData): ProjectInput {
  const tools = String(formData.get("tools") ?? "")
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    client: String(formData.get("client") ?? "").trim(),
    category: String(
      formData.get("category") ?? "brand-identity",
    ) as ProjectCategory,
    summary: String(formData.get("summary") ?? "").trim(),
    problem: String(formData.get("problem") ?? "").trim(),
    goal: String(formData.get("goal") ?? "").trim(),
    strategy: String(formData.get("strategy") ?? "").trim(),
    execution: String(formData.get("execution") ?? "").trim(),
    results: String(formData.get("results") ?? "").trim(),
    metrics: parseJsonField<Stat[]>(formData, "metricsJson") ?? [],
    year: Number(formData.get("year") ?? new Date().getFullYear()),
    tools,
    coverImage: String(formData.get("coverImage") ?? "").trim(),
    coverAlt: String(formData.get("coverAlt") ?? "").trim(),
    gallery: parseJsonField<MediaItem[]>(formData, "galleryJson") ?? [],
    video: parseJsonField<MediaItem>(formData, "videoJson"),
    beforeAfter: parseJsonField<BeforeAfter>(formData, "beforeAfterJson"),
    testimonial: parseJsonField<Testimonial>(formData, "testimonialJson"),
    featured: formData.get("featured") === "on",
  };
}

function revalidateProjectPages(slug?: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/work");
  revalidatePath("/clients");
  revalidatePath("/");
  if (slug) revalidatePath(`/work/${slug}`);
}

export async function createProjectAction(formData: FormData) {
  const input = parseInput(formData);
  createProject(input);
  revalidateProjectPages(input.slug);
  redirect("/admin/projects");
}

export async function updateProjectAction(id: string, formData: FormData) {
  const input = parseInput(formData);
  updateProject(id, input);
  revalidateProjectPages(input.slug);
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string, _formData: FormData) {
  deleteProject(id);
  revalidateProjectPages();
}
