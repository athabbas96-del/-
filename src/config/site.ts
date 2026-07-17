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
  locale: "en",
  keywords: ["Atheer Abbas", "portfolio", "ATH Portfolio"],
} as const;

export const navItems: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: { label: string; href: string }[] = [];
