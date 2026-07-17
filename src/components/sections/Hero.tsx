"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/motion";

const AuroraBackground = dynamic(
  () => import("@/components/three/AuroraBackground"),
  {
    ssr: false,
  },
);

const ROLE_INTERVAL = 2400;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

interface HeroProps {
  name: string;
  roles: string[];
  badge: string;
}

export function Hero({ name, roles, badge }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, ROLE_INTERVAL);
    return () => clearInterval(id);
  }, [roles.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={(event) => {
        mouseX.set(event.clientX / window.innerWidth - 0.5);
        mouseY.set(event.clientY / window.innerHeight - 0.5);
      }}
      className="bg-navy relative flex h-svh min-h-[720px] w-full items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : bgY,
          x: prefersReducedMotion ? 0 : parallaxX,
        }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 20%, #16213d 0%, #0b1220 55%, #060a14 100%)",
          }}
        />
        {!prefersReducedMotion && <AuroraBackground />}
        <div className="from-navy to-navy/40 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent" />
      </motion.div>

      {!prefersReducedMotion && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
          style={{ transformOrigin: "bottom" }}
          className="bg-navy absolute inset-0 z-30"
        />
      )}

      <motion.div
        style={{
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          y: prefersReducedMotion ? 0 : parallaxY,
        }}
        className="relative z-10"
      >
        <Container className="flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.span
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs tracking-[0.15em] text-white/70 uppercase"
            >
              {badge}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-display-lg leading-[0.95] font-medium tracking-tight text-white"
            >
              {name}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-5 flex h-8 items-center sm:h-9"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="text-accent-blue block text-lg font-medium sm:text-xl"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton>
                <Link
                  href="/work"
                  className={buttonVariants({ variant: "accent", size: "lg" })}
                >
                  View Work
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-xs)] border border-white/25 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
                >
                  Let&rsquo;s Talk
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        style={{ opacity: prefersReducedMotion ? 1 : cueOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon icon={ArrowDown} size="sm" />
        </motion.div>
      </motion.div>
    </section>
  );
}
