"use client";

import { useRef, type RefObject } from "react";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

interface UseParallaxOptions {
  /** Pixel distance the element travels over the scroll range. Positive = moves down slower (drifts up as you scroll past it). */
  distance?: number;
  /** Framer Motion scroll offset tuple — see useScroll docs. */
  offset?: UseScrollOptions["offset"];
}

/**
 * Scroll-linked parallax for any element: attach `ref` to the element and
 * apply the returned `y` motion value to a `style={{ y }}`. Distance is in
 * px of drift across the element's scroll-through range.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {},
): { ref: RefObject<T | null>; y: MotionValue<number> } {
  const { distance = 80, offset = ["start end", "end start"] } = options;
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-distance, distance],
  );

  return { ref, y };
}
