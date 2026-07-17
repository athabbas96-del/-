import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CtaBand({
  title,
  description,
  ctaLabel,
  ctaHref,
}: CtaBandProps) {
  return (
    <Section className="bg-navy">
      <Reveal
        variants={fadeInUp}
        className="flex flex-col items-center gap-6 text-center"
      >
        <h2 className="max-w-[22ch] text-2xl font-medium tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-[50ch] text-base text-white/70">{description}</p>
        )}
        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "accent", size: "lg" }),
            "shadow-glow",
          )}
        >
          {ctaLabel}
        </Link>
      </Reveal>
    </Section>
  );
}
