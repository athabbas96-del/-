#!/usr/bin/env node
// Tests for the project brief generator (library/brief.js).
// Run from the repository root: node agency-visual-design-library/scripts/test-brief.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { loadLibrary } from "./brief.mjs";

const { root, STYLES, BRIEF } = loadLibrary();
const DATE = "2026-10-12";
let passed = 0;
const failed = [];
function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    failed.push(`${name}\n    ${e.message.split("\n")[0]}`);
  }
}

const base = () => ({
  styleId: "clinical-clarity",
  projectName: "Clinic launch",
  clientName: "Test Client",
  projectType: "web",
  industry: "Health & medical",
  industryOther: "",
  audience: "Parents booking appointments for young children",
  objective: "",
  tone: "",
  constraints: "",
  identityMode: "preserve",
  colors: [{ name: "Brand Blue", hex: "#1F4BFF", role: "Primary" }],
  fonts: { headline: "", body: "", arabic: "" },
  assets: { logo: true, guidelines: true, fonts: true, photography: true, voice: true },
  language: "en",
  deliverables: ["web-landing"],
});
const gen = (patch) => BRIEF.generate(Object.assign(base(), patch), { date: DATE });
const row = (r, role) => r.sections.find((s) => s.id === "colour").blocks.find((b) => b.type === "swatches").rows.find((x) => x[0] === role);

/* validation */
test("empty input lists every required field", () => {
  const fields = BRIEF.validate({}).map((e) => e.field);
  for (const f of ["styleId", "projectName", "clientName", "projectType", "industry", "audience", "identityMode", "deliverables", "language"]) assert.ok(fields.includes(f), `missing error for ${f}`);
});
test("invalid hex is rejected", () => {
  const r = gen({ colors: [{ name: "x", hex: "#12", role: "Primary" }] });
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => e.field === "color-0"));
});
test("hex without # is accepted and normalised", () => {
  const r = gen({ colors: [{ name: "x", hex: "1f4bff", role: "Primary" }] });
  assert.equal(r.ok, true);
  assert.equal(row(r, "Accent")[1], "#1F4BFF");
});
test("'Other' industry requires a description", () => {
  assert.ok(gen({ industry: "Other" }).errors.some((e) => e.field === "industryOther"));
  assert.equal(gen({ industry: "Other", industryOther: "Veterinary" }).ok, true);
});
test("more than six colours is rejected", () => {
  const colors = Array.from({ length: 7 }, (_, i) => ({ name: "c" + i, hex: "#00000" + i, role: "Neutral" }));
  assert.ok(gen({ colors }).errors.some((e) => e.field === "colors"));
});

/* identity preservation */
test("preserve: the client's primary colour is the accent, never the style's", () => {
  const r = gen({});
  assert.equal(row(r, "Accent")[1], "#1F4BFF");
  assert.match(row(r, "Accent")[3], /^Client brand colour/);
  assert.notEqual(row(r, "Accent")[1], STYLES.find((s) => s.id === "clinical-clarity").tokens.accent);
});
test("preserve: every supplied client colour appears in the Markdown", () => {
  const colors = [
    { name: "A", hex: "#123456", role: "Primary" }, { name: "B", hex: "#ABCDEF", role: "Secondary" },
    { name: "C", hex: "#FAFAFA", role: "Background" }, { name: "D", hex: "#222222", role: "Text" },
    { name: "E", hex: "#999999", role: "Neutral" }, { name: "F", hex: "#FF8800", role: "Accent" },
  ];
  const r = gen({ colors });
  for (const c of colors) assert.ok(r.markdown.includes(c.hex), `${c.hex} missing`);
});
test("preserve: no colours supplied means no invented brand colour", () => {
  const r = gen({ colors: [] });
  assert.equal(row(r, "Accent")[1], null);
  assert.ok(r.openQuestions.some((q) => /primary brand colour was not provided/.test(q)));
});
test("preserve: style secondary colour is not introduced", () => {
  assert.equal(row(gen({}), "Secondary")[1], null);
});
test("new identity: style palette is proposed and labelled as a proposal", () => {
  const r = gen({ identityMode: "new", colors: [] });
  const s = STYLES.find((x) => x.id === "clinical-clarity");
  assert.equal(row(r, "Accent")[1], s.tokens.accent);
  assert.match(row(r, "Accent")[3], /proposal/);
});
test("text colour is chosen for contrast against a client background", () => {
  const r = gen({ styleId: "modern-heritage", colors: [{ name: "Brown", hex: "#6B3A1F", role: "Primary" }, { name: "Sand", hex: "#F3EBDD", role: "Background" }] });
  const ink = row(r, "Text")[1];
  assert.ok(BRIEF.contrast(ink, "#F3EBDD") >= 4.5, `text ${ink} fails on background`);
  const muted = row(r, "Muted text")[1];
  assert.ok(BRIEF.contrast(muted, "#F3EBDD") >= 4.5, `muted ${muted} fails on background`);
});

/* contrast advice */
test("a light brand colour is flagged and given an accessible variant", () => {
  const r = gen({ colors: [{ name: "Sun", hex: "#FFD23F", role: "Primary" }, { name: "White", hex: "#FFFFFF", role: "Background" }] });
  const check = r.sections.find((s) => s.id === "colour").blocks.find((b) => b.type === "table").rows.find((x) => x[0].startsWith("Brand colour as text"));
  assert.match(check[3], /Fills and shapes only/);
  const note = r.markdown.match(/accessible variant of the same hue is (#[0-9A-F]{6})/);
  assert.ok(note, "no variant suggested");
  assert.ok(BRIEF.contrast(note[1], "#FFFFFF") >= 4.5);
  assert.match(r.markdown, /only if the client approves/);
});

/* typography and assets */
test("client fonts are kept and style fonts are not swapped in", () => {
  const r = gen({ fonts: { headline: "Client Serif", body: "Client Sans", arabic: "" } });
  const rows = r.sections.find((s) => s.id === "type").blocks[0].rows;
  assert.equal(JSON.stringify(rows.map((x) => x[1])), JSON.stringify(["Client Serif", "Client Sans"]));
  assert.match(r.markdown, /Do not swap them in/);
});
test("missing client fonts in preserve mode become an open question", () => {
  const r = gen({ fonts: {} });
  assert.ok(r.openQuestions.some((q) => /typefaces were not provided/.test(q)));
});
test("no logo: placeholder instruction, never a drawn logo", () => {
  const r = gen({ assets: {} });
  assert.match(r.markdown, /box labelled CLIENT LOGO/);
  assert.match(r.markdown, /Do not draw, imitate or generate a logo/);
});
test("logo supplied: use it unchanged", () => {
  assert.match(gen({}).markdown, /Use the supplied logo files exactly/);
});

/* language */
test("bilingual adds Arabic typeface and RTL rules", () => {
  const r = gen({ language: "bilingual" });
  assert.ok(r.sections.find((s) => s.id === "type").blocks[0].rows.some((x) => x[0] === "Arabic"));
  assert.match(r.markdown, /Arabic text: no letter-spacing/);
});
test("English-only has no Arabic rows", () => {
  const r = gen({});
  assert.ok(!r.sections.find((s) => s.id === "type").blocks[0].rows.some((x) => x[0] === "Arabic"));
});

/* fit check */
test("an unlisted sector produces a fit warning with alternatives", () => {
  const r = gen({ styleId: "kinetic-sport" });
  assert.ok(r.warnings.some((w) => /not one of Kinetic Sport's listed sectors/.test(w) && /Clinical Clarity/.test(w)));
});
test("preserve + new-identity project type warns about the conflict", () => {
  assert.ok(gen({ projectType: "identity-new" }).warnings.some((w) => /new identity but identity handling is set to preserve/.test(w)));
});

/* honesty */
test("output states it is not artwork or production-ready", () => {
  const md = gen({}).markdown;
  assert.match(md, /This is a brief, not artwork: no images were generated/);
  assert.match(md, /nothing in it is final or production-ready/);
});
test("prompt is exploratory, forbids text and logos, has placeholders", () => {
  const p = gen({}).prompt;
  assert.match(p.master, /^Exploratory visual concept, not final artwork/);
  assert.match(p.master, /Do not render any text, letters, numbers, logos/);
  assert.match(p.master, /\{SUBJECT/);
  assert.match(p.master, /\{RATIO\}/);
  assert.match(p.negative, /logos/);
});
test("prompt palette lists each colour once", () => {
  const r = gen({ styleId: "modern-heritage", colors: [{ name: "Brown", hex: "#6B3A1F", role: "Primary" }, { name: "Sand", hex: "#F3EBDD", role: "Background" }] });
  const line = r.prompt.master.split("\n").find((l) => l.startsWith("Colour:"));
  assert.equal(line.split("#6B3A1F").length - 1, 1);
});

/* every style, every deliverable */
test("all 10 styles × all deliverables × 3 modes × 3 languages generate clean Markdown", () => {
  const all = BRIEF.DELIVERABLES.map((d) => d.id);
  for (const s of STYLES) for (const mode of ["preserve", "evolve", "new"]) for (const language of ["en", "ar", "bilingual"]) {
    const r = gen({ styleId: s.id, identityMode: mode, language, deliverables: all });
    assert.equal(r.ok, true, `${s.id}/${mode}/${language}`);
    assert.doesNotMatch(r.markdown, /undefined|NaN|\[object Object\]/, `${s.id}/${mode}/${language}`);
    // Every Markdown table row has the same number of cells as its header.
    let cols = null;
    for (const line of r.markdown.split("\n")) {
      if (!line.startsWith("|")) { cols = null; continue; }
      const n = line.replace(/\\\|/g, "").split("|").length;
      if (cols === null) cols = n;
      else assert.equal(n, cols, `${s.id}: ragged table row: ${line.slice(0, 60)}`);
    }
  }
});
test("sample brand names from the library never leak into a client brief", () => {
  const names = STYLES.map((s) => s.sampleBrand);
  for (const s of STYLES) {
    const md = gen({ styleId: s.id, deliverables: BRIEF.DELIVERABLES.map((d) => d.id) }).markdown;
    for (const n of names) assert.ok(!md.includes(n), `${s.id} brief mentions sample brand ${n}`);
  }
});

/* committed example is current */
test("the committed example matches the generator", () => {
  const dir = join(root, "08-project-workflow/examples");
  const input = JSON.parse(readFileSync(join(dir, "tamr-grove-ramadan.json"), "utf8"));
  const md = readFileSync(join(dir, "tamr-grove-ramadan.md"), "utf8");
  assert.equal(BRIEF.generate(input, { date: DATE }).markdown, md, "regenerate with scripts/brief.mjs --date " + DATE);
});

test("the page's 'Load the fictional example' matches the committed example input", () => {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of ["library/styles-data.js", "library/brief.js", "library/brief-ui.js"]) vm.runInContext(readFileSync(join(root, f), "utf8"), ctx);
  const json = JSON.parse(readFileSync(join(root, "08-project-workflow/examples/tamr-grove-ramadan.json"), "utf8"));
  delete json._note;
  assert.equal(JSON.stringify(ctx.window.AVDL_BRIEF_UI.EXAMPLE), JSON.stringify(json));
});

console.log(`${passed} passed, ${failed.length} failed`);
if (failed.length) {
  failed.forEach((f) => console.log(" ✗ " + f));
  process.exit(1);
}
