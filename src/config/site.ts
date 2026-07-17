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

export const socialLinks: { label: string; href: string; icon: string }[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/designedatheer96",
    icon: "Camera",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/966566514226",
    icon: "MessageCircle",
  },
  { label: "Email", href: "mailto:ath.abbas96@gmail.com", icon: "Mail" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/atheer-hamza-%F0%9F%92%AB-6b7798153?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: "Briefcase",
  },
];

export const contactChannels: {
  label: string;
  value: string;
  href: string;
  icon: string;
}[] = [
  {
    label: "WhatsApp",
    value: "0566 514 226",
    href: "https://wa.me/966566514226",
    icon: "MessageCircle",
  },
  {
    label: "Email",
    value: "Atheerabbas96@gmail.com",
    href: "mailto:Atheerabbas96@gmail.com",
    icon: "Mail",
  },
  {
    label: "LinkedIn",
    value: "Atheer Hamza",
    href: "https://www.linkedin.com/in/atheer-hamza-%F0%9F%92%AB-6b7798153?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: "Briefcase",
  },
  {
    label: "Instagram",
    value: "@designedatheer96",
    href: "https://instagram.com/designedatheer96",
    icon: "Camera",
  },
];

export const downloads = {
  cv: "/downloads/Atheer-Abbas-CV.pdf",
  portfolio: "/downloads/Atheer-Abbas-Portfolio.pdf",
};
