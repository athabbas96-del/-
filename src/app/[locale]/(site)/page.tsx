import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { getSettings } from "@/lib/repo/settings";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return buildMetadata({ locale });
}

export default function Home() {
  const settings = getSettings();

  return (
    <main className="flex flex-1 flex-col">
      <Hero
        name={settings.heroName}
        roles={settings.heroRoles}
        badge={settings.heroBadge}
      />
    </main>
  );
}
