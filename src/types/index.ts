export type ProjectCategory =
  "brand-identity" | "printing-packaging" | "social-media";

export interface CategoryDef {
  slug: ProjectCategory;
  label: string;
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  summary: string;
  brief: string;
  year: number;
  tools: string[];
  coverImage: string;
  coverAlt: string;
  gallery: MediaItem[];
  beforeAfter?: BeforeAfter;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string | "present";
  location?: string;
  description: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}
