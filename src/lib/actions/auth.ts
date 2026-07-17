"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return {
      error: "Admin credentials are not configured (missing env vars).",
    };
  }
  if (username !== expectedUsername) {
    return { error: "Invalid username or password." };
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return { error: "Invalid username or password." };
  }

  await setSessionCookie(username);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}
