export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  year: number;
  tags: string[];
  coverImage: string;
  gallery?: string[];
  liveUrl?: string;
  repoUrl?: string;
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
