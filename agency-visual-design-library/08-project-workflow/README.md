# Project workflow: from style to brief

The **Project brief** turns one of the ten visual styles into direction for a
real project. A designer picks a style, enters the client's project, brand and
deliverables, and gets:

1. a project-specific **creative direction**
2. a structured **design brief**: art direction, colour, typography,
   composition, imagery, graphic elements, deliverable specs, language and
   tone, do/don't, quality checks and open questions
3. a reusable **AI concept prompt** for exploring visuals in an image tool
4. everything as **Markdown**, to copy or download

## What it is, and what it is not

- **Rules-based and local.** The brief is assembled in the browser (or by the
  command line) from the selected style's rules in `library/styles-data.js`
  and the project inputs. **No AI service is called and no images are
  generated.** The same inputs always give the same brief.
- **A brief, not artwork.** Every output says so. Nothing it produces is final
  or production-ready; concepts made from it are designed by a designer,
  checked against the client's guidelines and approved by the client.
- **It never invents client assets.** A missing logo, colour or typeface
  becomes an *open question* and a placeholder (for example a box labelled
  CLIENT LOGO), never a made-up value.

## Run it

**In the library:** open `index.html`, then use any of these:

- **Start a project brief** on the catalogue page
- **Start a project brief with this style** on any style page (the style is preselected)
- the **Project brief** link in the top bar, or the address `index.html#brief`

**From the command line** (Node 18+, from the repository root):

```bash
node agency-visual-design-library/scripts/brief.mjs my-project.json --out my-project-brief.md
```

The command-line tool uses the same engine (`library/brief.js`) as the page,
and the tests check that both give identical Markdown.

## Step by step in the browser

| Step | What to enter | Notes |
| --- | --- | --- |
| 1. Visual style | One of the ten styles | The style is a rule set: palette roles and proportions, type hierarchy, grid, imagery, graphic elements, do/don't |
| 2. Project | Project name, client, project type, industry, target audience, optional objective | Choose *Other…* to type an industry that is not in the list |
| 3. Brand identity | Identity handling, brand colours (up to 6, each with a role), typeface names, which assets the client has supplied | Leave unknown items empty. They become open questions. |
| 4. Deliverables | Any of 19 formats in 5 groups | Each brings its size, ratio, safe area and guide link |
| 5. Language and notes | English, Arabic, or both; tone notes; mandatory items | Arabic adds RTL and Arabic typography rules |

Select **Generate brief**. If something is missing, a list at the top explains
what to fix; each item moves focus to its field. The output has three tabs:
**Brief** (readable), **AI prompt**, and **Markdown**. Use **Copy Markdown**,
**Download .md** or **Copy AI prompt**.

Your entries are kept as a draft in this browser only (local storage), so a
reload does not lose them. **Clear the form** removes the draft.
**Load the fictional example** fills in the example project described below.

## How a style is applied as rules

| Style rule (from the data) | Becomes, in the brief |
| --- | --- |
| Concept, tagline, moods, keywords | Creative direction statement and mood |
| Layout rules, grid, spacing, corners | Art direction rules, composition table |
| Do / don't | Principles and the do/don't table |
| Palette shares and palette rule | Colour proportions, with the rule's intent applied to the client's colours |
| Type scale and type rules | Hierarchy table applied to the client's typefaces |
| Arabic pairing and note | Arabic typography when the project is Arabic or bilingual |
| Photography summary, rules, reference shots, avoid list | Imagery direction and a shot list to rewrite for the client |
| Graphic elements | Supporting devices, drawn in the project palette |
| Social, advertising, presentation, website, UI and brand notes | Style rules per selected deliverable group |
| Sectors and applications | A fit check that warns when the style is not listed for the industry or project type, and names styles that are |

## Identity handling

The client's identity is **preserved by default**. Changing that is an explicit
choice in step 3.

| | Preserve (default) | Evolve (client approved) | New identity (client instructed) |
| --- | --- | --- | --- |
| Brand colour (accent) | Client's only; if missing, it is requested | Client's only | Client's if supplied, otherwise the style's, marked as a proposal |
| Secondary colour | Client's only | Client's, or the style's marked for approval | Client's, or the style's as a proposal |
| Background, text, surface | Client's where supplied; otherwise chosen for contrast and marked as needing approval | Same | Same, or the style's neutrals |
| Typefaces | Client's. If not supplied, requested; style faces only for internal sketches | Client's, plus an optional style display face for approval | Style faces proposed (all OFL-licensed) |
| Logo | Supplied files used unchanged; otherwise a CLIENT LOGO placeholder | Same | Same. The workflow never draws a logo. |
| Graphic devices | Supporting only; the client's own devices take priority | Supporting, for approval | Can become part of the new system |

The brief warns when the inputs conflict, for example a *new identity* project
type with *preserve* selected.

### How colours are planned

- **Accent** = the client's *Primary* colour (or *Accent* if there is no primary).
- **Secondary** = the client's *Secondary* (or *Accent*).
- **Background** and **text** = the client's *Background* and *Text* colours when
  given. If only one is given, the other is chosen **for contrast**: first one of
  the client's own colours that reaches 7:1, then a style colour that reaches
  4.5:1, then near-black or white. The source of every colour is written next
  to it.
- **Surface** and **muted text** are derived from the background and text
  (a light tint, and a softened text colour that still passes 4.5:1).
- **Checks** are calculated for text on background, secondary text, the brand
  colour used as text, and text on brand-colour buttons. When the brand colour
  is too light for small text, the brief suggests an accessible variant of the
  same hue. It is clearly marked as a change that needs client approval, with
  the alternative of setting small text in the text colour.

## The AI concept prompt

The prompt describes the style, the client's palette (hex values), composition,
imagery and graphic elements, and always includes:

- "Exploratory visual concept, not final artwork"
- "Do not render any text, letters, numbers, logos, brand marks or watermarks":
  typography and the real logo are added later in layout software
- `{SUBJECT}` and `{RATIO}` placeholders, plus the aspect ratios of the selected deliverables
- a negative prompt built from the style's *avoid* and *don't* lists

Use it with any image tool to explore directions. Results are references for
internal review: a designer rebuilds the chosen direction with the client's real
assets. Check the image tool's licence terms, and the client's position on
AI-generated imagery, before showing results to a client
(see [Imagery](../00-foundations/imagery/README.md)).

## Input file format (command line)

```json
{
  "styleId": "modern-heritage",
  "projectName": "Ramadan gifting campaign 2027",
  "clientName": "Client name",
  "projectType": "campaign",
  "industry": "Food & beverage",
  "industryOther": "",
  "audience": "Who the work is for, at least 15 characters",
  "objective": "",
  "tone": "",
  "constraints": "",
  "identityMode": "preserve",
  "colors": [{ "name": "Date Brown", "hex": "#6B3A1F", "role": "Primary" }],
  "fonts": { "headline": "", "body": "", "arabic": "" },
  "assets": { "logo": true, "guidelines": true, "fonts": false, "photography": false, "voice": false },
  "language": "bilingual",
  "deliverables": ["social-feed", "ooh-48"]
}
```

| Key | Allowed values |
| --- | --- |
| `styleId` | `quiet-luxury`, `swiss-precision`, `neo-brutalism`, `organic-earth`, `future-tech`, `bold-editorial`, `playful-pop`, `clinical-clarity`, `modern-heritage`, `kinetic-sport` |
| `industry` | Any sector in `AVDL_VOCAB.sectors` (see the Industry filter), or `Other` with `industryOther` |
| `identityMode` | `preserve`, `evolve`, `new` |
| `colors[].role` | `Primary`, `Secondary`, `Accent`, `Background`, `Text`, `Neutral` (up to 6 colours) |
| `language` | `en`, `ar`, `bilingual` |

`projectType`:

| ID | Project type |
| --- | --- |
| `identity-new` | Brand identity (new) |
| `identity-refresh` | Brand refresh |
| `campaign` | Advertising campaign |
| `social` | Social media content |
| `web` | Website or landing page |
| `presentation` | Presentation or pitch |
| `packaging` | Packaging |
| `event` | Event |

`deliverables`:

| ID | Group | Deliverable | Size |
| --- | --- | --- | --- |
| `social-feed` | Social media | Feed post, square | 1080 × 1080 px |
| `social-portrait` | Social media | Feed post or ad, portrait | 1080 × 1350 px |
| `social-story` | Social media | Story / Reel | 1080 × 1920 px |
| `social-carousel` | Social media | Carousel | 1080 × 1350 px per slide, 5–8 slides |
| `ooh-48` | Advertising | Billboard, 48-sheet | 6096 × 3048 mm |
| `ooh-6` | Advertising | Poster, 6-sheet | 1200 × 1800 mm |
| `display-mpu` | Advertising | Display MPU | 300 × 250 px |
| `display-leader` | Advertising | Display leaderboard | 728 × 90 px |
| `display-mobile` | Advertising | Display mobile banner | 320 × 50 px |
| `print-press` | Advertising | Press advertisement | Per publication spec |
| `web-landing` | Website | Campaign landing page | Desktop 1440 px and phone 390 px |
| `web-home` | Website | Website homepage | Desktop 1440 px and phone 390 px |
| `web-ui` | Website | UI component set | Buttons, inputs, cards, navigation with all states |
| `deck-pitch` | Presentation | Pitch deck | 1920 × 1080 px |
| `deck-report` | Presentation | Client report | 1920 × 1080 px |
| `brand-stationery` | Brand applications | Stationery set | Business card 85 × 55 mm, A4 letterhead, email signature |
| `brand-packaging` | Brand applications | Packaging | Manufacturer's dieline |
| `brand-signage` | Brand applications | Signage and wayfinding | Per site survey |
| `brand-guidelines` | Brand applications | Brand guidelines document | A4 landscape PDF + web version |

Invalid input is reported field by field and the command exits with code 1.

## Example

[`examples/tamr-grove-ramadan.json`](./examples/tamr-grove-ramadan.json) is a
**fictional** client (Tamr Grove, a date-gifting brand) running a bilingual
Ramadan campaign in the Modern Heritage style, preserving its identity. The
generated brief is [`examples/tamr-grove-ramadan.md`](./examples/tamr-grove-ramadan.md).
It shows the colour planning at work: the client's light Sand background
gets the client's own Date Brown as text (7.88:1) instead of the style's
dark-theme neutrals. The missing typefaces, photography and tone of voice
appear as open questions.

Regenerate it after changing the rules:

```bash
node agency-visual-design-library/scripts/brief.mjs agency-visual-design-library/08-project-workflow/examples/tamr-grove-ramadan.json --date 2026-10-12 --out agency-visual-design-library/08-project-workflow/examples/tamr-grove-ramadan.md
```

## Tests

```bash
node agency-visual-design-library/scripts/test-brief.mjs   # 27 unit tests for the rules engine
node agency-visual-design-library/scripts/qa-browser.mjs   # includes the full workflow in a browser
```

The unit tests cover validation, identity preservation in every mode, colour
selection and contrast advice, typefaces, logo handling, Arabic rules, fit
warnings, the "not artwork" statements, the prompt's no-text rule, every
style × deliverable × mode × language combination (no broken Markdown), that
sample brand names never leak into a client brief, and that the committed
example is up to date. The browser QA fills in the form like a designer: empty
submit, error links, adding and removing colours, generating the example, tabs,
copy, download, draft restore, the style-page entry point, phone layout and
contrast.

## Limitations

- The text is assembled from rules, not written for the client: treat it as a
  structured first draft and edit the creative direction in your own words.
- No AI service is connected. The AI prompt is for you to use in a tool of
  your choice.
- Drafts are stored only in the browser you used.
- The shared preview link cannot start file downloads, so it hides
  **Download .md**. Use **Copy Markdown** there, or open `index.html` locally.
