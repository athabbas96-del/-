# Iconography

## 1. Construction

| Property | Standard |
| --- | --- |
| Canvas | 24 × 24px (also export 16, 20, 32, 48) |
| Live area | 20 × 20px, 2px padding all round |
| Stroke | 1.5px (refined styles) or 2px (bold styles); one weight per set |
| Caps and joins | Round for friendly styles, square/miter for technical styles |
| Corner radius | Match the style's UI radius proportionally |
| Optical size | Circles and diagonals slightly larger than squares so they look equal |
| Format | SVG with `currentColor` strokes, no fills unless the style uses filled icons |

A starter set built to this spec is in [`06-assets/icons`](../../06-assets/icons/README.md).

## 2. Icon treatment by style

| Style | Treatment |
| --- | --- |
| Quiet Luxury | Avoid icons where a word works. If needed: 1px hairline, square caps, Onyx |
| Swiss Precision | 2px stroke, square caps, sit on the grid; arrows are the main icon |
| Neo-Brutalism | 2.5px stroke, round caps, inside outlined squares with hard shadow |
| Organic Earth | 1.5px, round caps; hand-drawn botanical line art for features |
| Future Tech | 1.5px, round caps, inside glass circles with a small glow |
| Bold Editorial | Minimal; use typographic devices (arrows →, numbers) instead |
| Playful Pop | Filled, rounded, two-colour (Cocoa + one brand colour) |
| Clinical Clarity | 1.5px, round caps, in Mist circles; always with a text label |
| Modern Heritage | 1.5px gold line, geometric; derive motifs from the khatam star grid |
| Kinetic Sport | 2px, square caps, skewed −8° to match type |

## 3. Rules

- Icons support labels; they rarely replace them. Navigation and health/finance
  actions always have a text label.
- Interactive icons need a 24px minimum target (44px recommended), even if the
  glyph is smaller.
- Icon-only buttons need an accessible name (`aria-label`).
- Mirror directional icons in RTL (see [Arabic and RTL](../arabic-and-rtl/README.md)).
- Icon contrast: 3:1 minimum against the background.

## Checklist

- [ ] One stroke weight and cap style across the set
- [ ] Built on the 24px grid with 2px padding
- [ ] Labels present where meaning matters; accessible names on icon buttons
- [ ] Directional icons mirrored in RTL
