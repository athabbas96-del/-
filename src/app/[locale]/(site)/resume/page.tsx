import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ResumeShowcase } from "@/components/sections/ResumeShowcase";
import { getSettings } from "@/lib/repo/settings";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ResumePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.resume.title,
    description: dict.meta.resume.description,
    path: "/resume",
  });
}

export default function ResumePage() {
  const settings = getSettings();

  return (
    <main className="flex flex-1 flex-col">
      <ResumeShowcase
        cvUrl={settings.cvMediaUrl}
        portfolioUrl={settings.portfolioMediaUrl}
      />
    </main>
  );
}
