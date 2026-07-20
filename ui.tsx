"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useLang, Bi } from "@/lib/i18n";

/** ظهور تدريجي هادئ عند التمرير — يحترم prefers-reduced-motion */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** القفل الثنائي: عنوان إنجليزي سيريف فوق عنوان عربي سانس — لا يختلطان في سطر */
export function Lockup({
  en,
  ar,
  dark = false,
  align = "center",
}: {
  en: string;
  ar: string;
  dark?: boolean;
  align?: "center" | "start";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={`flex flex-col gap-2 ${alignCls}`}>
      <span
        dir="ltr"
        className={`font-serif text-4xl sm:text-5xl md:text-6xl tracking-[0.12em] ${
          dark ? "text-paper" : "text-night"
        }`}
      >
        {en}
      </span>
      <span
        dir="rtl"
        className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wide ${
          dark ? "text-paper/85" : "text-violet"
        }`}
      >
        {ar}
      </span>
    </div>
  );
}

/** عنوان قسم محاط بمعيّنين — مثل جدار الشركاء في الملف */
export function DiamondTitle({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${dark ? "text-paper" : "text-ink"}`}>
      <span className="diamond" aria-hidden />
      <div>{children}</div>
      <span className="diamond" aria-hidden />
    </div>
  );
}

/** النجمة الرباعية المفرغة — السجل الأنعم للمعيّن */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`sparkle ${className}`} aria-hidden fill="none">
      <path
        d="M50 4 C54 32 68 46 96 50 C68 54 54 68 50 96 C46 68 32 54 4 50 C32 46 46 32 50 4 Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/** نص ثنائي سريع */
export function T({ v }: { v: Bi }) {
  const { bi } = useLang();
  return <>{bi(v)}</>;
}
