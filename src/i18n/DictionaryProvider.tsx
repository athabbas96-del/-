"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { localeDir, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function DictionaryProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  // The [locale] layout's inline script only runs on a hard load (native
  // <script> execution), so it can't fix <html> on client-side transitions
  // between locales — this effect re-syncs lang/dir on every one of those.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDir[locale];
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

/** For Client Components nested under [locale]/layout.tsx. */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within DictionaryProvider");
  }
  return ctx;
}
