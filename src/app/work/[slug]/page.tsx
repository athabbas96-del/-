import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CaseStudyGallery } from "@/components/sections/CaseStudyGallery";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { CtaBand } from "@/components/sections/CtaBand";
import { projects, categoryLabel } from "@/content/projects";
import type { MediaItem } from "@/types";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.coverImage,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];

  if (!project) notFound();

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const media: MediaItem[] = [
    { type: "image", src: project.coverImage, alt: project.coverAlt },
    ...project.gallery,
  ];

  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <div className="text-muted flex items-center gap-2 font-mono text-xs">
          <Link href="/work" className="hover:text-foreground">
            Work
          </Link>
          <span>/</span>
          <span>{categoryLabel(project.category)}</span>
        </div>

        <h1 className="text-display-sm text-foreground mt-5 max-w-[26ch] leading-[1.05] font-medium tracking-tight">
          {project.title}
        </h1>

        <div className="bg-surface relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)]">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        </div>
      </Section>

      <Section className="pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="text-accent font-mono text-xs tracking-[0.1em] uppercase">
              Overview
            </span>
            <p className="text-foreground mt-4 max-w-[65ch] text-base leading-relaxed sm:text-lg">
              {project.brief}
            </p>
          </div>

          <dl className="border-border flex flex-col gap-5 border-t pt-5 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
            <div>
              <dt className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
                Client
              </dt>
              <dd className="text-foreground mt-1 text-sm">{project.client}</dd>
            </div>
            <div>
              <dt className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
                Category
              </dt>
              <dd className="text-foreground mt-1 text-sm">
                {categoryLabel(project.category)}
              </dd>
            </div>
            <div>
              <dt className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
                Year
              </dt>
              <dd className="text-foreground mt-1 text-sm tabular-nums">
                {project.year}
              </dd>
            </div>
            <div>
              <dt className="text-muted font-mono text-xs tracking-[0.1em] uppercase">
                Tools
              </dt>
              <dd className="text-foreground mt-1 text-sm">
                {project.tools.join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {project.beforeAfter && (
        <Section className="bg-surface">
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            Before / After
          </span>
          <div className="mx-auto mt-8 max-w-2xl">
            <BeforeAfterSlider data={project.beforeAfter} />
          </div>
        </Section>
      )}

      <Section>
        <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
          Gallery
        </span>
        <div className="mt-8">
          <CaseStudyGallery media={media} />
        </div>
      </Section>

      <Section className="bg-surface">
        <Container className="flex items-center justify-between gap-4">
          <Link
            href={`/work/${previous.slug}`}
            className="group flex min-w-0 items-center gap-3 text-start"
          >
            <Icon
              icon={ChevronLeft}
              className="text-muted group-hover:text-foreground shrink-0 transition-colors"
            />
            <span className="min-w-0">
              <span className="text-muted block font-mono text-[11px] tracking-[0.1em] uppercase">
                Previous
              </span>
              <span className="text-foreground block truncate text-sm font-medium">
                {previous.title}
              </span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex min-w-0 items-center gap-3 text-end"
          >
            <span className="min-w-0">
              <span className="text-muted block font-mono text-[11px] tracking-[0.1em] uppercase">
                Next
              </span>
              <span className="text-foreground block truncate text-sm font-medium">
                {next.title}
              </span>
            </span>
            <Icon
              icon={ChevronRight}
              className="text-muted group-hover:text-foreground shrink-0 transition-colors"
            />
          </Link>
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
