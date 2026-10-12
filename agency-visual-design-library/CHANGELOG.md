# Changelog

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
