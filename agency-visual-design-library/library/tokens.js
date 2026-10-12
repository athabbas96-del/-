/*
 * Design-token export formats, shared by the browser (render.js) and
 * scripts/build-docs.mjs so both always produce identical output.
 */
(function (w) {
  function key(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  // Semantic tokens: name -> [value, description].
  function semantic(s) {
    var t = s.tokens;
    return [
      ["bg", t.bg, "Page background"],
      ["surface", t.surface, "Cards, panels, inputs"],
      ["ink", t.ink, "Primary text"],
      ["muted", t.muted, "Secondary text"],
      ["accent", t.accent, "Brand accent fill"],
      ["accent-text", t.accentText, "Accent when used as text (AA on bg and surface)"],
      ["accent-2", t.accent2, "Secondary accent"],
      ["on-accent", t.onAccent, "Text on accent fills"],
      ["line", t.line, "Borders and rules"],
      ["font-display", t.fontDisplay, "Headlines"],
      ["font-body", t.fontBody, "Body and UI"],
      ["display-weight", t.displayWeight, "Headline weight"],
      ["display-case", t.displayCase, "Headline text-transform"],
      ["display-tracking", t.displayTracking, "Headline letter-spacing"],
      ["radius", t.radius, "Card and image corners"],
      ["button-radius", t.btnRadius, "Button corners"],
      ["border-width", t.borderWidth, "Default border"],
      ["shadow", t.shadow, "Elevation"],
    ];
  }

  function css(s, selector) {
    var lines = semantic(s).map(function (r) { return "  --avdl-" + r[0] + ": " + r[1] + ";"; });
    var pal = s.palette.map(function (c) { return "  --avdl-color-" + key(c.name) + ": " + c.hex + ";"; });
    return (selector || '[data-style="' + s.id + '"]') + " {\n" + lines.join("\n") + "\n" + pal.join("\n") + "\n}";
  }

  // W3C Design Tokens Community Group format.
  function json(s) {
    var out = { $description: s.name + " (Agency Visual Design Library)", color: {}, semantic: {}, font: {}, shape: {} };
    s.palette.forEach(function (c) {
      out.color[key(c.name)] = { $type: "color", $value: c.hex, $description: c.role + " · " + c.share + "% of layout" };
    });
    semantic(s).forEach(function (r) {
      var k = r[0];
      if (/^font-/.test(k)) out.font[k.slice(5)] = { $type: "fontFamily", $value: r[1] };
      else if (/radius|border-width/.test(k)) out.shape[k] = { $type: "dimension", $value: r[1] };
      else if (/^#/.test(r[1])) out.semantic[k] = { $type: "color", $value: r[1], $description: r[2] };
      else out.shape[k] = { $value: r[1], $description: r[2] };
    });
    return JSON.stringify(out, null, 2);
  }

  function tailwind(s) {
    var t = s.tokens;
    var colors = {};
    s.palette.forEach(function (c) { colors[key(c.name)] = c.hex; });
    var cfg = {
      theme: {
        extend: {
          colors: Object.assign({ bg: t.bg, surface: t.surface, ink: t.ink, muted: t.muted, accent: t.accent, "accent-text": t.accentText, "on-accent": t.onAccent }, colors),
          fontFamily: { display: t.fontDisplay.split(/,\s*/).map(unquote), body: t.fontBody.split(/,\s*/).map(unquote) },
          borderRadius: { card: t.radius, button: t.btnRadius },
        },
      },
    };
    return "// tailwind.config.js · " + s.name + "\nmodule.exports = " + JSON.stringify(cfg, null, 2) + ";";
  }

  function unquote(f) {
    return f.replace(/^'|'$/g, "");
  }

  w.AVDL_TOKENS = { semantic: semantic, css: css, json: json, tailwind: tailwind, key: key };
})(window);
