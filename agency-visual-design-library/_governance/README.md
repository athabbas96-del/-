# Governance

How the library is maintained so it stays consistent and trustworthy.

## Source of truth

`library/styles-data.js` holds every style. Two outputs are built from it:

| Output | How it is produced | Edit directly? |
| --- | --- | --- |
| `index.html` (visual library) | Rendered in the browser by `library/render.js` | No, edit the data file |
| `visual-styles/*.md`, `visual-styles/tokens.css` | `node scripts/build-docs.mjs` | No, regenerate |

After changing the data file, run the generator and commit both the data and the
generated files together.

## Adding or changing a style

1. Copy the field list from `_templates/style-template.md`.
2. Add the object to `library/styles-data.js`. Every section is required.
3. If the style needs a unique treatment (a mask, a motif), add a
   `[data-style="your-id"]` block at the end of `library/library.css`.
4. Run `node scripts/build-docs.mjs`.
5. Open `index.html` and check desktop and phone widths.

## Naming

- Style IDs: lowercase kebab-case, two words (`quiet-luxury`).
- Colour names: one or two descriptive words (`Saffron Gold`), never `Primary 1`.
- Files in `visual-styles/`: `NN-style-id.md`, numbered in library order.
- Client assets in `06-assets/`: `client_project_asset_v01.ext`.

## Quality bar for a style

- Body text and its background pass WCAG AA (4.5:1).
- Palette shares add up to 100%.
- Every font is available on Google Fonts or licensed (record licences in `06-assets/font-licenses/`).
- Arabic pairing is named for every style.
- Example brands are invented. Never use a real client without approval.
