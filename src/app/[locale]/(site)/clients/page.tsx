import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { LogoWall } from "@/components/ui/LogoWall";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { testimonials } from "@/content/clients";
import { listClients } from "@/lib/repo/clients";
import { listProjects } from "@/lib/repo/projects";
import { getDictionary } from "@/i18n/getDictionary";
import {
  localizedHref,
  isLocale,
  defaultLocale,
  type Locale,
} from "@/i18n/config";

interface ClientsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ClientsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.clients.title,
    description: dict.meta.clients.description,
    path: "/clients",
  });
}

export default async function ClientsPage({ params }: ClientsPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const clients = listClients();
  const featuredProjects = listProjects().filter((project) => project.featured);

  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-navy">
        <Section as="header" className="pb-10">
          <Container className="text-center">
            <EnterReveal>
              <span className="text-accent-violet font-mono text-xs tracking-[0.15em] uppercase">
                {dict.clients.eyebrow}
              </span>
              <h1 className="text-display-sm mx-auto mt-4 max-w-[22ch] leading-[1.05] font-medium tracking-tight text-white">
                {dict.clients.heading}
              </h1>
              <p className="mx-auto mt-6 max-w-[55ch] text-base text-white/70 sm:text-lg">
                {dict.clients.description}
              </p>
            </EnterReveal>
          </Container>
        </Section>

        <div className="pb-10">
          <LogoMarquee clients={clients} />
        </div>

        <Section className="pt-0">
          <LogoWall clients={clients} />
        </Section>
      </div>

      <Section>
        <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
          {dict.clients.successStoriesEyebrow}
        </span>
        <h2 className="text-foreground mt-4 max-w-[22ch] text-2xl font-medium tracking-tight sm:text-3xl">
          {dict.clients.successStoriesHeading}
        </h2>
        <div className="mt-10">
          <SuccessStories projects={featuredProjects} />
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section className="bg-surface">
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            {dict.clients.testimonialsEyebrow}
          </span>
          <div className="mt-10">
            <TestimonialsSection testimonials={testimonials} />
          </div>
        </Section>
      )}

      <CtaBand
        title={dict.clients.ctaTitle}
        description={dict.clients.ctaDescription}
        ctaLabel={dict.common.startConversation}
        ctaHref={localizedHref(locale, "/contact")}
      />
    </main>
  );
}
