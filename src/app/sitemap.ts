import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, defaultLocale } from "@/i18n/config";
import { listProjects } from "@/lib/repo/projects";
import { listArticles } from "@/lib/repo/articles";

const staticPaths = [
  "/",
  "/about",
  "/work",
  "/clients",
  "/resume",
  "/contact",
  "/articles",
];

function entry(path: string): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
    languages[locale] = new URL(localizedPath, siteConfig.url).toString();
  }

  return {
    url: languages[defaultLocale],
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPaths = listProjects().map((project) => `/work/${project.slug}`);
  const articlePaths = listArticles({ publishedOnly: true }).map(
    (article) => `/articles/${article.slug}`,
  );

  return [...staticPaths, ...projectPaths, ...articlePaths].map(entry);
}
