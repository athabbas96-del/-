# Style template

Every style in `library/styles-data.js` has these fields. Use this as a checklist
when writing a new one.

| Field | What to write |
| --- | --- |
| `id`, `name`, `tagline` | Kebab-case ID, display name, one-line promise |
| `sampleBrand`, `sampleBrandType`, `sampleBrandArabic` | An invented brand used in all examples (Arabic name optional) |
| `domain` | The sample brand's domain, always on `.example` |
| `concept` | 2–3 sentences: what it looks like and why it works |
| `keywords` | 4–5 mood words |
| `industries` | 5–6 industries where it fits best (free text, shown on the style page) |
| `sectors`, `moods`, `applications` | Values from `AVDL_VOCAB` only; they drive the catalogue filters |
| `palette` | 5–6 colours: `name`, `hex`, `role`, `share` (% of layout, totals 100) |
| `paletteRule` | The one rule that keeps the palette on-brand |
| `typography` | `display`, `body`, optional `utility`, `arabic`, a 5-step `scale`, 3 `rules` |
| `layout` | `grid`, `spacing`, `radius`, 5 `rules` |
| `photography` | `summary`, 5 `rules`, 3 `shots` (`caption` + 3-colour `tone`), `avoid` |
| `graphics`, `motif` | 5 graphic elements and the one shown in the specimen |
| `ui` | 4 `notes`, button labels, input, 3 tags, one card |
| `social` | 3 `notes`, copy for `feed`, `story` and `ad` |
| `website` | 3 `notes`, `nav`, `hero`, 3 `features` |
| `advertising` | `campaign` name, one-sentence `idea`, `billboard` (eyebrow, headline, cta), `banner` (headline, cta), 3 `notes` |
| `presentation` | `cover` (kicker, title, sub), `content` (title, metric value + label, 3 points), 3 `notes` |
| `brand` | `person` (name, role), `email` on the sample domain, 4 `applications` written as "Item: specification", 3 `notes` |
| `dos`, `donts` | 3 each |
| `tokens` | `bg`, `surface`, `ink`, `muted`, `accent`, `accentText` (accent that passes 4.5:1 as text), `accent2`, `onAccent`, `line`, fonts, display settings, radius, button radius, border width, shadow |

Wrap one word of a headline in `*asterisks*` to mark the emphasised word; each
style renders emphasis its own way (italic, accent colour, marker highlight).
