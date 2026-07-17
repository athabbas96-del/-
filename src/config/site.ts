export const siteConfig = {
  name: "ATH Portfolio",
  title: "Atheer Abbas — Portfolio",
  description:
    "Personal portfolio of Atheer Abbas — creative work, case studies, and experience.",
  url: "https://ath-portfolio.example.com",
  ogImage: "/images/og/cover.jpg",
  author: {
    name: "Atheer Abbas",
    email: "ath.abbas96@gmail.com",
  },
  roles: [
    "Creative Marketing Strategist",
    "AI Consultant",
    "Creative Director",
  ],
  locale: "en",
  keywords: ["Atheer Abbas", "portfolio", "ATH Portfolio"],
} as const;

export const navItems: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: { label: string; href: string }[] = [];
