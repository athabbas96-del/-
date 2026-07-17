import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { EnterReveal } from "@/components/animations/EnterReveal";
import { Parallax } from "@/components/animations/Parallax";
import { MetricsRow } from "@/components/ui/MetricsRow";
import { CaseStudyNarrative } from "@/components/sections/CaseStudyNarrative";
import { CaseStudyGallery } from "@/components/sections/CaseStudyGallery";
import { CaseStudyVideo } from "@/components/sections/CaseStudyVideo";
import { CaseStudyTestimonial } from "@/components/sections/CaseStudyTestimonial";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { CtaBand } from "@/components/sections/CtaBand";
import { categoryLabel } from "@/content/projects";
import { listProjects } from "@/lib/repo/projects";
import type { MediaItem } from "@/types";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = listProjects().find((entry) => entry.slug === slug);
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
  const projects = listProjects();
  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];

  if (!project) notFound();

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const media: MediaItem[] = [
    { type: "image", src: project.coverImage, alt: project.coverAlt },
    ...project.gallery,
  ];

  const narrativeSteps = [
    { label: "Problem", text: project.problem },
    { label: "Goal", text: project.goal },
    { label: "Strategy", text: project.strategy },
    { label: "Execution", text: project.execution },
    { label: "Results", text: project.results },
  ];

  return (
    <main className="flex flex-1 flex-col">
      <Section as="header" className="pb-0">
        <EnterReveal>
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
          <p className="text-muted mt-5 max-w-[60ch] text-base sm:text-lg">
            {project.summary}
          </p>
        </EnterReveal>

        <div className="bg-surface relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)]">
          <Parallax distance={20} className="absolute inset-x-0 -inset-y-6">
            <Image
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </Parallax>
        </div>
      </Section>

      <Section className="pt-14">
        <dl className="border-border grid grid-cols-2 gap-6 border-y py-6 sm:grid-cols-4">
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
      </Section>

      <Section className="pt-0">
        <CaseStudyNarrative steps={narrativeSteps} />
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
          Images
        </span>
        <div className="mt-8">
          <CaseStudyGallery media={media} />
        </div>
      </Section>

      {project.video && (
        <Section className="bg-surface">
          <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
            Video
          </span>
          <div className="mt-8">
            <CaseStudyVideo video={project.video} />
          </div>
        </Section>
      )}

      <Section>
        <span className="text-accent font-mono text-xs tracking-[0.15em] uppercase">
          Numbers
        </span>
        <div className="mt-10">
          <MetricsRow metrics={project.metrics} />
        </div>
      </Section>

      {project.testimonial && (
        <Section className="bg-surface">
          <CaseStudyTestimonial testimonial={project.testimonial} />
        </Section>
      )}

      <Section className="bg-surface">
        <div className="flex items-center justify-between gap-4">
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
        </div>
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
