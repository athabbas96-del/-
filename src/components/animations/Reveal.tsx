"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeInUp, viewportOnce, DURATION, EASE_OUT_EXPO } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

/**
 * Standard scroll-reveal wrapper. Use this instead of ad-hoc
 * whileInView props so every section animates in with the same
 * easing/duration/viewport rules.
 */
export function Reveal({
  children,
  variants = fadeInUp,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={
        delay
          ? { delay, duration: DURATION.base, ease: EASE_OUT_EXPO }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
