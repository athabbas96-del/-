"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Grid } from "@/components/ui/Grid";
import { Icon } from "@/components/ui/Icon";
import {
  fadeInUp,
  viewportOnce,
  staggerChildren,
  EASE_OUT_EXPO,
} from "@/lib/motion";
import { localizedHref } from "@/i18n/config";
import { useI18n } from "@/i18n/DictionaryProvider";
import type { Project } from "@/types";

interface SuccessStoriesProps {
  projects: Project[];
}

export function SuccessStories({ projects }: SuccessStoriesProps) {
  const { locale } = useI18n();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerChildren()}
    >
      <Grid cols={2}>
        {projects.map((project) => {
          const headline = project.metrics[0];
          return (
            <motion.div key={project.slug} variants={fadeInUp}>
              <Link
                href={localizedHref(locale, `/work/${project.slug}`)}
                className="group block"
              >
                <div className="bg-surface relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)]">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="h-full w-full"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.coverAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </motion.div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
                      {project.client}
                    </span>
                    <h3 className="text-foreground mt-1 flex items-center gap-1.5 text-lg font-semibold">
                      {project.title}
                      <Icon
                        icon={ArrowUpRight}
                        size="sm"
                        className="text-muted group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </h3>
                  </div>
                  {headline && (
                    <div className="shrink-0 text-right">
                      <div className="text-foreground text-2xl font-medium tabular-nums">
                        {headline.value}
                        {headline.suffix}
                      </div>
                      <div className="text-muted text-xs">{headline.label}</div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </Grid>
    </motion.div>
  );
}
