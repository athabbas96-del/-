import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { Reveal } from "@/components/animations/Reveal";
import { fadeInUp } from "@/lib/motion";
import { CtaBand } from "@/components/sections/CtaBand";
import { listArticles } from "@/lib/repo/articles";
import { getDictionary } from "@/i18n/getDictionary";
import {
  localizedHref,
  isLocale,
  defaultLocale,
  type Locale,
} from "@/i18n/config";

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ArticlesPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.meta.articles.title,
    description: dict.meta.articles.description,
    path: "/articles",
  });
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const articles = listArticles({ publishedOnly: true });

  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            {dict.articles.eyebrow}
          </span>
          <h1 className="text-display-sm text-foreground mt-4 max-w-[22ch] leading-[1.05] font-medium tracking-tight">
            {dict.articles.heading}
          </h1>
          <p className="text-muted mt-6 max-w-[60ch] text-base sm:text-lg">
            {dict.articles.description}
          </p>
        </EnterReveal>
      </Section>

      <Section>
        {articles.length === 0 ? (
          <p className="text-muted text-sm">{dict.articles.empty}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.id} variants={fadeInUp} delay={index * 0.05}>
                <Link
                  href={localizedHref(locale, `/articles/${article.slug}`)}
                  className="group flex flex-col gap-4"
                >
                  {article.coverImage && (
                    <div className="bg-surface relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-md)]">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                      />
                    </div>
                  )}
                  <div>
                    {article.publishedAt && (
                      <span className="text-muted font-mono text-[11px] tracking-[0.1em] uppercase">
                        {new Date(article.publishedAt).toLocaleDateString(
                          locale,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                    )}
                    <h2 className="text-foreground group-hover:text-accent mt-2 text-lg font-medium tracking-tight transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted mt-2 text-sm">{article.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <CtaBand
        title={dict.common.ctaTitle}
        description={dict.common.ctaDescription}
        ctaLabel={dict.common.startConversation}
        ctaHref={localizedHref(locale, "/contact")}
      />
    </main>
  );
}
