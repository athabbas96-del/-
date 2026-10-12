# Logo systems

A logo is a family of artworks, not one file. Deliver the whole family.

## 1. Variants

| Variant | What it is | Use |
| --- | --- | --- |
| Primary lockup | Symbol + wordmark in the preferred arrangement | Default everywhere there is room |
| Secondary lockup | Alternative arrangement (stacked vs horizontal) | Narrow or wide spaces |
| Wordmark | Name only | When the symbol is already present nearby |
| Symbol / monogram | Mark only | Avatars, favicons, app icons, embossing |
| Bilingual lockup | Arabic + English as fixed artwork | Bilingual markets (see [Arabic and RTL](../../00-foundations/arabic-and-rtl/README.md)) |
| Colour versions | Full colour, one colour, black, white (reversed) | Match the background and print process |

Examples from the library's fictional brands:

- **Maison Velline** (Quiet Luxury): the monogram works alone at small sizes;
  the full wordmark needs 40mm width or more.
- **Brandt Okafor Advisory** (Swiss Precision): name plus a red square. The
  square is never redrawn in another colour.
- **Bayt Al Qahwa** (Modern Heritage): the bilingual lockup is the master; Arabic
  alone is allowed, English alone is not.
- **Stride District** (Kinetic Sport): the skewed wordmark is the only logo and
  is never set upright.

## 2. Clear space and minimum size

- **Clear space:** define it from a part of the logo (for example the height of
  the wordmark's x-height or of the symbol), so it scales with the logo.
  Nothing (text, edges, other logos) enters this zone.
- **Minimum size:** test the logo at small sizes and record the smallest
  legible size per medium. Typical starting points are about 24px high on
  screen and 15–20mm wide in print, but always test: thin serifs (Quiet
  Luxury, Bold Editorial) need more than bold geometric marks.
- **Small-size version:** if detail disappears, draw a simplified version
  rather than shrinking the master.

## 3. Misuse to forbid (show these in the guidelines)

Stretching or squashing; recolouring outside the palette; adding shadows,
outlines or effects not in the system; rotating (except where the system
does it, such as Neo-Brutalism stickers); placing on busy images without a
holding shape; rebuilding the wordmark in a live font; changing the bilingual
lockup's arrangement.

## 4. File kit

| Use | Format | Notes |
| --- | --- | --- |
| Print | PDF or EPS, vector, CMYK and spot | Outline all text |
| Screen | SVG (preferred), PNG at 1×/2×/3× | sRGB, transparent background |
| Favicon / app | SVG + PNG 32, 180 (Apple touch), 192, 512 | Use the symbol |
| Social avatar | PNG 1080 × 1080 | Symbol centred inside the circular crop |
| Office | PNG / EMF for Word and PowerPoint | Include in the templates |

Name files `brand_logo-variant_colour.ext`, for example
`velline_monogram_onyx.svg`.

## Checklist

- [ ] All variants and colour versions drawn and exported
- [ ] Clear space defined from the logo itself
- [ ] Minimum sizes tested per medium
- [ ] Misuse page included in the guidelines
- [ ] Favicon, avatar and office files delivered
