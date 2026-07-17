import { Inter, Geist_Mono, Cairo } from "next/font/google";

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
