/*
 * Renders the visual library from window.AVDL_STYLES (library/styles-data.js).
 * Each style's examples are drawn inside a `.sp` (specimen) element that
 * carries that style's tokens as CSS custom properties.
 */
(function () {
  var STYLES = window.AVDL_STYLES || [];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // *word* in the data marks the emphasised word of a headline.
  function rich(s) {
    return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
  }
  function plain(s) {
    return String(s).replace(/\*/g, "");
  }
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function list(items, cls) {
    return '<ul class="' + (cls || "rules") + '">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>";
  }
  function hasArabic(s) {
    return /[؀-ۿ]/.test(s);
  }
  function domain(s) {
    return s.sampleBrand.toLowerCase().replace(/[^a-z]+/g, "") + ".example";
  }

  function vars(t) {
    return [
      "--bg:" + t.bg, "--surface:" + t.surface, "--ink:" + t.ink, "--muted:" + t.muted,
      "--accent:" + t.accent, "--accent2:" + t.accent2, "--on-accent:" + t.onAccent, "--line:" + t.line,
      "--fd:" + t.fontDisplay, "--fb:" + t.fontBody, "--dw:" + t.displayWeight, "--dc:" + t.displayCase,
      "--dt:" + t.displayTracking, "--r:" + t.radius, "--br:" + t.btnRadius, "--bw:" + t.borderWidth, "--sh:" + t.shadow,
    ].join(";");
  }

  function photo(shot, cls) {
    var t = shot.tone;
    return (
      '<div class="ph ' + (cls || "") + '" role="img" aria-label="Photo direction: ' + esc(shot.caption) + '" style="--t0:' + t[0] + ";--t1:" + t[1] + ";--t2:" + t[2] + '">' +
      '<span class="ph-cap">' + esc(shot.caption) + "</span></div>"
    );
  }

  function motif(s) {
    return '<div class="motif" aria-hidden="true"><i></i><b>' + esc(s.sampleBrand.charAt(0)) + "</b></div>";
  }

  function brandMark(s) {
    var ar = s.sampleBrandArabic ? '<span class="brand-ar" lang="ar">' + esc(s.sampleBrandArabic) + "</span>" : "";
    return '<span class="brand">' + esc(s.sampleBrand) + "</span>" + ar;
  }

  /* ---------------------------------------------------------- spec cards */

  function paletteCard(s) {
    var strip = s.palette.map(function (c) {
      return '<span style="flex:' + c.share + ";background:" + c.hex + '" title="' + esc(c.name + " " + c.share + "%") + '"></span>';
    }).join("");
    var sw = s.palette.map(function (c) {
      return (
        '<li class="swatch"><span class="chip-c" style="background:' + c.hex + '"></span>' +
        '<span class="sw-name">' + esc(c.name) + "</span>" +
        '<button type="button" class="hex" data-copy="' + c.hex + '" aria-label="Copy ' + c.hex + '">' + c.hex + "</button>" +
        '<span class="sw-role">' + esc(c.role) + "</span>" +
        '<span class="sw-share">' + c.share + "%</span></li>"
      );
    }).join("");
    return (
      '<article class="card span-8"><h4>Color palette</h4>' +
      '<div class="strip" aria-label="Palette proportions">' + strip + "</div>" +
      '<p class="hint">Bar widths show the recommended share of each colour in a layout.</p>' +
      '<ul class="swatches">' + sw + "</ul>" +
      '<p class="rule-note">' + esc(s.paletteRule) + "</p></article>"
    );
  }

  function industriesCard(s) {
    return (
      '<article class="card span-4"><h4>Target industries</h4>' + list(s.industries, "plain-list") +
      '<p class="hint">Sample brand used in the examples: <strong>' + esc(s.sampleBrand) + "</strong>, " + esc(s.sampleBrandType.toLowerCase()) + " (invented).</p></article>"
    );
  }

  function fontRow(role, f) {
    if (!f) return "";
    return (
      "<tr><th scope=\"row\">" + role + "</th><td><strong>" + esc(f.family) + "</strong>" +
      (f.weights ? '<span class="sub">' + esc(f.weights) + "</span>" : "") + "</td><td>" + esc(f.use || f.note || "") + "</td></tr>"
    );
  }

  function typographyCard(s) {
    var ty = s.typography;
    var scale = ty.scale.map(function (r) {
      return "<tr><th scope=\"row\">" + esc(r.level) + '</th><td class="num">' + esc(r.size) + '</td><td class="num">' + esc(r.weight) + "</td><td>" + esc(r.detail) + "</td></tr>";
    }).join("");
    var head = s.website.hero.headline;
    var dir = hasArabic(head) ? ' dir="rtl" lang="ar"' : "";
    return (
      '<article class="card span-12 type-card"><h4>Typography</h4><div class="type-grid">' +
      '<div class="sp type-spec" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' +
      '<div class="aa"><span class="d">Aa</span><span class="aa-body">Aa</span></div>' +
      '<p class="d type-head"' + dir + ">" + rich(head) + "</p>" +
      '<p class="type-body">' + esc(s.website.hero.sub) + "</p>" +
      '<p class="type-label">' + esc(ty.display.family) + " · " + esc(ty.body.family) + "</p></div>" +
      '<div class="type-info">' +
      '<div class="tbl"><table><caption>Typefaces</caption><thead><tr><th>Role</th><th>Family</th><th>Use</th></tr></thead><tbody>' +
      fontRow("Display", ty.display) + fontRow("Body", ty.body) + fontRow("Utility", ty.utility) +
      "<tr><th scope=\"row\">Arabic</th><td><strong>" + esc(ty.arabic.family) + "</strong></td><td>" + esc(ty.arabic.note) + "</td></tr>" +
      "</tbody></table></div>" +
      '<div class="tbl"><table><caption>Type scale (desktop, px size / line height)</caption><thead><tr><th>Level</th><th>Size</th><th>Weight</th><th>Detail</th></tr></thead><tbody>' + scale + "</tbody></table></div>" +
      list(ty.rules) + "</div></div></article>"
    );
  }

  function layoutCard(s) {
    var l = s.layout;
    return (
      '<article class="card span-6"><h4>Layout rules</h4><dl class="facts">' +
      "<div><dt>Grid</dt><dd>" + esc(l.grid) + "</dd></div>" +
      "<div><dt>Spacing</dt><dd>" + esc(l.spacing) + "</dd></div>" +
      "<div><dt>Corners</dt><dd>" + esc(l.radius) + "</dd></div></dl>" + list(l.rules) + "</article>"
    );
  }

  function graphicsCard(s) {
    return (
      '<article class="card span-6"><h4>Graphic elements</h4>' +
      '<div class="sp gfx-spec" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' + motif(s) + "</div>" +
      '<p class="hint">Shown: ' + esc(s.motif.toLowerCase()) + ".</p>" + list(s.graphics) + "</article>"
    );
  }

  function photoCard(s) {
    var p = s.photography;
    var frames = p.shots.map(function (sh) {
      return '<div class="sp" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' + photo(sh, "shot") + "</div>";
    }).join("");
    return (
      '<article class="card span-12"><h4>Photography direction</h4>' +
      '<p class="lede">' + esc(p.summary) + "</p>" +
      '<div class="shots">' + frames + "</div>" +
      '<p class="hint">Frames are art-direction placeholders: the colours show the target grade, and the caption is the shot brief.</p>' +
      '<div class="two-col"><div><h5>Direction</h5>' + list(p.rules) + "</div>" +
      "<div><h5>Avoid</h5>" + list(p.avoid, "rules avoid") + "</div></div></article>"
    );
  }

  /* ------------------------------------------------------- example boards */

  function uiBoard(s) {
    var u = s.ui;
    var tags = u.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    return (
      '<div class="sp ui-board" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' +
      '<div class="ui-group"><span class="grp">Buttons</span><div class="btn-row">' +
      '<span class="btn">' + esc(u.primary) + '</span><span class="btn sec">' + esc(u.secondary) + "</span></div></div>" +
      '<div class="ui-group"><span class="grp">Input</span><div class="field"><span class="field-label">' + esc(u.inputLabel) + '</span><span class="field-box">' + esc(u.inputValue) + "</span></div></div>" +
      '<div class="ui-group"><span class="grp">Tags</span><div class="tag-row">' + tags + "</div></div>" +
      '<div class="ui-group"><span class="grp">Card</span><div class="ui-card">' + photo(s.photography.shots[0], "card-ph") +
      '<div class="ui-card-body"><span class="ui-card-meta">' + esc(u.card.meta) + '</span><span class="d ui-card-title">' + esc(u.card.title) + '</span><span class="ui-card-price">' + esc(u.card.price) + "</span></div></div></div>" +
      "</div>"
    );
  }

  function socialBoard(s) {
    var so = s.social;
    var sh = s.photography.shots;
    function dirOf(t) { return hasArabic(t) ? ' dir="rtl" lang="ar"' : ""; }
    var feed =
      '<figure class="fr-wrap"><div class="sp fr feed" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' + motif(s) +
      '<div class="fr-body"><span class="eyebrow"' + dirOf(so.feed.eyebrow) + ">" + esc(so.feed.eyebrow) + "</span>" +
      '<span class="d fr-head">' + rich(so.feed.headline) + "</span>" +
      (so.feed.body ? '<span class="fr-text">' + esc(so.feed.body) + "</span>" : "") + "</div>" +
      '<span class="fr-logo">' + brandMark(s) + "</span></div><figcaption>Feed post · 1080 × 1080</figcaption></figure>";
    var story =
      '<figure class="fr-wrap"><div class="sp fr story" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' + photo(sh[1], "fill") +
      '<div class="fr-body over"><span class="eyebrow"' + dirOf(so.story.eyebrow) + ">" + esc(so.story.eyebrow) + "</span>" +
      '<span class="d fr-head">' + rich(so.story.headline) + '</span><span class="btn">' + esc(so.story.cta) + "</span></div></div>" +
      "<figcaption>Story · 1080 × 1920</figcaption></figure>";
    var ad =
      '<figure class="fr-wrap"><div class="sp fr ad" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' + photo(sh[2], "top") +
      '<div class="fr-body"><span class="eyebrow"' + dirOf(so.ad.eyebrow) + ">" + esc(so.ad.eyebrow) + "</span>" +
      '<span class="d fr-head">' + rich(so.ad.headline) + '</span><span class="btn">' + esc(so.ad.cta) + "</span></div></div>" +
      "<figcaption>Feed ad · 1080 × 1350</figcaption></figure>";
    return '<div class="social-board">' + feed + story + ad + "</div>";
  }

  function websiteBoard(s) {
    var w = s.website;
    var rtl = hasArabic(w.hero.headline);
    var nav = w.nav.map(function (n) { return "<span>" + esc(n) + "</span>"; }).join("");
    var feats = w.features.map(function (f) {
      return '<div class="feat"><span class="d feat-title">' + esc(f.title) + '</span><span class="feat-text">' + esc(f.text) + "</span></div>";
    }).join("");
    return (
      '<div class="browser"><div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span class="url">' + domain(s) + "</span></div>" +
      '<div class="sp site" data-style="' + s.id + '" style="' + vars(s.tokens) + '"' + (rtl ? ' dir="rtl" lang="ar"' : "") + ">" +
      '<div class="site-nav"><span class="site-logo d">' + esc(rtl && s.sampleBrandArabic ? s.sampleBrandArabic : s.sampleBrand) + '</span><span class="site-links">' + nav + '</span><span class="btn small">' + esc(w.hero.cta) + "</span></div>" +
      '<div class="site-hero"><div class="site-copy"><span class="eyebrow">' + esc(w.hero.eyebrow) + "</span>" +
      '<span class="d site-h1">' + rich(w.hero.headline) + '</span><span class="site-sub" dir="auto">' + esc(w.hero.sub) + "</span>" +
      '<span class="btn-row"><span class="btn">' + esc(w.hero.cta) + '</span><span class="btn sec">' + esc(w.hero.cta2) + "</span></span></div>" +
      '<div class="site-visual">' + photo(s.photography.shots[0], "hero-ph") + motif(s) + "</div></div>" +
      '<div class="site-feats" dir="ltr">' + feats + "</div></div></div>"
    );
  }

  /* -------------------------------------------------------------- section */

  function section(s, i) {
    var n = pad(i + 1);
    return (
      '<section class="style" id="' + s.id + '" aria-labelledby="' + s.id + '-name">' +
      '<header class="style-head"><div class="sh-left"><p class="label">Style ' + n + "</p>" +
      '<h2 id="' + s.id + '-name" class="style-name" style="font-family:' + s.tokens.fontDisplay + '">' + esc(s.name) + "</h2>" +
      '<p class="tagline">' + esc(s.tagline) + "</p></div>" +
      '<div class="sh-right"><h3 class="mini-h">Concept</h3><p class="concept">' + esc(s.concept) + "</p>" +
      '<ul class="kw">' + s.keywords.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul></div></header>" +

      '<div class="sp cover" data-style="' + s.id + '" style="' + vars(s.tokens) + '">' + motif(s) +
      '<div class="cover-copy"><span class="eyebrow">' + esc(s.sampleBrandType) + '</span><span class="d cover-name">' + brandMark(s) + "</span>" +
      '<span class="cover-tag">' + rich(s.social.ad.headline) + "</span></div></div>" +

      '<div class="specs">' + paletteCard(s) + industriesCard(s) + typographyCard(s) + photoCard(s) + layoutCard(s) + graphicsCard(s) + "</div>" +

      '<div class="examples">' +
      '<div class="ex"><div class="ex-head"><h3>UI examples</h3>' + list(s.ui.notes) + "</div>" + uiBoard(s) + "</div>" +
      '<div class="ex"><div class="ex-head"><h3>Social media examples</h3>' + list(s.social.notes) + "</div>" + socialBoard(s) + "</div>" +
      '<div class="ex"><div class="ex-head"><h3>Website example</h3>' + list(s.website.notes) + "</div>" + websiteBoard(s) + "</div>" +
      "</div>" +

      '<div class="dodont"><div class="do"><h4>Do</h4>' + list(s.dos) + '</div><div class="dont"><h4>Don’t</h4>' + list(s.donts) + "</div></div>" +
      '<p class="back"><a href="#index">Back to all styles</a></p>' +
      "</section>"
    );
  }

  function indexCard(s, i) {
    var strip = s.palette.map(function (c) { return '<span style="flex:' + c.share + ";background:" + c.hex + '"></span>'; }).join("");
    var hay = [s.name, s.tagline, s.keywords.join(" "), s.industries.join(" ")].join(" ").toLowerCase();
    return (
      '<li class="ix" data-hay="' + esc(hay) + '"><a href="#' + s.id + '">' +
      '<span class="ix-n">' + pad(i + 1) + '</span><span class="ix-name" style="font-family:' + s.tokens.fontDisplay + '">' + esc(s.name) + "</span>" +
      '<span class="ix-tag">' + esc(s.tagline) + '</span><span class="strip sm">' + strip + "</span>" +
      '<span class="ix-ind">' + esc(s.industries.slice(0, 3).join(" · ")) + "</span></a></li>"
    );
  }

  /* ---------------------------------------------------------------- mount */

  document.getElementById("index-list").innerHTML = STYLES.map(indexCard).join("");
  document.getElementById("jump").innerHTML = STYLES.map(function (s, i) {
    return '<a href="#' + s.id + '">' + pad(i + 1) + " " + esc(s.name) + "</a>";
  }).join("");
  document.getElementById("styles").innerHTML = STYLES.map(section).join("");
  var count = document.getElementById("style-count");
  if (count) count.textContent = STYLES.length;

  // Filter the index by industry or keyword.
  var input = document.getElementById("filter");
  var empty = document.getElementById("filter-empty");
  if (input) {
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      document.querySelectorAll("#index-list .ix").forEach(function (li) {
        var hit = !q || li.getAttribute("data-hay").indexOf(q) !== -1;
        li.hidden = !hit;
        if (hit) shown++;
      });
      empty.hidden = shown !== 0;
    });
  }

  // Copy hex values.
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var v = b.getAttribute("data-copy");
    function done(ok) {
      b.textContent = ok ? "Copied" : v;
      setTimeout(function () { b.textContent = v; }, 1200);
    }
    try {
      navigator.clipboard.writeText(v).then(function () { done(true); }, function () { selectText(b); });
    } catch (err) {
      selectText(b);
    }
  });
  function selectText(el) {
    var r = document.createRange();
    r.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
  }
})();
