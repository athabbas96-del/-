import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { listProjects } from "@/lib/repo/projects";
import { getDictionary } from "@/i18n/getDictionary";
import {
  localizedHref,
  isLocale,
  defaultLocale,
  type Locale,
} from "@/i18n/config";

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.work.title,
    description: dict.meta.work.description,
    path: "/work",
  });
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const projects = listProjects();

  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            {dict.work.eyebrow}
          </span>
          <h1 className="text-display-sm text-foreground mt-4 max-w-[22ch] leading-[1.05] font-medium tracking-tight">
            {dict.work.heading}
          </h1>
          <p className="text-muted mt-6 max-w-[60ch] text-base sm:text-lg">
            {dict.work.description}
          </p>
        </EnterReveal>
      </Section>

      <Section>
        <WorkGallery projects={projects} dict={dict} />
      </Section>

      <CtaBand
        title={dict.work.ctaTitle}
        description={dict.work.ctaDescription}
        ctaLabel={dict.common.startConversation}
        ctaHref={localizedHref(locale, "/contact")}
      />
    </main>
  );
}
