"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateSettings } from "@/lib/repo/settings";

function linesToArray(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateSettingsAction(formData: FormData) {
  updateSettings({
    heroName: String(formData.get("heroName") ?? "").trim(),
    heroRoles: linesToArray(String(formData.get("heroRoles") ?? "")),
    heroBadge: String(formData.get("heroBadge") ?? "").trim(),
    aboutEyebrow: String(formData.get("aboutEyebrow") ?? "").trim(),
    aboutHeading: String(formData.get("aboutHeading") ?? "").trim(),
    aboutStory: linesToArray(String(formData.get("aboutStory") ?? "")),
    visionLabel: String(formData.get("visionLabel") ?? "").trim(),
    visionText: String(formData.get("visionText") ?? "").trim(),
    missionLabel: String(formData.get("missionLabel") ?? "").trim(),
    missionText: String(formData.get("missionText") ?? "").trim(),
    contactIntro: String(formData.get("contactIntro") ?? "").trim(),
    cvMediaUrl: String(formData.get("cvMediaUrl") ?? "").trim() || null,
    portfolioMediaUrl:
      String(formData.get("portfolioMediaUrl") ?? "").trim() || null,
  });

  revalidatePath("/admin/texts");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/resume");
  redirect("/admin/texts");
}
