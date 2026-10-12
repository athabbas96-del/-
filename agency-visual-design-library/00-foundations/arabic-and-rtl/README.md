# Arabic typography and right-to-left layout

Arabic is a lead language for many of the agency's audiences, not a
translation added at the end. Design the Arabic version at the same time as the
English one, and when Arabic is the primary audience, design it **first**
(as Modern Heritage does).

## 1. How Arabic script differs from Latin

| Feature | Arabic | Design consequence |
| --- | --- | --- |
| Direction | Right to left | Layout, reading order and many icons mirror |
| Letter forms | Connected; each letter has up to four shapes (isolated, initial, medial, final) | Never letter-space Arabic: tracking breaks the joins |
| Case | No upper and lower case | All-caps and small-caps treatments have no equivalent; use weight or size instead |
| Vertical extent | Tall ascenders, deep descenders, dots and optional vowel marks (tashkeel) above and below | Needs more line height: 1.6–1.8 for body, at least 1.2–1.35 for display |
| Apparent size | Many Arabic faces look smaller than Latin at the same point size | Set Arabic about 10–20% larger, or choose a pair designed to match |
| Italic | No traditional italic | Never slant Arabic; emphasise with weight, colour or a different style of the family |
| Justification | Traditionally by stretching letters (kashida) | On screen, use left/right ragged text; never insert tatweel characters by hand to justify |

## 2. Script styles and where to use them

| Style | Character | Use for | Avoid for |
| --- | --- | --- | --- |
| Naskh | Clear, book-like, high readability | Body text, long reads, formal communication | — |
| Kufi | Geometric, angular, modern | Headlines, logos, signage, tech and contemporary brands | Long body text in display cuts |
| Thuluth | Large, flowing, ornamental calligraphy | Ceremonial titles, cultural and religious contexts, by a calligrapher | UI, body text, casual brands |
| Ruq'ah | Compact, handwritten | Informal accents, handwritten notes | Formal body text |
| Diwani | Ornate, interlaced | Invitations, certificates, ceremonial pieces | Anything that must be read quickly |

Sacred text (Qur'anic verses) must never be used as decoration, cropped,
placed on products that may be discarded, or set under feet (floors, mats).

## 3. Arabic–English pairing

Pair by **structure and weight**, not by trying to make the scripts look alike.

| Approach | Example pairs | Library styles |
| --- | --- | --- |
| Same superfamily (safest) | IBM Plex Sans + IBM Plex Sans Arabic; Noto Sans + Noto Sans Arabic / Noto Kufi Arabic | Swiss Precision, Clinical Clarity |
| Matched geometric | Sora / Manrope + Readex Pro; Plus Jakarta Sans + Tajawal | Future Tech, Clinical Clarity |
| Serif with Naskh | Cormorant Garamond / Bodoni Moda + Amiri or Noto Naskh Arabic | Quiet Luxury, Bold Editorial |
| Heavy display with heavy display | Anton + Lalezar; Archivo Black + Changa | Kinetic Sport, Neo-Brutalism |
| Rounded with rounded | Fredoka + Baloo Bhaijaan 2 | Playful Pop |
| Bilingual by design | Reem Kufi (includes Latin) + IBM Plex Sans Arabic | Modern Heritage |

Pairing checks:

1. Set the same sentence in both scripts at the same size and compare
   **visual size** and **colour** (darkness of the text block). Adjust size and
   weight until they match.
2. Match weights by appearance: a "Bold" Arabic may need to pair with a Latin
   SemiBold.
3. Check the Arabic font has the weights you need. Many Arabic families have
   fewer weights than their Latin partners.
4. Check the Arabic font covers the characters you need: Persian and Urdu
   letters, Eastern Arabic-Indic digits, Arabic punctuation (، ؛ ؟).

## 4. Right-to-left layout

**Mirror:**

- the whole grid and reading order: navigation starts at the right, the
  logo sits top-right, and sidebars and timelines flip
- directional icons: back and forward arrows, chevrons, "reply", progress bars,
  sliders, list bullets and indentation
- text alignment: right-aligned by default
- the Z and F reading patterns

**Do not mirror:**

- logos and brand marks
- media playback controls (play, fast-forward). They describe the medium, not the reading direction
- clocks, charts with a time axis (unless the client's convention says otherwise), phone numbers, maths
- icons of real objects (a camera, a phone) unless they contain direction
- check marks, which are not mirrored in common practice

**On the web:**

- set `<html lang="ar" dir="rtl">` (or `dir="rtl"` on the Arabic block)
- use logical CSS properties (`margin-inline-start`, `padding-inline-end`,
  `inset-inline-start`, `text-align: start`) so one stylesheet serves both
  directions
- use flexbox and grid. They follow `dir` automatically
- flip directional icons with `[dir="rtl"] .icon-arrow { transform: scaleX(-1); }`

## 5. Mixed Arabic and English (bidirectional text)

- Latin brand names, URLs, emails and code inside Arabic text run left to right.
  Wrap them in `<bdi>` or a `dir="ltr"` span so punctuation does not jump to
  the wrong side.
- For user-generated or unknown text, use `dir="auto"`.
- Numbers always read left to right, even inside RTL text.
- **Digits:** decide per market and keep it consistent. Western Arabic digits
  (0–9) are standard in the Maghreb and common across the Gulf in digital
  contexts; Eastern Arabic-Indic digits (٠–٩) are common in Iraq, the Levant,
  Egypt and the Gulf in print and formal contexts. Modern Heritage uses Eastern
  digits for heritage dates (١٩٨٤) and Western digits for prices.
- Use Arabic punctuation in Arabic text: comma ، semicolon ؛ question mark ؟.

## 6. Bilingual lockups

| Layout | When to use |
| --- | --- |
| Side by side: Arabic right, English left | Wide formats: signage, website headers, billboards |
| Stacked: Arabic above English | Narrow formats: social avatars, packaging fronts, business cards |
| Separate monolingual versions | When one language dominates a market or channel |

Give both languages equal optical weight unless the brand has a declared lead
language. Build the lockup as a fixed artwork so spacing is never improvised.
Modern Heritage's rule: the bilingual lockup is the master logo, Arabic alone
is allowed, English alone is not.

## 7. Social, print and motion

- Arabic captions are often longer or shorter than the English: design layouts
  that tolerate ±30% text length.
- In carousels and stories, the swipe direction does not change (platforms are
  LTR), but the content order within a slide is RTL.
- Kinetic or animated Arabic type should animate in the reading direction
  (right to left) and keep letters joined during the animation.

## Checklist

- [ ] Arabic designed alongside, or before, English
- [ ] Pairing checked for visual size, weight and character coverage
- [ ] No letter-spacing, slanting or fake bold on Arabic
- [ ] Line height 1.6–1.8 for body
- [ ] Layout mirrored with logical properties; logos and media controls not mirrored
- [ ] Latin names, numbers and URLs isolated in bidi text
- [ ] One digit system per market, applied consistently
- [ ] Bilingual lockup built as fixed artwork
