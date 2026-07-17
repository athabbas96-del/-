# ATH Portfolio — Design System

الهوية: **Minimal Luxury · Modern · Creative Agency · Future**

كل القيم أدناه معرّفة كـ design tokens قابلة لإعادة الاستخدام، وتتبدّل تلقائياً بين
الوضع الفاتح والداكن (`prefers-color-scheme`). لا تكتب قيم لون/مسافة/ظل يدوياً
داخل أي مكوّن — استخدم الـ tokens أو المكوّنات الجاهزة أدناه فقط.

## الألوان — `src/app/globals.css`

| Token                           | Light      | Dark       | الاستخدام                   |
| ------------------------------- | ---------- | ---------- | --------------------------- |
| `--color-white`                 | `#FFFFFF`  | —          | ثابت                        |
| `--color-black`                 | `#0A0A0A`  | —          | ثابت                        |
| `--color-navy`                  | `#0B1220`  | —          | خلفية الوضع الداكن          |
| `--color-gray-light`            | `#F4F5F7`  | —          | أسطح فاتحة                  |
| `--color-accent-blue`           | `#2F6BFF`  | `#4C82FF`  | العنصر البارز (Accent Blue) |
| `--color-background` (semantic) | white      | navy       | خلفية الصفحة                |
| `--color-foreground` (semantic) | black      | near-white | النص الأساسي                |
| `--color-surface` (semantic)    | gray-light | navy-light | خلفيات البطاقات             |
| `--color-muted` (semantic)      | gray-600   | slate-400  | نص ثانوي                    |
| `--color-border` (semantic)     | black/10%  | white/9%   | حدود                        |

استخدم utilities مباشرة: `bg-background`, `text-foreground`, `bg-surface`,
`text-muted`, `border-border`, `bg-accent`, `text-accent-blue`.

## Typography

| Token         | الخط       | الاستخدام                       |
| ------------- | ---------- | ------------------------------- |
| `font-sans`   | Geist Sans | لاتيني (إنجليزي) — عناوين ونصوص |
| `font-arabic` | Cairo      | عربي — عناوين ونصوص             |
| `font-mono`   | Geist Mono | eyebrow labels / أرقام / أكواد  |

- `<html dir="ltr">` افتراضياً؛ أي قسم/صفحة عربية تضبط `dir="rtl"` محلياً —
  `[dir="rtl"] body` تبدّل أولوية الخط إلى Cairo تلقائياً.
- سلّم العناوين السينمائي (hero): `text-display-sm` (2.5–3.5rem) ·
  `text-display-md` (3–5rem) · `text-display-lg` (4–7.5rem), كلها `clamp()`
  متجاوبة. باقي السلّم (`text-sm` → `text-7xl`) هو سلّم Tailwind الافتراضي.

## المسافات وإيقاع الصفحة (Spacing)

| Token                 | القيمة                      | يُستخدم في                   |
| --------------------- | --------------------------- | ---------------------------- |
| `--section-padding-y` | `clamp(4rem, 9vw, 8rem)`    | `<Section>` (padding عمودي)  |
| `--container-padding` | `clamp(1.25rem, 4vw, 3rem)` | `<Container>` (padding أفقي) |
| `--container-max`     | `1440px`                    | أقصى عرض للمحتوى             |
| `--grid-gutter`       | `clamp(1rem, 2vw, 1.5rem)`  | الفراغ بين أعمدة `<Grid>`    |

## Border Radius

`rounded-xs` 6px · `rounded-sm` 10px · `rounded-md` 14px · `rounded-lg` 20px ·
`rounded-xl` 28px · `rounded-2xl` 36px.

## Shadow System

`shadow-xs → shadow-xl`: ظلال ناعمة منخفضة التباين (0.04–0.12 opacity) لإحساس
فاخر minimal لا يظهر ثقيلاً. `shadow-glow`: توهّج بلون الـ accent
(`rgba(47,107,255,.35)`), يُستخدم فقط لعناصر بارزة (CTA رئيسي، hero element)
وليس كظل عام.

## Glass Effect

class جاهزة: `.glass` (background شفاف + `backdrop-filter: blur(20px)` + حد
شفاف رفيع). قيمها تتبدّل تلقائياً مع الوضع الداكن. متاحة أيضاً كـ variant:
`<Card variant="glass">`.

## Grid System

`<Grid cols={1|2|3|4|6|12}>` — presets متجاوبة جاهزة (مثال: `cols={3}` =
عمود واحد على الموبايل، عمودين على tablet، 3 أعمدة على desktop)، بفراغ موحّد
عبر `--grid-gutter`.

## المكوّنات القابلة لإعادة الاستخدام — `src/components/ui`

| مكوّن       | الوصف                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Container` | غلاف بعرض أقصى `1440px` وpadding أفقي متجاوب                                                                                                                                 |
| `Section`   | غلاف بإيقاع عمودي موحّد (`--section-padding-y`) + `id` اختياري للـ anchor                                                                                                    |
| `Grid`      | شبكة متجاوبة بعدد أعمدة محدد مسبقاً                                                                                                                                          |
| `Button`    | `variant`: primary / secondary / outline / ghost / accent — `size`: sm / md / lg. مبني على `class-variance-authority` + micro-interaction بـ Framer Motion (hover/tap scale) |
| `Card`      | `variant`: surface / outline / elevated / glass                                                                                                                              |
| `Badge`     | `variant`: neutral / outline / accent — للوسوم الصغيرة (تقنيات، تصنيفات)                                                                                                     |
| `Icon`      | غلاف حول `lucide-react` يفرض stroke width `1.5` وثلاثة أحجام فقط: `sm 16 / md 20 / lg 24`                                                                                    |

## Icon Style

مكتبة: **lucide-react** (outline فقط، بدون أيقونات مملوءة). التزم دائماً
بالمرور عبر `<Icon icon={...} size="sm|md|lg" />` بدل استخدام المكتبة مباشرة،
حتى يبقى الـ stroke width والمقاسات موحّدة في كل الموقع.

## Motion Guidelines — `src/lib/motion.ts`

- **Easing**: `EASE_OUT_EXPO` `[0.16,1,0.3,1]` للدخول (سريع البداية، هادئ
  النهاية — إحساس premium لا bounce). `EASE_IN_OUT` للخروج/الانتقالات.
- **Duration**: `fast 0.2s` (hover/tap) · `base 0.5s` (ظهور عناصر عند
  scroll) · `slow 0.9s` (hero / انتقال صفحات).
- **Distance**: إزاحات صغيرة فقط (16–32px)، بدون spring في الدخول (الـ
  spring محجوز للـ micro-interactions مثل ضغط الزر).
- **Presets جاهزة**: `fadeIn`, `fadeInUp`, `fadeInDown`, `slideInLeft`,
  `slideInRight`, `scaleIn`, `staggerChildren()`, `pageTransition`.
- **`<Reveal>`** (`src/components/animations/Reveal.tsx`): الغلاف الموحّد
  لأي ظهور عند scroll — لا تكتب `whileInView` يدوياً في الصفحات، استخدم هذا
  المكوّن دائماً.
- **تقسيم الأدوار**: Framer Motion لانتقالات/تفاعلات مستوى المكوّن. GSAP +
  ScrollTrigger (`src/lib/gsap.ts`) محجوزة للتسلسلات المرتبطة بالـ scroll
  (parallax, pinning, split-text) — لا تُستخدم الاثنتان معاً على نفس
  العنصر. Lenis (`src/hooks/useLenis.ts`) يدير الـ smooth scroll عالمياً
  ومربوط مع `ScrollTrigger.update`.
- Three.js (`@react-three/fiber` + `@react-three/drei`) يُضاف فقط عند
  الحاجة الفعلية لمشهد ثلاثي الأبعاد — لا يُحمَّل بشكل افتراضي.

## خريطة الملفات

```
src/app/globals.css                     tokens: colors, radius, shadow, spacing, .glass
src/lib/fonts.ts                        Geist Sans / Cairo / Geist Mono
src/lib/motion.ts                       durations, easings, variants
src/lib/gsap.ts                         GSAP + ScrollTrigger registration
src/hooks/useLenis.ts                   Lenis smooth scroll
src/components/ui/                      Container, Section, Grid, Button, Card, Badge, Icon
src/components/animations/Reveal.tsx    scroll-reveal wrapper
```
