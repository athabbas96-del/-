"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

export function CustomCursor() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const active = mounted && isFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setIsHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const handleDown = () => setIsPointerDown(true);
    const handleUp = () => setIsPointerDown(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: springX, y: springY }}
        animate={{
          scale: isPointerDown ? 0.7 : isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.15 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="bg-accent pointer-events-none fixed top-0 left-0 z-[90] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
        className="border-accent pointer-events-none fixed top-0 left-0 z-[90] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference"
      />
    </>
  );
}
