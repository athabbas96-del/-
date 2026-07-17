import { Inter, Geist_Mono, Cairo, Bodoni_Moda } from "next/font/google";

export const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontArabic = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

/**
 * High-contrast Didone serif — matches the "PORTFOLIO" cover title in the
 * brand identity PDF. Reserved for large display headings (text-display-*),
 * never body copy.
 */
export const fontDisplay = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});
