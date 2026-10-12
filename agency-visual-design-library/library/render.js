/*
 * Renders the visual library from window.AVDL_STYLES (library/styles-data.js).
 *
 * Views (hash routes, bare tokens only so links survive any host):
 *   #            catalogue with search and filters (#index is an alias)
 *   #<style-id>  detail page for one style
 *   #tokens      token reference for all styles
 *
 * Each example is drawn inside a `.sp` (specimen) element that carries that
 * style's tokens as CSS custom properties.
 */
(function () {
  var STYLES = window.AVDL_STYLES || [];
  var VOCAB = window.AVDL_VOCAB || { sectors: [], moods: [], applications: [] };
  var TOK = window.AVDL_TOKENS;
  var LIB = "Agency Visual Design Library";

  /* ------------------------------------------------------------- helpers */

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // *word* in the data marks the emphasised word of a headline.
  function rich(s) {
    return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
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
  function dirOf(t) {
    return hasArabic(t) ? ' dir="rtl" lang="ar"' : "";
  }
  function vars(t) {
    return [
      "--bg:" + t.bg, "--surface:" + t.surface, "--ink:" + t.ink, "--muted:" + t.muted,
      "--accent:" + t.accent, "--accent-text:" + t.accentText, "--accent2:" + t.accent2, "--on-accent:" + t.onAccent, "--line:" + t.line,
      "--fd:" + t.fontDisplay, "--fb:" + t.fontBody, "--dw:" + t.displayWeight, "--dc:" + t.displayCase,
      "--dt:" + t.displayTracking, "--r:" + t.radius, "--br:" + t.btnRadius, "--bw:" + t.borderWidth, "--sh:" + t.shadow,
    ].join(";");
  }
  function sp(s, cls, inner, extra) {
    return '<div class="sp ' + cls + '" data-style="' + s.id + '" style="' + vars(s.tokens) + '"' + (extra || "") + ">" + inner + "</div>";
  }
  function copyBtn(text, label, cls) {
    return '<button type="button" class="' + (cls || "copy") + '" data-copy="' + esc(text) + '">' + esc(label) + "</button>";
  }
  function fict(s) {
    return '<span class="fict">Fictional sample brand · ' + esc(s.sampleBrand) + "</span>";
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
  function strip(s, cls) {
    return '<span class="strip ' + (cls || "") + '" aria-hidden="true">' + s.palette.map(function (c) {
      return '<span style="flex:' + c.share + ";background:" + c.hex + '"></span>';
    }).join("") + "</span>";
  }

  /* ---------------------------------------------------------- spec cards */

  function paletteCard(s) {
    var sw = s.palette.map(function (c) {
      return (
        '<li class="swatch"><span class="chip-c" style="background:' + c.hex + '"></span>' +
        '<span class="sw-name">' + esc(c.name) + "</span>" +
        '<span class="sw-share">' + c.share + "%</span>" +
        copyBtn(c.hex, c.hex, "hex") +
        '<span class="sw-role">' + esc(c.role) + "</span></li>"
      );
    }).join("");
    var all = s.palette.map(function (c) { return c.name + " " + c.hex; }).join("\n");
    return (
      '<article class="card span-12"><div class="card-head"><h3>Color palette</h3>' + copyBtn(all, "Copy palette") + "</div>" +
      strip(s) +
      '<p class="hint">Bar widths show the recommended share of each colour in a layout. Select a hex value to copy it.</p>' +
      '<ul class="swatches">' + sw + "</ul>" +
      '<p class="rule-note">' + esc(s.paletteRule) + "</p></article>"
    );
  }

  function tokensCard(s) {
    var rows = TOK.semantic(s).map(function (r) {
      var isColor = /^#/.test(r[1]);
      return (
        "<tr><th scope=\"row\"><code>--avdl-" + r[0] + "</code></th><td>" +
        (isColor ? '<span class="tok-sw" style="background:' + r[1] + '"></span>' : "") +
        copyBtn(r[1], r[1], "hex") + "</td><td>" + esc(r[2]) + "</td></tr>"
      );
    }).join("");
    var formats = [["css", "CSS custom properties", TOK.css(s)], ["json", "Design tokens (W3C JSON)", TOK.json(s)], ["tailwind", "Tailwind config", TOK.tailwind(s)]];
    var tabs = formats.map(function (f, i) {
      return '<details class="code"' + (i === 0 ? " open" : "") + "><summary>" + esc(f[1]) + "</summary>" +
        '<div class="code-bar">' + copyBtn(f[2], "Copy " + f[0].toUpperCase()) + "</div><pre><code>" + esc(f[2]) + "</code></pre></details>";
    }).join("");
    return (
      '<article class="card span-12"><div class="card-head"><h3>Design tokens</h3>' + copyBtn(TOK.css(s), "Copy CSS") + "</div>" +
      '<div class="tok-grid"><div class="tbl"><table class="tok-table"><caption>Semantic tokens</caption><thead><tr><th>Token</th><th>Value</th><th>Use</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<div class="formats">' + tabs + "</div></div></article>"
    );
  }

  function industriesCard(s) {
    return (
      '<article class="card span-4"><h3>Target industries</h3>' + list(s.industries, "plain-list") +
      '<p class="hint">Sample brand in the examples: <strong>' + esc(s.sampleBrand) + "</strong>, " + esc(s.sampleBrandType.toLowerCase()) + ". Invented for demonstration, not client work.</p></article>"
    );
  }

  function fitCard(s) {
    function chips(label, items) {
      return "<div><dt>" + label + '</dt><dd><ul class="kw">' + items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></dd></div>";
    }
    return '<article class="card span-8"><h3>Where it fits</h3><dl class="fit">' +
      chips("Sectors", s.sectors) + chips("Mood", s.moods) + chips("Strongest applications", s.applications) + "</dl></article>";
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
    return (
      '<article class="card span-12 type-card"><h3>Typography</h3><div class="type-grid">' +
      sp(s, "type-spec",
        '<div class="aa"><span class="d">Aa</span><span class="aa-body">Aa</span></div>' +
        '<p class="d type-head"' + dirOf(head) + ">" + rich(head) + "</p>" +
        '<p class="type-body">' + esc(s.website.hero.sub) + "</p>" +
        '<p class="type-label">' + esc(ty.display.family) + " · " + esc(ty.body.family) + "</p>") +
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
      '<article class="card span-6"><h3>Layout rules</h3><dl class="facts">' +
      "<div><dt>Grid</dt><dd>" + esc(l.grid) + "</dd></div>" +
      "<div><dt>Spacing</dt><dd>" + esc(l.spacing) + "</dd></div>" +
      "<div><dt>Corners</dt><dd>" + esc(l.radius) + "</dd></div></dl>" + list(l.rules) + "</article>"
    );
  }

  function graphicsCard(s) {
    return (
      '<article class="card span-6"><h3>Graphic elements</h3>' + sp(s, "gfx-spec", motif(s)) +
      '<p class="hint">Shown: ' + esc(s.motif.toLowerCase()) + ".</p>" + list(s.graphics) + "</article>"
    );
  }

  function photoCard(s) {
    var p = s.photography;
    return (
      '<article class="card span-12"><h3>Photography direction</h3>' +
      '<p class="lede">' + esc(p.summary) + "</p>" +
      '<div class="shots">' + p.shots.map(function (sh) { return sp(s, "shot-wrap", photo(sh, "shot")); }).join("") + "</div>" +
      '<p class="hint">Frames are art-direction placeholders: the colours show the target grade, and the caption is the shot brief.</p>' +
      '<div class="two-col"><div><h4>Direction</h4>' + list(p.rules) + "</div>" +
      "<div><h4>Avoid</h4>" + list(p.avoid, "rules avoid") + "</div></div></article>"
    );
  }

  /* ------------------------------------------------------- example boards */

  function uiBoard(s) {
    var u = s.ui;
    var tags = u.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    return sp(s, "ui-board",
      '<div class="ui-group"><span class="grp">Buttons</span><div class="btn-row">' +
      '<span class="btn">' + esc(u.primary) + '</span><span class="btn sec">' + esc(u.secondary) + "</span></div></div>" +
      '<div class="ui-group"><span class="grp">Input</span><div class="field"><span class="field-label">' + esc(u.inputLabel) + '</span><span class="field-box">' + esc(u.inputValue) + "</span></div></div>" +
      '<div class="ui-group"><span class="grp">Tags</span><div class="tag-row">' + tags + "</div></div>" +
      '<div class="ui-group"><span class="grp">Card</span><div class="ui-card">' + photo(s.photography.shots[0], "card-ph") +
      '<div class="ui-card-body"><span class="ui-card-meta">' + esc(u.card.meta) + '</span><span class="d ui-card-title">' + esc(u.card.title) + '</span><span class="ui-card-price">' + esc(u.card.price) + "</span></div></div></div>");
  }

  function socialBoard(s) {
    var so = s.social;
    var sh = s.photography.shots;
    var feed =
      '<figure class="fr-wrap">' + sp(s, "fr feed", motif(s) +
      '<div class="fr-body"><span class="eyebrow"' + dirOf(so.feed.eyebrow) + ">" + esc(so.feed.eyebrow) + "</span>" +
      '<span class="d fr-head">' + rich(so.feed.headline) + "</span>" +
      (so.feed.body ? '<span class="fr-text">' + esc(so.feed.body) + "</span>" : "") + "</div>" +
      '<span class="fr-logo">' + brandMark(s) + "</span>") + "<figcaption>Feed post · 1080 × 1080</figcaption></figure>";
    var story =
      '<figure class="fr-wrap">' + sp(s, "fr story", photo(sh[1], "fill") +
      '<div class="fr-body over"><span class="eyebrow"' + dirOf(so.story.eyebrow) + ">" + esc(so.story.eyebrow) + "</span>" +
      '<span class="d fr-head">' + rich(so.story.headline) + '</span><span class="btn">' + esc(so.story.cta) + "</span></div>") +
      "<figcaption>Story · 1080 × 1920</figcaption></figure>";
    var ad =
      '<figure class="fr-wrap">' + sp(s, "fr ad", photo(sh[2], "top") +
      '<div class="fr-body"><span class="eyebrow"' + dirOf(so.ad.eyebrow) + ">" + esc(so.ad.eyebrow) + "</span>" +
      '<span class="d fr-head">' + rich(so.ad.headline) + '</span><span class="btn">' + esc(so.ad.cta) + "</span></div>") +
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
      '<div class="browser"><div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span class="url">' + esc(s.domain) + "</span></div>" +
      sp(s, "site",
        '<div class="site-nav"><span class="site-logo d">' + esc(rtl && s.sampleBrandArabic ? s.sampleBrandArabic : s.sampleBrand) + '</span><span class="site-links">' + nav + '</span><span class="btn small">' + esc(w.hero.cta) + "</span></div>" +
        '<div class="site-hero"><div class="site-copy"><span class="eyebrow">' + esc(w.hero.eyebrow) + "</span>" +
        '<span class="d site-h1">' + rich(w.hero.headline) + '</span><span class="site-sub" dir="auto">' + esc(w.hero.sub) + "</span>" +
        '<span class="btn-row"><span class="btn">' + esc(w.hero.cta) + '</span><span class="btn sec">' + esc(w.hero.cta2) + "</span></span></div>" +
        '<div class="site-visual">' + photo(s.photography.shots[0], "hero-ph") + motif(s) + "</div></div>" +
        '<div class="site-feats" dir="ltr">' + feats + "</div>", rtl ? ' dir="rtl" lang="ar"' : "") +
      "</div>"
    );
  }

  function adBoard(s) {
    var a = s.advertising;
    var bb = a.billboard;
    var billboard =
      '<figure class="fr-wrap span-all">' + sp(s, "bb", motif(s) +
      '<div class="bb-copy"' + dirOf(bb.headline) + '><span class="eyebrow"' + dirOf(bb.eyebrow) + ">" + esc(bb.eyebrow) + "</span>" +
      '<span class="d bb-head">' + rich(bb.headline) + '</span><span class="bb-cta">' + esc(bb.cta) + "</span></div>" +
      photo(s.photography.shots[1], "hero-ph bb-ph")) +
      "<figcaption>Billboard · 48-sheet · 6096 × 3048 mm (2:1)</figcaption></figure>";
    var mpu =
      '<figure class="fr-wrap">' + sp(s, "mpu", photo(s.photography.shots[2], "top") +
      '<div class="mpu-body"><span class="d mpu-head">' + rich(a.banner.headline) + '</span><span class="btn">' + esc(a.banner.cta) + "</span></div>") +
      "<figcaption>Display · MPU 300 × 250</figcaption></figure>";
    var leader =
      '<figure class="fr-wrap">' + sp(s, "leader", '<span class="leader-logo">' + brandMark(s) + '</span><span class="d leader-head">' + rich(a.banner.headline) + '</span><span class="btn">' + esc(a.banner.cta) + "</span>") +
      "<figcaption>Display · Leaderboard 728 × 90</figcaption></figure>";
    var mobile =
      '<figure class="fr-wrap">' + sp(s, "leader mob", '<span class="d leader-head">' + rich(a.banner.headline) + '</span><span class="btn">' + esc(a.banner.cta) + "</span>") +
      "<figcaption>Display · Mobile 320 × 50</figcaption></figure>";
    return (
      '<div class="campaign"><p class="campaign-name"><span>Campaign</span> ' + esc(a.campaign) + "</p>" +
      '<p class="campaign-idea">' + esc(a.idea) + "</p></div>" +
      '<div class="ad-board">' + billboard + "</div>" +
      '<p class="hint">Display units below are shown at their real pixel sizes relative to each other.</p>' +
      '<div class="display-units">' + leader.replace('fr-wrap"', 'fr-wrap u-728"') + mpu.replace('fr-wrap"', 'fr-wrap u-300"') + mobile.replace('fr-wrap"', 'fr-wrap u-320"') + "</div>"
    );
  }

  function slidesBoard(s) {
    var p = s.presentation;
    var c = p.content;
    var cover =
      '<figure class="fr-wrap">' + sp(s, "slide slide-cover", motif(s) +
      '<div class="slide-copy"' + dirOf(p.cover.title) + '><span class="eyebrow">' + esc(p.cover.kicker) + "</span>" +
      '<span class="d slide-title">' + rich(p.cover.title) + '</span><span class="slide-sub">' + esc(p.cover.sub) + "</span></div>" +
      '<span class="slide-foot"><span>' + brandMark(s) + "</span><span>01</span></span>") +
      "<figcaption>Cover slide · 1920 × 1080</figcaption></figure>";
    var content =
      '<figure class="fr-wrap">' + sp(s, "slide slide-content",
        '<span class="d slide-h">' + esc(c.title) + "</span>" +
        '<div class="slide-cols"><div class="slide-metric"><span class="d metric-value">' + esc(c.metric.value) + '</span><span class="metric-label">' + esc(c.metric.label) + "</span></div>" +
        '<ul class="slide-points">' + c.points.map(function (pt) { return "<li>" + esc(pt) + "</li>"; }).join("") + "</ul></div>" +
        '<span class="slide-foot"><span>Sample data</span><span>02</span></span>') +
      "<figcaption>Content slide · 1920 × 1080</figcaption></figure>";
    return '<div class="slides-board">' + cover + content + "</div>";
  }

  function brandBoard(s) {
    var b = s.brand;
    var front = '<figure class="fr-wrap">' + sp(s, "bc bc-front", motif(s) + '<span class="d bc-mark">' + brandMark(s) + "</span>") + "<figcaption>Business card front · 85 × 55 mm</figcaption></figure>";
    var back =
      '<figure class="fr-wrap">' + sp(s, "bc bc-back",
        '<span class="bc-name d">' + esc(b.person.name) + '</span><span class="bc-role">' + esc(b.person.role) + "</span>" +
        '<span class="bc-contact">' + esc(b.email) + "<br>" + esc(s.domain) + "</span>") +
      "<figcaption>Business card back · 85 × 55 mm</figcaption></figure>";
    var letter =
      '<figure class="fr-wrap letter-wrap">' + sp(s, "letter",
        '<span class="letter-head">' + brandMark(s) + "</span>" +
        '<span class="letter-meta">12 October 2026</span>' +
        '<span class="letter-subj">Re: ' + esc(s.advertising.campaign) + "</span>" +
        '<span class="letter-body">Please find enclosed the proposal we discussed at our last meeting. We look forward to your comments.</span>' +
        '<span class="letter-sign"><span class="d">' + esc(b.person.name) + "</span>" + esc(b.person.role) + "</span>" +
        '<span class="letter-foot">' + esc(s.domain) + "</span>") +
      "<figcaption>Letterhead · A4</figcaption></figure>";
    return (
      '<div class="brand-board">' + front + back + letter + "</div>" +
      '<div class="apps"><h4>Applications</h4><ul class="app-list">' + b.applications.map(function (a) {
        var i = a.indexOf(":");
        return "<li><strong>" + esc(a.slice(0, i)) + "</strong>" + esc(a.slice(i + 1)) + "</li>";
      }).join("") + "</ul></div>"
    );
  }

  /* ---------------------------------------------------------- style page */

  var SECTIONS = [
    ["overview", "Overview"], ["palette", "Palette & tokens"], ["type", "Typography"], ["layout", "Layout & graphics"],
    ["photo", "Photography"], ["social", "Social media"], ["ads", "Advertising"], ["slides", "Presentations"],
    ["web", "Website & UI"], ["brand", "Brand applications"], ["dodont", "Do & don't"],
  ];

  function block(s, id, title, notes, body) {
    return (
      '<section class="app-sec" id="sec-' + id + '" aria-labelledby="h-' + id + '">' +
      '<div class="app-head"><h2 id="h-' + id + '">' + esc(title) + "</h2>" + fict(s) + (notes ? list(notes) : "") + "</div>" +
      '<div class="app-body">' + body + "</div></section>"
    );
  }

  function stylePage(s, i) {
    var n = pad(i + 1);
    var prev = STYLES[(i + STYLES.length - 1) % STYLES.length];
    var next = STYLES[(i + 1) % STYLES.length];
    var nav = SECTIONS.map(function (x) { return '<button type="button" data-goto="sec-' + x[0] + '">' + esc(x[1]) + "</button>"; }).join("");
    return (
      '<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="#">All styles</a><span aria-hidden="true">/</span><span>Style ' + n + "</span></nav>" +
      '<div class="wrap">' +
      '<header class="style-head" id="sec-overview"><div class="sh-left"><p class="label">Style ' + n + "</p>" +
      '<h1 id="style-title" class="style-name" tabindex="-1" style="font-family:' + s.tokens.fontDisplay + '">' + esc(s.name) + "</h1>" +
      '<p class="tagline">' + esc(s.tagline) + "</p></div>" +
      '<div class="sh-right"><h2 class="mini-h">Concept</h2><p class="concept">' + esc(s.concept) + "</p>" +
      '<ul class="kw">' + s.keywords.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul></div></header>" +
      sp(s, "cover", motif(s) + '<div class="cover-copy"><span class="eyebrow">' + esc(s.sampleBrandType) + '</span><span class="d cover-name">' + brandMark(s) + "</span>" +
        '<span class="cover-tag">' + rich(s.social.ad.headline) + "</span></div>") +
      '<p class="cover-note">' + fict(s) + "</p>" +
      "</div>" +
      '<div class="secnav" role="navigation" aria-label="Sections of this style"><div class="wrap">' + nav + "</div></div>" +
      '<div class="wrap">' +
      '<div class="specs">' + fitCard(s) + industriesCard(s) + "</div>" +
      '<div class="specs" id="sec-palette">' + paletteCard(s) + tokensCard(s) + "</div>" +
      '<div class="specs" id="sec-type">' + typographyCard(s) + "</div>" +
      '<div class="specs" id="sec-layout">' + layoutCard(s) + graphicsCard(s) + "</div>" +
      '<div class="specs" id="sec-photo">' + photoCard(s) + "</div>" +
      block(s, "social", "Social media", s.social.notes, socialBoard(s)) +
      block(s, "ads", "Advertising campaign", s.advertising.notes, adBoard(s)) +
      block(s, "slides", "Presentations", s.presentation.notes, slidesBoard(s)) +
      block(s, "web", "Website & UI", s.website.notes.concat(s.ui.notes.slice(0, 2)), websiteBoard(s) + '<h3 class="sub-h">UI components</h3>' + uiBoard(s)) +
      block(s, "brand", "Brand applications", s.brand.notes, brandBoard(s)) +
      '<div class="dodont" id="sec-dodont"><div class="do"><h2>Do</h2>' + list(s.dos) + '</div><div class="dont"><h2>Don’t</h2>' + list(s.donts) + "</div></div>" +
      '<nav class="pager" aria-label="Other styles"><a href="#' + prev.id + '"><span>Previous</span>' + esc(prev.name) + '</a><a href="#">All styles</a><a href="#' + next.id + '"><span>Next</span>' + esc(next.name) + "</a></nav>" +
      "</div>"
    );
  }

  /* ----------------------------------------------------------- catalogue */

  function hay(s) {
    return [s.name, s.tagline, s.sampleBrandType, s.keywords.join(" "), s.industries.join(" "), s.sectors.join(" "), s.moods.join(" "), s.applications.join(" ")].join(" ").toLowerCase();
  }

  function card(s, i) {
    return (
      '<li class="ix" data-id="' + s.id + '"><a href="#' + s.id + '">' +
      sp(s, "mini", motif(s) + '<span class="d mini-name">' + esc(s.name) + "</span>") +
      '<span class="ix-meta"><span class="ix-n">Style ' + pad(i + 1) + '</span><span class="ix-tag">' + esc(s.tagline) + "</span>" +
      strip(s, "sm") +
      '<span class="ix-chips">' + s.moods.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("") + "</span>" +
      '<span class="ix-ind">' + esc(s.sectors.slice(0, 3).join(" · ")) + "</span></span></a></li>"
    );
  }

  function filterGroup(key, label, values, field) {
    var chips = values.map(function (v) {
      var n = STYLES.filter(function (s) { return s[field].indexOf(v) !== -1; }).length;
      if (!n) return "";
      return '<button type="button" data-value="' + esc(v) + '" aria-pressed="false">' + esc(v) + ' <span class="n">' + n + "</span></button>";
    }).join("");
    return '<fieldset class="fgroup" data-filter="' + key + '" data-field="' + field + '"><legend>' + label + "</legend><div class=\"chips\">" + chips + "</div></fieldset>";
  }

  function catalogue() {
    return (
      '<div class="wrap">' +
      '<div class="tools" role="search">' +
      '<div class="search"><label for="q">Search styles</label><input id="q" type="search" placeholder="Try clinic, coffee, fintech, Ramadan, packaging" autocomplete="off"></div>' +
      filterGroup("sector", "Industry", VOCAB.sectors, "sectors") +
      filterGroup("mood", "Visual mood", VOCAB.moods, "moods") +
      filterGroup("app", "Application", VOCAB.applications, "applications") +
      '<div class="tools-foot"><p id="result-count" aria-live="polite"></p><button type="button" id="clear" class="linkish">Clear search and filters</button></div>' +
      "</div>" +
      '<ul id="results">' + STYLES.map(card).join("") + "</ul>" +
      '<p id="no-results" hidden>No style matches all of those filters. Remove a filter or try a broader word, such as food, health or tech.</p>' +
      '<p class="to-tokens"><a href="#tokens">Compare design tokens for all ten styles</a></p>' +
      "</div>"
    );
  }

  function tokensPage() {
    var keys = [["bg", "Background"], ["surface", "Surface"], ["ink", "Ink"], ["muted", "Muted"], ["accent", "Accent"], ["accentText", "Accent text"], ["accent2", "Accent 2"]];
    var head = keys.map(function (k) { return '<th scope="col">' + k[1] + "</th>"; }).join("");
    var rows = STYLES.map(function (s, i) {
      return '<tr><th scope="row"><a href="#' + s.id + '">' + pad(i + 1) + " " + esc(s.name) + "</a></th>" +
        keys.map(function (k) { var v = s.tokens[k[0]]; return '<td><span class="tok-sw" style="background:' + v + '"></span>' + copyBtn(v, v, "hex") + "</td>"; }).join("") +
        "<td>" + copyBtn(TOK.css(s), "Copy CSS") + "</td></tr>";
    }).join("");
    var all = STYLES.map(function (s) { return TOK.css(s); }).join("\n\n");
    return (
      '<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="#">All styles</a><span aria-hidden="true">/</span><span>Tokens</span></nav>' +
      '<div class="wrap"><header class="page-head"><h1 id="tokens-title" tabindex="-1">Design-token reference</h1>' +
      '<p class="intro">Every style’s semantic colour tokens side by side. Select any value to copy it, or copy a whole style as CSS custom properties. The same tokens are in <code>visual-styles/tokens.css</code> and <code>visual-styles/tokens.json</code>.</p>' +
      copyBtn(all, "Copy all styles as CSS", "copy big") + "</header>" +
      '<div class="tbl wide"><table class="cmp"><caption>Semantic colour tokens by style</caption><thead><tr><th scope="col">Style</th>' + head + '<th scope="col">Export</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<h2 class="sub-h">Type pairings</h2><div class="tbl wide"><table class="cmp"><thead><tr><th scope="col">Style</th><th scope="col">Display</th><th scope="col">Body</th><th scope="col">Arabic</th></tr></thead><tbody>' +
      STYLES.map(function (s) {
        var t = s.typography;
        return '<tr><th scope="row"><a href="#' + s.id + '">' + esc(s.name) + '</a></th><td style="font-family:' + s.tokens.fontDisplay + ';font-size:18px">' + esc(t.display.family) + '</td><td style="font-family:' + s.tokens.fontBody + '">' + esc(t.body.family) + "</td><td>" + esc(t.arabic.family) + "</td></tr>";
      }).join("") + "</tbody></table></div></div>"
    );
  }

  /* ---------------------------------------------------------------- mount */

  var views = {
    catalog: document.getElementById("view-catalog"),
    style: document.getElementById("view-style"),
    tokens: document.getElementById("view-tokens"),
    notfound: document.getElementById("view-notfound"),
  };
  views.catalog.querySelector("[data-slot]").innerHTML = catalogue();
  views.tokens.innerHTML = tokensPage();
  document.getElementById("jump").innerHTML =
    '<a href="#">All styles</a>' + STYLES.map(function (s, i) { return '<a href="#' + s.id + '" data-id="' + s.id + '">' + pad(i + 1) + " " + esc(s.name) + "</a>"; }).join("") + '<a href="#tokens">Tokens</a>';

  window.AVDL_ROUTES = function () {
    return ["#", "#tokens"].concat(STYLES.map(function (s) { return "#" + s.id; }));
  };

  function show(name) {
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
  }

  var rendered = {};
  function route(first) {
    var h = location.hash.replace(/^#/, "");
    var idx = -1;
    STYLES.forEach(function (s, i) { if (s.id === h) idx = i; });
    document.querySelectorAll("#jump a").forEach(function (a) {
      var on = a.getAttribute("href") === "#" + h || (!h && a.getAttribute("href") === "#");
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var focusEl;
    if (idx > -1) {
      var s = STYLES[idx];
      if (rendered.style !== s.id) {
        views.style.innerHTML = stylePage(s, idx);
        rendered.style = s.id;
      }
      show("style");
      document.title = s.name + " · " + LIB;
      focusEl = document.getElementById("style-title");
    } else if (h === "tokens") {
      show("tokens");
      document.title = "Design tokens · " + LIB;
      focusEl = document.getElementById("tokens-title");
    } else if (h === "" || h === "index") {
      show("catalog");
      document.title = LIB;
    } else {
      show("notfound");
      document.title = "Not found · " + LIB;
      focusEl = document.getElementById("nf-title");
    }
    var cur = document.querySelector('#jump a[aria-current="page"]');
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest", inline: "center" });
    if (!first) {
      window.scrollTo(0, 0);
      if (focusEl) focusEl.focus({ preventScroll: true });
    }
  }
  window.addEventListener("hashchange", function () { route(false); });
  route(true);

  /* ------------------------------------------------------------- filters */

  var q = document.getElementById("q");
  var active = { sectors: [], moods: [], applications: [] };
  var hays = {};
  STYLES.forEach(function (s) { hays[s.id] = hay(s); });

  function applyFilters() {
    var term = q.value.trim().toLowerCase();
    var shown = 0;
    document.querySelectorAll("#results .ix").forEach(function (li) {
      var s = STYLES.filter(function (x) { return x.id === li.getAttribute("data-id"); })[0];
      var ok = (!term || hays[s.id].indexOf(term) !== -1) &&
        Object.keys(active).every(function (f) {
          return !active[f].length || active[f].some(function (v) { return s[f].indexOf(v) !== -1; });
        });
      li.hidden = !ok;
      if (ok) shown++;
    });
    document.getElementById("no-results").hidden = shown !== 0;
    document.getElementById("result-count").textContent = "Showing " + shown + " of " + STYLES.length + " styles";
    var any = term || Object.keys(active).some(function (f) { return active[f].length; });
    document.getElementById("clear").hidden = !any;
  }
  q.addEventListener("input", applyFilters);
  document.querySelectorAll(".fgroup").forEach(function (g) {
    var field = g.getAttribute("data-field");
    g.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-value]");
      if (!b) return;
      var v = b.getAttribute("data-value");
      var on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", on ? "true" : "false");
      active[field] = on ? active[field].concat(v) : active[field].filter(function (x) { return x !== v; });
      applyFilters();
    });
  });
  document.getElementById("clear").addEventListener("click", function () {
    q.value = "";
    Object.keys(active).forEach(function (f) { active[f] = []; });
    document.querySelectorAll(".fgroup button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    applyFilters();
    q.focus();
  });
  applyFilters();

  /* ------------------------------------------------- section nav & copy */

  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-goto]");
    if (g) {
      e.preventDefault();
      var t = document.getElementById(g.getAttribute("data-goto"));
      if (t) {
        t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        var h = t.querySelector("h1, h2, h3");
        if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      }
      return;
    }
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    var v = b.getAttribute("data-copy");
    var label = b.textContent;
    function done() {
      b.textContent = "Copied";
      b.classList.add("ok");
      setTimeout(function () { b.textContent = label; b.classList.remove("ok"); }, 1200);
    }
    function fallback() {
      // Clipboard API refused: select the value so the viewer can copy it.
      var pre = b.closest(".code") && b.closest(".code").querySelector("pre");
      selectText(pre || b);
    }
    try {
      navigator.clipboard.writeText(v).then(done, fallback);
    } catch (err) {
      fallback();
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
