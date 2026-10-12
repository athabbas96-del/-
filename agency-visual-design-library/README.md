# Agency Visual Design Library

A professional visual reference library for the agency: ten complete visual
styles, the design foundations behind them, and guides for every discipline the
agency delivers (brand identity, social media, websites, advertising and
presentations).

It is **not an application**. Viewing it needs only a browser; maintaining it
needs Node.js for two small scripts.

> **Sample work only.** Every brand, person, address, figure and domain in the
> examples (Maison Velline, Klonk, Bayt Al Qahwa and the rest) is invented to
> demonstrate the styles and is labelled "Fictional sample brand" wherever it
> appears. Nothing in this folder is client work. Domains use the reserved
> `.example` TLD.

## Preview the library

**Option 1: open the file.** Open `agency-visual-design-library/index.html`
in any current browser (double-click it, or drag it into a browser window).
No server or build is needed. Fonts load from Google Fonts, so you need an
internet connection for the intended typefaces; without one the page still
works with fallback fonts.

**Option 2: serve it locally** (useful if your browser restricts `file://`
pages):

```bash
# from the repository root
npx serve agency-visual-design-library     # or: python3 -m http.server -d agency-visual-design-library 8080
```

Then open the address it prints (for example http://localhost:3000 or
http://localhost:8080).

### Using it

| Page | Address | What you can do |
| --- | --- | --- |
| Catalogue | `index.html` | Search; filter by **Industry**, **Visual mood** and **Application** (several chips in one group = any of them; chips in different groups = all of them) |
| Style page | `index.html#quiet-luxury` (any style ID) | Full spec, copyable palette and tokens (CSS, W3C JSON, Tailwind), and worked examples for social, advertising, presentations, website and UI, and brand applications |
| Token reference | `index.html#tokens` | Compare all ten styles' colour tokens and type pairings; copy any value or a whole style |
| Project brief | `index.html#brief` (or `#brief-<style-id>` to preselect a style) | Generate a project's creative direction, design brief and AI concept prompt; copy or download Markdown |

Select any hex value or **Copy** button to copy it to the clipboard. If the
browser blocks clipboard access, the value is selected so you can copy it
manually.

## Use it on a real project

The **Project brief** (`index.html#brief`) turns a style into direction for a
real job. Pick a style, enter the project type, industry, audience, the
client's brand colours, typefaces and supplied assets, and the deliverables.
It generates a creative direction, a structured design brief, a reusable AI
concept prompt, and Markdown to copy or download. It runs locally from the
style's rules: no AI service is called, no images are generated, the client's
identity is preserved unless you choose otherwise, and missing brand assets
become open questions instead of invented values.

Full guide, input format and command-line use:
[`08-project-workflow/`](./08-project-workflow/README.md).

## The ten styles

| # | Style | Mood | Best for |
| --- | --- | --- | --- |
| 01 | [Quiet Luxury](./visual-styles/01-quiet-luxury.md) | Premium, calm, minimal | Jewelry, fashion, premium real estate, boutique hotels |
| 02 | [Swiss Precision](./visual-styles/02-swiss-precision.md) | Trustworthy, minimal, technical | Consulting, B2B finance, law, annual reports |
| 03 | [Neo-Brutalism](./visual-styles/03-neo-brutalism.md) | Bold, playful, energetic | Startups, creator tools, youth brands, events |
| 04 | [Organic Earth](./visual-styles/04-organic-earth.md) | Natural, calm, warm | Natural skincare, organic food, wellness |
| 05 | [Future Tech](./visual-styles/05-future-tech.md) | Technical, bold, premium | SaaS, AI, fintech, cybersecurity |
| 06 | [Bold Editorial](./visual-styles/06-bold-editorial.md) | Editorial, bold, premium | Media, fashion campaigns, culture |
| 07 | [Playful Pop](./visual-styles/07-playful-pop.md) | Playful, energetic, warm | Desserts, FMCG, delivery apps |
| 08 | [Clinical Clarity](./visual-styles/08-clinical-clarity.md) | Trustworthy, calm, minimal | Healthcare, insurance, education, public services |
| 09 | [Modern Heritage](./visual-styles/09-modern-heritage.md) | Cultural, warm, premium | Arab hospitality, Ramadan campaigns, culture (Arabic-first, RTL) |
| 10 | [Kinetic Sport](./visual-styles/10-kinetic-sport.md) | Energetic, bold | Sportswear, gyms, sports events |

Each style defines: concept, target industries, sectors, moods and
applications, colour palette with proportions, semantic colour tokens, typography
(display, body, utility and Arabic pairing, five-level scale), layout rules,
photography direction with shot briefs, graphic elements, UI, social media,
advertising, presentation, website and brand-application examples, and do/don't
rules.

## Guides

| Area | Start here |
| --- | --- |
| Foundations: colour, typography, grid, spacing, accessibility, Arabic and RTL, icons, imagery, motion | [`00-foundations/`](./00-foundations/README.md) |
| Brand identity: logo systems, identity systems, brand guidelines, stationery | [`01-branding/`](./01-branding/README.md) |
| Social media: formats, feed posts, stories and Reels, carousels, content systems | [`02-social-media/`](./02-social-media/README.md) |
| Websites: page layouts, UI components, landing pages, responsive patterns | [`03-websites/`](./03-websites/README.md) |
| Advertising: campaign systems, digital display, out of home, print | [`04-advertising/`](./04-advertising/README.md) |
| Presentations: pitch decks, client reports, slide layouts | [`05-presentations/`](./05-presentations/README.md) |
| Assets: font licences, icons, patterns, mockup spec | [`06-assets/`](./06-assets/README.md) |
| Inspiration: moodboard briefs, case references | [`07-inspiration/`](./07-inspiration/README.md) |
| Project workflow: style → creative direction, brief, AI prompt, Markdown | [`08-project-workflow/`](./08-project-workflow/README.md) |
| Maintaining the library | [`_governance/`](./_governance/README.md) |

## Structure

```
agency-visual-design-library/
├── index.html              The visual library (open in a browser)
├── library/
│   ├── styles-data.js      SOURCE OF TRUTH: all ten styles + filter vocabulary
│   ├── tokens.js           Token export formats (CSS, W3C JSON, Tailwind), shared by page and scripts
│   ├── brief.js            Project brief rules engine (no DOM), shared by page, CLI and tests
│   ├── brief-ui.js         Project brief form and output
│   ├── render.js           Draws the catalogue, style pages, token reference; routes pages
│   └── library.css         Interface and per-style specimen styles
├── visual-styles/          GENERATED: one Markdown spec per style, tokens.css, tokens.json
├── scripts/
│   ├── build-docs.mjs      Regenerates visual-styles/ from the data
│   ├── check-data.mjs      Validates data, token contrast and Markdown links
│   ├── brief.mjs           Command-line project brief: JSON in, Markdown out
│   ├── test-brief.mjs      Unit tests for the brief rules engine
│   └── qa-browser.mjs      Browser QA: routes, filters, copy, brief workflow, layout, console, contrast
├── 00-foundations/         Colour, typography, grid, spacing, accessibility, Arabic/RTL, icons, imagery, motion
├── 01-branding/ … 05-presentations/   Discipline guides
├── 06-assets/              Font licences, icon set, SVG patterns, mockup spec
├── 07-inspiration/         Moodboard briefs, case references
├── 08-project-workflow/    How to use the Project brief; input format; fictional example
├── _templates/             Field checklist for a new style
├── _governance/            Rules for maintaining the library
└── CHANGELOG.md
```

## Maintain the library

Requirements: Node.js 18 or later. No `npm install` is needed for the data
and docs scripts. All commands run from the **repository root**.

```bash
# 1. Edit the data
#    agency-visual-design-library/library/styles-data.js

# 2. Regenerate the Markdown specs and token files
node agency-visual-design-library/scripts/build-docs.mjs

# 3. Validate data, AA contrast of token pairs, and every Markdown link
node agency-visual-design-library/scripts/check-data.mjs

# 4. Test the project brief rules engine (and that the committed example is current)
node agency-visual-design-library/scripts/test-brief.mjs

# 5. Browser QA (needs Playwright with Chromium; see below)
node agency-visual-design-library/scripts/qa-browser.mjs
#    add --shots <folder> to save desktop and phone screenshots of every page
```

`qa-browser.mjs` needs Playwright, which is not a dependency of this
repository: install it once with `npm i -g playwright && npx playwright install chromium`.
It opens every route at desktop (1360px) and phone (390px) widths, in light and
dark mode, and fails on horizontal overflow, console errors, failed requests,
broken in-page links, or text below WCAG AA contrast inside the examples and
the generated brief. It also exercises search, each filter group, opening a
style page, a copy button, and the whole project brief workflow (validation,
generation, tabs, copy, download, draft restore, phone layout).

Commit the data change and the regenerated files together. Never edit files in
`visual-styles/` by hand; they are overwritten. See
[`_governance/README.md`](./_governance/README.md) for naming and quality rules
and [`_templates/style-template.md`](./_templates/style-template.md) for the
fields a style needs.

## Known limitations

- Photography in the examples is represented by art-direction placeholders
  (the target colour grade plus the shot brief), not real photos.
- No photographic mockup files are included yet; see
  [`06-assets/mockups`](./06-assets/mockups/README.md).
- Fonts load from Google Fonts; offline viewing falls back to system fonts.
- Platform specs (social sizes, safe zones, ad limits) change; the guides say
  where to re-check.
