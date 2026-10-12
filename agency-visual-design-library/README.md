# Agency Visual Design Library

A professional visual reference library for the agency. It is **not an
application**: nothing to install or build to view it. It is a structured set of
documented design decisions, specs and examples that designers, strategists and
account teams use when producing work for clients.

## Start here

Open **`index.html`** in a browser. It is the visual library: ten styles, each
with its palette, type specimen, photography direction, graphic elements and
worked UI, social and website examples. You can filter it by industry.

The same content is available as Markdown in [`visual-styles/`](./visual-styles/README.md),
with CSS tokens for every style in `visual-styles/tokens.css`.

## The ten styles

| # | Style | Best for |
| --- | --- | --- |
| 01 | Quiet Luxury | Jewelry, fashion, premium real estate, boutique hotels |
| 02 | Swiss Precision | Consulting, B2B finance, law, annual reports |
| 03 | Neo-Brutalism | Startups, creator tools, youth brands, events |
| 04 | Organic Earth | Natural skincare, organic food, wellness, eco brands |
| 05 | Future Tech | SaaS, AI, fintech, cybersecurity |
| 06 | Bold Editorial | Media, fashion campaigns, culture, personal brands |
| 07 | Playful Pop | Desserts, FMCG, kids, delivery apps |
| 08 | Clinical Clarity | Healthcare, pharma, insurance, education, public services |
| 09 | Modern Heritage | Arab hospitality, Ramadan campaigns, culture, government |
| 10 | Kinetic Sport | Sportswear, gyms, sports events, energy drinks |

## What it is used for

| Use case               | Where to look                                    |
| ---------------------- | ------------------------------------------------ |
| Branding               | `00-foundations/`, `01-branding/`                |
| Social media           | `02-social-media/`                               |
| Websites               | `03-websites/`                                   |
| Advertising campaigns  | `04-advertising/`                                |
| Client presentations   | `05-presentations/`                              |

## Structure

```
agency-visual-design-library/
├── index.html            The visual library (open in a browser)
├── library/              styles-data.js (source of truth), render.js, library.css
├── visual-styles/        Generated Markdown spec per style + tokens.css
├── scripts/              build-docs.mjs regenerates visual-styles/
├── 00-foundations/        Core principles every other section builds on
│   ├── color/             Palette building, contrast rules, color roles
│   ├── typography/        Type scales, pairings, hierarchy, Arabic + Latin
│   ├── grid-and-layout/   Grids for screen, print and social
│   ├── spacing/           Spacing scale and rhythm
│   ├── iconography/       Icon style rules, stroke, sizing
│   ├── imagery/           Photography direction, cropping, treatments
│   └── motion/            Timing, easing, transitions for digital work
├── 01-branding/
│   ├── logo-systems/      Logo construction, lockups, clear space, misuse
│   ├── identity-systems/  How a full identity fits together
│   ├── brand-guidelines/  Structure of a client brand book
│   └── stationery/        Business cards, letterheads, envelopes
├── 02-social-media/
│   ├── formats-and-specs/ Platform sizes and safe zones
│   ├── feed-posts/        Single-post layouts
│   ├── stories-and-reels/ Vertical formats, covers, text placement
│   ├── carousels/         Multi-slide storytelling
│   └── content-systems/   Content pillars and feed planning
├── 03-websites/
│   ├── page-layouts/      Home, about, services, contact patterns
│   ├── ui-components/     Buttons, cards, nav, forms
│   ├── landing-pages/     Campaign landing page anatomy
│   └── responsive-patterns/ Desktop → tablet → mobile behaviour
├── 04-advertising/
│   ├── digital-display/   Banner sizes, hierarchy, CTAs
│   ├── print/             Press ads, flyers, brochures, bleed/CMYK
│   ├── out-of-home/       Billboards, signage, viewing distance
│   └── campaign-systems/  Keeping one idea consistent across channels
├── 05-presentations/
│   ├── pitch-decks/       New-business pitch structure
│   ├── client-reports/    Performance and monthly reports
│   └── slide-layouts/     Reusable slide layouts and rules
├── 06-assets/             Shared working files (mockups, textures, icons,
│                          font license records)
├── 07-inspiration/        Moodboards and annotated external references
├── _templates/            Templates for documenting a new library entry
└── _governance/           Naming conventions, file rules, how to contribute
```

The numeric prefixes give a fixed reading order: foundations first, then each
discipline, then shared assets and inspiration. Folders starting with `_` are
about the library itself, not about design.

## Plan

1. **Structure:** folder skeleton and overview. *(done)*
2. **Governance and templates:** see `_governance/` and `_templates/`. *(done)*
3. **Ten visual styles:** visual library, Markdown specs and tokens. *(done)*
4. **Discipline sections:** fill `00-foundations/` to `05-presentations/` with
   cross-style guidance (social formats are started in
   `02-social-media/formats-and-specs/`).
5. **Assets and inspiration:** populate `06-assets/` and `07-inspiration/`.

## Updating

Edit `library/styles-data.js`, then run `node scripts/build-docs.mjs` from the
repository root (Node 18+, no dependencies). See `_governance/README.md`.
