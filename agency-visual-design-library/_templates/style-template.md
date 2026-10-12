# Style template

Every style in `library/styles-data.js` has these fields. Use this as a checklist
when writing a new one.

| Field | What to write |
| --- | --- |
| `id`, `name`, `tagline` | Kebab-case ID, display name, one-line promise |
| `sampleBrand`, `sampleBrandType` | An invented brand used in all examples |
| `concept` | 2–3 sentences: what it looks like and why it works |
| `keywords` | 4–5 mood words |
| `industries` | 5–6 industries where it fits best |
| `palette` | 5–6 colours: `name`, `hex`, `role`, `share` (% of layout, totals 100) |
| `paletteRule` | The one rule that keeps the palette on-brand |
| `typography` | `display`, `body`, optional `utility`, `arabic`, a 5-step `scale`, 3 `rules` |
| `layout` | `grid`, `spacing`, `radius`, 5 `rules` |
| `photography` | `summary`, 5 `rules`, 3 `shots` (`caption` + 3-colour `tone`), `avoid` |
| `graphics`, `motif` | 5 graphic elements and the one shown in the specimen |
| `ui` | 4 `notes`, button labels, input, 3 tags, one card |
| `social` | 3 `notes`, copy for `feed`, `story` and `ad` |
| `website` | 3 `notes`, `nav`, `hero`, 3 `features` |
| `dos`, `donts` | 3 each |
| `tokens` | Colours, fonts, radius, border and shadow used to render the examples |

Wrap one word of a headline in `*asterisks*` to mark the emphasised word; each
style renders emphasis its own way (italic, accent colour, marker highlight).
