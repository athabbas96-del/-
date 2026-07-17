import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSettings } from "@/lib/repo/settings";
import { getDictionary } from "@/i18n/getDictionary";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const settings = getSettings();

  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            {dict.contact.eyebrow}
          </span>
          <h1 className="text-display-sm text-foreground mt-4 max-w-[20ch] leading-[1.05] font-medium tracking-tight">
            {dict.contact.heading}
          </h1>
          <p className="text-muted mt-6 max-w-[55ch] text-base sm:text-lg">
            {settings.contactIntro}
          </p>
        </EnterReveal>
      </Section>

      <Section>
        <ContactSection />
      </Section>
    </main>
  );
}
