"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Module-level flag: the loading screen should only play once per hard
 * page load, not on every RootProviders mount within the same session.
 */
let hasPlayed = false;

export function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [dismissed, setDismissed] = useState(hasPlayed);

  useEffect(() => {
    if (hasPlayed) return;
    hasPlayed = true;

    const timer = setTimeout(() => setDismissed(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const visible = !dismissed && !prefersReducedMotion;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="bg-navy pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.15em" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
              className="font-mono text-sm text-white uppercase"
            >
              Atheer Abbas
            </motion.span>
            <div className="relative h-px w-32 overflow-hidden bg-white/15">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
                className="bg-accent-violet absolute inset-0"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
