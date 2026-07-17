import { RootProviders } from "@/components/providers/RootProviders";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootProviders>{children}</RootProviders>;
}
