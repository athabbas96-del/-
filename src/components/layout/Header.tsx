"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { buttonVariants } from "@/components/ui/button-variants";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { navItems, siteConfig } from "@/config/site";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Header() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  // The transparent-over-hero look only makes sense on the home page,
  // where the section behind the header is dark. Every other page has a
  // light background, so the header needs a solid backing there always —
  // otherwise white nav text disappears against a white page.
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 1.4 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "bg-navy/80 border-b border-white/10 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm tracking-[0.1em] text-white uppercase"
            onClick={() => setMenuOpen(false)}
          >
            {siteConfig.author.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-1 text-sm text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                  <span
                    className={`bg-accent-blue absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <MagneticButton>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "accent", size: "sm" })}
              >
                Let&rsquo;s Talk
              </Link>
            </MagneticButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          >
            <Icon icon={menuOpen ? X : Menu} size="md" />
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="bg-navy fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                  delay: prefersReducedMotion ? 0 : 0.08 * index,
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium text-white"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
