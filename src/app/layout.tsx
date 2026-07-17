import type { Metadata } from "next";
import { fontSans, fontMono, fontArabic } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import { RootProviders } from "@/components/providers/RootProviders";
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
      className={`${fontSans.variable} ${fontMono.variable} ${fontArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
