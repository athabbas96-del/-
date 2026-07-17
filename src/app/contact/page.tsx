import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a conversation about your brand — form, WhatsApp, email, LinkedIn, and Instagram.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            Contact
          </span>
          <h1 className="text-display-sm text-foreground mt-4 max-w-[20ch] leading-[1.05] font-medium tracking-tight">
            Tell me about your brand
          </h1>
          <p className="text-muted mt-6 max-w-[55ch] text-base sm:text-lg">
            Fill out the form or reach out directly — WhatsApp is fastest, email
            works too. I usually reply within a day or two.
          </p>
        </EnterReveal>
      </Section>

      <Section>
        <ContactSection />
      </Section>
    </main>
  );
}
