import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp, fadeInDown } from "@/lib/motion";
import { timeline } from "@/content/timeline";

export function Timeline() {
  return (
    <Section>
      <Reveal variants={fadeInDown}>
        <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
          Journey
        </span>
        <h2 className="text-foreground mt-4 max-w-[18ch] text-2xl font-medium tracking-tight sm:text-3xl">
          Seven years, one throughline
        </h2>
      </Reveal>

      <div className="relative mt-14">
        <div className="bg-border absolute start-2 top-1 bottom-1 w-px" />
        <div className="flex flex-col gap-10">
          {timeline.map((item, index) => (
            <Reveal
              key={item.year}
              variants={fadeInUp}
              delay={(index % 4) * 0.06}
            >
              <div className="relative ps-10">
                <span className="border-accent bg-background absolute start-0 top-1 h-4 w-4 rounded-full border-2" />
                <span className="text-accent font-mono text-xs">
                  {item.year}
                </span>
                <h3 className="text-foreground mt-1 text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted mt-2 max-w-[60ch] text-sm">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
