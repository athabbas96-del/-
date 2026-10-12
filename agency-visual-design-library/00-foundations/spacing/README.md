# Spacing

## 1. The scale

All styles use an 8px base with a 4px half-step for tight UI.

| Token | px | Typical use |
| --- | --- | --- |
| `space-1` | 4 | Icon to label, tag padding |
| `space-2` | 8 | Inside compact controls, between related lines |
| `space-3` | 12 | Between chips, list items |
| `space-4` | 16 | Card padding (compact), phone gutter |
| `space-5` | 24 | Card padding, desktop gutter |
| `space-6` | 32 | Between groups inside a section |
| `space-7` | 48 | Between sub-sections |
| `space-8` | 64 | Section spacing on phone |
| `space-9` | 96 | Section spacing on desktop |
| `space-10` | 128 | Generous section spacing (Future Tech) |
| `space-11` | 160 | Luxury section spacing (Quiet Luxury) |

Print uses millimetres instead (2, 4, 6, 8, 12, 16, 24mm), but the same
proportions apply.

## 2. Rules

- **Inside is smaller than outside.** Padding inside a group must be smaller
  than the space between groups, otherwise grouping breaks (Gestalt proximity).
- **Use the scale, not in-between values.** If 24 feels too much and 16 too
  little, change the element, not the spacing.
- **Space text by its line height.** Vertical rhythm comes from consistent
  multiples of the body line height.
- **Lay out siblings with gap,** not per-element margins (in CSS: `gap` on flex
  and grid), so spacing cannot collapse or double.

## 3. Density by style

| Density | Styles | Section spacing (desktop) | Feel |
| --- | --- | --- | --- |
| Airy | Quiet Luxury, Organic Earth, Modern Heritage | 120–160px | Calm, premium |
| Balanced | Clinical Clarity, Future Tech, Bold Editorial, Playful Pop | 96–128px | Clear |
| Dense | Swiss Precision, Neo-Brutalism, Kinetic Sport | 64–96px | Efficient, energetic |

Bold Editorial is tight *within* groups and dramatic *between* them; that
contrast is the style.

## Checklist

- [ ] Every distance is a scale value
- [ ] Inner spacing smaller than outer spacing
- [ ] Section spacing matches the style's density
