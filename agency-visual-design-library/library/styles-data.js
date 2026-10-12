/*
 * Agency Visual Design Library: style definitions.
 *
 * This file is the single source of truth. It is read by:
 *   - index.html (via library/render.js) to draw the visual library
 *   - scripts/build-docs.mjs to generate visual-styles/*.md and tokens.css
 *
 * Every client name in the examples is an invented sample brand.
 */
window.AVDL_VOCAB = {
  sectors: ["Luxury & fashion", "Finance & professional services", "Technology & SaaS", "Food & beverage", "Health & medical", "Beauty & wellness", "Hospitality & travel", "Retail & FMCG", "Media, arts & culture", "Sports & fitness", "Education & public sector", "Real estate"],
  moods: ["Premium", "Calm", "Minimal", "Bold", "Playful", "Energetic", "Natural", "Warm", "Technical", "Trustworthy", "Editorial", "Cultural"],
  applications: ["Brand identity", "Social media", "Websites", "Advertising", "Presentations", "Packaging", "Print & editorial", "Events"],
};

window.AVDL_STYLES = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: "quiet-luxury",
    name: "Quiet Luxury",
    tagline: "Restraint as the signal of value.",
    sampleBrand: "Maison Velline",
    sampleBrandType: "Fine jewelry house",
    concept:
      "Quiet Luxury sells through what it leaves out. Large margins, a narrow muted palette and a high-contrast serif tell the audience the brand has nothing to prove. Product is shown slowly and in isolation, and copy is short enough to be read as a caption.",
    keywords: ["Understated", "Timeless", "Considered", "Tactile", "Calm"],
    industries: [
      "Fine jewelry and watches",
      "Fashion and leather goods",
      "Premium real estate",
      "Boutique hotels and spas",
      "Private banking",
      "Fragrance and beauty",
    ],
    palette: [
      { name: "Pearl", hex: "#EEEBE6", role: "Primary background", share: 60 },
      { name: "Onyx", hex: "#1A1918", role: "Text, logo, dark sections", share: 22 },
      { name: "Greige", hex: "#B5ADA3", role: "Dividers, secondary surfaces", share: 8 },
      { name: "Mink", hex: "#6E655C", role: "Secondary text, captions", share: 6 },
      { name: "Champagne", hex: "#B49A6A", role: "Single accent: rules, small marks", share: 4 },
    ],
    paletteRule:
      "Champagne is a detail colour. Use it for a hairline, a monogram or an underline, never for a filled button or a large block.",
    typography: {
      display: { family: "Cormorant Garamond", fallback: "Georgia, serif", weights: "300, 500 · italic 400", use: "Headlines, product names, pull quotes" },
      body: { family: "Jost", fallback: "Helvetica Neue, Arial, sans-serif", weights: "300, 400, 500", use: "Body copy, navigation, buttons (uppercase, tracked)" },
      arabic: { family: "Amiri (display) · Noto Naskh Arabic (body)", note: "Keep Arabic headlines in a classical Naskh for a calm, literary tone. Do not use a heavy Kufi." },
      scale: [
        { level: "Display", size: "72 / 76", weight: "300", detail: "Sentence case, -1% tracking" },
        { level: "H1", size: "48 / 54", weight: "300", detail: "Italic allowed for one word" },
        { level: "H2", size: "28 / 34", weight: "500", detail: "Sentence case" },
        { level: "Body", size: "16 / 28", weight: "300", detail: "Max 60 characters per line" },
        { level: "Label", size: "11 / 16", weight: "500", detail: "Uppercase, +18% tracking" },
      ],
      rules: [
        "Use the light weight for headlines. Bold weights look commercial.",
        "Italicise one word in a headline, never a full sentence.",
        "Set all buttons and labels in small tracked uppercase.",
      ],
    },
    layout: {
      grid: "12 columns · 32px gutter · 120px outer margin on desktop",
      spacing: "8px base. Section spacing 160px desktop, 96px mobile.",
      radius: "0. Arched top only on hero imagery.",
      rules: [
        "Leave at least 40% of every layout empty.",
        "Show one product or one idea per screen or slide.",
        "Align text flush left on a narrow column, offset from the image.",
        "Use hairline rules (1px Greige) to separate content, not boxes.",
        "Put the logo small and centred. It does not need to compete.",
      ],
    },
    photography: {
      summary: "Still-life and slow portraiture with soft daylight, tonal backgrounds and room to breathe.",
      rules: [
        "Natural side light from one window, with soft shadow.",
        "Tonal sets: stone, linen, plaster in the palette colours.",
        "Close crops on texture: stitching, metal, skin.",
        "Models look away from camera. No posed smiles.",
        "Grade warm and slightly desaturated. Keep blacks soft.",
      ],
      shots: [
        { caption: "Ring on travertine, raking window light", tone: ["#D8D0C4", "#A79C8E", "#5E554C"] },
        { caption: "Hand in linen sleeve, shallow focus", tone: ["#E6E0D8", "#C2B6A6", "#7A6E62"] },
        { caption: "Empty hotel suite, late afternoon", tone: ["#CFC4B4", "#8E8173", "#2E2A27"] },
      ],
      avoid: ["Hard flash and glossy reflections", "Busy props and lifestyle clutter", "Saturated colour backdrops"],
    },
    graphics: [
      "Hairline frames with generous inner padding",
      "Arched image masks for hero visuals",
      "Monogram mark used as a watermark at 4% opacity",
      "Thin Champagne rule under section titles (40px wide)",
      "Numbered collection captions: N° 01, N° 02",
    ],
    motif: "Hairline frame with an arched window and monogram",
    ui: {
      notes: [
        "Buttons are text with a hairline border. Primary is filled Onyx.",
        "Inputs are a single bottom rule, no box.",
        "Cards have no shadow and no radius. Space separates them.",
        "Hover states change underline or opacity, never colour jumps.",
      ],
      primary: "Book a private viewing",
      secondary: "View collection",
      inputLabel: "Email address",
      inputValue: "client@example.com",
      tags: ["18k gold", "Ethically sourced", "Made to order"],
      card: { title: "The Solène Ring", meta: "N° 04 · Yellow gold", price: "From 4,200 EUR" },
    },
    social: {
      notes: [
        "One product, one line of copy. Logo small at the bottom.",
        "Alternate product stills with texture close-ups to make a calm grid.",
        "Stories use the same stills with slow zoom, no stickers.",
      ],
      feed: { eyebrow: "N° 04", headline: "Made to be *kept*.", body: "The Solène collection", cta: "" },
      story: { eyebrow: "Atelier", headline: "Sixty hours. One ring.", cta: "Discover" },
      ad: { eyebrow: "Private appointments", headline: "Visit the atelier", cta: "Book a viewing" },
    },
    website: {
      notes: [
        "Hero: one arched image and a short headline, nothing else above the fold.",
        "Navigation in small tracked caps, centred logo.",
        "Long-scroll storytelling with alternating image and text.",
      ],
      nav: ["Collections", "Atelier", "Appointments"],
      hero: { eyebrow: "Spring collection", headline: "Pieces made to be *kept*.", sub: "Hand-finished in our Paris atelier, each piece is made to order and signed by its maker.", cta: "Explore the collection", cta2: "Our atelier" },
      features: [
        { title: "Made to order", text: "Every piece is made for one client." },
        { title: "Lifetime care", text: "Free polishing and resizing, forever." },
        { title: "Private viewings", text: "By appointment in Paris and Dubai." },
      ],
    },
    dos: ["Let one image fill the frame", "Use italics for emphasis", "Keep copy under 12 words per frame"],
    donts: ["Discount badges or urgency copy", "More than one accent colour", "Drop shadows or gradients"],
    domain: "maisonvelline.example",
    sectors: ["Luxury & fashion", "Real estate", "Hospitality & travel", "Beauty & wellness", "Finance & professional services"],
    moods: ["Premium", "Calm", "Minimal"],
    applications: ["Brand identity", "Print & editorial", "Websites", "Packaging", "Social media"],
    advertising: {
      "campaign": "Made to Be Kept",
      "idea": "Each execution isolates one piece on stone with a single line about permanence. The scarcity of words is the message.",
      "billboard": {
        "eyebrow": "Maison Velline · Paris",
        "headline": "Made to be *kept*.",
        "cta": "maisonvelline.example"
      },
      "banner": {
        "headline": "Private viewings, by appointment.",
        "cta": "Book"
      },
      "notes": [
        "Billboards carry one image and five words at most.",
        "Book premium districts, airports and hotel lobbies. Avoid cluttered roadside sites.",
        "Digital banners use the same still with a slow 6-second zoom and no other animation."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Brand presentation · 2027",
        "title": "The Solène *collection*",
        "sub": "Launch plan for Paris and Dubai"
      },
      "content": {
        "title": "Who we are designing for",
        "metric": {
          "value": "35–55",
          "label": "core collector age range"
        },
        "points": [
          "Buy once, keep for decades",
          "Expect privacy, not promotion",
          "Visit by appointment"
        ]
      },
      "notes": [
        "One idea per slide, set in the light display weight.",
        "Full-bleed stills between sections to slow the pace.",
        "Charts in Onyx and Greige only. Champagne marks the key value."
      ]
    },
    brand: {
      "person": {
        "name": "Camille Roux",
        "role": "Client Director"
      },
      "email": "camille@maisonvelline.example",
      "applications": [
        "Packaging: Pearl rigid box, blind-embossed monogram, Champagne grosgrain ribbon",
        "Stationery: cotton paper, Onyx letterpress, no full-colour printing",
        "Retail: plaster walls, one spotlight per vitrine",
        "Signage: brushed brass monogram, never illuminated letters"
      ],
      "notes": [
        "The monogram works alone at small sizes. The full wordmark needs 40mm width or more.",
        "Print with one or two inks plus blind embossing.",
        "Touch matters: specify paper weight and finish on every print job."
      ]
    },
    tokens: {
      bg: "#EEEBE6", surface: "#F7F5F1", ink: "#1A1918", muted: "#6E655C", accent: "#B49A6A", accentText: "#7D6436", accent2: "#1A1918", onAccent: "#1A1918", line: "#B5ADA3",
      fontDisplay: "'Cormorant Garamond', Georgia, serif", fontBody: "'Jost', 'Helvetica Neue', Arial, sans-serif",
      displayWeight: "300", displayCase: "none", displayTracking: "-0.01em", displayStyle: "normal",
      radius: "0px", btnRadius: "0px", borderWidth: "1px", shadow: "none",
    },
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: "swiss-precision",
    name: "Swiss Precision",
    tagline: "Clarity built on a visible grid.",
    sampleBrand: "Brandt Okafor Advisory",
    sampleBrandType: "Strategy and finance consultancy",
    concept:
      "Based on the International Typographic Style, Swiss Precision gets its authority from order. A strict modular grid, one grotesk family, flush-left text and a single signal red make complex information look under control. Numbers and data are treated as design elements.",
    keywords: ["Objective", "Rational", "Structured", "Confident", "Direct"],
    industries: [
      "Consulting and advisory",
      "Banking and fintech (B2B)",
      "Law firms",
      "Architecture and engineering",
      "Annual reports and investor relations",
      "Industrial and manufacturing",
    ],
    palette: [
      { name: "Paper", hex: "#FFFFFF", role: "Primary background", share: 62 },
      { name: "Ink", hex: "#111111", role: "Text, rules, data", share: 24 },
      { name: "Concrete", hex: "#E9E9E7", role: "Panels, table stripes", share: 8 },
      { name: "Graphite", hex: "#5C5C5C", role: "Secondary text", share: 3 },
      { name: "Signal Red", hex: "#E2231A", role: "Accent: one key number or action", share: 3 },
    ],
    paletteRule:
      "Use Signal Red once per layout, on the single most important number, word or action.",
    typography: {
      display: { family: "Instrument Sans", fallback: "Helvetica Neue, Arial, sans-serif", weights: "500, 700", use: "Headlines, large figures" },
      body: { family: "Instrument Sans", fallback: "Helvetica Neue, Arial, sans-serif", weights: "400, 500", use: "Body copy, tables, navigation" },
      utility: { family: "IBM Plex Mono", fallback: "Menlo, monospace", weights: "400", use: "Figures, footnotes, reference codes" },
      arabic: { family: "IBM Plex Sans Arabic", note: "Matches the neutral grotesk tone. Align Arabic to the right edge of the same grid columns." },
      scale: [
        { level: "Display", size: "88 / 88", weight: "700", detail: "-3% tracking, sentence case" },
        { level: "H1", size: "48 / 52", weight: "700", detail: "-2% tracking" },
        { level: "H2", size: "24 / 30", weight: "500", detail: "Sentence case" },
        { level: "Body", size: "16 / 24", weight: "400", detail: "Flush left, ragged right" },
        { level: "Caption", size: "12 / 16", weight: "400", detail: "Mono for figures and sources" },
      ],
      rules: [
        "Use one type family with no more than two weights per layout.",
        "Set text flush left and ragged right. Never justify or centre.",
        "Show hierarchy through size and position, not colour.",
      ],
    },
    layout: {
      grid: "12 columns · 24px gutter · baseline grid of 8px",
      spacing: "8px base. Modules snap to 4 × 8px rows.",
      radius: "0 everywhere.",
      rules: [
        "Show the grid: use 1px rules on column lines to structure content.",
        "Hang headlines from the top-left of their module.",
        "Use asymmetry: text in 5 columns, white space in 7.",
        "Number sections and figures (1.0, 1.1) for reference documents.",
        "Use oversized numerals as visual anchors.",
      ],
    },
    photography: {
      summary: "Documentary architecture and people at work, cropped hard to the grid.",
      rules: [
        "Architectural lines, stairs and facades, shot straight on.",
        "People in real workplaces, candid, mid-task.",
        "Crop images to exact grid modules, never free-floating.",
        "Use black and white with red as the only colour cue where possible.",
        "Neutral, even daylight.",
      ],
      shots: [
        { caption: "Concrete stairwell, symmetrical, straight on", tone: ["#D6D6D4", "#9A9A98", "#3A3A3A"] },
        { caption: "Partner at whiteboard, candid, b/w", tone: ["#EDEDED", "#8C8C8C", "#1C1C1C"] },
        { caption: "Glass facade grid, overcast sky", tone: ["#C9CDD1", "#7E858C", "#2B2F33"] },
      ],
      avoid: ["Stock handshakes and staged meetings", "Tilted or dramatic angles", "Warm colour grading"],
    },
    graphics: [
      "Visible column rules and grid crosses",
      "The red square: a solid block used as a section marker",
      "Oversized figures and percentages",
      "Simple data charts in ink with one red series",
      "Section numbers in mono (01.2)",
    ],
    motif: "Grid lines with a red square marker",
    ui: {
      notes: [
        "Rectangular buttons in Ink. Red only for the main action on a page.",
        "Inputs are boxed with a 1px Ink border and a label above.",
        "Tables use Concrete stripes and mono figures.",
        "Focus states are a 2px red outline.",
      ],
      primary: "Request a proposal",
      secondary: "Read the report",
      inputLabel: "Company",
      inputValue: "Northbridge Holdings",
      tags: ["Strategy", "M&A", "Risk"],
      card: { title: "Market outlook 2027", meta: "Report 04.2 · 36 pages", price: "+18.4% CAGR" },
    },
    social: {
      notes: [
        "Lead with one number or one statement per post.",
        "Carousels follow a numbered sequence, same grid on every slide.",
        "LinkedIn first. Keep the style consistent with reports.",
      ],
      feed: { eyebrow: "Insight 04", headline: "62% of mid-market deals stall at due diligence.", body: "Source: BOA Deal Survey 2026", cta: "" },
      story: { eyebrow: "Report 04.2", headline: "Market outlook 2027", cta: "Download" },
      ad: { eyebrow: "Advisory", headline: "Decisions, backed by data.", cta: "Book a call" },
    },
    website: {
      notes: [
        "Hero is typographic: a large statement plus one key figure.",
        "Use a visible 12-column grid across all pages.",
        "Case studies lead with the result number.",
      ],
      nav: ["Services", "Insights", "Team", "Contact"],
      hero: { eyebrow: "Strategy · Finance · Transactions", headline: "Clear advice for complex decisions.", sub: "We help leadership teams price risk, plan growth and close transactions with confidence.", cta: "Request a proposal", cta2: "Our insights" },
      features: [
        { title: "120+", text: "Transactions advised since 2011" },
        { title: "14", text: "Markets across Europe and the Gulf" },
        { title: "4.1bn", text: "Deal value under advisory in 2026" },
      ],
    },
    dos: ["Align everything to the grid", "Let numbers carry the message", "Keep one colour accent"],
    donts: ["Centred text blocks", "Decorative illustrations", "More than one font family"],
    domain: "boa.example",
    sectors: ["Finance & professional services", "Real estate", "Education & public sector", "Technology & SaaS"],
    moods: ["Trustworthy", "Minimal", "Technical"],
    applications: ["Presentations", "Print & editorial", "Websites", "Brand identity", "Advertising"],
    advertising: {
      "campaign": "Numbers First",
      "idea": "Every execution leads with one verified figure from the firm's own research, with the source printed underneath.",
      "billboard": {
        "eyebrow": "Brandt Okafor Advisory",
        "headline": "62% of deals stall at *due diligence*.",
        "cta": "boa.example/insight-04"
      },
      "banner": {
        "headline": "Market outlook 2027. 36 pages.",
        "cta": "Download"
      },
      "notes": [
        "Every figure carries its source in mono below it.",
        "Book airport, business-district and financial-press placements, plus LinkedIn.",
        "The red square sits in the same corner in every format."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Report 04.2",
        "title": "Market outlook *2027*",
        "sub": "Board briefing · sample deck"
      },
      "content": {
        "title": "2.1 Where deals stall",
        "metric": {
          "value": "62%",
          "label": "stall at due diligence"
        },
        "points": [
          "Data room not ready: 41%",
          "Valuation gap: 33%",
          "Regulatory review: 26%"
        ]
      },
      "notes": [
        "Number slides and sections (2.1, 2.2) so the deck can be cited in meetings.",
        "The slide title states the conclusion, not the topic.",
        "One red data point per chart."
      ]
    },
    brand: {
      "person": {
        "name": "Daniel Okafor",
        "role": "Managing Partner"
      },
      "email": "d.okafor@boa.example",
      "applications": [
        "Reports: A4, 12-column grid, mono figure captions",
        "Signage: black letters on white walls, red square as floor marker",
        "Email signature: name, title, one red square, no image logos",
        "Proposal covers: title at 88pt, report number in mono"
      ],
      "notes": [
        "The logo is a word plus the red square. Never redraw it in another colour.",
        "Templates (Word, PowerPoint) are part of the identity. Ship them with the logo.",
        "Keep one weight change per document level."
      ]
    },
    tokens: {
      bg: "#FFFFFF", surface: "#F3F3F1", ink: "#111111", muted: "#5C5C5C", accent: "#E2231A", accentText: "#C41E16", accent2: "#111111", onAccent: "#FFFFFF", line: "#111111",
      fontDisplay: "'Instrument Sans', 'Helvetica Neue', Arial, sans-serif", fontBody: "'Instrument Sans', 'Helvetica Neue', Arial, sans-serif",
      displayWeight: "700", displayCase: "none", displayTracking: "-0.03em", displayStyle: "normal",
      radius: "0px", btnRadius: "0px", borderWidth: "1px", shadow: "none",
    },
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: "neo-brutalism",
    name: "Neo-Brutalism",
    tagline: "Loud, honest, and a little unfinished.",
    sampleBrand: "Klonk",
    sampleBrandType: "Project tool for creators",
    concept:
      "Neo-Brutalism exposes how the design is built: thick black outlines, flat saturated fills and hard offset shadows. It reads as confident and anti-corporate, which suits challenger brands and audiences who are used to polished, interchangeable interfaces.",
    keywords: ["Bold", "Playful", "Raw", "Direct", "Anti-corporate"],
    industries: [
      "Tech startups and productivity apps",
      "Creator economy and education",
      "Streetwear and youth brands",
      "Event and festival promotion",
      "Gaming and digital communities",
    ],
    palette: [
      { name: "Canvas", hex: "#FFFDF5", role: "Background", share: 45 },
      { name: "Ink", hex: "#0D0D0D", role: "Outlines, text, shadows", share: 25 },
      { name: "Highlighter", hex: "#FFE14D", role: "Primary fill, highlights", share: 12 },
      { name: "Bubblegum", hex: "#FF7AB6", role: "Secondary fill", share: 8 },
      { name: "Electric", hex: "#4D6BFF", role: "Links, info fills", share: 6 },
      { name: "Mint", hex: "#3DDC97", role: "Success, tags", share: 4 },
    ],
    paletteRule:
      "Fills are always flat and always outlined in Ink. Never place two fill colours side by side without an Ink border between them.",
    typography: {
      display: { family: "Archivo Black", fallback: "Arial Black, Impact, sans-serif", weights: "400 (black)", use: "Headlines, stickers, big numbers" },
      body: { family: "Archivo", fallback: "Arial, sans-serif", weights: "400, 600", use: "Body copy, UI" },
      utility: { family: "Space Mono", fallback: "Courier New, monospace", weights: "400, 700", use: "Labels, tags, meta data" },
      arabic: { family: "Changa (display) · IBM Plex Sans Arabic (body)", note: "Changa's heavy geometric forms hold up inside thick outlines and stickers." },
      scale: [
        { level: "Display", size: "80 / 80", weight: "400 black", detail: "Uppercase optional, -2% tracking" },
        { level: "H1", size: "44 / 48", weight: "400 black", detail: "Sentence case" },
        { level: "H2", size: "24 / 30", weight: "600", detail: "Archivo semi-bold" },
        { level: "Body", size: "17 / 26", weight: "400", detail: "Left aligned" },
        { level: "Tag", size: "12 / 16", weight: "700", detail: "Space Mono, uppercase" },
      ],
      rules: [
        "Headlines should feel heavy. Never use a light weight.",
        "Highlight key words with a yellow marker block behind them.",
        "Mono for anything meta: dates, counts, tags.",
      ],
    },
    layout: {
      grid: "12 columns · 24px gutter · elements may break the grid by up to 1 column",
      spacing: "8px base. Generous padding inside boxes (24–32px).",
      radius: "0–12px. Keep one radius per project.",
      rules: [
        "Every container has a 3px Ink outline.",
        "Hard shadow: 6px 6px 0 Ink, no blur.",
        "Rotate stickers and badges by -6° to 6°.",
        "Stack boxes and let them overlap slightly.",
        "Pressed states move the element into its shadow.",
      ],
    },
    photography: {
      summary: "Cut-out people and objects on flat colour, shot with flash.",
      rules: [
        "Direct flash, high contrast, real expressions.",
        "Cut out subjects and place them on flat palette fills.",
        "Add an Ink outline around cut-outs.",
        "Mix photo with doodles and arrows.",
        "Product UI screenshots framed in outlined windows.",
      ],
      shots: [
        { caption: "Creator mid-laugh, direct flash, cut-out", tone: ["#FFE14D", "#FF7AB6", "#0D0D0D"] },
        { caption: "Laptop with UI, flat pink background", tone: ["#FF7AB6", "#4D6BFF", "#0D0D0D"] },
        { caption: "Team high-five, overhead, flash", tone: ["#3DDC97", "#FFE14D", "#0D0D0D"] },
      ],
      avoid: ["Soft, moody lighting", "Glossy stock photography", "Gradients over images"],
    },
    graphics: [
      "Thick outlined boxes with hard offset shadows",
      "Rotated stickers and starburst badges",
      "Marker highlights behind words",
      "Hand-drawn arrows and underlines",
      "Window chrome frames (three dots, title bar)",
    ],
    motif: "Outlined sticker with hard shadow",
    ui: {
      notes: [
        "Buttons: Highlighter fill, Ink outline, hard shadow. Press moves 4px.",
        "Inputs: thick outline, mono placeholder.",
        "Cards: coloured header bar, outlined body.",
        "Toasts and modals look like stickers, slightly rotated.",
      ],
      primary: "Start for free",
      secondary: "See templates",
      inputLabel: "Project name",
      inputValue: "Summer drop v2",
      tags: ["Design", "Due Fri", "3 files"],
      card: { title: "Launch checklist", meta: "12 of 18 done", price: "67%" },
    },
    social: {
      notes: [
        "One big statement, one sticker, one product shot per post.",
        "Memes and reactive posts fit this style. Keep the outline system.",
        "Carousels can look like app screens.",
      ],
      feed: { eyebrow: "New", headline: "Stop losing files in 9 group chats.", body: "Klonk keeps every project in one place.", cta: "Try it free" },
      story: { eyebrow: "Drop day", headline: "Templates are live!", cta: "Swipe up" },
      ad: { eyebrow: "Free forever plan", headline: "Plan less. Make more.", cta: "Get Klonk" },
    },
    website: {
      notes: [
        "Hero with a huge headline, a marker highlight and an outlined product window.",
        "Features as a grid of outlined cards in rotating fill colours.",
        "Testimonials as rotated stickers.",
      ],
      nav: ["Product", "Templates", "Pricing"],
      hero: { eyebrow: "For creators and small teams", headline: "Plan less. *Make more.*", sub: "Briefs, files and feedback in one board. No more hunting through chats.", cta: "Start for free", cta2: "See templates" },
      features: [
        { title: "Boards", text: "Drag projects from idea to done." },
        { title: "Feedback", text: "Comments pinned right on the file." },
        { title: "Templates", text: "120+ ready-made workflows." },
      ],
    },
    dos: ["Commit to thick outlines everywhere", "Use humour in copy", "Let things overlap"],
    donts: ["Soft shadows or blur", "Thin hairline borders", "Muted pastel tints"],
    domain: "klonk.example",
    sectors: ["Technology & SaaS", "Media, arts & culture", "Retail & FMCG", "Education & public sector"],
    moods: ["Bold", "Playful", "Energetic"],
    applications: ["Social media", "Websites", "Advertising", "Events", "Brand identity"],
    advertising: {
      "campaign": "Group Chat Graveyard",
      "idea": "Turns the everyday pain of files lost in chat threads into exaggerated, outlined evidence stickers.",
      "billboard": {
        "eyebrow": "Klonk",
        "headline": "Your files deserve better than *9 group chats*.",
        "cta": "klonk.example"
      },
      "banner": {
        "headline": "Plan less. Make more.",
        "cta": "Try free"
      },
      "notes": [
        "Every sticker in the ads can be printed and handed out at events.",
        "Wild-posting, campus and co-working sites suit this style better than premium sites.",
        "Banners move with hard cuts and no easing."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Investor update · Q3",
        "title": "Klonk is growing *fast*.",
        "sub": "Sample deck · fictional numbers"
      },
      "content": {
        "title": "What creators told us",
        "metric": {
          "value": "9",
          "label": "chat threads per project, on average"
        },
        "points": [
          "Files get lost",
          "Feedback lives in screenshots",
          "Deadlines slip"
        ]
      },
      "notes": [
        "Every slide is an outlined card on Canvas with a hard shadow.",
        "A sticker flags the takeaway on each slide.",
        "Product screens sit in outlined windows."
      ]
    },
    brand: {
      "person": {
        "name": "Jo Mbeki",
        "role": "Co-founder"
      },
      "email": "jo@klonk.example",
      "applications": [
        "Stickers: die-cut, thick black outline, sold in rotated packs",
        "Merch: tote bag with one oversized word and a hard shadow",
        "Office: painted outlined boxes on the walls as wayfinding",
        "App icon: yellow square, black outline, offset shadow"
      ],
      "notes": [
        "The outline weight scales with size: 3px on screen, 1.5mm in print.",
        "Fills rotate across products but outlines are always Ink.",
        "Humour in copy is part of the brand. Keep it kind."
      ]
    },
    tokens: {
      bg: "#FFFDF5", surface: "#FFFFFF", ink: "#0D0D0D", muted: "#3D3D3D", accent: "#FFE14D", accentText: "#0D0D0D", accent2: "#FF7AB6", onAccent: "#0D0D0D", line: "#0D0D0D",
      fontDisplay: "'Archivo Black', 'Arial Black', Impact, sans-serif", fontBody: "'Archivo', Arial, sans-serif",
      displayWeight: "400", displayCase: "none", displayTracking: "-0.02em", displayStyle: "normal",
      radius: "10px", btnRadius: "10px", borderWidth: "3px", shadow: "6px 6px 0 #0D0D0D",
    },
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: "organic-earth",
    name: "Organic Earth",
    tagline: "Grown, not manufactured.",
    sampleBrand: "Fernhollow",
    sampleBrandType: "Botanical skincare",
    concept:
      "Organic Earth uses soft natural forms, plant-derived colours and a warm serif to signal care, provenance and honesty. Layouts feel hand-arranged rather than engineered, and texture matters as much as colour.",
    keywords: ["Natural", "Warm", "Honest", "Calm", "Crafted"],
    industries: [
      "Natural skincare and wellness",
      "Organic food and beverage",
      "Sustainable home goods",
      "Yoga, retreats and eco-tourism",
      "Farm-to-table restaurants",
      "Plant shops and florists",
    ],
    palette: [
      { name: "Oat", hex: "#E9E4D8", role: "Primary background", share: 50 },
      { name: "Moss", hex: "#3F4F35", role: "Text, deep sections", share: 22 },
      { name: "Sage", hex: "#A3B18A", role: "Secondary surfaces", share: 14 },
      { name: "Clay Rose", hex: "#C98F7E", role: "Accent: actions, highlights", share: 8 },
      { name: "Bark", hex: "#4A3B30", role: "Secondary text on light", share: 6 },
    ],
    paletteRule:
      "Every colour should exist in nature. Pair Moss and Oat for text, and keep Clay Rose for calls to action and small highlights.",
    typography: {
      display: { family: "Fraunces", fallback: "Georgia, serif", weights: "400, 600 · soft optical size", use: "Headlines, product names" },
      body: { family: "Karla", fallback: "Helvetica, Arial, sans-serif", weights: "400, 500", use: "Body, UI, ingredients lists" },
      arabic: { family: "Tajawal (body) · Reem Kufi Fun (display)", note: "Rounded, friendly Arabic forms keep the hand-made feel." },
      scale: [
        { level: "Display", size: "64 / 70", weight: "400", detail: "Sentence case, soft optical size" },
        { level: "H1", size: "42 / 50", weight: "400", detail: "Italic for one key word" },
        { level: "H2", size: "24 / 32", weight: "600", detail: "Sentence case" },
        { level: "Body", size: "17 / 28", weight: "400", detail: "Comfortable line height" },
        { level: "Label", size: "13 / 18", weight: "500", detail: "Sentence case, never all caps" },
      ],
      rules: [
        "Keep headlines in sentence case. Caps feel clinical here.",
        "Write in a warm, first-person plural voice: we grow, we pick.",
        "List ingredients in the body font with their origin.",
      ],
    },
    layout: {
      grid: "12 columns · 32px gutter · loose asymmetric placement",
      spacing: "8px base. Large rounded containers with 40px padding.",
      radius: "24px containers · full pill buttons · organic blob masks on images",
      rules: [
        "Mask images with soft blob or pebble shapes.",
        "Overlap leaves or botanicals across section edges.",
        "Use paper grain texture at low opacity on backgrounds.",
        "Group content in rounded, softly tinted containers.",
        "Keep a slow vertical rhythm with plenty of air.",
      ],
    },
    photography: {
      summary: "Ingredients, hands and landscapes in soft daylight with earthy tones.",
      rules: [
        "Raw ingredients as hero subjects: roots, leaves, oils.",
        "Hands at work: picking, pouring, applying.",
        "Natural light, slight warmth, gentle shadows.",
        "Textured surfaces: wood, stone, linen, soil.",
        "Real skin, no heavy retouching.",
      ],
      shots: [
        { caption: "Hands pouring oil over sage leaves", tone: ["#C9CFB5", "#8E9A73", "#3F4F35"] },
        { caption: "Amber bottle on wet river stone", tone: ["#D8C7B2", "#A07D63", "#4A3B30"] },
        { caption: "Fern field at morning, soft haze", tone: ["#DCE2CC", "#A3B18A", "#56664A"] },
      ],
      avoid: ["Cold blue lighting", "Sterile white studio backgrounds", "Plastic packaging close-ups"],
    },
    graphics: [
      "Organic blob and pebble shapes",
      "Line-drawn botanical illustrations",
      "Paper grain and recycled-paper textures",
      "Stamp-style badges: Certified organic, Vegan",
      "Hand-drawn underlines in Clay Rose",
    ],
    motif: "Soft blob shapes with a botanical line",
    ui: {
      notes: [
        "Pill buttons in Moss. Primary actions in Clay Rose.",
        "Rounded inputs with a Sage tint and no hard border.",
        "Product cards with a pebble-shaped image mask.",
        "Gentle 300ms transitions, nothing snappy.",
      ],
      primary: "Shop the ritual",
      secondary: "Our ingredients",
      inputLabel: "Skin type",
      inputValue: "Combination",
      tags: ["Vegan", "Cold-pressed", "Refillable"],
      card: { title: "Sage & Rosehip Oil", meta: "30 ml · Glass bottle", price: "28 EUR" },
    },
    social: {
      notes: [
        "Mix product shots with ingredient stories and behind-the-scenes.",
        "Use the blob shape as a consistent frame across the grid.",
        "Captions read like a conversation, never a sales pitch.",
      ],
      feed: { eyebrow: "From our garden", headline: "Rosehip, picked by hand in October.", body: "", cta: "" },
      story: { eyebrow: "Morning ritual", headline: "Three drops. That's it.", cta: "Shop now" },
      ad: { eyebrow: "New · Refill pouch", headline: "Less plastic, same glow.", cta: "Shop refills" },
    },
    website: {
      notes: [
        "Hero with a blob-masked product image and a soft serif headline.",
        "Ingredient stories as alternating rounded sections.",
        "Sustainability facts as stamp badges.",
      ],
      nav: ["Shop", "Ingredients", "Our farm"],
      hero: { eyebrow: "Botanical skincare", headline: "Skincare grown, *not made*.", sub: "Cold-pressed oils from our own farm, bottled in glass and shipped plastic-free.", cta: "Shop the ritual", cta2: "Visit the farm" },
      features: [
        { title: "Farm grown", text: "80% of ingredients from our fields." },
        { title: "Plastic-free", text: "Glass bottles and compostable mailers." },
        { title: "Small batch", text: "Pressed every six weeks." },
      ],
    },
    dos: ["Use real texture", "Show where things come from", "Round every corner"],
    donts: ["Neon or synthetic colours", "Hard geometric grids", "All-caps headlines"],
    domain: "fernhollow.example",
    sectors: ["Beauty & wellness", "Food & beverage", "Hospitality & travel", "Retail & FMCG"],
    moods: ["Natural", "Calm", "Warm"],
    applications: ["Packaging", "Social media", "Websites", "Brand identity", "Print & editorial"],
    advertising: {
      "campaign": "From Our Fields",
      "idea": "Each execution names the field an ingredient came from and the month it was harvested.",
      "billboard": {
        "eyebrow": "Fernhollow · Field 7",
        "headline": "Rosehip, picked by hand in *October*.",
        "cta": "fernhollow.example"
      },
      "banner": {
        "headline": "Refills that skip the plastic.",
        "cta": "Shop"
      },
      "notes": [
        "Print on uncoated or recycled stock, and say so on the ad.",
        "Book transit near wellness venues, organic grocers and yoga studios.",
        "Banner motion is a slow leaf drift or pour, under 8 seconds."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Retail partner deck",
        "title": "Grown, *not made*.",
        "sub": "Fernhollow for natural retailers"
      },
      "content": {
        "title": "Why it sells through",
        "metric": {
          "value": "80%",
          "label": "of ingredients from our own fields"
        },
        "points": [
          "Glass, refillable packaging",
          "Small batches every six weeks",
          "Story-led shelf display"
        ]
      },
      "notes": [
        "Rounded image masks on generous Oat backgrounds.",
        "Ingredient photography between sections.",
        "Slide titles are sentences, never all caps."
      ]
    },
    brand: {
      "person": {
        "name": "Maren Holt",
        "role": "Head of Retail"
      },
      "email": "maren@fernhollow.example",
      "applications": [
        "Packaging: amber glass, uncoated label, line-drawn botanical, Clay Rose batch stamp",
        "Shipping: kraft mailer, stamp-style seal, compostable tape",
        "Retail: wooden shelf, linen backdrop, hand-lettered price cards",
        "Market stall: Moss canopy with certification stamps"
      ],
      "notes": [
        "Labels print on uncoated stock, so check colour on the real paper.",
        "Botanical drawings are single-weight line art, never filled.",
        "Certification badges follow the issuing body's rules, not the brand palette."
      ]
    },
    tokens: {
      bg: "#E9E4D8", surface: "#F3F0E8", ink: "#3F4F35", muted: "#4A3B30", accent: "#C98F7E", accentText: "#874B3B", accent2: "#A3B18A", onAccent: "#2C2420", line: "#A3B18A",
      fontDisplay: "'Fraunces', Georgia, serif", fontBody: "'Karla', Helvetica, Arial, sans-serif",
      displayWeight: "400", displayCase: "none", displayTracking: "-0.01em", displayStyle: "normal",
      radius: "24px", btnRadius: "999px", borderWidth: "1px", shadow: "none",
    },
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: "future-tech",
    name: "Future Tech",
    tagline: "Light from a dark screen.",
    sampleBrand: "Ortelia",
    sampleBrandType: "AI analytics platform",
    concept:
      "Future Tech is built on a deep dark base with glowing accents, layered glass panels and precise geometric type. It suggests speed, intelligence and scale, and lets product UI be the main visual.",
    keywords: ["Intelligent", "Fast", "Precise", "Immersive", "Ambitious"],
    industries: [
      "SaaS and AI products",
      "Fintech and crypto",
      "Cybersecurity",
      "Telecom and connectivity",
      "Gaming and esports platforms",
      "Tech conferences",
    ],
    palette: [
      { name: "Void", hex: "#0A0B14", role: "Primary background", share: 55 },
      { name: "Hull", hex: "#151830", role: "Panels, cards", share: 20 },
      { name: "Frost", hex: "#E6E8F2", role: "Text", share: 12 },
      { name: "Ion Violet", hex: "#6C55F2", role: "Primary accent, gradients", share: 7 },
      { name: "Plasma Cyan", hex: "#2DE2E6", role: "Data highlights, links", share: 4 },
      { name: "Signal Pink", hex: "#FF5CA8", role: "Alerts, gradient end", share: 2 },
    ],
    paletteRule:
      "Gradients only run between Ion Violet, Plasma Cyan and Signal Pink, and only on dark backgrounds. Never set body text in an accent colour.",
    typography: {
      display: { family: "Sora", fallback: "Segoe UI, Arial, sans-serif", weights: "300, 600", use: "Headlines, big metrics" },
      body: { family: "Manrope", fallback: "Segoe UI, Arial, sans-serif", weights: "400, 500", use: "Body, UI" },
      utility: { family: "IBM Plex Mono", fallback: "Menlo, monospace", weights: "400", use: "Code, metrics, timestamps" },
      arabic: { family: "Readex Pro", note: "Geometric and variable, with matching low contrast. Works well in dark UI." },
      scale: [
        { level: "Display", size: "72 / 76", weight: "600", detail: "-3% tracking, gradient fill allowed" },
        { level: "H1", size: "44 / 50", weight: "600", detail: "-2% tracking" },
        { level: "H2", size: "24 / 30", weight: "300", detail: "Light weight for contrast" },
        { level: "Body", size: "16 / 26", weight: "400", detail: "Frost at 80% opacity" },
        { level: "Mono", size: "12 / 16", weight: "400", detail: "Uppercase, +8% tracking" },
      ],
      rules: [
        "A gradient fill is allowed on one headline per layout.",
        "Use mono for data, versions and status labels.",
        "Use 80% Frost for body text to reduce glare on dark backgrounds.",
      ],
    },
    layout: {
      grid: "12 columns · 24px gutter · centred 1200px container",
      spacing: "8px base. Sections float on the dark field with 128px spacing.",
      radius: "16px panels · 10px buttons",
      rules: [
        "Layer translucent glass panels over glow fields.",
        "Product UI is the hero visual. Show the real interface.",
        "Use a faint dot or line grid in the background.",
        "Light comes from behind: radial glows behind key elements.",
        "Data and metrics get their own bold modules.",
      ],
    },
    photography: {
      summary: "Minimal photography. Product UI, 3D renders and abstract light.",
      rules: [
        "Prefer UI screenshots and 3D abstract renders over photos.",
        "When using people: low-key light, screen glow on faces.",
        "Add neon rim light in Violet or Cyan.",
        "Grade cool with crushed blacks.",
        "Abstract fibre-optic or data-flow imagery as backgrounds.",
      ],
      shots: [
        { caption: "Engineer lit by monitor glow, low key", tone: ["#2A2560", "#6C55F2", "#0A0B14"] },
        { caption: "Abstract light trails, long exposure", tone: ["#2DE2E6", "#6C55F2", "#0A0B14"] },
        { caption: "3D glass shape with pink rim light", tone: ["#FF5CA8", "#3B2D8F", "#0A0B14"] },
      ],
      avoid: ["Bright daylight office stock", "Warm colour grades", "Cluttered desk shots"],
    },
    graphics: [
      "Gradient mesh glow fields",
      "Frosted glass panels with a 1px light border",
      "Dot and line grids",
      "Data lines, nodes and orbit paths",
      "Glowing status indicators",
    ],
    motif: "Glow field with orbit lines and a glass panel",
    ui: {
      notes: [
        "Primary button: violet-to-cyan gradient with a soft glow on hover.",
        "Glass cards: 6% white fill, 1px 12% white border, backdrop blur.",
        "Inputs: dark fill, focus ring in Plasma Cyan.",
        "Charts in Cyan and Violet on a faint grid.",
      ],
      primary: "Start free trial",
      secondary: "Watch demo",
      inputLabel: "Work email",
      inputValue: "lina@northwind.io",
      tags: ["Live", "v4.2", "SOC 2"],
      card: { title: "Revenue forecast", meta: "Updated 2 min ago", price: "+24.7%" },
    },
    social: {
      notes: [
        "Product reveals with glowing UI fragments.",
        "Big metric posts: one number, one gradient.",
        "Short motion loops: data flowing, panels assembling.",
      ],
      feed: { eyebrow: "Ortelia 4.2", headline: "Forecasts in 3 seconds, not 3 weeks.", body: "", cta: "" },
      story: { eyebrow: "Launch", headline: "Meet Copilot for Finance", cta: "Join waitlist" },
      ad: { eyebrow: "14-day free trial", headline: "Your data, finally talking back.", cta: "Start free" },
    },
    website: {
      notes: [
        "Dark hero with a gradient headline and a floating product UI.",
        "Logo wall of customers in 40% Frost.",
        "Feature grid of glass cards with small glowing icons.",
      ],
      nav: ["Product", "Solutions", "Pricing", "Docs"],
      hero: { eyebrow: "AI analytics", headline: "Ask your data *anything*.", sub: "Ortelia connects to your warehouse and answers business questions in plain language.", cta: "Start free trial", cta2: "Watch demo" },
      features: [
        { title: "3s", text: "Median answer time" },
        { title: "200+", text: "Native data connectors" },
        { title: "SOC 2", text: "Type II certified" },
      ],
    },
    dos: ["Show the real product", "Use glow sparingly as light, not decoration", "Keep text contrast high"],
    donts: ["Gradients on light backgrounds", "Accent-coloured paragraphs", "Generic robot or circuit-board imagery"],
    domain: "ortelia.example",
    sectors: ["Technology & SaaS", "Finance & professional services", "Media, arts & culture"],
    moods: ["Technical", "Bold", "Premium"],
    applications: ["Websites", "Presentations", "Social media", "Advertising", "Events"],
    advertising: {
      "campaign": "Ask Anything",
      "idea": "The ad is the product: a real business question typed into Ortelia, with the answer appearing beneath it.",
      "billboard": {
        "eyebrow": "Ortelia · AI analytics",
        "headline": "Ask your data *anything*.",
        "cta": "ortelia.example"
      },
      "banner": {
        "headline": "Forecasts in 3 seconds.",
        "cta": "Start free"
      },
      "notes": [
        "Prefer digital and illuminated sites: dark creative glows at night.",
        "Show real UI fragments, never robots or circuit boards.",
        "Banner loop: the question types, the answer appears, 6 seconds."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Product keynote 2027",
        "title": "Ask your data *anything*.",
        "sub": "Ortelia 4.2 launch · sample deck"
      },
      "content": {
        "title": "Why teams switch",
        "metric": {
          "value": "3s",
          "label": "median answer time"
        },
        "points": [
          "200+ native connectors",
          "Answers cite their source tables",
          "SOC 2 Type II"
        ]
      },
      "notes": [
        "Dark slides with one glow field each.",
        "Gradient text on one keyword per section.",
        "Live product demos instead of screenshots where possible."
      ]
    },
    brand: {
      "person": {
        "name": "Lina Haddad",
        "role": "Head of Product Marketing"
      },
      "email": "lina@ortelia.example",
      "applications": [
        "Event stage: LED wall with glow field, glass lecterns",
        "Swag: matte black notebooks with cyan foil logo",
        "Office: dark meeting rooms with violet edge lighting",
        "App icon: violet orb with cyan rim on Void"
      ],
      "notes": [
        "Glows need a dark ground. On white, use the flat Ion Violet logo.",
        "Foil and LED replace gradients in physical applications.",
        "Motion is part of the brand: logo assembles from data points in 1.2s."
      ]
    },
    tokens: {
      bg: "#0A0B14", surface: "#151830", ink: "#E6E8F2", muted: "#A3A8C3", accent: "#6C55F2", accentText: "#9C88FF", accent2: "#2DE2E6", onAccent: "#FFFFFF", line: "rgba(230,232,242,0.14)",
      fontDisplay: "'Sora', 'Segoe UI', Arial, sans-serif", fontBody: "'Manrope', 'Segoe UI', Arial, sans-serif",
      displayWeight: "600", displayCase: "none", displayTracking: "-0.03em", displayStyle: "normal",
      radius: "16px", btnRadius: "10px", borderWidth: "1px", shadow: "0 0 40px rgba(108,85,242,0.35)",
    },
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: "bold-editorial",
    name: "Bold Editorial",
    tagline: "Every page is a cover.",
    sampleBrand: "The Margin",
    sampleBrandType: "Culture and fashion magazine",
    concept:
      "Bold Editorial borrows from fashion magazines and newspaper covers. Oversized high-contrast serif headlines, dramatic scale changes, column structure and full-bleed imagery give the brand a strong voice and an opinion.",
    keywords: ["Opinionated", "Dramatic", "Cultured", "Sharp", "Narrative"],
    industries: [
      "Media and publishing",
      "Fashion and luxury retail campaigns",
      "Museums, galleries and culture",
      "Film, music and events",
      "Personal brands and thought leaders",
    ],
    palette: [
      { name: "Paper", hex: "#FAFAF7", role: "Background", share: 55 },
      { name: "Ink", hex: "#0E0E0E", role: "Headlines, body, reversed sections", share: 30 },
      { name: "Stone", hex: "#D9D4CC", role: "Panels, image placeholders", share: 6 },
      { name: "Slate", hex: "#4A4A48", role: "Secondary text, captions", share: 5 },
      { name: "Edition Red", hex: "#C8102E", role: "Kickers, issue numbers, one highlight", share: 4 },
    ],
    paletteRule:
      "Mostly black and white. Edition Red marks the kicker, the issue number or one word.",
    typography: {
      display: { family: "Bodoni Moda", fallback: "Didot, 'Bodoni 72', Georgia, serif", weights: "400, 700 · italic", use: "Cover lines, headlines, drop caps" },
      body: { family: "Libre Franklin", fallback: "Franklin Gothic, Arial, sans-serif", weights: "400, 600, 800", use: "Body, kickers, captions" },
      arabic: { family: "Amiri (display) · Noto Kufi Arabic (kickers)", note: "High-contrast Naskh for headlines and a sturdy Kufi for small kickers mirrors the serif/grotesk split." },
      scale: [
        { level: "Cover", size: "120 / 104", weight: "400", detail: "Tight leading, mixes roman and italic" },
        { level: "H1", size: "56 / 60", weight: "700", detail: "-2% tracking" },
        { level: "Kicker", size: "12 / 16", weight: "800", detail: "Franklin uppercase, +12% tracking, red" },
        { level: "Body", size: "17 / 27", weight: "400", detail: "Two or three columns in print" },
        { level: "Caption", size: "12 / 17", weight: "400", detail: "Slate, italic for credits" },
      ],
      rules: [
        "Use extreme scale contrast: the headline is 6–8× the body size.",
        "Mix roman and italic in one headline for rhythm.",
        "Open long reads with a three-line drop cap.",
      ],
    },
    layout: {
      grid: "6 or 12 columns · 20px gutter · column rules between text columns",
      spacing: "8px base. Tight within groups, dramatic between them.",
      radius: "0.",
      rules: [
        "Headlines may run over images and bleed off the edge.",
        "Use full-bleed imagery for openers.",
        "Separate columns with 1px vertical rules.",
        "Put a masthead or kicker line at the top of every layout.",
        "Use pull quotes at display size to break long text.",
      ],
    },
    photography: {
      summary: "Fashion-editorial portraits with strong direction and dramatic light.",
      rules: [
        "Direct-to-camera portraits with attitude.",
        "Strong directional light, deep shadows.",
        "Both high-key and low-key are allowed, but commit to one per story.",
        "Crop boldly: cut through faces, extreme close-ups.",
        "Black-and-white for features and colour for fashion.",
      ],
      shots: [
        { caption: "Portrait, hard side light, direct gaze", tone: ["#BDB6AC", "#5A5550", "#0E0E0E"] },
        { caption: "Extreme close-up crop, red lip", tone: ["#E2D6CC", "#C8102E", "#2A1A1A"] },
        { caption: "Full-length look on seamless grey", tone: ["#D9D4CC", "#9A948C", "#3A3836"] },
      ],
      avoid: ["Smiling stock portraits", "Flat, even lighting", "Busy backgrounds behind the subject"],
    },
    graphics: [
      "Masthead and issue numbering",
      "Column rules and thick top bars",
      "Drop caps and pull quotes",
      "Red kicker labels",
      "Headline type overlapping imagery",
    ],
    motif: "Oversized drop cap with column rules",
    ui: {
      notes: [
        "Buttons are black rectangles with uppercase Franklin labels.",
        "Links underlined in red on hover.",
        "Article cards: image, red kicker, serif headline, byline.",
        "Section headers sit on a thick black top rule.",
      ],
      primary: "Subscribe",
      secondary: "Read the issue",
      inputLabel: "Your email",
      inputValue: "reader@example.com",
      tags: ["Culture", "Interview", "8 min read"],
      card: { title: "The return of slow fashion", meta: "By Noor Haddad", price: "Issue 27" },
    },
    social: {
      notes: [
        "Every post looks like a cover or a spread.",
        "Quote cards with huge serif quotation marks.",
        "Carousels read like turning pages.",
      ],
      feed: { eyebrow: "Issue 27 · Interview", headline: "“Style is a *decision*.”", body: "", cta: "" },
      story: { eyebrow: "On newsstands", headline: "The Slow Issue", cta: "Read now" },
      ad: { eyebrow: "Subscribe", headline: "Six issues. One point of view.", cta: "Subscribe" },
    },
    website: {
      notes: [
        "The homepage reads like a front page: lead story plus columns.",
        "Article pages: large headline, drop cap, pull quotes, wide images.",
        "A sticky masthead with issue number.",
      ],
      nav: ["Culture", "Fashion", "Ideas", "Issues"],
      hero: { eyebrow: "Cover story", headline: "The *slow* issue.", sub: "Twelve designers on why they are making less, and why it is working.", cta: "Read the story", cta2: "All issues" },
      features: [
        { title: "Culture", text: "The galleries rewriting the Gulf art map." },
        { title: "Fashion", text: "Inside the last tailoring house in Baghdad." },
        { title: "Ideas", text: "Why we stopped trusting algorithms." },
      ],
    },
    dos: ["Be dramatic with scale", "Use real, specific headlines", "Let images bleed"],
    donts: ["Small, timid headlines", "Rounded corners", "Colourful UI accents"],
    domain: "themargin.example",
    sectors: ["Media, arts & culture", "Luxury & fashion", "Education & public sector"],
    moods: ["Editorial", "Bold", "Premium"],
    applications: ["Print & editorial", "Social media", "Advertising", "Websites", "Presentations"],
    advertising: {
      "campaign": "Have a Point of View",
      "idea": "Cover lines from the current issue become the ads. Each one is a strong opinion in quotation marks.",
      "billboard": {
        "eyebrow": "The Margin · Issue 27",
        "headline": "“Style is a *decision*.”",
        "cta": "On newsstands now"
      },
      "banner": {
        "headline": "Six issues. One point of view.",
        "cta": "Subscribe"
      },
      "notes": [
        "Treat every ad like a cover: masthead, cover line, issue number.",
        "Book newsstand, metro and cultural-district sites.",
        "Animated banners turn like pages, two frames at most."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Media kit 2027",
        "title": "The *slow* issue.",
        "sub": "Advertising partnerships · sample deck"
      },
      "content": {
        "title": "Who reads The Margin",
        "metric": {
          "value": "48 min",
          "label": "average time spent with each issue"
        },
        "points": [
          "Culture-led professionals, 28–45",
          "Print and digital editions",
          "Quarterly events in Dubai and Beirut"
        ]
      },
      "notes": [
        "Slides look like spreads: kicker, headline, columns.",
        "Full-bleed portraits open each chapter.",
        "Use pull quotes at display size instead of bullet lists."
      ]
    },
    brand: {
      "person": {
        "name": "Noor Haddad",
        "role": "Editor-in-Chief"
      },
      "email": "noor@themargin.example",
      "applications": [
        "Magazine cover: fixed masthead, cover lines change per issue",
        "Tote bag: masthead in Bodoni, red issue number",
        "Event invitation: black card, red kicker, serif headline",
        "Newsletter: single column, drop cap, red kicker"
      ],
      "notes": [
        "The masthead is never recoloured except in Paper on Ink.",
        "Issue numbers are part of the identity system.",
        "Photography credits are always printed."
      ]
    },
    tokens: {
      bg: "#FAFAF7", surface: "#F0EEE9", ink: "#0E0E0E", muted: "#4A4A48", accent: "#C8102E", accentText: "#C8102E", accent2: "#0E0E0E", onAccent: "#FFFFFF", line: "#0E0E0E",
      fontDisplay: "'Bodoni Moda', Didot, 'Bodoni 72', Georgia, serif", fontBody: "'Libre Franklin', 'Franklin Gothic Medium', Arial, sans-serif",
      displayWeight: "400", displayCase: "none", displayTracking: "-0.02em", displayStyle: "normal",
      radius: "0px", btnRadius: "0px", borderWidth: "1px", shadow: "none",
    },
  },

  /* ------------------------------------------------------------------ 07 */
  {
    id: "playful-pop",
    name: "Playful Pop",
    tagline: "Bright, round and instantly likeable.",
    sampleBrand: "Sprinkle Lab",
    sampleBrandType: "Dessert bar and delivery",
    concept:
      "Playful Pop is cheerful and easy to like: saturated candy colours, rounded type, bouncy shapes and stickers. It is made for brands that want to be shared, snacked on and remembered, and it works best when it doesn't take itself seriously.",
    keywords: ["Joyful", "Friendly", "Energetic", "Shareable", "Warm"],
    industries: [
      "Food, desserts and cafés",
      "FMCG snacks and beverages",
      "Kids and family brands",
      "Delivery and consumer apps",
      "Toys, gifts and party supplies",
      "Seasonal and holiday campaigns",
    ],
    palette: [
      { name: "Vanilla", hex: "#FFF6E9", role: "Background", share: 40 },
      { name: "Cocoa", hex: "#2B1B17", role: "Text and outlines", share: 18 },
      { name: "Coral", hex: "#FF5E5B", role: "Primary brand colour", share: 16 },
      { name: "Mango", hex: "#FFB627", role: "Highlights, stickers", share: 12 },
      { name: "Lagoon", hex: "#00B2CA", role: "Secondary fills", share: 8 },
      { name: "Grape", hex: "#6B4EFF", role: "Accent, links", share: 6 },
    ],
    paletteRule:
      "Use up to three brand colours per layout. Coral leads, and the others rotate across posts to keep the feed varied but recognisable.",
    typography: {
      display: { family: "Fredoka", fallback: "'Arial Rounded MT Bold', Arial, sans-serif", weights: "500, 700", use: "Headlines, stickers, prices" },
      body: { family: "Nunito", fallback: "Arial, sans-serif", weights: "400, 700", use: "Body, menus, UI" },
      arabic: { family: "Baloo Bhaijaan 2", note: "Round and bouncy, a natural pair for Fredoka in bilingual menus and packaging." },
      scale: [
        { level: "Display", size: "72 / 72", weight: "700", detail: "Can tilt -3°, sentence case" },
        { level: "H1", size: "44 / 48", weight: "700", detail: "Sentence case" },
        { level: "H2", size: "24 / 30", weight: "500", detail: "Fredoka medium" },
        { level: "Body", size: "17 / 26", weight: "400", detail: "Nunito" },
        { level: "Sticker", size: "14 / 16", weight: "700", detail: "Uppercase in circles" },
      ],
      rules: [
        "Write headlines like a friend talking, with exclamation points allowed.",
        "Put prices in a sticker or a bubble.",
        "Use bold Nunito for emphasis, not italics.",
      ],
    },
    layout: {
      grid: "12 columns · 24px gutter · playful offsets allowed",
      spacing: "8px base. Chunky padding (24px+) inside everything.",
      radius: "20px cards · full pill buttons · circles for stickers",
      rules: [
        "Products float with a soft colour shadow.",
        "Stickers and badges sit on corners, rotated.",
        "Scatter confetti dots and squiggles around the hero.",
        "Use colour-block sections in rotating brand colours.",
        "Buttons have a chunky bottom shadow that compresses on press.",
      ],
    },
    photography: {
      summary: "Bright, colourful product photography with props and personality.",
      rules: [
        "Products on saturated colour backgrounds that match the palette.",
        "Top-down flat lays with playful arrangements.",
        "Motion moments: drips, sprinkles mid-air, bites.",
        "Bright, even light with crisp shadows.",
        "People laughing, sharing, real fun.",
      ],
      shots: [
        { caption: "Sundae on coral backdrop, sprinkles falling", tone: ["#FFB3A7", "#FF5E5B", "#B33A38"] },
        { caption: "Flat lay of donuts on mango yellow", tone: ["#FFE0A3", "#FFB627", "#C47F00"] },
        { caption: "Friends sharing a shake, bright daylight", tone: ["#A6EAF2", "#00B2CA", "#00657A"] },
      ],
      avoid: ["Dark, moody food photography", "Muted or desaturated grades", "Overly perfect, untouched food"],
    },
    graphics: [
      "Round stickers and starburst price badges",
      "Squiggles, sprinkles and confetti dots",
      "Chunky bottom-shadow buttons",
      "Speech bubbles",
      "Wavy section dividers",
    ],
    motif: "Confetti dots, squiggle and a sticker",
    ui: {
      notes: [
        "Pill buttons in Coral with a Cocoa bottom shadow.",
        "Rounded inputs with a 2px Cocoa border.",
        "Menu cards with a coloured top and a price sticker.",
        "Bouncy micro-interactions (spring easing).",
      ],
      primary: "Order now",
      secondary: "See the menu",
      inputLabel: "Delivery address",
      inputValue: "Al Karada, Street 62",
      tags: ["New!", "Best seller", "Vegan option"],
      card: { title: "Mango Cloud Sundae", meta: "Mango, coconut, crunchy bits", price: "6.50" },
    },
    social: {
      notes: [
        "Rotate background colours post by post for a rainbow grid.",
        "Use stickers for new items, deals and limited editions.",
        "Reels: fast cuts, sprinkle drops, bite moments.",
      ],
      feed: { eyebrow: "New flavour", headline: "Mango Cloud is here!", body: "Only until August.", cta: "" },
      story: { eyebrow: "Poll time", headline: "Sprinkles or no sprinkles?", cta: "Vote" },
      ad: { eyebrow: "Free delivery", headline: "Dessert in 20 minutes.", cta: "Order now" },
    },
    website: {
      notes: [
        "Hero with a floating product, stickers and confetti.",
        "Menu as colourful cards with add-to-cart buttons.",
        "Wavy dividers between colour-block sections.",
      ],
      nav: ["Menu", "Locations", "Parties"],
      hero: { eyebrow: "Desserts made happy", headline: "Life's short. *Eat dessert first.*", sub: "Handmade sundaes, shakes and donuts, delivered to your door in 20 minutes.", cta: "Order now", cta2: "See the menu" },
      features: [
        { title: "20 min", text: "Average delivery time" },
        { title: "36", text: "Flavours on rotation" },
        { title: "4.9", text: "Rating from 12k orders" },
      ],
    },
    dos: ["Rotate colours", "Use stickers for news", "Show motion and mess"],
    donts: ["Grey or muted palettes", "Sharp corners", "Formal copywriting"],
    domain: "sprinklelab.example",
    sectors: ["Food & beverage", "Retail & FMCG", "Hospitality & travel"],
    moods: ["Playful", "Energetic", "Warm"],
    applications: ["Social media", "Packaging", "Advertising", "Events", "Brand identity"],
    advertising: {
      "campaign": "Dessert First",
      "idea": "Celebrates eating dessert before dinner, with outsized products and price stickers.",
      "billboard": {
        "eyebrow": "Sprinkle Lab",
        "headline": "Dessert first. *Dinner later.*",
        "cta": "Order in the app"
      },
      "banner": {
        "headline": "Mango Cloud is here!",
        "cta": "Order"
      },
      "notes": [
        "Rotate background colours across sites in the same city.",
        "Book bus sides, food-delivery apps and mall screens.",
        "Bouncy banner animation with spring easing, three loops at most."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Franchise pitch",
        "title": "Life's short. *Eat dessert first.*",
        "sub": "Sprinkle Lab · sample deck"
      },
      "content": {
        "title": "A menu built for sharing",
        "metric": {
          "value": "36",
          "label": "flavours on rotation"
        },
        "points": [
          "Delivery in 20 minutes",
          "Seasonal drop every month",
          "Party boxes for 6 to 12"
        ]
      },
      "notes": [
        "Colour-block slides rotate Coral, Mango and Lagoon.",
        "Stickers mark new numbers.",
        "Use product cut-outs, not photos with backgrounds."
      ]
    },
    brand: {
      "person": {
        "name": "Rana Saleh",
        "role": "Founder"
      },
      "email": "rana@sprinklelab.example",
      "applications": [
        "Cups and boxes: one brand colour per product, sticker seal",
        "Delivery bag: Coral with Cocoa wordmark and confetti dots",
        "Store: Mango tiled counter, Grape neon sign",
        "Loyalty card: rounded corners, punch-out sprinkles"
      ],
      "notes": [
        "Cocoa is the text colour on every fill. White text only on Grape.",
        "Each product has its own colour, kept across packaging and social.",
        "Stickers carry news: new, limited, price."
      ]
    },
    tokens: {
      bg: "#FFF6E9", surface: "#FFFFFF", ink: "#2B1B17", muted: "#6B4E44", accent: "#FF5E5B", accentText: "#C93A37", accent2: "#FFB627", onAccent: "#2B1B17", line: "#2B1B17",
      fontDisplay: "'Fredoka', 'Arial Rounded MT Bold', Arial, sans-serif", fontBody: "'Nunito', Arial, sans-serif",
      displayWeight: "700", displayCase: "none", displayTracking: "-0.01em", displayStyle: "normal",
      radius: "20px", btnRadius: "999px", borderWidth: "2px", shadow: "0 5px 0 #2B1B17",
    },
  },

  /* ------------------------------------------------------------------ 08 */
  {
    id: "clinical-clarity",
    name: "Clinical Clarity",
    tagline: "Calm, clear and easy to trust.",
    sampleBrand: "Clearpoint Clinics",
    sampleBrandType: "Multi-specialty clinic group",
    concept:
      "Clinical Clarity combines clean white space with calm teal, friendly rounded geometry and highly legible type. It reassures people when they may be anxious, and it is built for accessibility first: strong contrast, clear actions and plain language.",
    keywords: ["Trustworthy", "Clean", "Caring", "Accessible", "Reassuring"],
    industries: [
      "Hospitals and clinics",
      "Pharma and medical devices",
      "Health insurance",
      "Dental and aesthetics clinics",
      "Education and e-learning",
      "Government and public services",
    ],
    palette: [
      { name: "White", hex: "#FFFFFF", role: "Primary background", share: 55 },
      { name: "Mist", hex: "#EEF5F6", role: "Section tints, cards", share: 18 },
      { name: "Deep Ink", hex: "#13293D", role: "Text, headers", share: 14 },
      { name: "Care Teal", hex: "#0F7C80", role: "Brand colour, primary actions", share: 9 },
      { name: "Sunrise", hex: "#F4A259", role: "Warm accent, highlights", share: 3 },
      { name: "Leaf", hex: "#2E8B57", role: "Success, availability", share: 1 },
    ],
    paletteRule:
      "Care Teal carries actions and must pass AA contrast (4.5:1) on white. Sunrise adds warmth and is never used for text.",
    typography: {
      display: { family: "Plus Jakarta Sans", fallback: "Segoe UI, Arial, sans-serif", weights: "600, 700", use: "Headlines, numbers" },
      body: { family: "Plus Jakarta Sans", fallback: "Segoe UI, Arial, sans-serif", weights: "400, 500", use: "Body, forms, UI" },
      arabic: { family: "IBM Plex Sans Arabic · Tajawal", note: "Use clear, open Arabic sans faces. Set Arabic body text one size larger than Latin for readability." },
      scale: [
        { level: "Display", size: "56 / 64", weight: "700", detail: "-2% tracking" },
        { level: "H1", size: "40 / 48", weight: "700", detail: "Sentence case" },
        { level: "H2", size: "24 / 32", weight: "600", detail: "Sentence case" },
        { level: "Body", size: "18 / 28", weight: "400", detail: "Minimum 16px anywhere" },
        { level: "Label", size: "14 / 20", weight: "500", detail: "Sentence case" },
      ],
      rules: [
        "Write in plain language at about a 12-year-old reading level.",
        "Never set body text below 16px.",
        "Lead with what the patient can do: book, call, find.",
      ],
    },
    layout: {
      grid: "12 columns · 24px gutter · 1200px max container",
      spacing: "8px base. Comfortable 24px card padding, 96px section spacing.",
      radius: "12px cards · 10px buttons · 50% icon containers",
      rules: [
        "Put a primary action (Book, Call) on every screen.",
        "Use Mist-tinted sections to group related information.",
        "Show icons in soft teal circles with a short label.",
        "Make touch targets at least 44px.",
        "Use a soft, low shadow on interactive cards only.",
      ],
    },
    photography: {
      summary: "Real staff and patients in bright, clean spaces with warm human moments.",
      rules: [
        "Real doctors and nurses, smiling and attentive.",
        "Patient interactions show care: eye contact, listening.",
        "Bright, airy interiors with natural light.",
        "Diverse ages and backgrounds, shown with dignity.",
        "Avoid needles, blood and anything distressing.",
      ],
      shots: [
        { caption: "Doctor listening to elderly patient, daylight", tone: ["#E3F0F1", "#9CCBCD", "#0F7C80"] },
        { caption: "Bright reception with plants", tone: ["#F4F8F8", "#C9DEDF", "#5C8F92"] },
        { caption: "Child laughing with nurse", tone: ["#FCE6D2", "#F4A259", "#0F7C80"] },
      ],
      avoid: ["Clinical close-ups of procedures", "Cold blue hospital lighting", "Obviously staged stock models"],
    },
    graphics: [
      "Line icons in soft teal circles",
      "Rounded info cards with icon headers",
      "Gentle wave or arc dividers",
      "Step indicators for patient journeys",
      "Availability dots in Leaf green",
    ],
    motif: "Soft arcs with an icon circle",
    ui: {
      notes: [
        "Primary buttons: solid Care Teal, white text, 10px radius.",
        "Large form fields with clear labels and helper text.",
        "Doctor cards with photo, specialty and next availability.",
        "Visible focus rings for keyboard users.",
      ],
      primary: "Book an appointment",
      secondary: "Find a doctor",
      inputLabel: "Preferred date",
      inputValue: "Tue, 14 October",
      tags: ["Cardiology", "Available today", "Arabic · English"],
      card: { title: "Dr. Sara Al-Amin", meta: "Cardiologist · 12 yrs", price: "Next: 10:30" },
    },
    social: {
      notes: [
        "Health tips in simple carousels: one tip per slide.",
        "Meet-the-doctor posts with a portrait and a quote.",
        "Awareness days use the same template with a Sunrise highlight.",
      ],
      feed: { eyebrow: "Heart health", headline: "3 signs it's time for a check-up.", body: "", cta: "" },
      story: { eyebrow: "Now open", headline: "Same-day appointments", cta: "Book" },
      ad: { eyebrow: "Family care", headline: "Specialists for every age.", cta: "Book online" },
    },
    website: {
      notes: [
        "Hero with a clear headline, search for doctors and booking.",
        "Specialties as an icon grid.",
        "Trust signals: accreditations, years of service, reviews.",
      ],
      nav: ["Specialties", "Doctors", "Locations", "Contact"],
      hero: { eyebrow: "Clearpoint Clinics", headline: "Care that *listens*.", sub: "Book with over 80 specialists across six clinics, with same-day appointments available.", cta: "Book an appointment", cta2: "Find a doctor" },
      features: [
        { title: "80+", text: "Specialists across 22 fields" },
        { title: "Same day", text: "Appointments at every clinic" },
        { title: "JCI", text: "Internationally accredited" },
      ],
    },
    dos: ["Design for accessibility first", "Use plain language", "Show real people"],
    donts: ["Medical jargon in headlines", "Low-contrast pastel text", "Fear-based messaging"],
    domain: "clearpoint.example",
    sectors: ["Health & medical", "Education & public sector", "Finance & professional services", "Beauty & wellness"],
    moods: ["Trustworthy", "Calm", "Minimal"],
    applications: ["Websites", "Social media", "Print & editorial", "Brand identity", "Presentations"],
    advertising: {
      "campaign": "Care That Listens",
      "idea": "Real patient questions answered by named specialists, each with one clear next step.",
      "billboard": {
        "eyebrow": "Clearpoint Clinics",
        "headline": "Same-day appointments. *Six clinics.*",
        "cta": "Book at clearpoint.example"
      },
      "banner": {
        "headline": "Specialists for every age.",
        "cta": "Book online"
      },
      "notes": [
        "Plain language and one clear action on every ad.",
        "Book pharmacy, metro and community sites near the clinics.",
        "Never use fear. Show recovery and care, not symptoms."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Patient experience review",
        "title": "Care that *listens*.",
        "sub": "Board update · sample data"
      },
      "content": {
        "title": "Waiting times this quarter",
        "metric": {
          "value": "18 min",
          "label": "average wait, down from 31"
        },
        "points": [
          "Online booking is now 64% of visits",
          "Arabic and English on every form",
          "New paediatric clinic opens in March"
        ]
      },
      "notes": [
        "White slides with Mist panels to group data.",
        "Charts in Care Teal with direct labels instead of legends.",
        "24pt minimum text so the back of the boardroom can read it."
      ]
    },
    brand: {
      "person": {
        "name": "Dr. Sara Al-Amin",
        "role": "Medical Director"
      },
      "email": "s.alamin@clearpoint.example",
      "applications": [
        "Wayfinding: teal icons in circles, bilingual Arabic and English signs",
        "Patient forms: 16pt minimum, large tick boxes, plain language",
        "Uniforms: Mist scrubs with embroidered teal mark",
        "Appointment SMS and email: plain language, one action"
      ],
      "notes": [
        "Signage meets local accessibility code first; brand second.",
        "Icons always have a text label.",
        "Arabic and English get equal size on signs."
      ]
    },
    tokens: {
      bg: "#FFFFFF", surface: "#EEF5F6", ink: "#13293D", muted: "#4A5D6E", accent: "#0F7C80", accentText: "#0F7C80", accent2: "#F4A259", onAccent: "#FFFFFF", line: "#D5E4E6",
      fontDisplay: "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif", fontBody: "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif",
      displayWeight: "700", displayCase: "none", displayTracking: "-0.02em", displayStyle: "normal",
      radius: "12px", btnRadius: "10px", borderWidth: "1px", shadow: "0 6px 20px rgba(19,41,61,0.08)",
    },
  },

  /* ------------------------------------------------------------------ 09 */
  {
    id: "modern-heritage",
    name: "Modern Heritage",
    tagline: "Tradition, drawn with a modern hand.",
    sampleBrand: "Bayt Al Qahwa",
    sampleBrandType: "Specialty coffee house",
    sampleBrandArabic: "بيت القهوة",
    concept:
      "Modern Heritage reworks Arab and Islamic visual culture, including geometric star patterns, arches, Kufi lettering and a palette taken from tilework and spice markets, using clean modern layouts. It is bilingual by design, with Arabic as a lead language rather than a translation.",
    keywords: ["Rooted", "Generous", "Crafted", "Proud", "Hospitable"],
    industries: [
      "Hospitality, cafés and restaurants",
      "Ramadan and Eid campaigns",
      "Cultural institutions and heritage tourism",
      "Government and national events",
      "Perfume, oud and dates",
      "Real estate in the Gulf and Levant",
    ],
    palette: [
      { name: "Midnight", hex: "#121B33", role: "Primary dark background", share: 40 },
      { name: "Sand", hex: "#E8D9BF", role: "Light background, text on dark", share: 30 },
      { name: "Saffron Gold", hex: "#C99A2E", role: "Patterns, frames, accent", share: 14 },
      { name: "Turquoise Tile", hex: "#1F8A8A", role: "Secondary accent", share: 10 },
      { name: "Clay", hex: "#8E3B2A", role: "Warm highlights, seals", share: 6 },
    ],
    paletteRule:
      "Gold is used for line work: patterns, frames and dividers. Avoid large gold fills. Pair Midnight with Sand for text.",
    typography: {
      display: { family: "Reem Kufi", fallback: "'Noto Kufi Arabic', Tahoma, sans-serif", weights: "500, 700", use: "Bilingual headlines (Arabic + Latin)" },
      body: { family: "IBM Plex Sans Arabic", fallback: "Tahoma, Arial, sans-serif", weights: "400, 500", use: "Body copy in both scripts" },
      utility: { family: "Amiri", fallback: "'Times New Roman', serif", weights: "400 · italic", use: "Poetic lines, quotes, calligraphic accents" },
      arabic: { family: "Reem Kufi · IBM Plex Sans Arabic · Amiri", note: "Arabic leads. Design the Arabic layout first (RTL), then mirror for English. Never stretch or fake-bold Arabic." },
      scale: [
        { level: "Display", size: "68 / 84", weight: "700", detail: "Reem Kufi; Arabic needs +20% line height" },
        { level: "H1", size: "42 / 58", weight: "500", detail: "Bilingual lockups stacked" },
        { level: "H2", size: "24 / 36", weight: "500", detail: "Plex Sans Arabic" },
        { level: "Body", size: "17 / 30", weight: "400", detail: "Generous leading for Arabic" },
        { level: "Accent", size: "22 / 34", weight: "400", detail: "Amiri for quotes and poetry" },
      ],
      rules: [
        "Arabic and Latin headlines carry equal visual weight in bilingual lockups.",
        "Arabic text needs more line height (1.6–1.8) than Latin.",
        "Use Amiri for one poetic or proverbial line per layout.",
      ],
    },
    layout: {
      grid: "12 columns · 24px gutter · symmetric, centred compositions allowed",
      spacing: "8px base. 120px section spacing.",
      radius: "Arches (pointed or round) on image frames · 0 elsewhere",
      rules: [
        "Use arch-shaped frames (mihrab) for hero images.",
        "Put a geometric pattern band or border at section edges.",
        "Symmetry is welcome: centred titles flanked by ornaments.",
        "Arabic layouts are RTL. Mirror the full grid, not just the text.",
        "Use double gold rules for frames and dividers.",
      ],
    },
    photography: {
      summary: "Warm, rich interiors and rituals of hospitality with deep shadows.",
      rules: [
        "Rituals: pouring coffee, serving dates, hands and vessels.",
        "Warm tungsten or lantern light with deep shadows.",
        "Textures: brass, carved wood, tile, woven textiles.",
        "Architecture: arches, courtyards, mashrabiya shadows.",
        "People shown with dignity. Respect cultural context.",
      ],
      shots: [
        { caption: "Dallah pouring into finjan, lantern light", tone: ["#C99A2E", "#5A3A1E", "#121B33"] },
        { caption: "Mashrabiya shadow across a courtyard", tone: ["#E8D9BF", "#B08A55", "#3A2A1E"] },
        { caption: "Turquoise tile wall with brass tray", tone: ["#5FB3B0", "#1F8A8A", "#123A3E"] },
      ],
      avoid: ["Orientalist clichés (camels, desert by default)", "Cold, clinical lighting", "Misused sacred calligraphy"],
    },
    graphics: [
      "Eight-point star (khatam) geometric patterns",
      "Mihrab arch frames",
      "Double gold rules and corner ornaments",
      "Bilingual lockups (Arabic + English)",
      "Seal or stamp marks in Clay",
    ],
    motif: "Eight-point star pattern inside an arch",
    ui: {
      notes: [
        "Buttons: Gold outline on Midnight, filled Gold on hover.",
        "Full RTL support: icons and arrows mirror.",
        "Cards with a thin double gold border.",
        "Language toggle always visible in the header.",
      ],
      primary: "احجز طاولة · Book a table",
      secondary: "Menu",
      inputLabel: "Guests",
      inputValue: "4 guests · 9:00 pm",
      tags: ["Saudi Khawlani", "Cardamom", "Ramadan menu"],
      card: { title: "Qahwa Saudia", meta: "قهوة سعودية · Cardamom & saffron", price: "18 SAR" },
    },
    social: {
      notes: [
        "Bilingual captions with Arabic first.",
        "Ramadan and Eid series with a shared pattern frame.",
        "Ritual close-ups in Reels: pouring, steam, hands.",
      ],
      feed: { eyebrow: "رمضان كريم", headline: "Gather at our table", body: "Iftar from 6:12 pm", cta: "" },
      story: { eyebrow: "قائمة جديدة", headline: "The Suhoor Menu", cta: "Reserve" },
      ad: { eyebrow: "بيت القهوة", headline: "Coffee, the way it was poured.", cta: "Visit us" },
    },
    website: {
      notes: [
        "Arabic-first homepage with a full RTL layout and an English toggle.",
        "Hero image in an arch frame on a Midnight background with a pattern band.",
        "Menu sections separated by ornamental dividers.",
      ],
      nav: ["القائمة", "قصتنا", "الفروع", "EN"],
      hero: { eyebrow: "منذ ١٩٨٤ · Since 1984", headline: "بيت القهوة", sub: "Coffee roasted the old way, poured the old way, in four houses across Riyadh and Baghdad.", cta: "احجز طاولة", cta2: "Our story" },
      features: [
        { title: "١٩٨٤", text: "Family recipes since 1984" },
        { title: "4", text: "Houses in Riyadh and Baghdad" },
        { title: "12", text: "Single-origin beans" },
      ],
    },
    dos: ["Design Arabic first", "Use patterns as structure, not wallpaper", "Respect cultural and religious context"],
    donts: ["Faux-Arabic Latin fonts", "Sacred text used as decoration", "Orientalist stereotypes"],
    domain: "baytalqahwa.example",
    sectors: ["Hospitality & travel", "Food & beverage", "Media, arts & culture", "Education & public sector", "Real estate"],
    moods: ["Cultural", "Warm", "Premium"],
    applications: ["Brand identity", "Packaging", "Social media", "Events", "Advertising"],
    advertising: {
      "campaign": "Poured the Old Way",
      "idea": "A Ramadan campaign built around the ritual of pouring coffee for guests, written in Arabic first.",
      "billboard": {
        "eyebrow": "بيت القهوة · Ramadan",
        "headline": "القهوة كما عرفناها",
        "cta": "Iftar from 6:12 pm"
      },
      "banner": {
        "headline": "Gather at our table",
        "cta": "Reserve"
      },
      "notes": [
        "The Arabic headline leads. English sits smaller beneath it.",
        "Book lantern-lit outdoor sites and malls for Ramadan evenings.",
        "Check local rules on food and drink advertising during fasting hours."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Ramadan 2027 plan",
        "title": "بيت القهوة",
        "sub": "Seasonal campaign · sample deck"
      },
      "content": {
        "title": "The Ramadan evening",
        "metric": {
          "value": "4",
          "label": "houses across Riyadh and Baghdad"
        },
        "points": [
          "Iftar and suhoor menus",
          "Bilingual social series",
          "Lantern installation at each house"
        ]
      },
      "notes": [
        "Arabic-first slides with a right-to-left layout.",
        "Pattern bands frame section openers.",
        "Gold for line work only. Text in Sand on Midnight."
      ]
    },
    brand: {
      "person": {
        "name": "Yousef Al-Rawi",
        "role": "General Manager"
      },
      "email": "yousef@baytalqahwa.example",
      "applications": [
        "Coffee bags: Midnight kraft with gold-foil khatam pattern",
        "Cups: Sand paper cup, gold arch window, bilingual name",
        "Shopfront: arched windows, brass bilingual sign",
        "Ramadan gift box: Turquoise box with gold pattern band"
      ],
      "notes": [
        "The bilingual lockup is the master logo. Arabic alone is allowed; English alone is not.",
        "Gold prints as foil or a metallic ink, never as a flat yellow.",
        "Patterns are drawn on a grid, never traced from photos of real buildings."
      ]
    },
    tokens: {
      bg: "#121B33", surface: "#1A2544", ink: "#E8D9BF", muted: "#B9AC94", accent: "#C99A2E", accentText: "#C99A2E", accent2: "#1F8A8A", onAccent: "#121B33", line: "#C99A2E",
      fontDisplay: "'Reem Kufi', 'Noto Kufi Arabic', Tahoma, sans-serif", fontBody: "'IBM Plex Sans Arabic', Tahoma, Arial, sans-serif",
      displayWeight: "700", displayCase: "none", displayTracking: "0", displayStyle: "normal",
      radius: "0px", btnRadius: "0px", borderWidth: "1px", shadow: "none",
    },
  },

  /* ------------------------------------------------------------------ 10 */
  {
    id: "kinetic-sport",
    name: "Kinetic Sport",
    tagline: "Built to move.",
    sampleBrand: "Stride District",
    sampleBrandType: "Running club and athletic wear",
    concept:
      "Kinetic Sport turns speed into graphics: condensed italic type, diagonal cuts, motion blur and high-contrast colour. Every layout should feel like it is moving forward, so it suits brands that sell performance, energy and community.",
    keywords: ["Fast", "Powerful", "Gritty", "Competitive", "Urban"],
    industries: [
      "Sportswear and sneakers",
      "Gyms, fitness studios and clubs",
      "Energy and sports drinks",
      "Marathons and sports events",
      "Esports teams",
      "Automotive and motorsport",
    ],
    palette: [
      { name: "Asphalt", hex: "#121212", role: "Primary background", share: 45 },
      { name: "Chalk", hex: "#F7F7F5", role: "Text, light sections", share: 25 },
      { name: "Blaze", hex: "#FF3D00", role: "Primary accent, speed marks", share: 15 },
      { name: "Concrete", hex: "#B8B8B4", role: "Secondary text, textures", share: 8 },
      { name: "Cobalt", hex: "#1F4BFF", role: "Secondary accent, team colour", share: 7 },
    ],
    paletteRule:
      "Use high contrast always. Blaze goes on Asphalt or Chalk, never on Cobalt. Use one accent per layout and switch between Blaze and Cobalt across a campaign.",
    typography: {
      display: { family: "Anton", fallback: "Impact, 'Arial Narrow', sans-serif", weights: "400 (heavy condensed)", use: "Headlines, numbers, slogans, uppercase only" },
      body: { family: "Barlow", fallback: "'Arial Narrow', Arial, sans-serif", weights: "400, 600, 700 · italic", use: "Body, UI, stats" },
      utility: { family: "Barlow Condensed", fallback: "'Arial Narrow', sans-serif", weights: "600 italic", use: "Labels, race data, timers" },
      arabic: { family: "Lalezar (display) · Cairo (body)", note: "Lalezar's heavy weight matches Anton's impact. Slant with layout, never with a fake oblique." },
      scale: [
        { level: "Display", size: "120 / 100", weight: "400", detail: "Uppercase, skewed -8°, tight leading" },
        { level: "H1", size: "56 / 54", weight: "400", detail: "Uppercase" },
        { level: "H2", size: "26 / 30", weight: "700", detail: "Barlow italic uppercase" },
        { level: "Body", size: "16 / 24", weight: "400", detail: "Barlow" },
        { level: "Stat", size: "14 / 16", weight: "600", detail: "Barlow Condensed italic, +6% tracking" },
      ],
      rules: [
        "Set headlines in uppercase only and keep them short, ideally under 5 words.",
        "Skew headline blocks about -8° to imply motion.",
        "Use stats (times, distances, reps) as graphic elements.",
      ],
    },
    layout: {
      grid: "12 columns · 16px gutter · diagonal 8° section cuts",
      spacing: "8px base. Dense and compact. Energy over air.",
      radius: "0. Use angled cut corners instead.",
      rules: [
        "Cut sections on an 8° diagonal.",
        "Let type run large and crop off the edge.",
        "Use speed stripes in Blaze behind key elements.",
        "Angle corners on buttons and cards.",
        "Stack headline, stat and CTA tightly.",
      ],
    },
    photography: {
      summary: "Athletes in motion, gritty urban settings, hard light and grain.",
      rules: [
        "Peak action: mid-stride, mid-jump, sweat.",
        "Low angles to make athletes heroic.",
        "Hard sunlight or night city light with flares.",
        "Motion blur and panning shots.",
        "High contrast black-and-white with an accent colour overlay.",
      ],
      shots: [
        { caption: "Runner mid-stride, low angle, panning blur", tone: ["#FF7A4D", "#FF3D00", "#121212"] },
        { caption: "Night track, floodlights, sweat close-up", tone: ["#5A5A58", "#2A2A2A", "#0A0A0A"] },
        { caption: "Crew run on concrete overpass, b/w + cobalt", tone: ["#6F8BFF", "#1F4BFF", "#121212"] },
      ],
      avoid: ["Static posed gym selfies", "Soft pastel lifestyle shots", "Centred, symmetrical compositions"],
    },
    graphics: [
      "Diagonal speed stripes",
      "Angled cut corners (clip-path)",
      "Oversized stat numbers (race times, km)",
      "Halftone and grain textures",
      "Tape and sticker-style labels",
    ],
    motif: "Diagonal speed stripes with a skewed stat",
    ui: {
      notes: [
        "Buttons: Blaze fill, cut corner, uppercase Barlow bold.",
        "Stat cards: big Anton number, condensed label.",
        "Progress bars and timers as core UI.",
        "Fast 150ms transitions, slide in from the left.",
      ],
      primary: "Join the club",
      secondary: "Shop the kit",
      inputLabel: "Target pace",
      inputValue: "4:45 / km",
      tags: ["10K", "Sunday 6AM", "All levels"],
      card: { title: "Night Run 10K", meta: "Corniche · 42 runners", price: "48:12" },
    },
    social: {
      notes: [
        "Results and stats posts: one huge number.",
        "Event countdowns with skewed type.",
        "Reels with hard cuts on the beat.",
      ],
      feed: { eyebrow: "Sunday crew run", headline: "No finish line.", body: "6AM · Corniche", cta: "" },
      story: { eyebrow: "Race day", headline: "42.2 KM", cta: "Register" },
      ad: { eyebrow: "New: Velocity Kit", headline: "Faster than yesterday.", cta: "Shop now" },
    },
    website: {
      notes: [
        "Hero with a huge skewed headline cropped off the edge.",
        "Event calendar as angled cards with stats.",
        "Diagonal section transitions throughout.",
      ],
      nav: ["Runs", "Kit", "Events", "Join"],
      hero: { eyebrow: "Run club · Est. 2019", headline: "Run the city.", sub: "Free crew runs every week, from first 5K to marathon pace, plus kit built for the heat.", cta: "Join the club", cta2: "Shop the kit" },
      features: [
        { title: "3,200", text: "Members running weekly" },
        { title: "18", text: "Routes across the city" },
        { title: "6AM", text: "Every Sunday, all paces" },
      ],
    },
    dos: ["Imply motion in everything", "Use real stats", "Crop boldly"],
    donts: ["Rounded friendly shapes", "Lowercase headlines", "Calm, centred layouts"],
    domain: "stridedistrict.example",
    sectors: ["Sports & fitness", "Retail & FMCG", "Media, arts & culture"],
    moods: ["Energetic", "Bold"],
    applications: ["Advertising", "Social media", "Events", "Websites", "Brand identity"],
    advertising: {
      "campaign": "Run the City",
      "idea": "Real routes and distances become headlines, placed on or near the routes themselves.",
      "billboard": {
        "eyebrow": "Stride District · Route 07",
        "headline": "6AM. *10K.* Your city.",
        "cta": "Join free · stridedistrict.example"
      },
      "banner": {
        "headline": "Faster than yesterday.",
        "cta": "Shop"
      },
      "notes": [
        "Place ads on running routes: bridges, the corniche, metro exits.",
        "Motion banners cut on the beat with 150ms transitions.",
        "Use real stats only. Never invent performance claims."
      ]
    },
    presentation: {
      "cover": {
        "kicker": "Sponsor deck 2027",
        "title": "Run the *city*.",
        "sub": "Stride District partnerships · sample deck"
      },
      "content": {
        "title": "Who runs with us",
        "metric": {
          "value": "3,200",
          "label": "members running weekly"
        },
        "points": [
          "18 routes across the city",
          "Sunday crew runs at 6AM",
          "Night race series, 4 events"
        ]
      },
      "notes": [
        "Diagonal cuts between slides.",
        "One huge stat per slide.",
        "Full-bleed action photography."
      ]
    },
    brand: {
      "person": {
        "name": "Omar Khalil",
        "role": "Head Coach"
      },
      "email": "omar@stridedistrict.example",
      "applications": [
        "Race bibs: Blaze number block, skewed Anton numerals",
        "Kit: Asphalt tee with a Blaze diagonal stripe across the chest",
        "Event arch: angled cut corners and speed stripes",
        "Water bottles: Chalk with Cobalt stripe and route map"
      ],
      "notes": [
        "The skewed wordmark is the only logo. Never set it upright.",
        "Blaze and Cobalt never touch.",
        "Event graphics must stay legible at running speed: 5 words max."
      ]
    },
    tokens: {
      bg: "#121212", surface: "#1E1E1E", ink: "#F7F7F5", muted: "#B8B8B4", accent: "#FF3D00", accentText: "#FF3D00", accent2: "#1F4BFF", onAccent: "#121212", line: "#3A3A3A",
      fontDisplay: "'Anton', Impact, 'Arial Narrow', sans-serif", fontBody: "'Barlow', 'Arial Narrow', Arial, sans-serif",
      displayWeight: "400", displayCase: "uppercase", displayTracking: "0.005em", displayStyle: "normal",
      radius: "0px", btnRadius: "0px", borderWidth: "1px", shadow: "none",
    },
  },
];
