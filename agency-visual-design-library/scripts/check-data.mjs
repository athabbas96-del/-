#!/usr/bin/env node
// Validates library/styles-data.js and the Markdown docs:
//   - every style has every required field
//   - sectors, moods and applications use the controlled vocabulary
//   - palette shares add up to 100 and hex values are valid
//   - text token pairs pass WCAG AA contrast (4.5:1)
//   - relative links in all Markdown files point at files that exist
// Run from the repository root: node agency-visual-design-library/scripts/check-data.mjs
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
vm.runInNewContext(readFileSync(join(root, "library/styles-data.js"), "utf8"), ctx);
const { AVDL_STYLES: styles, AVDL_VOCAB: vocab } = ctx.window;
const problems = [];
const bad = (id, msg) => problems.push(`${id}: ${msg}`);

const lum = (hex) => {
  const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
export const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const HEX = /^#[0-9A-F]{6}$/;

const required = {
  top: ["id", "name", "tagline", "sampleBrand", "sampleBrandType", "domain", "concept", "keywords", "industries", "sectors", "moods", "applications",
    "palette", "paletteRule", "typography", "layout", "photography", "graphics", "motif", "ui", "social", "website", "advertising", "presentation", "brand", "dos", "donts", "tokens"],
  tokens: ["bg", "surface", "ink", "muted", "accent", "accentText", "accent2", "onAccent", "line", "fontDisplay", "fontBody", "displayWeight", "displayCase", "displayTracking", "radius", "btnRadius", "borderWidth", "shadow"],
};

const seen = new Set();
for (const s of styles) {
  const id = s.id || "(no id)";
  if (seen.has(id)) bad(id, "duplicate id");
  seen.add(id);
  required.top.forEach((k) => (s[k] === undefined || s[k] === "" ? bad(id, `missing ${k}`) : 0));
  required.tokens.forEach((k) => (!s.tokens || s.tokens[k] === undefined ? bad(id, `missing tokens.${k}`) : 0));
  for (const [field, list] of [["sectors", vocab.sectors], ["moods", vocab.moods], ["applications", vocab.applications]]) {
    (s[field] || []).forEach((v) => (!list.includes(v) ? bad(id, `${field} value "${v}" is not in AVDL_VOCAB`) : 0));
    if (!(s[field] || []).length) bad(id, `no ${field}`);
  }
  const share = s.palette.reduce((a, c) => a + c.share, 0);
  if (share !== 100) bad(id, `palette shares add up to ${share}, not 100`);
  s.palette.forEach((c) => (!HEX.test(c.hex) ? bad(id, `palette ${c.name} has invalid hex ${c.hex}`) : 0));
  if (!s.domain.endsWith(".example")) bad(id, "domain must use the reserved .example TLD");
  if (!s.brand.email.endsWith("@" + s.domain)) bad(id, `brand email ${s.brand.email} does not match ${s.domain}`);
  for (const k of ["dos", "donts", "graphics"]) if (s[k].length < 3) bad(id, `${k} needs at least 3 entries`);
  for (const k of ["advertising", "presentation", "brand"]) if (!s[k].notes || s[k].notes.length < 3) bad(id, `${k}.notes needs at least 3 entries`);

  const t = s.tokens;
  const pairs = [["ink", "bg"], ["ink", "surface"], ["muted", "bg"], ["muted", "surface"], ["accentText", "bg"], ["accentText", "surface"], ["onAccent", "accent"]];
  for (const [fg, bg] of pairs) {
    if (!HEX.test(t[fg]) || !HEX.test(t[bg])) continue;
    const r = contrast(t[fg], t[bg]);
    if (r < 4.5) bad(id, `contrast ${fg} on ${bg} is ${r.toFixed(2)}:1, needs 4.5:1`);
  }
}

// Markdown link check.
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (f === "node_modules" || f.startsWith(".")) return [];
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
  });
}
let links = 0;
for (const file of walk(root)) {
  const text = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    links++;
    const target = resolve(dirname(file), decodeURI(href.split("#")[0]));
    if (!existsSync(target)) problems.push(`${file.slice(root.length + 1)}: broken link ${href}`);
  }
}

if (problems.length) {
  console.log(`${problems.length} problem(s):`);
  problems.forEach((p) => console.log(" - " + p));
  process.exit(1);
}
console.log(`OK: ${styles.length} styles valid, ${links} Markdown links resolve.`);
