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
    problem:
      "Fonda had product ready to ship but no visual identity — no logo, no packaging, nothing that would make it recognizable on a crowded wellness shelf or in a gifting moment.",
    goal: "One identity system that could carry the brand from a single product pouch to a full gift experience, recognizable at a glance and consistent everywhere it appeared.",
    strategy:
      "Build one flexible monogram out of the Arabic wordmark, commit to a single confident purple as the brand's signature color, and apply both without exception — no secondary palette, no alternate logo lockups to manage.",
    execution:
      "Monogram and wordmark design, product pouch labels, a printed mailer box (interior and exterior), a branded gift bag, a circular packaging sticker, and business cards — all built from the same two-color, two-typeface system.",
    results:
      "The identity now travels intact from a shelf-ready pouch to a gift-wrapped box without a single inconsistent touchpoint — the same mark, the same purple, the same voice, everywhere Fonda shows up.",
    metrics: [
      { value: 5, label: "Packaging & Print Formats" },
      { value: 1, label: "Unified Color System" },
      { value: 2, label: "Tools Used" },
    ],
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
    problem:
      "Aljalila Abaya needed a mark that read as premium the moment a customer touched the product — before they even opened the bag.",
    goal: "An identity built entirely around restraint: one lockup, one color, applied with enough confidence that it wouldn't need decoration to feel expensive.",
    strategy:
      "Design a single custom Arabic and Latin wordmark pairing, drop it in one recurring burgundy across every physical touchpoint, and let material — kraft tags, wrapping paper, card stock — do the rest of the work.",
    execution:
      "Custom wordmark lockup, hang tags, a wrapping paper pattern, and business stationery, all built around the one burgundy and one typeface pairing.",
    results:
      "Every touchpoint — tag, wrapping, card — reads as the same house, without needing a secondary color or a second logo variant to hold it together.",
    metrics: [
      { value: 4, label: "Brand Touchpoints" },
      { value: 1, label: "Custom Wordmark" },
      { value: 1, label: "Signature Color" },
    ],
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
    problem:
      "DAL needed packaging that communicated “roasted in Jazan” instantly — without relying on paragraphs of copy nobody reads on a coffee bag.",
    goal: "A packaging system that told a regional, heritage-rooted story visually, while staying flexible enough to cover single bags, gift boxes, and cups.",
    strategy:
      "Commission an illustrated skyline and harvest scene as the emotional core of the brand, then build a consistent chevron pattern and wordmark system around it so every format — bag, box, or cup — reads as the same roaster.",
    execution:
      "Illustrated cup and box artwork, a gable gift box, single-origin bag labels (Popayan, Nansebo, Sumatra, Alkathei), a full gift box lineup, and cup designs for hot and iced drinks.",
    results:
      "The Jazan story now rides along on every cup and bag DAL sells — the illustration does the storytelling that a label alone couldn't.",
    metrics: [
      { value: 6, label: "Touchpoints Designed" },
      { value: 4, label: "Coffee Origins Packaged" },
      { value: 1, label: "Illustrated Heritage Scene" },
    ],
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
    problem:
      "Silar sells gifting — which means the box itself has to feel like part of the gift, not just a container for it.",
    goal: "Packaging designed for the moment it's opened, not just the moment it's seen on a shelf.",
    strategy:
      "Carry one warm illustrated character across the exterior, then reward the open: an interior message card and repeating signature pattern that only reveal themselves once the box is unboxed.",
    execution:
      "Illustrated box artwork, an interior message card (“A gift from Silar is a memory that shines”), and a repeating wrapping paper pattern.",
    results:
      "The unboxing does the work a tagline can't — the box closed and the box opened are two different, equally considered moments.",
    metrics: [
      { value: 3, label: "Touchpoints Designed" },
      { value: 2, label: "Unboxing States Designed" },
      { value: 1, label: "Illustrated Character" },
    ],
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
    problem:
      "Fiore needed packaging for a bulk coffee dispenser box and single cups that felt hand-made, not mass-produced.",
    goal: "A warm, human read on functional packaging — something that felt more like a small café than a factory line.",
    strategy:
      "Pair a minimal floral mark with a single line-drawn illustration of the barista bar, then apply both without any additional color or ornament to keep the hand-made feeling intact.",
    execution:
      "Dispenser box illustration and cup design, both built around the same floral mark and line-illustration style.",
    results:
      "The dispenser box and the cup now read as the same café, whether it's sitting on a counter or handed across it.",
    metrics: [
      { value: 2, label: "Packaging Formats" },
      { value: 1, label: "Hand-Illustrated Scene" },
    ],
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
    problem:
      "Four different clients needed sticker sheets for four different moments — a coffee roaster's heritage, a national holiday, a winter season, a café's mascot — with no shared brief to unify them.",
    goal: "Small-format work that still felt intentional per client, not generic clip-art dropped onto a sheet.",
    strategy:
      "Treat every sheet as its own tiny identity system — a consistent icon weight and color story per theme — rather than one universal sticker style stretched across all four.",
    execution:
      "A camel and heritage icon sheet, a Saudi National Day sheet, a winter seasonal sheet, and a café character sheet — roughly twenty individual icons across the four sets.",
    results:
      "Each sheet gets handed out, stuck on laptops, and photographed on its own — small pieces that still carry a full brand voice.",
    metrics: [
      { value: 4, label: "Sticker Sheets Designed" },
      { value: 20, suffix: "+", label: "Individual Icons" },
      { value: 4, label: "Client Brands" },
    ],
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
    problem:
      "Salwa Hair Style needed a mark simple enough to work at sticker scale — no room for a complex lockup or multiple colors.",
    goal: "One signature that did all the branding work by itself.",
    strategy:
      "Hand-letter a single script signature, pick one warm lavender, and repeat it at scale rather than designing a secondary supporting mark.",
    execution:
      "Custom script wordmark design and a repeating sticker pattern built from that one signature.",
    results:
      "The signature alone now carries the brand — no icon, no secondary mark, no explanation needed.",
    metrics: [
      { value: 1, label: "Custom Script Wordmark" },
      { value: 1, label: "Repeating Pattern System" },
    ],
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
    problem:
      "5Girls Abaya needed a card that traveled inside every order — doing both a caring, personal introduction and the practical job of care instructions.",
    goal: "One card, two jobs: an emotional front and a functional back, without feeling like two disconnected pieces of collateral.",
    strategy:
      "Use a soft watercolor portrait and tulip motif on the front to set the tone, then carry the same tulip motif onto the back where the practical care and quality notes live.",
    execution:
      "A two-sided card — illustrated portrait and lockup on the front, care instructions and quality notes on the back — both sharing the tulip motif.",
    results:
      "Every order now includes a card that feels considered on both sides, not just a receipt with a logo stamped on it.",
    metrics: [
      { value: 2, label: "Card Sides Designed" },
      { value: 1, label: "Custom Illustration" },
    ],
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
    problem:
      "Three retainer clients — a wellness clinic, a marketing agency, and a coffee roaster — each needed fast-turnaround social content without their brand systems blurring into each other.",
    goal: "Keep three very different brand voices intact while producing at the pace social content actually demands.",
    strategy:
      "Build each campaign inside its own client's existing brand system rather than a shared template — ARC's clinical navy, Spark's playful space theme, DAL's warm terracotta — so speed never came at the cost of consistency.",
    execution:
      "A New Year campaign for Spark Marketing, an offers campaign for ARC Rehabilitation Center, and a breakfast promotion for DAL Coffee, each delivered as ready-to-post story and feed content.",
    results:
      "Three brands, three feeds, zero visual overlap — each client's content stays recognizably theirs, campaign after campaign.",
    metrics: [
      { value: 3, label: "Retainer Clients" },
      { value: 3, suffix: "+", label: "Campaigns Delivered" },
    ],
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
    problem:
      "Cream Dates needed a month of content that felt like one story, even though it had to be shot and posted in scattered batches.",
    goal: "A feed that reads as a single, considered brand — not six disconnected posts competing for attention.",
    strategy:
      "Lock a consistent terracotta and linen palette across every post, then rotate through product, texture, and benefit shots inside that same system.",
    execution:
      "A six-post content grid — product on linen, texture close-ups, and benefit-led lifestyle shots — all shot and styled inside the same palette.",
    results:
      "The feed reads as one system even when the individual posts are shot weeks apart — the palette does the consistency work, not the posting schedule.",
    metrics: [
      { value: 6, label: "Content Grid Posts" },
      { value: 1, label: "Product Styled Multiple Ways" },
    ],
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
