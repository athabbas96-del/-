"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";

/* ---------- شاشة البداية: شعار ثاء على بنفسجي سائل، قصيرة ---------- */
export function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 150 : 1400);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="satin fixed inset-0 z-[100] grid place-items-center"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          aria-hidden
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image src="/brand/logo-white.png" alt="" width={72} height={88} priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- شريط التنقل ---------- */
export function Navbar() {
  const { t, bi, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#home", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#journey", label: t.nav.journey },
    { href: "/#work", label: t.nav.work },
    { href: "/#services", label: t.nav.services },
    { href: "/#partners", label: t.nav.partners },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ink/90 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/#home" className="flex items-center gap-3" aria-label={bi(t.nav.home)}>
          <Image src="/brand/logo-white.png" alt="شعار ثاء — أثير" width={30} height={37} />
          <span dir="ltr" className="hidden font-serif text-sm tracking-widest2 text-paper sm:block">
            ATHEER
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-paper/85 transition-colors hover:text-paper"
              >
                {bi(l.label)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="rounded-full border border-paper/40 px-3 py-1 text-xs text-paper transition-colors hover:bg-paper hover:text-ink"
            aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {lang === "ar" ? "English" : "عربي"}
          </button>
          <button
            className="md:hidden text-paper"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={lang === "ar" ? "القائمة" : "Menu"}
          >
            <span className="block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-paper/10 bg-ink px-5 pb-5 pt-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 text-paper/90"
              >
                <span className="diamond !w-1.5 !h-1.5" aria-hidden />
                {bi(l.label)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
