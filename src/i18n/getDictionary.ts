import "server-only";
import type { Locale } from "@/i18n/config";

export type Dictionary = typeof import("./dictionaries/en.json");

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

/**
 * Each locale's JSON is its own webpack/Turbopack chunk, so a request for
 * "/ar/..." never pulls the English dictionary (or vice versa) into the
 * bundle — lazy per-locale loading, not an all-locales-at-once import.
 */
export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
