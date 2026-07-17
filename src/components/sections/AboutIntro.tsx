import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp, fadeInDown } from "@/lib/motion";
import type { SiteSettingsRecord } from "@/lib/repo/types";

interface AboutIntroProps {
  copy: Pick<
    SiteSettingsRecord,
    | "aboutEyebrow"
    | "aboutHeading"
    | "aboutStory"
    | "visionLabel"
    | "visionText"
    | "missionLabel"
    | "missionText"
  >;
}

export function AboutIntro({ copy }: AboutIntroProps) {
  return (
    <Section as="header">
      <Reveal variants={fadeInDown}>
        <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
          {copy.aboutEyebrow}
        </span>
      </Reveal>

      <Reveal variants={fadeInUp} delay={0.05}>
        <h1 className="text-display-sm text-foreground mt-4 max-w-[20ch] leading-[1.05] font-medium tracking-tight">
          {copy.aboutHeading}
        </h1>
      </Reveal>

      <div className="mt-10 flex max-w-[68ch] flex-col gap-5">
        {copy.aboutStory.map((paragraph, index) => (
          <Reveal key={index} variants={fadeInUp} delay={0.1 + index * 0.08}>
            <p className="text-muted text-base leading-relaxed sm:text-lg">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Reveal variants={fadeInUp} delay={0.15}>
          <div className="border-border border-t pt-5">
            <span className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              {copy.visionLabel}
            </span>
            <p className="text-foreground mt-3 text-base">{copy.visionText}</p>
          </div>
        </Reveal>
        <Reveal variants={fadeInUp} delay={0.22}>
          <div className="border-border border-t pt-5">
            <span className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              {copy.missionLabel}
            </span>
            <p className="text-foreground mt-3 text-base">{copy.missionText}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
