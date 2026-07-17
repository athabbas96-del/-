"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createArticle,
  updateArticle,
  deleteArticle,
  type ArticleInput,
} from "@/lib/repo/articles";

function parseInput(formData: FormData): ArticleInput {
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const coverImage = String(formData.get("coverImage") ?? "").trim();

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    coverImage: coverImage || null,
    content: String(formData.get("content") ?? "").trim(),
    tags,
    published: formData.get("published") === "on",
  };
}

function revalidateArticlePages(slug?: string) {
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  if (slug) revalidatePath(`/articles/${slug}`);
}

export async function createArticleAction(formData: FormData) {
  const input = parseInput(formData);
  createArticle(input);
  revalidateArticlePages(input.slug);
  redirect("/admin/articles");
}

export async function updateArticleAction(id: string, formData: FormData) {
  const input = parseInput(formData);
  updateArticle(id, input);
  revalidateArticlePages(input.slug);
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string, _formData: FormData) {
  deleteArticle(id);
  revalidateArticlePages();
}
