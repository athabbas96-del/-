import type { Stat, FeatureItem } from "@/types";

export const aboutCopy = {
  eyebrow: "About",
  heading: "The throughline: maker first, strategist now",
  story: [
    "Atheer Abbas started as a one-person design studio in Jazan, Saudi Arabia — sketching logos for the coffee shop down the street before sunrise, and the abaya store across town by evening. Seven years later, that same instinct for detail now sits inside a broader practice: strategy, content, and increasingly, AI-assisted workflows, built to move at the speed brands actually need.",
    "Along the way, the questions changed. It stopped being just “does this logo look right?” and became “does this brand know who it is, everywhere it shows up?” That shift — from maker to strategist — is the throughline of everything below.",
  ],
  vision: {
    label: "Vision",
    text: "A world where small and mid-sized brands in the region carry the same clarity and craft as the biggest names they compete with — without needing an agency-sized budget to get there.",
  },
  mission: {
    label: "Mission",
    text: "Pair sharp creative craft with the speed of modern tools — AI included — so every brand launches faster, looks sharper, and sounds like exactly one thing.",
  },
} as const;

export const stats: Stat[] = [
  { value: 7, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Brands Partnered" },
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "", label: "Core Disciplines" },
];

export const expertise: FeatureItem[] = [
  {
    icon: "Palette",
    title: "Brand Identity & Design",
    description:
      "Logos, packaging, and print systems built to hold up across every surface a brand touches.",
  },
  {
    icon: "Target",
    title: "Marketing Strategy",
    description:
      "Positioning and campaign planning that starts with who the brand is, not just what it posts.",
  },
  {
    icon: "Clapperboard",
    title: "Creative Direction",
    description:
      "End-to-end direction across identity, content, and campaigns, so nothing ships off-brand.",
  },
  {
    icon: "BrainCircuit",
    title: "AI-Augmented Workflows",
    description:
      "AI-assisted ideation and production layered onto the craft — same quality, considerably faster.",
  },
];

export const values: FeatureItem[] = [
  {
    icon: "Gem",
    title: "Craftsmanship",
    description:
      "Every pixel and every word is deliberate — nothing ships “good enough.”",
  },
  {
    icon: "Handshake",
    title: "Partnership",
    description:
      "Long-term relationships over one-off gigs. The best work comes from context.",
  },
  {
    icon: "Lightbulb",
    title: "Curiosity",
    description:
      "New tools, new formats, new tricks — always testing what could work better.",
  },
  {
    icon: "ShieldCheck",
    title: "Integrity",
    description:
      "Honest timelines, honest feedback, and no work I wouldn’t put my name on.",
  },
];
