import type { Metadata } from "next";
import { fontSans, fontMono, fontArabic } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      // The [locale] layout patches lang/dir before paint (see its inline
      // script) so localized pages never flash the wrong direction — that
      // intentional post-SSR patch is exactly what this suppresses.
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} ${fontArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
