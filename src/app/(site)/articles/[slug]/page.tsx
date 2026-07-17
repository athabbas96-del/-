import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { listArticles, getArticleBySlug } from "@/lib/repo/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listArticles({ publishedOnly: true }).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || !article.published) return {};

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    image: article.coverImage ?? undefined,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || !article.published) notFound();

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
          <Link
            href="/articles"
            className="text-muted hover:text-foreground font-mono text-xs"
          >
            ← Articles
          </Link>
          {article.publishedAt && (
            <span className="text-muted mt-5 block font-mono text-[11px] tracking-[0.1em] uppercase">
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          <h1 className="text-display-sm text-foreground mt-3 max-w-[26ch] leading-[1.05] font-medium tracking-tight">
            {article.title}
          </h1>
          {article.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-accent border-accent/30 rounded-full border px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </EnterReveal>

        {article.coverImage && (
          <div className="bg-surface relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>
        )}
      </Section>

      <Section>
        <Container className="max-w-[70ch]">
          <div className="flex flex-col gap-5">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground text-base leading-relaxed sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Have a brand that needs this?"
        description="From a single identity to a full campaign — let's talk about what your brand needs next."
        ctaLabel="Start a Conversation"
        ctaHref="/contact"
      />
    </main>
  );
}
