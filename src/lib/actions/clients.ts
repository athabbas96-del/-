"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createClient as createClientRecord,
  updateClient,
  deleteClient,
  type ClientInput,
} from "@/lib/repo/clients";

function parseInput(formData: FormData): ClientInput {
  const slug = String(formData.get("slug") ?? "").trim();
  return {
    name: String(formData.get("name") ?? "").trim(),
    logo: String(formData.get("logo") ?? "").trim(),
    slug: slug || undefined,
  };
}

function revalidateClientPages() {
  revalidatePath("/admin/clients");
  revalidatePath("/clients");
}

export async function createClientAction(formData: FormData) {
  createClientRecord(parseInput(formData));
  revalidateClientPages();
  redirect("/admin/clients");
}

export async function updateClientAction(id: string, formData: FormData) {
  updateClient(id, parseInput(formData));
  revalidateClientPages();
  redirect("/admin/clients");
}

export async function deleteClientAction(id: string, _formData: FormData) {
  deleteClient(id);
  revalidateClientPages();
}
