# Changelog

## 2026-10-12: Project workflow

- **Project brief** page (`#brief`, `#brief-<style-id>`): choose a style, enter
  project type, industry, audience, brand colours, typefaces, supplied assets,
  deliverables and language; generate a creative direction, design brief, AI
  concept prompt and Markdown (copy or download). Generated locally from the
  style's rules; no AI service, no images.
- Rules engine `library/brief.js`: identity preserved by default, missing
  assets become open questions, colours planned by contrast with an
  accessible-variant suggestion, fit check against the style's sectors and
  applications, 19 deliverable specs.
- `scripts/brief.mjs` (command line) and `scripts/test-brief.mjs` (27 tests);
  browser QA covers the full workflow.
- Entry points on the catalogue, every style page and the top bar.
- `08-project-workflow/` guide with a fictional example input and its brief.
- Fixed: elements with the `hidden` attribute could still show when a
  component set `display`.

## 2026-10-12: Complete library

- **Interface:** catalogue with search and Industry / Visual mood / Application
  filters; a detail page per style (`#style-id`) with section navigation and
  previous/next; a token reference page (`#tokens`); copyable palette, semantic
  tokens and CSS / W3C JSON / Tailwind exports; skip link, focus management and
  accessible filter chips.
- **Styles:** every style now has sectors, moods, applications, an advertising
  campaign (billboard, MPU, leaderboard), presentation slides, and brand
  applications (business cards, letterhead, application specs), all rendered
  in the style and labelled as fictional sample brands.
- **Tokens:** new `accentText` token per style; Ion Violet changed to `#6C55F2`
  and Quiet Luxury's `onAccent` changed to Onyx so text on accent fills passes
  AA; Playful Pop text on coloured fills changed to Cocoa. `tokens.json` (W3C format) added.
- **Foundations:** colour, typography, grid and layout, spacing, accessibility,
  Arabic and RTL, iconography, imagery and motion guides.
- **Disciplines:** brand identity, social media, websites, advertising and
  presentation guides replace all empty placeholder folders.
- **Assets:** font licence record (35 families, verified OFL), 15-icon SVG set,
  6 SVG patterns, mockup specification.
- **Inspiration:** moodboard briefs for all ten styles; annotated case references.
- **Tooling:** `check-data.mjs` (data, contrast, links) and `qa-browser.mjs`
  (routes, filters, copy, overflow, console, rendered contrast).

## 2026-10-12: First release

- Ten visual styles in a single-page visual library with generated Markdown
  specs and `tokens.css`.

## 2026-10-12: Project skeleton

- Folder structure and overview.
