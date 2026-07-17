"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { staggerChildren, viewportOnce } from "@/lib/motion";
import { values } from "@/content/about";

export function ValuesGrid() {
  return (
    <Section>
      <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
        Values
      </span>
      <h2 className="text-foreground mt-4 max-w-[20ch] text-2xl font-medium tracking-tight sm:text-3xl">
        What doesn&rsquo;t change from brief to brief
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren()}
        className="mt-12"
      >
        <Grid cols={4}>
          {values.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
}
