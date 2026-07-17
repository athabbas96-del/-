import "server-only";
import { cookies } from "next/headers";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/getDictionary";

/**
 * Admin dashboard locale is a simple cookie toggle (no /en /ar URL prefix —
 * it isn't indexed, so it doesn't need locale-prefixed routes/hreflang).
 */
export async function getAdminDictionary(): Promise<{
  locale: Locale;
  dict: Dictionary;
}> {
  const store = await cookies();
  const raw = store.get("ADMIN_LOCALE")?.value ?? defaultLocale;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  return { locale, dict };
}
