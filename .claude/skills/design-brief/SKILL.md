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
  - `[Library]` taken from a library file; cite the path and section
  - `[Variation]` a deliberate departure from a documented style rule
  - `[Not documented]` a specification the library does not define
- **Preserve the client's brand.** Their guidelines, logo, approved colours,
  typefaces and required assets override any library style. Never redesign,
  redraw or recolour a logo; if none is supplied, specify a placeholder
  labelled CLIENT LOGO.
- **The library is the source of truth for styles.** Recommend only styles
  listed in `visual-styles/README.md`, spelled exactly as there. Never invent,
  rename, abbreviate or merge styles, and never rely on memory of a style:
  read its file. If no style fits, say so and label the direction "not a
  library style".
- **Cite, don't guess.** Every style rule you use must come from a file you
  read in this session. Cite the path and section, for example
  `visual-styles/09-modern-heritage.md § Color palette`. If the library does
  not define something the project needs (print colour values, a packaging
  dieline, Arabic weights, a dark version and so on), write
  `[Not documented]`. Say where you looked and who needs to decide it.
- **Follow or vary, explicitly.** By default, follow the documented style.
  Using the client's colours, logo and fonts in the style's roles is
  *following* it (see `08-project-workflow/README.md` § Identity handling).
  Anything else that departs from a documented rule is a `[Variation]`: name
  the rule, what changes, why the brief needs it, and that it needs approval.
  Don't mix styles unless the user asks; a borrowed element is a
  `[Variation]` citing both files.
- **Be honest about status.** The brief is a direction, not artwork. Never
  describe placeholders, concepts or AI outputs as final or production-ready.
- **No unverified numbers.** This skill cannot run code, so do not state
  contrast ratios or other calculated figures, not even approximate ones. List
  the colour pairs that must be checked, with their targets, for the designer
  to verify with a contrast tool.

## Sources to consult

All library paths are under `agency-visual-design-library/` from the
repository root. [sources.md](sources.md) maps every specification to the file
and section that defines it. Read only what the project needs. Always read:

| Need | Read |
| --- | --- |
| The ten styles and their exact names | `visual-styles/README.md` |
| Each style you recommend, in full | `visual-styles/NN-<style-id>.md` |
| Identity handling (preserve / evolve / new) | `08-project-workflow/README.md` |
| Arabic or bilingual work | `00-foundations/arabic-and-rtl/README.md` |

To shortlist, read the `Mood`, `Sectors` and `Strongest applications` lines at
the top of each candidate style file before choosing.

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
4. **Recommend a creative direction.** Choose one primary style and at most
   one alternative. For each, write the direction block in
   [template.md](template.md):
   - the exact style name and its file path;
   - status: following the style, or an intentional variation;
   - why it fits, with evidence from the style file (its sectors, mood,
     strongest applications or target industries) tied to this brief. If the
     client's sector or deliverable is not listed for the style, say so and
     justify it;
   - the documented rules applied, each with `§ section`;
   - variations, if any;
   - missing specifications.
   Then write a direction statement: what the work should feel like and its
   single idea.
5. **Specify the design** from the primary style's documented rules, applied
   to the client's identity. Use [sources.md](sources.md) to find each rule.
   - **Typography:** client typefaces first; the style's scale, weights,
     case and type rules; its Arabic pairing when needed.
   - **Colour:** client colours in the style's roles and proportions (§ Color
     palette, § Design tokens). Any style colour you add is `[Proposal]`.
     List the text/background pairs to verify against 4.5:1 (text) and 3:1
     (large text and UI).
   - **Composition:** the style's grid, spacing and layout rules, plus the
     logo position.
   - **Photography:** the style's direction and avoid list, plus a shot list
     rewritten for this client.
   - **Graphic elements:** the style's documented elements, drawn in the
     client's colours.
   - **Format requirements:** size, ratio, safe area and production notes per
     deliverable, from the discipline guides.
   - **Not documented:** collect every `[Not documented]` item in one list
     with the decision each needs.
6. **AI image prompt** (when imagery or concept exploration would help). Give a
   copy-ready prompt for the user to run in a tool of their choice:
   - Start with "Exploratory visual concept, not final artwork".
   - Include the style, the palette as hex values (the client's colours, plus
     only the proposed colours this brief recommends, named as proposals),
     composition,
     lighting, `{SUBJECT}` and `{RATIO}` placeholders, and the instruction
     "Do not render any text, letters, logos or watermarks".
   - Add a negative prompt built from the style's § Photography direction
     avoid list and § Do / Don't.
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
