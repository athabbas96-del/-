# Grid, alignment and visual hierarchy

## 1. Grid types

| Grid | Structure | Best for | Library example |
| --- | --- | --- | --- |
| Column | Vertical columns + gutters | Websites, social, most layouts | All styles (12 columns on desktop) |
| Modular | Columns × rows = modules | Data, reports, catalogues | Swiss Precision (modules of 4 × 8px rows) |
| Baseline | Horizontal lines every N px | Long text, editorial | Swiss Precision, Bold Editorial |
| Manuscript | One wide text block | Letters, long reads | Letterheads, article pages |
| Hierarchical | Areas sized by content | Posters, billboards, covers | Bold Editorial covers, Kinetic Sport |

## 2. Column maths

```
column width = (container − (columns − 1) × gutter) ÷ columns
```

1200px container, 12 columns, 24px gutter → (1200 − 11 × 24) ÷ 12 = **78px** columns.

| Breakpoint | Width | Columns | Gutter | Outer margin |
| --- | --- | --- | --- | --- |
| Phone | < 600px | 4 | 16px | 16–20px |
| Tablet | 600–1023px | 8 | 24px | 32px |
| Desktop | 1024–1439px | 12 | 24px | 40–64px |
| Wide | ≥ 1440px | 12 | 24–32px | Container max 1200–1320px, centred |

Style-specific gutters and margins are in each style's *Layout rules*
(for example Quiet Luxury: 32px gutter, 120px outer margin).

## 3. Grids by medium

| Medium | Canvas | Suggested grid | Safe margin |
| --- | --- | --- | --- |
| Social feed post | 1080 × 1080 | 6 columns, 24px gutter | 60px |
| Social portrait / ad | 1080 × 1350 | 6 columns | 60px |
| Story / Reel | 1080 × 1920 | 4 columns | 250px top, 340px bottom kept clear of text |
| Slide | 1920 × 1080 | 12 columns, 40px gutter | 120px sides, 96px top/bottom |
| A4 document | 210 × 297 mm | 12 columns, 4–5mm gutter | 15–20mm; 3mm bleed for print |
| Billboard 48-sheet | 6096 × 3048 mm (2:1) | 3–4 zones, no fine grid | 5% of width; check the site's frame |
| Business card | 85 × 55 mm | 4 columns | 4–5mm; 3mm bleed |

Full specs for social formats: [`02-social-media/formats-and-specs`](../../02-social-media/formats-and-specs/README.md).

## 4. Alignment

- **Choose one alignment edge per block** and keep to it. Mixed centring and
  left alignment in one block looks accidental.
- **Left-align running text** (right-align for Arabic). Centre only short,
  symmetrical compositions (Quiet Luxury posts, Modern Heritage openers).
- **Align to the text, not the box.** Optical alignment: hang punctuation and
  round letters slightly outside the edge on large display type.
- **Align across elements.** The baseline of a headline, the top of an image and
  the edge of a button should share grid lines.
- **Mirror the whole grid for RTL**, not just the text (see [Arabic and RTL](../arabic-and-rtl/README.md)).

## 5. Visual hierarchy

The eye goes to the element with the most contrast: size, weight, colour,
isolation or motion. Decide the reading order first, then give each step less
contrast than the one before.

| Tool | Raise priority by | Example |
| --- | --- | --- |
| Scale | Making it much larger (2× or more) | Swiss Precision's oversized figures |
| Weight | Bold against light | Neo-Brutalism headlines |
| Colour | Using the accent once | Swiss Precision's single red number |
| Isolation | Surrounding it with space | Quiet Luxury's single product |
| Position | Top-left (top-right in Arabic) | Kickers and eyebrows |
| Direction | Lines, gaze and diagonals pointing at it | Kinetic Sport's speed stripes |

Common scanning patterns: **Z-pattern** for sparse layouts (ads, heroes: logo →
headline → image → CTA) and **F-pattern** for dense text (articles, results).
In RTL layouts both patterns mirror.

**The squint test:** blur the layout (or step back). You should still see one
clear first element, one second, and the call to action.

## 6. Layout principles used across the library

1. One idea per frame: one post, one slide, one billboard, one message.
2. Proximity: related items close, unrelated far (see [Spacing](../spacing/README.md)).
3. Repetition: the same element in the same place on every frame of a series.
4. Breaking the grid is a decision. Only Neo-Brutalism and Kinetic Sport
   allow it, and they define by how much.

## Checklist

- [ ] Grid chosen for the medium; gutters and margins written down
- [ ] One alignment edge per block; RTL grid mirrored
- [ ] A clear first, second and third element (squint test)
- [ ] Safe zones respected for social, print bleed and billboards
