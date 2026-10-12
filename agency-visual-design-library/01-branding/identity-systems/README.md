# Identity systems

An identity is recognised by the *combination* of its parts, often before the
logo is read. A good system still looks like the brand when the logo is covered.

## 1. The parts

| Part | Defined in the library as | Example |
| --- | --- | --- |
| Logo family | Brand applications, [Logo systems](../logo-systems/README.md) | Velline monogram |
| Colour | Palette with roles and shares, semantic tokens | Swiss: 62% white, one red accent |
| Typography | Display, body, utility and Arabic faces, a five-level scale | Kinetic: Anton skewed −8° |
| Imagery | Photography direction and shot briefs | Organic: ingredients and hands in daylight |
| Graphic devices | Graphic elements and the motif | Heritage: khatam star and arch |
| Layout | Grid, spacing and composition rules | Luxury: 40% of every layout empty |
| Voice | Copy in the examples, do/don't | Pop: talks like a friend |
| Motion | Motion signature ([Motion](../../00-foundations/motion/README.md)) | Tech: panels assemble |

## 2. The "cover the logo" test

Cover the logo on five applications (a post, an ad, a slide, a card, a web
page). If they still read as one brand, the system works. If not, strengthen
the most ownable device (a colour ratio, a type treatment, a shape) and repeat
it everywhere.

## 3. Constants and variables

Decide what never changes and what may flex, and write it down.

| Constants (never change) | Variables (flex per campaign) |
| --- | --- |
| Logo, core palette, typefaces, grid | Campaign colour from the secondary palette |
| The signature device (red square, arch, marker highlight) | Photography subjects |
| Tone of voice | Headlines, seasonal motifs |

Playful Pop is a good example: the outlines, rounded type and stickers are
constant; the background colour rotates by product and post.

## 4. Adapting a library style for a client

1. Pick the style that matches the brief (filter by industry, mood, application).
2. Replace the sample brand's logo and accent with the client's. Keep the
   palette roles and shares.
3. Re-derive `accentText` and `onAccent` for the new accent and re-check
   contrast (`scripts/check-data.mjs` logic, or any contrast checker).
4. Keep the style's typefaces unless the client owns typefaces; if replacing,
   replace like for like (serif for serif, condensed for condensed).
5. Rewrite the copy in the client's voice; never ship sample copy.
6. Document constants and variables in the client's guidelines.

## Checklist

- [ ] Every part defined; signature device named
- [ ] Cover-the-logo test passed across five applications
- [ ] Constants and variables written down
- [ ] Sample brand content fully replaced
