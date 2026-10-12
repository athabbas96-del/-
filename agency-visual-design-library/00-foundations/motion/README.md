# Motion

## 1. Duration and easing tokens

| Token | Duration | Use |
| --- | --- | --- |
| `motion-instant` | 100ms | Colour and opacity changes on hover/press |
| `motion-fast` | 150ms | Small UI: toggles, chips, Kinetic Sport transitions |
| `motion-base` | 250ms | Most UI transitions: menus, cards |
| `motion-slow` | 400ms | Large panels, page sections |
| `motion-story` | 600–1200ms | Brand moments: logo reveals, hero entrances |

| Easing | CSS | Feel |
| --- | --- | --- |
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Natural deceleration, default |
| Enter | `cubic-bezier(0, 0, 0.2, 1)` | Elements arriving |
| Exit | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving (faster than entering) |
| Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Slight overshoot: playful styles only |
| Linear | `linear` | Progress, loops, marquee only |

## 2. Motion signature by style

| Style | Signature |
| --- | --- |
| Quiet Luxury | Slow fades and 6-second zooms; nothing bounces |
| Swiss Precision | Hard cuts or quick slides along the grid; numbers count up |
| Neo-Brutalism | Hard cuts, no easing; pressed buttons drop into their shadow |
| Organic Earth | 300ms+ gentle ease; leaf drift, pours |
| Future Tech | Glows fade in; panels assemble; logo builds from data points in 1.2s |
| Bold Editorial | Page-turn transitions, two frames maximum |
| Playful Pop | Spring easing, bouncy stickers, three loops at most |
| Clinical Clarity | Minimal and calm; motion only to show cause and effect |
| Modern Heritage | Slow reveals following the RTL reading direction; pattern draws on |
| Kinetic Sport | 150ms cuts on the beat, slide in from the leading edge |

## 3. Accessibility

- Provide a `prefers-reduced-motion` version: cross-fades instead of movement,
  or no animation.
- Never flash more than three times per second.
- Loops over five seconds need a pause control on the web.

## 4. Video and animated social

- Design for sound off: burn in captions or use platform captions.
- Put the message in the first 2 seconds; put the logo in the first 3 seconds and at the end.
- Keep text inside the platform safe zones
  (see [`02-social-media/formats-and-specs`](../../02-social-media/formats-and-specs/README.md)).
- Export the platform's recommended codec (usually H.264 MP4) at 1080 × 1920
  for vertical and 1080 × 1350 or 1080 × 1080 for feed.

## Checklist

- [ ] Durations and easing from the tokens
- [ ] Motion matches the style's signature
- [ ] Reduced-motion version; no flashing; pause control for long loops
- [ ] Captions and safe zones on video
