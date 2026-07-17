"use client";

import {
  Palette,
  Target,
  Clapperboard,
  BrainCircuit,
  Gem,
  Handshake,
  Lightbulb,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Card, type cardVariants } from "@/components/ui/Card";
import { fadeInUp, EASE_OUT_EXPO } from "@/lib/motion";
import type { FeatureItem } from "@/types";
import type { VariantProps } from "class-variance-authority";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Target,
  Clapperboard,
  BrainCircuit,
  Gem,
  Handshake,
  Lightbulb,
  ShieldCheck,
};

interface FeatureCardProps extends FeatureItem {
  cardVariant?: VariantProps<typeof cardVariants>["variant"];
}

export function FeatureCard({
  icon,
  title,
  description,
  cardVariant = "surface",
}: FeatureCardProps) {
  const IconComponent = iconMap[icon] ?? Palette;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      className="h-full"
    >
      <Card variant={cardVariant} className="flex h-full flex-col">
        <Icon icon={IconComponent} size="lg" className="text-accent" />
        <h3 className="text-foreground mt-4 text-lg font-semibold">{title}</h3>
        <p className="text-muted mt-2 text-sm">{description}</p>
      </Card>
    </motion.div>
  );
}
