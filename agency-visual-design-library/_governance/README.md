# Governance

How the library is maintained so it stays consistent and trustworthy.

## Source of truth

`library/styles-data.js` holds every style and the filter vocabulary
(`AVDL_VOCAB`). Everything else about the styles is derived from it:

| Output | Produced by | Edit directly? |
| --- | --- | --- |
| `index.html`: catalogue, style pages, token reference | `library/render.js` in the browser | No, edit the data |
| `visual-styles/*.md`, `tokens.css`, `tokens.json` | `scripts/build-docs.mjs` | No, regenerate |
| Token formats (CSS, W3C JSON, Tailwind) | `library/tokens.js`, shared by the page and the generator | Only to change a format |

The guides in `00-foundations/` to `07-inspiration/` are written by hand. When
they quote a style (a colour, a rule, a campaign), check it still matches the
data.

## Adding or changing a style

1. Follow the field list in `_templates/style-template.md`. Every field is required.
2. Edit `library/styles-data.js`. Use only values from `AVDL_VOCAB` for
   `sectors`, `moods` and `applications`. If a new value is needed, add it to
   `AVDL_VOCAB` first so it becomes a filter chip.
3. If the style needs its own treatment (a mask, a motif, a button shape), add
   a `[data-style="your-id"]` block in `library/library.css`, next to the
   other styles' blocks.
4. From the repository root:
   ```bash
   node agency-visual-design-library/scripts/build-docs.mjs
   node agency-visual-design-library/scripts/check-data.mjs
   node agency-visual-design-library/scripts/test-brief.mjs
   node agency-visual-design-library/scripts/qa-browser.mjs --shots /tmp/avdl-shots
   ```
5. Look at the screenshots for the new or changed style at desktop and phone
   widths. Scripts catch broken layouts and contrast, not weak art direction.
6. Commit the data, CSS and regenerated files together, and add a line to
   `CHANGELOG.md`.

## Quality bar

A change is ready when:

- `check-data.mjs` passes: every field present, vocabulary valid, palette shares
  total 100, `.example` domains, token text pairs at 4.5:1 or more
  (`ink`, `muted` and `accentText` on `bg` and `surface`; `onAccent` on `accent`)
- `qa-browser.mjs` passes: no overflow at 390px, no console errors, no broken
  links, rendered text in the examples at WCAG AA, filters and copy working
- every font is listed with its licence in `06-assets/font-licenses/`
- the Arabic pairing is named and, for Arabic-led styles, the examples are RTL
- the style is visibly distinct from the other nine (compare it on the catalogue
  and the `#tokens` page)

## Project brief rules

`library/brief.js` encodes agency policy, so change it deliberately:

- Client identity is preserved unless the designer chooses *evolve* or *new*.
- Client brand assets are never invented; missing ones become open questions.
- Every output states it is a brief, not final or production-ready artwork.
- The AI prompt always forbids rendering text and logos.

`test-brief.mjs` fails if any of these break. If you change the generator,
regenerate the example in `08-project-workflow/examples/` (the test checks it
is current).

## Sample content rules

- Example brands, people, emails and figures are invented. Mark them:
  the interface labels every example "Fictional sample brand", and generated
  docs carry a notice.
- Domains and emails use the reserved `.example` TLD (`check-data.mjs` enforces it).
- Never use a real client's name, logo, imagery or figures in the library.
  Real client work belongs in the portfolio, not here.
- Never name a real person as a sample contact.

## Naming

- Style IDs: lowercase kebab-case (`quiet-luxury`). The ID is also the page
  address (`index.html#quiet-luxury`), so do not rename IDs without a reason.
- Colour names: one or two descriptive words (`Saffron Gold`), never `Primary 1`.
- Generated files: `visual-styles/NN-style-id.md`, numbered in library order.
- Assets: `client_project_asset_v01.ext`; mockups `mockup_subject_variant.ext`.
