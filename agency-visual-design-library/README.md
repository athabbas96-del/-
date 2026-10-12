# Agency Visual Design Library

A professional visual reference library for the agency. It is **not an
application**: there is no build step and no runtime. It is a structured set of
documented design decisions, specs and examples that designers, strategists and
account teams use when producing work for clients.

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

1. **Structure** — folder skeleton and this overview. *(done)*
2. **Governance & templates** — naming conventions, file formats, and one
   standard entry template so every page in the library looks the same.
3. **Foundations** — color, typography, grid, spacing, iconography, imagery,
   motion. Everything after this references these rules.
4. **Discipline sections** — branding, social media, websites, advertising,
   presentations, each with specs, do/don't examples and checklists.
5. **Assets & inspiration** — populate shared assets and annotated references.
6. **Visual index (optional)** — a browsable HTML overview of the library for
   sharing with the team and clients.
