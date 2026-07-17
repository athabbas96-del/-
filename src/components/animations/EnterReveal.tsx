"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeInBlur } from "@/lib/motion";

interface EnterRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
}

/**
 * Above-the-fold counterpart to Reveal: animates in immediately on mount
 * instead of on scroll-into-view. Use this for page headers and hero
 * content that's visible without scrolling — whileInView reveals can miss
 * their viewport margin on short screens and never fire.
 */
export function EnterReveal({
  children,
  variants = fadeInBlur,
  className,
}: EnterRevealProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
