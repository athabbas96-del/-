import type { Project, CategoryDef, ProjectCategory } from "@/types";

export const categories: CategoryDef[] = [
  { slug: "brand-identity", label: "Brand Identity" },
  { slug: "printing-packaging", label: "Printing & Packaging" },
  { slug: "social-media", label: "Social Media" },
];

export function categoryLabel(category: ProjectCategory): string {
  return categories.find((entry) => entry.slug === category)?.label ?? category;
}

export const projects: Project[] = [
  {
    slug: "fonda",
    title: "FONDA — Full Brand Identity",
    client: "Fonda",
    category: "brand-identity",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    summary:
      "A full identity system for a wellness brand — logo, packaging, and stationery tied together in a single confident purple.",
    brief:
      "Fonda needed an identity that could travel from a shelf-ready pouch to a gift bag without losing its voice. The mark reworks the Arabic wordmark into a compact monogram, then carries the same purple and typography across packaging, mailer boxes, and business cards.",
    coverImage: "/images/projects/fonda/cover.jpg",
    coverAlt: "Fonda purple mailer box, closed and open, on a grey surface",
    gallery: [
      {
        type: "image",
        src: "/images/projects/fonda/gallery-1.jpg",
        alt: "Fonda product pouches in purple and green",
      },
      {
        type: "image",
        src: "/images/projects/fonda/gallery-2.jpg",
        alt: "Fonda purple gift bag with logo",
      },
      {
        type: "image",
        src: "/images/projects/fonda/gallery-3.jpg",
        alt: "Fonda circular sticker peeling off a pink background",
      },
      {
        type: "image",
        src: "/images/projects/fonda/gallery-4.jpg",
        alt: "Fonda business cards in purple and white",
      },
    ],
    featured: true,
  },
  {
    slug: "aljalila-abaya",
    title: "Aljalila Abaya Identity",
    client: "Aljalila Abaya",
    category: "brand-identity",
    year: 2023,
    tools: ["Illustrator"],
    summary:
      "A calligraphic wordmark for an abaya label, built to work as a burgundy foil on tags, wrapping paper, and cards.",
    brief:
      "The brief was elegance without excess. A single custom Arabic and Latin lockup does the work — dropped onto kraft tags, wrapping paper, and stationery in one recurring burgundy, so every touchpoint reads as the same house.",
    coverImage: "/images/projects/aljalila-abaya/cover.jpg",
    coverAlt: "Aljalila Abaya hang tag on dark stone",
    gallery: [
      {
        type: "image",
        src: "/images/projects/aljalila-abaya/gallery-1.jpg",
        alt: "Aljalila Abaya wrapping paper pattern in burgundy",
      },
      {
        type: "image",
        src: "/images/projects/aljalila-abaya/gallery-2.jpg",
        alt: "Aljalila Abaya business card on a brick block",
      },
      {
        type: "image",
        src: "/images/projects/aljalila-abaya/gallery-3.jpg",
        alt: "Aljalila Abaya wordmark close-up on white card",
      },
    ],
    featured: true,
  },
  {
    slug: "dal-coffee-roasters",
    title: "DAL Coffee Roasters",
    client: "DAL Coffee Roasters",
    category: "printing-packaging",
    year: 2024,
    tools: ["Illustrator", "Photoshop"],
    summary:
      "Packaging and print system for a Jazan-based coffee roaster — bags, cups, gift boxes, and an illustrated heritage story.",
    brief:
      "DAL wanted packaging that could say “roasted in Jazan” without a single word of copy. An illustrated skyline and harvest scene wraps the cup and box art, while a consistent chevron pattern and wordmark hold the rest of the line together — from single bags to the full gift box.",
    coverImage: "/images/projects/dal-coffee-roasters/cover.jpg",
    coverAlt: "Iced DAL Coffee cup with illustrated Jazan skyline",
    gallery: [
      {
        type: "image",
        src: "/images/projects/dal-coffee-roasters/gallery-1.jpg",
        alt: "DAL Coffee gift box open, showing bags and cups",
      },
      {
        type: "image",
        src: "/images/projects/dal-coffee-roasters/gallery-2.jpg",
        alt: "DAL Coffee boxes styled with a camel motif and clay vase",
      },
      {
        type: "image",
        src: "/images/projects/dal-coffee-roasters/gallery-3.jpg",
        alt: "DAL Coffee gable box packaging",
      },
      {
        type: "image",
        src: "/images/projects/dal-coffee-roasters/gallery-4.jpg",
        alt: "DAL Coffee product box in orange gradient",
      },
      {
        type: "image",
        src: "/images/projects/dal-coffee-roasters/gallery-5.jpg",
        alt: "DAL Coffee cup close-up with illustrated coffee harvest scene",
      },
      {
        type: "image",
        src: "/images/projects/dal-coffee-roasters/gallery-6.jpg",
        alt: "Full DAL Coffee product lineup — bags, boxes, and cups",
      },
    ],
    featured: true,
  },
  {
    slug: "silar",
    title: "Silar Gift Packaging",
    client: "Silar",
    category: "brand-identity",
    year: 2023,
    tools: ["Illustrator", "Photoshop"],
    summary:
      "Gift packaging built around a single moment: the reveal. A custom box, wrapping paper, and message card designed to unbox well.",
    brief:
      "Silar sells gifting, so the box had to perform on camera. Illustration work carries a warm, personal tone on the outside; the interior message card and wrapping paper repeat the signature in a way that rewards a slow open.",
    coverImage: "/images/projects/silar/before.jpg",
    coverAlt: "Silar gift box, closed, illustrated with a reclining figure",
    gallery: [
      {
        type: "image",
        src: "/images/projects/silar/gallery-1.jpg",
        alt: "Silar message card reading “A gift from Silar is a memory that shines”",
      },
      {
        type: "image",
        src: "/images/projects/silar/gallery-2.jpg",
        alt: "Silar wrapping paper pattern with repeated signature",
      },
    ],
    beforeAfter: {
      before: "/images/projects/silar/before.jpg",
      after: "/images/projects/silar/after.jpg",
      beforeAlt: "Silar gift box closed",
      afterAlt: "Silar gift box opened, card sliding out",
      caption: "Drag to see the unboxing",
    },
    featured: true,
  },
  {
    slug: "fiore-cafe",
    title: "Fiore Cafe Packaging",
    client: "Fiore Cafe",
    category: "printing-packaging",
    year: 2022,
    tools: ["Illustrator", "Photoshop"],
    summary:
      "A hand-illustrated dispenser box and cup system for a specialty café.",
    brief:
      "A minimal floral mark and a line-drawn illustration of the barista bar give Fiore a warm, hand-made read across a bulk coffee dispenser box and single-serve cups.",
    coverImage: "/images/projects/fiore-cafe/cover.jpg",
    coverAlt: "Fiore Cafe coffee dispenser box with line illustration",
    gallery: [
      {
        type: "image",
        src: "/images/projects/fiore-cafe/gallery-1.jpg",
        alt: "Fiore Cafe iced coffee cup",
      },
    ],
  },
  {
    slug: "sticker-collections",
    title: "Seasonal Sticker Collections",
    client: "Multiple Clients",
    category: "printing-packaging",
    year: 2023,
    tools: ["Illustrator"],
    summary:
      "Seasonal and cultural sticker sheets — post-stamp camels, national day icons, café mascots — for four different brands.",
    brief:
      "Small-format work with an outsized job: sticker sheets get handed out, stuck on laptops, and photographed. Each set leans into a theme — Saudi heritage, winter, café culture — while staying inside the same illustration style.",
    coverImage: "/images/projects/sticker-collections/cover.jpg",
    coverAlt: "DAL Coffee themed sticker sheet with camel and palm icons",
    gallery: [
      {
        type: "image",
        src: "/images/projects/sticker-collections/gallery-1.jpg",
        alt: "Winter-themed sticker sheet",
      },
      {
        type: "image",
        src: "/images/projects/sticker-collections/gallery-2.jpg",
        alt: "Saudi National Day sticker sheet",
      },
      {
        type: "image",
        src: "/images/projects/sticker-collections/gallery-3.jpg",
        alt: "Fabric-textured sticker sheet with character icons",
      },
    ],
  },
  {
    slug: "salwa-hair-style",
    title: "Salwa Hair Style",
    client: "Salwa Hair Style",
    category: "brand-identity",
    year: 2022,
    tools: ["Illustrator"],
    summary:
      "A signature script wordmark for a hair salon, built to sit cleanly on a repeating sticker pattern.",
    brief:
      "A single hand-lettered signature does all the branding work here — warm lavender, one script, repeated at scale across packaging stickers.",
    coverImage: "/images/projects/salwa-hair-style/cover.jpg",
    coverAlt: "Salwa Hair Style signature script stickers repeated on lavender",
    gallery: [],
  },
  {
    slug: "5girls-abaya",
    title: "5Girls Abaya Care Card",
    client: "5Girls Abaya",
    category: "printing-packaging",
    year: 2022,
    tools: ["Illustrator", "Photoshop"],
    summary:
      "A two-sided care and quality card for an abaya line — soft illustration on the front, product story on the back.",
    brief:
      "The card travels inside every order: a watercolor portrait and lockup on one side, care instructions and quality notes on the other, both carrying the same tulip motif.",
    coverImage: "/images/projects/5girls-abaya/cover.jpg",
    coverAlt: "5Girls Abaya care card with illustrated portrait and tulips",
    gallery: [
      {
        type: "image",
        src: "/images/projects/5girls-abaya/gallery-1.jpg",
        alt: "5Girls Abaya care instructions card, reverse side",
      },
    ],
  },
  {
    slug: "campaign-posters",
    title: "Seasonal & Promotional Campaigns",
    client: "ARC · Spark · DAL",
    category: "social-media",
    year: 2024,
    tools: ["Photoshop", "Lightroom", "CapCut"],
    summary:
      "Story and feed campaigns for a rehabilitation clinic, a marketing agency, and a coffee roaster — three voices, one delivery cadence.",
    brief:
      "Fast-turnaround social content for three retainer clients: a New Year campaign for a creative agency, an offers push for a wellness clinic, and a breakfast promo for a café — each keeping its own brand system intact under deadline.",
    coverImage: "/images/projects/campaign-posters/cover.jpg",
    coverAlt: "Spark Marketing New Year campaign poster, space theme",
    gallery: [
      {
        type: "image",
        src: "/images/projects/campaign-posters/gallery-1.jpg",
        alt: "ARC Rehabilitation Center offer poster",
      },
      {
        type: "image",
        src: "/images/projects/campaign-posters/gallery-2.jpg",
        alt: "DAL Coffee breakfast promo poster",
      },
      {
        type: "image",
        src: "/images/projects/campaign-posters/gallery-3.jpg",
        alt: "Grid of assorted social campaign posters for multiple clients",
      },
    ],
  },
  {
    slug: "skincare-content",
    title: "Skincare Brand Content",
    client: "Cream Dates",
    category: "social-media",
    year: 2023,
    tools: ["Photoshop", "Lightroom"],
    summary:
      "A six-post content grid for a natural skincare brand — product, texture, and benefit, styled as one system.",
    brief:
      "A monthly content grid built to be shot in batches: product on linen, texture close-ups, and a consistent terracotta palette so the feed reads as one story even when the individual posts don't.",
    coverImage: "/images/projects/skincare-content/cover.jpg",
    coverAlt: "Cream Dates skincare jar on linen fabric",
    gallery: [
      {
        type: "image",
        src: "/images/projects/skincare-content/gallery-1.jpg",
        alt: "Skincare content grid post — model portrait",
      },
      {
        type: "image",
        src: "/images/projects/skincare-content/gallery-2.jpg",
        alt: "Skincare content grid post — cream texture swatches",
      },
    ],
  },
];
