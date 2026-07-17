"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/DictionaryProvider";
import { cn } from "@/lib/utils";

const LOCALE_COOKIE = "NEXT_LOCALE";

function pathWithLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = nextLocale;
  return segments.join("/") || "/";
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useI18n();
  const pathname = usePathname() ?? "/";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {locales.map((entry) => (
        <Link
          key={entry}
          href={pathWithLocale(pathname, entry)}
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=${entry};path=/;max-age=31536000;samesite=lax`;
          }}
          aria-current={entry === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-xs uppercase transition-colors",
            entry === locale
              ? "bg-accent text-white"
              : "text-white/60 hover:text-white",
          )}
        >
          {entry}
        </Link>
      ))}
      <span className="sr-only">
        {locales.map((entry) => localeLabel[entry]).join(" / ")}
      </span>
    </div>
  );
}
