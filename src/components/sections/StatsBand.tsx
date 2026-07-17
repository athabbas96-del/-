import { Section } from "@/components/ui/Section";
import { MetricsRow } from "@/components/ui/MetricsRow";
import { stats } from "@/content/about";

export function StatsBand() {
  return (
    <Section className="bg-surface">
      <MetricsRow metrics={stats} />
    </Section>
  );
}
