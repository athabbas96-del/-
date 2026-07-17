import { Grid } from "@/components/ui/Grid";
import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { Stat } from "@/types";

interface MetricsRowProps {
  metrics: Stat[];
}

const colsForCount: Record<number, 1 | 2 | 3 | 4> = { 1: 1, 2: 2, 3: 3 };

export function MetricsRow({ metrics }: MetricsRowProps) {
  const cols = colsForCount[metrics.length] ?? 4;

  return (
    <Grid cols={cols}>
      {metrics.map((stat, index) => (
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
  );
}
