"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { staggerChildren, viewportOnce } from "@/lib/motion";
import { expertise } from "@/content/about";

export function ExpertiseGrid() {
  return (
    <Section className="bg-surface">
      <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
        Expertise
      </span>
      <h2 className="text-foreground mt-4 max-w-[20ch] text-2xl font-medium tracking-tight sm:text-3xl">
        Four disciplines, one practice
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren()}
        className="mt-12"
      >
        <Grid cols={4}>
          {expertise.map((item) => (
            <FeatureCard key={item.title} {...item} cardVariant="elevated" />
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
}
