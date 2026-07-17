import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { StatsBand } from "@/components/sections/StatsBand";
import { Timeline } from "@/components/sections/Timeline";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { listServices } from "@/lib/repo/services";
import { getSettings } from "@/lib/repo/settings";
import { getDictionary } from "@/i18n/getDictionary";
import {
  localizedHref,
  isLocale,
  defaultLocale,
  type Locale,
} from "@/i18n/config";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    path: "/about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const services = listServices();
  const settings = getSettings();

  return (
    <main className="flex flex-1 flex-col">
      <AboutIntro copy={settings} />
      <StatsBand />
      <Timeline dict={dict} />
      <ExpertiseGrid services={services} />
      <ValuesGrid />
      <CtaBand
        title={dict.common.ctaTitle}
        description={dict.common.ctaDescription}
        ctaLabel={dict.common.startConversation}
        ctaHref={localizedHref(locale, "/contact")}
      />
    </main>
  );
}
