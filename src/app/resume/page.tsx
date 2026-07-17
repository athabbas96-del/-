import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ResumeShowcase } from "@/components/sections/ResumeShowcase";

export const metadata: Metadata = buildMetadata({
  title: "Interactive Resume",
  description:
    "A 30-second video walkthrough of seven years of brand identity, packaging, and content work, plus a downloadable CV and portfolio.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <main className="flex flex-1 flex-col">
      <ResumeShowcase />
    </main>
  );
}
