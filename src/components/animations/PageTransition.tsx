"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { useI18n } from "@/i18n/DictionaryProvider";
import { localizedHref } from "@/i18n/config";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { locale } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const isHome = pathname === localizedHref(locale, "/");

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        exit={prefersReducedMotion ? "visible" : "exit"}
        variants={pageTransition}
        className={`flex flex-1 flex-col ${isHome ? "" : "pt-20"}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
