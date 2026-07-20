import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CaseStudy } from "@/components/CaseStudy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title.ar} · ${p.title.en}`,
    description: p.blurb.ar,
    openGraph: { images: [{ url: p.cover }] },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const exists = projects.some((p) => p.slug === params.slug);
  if (!exists) notFound();
  return <CaseStudy slug={params.slug} />;
}
