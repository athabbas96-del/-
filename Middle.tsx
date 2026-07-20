"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { cv, partners, services, site } from "@/data/site";
import { DiamondTitle, Lockup, Reveal } from "./ui";

/* ---------- 6. السيرة الذاتية — رحلتي المهنية ---------- */
export function Journey() {
  const { t, bi } = useLang();

  return (
    <section id="journey" className="bg-ground py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <Lockup en="MY JOURNEY" ar={bi(t.journey.title)} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-center text-violet">{bi(t.journey.sub)}</p>
        </Reveal>

        {/* الهدف الوظيفي */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-paper p-7 shadow-sm">
            <h3 className="mb-3 flex items-center gap-3 font-bold text-ink">
              <span className="diamond !w-2 !h-2" aria-hidden /> {bi(t.journey.objective)}
            </h3>
            <p className="leading-8 text-night/85">{bi(cv.objective)}</p>
          </div>
        </Reveal>

        {/* الخبرات — مدار رأسي بنقاط معيّنة */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-xl font-bold text-ink">{bi(t.journey.experience)}</h3>
          <ol className="relative mx-auto max-w-2xl border-s-2 border-violet/30 ps-8">
            {cv.experience.map((x, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li className="relative pb-10 last:pb-0">
                  <span
                    className="diamond absolute -start-[41px] top-1.5 !h-3.5 !w-3.5 text-violet"
                    aria-hidden
                  />
                  <span dir="ltr" className="font-serif text-lg tracking-widest text-violet">
                    {x.year}
                  </span>
                  <p className="mt-1 font-bold text-night">{bi(x.org)}</p>
                  <p className="text-sm text-night/70">{bi(x.role)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* التعليم + المهارات + الدورات */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl bg-paper p-6 h-full">
              <h3 className="mb-3 flex items-center gap-3 font-bold text-ink">
                <span className="diamond !w-2 !h-2" aria-hidden /> {bi(t.journey.education)}
              </h3>
              <p className="font-medium text-night">{bi(cv.education.degree)}</p>
              <p className="text-sm text-night/70">{bi(cv.education.year)}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl bg-paper p-6 h-full">
              <h3 className="mb-3 flex items-center gap-3 font-bold text-ink">
                <span className="diamond !w-2 !h-2" aria-hidden /> {bi(t.journey.skills)}
              </h3>
              <ul className="space-y-1.5 text-sm text-night/85">
                {cv.skills.map((s, i) => (
                  <li key={i}>{bi(s)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-2xl bg-paper p-6 h-full">
              <h3 className="mb-3 flex items-center gap-3 font-bold text-ink">
                <span className="diamond !w-2 !h-2" aria-hidden /> {bi(t.journey.courses)}
              </h3>
              <ul className="space-y-1.5 text-sm text-night/85">
                {cv.courses.map((c, i) => (
                  <li key={i}>{bi(c)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 text-center">
          <a
            href={site.cvPath}
            download
            className="inline-block rounded-full bg-ink px-8 py-3 text-sm font-medium text-paper transition-transform hover:scale-[1.03]"
          >
            {bi(t.journey.download)}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 11. الخدمات ---------- */
export function Services() {
  const { t, bi } = useLang();
  return (
    <section id="services" className="bg-ground py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Lockup en="SERVICES" ar={bi(t.services.title)} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-center text-violet">{bi(t.services.sub)}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="group h-full rounded-2xl bg-paper p-7 transition-shadow hover:shadow-lg hover:shadow-violet/10">
                <span className="diamond mb-5 !h-3 !w-3 text-violet transition-transform group-hover:-translate-y-1" aria-hidden />
                <h3 className="mb-3 text-lg font-bold text-ink">{bi(s.title)}</h3>
                <p className="text-sm leading-7 text-night/75">{bi(s.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. الشركاء ---------- */
export function Partners() {
  const { t, bi } = useLang();
  return (
    <section id="partners" className="bg-ink py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <DiamondTitle dark>
            <Lockup en="CREATIVE PARTNERS" ar={bi(t.partners.title)} dark />
          </DiamondTitle>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p, i) => (
            <Reveal key={i} delay={(i % 5) * 0.05}>
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-ink ring-1 ring-paper/10">
                <Image
                  src={p.img}
                  alt={`شعار ${bi(p.name)}`}
                  width={300}
                  height={220}
                  className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
