import { Section } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";
import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stats } from "@/content/about";

export function StatsBand() {
  return (
    <Section className="bg-surface">
      <Grid cols={4}>
        {stats.map((stat, index) => (
          <Reveal key={stat.label} variants={fadeInUp} delay={index * 0.08}>
            <div className="flex flex-col items-center gap-2 text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-display-sm text-foreground font-medium tabular-nums"
              />
              <span className="text-muted text-sm">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}
