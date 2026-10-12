# Icons: starter set

Fifteen interface icons built to the [Iconography](../../00-foundations/iconography/README.md)
spec: 24 × 24 grid, 2px padding, 1.5px stroke, round caps and joins,
`stroke="currentColor"` so they take the text colour.

| | Name | Mirror in RTL |
| --- | --- | --- |
| ![](./arrow-right.svg) | `arrow-right` | Yes (swap with `arrow-left`) |
| ![](./arrow-left.svg) | `arrow-left` | Yes |
| ![](./check.svg) | `check` | No |
| ![](./close.svg) | `close` | No |
| ![](./menu.svg) | `menu` | No |
| ![](./search.svg) | `search` | Optional: many Arabic interfaces mirror the magnifier |
| ![](./plus.svg) | `plus` | No |
| ![](./calendar.svg) | `calendar` | No |
| ![](./location.svg) | `location` | No |
| ![](./mail.svg) | `mail` | No |
| ![](./user.svg) | `user` | No |
| ![](./bag.svg) | `bag` | No |
| ![](./play.svg) | `play` | No: media controls are not mirrored |
| ![](./download.svg) | `download` | No |
| ![](./external.svg) | `external` | Yes |

## Adapting to a style

Change `stroke-width` to 2 for Swiss Precision and Kinetic Sport (and
`stroke-linecap="square"`), or 2.5 for Neo-Brutalism. Apply Kinetic Sport's
skew with `transform: skewX(-8deg)` in CSS. Playful Pop uses filled icons;
draw those as a separate set rather than filling these outlines.

Licence: made for the agency; free to use in client work.
