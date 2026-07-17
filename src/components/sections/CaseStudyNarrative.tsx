import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";

interface NarrativeStep {
  label: string;
  text: string;
}

interface CaseStudyNarrativeProps {
  steps: NarrativeStep[];
}

export function CaseStudyNarrative({ steps }: CaseStudyNarrativeProps) {
  return (
    <div className="flex flex-col gap-10">
      {steps.map((step, index) => (
        <Reveal key={step.label} variants={fadeInUp} delay={index * 0.05}>
          <div className="border-border grid gap-3 border-t pt-8 first:border-t-0 first:pt-0 sm:grid-cols-[180px_1fr] sm:gap-10">
            <span className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              {step.label}
            </span>
            <p className="text-foreground max-w-[65ch] text-base leading-relaxed sm:text-lg">
              {step.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
