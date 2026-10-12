/*
 * "Project brief" page: a form that collects project inputs and renders the
 * output of library/brief.js (creative direction, brief, AI prompt, Markdown).
 * Everything runs locally in the browser; nothing is sent anywhere.
 *
 * Mounted by render.js for the routes #brief and #brief-<style-id>.
 */
(function () {
  var STYLES = window.AVDL_STYLES;
  var VOCAB = window.AVDL_VOCAB;
  var B = window.AVDL_BRIEF;
  var DRAFT_KEY = "avdl-brief-draft-v1";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function $(id) { return document.getElementById(id); }

  var EXAMPLE = {
    styleId: "modern-heritage",
    projectName: "Ramadan gifting campaign 2027 (fictional example)",
    clientName: "Tamr Grove",
    projectType: "campaign",
    industry: "Food & beverage",
    industryOther: "",
    audience: "Families and corporate buyers in Riyadh and Baghdad choosing premium date gift boxes for Ramadan and Eid",
    objective: "Grow pre-orders of the Ramadan gift box through social media and outdoor advertising",
    tone: "Warm and generous, never boastful",
    constraints: "Arabic headline must lead on every format. Logo bottom right.",
    identityMode: "preserve",
    colors: [
      { name: "Date Brown", hex: "#6B3A1F", role: "Primary" },
      { name: "Palm Green", hex: "#2F5D3A", role: "Secondary" },
      { name: "Sand", hex: "#F3EBDD", role: "Background" },
    ],
    fonts: { headline: "", body: "", arabic: "" },
    assets: { logo: true, guidelines: true, fonts: false, photography: false, voice: false },
    language: "bilingual",
    deliverables: ["social-feed", "social-story", "ooh-48", "display-mpu"],
  };

  function empty() {
    return {
      styleId: "", projectName: "", clientName: "", projectType: "", industry: "", industryOther: "",
      audience: "", objective: "", tone: "", constraints: "", identityMode: "preserve",
      colors: [{ name: "", hex: "", role: "Primary" }], fonts: { headline: "", body: "", arabic: "" },
      assets: {}, language: "en", deliverables: [],
    };
  }

  /* ---------------------------------------------------------------- form */

  function field(id, label, control, hint) {
    return '<div class="f"><label for="b-' + id + '">' + label + "</label>" + (hint ? '<p class="f-hint" id="b-' + id + '-hint">' + hint + "</p>" : "") + control + "</div>";
  }
  function text(id, label, hint, attrs) {
    return field(id, label, '<input id="b-' + id + '" name="' + id + '" type="text" autocomplete="off"' + (hint ? ' aria-describedby="b-' + id + '-hint"' : "") + (attrs || "") + ">", hint);
  }
  function area(id, label, hint) {
    return field(id, label, '<textarea id="b-' + id + '" name="' + id + '" rows="3"' + (hint ? ' aria-describedby="b-' + id + '-hint"' : "") + "></textarea>", hint);
  }
  function select(id, label, options, hint) {
    return field(id, label, '<select id="b-' + id + '" name="' + id + '"><option value="">Choose…</option>' +
      options.map(function (o) { return '<option value="' + esc(o[0]) + '">' + esc(o[1]) + "</option>"; }).join("") + "</select>", hint);
  }

  function formHtml() {
    var styles = STYLES.map(function (s, i) {
      var strip = s.palette.map(function (c) { return '<span style="flex:' + c.share + ";background:" + c.hex + '"></span>'; }).join("");
      return '<label class="style-opt"><input type="radio" name="styleId" id="b-style-' + s.id + '" value="' + s.id + '">' +
        '<span class="so-body"><span class="so-n">' + pad(i + 1) + '</span><span class="so-name" style="font-family:' + s.tokens.fontDisplay + '">' + esc(s.name) + "</span>" +
        '<span class="strip sm" aria-hidden="true">' + strip + '</span><span class="so-tag">' + esc(s.tagline) + "</span></span></label>";
    }).join("");
    var modes = B.IDENTITY_MODES.map(function (m) {
      return '<label class="opt"><input type="radio" name="identityMode" id="b-mode-' + m.id + '" value="' + m.id + '"><span><strong>' + esc(m.label) + "</strong>" + esc(m.help) + "</span></label>";
    }).join("");
    var groups = {};
    B.DELIVERABLES.forEach(function (d) { (groups[d.group] = groups[d.group] || []).push(d); });
    var dels = Object.keys(groups).map(function (g) {
      return '<div class="dgroup"><p class="dg-title">' + esc(g) + "</p>" + groups[g].map(function (d) {
        return '<label class="chk"><input type="checkbox" name="deliverables" id="b-del-' + d.id + '" value="' + d.id + '"><span>' + esc(d.label) + ' <span class="sub">' + esc(d.spec) + "</span></span></label>";
      }).join("") + "</div>";
    }).join("");
    var assets = B.ASSETS.map(function (a) {
      return '<label class="chk"><input type="checkbox" name="assets" id="b-asset-' + a.id + '" value="' + a.id + '"><span>' + esc(a.label) + "</span></label>";
    }).join("");
    var langs = [["en", "English"], ["ar", "Arabic"], ["bilingual", "Arabic and English"]].map(function (l) {
      return '<label class="opt inline"><input type="radio" name="language" id="b-lang-' + l[0] + '" value="' + l[0] + '"><span>' + l[1] + "</span></label>";
    }).join("");

    return (
      '<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="#">All styles</a><span aria-hidden="true">/</span><span>Project brief</span></nav>' +
      '<div class="wrap">' +
      '<header class="page-head"><h1 id="brief-title" tabindex="-1">Project brief</h1>' +
      '<p class="intro">Choose a style, describe the project, and generate a creative direction, a design brief and a reusable AI concept prompt, all exportable as Markdown. The brief is built in your browser from the style’s rules. No AI service is called and no images are generated.</p>' +
      '<div class="btn-line"><button type="button" class="copy big" id="b-example">Load the fictional example</button><button type="button" class="linkish" id="b-reset">Clear the form</button></div></header>' +

      '<form id="brief-form" novalidate>' +
      '<div id="b-errors" class="errors" role="alert" tabindex="-1" hidden></div>' +

      '<fieldset class="step"><legend><span>1</span> Visual style</legend><p class="f-hint">The style is a set of rules: palette roles and proportions, type hierarchy, grid, imagery and graphic elements.</p><div class="style-opts">' + styles + "</div></fieldset>" +

      '<fieldset class="step"><legend><span>2</span> Project</legend><div class="grid2">' +
      text("projectName", "Project name") + text("clientName", "Client or brand name") +
      select("projectType", "Project type", B.PROJECT_TYPES.map(function (p) { return [p.id, p.label]; })) +
      select("industry", "Industry", VOCAB.sectors.map(function (s) { return [s, s]; }).concat([["Other", "Other…"]])) +
      '<div class="f" id="b-industryOther-wrap" hidden><label for="b-industryOther">Describe the industry</label><input id="b-industryOther" name="industryOther" type="text"></div>' +
      "</div>" +
      area("audience", "Target audience", "Who they are, what they need, where they will see the work.") +
      area("objective", "Objective (optional)", "What the work must achieve, ideally measurable.") +
      "</fieldset>" +

      '<fieldset class="step"><legend><span>3</span> Brand identity</legend>' +
      '<p class="f-hint">The client’s identity is preserved unless you choose otherwise. Leave anything you do not have empty: missing items become open questions in the brief and are never invented.</p>' +
      '<div class="opts" role="radiogroup" aria-label="Identity handling">' + modes + "</div>" +
      '<h3 class="f-mini">Brand colours <span class="sub">up to 6</span></h3><div id="b-colors"></div>' +
      '<button type="button" class="copy" id="b-add-color">Add a colour</button>' +
      '<h3 class="f-mini">Brand typefaces <span class="sub">names only, as the client supplies them</span></h3><div class="grid3">' +
      text("font-headline", "Headline typeface") + text("font-body", "Body typeface") + text("font-arabic", "Arabic typeface") + "</div>" +
      '<h3 class="f-mini">Assets the client has supplied</h3><div class="chks">' + assets + "</div>" +
      "</fieldset>" +

      '<fieldset class="step"><legend><span>4</span> Deliverables</legend><div class="dgroups">' + dels + "</div></fieldset>" +

      '<fieldset class="step"><legend><span>5</span> Language and notes</legend>' +
      '<div class="opts row" role="radiogroup" aria-label="Language">' + langs + "</div>" +
      text("tone", "Tone notes (optional)", "For example: warm, plain-spoken, never boastful.") +
      area("constraints", "Mandatory items and constraints (optional)", "Legal lines, logo position, partner logos, deadlines.") +
      "</fieldset>" +

      '<div class="submit-row"><button type="submit" class="primary-btn">Generate brief</button><p class="f-hint">Generated locally from the style’s rules.</p></div>' +
      "</form>" +

      '<section id="b-output" class="output" hidden aria-labelledby="b-out-title">' +
      '<div class="out-head"><div><h2 id="b-out-title" tabindex="-1">Creative direction and brief</h2><p class="out-sub" id="b-out-sub"></p></div>' +
      '<div class="out-actions"><button type="button" class="copy" id="b-copy-md">Copy Markdown</button>' +
      (window.AVDL_EMBEDDED ? "" : '<button type="button" class="copy" id="b-download">Download .md</button>') +
      '<button type="button" class="copy" id="b-copy-prompt">Copy AI prompt</button></div></div>' +
      '<p class="notice">This is a brief, not artwork. Nothing here is final or production-ready, no images were generated, and no client assets were created.</p>' +
      '<div class="tabs" role="tablist" aria-label="Output">' +
      '<button type="button" role="tab" id="t-brief" aria-controls="p-brief" aria-selected="true">Brief</button>' +
      '<button type="button" role="tab" id="t-prompt" aria-controls="p-prompt" aria-selected="false" tabindex="-1">AI prompt</button>' +
      '<button type="button" role="tab" id="t-md" aria-controls="p-md" aria-selected="false" tabindex="-1">Markdown</button></div>' +
      '<div role="tabpanel" id="p-brief" aria-labelledby="t-brief" class="brief-doc"></div>' +
      '<div role="tabpanel" id="p-prompt" aria-labelledby="t-prompt" hidden></div>' +
      '<div role="tabpanel" id="p-md" aria-labelledby="t-md" hidden><pre class="md-pre"><code id="b-md"></code></pre></div>' +
      "</section>" +
      "</div>"
    );
  }

  function colorRow(c, i) {
    var hex = B.normHex(c.hex);
    var valid = /^#[0-9A-F]{6}$/.test(hex);
    return (
      '<div class="crow" data-i="' + i + '">' +
      '<input type="color" id="b-c-' + i + '-pick"' + (valid ? "" : ' class="empty"') + ' aria-label="Pick colour ' + (i + 1) + '" value="' + (valid ? hex.toLowerCase() : "#000000") + '">' +
      '<div class="f"><label for="b-c-' + i + '-hex">Hex</label><input id="b-c-' + i + '-hex" type="text" inputmode="text" placeholder="#1F4BFF" value="' + esc(c.hex) + '" spellcheck="false"></div>' +
      '<div class="f"><label for="b-c-' + i + '-name">Name</label><input id="b-c-' + i + '-name" type="text" placeholder="Brand Blue" value="' + esc(c.name) + '"></div>' +
      '<div class="f"><label for="b-c-' + i + '-role">Role</label><select id="b-c-' + i + '-role">' +
      B.COLOR_ROLES.map(function (r) { return '<option' + (r === c.role ? " selected" : "") + ">" + r + "</option>"; }).join("") + "</select></div>" +
      '<button type="button" class="linkish" data-remove="' + i + '" aria-label="Remove colour ' + (i + 1) + '">Remove</button></div>'
    );
  }

  /* ------------------------------------------------------- state <-> form */

  var colors = [];

  function renderColors() {
    $("b-colors").innerHTML = colors.length ? colors.map(colorRow).join("") : '<p class="f-hint">No colours entered. Add the client’s brand colours, or leave empty if they have none yet.</p>';
    $("b-add-color").hidden = colors.length >= 6;
  }

  function readColors() {
    colors = colors.map(function (c, i) {
      return { hex: $("b-c-" + i + "-hex").value.trim(), name: $("b-c-" + i + "-name").value, role: $("b-c-" + i + "-role").value };
    });
  }

  function read() {
    var f = $("brief-form");
    readColors();
    function radio(name) { var r = f.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ""; }
    var assets = {};
    f.querySelectorAll('input[name="assets"]').forEach(function (c) { assets[c.value] = c.checked; });
    return {
      styleId: radio("styleId"),
      projectName: $("b-projectName").value, clientName: $("b-clientName").value,
      projectType: $("b-projectType").value, industry: $("b-industry").value, industryOther: $("b-industryOther").value,
      audience: $("b-audience").value, objective: $("b-objective").value, tone: $("b-tone").value, constraints: $("b-constraints").value,
      identityMode: radio("identityMode"),
      colors: colors.filter(function (c) { return c.hex || c.name; }),
      fonts: { headline: $("b-font-headline").value, body: $("b-font-body").value, arabic: $("b-font-arabic").value },
      assets: assets, language: radio("language"),
      deliverables: [].map.call(f.querySelectorAll('input[name="deliverables"]:checked'), function (c) { return c.value; }),
    };
  }

  function write(d) {
    var f = $("brief-form");
    f.querySelectorAll("input[type=radio], input[type=checkbox]").forEach(function (i) { i.checked = false; });
    function check(id) { var el = $(id); if (el) el.checked = true; }
    if (d.styleId) check("b-style-" + d.styleId);
    ["projectName", "clientName", "projectType", "industry", "industryOther", "audience", "objective", "tone", "constraints"].forEach(function (k) { $("b-" + k).value = d[k] || ""; });
    check("b-mode-" + (d.identityMode || "preserve"));
    check("b-lang-" + (d.language || "en"));
    var fonts = d.fonts || {};
    $("b-font-headline").value = fonts.headline || "";
    $("b-font-body").value = fonts.body || "";
    $("b-font-arabic").value = fonts.arabic || "";
    Object.keys(d.assets || {}).forEach(function (k) { if (d.assets[k]) check("b-asset-" + k); });
    (d.deliverables || []).forEach(function (id) { check("b-del-" + id); });
    colors = (d.colors || []).map(function (c) { return { hex: c.hex || "", name: c.name || "", role: c.role || "Primary" }; });
    renderColors();
    syncOther();
  }

  function syncOther() {
    $("b-industryOther-wrap").hidden = $("b-industry").value !== "Other";
  }

  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(read())); } catch (e) { /* storage unavailable: drafts are a convenience only */ }
  }
  function loadDraft() {
    try { var v = localStorage.getItem(DRAFT_KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }

  /* -------------------------------------------------------------- output */

  function blockHtml(b) {
    if (b.type === "p") return "<p>" + esc(b.text) + "</p>";
    if (b.type === "h") return "<h4>" + esc(b.text) + "</h4>";
    if (b.type === "list") return "<ul>" + b.items.map(function (i) { return "<li>" + esc(String(i).replace(/\*/g, "")) + "</li>"; }).join("") + "</ul>";
    if (b.type === "table") {
      return '<div class="tbl"><table><thead><tr>' + b.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        b.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
    }
    if (b.type === "swatches") {
      return '<ul class="b-swatches">' + b.rows.map(function (r) {
        return '<li><span class="b-chip' + (r[1] ? "" : " none") + '"' + (r[1] ? ' style="background:' + r[1] + '"' : "") + "></span>" +
          '<span class="b-sw-text"><strong>' + esc(r[0]) + "</strong> " + (r[1] ? '<button type="button" class="hex" data-copy="' + r[1] + '">' + r[1] + "</button>" : '<span class="miss">Not provided</span>') +
          '<span class="b-sw-name">' + esc(r[2]) + '</span><span class="b-sw-src">' + esc(r[3]) + "</span><span class=\"b-sw-use\">" + esc(r[4]) + "</span></span></li>";
      }).join("") + "</ul>";
    }
    return "";
  }

  function render(result) {
    $("b-out-sub").textContent = result.subtitle;
    $("p-brief").innerHTML =
      '<p class="b-title">' + esc(result.title) + "</p>" +
      '<nav class="b-toc" aria-label="Brief sections">' + result.sections.map(function (s) { return '<button type="button" data-goto="bs-' + s.id + '">' + esc(s.title) + "</button>"; }).join("") + "</nav>" +
      result.sections.map(function (s) {
        var cls = s.id === "open" || s.id === "status" ? " flag" : "";
        return '<section class="b-sec' + cls + '" id="bs-' + s.id + '"><h3>' + esc(s.title) + "</h3>" + s.blocks.map(blockHtml).join("") + "</section>";
      }).join("");
    var p = result.prompt;
    $("p-prompt").innerHTML =
      '<p class="f-hint">Use with any image tool to explore concepts. Results are references for internal review, not deliverables.</p>' +
      '<div class="code"><div class="code-bar"><span>Prompt</span><button type="button" class="copy" data-copy="' + esc(p.master) + '">Copy prompt</button></div><pre><code>' + esc(p.master) + "</code></pre></div>" +
      '<div class="code"><div class="code-bar"><span>Negative prompt</span><button type="button" class="copy" data-copy="' + esc(p.negative) + '">Copy</button></div><pre><code>' + esc(p.negative) + "</code></pre></div>" +
      (p.formats.length ? "<h4>Aspect ratios for the selected deliverables</h4><ul>" + p.formats.map(function (f) { return "<li><code>" + esc(f.ratio) + "</code> " + esc(f.label) + "</li>"; }).join("") + "</ul>" : "") +
      "<h4>How to use</h4><ul>" + p.usage.map(function (u) { return "<li>" + esc(u) + "</li>"; }).join("") + "</ul>";
    $("b-md").textContent = result.markdown;
    $("b-copy-md").setAttribute("data-copy", result.markdown);
    $("b-copy-prompt").setAttribute("data-copy", p.master + "\n\nAvoid: " + p.negative);
    var dl = $("b-download");
    if (dl) dl.setAttribute("data-file", B.slug(result.title.replace(/^Creative direction: /, "")) + "-brief.md");
    selectTab("t-brief");
    $("b-output").hidden = false;
    current = result;
  }

  var current = null;

  function showErrors(errors) {
    var box = $("b-errors");
    document.querySelectorAll("#brief-form [aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
    if (!errors.length) { box.hidden = true; box.innerHTML = ""; return; }
    box.innerHTML = "<p><strong>" + errors.length + " thing" + (errors.length > 1 ? "s" : "") + " to fix before the brief can be generated:</strong></p><ul>" +
      errors.map(function (e) { return '<li><button type="button" class="linkish" data-focus="' + targetFor(e.field) + '">' + esc(e.message) + "</button></li>"; }).join("") + "</ul>";
    errors.forEach(function (e) { var el = $(targetFor(e.field)); if (el) el.setAttribute("aria-invalid", "true"); });
    box.hidden = false;
    box.focus();
  }
  function targetFor(field) {
    if (field === "styleId") return "b-style-" + STYLES[0].id;
    if (field === "deliverables") return "b-del-" + B.DELIVERABLES[0].id;
    if (field === "identityMode") return "b-mode-preserve";
    if (field === "language") return "b-lang-en";
    if (field === "colors") return "b-add-color";
    var m = /^color-(\d+)$/.exec(field);
    if (m) {
      // Errors index the submitted (non-empty) colours; map back to the row.
      var n = -1, idx = +m[1];
      for (var i = 0; i < colors.length; i++) if (colors[i].hex || colors[i].name) { n++; if (n === idx) return "b-c-" + i + "-hex"; }
    }
    return "b-" + field;
  }

  function selectTab(id) {
    ["t-brief", "t-prompt", "t-md"].forEach(function (t) {
      var on = t === id;
      $(t).setAttribute("aria-selected", on ? "true" : "false");
      $(t).tabIndex = on ? 0 : -1;
      $($(t).getAttribute("aria-controls")).hidden = !on;
    });
  }

  /* --------------------------------------------------------------- mount */

  var mounted = false;

  function mount(view, styleId) {
    if (!mounted) {
      view.innerHTML = formHtml();
      bind();
      var draft = loadDraft();
      write(draft || empty());
      mounted = true;
    }
    if (styleId) {
      var r = $("b-style-" + styleId);
      if (r) { r.checked = true; saveDraft(); }
    }
  }

  function bind() {
    var f = $("brief-form");
    f.addEventListener("input", function (e) {
      if (e.target.type === "color") {
        var i = e.target.id.match(/b-c-(\d+)-pick/)[1];
        $("b-c-" + i + "-hex").value = e.target.value.toUpperCase();
        e.target.classList.remove("empty");
      }
      if (/^b-c-\d+-hex$/.test(e.target.id)) {
        var j = e.target.id.match(/b-c-(\d+)-hex/)[1];
        var h = B.normHex(e.target.value);
        var ok = /^#[0-9A-F]{6}$/.test(h);
        if (ok) $("b-c-" + j + "-pick").value = h.toLowerCase();
        $("b-c-" + j + "-pick").classList.toggle("empty", !ok);
      }
      if (e.target.id === "b-industry") syncOther();
      saveDraft();
    });
    f.addEventListener("change", function (e) { if (e.target.id === "b-industry") syncOther(); saveDraft(); });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = read();
      var result = B.generate(input);
      if (!result.ok) { showErrors(result.errors); return; }
      showErrors([]);
      render(result);
      $("b-out-title").focus({ preventScroll: true });
      $("b-output").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
    $("b-add-color").addEventListener("click", function () {
      readColors();
      if (colors.length >= 6) return;
      colors.push({ hex: "", name: "", role: colors.length ? "Secondary" : "Primary" });
      renderColors();
      $("b-c-" + (colors.length - 1) + "-hex").focus();
      saveDraft();
    });
    $("b-colors").addEventListener("click", function (e) {
      var b = e.target.closest("[data-remove]");
      if (!b) return;
      readColors();
      colors.splice(+b.getAttribute("data-remove"), 1);
      renderColors();
      saveDraft();
      $("b-add-color").focus();
    });
    $("b-example").addEventListener("click", function () {
      write(JSON.parse(JSON.stringify(EXAMPLE)));
      saveDraft();
      showErrors([]);
      $("b-projectName").focus();
    });
    $("b-reset").addEventListener("click", function () {
      write(empty());
      saveDraft();
      showErrors([]);
      $("b-output").hidden = true;
      $("brief-title").focus();
    });
    $("b-errors").addEventListener("click", function (e) {
      var b = e.target.closest("[data-focus]");
      if (b) { var el = $(b.getAttribute("data-focus")); if (el) { el.focus(); el.scrollIntoView({ block: "center" }); } }
    });
    var tabs = ["t-brief", "t-prompt", "t-md"];
    tabs.forEach(function (t, i) {
      $(t).addEventListener("click", function () { selectTab(t); });
      $(t).addEventListener("keydown", function (e) {
        var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!k) return;
        var n = tabs[(i + k + tabs.length) % tabs.length];
        selectTab(n);
        $(n).focus();
      });
    });
    var dl = $("b-download");
    if (dl) dl.addEventListener("click", function () {
      if (!current) return;
      var blob = new Blob([current.markdown], { type: "text/markdown;charset=utf-8" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = dl.getAttribute("data-file") || "brief.md";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    });
  }

  window.AVDL_BRIEF_UI = { mount: mount, EXAMPLE: EXAMPLE };
})();
