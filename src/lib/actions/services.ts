"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createService,
  updateService,
  deleteService,
  type ServiceInput,
} from "@/lib/repo/services";

function parseInput(formData: FormData): ServiceInput {
  return {
    icon: String(formData.get("icon") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  };
}

function revalidateServicePages() {
  revalidatePath("/admin/services");
  revalidatePath("/about");
}

export async function createServiceAction(formData: FormData) {
  createService(parseInput(formData));
  revalidateServicePages();
  redirect("/admin/services");
}

export async function updateServiceAction(id: string, formData: FormData) {
  updateService(id, parseInput(formData));
  revalidateServicePages();
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string, _formData: FormData) {
  deleteService(id);
  revalidateServicePages();
}
