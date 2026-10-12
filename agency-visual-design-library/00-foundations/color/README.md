# Colour

## 1. How colour is described

| Property | What it is | Why it matters in a palette |
| --- | --- | --- |
| Hue | The colour family (red, teal, violet) | Carries meaning and recognition |
| Saturation / chroma | How intense the colour is | High chroma attracts attention, so ration it |
| Lightness / value | How light or dark it is | Decides contrast and therefore legibility |

Lightness is the property that decides whether text can be read. Two colours
with different hues but the same lightness (for example Clay Rose `#C98F7E` on
Oat `#E9E4D8`, 2.15:1) will fail as text and background however different they
look. Check lightness first and pick hues second.

For building tint and shade ramps, work in **OKLCH** (supported in all current
browsers and in Figma via plugins). Equal steps in OKLCH lightness look like
equal steps to the eye, which HSL does not guarantee.

## 2. Colour relationships

| Harmony | Construction | Effect | Library example |
| --- | --- | --- | --- |
| Monochrome | One hue, several lightnesses | Calm, premium | Quiet Luxury (warm greys + one Champagne) |
| Analogous | Neighbouring hues | Natural, cohesive | Organic Earth (sage, moss, bark) |
| Complementary | Opposite hues | Tension, energy | Kinetic Sport (Blaze orange vs Cobalt blue) |
| Split complementary | One hue + the two beside its opposite | Lively but balanced | Modern Heritage (gold against turquoise and midnight) |
| Triadic / multi | Three or more spaced hues | Playful | Playful Pop, Neo-Brutalism |
| Neutral + signal | Achromatic base + one strong hue | Authority, clarity | Swiss Precision (black, white, Signal Red) |

Complementary pairs placed edge to edge at similar lightness "vibrate". Kinetic
Sport forbids Blaze touching Cobalt for exactly this reason.

## 3. Building a palette, step by step

1. **Start from the brand's one owned colour.** If the client has a logo colour,
   it is the accent, not the background.
2. **Choose the neutrals deliberately.** Push them slightly towards the accent's
   hue (Quiet Luxury's greys lean warm toward Champagne; Future Tech's darks lean
   blue toward Ion Violet). Pure mid-grey looks unconsidered.
3. **Assign roles, not just colours.** Every colour gets a job: background,
   surface, text, secondary text, accent, accent-as-text, line.
4. **Set proportions with the 60-30-10 split** as a starting point: about 60%
   dominant (background), 30% secondary (text, panels), 10% accent. Each style
   in the library records its exact shares; the palette bar on the style page
   shows them.
5. **Derive an accessible accent-text colour.** A bright accent is usually too
   light to read as text. Every style has an `accentText` token that is the
   accent darkened (or lightened, on dark styles) until it reaches 4.5:1 on
   both `bg` and `surface`.
6. **Test contrast** (section 5), then **test in context**: a palette that works
   as swatches can fail on a photo or at small size.
7. **Write the one rule** that keeps the palette on-brand (each style's
   `paletteRule`), for example "Champagne is a detail colour".

## 4. Tokens: primitive and semantic

The library separates two layers:

- **Primitive tokens** name a colour: `--avdl-color-saffron-gold: #C99A2E`.
- **Semantic tokens** name a job: `--avdl-accent`, `--avdl-accent-text`,
  `--avdl-on-accent`, `--avdl-surface`.

Components use semantic tokens only. When a client changes their accent, you
update one primitive and the semantic mapping, and every component follows.
See [`visual-styles/tokens.css`](../../visual-styles/tokens.css) and
[`tokens.json`](../../visual-styles/tokens.json) (W3C Design Tokens format).

## 5. Contrast targets

| Use | Minimum (WCAG 2.2 AA) |
| --- | --- |
| Body text (under 24px regular / 18.66px bold) | 4.5:1 |
| Large text (24px+ regular, or 18.66px+ bold) | 3:1 |
| UI component boundaries, icons, focus rings, chart marks | 3:1 against neighbours |

`node agency-visual-design-library/scripts/check-data.mjs` checks every style's
text token pairs; see [Accessibility](../accessibility/README.md).

## 6. Dark palettes

Do not invert a light palette. On dark grounds:

- use an off-white (Frost `#E6E8F2`, Chalk `#F7F7F5`) instead of pure white for
  long text, and step body text down further (Future Tech uses 80% Frost)
- raise surfaces by lightness (Void `#0A0B14` → Hull `#151830`) instead of using
  shadows, which do not show on black
- lighten the accent for text (Future Tech: Ion Violet `#6C55F2` fills buttons,
  `#9C88FF` is used for violet text)

## 7. Screen, print and spot colour

| Medium | Colour model | Notes |
| --- | --- | --- |
| Screens | sRGB hex | The library's values are sRGB |
| Offset / digital print | CMYK | Convert with the printer's ICC profile; always request a hard proof for brand colours |
| Brand-critical print, packaging | Spot (Pantone) | Choose the spot colour from a physical swatch book, not a screen |
| Foil, metallic | Special process | Modern Heritage's gold is specified as foil or metallic ink, never flat yellow |

Large black areas in offset print usually need a "rich black" build; ask the
printer for their recommended recipe and ink limit. Uncoated stock (Organic
Earth labels) absorbs ink and makes colours duller and darker, so proof on
the real paper.

## 8. Meaning and context

Colour associations differ by market, category and season. Do not rely on a
universal meaning; check the client's category (what competitors use) and the
audience's context (for example, campaign seasons such as Ramadan have
established colour conventions in each market). Colour must never be the only
way information is conveyed: pair it with text, icons or position.

## Checklist

- [ ] Every colour has a named role and a share of the layout
- [ ] Text pairs pass 4.5:1 (3:1 for large text); accent text uses `accentText`
- [ ] Neutrals are tinted deliberately
- [ ] Dark version designed separately, not inverted
- [ ] Print values proofed on the actual stock; spot colours chosen from a swatch book
- [ ] Information never relies on colour alone
