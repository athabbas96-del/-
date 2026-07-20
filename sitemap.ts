import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://atheer-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    ...projects.map((p) => ({ url: `${BASE}/work/${p.slug}`, priority: 0.8 })),
  ];
}
