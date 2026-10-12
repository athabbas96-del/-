# Contrast, accessibility and readability

Accessible design is part of the craft, not a final check. The targets below
follow **WCAG 2.2 level AA**, which is the usual legal and contractual baseline.

## 1. Contrast

| Element | Minimum | WCAG criterion |
| --- | --- | --- |
| Text under 24px (or under 18.66px bold) | 4.5:1 | 1.4.3 |
| Large text: 24px+, or 18.66px+ bold | 3:1 | 1.4.3 |
| Icons, input borders, focus rings, chart lines | 3:1 against adjacent colours | 1.4.11 |
| Logos and purely decorative text | No requirement | 1.4.3 exception |

How the library meets this:

- **`accentText` token.** Bright accents (Champagne, Coral, Highlighter) fail as
  text. Each style has a darker or lighter accent for text that passes 4.5:1 on
  both background and surface.
- **`onAccent` token.** Text on accent fills is chosen per style (Cocoa on Coral,
  Onyx on Champagne, white on Ion Violet `#6C55F2`).
- **Automated checks.** `scripts/check-data.mjs` checks every token pair, and
  `scripts/qa-browser.mjs` measures rendered text in every example on every
  page and fails the run on anything below AA. Text over photos is excluded and
  must be checked by eye (section 2).

## 2. Text on images

Contrast cannot be measured against a photo, so control it:

- add a scrim (a gradient from transparent to 60–75% black under the text), as
  the story frames in the library do
- place text over the calmest area of the image and write the shot brief to
  leave that area empty ("negative space top-left for copy")
- keep text off busy textures, faces and high-contrast edges
- check the darkest and lightest parts of the image under the text

## 3. Readability

- Body text at least 16px on screen; Clinical Clarity uses 18px.
- Line length 45–75 characters, line height at least 1.5 for body text.
- Text must survive the WCAG 1.4.12 spacing test (line height 1.5, letter
  spacing 0.12em, word spacing 0.16em) without clipping.
- Layouts must reflow to a 320px-wide viewport without horizontal scrolling
  (1.4.10). The library is tested at 390px.
- Plain language for public, health and financial audiences: short sentences,
  common words, one idea per sentence.

## 4. Interaction

| Rule | Target |
| --- | --- |
| Touch targets | 24 × 24px minimum (2.5.8 AA); 44 × 44px recommended for primary actions |
| Focus | Always visible (2.4.7) and never hidden under sticky bars (2.4.11) |
| Colour alone | Never the only signal for state, errors or links (1.4.1) |
| Labels | Every input has a visible label, not just a placeholder |
| Headings | One logical outline; each page has one `h1` |
| Links | Text says where it goes ("Read the 2027 outlook"), not "Click here" |

The library itself follows these: filter chips are buttons with
`aria-pressed`, the result count is announced (`aria-live`), each style page
moves focus to its heading, and there is a skip link.

## 5. Motion and flashing

- Respect `prefers-reduced-motion`: replace movement with fades or nothing.
- Nothing flashes more than three times per second (2.3.1).
- Auto-playing motion longer than five seconds needs a pause control (2.2.2).

## 6. Images and media

- Meaningful images get alt text that says what the image communicates, not
  what it looks like in detail. Decorative images get empty alt (`alt=""`).
- Videos need captions; social videos should have burned-in or platform
  captions because most are watched muted.
- Text in images (posters, social cards) must also appear in the caption or
  post copy so screen-reader users get it.

## 7. Arabic and bilingual

- Set `lang` and `dir` on every block of Arabic (`lang="ar" dir="rtl"`) so screen
  readers switch voice and browsers lay text out correctly.
- Arabic body text needs more line height (1.6–1.8) and often a slightly larger
  size than Latin at the same nominal size.
- See [Arabic and RTL](../arabic-and-rtl/README.md).

## Checklist

- [ ] Text 4.5:1, large text 3:1, UI and focus 3:1
- [ ] Text over images checked by eye with a scrim or clear area
- [ ] Body 16px+, 45–75 characters, line height ≥ 1.5
- [ ] Works at 320px wide with no horizontal scroll
- [ ] Focus visible; targets 24px+ (44px for primary actions)
- [ ] No information by colour alone
- [ ] Reduced-motion version; no flashing
- [ ] Alt text and captions written
- [ ] `lang`/`dir` set on Arabic content
