#!/usr/bin/env node
// Browser QA for the visual library: console errors, horizontal overflow,
// routes, search/filters, copy buttons and text contrast inside specimens.
//
// Needs Playwright with Chromium (not a dependency of this repo):
//   npm i -g playwright && npx playwright install chromium
// Run from the repository root:
//   node agency-visual-design-library/scripts/qa-browser.mjs [--shots <dir>]
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright")));
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const url = pathToFileURL(join(root, "index.html")).href;
const shotsArg = process.argv.indexOf("--shots");
const shots = shotsArg > -1 ? process.argv[shotsArg + 1] : null;
if (shots) mkdirSync(shots, { recursive: true });

const failures = [];
const fail = (msg) => failures.push(msg);
const log = (msg) => console.log(msg);

// Runs in the page: reports text whose contrast against its solid background
// is below WCAG AA (4.5:1, or 3:1 for large text). Text over images or
// gradients is skipped because it cannot be measured from CSS alone.
function contrastAudit(scope) {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const bgOf = (el) => {
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && !n.classList.contains("motif")) return "image";
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0.95) return c;
      if (c && c.a > 0.05) return "translucent";
    }
    return parse(getComputedStyle(document.body).backgroundColor);
  };
  const out = [];
  const els = document.querySelectorAll(scope + " *");
  for (const el of els) {
    if (!el.offsetParent && getComputedStyle(el).position !== "fixed") continue;
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own) continue;
    // Decorative marks and text set on a photo scrim are out of scope.
    if (el.closest("[aria-hidden='true'], .over")) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || +cs.opacity < 0.5) continue;
    if (cs.webkitTextFillColor && cs.webkitTextFillColor.includes("rgba(0, 0, 0, 0)")) continue; // gradient text
    const fg = parse(cs.color);
    if (!fg || fg.a < 0.5) continue;
    const bg = bgOf(el);
    if (typeof bg === "string" || !bg) continue;
    const size = parseFloat(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;
    const r = ratio(fg, bg);
    if (r < need) {
      const sp = el.closest("[data-style]");
      out.push(`${sp ? sp.dataset.style : "shell"} | ${el.className || el.tagName} | "${el.textContent.trim().slice(0, 40)}" | ${r.toFixed(2)} < ${need}`);
    }
  }
  return out;
}

const browser = await chromium.launch();

for (const [width, name] of [[1360, "desktop"], [390, "phone"]]) {
  for (const scheme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("requestfailed", (r) => errors.push(`request failed: ${r.url()}`));
    await page.goto(url, { waitUntil: "networkidle" });
    const tag = `${name}/${scheme}`;

    const routes = await page.evaluate(() => (window.AVDL_ROUTES ? window.AVDL_ROUTES() : ["#"]));
    for (const route of routes) {
      await page.evaluate((h) => { location.hash = h; }, route);
      await page.waitForTimeout(120);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) fail(`${tag} ${route}: horizontal overflow ${overflow}px`);
      const view = await page.evaluate(() => document.querySelector("[data-view]:not([hidden])")?.dataset.view || "none");
      if (view === "none" || view === "notfound") fail(`${tag} ${route}: no view rendered`);
      // Every in-page link must point at a known route or an element on the page.
      const bad = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')]
        .filter((a) => a.offsetParent)
        .map((a) => a.getAttribute("href"))
        .filter((h) => !(window.AVDL_IS_ROUTE && window.AVDL_IS_ROUTE(h)) && !document.getElementById(h.slice(1))));
      if (bad.length) fail(`${tag} ${route}: broken links ${[...new Set(bad)].join(", ")}`);
      if (scheme === "light") {
        const low = await page.evaluate(contrastAudit, "main");
        low.forEach((l) => fail(`${tag} ${route}: contrast ${l}`));
      }
      if (shots && scheme === "light") await page.screenshot({ path: join(shots, `${name}-${route.replace("#", "") || "home"}.png`), fullPage: true });
      if (shots && scheme === "dark" && route === routes[0]) await page.screenshot({ path: join(shots, `${name}-dark-home.png`), fullPage: false });
    }
    if (errors.length) fail(`${tag}: console/page errors: ${errors.join(" | ")}`);
    log(`checked ${tag}: ${routes.length} routes`);
    await page.close();
  }
}

// Behaviour checks on desktop.
{
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  await page.goto(url + "#", { waitUntil: "networkidle" });
  const count = () => page.evaluate(() => document.querySelectorAll("#results .ix:not([hidden])").length);
  const total = await count();
  if (await page.$("#q")) {
    await page.fill("#q", "clinic");
    const n = await count();
    if (!(n > 0 && n < total)) fail(`search "clinic" returned ${n} of ${total}`);
    else log(`search "clinic": ${n} of ${total}`);
    await page.fill("#q", "zzzz");
    if ((await count()) !== 0 || (await page.isHidden("#no-results"))) fail("empty search does not show the no-results message");
    await page.fill("#q", "");
    for (const group of ["sector", "mood", "app"]) {
      const chip = await page.$(`[data-filter="${group}"] button[data-value]`);
      if (!chip) { fail(`no ${group} filter chips`); continue; }
      await chip.click();
      const n = await count();
      const pressed = await chip.getAttribute("aria-pressed");
      if (pressed !== "true" || n === 0 || n > total) fail(`${group} filter: pressed=${pressed}, ${n} results`);
      else log(`${group} filter "${await chip.textContent()}": ${n} of ${total}`);
      await chip.click();
    }
    if ((await count()) !== total) fail("clearing filters does not restore all styles");
  } else fail("no search input #q");
  // Open a style from the catalogue and check the detail page.
  if (!(await page.$("#results .ix a"))) {
    fail("no style cards in #results");
    await page.close();
    await browser.close();
    failures.forEach((f) => console.log(" - " + f));
    process.exit(1);
  }
  await page.click("#results .ix a");
  await page.waitForTimeout(150);
  const detail = await page.evaluate(() => ({ hash: location.hash, view: document.querySelector("[data-view]:not([hidden])")?.dataset.view, title: document.title, focus: document.activeElement?.tagName }));
  if (detail.view !== "style") fail(`clicking a style card opened view ${detail.view}`);
  else log(`style page opened: ${detail.hash} · "${detail.title}" · focus on ${detail.focus}`);
  // Copy buttons write to the clipboard.
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  const copyBtn = await page.$('[data-view="style"]:not([hidden]) [data-copy]');
  if (copyBtn) {
    const want = await copyBtn.getAttribute("data-copy");
    await copyBtn.click();
    const got = await page.evaluate(() => navigator.clipboard.readText());
    if (got !== want) fail(`copy button wrote "${got.slice(0, 30)}" not "${want.slice(0, 30)}"`);
    else log(`copy button OK (${want.length} chars)`);
  } else fail("no copy button on style page");
  await page.close();
}

// Project brief workflow, end to end.
{
  const ctx = await browser.newContext({ viewport: { width: 1360, height: 900 }, acceptDownloads: true });
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url + "#brief", { waitUntil: "networkidle" });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload({ waitUntil: "networkidle" });

  // 1. Submitting an empty form lists every problem and marks fields.
  await page.click("#brief-form button[type=submit]");
  const errCount = await page.$$eval("#b-errors li", (l) => l.length);
  const invalid = await page.$$eval("#brief-form [aria-invalid=true]", (l) => l.length);
  const outHidden = await page.isHidden("#b-output");
  if (errCount < 7 || invalid < 6 || !outHidden) fail(`brief: empty submit gave ${errCount} errors, ${invalid} invalid fields, output hidden=${outHidden}`);
  else log(`brief: empty submit -> ${errCount} errors listed, ${invalid} fields marked invalid`);
  // Error links move focus to the field.
  await page.click("#b-errors [data-focus]");
  const focused = await page.evaluate(() => document.activeElement && document.activeElement.id);
  if (!focused || !focused.startsWith("b-")) fail(`brief: error link focused ${focused}`);

  // 2. "Other" industry reveals its field.
  await page.selectOption("#b-industry", "Other");
  if (await page.isHidden("#b-industryOther")) fail("brief: Other industry field did not appear");

  // 3. Colour rows can be added and removed.
  const rows = () => page.$$eval("#b-colors .crow", (l) => l.length);
  const before = await rows();
  await page.click("#b-add-color");
  const added = await rows();
  await page.click("#b-colors [data-remove]");
  const removed = await rows();
  if (added !== before + 1 || removed !== before) fail(`brief: colour rows ${before} -> ${added} -> ${removed}`);
  // The colour picker and hex field stay in sync.
  await page.fill("#b-c-0-hex", "#1F4BFF");
  const pick = await page.inputValue("#b-c-0-pick");
  if (pick !== "#1f4bff") fail(`brief: colour picker not synced (${pick})`);

  // 4. The fictional example generates a full brief.
  await page.click("#b-example");
  await page.click("#brief-form button[type=submit]");
  await page.waitForSelector("#b-output:not([hidden])");
  const out = await page.evaluate(() => ({
    md: document.getElementById("b-md").textContent,
    brief: document.getElementById("p-brief").textContent,
    sections: document.querySelectorAll("#p-brief .b-sec").length,
    errorsHidden: document.getElementById("b-errors").hidden,
  }));
  const mustHave = ["# Creative direction: Ramadan gifting campaign 2027", "#6B3A1F", "## AI concept prompt", "nothing in it is final or production-ready", "Do not render any text"];
  const missing = mustHave.filter((m) => !out.md.includes(m));
  if (missing.length || out.sections < 12 || !out.errorsHidden) fail(`brief: generated output missing ${missing.join(", ")}; ${out.sections} sections`);
  else log(`brief: example generated, ${out.sections} sections, ${out.md.length} chars of Markdown`);

  // 5. Output matches the generator used by the command line (one engine).
  const cliMd = await page.evaluate(() => {
    const r = window.AVDL_BRIEF.generate(JSON.parse(JSON.stringify(window.AVDL_BRIEF_UI.EXAMPLE)));
    return r.markdown;
  });
  if (cliMd !== out.md) fail("brief: page Markdown differs from AVDL_BRIEF.generate for the same input");

  // 6. Contrast of the rendered brief.
  const low = await page.evaluate(contrastAudit, "#b-output");
  low.forEach((l) => fail(`brief output: contrast ${l}`));

  // 7. Tabs, including arrow keys.
  await page.click("#t-prompt");
  if (await page.isHidden("#p-prompt")) fail("brief: prompt tab did not show");
  await page.keyboard.press("ArrowRight");
  if (await page.isHidden("#p-md")) fail("brief: arrow key did not move to Markdown tab");
  await page.click("#t-brief");

  // 8. Copy Markdown and copy prompt.
  await page.click("#b-copy-md");
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  if (clip !== out.md) fail(`brief: Copy Markdown wrote ${clip.length} chars, expected ${out.md.length}`);
  await page.click("#b-copy-prompt");
  const clipP = await page.evaluate(() => navigator.clipboard.readText());
  if (!clipP.startsWith("Exploratory visual concept") || !clipP.includes("Avoid:")) fail("brief: Copy AI prompt content wrong");

  // 9. Download .md produces the same Markdown.
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click("#b-download")]);
  const path = await dl.path();
  const { readFileSync } = await import("node:fs");
  const file = readFileSync(path, "utf8");
  if (file !== out.md || !dl.suggestedFilename().endsWith("-brief.md")) fail(`brief: download ${dl.suggestedFilename()} differs from Markdown`);
  else log(`brief: copy and download OK (${dl.suggestedFilename()})`);

  // 10. Draft survives a reload.
  await page.reload({ waitUntil: "networkidle" });
  const kept = await page.inputValue("#b-projectName");
  if (!kept.startsWith("Ramadan gifting campaign")) fail(`brief: draft not restored after reload ("${kept}")`);

  // 11. "Start a project brief" on a style page preselects that style.
  await page.goto(url + "#quiet-luxury", { waitUntil: "networkidle" });
  await page.click('a.cta[href="#brief-quiet-luxury"]');
  await page.waitForTimeout(150);
  const pre = await page.evaluate(() => ({ hash: location.hash, checked: document.getElementById("b-style-quiet-luxury").checked, view: document.querySelector("[data-view]:not([hidden])").dataset.view }));
  if (pre.view !== "brief" || !pre.checked) fail(`brief: style page CTA -> ${JSON.stringify(pre)}`);
  else log("brief: style page CTA preselects the style");

  if (errors.length) fail(`brief: console/page errors: ${errors.join(" | ")}`);
  await ctx.close();
}

// Project brief at phone width: the generated output must not overflow.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto(url + "#brief", { waitUntil: "networkidle" });
  await page.click("#b-example");
  await page.click("#brief-form button[type=submit]");
  await page.waitForSelector("#b-output:not([hidden])");
  for (const tab of ["#t-brief", "#t-prompt", "#t-md"]) {
    await page.click(tab);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (o > 0) fail(`brief phone ${tab}: horizontal overflow ${o}px`);
  }
  if (shots) {
    await page.click("#t-brief");
    await page.screenshot({ path: join(shots, "phone-brief-output.png"), fullPage: true });
  }
  log("brief: phone layout checked");
  await page.close();
}
if (shots) {
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  await page.goto(url + "#brief", { waitUntil: "networkidle" });
  await page.click("#b-example");
  await page.click("#brief-form button[type=submit]");
  await page.waitForSelector("#b-output:not([hidden])");
  await page.screenshot({ path: join(shots, "desktop-brief-output.png"), fullPage: true });
  await page.close();
}

await browser.close();
if (failures.length) {
  console.log(`\n${failures.length} problem(s):`);
  failures.forEach((f) => console.log(" - " + f));
  process.exit(1);
}
console.log("\nAll browser checks passed.");
