"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, EASE_OUT_EXPO } from "@/lib/motion";
import { Badge } from "@/components/ui/Badge";
import { localizedHref } from "@/i18n/config";
import { useI18n } from "@/i18n/DictionaryProvider";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale, dict } = useI18n();
  const categoryLabel = dict.workCategories[project.category];
  return (
    <motion.div
      layout
      variants={fadeInUp}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      className="group"
    >
      <Link
        href={localizedHref(locale, `/work/${project.slug}`)}
        className="block"
      >
        <div className="bg-surface relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="h-full w-full"
          >
            <Image
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </motion.div>
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/5 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-mono text-[11px] tracking-[0.12em] text-white/70 uppercase">
              {categoryLabel}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between sm:hidden">
          <h3 className="text-foreground text-base font-semibold">
            {project.title}
          </h3>
          <Badge variant="neutral">{categoryLabel}</Badge>
        </div>
      </Link>
    </motion.div>
  );
}
