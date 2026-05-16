import we, { useState as F, useEffect as fe, useMemo as uo, useContext as fo, createContext as po, useRef as Rt, Suspense as wi, lazy as Ri, memo as kt, useSyncExternalStore as ki } from "react";
import { createPortal as Ni } from "react-dom";
function xt(t, e) {
  if (!e) return t;
  if (typeof t != "object" || t === null) return e ?? t;
  const r = Array.isArray(t) ? [...t] : { ...t };
  for (const o of Object.keys(e)) {
    const n = t[o], i = e[o];
    i !== void 0 && (n && typeof n == "object" && !Array.isArray(n) && i && typeof i == "object" && !Array.isArray(i) ? r[o] = xt(n, i) : r[o] = i);
  }
  return r;
}
const Si = {
  dark: {
    bg: "#05060A",
    bg2: "#0B0D14",
    panel: "#0E1018",
    panel2: "#141722",
    panelHover: "#1A1E2C",
    ink: "#E8EBF2",
    inkDim: "#8B93A7",
    inkFaint: "#555C6E",
    border: "oklch(0.28 0.015 270)",
    borderStrong: "oklch(0.38 0.02 270)"
  },
  light: {
    bg: "#F4F3EE",
    bg2: "#EDECE6",
    panel: "#FFFFFF",
    panel2: "#F9F8F4",
    panelHover: "#F0EFE9",
    ink: "#0A0B10",
    inkDim: "#5A6275",
    inkFaint: "#9099AA",
    border: "oklch(0.88 0.006 270)",
    borderStrong: "oklch(0.78 0.01 270)"
  }
}, ho = {
  brand: {
    name: "GrowQuest",
    version: "v1.4",
    tagline: "multi-tenant growth OS"
  },
  nav: {
    missions: "Missions",
    leaderboard: "Leaderboard",
    profile: "Profile"
  },
  footer: {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    changelog: "Changelog",
    poweredByPrefix: "Powered by"
  },
  onboarding: {
    eyebrow: "// onboarding · step 1 / 3",
    titleLead: "Become a",
    titleBrand: "",
    titleTrail: "insider.",
    body: "Unlock exclusive perks, shape the roadmap, and earn XP toward rewards. Daily missions, limited drops, and a spin-to-win lootbox — yours when you join.",
    stats: [
      { key: "XP", value: "Daily" },
      { key: "Tiers", value: "4 ranks" },
      { key: "Drops", value: "Weekly" }
    ],
    emailLabel: "work email",
    emailPlaceholder: "you@company.com",
    consent: "I agree to the {terms} and acknowledge the {privacy}.",
    consentTermsLabel: "Terms",
    consentPrivacyLabel: "Privacy Policy",
    cta: "Enter the quest",
    microcopyLeft: "// 2,481 insiders joined this week",
    microcopyRight: "SSO · SAML ok",
    chipPrimary: "QUEST · 01 OPEN",
    chipSecondary: "FOUNDERS COHORT"
  },
  leaderboard: {
    eyebrow: "// season 04 leaderboard",
    title: "The ascent",
    subtitle: "Season resets in 12 days · top 10 receive Oracle airdrop",
    columns: {
      rank: "rank",
      insider: "insider",
      streak: "streak",
      tier: "tier",
      xp: "xp"
    },
    streakEmoji: "🔥",
    youTag: "YOU"
  },
  profile: {
    joinedTag: "JOINED · {month} {year}",
    walletLine: "{wallet} · {handle}",
    activityEyebrow: "// activity",
    xpChartEyebrow: "// xp over 14 days",
    statLabels: {
      totalXP: "Total XP",
      missions: "Missions",
      streak: "Streak",
      rewards: "Rewards"
    },
    badgesEyebrow: "badges",
    badgeUnlocked: "unlocked",
    badgeLocked: "locked",
    tierLadderEyebrow: "// tier ladder",
    tierLabelPrefix: "tier",
    tierXPSuffix: "+ XP"
  },
  missions: {
    sectionEyebrow: "// missions",
    sectionTitle: "Daily quests",
    rewardsEyebrow: "// rewards marketplace",
    rewardsTitle: "Spend your XP",
    rewardsBalance: "balance",
    heroEyebrow: "// current season · week 04",
    heroTitle: "Founders' Path",
    heroSubtitle: "Complete 8 of 12 missions to unlock the Ascendant lootbox.",
    filterLabels: {
      all: "all",
      new: "new",
      ongoing: "ongoing",
      ready: "ready"
    },
    rewardKindLabels: {
      all: "all",
      merch: "merch",
      digital: "digital",
      access: "access",
      experience: "experience"
    }
  }
}, Se = {
  mode: "dark",
  brand: {
    primary: "oklch(0.86 0.18 200)",
    secondary: "oklch(0.72 0.25 340)"
  },
  // Default hero imagery. Both onboardingHero and missionsHero ship real
  // branded artwork from the GrowQuest CDN. Dimensions match the actual pane
  // aspect ratios: onboarding flips from portrait at >720px to landscape at
  // ≤720px (grid collapse); missions stays landscape but narrows on mobile.
  // Browsers fetch only the matching URL via <picture><source media>. Tenants
  // override via `config.assets.{onboardingHero,missionsHero}`. If a URL fails
  // to load, HeroMedia falls back to the procedural <HeroArt />. Whether the
  // visible title/subtitle overlay renders on top is controlled by
  // `overrides.heroBanner.overlayMode` ('always' | 'eyebrow-only' | 'never').
  assets: {
    onboardingHero: {
      src: "https://cdn.grow-quest.com/uploads/testing/achievement-illustration%20(1)%20(1).png",
      type: "IMG",
      mobileSrc: "https://cdn.grow-quest.com/uploads/testing/achievement-banner%20(1)%20(1).png"
    },
    missionsHero: {
      src: "https://cdn.grow-quest.com/uploads/testing/missions-header.png",
      type: "IMG",
      mobileSrc: "https://cdn.grow-quest.com/uploads/testing/missions-header-720x360.png"
    }
  }
}, mo = (t, e) => {
  if (typeof t == "number") {
    if (e === 3)
      return {
        mode: "rgb",
        r: (t >> 8 & 15 | t >> 4 & 240) / 255,
        g: (t >> 4 & 15 | t & 240) / 255,
        b: (t & 15 | t << 4 & 240) / 255
      };
    if (e === 4)
      return {
        mode: "rgb",
        r: (t >> 12 & 15 | t >> 8 & 240) / 255,
        g: (t >> 8 & 15 | t >> 4 & 240) / 255,
        b: (t >> 4 & 15 | t & 240) / 255,
        alpha: (t & 15 | t << 4 & 240) / 255
      };
    if (e === 6)
      return {
        mode: "rgb",
        r: (t >> 16 & 255) / 255,
        g: (t >> 8 & 255) / 255,
        b: (t & 255) / 255
      };
    if (e === 8)
      return {
        mode: "rgb",
        r: (t >> 24 & 255) / 255,
        g: (t >> 16 & 255) / 255,
        b: (t >> 8 & 255) / 255,
        alpha: (t & 255) / 255
      };
  }
}, Pi = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  // Added in CSS Colors Level 4:
  // https://drafts.csswg.org/css-color/#changes-from-3
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Oi = (t) => mo(Pi[t.toLowerCase()], 6), Ti = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i, Ci = (t) => {
  let e;
  return (e = t.match(Ti)) ? mo(parseInt(e[1], 16), e[1].length) : void 0;
}, ye = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)", Fe = `${ye}%`, hn = `(?:${ye}%|${ye})`, Mi = `(?:${ye}(deg|grad|rad|turn)|${ye})`, Te = "\\s*,\\s*", Ai = new RegExp(
  `^rgba?\\(\\s*${ye}${Te}${ye}${Te}${ye}\\s*(?:,\\s*${hn}\\s*)?\\)$`
), Di = new RegExp(
  `^rgba?\\(\\s*${Fe}${Te}${Fe}${Te}${Fe}\\s*(?:,\\s*${hn}\\s*)?\\)$`
), Ii = (t) => {
  let e = { mode: "rgb" }, r;
  if (r = t.match(Ai))
    r[1] !== void 0 && (e.r = r[1] / 255), r[2] !== void 0 && (e.g = r[2] / 255), r[3] !== void 0 && (e.b = r[3] / 255);
  else if (r = t.match(Di))
    r[1] !== void 0 && (e.r = r[1] / 100), r[2] !== void 0 && (e.g = r[2] / 100), r[3] !== void 0 && (e.b = r[3] / 100);
  else
    return;
  return r[4] !== void 0 ? e.alpha = Math.max(0, Math.min(1, r[4] / 100)) : r[5] !== void 0 && (e.alpha = Math.max(0, Math.min(1, +r[5]))), e;
}, go = (t, e) => t === void 0 ? void 0 : typeof t != "object" ? Eo(t) : t.mode !== void 0 ? t : e ? { ...t, mode: e } : void 0, xo = (t = "rgb") => (e) => (e = go(e, t)) !== void 0 ? (
  // if the color's mode corresponds to our target mode
  e.mode === t ? (
    // then just return the color
    e
  ) : (
    // otherwise check to see if we have a dedicated
    // converter for the target mode
    pe[e.mode][t] ? (
      // and return its result...
      pe[e.mode][t](e)
    ) : (
      // ...otherwise pass through RGB as an intermediary step.
      // if the target mode is RGB...
      t === "rgb" ? (
        // just return the RGB
        pe[e.mode].rgb(e)
      ) : (
        // otherwise convert color.mode -> RGB -> target_mode
        pe.rgb[t](pe[e.mode].rgb(e))
      )
    )
  )
) : void 0, pe = {}, bo = {}, bt = [], yo = {}, Li = (t) => t, Y = (t) => (pe[t.mode] = {
  ...pe[t.mode],
  ...t.toMode
}, Object.keys(t.fromMode || {}).forEach((e) => {
  pe[e] || (pe[e] = {}), pe[e][t.mode] = t.fromMode[e];
}), t.ranges || (t.ranges = {}), t.difference || (t.difference = {}), t.channels.forEach((e) => {
  if (t.ranges[e] === void 0 && (t.ranges[e] = [0, 1]), !t.interpolate[e])
    throw new Error(`Missing interpolator for: ${e}`);
  typeof t.interpolate[e] == "function" && (t.interpolate[e] = {
    use: t.interpolate[e]
  }), t.interpolate[e].fixup || (t.interpolate[e].fixup = Li);
}), bo[t.mode] = t, (t.parse || []).forEach((e) => {
  qi(e, t.mode);
}), xo(t.mode)), vo = (t) => bo[t], qi = (t, e) => {
  if (typeof t == "string") {
    if (!e)
      throw new Error("'mode' required when 'parser' is a string");
    yo[t] = e;
  } else typeof t == "function" && bt.indexOf(t) < 0 && bt.push(t);
}, tn = /[^\x00-\x7F]|[a-zA-Z_]/, Hi = /[^\x00-\x7F]|[-\w]/, R = {
  Function: "function",
  Ident: "ident",
  Number: "number",
  Percentage: "percentage",
  ParenClose: ")",
  None: "none",
  Hue: "hue",
  Alpha: "alpha"
};
let H = 0;
function Ke(t) {
  let e = t[H], r = t[H + 1];
  return e === "-" || e === "+" ? /\d/.test(r) || r === "." && /\d/.test(t[H + 2]) : e === "." ? /\d/.test(r) : /\d/.test(e);
}
function rn(t) {
  if (H >= t.length)
    return !1;
  let e = t[H];
  if (tn.test(e))
    return !0;
  if (e === "-") {
    if (t.length - H < 2)
      return !1;
    let r = t[H + 1];
    return !!(r === "-" || tn.test(r));
  }
  return !1;
}
const Ui = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 9 / 10,
  turn: 360
};
function Le(t) {
  let e = "";
  if ((t[H] === "-" || t[H] === "+") && (e += t[H++]), e += Je(t), t[H] === "." && /\d/.test(t[H + 1]) && (e += t[H++] + Je(t)), (t[H] === "e" || t[H] === "E") && ((t[H + 1] === "-" || t[H + 1] === "+") && /\d/.test(t[H + 2]) ? e += t[H++] + t[H++] + Je(t) : /\d/.test(t[H + 1]) && (e += t[H++] + Je(t))), rn(t)) {
    let r = yt(t);
    return r === "deg" || r === "rad" || r === "turn" || r === "grad" ? { type: R.Hue, value: e * Ui[r] } : void 0;
  }
  return t[H] === "%" ? (H++, { type: R.Percentage, value: +e }) : { type: R.Number, value: +e };
}
function Je(t) {
  let e = "";
  for (; /\d/.test(t[H]); )
    e += t[H++];
  return e;
}
function yt(t) {
  let e = "";
  for (; H < t.length && Hi.test(t[H]); )
    e += t[H++];
  return e;
}
function zi(t) {
  let e = yt(t);
  return t[H] === "(" ? (H++, { type: R.Function, value: e }) : e === "none" ? { type: R.None, value: void 0 } : { type: R.Ident, value: e };
}
function Fi(t = "") {
  let e = t.trim(), r = [], o;
  for (H = 0; H < e.length; ) {
    if (o = e[H++], o === `
` || o === "	" || o === " ") {
      for (; H < e.length && (e[H] === `
` || e[H] === "	" || e[H] === " "); )
        H++;
      continue;
    }
    if (o === ",")
      return;
    if (o === ")") {
      r.push({ type: R.ParenClose });
      continue;
    }
    if (o === "+") {
      if (H--, Ke(e)) {
        r.push(Le(e));
        continue;
      }
      return;
    }
    if (o === "-") {
      if (H--, Ke(e)) {
        r.push(Le(e));
        continue;
      }
      if (rn(e)) {
        r.push({ type: R.Ident, value: yt(e) });
        continue;
      }
      return;
    }
    if (o === ".") {
      if (H--, Ke(e)) {
        r.push(Le(e));
        continue;
      }
      return;
    }
    if (o === "/") {
      for (; H < e.length && (e[H] === `
` || e[H] === "	" || e[H] === " "); )
        H++;
      let n;
      if (Ke(e) && (n = Le(e), n.type !== R.Hue)) {
        r.push({ type: R.Alpha, value: n });
        continue;
      }
      if (rn(e) && yt(e) === "none") {
        r.push({
          type: R.Alpha,
          value: { type: R.None, value: void 0 }
        });
        continue;
      }
      return;
    }
    if (/\d/.test(o)) {
      H--, r.push(Le(e));
      continue;
    }
    if (tn.test(o)) {
      H--, r.push(zi(e));
      continue;
    }
    return;
  }
  return r;
}
function Bi(t) {
  t._i = 0;
  let e = t[t._i++];
  if (!e || e.type !== R.Function || e.value !== "color" || (e = t[t._i++], e.type !== R.Ident))
    return;
  const r = yo[e.value];
  if (!r)
    return;
  const o = { mode: r }, n = _o(t, !1);
  if (!n)
    return;
  const i = vo(r).channels;
  for (let s = 0, c, l; s < i.length; s++)
    c = n[s], l = i[s], c.type !== R.None && (o[l] = c.type === R.Number ? c.value : c.value / 100, l === "alpha" && (o[l] = Math.max(0, Math.min(1, o[l]))));
  return o;
}
function _o(t, e) {
  const r = [];
  let o;
  for (; t._i < t.length; ) {
    if (o = t[t._i++], o.type === R.None || o.type === R.Number || o.type === R.Alpha || o.type === R.Percentage || e && o.type === R.Hue) {
      r.push(o);
      continue;
    }
    if (o.type === R.ParenClose) {
      if (t._i < t.length)
        return;
      continue;
    }
    return;
  }
  if (!(r.length < 3 || r.length > 4)) {
    if (r.length === 4) {
      if (r[3].type !== R.Alpha)
        return;
      r[3] = r[3].value;
    }
    return r.length === 3 && r.push({ type: R.None, value: void 0 }), r.every((n) => n.type !== R.Alpha) ? r : void 0;
  }
}
function Xi(t, e) {
  t._i = 0;
  let r = t[t._i++];
  if (!r || r.type !== R.Function)
    return;
  let o = _o(t, e);
  if (o)
    return o.unshift(r.value), o;
}
const Eo = (t) => {
  if (typeof t != "string")
    return;
  const e = Fi(t), r = e ? Xi(e, !0) : void 0;
  let o, n = 0, i = bt.length;
  for (; n < i; )
    if ((o = bt[n++](t, r)) !== void 0)
      return o;
  return e ? Bi(e) : void 0;
};
function $i(t, e) {
  if (!e || e[0] !== "rgb" && e[0] !== "rgba")
    return;
  const r = { mode: "rgb" }, [, o, n, i, s] = e;
  if (!(o.type === R.Hue || n.type === R.Hue || i.type === R.Hue))
    return o.type !== R.None && (r.r = o.type === R.Number ? o.value / 255 : o.value / 100), n.type !== R.None && (r.g = n.type === R.Number ? n.value / 255 : n.value / 100), i.type !== R.None && (r.b = i.type === R.Number ? i.value / 255 : i.value / 100), s.type !== R.None && (r.alpha = Math.min(
      1,
      Math.max(
        0,
        s.type === R.Number ? s.value : s.value / 100
      )
    )), r;
}
const Wi = (t) => t === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0, Gi = (t, e, r) => t + r * (e - t), Yi = (t) => {
  let e = [];
  for (let r = 0; r < t.length - 1; r++) {
    let o = t[r], n = t[r + 1];
    o === void 0 && n === void 0 ? e.push(void 0) : o !== void 0 && n !== void 0 ? e.push([o, n]) : e.push(o !== void 0 ? [o, o] : [n, n]);
  }
  return e;
}, Vi = (t) => (e) => {
  let r = Yi(e);
  return (o) => {
    let n = o * r.length, i = o >= 1 ? r.length - 1 : Math.max(Math.floor(n), 0), s = r[i];
    return s === void 0 ? void 0 : t(s[0], s[1], n - i);
  };
}, P = Vi(Gi), re = (t) => {
  let e = !1, r = t.map((o) => o !== void 0 ? (e = !0, o) : 1);
  return e ? r : t;
}, Me = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parse: [
    $i,
    Ci,
    Ii,
    Oi,
    Wi,
    "srgb"
  ],
  serialize: "srgb",
  interpolate: {
    r: P,
    g: P,
    b: P,
    alpha: { use: P, fixup: re }
  },
  gamut: !0,
  white: { r: 1, g: 1, b: 1 },
  black: { r: 0, g: 0, b: 0 }
}, Ft = (t = 0) => Math.pow(Math.abs(t), 563 / 256) * Math.sign(t), Tn = (t) => {
  let e = Ft(t.r), r = Ft(t.g), o = Ft(t.b), n = {
    mode: "xyz65",
    x: 0.5766690429101305 * e + 0.1855582379065463 * r + 0.1882286462349947 * o,
    y: 0.297344975250536 * e + 0.6273635662554661 * r + 0.0752914584939979 * o,
    z: 0.0270313613864123 * e + 0.0706888525358272 * r + 0.9913375368376386 * o
  };
  return t.alpha !== void 0 && (n.alpha = t.alpha), n;
}, Bt = (t) => Math.pow(Math.abs(t), 256 / 563) * Math.sign(t), Cn = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = {
    mode: "a98",
    r: Bt(
      t * 2.0415879038107465 - e * 0.5650069742788597 - 0.3447313507783297 * r
    ),
    g: Bt(
      t * -0.9692436362808798 + e * 1.8759675015077206 + 0.0415550574071756 * r
    ),
    b: Bt(
      t * 0.0134442806320312 - e * 0.1183623922310184 + 1.0151749943912058 * r
    )
  };
  return o !== void 0 && (n.alpha = o), n;
}, Xt = (t = 0) => {
  const e = Math.abs(t);
  return e <= 0.04045 ? t / 12.92 : (Math.sign(t) || 1) * Math.pow((e + 0.055) / 1.055, 2.4);
}, Ae = ({ r: t, g: e, b: r, alpha: o }) => {
  let n = {
    mode: "lrgb",
    r: Xt(t),
    g: Xt(e),
    b: Xt(r)
  };
  return o !== void 0 && (n.alpha = o), n;
}, Re = (t) => {
  let { r: e, g: r, b: o, alpha: n } = Ae(t), i = {
    mode: "xyz65",
    x: 0.4123907992659593 * e + 0.357584339383878 * r + 0.1804807884018343 * o,
    y: 0.2126390058715102 * e + 0.715168678767756 * r + 0.0721923153607337 * o,
    z: 0.0193308187155918 * e + 0.119194779794626 * r + 0.9505321522496607 * o
  };
  return n !== void 0 && (i.alpha = n), i;
}, $t = (t = 0) => {
  const e = Math.abs(t);
  return e > 31308e-7 ? (Math.sign(t) || 1) * (1.055 * Math.pow(e, 1 / 2.4) - 0.055) : t * 12.92;
}, De = ({ r: t, g: e, b: r, alpha: o }, n = "rgb") => {
  let i = {
    mode: n,
    r: $t(t),
    g: $t(e),
    b: $t(r)
  };
  return o !== void 0 && (i.alpha = o), i;
}, ke = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = De({
    r: t * 3.2409699419045226 - e * 1.537383177570094 - 0.4986107602930034 * r,
    g: t * -0.9692436362808796 + e * 1.8759675015077204 + 0.0415550574071756 * r,
    b: t * 0.0556300796969936 - e * 0.2039769588889765 + 1.0569715142428784 * r
  });
  return o !== void 0 && (n.alpha = o), n;
}, Ki = {
  ...Me,
  mode: "a98",
  parse: ["a98-rgb"],
  serialize: "a98-rgb",
  fromMode: {
    rgb: (t) => Cn(Re(t)),
    xyz65: Cn
  },
  toMode: {
    rgb: (t) => ke(Tn(t)),
    xyz65: Tn
  }
}, ae = (t) => (t = t % 360) < 0 ? t + 360 : t, Ji = (t, e) => t.map((r, o, n) => {
  if (r === void 0)
    return r;
  let i = ae(r);
  return o === 0 || t[o - 1] === void 0 ? i : e(i - ae(n[o - 1]));
}).reduce((r, o) => !r.length || o === void 0 || r[r.length - 1] === void 0 ? (r.push(o), r) : (r.push(o + r[r.length - 1]), r), []), me = (t) => Ji(t, (e) => Math.abs(e) <= 180 ? e : e - 360 * Math.sign(e)), ne = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0], Qi = Math.PI / 180, Zi = 180 / Math.PI;
let Mn = ne[3] * ne[4], An = ne[1] * ne[4], Dn = ne[1] * ne[2] - ne[0] * ne[3];
const es = ({ r: t, g: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = (Dn * r + t * Mn - e * An) / (Dn + Mn - An), i = r - n, s = (ne[4] * (e - n) - ne[2] * i) / ne[3], c = {
    mode: "cubehelix",
    l: n,
    s: n === 0 || n === 1 ? void 0 : Math.sqrt(i * i + s * s) / (ne[4] * n * (1 - n))
  };
  return c.s && (c.h = Math.atan2(s, i) * Zi - 120), o !== void 0 && (c.alpha = o), c;
}, ts = ({ h: t, s: e, l: r, alpha: o }) => {
  let n = { mode: "rgb" };
  t = (t === void 0 ? 0 : t + 120) * Qi, r === void 0 && (r = 0);
  let i = e === void 0 ? 0 : e * r * (1 - r), s = Math.cos(t), c = Math.sin(t);
  return n.r = r + i * (ne[0] * s + ne[1] * c), n.g = r + i * (ne[2] * s + ne[3] * c), n.b = r + i * (ne[4] * s + ne[5] * c), o !== void 0 && (n.alpha = o), n;
}, Nt = (t, e) => {
  if (t.h === void 0 || e.h === void 0 || !t.s || !e.s)
    return 0;
  let r = ae(t.h), o = ae(e.h), n = Math.sin((o - r + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(t.s * e.s) * n;
}, rs = (t, e) => {
  if (t.h === void 0 || e.h === void 0)
    return 0;
  let r = ae(t.h), o = ae(e.h);
  return Math.abs(o - r) > 180 ? r - (o - 360 * Math.sign(o - r)) : o - r;
}, St = (t, e) => {
  if (t.h === void 0 || e.h === void 0 || !t.c || !e.c)
    return 0;
  let r = ae(t.h), o = ae(e.h), n = Math.sin((o - r + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(t.c * e.c) * n;
}, ge = (t) => {
  let e = t.reduce(
    (o, n) => {
      if (n !== void 0) {
        let i = n * Math.PI / 180;
        o.sin += Math.sin(i), o.cos += Math.cos(i);
      }
      return o;
    },
    { sin: 0, cos: 0 }
  ), r = Math.atan2(e.sin, e.cos) * 180 / Math.PI;
  return r < 0 ? 360 + r : r;
}, ns = {
  mode: "cubehelix",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--cubehelix"],
  serialize: "--cubehelix",
  ranges: {
    h: [0, 360],
    s: [0, 4.614],
    l: [0, 1]
  },
  fromMode: {
    rgb: es
  },
  toMode: {
    rgb: ts
  },
  interpolate: {
    h: {
      use: P,
      fixup: me
    },
    s: P,
    l: P,
    alpha: {
      use: P,
      fixup: re
    }
  },
  difference: {
    h: Nt
  },
  average: {
    h: ge
  }
}, ve = ({ l: t, a: e, b: r, alpha: o }, n = "lch") => {
  e === void 0 && (e = 0), r === void 0 && (r = 0);
  let i = Math.sqrt(e * e + r * r), s = { mode: n, l: t, c: i };
  return i && (s.h = ae(Math.atan2(r, e) * 180 / Math.PI)), o !== void 0 && (s.alpha = o), s;
}, _e = ({ l: t, c: e, h: r, alpha: o }, n = "lab") => {
  r === void 0 && (r = 0);
  let i = {
    mode: n,
    l: t,
    a: e ? e * Math.cos(r / 180 * Math.PI) : 0,
    b: e ? e * Math.sin(r / 180 * Math.PI) : 0
  };
  return o !== void 0 && (i.alpha = o), i;
}, jo = Math.pow(29, 3) / Math.pow(3, 3), wo = Math.pow(6, 3) / Math.pow(29, 3), te = {
  X: 0.3457 / 0.3585,
  Y: 1,
  Z: (1 - 0.3457 - 0.3585) / 0.3585
}, Pe = {
  X: 0.3127 / 0.329,
  Y: 1,
  Z: (1 - 0.3127 - 0.329) / 0.329
};
let Wt = (t) => Math.pow(t, 3) > wo ? Math.pow(t, 3) : (116 * t - 16) / jo;
const Ro = ({ l: t, a: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = (t + 16) / 116, i = e / 500 + n, s = n - r / 200, c = {
    mode: "xyz65",
    x: Wt(i) * Pe.X,
    y: Wt(n) * Pe.Y,
    z: Wt(s) * Pe.Z
  };
  return o !== void 0 && (c.alpha = o), c;
}, Pt = (t) => ke(Ro(t)), Gt = (t) => t > wo ? Math.cbrt(t) : (jo * t + 16) / 116, ko = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Gt(t / Pe.X), i = Gt(e / Pe.Y), s = Gt(r / Pe.Z), c = {
    mode: "lab65",
    l: 116 * i - 16,
    a: 500 * (n - i),
    b: 200 * (i - s)
  };
  return o !== void 0 && (c.alpha = o), c;
}, Ot = (t) => {
  let e = ko(Re(t));
  return t.r === t.b && t.b === t.g && (e.a = e.b = 0), e;
}, vt = 1, No = 1, $e = 26 / 180 * Math.PI, _t = Math.cos($e), Et = Math.sin($e), So = 100 / Math.log(139 / 100), nn = ({ l: t, c: e, h: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = {
    mode: "lab65",
    l: (Math.exp(t * vt / So) - 1) / 39e-4
  }, i = (Math.exp(0.0435 * e * No * vt) - 1) / 0.075, s = i * Math.cos(r / 180 * Math.PI - $e), c = i * Math.sin(r / 180 * Math.PI - $e);
  return n.a = s * _t - c / 0.83 * Et, n.b = s * Et + c / 0.83 * _t, o !== void 0 && (n.alpha = o), n;
}, an = ({ l: t, a: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = e * _t + r * Et, i = 0.83 * (r * _t - e * Et), s = Math.sqrt(n * n + i * i), c = {
    mode: "dlch",
    l: So / vt * Math.log(1 + 39e-4 * t),
    c: Math.log(1 + 0.075 * s) / (0.0435 * No * vt)
  };
  return c.c && (c.h = ae((Math.atan2(i, n) + $e) / Math.PI * 180)), o !== void 0 && (c.alpha = o), c;
}, In = (t) => nn(ve(t, "dlch")), Ln = (t) => _e(an(t), "dlab"), as = {
  mode: "dlab",
  parse: ["--din99o-lab"],
  serialize: "--din99o-lab",
  toMode: {
    lab65: In,
    rgb: (t) => Pt(In(t))
  },
  fromMode: {
    lab65: Ln,
    rgb: (t) => Ln(Ot(t))
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344]
  },
  interpolate: {
    l: P,
    a: P,
    b: P,
    alpha: {
      use: P,
      fixup: re
    }
  }
}, os = {
  mode: "dlch",
  parse: ["--din99o-lch"],
  serialize: "--din99o-lch",
  toMode: {
    lab65: nn,
    dlab: (t) => _e(t, "dlab"),
    rgb: (t) => Pt(nn(t))
  },
  fromMode: {
    lab65: an,
    dlab: (t) => ve(t, "dlch"),
    rgb: (t) => an(Ot(t))
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360]
  },
  interpolate: {
    l: P,
    c: P,
    h: {
      use: P,
      fixup: me
    },
    alpha: {
      use: P,
      fixup: re
    }
  },
  difference: {
    h: St
  },
  average: {
    h: ge
  }
};
function is({ h: t, s: e, i: r, alpha: o }) {
  t = ae(t !== void 0 ? t : 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.abs(t / 60 % 2 - 1), i;
  switch (Math.floor(t / 60)) {
    case 0:
      i = {
        r: r * (1 + e * (3 / (2 - n) - 1)),
        g: r * (1 + e * (3 * (1 - n) / (2 - n) - 1)),
        b: r * (1 - e)
      };
      break;
    case 1:
      i = {
        r: r * (1 + e * (3 * (1 - n) / (2 - n) - 1)),
        g: r * (1 + e * (3 / (2 - n) - 1)),
        b: r * (1 - e)
      };
      break;
    case 2:
      i = {
        r: r * (1 - e),
        g: r * (1 + e * (3 / (2 - n) - 1)),
        b: r * (1 + e * (3 * (1 - n) / (2 - n) - 1))
      };
      break;
    case 3:
      i = {
        r: r * (1 - e),
        g: r * (1 + e * (3 * (1 - n) / (2 - n) - 1)),
        b: r * (1 + e * (3 / (2 - n) - 1))
      };
      break;
    case 4:
      i = {
        r: r * (1 + e * (3 * (1 - n) / (2 - n) - 1)),
        g: r * (1 - e),
        b: r * (1 + e * (3 / (2 - n) - 1))
      };
      break;
    case 5:
      i = {
        r: r * (1 + e * (3 / (2 - n) - 1)),
        g: r * (1 - e),
        b: r * (1 + e * (3 * (1 - n) / (2 - n) - 1))
      };
      break;
    default:
      i = { r: r * (1 - e), g: r * (1 - e), b: r * (1 - e) };
  }
  return i.mode = "rgb", o !== void 0 && (i.alpha = o), i;
}
function ss({ r: t, g: e, b: r, alpha: o }) {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.max(t, e, r), i = Math.min(t, e, r), s = {
    mode: "hsi",
    s: t + e + r === 0 ? 0 : 1 - 3 * i / (t + e + r),
    i: (t + e + r) / 3
  };
  return n - i !== 0 && (s.h = (n === t ? (e - r) / (n - i) + (e < r) * 6 : n === e ? (r - t) / (n - i) + 2 : (t - e) / (n - i) + 4) * 60), o !== void 0 && (s.alpha = o), s;
}
const cs = {
  mode: "hsi",
  toMode: {
    rgb: is
  },
  parse: ["--hsi"],
  serialize: "--hsi",
  fromMode: {
    rgb: ss
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: P, fixup: me },
    s: P,
    i: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: Nt
  },
  average: {
    h: ge
  }
};
function ls({ h: t, s: e, l: r, alpha: o }) {
  t = ae(t !== void 0 ? t : 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = r + e * (r < 0.5 ? r : 1 - r), i = n - (n - r) * 2 * Math.abs(t / 60 % 2 - 1), s;
  switch (Math.floor(t / 60)) {
    case 0:
      s = { r: n, g: i, b: 2 * r - n };
      break;
    case 1:
      s = { r: i, g: n, b: 2 * r - n };
      break;
    case 2:
      s = { r: 2 * r - n, g: n, b: i };
      break;
    case 3:
      s = { r: 2 * r - n, g: i, b: n };
      break;
    case 4:
      s = { r: i, g: 2 * r - n, b: n };
      break;
    case 5:
      s = { r: n, g: 2 * r - n, b: i };
      break;
    default:
      s = { r: 2 * r - n, g: 2 * r - n, b: 2 * r - n };
  }
  return s.mode = "rgb", o !== void 0 && (s.alpha = o), s;
}
function ds({ r: t, g: e, b: r, alpha: o }) {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.max(t, e, r), i = Math.min(t, e, r), s = {
    mode: "hsl",
    s: n === i ? 0 : (n - i) / (1 - Math.abs(n + i - 1)),
    l: 0.5 * (n + i)
  };
  return n - i !== 0 && (s.h = (n === t ? (e - r) / (n - i) + (e < r) * 6 : n === e ? (r - t) / (n - i) + 2 : (t - e) / (n - i) + 4) * 60), o !== void 0 && (s.alpha = o), s;
}
const us = (t, e) => {
  switch (e) {
    case "deg":
      return +t;
    case "rad":
      return t / Math.PI * 180;
    case "grad":
      return t / 10 * 9;
    case "turn":
      return t * 360;
  }
}, fs = new RegExp(
  `^hsla?\\(\\s*${Mi}${Te}${Fe}${Te}${Fe}\\s*(?:,\\s*${hn}\\s*)?\\)$`
), ps = (t) => {
  let e = t.match(fs);
  if (!e) return;
  let r = { mode: "hsl" };
  return e[3] !== void 0 ? r.h = +e[3] : e[1] !== void 0 && e[2] !== void 0 && (r.h = us(e[1], e[2])), e[4] !== void 0 && (r.s = Math.min(Math.max(0, e[4] / 100), 1)), e[5] !== void 0 && (r.l = Math.min(Math.max(0, e[5] / 100), 1)), e[6] !== void 0 ? r.alpha = Math.max(0, Math.min(1, e[6] / 100)) : e[7] !== void 0 && (r.alpha = Math.max(0, Math.min(1, +e[7]))), r;
};
function hs(t, e) {
  if (!e || e[0] !== "hsl" && e[0] !== "hsla")
    return;
  const r = { mode: "hsl" }, [, o, n, i, s] = e;
  if (o.type !== R.None) {
    if (o.type === R.Percentage)
      return;
    r.h = o.value;
  }
  if (n.type !== R.None) {
    if (n.type === R.Hue)
      return;
    r.s = n.value / 100;
  }
  if (i.type !== R.None) {
    if (i.type === R.Hue)
      return;
    r.l = i.value / 100;
  }
  return s.type !== R.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === R.Number ? s.value : s.value / 100
    )
  )), r;
}
const Po = {
  mode: "hsl",
  toMode: {
    rgb: ls
  },
  fromMode: {
    rgb: ds
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [hs, ps],
  serialize: (t) => `hsl(${t.h !== void 0 ? t.h : "none"} ${t.s !== void 0 ? t.s * 100 + "%" : "none"} ${t.l !== void 0 ? t.l * 100 + "%" : "none"}${t.alpha < 1 ? ` / ${t.alpha}` : ""})`,
  interpolate: {
    h: { use: P, fixup: me },
    s: P,
    l: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: Nt
  },
  average: {
    h: ge
  }
};
function Oo({ h: t, s: e, v: r, alpha: o }) {
  t = ae(t !== void 0 ? t : 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.abs(t / 60 % 2 - 1), i;
  switch (Math.floor(t / 60)) {
    case 0:
      i = { r, g: r * (1 - e * n), b: r * (1 - e) };
      break;
    case 1:
      i = { r: r * (1 - e * n), g: r, b: r * (1 - e) };
      break;
    case 2:
      i = { r: r * (1 - e), g: r, b: r * (1 - e * n) };
      break;
    case 3:
      i = { r: r * (1 - e), g: r * (1 - e * n), b: r };
      break;
    case 4:
      i = { r: r * (1 - e * n), g: r * (1 - e), b: r };
      break;
    case 5:
      i = { r, g: r * (1 - e), b: r * (1 - e * n) };
      break;
    default:
      i = { r: r * (1 - e), g: r * (1 - e), b: r * (1 - e) };
  }
  return i.mode = "rgb", o !== void 0 && (i.alpha = o), i;
}
function To({ r: t, g: e, b: r, alpha: o }) {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.max(t, e, r), i = Math.min(t, e, r), s = {
    mode: "hsv",
    s: n === 0 ? 0 : 1 - i / n,
    v: n
  };
  return n - i !== 0 && (s.h = (n === t ? (e - r) / (n - i) + (e < r) * 6 : n === e ? (r - t) / (n - i) + 2 : (t - e) / (n - i) + 4) * 60), o !== void 0 && (s.alpha = o), s;
}
const Co = {
  mode: "hsv",
  toMode: {
    rgb: Oo
  },
  parse: ["--hsv"],
  serialize: "--hsv",
  fromMode: {
    rgb: To
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: P, fixup: me },
    s: P,
    v: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: Nt
  },
  average: {
    h: ge
  }
};
function ms({ h: t, w: e, b: r, alpha: o }) {
  if (e === void 0 && (e = 0), r === void 0 && (r = 0), e + r > 1) {
    let n = e + r;
    e /= n, r /= n;
  }
  return Oo({
    h: t,
    s: r === 1 ? 1 : 1 - e / (1 - r),
    v: 1 - r,
    alpha: o
  });
}
function gs(t) {
  let e = To(t);
  if (e === void 0) return;
  let r = e.s !== void 0 ? e.s : 0, o = e.v !== void 0 ? e.v : 0, n = {
    mode: "hwb",
    w: (1 - r) * o,
    b: 1 - o
  };
  return e.h !== void 0 && (n.h = e.h), e.alpha !== void 0 && (n.alpha = e.alpha), n;
}
function xs(t, e) {
  if (!e || e[0] !== "hwb")
    return;
  const r = { mode: "hwb" }, [, o, n, i, s] = e;
  if (o.type !== R.None) {
    if (o.type === R.Percentage)
      return;
    r.h = o.value;
  }
  if (n.type !== R.None) {
    if (n.type === R.Hue)
      return;
    r.w = n.value / 100;
  }
  if (i.type !== R.None) {
    if (i.type === R.Hue)
      return;
    r.b = i.value / 100;
  }
  return s.type !== R.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === R.Number ? s.value : s.value / 100
    )
  )), r;
}
const bs = {
  mode: "hwb",
  toMode: {
    rgb: ms
  },
  fromMode: {
    rgb: gs
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [xs],
  serialize: (t) => `hwb(${t.h !== void 0 ? t.h : "none"} ${t.w !== void 0 ? t.w * 100 + "%" : "none"} ${t.b !== void 0 ? t.b * 100 + "%" : "none"}${t.alpha < 1 ? ` / ${t.alpha}` : ""})`,
  interpolate: {
    h: { use: P, fixup: me },
    w: P,
    b: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: rs
  },
  average: {
    h: ge
  }
}, Mo = 203, Tt = 0.1593017578125, Ao = 78.84375, Ct = 0.8359375, Mt = 18.8515625, At = 18.6875;
function Yt(t) {
  if (t < 0) return 0;
  const e = Math.pow(t, 1 / Ao);
  return 1e4 * Math.pow(Math.max(0, e - Ct) / (Mt - At * e), 1 / Tt);
}
function Vt(t) {
  if (t < 0) return 0;
  const e = Math.pow(t / 1e4, Tt);
  return Math.pow((Ct + Mt * e) / (1 + At * e), Ao);
}
const Kt = (t) => Math.max(t / Mo, 0), qn = ({ i: t, t: e, p: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  const n = Yt(
    t + 0.008609037037932761 * e + 0.11102962500302593 * r
  ), i = Yt(
    t - 0.00860903703793275 * e - 0.11102962500302599 * r
  ), s = Yt(
    t + 0.5600313357106791 * e - 0.32062717498731885 * r
  ), c = {
    mode: "xyz65",
    x: Kt(
      2.070152218389422 * n - 1.3263473389671556 * i + 0.2066510476294051 * s
    ),
    y: Kt(
      0.3647385209748074 * n + 0.680566024947227 * i - 0.0453045459220346 * s
    ),
    z: Kt(
      -0.049747207535812 * n - 0.0492609666966138 * i + 1.1880659249923042 * s
    )
  };
  return o !== void 0 && (c.alpha = o), c;
}, Jt = (t = 0) => Math.max(t * Mo, 0), Hn = ({ x: t, y: e, z: r, alpha: o }) => {
  const n = Jt(t), i = Jt(e), s = Jt(r), c = Vt(
    0.3592832590121217 * n + 0.6976051147779502 * i - 0.0358915932320289 * s
  ), l = Vt(
    -0.1920808463704995 * n + 1.1004767970374323 * i + 0.0753748658519118 * s
  ), d = Vt(
    0.0070797844607477 * n + 0.0748396662186366 * i + 0.8433265453898765 * s
  ), u = 0.5 * c + 0.5 * l, h = 1.61376953125 * c - 3.323486328125 * l + 1.709716796875 * d, m = 4.378173828125 * c - 4.24560546875 * l - 0.132568359375 * d, y = { mode: "itp", i: u, t: h, p: m };
  return o !== void 0 && (y.alpha = o), y;
}, ys = {
  mode: "itp",
  channels: ["i", "t", "p", "alpha"],
  parse: ["--ictcp"],
  serialize: "--ictcp",
  toMode: {
    xyz65: qn,
    rgb: (t) => ke(qn(t))
  },
  fromMode: {
    xyz65: Hn,
    rgb: (t) => Hn(Re(t))
  },
  ranges: {
    i: [0, 0.581],
    t: [-0.369, 0.272],
    p: [-0.164, 0.331]
  },
  interpolate: {
    i: P,
    t: P,
    p: P,
    alpha: { use: P, fixup: re }
  }
}, vs = 134.03437499999998, _s = 16295499532821565e-27, Qt = (t) => {
  if (t < 0) return 0;
  let e = Math.pow(t / 1e4, Tt);
  return Math.pow((Ct + Mt * e) / (1 + At * e), vs);
}, Zt = (t = 0) => Math.max(t * 203, 0), Do = ({ x: t, y: e, z: r, alpha: o }) => {
  t = Zt(t), e = Zt(e), r = Zt(r);
  let n = 1.15 * t - 0.15 * r, i = 0.66 * e + 0.34 * t, s = Qt(0.41478972 * n + 0.579999 * i + 0.014648 * r), c = Qt(-0.20151 * n + 1.120649 * i + 0.0531008 * r), l = Qt(-0.0166008 * n + 0.2648 * i + 0.6684799 * r), d = (s + c) / 2, u = {
    mode: "jab",
    j: 0.44 * d / (1 - 0.56 * d) - _s,
    a: 3.524 * s - 4.066708 * c + 0.542708 * l,
    b: 0.199076 * s + 1.096799 * c - 1.295875 * l
  };
  return o !== void 0 && (u.alpha = o), u;
}, Es = 134.03437499999998, Un = 16295499532821565e-27, er = (t) => {
  if (t < 0) return 0;
  let e = Math.pow(t, 1 / Es);
  return 1e4 * Math.pow((Ct - e) / (At * e - Mt), 1 / Tt);
}, tr = (t) => t / 203, Io = ({ j: t, a: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = (t + Un) / (0.44 + 0.56 * (t + Un)), i = er(n + 0.13860504 * e + 0.058047316 * r), s = er(n - 0.13860504 * e - 0.058047316 * r), c = er(n - 0.096019242 * e - 0.8118919 * r), l = {
    mode: "xyz65",
    x: tr(
      1.661373024652174 * i - 0.914523081304348 * s + 0.23136208173913045 * c
    ),
    y: tr(
      -0.3250758611844533 * i + 1.571847026732543 * s - 0.21825383453227928 * c
    ),
    z: tr(-0.090982811 * i - 0.31272829 * s + 1.5227666 * c)
  };
  return o !== void 0 && (l.alpha = o), l;
}, Lo = (t) => {
  let e = Do(Re(t));
  return t.r === t.b && t.b === t.g && (e.a = e.b = 0), e;
}, qo = (t) => ke(Io(t)), js = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parse: ["--jzazbz"],
  serialize: "--jzazbz",
  fromMode: {
    rgb: Lo,
    xyz65: Do
  },
  toMode: {
    rgb: qo,
    xyz65: Io
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134]
  },
  interpolate: {
    j: P,
    a: P,
    b: P,
    alpha: { use: P, fixup: re }
  }
}, zn = ({ j: t, a: e, b: r, alpha: o }) => {
  e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.sqrt(e * e + r * r), i = {
    mode: "jch",
    j: t,
    c: n
  };
  return n && (i.h = ae(Math.atan2(r, e) * 180 / Math.PI)), o !== void 0 && (i.alpha = o), i;
}, Fn = ({ j: t, c: e, h: r, alpha: o }) => {
  r === void 0 && (r = 0);
  let n = {
    mode: "jab",
    j: t,
    a: e ? e * Math.cos(r / 180 * Math.PI) : 0,
    b: e ? e * Math.sin(r / 180 * Math.PI) : 0
  };
  return o !== void 0 && (n.alpha = o), n;
}, ws = {
  mode: "jch",
  parse: ["--jzczhz"],
  serialize: "--jzczhz",
  toMode: {
    jab: Fn,
    rgb: (t) => qo(Fn(t))
  },
  fromMode: {
    rgb: (t) => zn(Lo(t)),
    jab: zn
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360]
  },
  interpolate: {
    h: { use: P, fixup: me },
    c: P,
    j: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: St
  },
  average: {
    h: ge
  }
}, Dt = Math.pow(29, 3) / Math.pow(3, 3), mn = Math.pow(6, 3) / Math.pow(29, 3);
let rr = (t) => Math.pow(t, 3) > mn ? Math.pow(t, 3) : (116 * t - 16) / Dt;
const gn = ({ l: t, a: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = (t + 16) / 116, i = e / 500 + n, s = n - r / 200, c = {
    mode: "xyz50",
    x: rr(i) * te.X,
    y: rr(n) * te.Y,
    z: rr(s) * te.Z
  };
  return o !== void 0 && (c.alpha = o), c;
}, Ge = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = De({
    r: t * 3.1341359569958707 - e * 1.6173863321612538 - 0.4906619460083532 * r,
    g: t * -0.978795502912089 + e * 1.916254567259524 + 0.03344273116131949 * r,
    b: t * 0.07195537988411677 - e * 0.2289768264158322 + 1.405386058324125 * r
  });
  return o !== void 0 && (n.alpha = o), n;
}, Ho = (t) => Ge(gn(t)), Ye = (t) => {
  let { r: e, g: r, b: o, alpha: n } = Ae(t), i = {
    mode: "xyz50",
    x: 0.436065742824811 * e + 0.3851514688337912 * r + 0.14307845442264197 * o,
    y: 0.22249319175623702 * e + 0.7168870538238823 * r + 0.06061979053616537 * o,
    z: 0.013923904500943465 * e + 0.09708128566574634 * r + 0.7140993584005155 * o
  };
  return n !== void 0 && (i.alpha = n), i;
}, nr = (t) => t > mn ? Math.cbrt(t) : (Dt * t + 16) / 116, xn = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = nr(t / te.X), i = nr(e / te.Y), s = nr(r / te.Z), c = {
    mode: "lab",
    l: 116 * i - 16,
    a: 500 * (n - i),
    b: 200 * (i - s)
  };
  return o !== void 0 && (c.alpha = o), c;
}, Uo = (t) => {
  let e = xn(Ye(t));
  return t.r === t.b && t.b === t.g && (e.a = e.b = 0), e;
};
function Rs(t, e) {
  if (!e || e[0] !== "lab")
    return;
  const r = { mode: "lab" }, [, o, n, i, s] = e;
  if (!(o.type === R.Hue || n.type === R.Hue || i.type === R.Hue))
    return o.type !== R.None && (r.l = Math.min(Math.max(0, o.value), 100)), n.type !== R.None && (r.a = n.type === R.Number ? n.value : n.value * 125 / 100), i.type !== R.None && (r.b = i.type === R.Number ? i.value : i.value * 125 / 100), s.type !== R.None && (r.alpha = Math.min(
      1,
      Math.max(
        0,
        s.type === R.Number ? s.value : s.value / 100
      )
    )), r;
}
const bn = {
  mode: "lab",
  toMode: {
    xyz50: gn,
    rgb: Ho
  },
  fromMode: {
    xyz50: xn,
    rgb: Uo
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  },
  parse: [Rs],
  serialize: (t) => `lab(${t.l !== void 0 ? t.l : "none"} ${t.a !== void 0 ? t.a : "none"} ${t.b !== void 0 ? t.b : "none"}${t.alpha < 1 ? ` / ${t.alpha}` : ""})`,
  interpolate: {
    l: P,
    a: P,
    b: P,
    alpha: { use: P, fixup: re }
  }
}, ks = {
  ...bn,
  mode: "lab65",
  parse: ["--lab-d65"],
  serialize: "--lab-d65",
  toMode: {
    xyz65: Ro,
    rgb: Pt
  },
  fromMode: {
    xyz65: ko,
    rgb: Ot
  },
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  }
};
function Ns(t, e) {
  if (!e || e[0] !== "lch")
    return;
  const r = { mode: "lch" }, [, o, n, i, s] = e;
  if (o.type !== R.None) {
    if (o.type === R.Hue)
      return;
    r.l = Math.min(Math.max(0, o.value), 100);
  }
  if (n.type !== R.None && (r.c = Math.max(
    0,
    n.type === R.Number ? n.value : n.value * 150 / 100
  )), i.type !== R.None) {
    if (i.type === R.Percentage)
      return;
    r.h = i.value;
  }
  return s.type !== R.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === R.Number ? s.value : s.value / 100
    )
  )), r;
}
const yn = {
  mode: "lch",
  toMode: {
    lab: _e,
    rgb: (t) => Ho(_e(t))
  },
  fromMode: {
    rgb: (t) => ve(Uo(t)),
    lab: ve
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  },
  parse: [Ns],
  serialize: (t) => `lch(${t.l !== void 0 ? t.l : "none"} ${t.c !== void 0 ? t.c : "none"} ${t.h !== void 0 ? t.h : "none"}${t.alpha < 1 ? ` / ${t.alpha}` : ""})`,
  interpolate: {
    h: { use: P, fixup: me },
    c: P,
    l: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: St
  },
  average: {
    h: ge
  }
}, Ss = {
  ...yn,
  mode: "lch65",
  parse: ["--lch-d65"],
  serialize: "--lch-d65",
  toMode: {
    lab65: (t) => _e(t, "lab65"),
    rgb: (t) => Pt(_e(t, "lab65"))
  },
  fromMode: {
    rgb: (t) => ve(Ot(t), "lch65"),
    lab65: (t) => ve(t, "lch65")
  },
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  }
}, zo = ({ l: t, u: e, v: r, alpha: o }) => {
  e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.sqrt(e * e + r * r), i = {
    mode: "lchuv",
    l: t,
    c: n
  };
  return n && (i.h = ae(Math.atan2(r, e) * 180 / Math.PI)), o !== void 0 && (i.alpha = o), i;
}, Fo = ({ l: t, c: e, h: r, alpha: o }) => {
  r === void 0 && (r = 0);
  let n = {
    mode: "luv",
    l: t,
    u: e ? e * Math.cos(r / 180 * Math.PI) : 0,
    v: e ? e * Math.sin(r / 180 * Math.PI) : 0
  };
  return o !== void 0 && (n.alpha = o), n;
}, Bo = (t, e, r) => 4 * t / (t + 15 * e + 3 * r), Xo = (t, e, r) => 9 * e / (t + 15 * e + 3 * r), Ps = Bo(te.X, te.Y, te.Z), Os = Xo(te.X, te.Y, te.Z), Ts = (t) => t <= mn ? Dt * t : 116 * Math.cbrt(t) - 16, on = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Ts(e / te.Y), i = Bo(t, e, r), s = Xo(t, e, r);
  !isFinite(i) || !isFinite(s) ? n = i = s = 0 : (i = 13 * n * (i - Ps), s = 13 * n * (s - Os));
  let c = {
    mode: "luv",
    l: n,
    u: i,
    v: s
  };
  return o !== void 0 && (c.alpha = o), c;
}, Cs = (t, e, r) => 4 * t / (t + 15 * e + 3 * r), Ms = (t, e, r) => 9 * e / (t + 15 * e + 3 * r), As = Cs(te.X, te.Y, te.Z), Ds = Ms(te.X, te.Y, te.Z), sn = ({ l: t, u: e, v: r, alpha: o }) => {
  if (t === void 0 && (t = 0), t === 0)
    return { mode: "xyz50", x: 0, y: 0, z: 0 };
  e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = e / (13 * t) + As, i = r / (13 * t) + Ds, s = te.Y * (t <= 8 ? t / Dt : Math.pow((t + 16) / 116, 3)), c = s * (9 * n) / (4 * i), l = s * (12 - 3 * n - 20 * i) / (4 * i), d = { mode: "xyz50", x: c, y: s, z: l };
  return o !== void 0 && (d.alpha = o), d;
}, Is = (t) => zo(on(Ye(t))), Ls = (t) => Ge(sn(Fo(t))), qs = {
  mode: "lchuv",
  toMode: {
    luv: Fo,
    rgb: Ls
  },
  fromMode: {
    rgb: Is,
    luv: zo
  },
  channels: ["l", "c", "h", "alpha"],
  parse: ["--lchuv"],
  serialize: "--lchuv",
  ranges: {
    l: [0, 100],
    c: [0, 176.956],
    h: [0, 360]
  },
  interpolate: {
    h: { use: P, fixup: me },
    c: P,
    l: P,
    alpha: { use: P, fixup: re }
  },
  difference: {
    h: St
  },
  average: {
    h: ge
  }
}, Hs = {
  ...Me,
  mode: "lrgb",
  toMode: {
    rgb: De
  },
  fromMode: {
    rgb: Ae
  },
  parse: ["srgb-linear"],
  serialize: "srgb-linear"
}, Us = {
  mode: "luv",
  toMode: {
    xyz50: sn,
    rgb: (t) => Ge(sn(t))
  },
  fromMode: {
    xyz50: on,
    rgb: (t) => on(Ye(t))
  },
  channels: ["l", "u", "v", "alpha"],
  parse: ["--luv"],
  serialize: "--luv",
  ranges: {
    l: [0, 100],
    u: [-84.936, 175.042],
    v: [-125.882, 87.243]
  },
  interpolate: {
    l: P,
    u: P,
    v: P,
    alpha: { use: P, fixup: re }
  }
}, $o = ({ r: t, g: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.cbrt(
    0.412221469470763 * t + 0.5363325372617348 * e + 0.0514459932675022 * r
  ), i = Math.cbrt(
    0.2119034958178252 * t + 0.6806995506452344 * e + 0.1073969535369406 * r
  ), s = Math.cbrt(
    0.0883024591900564 * t + 0.2817188391361215 * e + 0.6299787016738222 * r
  ), c = {
    mode: "oklab",
    l: 0.210454268309314 * n + 0.7936177747023054 * i - 0.0040720430116193 * s,
    a: 1.9779985324311684 * n - 2.42859224204858 * i + 0.450593709617411 * s,
    b: 0.0259040424655478 * n + 0.7827717124575296 * i - 0.8086757549230774 * s
  };
  return o !== void 0 && (c.alpha = o), c;
}, It = (t) => {
  let e = $o(Ae(t));
  return t.r === t.b && t.b === t.g && (e.a = e.b = 0), e;
}, Ve = ({ l: t, a: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = Math.pow(t + 0.3963377773761749 * e + 0.2158037573099136 * r, 3), i = Math.pow(t - 0.1055613458156586 * e - 0.0638541728258133 * r, 3), s = Math.pow(t - 0.0894841775298119 * e - 1.2914855480194092 * r, 3), c = {
    mode: "lrgb",
    r: 4.076741636075957 * n - 3.3077115392580616 * i + 0.2309699031821044 * s,
    g: -1.2684379732850317 * n + 2.6097573492876887 * i - 0.3413193760026573 * s,
    b: -0.0041960761386756 * n - 0.7034186179359362 * i + 1.7076146940746117 * s
  };
  return o !== void 0 && (c.alpha = o), c;
}, Lt = (t) => De(Ve(t));
function cn(t) {
  const o = 1.170873786407767;
  return 0.5 * (o * t - 0.206 + Math.sqrt((o * t - 0.206) * (o * t - 0.206) + 4 * 0.03 * o * t));
}
function jt(t) {
  return (t * t + 0.206 * t) / (1.170873786407767 * (t + 0.03));
}
function zs(t, e) {
  let r, o, n, i, s, c, l, d;
  -1.88170328 * t - 0.80936493 * e > 1 ? (r = 1.19086277, o = 1.76576728, n = 0.59662641, i = 0.75515197, s = 0.56771245, c = 4.0767416621, l = -3.3077115913, d = 0.2309699292) : 1.81444104 * t - 1.19445276 * e > 1 ? (r = 0.73956515, o = -0.45954404, n = 0.08285427, i = 0.1254107, s = 0.14503204, c = -1.2684380046, l = 2.6097574011, d = -0.3413193965) : (r = 1.35733652, o = -915799e-8, n = -1.1513021, i = -0.50559606, s = 692167e-8, c = -0.0041960863, l = -0.7034186147, d = 1.707614701);
  let u = r + o * t + n * e + i * t * t + s * t * e, h = 0.3963377774 * t + 0.2158037573 * e, m = -0.1055613458 * t - 0.0638541728 * e, y = -0.0894841775 * t - 1.291485548 * e;
  {
    let w = 1 + u * h, A = 1 + u * m, T = 1 + u * y, j = w * w * w, k = A * A * A, D = T * T * T, N = 3 * h * w * w, p = 3 * m * A * A, x = 3 * y * T * T, _ = 6 * h * h * w, S = 6 * m * m * A, f = 6 * y * y * T, M = c * j + l * k + d * D, O = c * N + l * p + d * x, C = c * _ + l * S + d * f;
    u = u - M * O / (O * O - 0.5 * M * C);
  }
  return u;
}
function vn(t, e) {
  let r = zs(t, e), o = Ve({ l: 1, a: r * t, b: r * e }), n = Math.cbrt(1 / Math.max(o.r, o.g, o.b)), i = n * r;
  return [n, i];
}
function Fs(t, e, r, o, n, i = null) {
  i || (i = vn(t, e));
  let s;
  if ((r - n) * i[1] - (i[0] - n) * o <= 0)
    s = i[1] * n / (o * i[0] + i[1] * (n - r));
  else {
    s = i[1] * (n - 1) / (o * (i[0] - 1) + i[1] * (n - r));
    {
      let c = r - n, l = o, d = 0.3963377774 * t + 0.2158037573 * e, u = -0.1055613458 * t - 0.0638541728 * e, h = -0.0894841775 * t - 1.291485548 * e, m = c + l * d, y = c + l * u, w = c + l * h;
      {
        let A = n * (1 - s) + s * r, T = s * o, j = A + T * d, k = A + T * u, D = A + T * h, N = j * j * j, p = k * k * k, x = D * D * D, _ = 3 * m * j * j, S = 3 * y * k * k, f = 3 * w * D * D, M = 6 * m * m * j, O = 6 * y * y * k, C = 6 * w * w * D, z = 4.0767416621 * N - 3.3077115913 * p + 0.2309699292 * x - 1, U = 4.0767416621 * _ - 3.3077115913 * S + 0.2309699292 * f, L = 4.0767416621 * M - 3.3077115913 * O + 0.2309699292 * C, B = U / (U * U - 0.5 * z * L), X = -z * B, V = -1.2684380046 * N + 2.6097574011 * p - 0.3413193965 * x - 1, J = -1.2684380046 * _ + 2.6097574011 * S - 0.3413193965 * f, ie = -1.2684380046 * M + 2.6097574011 * O - 0.3413193965 * C, b = J / (J * J - 0.5 * V * ie), q = -V * b, K = -0.0041960863 * N - 0.7034186147 * p + 1.707614701 * x - 1, G = -0.0041960863 * _ - 0.7034186147 * S + 1.707614701 * f, le = -0.0041960863 * M - 0.7034186147 * O + 1.707614701 * C, xe = G / (G * G - 0.5 * K * le), Q = -K * xe;
        X = B >= 0 ? X : 1e6, q = b >= 0 ? q : 1e6, Q = xe >= 0 ? Q : 1e6, s += Math.min(X, Math.min(q, Q));
      }
    }
  }
  return s;
}
function _n(t, e, r = null) {
  r || (r = vn(t, e));
  let o = r[0], n = r[1];
  return [n / o, n / (1 - o)];
}
function Wo(t, e, r) {
  let o = vn(e, r), n = Fs(e, r, t, 1, t, o), i = _n(e, r, o), s = 0.11516993 + 1 / (7.4477897 + 4.1590124 * r + e * (-2.19557347 + 1.75198401 * r + e * (-2.13704948 - 10.02301043 * r + e * (-4.24894561 + 5.38770819 * r + 4.69891013 * e)))), c = 0.11239642 + 1 / (1.6132032 - 0.68124379 * r + e * (0.40370612 + 0.90148123 * r + e * (-0.27087943 + 0.6122399 * r + e * (299215e-8 - 0.45399568 * r - 0.14661872 * e)))), l = n / Math.min(t * i[0], (1 - t) * i[1]), d = t * s, u = (1 - t) * c, h = 0.9 * l * Math.sqrt(
    Math.sqrt(
      1 / (1 / (d * d * d * d) + 1 / (u * u * u * u))
    )
  );
  return d = t * 0.4, u = (1 - t) * 0.8, [Math.sqrt(1 / (1 / (d * d) + 1 / (u * u))), h, n];
}
function Bn(t) {
  const e = t.l !== void 0 ? t.l : 0, r = t.a !== void 0 ? t.a : 0, o = t.b !== void 0 ? t.b : 0, n = { mode: "okhsl", l: cn(e) };
  t.alpha !== void 0 && (n.alpha = t.alpha);
  let i = Math.sqrt(r * r + o * o);
  if (!i)
    return n.s = 0, n;
  let [s, c, l] = Wo(e, r / i, o / i), d;
  if (i < c) {
    let u = 0, h = 0.8 * s, m = 1 - h / c;
    d = (i - u) / (h + m * (i - u)) * 0.8;
  } else {
    let u = c, h = 0.2 * c * c * 1.25 * 1.25 / s, m = 1 - h / (l - c);
    d = 0.8 + 0.2 * ((i - u) / (h + m * (i - u)));
  }
  return d && (n.s = d, n.h = ae(Math.atan2(o, r) * 180 / Math.PI)), n;
}
function Xn(t) {
  let e = t.h !== void 0 ? t.h : 0, r = t.s !== void 0 ? t.s : 0, o = t.l !== void 0 ? t.l : 0;
  const n = { mode: "oklab", l: jt(o) };
  if (t.alpha !== void 0 && (n.alpha = t.alpha), !r || o === 1)
    return n.a = n.b = 0, n;
  let i = Math.cos(e / 180 * Math.PI), s = Math.sin(e / 180 * Math.PI), [c, l, d] = Wo(n.l, i, s), u, h, m, y;
  r < 0.8 ? (u = 1.25 * r, h = 0, m = 0.8 * c, y = 1 - m / l) : (u = 5 * (r - 0.8), h = l, m = 0.2 * l * l * 1.25 * 1.25 / c, y = 1 - m / (d - l));
  let w = h + u * m / (1 - y * u);
  return n.a = w * i, n.b = w * s, n;
}
const Bs = {
  ...Po,
  mode: "okhsl",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--okhsl"],
  serialize: "--okhsl",
  fromMode: {
    oklab: Bn,
    rgb: (t) => Bn(It(t))
  },
  toMode: {
    oklab: Xn,
    rgb: (t) => Lt(Xn(t))
  }
};
function $n(t) {
  let e = t.l !== void 0 ? t.l : 0, r = t.a !== void 0 ? t.a : 0, o = t.b !== void 0 ? t.b : 0, n = Math.sqrt(r * r + o * o), i = n ? r / n : 1, s = n ? o / n : 1, [c, l] = _n(i, s), d = 0.5, u = 1 - d / c, h = l / (n + e * l), m = h * e, y = h * n, w = jt(m), A = y * w / m, T = Ve({ l: w, a: i * A, b: s * A }), j = Math.cbrt(
    1 / Math.max(T.r, T.g, T.b, 0)
  );
  e = e / j, n = n / j * cn(e) / e, e = cn(e);
  const k = {
    mode: "okhsv",
    s: n ? (d + l) * y / (l * d + l * u * y) : 0,
    v: e ? e / m : 0
  };
  return k.s && (k.h = ae(Math.atan2(o, r) * 180 / Math.PI)), t.alpha !== void 0 && (k.alpha = t.alpha), k;
}
function Wn(t) {
  const e = { mode: "oklab" };
  t.alpha !== void 0 && (e.alpha = t.alpha);
  const r = t.h !== void 0 ? t.h : 0, o = t.s !== void 0 ? t.s : 0, n = t.v !== void 0 ? t.v : 0, i = Math.cos(r / 180 * Math.PI), s = Math.sin(r / 180 * Math.PI), [c, l] = _n(i, s), d = 0.5, u = 1 - d / c, h = 1 - o * d / (d + l - l * u * o), m = o * l * d / (d + l - l * u * o), y = jt(h), w = m * y / h, A = Ve({
    l: y,
    a: i * w,
    b: s * w
  }), T = Math.cbrt(
    1 / Math.max(A.r, A.g, A.b, 0)
  ), j = jt(n * h), k = m * j / h;
  return e.l = j * T, e.a = k * i * T, e.b = k * s * T, e;
}
const Xs = {
  ...Co,
  mode: "okhsv",
  channels: ["h", "s", "v", "alpha"],
  parse: ["--okhsv"],
  serialize: "--okhsv",
  fromMode: {
    oklab: $n,
    rgb: (t) => $n(It(t))
  },
  toMode: {
    oklab: Wn,
    rgb: (t) => Lt(Wn(t))
  }
};
function $s(t, e) {
  if (!e || e[0] !== "oklab")
    return;
  const r = { mode: "oklab" }, [, o, n, i, s] = e;
  if (!(o.type === R.Hue || n.type === R.Hue || i.type === R.Hue))
    return o.type !== R.None && (r.l = Math.min(
      Math.max(0, o.type === R.Number ? o.value : o.value / 100),
      1
    )), n.type !== R.None && (r.a = n.type === R.Number ? n.value : n.value * 0.4 / 100), i.type !== R.None && (r.b = i.type === R.Number ? i.value : i.value * 0.4 / 100), s.type !== R.None && (r.alpha = Math.min(
      1,
      Math.max(
        0,
        s.type === R.Number ? s.value : s.value / 100
      )
    )), r;
}
const Ws = {
  ...bn,
  mode: "oklab",
  toMode: {
    lrgb: Ve,
    rgb: Lt
  },
  fromMode: {
    lrgb: $o,
    rgb: It
  },
  ranges: {
    l: [0, 1],
    a: [-0.4, 0.4],
    b: [-0.4, 0.4]
  },
  parse: [$s],
  serialize: (t) => `oklab(${t.l !== void 0 ? t.l : "none"} ${t.a !== void 0 ? t.a : "none"} ${t.b !== void 0 ? t.b : "none"}${t.alpha < 1 ? ` / ${t.alpha}` : ""})`
};
function Gs(t, e) {
  if (!e || e[0] !== "oklch")
    return;
  const r = { mode: "oklch" }, [, o, n, i, s] = e;
  if (o.type !== R.None) {
    if (o.type === R.Hue)
      return;
    r.l = Math.min(
      Math.max(0, o.type === R.Number ? o.value : o.value / 100),
      1
    );
  }
  if (n.type !== R.None && (r.c = Math.max(
    0,
    n.type === R.Number ? n.value : n.value * 0.4 / 100
  )), i.type !== R.None) {
    if (i.type === R.Percentage)
      return;
    r.h = i.value;
  }
  return s.type !== R.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === R.Number ? s.value : s.value / 100
    )
  )), r;
}
const Ys = {
  ...yn,
  mode: "oklch",
  toMode: {
    oklab: (t) => _e(t, "oklab"),
    rgb: (t) => Lt(_e(t, "oklab"))
  },
  fromMode: {
    rgb: (t) => ve(It(t), "oklch"),
    oklab: (t) => ve(t, "oklch")
  },
  parse: [Gs],
  serialize: (t) => `oklch(${t.l !== void 0 ? t.l : "none"} ${t.c !== void 0 ? t.c : "none"} ${t.h !== void 0 ? t.h : "none"}${t.alpha < 1 ? ` / ${t.alpha}` : ""})`,
  ranges: {
    l: [0, 1],
    c: [0, 0.4],
    h: [0, 360]
  }
}, Gn = (t) => {
  let { r: e, g: r, b: o, alpha: n } = Ae(t), i = {
    mode: "xyz65",
    x: 0.486570948648216 * e + 0.265667693169093 * r + 0.1982172852343625 * o,
    y: 0.2289745640697487 * e + 0.6917385218365062 * r + 0.079286914093745 * o,
    z: 0 * e + 0.0451133818589026 * r + 1.043944368900976 * o
  };
  return n !== void 0 && (i.alpha = n), i;
}, Yn = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = De(
    {
      r: t * 2.4934969119414263 - e * 0.9313836179191242 - 0.402710784450717 * r,
      g: t * -0.8294889695615749 + e * 1.7626640603183465 + 0.0236246858419436 * r,
      b: t * 0.0358458302437845 - e * 0.0761723892680418 + 0.9568845240076871 * r
    },
    "p3"
  );
  return o !== void 0 && (n.alpha = o), n;
}, Vs = {
  ...Me,
  mode: "p3",
  parse: ["display-p3"],
  serialize: "display-p3",
  fromMode: {
    rgb: (t) => Yn(Re(t)),
    xyz65: Yn
  },
  toMode: {
    rgb: (t) => ke(Gn(t)),
    xyz65: Gn
  }
}, ar = (t) => {
  let e = Math.abs(t);
  return e >= 1 / 512 ? Math.sign(t) * Math.pow(e, 1 / 1.8) : 16 * t;
}, Vn = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = {
    mode: "prophoto",
    r: ar(
      t * 1.3457868816471585 - e * 0.2555720873797946 - 0.0511018649755453 * r
    ),
    g: ar(
      t * -0.5446307051249019 + e * 1.5082477428451466 + 0.0205274474364214 * r
    ),
    b: ar(t * 0 + e * 0 + 1.2119675456389452 * r)
  };
  return o !== void 0 && (n.alpha = o), n;
}, or = (t = 0) => {
  let e = Math.abs(t);
  return e >= 16 / 512 ? Math.sign(t) * Math.pow(e, 1.8) : t / 16;
}, Kn = (t) => {
  let e = or(t.r), r = or(t.g), o = or(t.b), n = {
    mode: "xyz50",
    x: 0.7977666449006423 * e + 0.1351812974005331 * r + 0.0313477341283922 * o,
    y: 0.2880748288194013 * e + 0.7118352342418731 * r + 899369387256e-16 * o,
    z: 0 * e + 0 * r + 0.8251046025104602 * o
  };
  return t.alpha !== void 0 && (n.alpha = t.alpha), n;
}, Ks = {
  ...Me,
  mode: "prophoto",
  parse: ["prophoto-rgb"],
  serialize: "prophoto-rgb",
  fromMode: {
    xyz50: Vn,
    rgb: (t) => Vn(Ye(t))
  },
  toMode: {
    xyz50: Kn,
    rgb: (t) => Ge(Kn(t))
  }
}, Jn = 1.09929682680944, Js = 0.018053968510807, ir = (t) => {
  const e = Math.abs(t);
  return e > Js ? (Math.sign(t) || 1) * (Jn * Math.pow(e, 0.45) - (Jn - 1)) : 4.5 * t;
}, Qn = ({ x: t, y: e, z: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  let n = {
    mode: "rec2020",
    r: ir(
      t * 1.7166511879712683 - e * 0.3556707837763925 - 0.2533662813736599 * r
    ),
    g: ir(
      t * -0.6666843518324893 + e * 1.6164812366349395 + 0.0157685458139111 * r
    ),
    b: ir(
      t * 0.0176398574453108 - e * 0.0427706132578085 + 0.9421031212354739 * r
    )
  };
  return o !== void 0 && (n.alpha = o), n;
}, Zn = 1.09929682680944, Qs = 0.018053968510807, sr = (t = 0) => {
  let e = Math.abs(t);
  return e < Qs * 4.5 ? t / 4.5 : (Math.sign(t) || 1) * Math.pow((e + Zn - 1) / Zn, 1 / 0.45);
}, ea = (t) => {
  let e = sr(t.r), r = sr(t.g), o = sr(t.b), n = {
    mode: "xyz65",
    x: 0.6369580483012911 * e + 0.1446169035862083 * r + 0.1688809751641721 * o,
    y: 0.262700212011267 * e + 0.6779980715188708 * r + 0.059301716469862 * o,
    z: 0 * e + 0.0280726930490874 * r + 1.0609850577107909 * o
  };
  return t.alpha !== void 0 && (n.alpha = t.alpha), n;
}, Zs = {
  ...Me,
  mode: "rec2020",
  fromMode: {
    xyz65: Qn,
    rgb: (t) => Qn(Re(t))
  },
  toMode: {
    xyz65: ea,
    rgb: (t) => ke(ea(t))
  },
  parse: ["rec2020"],
  serialize: "rec2020"
}, je = 0.0037930732552754493, Go = Math.cbrt(je), cr = (t) => Math.cbrt(t) - Go, ec = (t) => {
  const { r: e, g: r, b: o, alpha: n } = Ae(t), i = cr(0.3 * e + 0.622 * r + 0.078 * o + je), s = cr(0.23 * e + 0.692 * r + 0.078 * o + je), c = cr(
    0.2434226892454782 * e + 0.2047674442449682 * r + 0.5518098665095535 * o + je
  ), l = {
    mode: "xyb",
    x: (i - s) / 2,
    y: (i + s) / 2,
    /* Apply default chroma from luma (subtract Y from B) */
    b: c - (i + s) / 2
  };
  return n !== void 0 && (l.alpha = n), l;
}, lr = (t) => Math.pow(t + Go, 3), tc = ({ x: t, y: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  const n = lr(t + e) - je, i = lr(e - t) - je, s = lr(r + e) - je, c = De({
    r: 11.031566904639861 * n - 9.866943908131562 * i - 0.16462299650829934 * s,
    g: -3.2541473810744237 * n + 4.418770377582723 * i - 0.16462299650829934 * s,
    b: -3.6588512867136815 * n + 2.7129230459360922 * i + 1.9459282407775895 * s
  });
  return o !== void 0 && (c.alpha = o), c;
}, rc = {
  mode: "xyb",
  channels: ["x", "y", "b", "alpha"],
  parse: ["--xyb"],
  serialize: "--xyb",
  toMode: {
    rgb: tc
  },
  fromMode: {
    rgb: ec
  },
  ranges: {
    x: [-0.0154, 0.0281],
    y: [0, 0.8453],
    b: [-0.2778, 0.388]
  },
  interpolate: {
    x: P,
    y: P,
    b: P,
    alpha: { use: P, fixup: re }
  }
}, nc = {
  mode: "xyz50",
  parse: ["xyz-d50"],
  serialize: "xyz-d50",
  toMode: {
    rgb: Ge,
    lab: xn
  },
  fromMode: {
    rgb: Ye,
    lab: gn
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825]
  },
  interpolate: {
    x: P,
    y: P,
    z: P,
    alpha: { use: P, fixup: re }
  }
}, ac = (t) => {
  let { x: e, y: r, z: o, alpha: n } = t;
  e === void 0 && (e = 0), r === void 0 && (r = 0), o === void 0 && (o = 0);
  let i = {
    mode: "xyz50",
    x: 1.0479298208405488 * e + 0.0229467933410191 * r - 0.0501922295431356 * o,
    y: 0.0296278156881593 * e + 0.990434484573249 * r - 0.0170738250293851 * o,
    z: -0.0092430581525912 * e + 0.0150551448965779 * r + 0.7518742899580008 * o
  };
  return n !== void 0 && (i.alpha = n), i;
}, oc = (t) => {
  let { x: e, y: r, z: o, alpha: n } = t;
  e === void 0 && (e = 0), r === void 0 && (r = 0), o === void 0 && (o = 0);
  let i = {
    mode: "xyz65",
    x: 0.9554734527042182 * e - 0.0230985368742614 * r + 0.0632593086610217 * o,
    y: -0.0283697069632081 * e + 1.0099954580058226 * r + 0.021041398966943 * o,
    z: 0.0123140016883199 * e - 0.0205076964334779 * r + 1.3303659366080753 * o
  };
  return n !== void 0 && (i.alpha = n), i;
}, ic = {
  mode: "xyz65",
  toMode: {
    rgb: ke,
    xyz50: ac
  },
  fromMode: {
    rgb: Re,
    xyz50: oc
  },
  ranges: {
    x: [0, 0.95],
    y: [0, 1],
    z: [0, 1.088]
  },
  channels: ["x", "y", "z", "alpha"],
  parse: ["xyz", "xyz-d65"],
  serialize: "xyz-d65",
  interpolate: {
    x: P,
    y: P,
    z: P,
    alpha: { use: P, fixup: re }
  }
}, sc = ({ r: t, g: e, b: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  const n = {
    mode: "yiq",
    y: 0.29889531 * t + 0.58662247 * e + 0.11448223 * r,
    i: 0.59597799 * t - 0.2741761 * e - 0.32180189 * r,
    q: 0.21147017 * t - 0.52261711 * e + 0.31114694 * r
  };
  return o !== void 0 && (n.alpha = o), n;
}, cc = ({ y: t, i: e, q: r, alpha: o }) => {
  t === void 0 && (t = 0), e === void 0 && (e = 0), r === void 0 && (r = 0);
  const n = {
    mode: "rgb",
    r: t + 0.95608445 * e + 0.6208885 * r,
    g: t - 0.27137664 * e - 0.6486059 * r,
    b: t - 1.10561724 * e + 1.70250126 * r
  };
  return o !== void 0 && (n.alpha = o), n;
}, lc = {
  mode: "yiq",
  toMode: {
    rgb: cc
  },
  fromMode: {
    rgb: sc
  },
  channels: ["y", "i", "q", "alpha"],
  parse: ["--yiq"],
  serialize: "--yiq",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522]
  },
  interpolate: {
    y: P,
    i: P,
    q: P,
    alpha: { use: P, fixup: re }
  }
}, dc = (t) => Math.max(0, Math.min(1, t || 0)), dr = (t) => Math.round(dc(t) * 255), uc = xo("rgb"), fc = (t) => {
  if (t === void 0)
    return;
  let e = dr(t.r), r = dr(t.g), o = dr(t.b);
  return "#" + (1 << 24 | e << 16 | r << 8 | o).toString(16).slice(1);
}, qe = (t) => {
  const e = go(t);
  if (!e)
    return;
  const r = vo(e.mode);
  if (!r.serialize || typeof r.serialize == "string") {
    let o = `color(${r.serialize || `--${e.mode}`} `;
    return r.channels.forEach((n, i) => {
      n !== "alpha" && (o += (i ? " " : "") + (e[n] !== void 0 ? e[n] : "none"));
    }), e.alpha !== void 0 && e.alpha < 1 && (o += ` / ${e.alpha}`), o + ")";
  }
  if (typeof r.serialize == "function")
    return r.serialize(e);
}, pc = (t) => fc(uc(t));
Y(Ki);
Y(ns);
Y(as);
Y(os);
Y(cs);
Y(Po);
Y(Co);
Y(bs);
Y(ys);
Y(js);
Y(ws);
Y(bn);
Y(ks);
Y(yn);
Y(Ss);
Y(qs);
Y(Hs);
Y(Us);
Y(Bs);
Y(Xs);
Y(Ws);
const hc = Y(Ys);
Y(Vs);
Y(Ks);
Y(Zs);
Y(Me);
Y(rc);
Y(nc);
Y(ic);
Y(lc);
const mc = 0.0375, gc = -0.0213;
function xc(t) {
  var s, c, l, d, u, h, m, y, w, A, T, j, k, D, N, p, x, _, S;
  const e = {}, r = t.mode, o = bc(Si[r], (s = t.overrides) == null ? void 0 : s.palette);
  if (e["--panel"] = o.panel, e["--panel-2"] = o.panel2, e["--panel-hover"] = o.panelHover, e["--ink"] = o.ink, e["--ink-dim"] = o.inkDim, e["--ink-faint"] = o.inkFaint, e["--border"] = o.border, e["--border-strong"] = o.borderStrong, e["--bg"] = o.bg, (l = (c = t.overrides) == null ? void 0 : c.palette) != null && l.bg && !((u = (d = t.overrides) == null ? void 0 : d.palette) != null && u.bg2)) {
    const f = Qe(o.bg), M = r === "dark" ? mc : gc;
    e["--bg-2"] = f ? qe(ur(f, M)) : o.bg2;
  } else
    e["--bg-2"] = o.bg2;
  const n = Qe(t.brand.primary) ?? Qe("oklch(0.86 0.18 200)");
  if (e["--color-primary"] = qe(n) ?? t.brand.primary, e["--color-primary-hover"] = qe(ur(n, r === "dark" ? 0.04 : -0.06)), e["--color-primary-soft"] = fr(n, 0.18), e["--color-primary-faint"] = fr(n, 0.08), e["--on-primary"] = (n.l ?? 0.5) > 0.62 ? "#0A0B10" : "#FFFFFF", t.brand.secondary) {
    const f = Qe(t.brand.secondary);
    f && (e["--color-secondary"] = qe(f), e["--color-secondary-hover"] = qe(ur(f, r === "dark" ? 0.04 : -0.06)), e["--color-secondary-soft"] = fr(f, 0.18), e["--on-secondary"] = (f.l ?? 0.5) > 0.62 ? "#0A0B10" : "#FFFFFF");
  }
  e["--halo-primary"] = `radial-gradient(circle, ${e["--color-primary"]} 0%, transparent 70%)`, e["--halo-secondary"] = e["--color-secondary"] ? `radial-gradient(circle, ${e["--color-secondary"]} 0%, transparent 70%)` : "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)", e["--radius-card"] = ((m = (h = t.overrides) == null ? void 0 : h.radius) == null ? void 0 : m.card) ?? "14px", e["--radius-button"] = ((w = (y = t.overrides) == null ? void 0 : y.radius) == null ? void 0 : w.button) ?? "8px", e["--radius-tag"] = ((T = (A = t.overrides) == null ? void 0 : A.radius) == null ? void 0 : T.tag) ?? "4px", e["--radius-modal"] = ((k = (j = t.overrides) == null ? void 0 : j.radius) == null ? void 0 : k.modal) ?? "16px", (N = (D = t.overrides) == null ? void 0 : D.fonts) != null && N.display && (e["--font-display"] = t.overrides.fonts.display), (x = (p = t.overrides) == null ? void 0 : p.fonts) != null && x.ui && (e["--font-ui"] = t.overrides.fonts.ui), (S = (_ = t.overrides) == null ? void 0 : _.fonts) != null && S.mono && (e["--font-mono"] = t.overrides.fonts.mono), e["--mission-card-bg"] = "var(--panel)", e["--mission-card-border"] = "var(--border)", e["--mission-card-icon-bg"] = "var(--panel-2)", e["--mission-card-icon-border"] = "var(--border)", e["--mission-card-title"] = "var(--ink)", e["--mission-card-body"] = "var(--ink-dim)", e["--mission-card-cta-fg"] = "#05060A", e["--mission-card-halo-opacity"] = "0.25", e["--mission-modal-backdrop"] = "color-mix(in oklch, #000 60%, transparent)", e["--mission-modal-bg"] = "var(--panel)", e["--mission-modal-border"] = "var(--border)", e["--mission-modal-header-border"] = "var(--border)", e["--mission-modal-title"] = "var(--ink)", e["--mission-modal-body"] = "var(--ink-dim)", e["--mission-modal-close-bg"] = "var(--panel-2)", e["--mission-modal-close-border"] = "var(--border)", e["--mission-modal-close-icon"] = "var(--ink)", e["--reward-card-bg"] = "var(--panel)", e["--reward-card-border"] = "var(--border)", e["--reward-card-image-bg"] = "var(--panel-2)", e["--reward-card-image-border"] = "var(--border)", e["--reward-card-title"] = "var(--ink)", e["--reward-card-body"] = "var(--ink-dim)", e["--profile-card-bg"] = "var(--panel)", e["--profile-card-border"] = "var(--border)", e["--profile-card-title"] = "var(--ink)", e["--profile-card-body"] = "var(--ink-faint)", e["--profile-card-stat-bg"] = "var(--panel-2)", e["--profile-card-stat-border"] = "var(--border)", e["--profile-card-wallet"] = "var(--ink-faint)", e["--leaderboard-row-bg"] = "transparent", e["--leaderboard-row-border"] = "var(--border)", e["--leaderboard-head-bg"] = "transparent", e["--leaderboard-head-text"] = "var(--ink-dim)", e["--leaderboard-mine-bg"] = "var(--color-primary-soft)", e["--leaderboard-top-rank"] = "var(--color-primary)", e["--onboarding-card-bg"] = "var(--panel)", e["--onboarding-card-border"] = "var(--border)", e["--onboarding-card-title"] = "var(--ink)", e["--onboarding-card-body"] = "var(--ink-dim)", e["--onboarding-card-hero-bg"] = "var(--bg-2)", e["--onboarding-card-form-bg"] = "transparent", e["--onboarding-card-stat-bg"] = "var(--panel-2)", e["--onboarding-card-stat-border"] = "var(--border)", e["--onboarding-card-brand-emphasis"] = "var(--color-primary)", e["--onboarding-card-link"] = "var(--color-primary)", e["--topnav-bg"] = "color-mix(in oklch, var(--bg) 80%, transparent)", e["--topnav-border"] = "var(--border)", e["--topnav-link"] = "var(--ink-dim)", e["--topnav-link-active"] = "var(--ink)", e["--topnav-link-bg-active"] = "var(--panel)", e["--footer-bg"] = "transparent", e["--footer-border"] = "var(--border)", e["--footer-text"] = "var(--ink-faint)", e["--footer-brand"] = "var(--ink)", e["--hero-banner-bg"] = "var(--bg-2)", e["--hero-banner-border"] = "var(--border)", e["--hero-banner-overlay"] = "linear-gradient(180deg, transparent 40%, color-mix(in oklch, var(--bg) 90%, transparent) 100%)", e["--tier-ladder-current-mix"] = "12%", e["--tier-ladder-locked-opacity"] = "0.5", e["--tier-ladder-panel"] = "var(--panel-2)", e["--badge-grid-bg"] = "var(--panel-2)", e["--badge-grid-border"] = "var(--border)", e["--badge-grid-locked-fg"] = "var(--ink-faint)", e["--stat-card-trend-default"] = "var(--color-primary)", e["--stat-card-trend-streak"] = "var(--color-secondary)", e["--stat-card-trend-rewards"] = "color-mix(in oklch, var(--color-primary) 50%, var(--color-secondary))", e["--xp-chart-gradient-from"] = "var(--color-primary)", e["--xp-chart-gradient-to"] = "var(--color-secondary)";
  const i = t.overrides;
  if (i != null && i.missionCard) {
    const f = i.missionCard;
    f.panel && (e["--mission-card-bg"] = f.panel), f.border && (e["--mission-card-border"] = f.border);
    const M = f.iconBoxBg ?? f.panel2;
    M && (e["--mission-card-icon-bg"] = M), f.iconBoxBorder && (e["--mission-card-icon-border"] = f.iconBoxBorder), f.title && (e["--mission-card-title"] = f.title), f.body && (e["--mission-card-body"] = f.body), f.ctaFg && (e["--mission-card-cta-fg"] = f.ctaFg), typeof f.haloOpacity == "number" && (e["--mission-card-halo-opacity"] = String(f.haloOpacity));
  }
  if (i != null && i.missionModal) {
    const f = i.missionModal;
    f.backdrop && (e["--mission-modal-backdrop"] = f.backdrop), f.panel && (e["--mission-modal-bg"] = f.panel), f.border && (e["--mission-modal-border"] = f.border), f.headerBorder && (e["--mission-modal-header-border"] = f.headerBorder), f.title && (e["--mission-modal-title"] = f.title), f.body && (e["--mission-modal-body"] = f.body), f.closeBg && (e["--mission-modal-close-bg"] = f.closeBg), f.closeBorder && (e["--mission-modal-close-border"] = f.closeBorder), f.closeIcon && (e["--mission-modal-close-icon"] = f.closeIcon);
  }
  if (i != null && i.rewardCard) {
    const f = i.rewardCard;
    f.panel && (e["--reward-card-bg"] = f.panel), f.border && (e["--reward-card-border"] = f.border);
    const M = f.imageArea ?? f.panel2;
    M && (e["--reward-card-image-bg"] = M), f.imageAreaBorder && (e["--reward-card-image-border"] = f.imageAreaBorder), f.title && (e["--reward-card-title"] = f.title), f.body && (e["--reward-card-body"] = f.body);
  }
  if (i != null && i.profileCard) {
    const f = i.profileCard;
    f.panel && (e["--profile-card-bg"] = f.panel), f.border && (e["--profile-card-border"] = f.border), f.title && (e["--profile-card-title"] = f.title), f.body && (e["--profile-card-body"] = f.body);
    const M = f.statBg ?? f.panel2;
    M && (e["--profile-card-stat-bg"] = M), f.statBorder && (e["--profile-card-stat-border"] = f.statBorder), f.walletColor && (e["--profile-card-wallet"] = f.walletColor);
  }
  if (i != null && i.leaderboardRow) {
    const f = i.leaderboardRow;
    f.rowPanel && (e["--leaderboard-row-bg"] = f.rowPanel), f.rowBorder && (e["--leaderboard-row-border"] = f.rowBorder), f.headPanel && (e["--leaderboard-head-bg"] = f.headPanel), f.headText && (e["--leaderboard-head-text"] = f.headText), f.mineHighlight && (e["--leaderboard-mine-bg"] = f.mineHighlight), f.topRankColor && (e["--leaderboard-top-rank"] = f.topRankColor);
  }
  if (i != null && i.onboardingCard) {
    const f = i.onboardingCard;
    f.panel && (e["--onboarding-card-bg"] = f.panel), f.border && (e["--onboarding-card-border"] = f.border), f.title && (e["--onboarding-card-title"] = f.title), f.body && (e["--onboarding-card-body"] = f.body), f.heroBg && (e["--onboarding-card-hero-bg"] = f.heroBg), f.formBg && (e["--onboarding-card-form-bg"] = f.formBg);
    const M = f.statTileBg ?? f.panel2;
    M && (e["--onboarding-card-stat-bg"] = M), f.statTileBorder && (e["--onboarding-card-stat-border"] = f.statTileBorder), f.brandEmphasis && (e["--onboarding-card-brand-emphasis"] = f.brandEmphasis), f.linkColor && (e["--onboarding-card-link"] = f.linkColor);
  }
  if (i != null && i.topNav) {
    const f = i.topNav;
    f.panel && (e["--topnav-bg"] = f.panel), f.border && (e["--topnav-border"] = f.border), f.linkColor && (e["--topnav-link"] = f.linkColor), f.linkColorActive && (e["--topnav-link-active"] = f.linkColorActive), f.linkBgActive && (e["--topnav-link-bg-active"] = f.linkBgActive);
  }
  if (i != null && i.footer) {
    const f = i.footer;
    f.panel && (e["--footer-bg"] = f.panel), f.border && (e["--footer-border"] = f.border), f.textColor && (e["--footer-text"] = f.textColor), f.brandColor && (e["--footer-brand"] = f.brandColor);
  }
  if (i != null && i.heroBanner) {
    const f = i.heroBanner;
    f.panel && (e["--hero-banner-bg"] = f.panel), f.border && (e["--hero-banner-border"] = f.border), f.overlayGradient && (e["--hero-banner-overlay"] = f.overlayGradient);
  }
  if (i != null && i.tierLadder) {
    const f = i.tierLadder;
    typeof f.currentMixPercent == "number" && (e["--tier-ladder-current-mix"] = `${wt(f.currentMixPercent, 0, 100)}%`), typeof f.lockedOpacity == "number" && (e["--tier-ladder-locked-opacity"] = String(wt(f.lockedOpacity, 0, 1))), f.panel && (e["--tier-ladder-panel"] = f.panel), f.panelCurrent && (e["--tier-ladder-panel-current"] = f.panelCurrent);
  }
  if (i != null && i.badgeGrid) {
    const f = i.badgeGrid;
    f.panel && (e["--badge-grid-bg"] = f.panel), f.border && (e["--badge-grid-border"] = f.border), f.lockedFg && (e["--badge-grid-locked-fg"] = f.lockedFg);
  }
  if (i != null && i.statCard) {
    const f = i.statCard;
    f.trendDefault && (e["--stat-card-trend-default"] = f.trendDefault), f.trendStreak && (e["--stat-card-trend-streak"] = f.trendStreak), f.trendRewards && (e["--stat-card-trend-rewards"] = f.trendRewards);
  }
  if (i != null && i.xpChart) {
    const f = i.xpChart;
    f.gradientFrom && (e["--xp-chart-gradient-from"] = f.gradientFrom), f.gradientTo && (e["--xp-chart-gradient-to"] = f.gradientTo);
  }
  return e;
}
function bc(t, e) {
  return e ? { ...t, ...e } : t;
}
function Qe(t) {
  try {
    const e = Eo(t);
    return e ? hc(e) : void 0;
  } catch {
    return;
  }
}
function ur(t, e) {
  return { ...t, l: wt((t.l ?? 0.5) + e, 0, 1) };
}
function fr(t, e) {
  const r = pc({ ...t, alpha: void 0 }) ?? "#000000", o = Math.round(wt(e, 0, 1) * 255).toString(16).padStart(2, "0");
  return `${r}${o}`;
}
function wt(t, e, r) {
  return Number.isFinite(t) ? Math.max(e, Math.min(r, t)) : e;
}
let Yo = Se;
const pr = /* @__PURE__ */ new Set(), ln = /* @__PURE__ */ new Set();
function yc(t) {
  return ln.add(t), () => {
    ln.delete(t);
  };
}
function vc(t) {
  const e = {
    mode: t.mode ?? Se.mode,
    brand: t.brand ?? Se.brand,
    content: t.content,
    assets: t.assets,
    overrides: xt(Se.overrides ?? {}, t.overrides)
  };
  if (Yo = e, typeof document < "u") {
    const r = document.documentElement;
    r.dataset.theme = e.mode;
    const o = xc(e);
    for (const n of pr)
      n in o || r.style.removeProperty(n);
    pr.clear();
    for (const [n, i] of Object.entries(o))
      r.style.setProperty(n, i), pr.add(n);
  }
  for (const r of ln) r(e);
}
function hd() {
  return Yo;
}
var dn = { exports: {} }, He = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ta;
function _c() {
  if (ta) return He;
  ta = 1;
  var t = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function r(o, n, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), n.key !== void 0 && (s = "" + n.key), "key" in n) {
      i = {};
      for (var c in n)
        c !== "key" && (i[c] = n[c]);
    } else i = n;
    return n = i.ref, {
      $$typeof: t,
      type: o,
      key: s,
      ref: n !== void 0 ? n : null,
      props: i
    };
  }
  return He.Fragment = e, He.jsx = r, He.jsxs = r, He;
}
var Ue = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ra;
function Ec() {
  return ra || (ra = 1, process.env.NODE_ENV !== "production" && function() {
    function t(b) {
      if (b == null) return null;
      if (typeof b == "function")
        return b.$$typeof === O ? null : b.displayName || b.name || null;
      if (typeof b == "string") return b;
      switch (b) {
        case T:
          return "Fragment";
        case k:
          return "Profiler";
        case j:
          return "StrictMode";
        case x:
          return "Suspense";
        case _:
          return "SuspenseList";
        case M:
          return "Activity";
      }
      if (typeof b == "object")
        switch (typeof b.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), b.$$typeof) {
          case A:
            return "Portal";
          case N:
            return b.displayName || "Context";
          case D:
            return (b._context.displayName || "Context") + ".Consumer";
          case p:
            var q = b.render;
            return b = b.displayName, b || (b = q.displayName || q.name || "", b = b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef"), b;
          case S:
            return q = b.displayName || null, q !== null ? q : t(b.type) || "Memo";
          case f:
            q = b._payload, b = b._init;
            try {
              return t(b(q));
            } catch {
            }
        }
      return null;
    }
    function e(b) {
      return "" + b;
    }
    function r(b) {
      try {
        e(b);
        var q = !1;
      } catch {
        q = !0;
      }
      if (q) {
        q = console;
        var K = q.error, G = typeof Symbol == "function" && Symbol.toStringTag && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return K.call(
          q,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          G
        ), e(b);
      }
    }
    function o(b) {
      if (b === T) return "<>";
      if (typeof b == "object" && b !== null && b.$$typeof === f)
        return "<...>";
      try {
        var q = t(b);
        return q ? "<" + q + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var b = C.A;
      return b === null ? null : b.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function s(b) {
      if (z.call(b, "key")) {
        var q = Object.getOwnPropertyDescriptor(b, "key").get;
        if (q && q.isReactWarning) return !1;
      }
      return b.key !== void 0;
    }
    function c(b, q) {
      function K() {
        B || (B = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          q
        ));
      }
      K.isReactWarning = !0, Object.defineProperty(b, "key", {
        get: K,
        configurable: !0
      });
    }
    function l() {
      var b = t(this.type);
      return X[b] || (X[b] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), b = this.props.ref, b !== void 0 ? b : null;
    }
    function d(b, q, K, G, le, xe) {
      var Q = K.ref;
      return b = {
        $$typeof: w,
        type: b,
        key: q,
        props: K,
        _owner: G
      }, (Q !== void 0 ? Q : null) !== null ? Object.defineProperty(b, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(b, "ref", { enumerable: !1, value: null }), b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(b, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(b, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: le
      }), Object.defineProperty(b, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: xe
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    }
    function u(b, q, K, G, le, xe) {
      var Q = q.children;
      if (Q !== void 0)
        if (G)
          if (U(Q)) {
            for (G = 0; G < Q.length; G++)
              h(Q[G]);
            Object.freeze && Object.freeze(Q);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else h(Q);
      if (z.call(q, "key")) {
        Q = t(b);
        var ue = Object.keys(q).filter(function(Ne) {
          return Ne !== "key";
        });
        G = 0 < ue.length ? "{key: someKey, " + ue.join(": ..., ") + ": ...}" : "{key: someKey}", ie[Q + G] || (ue = 0 < ue.length ? "{" + ue.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          G,
          Q,
          ue,
          Q
        ), ie[Q + G] = !0);
      }
      if (Q = null, K !== void 0 && (r(K), Q = "" + K), s(q) && (r(q.key), Q = "" + q.key), "key" in q) {
        K = {};
        for (var be in q)
          be !== "key" && (K[be] = q[be]);
      } else K = q;
      return Q && c(
        K,
        typeof b == "function" ? b.displayName || b.name || "Unknown" : b
      ), d(
        b,
        Q,
        K,
        n(),
        le,
        xe
      );
    }
    function h(b) {
      m(b) ? b._store && (b._store.validated = 1) : typeof b == "object" && b !== null && b.$$typeof === f && (b._payload.status === "fulfilled" ? m(b._payload.value) && b._payload.value._store && (b._payload.value._store.validated = 1) : b._store && (b._store.validated = 1));
    }
    function m(b) {
      return typeof b == "object" && b !== null && b.$$typeof === w;
    }
    var y = we, w = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), N = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), O = Symbol.for("react.client.reference"), C = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = Object.prototype.hasOwnProperty, U = Array.isArray, L = console.createTask ? console.createTask : function() {
      return null;
    };
    y = {
      react_stack_bottom_frame: function(b) {
        return b();
      }
    };
    var B, X = {}, V = y.react_stack_bottom_frame.bind(
      y,
      i
    )(), J = L(o(i)), ie = {};
    Ue.Fragment = T, Ue.jsx = function(b, q, K) {
      var G = 1e4 > C.recentlyCreatedOwnerStacks++;
      return u(
        b,
        q,
        K,
        !1,
        G ? Error("react-stack-top-frame") : V,
        G ? L(o(b)) : J
      );
    }, Ue.jsxs = function(b, q, K) {
      var G = 1e4 > C.recentlyCreatedOwnerStacks++;
      return u(
        b,
        q,
        K,
        !0,
        G ? Error("react-stack-top-frame") : V,
        G ? L(o(b)) : J
      );
    };
  }()), Ue;
}
process.env.NODE_ENV === "production" ? dn.exports = _c() : dn.exports = Ec();
var a = dn.exports;
const jc = Se.assets ?? {}, wc = {
  config: Se,
  content: ho,
  assets: {}
}, Vo = po(wc);
function md({ value: t, children: e }) {
  const [r, o] = F(null);
  fe(() => yc(o), []);
  const n = r ?? t, i = uo(
    () => ({
      config: n,
      content: xt(ho, n.content),
      assets: xt(jc, n.assets)
    }),
    [n]
  );
  return /* @__PURE__ */ a.jsx(Vo.Provider, { value: i, children: e });
}
function En() {
  return fo(Vo);
}
function Ko(t) {
  return En().content[t];
}
const na = /* @__PURE__ */ new Set();
function Rc(t) {
  const { assets: e } = En();
  return e[t];
}
function gd(t) {
  if (!(typeof document > "u"))
    for (const e of t) {
      if (!(e != null && e.src) || na.has(e.src)) continue;
      const r = document.createElement("link");
      r.rel = "preload", r.href = e.src, r.as = e.type === "JSON" ? "fetch" : "image", e.type === "JSON" && (r.crossOrigin = "anonymous"), document.head.appendChild(r), na.add(e.src);
    }
}
function kc() {
  return En().config;
}
const Jo = po(null), Nc = {};
function Sc({ children: t, defaultOptions: e = Nc }) {
  const r = uo(() => ({ defaultOptions: e }), [e]);
  return /* @__PURE__ */ we.createElement(Jo.Provider, { value: r }, t);
}
function xd() {
  var t;
  return ((t = fo(Jo)) == null ? void 0 : t.defaultOptions) ?? {};
}
const Pc = /* @__PURE__ */ new Set(["true", "1", "yes"]);
function aa(t) {
  const e = new URLSearchParams(t.search).get("preview");
  if (e === null) return "off";
  if (e === "embed") return "embed";
  if (!Pc.has(e.toLowerCase())) return "off";
  const { session: r, tenantId: o } = t;
  return r && r.isAdmin && r.tenantId === o ? "editor" : "off";
}
function Oc(t) {
  if (!t) return null;
  for (const e of t.split(";")) {
    const r = e.indexOf("=");
    if (r === -1 || e.slice(0, r).trim() !== "gq_admin") continue;
    const n = e.slice(r + 1).trim();
    if (!n) return null;
    let i = n;
    try {
      i = decodeURIComponent(n);
    } catch {
    }
    return i ? { tenantId: i, isAdmin: !0 } : null;
  }
  return null;
}
const Qo = {
  async getAdminSession() {
    return typeof document > "u" ? null : Oc(document.cookie);
  }
};
let jn = Qo;
function Tc() {
  return jn;
}
function bd(t) {
  jn = t;
}
function yd() {
  jn = Qo;
}
function Cc(t) {
  const [e, r] = F("off");
  return fe(() => {
    const o = window.location.search;
    if (aa({ search: o, session: null, tenantId: t }) === "embed") {
      r("embed");
      return;
    }
    let n = !1;
    return Tc().getAdminSession().then((i) => {
      n || r(aa({ search: o, session: i, tenantId: t }));
    }).catch(() => {
      n || r("off");
    }), () => {
      n = !0;
    };
  }, [t]), e;
}
var un = { exports: {} }, wn = {};
function Zo(t) {
  if (typeof WeakMap != "function") return null;
  var e = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (Zo = function(o) {
    return o ? r : e;
  })(t);
}
function Mc(t, e) {
  if (!e && t && t.__esModule) return t;
  if (t === null || typeof t != "object" && typeof t != "function") return { default: t };
  var r = Zo(e);
  if (r && r.has(t)) return r.get(t);
  var o = { __proto__: null }, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in t)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(t, i)) {
      var s = n ? Object.getOwnPropertyDescriptor(t, i) : null;
      s && (s.get || s.set) ? Object.defineProperty(o, i, s) : o[i] = t[i];
    }
  return o.default = t, r && r.set(t, o), o;
}
wn._ = Mc;
var hr = {}, mr = {}, oa;
function Ac() {
  if (oa) return mr;
  oa = 1;
  function t(e) {
    return e && e.__esModule ? e : { default: e };
  }
  return mr._ = t, mr;
}
var ia;
function Dc() {
  return ia || (ia = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(d, u) {
      for (var h in u) Object.defineProperty(d, h, {
        enumerable: !0,
        get: u[h]
      });
    }
    e(t, {
      AppRouterContext: function() {
        return n;
      },
      GlobalLayoutRouterContext: function() {
        return s;
      },
      LayoutRouterContext: function() {
        return i;
      },
      MissingSlotContext: function() {
        return l;
      },
      TemplateContext: function() {
        return c;
      }
    });
    const o = /* @__PURE__ */ Ac()._(we), n = o.default.createContext(null), i = o.default.createContext(null), s = o.default.createContext(null), c = o.default.createContext(null);
    process.env.NODE_ENV !== "production" && (n.displayName = "AppRouterContext", i.displayName = "LayoutRouterContext", s.displayName = "GlobalLayoutRouterContext", c.displayName = "TemplateContext");
    const l = o.default.createContext(/* @__PURE__ */ new Set());
  }(hr)), hr;
}
var gr = {}, Ze = { exports: {} }, sa;
function ei() {
  return sa || (sa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ReadonlyURLSearchParams", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    class r extends Error {
      constructor() {
        super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
      }
    }
    class o extends URLSearchParams {
      /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
      append() {
        throw new r();
      }
      /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
      delete() {
        throw new r();
      }
      /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
      set() {
        throw new r();
      }
      /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
      sort() {
        throw new r();
      }
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(Ze, Ze.exports)), Ze.exports;
}
var ca;
function Ic() {
  return ca || (ca = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(d, u) {
      for (var h in u) Object.defineProperty(d, h, {
        enumerable: !0,
        get: u[h]
      });
    }
    e(t, {
      NavigationPromisesContext: function() {
        return c;
      },
      PathParamsContext: function() {
        return s;
      },
      PathnameContext: function() {
        return i;
      },
      ReadonlyURLSearchParams: function() {
        return o.ReadonlyURLSearchParams;
      },
      SearchParamsContext: function() {
        return n;
      },
      createDevToolsInstrumentedPromise: function() {
        return l;
      }
    });
    const r = we, o = ei(), n = (0, r.createContext)(null), i = (0, r.createContext)(null), s = (0, r.createContext)(null), c = (0, r.createContext)(null);
    function l(d, u) {
      const h = Promise.resolve(u);
      return h.status = "fulfilled", h.value = u, h.displayName = `${d} (SSR)`, h;
    }
    process.env.NODE_ENV !== "production" && (n.displayName = "SearchParamsContext", i.displayName = "PathnameContext", s.displayName = "PathParamsContext", c.displayName = "NavigationPromisesContext");
  }(gr)), gr;
}
var xr = {}, la;
function ti() {
  return la || (la = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(h, m) {
      for (var y in m) Object.defineProperty(h, y, {
        enumerable: !0,
        get: m[y]
      });
    }
    e(t, {
      DEFAULT_SEGMENT_KEY: function() {
        return d;
      },
      NOT_FOUND_SEGMENT_KEY: function() {
        return u;
      },
      PAGE_SEGMENT_KEY: function() {
        return l;
      },
      addSearchParamsIfPageSegment: function() {
        return i;
      },
      computeSelectedLayoutSegment: function() {
        return s;
      },
      getSegmentValue: function() {
        return r;
      },
      getSelectedLayoutSegmentPath: function() {
        return c;
      },
      isGroupSegment: function() {
        return o;
      },
      isParallelRouteSegment: function() {
        return n;
      }
    });
    function r(h) {
      return Array.isArray(h) ? h[1] : h;
    }
    function o(h) {
      return h[0] === "(" && h.endsWith(")");
    }
    function n(h) {
      return h.startsWith("@") && h !== "@children";
    }
    function i(h, m) {
      if (h.includes(l)) {
        const w = JSON.stringify(m);
        return w !== "{}" ? l + "?" + w : l;
      }
      return h;
    }
    function s(h, m) {
      if (!h || h.length === 0)
        return null;
      const y = m === "children" ? h[0] : h[h.length - 1];
      return y === d ? null : y;
    }
    function c(h, m, y = !0, w = []) {
      let A;
      if (y)
        A = h[1][m];
      else {
        const k = h[1];
        A = k.children ?? Object.values(k)[0];
      }
      if (!A) return w;
      const T = A[0];
      let j = r(T);
      return !j || j.startsWith(l) ? w : (w.push(j), c(A, m, !1, w));
    }
    const l = "__PAGE__", d = "__DEFAULT__", u = "/_not-found";
  }(xr)), xr;
}
var br = {}, da;
function Lc() {
  return da || (da = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      ServerInsertedHTMLContext: function() {
        return n;
      },
      useServerInsertedHTML: function() {
        return i;
      }
    });
    const o = /* @__PURE__ */ wn._(we), n = /* @__PURE__ */ o.default.createContext(null);
    function i(s) {
      const c = (0, o.useContext)(n);
      c && c(s);
    }
  }(br)), br;
}
var et = { exports: {} }, ua;
function qc() {
  return ua || (ua = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    r(e, {
      UnrecognizedActionError: function() {
        return o;
      },
      unstable_isUnrecognizedActionError: function() {
        return n;
      }
    });
    class o extends Error {
      constructor(...s) {
        super(...s), this.name = "UnrecognizedActionError";
      }
    }
    function n(i) {
      return !!(i && typeof i == "object" && i instanceof o);
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(et, et.exports)), et.exports;
}
var tt = { exports: {} }, rt = { exports: {} }, nt = { exports: {} }, fa;
function ri() {
  return fa || (fa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "RedirectStatusCode", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    var r = /* @__PURE__ */ function(o) {
      return o[o.SeeOther = 303] = "SeeOther", o[o.TemporaryRedirect = 307] = "TemporaryRedirect", o[o.PermanentRedirect = 308] = "PermanentRedirect", o;
    }({});
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(nt, nt.exports)), nt.exports;
}
var at = { exports: {} }, pa;
function ni() {
  return pa || (pa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    r(e, {
      REDIRECT_ERROR_CODE: function() {
        return n;
      },
      isRedirectError: function() {
        return i;
      }
    });
    const o = ri(), n = "NEXT_REDIRECT";
    function i(s) {
      if (typeof s != "object" || s === null || !("digest" in s) || typeof s.digest != "string")
        return !1;
      const c = s.digest.split(";"), [l, d] = c, u = c.slice(2, -2).join(";"), h = c.at(-2), m = Number(h);
      return l === n && (d === "replace" || d === "push") && typeof u == "string" && !isNaN(m) && m in o.RedirectStatusCode;
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(at, at.exports)), at.exports;
}
var yr = {}, vr = {}, _r = {}, ha;
function Rn() {
  return ha || (ha = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(l, d) {
      for (var u in d) Object.defineProperty(l, u, {
        enumerable: !0,
        get: d[u]
      });
    }
    e(t, {
      bindSnapshot: function() {
        return s;
      },
      createAsyncLocalStorage: function() {
        return i;
      },
      createSnapshot: function() {
        return c;
      }
    });
    const r = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
      value: "E504",
      enumerable: !1,
      configurable: !0
    });
    class o {
      disable() {
        throw r;
      }
      getStore() {
      }
      run() {
        throw r;
      }
      exit() {
        throw r;
      }
      enterWith() {
        throw r;
      }
      static bind(d) {
        return d;
      }
    }
    const n = typeof globalThis < "u" && globalThis.AsyncLocalStorage;
    function i() {
      return n ? new n() : new o();
    }
    function s(l) {
      return n ? n.bind(l) : o.bind(l);
    }
    function c() {
      return n ? n.snapshot() : function(l, ...d) {
        return l(...d);
      };
    }
  }(_r)), _r;
}
var ma;
function Hc() {
  return ma || (ma = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "actionAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, Rn().createAsyncLocalStorage)();
  }(vr)), vr;
}
var ga;
function Uc() {
  return ga || (ga = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "actionAsyncStorage", {
      enumerable: !0,
      get: function() {
        return e.actionAsyncStorageInstance;
      }
    });
    const e = Hc();
  }(yr)), yr;
}
var xa;
function zc() {
  return xa || (xa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(m, y) {
      for (var w in y) Object.defineProperty(m, w, {
        enumerable: !0,
        get: y[w]
      });
    }
    r(e, {
      getRedirectError: function() {
        return s;
      },
      getRedirectStatusCodeFromError: function() {
        return h;
      },
      getRedirectTypeFromError: function() {
        return u;
      },
      getURLFromRedirectError: function() {
        return d;
      },
      permanentRedirect: function() {
        return l;
      },
      redirect: function() {
        return c;
      }
    });
    const o = ri(), n = ni(), i = typeof window > "u" ? Uc().actionAsyncStorage : void 0;
    function s(m, y, w = o.RedirectStatusCode.TemporaryRedirect) {
      const A = Object.defineProperty(new Error(n.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return A.digest = `${n.REDIRECT_ERROR_CODE};${y};${m};${w};`, A;
    }
    function c(m, y) {
      var w;
      throw y ?? (y = (w = i == null ? void 0 : i.getStore()) != null && w.isAction ? "push" : "replace"), s(m, y, o.RedirectStatusCode.TemporaryRedirect);
    }
    function l(m, y = "replace") {
      throw s(m, y, o.RedirectStatusCode.PermanentRedirect);
    }
    function d(m) {
      return (0, n.isRedirectError)(m) ? m.digest.split(";").slice(2, -2).join(";") : null;
    }
    function u(m) {
      if (!(0, n.isRedirectError)(m))
        throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
          value: "E260",
          enumerable: !1,
          configurable: !0
        });
      return m.digest.split(";", 2)[1];
    }
    function h(m) {
      if (!(0, n.isRedirectError)(m))
        throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
          value: "E260",
          enumerable: !1,
          configurable: !0
        });
      return Number(m.digest.split(";").at(-2));
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(rt, rt.exports)), rt.exports;
}
var ot = { exports: {} }, it = { exports: {} }, ba;
function qt() {
  return ba || (ba = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(d, u) {
      for (var h in u) Object.defineProperty(d, h, {
        enumerable: !0,
        get: u[h]
      });
    }
    r(e, {
      HTTPAccessErrorStatus: function() {
        return o;
      },
      HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return i;
      },
      getAccessFallbackErrorTypeByStatus: function() {
        return l;
      },
      getAccessFallbackHTTPStatus: function() {
        return c;
      },
      isHTTPAccessFallbackError: function() {
        return s;
      }
    });
    const o = {
      NOT_FOUND: 404,
      FORBIDDEN: 403,
      UNAUTHORIZED: 401
    }, n = new Set(Object.values(o)), i = "NEXT_HTTP_ERROR_FALLBACK";
    function s(d) {
      if (typeof d != "object" || d === null || !("digest" in d) || typeof d.digest != "string")
        return !1;
      const [u, h] = d.digest.split(";");
      return u === i && n.has(Number(h));
    }
    function c(d) {
      const u = d.digest.split(";")[1];
      return Number(u);
    }
    function l(d) {
      switch (d) {
        case 401:
          return "unauthorized";
        case 403:
          return "forbidden";
        case 404:
          return "not-found";
        default:
          return;
      }
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(it, it.exports)), it.exports;
}
var ya;
function Fc() {
  return ya || (ya = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "notFound", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const o = `${qt().HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
    function n() {
      const i = Object.defineProperty(new Error(o), "__NEXT_ERROR_CODE", {
        value: "E1041",
        enumerable: !1,
        configurable: !0
      });
      throw i.digest = o, i;
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(ot, ot.exports)), ot.exports;
}
var st = { exports: {} }, va;
function Bc() {
  return va || (va = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "forbidden", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const o = `${qt().HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
    function n() {
      if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS)
        throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
          value: "E488",
          enumerable: !1,
          configurable: !0
        });
      const i = Object.defineProperty(new Error(o), "__NEXT_ERROR_CODE", {
        value: "E1019",
        enumerable: !1,
        configurable: !0
      });
      throw i.digest = o, i;
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(st, st.exports)), st.exports;
}
var ct = { exports: {} }, _a;
function Xc() {
  return _a || (_a = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unauthorized", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const o = `${qt().HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
    function n() {
      if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS)
        throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
          value: "E411",
          enumerable: !1,
          configurable: !0
        });
      const i = Object.defineProperty(new Error(o), "__NEXT_ERROR_CODE", {
        value: "E1002",
        enumerable: !1,
        configurable: !0
      });
      throw i.digest = o, i;
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(ct, ct.exports)), ct.exports;
}
var lt = { exports: {} }, dt = { exports: {} }, Er = {}, jr = {}, wr = {}, Ea;
function Ht() {
  return Ea || (Ea = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "InvariantError", {
      enumerable: !0,
      get: function() {
        return e;
      }
    });
    class e extends Error {
      constructor(o, n) {
        super(`Invariant: ${o.endsWith(".") ? o : o + "."} This is a bug in Next.js.`, n), this.name = "InvariantError";
      }
    }
  }(wr)), wr;
}
var Rr = {}, ja;
function $c() {
  return ja || (ja = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "createPromiseWithResolvers", {
      enumerable: !0,
      get: function() {
        return e;
      }
    });
    function e() {
      let r, o;
      const n = new Promise((i, s) => {
        r = i, o = s;
      });
      return {
        resolve: r,
        reject: o,
        promise: n
      };
    }
  }(Rr)), Rr;
}
var wa;
function ai() {
  return wa || (wa = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(l, d) {
      for (var u in d) Object.defineProperty(l, u, {
        enumerable: !0,
        get: d[u]
      });
    }
    e(t, {
      RenderStage: function() {
        return n;
      },
      StagedRenderingController: function() {
        return i;
      }
    });
    const r = Ht(), o = $c();
    var n = /* @__PURE__ */ function(l) {
      return l[l.Before = 1] = "Before", l[l.EarlyStatic = 2] = "EarlyStatic", l[l.Static = 3] = "Static", l[l.EarlyRuntime = 4] = "EarlyRuntime", l[l.Runtime = 5] = "Runtime", l[l.Dynamic = 6] = "Dynamic", l[l.Abandoned = 7] = "Abandoned", l;
    }({});
    class i {
      constructor(d, u, h) {
        this.abortSignal = d, this.abandonController = u, this.shouldTrackSyncIO = h, this.currentStage = 1, this.syncInterruptReason = null, this.staticStageEndTime = 1 / 0, this.runtimeStageEndTime = 1 / 0, this.staticStageListeners = [], this.earlyRuntimeStageListeners = [], this.runtimeStageListeners = [], this.dynamicStageListeners = [], this.staticStagePromise = (0, o.createPromiseWithResolvers)(), this.earlyRuntimeStagePromise = (0, o.createPromiseWithResolvers)(), this.runtimeStagePromise = (0, o.createPromiseWithResolvers)(), this.dynamicStagePromise = (0, o.createPromiseWithResolvers)(), d && d.addEventListener("abort", () => {
          const { reason: m } = d;
          this.staticStagePromise.promise.catch(s), this.staticStagePromise.reject(m), this.earlyRuntimeStagePromise.promise.catch(s), this.earlyRuntimeStagePromise.reject(m), this.runtimeStagePromise.promise.catch(s), this.runtimeStagePromise.reject(m), this.dynamicStagePromise.promise.catch(s), this.dynamicStagePromise.reject(m);
        }, {
          once: !0
        }), u && u.signal.addEventListener("abort", () => {
          this.abandonRender();
        }, {
          once: !0
        });
      }
      onStage(d, u) {
        if (this.currentStage >= d)
          u();
        else if (d === 3)
          this.staticStageListeners.push(u);
        else if (d === 4)
          this.earlyRuntimeStageListeners.push(u);
        else if (d === 5)
          this.runtimeStageListeners.push(u);
        else if (d === 6)
          this.dynamicStageListeners.push(u);
        else
          throw Object.defineProperty(new r.InvariantError(`Invalid render stage: ${d}`), "__NEXT_ERROR_CODE", {
            value: "E881",
            enumerable: !1,
            configurable: !0
          });
      }
      shouldTrackSyncInterrupt() {
        if (!this.shouldTrackSyncIO)
          return !1;
        switch (this.currentStage) {
          case 1:
            return !1;
          case 2:
          case 3:
            return !0;
          case 4:
            return !0;
          case 5:
            return !1;
          case 6:
          case 7:
            return !1;
          default:
            return !1;
        }
      }
      syncInterruptCurrentStageWithReason(d) {
        if (this.currentStage !== 1 && this.currentStage !== 7) {
          if (this.abandonController) {
            this.abandonController.abort();
            return;
          }
          if (this.abortSignal) {
            this.syncInterruptReason = d, this.currentStage = 7;
            return;
          }
          switch (this.currentStage) {
            case 2:
            case 3:
            case 4: {
              this.syncInterruptReason = d, this.advanceStage(6);
              return;
            }
            case 5:
              return;
          }
        }
      }
      getSyncInterruptReason() {
        return this.syncInterruptReason;
      }
      getStaticStageEndTime() {
        return this.staticStageEndTime;
      }
      getRuntimeStageEndTime() {
        return this.runtimeStageEndTime;
      }
      abandonRender() {
        const { currentStage: d } = this;
        switch (d) {
          case 2:
            this.resolveStaticStage();
          case 3:
            this.resolveEarlyRuntimeStage();
          case 4:
            this.resolveRuntimeStage();
          case 5: {
            this.currentStage = 7;
            return;
          }
        }
      }
      advanceStage(d) {
        if (d <= this.currentStage)
          return;
        let u = this.currentStage;
        if (this.currentStage = d, u < 3 && d >= 3 && this.resolveStaticStage(), u < 4 && d >= 4 && this.resolveEarlyRuntimeStage(), u < 5 && d >= 5 && (this.staticStageEndTime = performance.now() + performance.timeOrigin, this.resolveRuntimeStage()), u < 6 && d >= 6) {
          this.runtimeStageEndTime = performance.now() + performance.timeOrigin, this.resolveDynamicStage();
          return;
        }
      }
      /** Fire the `onStage` listeners for the static stage and unblock any promises waiting for it. */
      resolveStaticStage() {
        const d = this.staticStageListeners;
        for (let u = 0; u < d.length; u++)
          d[u]();
        d.length = 0, this.staticStagePromise.resolve();
      }
      /** Fire the `onStage` listeners for the early runtime stage and unblock any promises waiting for it. */
      resolveEarlyRuntimeStage() {
        const d = this.earlyRuntimeStageListeners;
        for (let u = 0; u < d.length; u++)
          d[u]();
        d.length = 0, this.earlyRuntimeStagePromise.resolve();
      }
      /** Fire the `onStage` listeners for the runtime stage and unblock any promises waiting for it. */
      resolveRuntimeStage() {
        const d = this.runtimeStageListeners;
        for (let u = 0; u < d.length; u++)
          d[u]();
        d.length = 0, this.runtimeStagePromise.resolve();
      }
      /** Fire the `onStage` listeners for the dynamic stage and unblock any promises waiting for it. */
      resolveDynamicStage() {
        const d = this.dynamicStageListeners;
        for (let u = 0; u < d.length; u++)
          d[u]();
        d.length = 0, this.dynamicStagePromise.resolve();
      }
      getStagePromise(d) {
        switch (d) {
          case 3:
            return this.staticStagePromise.promise;
          case 4:
            return this.earlyRuntimeStagePromise.promise;
          case 5:
            return this.runtimeStagePromise.promise;
          case 6:
            return this.dynamicStagePromise.promise;
          default:
            throw Object.defineProperty(new r.InvariantError(`Invalid render stage: ${d}`), "__NEXT_ERROR_CODE", {
              value: "E881",
              enumerable: !1,
              configurable: !0
            });
        }
      }
      waitForStage(d) {
        return this.getStagePromise(d);
      }
      delayUntilStage(d, u, h) {
        const m = this.getStagePromise(d), y = c(m, u, h);
        return this.abortSignal && y.catch(s), y;
      }
    }
    function s() {
    }
    function c(l, d, u) {
      const h = new Promise((m, y) => {
        l.then(m.bind(null, u), y);
      });
      return d !== void 0 && (h.displayName = d), h;
    }
  }(jr)), jr;
}
var Ra;
function oi() {
  return Ra || (Ra = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(m, y) {
      for (var w in y) Object.defineProperty(m, w, {
        enumerable: !0,
        get: y[w]
      });
    }
    e(t, {
      delayUntilRuntimeStage: function() {
        return h;
      },
      getRuntimeStage: function() {
        return u;
      },
      isHangingPromiseRejectionError: function() {
        return o;
      },
      makeDevtoolsIOAwarePromise: function() {
        return d;
      },
      makeHangingPromise: function() {
        return c;
      }
    });
    const r = ai();
    function o(m) {
      return typeof m != "object" || m === null || !("digest" in m) ? !1 : m.digest === n;
    }
    const n = "HANGING_PROMISE_REJECTION";
    class i extends Error {
      constructor(y, w) {
        super(`During prerendering, ${w} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${w} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${y}".`), this.route = y, this.expression = w, this.digest = n;
      }
    }
    const s = /* @__PURE__ */ new WeakMap();
    function c(m, y, w) {
      if (m.aborted)
        return Promise.reject(new i(y, w));
      {
        const A = new Promise((T, j) => {
          const k = j.bind(null, new i(y, w));
          let D = s.get(m);
          if (D)
            D.push(k);
          else {
            const N = [
              k
            ];
            s.set(m, N), m.addEventListener("abort", () => {
              for (let p = 0; p < N.length; p++)
                N[p]();
            }, {
              once: !0
            });
          }
        });
        return A.catch(l), A;
      }
    }
    function l() {
    }
    function d(m, y, w) {
      return y.stagedRendering ? y.stagedRendering.delayUntilStage(w, void 0, m) : new Promise((A) => {
        setTimeout(() => {
          A(m);
        }, 0);
      });
    }
    function u(m) {
      return m.currentStage === r.RenderStage.EarlyStatic || m.currentStage === r.RenderStage.EarlyRuntime ? r.RenderStage.EarlyRuntime : r.RenderStage.Runtime;
    }
    function h(m, y) {
      const { stagedRendering: w } = m;
      return w ? w.waitForStage(u(w)).then(() => y) : y;
    }
  }(Er)), Er;
}
var kr = {}, ka;
function Wc() {
  return ka || (ka = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "isPostpone", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const e = Symbol.for("react.postpone");
    function r(o) {
      return typeof o == "object" && o !== null && o.$$typeof === e;
    }
  }(kr)), kr;
}
var Nr = {}, Na;
function kn() {
  return Na || (Na = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    e(t, {
      BailoutToCSRError: function() {
        return o;
      },
      isBailoutToCSRError: function() {
        return n;
      }
    });
    const r = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
    class o extends Error {
      constructor(s) {
        super(`Bail out to client-side rendering: ${s}`), this.reason = s, this.digest = r;
      }
    }
    function n(i) {
      return typeof i != "object" || i === null || !("digest" in i) ? !1 : i.digest === r;
    }
  }(Nr)), Nr;
}
var ut = { exports: {} }, Sa;
function ii() {
  return Sa || (Sa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isNextRouterError", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const r = qt(), o = ni();
    function n(i) {
      return (0, o.isRedirectError)(i) || (0, r.isHTTPAccessFallbackError)(i);
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(ut, ut.exports)), ut.exports;
}
var Sr = {}, ft = { exports: {} }, Pa;
function si() {
  return Pa || (Pa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    r(e, {
      DynamicServerError: function() {
        return n;
      },
      isDynamicServerError: function() {
        return i;
      }
    });
    const o = "DYNAMIC_SERVER_USAGE";
    class n extends Error {
      constructor(c) {
        super(`Dynamic server usage: ${c}`), this.description = c, this.digest = o;
      }
    }
    function i(s) {
      return typeof s != "object" || s === null || !("digest" in s) || typeof s.digest != "string" ? !1 : s.digest === o;
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(ft, ft.exports)), ft.exports;
}
var pt = { exports: {} }, Oa;
function Gc() {
  return Oa || (Oa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    r(e, {
      StaticGenBailoutError: function() {
        return n;
      },
      isStaticGenBailoutError: function() {
        return i;
      }
    });
    const o = "NEXT_STATIC_GEN_BAILOUT";
    class n extends Error {
      constructor(...c) {
        super(...c), this.code = o;
      }
    }
    function i(s) {
      return typeof s != "object" || s === null || !("code" in s) ? !1 : s.code === o;
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(pt, pt.exports)), pt.exports;
}
var Pr = {}, Or = {}, Ta;
function Yc() {
  return Ta || (Ta = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "workUnitAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, Rn().createAsyncLocalStorage)();
  }(Or)), Or;
}
var ht = { exports: {} }, Ca;
function Vc() {
  return Ca || (Ca = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(f, M) {
      for (var O in M) Object.defineProperty(f, O, {
        enumerable: !0,
        get: M[O]
      });
    }
    r(e, {
      ACTION_HEADER: function() {
        return n;
      },
      FLIGHT_HEADERS: function() {
        return w;
      },
      NEXT_ACTION_NOT_FOUND_HEADER: function() {
        return p;
      },
      NEXT_ACTION_REVALIDATED_HEADER: function() {
        return S;
      },
      NEXT_DID_POSTPONE_HEADER: function() {
        return j;
      },
      NEXT_HMR_REFRESH_HASH_COOKIE: function() {
        return d;
      },
      NEXT_HMR_REFRESH_HEADER: function() {
        return l;
      },
      NEXT_HTML_REQUEST_ID_HEADER: function() {
        return _;
      },
      NEXT_INSTANT_PREFETCH_HEADER: function() {
        return m;
      },
      NEXT_INSTANT_TEST_COOKIE: function() {
        return y;
      },
      NEXT_IS_PRERENDER_HEADER: function() {
        return N;
      },
      NEXT_REQUEST_ID_HEADER: function() {
        return x;
      },
      NEXT_REWRITTEN_PATH_HEADER: function() {
        return k;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function() {
        return D;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function() {
        return s;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return c;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return T;
      },
      NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return i;
      },
      NEXT_RSC_UNION_QUERY: function() {
        return A;
      },
      NEXT_URL: function() {
        return u;
      },
      RSC_CONTENT_TYPE_HEADER: function() {
        return h;
      },
      RSC_HEADER: function() {
        return o;
      }
    });
    const o = "rsc", n = "next-action", i = "next-router-state-tree", s = "next-router-prefetch", c = "next-router-segment-prefetch", l = "next-hmr-refresh", d = "__next_hmr_refresh_hash__", u = "next-url", h = "text/x-component", m = "next-instant-navigation-testing-prefetch", y = "next-instant-navigation-testing", w = [
      o,
      i,
      s,
      l,
      c
    ], A = "_rsc", T = "x-nextjs-stale-time", j = "x-nextjs-postponed", k = "x-nextjs-rewritten-path", D = "x-nextjs-rewritten-query", N = "x-nextjs-prerender", p = "x-nextjs-action-not-found", x = "x-nextjs-request-id", _ = "x-nextjs-html-request-id", S = "x-action-revalidated";
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(ht, ht.exports)), ht.exports;
}
var Ma;
function Nn() {
  return Ma || (Ma = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(j, k) {
      for (var D in k) Object.defineProperty(j, D, {
        enumerable: !0,
        get: k[D]
      });
    }
    e(t, {
      getCacheSignal: function() {
        return T;
      },
      getDraftModeProviderForCacheScope: function() {
        return w;
      },
      getHmrRefreshHash: function() {
        return h;
      },
      getPrerenderResumeDataCache: function() {
        return d;
      },
      getRenderResumeDataCache: function() {
        return u;
      },
      getServerComponentsHmrCache: function() {
        return y;
      },
      getStagedRenderingController: function() {
        return A;
      },
      isHmrRefresh: function() {
        return m;
      },
      isInEarlyRenderStage: function() {
        return s;
      },
      throwForMissingRequestStore: function() {
        return c;
      },
      throwInvariantForMissingStore: function() {
        return l;
      },
      workUnitAsyncStorage: function() {
        return r.workUnitAsyncStorageInstance;
      }
    });
    const r = Yc(), o = Vc(), n = Ht(), i = ai();
    function s(j) {
      const k = j.stagedRendering;
      return k ? k.currentStage === i.RenderStage.EarlyStatic || k.currentStage === i.RenderStage.EarlyRuntime : !1;
    }
    function c(j) {
      throw Object.defineProperty(new Error(`\`${j}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: !1,
        configurable: !0
      });
    }
    function l() {
      throw Object.defineProperty(new n.InvariantError("Expected workUnitAsyncStorage to have a store."), "__NEXT_ERROR_CODE", {
        value: "E696",
        enumerable: !1,
        configurable: !0
      });
    }
    function d(j) {
      switch (j.type) {
        case "prerender":
        case "prerender-runtime":
        case "prerender-ppr":
          return j.prerenderResumeDataCache;
        case "prerender-client":
        case "validation-client":
          return j.prerenderResumeDataCache;
        case "request":
          if (j.prerenderResumeDataCache)
            return j.prerenderResumeDataCache;
        case "prerender-legacy":
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "generate-static-params":
          return null;
        default:
          return j;
      }
    }
    function u(j) {
      switch (j.type) {
        case "request":
        case "prerender":
        case "prerender-runtime":
        case "prerender-client":
        case "validation-client":
          if (j.renderResumeDataCache)
            return j.renderResumeDataCache;
        case "prerender-ppr":
          return j.prerenderResumeDataCache ?? null;
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "prerender-legacy":
        case "generate-static-params":
          return null;
        default:
          return j;
      }
    }
    function h(j) {
      if (process.env.__NEXT_DEV_SERVER)
        switch (j.type) {
          case "cache":
          case "private-cache":
          case "prerender":
          case "prerender-runtime":
            return j.hmrRefreshHash;
          case "request":
            var k;
            return (k = j.cookies.get(o.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : k.value;
        }
    }
    function m(j) {
      if (process.env.__NEXT_DEV_SERVER)
        switch (j.type) {
          case "cache":
          case "private-cache":
          case "request":
            return j.isHmrRefresh ?? !1;
        }
      return !1;
    }
    function y(j) {
      if (process.env.__NEXT_DEV_SERVER)
        switch (j.type) {
          case "cache":
          case "private-cache":
          case "request":
            return j.serverComponentsHmrCache;
        }
    }
    function w(j, k) {
      if (j.isDraftMode)
        switch (k.type) {
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-runtime":
          case "request":
            return k.draftMode;
        }
    }
    function A(j) {
      switch (j.type) {
        case "request":
        case "prerender-runtime":
          return j.stagedRendering ?? null;
        case "prerender":
        case "prerender-client":
        case "validation-client":
        case "prerender-ppr":
        case "prerender-legacy":
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "generate-static-params":
          return null;
        default:
          return j;
      }
    }
    function T(j) {
      switch (j.type) {
        case "prerender":
        case "prerender-client":
        case "validation-client":
        case "prerender-runtime":
          return j.cacheSignal;
        case "request":
          if (j.cacheSignal)
            return j.cacheSignal;
        case "prerender-ppr":
        case "prerender-legacy":
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "generate-static-params":
          return null;
        default:
          return j;
      }
    }
  }(Pr)), Pr;
}
var Tr = {}, Cr = {}, Aa;
function Kc() {
  return Aa || (Aa = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "workAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (0, Rn().createAsyncLocalStorage)();
  }(Cr)), Cr;
}
var Da;
function Sn() {
  return Da || (Da = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "workAsyncStorage", {
      enumerable: !0,
      get: function() {
        return e.workAsyncStorageInstance;
      }
    });
    const e = Kc();
  }(Tr)), Tr;
}
var Mr = {}, Ia;
function Jc() {
  return Ia || (Ia = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      METADATA_BOUNDARY_NAME: function() {
        return r;
      },
      OUTLET_BOUNDARY_NAME: function() {
        return n;
      },
      ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return i;
      },
      VIEWPORT_BOUNDARY_NAME: function() {
        return o;
      }
    });
    const r = "__next_metadata_boundary__", o = "__next_viewport_boundary__", n = "__next_outlet_boundary__", i = "__next_root_layout_boundary__";
  }(Mr)), Mr;
}
var Ar = {}, La;
function Qc() {
  return La || (La = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      atLeastOneTask: function() {
        return n;
      },
      scheduleImmediate: function() {
        return o;
      },
      scheduleOnNextTick: function() {
        return r;
      },
      waitAtLeastOneReactRenderTask: function() {
        return i;
      }
    });
    const r = (s) => {
      Promise.resolve().then(() => {
        process.env.NEXT_RUNTIME === "edge" ? setTimeout(s, 0) : process.nextTick(s);
      });
    }, o = (s) => {
      process.env.NEXT_RUNTIME === "edge" ? setTimeout(s, 0) : setImmediate(s);
    };
    function n() {
      return new Promise((s) => o(s));
    }
    function i() {
      return process.env.NEXT_RUNTIME === "edge" ? new Promise((s) => setTimeout(s, 0)) : new Promise((s) => setImmediate(s));
    }
  }(Ar)), Ar;
}
var Dr = {}, qa;
function Zc() {
  return qa || (qa = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "INSTANT_VALIDATION_BOUNDARY_NAME", {
      enumerable: !0,
      get: function() {
        return e;
      }
    });
    const e = "__next_instant_validation_boundary__";
  }(Dr)), Dr;
}
var Ha;
function fn() {
  return Ha || (Ha = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(g, E) {
      for (var v in E) Object.defineProperty(g, v, {
        enumerable: !0,
        get: E[v]
      });
    }
    e(t, {
      DynamicHoleKind: function() {
        return hi;
      },
      Postpone: function() {
        return S;
      },
      PreludeState: function() {
        return vi;
      },
      abortAndThrowOnSynchronousRequestDataAccess: function() {
        return _;
      },
      abortOnSynchronousPlatformIOAccess: function() {
        return x;
      },
      accessedDynamicData: function() {
        return B;
      },
      annotateDynamicAccess: function() {
        return q;
      },
      consumeDynamicAccess: function() {
        return X;
      },
      createDynamicTrackingState: function() {
        return A;
      },
      createDynamicValidationState: function() {
        return T;
      },
      createHangingInputAbortSignal: function() {
        return b;
      },
      createInstantValidationState: function() {
        return mi;
      },
      createRenderInBrowserAbortSignal: function() {
        return ie;
      },
      formatDynamicAPIAccesses: function() {
        return V;
      },
      getFirstDynamicReason: function() {
        return j;
      },
      getNavigationDisallowedDynamicReasons: function() {
        return ji;
      },
      getStaticShellDisallowedDynamicReasons: function() {
        return Ei;
      },
      isDynamicPostpone: function() {
        return O;
      },
      isPrerenderInterruptedError: function() {
        return L;
      },
      logDisallowedDynamicError: function() {
        return Ut;
      },
      markCurrentScopeAsDynamic: function() {
        return k;
      },
      postponeWithTracking: function() {
        return f;
      },
      throwIfDisallowedDynamic: function() {
        return _i;
      },
      throwToInterruptStaticGeneration: function() {
        return D;
      },
      trackAllowedDynamicAccess: function() {
        return pi;
      },
      trackDynamicDataInDynamicRender: function() {
        return N;
      },
      trackDynamicHoleInNavigation: function() {
        return gi;
      },
      trackDynamicHoleInRuntimeShell: function() {
        return bi;
      },
      trackDynamicHoleInStaticShell: function() {
        return yi;
      },
      trackThrownErrorInNavigation: function() {
        return xi;
      },
      useDynamicRouteParams: function() {
        return K;
      },
      useDynamicSearchParams: function() {
        return G;
      }
    });
    const r = /* @__PURE__ */ y(we), o = si(), n = Gc(), i = Nn(), s = Sn(), c = oi(), l = Jc(), d = Qc(), u = kn(), h = Ht(), m = Zc();
    function y(g) {
      return g && g.__esModule ? g : {
        default: g
      };
    }
    const w = typeof r.default.unstable_postpone == "function";
    function A(g) {
      return {
        isDebugDynamicAccesses: g,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null
      };
    }
    function T() {
      return {
        hasSuspenseAboveBody: !1,
        hasDynamicMetadata: !1,
        dynamicMetadata: null,
        hasDynamicViewport: !1,
        hasAllowedDynamic: !1,
        dynamicErrors: []
      };
    }
    function j(g) {
      var E;
      return (E = g.dynamicAccesses[0]) == null ? void 0 : E.expression;
    }
    function k(g, E, v) {
      if (E)
        switch (E.type) {
          case "cache":
          case "unstable-cache":
            return;
          case "private-cache":
            return;
        }
      if (!(g.forceDynamic || g.forceStatic)) {
        if (g.dynamicShouldError)
          throw Object.defineProperty(new n.StaticGenBailoutError(`Route ${g.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${v}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (E)
          switch (E.type) {
            case "prerender-ppr":
              return f(g.route, v, E.dynamicTracking);
            case "prerender-legacy":
              E.revalidate = 0;
              const I = Object.defineProperty(new o.DynamicServerError(`Route ${g.route} couldn't be rendered statically because it used ${v}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                value: "E550",
                enumerable: !1,
                configurable: !0
              });
              throw g.dynamicUsageDescription = v, g.dynamicUsageStack = I.stack, I;
            case "request":
              process.env.NODE_ENV !== "production" && (E.usedDynamic = !0);
              break;
          }
      }
    }
    function D(g, E, v) {
      const I = Object.defineProperty(new o.DynamicServerError(`Route ${E.route} couldn't be rendered statically because it used \`${g}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: !1,
        configurable: !0
      });
      throw v.revalidate = 0, E.dynamicUsageDescription = g, E.dynamicUsageStack = I.stack, I;
    }
    function N(g) {
      switch (g.type) {
        case "cache":
        case "unstable-cache":
          return;
        case "private-cache":
          return;
        case "prerender":
        case "prerender-runtime":
        case "prerender-legacy":
        case "prerender-ppr":
        case "prerender-client":
        case "validation-client":
        case "generate-static-params":
          break;
        case "request":
          process.env.NODE_ENV !== "production" && (g.usedDynamic = !0);
          break;
      }
    }
    function p(g, E, v) {
      const I = `Route ${g} needs to bail out of prerendering at this point because it used ${E}.`, $ = U(I);
      v.controller.abort($);
      const W = v.dynamicTracking;
      W && W.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: W.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: E
      });
    }
    function x(g, E, v, I) {
      const $ = I.dynamicTracking;
      p(g, E, I), $ && $.syncDynamicErrorWithStack === null && ($.syncDynamicErrorWithStack = v);
    }
    function _(g, E, v, I) {
      if (I.controller.signal.aborted === !1) {
        p(g, E, I);
        const W = I.dynamicTracking;
        W && W.syncDynamicErrorWithStack === null && (W.syncDynamicErrorWithStack = v);
      }
      throw U(`Route ${g} needs to bail out of prerendering at this point because it used ${E}.`);
    }
    function S({ reason: g, route: E }) {
      const v = i.workUnitAsyncStorage.getStore(), I = v && v.type === "prerender-ppr" ? v.dynamicTracking : null;
      f(E, g, I);
    }
    function f(g, E, v) {
      J(), v && v.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: v.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: E
      }), r.default.unstable_postpone(M(g, E));
    }
    function M(g, E) {
      return `Route ${g} needs to bail out of prerendering at this point because it used ${E}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function O(g) {
      return typeof g == "object" && g !== null && typeof g.message == "string" ? C(g.message) : !1;
    }
    function C(g) {
      return g.includes("needs to bail out of prerendering at this point because it used") && g.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
    }
    if (C(M("%%%", "^^^")) === !1)
      throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: !1,
        configurable: !0
      });
    const z = "NEXT_PRERENDER_INTERRUPTED";
    function U(g) {
      const E = Object.defineProperty(new Error(g), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return E.digest = z, E;
    }
    function L(g) {
      return typeof g == "object" && g !== null && g.digest === z && "name" in g && "message" in g && g instanceof Error;
    }
    function B(g) {
      return g.length > 0;
    }
    function X(g, E) {
      return g.dynamicAccesses.push(...E.dynamicAccesses), g.dynamicAccesses;
    }
    function V(g) {
      return g.filter((E) => typeof E.stack == "string" && E.stack.length > 0).map(({ expression: E, stack: v }) => (v = v.split(`
`).slice(4).filter((I) => !(I.includes("node_modules/next/") || I.includes(" (<anonymous>)") || I.includes(" (node:"))).join(`
`), `Dynamic API Usage Debug - ${E}:
${v}`));
    }
    function J() {
      if (!w)
        throw Object.defineProperty(new Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E224",
          enumerable: !1,
          configurable: !0
        });
    }
    function ie() {
      const g = new AbortController();
      return g.abort(Object.defineProperty(new u.BailoutToCSRError("Render in Browser"), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: !1,
        configurable: !0
      })), g.signal;
    }
    function b(g) {
      switch (g.type) {
        case "prerender":
        case "prerender-runtime":
          const E = new AbortController();
          if (g.cacheSignal)
            g.cacheSignal.inputReady().then(() => {
              E.abort();
            });
          else if (
            // eslint-disable-next-line no-restricted-syntax -- We are discriminating between two different refined types and don't need an addition exhaustive switch here
            g.type === "prerender-runtime" && g.stagedRendering
          ) {
            const { stagedRendering: v } = g;
            v.waitForStage((0, c.getRuntimeStage)(v)).then(() => (0, d.scheduleOnNextTick)(() => E.abort()));
          } else
            (0, d.scheduleOnNextTick)(() => E.abort());
          return E.signal;
        case "prerender-client":
        case "validation-client":
        case "prerender-ppr":
        case "prerender-legacy":
        case "request":
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "generate-static-params":
          return;
      }
    }
    function q(g, E) {
      const v = E.dynamicTracking;
      v && v.dynamicAccesses.push({
        stack: v.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: g
      });
    }
    function K(g) {
      const E = s.workAsyncStorage.getStore(), v = i.workUnitAsyncStorage.getStore();
      if (E && v)
        switch (v.type) {
          case "prerender-client":
          case "prerender": {
            const I = v.fallbackRouteParams;
            I && I.size > 0 && r.default.use((0, c.makeHangingPromise)(v.renderSignal, E.route, g));
            break;
          }
          case "prerender-ppr": {
            const I = v.fallbackRouteParams;
            if (I && I.size > 0)
              return f(E.route, g, v.dynamicTracking);
            break;
          }
          case "validation-client":
            break;
          case "prerender-runtime":
            throw Object.defineProperty(new h.InvariantError(`\`${g}\` was called during a runtime prerender. Next.js should be preventing ${g} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E771",
              enumerable: !1,
              configurable: !0
            });
          case "cache":
          case "private-cache":
            throw Object.defineProperty(new h.InvariantError(`\`${g}\` was called inside a cache scope. Next.js should be preventing ${g} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E745",
              enumerable: !1,
              configurable: !0
            });
          case "generate-static-params":
            throw Object.defineProperty(new h.InvariantError(`\`${g}\` was called in \`generateStaticParams\`. Next.js should be preventing ${g} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E1130",
              enumerable: !1,
              configurable: !0
            });
        }
    }
    function G(g) {
      const E = s.workAsyncStorage.getStore(), v = i.workUnitAsyncStorage.getStore();
      if (E)
        switch (v || (0, i.throwForMissingRequestStore)(g), v.type) {
          case "validation-client":
            return;
          case "prerender-client": {
            r.default.use((0, c.makeHangingPromise)(v.renderSignal, E.route, g));
            break;
          }
          case "prerender-legacy":
          case "prerender-ppr": {
            if (E.forceStatic)
              return;
            throw Object.defineProperty(new u.BailoutToCSRError(g), "__NEXT_ERROR_CODE", {
              value: "E394",
              enumerable: !1,
              configurable: !0
            });
          }
          case "prerender":
          case "prerender-runtime":
            throw Object.defineProperty(new h.InvariantError(`\`${g}\` was called from a Server Component. Next.js should be preventing ${g} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E795",
              enumerable: !1,
              configurable: !0
            });
          case "cache":
          case "unstable-cache":
          case "private-cache":
            throw Object.defineProperty(new h.InvariantError(`\`${g}\` was called inside a cache scope. Next.js should be preventing ${g} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E745",
              enumerable: !1,
              configurable: !0
            });
          case "generate-static-params":
            throw Object.defineProperty(new h.InvariantError(`\`${g}\` was called in \`generateStaticParams\`. Next.js should be preventing ${g} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E1130",
              enumerable: !1,
              configurable: !0
            });
          case "request":
            return;
        }
    }
    const le = /\n\s+at Suspense \(<anonymous>\)/, xe = "body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6", Q = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${xe}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${l.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`), ue = new RegExp(`\\n\\s+at ${l.METADATA_BOUNDARY_NAME}[\\n\\s]`), be = new RegExp(`\\n\\s+at ${l.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), Ne = new RegExp(`\\n\\s+at ${l.OUTLET_BOUNDARY_NAME}[\\n\\s]`), On = new RegExp(`\\n\\s+at ${m.INSTANT_VALIDATION_BOUNDARY_NAME}[\\n\\s]`);
    function pi(g, E, v, I) {
      if (!Ne.test(E))
        if (ue.test(E)) {
          v.hasDynamicMetadata = !0;
          return;
        } else if (be.test(E)) {
          v.hasDynamicViewport = !0;
          return;
        } else if (Q.test(E)) {
          v.hasAllowedDynamic = !0, v.hasSuspenseAboveBody = !0;
          return;
        } else if (le.test(E)) {
          v.hasAllowedDynamic = !0;
          return;
        } else if (I.syncDynamicErrorWithStack) {
          v.dynamicErrors.push(I.syncDynamicErrorWithStack);
          return;
        } else {
          const $ = `Route "${g.route}": Uncached data was accessed outside of <Suspense>. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`, W = se(Object.defineProperty(new Error($), "__NEXT_ERROR_CODE", {
            value: "E1079",
            enumerable: !1,
            configurable: !0
          }), E, null);
          v.dynamicErrors.push(W);
          return;
        }
    }
    var hi = /* @__PURE__ */ function(g) {
      return g[g.Runtime = 1] = "Runtime", g[g.Dynamic = 2] = "Dynamic", g;
    }({});
    function mi(g) {
      return {
        hasDynamicMetadata: !1,
        hasAllowedClientDynamicAboveBoundary: !1,
        dynamicMetadata: null,
        hasDynamicViewport: !1,
        hasAllowedDynamic: !1,
        dynamicErrors: [],
        validationPreventingErrors: [],
        thrownErrorsOutsideBoundary: [],
        createInstantStack: g
      };
    }
    function gi(g, E, v, I, $, W) {
      if (Ne.test(E))
        return;
      if (ue.test(E)) {
        const de = $ === 1 ? "Runtime data such as `cookies()`, `headers()`, `params`, or `searchParams` was accessed inside `generateMetadata` or you have file-based metadata such as icons that depend on dynamic params segments." : "Uncached data or `connection()` was accessed inside `generateMetadata`.", Ie = `Route "${g.route}": ${de} Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`, zt = se(Object.defineProperty(new Error(Ie), "__NEXT_ERROR_CODE", {
          value: "E1076",
          enumerable: !1,
          configurable: !0
        }), E, v.createInstantStack);
        v.dynamicMetadata = zt;
        return;
      }
      if (be.test(E)) {
        const de = $ === 1 ? "Runtime data such as `cookies()`, `headers()`, `params`, or `searchParams` was accessed inside `generateViewport`." : "Uncached data or `connection()` was accessed inside `generateViewport`.", Ie = `Route "${g.route}": ${de} This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`, zt = se(Object.defineProperty(new Error(Ie), "__NEXT_ERROR_CODE", {
          value: "E1086",
          enumerable: !1,
          configurable: !0
        }), E, v.createInstantStack);
        v.dynamicErrors.push(zt);
        return;
      }
      const ee = On.exec(E);
      if (ee) {
        const de = le.exec(E);
        if (de && de.index < ee.index) {
          v.hasAllowedDynamic = !0;
          return;
        }
      } else if (W.expectedIds.size === W.renderedIds.size) {
        v.hasAllowedClientDynamicAboveBoundary = !0, v.hasAllowedDynamic = !0;
        return;
      } else {
        const de = `Route "${g.route}": Could not validate \`unstable_instant\` because a Client Component in a parent segment prevented the page from rendering.`, Ie = se(Object.defineProperty(new Error(de), "__NEXT_ERROR_CODE", {
          value: "E1082",
          enumerable: !1,
          configurable: !0
        }), E, v.createInstantStack);
        v.validationPreventingErrors.push(Ie);
        return;
      }
      if (I.syncDynamicErrorWithStack) {
        const de = I.syncDynamicErrorWithStack;
        v.createInstantStack !== null && de.cause === void 0 && (de.cause = v.createInstantStack()), v.dynamicErrors.push(de);
        return;
      }
      const oe = $ === 1 ? "Runtime data such as `cookies()`, `headers()`, `params`, or `searchParams` was accessed outside of `<Suspense>`." : "Uncached data or `connection()` was accessed outside of `<Suspense>`.", Ee = `Route "${g.route}": ${oe} This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`, ce = se(Object.defineProperty(new Error(Ee), "__NEXT_ERROR_CODE", {
        value: "E1078",
        enumerable: !1,
        configurable: !0
      }), E, v.createInstantStack);
      v.dynamicErrors.push(ce);
    }
    function xi(g, E, v, I) {
      const $ = On.exec(I);
      if ($) {
        const W = le.exec(I);
        if (W && W.index < $.index)
          return;
        const ee = `Route "${g.route}": Could not validate \`unstable_instant\` because an error prevented the target segment from rendering.`, oe = se(
          Object.defineProperty(new Error(ee, {
            cause: v
          }), "__NEXT_ERROR_CODE", {
            value: "E1112",
            enumerable: !1,
            configurable: !0
          }),
          I,
          null
          // TODO(instant-validation-build): conflicting use of cause
        );
        E.validationPreventingErrors.push(oe);
      } else {
        const W = se(Object.defineProperty(new Error("An error occurred while attempting to validate instant UI. This error may be preventing the validation from completing.", {
          cause: v
        }), "__NEXT_ERROR_CODE", {
          value: "E1118",
          enumerable: !1,
          configurable: !0
        }), I, null);
        E.thrownErrorsOutsideBoundary.push(W);
      }
    }
    function bi(g, E, v, I) {
      if (Ne.test(E))
        return;
      if (ue.test(E)) {
        const ee = `Route "${g.route}": Uncached data or \`connection()\` was accessed inside \`generateMetadata\`. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`, oe = se(Object.defineProperty(new Error(ee), "__NEXT_ERROR_CODE", {
          value: "E1080",
          enumerable: !1,
          configurable: !0
        }), E, null);
        v.dynamicMetadata = oe;
        return;
      } else if (be.test(E)) {
        const ee = `Route "${g.route}": Uncached data or \`connection()\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`, oe = se(Object.defineProperty(new Error(ee), "__NEXT_ERROR_CODE", {
          value: "E1077",
          enumerable: !1,
          configurable: !0
        }), E, null);
        v.dynamicErrors.push(oe);
        return;
      } else if (Q.test(E)) {
        v.hasAllowedDynamic = !0, v.hasSuspenseAboveBody = !0;
        return;
      } else if (le.test(E)) {
        v.hasAllowedDynamic = !0;
        return;
      } else if (I.syncDynamicErrorWithStack) {
        v.dynamicErrors.push(I.syncDynamicErrorWithStack);
        return;
      }
      const $ = `Route "${g.route}": Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`, W = se(Object.defineProperty(new Error($), "__NEXT_ERROR_CODE", {
        value: "E1084",
        enumerable: !1,
        configurable: !0
      }), E, null);
      v.dynamicErrors.push(W);
    }
    function yi(g, E, v, I) {
      if (!Ne.test(E))
        if (ue.test(E)) {
          const $ = `Route "${g.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`, W = se(Object.defineProperty(new Error($), "__NEXT_ERROR_CODE", {
            value: "E1085",
            enumerable: !1,
            configurable: !0
          }), E, null);
          v.dynamicMetadata = W;
          return;
        } else if (be.test(E)) {
          const $ = `Route "${g.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`, W = se(Object.defineProperty(new Error($), "__NEXT_ERROR_CODE", {
            value: "E1081",
            enumerable: !1,
            configurable: !0
          }), E, null);
          v.dynamicErrors.push(W);
          return;
        } else if (Q.test(E)) {
          v.hasAllowedDynamic = !0, v.hasSuspenseAboveBody = !0;
          return;
        } else if (le.test(E)) {
          v.hasAllowedDynamic = !0;
          return;
        } else if (I.syncDynamicErrorWithStack) {
          v.dynamicErrors.push(I.syncDynamicErrorWithStack);
          return;
        } else {
          const $ = `Route "${g.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`, W = se(Object.defineProperty(new Error($), "__NEXT_ERROR_CODE", {
            value: "E1083",
            enumerable: !1,
            configurable: !0
          }), E, null);
          v.dynamicErrors.push(W);
          return;
        }
    }
    function se(g, E, v) {
      const I = process.env.NODE_ENV !== "production" && r.default.captureOwnerStack ? r.default.captureOwnerStack() : null;
      return v !== null && (g.cause = v()), g.stack = g.name + ": " + g.message + (I || E), g;
    }
    var vi = /* @__PURE__ */ function(g) {
      return g[g.Full = 0] = "Full", g[g.Empty = 1] = "Empty", g[g.Errored = 2] = "Errored", g;
    }({});
    function Ut(g, E) {
      console.error(E), process.env.NODE_ENV !== "development" ? console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${g.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`) : process.env.__NEXT_DEV_SERVER || console.error(`To debug the issue, start the app in development mode by running \`next dev\`, then open "${g.route}" in your browser to investigate the error.`);
    }
    function _i(g, E, v, I) {
      if (I.syncDynamicErrorWithStack)
        throw Ut(g, I.syncDynamicErrorWithStack), new n.StaticGenBailoutError();
      if (E !== 0) {
        if (v.hasSuspenseAboveBody)
          return;
        const $ = v.dynamicErrors;
        if ($.length > 0) {
          for (let W = 0; W < $.length; W++)
            Ut(g, $[W]);
          throw new n.StaticGenBailoutError();
        }
        if (v.hasDynamicViewport)
          throw console.error(`Route "${g.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`), new n.StaticGenBailoutError();
        if (E === 1)
          throw console.error(`Route "${g.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`), new n.StaticGenBailoutError();
      } else if (v.hasAllowedDynamic === !1 && v.hasDynamicMetadata)
        throw console.error(`Route "${g.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`), new n.StaticGenBailoutError();
    }
    function Ei(g, E, v, I) {
      if (I || v.hasSuspenseAboveBody)
        return [];
      if (E !== 0) {
        const $ = v.dynamicErrors;
        if ($.length > 0)
          return $;
        if (E === 1)
          return [
            Object.defineProperty(new h.InvariantError(`Route "${g.route}" did not produce a static shell and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
              value: "E936",
              enumerable: !1,
              configurable: !0
            })
          ];
      } else if (v.hasAllowedDynamic === !1 && v.dynamicErrors.length === 0 && v.dynamicMetadata)
        return [
          v.dynamicMetadata
        ];
      return [];
    }
    function ji(g, E, v, I, $) {
      if (I) {
        const { missingSampleErrors: ee } = I;
        if (ee.length > 0)
          return ee;
      }
      const { validationPreventingErrors: W } = v;
      if (W.length > 0)
        return W;
      if ($.renderedIds.size < $.expectedIds.size) {
        const { thrownErrorsOutsideBoundary: ee, createInstantStack: oe } = v;
        if (ee.length === 0) {
          const Ee = `Route "${g.route}": Could not validate \`unstable_instant\` because the target segment was prevented from rendering for an unknown reason.`, ce = oe !== null ? oe() : new Error();
          return ce.name = "Error", ce.message = Ee, [
            ce
          ];
        } else if (ee.length === 1) {
          const Ee = `Route "${g.route}": Could not validate \`unstable_instant\` because the target segment was prevented from rendering, likely due to the following error.`, ce = oe !== null ? oe() : new Error();
          return ce.name = "Error", ce.message = Ee, [
            ce,
            ee[0]
          ];
        } else {
          const Ee = `Route "${g.route}": Could not validate \`unstable_instant\` because the target segment was prevented from rendering, likely due to one of the following errors.`, ce = oe !== null ? oe() : new Error();
          return ce.name = "Error", ce.message = Ee, [
            ce,
            ...ee
          ];
        }
      }
      if (E !== 0) {
        const ee = v.dynamicErrors;
        if (ee.length > 0)
          return ee;
        if (E === 1)
          return v.hasAllowedClientDynamicAboveBoundary ? [] : [
            Object.defineProperty(new h.InvariantError(`Route "${g.route}" failed to render during instant validation and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
              value: "E1055",
              enumerable: !1,
              configurable: !0
            })
          ];
      } else {
        const ee = v.dynamicErrors;
        if (ee.length > 0)
          return ee;
        if (v.hasAllowedDynamic === !1 && v.dynamicMetadata)
          return [
            v.dynamicMetadata
          ];
      }
      return [];
    }
  }(Sr)), Sr;
}
var Ua;
function el() {
  return Ua || (Ua = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const r = oi(), o = Wc(), n = kn(), i = ii(), s = fn(), c = si();
    function l(d) {
      if ((0, i.isNextRouterError)(d) || (0, n.isBailoutToCSRError)(d) || (0, c.isDynamicServerError)(d) || (0, s.isDynamicPostpone)(d) || (0, o.isPostpone)(d) || (0, r.isHangingPromiseRejectionError)(d) || (0, s.isPrerenderInterruptedError)(d))
        throw d;
      d instanceof Error && "cause" in d && l(d.cause);
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(dt, dt.exports)), dt.exports;
}
var mt = { exports: {} }, za;
function tl() {
  return za || (za = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const r = kn(), o = ii();
    function n(i) {
      if ((0, o.isNextRouterError)(i) || (0, r.isBailoutToCSRError)(i))
        throw i;
      i instanceof Error && "cause" in i && n(i.cause);
    }
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(mt, mt.exports)), mt.exports;
}
var Fa;
function rl() {
  return Fa || (Fa = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = typeof window > "u" ? el().unstable_rethrow : tl().unstable_rethrow;
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(lt, lt.exports)), lt.exports;
}
var Ba;
function nl() {
  return Ba || (Ba = 1, function(t, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function r(h, m) {
      for (var y in m) Object.defineProperty(h, y, {
        enumerable: !0,
        get: m[y]
      });
    }
    r(e, {
      ReadonlyURLSearchParams: function() {
        return o.ReadonlyURLSearchParams;
      },
      RedirectType: function() {
        return u;
      },
      forbidden: function() {
        return s.forbidden;
      },
      notFound: function() {
        return i.notFound;
      },
      permanentRedirect: function() {
        return n.permanentRedirect;
      },
      redirect: function() {
        return n.redirect;
      },
      unauthorized: function() {
        return c.unauthorized;
      },
      unstable_isUnrecognizedActionError: function() {
        return d;
      },
      unstable_rethrow: function() {
        return l.unstable_rethrow;
      }
    });
    const o = ei(), n = zc(), i = Fc(), s = Bc(), c = Xc(), l = rl();
    function d() {
      throw Object.defineProperty(new Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: !1,
        configurable: !0
      });
    }
    const u = {
      push: "push",
      replace: "replace"
    };
    (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
  }(tt, tt.exports)), tt.exports;
}
var Ir = {}, Lr = {}, qr = {}, Hr, Xa;
function al() {
  if (Xa) return Hr;
  Xa = 1;
  var t = Object.defineProperty, e = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, n = (p, x) => {
    for (var _ in x)
      t(p, _, { get: x[_], enumerable: !0 });
  }, i = (p, x, _, S) => {
    if (x && typeof x == "object" || typeof x == "function")
      for (let f of r(x))
        !o.call(p, f) && f !== _ && t(p, f, { get: () => x[f], enumerable: !(S = e(x, f)) || S.enumerable });
    return p;
  }, s = (p) => i(t({}, "__esModule", { value: !0 }), p), c = {};
  n(c, {
    RequestCookies: () => j,
    ResponseCookies: () => k,
    parseCookie: () => d,
    parseSetCookie: () => u,
    stringifyCookie: () => l
  }), Hr = s(c);
  function l(p) {
    var x;
    const _ = [
      "path" in p && p.path && `Path=${p.path}`,
      "expires" in p && (p.expires || p.expires === 0) && `Expires=${(typeof p.expires == "number" ? new Date(p.expires) : p.expires).toUTCString()}`,
      "maxAge" in p && typeof p.maxAge == "number" && `Max-Age=${p.maxAge}`,
      "domain" in p && p.domain && `Domain=${p.domain}`,
      "secure" in p && p.secure && "Secure",
      "httpOnly" in p && p.httpOnly && "HttpOnly",
      "sameSite" in p && p.sameSite && `SameSite=${p.sameSite}`,
      "partitioned" in p && p.partitioned && "Partitioned",
      "priority" in p && p.priority && `Priority=${p.priority}`
    ].filter(Boolean), S = `${p.name}=${encodeURIComponent((x = p.value) != null ? x : "")}`;
    return _.length === 0 ? S : `${S}; ${_.join("; ")}`;
  }
  function d(p) {
    const x = /* @__PURE__ */ new Map();
    for (const _ of p.split(/; */)) {
      if (!_)
        continue;
      const S = _.indexOf("=");
      if (S === -1) {
        x.set(_, "true");
        continue;
      }
      const [f, M] = [_.slice(0, S), _.slice(S + 1)];
      try {
        x.set(f, decodeURIComponent(M ?? "true"));
      } catch {
      }
    }
    return x;
  }
  function u(p) {
    if (!p)
      return;
    const [[x, _], ...S] = d(p), {
      domain: f,
      expires: M,
      httponly: O,
      maxage: C,
      path: z,
      samesite: U,
      secure: L,
      partitioned: B,
      priority: X
    } = Object.fromEntries(
      S.map(([J, ie]) => [
        J.toLowerCase().replace(/-/g, ""),
        ie
      ])
    ), V = {
      name: x,
      value: decodeURIComponent(_),
      domain: f,
      ...M && { expires: new Date(M) },
      ...O && { httpOnly: !0 },
      ...typeof C == "string" && { maxAge: Number(C) },
      path: z,
      ...U && { sameSite: y(U) },
      ...L && { secure: !0 },
      ...X && { priority: A(X) },
      ...B && { partitioned: !0 }
    };
    return h(V);
  }
  function h(p) {
    const x = {};
    for (const _ in p)
      p[_] && (x[_] = p[_]);
    return x;
  }
  var m = ["strict", "lax", "none"];
  function y(p) {
    return p = p.toLowerCase(), m.includes(p) ? p : void 0;
  }
  var w = ["low", "medium", "high"];
  function A(p) {
    return p = p.toLowerCase(), w.includes(p) ? p : void 0;
  }
  function T(p) {
    if (!p)
      return [];
    var x = [], _ = 0, S, f, M, O, C;
    function z() {
      for (; _ < p.length && /\s/.test(p.charAt(_)); )
        _ += 1;
      return _ < p.length;
    }
    function U() {
      return f = p.charAt(_), f !== "=" && f !== ";" && f !== ",";
    }
    for (; _ < p.length; ) {
      for (S = _, C = !1; z(); )
        if (f = p.charAt(_), f === ",") {
          for (M = _, _ += 1, z(), O = _; _ < p.length && U(); )
            _ += 1;
          _ < p.length && p.charAt(_) === "=" ? (C = !0, _ = O, x.push(p.substring(S, M)), S = _) : _ = M + 1;
        } else
          _ += 1;
      (!C || _ >= p.length) && x.push(p.substring(S, p.length));
    }
    return x;
  }
  var j = class {
    constructor(p) {
      this._parsed = /* @__PURE__ */ new Map(), this._headers = p;
      const x = p.get("cookie");
      if (x) {
        const _ = d(x);
        for (const [S, f] of _)
          this._parsed.set(S, { name: S, value: f });
      }
    }
    [Symbol.iterator]() {
      return this._parsed[Symbol.iterator]();
    }
    /**
     * The amount of cookies received from the client
     */
    get size() {
      return this._parsed.size;
    }
    get(...p) {
      const x = typeof p[0] == "string" ? p[0] : p[0].name;
      return this._parsed.get(x);
    }
    getAll(...p) {
      var x;
      const _ = Array.from(this._parsed);
      if (!p.length)
        return _.map(([f, M]) => M);
      const S = typeof p[0] == "string" ? p[0] : (x = p[0]) == null ? void 0 : x.name;
      return _.filter(([f]) => f === S).map(([f, M]) => M);
    }
    has(p) {
      return this._parsed.has(p);
    }
    set(...p) {
      const [x, _] = p.length === 1 ? [p[0].name, p[0].value] : p, S = this._parsed;
      return S.set(x, { name: x, value: _ }), this._headers.set(
        "cookie",
        Array.from(S).map(([f, M]) => l(M)).join("; ")
      ), this;
    }
    /**
     * Delete the cookies matching the passed name or names in the request.
     */
    delete(p) {
      const x = this._parsed, _ = Array.isArray(p) ? p.map((S) => x.delete(S)) : x.delete(p);
      return this._headers.set(
        "cookie",
        Array.from(x).map(([S, f]) => l(f)).join("; ")
      ), _;
    }
    /**
     * Delete all the cookies in the cookies in the request.
     */
    clear() {
      return this.delete(Array.from(this._parsed.keys())), this;
    }
    /**
     * Format the cookies in the request as a string for logging
     */
    [Symbol.for("edge-runtime.inspect.custom")]() {
      return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
      return [...this._parsed.values()].map((p) => `${p.name}=${encodeURIComponent(p.value)}`).join("; ");
    }
  }, k = class {
    constructor(p) {
      this._parsed = /* @__PURE__ */ new Map();
      var x, _, S;
      this._headers = p;
      const f = (S = (_ = (x = p.getSetCookie) == null ? void 0 : x.call(p)) != null ? _ : p.get("set-cookie")) != null ? S : [], M = Array.isArray(f) ? f : T(f);
      for (const O of M) {
        const C = u(O);
        C && this._parsed.set(C.name, C);
      }
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
     */
    get(...p) {
      const x = typeof p[0] == "string" ? p[0] : p[0].name;
      return this._parsed.get(x);
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
     */
    getAll(...p) {
      var x;
      const _ = Array.from(this._parsed.values());
      if (!p.length)
        return _;
      const S = typeof p[0] == "string" ? p[0] : (x = p[0]) == null ? void 0 : x.name;
      return _.filter((f) => f.name === S);
    }
    has(p) {
      return this._parsed.has(p);
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
     */
    set(...p) {
      const [x, _, S] = p.length === 1 ? [p[0].name, p[0].value, p[0]] : p, f = this._parsed;
      return f.set(x, N({ name: x, value: _, ...S })), D(f, this._headers), this;
    }
    /**
     * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
     */
    delete(...p) {
      const [x, _] = typeof p[0] == "string" ? [p[0]] : [p[0].name, p[0]];
      return this.set({ ..._, name: x, value: "", expires: /* @__PURE__ */ new Date(0) });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
      return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
      return [...this._parsed.values()].map(l).join("; ");
    }
  };
  function D(p, x) {
    x.delete("set-cookie");
    for (const [, _] of p) {
      const S = l(_);
      x.append("set-cookie", S);
    }
  }
  function N(p = { name: "", value: "" }) {
    return typeof p.expires == "number" && (p.expires = new Date(p.expires)), p.maxAge && (p.expires = new Date(Date.now() + p.maxAge * 1e3)), (p.path === null || p.path === void 0) && (p.path = "/"), p;
  }
  return Hr;
}
var $a;
function ci() {
  return $a || ($a = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(o, n) {
      for (var i in n) Object.defineProperty(o, i, {
        enumerable: !0,
        get: n[i]
      });
    }
    e(t, {
      RequestCookies: function() {
        return r.RequestCookies;
      },
      ResponseCookies: function() {
        return r.ResponseCookies;
      },
      stringifyCookie: function() {
        return r.stringifyCookie;
      }
    });
    const r = al();
  }(qr)), qr;
}
var Ur = {}, zr = {}, Wa;
function li() {
  return Wa || (Wa = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ReflectAdapter", {
      enumerable: !0,
      get: function() {
        return e;
      }
    });
    class e {
      static get(o, n, i) {
        const s = Reflect.get(o, n, i);
        return typeof s == "function" ? s.bind(o) : s;
      }
      static set(o, n, i, s) {
        return Reflect.set(o, n, i, s);
      }
      static has(o, n) {
        return Reflect.has(o, n);
      }
      static deleteProperty(o, n) {
        return Reflect.deleteProperty(o, n);
      }
    }
  }(zr)), zr;
}
var Fr = {}, Ga;
function ol() {
  return Ga || (Ga = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    e(t, {
      ActionDidNotRevalidate: function() {
        return r;
      },
      ActionDidRevalidateDynamicOnly: function() {
        return n;
      },
      ActionDidRevalidateStaticAndDynamic: function() {
        return o;
      }
    });
    const r = 0, o = 1, n = 2;
  }(Fr)), Fr;
}
var Ya;
function il() {
  return Ya || (Ya = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(T, j) {
      for (var k in j) Object.defineProperty(T, k, {
        enumerable: !0,
        get: j[k]
      });
    }
    e(t, {
      MutableRequestCookiesAdapter: function() {
        return h;
      },
      ReadonlyRequestCookiesError: function() {
        return s;
      },
      RequestCookiesAdapter: function() {
        return c;
      },
      appendMutableCookies: function() {
        return u;
      },
      areCookiesMutableInCurrentPhase: function() {
        return y;
      },
      createCookiesWithMutableAccessCheck: function() {
        return m;
      },
      getModifiedCookieValues: function() {
        return d;
      },
      responseCookiesToRequestCookies: function() {
        return A;
      }
    });
    const r = ci(), o = li(), n = Sn(), i = ol();
    class s extends Error {
      constructor() {
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
      }
      static callable() {
        throw new s();
      }
    }
    class c {
      static seal(j) {
        return new Proxy(j, {
          get(k, D, N) {
            switch (D) {
              case "clear":
              case "delete":
              case "set":
                return s.callable;
              default:
                return o.ReflectAdapter.get(k, D, N);
            }
          }
        });
      }
    }
    const l = Symbol.for("next.mutated.cookies");
    function d(T) {
      const j = T[l];
      return !j || !Array.isArray(j) || j.length === 0 ? [] : j;
    }
    function u(T, j) {
      const k = d(j);
      if (k.length === 0)
        return !1;
      const D = new r.ResponseCookies(T), N = D.getAll();
      for (const p of k)
        D.set(p);
      for (const p of N)
        D.set(p);
      return !0;
    }
    class h {
      static wrap(j, k) {
        const D = new r.ResponseCookies(new Headers());
        for (const S of j.getAll())
          D.set(S);
        let N = [];
        const p = /* @__PURE__ */ new Set(), x = () => {
          const S = n.workAsyncStorage.getStore();
          if (S && (S.pathWasRevalidated = i.ActionDidRevalidateStaticAndDynamic), N = D.getAll().filter((M) => p.has(M.name)), k) {
            const M = [];
            for (const O of N) {
              const C = new r.ResponseCookies(new Headers());
              C.set(O), M.push(C.toString());
            }
            k(M);
          }
        }, _ = new Proxy(D, {
          get(S, f, M) {
            switch (f) {
              case l:
                return N;
              case "delete":
                return function(...O) {
                  p.add(typeof O[0] == "string" ? O[0] : O[0].name);
                  try {
                    return S.delete(...O), _;
                  } finally {
                    x();
                  }
                };
              case "set":
                return function(...O) {
                  p.add(typeof O[0] == "string" ? O[0] : O[0].name);
                  try {
                    return S.set(...O), _;
                  } finally {
                    x();
                  }
                };
              default:
                return o.ReflectAdapter.get(S, f, M);
            }
          }
        });
        return _;
      }
    }
    function m(T) {
      const j = new Proxy(T.mutableCookies, {
        get(k, D, N) {
          switch (D) {
            case "delete":
              return function(...p) {
                return w(T), k.delete(...p), j;
              };
            case "set":
              return function(...p) {
                return w(T), k.set(...p), j;
              };
            default:
              return o.ReflectAdapter.get(k, D, N);
          }
        }
      });
      return j;
    }
    function y(T) {
      return T.phase === "action";
    }
    function w(T, j) {
      if (!y(T))
        throw new s();
    }
    function A(T) {
      const j = new r.RequestCookies(new Headers());
      for (const k of T.getAll())
        j.set(k);
      return j;
    }
  }(Ur)), Ur;
}
var Br = {}, Va;
function sl() {
  return Va || (Va = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    e(t, {
      HeadersAdapter: function() {
        return n;
      },
      ReadonlyHeadersError: function() {
        return o;
      }
    });
    const r = li();
    class o extends Error {
      constructor() {
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
      }
      static callable() {
        throw new o();
      }
    }
    class n extends Headers {
      constructor(s) {
        super(), this.headers = new Proxy(s, {
          get(c, l, d) {
            if (typeof l == "symbol")
              return r.ReflectAdapter.get(c, l, d);
            const u = l.toLowerCase(), h = Object.keys(s).find((m) => m.toLowerCase() === u);
            if (!(typeof h > "u"))
              return r.ReflectAdapter.get(c, h, d);
          },
          set(c, l, d, u) {
            if (typeof l == "symbol")
              return r.ReflectAdapter.set(c, l, d, u);
            const h = l.toLowerCase(), m = Object.keys(s).find((y) => y.toLowerCase() === h);
            return r.ReflectAdapter.set(c, m ?? l, d, u);
          },
          has(c, l) {
            if (typeof l == "symbol") return r.ReflectAdapter.has(c, l);
            const d = l.toLowerCase(), u = Object.keys(s).find((h) => h.toLowerCase() === d);
            return typeof u > "u" ? !1 : r.ReflectAdapter.has(c, u);
          },
          deleteProperty(c, l) {
            if (typeof l == "symbol") return r.ReflectAdapter.deleteProperty(c, l);
            const d = l.toLowerCase(), u = Object.keys(s).find((h) => h.toLowerCase() === d);
            return typeof u > "u" ? !0 : r.ReflectAdapter.deleteProperty(c, u);
          }
        });
      }
      /**
      * Seals a Headers instance to prevent modification by throwing an error when
      * any mutating method is called.
      */
      static seal(s) {
        return new Proxy(s, {
          get(c, l, d) {
            switch (l) {
              case "append":
              case "delete":
              case "set":
                return o.callable;
              default:
                return r.ReflectAdapter.get(c, l, d);
            }
          }
        });
      }
      /**
      * Merges a header value into a string. This stores multiple values as an
      * array, so we need to merge them into a string.
      *
      * @param value a header value
      * @returns a merged header value (a string)
      */
      merge(s) {
        return Array.isArray(s) ? s.join(", ") : s;
      }
      /**
      * Creates a Headers instance from a plain object or a Headers instance.
      *
      * @param headers a plain object or a Headers instance
      * @returns a headers instance
      */
      static from(s) {
        return s instanceof Headers ? s : new n(s);
      }
      append(s, c) {
        const l = this.headers[s];
        typeof l == "string" ? this.headers[s] = [
          l,
          c
        ] : Array.isArray(l) ? l.push(c) : this.headers[s] = c;
      }
      delete(s) {
        delete this.headers[s];
      }
      get(s) {
        const c = this.headers[s];
        return typeof c < "u" ? this.merge(c) : null;
      }
      has(s) {
        return typeof this.headers[s] < "u";
      }
      set(s, c) {
        this.headers[s] = c;
      }
      forEach(s, c) {
        for (const [l, d] of this.entries())
          s.call(c, d, l, this);
      }
      *entries() {
        for (const s of Object.keys(this.headers)) {
          const c = s.toLowerCase(), l = this.get(c);
          yield [
            c,
            l
          ];
        }
      }
      *keys() {
        for (const s of Object.keys(this.headers))
          yield s.toLowerCase();
      }
      *values() {
        for (const s of Object.keys(this.headers))
          yield this.get(s);
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    }
  }(Br)), Br;
}
var Xr = {}, $r = {}, Wr = {}, Gr = {}, Ka;
function cl() {
  return Ka || (Ka = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ensureLeadingSlash", {
      enumerable: !0,
      get: function() {
        return e;
      }
    });
    function e(r) {
      return r.startsWith("/") ? r : `/${r}`;
    }
  }(Gr)), Gr;
}
var Ja;
function ll() {
  return Ja || (Ja = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(c, l) {
      for (var d in l) Object.defineProperty(c, d, {
        enumerable: !0,
        get: l[d]
      });
    }
    e(t, {
      compareAppPaths: function() {
        return i;
      },
      normalizeAppPath: function() {
        return n;
      },
      normalizeRscURL: function() {
        return s;
      }
    });
    const r = cl(), o = ti();
    function n(c) {
      return (0, r.ensureLeadingSlash)(c.split("/").reduce((l, d, u, h) => !d || (0, o.isGroupSegment)(d) || d[0] === "@" || (d === "page" || d === "route") && u === h.length - 1 ? l : `${l}/${d}`, ""));
    }
    function i(c, l) {
      const d = c.includes("/@"), u = l.includes("/@");
      return d && !u ? -1 : !d && u ? 1 : c.localeCompare(l);
    }
    function s(c) {
      return c.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }(Wr)), Wr;
}
var Qa;
function dl() {
  return Qa || (Qa = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return o;
      },
      extractInterceptionRouteInformation: function() {
        return i;
      },
      isInterceptionRouteAppPath: function() {
        return n;
      }
    });
    const r = ll(), o = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function n(s) {
      return s.split("/").find((c) => o.find((l) => c.startsWith(l))) !== void 0;
    }
    function i(s) {
      let c, l, d;
      for (const u of s.split("/"))
        if (l = o.find((h) => u.startsWith(h)), l) {
          [c, d] = s.split(l, 2);
          break;
        }
      if (!c || !l || !d)
        throw Object.defineProperty(new Error(`Invalid interception route: ${s}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
          value: "E269",
          enumerable: !1,
          configurable: !0
        });
      switch (c = (0, r.normalizeAppPath)(c), l) {
        case "(.)":
          c === "/" ? d = `/${d}` : d = c + "/" + d;
          break;
        case "(..)":
          if (c === "/")
            throw Object.defineProperty(new Error(`Invalid interception route: ${s}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
              value: "E207",
              enumerable: !1,
              configurable: !0
            });
          d = c.split("/").slice(0, -1).concat(d).join("/");
          break;
        case "(...)":
          d = "/" + d;
          break;
        case "(..)(..)":
          const u = c.split("/");
          if (u.length <= 2)
            throw Object.defineProperty(new Error(`Invalid interception route: ${s}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
              value: "E486",
              enumerable: !1,
              configurable: !0
            });
          d = u.slice(0, -2).concat(d).join("/");
          break;
        default:
          throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
            value: "E112",
            enumerable: !1,
            configurable: !0
          });
      }
      return {
        interceptingRoute: c,
        interceptedRoute: d
      };
    }
  }($r)), $r;
}
var Za;
function ul() {
  return Za || (Za = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      getParamProperties: function() {
        return i;
      },
      getSegmentParam: function() {
        return o;
      },
      isCatchAll: function() {
        return n;
      }
    });
    const r = dl();
    function o(s) {
      const c = r.INTERCEPTION_ROUTE_MARKERS.find((l) => s.startsWith(l));
      return c && (s = s.slice(c.length)), s.startsWith("[[...") && s.endsWith("]]") ? {
        // TODO-APP: Optional catchall does not currently work with parallel routes,
        // so for now aren't handling a potential interception marker.
        paramType: "optional-catchall",
        paramName: s.slice(5, -2)
      } : s.startsWith("[...") && s.endsWith("]") ? {
        paramType: c ? `catchall-intercepted-${c}` : "catchall",
        paramName: s.slice(4, -1)
      } : s.startsWith("[") && s.endsWith("]") ? {
        paramType: c ? `dynamic-intercepted-${c}` : "dynamic",
        paramName: s.slice(1, -1)
      } : null;
    }
    function n(s) {
      return s === "catchall" || s === "catchall-intercepted-(..)(..)" || s === "catchall-intercepted-(.)" || s === "catchall-intercepted-(..)" || s === "catchall-intercepted-(...)" || s === "optional-catchall";
    }
    function i(s) {
      let c = !1, l = !1;
      switch (s) {
        case "catchall":
        case "catchall-intercepted-(..)(..)":
        case "catchall-intercepted-(.)":
        case "catchall-intercepted-(..)":
        case "catchall-intercepted-(...)":
          c = !0;
          break;
        case "optional-catchall":
          c = !0, l = !0;
          break;
      }
      return {
        repeat: c,
        optional: l
      };
    }
  }(Xr)), Xr;
}
var Yr = {}, Vr = {}, eo;
function fl() {
  return eo || (eo = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(N, p) {
      for (var x in p) Object.defineProperty(N, x, {
        enumerable: !0,
        get: p[x]
      });
    }
    e(t, {
      DecodeError: function() {
        return w;
      },
      MiddlewareNotFoundError: function() {
        return k;
      },
      MissingStaticPage: function() {
        return j;
      },
      NormalizeError: function() {
        return A;
      },
      PageNotFoundError: function() {
        return T;
      },
      SP: function() {
        return m;
      },
      ST: function() {
        return y;
      },
      WEB_VITALS: function() {
        return r;
      },
      execOnce: function() {
        return o;
      },
      getDisplayName: function() {
        return l;
      },
      getLocationOrigin: function() {
        return s;
      },
      getURL: function() {
        return c;
      },
      isAbsoluteUrl: function() {
        return i;
      },
      isResSent: function() {
        return d;
      },
      loadGetInitialProps: function() {
        return h;
      },
      normalizeRepeatedSlashes: function() {
        return u;
      },
      stringifyError: function() {
        return D;
      }
    });
    const r = [
      "CLS",
      "FCP",
      "FID",
      "INP",
      "LCP",
      "TTFB"
    ];
    function o(N) {
      let p = !1, x;
      return (..._) => (p || (p = !0, x = N(..._)), x);
    }
    const n = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, i = (N) => n.test(N);
    function s() {
      const { protocol: N, hostname: p, port: x } = window.location;
      return `${N}//${p}${x ? ":" + x : ""}`;
    }
    function c() {
      const { href: N } = window.location, p = s();
      return N.substring(p.length);
    }
    function l(N) {
      return typeof N == "string" ? N : N.displayName || N.name || "Unknown";
    }
    function d(N) {
      return N.finished || N.headersSent;
    }
    function u(N) {
      const p = N.split("?");
      return p[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (p[1] ? `?${p.slice(1).join("?")}` : "");
    }
    async function h(N, p) {
      var S;
      if (process.env.NODE_ENV !== "production" && (S = N.prototype) != null && S.getInitialProps) {
        const f = `"${l(N)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
        throw Object.defineProperty(new Error(f), "__NEXT_ERROR_CODE", {
          value: "E1035",
          enumerable: !1,
          configurable: !0
        });
      }
      const x = p.res || p.ctx && p.ctx.res;
      if (!N.getInitialProps)
        return p.ctx && p.Component ? {
          pageProps: await h(p.Component, p.ctx)
        } : {};
      const _ = await N.getInitialProps(p);
      if (x && d(x))
        return _;
      if (!_) {
        const f = `"${l(N)}.getInitialProps()" should resolve to an object. But found "${_}" instead.`;
        throw Object.defineProperty(new Error(f), "__NEXT_ERROR_CODE", {
          value: "E1025",
          enumerable: !1,
          configurable: !0
        });
      }
      return process.env.NODE_ENV !== "production" && Object.keys(_).length === 0 && !p.ctx && console.warn(`${l(N)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`), _;
    }
    const m = typeof performance < "u", y = m && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((N) => typeof performance[N] == "function");
    class w extends Error {
    }
    class A extends Error {
    }
    class T extends Error {
      constructor(p) {
        super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = `Cannot find module for page: ${p}`;
      }
    }
    class j extends Error {
      constructor(p, x) {
        super(), this.message = `Failed to load static file for page: ${p} ${x}`;
      }
    }
    class k extends Error {
      constructor() {
        super(), this.code = "ENOENT", this.message = "Cannot find the middleware module";
      }
    }
    function D(N) {
      return JSON.stringify({
        message: N.message,
        stack: N.stack
      });
    }
  }(Vr)), Vr;
}
var Kr = {}, to;
function pl() {
  return to || (to = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      assign: function() {
        return i;
      },
      searchParamsToUrlQuery: function() {
        return r;
      },
      urlQueryToSearchParams: function() {
        return n;
      }
    });
    function r(s) {
      const c = {};
      for (const [l, d] of s.entries()) {
        const u = c[l];
        typeof u > "u" ? c[l] = d : Array.isArray(u) ? u.push(d) : c[l] = [
          u,
          d
        ];
      }
      return c;
    }
    function o(s) {
      return typeof s == "string" ? s : typeof s == "number" && !isNaN(s) || typeof s == "boolean" ? String(s) : "";
    }
    function n(s) {
      const c = new URLSearchParams();
      for (const [l, d] of Object.entries(s))
        if (Array.isArray(d))
          for (const u of d)
            c.append(l, o(u));
        else
          c.set(l, o(d));
      return c;
    }
    function i(s, ...c) {
      for (const l of c) {
        for (const d of l.keys())
          s.delete(d);
        for (const [d, u] of l.entries())
          s.append(d, u);
      }
      return s;
    }
  }(Kr)), Kr;
}
var ro;
function hl() {
  return ro || (ro = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "parseRelativeUrl", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const e = fl(), r = pl();
    function o(n, i, s = !0) {
      const c = new URL(typeof window > "u" ? "http://n" : (0, e.getLocationOrigin)()), l = i ? new URL(i, c) : n.startsWith(".") ? new URL(typeof window > "u" ? "http://n" : window.location.href) : c, { pathname: d, searchParams: u, search: h, hash: m, href: y, origin: w } = n.startsWith("/") ? (
        // See https://nodejs.org/api/http.html#messageurl
        // Not using `origin` to support other protocols
        new URL(`${l.protocol}//${l.host}${n}`)
      ) : new URL(n, l);
      if (w !== c.origin)
        throw Object.defineProperty(new Error(`invariant: invalid relative URL, router received ${n}`), "__NEXT_ERROR_CODE", {
          value: "E159",
          enumerable: !1,
          configurable: !0
        });
      return {
        auth: null,
        host: null,
        hostname: null,
        pathname: d,
        port: null,
        protocol: null,
        query: s ? (0, r.searchParamsToUrlQuery)(u) : void 0,
        search: h,
        hash: m,
        href: y.slice(w.length),
        // We don't know for relative URLs at this point since we set a custom, internal
        // base that isn't surfaced to users.
        slashes: null
      };
    }
  }(Yr)), Yr;
}
var Jr = {}, no;
function di() {
  return no || (no = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    e(t, {
      InstantValidationError: function() {
        return n;
      },
      isInstantValidationError: function() {
        return o;
      }
    });
    const r = "INSTANT_VALIDATION_ERROR";
    function o(i) {
      return !!(i && typeof i == "object" && i instanceof Error && i.digest === r);
    }
    class n extends Error {
      constructor(...s) {
        super(...s), this.digest = r;
      }
    }
  }(Jr)), Jr;
}
var Qr = {}, ao;
function ml() {
  return ao || (ao = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(s, c) {
      for (var l in c) Object.defineProperty(s, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    e(t, {
      describeHasCheckingStringProperty: function() {
        return n;
      },
      describeStringPropertyAccess: function() {
        return o;
      },
      wellKnownProperties: function() {
        return i;
      }
    });
    const r = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
    function o(s, c) {
      return r.test(c) ? `\`${s}.${c}\`` : `\`${s}[${JSON.stringify(c)}]\``;
    }
    function n(s, c) {
      const l = JSON.stringify(c);
      return `\`Reflect.has(${s}, ${l})\`, \`${l} in ${s}\`, or similar`;
    }
    const i = /* @__PURE__ */ new Set([
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toString",
      "valueOf",
      "toLocaleString",
      // Promise prototype
      "then",
      "catch",
      "finally",
      // React Promise extension
      "status",
      // 'value',
      // 'error',
      // React introspection
      "displayName",
      "_debugInfo",
      // Common tested properties
      "toJSON",
      "$$typeof",
      "__esModule",
      // Tested by flight when checking for iterables
      "@@iterator"
    ]);
  }(Qr)), Qr;
}
var oo;
function gl() {
  return oo || (oo = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(O, C) {
      for (var z in C) Object.defineProperty(O, z, {
        enumerable: !0,
        get: C[z]
      });
    }
    e(t, {
      assertRootParamInSamples: function() {
        return M;
      },
      createCookiesFromSample: function() {
        return A;
      },
      createDraftModeForValidation: function() {
        return k;
      },
      createExhaustiveParamsProxy: function() {
        return D;
      },
      createExhaustiveSearchParamsProxy: function() {
        return N;
      },
      createExhaustiveURLSearchParamsProxy: function() {
        return p;
      },
      createHeadersFromSample: function() {
        return j;
      },
      createRelativeURLFromSamples: function() {
        return _;
      },
      createValidationSampleTracking: function() {
        return h;
      },
      trackMissingSampleError: function() {
        return y;
      },
      trackMissingSampleErrorAndThrow: function() {
        return w;
      }
    });
    const r = ci(), o = il(), n = sl(), i = ul(), s = hl(), c = Ht(), l = di(), d = Nn(), u = ml();
    function h() {
      return {
        missingSampleErrors: []
      };
    }
    function m() {
      let O = null;
      const C = d.workUnitAsyncStorage.getStore();
      if (C)
        switch (C.type) {
          case "request":
          case "validation-client":
            O = C.validationSampleTracking ?? null;
            break;
        }
      if (!O)
        throw Object.defineProperty(new c.InvariantError("Expected to have a workUnitStore that provides validationSampleTracking"), "__NEXT_ERROR_CODE", {
          value: "E1110",
          enumerable: !1,
          configurable: !0
        });
      return O;
    }
    function y(O) {
      m().missingSampleErrors.push(O);
    }
    function w(O) {
      throw y(O), O;
    }
    function A(O, C) {
      const z = /* @__PURE__ */ new Set(), U = new r.RequestCookies(new Headers());
      if (O)
        for (const B of O)
          z.add(B.name), B.value !== null && U.set(B.name, B.value);
      const L = o.RequestCookiesAdapter.seal(U);
      return new Proxy(L, {
        get(B, X, V) {
          if (X === "has") {
            const J = Reflect.get(B, X, V);
            return function(b) {
              return z.has(b) || w(T(C, b)), J.call(B, b);
            };
          }
          if (X === "get") {
            const J = Reflect.get(B, X, V);
            return function(b) {
              let q;
              if (typeof b == "string")
                q = b;
              else if (b && typeof b == "object" && typeof b.name == "string")
                q = b.name;
              else
                return J.call(B, b);
              return z.has(q) || w(T(C, q)), J.call(B, q);
            };
          }
          return Reflect.get(B, X, V);
        }
      });
    }
    function T(O, C) {
      return Object.defineProperty(new l.InstantValidationError(`Route "${O}" accessed cookie "${C}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`cookies\` array, or \`{ name: "${C}", value: null }\` if it should be absent.`), "__NEXT_ERROR_CODE", {
        value: "E1115",
        enumerable: !1,
        configurable: !0
      });
    }
    function j(O, C, z) {
      const U = O ? [
        ...O
      ] : [];
      if (U.find(([V]) => V.toLowerCase() === "cookie"))
        throw Object.defineProperty(new l.InstantValidationError('Invalid sample: Defining cookies via a "cookie" header is not supported. Use `cookies: [{ name: ..., value: ... }]` instead.'), "__NEXT_ERROR_CODE", {
          value: "E1111",
          enumerable: !1,
          configurable: !0
        });
      if (C) {
        const V = C.toString();
        U.push([
          "cookie",
          // if the `cookies` samples were empty, or they were all `null`, then we have no cookies,
          // and the header isn't present, but should remains readable, so we set it to null.
          V !== "" ? V : null
        ]);
      }
      const L = /* @__PURE__ */ new Set(), B = {};
      for (const [V, J] of U)
        L.add(V.toLowerCase()), J !== null && (B[V.toLowerCase()] = J);
      const X = n.HeadersAdapter.seal(n.HeadersAdapter.from(B));
      return new Proxy(X, {
        get(V, J, ie) {
          if (J === "get" || J === "has") {
            const b = Reflect.get(V, J, ie);
            return function(K) {
              const G = K.toLowerCase();
              return L.has(G) || w(Object.defineProperty(new l.InstantValidationError(`Route "${z}" accessed header "${G}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`headers\` array, or \`["${G}", null]\` if it should be absent.`), "__NEXT_ERROR_CODE", {
                value: "E1116",
                enumerable: !1,
                configurable: !0
              })), b.call(V, G);
            };
          }
          return Reflect.get(V, J, ie);
        }
      });
    }
    function k() {
      return {
        get isEnabled() {
          return !1;
        },
        enable() {
          throw Object.defineProperty(new Error("Draft mode cannot be enabled during build-time instant validation."), "__NEXT_ERROR_CODE", {
            value: "E1092",
            enumerable: !1,
            configurable: !0
          });
        },
        disable() {
          throw Object.defineProperty(new Error("Draft mode cannot be disabled during build-time instant validation."), "__NEXT_ERROR_CODE", {
            value: "E1094",
            enumerable: !1,
            configurable: !0
          });
        }
      };
    }
    function D(O, C, z) {
      return new Proxy(O, {
        get(U, L, B) {
          return typeof L == "string" && !u.wellKnownProperties.has(L) && // Only error when accessing a param that is part of the route but wasn't provided.
          // accessing properties that aren't expected to be a valid param value is fine.
          L in O && !C.has(L) && w(Object.defineProperty(new l.InstantValidationError(`Route "${z}" accessed param "${L}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`params\` object.`), "__NEXT_ERROR_CODE", {
            value: "E1095",
            enumerable: !1,
            configurable: !0
          })), Reflect.get(U, L, B);
        }
      });
    }
    function N(O, C, z) {
      return new Proxy(O, {
        get(U, L, B) {
          return typeof L == "string" && !u.wellKnownProperties.has(L) && !C.has(L) && w(x(z, L)), Reflect.get(U, L, B);
        },
        has(U, L) {
          return typeof L == "string" && !u.wellKnownProperties.has(L) && !C.has(L) && w(x(z, L)), Reflect.has(U, L);
        }
      });
    }
    function p(O, C, z) {
      return new Proxy(O, {
        get(U, L, B) {
          if (L === "get" || L === "getAll" || L === "has") {
            const V = Reflect.get(U, L, B);
            return (J) => (typeof J == "string" && !C.has(J) && w(x(z, J)), V.call(U, J));
          }
          const X = Reflect.get(U, L, B);
          return typeof X == "function" && !Object.hasOwn(U, L) ? X.bind(U) : X;
        }
      });
    }
    function x(O, C) {
      return Object.defineProperty(new l.InstantValidationError(`Route "${O}" accessed searchParam "${C}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`searchParams\` object, or \`{ "${C}": null }\` if it should be absent.`), "__NEXT_ERROR_CODE", {
        value: "E1098",
        enumerable: !1,
        configurable: !0
      });
    }
    function _(O, C, z) {
      const U = f(O, C ?? {});
      let L = "";
      if (z) {
        const B = S(z).toString();
        B && (L = "?" + B);
      }
      return (0, s.parseRelativeUrl)(U + L, void 0, !0);
    }
    function S(O) {
      const C = new URLSearchParams();
      if (O) {
        for (const [z, U] of Object.entries(O))
          if (U != null)
            if (Array.isArray(U))
              for (const L of U)
                C.append(z, L);
            else
              C.set(z, U);
      }
      return C;
    }
    function f(O, C) {
      let z = [];
      const U = O.split("/");
      for (const L of U) {
        const B = (0, i.getSegmentParam)(L);
        if (B)
          switch (B.paramType) {
            case "catchall":
            case "optional-catchall": {
              let X = C[B.paramName];
              if (X === void 0)
                X = [
                  L
                ];
              else if (!Array.isArray(X))
                throw Object.defineProperty(new l.InstantValidationError(`Expected sample param value for segment '${L}' to be an array of strings, got ${typeof X}`), "__NEXT_ERROR_CODE", {
                  value: "E1104",
                  enumerable: !1,
                  configurable: !0
                });
              z.push(...X.map((V) => encodeURIComponent(V)));
              break;
            }
            case "dynamic": {
              let X = C[B.paramName];
              if (X === void 0)
                X = L;
              else if (typeof X != "string")
                throw Object.defineProperty(new l.InstantValidationError(`Expected sample param value for segment '${L}' to be a string, got ${typeof X}`), "__NEXT_ERROR_CODE", {
                  value: "E1108",
                  enumerable: !1,
                  configurable: !0
                });
              z.push(encodeURIComponent(X));
              break;
            }
            case "catchall-intercepted-(..)(..)":
            case "catchall-intercepted-(.)":
            case "catchall-intercepted-(..)":
            case "catchall-intercepted-(...)":
            case "dynamic-intercepted-(..)(..)":
            case "dynamic-intercepted-(.)":
            case "dynamic-intercepted-(..)":
            case "dynamic-intercepted-(...)":
              throw Object.defineProperty(new c.InvariantError("Not implemented: Validation of interception routes"), "__NEXT_ERROR_CODE", {
                value: "E1106",
                enumerable: !1,
                configurable: !0
              });
            default:
              B.paramType;
          }
        else
          z.push(L);
      }
      return z.join("/");
    }
    function M(O, C, z) {
      if (!(C && z in C)) {
        const U = O.route;
        w(Object.defineProperty(new l.InstantValidationError(`Route "${U}" accessed root param "${z}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`params\` object.`), "__NEXT_ERROR_CODE", {
          value: "E1114",
          enumerable: !1,
          configurable: !0
        }));
      }
    }
  }(Lr)), Lr;
}
var io;
function xl() {
  return io || (io = 1, function(t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function e(d, u) {
      for (var h in u) Object.defineProperty(d, h, {
        enumerable: !0,
        get: u[h]
      });
    }
    e(t, {
      expectCompleteParamsInClientValidation: function() {
        return c;
      },
      instrumentParamsForClientValidation: function() {
        return s;
      },
      instrumentSearchParamsForClientValidation: function() {
        return l;
      }
    });
    const r = Nn(), o = Sn(), n = gl(), i = di();
    function s(d) {
      const u = o.workAsyncStorage.getStore(), h = r.workUnitAsyncStorage.getStore();
      if (u && h)
        switch (h.type) {
          case "validation-client": {
            if (h.validationSamples) {
              const m = new Set(Object.keys(h.validationSamples.params ?? {}));
              return (0, n.createExhaustiveParamsProxy)(d, m, u.route);
            }
            break;
          }
        }
      return d;
    }
    function c(d) {
      const u = o.workAsyncStorage.getStore(), h = r.workUnitAsyncStorage.getStore();
      if (u && h)
        switch (h.type) {
          case "validation-client": {
            if (h.validationSamples) {
              const m = h.fallbackRouteParams;
              if (m && m.size > 0) {
                const y = Array.from(m.keys());
                (0, n.trackMissingSampleErrorAndThrow)(Object.defineProperty(new i.InstantValidationError(`Route "${u.route}" called ${d} but param${y.length > 1 ? "s" : ""} ${y.map((w) => `"${w}"`).join(", ")} ${y.length > 1 ? "are" : "is"} not defined in the \`samples\` of \`unstable_instant\`. ${d} requires all route params to be provided.`), "__NEXT_ERROR_CODE", {
                  value: "E1109",
                  enumerable: !1,
                  configurable: !0
                }));
              }
            }
            break;
          }
        }
    }
    function l(d) {
      const u = o.workAsyncStorage.getStore(), h = r.workUnitAsyncStorage.getStore();
      if (u && h)
        switch (h.type) {
          case "validation-client": {
            if (h.validationSamples) {
              const m = new Set(Object.keys(h.validationSamples.searchParams ?? {}));
              return (0, n.createExhaustiveURLSearchParamsProxy)(d, m, u.route);
            }
            break;
          }
        }
      return d;
    }
  }(Ir)), Ir;
}
(function(t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function r(x, _) {
    for (var S in _) Object.defineProperty(x, S, {
      enumerable: !0,
      get: _[S]
    });
  }
  r(e, {
    // We need the same class that was used to instantiate the context value
    // Otherwise instanceof checks will fail in usercode
    ReadonlyURLSearchParams: function() {
      return s.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
      return u.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
      return l.ServerInsertedHTMLContext;
    },
    forbidden: function() {
      return u.forbidden;
    },
    notFound: function() {
      return u.notFound;
    },
    permanentRedirect: function() {
      return u.permanentRedirect;
    },
    redirect: function() {
      return u.redirect;
    },
    unauthorized: function() {
      return u.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
      return d.unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
      return u.unstable_rethrow;
    },
    useParams: function() {
      return D;
    },
    usePathname: function() {
      return j;
    },
    useRouter: function() {
      return k;
    },
    useSearchParams: function() {
      return T;
    },
    useSelectedLayoutSegment: function() {
      return p;
    },
    useSelectedLayoutSegments: function() {
      return N;
    },
    useServerInsertedHTML: function() {
      return l.useServerInsertedHTML;
    }
  });
  const n = /* @__PURE__ */ wn._(we), i = Dc(), s = Ic(), c = ti(), l = Lc(), d = qc(), u = nl(), h = typeof window > "u" ? fn().useDynamicRouteParams : void 0, m = typeof window > "u" ? fn().useDynamicSearchParams : void 0, { instrumentParamsForClientValidation: y, instrumentSearchParamsForClientValidation: w, expectCompleteParamsInClientValidation: A } = typeof window > "u" && process.env.__NEXT_CACHE_COMPONENTS ? xl() : {};
  function T() {
    m == null || m("useSearchParams()");
    const x = (0, n.useContext)(s.SearchParamsContext), _ = (0, n.useMemo)(() => x ? new s.ReadonlyURLSearchParams(x) : null, [
      x
    ]);
    if (typeof window > "u" && process.env.__NEXT_CACHE_COMPONENTS && _)
      return w(_);
    if (process.env.NODE_ENV !== "production" && "use" in n.default) {
      const S = (0, n.use)(s.NavigationPromisesContext);
      if (S)
        return (0, n.use)(S.searchParams);
    }
    return _;
  }
  function j() {
    h == null || h("usePathname()");
    const x = (0, n.useContext)(s.PathnameContext);
    if (typeof window > "u" && process.env.__NEXT_CACHE_COMPONENTS && x)
      return A("usePathname()"), x;
    if (process.env.NODE_ENV !== "production" && "use" in n.default) {
      const _ = (0, n.use)(s.NavigationPromisesContext);
      if (_)
        return (0, n.use)(_.pathname);
    }
    return x;
  }
  function k() {
    const x = (0, n.useContext)(i.AppRouterContext);
    if (x === null)
      throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
        value: "E238",
        enumerable: !1,
        configurable: !0
      });
    return x;
  }
  function D() {
    h == null || h("useParams()");
    const x = (0, n.useContext)(s.PathParamsContext);
    if (typeof window > "u" && process.env.__NEXT_CACHE_COMPONENTS && x)
      return y(x);
    if (process.env.NODE_ENV !== "production" && "use" in n.default) {
      const _ = (0, n.use)(s.NavigationPromisesContext);
      if (_)
        return (0, n.use)(_.params);
    }
    return x;
  }
  function N(x = "children") {
    var S;
    h == null || h("useSelectedLayoutSegments()");
    const _ = (0, n.useContext)(i.LayoutRouterContext);
    if (!_) return null;
    if (typeof window > "u" && process.env.__NEXT_CACHE_COMPONENTS && _ && A("useSelectedLayoutSegments()"), process.env.NODE_ENV !== "production" && "use" in n.default) {
      const f = (0, n.use)(s.NavigationPromisesContext);
      if (f) {
        const M = (S = f.selectedLayoutSegmentsPromises) == null ? void 0 : S.get(x);
        if (M)
          return (0, n.use)(M);
      }
    }
    return (0, c.getSelectedLayoutSegmentPath)(_.parentTree, x);
  }
  function p(x = "children") {
    var f;
    h == null || h("useSelectedLayoutSegment()");
    const _ = (0, n.useContext)(s.NavigationPromisesContext), S = N(x);
    if (typeof window > "u" && process.env.__NEXT_CACHE_COMPONENTS && A("useSelectedLayoutSegment()"), process.env.NODE_ENV !== "production" && _ && "use" in n.default) {
      const M = (f = _.selectedLayoutSegmentPromises) == null ? void 0 : f.get(x);
      if (M)
        return (0, n.use)(M);
    }
    return (0, c.computeSelectedLayoutSegment)(S, x);
  }
  (typeof e.default == "function" || typeof e.default == "object" && e.default !== null) && typeof e.default.__esModule > "u" && (Object.defineProperty(e.default, "__esModule", { value: !0 }), Object.assign(e.default, e), t.exports = e.default);
})(un, un.exports);
var bl = un.exports, so = bl;
const yl = "gq-preview:";
function co(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
function vl(t) {
  if (!co(t)) return !1;
  const e = t.type;
  if (typeof e != "string" || !e.startsWith(yl)) return !1;
  switch (e) {
    case "gq-preview:ready":
      return !0;
    case "gq-preview:routeChanged":
      return typeof t.route == "string";
    case "gq-preview:navigate":
      return typeof t.route == "string";
    case "gq-preview:applyPreview":
      return co(t.config);
    case "gq-preview:setViewport":
      return typeof t.width == "number" && Number.isFinite(t.width);
    default:
      return !1;
  }
}
function vd(t, e, r) {
  t.postMessage(e, r);
}
function lo(t, e) {
  typeof window > "u" || !window.parent || window.parent.postMessage(t, e);
}
function _l(t, e, r) {
  const o = (n) => {
    n.origin === r.expectedOrigin && vl(n.data) && e(n.data);
  };
  return t.addEventListener("message", o), () => t.removeEventListener("message", o);
}
function El() {
  const t = so.useRouter(), e = so.usePathname(), r = Rt(null);
  return fe(() => {
    const o = window.location.origin, n = _l(
      window,
      (i) => {
        i.type === "gq-preview:applyPreview" ? vc(i.config) : i.type === "gq-preview:navigate" && t.push(i.route);
      },
      { expectedOrigin: o }
    );
    return lo({ type: "gq-preview:ready" }, o), n;
  }, [t]), fe(() => {
    r.current !== e && (r.current = e, lo({ type: "gq-preview:routeChanged", route: e }, window.location.origin));
  }, [e]), null;
}
const jl = Ri(
  () => import("./DesignConfigurator-cjzonmSE.js").then((t) => ({ default: t.DesignConfigurator }))
);
function _d({ tenantId: t }) {
  const e = Cc(t);
  return e === "embed" ? /* @__PURE__ */ a.jsx(El, {}) : e === "editor" ? /* @__PURE__ */ a.jsx(Sc, { defaultOptions: { debouncer: { wait: 120 } }, children: /* @__PURE__ */ a.jsx(wi, { fallback: null, children: /* @__PURE__ */ a.jsx(jl, { tenantId: t }) }) }) : null;
}
function Z({
  variant: t = "default",
  size: e = "md",
  icon: r,
  iconLeft: o,
  iconRight: n,
  children: i,
  className: s,
  style: c,
  ...l
}) {
  const d = [
    "btn",
    t !== "default" ? t : "",
    e === "sm" ? "px-3 py-2 text-xs" : "",
    s
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.jsxs("button", { className: d, style: c, ...l, children: [
    o,
    i,
    n ?? r
  ] });
}
const wl = {
  primary: {
    color: "var(--color-primary)",
    borderColor: "color-mix(in oklch, var(--color-primary) 40%, transparent)",
    background: "var(--color-primary-soft)"
  },
  secondary: {
    color: "var(--color-secondary)",
    borderColor: "color-mix(in oklch, var(--color-secondary) 40%, transparent)",
    background: "color-mix(in oklch, var(--color-secondary) 14%, transparent)"
  }
};
function Rl({ children: t, tone: e = "default", dot: r, className: o, style: n }) {
  const i = e !== "default" ? wl[e] : {};
  return /* @__PURE__ */ a.jsxs(
    "span",
    {
      className: ["chip", o].filter(Boolean).join(" "),
      style: { ...i, ...n },
      children: [
        r && /* @__PURE__ */ a.jsx("span", { className: "inline-block w-[5px] h-[5px] rounded-full bg-current shrink-0" }),
        t
      ]
    }
  );
}
function We({ className: t, ...e }) {
  return /* @__PURE__ */ a.jsx("input", { className: ["input", t].filter(Boolean).join(" "), ...e });
}
function ui({ className: t, style: e, ...r }) {
  return /* @__PURE__ */ a.jsx(
    "textarea",
    {
      className: ["input resize-y min-h-[120px] leading-relaxed", t].filter(Boolean).join(" "),
      style: e,
      ...r
    }
  );
}
function kl({
  label: t,
  labelInside: e,
  adornmentLeft: r,
  adornmentRight: o,
  hint: n,
  error: i,
  style: s,
  ...c
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    t && /* @__PURE__ */ a.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: t }),
    /* @__PURE__ */ a.jsxs("div", { className: "relative flex items-center", children: [
      r && /* @__PURE__ */ a.jsx("div", { className: "absolute left-3 z-[1] text-ink-dim flex items-center pointer-events-none", children: r }),
      e ? /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: "input flex flex-col gap-0.5 py-2 px-3.5 cursor-text w-full",
          style: {
            paddingLeft: r ? 38 : void 0,
            paddingRight: o ? 38 : void 0
          },
          children: [
            /* @__PURE__ */ a.jsx("span", { className: "font-mono text-[9px] tracking-[0.1em] uppercase text-ink-dim leading-none", children: e }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                className: "bg-transparent border-none outline-none text-ink text-sm p-0",
                ...c
              }
            )
          ]
        }
      ) : /* @__PURE__ */ a.jsx(
        We,
        {
          className: "w-full",
          style: {
            paddingLeft: r ? 38 : void 0,
            paddingRight: o ? 38 : void 0,
            ...s
          },
          ...c
        }
      ),
      o && /* @__PURE__ */ a.jsx("div", { className: "absolute right-3 z-[1] text-ink-dim flex items-center", children: o })
    ] }),
    (n || i) && /* @__PURE__ */ a.jsx(
      "span",
      {
        className: `text-[11px] font-mono leading-tight ${i ? "text-danger" : "text-ink-faint"}`,
        children: i ?? n
      }
    )
  ] });
}
function Nl({ value: t, max: e, style: r = "segmented", segments: o = 10, label: n }) {
  const i = Math.max(0, Math.min(1, t / e));
  if (r === "plain")
    return /* @__PURE__ */ a.jsxs("div", { children: [
      n && /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ a.jsx("span", { children: n }),
        /* @__PURE__ */ a.jsxs("span", { children: [
          t,
          "/",
          e
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "xpbar", children: /* @__PURE__ */ a.jsx("div", { className: "fill", style: { width: `${i * 100}%` } }) })
    ] });
  if (r === "segmented") {
    const s = Math.round(i * o);
    return /* @__PURE__ */ a.jsxs("div", { children: [
      n && /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ a.jsx("span", { children: n }),
        /* @__PURE__ */ a.jsxs("span", { children: [
          t,
          "/",
          e
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "xp-seg", children: Array.from({ length: o }).map((c, l) => /* @__PURE__ */ a.jsx("div", { className: `seg ${l < s ? "on" : ""}` }, l)) })
    ] });
  }
  if (r === "ring") {
    const c = 2 * Math.PI * 30;
    return /* @__PURE__ */ a.jsxs("div", { className: "inline-flex items-center gap-3", children: [
      /* @__PURE__ */ a.jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", children: [
        /* @__PURE__ */ a.jsx("circle", { cx: "40", cy: "40", r: 30, fill: "none", stroke: "var(--panel-2)", strokeWidth: "6" }),
        /* @__PURE__ */ a.jsx(
          "circle",
          {
            cx: "40",
            cy: "40",
            r: 30,
            fill: "none",
            stroke: "var(--color-primary)",
            strokeWidth: "6",
            strokeDasharray: c,
            strokeDashoffset: c * (1 - i),
            transform: "rotate(-90 40 40)",
            strokeLinecap: "round",
            style: {
              filter: "drop-shadow(0 0 6px var(--color-primary))",
              transition: "stroke-dashoffset 800ms ease"
            }
          }
        ),
        /* @__PURE__ */ a.jsxs(
          "text",
          {
            x: "40",
            y: "44",
            textAnchor: "middle",
            fontFamily: "JetBrains Mono",
            fontSize: "13",
            fontWeight: "700",
            fill: "currentColor",
            children: [
              Math.round(i * 100),
              "%"
            ]
          }
        )
      ] }),
      n && /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("div", { className: "font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim", children: n }),
        /* @__PURE__ */ a.jsxs("div", { className: "font-mono text-sm font-bold", children: [
          t,
          "/",
          e
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ a.jsxs("div", { children: [
    n && /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
      /* @__PURE__ */ a.jsx("span", { children: n }),
      /* @__PURE__ */ a.jsxs("span", { children: [
        t,
        "/",
        e
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "relative h-3.5 border border-border rounded-[3px] bg-panel-2 overflow-hidden", children: [
      /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "absolute inset-0.5 rounded-sm",
          style: {
            background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) ${i * 100}%, transparent ${i * 100}%)`
          }
        }
      ),
      /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            backgroundImage: "repeating-linear-gradient(90deg, transparent 0 9px, color-mix(in oklch, var(--bg) 60%, transparent) 9px 10px)"
          }
        }
      )
    ] })
  ] });
}
function Sl({ size: t = 28 }) {
  return /* @__PURE__ */ a.jsxs("svg", { width: t, height: t, viewBox: "0 0 32 32", children: [
    /* @__PURE__ */ a.jsx("defs", { children: /* @__PURE__ */ a.jsxs("linearGradient", { id: "lg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: "var(--color-primary)" }),
      /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: "var(--color-secondary)" })
    ] }) }),
    /* @__PURE__ */ a.jsx("polygon", { points: "16,2 28,9 28,23 16,30 4,23 4,9", fill: "url(#lg)" }),
    /* @__PURE__ */ a.jsx("polygon", { points: "16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5", fill: "var(--bg)" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "16", cy: "16", r: "3.5", fill: "var(--color-primary)" })
  ] });
}
function Ed({
  name: t = "GrowQuest",
  version: e = "v1.4"
}) {
  return /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2.5 font-display font-semibold text-lg tracking-[-0.02em] max-[720px]:text-base max-[420px]:[&_span:last-of-type]:text-sm", children: [
    /* @__PURE__ */ a.jsx("span", { className: "inline-grid place-items-center w-7 h-7 max-[720px]:w-6 max-[720px]:h-6", children: /* @__PURE__ */ a.jsx(Sl, {}) }),
    /* @__PURE__ */ a.jsx("span", { children: t }),
    /* @__PURE__ */ a.jsx("span", { className: "chip brand-version", children: e })
  ] });
}
function Ce({ children: t, dot: e }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim", children: [
    e !== !1 && /* @__PURE__ */ a.jsx("span", { className: "w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" }),
    t
  ] });
}
function he({ children: t, tone: e = "default" }) {
  const r = {
    default: "text-ink-dim border-border bg-panel-2",
    primary: "text-primary border-[color-mix(in_oklch,var(--color-primary)_40%,transparent)] bg-primary-soft",
    secondary: "text-secondary border-[color-mix(in_oklch,var(--color-secondary)_40%,transparent)] bg-[color-mix(in_oklch,var(--color-secondary)_14%,transparent)]",
    ghost: "text-ink-dim border-border bg-transparent"
  }, o = r[e] ?? r.default;
  return /* @__PURE__ */ a.jsx("span", { className: `chip ${o}`, children: t });
}
function Be({ amount: t, icon: e = !0 }) {
  return /* @__PURE__ */ a.jsxs("span", { className: "chip primary gap-1.5 font-semibold", children: [
    e && /* @__PURE__ */ a.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ a.jsx(
      "polygon",
      {
        points: "5,0 6.3,3.7 10,3.7 7,6 8.2,10 5,7.6 1.8,10 3,6 0,3.7 3.7,3.7",
        fill: "currentColor"
      }
    ) }),
    t,
    " XP"
  ] });
}
function fi({ endsAt: t }) {
  const [e, r] = F(Date.now);
  fe(() => {
    const c = setInterval(() => r(Date.now()), 1e3);
    return () => clearInterval(c);
  }, []);
  const o = Math.max(0, t - e), n = Math.floor(o / 36e5).toString().padStart(2, "0"), i = Math.floor(o % 36e5 / 6e4).toString().padStart(2, "0"), s = Math.floor(o % 6e4 / 1e3).toString().padStart(2, "0");
  return /* @__PURE__ */ a.jsxs("span", { className: "mono text-secondary", children: [
    n,
    ":",
    i,
    ":",
    s
  ] });
}
function Pl({
  values: t,
  color: e = "var(--color-primary)",
  w: r = 80,
  h: o = 24
}) {
  const n = Math.min(...t), i = Math.max(...t), s = t.map((c, l) => {
    const d = l / (t.length - 1) * r, u = o - (c - n) / (i - n || 1) * (o - 2) - 1;
    return `${d},${u}`;
  }).join(" ");
  return /* @__PURE__ */ a.jsx("svg", { width: r, height: o, viewBox: `0 0 ${r} ${o}`, children: /* @__PURE__ */ a.jsx("polyline", { points: s, fill: "none", stroke: e, strokeWidth: "1.5" }) });
}
function jd({ label: t }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-3 my-5", children: [
    /* @__PURE__ */ a.jsx("div", { className: "flex-1 h-px bg-border" }),
    t && /* @__PURE__ */ a.jsx("span", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim", children: t }),
    /* @__PURE__ */ a.jsx("div", { className: "flex-1 h-px bg-border" })
  ] });
}
const Ol = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "color-mix(in oklch, var(--color-primary) 50%, var(--color-secondary))"
], wd = kt(function({
  badges: e,
  columns: r = 3,
  unlockedTones: o
}) {
  const n = Ko("profile"), i = o && o.length > 0 ? o : Ol, s = e.filter((c) => c.got).length;
  return /* @__PURE__ */ a.jsxs("div", { className: "panel p-5", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5", children: [
      "// ",
      n.badgesEyebrow,
      " · ",
      s,
      "/",
      e.length
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "grid gap-2.5", style: { gridTemplateColumns: `repeat(${r}, 1fr)` }, children: e.map((c, l) => /* @__PURE__ */ a.jsxs(
      "div",
      {
        title: c.desc,
        className: "p-3.5 rounded-[10px] text-center",
        style: {
          background: "var(--badge-grid-bg)",
          border: "1px solid var(--badge-grid-border)",
          opacity: c.got ? 1 : 0.4
        },
        children: [
          /* @__PURE__ */ a.jsx(
            "div",
            {
              className: "w-11 h-11 mx-auto mb-2 rounded-[10px] grid place-items-center border border-border",
              style: {
                background: c.got ? i[l % i.length] : "var(--panel)"
              },
              children: /* @__PURE__ */ a.jsx("svg", { width: "22", height: "22", viewBox: "0 0 22 22", children: /* @__PURE__ */ a.jsx(
                "polygon",
                {
                  points: "11,2 20,7 20,15 11,20 2,15 2,7",
                  fill: c.got ? "#05060A" : "var(--badge-grid-locked-fg)"
                }
              ) })
            }
          ),
          /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-[12px]", children: c.name }),
          /* @__PURE__ */ a.jsx("div", { className: "text-[10px] text-ink-faint mt-0.5 font-mono uppercase tracking-[0.08em]", children: c.got ? n.badgeUnlocked : n.badgeLocked })
        ]
      },
      c.id
    )) })
  ] });
});
function Rd({ options: t, value: e, onChange: r, labels: o }) {
  return /* @__PURE__ */ a.jsx("div", { className: "flex flex-wrap gap-1 p-1 bg-panel-2 border border-border rounded-lg", children: t.map((n) => /* @__PURE__ */ a.jsx(
    "button",
    {
      onClick: () => r(n),
      style: {
        padding: "6px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: 6,
        background: e === n ? "var(--panel)" : "transparent",
        color: e === n ? "var(--ink)" : "var(--ink-dim)",
        border: e === n ? "1px solid var(--border)" : "1px solid transparent"
      },
      children: (o == null ? void 0 : o[n]) ?? n
    },
    n
  )) });
}
function Tl({ variant: t = "isometric", accent: e }) {
  const r = e || "var(--color-primary)";
  if (t === "grid-poster")
    return /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      /* @__PURE__ */ a.jsxs("defs", { children: [
        /* @__PURE__ */ a.jsx("pattern", { id: "gp-grid", width: "24", height: "24", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ a.jsx("path", { d: "M24 0H0V24", fill: "none", stroke: r, strokeOpacity: "0.18", strokeWidth: "1" }) }),
        /* @__PURE__ */ a.jsxs("linearGradient", { id: "gp-fade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0" }),
          /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0.35" })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("rect", { width: "480", height: "480", fill: "url(#gp-grid)" }),
      /* @__PURE__ */ a.jsx("rect", { width: "480", height: "480", fill: "url(#gp-fade)" }),
      /* @__PURE__ */ a.jsx(
        "text",
        {
          x: "28",
          y: "60",
          fontFamily: "JetBrains Mono",
          fontSize: "11",
          letterSpacing: "3",
          fill: r,
          opacity: "0.8",
          children: "QUEST // 01"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "text",
        {
          x: "28",
          y: "420",
          fontFamily: "Space Grotesk",
          fontWeight: "700",
          fontSize: "72",
          fill: "currentColor",
          letterSpacing: "-2",
          children: "LEVEL"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "text",
        {
          x: "28",
          y: "470",
          fontFamily: "Space Grotesk",
          fontWeight: "700",
          fontSize: "72",
          fill: r,
          letterSpacing: "-2",
          children: "UP."
        }
      ),
      /* @__PURE__ */ a.jsx("circle", { cx: "380", cy: "130", r: "70", fill: "none", stroke: r, strokeWidth: "1.5" }),
      /* @__PURE__ */ a.jsx(
        "circle",
        {
          cx: "380",
          cy: "130",
          r: "40",
          fill: "none",
          stroke: r,
          strokeWidth: "1",
          strokeDasharray: "4 4"
        }
      ),
      /* @__PURE__ */ a.jsx("circle", { cx: "380", cy: "130", r: "8", fill: r })
    ] });
  if (t === "orbital")
    return /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      /* @__PURE__ */ a.jsx("defs", { children: /* @__PURE__ */ a.jsxs("radialGradient", { id: "orb-glow", children: [
        /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0.55" }),
        /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ a.jsx("rect", { width: "480", height: "480", fill: "transparent" }),
      /* @__PURE__ */ a.jsx("circle", { cx: "240", cy: "240", r: "200", fill: "url(#orb-glow)" }),
      [160, 110, 60].map((o, n) => /* @__PURE__ */ a.jsx(
        "ellipse",
        {
          cx: "240",
          cy: "240",
          rx: o * 1.6,
          ry: o * 0.5,
          fill: "none",
          stroke: r,
          strokeOpacity: 0.4 - n * 0.1,
          strokeWidth: "1",
          transform: `rotate(${-20 + n * 12} 240 240)`
        },
        n
      )),
      /* @__PURE__ */ a.jsx("circle", { cx: "240", cy: "240", r: "34", fill: r, opacity: "0.9" }),
      /* @__PURE__ */ a.jsx(
        "circle",
        {
          cx: "240",
          cy: "240",
          r: "34",
          fill: "none",
          stroke: "#fff",
          strokeOpacity: "0.5",
          strokeWidth: "1"
        }
      ),
      [0, 72, 144, 216, 288].map((o, n) => {
        const i = o * Math.PI / 180, s = 240 + Math.cos(i) * 170, c = 240 + Math.sin(i) * 60;
        return /* @__PURE__ */ a.jsx("circle", { cx: s, cy: c, r: 6 + n % 3 * 2, fill: r, opacity: 0.7 }, n);
      }),
      /* @__PURE__ */ a.jsx("text", { x: "30", y: "40", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// ORBIT.SYS" })
    ] });
  if (t === "pixel") {
    const i = [];
    for (let s = 0; s < 12; s++)
      for (let c = 0; c < 12; c++) {
        const l = c + s * 0.5 - 3, d = s - c * 0.3 + 4;
        Math.hypot(l - 5, d - 5) < 3 + Math.sin(s * c * 0.3) * 1.5 && i.push({ x: c * 34 + 30, y: s * 30 + 40, hue: s * c % 3 });
      }
    return /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      i.map((s, c) => /* @__PURE__ */ a.jsx(
        "rect",
        {
          x: s.x,
          y: s.y,
          width: "28",
          height: "24",
          fill: s.hue === 0 ? r : s.hue === 1 ? "var(--color-secondary)" : "var(--color-primary)",
          opacity: 0.6 + s.hue * 0.15
        },
        c
      )),
      /* @__PURE__ */ a.jsx("text", { x: "30", y: "440", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// BLOCK.MAP" })
    ] });
  }
  return /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
    /* @__PURE__ */ a.jsxs("defs", { children: [
      /* @__PURE__ */ a.jsx(
        "pattern",
        {
          id: "iso-grid",
          width: "48",
          height: "28",
          patternUnits: "userSpaceOnUse",
          patternTransform: "skewX(-30)",
          children: /* @__PURE__ */ a.jsx("path", { d: "M48 0H0V28", fill: "none", stroke: r, strokeOpacity: "0.22", strokeWidth: "1" })
        }
      ),
      /* @__PURE__ */ a.jsxs("radialGradient", { id: "iso-glow", cx: "50%", cy: "55%", children: [
        /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0.35" }),
        /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ a.jsxs("linearGradient", { id: "iso-top", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: r }),
        /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: "var(--color-secondary)" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("rect", { width: "480", height: "480", fill: "url(#iso-grid)", transform: "translate(0 60)" }),
    /* @__PURE__ */ a.jsx("rect", { width: "480", height: "480", fill: "url(#iso-glow)" }),
    /* @__PURE__ */ a.jsxs("g", { transform: "translate(240 270)", children: [
      /* @__PURE__ */ a.jsx(
        "polygon",
        {
          points: "0,-40 140,30 0,100 -140,30",
          fill: r,
          fillOpacity: "0.08",
          stroke: r,
          strokeOpacity: "0.5"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "polygon",
        {
          points: "0,-20 100,22 0,62 -100,22",
          fill: "none",
          stroke: r,
          strokeOpacity: "0.3",
          strokeDasharray: "3 3"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("g", { transform: "translate(240 180)", children: [
      /* @__PURE__ */ a.jsx("polygon", { points: "0,0 70,30 70,100 0,70", fill: "var(--color-secondary)", opacity: "0.85" }),
      /* @__PURE__ */ a.jsx("polygon", { points: "0,0 -70,30 -70,100 0,70", fill: r, opacity: "0.9" }),
      /* @__PURE__ */ a.jsx("polygon", { points: "0,-40 70,-10 70,30 0,0 -70,30 -70,-10", fill: "url(#iso-top)" }),
      /* @__PURE__ */ a.jsx(
        "text",
        {
          x: "-30",
          y: "45",
          fontFamily: "JetBrains Mono",
          fontSize: "14",
          fontWeight: "700",
          fill: "#0A0B10",
          children: "LV.07"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs(
      "g",
      {
        transform: "translate(90 140)",
        className: "animate-[float_4s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ a.jsx("polygon", { points: "0,0 40,16 40,56 0,40", fill: r, opacity: "0.9" }),
          /* @__PURE__ */ a.jsx("polygon", { points: "0,0 -40,16 -40,56 0,40", fill: r, opacity: "0.65" }),
          /* @__PURE__ */ a.jsx("polygon", { points: "0,-20 40,-4 40,16 0,0 -40,16 -40,-4", fill: r, opacity: "0.5" })
        ]
      }
    ),
    /* @__PURE__ */ a.jsxs(
      "g",
      {
        transform: "translate(380 120)",
        className: "animate-[float_5s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ a.jsx("circle", { r: "26", fill: "var(--color-secondary)", opacity: "0.85" }),
          /* @__PURE__ */ a.jsx("circle", { r: "26", fill: "none", stroke: "#fff", strokeOpacity: "0.45", strokeWidth: "1" }),
          /* @__PURE__ */ a.jsx("ellipse", { cx: "0", cy: "0", rx: "26", ry: "7", fill: "none", stroke: "#fff", strokeOpacity: "0.3" })
        ]
      }
    ),
    /* @__PURE__ */ a.jsxs("g", { transform: "translate(110 360)", children: [
      /* @__PURE__ */ a.jsx("polygon", { points: "0,0 22,9 22,30 0,21", fill: "var(--color-primary)" }),
      /* @__PURE__ */ a.jsx("polygon", { points: "0,0 -22,9 -22,30 0,21", fill: "var(--color-primary)", opacity: "0.7" }),
      /* @__PURE__ */ a.jsx("polygon", { points: "0,-12 22,-3 22,9 0,0 -22,9 -22,-3", fill: "#fff", opacity: "0.85" })
    ] }),
    /* @__PURE__ */ a.jsxs(
      "g",
      {
        transform: "translate(380 380)",
        className: "animate-[float_3.5s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ a.jsx("polygon", { points: "0,0 18,8 18,26 0,18", fill: r }),
          /* @__PURE__ */ a.jsx("polygon", { points: "0,0 -18,8 -18,26 0,18", fill: r, opacity: "0.7" }),
          /* @__PURE__ */ a.jsx("polygon", { points: "0,-10 18,-2 18,8 0,0 -18,8 -18,-2", fill: "#fff", opacity: "0.85" })
        ]
      }
    ),
    /* @__PURE__ */ a.jsx("text", { x: "24", y: "36", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// QUEST.WORLD" }),
    /* @__PURE__ */ a.jsx(
      "text",
      {
        x: "24",
        y: "456",
        fontFamily: "JetBrains Mono",
        fontSize: "9",
        letterSpacing: "2",
        fill: "currentColor",
        opacity: "0.5",
        children: "NODE · 0x88F4E1"
      }
    ),
    /* @__PURE__ */ a.jsx(
      "text",
      {
        x: "380",
        y: "456",
        fontFamily: "JetBrains Mono",
        fontSize: "9",
        letterSpacing: "2",
        fill: "currentColor",
        opacity: "0.5",
        children: "v1.4"
      }
    )
  ] });
}
function Pn({ seed: t = 1, size: e = 40 }) {
  const r = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-primary)",
    "var(--color-secondary)",
    "color-mix(in oklch, var(--color-primary) 50%, var(--color-secondary))"
  ], o = r[t % r.length], n = r[(t + 2) % r.length], i = t % 3;
  return /* @__PURE__ */ a.jsxs(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 40 40",
      className: "block rounded-md border border-border bg-panel-2",
      children: [
        /* @__PURE__ */ a.jsx("rect", { width: "40", height: "40", fill: "var(--panel-2)" }),
        i === 0 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("circle", { cx: "20", cy: "20", r: "12", fill: o }),
          /* @__PURE__ */ a.jsx("circle", { cx: "20", cy: "20", r: "5", fill: n })
        ] }),
        i === 1 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("polygon", { points: "20,6 34,20 20,34 6,20", fill: o }),
          /* @__PURE__ */ a.jsx("rect", { x: "16", y: "16", width: "8", height: "8", fill: n })
        ] }),
        i === 2 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("rect", { x: "8", y: "8", width: "24", height: "24", fill: o }),
          /* @__PURE__ */ a.jsx("circle", { cx: "20", cy: "20", r: "6", fill: n })
        ] })
      ]
    }
  );
}
function Zr({ type: t, size: e = 22 }) {
  const r = e, o = {
    width: r,
    height: r,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return t === "social" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 12h8M12 8v8" })
  ] }) : t === "photo" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 6l2-3h4l2 3" })
  ] }) : t === "refer" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "9", cy: "10", r: "3" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "17", cy: "8", r: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" })
  ] }) : t === "video" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ a.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor" })
  ] }) : t === "quiz" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-2.5 2-2.5 4M12 17.5v.1" })
  ] }) : t === "review" ? /* @__PURE__ */ a.jsx("svg", { ...o, children: /* @__PURE__ */ a.jsx("polygon", { points: "12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9" }) }) : t === "event" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M3 10h18M8 3v4M16 3v4" })
  ] }) : t === "purchase" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M5 7h14l-1.5 11H6.5L5 7z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 7V5a3 3 0 016 0v2" })
  ] }) : t === "read_article" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "4", y: "3", width: "16", height: "18", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 8h8M8 12h8M8 16h5" })
  ] }) : t === "profile" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ a.jsx("path", { d: "M15 15l1.5 1.5L19 14" })
  ] }) : t === "avatar" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18 14v4M16 16h4" })
  ] }) : t === "verify_email" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "3", y: "6", width: "18", height: "13", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M3 8l9 6 9-6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14 17l2 2 4-4" })
  ] }) : t === "verify_phone" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "7", y: "2", width: "10", height: "20", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7 6h10M7 18h10" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14 14l1.5 1.5L18 13" })
  ] }) : t === "spin_wheel" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 3v9M12 12l6.4 6.4M12 12H3" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", stroke: "none" })
  ] }) : t === "scratch_card" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7 12c1.5-2 3-2 4 0s2.5 2 4 0", strokeDasharray: "3 2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 16h2M12 16h4" })
  ] }) : t === "badge_collect" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M12 3l2.2 5.2H20l-4.6 3.4 1.8 5.4L12 14l-5.2 3 1.8-5.4L4 8.2h5.8z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 21h6M12 17.5v3.5" })
  ] }) : t === "share" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("path", { d: "M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 6l-4-4-4 4M12 2v13" })
  ] }) : t === "invite" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "9", cy: "8", r: "3" }),
    /* @__PURE__ */ a.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18 8v6M15 11h6" })
  ] }) : t === "photo_proof" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 6l2-3h4l2 3" }),
    /* @__PURE__ */ a.jsx("path", { d: "M15 11l1.5 1.5L19 10" })
  ] }) : t === "follow_social" ? /* @__PURE__ */ a.jsxs("svg", { ...o, children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 12h8M12 8v8" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "18.5", cy: "5.5", r: "2.5", fill: "currentColor", stroke: "none" })
  ] }) : /* @__PURE__ */ a.jsx("svg", { ...o, children: /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "8" }) });
}
function Cl({ asset: t, fallback: e, alt: r = "", className: o }) {
  const [n, i] = F(!1);
  if (!(t && (t.type === "IMG" || t.type === "GIF") && !n)) return /* @__PURE__ */ a.jsx(a.Fragment, { children: e });
  const c = /* @__PURE__ */ a.jsx(
    "img",
    {
      src: t.src,
      alt: r,
      loading: "eager",
      decoding: "async",
      onError: () => i(!0),
      className: o ?? "block w-full h-full object-cover"
    }
  );
  return t.mobileSrc ? /* @__PURE__ */ a.jsxs("picture", { children: [
    /* @__PURE__ */ a.jsx("source", { media: "(max-width: 720px)", srcSet: t.mobileSrc }),
    c
  ] }) : c;
}
function kd({
  heroStyle: t,
  title: e = "Founders' Path",
  subtitle: r = "Complete 8 of 12 missions to unlock the Ascendant lootbox.",
  eyebrow: o = "// current season · week 04"
}) {
  var d, u;
  const n = Rc("missionsHero"), i = ((u = (d = kc().overrides) == null ? void 0 : d.heroBanner) == null ? void 0 : u.overlayMode) ?? "always", s = i !== "never", c = i === "always", l = i === "always";
  return /* @__PURE__ */ a.jsxs("div", { className: "hero-banner", children: [
    /* @__PURE__ */ a.jsx("div", { className: "hero-banner-bg", children: /* @__PURE__ */ a.jsx(Cl, { asset: n, fallback: /* @__PURE__ */ a.jsx(Tl, { variant: t }), alt: e }) }),
    s && /* @__PURE__ */ a.jsxs("div", { className: "hero-banner-content", children: [
      /* @__PURE__ */ a.jsx(Ce, { children: o }),
      c && /* @__PURE__ */ a.jsx("h2", { className: "display m-0 text-[26px] tracking-[-0.02em]", children: e }),
      l && /* @__PURE__ */ a.jsx("div", { className: "text-[13px] text-ink-dim max-w-[420px]", children: r })
    ] }),
    !c && /* @__PURE__ */ a.jsx("h2", { className: "sr-only", children: e })
  ] });
}
const Ml = {
  rank: "rank",
  handle: "insider",
  streak: "streak",
  tier: "tier",
  xp: "xp"
}, Al = {
  Oracle: "secondary",
  Ascendant: "primary"
}, Nd = kt(function({
  entries: e,
  streakEmoji: r = "🔥",
  columnLabels: o,
  tierToneMap: n,
  youTag: i = "YOU"
}) {
  const s = { ...Ml, ...o }, c = n ?? Al;
  return /* @__PURE__ */ a.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "lb-head lb-row", children: [
      /* @__PURE__ */ a.jsx("span", { children: s.rank }),
      /* @__PURE__ */ a.jsx("span", { children: s.handle }),
      /* @__PURE__ */ a.jsx("span", { className: "lb-streak", children: s.streak }),
      /* @__PURE__ */ a.jsx("span", { className: "lb-tier", children: s.tier }),
      /* @__PURE__ */ a.jsx("span", { className: "lb-cell-right", children: s.xp })
    ] }),
    e.map((l) => /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: "lb-row",
        style: { background: l.me ? "var(--leaderboard-mine-bg)" : "var(--leaderboard-row-bg)" },
        children: [
          /* @__PURE__ */ a.jsx(
            "span",
            {
              className: "mono font-bold",
              style: { color: l.rank <= 3 ? "var(--leaderboard-top-rank)" : "var(--ink)" },
              children: String(l.rank).padStart(2, "0")
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "lb-identity", children: [
            /* @__PURE__ */ a.jsx(Pn, { seed: l.seed, size: 28 }),
            /* @__PURE__ */ a.jsx("span", { className: "font-semibold text-[14px]", children: l.handle }),
            l.me && /* @__PURE__ */ a.jsx(he, { tone: "primary", children: i })
          ] }),
          /* @__PURE__ */ a.jsxs("span", { className: "mono lb-streak text-[13px] text-secondary", children: [
            l.streak,
            r
          ] }),
          /* @__PURE__ */ a.jsx("span", { className: "lb-tier", children: /* @__PURE__ */ a.jsx(he, { tone: c[l.tier] ?? "primary", children: l.tier }) }),
          /* @__PURE__ */ a.jsx("span", { className: "mono lb-xp", children: l.xp.toLocaleString() })
        ]
      },
      l.rank
    ))
  ] });
});
function pn({ shape: t, tint: e }) {
  const r = `var(--color-${e})`;
  return /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 100 100", className: "block w-full h-full", children: [
    /* @__PURE__ */ a.jsx("rect", { width: "100", height: "100", fill: "var(--panel)" }),
    /* @__PURE__ */ a.jsx("g", { opacity: "0.18", stroke: r, strokeWidth: "1", children: Array.from({ length: 10 }).map((o, n) => /* @__PURE__ */ a.jsx("line", { x1: "0", y1: n * 10, x2: "100", y2: n * 10 }, n)) }),
    t === "hex" && /* @__PURE__ */ a.jsx("polygon", { points: "50,14 84,32 84,68 50,86 16,68 16,32", fill: r }),
    t === "circle" && /* @__PURE__ */ a.jsx("circle", { cx: "50", cy: "50", r: "30", fill: r }),
    t === "diamond" && /* @__PURE__ */ a.jsx("polygon", { points: "50,14 86,50 50,86 14,50", fill: r }),
    t === "square" && /* @__PURE__ */ a.jsx("rect", { x: "22", y: "22", width: "56", height: "56", fill: r })
  ] });
}
function Oe({
  selected: t,
  correct: e,
  wrong: r,
  disabled: o,
  onClick: n,
  children: i,
  layout: s = "row"
}) {
  const c = e ? "var(--color-primary)" : r ? "var(--danger)" : t ? "var(--color-primary)" : "var(--border)", l = e ? "color-mix(in oklch, var(--color-primary) 14%, transparent)" : r ? "color-mix(in oklch, var(--danger) 14%, transparent)" : t ? "var(--color-primary-soft)" : "var(--panel-2)", d = s === "row" ? "py-3.5 px-4 rounded-lg flex flex-row items-center gap-3" : "p-2.5 rounded-[10px] flex flex-col gap-2";
  return /* @__PURE__ */ a.jsx(
    "button",
    {
      disabled: o,
      onClick: n,
      className: `text-left border ${d}`,
      style: { borderColor: c, background: l },
      children: i
    }
  );
}
const en = {
  text: {
    q: "Which metric best captures product-led growth?",
    choices: [
      { id: "a", label: "Time to value (TTV)" },
      { id: "b", label: "Cost per click (CPC)" },
      { id: "c", label: "Monthly recurring revenue (MRR)" },
      { id: "d", label: "Net promoter score (NPS)" }
    ],
    correct: "a"
  },
  textImage: {
    q: "Pick the layout that maximizes click-through on a landing page.",
    choices: [
      { id: "a", label: "Hero + single CTA above the fold", tint: "primary" },
      { id: "b", label: "Carousel of 5 headlines", tint: "secondary" },
      { id: "c", label: "Testimonials first, CTA last", tint: "primary" },
      { id: "d", label: "Video autoplay + form", tint: "secondary" }
    ],
    correct: "a"
  },
  imageOnly: {
    q: "Which is the correct brand mark?",
    choices: [
      { id: "a", label: "Hexagon", shape: "hex", tint: "primary" },
      { id: "b", label: "Circle", shape: "circle", tint: "secondary" },
      { id: "c", label: "Diamond", shape: "diamond", tint: "primary" },
      { id: "d", label: "Square", shape: "square", tint: "secondary" }
    ],
    correct: "a"
  }
};
function Dl({
  variant: t,
  onComplete: e
}) {
  const r = t === "text" ? en.text : t === "textImage" ? en.textImage : en.imageOnly, [o, n] = F(null), [i, s] = F(!1), c = r.correct === o;
  return /* @__PURE__ */ a.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ a.jsxs(Ce, { children: [
      "// quiz · 1 of 5 ·",
      " ",
      t === "text" ? "text answers" : t === "textImage" ? "text + image" : "images only"
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: r.q }),
    t === "text" && /* @__PURE__ */ a.jsx("div", { className: "flex flex-col gap-2", children: r.choices.map((l) => {
      const d = o === l.id, u = i && l.id === r.correct, h = i && d && !c;
      return /* @__PURE__ */ a.jsxs(
        Oe,
        {
          selected: d,
          correct: u,
          wrong: h,
          disabled: i,
          onClick: () => n(l.id),
          layout: "row",
          children: [
            /* @__PURE__ */ a.jsx("span", { className: "mono w-6 h-6 rounded-[5px] border border-border bg-panel grid place-items-center text-[11px] font-bold shrink-0", children: l.id.toUpperCase() }),
            /* @__PURE__ */ a.jsx("span", { className: "flex-1 text-sm", children: l.label }),
            u && /* @__PURE__ */ a.jsx(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "var(--color-primary)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ a.jsx("path", { d: "M3 8.5l3.5 3.5L13 5" })
              }
            ),
            h && /* @__PURE__ */ a.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                fill: "none",
                stroke: "var(--danger)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ a.jsx("path", { d: "M3 3l8 8M11 3l-8 8" })
              }
            )
          ]
        },
        l.id
      );
    }) }),
    t === "textImage" && /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: r.choices.map((l) => {
      const d = o === l.id, u = i && l.id === r.correct, h = i && d && !c;
      return /* @__PURE__ */ a.jsxs(
        Oe,
        {
          selected: d,
          correct: u,
          wrong: h,
          disabled: i,
          onClick: () => n(l.id),
          layout: "column",
          children: [
            /* @__PURE__ */ a.jsxs("div", { className: "aspect-[16/10] rounded-md overflow-hidden bg-panel relative", children: [
              /* @__PURE__ */ a.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--color-${l.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`
                  }
                }
              ),
              /* @__PURE__ */ a.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ a.jsxs(
                "div",
                {
                  className: "font-mono text-[10px] tracking-[0.12em] uppercase py-1 px-2 bg-panel border rounded-[4px]",
                  style: {
                    color: `var(--color-${l.tint})`,
                    borderColor: `color-mix(in oklch, var(--color-${l.tint}) 40%, transparent)`
                  },
                  children: [
                    "OPT ",
                    l.id.toUpperCase()
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2 text-[13px] text-left", children: [
              /* @__PURE__ */ a.jsx("span", { className: "mono w-5 h-5 rounded-[4px] border border-border grid place-items-center text-[10px] font-bold shrink-0", children: l.id.toUpperCase() }),
              /* @__PURE__ */ a.jsx("span", { children: l.label })
            ] })
          ]
        },
        l.id
      );
    }) }),
    t === "imageOnly" && /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: r.choices.map((l) => {
      const d = o === l.id, u = i && l.id === r.correct, h = i && d && !c;
      return /* @__PURE__ */ a.jsx(
        Oe,
        {
          selected: d,
          correct: u,
          wrong: h,
          disabled: i,
          onClick: () => n(l.id),
          layout: "column",
          children: /* @__PURE__ */ a.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ a.jsx(pn, { shape: l.shape, tint: l.tint }) })
        },
        l.id
      );
    }) }),
    i && /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: `p-3 rounded-lg text-[13px] border ${c ? "border-accent-lime" : "border-danger"}`,
        style: {
          background: c ? "color-mix(in oklch, var(--color-primary) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)"
        },
        children: [
          /* @__PURE__ */ a.jsx("strong", { children: c ? "Correct!" : "Not quite." }),
          " ",
          c ? "Nicely done." : "The correct answer is A."
        ]
      }
    ),
    /* @__PURE__ */ a.jsx("div", { className: "flex gap-2", children: i ? /* @__PURE__ */ a.jsx(Z, { variant: "primary", className: "flex-1", onClick: e, children: "Continue" }) : /* @__PURE__ */ a.jsx(
      Z,
      {
        variant: "primary",
        className: "flex-1",
        disabled: !o,
        onClick: () => s(!0),
        children: "Submit answer"
      }
    ) })
  ] });
}
const Il = {
  q: "Which GrowQuest feature would you use most?",
  choices: [
    { id: "a", label: "Daily missions" },
    { id: "b", label: "Spin-to-win lootbox" },
    { id: "c", label: "Referral boosts" },
    { id: "d", label: "Leaderboard competition" }
  ]
}, Ll = {
  q: "Which hero style fits your brand?",
  choices: [
    { id: "a", label: "Isometric world", tint: "primary" },
    { id: "b", label: "Orbital / cosmic", tint: "secondary" },
    { id: "c", label: "Editorial poster", tint: "primary" },
    { id: "d", label: "Pixel / arcade", tint: "secondary" }
  ]
}, ql = {
  q: "Pick your favorite vibe:",
  choices: [
    { id: "a", shape: "hex", tint: "primary" },
    { id: "b", shape: "circle", tint: "secondary" },
    { id: "c", shape: "diamond", tint: "primary" },
    { id: "d", shape: "square", tint: "secondary" }
  ]
};
function Hl({
  variant: t,
  onComplete: e,
  textMinLength: r = 20
}) {
  const [o, n] = F(null), [i, s] = F("");
  if (t === "textarea")
    return /* @__PURE__ */ a.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
      /* @__PURE__ */ a.jsx(Ce, { children: "// survey · open question" }),
      /* @__PURE__ */ a.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: "What's the single biggest pain point in your growth stack right now?" }),
      /* @__PURE__ */ a.jsx(
        ui,
        {
          value: i,
          onChange: (l) => s(l.target.value),
          placeholder: `Type your answer… (minimum ${r} characters)`,
          className: "min-h-[180px]"
        }
      ),
      /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ a.jsxs("span", { children: [
          i.length,
          " chars"
        ] }),
        /* @__PURE__ */ a.jsx("span", { children: i.length >= r ? "ready to submit" : `${r - i.length} more to go` })
      ] }),
      /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: i.length < r, onClick: e, children: "Submit feedback" })
    ] });
  const c = t === "text" ? Il : t === "textImage" ? Ll : ql;
  return /* @__PURE__ */ a.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ a.jsx(Ce, { children: "// survey · your take helps shape the roadmap" }),
    /* @__PURE__ */ a.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: c.q }),
    t === "text" && /* @__PURE__ */ a.jsx("div", { className: "flex flex-col gap-2", children: c.choices.map((l) => {
      const d = o === l.id;
      return /* @__PURE__ */ a.jsxs(Oe, { selected: d, onClick: () => n(l.id), layout: "row", children: [
        /* @__PURE__ */ a.jsx(
          "span",
          {
            className: `w-[18px] h-[18px] rounded-full border-2 grid place-items-center shrink-0 ${d ? "border-accent" : "border-border"}`,
            children: d && /* @__PURE__ */ a.jsx("span", { className: "w-2 h-2 rounded-full bg-primary" })
          }
        ),
        /* @__PURE__ */ a.jsx("span", { className: "flex-1 text-sm", children: l.label })
      ] }, l.id);
    }) }),
    t === "textImage" && /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: c.choices.map((l) => {
      const d = o === l.id;
      return /* @__PURE__ */ a.jsxs(
        Oe,
        {
          selected: d,
          onClick: () => n(l.id),
          layout: "column",
          children: [
            /* @__PURE__ */ a.jsx("div", { className: "aspect-[16/10] rounded-md overflow-hidden", children: /* @__PURE__ */ a.jsx(
              pn,
              {
                shape: ["hex", "circle", "diamond", "square"][l.id.charCodeAt(0) - 97],
                tint: l.tint
              }
            ) }),
            /* @__PURE__ */ a.jsx("div", { className: "text-left text-[13px]", children: l.label })
          ]
        },
        l.id
      );
    }) }),
    t === "imageOnly" && /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: c.choices.map((l) => {
      const d = o === l.id;
      return /* @__PURE__ */ a.jsx(
        Oe,
        {
          selected: d,
          onClick: () => n(l.id),
          layout: "column",
          children: /* @__PURE__ */ a.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ a.jsx(pn, { shape: l.shape, tint: l.tint }) })
        },
        l.id
      );
    }) }),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !o, onClick: e, children: "Submit" })
  ] });
}
function Ul({
  onComplete: t,
  word: e = "GROWQUEST",
  maxWrong: r = 6,
  category: o = "growth engine brand"
}) {
  const [n, i] = F([]), s = n.filter((d) => !e.includes(d)), c = e.split("").every((d) => n.includes(d)), l = s.length >= r;
  return /* @__PURE__ */ a.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ a.jsxs(Ce, { children: [
      "// hangman · guess the word · ",
      r - s.length,
      " lives"
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "text-sm text-ink-dim", children: [
      "Category: ",
      o
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "grid items-center gap-4 grid-cols-[120px_1fr] max-[720px]:grid-cols-[80px_1fr] max-[720px]:gap-2.5", children: [
      /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 100 130", width: "100", height: "130", children: [
        /* @__PURE__ */ a.jsx("line", { x1: "10", y1: "125", x2: "90", y2: "125", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ a.jsx("line", { x1: "30", y1: "125", x2: "30", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ a.jsx("line", { x1: "30", y1: "10", x2: "75", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ a.jsx("line", { x1: "75", y1: "10", x2: "75", y2: "25", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        s.length > 0 && /* @__PURE__ */ a.jsx("circle", { cx: "75", cy: "34", r: "9", fill: "none", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 1 && /* @__PURE__ */ a.jsx("line", { x1: "75", y1: "43", x2: "75", y2: "75", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 2 && /* @__PURE__ */ a.jsx("line", { x1: "75", y1: "55", x2: "62", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 3 && /* @__PURE__ */ a.jsx("line", { x1: "75", y1: "55", x2: "88", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 4 && /* @__PURE__ */ a.jsx("line", { x1: "75", y1: "75", x2: "65", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 5 && /* @__PURE__ */ a.jsx("line", { x1: "75", y1: "75", x2: "85", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "flex gap-1.5 flex-wrap", children: e.split("").map((d, u) => /* @__PURE__ */ a.jsx(
        "span",
        {
          className: `w-7 h-9 border-b-2 border-ink-dim grid place-items-center font-mono text-xl font-bold ${n.includes(d) ? "text-primary" : "text-transparent"}`,
          children: d
        },
        u
      )) })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "grid gap-1 grid-cols-9 max-[720px]:grid-cols-7 max-[420px]:grid-cols-6", children: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((d) => {
      const u = n.includes(d), h = u && !e.includes(d), m = u && e.includes(d);
      return /* @__PURE__ */ a.jsx(
        "button",
        {
          disabled: u || c || l,
          onClick: () => i([...n, d]),
          className: `py-2 px-0 rounded-[5px] border border-border font-mono text-xs font-bold ${u ? "opacity-70" : "opacity-100"} ${m ? "bg-primary-soft text-primary" : h ? "text-danger" : "bg-panel-2 text-ink"}`,
          style: {
            background: h ? "color-mix(in oklch, var(--danger) 18%, transparent)" : void 0
          },
          children: d
        },
        d
      );
    }) }),
    (c || l) && /* @__PURE__ */ a.jsx(
      "div",
      {
        className: `p-3 rounded-lg text-[13px] border ${c ? "border-accent-lime" : "border-danger"}`,
        style: {
          background: c ? "color-mix(in oklch, var(--color-primary) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)"
        },
        children: c ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("strong", { children: "Solved!" }),
          " You cracked ",
          e,
          "."
        ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("strong", { children: "Game over." }),
          " The word was ",
          /* @__PURE__ */ a.jsx("strong", { children: e }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !c && !l, onClick: t, children: "Continue" })
  ] });
}
const zl = [
  { q: "How many tiers are in GrowQuest?", choices: ["2", "3", "4", "5"], correct: 2 },
  {
    q: "What currency powers redemptions?",
    choices: ["USD", "XP", "Tokens", "Credits"],
    correct: 1
  },
  { q: "Streak bonus milestone lands at day…", choices: ["3", "5", "7", "10"], correct: 2 }
];
function Fl({
  onComplete: t,
  questions: e = zl,
  timeLimit: r = 15,
  passScore: o = 2
}) {
  const [n, i] = F(0), [s, c] = F(null), [l, d] = F(0), [u, h] = F(r), [m, y] = F("answering");
  fe(() => {
    if (m !== "answering") return;
    if (u <= 0) {
      y("reveal");
      return;
    }
    const k = setTimeout(() => h(u - 1), 1e3);
    return () => clearTimeout(k);
  }, [u, m]), fe(() => {
    h(r), c(null), y("answering");
  }, [n, r]);
  const w = e[n], A = s === w.correct;
  function T(k) {
    m === "answering" && (c(k), y("reveal"), k === w.correct && d((D) => D + 1));
  }
  function j() {
    n === e.length - 1 ? y("done") : i(n + 1);
  }
  if (m === "done") {
    const k = Math.round(l / e.length * 100), D = l >= o;
    return /* @__PURE__ */ a.jsxs("div", { className: "p-7 text-center", children: [
      /* @__PURE__ */ a.jsx("div", { className: "w-[120px] h-[120px] mx-auto mb-4 relative", children: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 120 120", children: [
        /* @__PURE__ */ a.jsx("circle", { cx: "60", cy: "60", r: "50", fill: "none", stroke: "var(--panel-2)", strokeWidth: "10" }),
        /* @__PURE__ */ a.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "50",
            fill: "none",
            stroke: D ? "var(--color-primary)" : "var(--danger)",
            strokeWidth: "10",
            strokeDasharray: 2 * Math.PI * 50,
            strokeDashoffset: 2 * Math.PI * 50 * (1 - k / 100),
            transform: "rotate(-90 60 60)",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ a.jsxs(
          "text",
          {
            x: "60",
            y: "68",
            textAnchor: "middle",
            fontFamily: "Space Grotesk",
            fontSize: "28",
            fontWeight: "700",
            fill: "currentColor",
            children: [
              l,
              "/",
              e.length
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ a.jsx("div", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-1.5", children: "// trivia complete" }),
      /* @__PURE__ */ a.jsx("h3", { className: "display m-0 mb-2 text-[22px] tracking-[-0.02em]", children: D ? "Nice run!" : "Keep training." }),
      /* @__PURE__ */ a.jsx("p", { className: "text-ink-dim text-[13px] mb-4", children: D ? "You beat the bar — XP unlocked." : `Needed ${o}/${e.length} to pass. Try again tomorrow for another shot.` }),
      /* @__PURE__ */ a.jsx(Z, { variant: "primary", className: "w-full", onClick: t, children: "Continue" })
    ] });
  }
  return /* @__PURE__ */ a.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ a.jsxs(Ce, { children: [
        "// trivia · q",
        n + 1,
        " / ",
        e.length
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ a.jsxs(Rl, { tone: "primary", children: [
          "SCORE ",
          l
        ] }),
        /* @__PURE__ */ a.jsxs(
          "span",
          {
            className: `mono py-1 px-2 border rounded-[4px] text-xs ${u < 5 ? "border-danger text-danger" : "border-border text-ink"}`,
            children: [
              "⏱ ",
              String(u).padStart(2, "0"),
              "s"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "h-1 bg-panel-2 rounded-full overflow-hidden", children: /* @__PURE__ */ a.jsx(
      "div",
      {
        className: `h-full transition-[width] duration-1000 ease-linear ${u < 5 ? "bg-danger" : "bg-primary"}`,
        style: { width: `${u / r * 100}%` }
      }
    ) }),
    /* @__PURE__ */ a.jsx("div", { className: "text-[18px] font-semibold leading-snug py-2.5 px-0", children: w.q }),
    /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-2 gap-2", children: w.choices.map((k, D) => {
      const N = s === D, p = m === "reveal" && D === w.correct, x = m === "reveal" && N && !A;
      return /* @__PURE__ */ a.jsxs(
        "button",
        {
          disabled: m !== "answering",
          onClick: () => T(D),
          className: `py-4 px-3.5 rounded-lg text-left flex items-center gap-2.5 text-sm border ${p ? "border-accent-lime" : x ? "border-danger" : N ? "border-accent" : "border-border"} ${p || x ? "" : "bg-panel-2"}`,
          style: p ? { background: "color-mix(in oklch, var(--color-primary) 14%, transparent)" } : x ? { background: "color-mix(in oklch, var(--danger) 14%, transparent)" } : void 0,
          children: [
            /* @__PURE__ */ a.jsx("span", { className: "mono w-[22px] h-[22px] rounded-[4px] border border-border bg-panel grid place-items-center text-[11px] font-bold", children: String.fromCharCode(65 + D) }),
            /* @__PURE__ */ a.jsx("span", { children: k })
          ]
        },
        D
      );
    }) }),
    m === "reveal" && /* @__PURE__ */ a.jsx(Z, { variant: "primary", onClick: j, children: n === e.length - 1 ? "See results" : "Next question" })
  ] });
}
function Bl(t) {
  const e = t.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (e) return { kind: "youtube", id: e[1] };
  const r = t.match(/vimeo\.com\/(\d+)/);
  return r ? { kind: "vimeo", id: r[1] } : { kind: "native" };
}
function Xl({ url: t, onComplete: e }) {
  const [r, o] = F(!1), [n, i] = F(10), s = Bl(t);
  return fe(() => {
    if (s.kind === "native") return;
    const c = setInterval(() => {
      i((l) => l <= 1 ? (clearInterval(c), o(!0), 0) : l - 1);
    }, 1e3);
    return () => clearInterval(c);
  }, [s.kind]), /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "relative pb-[56.25%] bg-panel-2 rounded-lg overflow-hidden", children: [
      s.kind === "youtube" && /* @__PURE__ */ a.jsx(
        "iframe",
        {
          title: "YouTube video player",
          className: "absolute inset-0 w-full h-full border-none",
          src: `https://www.youtube.com/embed/${s.id}?autoplay=1`,
          allow: "autoplay; encrypted-media",
          allowFullScreen: !0
        }
      ),
      s.kind === "vimeo" && /* @__PURE__ */ a.jsx(
        "iframe",
        {
          title: "Vimeo video player",
          className: "absolute inset-0 w-full h-full border-none",
          src: `https://player.vimeo.com/video/${s.id}?autoplay=1`,
          allow: "autoplay; fullscreen",
          allowFullScreen: !0
        }
      ),
      s.kind === "native" && /* @__PURE__ */ a.jsx(
        "video",
        {
          className: "absolute inset-0 w-full h-full",
          src: t,
          controls: !0,
          onEnded: () => o(!0),
          children: /* @__PURE__ */ a.jsx("track", { kind: "captions" })
        }
      )
    ] }),
    s.kind !== "native" && !r && /* @__PURE__ */ a.jsxs("div", { className: "text-xs text-ink-dim text-center", children: [
      "Button available in ",
      n,
      "s"
    ] }),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !r, onClick: e, className: "w-full", children: "I've watched it" })
  ] });
}
function $l({
  url: t,
  onComplete: e
}) {
  const [r, o] = F(!1), [n, i] = F(60), [s, c] = F(!1);
  fe(() => {
    if (!r) return;
    const d = setInterval(() => {
      i((u) => u <= 1 ? (clearInterval(d), c(!0), 0) : u - 1);
    }, 1e3);
    return () => clearInterval(d);
  }, [r]);
  const l = r ? Math.round((60 - n) / 60 * 100) : 0;
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "p-4 bg-panel-2 border border-border rounded-[10px] flex flex-col gap-2", children: [
      /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim font-mono uppercase tracking-[0.06em]", children: "Article" }),
      /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-[15px]", children: "How XP & Levels work in GrowQuest" }),
      t && /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim", children: t.replace(/^https?:\/\//, "") })
    ] }),
    r ? /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between text-xs text-ink-dim", children: [
        /* @__PURE__ */ a.jsx("span", { children: s ? "Reading complete!" : `Reading… ${n}s remaining` }),
        /* @__PURE__ */ a.jsxs("span", { children: [
          l,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "h-1 bg-panel-2 rounded-sm overflow-hidden", children: /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "h-full bg-primary rounded-sm transition-[width] duration-1000 ease-linear",
          style: { width: `${l}%` }
        }
      ) })
    ] }) : /* @__PURE__ */ a.jsx(
      Z,
      {
        variant: "ghost",
        onClick: () => {
          t && window.open(t, "_blank"), o(!0);
        },
        className: "w-full",
        children: "Open article ↗"
      }
    ),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !s, onClick: e, className: "w-full", children: "Mark as read" })
  ] });
}
function Wl({ onComplete: t }) {
  const [e, r] = F(""), [o, n] = F(""), i = [e.length > 0, o.length > 0].filter(Boolean).length;
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsx(
      kl,
      {
        label: "Display name",
        placeholder: "Your name",
        value: e,
        onChange: (s) => r(s.target.value)
      }
    ),
    /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ a.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: "Bio" }),
      /* @__PURE__ */ a.jsx(
        ui,
        {
          placeholder: "Tell us about yourself…",
          value: o,
          onChange: (s) => n(s.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2 text-xs text-ink-dim", children: [
      /* @__PURE__ */ a.jsx("div", { className: "flex-1 h-1 bg-panel-2 rounded-sm overflow-hidden", children: /* @__PURE__ */ a.jsx(
        "div",
        {
          className: `h-full rounded-sm transition-[width] duration-300 ease-out ${i === 2 ? "bg-accent-lime" : "bg-primary"}`,
          style: { width: `${i / 2 * 100}%` }
        }
      ) }),
      /* @__PURE__ */ a.jsxs("span", { className: "whitespace-nowrap", children: [
        i,
        "/2 fields"
      ] })
    ] }),
    /* @__PURE__ */ a.jsx(
      Z,
      {
        variant: "primary",
        disabled: e.length === 0,
        onClick: t,
        className: "w-full",
        children: "Save profile"
      }
    )
  ] });
}
function Gl({ onComplete: t }) {
  const [e, r] = F(null), [o, n] = F(null), i = Rt(null);
  function s(c) {
    n(c.name);
    const l = new FileReader();
    l.onload = (d) => {
      var u;
      return r((u = d.target) == null ? void 0 : u.result);
    }, l.readAsDataURL(c);
  }
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsx(
      "input",
      {
        ref: i,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (c) => {
          var l;
          (l = c.target.files) != null && l[0] && s(c.target.files[0]);
        }
      }
    ),
    e ? /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ a.jsx(
        "img",
        {
          src: e,
          alt: "Preview",
          className: "w-[88px] h-[88px] rounded-full object-cover border-2 border-accent"
        }
      ),
      /* @__PURE__ */ a.jsx("span", { className: "text-xs text-ink-dim", children: o }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: () => {
            r(null), n(null);
          },
          className: "text-xs text-ink-dim bg-transparent border-none cursor-pointer underline",
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ a.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var c;
          return (c = i.current) == null ? void 0 : c.click();
        },
        onKeyDown: (c) => {
          var l;
          (c.key === "Enter" || c.key === " ") && ((l = i.current) == null || l.click());
        },
        onDragOver: (c) => c.preventDefault(),
        onDrop: (c) => {
          c.preventDefault(), c.dataTransfer.files[0] && s(c.dataTransfer.files[0]);
        },
        className: "border-2 border-dashed border-border rounded-[10px] py-8 px-4 text-center cursor-pointer text-ink-dim text-[13px] transition-colors duration-150",
        children: [
          /* @__PURE__ */ a.jsx("div", { className: "text-[28px] mb-2", children: "📷" }),
          /* @__PURE__ */ a.jsx("div", { children: "Click or drag to upload a photo" }),
          /* @__PURE__ */ a.jsx("div", { className: "text-[11px] mt-1", children: "PNG, JPG up to 5 MB" })
        ]
      }
    ),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !e, onClick: t, className: "w-full", children: "Save photo" })
  ] });
}
function Yl({
  email: t,
  onComplete: e
}) {
  const [r, o] = F(""), [n, i] = F(0);
  return fe(() => {
    if (n <= 0) return;
    const s = setInterval(() => i((c) => Math.max(0, c - 1)), 1e3);
    return () => clearInterval(s);
  }, [n]), /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-[15px] mb-1", children: "Enter the 6-digit code" }),
      /* @__PURE__ */ a.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Sent to ",
        t ?? "your email"
      ] })
    ] }),
    /* @__PURE__ */ a.jsx(
      We,
      {
        type: "text",
        inputMode: "numeric",
        maxLength: 6,
        placeholder: "000000",
        value: r,
        onChange: (s) => o(s.target.value.replace(/\D/g, "").slice(0, 6)),
        className: "font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
      }
    ),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: r.length < 6, onClick: e, className: "w-full", children: "Verify" }),
    /* @__PURE__ */ a.jsx(
      "button",
      {
        disabled: n > 0,
        onClick: () => i(30),
        className: `bg-transparent border-none text-xs text-center ${n > 0 ? "cursor-not-allowed text-ink-dim no-underline" : "cursor-pointer text-primary underline"}`,
        children: n > 0 ? `Resend in ${n}s` : "Resend code"
      }
    )
  ] });
}
const Vl = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+61", flag: "🇦🇺", name: "AU" }
];
function Kl({ onComplete: t }) {
  const [e, r] = F("phone"), [o, n] = F("+1"), [i, s] = F(""), [c, l] = F("");
  return e === "otp" ? /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-[15px] mb-1", children: "Enter the 6-digit code" }),
      /* @__PURE__ */ a.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Sent to ",
        o,
        " ",
        i
      ] })
    ] }),
    /* @__PURE__ */ a.jsx(
      We,
      {
        type: "text",
        inputMode: "numeric",
        maxLength: 6,
        placeholder: "000000",
        value: c,
        onChange: (d) => l(d.target.value.replace(/\D/g, "").slice(0, 6)),
        className: "font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
      }
    ),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: c.length < 6, onClick: t, className: "w-full", children: "Verify" }),
    /* @__PURE__ */ a.jsx(
      "button",
      {
        onClick: () => {
          r("phone"), l("");
        },
        className: "bg-transparent border-none cursor-pointer text-xs text-primary underline text-center",
        children: "Change number"
      }
    )
  ] }) : /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim mb-1.5", children: "Country" }),
      /* @__PURE__ */ a.jsx(
        "select",
        {
          className: "input w-full",
          value: o,
          onChange: (d) => n(d.target.value),
          children: Vl.map(({ code: d, flag: u, name: h }) => /* @__PURE__ */ a.jsxs("option", { value: d, children: [
            u,
            " ",
            h,
            " (",
            d,
            ")"
          ] }, d))
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim mb-1.5", children: "Phone number" }),
      /* @__PURE__ */ a.jsx(
        We,
        {
          type: "tel",
          placeholder: "Phone number",
          value: i,
          onChange: (d) => s(d.target.value.replace(/[^0-9]/g, ""))
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx(
      Z,
      {
        variant: "primary",
        disabled: i.length < 6,
        onClick: () => r("otp"),
        className: "w-full",
        children: "Send OTP"
      }
    )
  ] });
}
const Xe = ["50 XP", "100 XP", "Miss", "200 XP", "75 XP", "Bonus!", "150 XP", "Miss"];
function Jl(t) {
  const e = (t % 360 + 360) % 360, r = Math.floor((360 - e) / (360 / Xe.length)) % Xe.length;
  return Xe[r];
}
function Ql({ onComplete: t }) {
  const [e, r] = F(!1), [o, n] = F(0), [i, s] = F(null);
  function c() {
    if (e) return;
    const m = 1440 + Math.floor(Math.random() * 360), y = o + m;
    r(!0), n(y), setTimeout(() => {
      s(Jl(y)), r(!1);
    }, 3100);
  }
  const l = 240, d = l / 2, u = Xe.length, h = 2 * Math.PI / u;
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col items-center gap-5 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "relative w-[240px] h-[240px]", children: [
      /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 z-10",
          style: {
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "18px solid var(--color-primary)"
          }
        }
      ),
      /* @__PURE__ */ a.jsxs(
        "svg",
        {
          width: l,
          height: l,
          style: {
            transform: `rotate(${o}deg)`,
            transition: e ? "transform 3s cubic-bezier(.17,.67,.12,.99)" : "none"
          },
          children: [
            Xe.map((m, y) => {
              const w = y * h - Math.PI / 2, A = (y + 1) * h - Math.PI / 2, T = d + d * Math.cos(w), j = d + d * Math.sin(w), k = d + d * Math.cos(A), D = d + d * Math.sin(A), N = w + h / 2, p = d + d * 0.65 * Math.cos(N), x = d + d * 0.65 * Math.sin(N);
              return /* @__PURE__ */ a.jsxs("g", { children: [
                /* @__PURE__ */ a.jsx(
                  "path",
                  {
                    d: `M${d},${d} L${T},${j} A${d},${d} 0 0,1 ${k},${D} Z`,
                    fill: y % 2 === 0 ? "var(--panel)" : "var(--panel-2)",
                    stroke: "var(--border)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ a.jsx(
                  "text",
                  {
                    x: p,
                    y: x,
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    transform: `rotate(${N * 180 / Math.PI + 90}, ${p}, ${x})`,
                    style: {
                      fontSize: 9,
                      fill: "var(--ink)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700
                    },
                    children: m
                  }
                )
              ] }, y);
            }),
            /* @__PURE__ */ a.jsx(
              "circle",
              {
                cx: d,
                cy: d,
                r: 18,
                fill: "var(--panel)",
                stroke: "var(--border)",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ a.jsx("circle", { cx: d, cy: d, r: 6, fill: "var(--color-primary)" })
          ]
        }
      )
    ] }),
    i && /* @__PURE__ */ a.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ a.jsx("div", { className: "text-[13px] text-ink-dim", children: "You got" }),
      /* @__PURE__ */ a.jsx("div", { className: "text-[22px] font-bold text-primary", children: i })
    ] }),
    i ? /* @__PURE__ */ a.jsx(Z, { variant: "primary", onClick: t, className: "w-full", children: "Claim reward" }) : /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: e, onClick: c, className: "w-full", children: e ? "Spinning…" : "Spin the wheel" })
  ] });
}
const gt = 16;
function Zl({
  reward: t = "200 XP",
  onComplete: e
}) {
  const [r, o] = F(/* @__PURE__ */ new Set()), [n, i] = F(!1);
  function s(d) {
    n || o((u) => {
      const h = new Set(u);
      return h.add(d), h.size / gt * 100 >= 75 && !n && (i(!0), setTimeout(e, 1500)), h;
    });
  }
  function c() {
    const d = new Set(Array.from({ length: gt }, (u, h) => h));
    o(d), i(!0), setTimeout(e, 1500);
  }
  const l = Math.round(r.size / gt * 100);
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col items-center gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "relative w-[280px]", children: [
      /* @__PURE__ */ a.jsx("div", { className: "h-[140px] grid place-items-center bg-panel-2 border border-border rounded-[10px]", children: /* @__PURE__ */ a.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ a.jsx("div", { className: "text-[11px] text-ink-dim mb-1 font-mono uppercase tracking-[0.06em]", children: "You won" }),
        /* @__PURE__ */ a.jsx("div", { className: "text-[32px] font-extrabold text-primary", children: t })
      ] }) }),
      /* @__PURE__ */ a.jsx(
        "div",
        {
          className: `absolute inset-0 rounded-[10px] grid grid-cols-4 gap-0.5 p-0.5 ${n ? "pointer-events-none" : "pointer-events-auto"}`,
          children: Array.from({ length: gt }, (d, u) => /* @__PURE__ */ a.jsx(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Scratch tile ${u + 1}`,
              onClick: () => s(u),
              onKeyDown: (h) => {
                (h.key === "Enter" || h.key === " ") && s(u);
              },
              onMouseEnter: (h) => {
                h.buttons === 1 && s(u);
              },
              className: `rounded-md cursor-pointer transition-[background] duration-150 min-h-8 ${r.has(u) ? "bg-transparent border-none" : "bg-panel border border-border"}`
            },
            u
          ))
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: `text-xs text-center ${n ? "text-primary" : "text-ink-dim"}`, children: n ? `🎉 You revealed: ${t}` : `Scratch to reveal… ${l}% uncovered` }),
    !n && /* @__PURE__ */ a.jsx(
      "button",
      {
        onClick: c,
        className: "bg-transparent border-none cursor-pointer text-[11px] text-ink-dim underline",
        children: "Reveal all"
      }
    )
  ] });
}
const ed = [
  { id: "b1", name: "First Quest", got: !0, desc: "Completed your first mission." },
  { id: "b2", name: "Streak ×7", got: !0, desc: "7-day streak maintained." },
  { id: "b3", name: "Evangelist", got: !1, desc: "Refer 10 teammates." },
  { id: "b4", name: "Lorekeeper", got: !1, desc: "Complete all weekly quizzes." }
];
function td({
  badges: t = ed,
  goal: e = 3,
  earned: r,
  onComplete: o
}) {
  const n = r ?? t.filter((s) => s.got).length, i = n >= e;
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between text-xs text-ink-dim", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Badges collected" }),
        /* @__PURE__ */ a.jsxs("span", { className: i ? "text-accent-lime" : "text-ink", children: [
          n,
          "/",
          e
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "h-1.5 bg-panel-2 rounded-[3px] overflow-hidden", children: /* @__PURE__ */ a.jsx(
        "div",
        {
          className: `h-full rounded-[3px] transition-[width] duration-[400ms] ease-out ${i ? "bg-accent-lime" : "bg-primary"}`,
          style: {
            width: `${Math.min(100, n / e * 100)}%`
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-2 gap-2", children: t.map((s) => /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: `p-3 bg-panel-2 rounded-lg flex flex-col gap-1 border ${s.got ? "border-solid border-accent opacity-100" : "border-dashed border-border opacity-45"}`,
        children: [
          /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ a.jsx("span", { className: "text-[18px]", children: "🏅" }),
            s.got && /* @__PURE__ */ a.jsx("span", { className: "text-[10px] text-[#05060A] bg-primary py-px px-1.5 rounded-[4px] font-bold", children: "✓" })
          ] }),
          /* @__PURE__ */ a.jsx("div", { className: "text-xs font-semibold", children: s.name })
        ]
      },
      s.id
    )) }),
    !i && /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim text-center", children: "Keep completing missions to earn more badges" }),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !i, onClick: o, className: "w-full", children: i ? "Claim XP" : `Earn ${e - n} more badge${e - n !== 1 ? "s" : ""}` })
  ] });
}
function rd({
  referralLink: t = "https://app.growquest.io/ref/demo-abc123",
  onComplete: e
}) {
  const [r, o] = F(!1), [n, i] = F(!1), s = r || n;
  function c() {
    navigator.clipboard.writeText(t).then(() => {
      o(!0), setTimeout(() => o(!1), 2e3), i(!0);
    });
  }
  function l(d) {
    const u = encodeURIComponent, h = {
      x: `https://x.com/intent/tweet?text=${u("Join me on GrowQuest! " + t)}`,
      whatsapp: `https://wa.me/?text=${u("Join me on GrowQuest! " + t)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${u(t)}`
    };
    window.open(h[d], "_blank"), i(!0);
  }
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("div", { className: "text-[11px] text-ink-dim font-mono uppercase tracking-[0.06em] mb-1.5", children: "Your referral link" }),
      /* @__PURE__ */ a.jsxs("div", { className: "flex gap-2 py-2.5 px-3 bg-panel-2 border border-border rounded-lg items-center", children: [
        /* @__PURE__ */ a.jsx("span", { className: "flex-1 font-mono text-xs text-ink-dim overflow-hidden text-ellipsis whitespace-nowrap", children: t }),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            onClick: c,
            className: `py-1 px-2.5 rounded-[5px] border border-border text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-150 ${r ? "bg-primary" : "bg-panel text-ink"}`,
            style: r ? { color: "#05060A" } : void 0,
            children: r ? "Copied ✓" : "Copy"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("div", { className: "text-[11px] text-ink-dim mb-2", children: "Share via" }),
      /* @__PURE__ */ a.jsx("div", { className: "flex gap-2", children: [
        { id: "x", label: "𝕏" },
        { id: "whatsapp", label: "💬" },
        { id: "linkedin", label: "in" }
      ].map(({ id: d, label: u }) => /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: () => l(d),
          className: "py-2 px-3.5 rounded-md border border-border bg-panel-2 text-ink text-sm font-bold cursor-pointer",
          children: u
        },
        d
      )) })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim", children: "0 friends signed up · goal: 1" }),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !s, onClick: e, className: "w-full", children: "Done" })
  ] });
}
function nd({
  shareText: t = "Check out GrowQuest — earn XP for real actions!",
  shareUrl: e = "https://growquest.io",
  onComplete: r
}) {
  const [o, n] = F(!1);
  function i(l) {
    const d = encodeURIComponent, u = {
      x: `https://x.com/intent/tweet?text=${d(t)}&url=${d(e)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${d(e)}`,
      whatsapp: `https://wa.me/?text=${d(t + " " + e)}`
    };
    window.open(u[l], "_blank"), n(!0);
  }
  function s() {
    navigator.clipboard.writeText(e), n(!0);
  }
  const c = [
    { id: "x", label: "𝕏 X / Twitter" },
    { id: "facebook", label: "Facebook" },
    { id: "whatsapp", label: "WhatsApp" }
  ];
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "p-3.5 bg-panel-2 border border-border rounded-[10px]", children: [
      /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-[13px] mb-1", children: t }),
      /* @__PURE__ */ a.jsx("div", { className: "text-[11px] text-ink-dim font-mono", children: e })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim", children: "Share via" }),
    /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-2", children: [
      c.map(({ id: l, label: d }) => /* @__PURE__ */ a.jsxs(
        "button",
        {
          onClick: () => i(l),
          className: "py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left",
          children: [
            d,
            " ↗"
          ]
        },
        l
      )),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: s,
          className: "py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left",
          children: "📋 Copy link"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", disabled: !o, onClick: r, className: "w-full", children: "Done" })
  ] });
}
function ad({ onComplete: t }) {
  const [e, r] = F(""), [o, n] = F([]);
  function i() {
    e.includes("@") && (n((c) => [...c, e]), r(""));
  }
  const s = e.includes("@");
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ a.jsx(
        We,
        {
          type: "email",
          placeholder: "friend@example.com",
          value: e,
          onChange: (c) => r(c.target.value),
          onKeyDown: (c) => {
            c.key === "Enter" && i();
          },
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: i,
          disabled: !s,
          className: `py-0 px-4 rounded-lg border border-border text-xs font-bold whitespace-nowrap transition-all duration-150 ${s ? "bg-primary cursor-pointer" : "bg-panel-2 text-ink-dim cursor-not-allowed"}`,
          style: s ? { color: "#05060A" } : void 0,
          children: "Send"
        }
      )
    ] }),
    o.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim text-center py-3 px-0", children: "No invites sent yet" }) : /* @__PURE__ */ a.jsx("div", { className: "flex flex-col gap-1.5", children: o.map((c, l) => /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: "flex items-center gap-2 py-1.5 px-2.5 bg-panel-2 rounded-md text-xs",
        children: [
          /* @__PURE__ */ a.jsx("span", { className: "w-4 h-4 rounded-full bg-accent-lime text-[#05060A] grid place-items-center text-[9px] font-bold", children: "✓" }),
          /* @__PURE__ */ a.jsx("span", { className: "text-ink flex-1", children: c })
        ]
      },
      l
    )) }),
    /* @__PURE__ */ a.jsx(
      Z,
      {
        variant: "primary",
        disabled: o.length === 0,
        onClick: t,
        className: "w-full",
        children: o.length === 0 ? "Send at least 1 invite" : `Done · ${o.length} invite${o.length !== 1 ? "s" : ""} sent`
      }
    )
  ] });
}
function od({ onComplete: t }) {
  const [e, r] = F(null), [o, n] = F(null), [i, s] = F(!1), c = Rt(null);
  function l(d) {
    n(d.name);
    const u = new FileReader();
    u.onload = (h) => {
      var m;
      return r((m = h.target) == null ? void 0 : m.result);
    }, u.readAsDataURL(d);
  }
  return i ? /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col items-center gap-5 py-8 px-6", children: [
    /* @__PURE__ */ a.jsx("div", { className: "text-[48px]", children: "⏳" }),
    /* @__PURE__ */ a.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-[15px] mb-1.5", children: "Photo submitted — pending review" }),
      /* @__PURE__ */ a.jsx("div", { className: "text-[13px] text-ink-dim leading-normal", children: "Our team will review your photo and approve it within 24h. You'll be notified when XP is credited." })
    ] }),
    /* @__PURE__ */ a.jsx(Z, { variant: "primary", onClick: t, className: "w-full", children: "Got it" })
  ] }) : /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ a.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "image/*",
        capture: "environment",
        className: "hidden",
        onChange: (d) => {
          var u;
          (u = d.target.files) != null && u[0] && l(d.target.files[0]);
        }
      }
    ),
    e ? /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-2.5", children: [
      /* @__PURE__ */ a.jsx(
        "img",
        {
          src: e,
          alt: "Proof",
          className: "w-full max-h-[220px] object-cover rounded-lg border border-border"
        }
      ),
      /* @__PURE__ */ a.jsx("div", { className: "text-xs text-ink-dim", children: o }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          onClick: () => {
            r(null), n(null);
          },
          className: "bg-transparent border-none cursor-pointer text-xs text-ink-dim underline text-left",
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ a.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var d;
          return (d = c.current) == null ? void 0 : d.click();
        },
        onKeyDown: (d) => {
          var u;
          (d.key === "Enter" || d.key === " ") && ((u = c.current) == null || u.click());
        },
        onDragOver: (d) => d.preventDefault(),
        onDrop: (d) => {
          d.preventDefault(), d.dataTransfer.files[0] && l(d.dataTransfer.files[0]);
        },
        className: "border-2 border-dashed border-border rounded-[10px] py-9 px-4 text-center cursor-pointer text-ink-dim text-[13px]",
        children: [
          /* @__PURE__ */ a.jsx("div", { className: "text-[32px] mb-2", children: "📸" }),
          /* @__PURE__ */ a.jsx("div", { className: "font-medium mb-1", children: "Upload photo proof" }),
          /* @__PURE__ */ a.jsx("div", { className: "text-[11px]", children: "Click to snap or choose a file · JPG, PNG" })
        ]
      }
    ),
    /* @__PURE__ */ a.jsx(
      Z,
      {
        variant: "primary",
        disabled: !e,
        onClick: () => s(!0),
        className: "w-full",
        children: "Submit for review"
      }
    )
  ] });
}
function id({ platform: t }) {
  const e = t;
  return e === "Instagram" ? /* @__PURE__ */ a.jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "4", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "17.5", cy: "6.5", r: "1.2", fill: "currentColor" })
  ] }) : e === "Twitter" ? /* @__PURE__ */ a.jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ a.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }) : e === "YouTube" ? /* @__PURE__ */ a.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: [
        /* @__PURE__ */ a.jsx("rect", { x: "2", y: "5", width: "20", height: "14", rx: "3" }),
        /* @__PURE__ */ a.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor", stroke: "none" })
      ]
    }
  ) : e === "Telegram" ? /* @__PURE__ */ a.jsx(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: /* @__PURE__ */ a.jsx("path", { d: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z", strokeLinejoin: "round" })
    }
  ) : /* @__PURE__ */ a.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: [
        /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ a.jsx("path", { d: "M8 12h8M12 8v8" })
      ]
    }
  );
}
function sd({
  platform: t = "Instagram",
  handle: e = "@growquest",
  url: r = "https://instagram.com/growquest",
  onComplete: o
}) {
  const [n, i] = F(!1);
  return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col items-center gap-6 py-8 px-6", children: [
    /* @__PURE__ */ a.jsx("div", { className: "w-[72px] h-[72px] rounded-[18px] bg-panel-2 border border-border grid place-items-center text-primary", children: /* @__PURE__ */ a.jsx(id, { platform: t }) }),
    /* @__PURE__ */ a.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ a.jsx("div", { className: "font-bold text-[22px] tracking-[-0.02em] mb-1", children: e }),
      /* @__PURE__ */ a.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Follow us on ",
        t,
        " to earn XP"
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ a.jsxs(
        Z,
        {
          variant: "primary",
          onClick: () => {
            window.open(r, "_blank"), i(!0);
          },
          className: "w-full",
          children: [
            "Open ",
            t,
            " ↗"
          ]
        }
      ),
      /* @__PURE__ */ a.jsx(
        Z,
        {
          variant: n ? "primary" : "ghost",
          disabled: !n,
          onClick: o,
          className: "w-full",
          children: "I've followed"
        }
      )
    ] })
  ] });
}
const cd = 'a,button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
function ld(t, e) {
  fe(() => {
    if (!e || !t.current) return;
    const r = t.current, o = Array.from(r.querySelectorAll(cd)), n = o[0], i = o[o.length - 1];
    n == null || n.focus();
    const s = (c) => {
      c.key === "Tab" && (c.shiftKey ? document.activeElement === n && (c.preventDefault(), i == null || i.focus()) : document.activeElement === i && (c.preventDefault(), n == null || n.focus()));
    };
    return r.addEventListener("keydown", s), () => r.removeEventListener("keydown", s);
  }, [e, t]);
}
function Sd({ m: t, onClose: e, onClaim: r }) {
  const o = ki(
    () => () => {
    },
    () => !0,
    () => !1
  ), n = Rt(null);
  if (ld(n, t !== null), !t || !o) return null;
  const i = () => {
    r(t), e();
  };
  let s = null;
  if (t.type === "quiz") {
    const c = t.subtype === "quiz-textImage" ? "textImage" : t.subtype === "quiz-imageOnly" ? "imageOnly" : "text";
    s = /* @__PURE__ */ a.jsx(Dl, { variant: c, onComplete: i });
  } else if (t.type === "survey") {
    const c = t.subtype === "survey-textImage" ? "textImage" : t.subtype === "survey-imageOnly" ? "imageOnly" : t.subtype === "survey-textarea" ? "textarea" : "text";
    s = /* @__PURE__ */ a.jsx(Hl, { variant: c, onComplete: i });
  } else t.type === "hangman" ? s = /* @__PURE__ */ a.jsx(Ul, { onComplete: i }) : t.type === "trivia" ? s = /* @__PURE__ */ a.jsx(Fl, { onComplete: i }) : t.type === "video" ? s = /* @__PURE__ */ a.jsx(Xl, { url: t.url ?? "", onComplete: i }) : t.type === "read_article" ? s = /* @__PURE__ */ a.jsx($l, { url: t.url, onComplete: i }) : t.type === "profile" ? s = /* @__PURE__ */ a.jsx(Wl, { onComplete: i }) : t.type === "avatar" ? s = /* @__PURE__ */ a.jsx(Gl, { onComplete: i }) : t.type === "verify_email" ? s = /* @__PURE__ */ a.jsx(Yl, { onComplete: i }) : t.type === "verify_phone" ? s = /* @__PURE__ */ a.jsx(Kl, { onComplete: i }) : t.type === "spin_wheel" ? s = /* @__PURE__ */ a.jsx(Ql, { onComplete: i }) : t.type === "scratch_card" ? s = /* @__PURE__ */ a.jsx(Zl, { onComplete: i }) : t.type === "badge_collect" ? s = /* @__PURE__ */ a.jsx(td, { onComplete: i }) : t.type === "refer" ? s = /* @__PURE__ */ a.jsx(rd, { onComplete: i }) : t.type === "share" ? s = /* @__PURE__ */ a.jsx(nd, { shareUrl: t.url, onComplete: i }) : t.type === "invite" ? s = /* @__PURE__ */ a.jsx(ad, { onComplete: i }) : t.type === "photo_proof" ? s = /* @__PURE__ */ a.jsx(od, { onComplete: i }) : (t.type === "follow_social" || t.type === "social") && (s = /* @__PURE__ */ a.jsx(sd, { url: t.url, onComplete: i }));
  return Ni(
    /* @__PURE__ */ a.jsx(
      "div",
      {
        className: "modal-backdrop",
        role: "presentation",
        onClick: (c) => c.target === c.currentTarget && e(),
        onKeyDown: (c) => c.key === "Escape" && e(),
        children: /* @__PURE__ */ a.jsxs("div", { ref: n, className: "modal max-w-[560px]", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "relative px-6 py-5 border-b border-[color:var(--mission-modal-header-border)] flex items-center gap-3", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ a.jsx("h2", { className: "display m-0 text-[20px] tracking-[-0.02em] text-[color:var(--mission-modal-title)]", children: t.title }),
              /* @__PURE__ */ a.jsxs("div", { className: "flex gap-2 mt-1.5", children: [
                /* @__PURE__ */ a.jsx(Be, { amount: t.xp }),
                t.limited && t.endsAt && /* @__PURE__ */ a.jsxs(he, { tone: "secondary", children: [
                  "Ends in ",
                  /* @__PURE__ */ a.jsx(fi, { endsAt: t.endsAt })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                onClick: e,
                "aria-label": "Close",
                className: "bg-[var(--mission-modal-close-bg)] border border-[color:var(--mission-modal-close-border)] text-[color:var(--mission-modal-close-icon)] grid place-items-center w-7 h-7 rounded-md",
                children: /* @__PURE__ */ a.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", children: /* @__PURE__ */ a.jsx(
                  "path",
                  {
                    d: "M2 2l8 8M10 2l-8 8",
                    stroke: "currentColor",
                    strokeWidth: "1.6",
                    strokeLinecap: "round"
                  }
                ) })
              }
            )
          ] }),
          s ?? /* @__PURE__ */ a.jsx("div", { className: "p-6 text-[13px] text-center text-[color:var(--mission-modal-body)]", children: "Experience coming soon" })
        ] })
      }
    ),
    document.body
  );
}
function ze(t) {
  return t === "primary" ? "var(--color-primary)" : "var(--color-secondary)";
}
const Pd = kt(function({
  m: e,
  density: r = "comfortable",
  layout: o = "split",
  onOpen: n
}) {
  const [i, s] = e.progress, c = s > 0 ? i / s : 0, l = r === "compact", d = l ? "p-3.5" : "p-[18px]";
  return o === "stack" ? /* @__PURE__ */ a.jsxs(
    "button",
    {
      onClick: () => n(e),
      className: `mission-card text-left flex flex-col gap-2.5 ${d} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-xl transition-all duration-150`,
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ a.jsx(
            "div",
            {
              className: "bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-8 h-8 rounded-md",
              style: { color: ze(e.tone) },
              children: /* @__PURE__ */ a.jsx(Zr, { type: e.type, size: 18 })
            }
          ),
          e.limited && /* @__PURE__ */ a.jsxs(he, { tone: "secondary", children: [
            "LIMITED",
            e.endsAt ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
              " ",
              "· ",
              /* @__PURE__ */ a.jsx(fi, { endsAt: e.endsAt })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx(
            "div",
            {
              className: `font-semibold mb-1 text-[color:var(--mission-card-title)] ${l ? "text-[13px]" : "text-[15px]"}`,
              children: e.title
            }
          ),
          !l && /* @__PURE__ */ a.jsx("div", { className: "text-xs text-[color:var(--mission-card-body)] leading-relaxed", children: e.desc })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "flex justify-between items-center gap-2.5 mt-auto", children: [
          /* @__PURE__ */ a.jsx(Be, { amount: e.xp }),
          /* @__PURE__ */ a.jsxs("span", { className: "font-mono text-[11px] text-[color:var(--mission-card-body)]", children: [
            i,
            "/",
            s
          ] })
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "xpbar", style: { height: 4 }, children: /* @__PURE__ */ a.jsx("div", { className: "fill", style: { width: `${c * 100}%` } }) })
      ]
    }
  ) : o === "list" ? /* @__PURE__ */ a.jsxs(
    "button",
    {
      onClick: () => n(e),
      className: `mission-card text-left flex items-center gap-3.5 ${d} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-[10px] w-full`,
      children: [
        /* @__PURE__ */ a.jsx(
          "div",
          {
            className: "bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-10 h-10 rounded-lg shrink-0",
            style: { color: ze(e.tone) },
            children: /* @__PURE__ */ a.jsx(Zr, { type: e.type, size: 20 })
          }
        ),
        /* @__PURE__ */ a.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ a.jsx("div", { className: "font-semibold text-sm mb-0.5 text-[color:var(--mission-card-title)]", children: e.title }),
          /* @__PURE__ */ a.jsx("div", { className: "text-xs text-[color:var(--mission-card-body)] overflow-hidden text-ellipsis whitespace-nowrap", children: e.desc })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2.5 shrink-0", children: [
          e.limited && /* @__PURE__ */ a.jsx(he, { tone: "secondary", children: "LIMITED" }),
          /* @__PURE__ */ a.jsxs("span", { className: "font-mono text-[11px] text-[color:var(--mission-card-body)]", children: [
            i,
            "/",
            s
          ] }),
          /* @__PURE__ */ a.jsx(Be, { amount: e.xp })
        ] })
      ]
    }
  ) : /* @__PURE__ */ a.jsxs(
    "button",
    {
      onClick: () => n(e),
      className: `mission-card text-left flex flex-col ${d} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-xl relative overflow-hidden`,
      children: [
        /* @__PURE__ */ a.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-20 h-20",
            style: {
              opacity: "var(--mission-card-halo-opacity)",
              background: `radial-gradient(circle at 100% 0, ${ze(e.tone)} 0%, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ a.jsxs(
          "div",
          {
            className: `flex justify-between items-start gap-2 relative ${l ? "mb-2.5" : "mb-3.5"}`,
            children: [
              /* @__PURE__ */ a.jsx(
                "div",
                {
                  className: "bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-[34px] h-[34px] rounded-[7px]",
                  style: { color: ze(e.tone) },
                  children: /* @__PURE__ */ a.jsx(Zr, { type: e.type, size: 18 })
                }
              ),
              e.limited && /* @__PURE__ */ a.jsx(he, { tone: "secondary", children: "⏱ LIMITED" })
            ]
          }
        ),
        /* @__PURE__ */ a.jsx(
          "div",
          {
            className: `font-semibold mb-1 text-[color:var(--mission-card-title)] ${l ? "text-sm" : "text-base"}`,
            children: e.title
          }
        ),
        !l && /* @__PURE__ */ a.jsx("div", { className: "text-xs text-[color:var(--mission-card-body)] leading-relaxed mb-3.5", children: e.desc }),
        /* @__PURE__ */ a.jsxs("div", { className: `flex justify-between items-center gap-2.5 ${l ? "mt-2" : "mt-auto"}`, children: [
          /* @__PURE__ */ a.jsx(Be, { amount: e.xp }),
          /* @__PURE__ */ a.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold tracking-[0.04em]",
              style: {
                background: ze(e.tone),
                color: "var(--mission-card-cta-fg)"
              },
              children: [
                "GO",
                /* @__PURE__ */ a.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ a.jsx(
                  "path",
                  {
                    d: "M1 5h8M5 1l4 4-4 4",
                    stroke: "currentColor",
                    strokeWidth: "1.6",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ) })
              ]
            }
          )
        ] })
      ]
    }
  );
}), dd = {
  1: "color-mix(in oklch, var(--color-primary) 50%, var(--color-secondary))",
  2: "var(--color-primary)",
  3: "var(--color-secondary)"
}, ud = { 1: 180, 2: 150, 3: 130 };
function Od({ entries: t, rankColors: e, platformHeights: r }) {
  const o = e ?? dd, n = r ?? ud, i = t.slice(0, 3), s = [i[1], i[0], i[2]].filter(Boolean);
  return /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-3 gap-3.5 mb-7", children: s.map((c) => {
    const l = o[c.rank] ?? "var(--color-primary)", d = n[c.rank] ?? 120;
    return /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col items-center gap-2.5", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ a.jsx(Pn, { seed: c.seed, size: 56 }),
        /* @__PURE__ */ a.jsx(
          "div",
          {
            className: "absolute -bottom-1.5 -right-1.5 w-[22px] h-[22px] rounded-[5px] text-[#05060A] grid place-items-center font-mono text-[11px] font-bold border-2 border-bg",
            style: { background: l },
            children: c.rank
          }
        )
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "font-bold text-[14px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: c.handle }),
      /* @__PURE__ */ a.jsxs("div", { className: "mono text-[12px] text-ink-dim", children: [
        c.xp.toLocaleString(),
        " XP"
      ] }),
      /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: "w-full rounded-t-lg border border-border border-b-0 relative overflow-hidden",
          style: {
            height: d,
            background: `linear-gradient(180deg, ${l} 0%, transparent 100%)`
          },
          children: [
            /* @__PURE__ */ a.jsx("div", { className: "absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_8px,rgba(0,0,0,0.12)_8px_9px)]" }),
            /* @__PURE__ */ a.jsx("div", { className: "absolute top-2.5 left-2.5 font-mono text-[28px] font-bold text-[#05060A] opacity-80", children: String(c.rank).padStart(2, "0") })
          ]
        }
      )
    ] }, c.rank);
  }) });
}
function Td({
  persona: t,
  xpStyle: e,
  xpMax: r = 12e3,
  label: o = "Progress to Ascendant",
  walletAddress: n = "0xE63F6A · 356C10AC"
}) {
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: "bg-[var(--profile-card-bg)] border border-[color:var(--profile-card-border)] rounded-[var(--radius-card,14px)] p-[18px] flex flex-col gap-3.5",
      style: { containerType: "inline-size" },
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ a.jsx(Pn, { seed: 7, size: 44 }),
          /* @__PURE__ */ a.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ a.jsxs("span", { className: "font-bold text-[color:var(--profile-card-title)]", children: [
                "@",
                t.handle
              ] }),
              /* @__PURE__ */ a.jsx(he, { tone: "primary", children: t.tier })
            ] }),
            /* @__PURE__ */ a.jsx("div", { className: "font-mono text-[11px] text-[color:var(--profile-card-wallet)]", children: n })
          ] })
        ] }),
        /* @__PURE__ */ a.jsx(Nl, { value: t.xp, max: r, style: e, label: o }),
        /* @__PURE__ */ a.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          { k: "Missions", v: `${t.missionsDone}/12` },
          { k: "XP", v: t.xp.toLocaleString() },
          { k: "Streak", v: `${t.streak}d` }
        ].map((i) => /* @__PURE__ */ a.jsxs(
          "div",
          {
            className: "p-2.5 bg-[var(--profile-card-stat-bg)] border border-[color:var(--profile-card-stat-border)] rounded-lg text-center",
            children: [
              /* @__PURE__ */ a.jsx("div", { className: "font-mono text-[9px] tracking-[0.12em] uppercase text-[color:var(--profile-card-body)]", children: i.k }),
              /* @__PURE__ */ a.jsx("div", { className: "font-bold text-[14px] mt-0.5 text-[color:var(--profile-card-title)]", children: i.v })
            ]
          },
          i.k
        )) })
      ]
    }
  );
}
const Cd = kt(function({
  r: e,
  persona: r,
  onRedeem: o,
  compact: n = !1
}) {
  const i = r.xp >= e.cost, s = `var(--tone-${e.tone})`;
  return /* @__PURE__ */ a.jsxs("div", { className: "bg-[var(--reward-card-bg)] border border-[color:var(--reward-card-border)] rounded-[var(--radius-card,14px)] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: "relative bg-[var(--reward-card-image-bg)] border-b border-[color:var(--reward-card-image-border)] overflow-hidden",
        style: { aspectRatio: n ? "2 / 1" : "4 / 3" },
        children: [
          e.imageUrl ? /* @__PURE__ */ a.jsx(
            "img",
            {
              src: e.imageUrl,
              alt: e.title,
              width: 400,
              height: 300,
              loading: "lazy",
              className: "w-full h-full object-cover block"
            }
          ) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
            /* @__PURE__ */ a.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, ${s} 20%, transparent) 0 8px, transparent 8px 18px)`
                }
              }
            ),
            /* @__PURE__ */ a.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ a.jsx(
              "div",
              {
                className: "rounded-xl text-[#05060A] grid place-items-center font-bold font-mono tracking-[0.1em] uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]",
                style: {
                  width: n ? 52 : 68,
                  height: n ? 52 : 68,
                  background: s,
                  fontSize: n ? 9 : 11
                },
                children: e.kind.slice(0, 4)
              }
            ) })
          ] }),
          e.limited && /* @__PURE__ */ a.jsx("div", { className: "absolute top-2.5 left-2.5", children: /* @__PURE__ */ a.jsx(he, { tone: "secondary", children: "LIMITED" }) }),
          /* @__PURE__ */ a.jsx("div", { className: "absolute top-2.5 right-2.5", children: /* @__PURE__ */ a.jsx(he, { children: e.stock }) })
        ]
      }
    ),
    /* @__PURE__ */ a.jsxs("div", { className: "flex flex-col gap-2 flex-1", style: { padding: n ? 10 : 14 }, children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx(
          "div",
          {
            className: "font-semibold text-[color:var(--reward-card-title)]",
            style: { fontSize: n ? 13 : 14 },
            children: e.title
          }
        ),
        /* @__PURE__ */ a.jsx("div", { className: "text-[11px] text-[color:var(--reward-card-body)] font-mono uppercase tracking-[0.1em] mt-0.5", children: e.kind })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto", children: [
        /* @__PURE__ */ a.jsx(Be, { amount: e.cost.toLocaleString() }),
        /* @__PURE__ */ a.jsx(Z, { variant: "primary", size: "sm", disabled: !i, onClick: () => o(e), children: i ? "Redeem" : "Locked" })
      ] })
    ] })
  ] });
});
function Md({ label: t, value: e, trend: r, trendColor: o }) {
  return /* @__PURE__ */ a.jsxs("div", { className: "p-3.5 bg-panel-2 border border-border rounded-[10px]", children: [
    /* @__PURE__ */ a.jsx("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-1.5", children: t }),
    /* @__PURE__ */ a.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ a.jsx("span", { style: { fontWeight: 700, fontSize: 22 }, children: e }),
      /* @__PURE__ */ a.jsx(Pl, { values: r, color: o })
    ] })
  ] });
}
function Ad({ tiers: t, currentXP: e }) {
  const r = Ko("profile"), o = [...t].reverse().find((n) => e >= n.min) ?? t[0];
  return /* @__PURE__ */ a.jsxs("div", { className: "panel p-5", children: [
    /* @__PURE__ */ a.jsx("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5", children: r.tierLadderEyebrow }),
    /* @__PURE__ */ a.jsx("div", { className: "grid gap-2.5", style: { gridTemplateColumns: `repeat(${t.length}, 1fr)` }, children: t.map((n, i) => {
      const s = o.name === n.name, c = e >= n.min;
      return /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: "p-3.5 rounded-[10px] border",
          style: {
            borderColor: s ? n.color : "var(--border)",
            background: s ? `var(--tier-ladder-panel-current, color-mix(in oklch, ${n.color} var(--tier-ladder-current-mix), transparent))` : "var(--tier-ladder-panel)",
            opacity: c || s ? 1 : "var(--tier-ladder-locked-opacity)"
          },
          children: [
            /* @__PURE__ */ a.jsxs("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: [
              r.tierLabelPrefix,
              " ",
              String(i + 1).padStart(2, "0")
            ] }),
            /* @__PURE__ */ a.jsx(
              "div",
              {
                className: "font-bold text-[16px] mt-1",
                style: { color: s ? n.color : "var(--ink)" },
                children: n.name
              }
            ),
            /* @__PURE__ */ a.jsxs("div", { className: "font-mono text-[11px] text-ink-dim mt-0.5", children: [
              n.min.toLocaleString(),
              r.tierXPSuffix
            ] })
          ]
        },
        n.name
      );
    }) })
  ] });
}
export {
  Fl as $,
  Gl as A,
  td as B,
  Rl as C,
  Se as D,
  Yl as E,
  kl as F,
  _d as G,
  Ul as H,
  We as I,
  Td as J,
  Wl as K,
  Nd as L,
  Pd as M,
  rd as N,
  Cd as O,
  Si as P,
  Dl as Q,
  $l as R,
  Zl as S,
  nd as T,
  Pl as U,
  Ql as V,
  Md as W,
  Hl as X,
  he as Y,
  ui as Z,
  Ad as _,
  ho as a,
  Xl as a0,
  Nl as a1,
  Be as a2,
  vc as a3,
  xc as a4,
  Tc as a5,
  hd as a6,
  gd as a7,
  yd as a8,
  bd as a9,
  yc as aa,
  Rc as ab,
  kc as ac,
  En as ad,
  Ko as ae,
  _l as b,
  xo as c,
  wd as d,
  Ed as e,
  pc as f,
  md as g,
  Z as h,
  fi as i,
  a as j,
  jd as k,
  Ce as l,
  Rd as m,
  so as n,
  sd as o,
  Eo as p,
  kd as q,
  Cl as r,
  vd as s,
  ad as t,
  xd as u,
  Sl as v,
  Sd as w,
  Kl as x,
  od as y,
  Od as z
};
