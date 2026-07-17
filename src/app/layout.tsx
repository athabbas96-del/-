import type { Metadata } from "next";
import { fontSans, fontMono, fontArabic, fontDisplay } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ServiceWorkerRegistration } from "@/components/providers/ServiceWorkerRegistration";
import { themeInitScript } from "@/lib/theme";
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
      // The [locale] layout patches lang/dir, and the inline script below
      // patches data-theme, both before first paint — neither can happen
      // during the server render, so this suppresses the resulting (and
      // intentional) one-level attribute mismatch on <html>.
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} ${fontArabic.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
