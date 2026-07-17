import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { LogoWall } from "@/components/ui/LogoWall";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { clients, testimonials } from "@/content/clients";
import { projects } from "@/content/projects";

export const metadata: Metadata = buildMetadata({
  title: "Clients",
  description:
    "Fifteen brands across coffee, fashion, wellness, and hospitality — and the case studies behind a few of them.",
  path: "/clients",
});

export default function ClientsPage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main className="flex flex-1 flex-col">
      <div className="bg-navy">
        <Section as="header" className="pb-10">
          <Container className="text-center">
            <span className="text-accent-blue font-mono text-xs tracking-[0.15em] uppercase">
              Clients
            </span>
            <h1 className="text-display-sm mx-auto mt-4 max-w-[22ch] leading-[1.05] font-medium tracking-tight text-white">
              Fifteen brands, one throughline
            </h1>
            <p className="mx-auto mt-6 max-w-[55ch] text-base text-white/70 sm:text-lg">
              Cafés, clinics, fashion labels, and agencies across Saudi Arabia —
              each partnered with for the long run, not a single logo drop.
            </p>
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
          Success Stories
        </span>
        <h2 className="text-foreground mt-4 max-w-[22ch] text-2xl font-medium tracking-tight sm:text-3xl">
          A few of the partnerships behind the wall
        </h2>
        <div className="mt-10">
          <SuccessStories projects={featuredProjects} />
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section className="bg-surface">
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            Testimonials
          </span>
          <div className="mt-10">
            <TestimonialsSection testimonials={testimonials} />
          </div>
        </Section>
      )}

      <CtaBand
        title="Ready to join the wall?"
        description="Every partnership starts the same way — a conversation about what your brand actually needs."
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
      />
    </main>
  );
}
