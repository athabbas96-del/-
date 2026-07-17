import { RootProviders } from "@/components/providers/RootProviders";
import { siteConfig, socialLinks } from "@/config/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.roles,
  email: siteConfig.author.email,
  url: siteConfig.url,
  image: new URL(siteConfig.ogImage, siteConfig.url).toString(),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jazan",
    addressCountry: "SA",
  },
  sameAs: socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href),
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <RootProviders>{children}</RootProviders>
    </>
  );
}
