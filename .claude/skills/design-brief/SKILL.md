---
name: design-brief
description: Turn an initial client request into a professional creative brief (objective, audience, message, deliverables, constraints, success criteria, creative direction based on the Agency Visual Design Library's documented styles, typography, colour, composition, photography, graphic elements, format specs, an optional AI image prompt and a design review checklist). Supports Arabic, English and bilingual projects. Use when the user shares a client request, enquiry or rough project idea and wants a design or creative brief. Not for writing code or generating final images.
argument-hint: "[client request text, or a path to a file containing it]"
allowed-tools: Read, Glob, Grep
---

# Design brief

Turn the client request below into a professional creative brief that a
designer can work from. You write the brief only: no code, no files unless the
user asks to save it, and no image generation.

Client request:

$ARGUMENTS

If the request above is empty, ask the user to paste the client request (or a
file path) and stop. If it is a file path, read the file first.

## Ground rules

- **Never invent client information.** Name, colours, fonts, logo, audience
  data, budgets, dates and results come only from the request or the user.
- **Label everything** with one of these tags:
  - `[Known]` stated by the client or user
  - `[Assumption]` your working guess; say what changes if it is wrong
  - `[Open question]` needed from the client
  - `[Proposal]` your recommendation, needing approval
- **Preserve the client's brand.** Their guidelines, logo, approved colours,
  typefaces and required assets override any library style. Never redesign,
  redraw or recolour a logo; if none is supplied, specify a placeholder
  labelled CLIENT LOGO.
- **Use only documented styles.** Recommend styles from the Agency Visual
  Design Library by their exact names. Do not invent style names. If no style
  fits, say so and describe the direction as "not a library style".
- **Be honest about status.** The brief is a direction, not artwork. Never
  describe placeholders, concepts or AI outputs as final or production-ready.
- **No unverified numbers.** This skill cannot run code, so do not state
  contrast ratios or other calculated figures, not even approximate ones. List
  the colour pairs that must be checked, with their targets, for the designer
  to verify with a contrast tool.

## Sources to consult

Read these before recommending a direction (paths from the repository root):

| Need | Read |
| --- | --- |
| Which styles exist, what each is for | `agency-visual-design-library/visual-styles/README.md` |
| Rules of the chosen style | `agency-visual-design-library/visual-styles/NN-<style-id>.md` |
| Identity handling (preserve / evolve / new) | `agency-visual-design-library/08-project-workflow/README.md` |
| Arabic or bilingual work | `agency-visual-design-library/00-foundations/arabic-and-rtl/README.md` |
| Colour, type, grid, accessibility | `agency-visual-design-library/00-foundations/` |
| Format specs and safe areas | `02-social-media/`, `03-websites/`, `04-advertising/`, `05-presentations/`, `01-branding/` in the library |

If the library is missing or moved, tell the user and continue using only the
client's information, without named styles.

## Workflow

1. **Understand.** List what the request states (`[Known]`). Check it against
   what a brief needs: business objective, audience, message, deliverables
   and formats, languages and markets, brand assets (guidelines, logo,
   colours, typefaces, photography), constraints (budget, deadline, legal,
   mandatory items), success criteria and approvers.
2. **Clarify, without blocking.** Ask at most five questions, only those whose
   answers would change the direction. Put them first, numbered. Then still
   write a full provisional brief, filling gaps with labelled assumptions.
   Skip the questions if the user asked for none.
3. **Define the core.**
   - Business objective and communication objective.
   - Audience, specific to the market.
   - One single-minded message, in one sentence.
   - Deliverables, constraints and measurable success criteria. Criteria the
     client did not give are `[Proposal]`.
4. **Recommend a creative direction.**
   - Pick one primary library style, plus at most one alternative, by matching
     the sector, mood and deliverables to the style docs.
   - In two or three sentences, explain why, citing the style's own rules.
   - Write a direction statement for this client: what the work should feel
     like and the single idea it expresses.
5. **Specify the design.** Use the chosen style's rules applied to the
   client's identity:
   - **Typography:** client typefaces first; the style's hierarchy (scale,
     weight, case); the Arabic pairing when needed.
   - **Colour:** client colours in the style's roles and proportions, with any
     style colour marked `[Proposal]`. List the text/background pairs to
     verify against 4.5:1 (text) and 3:1 (large text and UI).
   - **Composition:** grid, layout rules, logo position.
   - **Photography:** the direction, plus a shot list rewritten for this
     client, and what to avoid.
   - **Graphic elements:** supporting devices, drawn in the client's colours.
   - **Format requirements:** size, ratio, safe area and production notes per
     deliverable, from the library guides.
6. **AI image prompt** (when imagery or concept exploration would help). Give a
   copy-ready prompt for the user to run in a tool of their choice:
   - Start with "Exploratory visual concept, not final artwork".
   - Include the style, the palette as hex values (the client's colours, plus
     only the proposed colours this brief recommends, named as proposals),
     composition,
     lighting, `{SUBJECT}` and `{RATIO}` placeholders, and the instruction
     "Do not render any text, letters, logos or watermarks".
   - Add a negative prompt built from the style's avoid list.
   - Never write a prompt to create a logo or brand mark.
   - Do not generate images yourself.
7. **Review checklist.** Write a checklist tailored to this project for
   reviewing the final design: brand compliance, hierarchy, typography,
   colour and contrast, imagery rights, format specs, Arabic/RTL checks,
   copy and legal, and approvals.

## Arabic and bilingual projects

- Write the brief in the user's language. Put Arabic copy lines in Arabic,
  right to left.
- Design the Arabic layout as its own composition; never just mirror the Latin
  one. Mirror the grid, navigation and directional icons, but not logos,
  media controls or numbers.
- Never letter-space, slant, stretch or fake-bold Arabic. Allow line height
  1.6–1.8 for body, and give Arabic headlines their own hierarchy and size.
- Specify the Arabic–Latin font pairing deliberately (client fonts first,
  otherwise the style's pairing as `[Proposal]`).
- Specify the digit system for the market (Western or Eastern Arabic-Indic),
  and the lead language of bilingual lockups.

## Output

Follow [template.md](template.md). Keep it scannable: headings, short
paragraphs, tables for specs. End with the open questions and the review
checklist. Offer to save the brief as a Markdown file; write it only if the
user agrees, and ask where.

## Out of scope

Writing or changing code; editing the library; generating, editing or
finishing images; making logos; inventing client facts. If the user asks for
these, say what this skill does instead.
