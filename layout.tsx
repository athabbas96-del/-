import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atheer-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "أثير حمزة — ثاء | مجرة من الإبداع",
    template: "%s — أثير حمزة",
  },
  description:
    "بورتفوليو أثير حمزة — مصممة جرافيك من جازان. هويات بصرية، مطبوعات وتغليف، وإعلانات سوشيال ميديا. Atheer Hamza — graphic designer from Jazan, Saudi Arabia.",
  keywords: [
    "أثير حمزة",
    "مصممة جرافيك",
    "هوية بصرية",
    "جازان",
    "Atheer Hamza",
    "graphic designer",
    "brand identity",
    "Saudi Arabia",
  ],
  openGraph: {
    title: "أثير حمزة — ثاء | مجرة من الإبداع",
    description:
      "هويات بصرية، مطبوعات وتغليف، وإعلانات سوشيال ميديا — من مجرة أثير حمزة.",
    url: SITE_URL,
    siteName: "Atheer Hamza — Portfolio",
    images: [{ url: "/og.jpg", width: 1600, height: 982 }],
    locale: "ar_SA",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "أثير حمزة — ثاء | مجرة من الإبداع",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2A1E3B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-arabic">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
