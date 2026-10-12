# UI components

The rendered *UI components* board on each style page shows buttons, an input,
tags and a card in that style. This guide defines what every component set
must include.

## 1. Buttons

| Type | Use | Rule |
| --- | --- | --- |
| Primary | The main action on a screen | One per view; filled with the accent; text in `onAccent` |
| Secondary | Alternative actions | Outline or tonal |
| Tertiary / link | Low-emphasis actions | Text only, underlined on hover |
| Destructive | Delete, cancel subscription | Separate colour; ask to confirm |

States to design for every button: default, hover, focus (visible ring, 3:1
contrast), pressed, disabled, loading. Labels are verbs that say what happens:
"Book a private viewing", "Start free trial", not "Submit".

## 2. Inputs and forms

- Visible label above every field; placeholder only for examples.
- Helper text below for format hints; error text that says how to fix it.
- Errors marked with text and an icon, not colour alone.
- Group related fields; ask only for what you need.
- RTL: labels and text right-aligned, but email and URL fields stay LTR
  (`dir="ltr"`).

## 3. Cards

Image, meta line, title, one key value (price, date, availability), one action.
Make the whole card clickable through the title link. Keep sibling cards the
same height and structure.

## 4. Other components every set needs

Navigation bar, tabs, accordion (FAQ), tags/chips, badges, alerts and toasts,
modal dialog, pagination, breadcrumbs, table, empty state, loading skeleton.

## 5. How each style changes components

| Style | Signature treatment |
| --- | --- |
| Quiet Luxury | Uppercase tracked labels, hairline borders, bottom-rule inputs |
| Swiss Precision | Square corners, red for the main action only, mono figures |
| Neo-Brutalism | 3px outlines, hard shadow, press moves into the shadow |
| Organic Earth | Pills, tinted inputs, blob image masks, gentle transitions |
| Future Tech | Glass panels, gradient primary button, cyan focus ring |
| Bold Editorial | Black rectangles, uppercase labels, red link underline |
| Playful Pop | Chunky bottom-shadow pills, sticker price badges, spring easing |
| Clinical Clarity | Large targets, teal primary, helper text everywhere, visible focus |
| Modern Heritage | Gold outlines, double borders, full RTL mirroring |
| Kinetic Sport | Cut corners, italic uppercase labels, fast transitions |

## Checklist

- [ ] All states designed, including focus and disabled
- [ ] One primary button per view; verb labels
- [ ] Forms with visible labels, helpful errors, RTL handling
- [ ] Full component list covered
