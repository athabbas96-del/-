import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { buttonVariants } from "@/components/ui/button-variants";
import en from "@/i18n/dictionaries/en.json";

// Next.js renders not-found.tsx without route params, so the locale of the
// page that triggered it isn't reliably available here — this falls back
// to English rather than guessing.
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Section className="text-center">
        <h1 className="text-display-sm text-foreground font-medium tracking-tight">
          {en.notFound.heading}
        </h1>
        <p className="text-muted mx-auto mt-4 max-w-[45ch] text-base">
          {en.notFound.description}
        </p>
        <Link
          href="/"
          className={`${buttonVariants({ variant: "accent" })} mt-8 inline-flex`}
        >
          {en.notFound.cta}
        </Link>
      </Section>
    </main>
  );
}
