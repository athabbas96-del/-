# Responsive patterns

## 1. Breakpoints and grids

See [Grid and layout](../../00-foundations/grid-and-layout/README.md): 4 columns
on phones, 8 on tablets, 12 on desktop. Design phone and desktop first, then
check tablet.

## 2. Reflow patterns

| Pattern | Desktop | Phone |
| --- | --- | --- |
| Split hero | Text left, image right (mirrored in RTL) | Text, then image |
| Card grid | 3–5 columns | 1–2 columns; keep the count so rows fill |
| Proof row | 3 columns | Stacked list |
| Navigation | Inline links | Menu button |
| Tables | Full table | Horizontal scroll inside its own container, or cards |
| Long headlines | Display size | Reduce by 30–40%; never let words break mid-word |

The library itself uses these patterns. Its examples are built with container
queries, so the same component reflows by its own width, not the page width.

## 3. Rules

- No horizontal page scroll at 320px wide (WCAG 1.4.10).
- Touch targets 24px minimum, 44px for primary actions.
- Keep side margins (16px minimum on phones).
- Images: serve sizes that match the layout (`srcset`, `sizes`), set
  `width`/`height` to prevent layout shift, and use modern formats (AVIF/WebP).
- Fonts: load only the weights you use; `font-display: swap`.

## 4. RTL

Use logical properties so one stylesheet serves both directions, and test the
Arabic version at every breakpoint: Arabic copy length differs, and mirrored
layouts can expose alignment bugs. See [Arabic and RTL](../../00-foundations/arabic-and-rtl/README.md).

## Checklist

- [ ] Phone, tablet and desktop designed; 320px tested
- [ ] Reflow pattern chosen for each section
- [ ] Images sized and dimensioned; fonts limited
- [ ] RTL tested at every breakpoint
