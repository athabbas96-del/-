# Typography

## 1. Hierarchy

A reader should be able to tell what to read first, second and third without
reading anything. Build hierarchy with these levers, in order of strength:

1. **Size**: the strongest signal. Use a scale (section 2), not ad-hoc sizes.
2. **Weight**: bold against regular. Use no more than two or three weights per layout.
3. **Position and space**: what is isolated or placed first is read first.
4. **Colour and contrast**: muted text recedes. Do not use colour as the only cue.
5. **Case and tracking**: small uppercase labels with +8–18% tracking read as metadata.

Every style in the library uses five named levels: Display, H1, H2, Body, and a
label, caption, tag or stat level. Keep that count. More than six levels on a
page means some are not distinct enough.

## 2. Type scales

A modular scale multiplies each step by a fixed ratio.

| Ratio | Name | Steps from 16px | Feels | Library use |
| --- | --- | --- | --- | --- |
| 1.200 | Minor third | 16, 19, 23, 28, 33 | Quiet, dense | UI-heavy products |
| 1.250 | Major third | 16, 20, 25, 31, 39 | Balanced | Clinical Clarity |
| 1.333 | Perfect fourth | 16, 21, 28, 38, 50 | Clear | Swiss Precision |
| 1.500 | Perfect fifth | 16, 24, 36, 54, 81 | Expressive | Quiet Luxury, Organic Earth |
| 1.618+ | Golden / custom | 16, 26, 42, 68, 110 | Dramatic | Bold Editorial, Kinetic Sport (cover sizes 120px+) |

Round to whole pixels, then adjust line heights (section 4). On mobile, reduce
the top two steps by about 30–40% and keep body text the same size.

## 3. Pairing typefaces

| Strategy | How | Example in the library |
| --- | --- | --- |
| One superfamily | A single family in several weights | Swiss Precision (Instrument Sans), Clinical Clarity (Plus Jakarta Sans) |
| Contrast of structure | Serif display + sans body | Quiet Luxury (Cormorant Garamond + Jost), Bold Editorial (Bodoni Moda + Libre Franklin), Organic Earth (Fraunces + Karla) |
| Contrast of width | Condensed display + normal body | Kinetic Sport (Anton + Barlow) |
| Personality + neutral | Characterful display + plain body | Neo-Brutalism (Archivo Black + Archivo), Playful Pop (Fredoka + Nunito) |
| Utility third face | Mono for data, codes, captions | Swiss, Neo-Brutalism, Future Tech |

Rules that make a pairing work:

- **Contrast, don't compete.** Two expressive faces fight. One leads, one serves.
- **Match x-height and proportion** so mixed lines look even.
- **Match the era or logic.** Geometric with geometric, humanist with humanist.
- **Check every script you need.** If the brand is bilingual, choose the Arabic
  pairing at the same time (see [Arabic and RTL](../arabic-and-rtl/README.md)).
- **Check the licence** (see [`06-assets/font-licenses`](../../06-assets/font-licenses/README.md)).

## 4. Readability

| Setting | Target |
| --- | --- |
| Body size, screen | 16px minimum, 17–18px for long reads |
| Body size, print | 9–11pt |
| Line length | 45–75 characters; about 65 is ideal |
| Line height, body | 1.4–1.6 (Arabic 1.6–1.8) |
| Line height, display | 0.9–1.15; tighten as size grows |
| Paragraph spacing | At least 1× the font size |
| Alignment | Left (right for Arabic). Avoid justified text on screen. |
| Display tracking | Tighten large sizes by −1% to −3% |
| Label tracking | Loosen small uppercase by +6% to +18% |

Use `text-wrap: balance` for headlines on the web to avoid single-word last lines.

## 5. Numerals and details

- Use **tabular figures** (`font-variant-numeric: tabular-nums`) in tables,
  prices and timers so columns align.
- Use proper typographic marks: curly quotes, en dashes for ranges (35–55),
  the multiplication sign for dimensions (1080 × 1080).
- Avoid faux bold and faux italic: load the real weight or style.
- Never stretch or condense type artificially.

## 6. Emphasis, style by style

The library marks one emphasised word per headline. Each style renders it its
own way, which is part of its identity:

| Style | Emphasis |
| --- | --- |
| Quiet Luxury, Organic Earth, Bold Editorial | Italic of the display face |
| Neo-Brutalism | Highlighter-yellow marker block |
| Future Tech | Violet-to-cyan gradient text |
| Swiss, Clinical, Heritage, Kinetic | Accent-text colour |
| Playful Pop | Grape colour, or a wavy underline on coloured grounds |

## Checklist

- [ ] Five or six named levels, taken from a ratio
- [ ] Body text 16px or larger on screen, 45–75 characters per line
- [ ] Two families at most, plus an optional utility face
- [ ] Arabic pairing chosen and tested if the brand is bilingual
- [ ] Tabular figures in data; real italics and weights only
- [ ] Licences recorded
