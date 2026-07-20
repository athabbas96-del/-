"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { site } from "@/data/site";
import { Reveal } from "./ui";

export function Contact() {
  const { t, bi, lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  const typeOptions = [
    t.contact.typeOptions.identity,
    t.contact.typeOptions.print,
    t.contact.typeOptions.social,
    t.contact.typeOptions.other,
  ];

  // بلا خادم خلفي: الإرسال يفتح بريد الزائر برسالة جاهزة إلى بريد أثير.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      lang === "ar" ? `مشروع جديد — ${form.type || "استفسار"}` : `New project — ${form.type || "enquiry"}`
    );
    const body = encodeURIComponent(
      `${form.name}\n${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const input =
    "w-full rounded-xl border border-paper/25 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:border-paper/60";

  return (
    <section id="contact" className="satin py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">{bi(t.contact.title)}</h2>
            <p dir="ltr" className="mt-6 font-script text-5xl text-paper/90 sm:text-6xl">
              Thank You
            </p>
            <p className="mt-1 text-lg tracking-[0.4em] text-paper/70">{bi(t.contact.thanks)}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {/* بيانات التواصل الحقيقية */}
          <Reveal delay={0.1}>
            <ul className="space-y-5 text-paper/90">
              <li className="flex items-center gap-3">
                <span className="diamond !h-2 !w-2" aria-hidden />
                <a dir="ltr" href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="diamond !h-2 !w-2" aria-hidden />
                <a dir="ltr" href={`https://wa.me/${site.whatsappIntl}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="diamond !h-2 !w-2" aria-hidden />
                <a dir="ltr" href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  @{site.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="diamond !h-2 !w-2" aria-hidden />
                <span>{bi(site.location)}</span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${site.whatsappIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-paper px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              {bi(t.contact.whatsapp)}
            </a>
          </Reveal>

          {/* النموذج */}
          <Reveal delay={0.2}>
            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm text-paper/80">{bi(t.contact.name)}</span>
                <input
                  required
                  className={input}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-paper/80">{bi(t.contact.email)}</span>
                <input
                  required
                  type="email"
                  dir="ltr"
                  className={input}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-paper/80">{bi(t.contact.type)}</span>
                <select
                  className={`${input} appearance-none`}
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="" className="text-night" />
                  {typeOptions.map((o, i) => (
                    <option key={i} value={bi(o)} className="text-night">
                      {bi(o)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-paper/80">{bi(t.contact.message)}</span>
                <textarea
                  required
                  rows={4}
                  className={input}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              <button
                type="submit"
                className="rounded-full border border-paper/50 px-8 py-3 text-sm text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {bi(t.contact.send)}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, bi } = useLang();
  return (
    <footer className="bg-ink px-5 py-8 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo-white.png" alt="ثاء" width={24} height={30} />
          <span className="text-xs text-paper/70">{bi(t.footer.rights)}</span>
        </div>
        <span dir="ltr" className="font-serif text-xs tracking-widest2 text-paper/60">
          THA’ | A GALAXY OF CREATIVITY
        </span>
      </div>
    </footer>
  );
}
