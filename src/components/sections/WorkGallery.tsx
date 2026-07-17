"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid } from "@/components/ui/Grid";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { categories } from "@/content/projects";
import { staggerChildren, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";

interface WorkGalleryProps {
  projects: Project[];
}

type FilterValue = "all" | ProjectCategory;

export function WorkGallery({ projects }: WorkGalleryProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [projects, filter],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterPill>
        {categories.map((category) => (
          <FilterPill
            key={category.slug}
            active={filter === category.slug}
            onClick={() => setFilter(category.slug)}
          >
            {category.label}
          </FilterPill>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren()}
      >
        <Grid cols={3}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </Grid>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-muted py-16 text-center text-sm">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent text-white"
          : "border-border text-foreground hover:bg-surface",
      )}
    >
      {children}
    </button>
  );
}
