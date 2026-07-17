import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { projects } from "@/content/projects";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Brand identity, printing and packaging, and social media work — case studies from seven years of design practice.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            Work
          </span>
          <h1 className="text-display-sm text-foreground mt-4 max-w-[22ch] leading-[1.05] font-medium tracking-tight">
            Identity, packaging, and content that ships
          </h1>
          <p className="text-muted mt-6 max-w-[60ch] text-base sm:text-lg">
            A selection of brand identity, printing and packaging, and social
            media work built for cafés, fashion labels, clinics, and agencies
            across Saudi Arabia.
          </p>
        </EnterReveal>
      </Section>

      <Section>
        <WorkGallery projects={projects} />
      </Section>

      <CtaBand
        title="See something close to your brand?"
        description="Every project starts the same way — a conversation about what the brand actually needs."
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
      />
    </main>
  );
}
