import { notFound } from "next/navigation";
import { locales, localeDir, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const dir = localeDir[locale as Locale];

  return (
    <DictionaryProvider locale={locale as Locale} dict={dict}>
      {/*
        The root layout renders a static, locale-neutral <html lang="en"
        dir="ltr"> so every page stays static-generation-friendly (no
        cookies()/headers() read at the root). This inline script corrects
        the real document attributes before first paint — the same
        no-FOUC pattern used for theme/dark-mode scripts — so Arabic pages
        never flash LTR before flipping to RTL.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};document.documentElement.dir=${JSON.stringify(dir)};`,
        }}
      />
      {children}
    </DictionaryProvider>
  );
}
