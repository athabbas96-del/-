import type {
  Project,
  Client,
  FeatureItem,
  ProjectCategory,
  MediaItem,
  BeforeAfter,
  Testimonial,
  Stat,
} from "@/types";

export interface MediaRecord {
  id: string;
  url: string;
  type: "image" | "video" | "pdf";
  filename: string;
  size: number;
  createdAt: string;
}

export interface ProjectRecord extends Project {
  id: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientRecord extends Client {
  id: string;
  sortOrder: number;
  createdAt: string;
}

export interface ServiceRecord extends FeatureItem {
  id: string;
  sortOrder: number;
}

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  content: string;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettingsRecord {
  heroName: string;
  heroRoles: string[];
  heroBadge: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutStory: string[];
  visionLabel: string;
  visionText: string;
  missionLabel: string;
  missionText: string;
  contactIntro: string;
  cvMediaUrl: string | null;
  portfolioMediaUrl: string | null;
}

/** Raw sqlite row shapes (snake-free, matches column names exactly). */
export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  problem: string;
  goal: string;
  strategy: string;
  execution: string;
  results: string;
  metricsJson: string;
  year: number;
  toolsJson: string;
  coverImage: string;
  coverAlt: string;
  galleryJson: string;
  videoJson: string | null;
  beforeAfterJson: string | null;
  testimonialJson: string | null;
  featured: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function projectFromRow(row: ProjectRow): ProjectRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    category: row.category as ProjectCategory,
    summary: row.summary,
    problem: row.problem,
    goal: row.goal,
    strategy: row.strategy,
    execution: row.execution,
    results: row.results,
    metrics: JSON.parse(row.metricsJson) as Stat[],
    year: row.year,
    tools: JSON.parse(row.toolsJson) as string[],
    coverImage: row.coverImage,
    coverAlt: row.coverAlt,
    gallery: JSON.parse(row.galleryJson) as MediaItem[],
    video: row.videoJson ? (JSON.parse(row.videoJson) as MediaItem) : undefined,
    beforeAfter: row.beforeAfterJson
      ? (JSON.parse(row.beforeAfterJson) as BeforeAfter)
      : undefined,
    testimonial: row.testimonialJson
      ? (JSON.parse(row.testimonialJson) as Testimonial)
      : undefined,
    featured: Boolean(row.featured),
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export interface ClientRow {
  id: string;
  name: string;
  logo: string;
  slug: string | null;
  sortOrder: number;
  createdAt: string;
}

export function clientFromRow(row: ClientRow): ClientRecord {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    slug: row.slug ?? undefined,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
  };
}

export interface ServiceRow {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
}

export function serviceFromRow(row: ServiceRow): ServiceRecord {
  return {
    id: row.id,
    icon: row.icon,
    title: row.title,
    description: row.description,
    sortOrder: row.sortOrder,
  };
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  content: string;
  tagsJson: string;
  published: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function articleFromRow(row: ArticleRow): ArticleRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: row.coverImage,
    content: row.content,
    tags: JSON.parse(row.tagsJson) as string[],
    published: Boolean(row.published),
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export interface SiteSettingsRow {
  heroName: string;
  heroRolesJson: string;
  heroBadge: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutStoryJson: string;
  visionLabel: string;
  visionText: string;
  missionLabel: string;
  missionText: string;
  contactIntro: string;
  cvMediaUrl: string | null;
  portfolioMediaUrl: string | null;
}

export function settingsFromRow(row: SiteSettingsRow): SiteSettingsRecord {
  return {
    heroName: row.heroName,
    heroRoles: JSON.parse(row.heroRolesJson) as string[],
    heroBadge: row.heroBadge,
    aboutEyebrow: row.aboutEyebrow,
    aboutHeading: row.aboutHeading,
    aboutStory: JSON.parse(row.aboutStoryJson) as string[],
    visionLabel: row.visionLabel,
    visionText: row.visionText,
    missionLabel: row.missionLabel,
    missionText: row.missionText,
    contactIntro: row.contactIntro,
    cvMediaUrl: row.cvMediaUrl,
    portfolioMediaUrl: row.portfolioMediaUrl,
  };
}
