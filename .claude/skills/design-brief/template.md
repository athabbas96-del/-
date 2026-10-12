# Creative brief template

Use this structure. Omit a section only if it truly does not apply, and say so.

```markdown
# Creative brief: <project> for <client>

_<date> · Status: provisional draft (not artwork) · Language: <EN / AR / bilingual>_

## Questions for the client (answer to finalise)
1. …

## 1. Project summary
| Field | Value | Tag |
| --- | --- | --- |
| Client | … | [Known] |
| Project | … | |
| Market and languages | … | |
| Deadline / budget | … | [Open question] if not given |

## 2. Objectives
- Business objective: …
- Communication objective: …

## 3. Audience
Who they are, what they need, where they meet the work.

## 4. Message
Single-minded message: "…" (one sentence). Supporting points: …

## 5. Deliverables and formats
| Deliverable | Size / ratio | Safe area / production notes | Language |
| --- | --- | --- | --- |

## 6. Constraints and mandatory items
Brand guidelines, legal lines, logo rules, timing, budget.

## 7. Success criteria
Measurable outcomes and how they will be checked.

## 8. Creative direction

### Direction A (recommended): <exact style name from visual-styles/README.md>
- **Source:** `agency-visual-design-library/visual-styles/NN-<style-id>.md`
- **Status:** Following the documented style | Intentional variation (see below)
- **Why it fits:** evidence from the style file (Sectors / Mood / Strongest
  applications / § Target industries), tied to this brief. Say so if the
  client's sector or deliverable is not listed.
- **Documented rules applied** [Library]:
  - Colour: … (`§ Color palette`, `§ Design tokens`)
  - Typography: … (`§ Typography`)
  - Layout: … (`§ Layout rules`; density from `00-foundations/spacing/README.md § 3. Density by style`)
  - Imagery: … (`§ Photography direction`)
  - Graphic elements: … (`§ Graphic elements`)
- **Variations** [Variation]: the rule departed from → what changes → why → needs approval. "None" if following.
- **Not documented** [Not documented]: each spec the project needs that the
  library does not define, where you looked, and who decides.

### Direction B (alternative): <exact style name> (optional, shorter)
Same fields; add "Choose it if …".

**Direction statement:** what the work should feel like and its single idea.

## 9. Design specification
Every rule below cites its file and section, or is tagged [Proposal] or
[Not documented].

### Typography
### Colour
| Role | Colour | Source (client or file § section) | Tag |
### Composition and layout
### Photography and imagery
### Graphic elements

## 10. AI concept prompt (optional, for exploration only)
Prompt and negative prompt in code blocks; aspect ratios for the deliverables.

## 11. Missing specifications ([Not documented])
| Specification | Where looked | Decision needed from |
| --- | --- | --- |

## 12. Assumptions
- A1 … (if wrong: …)

## 13. Open questions
- …

## 14. Design review checklist
- [ ] …
```
