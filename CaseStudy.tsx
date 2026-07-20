"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { getProject, projects } from "@/data/projects";
import { Navbar, Preloader } from "./Chrome";
import { Footer } from "./Contact";
import { Reveal } from "./ui";

export function CaseStudy({ slug }: { slug: string }) {
  const { t, bi } = useLang();
  const p = getProject(slug)!;
  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="bg-ground">
        {/* رأس دراسة الحالة */}
        <header className="satin px-5 pb-16 pt-32 text-paper">
          <div className="mx-auto max-w-6xl">
            <Link href="/#work" className="text-sm text-paper/70 hover:text-paper">
              ← {bi(t.work.back)}
            </Link>
            <Reveal>
              <h1 className="mt-6 flex flex-col gap-2">
                <span dir="ltr" className="font-serif text-4xl tracking-[0.12em] sm:text-6xl">
                  {p.title.en}
                </span>
                <span className="text-2xl font-light sm:text-3xl">{p.title.ar}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
                {p.client && (
                  <div>
                    <dt className="text-paper/60">{bi(t.work.client)}</dt>
                    <dd className="mt-1 font-medium">{bi(p.client)}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-paper/60">{bi(t.work.field)}</dt>
                  <dd className="mt-1 font-medium">
                    {p.categories.map((c) => bi(t.categories[c])).join(" · ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-paper/60">{bi(t.work.role)}</dt>
                  <dd className="mt-1 font-medium">
                    {bi({ ar: "التصميم والإخراج البصري", en: "Design & art direction" })}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </header>

        {/* الجسد: عمود بنفسجي رأسي + شبكة صور ممتدة */}
        <div className="mx-auto flex max-w-7xl">
          {/* العمود الفقري */}
          <aside className="hidden w-20 flex-none items-start justify-center bg-ink py-14 md:flex" aria-hidden>
            <span dir="ltr" className="spine-text font-serif text-2xl uppercase text-paper/90">
              {p.title.en}
            </span>
          </aside>

          <div className="min-w-0 flex-1">
            {/* الفكرة + المخرجات */}
            <section className="grid gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:px-10">
              <Reveal>
                <div>
                  <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink">
                    <span className="diamond !h-2 !w-2" aria-hidden /> {bi(t.work.idea)}
                  </h2>
                  <p className="leading-9 text-night/85">{bi(p.idea)}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-ink">
                    <span className="diamond !h-2 !w-2" aria-hidden /> {bi(t.work.deliverables)}
                  </h2>
                  <ul className="space-y-2 text-night/85">
                    {p.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="diamond !h-1.5 !w-1.5 text-violet" aria-hidden />
                        {bi(d)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            {/* صور المشروع — العنصر المسيطر */}
            <section className="space-y-2 pb-2">
              {p.images.map((img, i) => (
                <Reveal key={img} delay={i * 0.05}>
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={img}
                      alt={`${bi(p.title)} — ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 90vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                </Reveal>
              ))}
            </section>
          </div>
        </div>

        {/* المشروع التالي */}
        <div className="bg-ink px-5 py-14 text-center text-paper">
          <p className="text-sm text-paper/60">{bi(t.work.next)}</p>
          <Link
            href={`/work/${next.slug}`}
            className="mt-2 inline-flex flex-col items-center gap-1 transition-opacity hover:opacity-80"
          >
            <span dir="ltr" className="font-serif text-3xl tracking-[0.12em]">
              {next.title.en}
            </span>
            <span className="font-light">{next.title.ar}</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
