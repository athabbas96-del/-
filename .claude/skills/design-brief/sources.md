# Where each specification lives

Paths are relative to `agency-visual-design-library/`. Read the file before you
use or cite a rule from it. This map only says where to look; the files are the
source of truth.

## Style files: `visual-styles/NN-<style-id>.md`

Every style file has the same sections. Cite them as `file § Section`.

| Need | Section |
| --- | --- |
| Fit evidence | The `Mood`, `Sectors` and `Strongest applications` lines at the top (they are not a section: cite them as "header lines"), `§ Target industries`, `§ Concept` |
| Palette, roles, proportions, palette rule | `§ Color palette` |
| Exact token values, including `accent-text` for accessible accent text | `§ Design tokens` |
| Typefaces, Arabic pairing, type scale, type rules | `§ Typography` |
| Grid, spacing, corners, layout rules | `§ Layout rules` |
| Photography direction, sample shots with grades, avoid list | `§ Photography direction` |
| Graphic devices | `§ Graphic elements` |
| Social behaviour and example copy | `§ Social media examples` |
| Campaign idea, OOH and display behaviour | `§ Advertising campaign` |
| Deck behaviour | `§ Presentations` |
| Stationery, packaging, signage notes | `§ Brand applications` |
| Web and UI behaviour | `§ Website example`, `§ UI examples` |
| Guardrails | `§ Do / Don't` |

The style IDs, and their numbers in the file names, are listed in `visual-styles/README.md`.

## Per-style rules outside the style files

| Need | File § Section |
| --- | --- |
| Emphasis treatment per style | `00-foundations/typography/README.md § 6. Emphasis, style by style` |
| Spacing density per style | `00-foundations/spacing/README.md § 3. Density by style` |
| Icon treatment per style | `00-foundations/iconography/README.md § 2. Icon treatment by style` |
| Motion signature per style | `00-foundations/motion/README.md § 2. Motion signature by style` |
| Colour harmony per style | `00-foundations/color/README.md § 2. Colour relationships` |
| Post formula per style | `02-social-media/feed-posts/README.md § 2. How each style builds a post` |
| UI component treatment per style | `03-websites/ui-components/README.md § 5. How each style changes components` |
| Deck behaviour per style | `05-presentations/slide-layouts/README.md § 3. Style in a deck` |
| Print notes per style | `04-advertising/print/README.md § 3. Layout by style` |
| Moodboard brief per style | `07-inspiration/moodboards/README.md § Per style` |

## Cross-style rules

| Need | File § Section |
| --- | --- |
| Preserve / evolve / new identity | `08-project-workflow/README.md § Identity handling` |
| Arabic, RTL, bidi, digits, lockups | `00-foundations/arabic-and-rtl/README.md` |
| Contrast targets, text on images | `00-foundations/accessibility/README.md § 1. Contrast`, `§ 2. Text on images` |
| Grids per medium | `00-foundations/grid-and-layout/README.md § 3. Grids by medium` |
| Print and spot colour process | `00-foundations/color/README.md § 7. Screen, print and spot colour` |
| Shot briefs, rights, alt text | `00-foundations/imagery/README.md` |
| Font licences | `06-assets/font-licenses/README.md § Families` |
| Logo variants, clear space, file kit | `01-branding/logo-systems/README.md` |

## Format specs by deliverable

| Deliverable | File |
| --- | --- |
| Social sizes and safe zones | `02-social-media/formats-and-specs/README.md`, `02-social-media/stories-and-reels/README.md`, `02-social-media/carousels/README.md` |
| Display banners | `04-advertising/digital-display/README.md § 1. Core sizes (IAB standard units)` |
| Billboards and posters | `04-advertising/out-of-home/README.md § 1. Formats`, `§ 2. Designing for distance and speed` |
| Press and print collateral | `04-advertising/print/README.md § 2. Production specification` |
| Stationery | `01-branding/stationery/README.md § 1. Sizes`, `§ 2. Print specification` |
| Web pages | `03-websites/page-layouts/README.md`, `03-websites/landing-pages/README.md`, `03-websites/responsive-patterns/README.md` |
| Decks and reports | `05-presentations/slide-layouts/README.md § 1. Canvas and grid`, `05-presentations/pitch-decks/README.md`, `05-presentations/client-reports/README.md` |

## Known gaps

When last checked, the library did **not** define the items below. Confirm
each in the files before relying on this list, then report them as
`[Not documented]` instead of filling them in.

- Print colour values (CMYK, Pantone or other spot) for any style. Only the
  process is described, in `00-foundations/color/README.md § 7. Screen, print and spot colour`.
- Dark or light alternate palettes for a style.
- Arabic font weights. Style files name the Arabic families but not the weights.
- Packaging specifications: dielines, materials, finishes per style. Only
  one-line notes appear in `§ Brand applications`.
- A packaging guide. There is none among the discipline folders.
- Per-style icon sets. Only treatment rules exist, plus one generic starter
  set in `06-assets/icons/`.
- Real photography. Shots are written briefs with target grades, not images.
- Motion timing per style beyond the signatures and the shared duration tokens.
