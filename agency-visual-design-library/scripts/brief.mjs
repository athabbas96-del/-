#!/usr/bin/env node
// Generate a project brief from a JSON input file, using the same rules as
// the "Project brief" page (library/brief.js).
//
//   node agency-visual-design-library/scripts/brief.mjs <input.json> [--out brief.md] [--date YYYY-MM-DD]
//
// Input format: see agency-visual-design-library/08-project-workflow/README.md
// and the example in 08-project-workflow/examples/.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export function loadLibrary() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of ["library/styles-data.js", "library/brief.js"]) vm.runInContext(readFileSync(join(root, f), "utf8"), ctx);
  return { root, STYLES: ctx.window.AVDL_STYLES, BRIEF: ctx.window.AVDL_BRIEF };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--out" && args[args.indexOf(a) - 1] !== "--date");
  const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
  if (!file) {
    console.error("Usage: node scripts/brief.mjs <input.json> [--out brief.md] [--date YYYY-MM-DD]");
    process.exit(2);
  }
  const { BRIEF } = loadLibrary();
  const input = JSON.parse(readFileSync(file, "utf8"));
  const result = BRIEF.generate(input, { date: opt("--date") });
  if (!result.ok) {
    console.error("The input is incomplete:");
    result.errors.forEach((e) => console.error(` - ${e.field}: ${e.message}`));
    process.exit(1);
  }
  const out = opt("--out");
  if (out) {
    writeFileSync(out, result.markdown);
    console.log(`Wrote ${out} (${result.openQuestions.length} open questions, ${result.warnings.length} fit warnings)`);
  } else process.stdout.write(result.markdown);
}
