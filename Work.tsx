"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { categoriesOrder, projects, Category } from "@/data/projects";
import { instagramPosts, site } from "@/data/site";
import { Lockup, Reveal, Sparkle } from "./ui";

/* ---------- 7. معرض الأعمال ---------- */
export function WorkGrid() {
  const { t, bi } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="work" className="bg-ground py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Lockup en="SELECTED WORK" ar={bi(t.work.title)} />
        </Reveal>

        {/* الفلاتر */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {(["all", ...categoriesOrder] as const).map((c) => {
            const label = c === "all" ? bi(t.work.all) : bi(t.categories[c]);
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "bg-paper text-night hover:bg-violet hover:text-paper"
                }`}
                aria-pressed={active}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* الشبكة */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link
                href={`/work/${p.slug}`}
                className="group block overflow-hidden rounded-2xl bg-paper shadow-sm transition-shadow hover:shadow-xl hover:shadow-violet/15"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={bi(p.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-ink">{bi(p.title)}</h3>
                    <span className="diamond !h-2 !w-2 text-violet transition-transform group-hover:rotate-[135deg]" aria-hidden />
                  </div>
                  {p.client && <p className="mt-1 text-xs text-night/60">{bi(p.client)}</p>}
                  <p className="mt-2 text-sm leading-6 text-night/75">{bi(p.blurb)}</p>
                  <p className="mt-3 flex flex-wrap gap-2">
                    {p.categories.map((c) => (
                      <span key={c} className="rounded-full bg-ground px-3 py-1 text-[11px] text-violet">
                        {bi(t.categories[c])}
                      </span>
                    ))}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-violet">
                    {bi(t.work.open)} ←
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. آخر ما دار في المجرة (إنستقرام) ---------- */
export function InstagramSection() {
  const { t, bi } = useLang();
  return (
    <section className="satin py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <Lockup en="LATEST IN ORBIT" ar={bi(t.instagram.title)} dark />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-center text-paper/70">{bi(t.instagram.sub)}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post, i) => (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl bg-paper/5 ring-1 ring-paper/15"
              >
                {post.img ? (
                  <Image
                    src={post.img}
                    alt={bi(post.caption)}
                    fill
                    sizes="(max-width: 640px) 50vw, 17vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center p-4 text-center text-xs leading-5 text-paper/50">
                    <span>
                      <Sparkle className="mx-auto mb-2 !h-6 !w-6 text-paper/40" />
                      {bi(t.instagram.placeholder)}
                    </span>
                  </span>
                )}
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-paper/40 px-7 py-3 text-sm text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <span className="diamond !h-2 !w-2" aria-hidden />
            {bi(t.instagram.cta)}
          </a>
        </div>
      </div>
    </section>
  );
}
