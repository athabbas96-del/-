"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxProps {
  children: ReactNode;
  distance?: number;
  className?: string;
}

export function Parallax({
  children,
  distance = 80,
  className,
}: ParallaxProps) {
  const { ref, y } = useParallax<HTMLDivElement>({ distance });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
