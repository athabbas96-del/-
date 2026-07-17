"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { navItems, siteConfig } from "@/config/site";
import { localizedHref } from "@/i18n/config";
import { useI18n } from "@/i18n/DictionaryProvider";
import { fadeInBlur } from "@/lib/motion";

export function Footer() {
  const { locale, dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy relative overflow-hidden">
      <Container className="flex flex-col gap-16 py-20">
        <Reveal variants={fadeInBlur}>
          <MagneticButton className="inline-block" strength={0.15}>
            <a
              href="mailto:ath.abbas96@gmail.com"
              className="group text-display-sm inline-flex items-center gap-4 leading-[1.05] font-medium tracking-tight text-white"
            >
              {dict.footer.ctaHeading}
              <Icon
                icon={ArrowUpRight}
                size="lg"
                className="text-accent-blue transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              />
            </a>
          </MagneticButton>
        </Reveal>

        <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-10 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <span className="font-mono text-xs tracking-[0.15em] text-white/50 uppercase">
              ATH Portfolio
            </span>
            <p className="max-w-[28ch] text-sm text-white/60">
              {siteConfig.author.name} — {siteConfig.roles[0]}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.15em] text-white/50 uppercase">
              {dict.footer.sitemap}
            </span>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(locale, item.href)}
                className="w-fit text-sm text-white/75 transition-colors hover:text-white"
              >
                {dict.nav[item.labelKey]}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.15em] text-white/50 uppercase">
              {dict.footer.connect}
            </span>
            <a
              href="mailto:ath.abbas96@gmail.com"
              className="w-fit text-sm text-white/75 transition-colors hover:text-white"
            >
              ath.abbas96@gmail.com
            </a>
            <a
              href="https://wa.me/966566514226"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-white/75 transition-colors hover:text-white"
            >
              {dict.footer.whatsapp}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.15em] text-white/50 uppercase">
              {dict.footer.follow}
            </span>
            <SocialLinks className="flex gap-3" />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {year} {siteConfig.author.name}. {dict.footer.copyright}
          </span>
          <span>{dict.footer.builtWith}</span>
        </div>
      </Container>
    </footer>
  );
}
