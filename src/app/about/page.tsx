import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { StatsBand } from "@/components/sections/StatsBand";
import { Timeline } from "@/components/sections/Timeline";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Seven years from freelance designer in Jazan to creative marketing strategist and AI consultant — the story, the values, and the journey.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AboutIntro />
      <StatsBand />
      <Timeline />
      <ExpertiseGrid />
      <ValuesGrid />
      <CtaBand
        title="Have a brand that needs this?"
        description="From a single identity to a full campaign — let's talk about what your brand needs next."
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
      />
    </main>
  );
}
