"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { site, services, tools } from "@/data/site";
import { Reveal, Sparkle } from "./ui";

/* ---------- 3. الواجهة الرئيسية ---------- */
export function Hero() {
  const { t, bi } = useLang();
  return (
    <section id="home" className="satin relative flex min-h-[100svh] flex-col justify-center px-5 text-paper">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 pt-24 text-center">
        <Reveal>
          <p className="text-sm tracking-[0.3em] text-paper/70">{bi(t.hero.role)}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="flex flex-col items-center gap-3">
            <span dir="ltr" className="font-serif text-5xl tracking-[0.14em] sm:text-7xl md:text-8xl">
              ATHEER HAMZA
            </span>
            <span className="text-2xl font-light tracking-[0.2em] sm:text-3xl">أثـيــر حــمــزة</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-xl text-base leading-8 text-paper/85 sm:text-lg">
            {bi(t.hero.tagline)} — {bi(t.hero.sub)}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#work"
              className="rounded-full bg-paper px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              {bi(t.hero.ctaWork)}
            </Link>
            <a
              href={site.cvPath}
              download
              className="rounded-full border border-paper/50 px-7 py-3 text-sm text-paper transition-colors hover:bg-paper/10"
            >
              {bi(t.hero.ctaCv)}
            </a>
          </div>
        </Reveal>
      </div>

      {/* مؤشر التمرير — معيّن */}
      <div className="absolute bottom-7 inset-x-0 flex flex-col items-center gap-2 text-paper/70">
        <span className="text-[11px] tracking-[0.25em]">{bi(t.hero.scroll)}</span>
        <span className="diamond diamond-pulse" aria-hidden />
      </div>
    </section>
  );
}

/* ---------- 4. بيان الترحيب ---------- */
export function Welcome() {
  const { t, bi, lang } = useLang();
  const title = bi(t.welcome.title);
  const items = [
    bi(services[0].title),
    bi(services[1].title),
    bi(services[2].title),
    bi(services[3].title),
  ];
  const tickerItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-ground py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 flex items-start justify-between">
          <Image src="/brand/logo-purple.png" alt="ثاء — ATHEER" width={86} height={76} />
          <Image src="/brand/ornament.png" alt="" width={130} height={44} aria-hidden />
        </div>

        <Reveal>
          <h2
            className="echo text-center text-3xl font-bold leading-snug text-night sm:text-5xl md:text-6xl"
            data-echo={title}
          >
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center leading-9 text-violet">
            {bi(t.welcome.body)}
          </p>
        </Reveal>
      </div>

      {/* شريط الخدمات */}
      <div className="ticker mt-16 border-y border-violet/20 py-4 text-violet" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="ticker-track">
          {tickerItems.map((s, i) => (
            <span key={i} className="flex items-center gap-6 text-sm font-bold sm:text-base">
              <span className="diamond !w-2 !h-2" aria-hidden />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. عنّي ---------- */
export function About() {
  const { t, bi } = useLang();
  const pills = [t.about.pills.exp, t.about.pills.field, t.about.pills.loc, t.about.pills.edu];

  return (
    <section id="about" className="satin py-24 text-paper sm:py-32">
      <div className="relative mx-auto max-w-5xl px-5">
        <Sparkle className="absolute -top-6 start-2 !h-14 !w-14 text-paper/50" />
        <Sparkle className="absolute bottom-0 end-4 !h-10 !w-10 text-paper/30" />

        <Reveal>
          <h2 className="text-3xl font-bold sm:text-5xl">{bi(t.about.kicker)}</h2>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal delay={0.1}>
              <p className="border-s-2 border-paper/60 ps-5 text-lg leading-9 text-paper/90">
                {bi(t.about.bio)}
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-3">
              {pills.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.07}>
                  <span className="inline-block w-fit rounded-full bg-paper px-6 py-2.5 text-sm font-bold text-night sm:text-base">
                    {bi(p)}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6">
            <Reveal delay={0.2}>
              <p className="font-light italic leading-8 text-paper/70">«{bi(t.about.quote)}»</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div>
                <p className="mb-3 text-sm font-bold text-paper/80">{bi(t.about.tools)}:</p>
                <ul className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <li
                      key={tool}
                      dir="ltr"
                      className="rounded border border-paper/30 px-3 py-1.5 text-xs tracking-wide text-paper/85"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <p className="mt-4 text-sm text-paper/50">{bi(t.hero.tagline)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
