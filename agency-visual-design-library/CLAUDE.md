# Agency Visual Design Library: project rules

## 1. Purpose

A professional visual design reference system for a designer working on brand
identities, advertising campaigns, packaging, social media, presentations and
websites. It holds ten documented visual styles, foundations, discipline guides,
and a Project brief workflow that turns a style into direction for a real job.
It is a reference tool, not a product: viewing needs only a browser.

Where things live (read the relevant one before working on that area):

| Need | Go to |
| --- | --- |
| Overview, setup, preview, commands | `README.md` |
| Style definitions (single source of truth) | `library/styles-data.js` |
| Design principles: colour, type, grid, accessibility, Arabic/RTL | `00-foundations/` |
| Discipline guides | `01-branding/` to `05-presentations/` |
| Project brief workflow and its rules | `08-project-workflow/README.md`, `library/brief.js` |
| Maintenance and quality rules | `_governance/README.md` |
| Fields a style must have | `_templates/style-template.md` |

The repository root is a separate Next.js portfolio app; its rules are in the
root `CLAUDE.md` / `AGENTS.md`. Do not mix the two projects.

## 2. Design quality

- Art-direct, don't decorate: every element needs a reason, and every layout
  needs one clear first read, then a second, then the action.
- Build hierarchy with scale, weight, position and space before colour.
- Compose on the style's grid and spacing scale; one idea per frame.
- Choose typography for the brief and script, using the style's scale (five
  levels) and real weights; no faux bold or italic.
- Colour works as a system: named roles, deliberate proportions, AA contrast
  (4.5:1 text, 3:1 large text and UI). Accent-coloured text uses `accentText`.
- Make production-aware decisions: safe areas, bleed, CMYK/spot, file formats,
  real sizes, platform limits. Check `00-foundations/` and the discipline guides.

## 3. Arabic design

- Design Arabic as its own layout, not a mirrored Latin one. Right-to-left
  changes reading order, hierarchy and composition. Check every element.
- Mirror grid, navigation and directional icons; do not mirror logos, media
  controls, numbers or phone numbers.
- Protect letter shaping: never letter-space, stretch, slant or fake-bold
  Arabic; no manual tatweel for justification.
- Arabic needs more line height (1.6–1.8 body) and is often set larger than
  Latin to match visual size; headlines need their own hierarchy, not Latin sizes.
- Pair Arabic and Latin faces deliberately (structure, weight, visual size);
  each style names its Arabic pairing.
- Set `lang="ar" dir="rtl"`, isolate Latin names, URLs and numbers in bidi
  text, and keep one digit system per market.
- Full rules: `00-foundations/arabic-and-rtl/README.md`.

## 4. Style integrity

- Each style is a distinct rule system (palette roles and shares, type, grid,
  imagery, graphic elements, do/don't). Apply one style per direction; do not
  borrow elements from other styles unless the user asks for a hybrid, and then
  say which rules come from where.
- Style content lives in `library/styles-data.js`. Never hand-edit the
  generated files in `visual-styles/`.
- A client's identity wins over any style. Keep their logo, approved colours,
  typefaces and required assets unless the user explicitly asks to change them.
  The style shapes composition, imagery and supporting elements around them.
- Never redraw, recolour or "improve" a client logo.

## 5. Realism and honesty

- Demonstrations use clearly labelled fictional brands, `.example` domains and
  invented people. Never use a real client's name, logo, imagery or figures in
  the library. Real client work belongs in the portfolio, not here.
- Never invent missing client assets. Use a labelled placeholder (for example
  "CLIENT LOGO") and list it as an open question.
- Never present placeholders, concepts, briefs or AI-prompt outputs as finished
  or production-ready artwork.
- Report only what was verified. If a check was not run or failed, say so and
  include the output.

## 6. Project safety

- Read existing files before editing; extend what exists instead of rewriting it.
- No new dependencies without a clear need and the user's agreement. The
  library runs with plain HTML, CSS, JS and Node built-ins.
- No destructive changes (deleting content, renaming style IDs, which are page
  addresses) without asking.
- Don't duplicate documentation: link to the guide that owns the topic.
- Keep changes in scope; don't modify the portfolio app for library work.

## 7. Maintenance

Run from the repository root after changes, and report results and any failures:

```bash
node agency-visual-design-library/scripts/build-docs.mjs   # after editing styles-data.js
node agency-visual-design-library/scripts/check-data.mjs   # data, token contrast, Markdown links
node agency-visual-design-library/scripts/test-brief.mjs   # brief engine rules
node agency-visual-design-library/scripts/qa-browser.mjs   # needs Playwright + Chromium
```

- Commit data changes together with their regenerated files.
- If you change `library/brief.js`, regenerate the example in
  `08-project-workflow/examples/` (the tests check it).
- When conventions change, update the guide that owns them, `README.md`,
  `CHANGELOG.md` and, if it affects these rules, this file.
- `qa-browser.mjs` checks behaviour, layout and contrast. It cannot judge art
  direction, so review screenshots (`--shots <dir>`) by eye.

## 8. Team readiness

- Put reusable rules in the reference documents, not in chat or one-off notes:
  style rules in `styles-data.js`, principles in `00-foundations/`, process in
  the discipline guides and `08-project-workflow/`.
- Keep this file short. Detailed workflows and full style content belong in
  those documents, or in a skill if a workflow becomes repeatable.
- Write for a designer who joins tomorrow: concrete values, examples, checklists.
