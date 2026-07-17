import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

interface BuildMetadataOptions {
  locale?: Locale;
  title?: string;
  description?: string;
  /** Locale-relative path, e.g. "/about" (no locale prefix). */
  path?: string;
  image?: string;
}

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_SA",
};

export function buildMetadata({
  locale = defaultLocale,
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
}: BuildMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
  const url = new URL(localizedPath, siteConfig.url).toString();

  const languages: Record<string, string> = {};
  for (const entry of locales) {
    const entryPath = path === "/" ? `/${entry}` : `/${entry}${path}`;
    languages[entry] = new URL(entryPath, siteConfig.url).toString();
  }
  languages["x-default"] = new URL(
    path === "/" ? `/${defaultLocale}` : `/${defaultLocale}${path}`,
    siteConfig.url,
  ).toString();

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url, languages },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image }],
      locale: ogLocaleMap[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}
