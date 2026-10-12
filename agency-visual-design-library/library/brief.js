/*
 * Project brief generator.
 *
 * Turns a selected visual style (a set of rules from styles-data.js) plus a
 * project's inputs into a creative direction, a structured design brief, a
 * reusable AI image-prompt and Markdown.
 *
 * Pure functions, no DOM: used by the page (library/brief-ui.js), by
 * scripts/brief.mjs (command line) and by scripts/test-brief.mjs (tests).
 * Everything is generated locally from rules; nothing here calls an AI service
 * or produces images.
 *
 * Policy encoded below:
 *   - The client's identity is preserved unless identityMode says otherwise:
 *     client colours, fonts and assets always win over the style's.
 *   - Brand assets are never invented. Missing assets become open questions
 *     and placeholders, not made-up values.
 *   - Output is a direction and brief, never final artwork.
 */
(function (w) {
  var STYLES = w.AVDL_STYLES || [];
  var VOCAB = w.AVDL_VOCAB || { sectors: [], applications: [] };

  /* ------------------------------------------------------------ catalogue */

  var PROJECT_TYPES = [
    { id: "identity-new", label: "Brand identity (new)", app: "Brand identity" },
    { id: "identity-refresh", label: "Brand refresh", app: "Brand identity" },
    { id: "campaign", label: "Advertising campaign", app: "Advertising" },
    { id: "social", label: "Social media content", app: "Social media" },
    { id: "web", label: "Website or landing page", app: "Websites" },
    { id: "presentation", label: "Presentation or pitch", app: "Presentations" },
    { id: "packaging", label: "Packaging", app: "Packaging" },
    { id: "event", label: "Event", app: "Events" },
  ];

  var IDENTITY_MODES = [
    { id: "preserve", label: "Preserve the existing identity", help: "Default. Client colours, fonts, logo and devices stay as they are; the style shapes composition, imagery and supporting elements." },
    { id: "evolve", label: "Evolve the identity (client approved)", help: "Keep the core identity; the style may add supporting colours, a secondary typeface and new devices, each marked for approval." },
    { id: "new", label: "Create a new identity (client instructed)", help: "No existing identity to keep. The style's palette and typefaces are proposed as a starting point." },
  ];

  var COLOR_ROLES = ["Primary", "Secondary", "Accent", "Background", "Text", "Neutral"];

  // group = which part of the style's data holds the notes for this deliverable.
  var DELIVERABLES = [
    { id: "social-feed", group: "Social media", label: "Feed post, square", spec: "1080 × 1080 px", ratio: "1:1", safe: "60 px margin all round", notes: "social", guide: "02-social-media/feed-posts/README.md" },
    { id: "social-portrait", group: "Social media", label: "Feed post or ad, portrait", spec: "1080 × 1350 px", ratio: "4:5", safe: "60 px margin; keep the key message in the centre 3:4 for the profile grid", notes: "social", guide: "02-social-media/formats-and-specs/README.md" },
    { id: "social-story", group: "Social media", label: "Story / Reel", spec: "1080 × 1920 px", ratio: "9:16", safe: "Keep text out of the top 250 px and bottom 340 px", notes: "social", guide: "02-social-media/stories-and-reels/README.md" },
    { id: "social-carousel", group: "Social media", label: "Carousel", spec: "1080 × 1350 px per slide, 5–8 slides", ratio: "4:5", safe: "60 px margin; same layout on every slide", notes: "social", guide: "02-social-media/carousels/README.md" },
    { id: "ooh-48", group: "Advertising", label: "Billboard, 48-sheet", spec: "6096 × 3048 mm", ratio: "2:1", safe: "Seven words or fewer; check the media owner's visible area", notes: "advertising", guide: "04-advertising/out-of-home/README.md" },
    { id: "ooh-6", group: "Advertising", label: "Poster, 6-sheet", spec: "1200 × 1800 mm", ratio: "2:3", safe: "Check the media owner's visible area", notes: "advertising", guide: "04-advertising/out-of-home/README.md" },
    { id: "display-mpu", group: "Advertising", label: "Display MPU", spec: "300 × 250 px", ratio: "6:5", safe: "Logo, message and button visible in the end frame", notes: "advertising", guide: "04-advertising/digital-display/README.md" },
    { id: "display-leader", group: "Advertising", label: "Display leaderboard", spec: "728 × 90 px", ratio: "8:1", safe: "One-line headline", notes: "advertising", guide: "04-advertising/digital-display/README.md" },
    { id: "display-mobile", group: "Advertising", label: "Display mobile banner", spec: "320 × 50 px", ratio: "32:5", safe: "Logo, 3–5 words, button", notes: "advertising", guide: "04-advertising/digital-display/README.md" },
    { id: "print-press", group: "Advertising", label: "Press advertisement", spec: "Per publication spec", ratio: "per spec", safe: "3 mm bleed, 5 mm safe margin, CMYK", notes: "advertising", guide: "04-advertising/print/README.md" },
    { id: "web-landing", group: "Website", label: "Campaign landing page", spec: "Desktop 1440 px and phone 390 px", ratio: "16:9 hero", safe: "One primary action above the fold", notes: "website", guide: "03-websites/landing-pages/README.md" },
    { id: "web-home", group: "Website", label: "Website homepage", spec: "Desktop 1440 px and phone 390 px", ratio: "16:9 hero", safe: "No horizontal scroll at 320 px", notes: "website", guide: "03-websites/page-layouts/README.md" },
    { id: "web-ui", group: "Website", label: "UI component set", spec: "Buttons, inputs, cards, navigation with all states", ratio: "n/a", safe: "Focus states at 3:1; 24 px minimum targets", notes: "ui", guide: "03-websites/ui-components/README.md" },
    { id: "deck-pitch", group: "Presentation", label: "Pitch deck", spec: "1920 × 1080 px", ratio: "16:9", safe: "120 px side margins, fixed title position", notes: "presentation", guide: "05-presentations/pitch-decks/README.md" },
    { id: "deck-report", group: "Presentation", label: "Client report", spec: "1920 × 1080 px", ratio: "16:9", safe: "Source and period on every slide", notes: "presentation", guide: "05-presentations/client-reports/README.md" },
    { id: "brand-stationery", group: "Brand applications", label: "Stationery set", spec: "Business card 85 × 55 mm, A4 letterhead, email signature", ratio: "85:55", safe: "3 mm bleed, 4–5 mm safe margin", notes: "brand", guide: "01-branding/stationery/README.md" },
    { id: "brand-packaging", group: "Brand applications", label: "Packaging", spec: "Manufacturer's dieline", ratio: "per dieline", safe: "Respect folds, glue areas and legal panels", notes: "brand", guide: "01-branding/identity-systems/README.md" },
    { id: "brand-signage", group: "Brand applications", label: "Signage and wayfinding", spec: "Per site survey", ratio: "per site", safe: "Letter height for viewing distance; local accessibility code", notes: "brand", guide: "01-branding/identity-systems/README.md" },
    { id: "brand-guidelines", group: "Brand applications", label: "Brand guidelines document", spec: "A4 landscape PDF + web version", ratio: "n/a", safe: "See the 12-section structure", notes: "brand", guide: "01-branding/brand-guidelines/README.md" },
  ];

  var ASSETS = [
    { id: "logo", label: "Logo files" },
    { id: "guidelines", label: "Brand guidelines" },
    { id: "fonts", label: "Licensed brand typefaces" },
    { id: "photography", label: "Photography library" },
    { id: "voice", label: "Tone of voice guide" },
  ];

  /* ------------------------------------------------------------- colour */

  var HEX = /^#[0-9A-Fa-f]{6}$/;
  function normHex(h) {
    h = String(h || "").trim();
    if (/^[0-9A-Fa-f]{6}$/.test(h)) h = "#" + h;
    return h.toUpperCase();
  }
  function rgb(hex) {
    return [1, 3, 5].map(function (i) { return parseInt(hex.slice(i, i + 2), 16); });
  }
  function toHex(c) {
    return "#" + c.map(function (v) { return Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"); }).join("").toUpperCase();
  }
  function lum(hex) {
    var v = rgb(hex).map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function contrast(a, b) {
    var x = lum(a), y = lum(b);
    if (x < y) { var t = x; x = y; y = t; }
    return (x + 0.05) / (y + 0.05);
  }
  function mix(hex, toward, t) {
    var a = rgb(hex), b = rgb(toward);
    return toHex(a.map(function (v, i) { return v + (b[i] - v) * t; }));
  }
  // Same hue, darkened or lightened just enough to reach `target` on `bg`.
  function accessibleVariant(hex, bg, target) {
    var toward = lum(bg) > 0.4 ? "#000000" : "#FFFFFF";
    for (var t = 0.02; t <= 1; t += 0.02) {
      var v = mix(hex, toward, t);
      if (contrast(v, bg) >= target) return { hex: v, amount: Math.round(t * 100) };
    }
    return null;
  }
  function fmt(r) {
    return (Math.floor(r * 100) / 100).toFixed(2) + ":1";
  }

  /* ------------------------------------------------------------ helpers */

  function styleById(id) {
    return STYLES.filter(function (s) { return s.id === id; })[0] || null;
  }
  function plain(s) {
    return String(s).replace(/\*/g, "");
  }
  function byId(list, id) {
    return list.filter(function (x) { return x.id === id; })[0] || null;
  }
  function clean(s) {
    return String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  }
  function lcFirst(s) {
    return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  }
  function stripDot(s) {
    return String(s).replace(/\.\s*$/, "");
  }

  /* --------------------------------------------------------- validation */

  function validate(input) {
    var e = [];
    function req(field, label, min) {
      var v = clean(input[field]);
      if (!v) e.push({ field: field, message: label + " is required." });
      else if (min && v.length < min) e.push({ field: field, message: label + " needs at least " + min + " characters so the brief can be specific." });
    }
    if (!styleById(input.styleId)) e.push({ field: "styleId", message: "Choose one of the 10 visual styles." });
    req("projectName", "Project name");
    req("clientName", "Client or brand name");
    if (!byId(PROJECT_TYPES, input.projectType)) e.push({ field: "projectType", message: "Choose a project type." });
    if (!clean(input.industry)) e.push({ field: "industry", message: "Choose an industry." });
    else if (input.industry === "Other" && !clean(input.industryOther)) e.push({ field: "industryOther", message: "Describe the industry." });
    req("audience", "Target audience", 15);
    if (!byId(IDENTITY_MODES, input.identityMode)) e.push({ field: "identityMode", message: "Choose how to treat the existing identity." });
    if (!input.deliverables || !input.deliverables.length) e.push({ field: "deliverables", message: "Select at least one deliverable." });
    (input.deliverables || []).forEach(function (d) { if (!byId(DELIVERABLES, d)) e.push({ field: "deliverables", message: "Unknown deliverable: " + d }); });
    var colors = input.colors || [];
    if (colors.length > 6) e.push({ field: "colors", message: "Enter up to 6 brand colours." });
    colors.forEach(function (c, i) {
      if (!HEX.test(normHex(c.hex))) e.push({ field: "color-" + i, message: "Brand colour " + (i + 1) + ": enter a 6-digit hex value such as #1F4BFF." });
      if (COLOR_ROLES.indexOf(c.role) === -1) e.push({ field: "color-" + i, message: "Brand colour " + (i + 1) + ": choose a role." });
    });
    if (["en", "ar", "bilingual"].indexOf(input.language) === -1) e.push({ field: "language", message: "Choose the project language." });
    return e;
  }

  /* -------------------------------------------------------- colour plan */

  function colourPlan(s, input, mode, open) {
    var t = s.tokens;
    var cs = (input.colors || []).map(function (c) { return { name: clean(c.name) || "Unnamed", hex: normHex(c.hex), role: c.role }; });
    function first(roles) {
      for (var i = 0; i < roles.length; i++) {
        var hit = cs.filter(function (c) { return c.role === roles[i]; })[0];
        if (hit) return hit;
      }
      return null;
    }
    var styleSource = mode === "new" ? "Style palette (proposal for the new identity)" : "Style palette (supporting proposal, needs client approval)";
    function slot(role, use, clientRoles, styleHex, styleName, allowStyle) {
      var c = first(clientRoles);
      if (c) return { role: role, use: use, hex: c.hex, name: c.name, source: "Client brand colour (" + c.role.toLowerCase() + ")", client: true };
      if (!allowStyle) return { role: role, use: use, hex: null, name: "Not provided", source: "Request from client", client: false };
      return { role: role, use: use, hex: styleHex, name: styleName, source: styleSource, client: false };
    }
    function nameOf(hex) {
      var p = s.palette.filter(function (x) { return x.hex.toUpperCase() === hex.toUpperCase(); })[0];
      if (p) return p.name;
      var t2 = s.tokens;
      return hex.toUpperCase() === t2.surface.toUpperCase() ? s.name + " surface" : hex.toUpperCase() === t2.muted.toUpperCase() ? s.name + " muted" : s.name + " neutral";
    }
    // The brand's own colours are never replaced in preserve/evolve mode.
    var brandAllowed = mode === "new";
    var accentSlot = slot("Accent", "Brand colour: actions, highlights, key shapes", ["Primary", "Accent"], t.accent, nameOf(t.accent), brandAllowed);
    var secondarySlot = slot("Secondary", "Secondary brand colour", ["Secondary", "Accent"], t.accent2, nameOf(t.accent2), mode !== "preserve");

    // Neutrals must work with the client's own colours, so they are chosen by
    // contrast against the real background, not copied from the style blindly.
    var bgC = first(["Background"]), inkC = first(["Text"]), neuC = first(["Neutral"]);
    function clientSlot(role, use, c, why) {
      return { role: role, use: use, hex: c.hex, name: c.name, source: "Client brand colour (" + c.role.toLowerCase() + ")" + (why ? ", " + why : ""), client: true };
    }
    function pick(role, use, against) {
      // 1. a client colour that already reads well (7:1+), 2. a style colour at AA, 3. near-black or white.
      var clientCands = cs.filter(function (c) { return c.role !== "Background" && c.hex !== against; })
        .map(function (c) { return { c: c, r: contrast(c.hex, against) }; }).sort(function (a, b) { return b.r - a.r; });
      if (clientCands.length && clientCands[0].r >= 7) return clientSlot(role, use, clientCands[0].c, "chosen for contrast");
      var styleCands = [t.ink, t.bg, t.surface].concat(s.palette.map(function (x) { return x.hex; }))
        .map(function (h) { return { h: h.toUpperCase(), r: contrast(h, against) }; }).sort(function (a, b) { return b.r - a.r; });
      if (styleCands[0].r >= 4.5) return { role: role, use: use, hex: styleCands[0].h, name: nameOf(styleCands[0].h), source: styleSource + ", chosen for contrast", client: false };
      var neutral = contrast("#111111", against) >= contrast("#FFFFFF", against) ? "#111111" : "#FFFFFF";
      return { role: role, use: use, hex: neutral, name: neutral === "#111111" ? "Near-black" : "White", source: "Neutral chosen for contrast, needs client approval", client: false };
    }
    var bgSlot, inkSlot;
    if (bgC) bgSlot = clientSlot("Background", "Page and canvas background", bgC);
    if (inkC) inkSlot = clientSlot("Text", "Headlines and body text", inkC);
    if (!bgC && !inkC) {
      bgSlot = { role: "Background", use: "Page and canvas background", hex: t.bg, name: nameOf(t.bg), source: styleSource, client: false };
      inkSlot = { role: "Text", use: "Headlines and body text", hex: t.ink, name: nameOf(t.ink), source: styleSource, client: false };
    } else if (!inkC) inkSlot = pick("Text", "Headlines and body text", bgSlot.hex);
    else if (!bgC) bgSlot = pick("Background", "Page and canvas background", inkSlot.hex);

    var surfaceSlot = neuC ? clientSlot("Surface", "Cards, panels, secondary areas", neuC)
      : (bgC || inkC) ? { role: "Surface", use: "Cards, panels, secondary areas", hex: mix(bgSlot.hex, inkSlot.hex, 0.06), name: "Tint of the background", source: "Derived from the background, needs client approval", client: false }
        : { role: "Surface", use: "Cards, panels, secondary areas", hex: t.surface, name: nameOf(t.surface), source: styleSource, client: false };
    var mutedHex = inkSlot.hex;
    for (var m = 0.05; m < 0.9; m += 0.05) {
      var cand = mix(inkSlot.hex, bgSlot.hex, m);
      if (contrast(cand, bgSlot.hex) < 4.6) break;
      mutedHex = cand;
    }
    var mutedSlot = { role: "Muted text", use: "Captions, secondary text", hex: mutedHex, name: "Softened text colour", source: "Derived from the text colour, kept at AA on the background", client: false };

    var slots = [accentSlot, secondarySlot, bgSlot, inkSlot, surfaceSlot, mutedSlot];
    // A secondary that is the same colour as the accent adds nothing.
    if (slots[1].hex && slots[0].hex && slots[1].hex === slots[0].hex) slots[1] = { role: "Secondary", use: "Secondary brand colour", hex: null, name: "Not needed", source: "Only one brand colour supplied", client: false };

    var extra = cs.filter(function (c) {
      return !slots.some(function (sl) { return sl.client && sl.hex === c.hex && sl.name === c.name; });
    });

    var accent = slots[0], bg = slots[2], ink = slots[3], surface = slots[4], muted = slots[5];
    var checks = [];
    var notes = [];
    if (!accent.hex) open.push("The client's primary brand colour was not provided. Request the official values (HEX, CMYK and spot) before any design work.");
    if (bg.hex && ink.hex) {
      var r1 = contrast(ink.hex, bg.hex);
      checks.push(["Text on background", ink.hex + " on " + bg.hex, fmt(r1), r1 >= 4.5 ? "Pass (AA)" : "Fails AA: choose a darker text or lighter background"]);
      if (r1 < 4.5) open.push("Text colour on background is " + fmt(r1) + ". Agree an accessible text/background pair with the client.");
    }
    if (bg.hex && muted.hex) {
      var r2 = contrast(muted.hex, bg.hex);
      checks.push(["Secondary text on background", muted.hex + " on " + bg.hex, fmt(r2), r2 >= 4.5 ? "Pass (AA)" : "Fails AA for small text"]);
    }
    if (accent.hex && bg.hex) {
      var r3 = contrast(accent.hex, bg.hex);
      var verdict;
      if (r3 >= 4.5) verdict = "Pass: usable for text";
      else if (r3 >= 3) verdict = "Large text (24 px+) and graphics only";
      else verdict = "Fills and shapes only, not text";
      checks.push(["Brand colour as text on background", accent.hex + " on " + bg.hex, fmt(r3), verdict]);
      if (r3 < 4.5) {
        var v = accessibleVariant(accent.hex, bg.hex, 4.5);
        if (v) notes.push("For small text in the brand colour, an accessible variant of the same hue is " + v.hex + " (" + v.amount + "% toward " + (lum(bg.hex) > 0.4 ? "black" : "white") + ", " + fmt(contrast(v.hex, bg.hex)) + " on the background). It is a suggestion only: it changes the brand colour, so use it only if the client approves; otherwise set small text in the text colour.");
      }
    }
    if (accent.hex) {
      var onW = contrast("#FFFFFF", accent.hex);
      var onI = ink.hex ? contrast(ink.hex, accent.hex) : 0;
      var best = onW >= onI ? { hex: "#FFFFFF", r: onW, name: "white" } : { hex: ink.hex, r: onI, name: "the text colour" };
      checks.push(["Text on brand-colour fills (buttons)", best.hex + " on " + accent.hex, fmt(best.r), best.r >= 4.5 ? "Pass: use " + best.name : best.r >= 3 ? "Large or bold text only (" + best.name + ")" : "Fails: avoid text on this fill"]);
      if (best.r < 4.5) open.push("Text on the brand colour reaches only " + fmt(best.r) + ". Decide with the client how buttons and labels on brand-colour fills are handled.");
    }

    function share(hex) {
      if (!hex) return 0;
      var p = s.palette.filter(function (x) { return x.hex.toUpperCase() === hex.toUpperCase(); })[0];
      return p ? p.share : 0;
    }
    var aShare = share(t.accent), bShare = share(t.bg), iShare = share(t.ink);
    var proportions = "About " + bShare + "% background, " + iShare + "% text and dark areas, " + aShare + "% brand accent, with the rest in supporting tones (the " + s.name + " ratio).";
    // The style's palette rule names the style's own colours; with a client palette only its intent applies.
    var styleRule = mode === "new" && !cs.length ? s.paletteRule : "Style rule, written for the " + s.name + " palette (apply its intent to the colours above): " + s.paletteRule;

    return { slots: slots, extra: extra, checks: checks, notes: notes, proportions: proportions, styleRule: styleRule };
  }

  /* ------------------------------------------------------------- generate */

  function generate(input, options) {
    options = options || {};
    var errors = validate(input);
    if (errors.length) return { ok: false, errors: errors };

    var s = styleById(input.styleId);
    var pt = byId(PROJECT_TYPES, input.projectType);
    var mode = input.identityMode;
    var modeInfo = byId(IDENTITY_MODES, mode);
    var industry = input.industry === "Other" ? clean(input.industryOther) : input.industry;
    var assets = input.assets || {};
    var fonts = input.fonts || {};
    var lang = input.language;
    var dels = input.deliverables.map(function (d) { return byId(DELIVERABLES, d); });
    var date = options.date || new Date().toISOString().slice(0, 10);
    var client = clean(input.clientName);
    var project = clean(input.projectName);
    var audience = clean(input.audience);

    var warnings = [];
    var open = [];

    /* fit check: styles are rules for specific contexts */
    var sectorFit = s.sectors.indexOf(industry) !== -1;
    var appFit = s.applications.indexOf(pt.app) !== -1;
    var alternatives = STYLES.filter(function (x) { return x.id !== s.id && x.sectors.indexOf(industry) !== -1 && x.applications.indexOf(pt.app) !== -1; }).map(function (x) { return x.name; });
    if (!sectorFit) warnings.push(industry + " is not one of " + s.name + "'s listed sectors (" + s.sectors.join(", ") + "). Write down why the style fits this client before presenting it." + (alternatives.length ? " Styles listed for this sector and project type: " + alternatives.join(", ") + "." : ""));
    if (!appFit) warnings.push(pt.app + " is not one of " + s.name + "'s strongest applications (" + s.applications.join(", ") + "). Expect more adaptation work.");
    if (mode === "preserve" && input.projectType === "identity-new") warnings.push("Project type is a new identity but identity handling is set to preserve. The brief keeps the client's existing assets. If the client has asked for a new identity, change identity handling to 'Create a new identity'.");
    if (mode === "new" && (input.colors || []).length) warnings.push("Identity handling is 'new identity' but brand colours were supplied. They are still used first, with the style's palette filling any gaps.");

    /* assets: never invent */
    if (!assets.logo) open.push("No logo files supplied. Request vector logo files and usage rules. Until then, layouts use a box labelled CLIENT LOGO; never draw or imitate a logo.");
    if (!assets.guidelines && mode !== "new") open.push("No brand guidelines supplied. Request them: they override this brief wherever the two disagree.");
    if (!assets.photography) open.push("No photography library supplied. Confirm budget for a shoot or licensed stock, using the shot list in this brief.");
    if (!assets.voice) open.push("No tone of voice guide supplied. Confirm the copy tone with the client; this brief's tone notes are a starting point.");

    var colours = colourPlan(s, input, mode, open);

    /* typography */
    var ty = s.typography;
    var typeRows = [];
    var typeNotes = [];
    var hasClientFonts = clean(fonts.headline) || clean(fonts.body);
    if (hasClientFonts) {
      typeRows.push(["Headlines", clean(fonts.headline) || "Client body face (no separate headline face supplied)", "Client typeface"]);
      typeRows.push(["Body and UI", clean(fonts.body) || clean(fonts.headline), "Client typeface"]);
      typeNotes.push("Keep the client's typefaces. Apply the " + s.name + " hierarchy to them: the scale, weights, case and tracking below are the style's rules, not its fonts.");
      if (mode === "preserve") typeNotes.push(s.name + "'s own faces (" + ty.display.family + ", " + ty.body.family + ") describe the character to aim for. Do not swap them in.");
      if (mode === "evolve") typeNotes.push("Optional, for approval: " + ty.display.family + " as a secondary display face for campaign headlines only.");
    } else if (mode === "preserve") {
      typeRows.push(["Headlines", "Client typeface (not supplied)", "Request from client"]);
      typeRows.push(["Body and UI", "Client typeface (not supplied)", "Request from client"]);
      typeNotes.push("The sizes, weights, case and tracking below are " + s.name + "'s hierarchy. Apply them to the client's typefaces once supplied; the font names in the table are the style's own and are listed for reference only.");
      open.push("The client's typefaces were not provided. Request the font names and licences. Use " + ty.display.family + " and " + ty.body.family + " only for internal concept sketches, never in client-facing work, until this is resolved.");
    } else {
      typeRows.push(["Headlines", ty.display.family + " (" + ty.display.weights + ")", mode === "new" ? "Style proposal" : "Style proposal, for approval"]);
      typeRows.push(["Body and UI", ty.body.family + " (" + ty.body.weights + ")", mode === "new" ? "Style proposal" : "Style proposal, for approval"]);
      if (ty.utility) typeRows.push(["Utility", ty.utility.family, "Style proposal"]);
      typeNotes.push("All proposed faces are licensed under the SIL Open Font License (see 06-assets/font-licenses).");
    }
    if (lang !== "en") {
      if (clean(fonts.arabic)) typeRows.push(["Arabic", clean(fonts.arabic), "Client typeface"]);
      else {
        typeRows.push(["Arabic", ty.arabic.family, "Style proposal: confirm with the client"]);
        open.push("No Arabic typeface supplied. " + ty.arabic.family + " is the style's suggested pairing; confirm it with the client, or request their Arabic brand font.");
      }
      typeNotes.push(ty.arabic.note);
    }
    var scaleRows = ty.scale.map(function (r) { return [r.level, r.size, r.weight, r.detail]; });

    /* direction statement */
    var direction =
      "Apply " + s.name + " (" + lcFirst(stripDot(s.tagline)) + ") to " + client + "'s " + pt.label.toLowerCase() +
      " for " + audience.replace(/\.$/, "") + ". " + s.concept +
      (mode === "preserve" ? " The client's existing logo, colours and typefaces stay as they are; the style governs composition, imagery, hierarchy and supporting graphic elements." :
        mode === "evolve" ? " The client's core identity stays; the style may extend it with supporting elements that the client approves." :
          " With no existing identity to keep, the style's palette and typefaces are the starting proposal.");
    var principles = s.layout.rules.slice(0, 3).concat(s.dos.slice(0, 2));

    /* deliverables */
    var notesFor = {
      social: s.social.notes, advertising: s.advertising.notes, presentation: s.presentation.notes,
      website: s.website.notes, ui: s.ui.notes, brand: s.brand.notes,
    };
    var delRows = dels.map(function (d) { return [d.label, d.spec, d.ratio, d.safe, d.guide]; });
    var delNotes = [];
    var seen = {};
    dels.forEach(function (d) {
      if (seen[d.notes]) return;
      seen[d.notes] = true;
      delNotes.push({ title: d.group + ((d.notes === "ui") ? " (UI)" : ""), items: notesFor[d.notes] });
    });

    /* language */
    var langItems = [];
    if (lang === "en") langItems.push("English only. Left-to-right layouts.");
    if (lang === "ar") langItems.push("Arabic only. Right-to-left layouts: mirror the whole grid, navigation and directional icons; keep logos and media controls unmirrored.");
    if (lang === "bilingual") langItems.push("Bilingual Arabic and English. Design both versions together; build the bilingual lockup as fixed artwork; give both languages equal weight unless the client sets a lead language.");
    if (lang !== "en") {
      langItems.push("Arabic text: no letter-spacing, no slanting, line height 1.6–1.8; choose one digit system for the market and keep it.");
      langItems.push("Guide: 00-foundations/arabic-and-rtl/README.md");
    }

    /* copy tone */
    var toneItems = ["Style tone: " + s.keywords.join(", ").toLowerCase() + "."];
    if (clean(input.tone)) toneItems.push("Client tone notes: " + clean(input.tone));
    toneItems.push("Write all copy for " + client + ". Never reuse the library's sample copy or sample brand names.");

    /* imagery */
    var p = s.photography;
    var shotRows = p.shots.map(function (sh) { return [sh.caption, sh.tone.join(" → ")]; });

    /* sections */
    var sections = [];
    function sec(id, title, blocks) { sections.push({ id: id, title: title, blocks: blocks.filter(Boolean) }); }

    sec("summary", "Project summary", [
      { type: "table", head: ["Field", "Value"], rows: [
        ["Project", project], ["Client", client], ["Project type", pt.label], ["Industry", industry],
        ["Target audience", audience], ["Objective", clean(input.objective) || "Not stated: confirm with the client"],
        ["Visual style", s.name + " (style rules from the Agency Visual Design Library)"],
        ["Identity handling", modeInfo.label], ["Language", { en: "English", ar: "Arabic", bilingual: "Arabic and English" }[lang]],
        ["Supplied brand assets", ASSETS.filter(function (a) { return assets[a.id]; }).map(function (a) { return a.label; }).join(", ") || "None"],
      ] },
      clean(input.constraints) ? { type: "p", text: "Mandatory items and constraints: " + clean(input.constraints) } : null,
    ]);

    sec("direction", "Creative direction", [
      { type: "p", text: direction },
      { type: "p", text: "Mood: " + s.moods.join(", ") + ". Keywords: " + s.keywords.join(", ") + "." },
      { type: "h", text: "Principles for this project" },
      { type: "list", items: principles },
      warnings.length ? { type: "h", text: "Fit check" } : { type: "p", text: "Fit check: " + industry + " and " + pt.app.toLowerCase() + " are both listed for " + s.name + "." },
      warnings.length ? { type: "list", items: warnings } : null,
    ]);

    sec("art", "Art direction", [
      { type: "p", text: "Identity handling: " + modeInfo.label.toLowerCase() + ". " + modeInfo.help.replace(/^Default\. /, "") },
      { type: "h", text: "Logo" },
      { type: "p", text: assets.logo ? "Use the supplied logo files exactly as the client's guidelines specify. Do not redraw, recolour, restyle or apply the style's effects to the logo." : "No logo supplied. Use a box labelled CLIENT LOGO in every layout. Do not draw, imitate or generate a logo." },
      { type: "h", text: "Style rules applied" },
      { type: "list", items: s.layout.rules },
    ]);

    sec("colour", "Colour", [
      { type: "swatches", rows: colours.slots.map(function (sl) { return [sl.role, sl.hex, sl.name, sl.source, sl.use]; }) },
      colours.extra.length ? { type: "p", text: "Other client colours, kept as supplied: " + colours.extra.map(function (c) { return c.name + " " + c.hex + " (" + c.role.toLowerCase() + ")"; }).join(", ") + "." } : null,
      { type: "p", text: "Proportions: " + colours.proportions },
      { type: "p", text: colours.styleRule },
      colours.checks.length ? { type: "table", head: ["Check", "Pair", "Contrast", "Result"], rows: colours.checks } : null,
      colours.notes.length ? { type: "list", items: colours.notes } : null,
    ]);

    sec("type", "Typography", [
      { type: "table", head: ["Role", "Typeface", "Source"], rows: typeRows },
      { type: "list", items: typeNotes },
      { type: "h", text: "Hierarchy (" + s.name + " scale, desktop px size / line height)" },
      { type: "table", head: ["Level", "Size", "Weight", "Detail"], rows: scaleRows },
      { type: "list", items: ty.rules },
    ]);

    sec("composition", "Composition and layout", [
      { type: "table", head: ["Rule", "Value"], rows: [["Grid", s.layout.grid], ["Spacing", s.layout.spacing], ["Corners", s.layout.radius]] },
      { type: "p", text: "Build every format on this grid, with one idea per frame and the client's logo in a fixed position across the set." },
    ]);

    sec("imagery", "Imagery", [
      { type: "p", text: p.summary },
      assets.photography ? { type: "p", text: "Start from the client's photography library. Select images that meet the direction below before commissioning new work." } : null,
      { type: "list", items: p.rules },
      { type: "h", text: "Reference shots from the style (rewrite each for " + client + "'s subject)" },
      { type: "table", head: ["Reference shot", "Target grade"], rows: shotRows },
      { type: "h", text: "Avoid" },
      { type: "list", items: p.avoid },
    ]);

    sec("graphics", "Graphic elements", [
      { type: "list", items: s.graphics },
      { type: "p", text: mode === "new" ? "These devices can become part of the new identity system." : "Use these as supporting devices only. The client's existing brand devices take priority, and nothing may compete with the logo." },
      (input.colors || []).length ? { type: "p", text: "Where an element names a style colour (gold, red, Clay and so on), draw it in the project palette above instead." } : null,
    ]);

    sec("deliverables", "Deliverables and specifications", [
      { type: "table", head: ["Deliverable", "Size", "Ratio", "Safe area / rule", "Guide"], rows: delRows },
    ].concat(delNotes.map(function (g) { return [{ type: "h", text: g.title + ": " + s.name + " rules" }, { type: "list", items: g.items }]; }).reduce(function (a, b) { return a.concat(b); }, [])));

    sec("copy", "Language and tone", [{ type: "list", items: langItems.concat(toneItems) }]);

    sec("dodont", "Do and don't", [
      { type: "table", head: ["Do", "Don't"], rows: s.dos.map(function (d, i) { return [d, s.donts[i] || ""]; }) },
    ]);

    sec("checks", "Quality checks before presenting", [
      { type: "list", items: [
        "Body text 4.5:1 and large text 3:1 against its background; text over photos checked by eye with a scrim.",
        "Every format inside its safe area; social text readable at 350 px wide.",
        "Logo, colours and typefaces match the client's guidelines" + (mode === "preserve" ? " exactly." : " or the approved changes."),
        "All images licensed or shot for this project; releases recorded.",
        lang !== "en" ? "Arabic set right-to-left with the correct font, line height and digits; checked by a native reader." : "Copy proofread by a second person.",
        "No sample brand names or copy from the library left in the work.",
      ] },
    ]);

    sec("open", "Open questions for the client", [
      open.length ? { type: "list", items: open } : { type: "p", text: "None. All required inputs were supplied." },
    ]);

    sec("status", "Status of this document", [
      { type: "p", text: "This is a creative direction and design brief generated from the " + s.name + " style rules. It is not artwork and nothing in it is final or production-ready. Concepts made from it must be designed, checked against the client's guidelines, and approved by the client before production." },
    ]);

    var prompt = buildPrompt(s, input, colours, dels, industry, pt, client, audience, lang, mode);
    var title = "Creative direction: " + project;
    var result = { ok: true, title: title, subtitle: client + " · " + s.name + " · " + date, styleId: s.id, date: date, sections: sections, prompt: prompt, warnings: warnings, openQuestions: open };
    result.markdown = toMarkdown(result);
    return result;
  }

  /* --------------------------------------------------------------- prompt */

  function buildPrompt(s, input, colours, dels, industry, pt, client, audience, lang, mode) {
    var byHex = {};
    colours.slots.forEach(function (sl) {
      if (!sl.hex) return;
      if (byHex[sl.hex]) byHex[sl.hex].roles.push(sl.role.toLowerCase());
      else byHex[sl.hex] = { name: sl.name, roles: [sl.role.toLowerCase()] };
    });
    var palette = Object.keys(byHex).map(function (h) { return byHex[h].name + " " + h + " (" + byHex[h].roles.join(" and ") + ")"; }).join(", ");
    var ratios = [];
    dels.forEach(function (d) {
      if (/^\d+:\d+$/.test(d.ratio) && !ratios.some(function (r) { return r.ratio === d.ratio; })) ratios.push({ ratio: d.ratio, label: d.label });
    });
    var avoid = s.photography.avoid.concat(s.donts).map(function (x) { return x.toLowerCase(); });
    var lines = [
      "Exploratory visual concept, not final artwork, for " + client + ": " + pt.label.toLowerCase() + " in the " + industry + " sector, for " + audience.replace(/\.$/, "") + ".",
      "Subject: {SUBJECT: describe the scene, product or person for this concept}.",
      "Visual style: " + s.name + " (" + lcFirst(stripDot(s.tagline)) + "). " + s.motif + ".",
      "Mood: " + s.keywords.join(", ").toLowerCase() + ".",
      "Imagery: " + s.photography.summary + " " + s.photography.rules.slice(0, 3).join(" "),
      "Colour: use only this palette: " + (palette || "{CLIENT PALETTE: hex values}") + "." + (mode === "new" && !(input.colors || []).length ? " " + s.paletteRule : ""),
      "Composition: " + s.layout.rules.slice(0, 3).join(" ") + " Leave clear empty space for a headline and a logo.",
      "Graphic elements: " + s.graphics.slice(0, 3).join("; ") + "." + ((input.colors || []).length ? " Draw them in the palette colours above, not in the colours their names suggest." : ""),
      "Do not render any text, letters, numbers, logos, brand marks or watermarks. Typography and the client's logo are added later in layout software.",
      "Aspect ratio: {RATIO}.",
    ];
    if (lang !== "en") lines.splice(8, 0, "If people or places appear, they should be appropriate to an Arabic-speaking audience and shown with dignity.");
    var negative = avoid.concat(["text", "lettering", "logos", "watermarks", "brand names", "distorted hands", "extra fingers"]).join(", ");
    return {
      master: lines.join("\n"),
      negative: negative,
      formats: ratios.map(function (r) { return { ratio: r.ratio, label: r.label }; }),
      usage: [
        "Replace {SUBJECT} with one concrete scene per concept, and {RATIO} with a ratio from the list.",
        "Use the negative prompt field if the tool has one; otherwise append it as 'Avoid: …'.",
        "Results are concept references for internal review. A designer rebuilds the chosen direction with the client's real assets; check the image tool's licence terms before any client use.",
      ],
    };
  }

  /* ------------------------------------------------------------- markdown */

  function mdCell(s) {
    return String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " ");
  }
  function mdTable(head, rows) {
    return ["| " + head.map(mdCell).join(" | ") + " |", "| " + head.map(function () { return "---"; }).join(" | ") + " |"]
      .concat(rows.map(function (r) { return "| " + r.map(mdCell).join(" | ") + " |"; })).join("\n");
  }
  function blockMd(b) {
    if (b.type === "p") return b.text;
    if (b.type === "h") return "**" + b.text + "**";
    if (b.type === "list") return b.items.map(function (i) { return "- " + plain(i); }).join("\n");
    if (b.type === "table") return mdTable(b.head, b.rows);
    if (b.type === "swatches") return mdTable(["Role", "Hex", "Name", "Source", "Use"], b.rows.map(function (r) { return [r[0], r[1] ? "`" + r[1] + "`" : "—", r[2], r[3], r[4]]; }));
    return "";
  }
  function toMarkdown(m) {
    var out = ["# " + m.title, "", "_" + m.subtitle + "_", "",
      "> Generated locally by the Agency Visual Design Library from the selected style's rules. This is a brief, not artwork: no images were generated, and no client assets were created.", ""];
    out.push("## Contents", "");
    m.sections.forEach(function (s, i) { out.push((i + 1) + ". " + s.title); });
    out.push((m.sections.length + 1) + ". AI concept prompt", "");
    m.sections.forEach(function (s) {
      out.push("## " + s.title, "");
      s.blocks.forEach(function (b) { out.push(blockMd(b), ""); });
    });
    out.push("## AI concept prompt", "", "Reusable prompt for exploring visual concepts in an image tool. It produces references, not deliverables.", "", "```text", m.prompt.master, "```", "", "**Negative prompt**", "", "```text", m.prompt.negative, "```", "");
    if (m.prompt.formats.length) out.push("**Aspect ratios for the selected deliverables**", "", m.prompt.formats.map(function (f) { return "- " + f.ratio + ": " + f.label; }).join("\n"), "");
    out.push("**How to use**", "", m.prompt.usage.map(function (u) { return "- " + u; }).join("\n"), "");
    return out.join("\n").replace(/\n{3,}/g, "\n\n");
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "brief";
  }

  w.AVDL_BRIEF = {
    PROJECT_TYPES: PROJECT_TYPES, IDENTITY_MODES: IDENTITY_MODES, COLOR_ROLES: COLOR_ROLES,
    DELIVERABLES: DELIVERABLES, ASSETS: ASSETS,
    validate: validate, generate: generate, toMarkdown: toMarkdown,
    contrast: contrast, accessibleVariant: accessibleVariant, normHex: normHex, slug: slug,
  };
})(typeof window !== "undefined" ? window : globalThis);
