import pn, { useState as j, useEffect as G, useMemo as hn, useContext as mn, createContext as bn, memo as Ue, useRef as Xt, useSyncExternalStore as gn } from "react";
import { createPortal as vn } from "react-dom";
function Fe(e, t) {
  if (!t) return e;
  if (typeof e != "object" || e === null) return t ?? e;
  const r = Array.isArray(e) ? [...e] : { ...e };
  for (const i of Object.keys(t)) {
    const a = e[i], o = t[i];
    o !== void 0 && (a && typeof a == "object" && !Array.isArray(a) && o && typeof o == "object" && !Array.isArray(o) ? r[i] = Fe(a, o) : r[i] = o);
  }
  return r;
}
const yn = {
  dark: {
    surface: "#0E1018",
    surface2: "#141722",
    surface3: "#1A1E2C",
    surfaceHover: "#1A1E2C",
    onSurface: "#E8EBF2",
    onSurfaceDim: "#8B93A7",
    onSurfaceFaint: "#555C6E",
    border: "oklch(0.28 0.015 270)",
    borderStrong: "oklch(0.38 0.02 270)"
  },
  light: {
    surface: "#FFFFFF",
    surface2: "#F9F8F4",
    surface3: "#F0EFE9",
    surfaceHover: "#F0EFE9",
    onSurface: "#0A0B10",
    onSurfaceDim: "#5A6275",
    onSurfaceFaint: "#9099AA",
    border: "oklch(0.88 0.006 270)",
    borderStrong: "oklch(0.78 0.01 270)"
  }
}, Sr = {
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
}, se = {
  mode: "dark",
  brand: {
    primary: "oklch(0.86 0.18 200)",
    secondary: "oklch(0.72 0.25 340)"
  },
  // Default hero imagery. placehold.co serves edge-cached PNGs instantly —
  // colors match the dark surface palette + cyan brand primary. Each surface
  // ships a desktop + mobile variant matched to the actual pane aspect ratio:
  // onboarding flips from portrait at >720px to landscape at ≤720px (grid
  // collapse); missions stays landscape but narrows on mobile. Browsers fetch
  // only the matching URL via <picture><source media>. Tenants override via
  // `config.assets.{onboardingHero,missionsHero}`. If a URL fails to load,
  // HeroMedia falls back to the procedural <HeroArt />.
  assets: {
    onboardingHero: {
      src: "https://placehold.co/720x800/0E1018/86C5FF/png?text=GrowQuest",
      type: "IMG",
      mobileSrc: "https://placehold.co/720x400/0E1018/86C5FF/png?text=GrowQuest"
    },
    missionsHero: {
      src: "https://placehold.co/1280x380/0E1018/86C5FF/png?text=GrowQuest+Missions",
      type: "IMG",
      mobileSrc: "https://placehold.co/720x360/0E1018/86C5FF/png?text=GrowQuest+Missions"
    }
  }
}, Tr = (e, t) => {
  if (typeof e == "number") {
    if (t === 3)
      return {
        mode: "rgb",
        r: (e >> 8 & 15 | e >> 4 & 240) / 255,
        g: (e >> 4 & 15 | e & 240) / 255,
        b: (e & 15 | e << 4 & 240) / 255
      };
    if (t === 4)
      return {
        mode: "rgb",
        r: (e >> 12 & 15 | e >> 8 & 240) / 255,
        g: (e >> 8 & 15 | e >> 4 & 240) / 255,
        b: (e >> 4 & 15 | e & 240) / 255,
        alpha: (e & 15 | e << 4 & 240) / 255
      };
    if (t === 6)
      return {
        mode: "rgb",
        r: (e >> 16 & 255) / 255,
        g: (e >> 8 & 255) / 255,
        b: (e & 255) / 255
      };
    if (t === 8)
      return {
        mode: "rgb",
        r: (e >> 24 & 255) / 255,
        g: (e >> 16 & 255) / 255,
        b: (e >> 8 & 255) / 255,
        alpha: (e & 255) / 255
      };
  }
}, jn = {
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
}, kn = (e) => Tr(jn[e.toLowerCase()], 6), wn = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i, Nn = (e) => {
  let t;
  return (t = e.match(wn)) ? Tr(parseInt(t[1], 16), t[1].length) : void 0;
}, Y = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)", Me = `${Y}%`, qt = `(?:${Y}%|${Y})`, Mn = `(?:${Y}(deg|grad|rad|turn)|${Y})`, fe = "\\s*,\\s*", Cn = new RegExp(
  `^rgba?\\(\\s*${Y}${fe}${Y}${fe}${Y}\\s*(?:,\\s*${qt}\\s*)?\\)$`
), _n = new RegExp(
  `^rgba?\\(\\s*${Me}${fe}${Me}${fe}${Me}\\s*(?:,\\s*${qt}\\s*)?\\)$`
), Sn = (e) => {
  let t = { mode: "rgb" }, r;
  if (r = e.match(Cn))
    r[1] !== void 0 && (t.r = r[1] / 255), r[2] !== void 0 && (t.g = r[2] / 255), r[3] !== void 0 && (t.b = r[3] / 255);
  else if (r = e.match(_n))
    r[1] !== void 0 && (t.r = r[1] / 100), r[2] !== void 0 && (t.g = r[2] / 100), r[3] !== void 0 && (t.b = r[3] / 100);
  else
    return;
  return r[4] !== void 0 ? t.alpha = Math.max(0, Math.min(1, r[4] / 100)) : r[5] !== void 0 && (t.alpha = Math.max(0, Math.min(1, +r[5]))), t;
}, $r = (e, t) => e === void 0 ? void 0 : typeof e != "object" ? Or(e) : e.mode !== void 0 ? e : t ? { ...e, mode: t } : void 0, Er = (e = "rgb") => (t) => (t = $r(t, e)) !== void 0 ? (
  // if the color's mode corresponds to our target mode
  t.mode === e ? (
    // then just return the color
    t
  ) : (
    // otherwise check to see if we have a dedicated
    // converter for the target mode
    L[t.mode][e] ? (
      // and return its result...
      L[t.mode][e](t)
    ) : (
      // ...otherwise pass through RGB as an intermediary step.
      // if the target mode is RGB...
      e === "rgb" ? (
        // just return the RGB
        L[t.mode].rgb(t)
      ) : (
        // otherwise convert color.mode -> RGB -> target_mode
        L.rgb[e](L[t.mode].rgb(t))
      )
    )
  )
) : void 0, L = {}, Pr = {}, Le = [], zr = {}, Tn = (e) => e, N = (e) => (L[e.mode] = {
  ...L[e.mode],
  ...e.toMode
}, Object.keys(e.fromMode || {}).forEach((t) => {
  L[t] || (L[t] = {}), L[t][e.mode] = e.fromMode[t];
}), e.ranges || (e.ranges = {}), e.difference || (e.difference = {}), e.channels.forEach((t) => {
  if (e.ranges[t] === void 0 && (e.ranges[t] = [0, 1]), !e.interpolate[t])
    throw new Error(`Missing interpolator for: ${t}`);
  typeof e.interpolate[t] == "function" && (e.interpolate[t] = {
    use: e.interpolate[t]
  }), e.interpolate[t].fixup || (e.interpolate[t].fixup = Tn);
}), Pr[e.mode] = e, (e.parse || []).forEach((t) => {
  $n(t, e.mode);
}), Er(e.mode)), Rr = (e) => Pr[e], $n = (e, t) => {
  if (typeof e == "string") {
    if (!t)
      throw new Error("'mode' required when 'parser' is a string");
    zr[e] = t;
  } else typeof e == "function" && Le.indexOf(e) < 0 && Le.push(e);
}, zt = /[^\x00-\x7F]|[a-zA-Z_]/, En = /[^\x00-\x7F]|[-\w]/, p = {
  Function: "function",
  Ident: "ident",
  Number: "number",
  Percentage: "percentage",
  ParenClose: ")",
  None: "none",
  Hue: "hue",
  Alpha: "alpha"
};
let g = 0;
function Re(e) {
  let t = e[g], r = e[g + 1];
  return t === "-" || t === "+" ? /\d/.test(r) || r === "." && /\d/.test(e[g + 2]) : t === "." ? /\d/.test(r) : /\d/.test(t);
}
function Rt(e) {
  if (g >= e.length)
    return !1;
  let t = e[g];
  if (zt.test(t))
    return !0;
  if (t === "-") {
    if (e.length - g < 2)
      return !1;
    let r = e[g + 1];
    return !!(r === "-" || zt.test(r));
  }
  return !1;
}
const Pn = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 9 / 10,
  turn: 360
};
function je(e) {
  let t = "";
  if ((e[g] === "-" || e[g] === "+") && (t += e[g++]), t += Ae(e), e[g] === "." && /\d/.test(e[g + 1]) && (t += e[g++] + Ae(e)), (e[g] === "e" || e[g] === "E") && ((e[g + 1] === "-" || e[g + 1] === "+") && /\d/.test(e[g + 2]) ? t += e[g++] + e[g++] + Ae(e) : /\d/.test(e[g + 1]) && (t += e[g++] + Ae(e))), Rt(e)) {
    let r = Be(e);
    return r === "deg" || r === "rad" || r === "turn" || r === "grad" ? { type: p.Hue, value: t * Pn[r] } : void 0;
  }
  return e[g] === "%" ? (g++, { type: p.Percentage, value: +t }) : { type: p.Number, value: +t };
}
function Ae(e) {
  let t = "";
  for (; /\d/.test(e[g]); )
    t += e[g++];
  return t;
}
function Be(e) {
  let t = "";
  for (; g < e.length && En.test(e[g]); )
    t += e[g++];
  return t;
}
function zn(e) {
  let t = Be(e);
  return e[g] === "(" ? (g++, { type: p.Function, value: t }) : t === "none" ? { type: p.None, value: void 0 } : { type: p.Ident, value: t };
}
function Rn(e = "") {
  let t = e.trim(), r = [], i;
  for (g = 0; g < t.length; ) {
    if (i = t[g++], i === `
` || i === "	" || i === " ") {
      for (; g < t.length && (t[g] === `
` || t[g] === "	" || t[g] === " "); )
        g++;
      continue;
    }
    if (i === ",")
      return;
    if (i === ")") {
      r.push({ type: p.ParenClose });
      continue;
    }
    if (i === "+") {
      if (g--, Re(t)) {
        r.push(je(t));
        continue;
      }
      return;
    }
    if (i === "-") {
      if (g--, Re(t)) {
        r.push(je(t));
        continue;
      }
      if (Rt(t)) {
        r.push({ type: p.Ident, value: Be(t) });
        continue;
      }
      return;
    }
    if (i === ".") {
      if (g--, Re(t)) {
        r.push(je(t));
        continue;
      }
      return;
    }
    if (i === "/") {
      for (; g < t.length && (t[g] === `
` || t[g] === "	" || t[g] === " "); )
        g++;
      let a;
      if (Re(t) && (a = je(t), a.type !== p.Hue)) {
        r.push({ type: p.Alpha, value: a });
        continue;
      }
      if (Rt(t) && Be(t) === "none") {
        r.push({
          type: p.Alpha,
          value: { type: p.None, value: void 0 }
        });
        continue;
      }
      return;
    }
    if (/\d/.test(i)) {
      g--, r.push(je(t));
      continue;
    }
    if (zt.test(i)) {
      g--, r.push(zn(t));
      continue;
    }
    return;
  }
  return r;
}
function An(e) {
  e._i = 0;
  let t = e[e._i++];
  if (!t || t.type !== p.Function || t.value !== "color" || (t = e[e._i++], t.type !== p.Ident))
    return;
  const r = zr[t.value];
  if (!r)
    return;
  const i = { mode: r }, a = Ar(e, !1);
  if (!a)
    return;
  const o = Rr(r).channels;
  for (let s = 0, l, d; s < o.length; s++)
    l = a[s], d = o[s], l.type !== p.None && (i[d] = l.type === p.Number ? l.value : l.value / 100, d === "alpha" && (i[d] = Math.max(0, Math.min(1, i[d]))));
  return i;
}
function Ar(e, t) {
  const r = [];
  let i;
  for (; e._i < e.length; ) {
    if (i = e[e._i++], i.type === p.None || i.type === p.Number || i.type === p.Alpha || i.type === p.Percentage || t && i.type === p.Hue) {
      r.push(i);
      continue;
    }
    if (i.type === p.ParenClose) {
      if (e._i < e.length)
        return;
      continue;
    }
    return;
  }
  if (!(r.length < 3 || r.length > 4)) {
    if (r.length === 4) {
      if (r[3].type !== p.Alpha)
        return;
      r[3] = r[3].value;
    }
    return r.length === 3 && r.push({ type: p.None, value: void 0 }), r.every((a) => a.type !== p.Alpha) ? r : void 0;
  }
}
function On(e, t) {
  e._i = 0;
  let r = e[e._i++];
  if (!r || r.type !== p.Function)
    return;
  let i = Ar(e, t);
  if (i)
    return i.unshift(r.value), i;
}
const Or = (e) => {
  if (typeof e != "string")
    return;
  const t = Rn(e), r = t ? On(t, !0) : void 0;
  let i, a = 0, o = Le.length;
  for (; a < o; )
    if ((i = Le[a++](e, r)) !== void 0)
      return i;
  return t ? An(t) : void 0;
};
function In(e, t) {
  if (!t || t[0] !== "rgb" && t[0] !== "rgba")
    return;
  const r = { mode: "rgb" }, [, i, a, o, s] = t;
  if (!(i.type === p.Hue || a.type === p.Hue || o.type === p.Hue))
    return i.type !== p.None && (r.r = i.type === p.Number ? i.value / 255 : i.value / 100), a.type !== p.None && (r.g = a.type === p.Number ? a.value / 255 : a.value / 100), o.type !== p.None && (r.b = o.type === p.Number ? o.value / 255 : o.value / 100), s.type !== p.None && (r.alpha = Math.min(
      1,
      Math.max(
        0,
        s.type === p.Number ? s.value : s.value / 100
      )
    )), r;
}
const Fn = (e) => e === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0, Ln = (e, t, r) => e + r * (t - e), Bn = (e) => {
  let t = [];
  for (let r = 0; r < e.length - 1; r++) {
    let i = e[r], a = e[r + 1];
    i === void 0 && a === void 0 ? t.push(void 0) : i !== void 0 && a !== void 0 ? t.push([i, a]) : t.push(i !== void 0 ? [i, i] : [a, a]);
  }
  return t;
}, Dn = (e) => (t) => {
  let r = Bn(t);
  return (i) => {
    let a = i * r.length, o = i >= 1 ? r.length - 1 : Math.max(Math.floor(a), 0), s = r[o];
    return s === void 0 ? void 0 : e(s[0], s[1], a - o);
  };
}, h = Dn(Ln), A = (e) => {
  let t = !1, r = e.map((i) => i !== void 0 ? (t = !0, i) : 1);
  return t ? r : e;
}, xe = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parse: [
    In,
    Nn,
    Sn,
    kn,
    Fn,
    "srgb"
  ],
  serialize: "srgb",
  interpolate: {
    r: h,
    g: h,
    b: h,
    alpha: { use: h, fixup: A }
  },
  gamut: !0,
  white: { r: 1, g: 1, b: 1 },
  black: { r: 0, g: 0, b: 0 }
}, it = (e = 0) => Math.pow(Math.abs(e), 563 / 256) * Math.sign(e), er = (e) => {
  let t = it(e.r), r = it(e.g), i = it(e.b), a = {
    mode: "xyz65",
    x: 0.5766690429101305 * t + 0.1855582379065463 * r + 0.1882286462349947 * i,
    y: 0.297344975250536 * t + 0.6273635662554661 * r + 0.0752914584939979 * i,
    z: 0.0270313613864123 * t + 0.0706888525358272 * r + 0.9913375368376386 * i
  };
  return e.alpha !== void 0 && (a.alpha = e.alpha), a;
}, ot = (e) => Math.pow(Math.abs(e), 256 / 563) * Math.sign(e), tr = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = {
    mode: "a98",
    r: ot(
      e * 2.0415879038107465 - t * 0.5650069742788597 - 0.3447313507783297 * r
    ),
    g: ot(
      e * -0.9692436362808798 + t * 1.8759675015077206 + 0.0415550574071756 * r
    ),
    b: ot(
      e * 0.0134442806320312 - t * 0.1183623922310184 + 1.0151749943912058 * r
    )
  };
  return i !== void 0 && (a.alpha = i), a;
}, st = (e = 0) => {
  const t = Math.abs(e);
  return t <= 0.04045 ? e / 12.92 : (Math.sign(e) || 1) * Math.pow((t + 0.055) / 1.055, 2.4);
}, pe = ({ r: e, g: t, b: r, alpha: i }) => {
  let a = {
    mode: "lrgb",
    r: st(e),
    g: st(t),
    b: st(r)
  };
  return i !== void 0 && (a.alpha = i), a;
}, ee = (e) => {
  let { r: t, g: r, b: i, alpha: a } = pe(e), o = {
    mode: "xyz65",
    x: 0.4123907992659593 * t + 0.357584339383878 * r + 0.1804807884018343 * i,
    y: 0.2126390058715102 * t + 0.715168678767756 * r + 0.0721923153607337 * i,
    z: 0.0193308187155918 * t + 0.119194779794626 * r + 0.9505321522496607 * i
  };
  return a !== void 0 && (o.alpha = a), o;
}, lt = (e = 0) => {
  const t = Math.abs(e);
  return t > 31308e-7 ? (Math.sign(e) || 1) * (1.055 * Math.pow(t, 1 / 2.4) - 0.055) : e * 12.92;
}, he = ({ r: e, g: t, b: r, alpha: i }, a = "rgb") => {
  let o = {
    mode: a,
    r: lt(e),
    g: lt(t),
    b: lt(r)
  };
  return i !== void 0 && (o.alpha = i), o;
}, te = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = he({
    r: e * 3.2409699419045226 - t * 1.537383177570094 - 0.4986107602930034 * r,
    g: e * -0.9692436362808796 + t * 1.8759675015077204 + 0.0415550574071756 * r,
    b: e * 0.0556300796969936 - t * 0.2039769588889765 + 1.0569715142428784 * r
  });
  return i !== void 0 && (a.alpha = i), a;
}, Hn = {
  ...xe,
  mode: "a98",
  parse: ["a98-rgb"],
  serialize: "a98-rgb",
  fromMode: {
    rgb: (e) => tr(ee(e)),
    xyz65: tr
  },
  toMode: {
    rgb: (e) => te(er(e)),
    xyz65: er
  }
}, F = (e) => (e = e % 360) < 0 ? e + 360 : e, Xn = (e, t) => e.map((r, i, a) => {
  if (r === void 0)
    return r;
  let o = F(r);
  return i === 0 || e[i - 1] === void 0 ? o : t(o - F(a[i - 1]));
}).reduce((r, i) => !r.length || i === void 0 || r[r.length - 1] === void 0 ? (r.push(i), r) : (r.push(i + r[r.length - 1]), r), []), q = (e) => Xn(e, (t) => Math.abs(t) <= 180 ? t : t - 360 * Math.sign(t)), O = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0], qn = Math.PI / 180, Wn = 180 / Math.PI;
let rr = O[3] * O[4], nr = O[1] * O[4], ar = O[1] * O[2] - O[0] * O[3];
const Un = ({ r: e, g: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = (ar * r + e * rr - t * nr) / (ar + rr - nr), o = r - a, s = (O[4] * (t - a) - O[2] * o) / O[3], l = {
    mode: "cubehelix",
    l: a,
    s: a === 0 || a === 1 ? void 0 : Math.sqrt(o * o + s * s) / (O[4] * a * (1 - a))
  };
  return l.s && (l.h = Math.atan2(s, o) * Wn - 120), i !== void 0 && (l.alpha = i), l;
}, Yn = ({ h: e, s: t, l: r, alpha: i }) => {
  let a = { mode: "rgb" };
  e = (e === void 0 ? 0 : e + 120) * qn, r === void 0 && (r = 0);
  let o = t === void 0 ? 0 : t * r * (1 - r), s = Math.cos(e), l = Math.sin(e);
  return a.r = r + o * (O[0] * s + O[1] * l), a.g = r + o * (O[2] * s + O[3] * l), a.b = r + o * (O[4] * s + O[5] * l), i !== void 0 && (a.alpha = i), a;
}, Ye = (e, t) => {
  if (e.h === void 0 || t.h === void 0 || !e.s || !t.s)
    return 0;
  let r = F(e.h), i = F(t.h), a = Math.sin((i - r + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(e.s * t.s) * a;
}, Gn = (e, t) => {
  if (e.h === void 0 || t.h === void 0)
    return 0;
  let r = F(e.h), i = F(t.h);
  return Math.abs(i - r) > 180 ? r - (i - 360 * Math.sign(i - r)) : i - r;
}, Ge = (e, t) => {
  if (e.h === void 0 || t.h === void 0 || !e.c || !t.c)
    return 0;
  let r = F(e.h), i = F(t.h), a = Math.sin((i - r + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(e.c * t.c) * a;
}, W = (e) => {
  let t = e.reduce(
    (i, a) => {
      if (a !== void 0) {
        let o = a * Math.PI / 180;
        i.sin += Math.sin(o), i.cos += Math.cos(o);
      }
      return i;
    },
    { sin: 0, cos: 0 }
  ), r = Math.atan2(t.sin, t.cos) * 180 / Math.PI;
  return r < 0 ? 360 + r : r;
}, Jn = {
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
    rgb: Un
  },
  toMode: {
    rgb: Yn
  },
  interpolate: {
    h: {
      use: h,
      fixup: q
    },
    s: h,
    l: h,
    alpha: {
      use: h,
      fixup: A
    }
  },
  difference: {
    h: Ye
  },
  average: {
    h: W
  }
}, J = ({ l: e, a: t, b: r, alpha: i }, a = "lch") => {
  t === void 0 && (t = 0), r === void 0 && (r = 0);
  let o = Math.sqrt(t * t + r * r), s = { mode: a, l: e, c: o };
  return o && (s.h = F(Math.atan2(r, t) * 180 / Math.PI)), i !== void 0 && (s.alpha = i), s;
}, V = ({ l: e, c: t, h: r, alpha: i }, a = "lab") => {
  r === void 0 && (r = 0);
  let o = {
    mode: a,
    l: e,
    a: t ? t * Math.cos(r / 180 * Math.PI) : 0,
    b: t ? t * Math.sin(r / 180 * Math.PI) : 0
  };
  return i !== void 0 && (o.alpha = i), o;
}, Ir = Math.pow(29, 3) / Math.pow(3, 3), Fr = Math.pow(6, 3) / Math.pow(29, 3), R = {
  X: 0.3457 / 0.3585,
  Y: 1,
  Z: (1 - 0.3457 - 0.3585) / 0.3585
}, le = {
  X: 0.3127 / 0.329,
  Y: 1,
  Z: (1 - 0.3127 - 0.329) / 0.329
};
let dt = (e) => Math.pow(e, 3) > Fr ? Math.pow(e, 3) : (116 * e - 16) / Ir;
const Lr = ({ l: e, a: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = (e + 16) / 116, o = t / 500 + a, s = a - r / 200, l = {
    mode: "xyz65",
    x: dt(o) * le.X,
    y: dt(a) * le.Y,
    z: dt(s) * le.Z
  };
  return i !== void 0 && (l.alpha = i), l;
}, Je = (e) => te(Lr(e)), ct = (e) => e > Fr ? Math.cbrt(e) : (Ir * e + 16) / 116, Br = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = ct(e / le.X), o = ct(t / le.Y), s = ct(r / le.Z), l = {
    mode: "lab65",
    l: 116 * o - 16,
    a: 500 * (a - o),
    b: 200 * (o - s)
  };
  return i !== void 0 && (l.alpha = i), l;
}, Ve = (e) => {
  let t = Br(ee(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
}, De = 1, Dr = 1, Se = 26 / 180 * Math.PI, He = Math.cos(Se), Xe = Math.sin(Se), Hr = 100 / Math.log(139 / 100), At = ({ l: e, c: t, h: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = {
    mode: "lab65",
    l: (Math.exp(e * De / Hr) - 1) / 39e-4
  }, o = (Math.exp(0.0435 * t * Dr * De) - 1) / 0.075, s = o * Math.cos(r / 180 * Math.PI - Se), l = o * Math.sin(r / 180 * Math.PI - Se);
  return a.a = s * He - l / 0.83 * Xe, a.b = s * Xe + l / 0.83 * He, i !== void 0 && (a.alpha = i), a;
}, Ot = ({ l: e, a: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = t * He + r * Xe, o = 0.83 * (r * He - t * Xe), s = Math.sqrt(a * a + o * o), l = {
    mode: "dlch",
    l: Hr / De * Math.log(1 + 39e-4 * e),
    c: Math.log(1 + 0.075 * s) / (0.0435 * Dr * De)
  };
  return l.c && (l.h = F((Math.atan2(o, a) + Se) / Math.PI * 180)), i !== void 0 && (l.alpha = i), l;
}, ir = (e) => At(J(e, "dlch")), or = (e) => V(Ot(e), "dlab"), Vn = {
  mode: "dlab",
  parse: ["--din99o-lab"],
  serialize: "--din99o-lab",
  toMode: {
    lab65: ir,
    rgb: (e) => Je(ir(e))
  },
  fromMode: {
    lab65: or,
    rgb: (e) => or(Ve(e))
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344]
  },
  interpolate: {
    l: h,
    a: h,
    b: h,
    alpha: {
      use: h,
      fixup: A
    }
  }
}, Qn = {
  mode: "dlch",
  parse: ["--din99o-lch"],
  serialize: "--din99o-lch",
  toMode: {
    lab65: At,
    dlab: (e) => V(e, "dlab"),
    rgb: (e) => Je(At(e))
  },
  fromMode: {
    lab65: Ot,
    dlab: (e) => J(e, "dlch"),
    rgb: (e) => Ot(Ve(e))
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360]
  },
  interpolate: {
    l: h,
    c: h,
    h: {
      use: h,
      fixup: q
    },
    alpha: {
      use: h,
      fixup: A
    }
  },
  difference: {
    h: Ge
  },
  average: {
    h: W
  }
};
function Zn({ h: e, s: t, i: r, alpha: i }) {
  e = F(e !== void 0 ? e : 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.abs(e / 60 % 2 - 1), o;
  switch (Math.floor(e / 60)) {
    case 0:
      o = {
        r: r * (1 + t * (3 / (2 - a) - 1)),
        g: r * (1 + t * (3 * (1 - a) / (2 - a) - 1)),
        b: r * (1 - t)
      };
      break;
    case 1:
      o = {
        r: r * (1 + t * (3 * (1 - a) / (2 - a) - 1)),
        g: r * (1 + t * (3 / (2 - a) - 1)),
        b: r * (1 - t)
      };
      break;
    case 2:
      o = {
        r: r * (1 - t),
        g: r * (1 + t * (3 / (2 - a) - 1)),
        b: r * (1 + t * (3 * (1 - a) / (2 - a) - 1))
      };
      break;
    case 3:
      o = {
        r: r * (1 - t),
        g: r * (1 + t * (3 * (1 - a) / (2 - a) - 1)),
        b: r * (1 + t * (3 / (2 - a) - 1))
      };
      break;
    case 4:
      o = {
        r: r * (1 + t * (3 * (1 - a) / (2 - a) - 1)),
        g: r * (1 - t),
        b: r * (1 + t * (3 / (2 - a) - 1))
      };
      break;
    case 5:
      o = {
        r: r * (1 + t * (3 / (2 - a) - 1)),
        g: r * (1 - t),
        b: r * (1 + t * (3 * (1 - a) / (2 - a) - 1))
      };
      break;
    default:
      o = { r: r * (1 - t), g: r * (1 - t), b: r * (1 - t) };
  }
  return o.mode = "rgb", i !== void 0 && (o.alpha = i), o;
}
function Kn({ r: e, g: t, b: r, alpha: i }) {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.max(e, t, r), o = Math.min(e, t, r), s = {
    mode: "hsi",
    s: e + t + r === 0 ? 0 : 1 - 3 * o / (e + t + r),
    i: (e + t + r) / 3
  };
  return a - o !== 0 && (s.h = (a === e ? (t - r) / (a - o) + (t < r) * 6 : a === t ? (r - e) / (a - o) + 2 : (e - t) / (a - o) + 4) * 60), i !== void 0 && (s.alpha = i), s;
}
const ea = {
  mode: "hsi",
  toMode: {
    rgb: Zn
  },
  parse: ["--hsi"],
  serialize: "--hsi",
  fromMode: {
    rgb: Kn
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: h, fixup: q },
    s: h,
    i: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Ye
  },
  average: {
    h: W
  }
};
function ta({ h: e, s: t, l: r, alpha: i }) {
  e = F(e !== void 0 ? e : 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = r + t * (r < 0.5 ? r : 1 - r), o = a - (a - r) * 2 * Math.abs(e / 60 % 2 - 1), s;
  switch (Math.floor(e / 60)) {
    case 0:
      s = { r: a, g: o, b: 2 * r - a };
      break;
    case 1:
      s = { r: o, g: a, b: 2 * r - a };
      break;
    case 2:
      s = { r: 2 * r - a, g: a, b: o };
      break;
    case 3:
      s = { r: 2 * r - a, g: o, b: a };
      break;
    case 4:
      s = { r: o, g: 2 * r - a, b: a };
      break;
    case 5:
      s = { r: a, g: 2 * r - a, b: o };
      break;
    default:
      s = { r: 2 * r - a, g: 2 * r - a, b: 2 * r - a };
  }
  return s.mode = "rgb", i !== void 0 && (s.alpha = i), s;
}
function ra({ r: e, g: t, b: r, alpha: i }) {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.max(e, t, r), o = Math.min(e, t, r), s = {
    mode: "hsl",
    s: a === o ? 0 : (a - o) / (1 - Math.abs(a + o - 1)),
    l: 0.5 * (a + o)
  };
  return a - o !== 0 && (s.h = (a === e ? (t - r) / (a - o) + (t < r) * 6 : a === t ? (r - e) / (a - o) + 2 : (e - t) / (a - o) + 4) * 60), i !== void 0 && (s.alpha = i), s;
}
const na = (e, t) => {
  switch (t) {
    case "deg":
      return +e;
    case "rad":
      return e / Math.PI * 180;
    case "grad":
      return e / 10 * 9;
    case "turn":
      return e * 360;
  }
}, aa = new RegExp(
  `^hsla?\\(\\s*${Mn}${fe}${Me}${fe}${Me}\\s*(?:,\\s*${qt}\\s*)?\\)$`
), ia = (e) => {
  let t = e.match(aa);
  if (!t) return;
  let r = { mode: "hsl" };
  return t[3] !== void 0 ? r.h = +t[3] : t[1] !== void 0 && t[2] !== void 0 && (r.h = na(t[1], t[2])), t[4] !== void 0 && (r.s = Math.min(Math.max(0, t[4] / 100), 1)), t[5] !== void 0 && (r.l = Math.min(Math.max(0, t[5] / 100), 1)), t[6] !== void 0 ? r.alpha = Math.max(0, Math.min(1, t[6] / 100)) : t[7] !== void 0 && (r.alpha = Math.max(0, Math.min(1, +t[7]))), r;
};
function oa(e, t) {
  if (!t || t[0] !== "hsl" && t[0] !== "hsla")
    return;
  const r = { mode: "hsl" }, [, i, a, o, s] = t;
  if (i.type !== p.None) {
    if (i.type === p.Percentage)
      return;
    r.h = i.value;
  }
  if (a.type !== p.None) {
    if (a.type === p.Hue)
      return;
    r.s = a.value / 100;
  }
  if (o.type !== p.None) {
    if (o.type === p.Hue)
      return;
    r.l = o.value / 100;
  }
  return s.type !== p.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === p.Number ? s.value : s.value / 100
    )
  )), r;
}
const Xr = {
  mode: "hsl",
  toMode: {
    rgb: ta
  },
  fromMode: {
    rgb: ra
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [oa, ia],
  serialize: (e) => `hsl(${e.h !== void 0 ? e.h : "none"} ${e.s !== void 0 ? e.s * 100 + "%" : "none"} ${e.l !== void 0 ? e.l * 100 + "%" : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    h: { use: h, fixup: q },
    s: h,
    l: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Ye
  },
  average: {
    h: W
  }
};
function qr({ h: e, s: t, v: r, alpha: i }) {
  e = F(e !== void 0 ? e : 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.abs(e / 60 % 2 - 1), o;
  switch (Math.floor(e / 60)) {
    case 0:
      o = { r, g: r * (1 - t * a), b: r * (1 - t) };
      break;
    case 1:
      o = { r: r * (1 - t * a), g: r, b: r * (1 - t) };
      break;
    case 2:
      o = { r: r * (1 - t), g: r, b: r * (1 - t * a) };
      break;
    case 3:
      o = { r: r * (1 - t), g: r * (1 - t * a), b: r };
      break;
    case 4:
      o = { r: r * (1 - t * a), g: r * (1 - t), b: r };
      break;
    case 5:
      o = { r, g: r * (1 - t), b: r * (1 - t * a) };
      break;
    default:
      o = { r: r * (1 - t), g: r * (1 - t), b: r * (1 - t) };
  }
  return o.mode = "rgb", i !== void 0 && (o.alpha = i), o;
}
function Wr({ r: e, g: t, b: r, alpha: i }) {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.max(e, t, r), o = Math.min(e, t, r), s = {
    mode: "hsv",
    s: a === 0 ? 0 : 1 - o / a,
    v: a
  };
  return a - o !== 0 && (s.h = (a === e ? (t - r) / (a - o) + (t < r) * 6 : a === t ? (r - e) / (a - o) + 2 : (e - t) / (a - o) + 4) * 60), i !== void 0 && (s.alpha = i), s;
}
const Ur = {
  mode: "hsv",
  toMode: {
    rgb: qr
  },
  parse: ["--hsv"],
  serialize: "--hsv",
  fromMode: {
    rgb: Wr
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: h, fixup: q },
    s: h,
    v: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Ye
  },
  average: {
    h: W
  }
};
function sa({ h: e, w: t, b: r, alpha: i }) {
  if (t === void 0 && (t = 0), r === void 0 && (r = 0), t + r > 1) {
    let a = t + r;
    t /= a, r /= a;
  }
  return qr({
    h: e,
    s: r === 1 ? 1 : 1 - t / (1 - r),
    v: 1 - r,
    alpha: i
  });
}
function la(e) {
  let t = Wr(e);
  if (t === void 0) return;
  let r = t.s !== void 0 ? t.s : 0, i = t.v !== void 0 ? t.v : 0, a = {
    mode: "hwb",
    w: (1 - r) * i,
    b: 1 - i
  };
  return t.h !== void 0 && (a.h = t.h), t.alpha !== void 0 && (a.alpha = t.alpha), a;
}
function da(e, t) {
  if (!t || t[0] !== "hwb")
    return;
  const r = { mode: "hwb" }, [, i, a, o, s] = t;
  if (i.type !== p.None) {
    if (i.type === p.Percentage)
      return;
    r.h = i.value;
  }
  if (a.type !== p.None) {
    if (a.type === p.Hue)
      return;
    r.w = a.value / 100;
  }
  if (o.type !== p.None) {
    if (o.type === p.Hue)
      return;
    r.b = o.value / 100;
  }
  return s.type !== p.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === p.Number ? s.value : s.value / 100
    )
  )), r;
}
const ca = {
  mode: "hwb",
  toMode: {
    rgb: sa
  },
  fromMode: {
    rgb: la
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [da],
  serialize: (e) => `hwb(${e.h !== void 0 ? e.h : "none"} ${e.w !== void 0 ? e.w * 100 + "%" : "none"} ${e.b !== void 0 ? e.b * 100 + "%" : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    h: { use: h, fixup: q },
    w: h,
    b: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Gn
  },
  average: {
    h: W
  }
}, Yr = 203, Qe = 0.1593017578125, Gr = 78.84375, Ze = 0.8359375, Ke = 18.8515625, et = 18.6875;
function ft(e) {
  if (e < 0) return 0;
  const t = Math.pow(e, 1 / Gr);
  return 1e4 * Math.pow(Math.max(0, t - Ze) / (Ke - et * t), 1 / Qe);
}
function ut(e) {
  if (e < 0) return 0;
  const t = Math.pow(e / 1e4, Qe);
  return Math.pow((Ze + Ke * t) / (1 + et * t), Gr);
}
const xt = (e) => Math.max(e / Yr, 0), sr = ({ i: e, t, p: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  const a = ft(
    e + 0.008609037037932761 * t + 0.11102962500302593 * r
  ), o = ft(
    e - 0.00860903703793275 * t - 0.11102962500302599 * r
  ), s = ft(
    e + 0.5600313357106791 * t - 0.32062717498731885 * r
  ), l = {
    mode: "xyz65",
    x: xt(
      2.070152218389422 * a - 1.3263473389671556 * o + 0.2066510476294051 * s
    ),
    y: xt(
      0.3647385209748074 * a + 0.680566024947227 * o - 0.0453045459220346 * s
    ),
    z: xt(
      -0.049747207535812 * a - 0.0492609666966138 * o + 1.1880659249923042 * s
    )
  };
  return i !== void 0 && (l.alpha = i), l;
}, pt = (e = 0) => Math.max(e * Yr, 0), lr = ({ x: e, y: t, z: r, alpha: i }) => {
  const a = pt(e), o = pt(t), s = pt(r), l = ut(
    0.3592832590121217 * a + 0.6976051147779502 * o - 0.0358915932320289 * s
  ), d = ut(
    -0.1920808463704995 * a + 1.1004767970374323 * o + 0.0753748658519118 * s
  ), c = ut(
    0.0070797844607477 * a + 0.0748396662186366 * o + 0.8433265453898765 * s
  ), u = 0.5 * l + 0.5 * d, m = 1.61376953125 * l - 3.323486328125 * d + 1.709716796875 * c, b = 4.378173828125 * l - 4.24560546875 * d - 0.132568359375 * c, v = { mode: "itp", i: u, t: m, p: b };
  return i !== void 0 && (v.alpha = i), v;
}, fa = {
  mode: "itp",
  channels: ["i", "t", "p", "alpha"],
  parse: ["--ictcp"],
  serialize: "--ictcp",
  toMode: {
    xyz65: sr,
    rgb: (e) => te(sr(e))
  },
  fromMode: {
    xyz65: lr,
    rgb: (e) => lr(ee(e))
  },
  ranges: {
    i: [0, 0.581],
    t: [-0.369, 0.272],
    p: [-0.164, 0.331]
  },
  interpolate: {
    i: h,
    t: h,
    p: h,
    alpha: { use: h, fixup: A }
  }
}, ua = 134.03437499999998, xa = 16295499532821565e-27, ht = (e) => {
  if (e < 0) return 0;
  let t = Math.pow(e / 1e4, Qe);
  return Math.pow((Ze + Ke * t) / (1 + et * t), ua);
}, mt = (e = 0) => Math.max(e * 203, 0), Jr = ({ x: e, y: t, z: r, alpha: i }) => {
  e = mt(e), t = mt(t), r = mt(r);
  let a = 1.15 * e - 0.15 * r, o = 0.66 * t + 0.34 * e, s = ht(0.41478972 * a + 0.579999 * o + 0.014648 * r), l = ht(-0.20151 * a + 1.120649 * o + 0.0531008 * r), d = ht(-0.0166008 * a + 0.2648 * o + 0.6684799 * r), c = (s + l) / 2, u = {
    mode: "jab",
    j: 0.44 * c / (1 - 0.56 * c) - xa,
    a: 3.524 * s - 4.066708 * l + 0.542708 * d,
    b: 0.199076 * s + 1.096799 * l - 1.295875 * d
  };
  return i !== void 0 && (u.alpha = i), u;
}, pa = 134.03437499999998, dr = 16295499532821565e-27, bt = (e) => {
  if (e < 0) return 0;
  let t = Math.pow(e, 1 / pa);
  return 1e4 * Math.pow((Ze - t) / (et * t - Ke), 1 / Qe);
}, gt = (e) => e / 203, Vr = ({ j: e, a: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = (e + dr) / (0.44 + 0.56 * (e + dr)), o = bt(a + 0.13860504 * t + 0.058047316 * r), s = bt(a - 0.13860504 * t - 0.058047316 * r), l = bt(a - 0.096019242 * t - 0.8118919 * r), d = {
    mode: "xyz65",
    x: gt(
      1.661373024652174 * o - 0.914523081304348 * s + 0.23136208173913045 * l
    ),
    y: gt(
      -0.3250758611844533 * o + 1.571847026732543 * s - 0.21825383453227928 * l
    ),
    z: gt(-0.090982811 * o - 0.31272829 * s + 1.5227666 * l)
  };
  return i !== void 0 && (d.alpha = i), d;
}, Qr = (e) => {
  let t = Jr(ee(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
}, Zr = (e) => te(Vr(e)), ha = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parse: ["--jzazbz"],
  serialize: "--jzazbz",
  fromMode: {
    rgb: Qr,
    xyz65: Jr
  },
  toMode: {
    rgb: Zr,
    xyz65: Vr
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134]
  },
  interpolate: {
    j: h,
    a: h,
    b: h,
    alpha: { use: h, fixup: A }
  }
}, cr = ({ j: e, a: t, b: r, alpha: i }) => {
  t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.sqrt(t * t + r * r), o = {
    mode: "jch",
    j: e,
    c: a
  };
  return a && (o.h = F(Math.atan2(r, t) * 180 / Math.PI)), i !== void 0 && (o.alpha = i), o;
}, fr = ({ j: e, c: t, h: r, alpha: i }) => {
  r === void 0 && (r = 0);
  let a = {
    mode: "jab",
    j: e,
    a: t ? t * Math.cos(r / 180 * Math.PI) : 0,
    b: t ? t * Math.sin(r / 180 * Math.PI) : 0
  };
  return i !== void 0 && (a.alpha = i), a;
}, ma = {
  mode: "jch",
  parse: ["--jzczhz"],
  serialize: "--jzczhz",
  toMode: {
    jab: fr,
    rgb: (e) => Zr(fr(e))
  },
  fromMode: {
    rgb: (e) => cr(Qr(e)),
    jab: cr
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360]
  },
  interpolate: {
    h: { use: h, fixup: q },
    c: h,
    j: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Ge
  },
  average: {
    h: W
  }
}, tt = Math.pow(29, 3) / Math.pow(3, 3), Wt = Math.pow(6, 3) / Math.pow(29, 3);
let vt = (e) => Math.pow(e, 3) > Wt ? Math.pow(e, 3) : (116 * e - 16) / tt;
const Ut = ({ l: e, a: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = (e + 16) / 116, o = t / 500 + a, s = a - r / 200, l = {
    mode: "xyz50",
    x: vt(o) * R.X,
    y: vt(a) * R.Y,
    z: vt(s) * R.Z
  };
  return i !== void 0 && (l.alpha = i), l;
}, $e = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = he({
    r: e * 3.1341359569958707 - t * 1.6173863321612538 - 0.4906619460083532 * r,
    g: e * -0.978795502912089 + t * 1.916254567259524 + 0.03344273116131949 * r,
    b: e * 0.07195537988411677 - t * 0.2289768264158322 + 1.405386058324125 * r
  });
  return i !== void 0 && (a.alpha = i), a;
}, Kr = (e) => $e(Ut(e)), Ee = (e) => {
  let { r: t, g: r, b: i, alpha: a } = pe(e), o = {
    mode: "xyz50",
    x: 0.436065742824811 * t + 0.3851514688337912 * r + 0.14307845442264197 * i,
    y: 0.22249319175623702 * t + 0.7168870538238823 * r + 0.06061979053616537 * i,
    z: 0.013923904500943465 * t + 0.09708128566574634 * r + 0.7140993584005155 * i
  };
  return a !== void 0 && (o.alpha = a), o;
}, yt = (e) => e > Wt ? Math.cbrt(e) : (tt * e + 16) / 116, Yt = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = yt(e / R.X), o = yt(t / R.Y), s = yt(r / R.Z), l = {
    mode: "lab",
    l: 116 * o - 16,
    a: 500 * (a - o),
    b: 200 * (o - s)
  };
  return i !== void 0 && (l.alpha = i), l;
}, en = (e) => {
  let t = Yt(Ee(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
};
function ba(e, t) {
  if (!t || t[0] !== "lab")
    return;
  const r = { mode: "lab" }, [, i, a, o, s] = t;
  if (!(i.type === p.Hue || a.type === p.Hue || o.type === p.Hue))
    return i.type !== p.None && (r.l = Math.min(Math.max(0, i.value), 100)), a.type !== p.None && (r.a = a.type === p.Number ? a.value : a.value * 125 / 100), o.type !== p.None && (r.b = o.type === p.Number ? o.value : o.value * 125 / 100), s.type !== p.None && (r.alpha = Math.min(
      1,
      Math.max(
        0,
        s.type === p.Number ? s.value : s.value / 100
      )
    )), r;
}
const Gt = {
  mode: "lab",
  toMode: {
    xyz50: Ut,
    rgb: Kr
  },
  fromMode: {
    xyz50: Yt,
    rgb: en
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  },
  parse: [ba],
  serialize: (e) => `lab(${e.l !== void 0 ? e.l : "none"} ${e.a !== void 0 ? e.a : "none"} ${e.b !== void 0 ? e.b : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    l: h,
    a: h,
    b: h,
    alpha: { use: h, fixup: A }
  }
}, ga = {
  ...Gt,
  mode: "lab65",
  parse: ["--lab-d65"],
  serialize: "--lab-d65",
  toMode: {
    xyz65: Lr,
    rgb: Je
  },
  fromMode: {
    xyz65: Br,
    rgb: Ve
  },
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  }
};
function va(e, t) {
  if (!t || t[0] !== "lch")
    return;
  const r = { mode: "lch" }, [, i, a, o, s] = t;
  if (i.type !== p.None) {
    if (i.type === p.Hue)
      return;
    r.l = Math.min(Math.max(0, i.value), 100);
  }
  if (a.type !== p.None && (r.c = Math.max(
    0,
    a.type === p.Number ? a.value : a.value * 150 / 100
  )), o.type !== p.None) {
    if (o.type === p.Percentage)
      return;
    r.h = o.value;
  }
  return s.type !== p.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === p.Number ? s.value : s.value / 100
    )
  )), r;
}
const Jt = {
  mode: "lch",
  toMode: {
    lab: V,
    rgb: (e) => Kr(V(e))
  },
  fromMode: {
    rgb: (e) => J(en(e)),
    lab: J
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  },
  parse: [va],
  serialize: (e) => `lch(${e.l !== void 0 ? e.l : "none"} ${e.c !== void 0 ? e.c : "none"} ${e.h !== void 0 ? e.h : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    h: { use: h, fixup: q },
    c: h,
    l: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Ge
  },
  average: {
    h: W
  }
}, ya = {
  ...Jt,
  mode: "lch65",
  parse: ["--lch-d65"],
  serialize: "--lch-d65",
  toMode: {
    lab65: (e) => V(e, "lab65"),
    rgb: (e) => Je(V(e, "lab65"))
  },
  fromMode: {
    rgb: (e) => J(Ve(e), "lch65"),
    lab65: (e) => J(e, "lch65")
  },
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  }
}, tn = ({ l: e, u: t, v: r, alpha: i }) => {
  t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.sqrt(t * t + r * r), o = {
    mode: "lchuv",
    l: e,
    c: a
  };
  return a && (o.h = F(Math.atan2(r, t) * 180 / Math.PI)), i !== void 0 && (o.alpha = i), o;
}, rn = ({ l: e, c: t, h: r, alpha: i }) => {
  r === void 0 && (r = 0);
  let a = {
    mode: "luv",
    l: e,
    u: t ? t * Math.cos(r / 180 * Math.PI) : 0,
    v: t ? t * Math.sin(r / 180 * Math.PI) : 0
  };
  return i !== void 0 && (a.alpha = i), a;
}, nn = (e, t, r) => 4 * e / (e + 15 * t + 3 * r), an = (e, t, r) => 9 * t / (e + 15 * t + 3 * r), ja = nn(R.X, R.Y, R.Z), ka = an(R.X, R.Y, R.Z), wa = (e) => e <= Wt ? tt * e : 116 * Math.cbrt(e) - 16, It = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = wa(t / R.Y), o = nn(e, t, r), s = an(e, t, r);
  !isFinite(o) || !isFinite(s) ? a = o = s = 0 : (o = 13 * a * (o - ja), s = 13 * a * (s - ka));
  let l = {
    mode: "luv",
    l: a,
    u: o,
    v: s
  };
  return i !== void 0 && (l.alpha = i), l;
}, Na = (e, t, r) => 4 * e / (e + 15 * t + 3 * r), Ma = (e, t, r) => 9 * t / (e + 15 * t + 3 * r), Ca = Na(R.X, R.Y, R.Z), _a = Ma(R.X, R.Y, R.Z), Ft = ({ l: e, u: t, v: r, alpha: i }) => {
  if (e === void 0 && (e = 0), e === 0)
    return { mode: "xyz50", x: 0, y: 0, z: 0 };
  t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = t / (13 * e) + Ca, o = r / (13 * e) + _a, s = R.Y * (e <= 8 ? e / tt : Math.pow((e + 16) / 116, 3)), l = s * (9 * a) / (4 * o), d = s * (12 - 3 * a - 20 * o) / (4 * o), c = { mode: "xyz50", x: l, y: s, z: d };
  return i !== void 0 && (c.alpha = i), c;
}, Sa = (e) => tn(It(Ee(e))), Ta = (e) => $e(Ft(rn(e))), $a = {
  mode: "lchuv",
  toMode: {
    luv: rn,
    rgb: Ta
  },
  fromMode: {
    rgb: Sa,
    luv: tn
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
    h: { use: h, fixup: q },
    c: h,
    l: h,
    alpha: { use: h, fixup: A }
  },
  difference: {
    h: Ge
  },
  average: {
    h: W
  }
}, Ea = {
  ...xe,
  mode: "lrgb",
  toMode: {
    rgb: he
  },
  fromMode: {
    rgb: pe
  },
  parse: ["srgb-linear"],
  serialize: "srgb-linear"
}, Pa = {
  mode: "luv",
  toMode: {
    xyz50: Ft,
    rgb: (e) => $e(Ft(e))
  },
  fromMode: {
    xyz50: It,
    rgb: (e) => It(Ee(e))
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
    l: h,
    u: h,
    v: h,
    alpha: { use: h, fixup: A }
  }
}, on = ({ r: e, g: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.cbrt(
    0.412221469470763 * e + 0.5363325372617348 * t + 0.0514459932675022 * r
  ), o = Math.cbrt(
    0.2119034958178252 * e + 0.6806995506452344 * t + 0.1073969535369406 * r
  ), s = Math.cbrt(
    0.0883024591900564 * e + 0.2817188391361215 * t + 0.6299787016738222 * r
  ), l = {
    mode: "oklab",
    l: 0.210454268309314 * a + 0.7936177747023054 * o - 0.0040720430116193 * s,
    a: 1.9779985324311684 * a - 2.42859224204858 * o + 0.450593709617411 * s,
    b: 0.0259040424655478 * a + 0.7827717124575296 * o - 0.8086757549230774 * s
  };
  return i !== void 0 && (l.alpha = i), l;
}, rt = (e) => {
  let t = on(pe(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
}, Pe = ({ l: e, a: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = Math.pow(e + 0.3963377773761749 * t + 0.2158037573099136 * r, 3), o = Math.pow(e - 0.1055613458156586 * t - 0.0638541728258133 * r, 3), s = Math.pow(e - 0.0894841775298119 * t - 1.2914855480194092 * r, 3), l = {
    mode: "lrgb",
    r: 4.076741636075957 * a - 3.3077115392580616 * o + 0.2309699031821044 * s,
    g: -1.2684379732850317 * a + 2.6097573492876887 * o - 0.3413193760026573 * s,
    b: -0.0041960761386756 * a - 0.7034186179359362 * o + 1.7076146940746117 * s
  };
  return i !== void 0 && (l.alpha = i), l;
}, nt = (e) => he(Pe(e));
function Lt(e) {
  const i = 1.170873786407767;
  return 0.5 * (i * e - 0.206 + Math.sqrt((i * e - 0.206) * (i * e - 0.206) + 4 * 0.03 * i * e));
}
function qe(e) {
  return (e * e + 0.206 * e) / (1.170873786407767 * (e + 0.03));
}
function za(e, t) {
  let r, i, a, o, s, l, d, c;
  -1.88170328 * e - 0.80936493 * t > 1 ? (r = 1.19086277, i = 1.76576728, a = 0.59662641, o = 0.75515197, s = 0.56771245, l = 4.0767416621, d = -3.3077115913, c = 0.2309699292) : 1.81444104 * e - 1.19445276 * t > 1 ? (r = 0.73956515, i = -0.45954404, a = 0.08285427, o = 0.1254107, s = 0.14503204, l = -1.2684380046, d = 2.6097574011, c = -0.3413193965) : (r = 1.35733652, i = -915799e-8, a = -1.1513021, o = -0.50559606, s = 692167e-8, l = -0.0041960863, d = -0.7034186147, c = 1.707614701);
  let u = r + i * e + a * t + o * e * e + s * e * t, m = 0.3963377774 * e + 0.2158037573 * t, b = -0.1055613458 * e - 0.0638541728 * t, v = -0.0894841775 * e - 1.291485548 * t;
  {
    let k = 1 + u * m, C = 1 + u * b, M = 1 + u * v, E = k * k * k, w = C * C * C, _ = M * M * M, I = 3 * m * k * k, f = 3 * b * C * C, S = 3 * v * M * M, Q = 6 * m * m * k, Z = 6 * b * b * C, B = 6 * v * v * M, U = l * E + d * w + c * _, D = l * I + d * f + c * S, H = l * Q + d * Z + c * B;
    u = u - U * D / (D * D - 0.5 * U * H);
  }
  return u;
}
function Vt(e, t) {
  let r = za(e, t), i = Pe({ l: 1, a: r * e, b: r * t }), a = Math.cbrt(1 / Math.max(i.r, i.g, i.b)), o = a * r;
  return [a, o];
}
function Ra(e, t, r, i, a, o = null) {
  o || (o = Vt(e, t));
  let s;
  if ((r - a) * o[1] - (o[0] - a) * i <= 0)
    s = o[1] * a / (i * o[0] + o[1] * (a - r));
  else {
    s = o[1] * (a - 1) / (i * (o[0] - 1) + o[1] * (a - r));
    {
      let l = r - a, d = i, c = 0.3963377774 * e + 0.2158037573 * t, u = -0.1055613458 * e - 0.0638541728 * t, m = -0.0894841775 * e - 1.291485548 * t, b = l + d * c, v = l + d * u, k = l + d * m;
      {
        let C = a * (1 - s) + s * r, M = s * i, E = C + M * c, w = C + M * u, _ = C + M * m, I = E * E * E, f = w * w * w, S = _ * _ * _, Q = 3 * b * E * E, Z = 3 * v * w * w, B = 3 * k * _ * _, U = 6 * b * b * E, D = 6 * v * v * w, H = 6 * k * k * _, me = 4.0767416621 * I - 3.3077115913 * f + 0.2309699292 * S - 1, be = 4.0767416621 * Q - 3.3077115913 * Z + 0.2309699292 * B, ge = 4.0767416621 * U - 3.3077115913 * D + 0.2309699292 * H, ve = be / (be * be - 0.5 * me * ge), re = -me * ve, ye = -1.2684380046 * I + 2.6097574011 * f - 0.3413193965 * S - 1, ne = -1.2684380046 * Q + 2.6097574011 * Z - 0.3413193965 * B, ze = -1.2684380046 * U + 2.6097574011 * D - 0.3413193965 * H, x = ne / (ne * ne - 0.5 * ye * ze), y = -ye * x, $ = -0.0041960863 * I - 0.7034186147 * f + 1.707614701 * S - 1, P = -0.0041960863 * Q - 0.7034186147 * Z + 1.707614701 * B, ae = -0.0041960863 * U - 0.7034186147 * D + 1.707614701 * H, ie = P / (P * P - 0.5 * $ * ae), z = -$ * ie;
        re = ve >= 0 ? re : 1e6, y = x >= 0 ? y : 1e6, z = ie >= 0 ? z : 1e6, s += Math.min(re, Math.min(y, z));
      }
    }
  }
  return s;
}
function Qt(e, t, r = null) {
  r || (r = Vt(e, t));
  let i = r[0], a = r[1];
  return [a / i, a / (1 - i)];
}
function sn(e, t, r) {
  let i = Vt(t, r), a = Ra(t, r, e, 1, e, i), o = Qt(t, r, i), s = 0.11516993 + 1 / (7.4477897 + 4.1590124 * r + t * (-2.19557347 + 1.75198401 * r + t * (-2.13704948 - 10.02301043 * r + t * (-4.24894561 + 5.38770819 * r + 4.69891013 * t)))), l = 0.11239642 + 1 / (1.6132032 - 0.68124379 * r + t * (0.40370612 + 0.90148123 * r + t * (-0.27087943 + 0.6122399 * r + t * (299215e-8 - 0.45399568 * r - 0.14661872 * t)))), d = a / Math.min(e * o[0], (1 - e) * o[1]), c = e * s, u = (1 - e) * l, m = 0.9 * d * Math.sqrt(
    Math.sqrt(
      1 / (1 / (c * c * c * c) + 1 / (u * u * u * u))
    )
  );
  return c = e * 0.4, u = (1 - e) * 0.8, [Math.sqrt(1 / (1 / (c * c) + 1 / (u * u))), m, a];
}
function ur(e) {
  const t = e.l !== void 0 ? e.l : 0, r = e.a !== void 0 ? e.a : 0, i = e.b !== void 0 ? e.b : 0, a = { mode: "okhsl", l: Lt(t) };
  e.alpha !== void 0 && (a.alpha = e.alpha);
  let o = Math.sqrt(r * r + i * i);
  if (!o)
    return a.s = 0, a;
  let [s, l, d] = sn(t, r / o, i / o), c;
  if (o < l) {
    let u = 0, m = 0.8 * s, b = 1 - m / l;
    c = (o - u) / (m + b * (o - u)) * 0.8;
  } else {
    let u = l, m = 0.2 * l * l * 1.25 * 1.25 / s, b = 1 - m / (d - l);
    c = 0.8 + 0.2 * ((o - u) / (m + b * (o - u)));
  }
  return c && (a.s = c, a.h = F(Math.atan2(i, r) * 180 / Math.PI)), a;
}
function xr(e) {
  let t = e.h !== void 0 ? e.h : 0, r = e.s !== void 0 ? e.s : 0, i = e.l !== void 0 ? e.l : 0;
  const a = { mode: "oklab", l: qe(i) };
  if (e.alpha !== void 0 && (a.alpha = e.alpha), !r || i === 1)
    return a.a = a.b = 0, a;
  let o = Math.cos(t / 180 * Math.PI), s = Math.sin(t / 180 * Math.PI), [l, d, c] = sn(a.l, o, s), u, m, b, v;
  r < 0.8 ? (u = 1.25 * r, m = 0, b = 0.8 * l, v = 1 - b / d) : (u = 5 * (r - 0.8), m = d, b = 0.2 * d * d * 1.25 * 1.25 / l, v = 1 - b / (c - d));
  let k = m + u * b / (1 - v * u);
  return a.a = k * o, a.b = k * s, a;
}
const Aa = {
  ...Xr,
  mode: "okhsl",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--okhsl"],
  serialize: "--okhsl",
  fromMode: {
    oklab: ur,
    rgb: (e) => ur(rt(e))
  },
  toMode: {
    oklab: xr,
    rgb: (e) => nt(xr(e))
  }
};
function pr(e) {
  let t = e.l !== void 0 ? e.l : 0, r = e.a !== void 0 ? e.a : 0, i = e.b !== void 0 ? e.b : 0, a = Math.sqrt(r * r + i * i), o = a ? r / a : 1, s = a ? i / a : 1, [l, d] = Qt(o, s), c = 0.5, u = 1 - c / l, m = d / (a + t * d), b = m * t, v = m * a, k = qe(b), C = v * k / b, M = Pe({ l: k, a: o * C, b: s * C }), E = Math.cbrt(
    1 / Math.max(M.r, M.g, M.b, 0)
  );
  t = t / E, a = a / E * Lt(t) / t, t = Lt(t);
  const w = {
    mode: "okhsv",
    s: a ? (c + d) * v / (d * c + d * u * v) : 0,
    v: t ? t / b : 0
  };
  return w.s && (w.h = F(Math.atan2(i, r) * 180 / Math.PI)), e.alpha !== void 0 && (w.alpha = e.alpha), w;
}
function hr(e) {
  const t = { mode: "oklab" };
  e.alpha !== void 0 && (t.alpha = e.alpha);
  const r = e.h !== void 0 ? e.h : 0, i = e.s !== void 0 ? e.s : 0, a = e.v !== void 0 ? e.v : 0, o = Math.cos(r / 180 * Math.PI), s = Math.sin(r / 180 * Math.PI), [l, d] = Qt(o, s), c = 0.5, u = 1 - c / l, m = 1 - i * c / (c + d - d * u * i), b = i * d * c / (c + d - d * u * i), v = qe(m), k = b * v / m, C = Pe({
    l: v,
    a: o * k,
    b: s * k
  }), M = Math.cbrt(
    1 / Math.max(C.r, C.g, C.b, 0)
  ), E = qe(a * m), w = b * E / m;
  return t.l = E * M, t.a = w * o * M, t.b = w * s * M, t;
}
const Oa = {
  ...Ur,
  mode: "okhsv",
  channels: ["h", "s", "v", "alpha"],
  parse: ["--okhsv"],
  serialize: "--okhsv",
  fromMode: {
    oklab: pr,
    rgb: (e) => pr(rt(e))
  },
  toMode: {
    oklab: hr,
    rgb: (e) => nt(hr(e))
  }
};
function Ia(e, t) {
  if (!t || t[0] !== "oklab")
    return;
  const r = { mode: "oklab" }, [, i, a, o, s] = t;
  if (!(i.type === p.Hue || a.type === p.Hue || o.type === p.Hue))
    return i.type !== p.None && (r.l = Math.min(
      Math.max(0, i.type === p.Number ? i.value : i.value / 100),
      1
    )), a.type !== p.None && (r.a = a.type === p.Number ? a.value : a.value * 0.4 / 100), o.type !== p.None && (r.b = o.type === p.Number ? o.value : o.value * 0.4 / 100), s.type !== p.None && (r.alpha = Math.min(
      1,
      Math.max(
        0,
        s.type === p.Number ? s.value : s.value / 100
      )
    )), r;
}
const Fa = {
  ...Gt,
  mode: "oklab",
  toMode: {
    lrgb: Pe,
    rgb: nt
  },
  fromMode: {
    lrgb: on,
    rgb: rt
  },
  ranges: {
    l: [0, 1],
    a: [-0.4, 0.4],
    b: [-0.4, 0.4]
  },
  parse: [Ia],
  serialize: (e) => `oklab(${e.l !== void 0 ? e.l : "none"} ${e.a !== void 0 ? e.a : "none"} ${e.b !== void 0 ? e.b : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`
};
function La(e, t) {
  if (!t || t[0] !== "oklch")
    return;
  const r = { mode: "oklch" }, [, i, a, o, s] = t;
  if (i.type !== p.None) {
    if (i.type === p.Hue)
      return;
    r.l = Math.min(
      Math.max(0, i.type === p.Number ? i.value : i.value / 100),
      1
    );
  }
  if (a.type !== p.None && (r.c = Math.max(
    0,
    a.type === p.Number ? a.value : a.value * 0.4 / 100
  )), o.type !== p.None) {
    if (o.type === p.Percentage)
      return;
    r.h = o.value;
  }
  return s.type !== p.None && (r.alpha = Math.min(
    1,
    Math.max(
      0,
      s.type === p.Number ? s.value : s.value / 100
    )
  )), r;
}
const Ba = {
  ...Jt,
  mode: "oklch",
  toMode: {
    oklab: (e) => V(e, "oklab"),
    rgb: (e) => nt(V(e, "oklab"))
  },
  fromMode: {
    rgb: (e) => J(rt(e), "oklch"),
    oklab: (e) => J(e, "oklch")
  },
  parse: [La],
  serialize: (e) => `oklch(${e.l !== void 0 ? e.l : "none"} ${e.c !== void 0 ? e.c : "none"} ${e.h !== void 0 ? e.h : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  ranges: {
    l: [0, 1],
    c: [0, 0.4],
    h: [0, 360]
  }
}, mr = (e) => {
  let { r: t, g: r, b: i, alpha: a } = pe(e), o = {
    mode: "xyz65",
    x: 0.486570948648216 * t + 0.265667693169093 * r + 0.1982172852343625 * i,
    y: 0.2289745640697487 * t + 0.6917385218365062 * r + 0.079286914093745 * i,
    z: 0 * t + 0.0451133818589026 * r + 1.043944368900976 * i
  };
  return a !== void 0 && (o.alpha = a), o;
}, br = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = he(
    {
      r: e * 2.4934969119414263 - t * 0.9313836179191242 - 0.402710784450717 * r,
      g: e * -0.8294889695615749 + t * 1.7626640603183465 + 0.0236246858419436 * r,
      b: e * 0.0358458302437845 - t * 0.0761723892680418 + 0.9568845240076871 * r
    },
    "p3"
  );
  return i !== void 0 && (a.alpha = i), a;
}, Da = {
  ...xe,
  mode: "p3",
  parse: ["display-p3"],
  serialize: "display-p3",
  fromMode: {
    rgb: (e) => br(ee(e)),
    xyz65: br
  },
  toMode: {
    rgb: (e) => te(mr(e)),
    xyz65: mr
  }
}, jt = (e) => {
  let t = Math.abs(e);
  return t >= 1 / 512 ? Math.sign(e) * Math.pow(t, 1 / 1.8) : 16 * e;
}, gr = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = {
    mode: "prophoto",
    r: jt(
      e * 1.3457868816471585 - t * 0.2555720873797946 - 0.0511018649755453 * r
    ),
    g: jt(
      e * -0.5446307051249019 + t * 1.5082477428451466 + 0.0205274474364214 * r
    ),
    b: jt(e * 0 + t * 0 + 1.2119675456389452 * r)
  };
  return i !== void 0 && (a.alpha = i), a;
}, kt = (e = 0) => {
  let t = Math.abs(e);
  return t >= 16 / 512 ? Math.sign(e) * Math.pow(t, 1.8) : e / 16;
}, vr = (e) => {
  let t = kt(e.r), r = kt(e.g), i = kt(e.b), a = {
    mode: "xyz50",
    x: 0.7977666449006423 * t + 0.1351812974005331 * r + 0.0313477341283922 * i,
    y: 0.2880748288194013 * t + 0.7118352342418731 * r + 899369387256e-16 * i,
    z: 0 * t + 0 * r + 0.8251046025104602 * i
  };
  return e.alpha !== void 0 && (a.alpha = e.alpha), a;
}, Ha = {
  ...xe,
  mode: "prophoto",
  parse: ["prophoto-rgb"],
  serialize: "prophoto-rgb",
  fromMode: {
    xyz50: gr,
    rgb: (e) => gr(Ee(e))
  },
  toMode: {
    xyz50: vr,
    rgb: (e) => $e(vr(e))
  }
}, yr = 1.09929682680944, Xa = 0.018053968510807, wt = (e) => {
  const t = Math.abs(e);
  return t > Xa ? (Math.sign(e) || 1) * (yr * Math.pow(t, 0.45) - (yr - 1)) : 4.5 * e;
}, jr = ({ x: e, y: t, z: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  let a = {
    mode: "rec2020",
    r: wt(
      e * 1.7166511879712683 - t * 0.3556707837763925 - 0.2533662813736599 * r
    ),
    g: wt(
      e * -0.6666843518324893 + t * 1.6164812366349395 + 0.0157685458139111 * r
    ),
    b: wt(
      e * 0.0176398574453108 - t * 0.0427706132578085 + 0.9421031212354739 * r
    )
  };
  return i !== void 0 && (a.alpha = i), a;
}, kr = 1.09929682680944, qa = 0.018053968510807, Nt = (e = 0) => {
  let t = Math.abs(e);
  return t < qa * 4.5 ? e / 4.5 : (Math.sign(e) || 1) * Math.pow((t + kr - 1) / kr, 1 / 0.45);
}, wr = (e) => {
  let t = Nt(e.r), r = Nt(e.g), i = Nt(e.b), a = {
    mode: "xyz65",
    x: 0.6369580483012911 * t + 0.1446169035862083 * r + 0.1688809751641721 * i,
    y: 0.262700212011267 * t + 0.6779980715188708 * r + 0.059301716469862 * i,
    z: 0 * t + 0.0280726930490874 * r + 1.0609850577107909 * i
  };
  return e.alpha !== void 0 && (a.alpha = e.alpha), a;
}, Wa = {
  ...xe,
  mode: "rec2020",
  fromMode: {
    xyz65: jr,
    rgb: (e) => jr(ee(e))
  },
  toMode: {
    xyz65: wr,
    rgb: (e) => te(wr(e))
  },
  parse: ["rec2020"],
  serialize: "rec2020"
}, K = 0.0037930732552754493, ln = Math.cbrt(K), Mt = (e) => Math.cbrt(e) - ln, Ua = (e) => {
  const { r: t, g: r, b: i, alpha: a } = pe(e), o = Mt(0.3 * t + 0.622 * r + 0.078 * i + K), s = Mt(0.23 * t + 0.692 * r + 0.078 * i + K), l = Mt(
    0.2434226892454782 * t + 0.2047674442449682 * r + 0.5518098665095535 * i + K
  ), d = {
    mode: "xyb",
    x: (o - s) / 2,
    y: (o + s) / 2,
    /* Apply default chroma from luma (subtract Y from B) */
    b: l - (o + s) / 2
  };
  return a !== void 0 && (d.alpha = a), d;
}, Ct = (e) => Math.pow(e + ln, 3), Ya = ({ x: e, y: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  const a = Ct(e + t) - K, o = Ct(t - e) - K, s = Ct(r + t) - K, l = he({
    r: 11.031566904639861 * a - 9.866943908131562 * o - 0.16462299650829934 * s,
    g: -3.2541473810744237 * a + 4.418770377582723 * o - 0.16462299650829934 * s,
    b: -3.6588512867136815 * a + 2.7129230459360922 * o + 1.9459282407775895 * s
  });
  return i !== void 0 && (l.alpha = i), l;
}, Ga = {
  mode: "xyb",
  channels: ["x", "y", "b", "alpha"],
  parse: ["--xyb"],
  serialize: "--xyb",
  toMode: {
    rgb: Ya
  },
  fromMode: {
    rgb: Ua
  },
  ranges: {
    x: [-0.0154, 0.0281],
    y: [0, 0.8453],
    b: [-0.2778, 0.388]
  },
  interpolate: {
    x: h,
    y: h,
    b: h,
    alpha: { use: h, fixup: A }
  }
}, Ja = {
  mode: "xyz50",
  parse: ["xyz-d50"],
  serialize: "xyz-d50",
  toMode: {
    rgb: $e,
    lab: Yt
  },
  fromMode: {
    rgb: Ee,
    lab: Ut
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825]
  },
  interpolate: {
    x: h,
    y: h,
    z: h,
    alpha: { use: h, fixup: A }
  }
}, Va = (e) => {
  let { x: t, y: r, z: i, alpha: a } = e;
  t === void 0 && (t = 0), r === void 0 && (r = 0), i === void 0 && (i = 0);
  let o = {
    mode: "xyz50",
    x: 1.0479298208405488 * t + 0.0229467933410191 * r - 0.0501922295431356 * i,
    y: 0.0296278156881593 * t + 0.990434484573249 * r - 0.0170738250293851 * i,
    z: -0.0092430581525912 * t + 0.0150551448965779 * r + 0.7518742899580008 * i
  };
  return a !== void 0 && (o.alpha = a), o;
}, Qa = (e) => {
  let { x: t, y: r, z: i, alpha: a } = e;
  t === void 0 && (t = 0), r === void 0 && (r = 0), i === void 0 && (i = 0);
  let o = {
    mode: "xyz65",
    x: 0.9554734527042182 * t - 0.0230985368742614 * r + 0.0632593086610217 * i,
    y: -0.0283697069632081 * t + 1.0099954580058226 * r + 0.021041398966943 * i,
    z: 0.0123140016883199 * t - 0.0205076964334779 * r + 1.3303659366080753 * i
  };
  return a !== void 0 && (o.alpha = a), o;
}, Za = {
  mode: "xyz65",
  toMode: {
    rgb: te,
    xyz50: Va
  },
  fromMode: {
    rgb: ee,
    xyz50: Qa
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
    x: h,
    y: h,
    z: h,
    alpha: { use: h, fixup: A }
  }
}, Ka = ({ r: e, g: t, b: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  const a = {
    mode: "yiq",
    y: 0.29889531 * e + 0.58662247 * t + 0.11448223 * r,
    i: 0.59597799 * e - 0.2741761 * t - 0.32180189 * r,
    q: 0.21147017 * e - 0.52261711 * t + 0.31114694 * r
  };
  return i !== void 0 && (a.alpha = i), a;
}, ei = ({ y: e, i: t, q: r, alpha: i }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), r === void 0 && (r = 0);
  const a = {
    mode: "rgb",
    r: e + 0.95608445 * t + 0.6208885 * r,
    g: e - 0.27137664 * t - 0.6486059 * r,
    b: e - 1.10561724 * t + 1.70250126 * r
  };
  return i !== void 0 && (a.alpha = i), a;
}, ti = {
  mode: "yiq",
  toMode: {
    rgb: ei
  },
  fromMode: {
    rgb: Ka
  },
  channels: ["y", "i", "q", "alpha"],
  parse: ["--yiq"],
  serialize: "--yiq",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522]
  },
  interpolate: {
    y: h,
    i: h,
    q: h,
    alpha: { use: h, fixup: A }
  }
}, ri = (e) => Math.max(0, Math.min(1, e || 0)), _t = (e) => Math.round(ri(e) * 255), ni = Er("rgb"), ai = (e) => {
  if (e === void 0)
    return;
  let t = _t(e.r), r = _t(e.g), i = _t(e.b);
  return "#" + (1 << 24 | t << 16 | r << 8 | i).toString(16).slice(1);
}, Oe = (e) => {
  const t = $r(e);
  if (!t)
    return;
  const r = Rr(t.mode);
  if (!r.serialize || typeof r.serialize == "string") {
    let i = `color(${r.serialize || `--${t.mode}`} `;
    return r.channels.forEach((a, o) => {
      a !== "alpha" && (i += (o ? " " : "") + (t[a] !== void 0 ? t[a] : "none"));
    }), t.alpha !== void 0 && t.alpha < 1 && (i += ` / ${t.alpha}`), i + ")";
  }
  if (typeof r.serialize == "function")
    return r.serialize(t);
}, ii = (e) => ai(ni(e));
N(Hn);
N(Jn);
N(Vn);
N(Qn);
N(ea);
N(Xr);
N(Ur);
N(ca);
N(fa);
N(ha);
N(ma);
N(Gt);
N(ga);
N(Jt);
N(ya);
N($a);
N(Ea);
N(Pa);
N(Aa);
N(Oa);
N(Fa);
const oi = N(Ba);
N(Da);
N(Ha);
N(Wa);
N(xe);
N(Ga);
N(Ja);
N(Za);
N(ti);
function si(e) {
  var s, l, d, c, u, m, b, v, k, C, M, E, w, _, I;
  const t = {}, r = e.mode, i = li(yn[r], (s = e.overrides) == null ? void 0 : s.surface);
  t["--surface"] = i.surface, t["--surface-2"] = i.surface2, t["--surface-3"] = i.surface3, t["--surface-hover"] = i.surfaceHover, t["--on-surface"] = i.onSurface, t["--on-surface-dim"] = i.onSurfaceDim, t["--on-surface-faint"] = i.onSurfaceFaint, t["--border-token"] = i.border, t["--border-strong-token"] = i.borderStrong;
  const a = St(e.brand.primary) ?? St("oklch(0.86 0.18 200)");
  if (t["--color-primary"] = Oe(a) ?? e.brand.primary, t["--color-primary-hover"] = Oe(Nr(a, r === "dark" ? 0.04 : -0.06)), t["--color-primary-soft"] = Tt(a, 0.18), t["--color-primary-faint"] = Tt(a, 0.08), t["--on-primary"] = (a.l ?? 0.5) > 0.62 ? "#0A0B10" : "#FFFFFF", e.brand.secondary) {
    const f = St(e.brand.secondary);
    f && (t["--color-secondary"] = Oe(f), t["--color-secondary-hover"] = Oe(Nr(f, r === "dark" ? 0.04 : -0.06)), t["--color-secondary-soft"] = Tt(f, 0.18), t["--on-secondary"] = (f.l ?? 0.5) > 0.62 ? "#0A0B10" : "#FFFFFF");
  }
  t["--halo-amber"] = "radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)", t["--halo-magenta"] = "radial-gradient(circle, var(--accent-magenta) 0%, transparent 70%)", t["--halo-primary"] = `radial-gradient(circle, ${t["--color-primary"]} 0%, transparent 70%)`, t["--radius-card"] = ((d = (l = e.overrides) == null ? void 0 : l.radius) == null ? void 0 : d.card) ?? "14px", t["--radius-button"] = ((u = (c = e.overrides) == null ? void 0 : c.radius) == null ? void 0 : u.button) ?? "8px", t["--radius-tag"] = ((b = (m = e.overrides) == null ? void 0 : m.radius) == null ? void 0 : b.tag) ?? "4px", t["--radius-modal"] = ((k = (v = e.overrides) == null ? void 0 : v.radius) == null ? void 0 : k.modal) ?? "16px", (M = (C = e.overrides) == null ? void 0 : C.fonts) != null && M.display && (t["--font-display"] = e.overrides.fonts.display), (w = (E = e.overrides) == null ? void 0 : E.fonts) != null && w.ui && (t["--font-ui"] = e.overrides.fonts.ui), (I = (_ = e.overrides) == null ? void 0 : _.fonts) != null && I.mono && (t["--font-mono"] = e.overrides.fonts.mono), t["--tone-accent"] = "var(--accent-cyan)", t["--tone-lime"] = "var(--accent-lime)", t["--tone-magenta"] = "var(--accent-magenta)", t["--tone-amber"] = "var(--accent-amber)", t["--mission-card-bg"] = "var(--panel)", t["--mission-card-border"] = "var(--border)", t["--mission-card-icon-bg"] = "var(--panel-2)", t["--mission-card-icon-border"] = "var(--border)", t["--mission-card-title"] = "var(--ink)", t["--mission-card-body"] = "var(--ink-dim)", t["--mission-card-cta-fg"] = "#05060A", t["--mission-card-halo-opacity"] = "0.25", t["--mission-modal-backdrop"] = "color-mix(in oklch, #000 60%, transparent)", t["--mission-modal-bg"] = "var(--panel)", t["--mission-modal-border"] = "var(--border)", t["--mission-modal-header-border"] = "var(--border)", t["--mission-modal-title"] = "var(--ink)", t["--mission-modal-body"] = "var(--ink-dim)", t["--mission-modal-close-bg"] = "var(--panel-2)", t["--mission-modal-close-border"] = "var(--border)", t["--mission-modal-close-icon"] = "var(--ink)", t["--reward-card-bg"] = "var(--panel)", t["--reward-card-border"] = "var(--border)", t["--reward-card-image-bg"] = "var(--panel-2)", t["--reward-card-image-border"] = "var(--border)", t["--reward-card-title"] = "var(--ink)", t["--reward-card-body"] = "var(--ink-dim)", t["--profile-card-bg"] = "var(--panel)", t["--profile-card-border"] = "var(--border)", t["--profile-card-title"] = "var(--ink)", t["--profile-card-body"] = "var(--ink-dim)", t["--profile-card-stat-bg"] = "var(--panel-2)", t["--profile-card-stat-border"] = "var(--border)", t["--profile-card-wallet"] = "var(--ink-faint)", t["--leaderboard-row-bg"] = "transparent", t["--leaderboard-row-border"] = "var(--border)", t["--leaderboard-head-bg"] = "transparent", t["--leaderboard-head-text"] = "var(--ink-dim)", t["--leaderboard-mine-bg"] = "var(--color-primary-soft)", t["--leaderboard-top-rank"] = "var(--color-primary)", t["--onboarding-card-bg"] = "var(--panel)", t["--onboarding-card-border"] = "var(--border)", t["--onboarding-card-title"] = "var(--ink)", t["--onboarding-card-body"] = "var(--ink-dim)", t["--onboarding-card-hero-bg"] = "var(--bg-2)", t["--onboarding-card-form-bg"] = "transparent", t["--onboarding-card-stat-bg"] = "var(--panel-2)", t["--onboarding-card-stat-border"] = "var(--border)", t["--onboarding-card-brand-emphasis"] = "var(--color-primary)", t["--onboarding-card-link"] = "var(--color-primary)", t["--topnav-bg"] = "color-mix(in oklch, var(--bg) 80%, transparent)", t["--topnav-border"] = "var(--border)", t["--topnav-link"] = "var(--ink-dim)", t["--topnav-link-active"] = "var(--ink)", t["--topnav-link-bg-active"] = "var(--panel)", t["--footer-bg"] = "transparent", t["--footer-border"] = "var(--border)", t["--footer-text"] = "var(--ink-faint)", t["--footer-brand"] = "var(--ink)", t["--hero-banner-bg"] = "var(--bg-2)", t["--hero-banner-border"] = "var(--border)", t["--hero-banner-overlay"] = "linear-gradient(180deg, transparent 40%, color-mix(in oklch, var(--bg) 90%, transparent) 100%)", t["--tier-ladder-current-mix"] = "12%", t["--tier-ladder-locked-opacity"] = "0.5", t["--tier-ladder-surface"] = "var(--panel-2)", t["--tier-ladder-surface-current"] = "", t["--badge-grid-bg"] = "var(--panel-2)", t["--badge-grid-border"] = "var(--border)", t["--badge-grid-locked-fg"] = "var(--ink-faint)", t["--stat-card-trend-default"] = "var(--color-primary)", t["--stat-card-trend-streak"] = "var(--accent-amber)", t["--stat-card-trend-rewards"] = "var(--accent-lime)", t["--xp-chart-gradient-from"] = "var(--color-primary)", t["--xp-chart-gradient-to"] = "var(--accent-magenta)";
  const o = e.overrides;
  if (o != null && o.missionCard) {
    const f = o.missionCard;
    f.surface && (t["--mission-card-bg"] = f.surface), f.border && (t["--mission-card-border"] = f.border);
    const S = f.iconBoxBg ?? f.surface2;
    S && (t["--mission-card-icon-bg"] = S), f.iconBoxBorder && (t["--mission-card-icon-border"] = f.iconBoxBorder), f.title && (t["--mission-card-title"] = f.title), f.body && (t["--mission-card-body"] = f.body), f.ctaFg && (t["--mission-card-cta-fg"] = f.ctaFg), typeof f.haloOpacity == "number" && (t["--mission-card-halo-opacity"] = String(f.haloOpacity));
  }
  if (o != null && o.missionModal) {
    const f = o.missionModal;
    f.backdrop && (t["--mission-modal-backdrop"] = f.backdrop), f.surface && (t["--mission-modal-bg"] = f.surface), f.border && (t["--mission-modal-border"] = f.border), f.headerBorder && (t["--mission-modal-header-border"] = f.headerBorder), f.title && (t["--mission-modal-title"] = f.title), f.body && (t["--mission-modal-body"] = f.body), f.closeBg && (t["--mission-modal-close-bg"] = f.closeBg), f.closeBorder && (t["--mission-modal-close-border"] = f.closeBorder), f.closeIcon && (t["--mission-modal-close-icon"] = f.closeIcon);
  }
  if (o != null && o.rewardCard) {
    const f = o.rewardCard;
    f.surface && (t["--reward-card-bg"] = f.surface), f.border && (t["--reward-card-border"] = f.border);
    const S = f.imageArea ?? f.surface2;
    S && (t["--reward-card-image-bg"] = S), f.imageAreaBorder && (t["--reward-card-image-border"] = f.imageAreaBorder), f.title && (t["--reward-card-title"] = f.title), f.body && (t["--reward-card-body"] = f.body);
  }
  if (o != null && o.profileCard) {
    const f = o.profileCard;
    f.surface && (t["--profile-card-bg"] = f.surface), f.border && (t["--profile-card-border"] = f.border), f.title && (t["--profile-card-title"] = f.title), f.body && (t["--profile-card-body"] = f.body);
    const S = f.statBg ?? f.surface2;
    S && (t["--profile-card-stat-bg"] = S), f.statBorder && (t["--profile-card-stat-border"] = f.statBorder), f.walletColor && (t["--profile-card-wallet"] = f.walletColor);
  }
  if (o != null && o.leaderboardRow) {
    const f = o.leaderboardRow;
    f.rowSurface && (t["--leaderboard-row-bg"] = f.rowSurface), f.rowBorder && (t["--leaderboard-row-border"] = f.rowBorder), f.headSurface && (t["--leaderboard-head-bg"] = f.headSurface), f.headText && (t["--leaderboard-head-text"] = f.headText), f.mineHighlight && (t["--leaderboard-mine-bg"] = f.mineHighlight), f.topRankColor && (t["--leaderboard-top-rank"] = f.topRankColor);
  }
  if (o != null && o.tones && (o.tones.accent && (t["--tone-accent"] = o.tones.accent), o.tones.lime && (t["--tone-lime"] = o.tones.lime), o.tones.magenta && (t["--tone-magenta"] = o.tones.magenta), o.tones.amber && (t["--tone-amber"] = o.tones.amber)), o != null && o.onboardingCard) {
    const f = o.onboardingCard;
    f.surface && (t["--onboarding-card-bg"] = f.surface), f.border && (t["--onboarding-card-border"] = f.border), f.title && (t["--onboarding-card-title"] = f.title), f.body && (t["--onboarding-card-body"] = f.body), f.heroBg && (t["--onboarding-card-hero-bg"] = f.heroBg), f.formBg && (t["--onboarding-card-form-bg"] = f.formBg);
    const S = f.statTileBg ?? f.surface2;
    S && (t["--onboarding-card-stat-bg"] = S), f.statTileBorder && (t["--onboarding-card-stat-border"] = f.statTileBorder), f.brandEmphasis && (t["--onboarding-card-brand-emphasis"] = f.brandEmphasis), f.linkColor && (t["--onboarding-card-link"] = f.linkColor);
  }
  if (o != null && o.topNav) {
    const f = o.topNav;
    f.surface && (t["--topnav-bg"] = f.surface), f.border && (t["--topnav-border"] = f.border), f.linkColor && (t["--topnav-link"] = f.linkColor), f.linkColorActive && (t["--topnav-link-active"] = f.linkColorActive), f.linkBgActive && (t["--topnav-link-bg-active"] = f.linkBgActive);
  }
  if (o != null && o.footer) {
    const f = o.footer;
    f.surface && (t["--footer-bg"] = f.surface), f.border && (t["--footer-border"] = f.border), f.textColor && (t["--footer-text"] = f.textColor), f.brandColor && (t["--footer-brand"] = f.brandColor);
  }
  if (o != null && o.heroBanner) {
    const f = o.heroBanner;
    f.surface && (t["--hero-banner-bg"] = f.surface), f.border && (t["--hero-banner-border"] = f.border), f.overlayGradient && (t["--hero-banner-overlay"] = f.overlayGradient);
  }
  if (o != null && o.tierLadder) {
    const f = o.tierLadder;
    typeof f.currentMixPercent == "number" && (t["--tier-ladder-current-mix"] = `${We(f.currentMixPercent, 0, 100)}%`), typeof f.lockedOpacity == "number" && (t["--tier-ladder-locked-opacity"] = String(We(f.lockedOpacity, 0, 1))), f.surface && (t["--tier-ladder-surface"] = f.surface), f.surfaceCurrent && (t["--tier-ladder-surface-current"] = f.surfaceCurrent);
  }
  if (o != null && o.badgeGrid) {
    const f = o.badgeGrid;
    f.surface && (t["--badge-grid-bg"] = f.surface), f.border && (t["--badge-grid-border"] = f.border), f.lockedFg && (t["--badge-grid-locked-fg"] = f.lockedFg);
  }
  if (o != null && o.statCard) {
    const f = o.statCard;
    f.trendDefault && (t["--stat-card-trend-default"] = f.trendDefault), f.trendStreak && (t["--stat-card-trend-streak"] = f.trendStreak), f.trendRewards && (t["--stat-card-trend-rewards"] = f.trendRewards);
  }
  if (o != null && o.xpChart) {
    const f = o.xpChart;
    f.gradientFrom && (t["--xp-chart-gradient-from"] = f.gradientFrom), f.gradientTo && (t["--xp-chart-gradient-to"] = f.gradientTo);
  }
  return t;
}
function li(e, t) {
  return t ? { ...e, ...t } : e;
}
function St(e) {
  try {
    const t = Or(e);
    return t ? oi(t) : void 0;
  } catch {
    return;
  }
}
function Nr(e, t) {
  return { ...e, l: We((e.l ?? 0.5) + t, 0, 1) };
}
function Tt(e, t) {
  const r = ii({ ...e, alpha: void 0 }) ?? "#000000", i = Math.round(We(t, 0, 1) * 255).toString(16).padStart(2, "0");
  return `${r}${i}`;
}
function We(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
let dn = se;
const $t = /* @__PURE__ */ new Set(), Bt = /* @__PURE__ */ new Set();
function di(e) {
  return Bt.add(e), () => {
    Bt.delete(e);
  };
}
function oo(e) {
  const t = {
    mode: e.mode ?? se.mode,
    brand: e.brand ?? se.brand,
    logos: e.logos,
    content: e.content,
    assets: e.assets,
    overrides: Fe(se.overrides ?? {}, e.overrides)
  };
  if (dn = t, typeof document < "u") {
    const r = document.documentElement;
    r.dataset.theme = t.mode;
    const i = si(t);
    for (const a of $t)
      a in i || r.style.removeProperty(a);
    $t.clear();
    for (const [a, o] of Object.entries(i))
      r.style.setProperty(a, o), $t.add(a);
  }
  for (const r of Bt) r(t);
}
function so() {
  return dn;
}
var Dt = { exports: {} }, ke = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mr;
function ci() {
  if (Mr) return ke;
  Mr = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(i, a, o) {
    var s = null;
    if (o !== void 0 && (s = "" + o), a.key !== void 0 && (s = "" + a.key), "key" in a) {
      o = {};
      for (var l in a)
        l !== "key" && (o[l] = a[l]);
    } else o = a;
    return a = o.ref, {
      $$typeof: e,
      type: i,
      key: s,
      ref: a !== void 0 ? a : null,
      props: o
    };
  }
  return ke.Fragment = t, ke.jsx = r, ke.jsxs = r, ke;
}
var we = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cr;
function fi() {
  return Cr || (Cr = 1, process.env.NODE_ENV !== "production" && function() {
    function e(x) {
      if (x == null) return null;
      if (typeof x == "function")
        return x.$$typeof === D ? null : x.displayName || x.name || null;
      if (typeof x == "string") return x;
      switch (x) {
        case M:
          return "Fragment";
        case w:
          return "Profiler";
        case E:
          return "StrictMode";
        case S:
          return "Suspense";
        case Q:
          return "SuspenseList";
        case U:
          return "Activity";
      }
      if (typeof x == "object")
        switch (typeof x.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), x.$$typeof) {
          case C:
            return "Portal";
          case I:
            return x.displayName || "Context";
          case _:
            return (x._context.displayName || "Context") + ".Consumer";
          case f:
            var y = x.render;
            return x = x.displayName, x || (x = y.displayName || y.name || "", x = x !== "" ? "ForwardRef(" + x + ")" : "ForwardRef"), x;
          case Z:
            return y = x.displayName || null, y !== null ? y : e(x.type) || "Memo";
          case B:
            y = x._payload, x = x._init;
            try {
              return e(x(y));
            } catch {
            }
        }
      return null;
    }
    function t(x) {
      return "" + x;
    }
    function r(x) {
      try {
        t(x);
        var y = !1;
      } catch {
        y = !0;
      }
      if (y) {
        y = console;
        var $ = y.error, P = typeof Symbol == "function" && Symbol.toStringTag && x[Symbol.toStringTag] || x.constructor.name || "Object";
        return $.call(
          y,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          P
        ), t(x);
      }
    }
    function i(x) {
      if (x === M) return "<>";
      if (typeof x == "object" && x !== null && x.$$typeof === B)
        return "<...>";
      try {
        var y = e(x);
        return y ? "<" + y + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var x = H.A;
      return x === null ? null : x.getOwner();
    }
    function o() {
      return Error("react-stack-top-frame");
    }
    function s(x) {
      if (me.call(x, "key")) {
        var y = Object.getOwnPropertyDescriptor(x, "key").get;
        if (y && y.isReactWarning) return !1;
      }
      return x.key !== void 0;
    }
    function l(x, y) {
      function $() {
        ve || (ve = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          y
        ));
      }
      $.isReactWarning = !0, Object.defineProperty(x, "key", {
        get: $,
        configurable: !0
      });
    }
    function d() {
      var x = e(this.type);
      return re[x] || (re[x] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), x = this.props.ref, x !== void 0 ? x : null;
    }
    function c(x, y, $, P, ae, ie) {
      var z = $.ref;
      return x = {
        $$typeof: k,
        type: x,
        key: y,
        props: $,
        _owner: P
      }, (z !== void 0 ? z : null) !== null ? Object.defineProperty(x, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(x, "ref", { enumerable: !1, value: null }), x._store = {}, Object.defineProperty(x._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(x, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(x, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ae
      }), Object.defineProperty(x, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ie
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    }
    function u(x, y, $, P, ae, ie) {
      var z = y.children;
      if (z !== void 0)
        if (P)
          if (be(z)) {
            for (P = 0; P < z.length; P++)
              m(z[P]);
            Object.freeze && Object.freeze(z);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else m(z);
      if (me.call(y, "key")) {
        z = e(x);
        var oe = Object.keys(y).filter(function(xn) {
          return xn !== "key";
        });
        P = 0 < oe.length ? "{key: someKey, " + oe.join(": ..., ") + ": ...}" : "{key: someKey}", ze[z + P] || (oe = 0 < oe.length ? "{" + oe.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          P,
          z,
          oe,
          z
        ), ze[z + P] = !0);
      }
      if (z = null, $ !== void 0 && (r($), z = "" + $), s(y) && (r(y.key), z = "" + y.key), "key" in y) {
        $ = {};
        for (var at in y)
          at !== "key" && ($[at] = y[at]);
      } else $ = y;
      return z && l(
        $,
        typeof x == "function" ? x.displayName || x.name || "Unknown" : x
      ), c(
        x,
        z,
        $,
        a(),
        ae,
        ie
      );
    }
    function m(x) {
      b(x) ? x._store && (x._store.validated = 1) : typeof x == "object" && x !== null && x.$$typeof === B && (x._payload.status === "fulfilled" ? b(x._payload.value) && x._payload.value._store && (x._payload.value._store.validated = 1) : x._store && (x._store.validated = 1));
    }
    function b(x) {
      return typeof x == "object" && x !== null && x.$$typeof === k;
    }
    var v = pn, k = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), I = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), Z = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), D = Symbol.for("react.client.reference"), H = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, me = Object.prototype.hasOwnProperty, be = Array.isArray, ge = console.createTask ? console.createTask : function() {
      return null;
    };
    v = {
      react_stack_bottom_frame: function(x) {
        return x();
      }
    };
    var ve, re = {}, ye = v.react_stack_bottom_frame.bind(
      v,
      o
    )(), ne = ge(i(o)), ze = {};
    we.Fragment = M, we.jsx = function(x, y, $) {
      var P = 1e4 > H.recentlyCreatedOwnerStacks++;
      return u(
        x,
        y,
        $,
        !1,
        P ? Error("react-stack-top-frame") : ye,
        P ? ge(i(x)) : ne
      );
    }, we.jsxs = function(x, y, $) {
      var P = 1e4 > H.recentlyCreatedOwnerStacks++;
      return u(
        x,
        y,
        $,
        !0,
        P ? Error("react-stack-top-frame") : ye,
        P ? ge(i(x)) : ne
      );
    };
  }()), we;
}
process.env.NODE_ENV === "production" ? Dt.exports = ci() : Dt.exports = fi();
var n = Dt.exports;
const ui = se.assets ?? {}, xi = {
  config: se,
  content: Sr,
  assets: {}
}, cn = bn(xi);
function lo({ value: e, children: t }) {
  const [r, i] = j(null);
  G(() => di(i), []);
  const a = r ?? e, o = hn(
    () => ({
      config: a,
      content: Fe(Sr, a.content),
      assets: Fe(ui, a.assets)
    }),
    [a]
  );
  return /* @__PURE__ */ n.jsx(cn.Provider, { value: o, children: t });
}
function Zt() {
  return mn(cn);
}
function de(e) {
  const { content: t } = Zt();
  return pi(t, e);
}
function pi(e, t) {
  const r = t.split(".");
  let i = e;
  for (const a of r) {
    if (i == null || typeof i != "object") return "";
    i = i[a];
  }
  return i;
}
const _r = /* @__PURE__ */ new Set();
function hi(e) {
  const { assets: t } = Zt();
  return t[e];
}
function co(e) {
  if (!(typeof document > "u"))
    for (const t of e) {
      if (!(t != null && t.src) || _r.has(t.src)) continue;
      const r = document.createElement("link");
      r.rel = "preload", r.href = t.src, r.as = t.type === "JSON" ? "fetch" : "image", t.type === "JSON" && (r.crossOrigin = "anonymous"), document.head.appendChild(r), _r.add(t.src);
    }
}
function fo() {
  return Zt().config;
}
function T({
  variant: e = "default",
  size: t = "md",
  icon: r,
  iconLeft: i,
  iconRight: a,
  children: o,
  className: s,
  style: l,
  ...d
}) {
  const c = [
    "btn",
    e !== "default" ? e : "",
    t === "sm" ? "px-3 py-2 text-xs" : "",
    s
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ n.jsxs("button", { className: c, style: l, ...d, children: [
    i,
    o,
    a ?? r
  ] });
}
const mi = {
  accent: {
    color: "var(--color-primary)",
    borderColor: "color-mix(in oklch, var(--color-primary) 40%, transparent)",
    background: "var(--color-primary-soft)"
  },
  lime: {
    color: "var(--accent-lime)",
    borderColor: "color-mix(in oklch, var(--accent-lime) 40%, transparent)",
    background: "color-mix(in oklch, var(--accent-lime) 14%, transparent)"
  },
  magenta: {
    color: "var(--accent-magenta)",
    borderColor: "color-mix(in oklch, var(--accent-magenta) 40%, transparent)",
    background: "color-mix(in oklch, var(--accent-magenta) 14%, transparent)"
  },
  amber: {
    color: "var(--accent-amber)",
    borderColor: "color-mix(in oklch, var(--accent-amber) 40%, transparent)",
    background: "color-mix(in oklch, var(--accent-amber) 14%, transparent)"
  }
};
function bi({ children: e, tone: t = "default", dot: r, className: i, style: a }) {
  const o = t !== "default" ? mi[t] : {};
  return /* @__PURE__ */ n.jsxs(
    "span",
    {
      className: ["chip", i].filter(Boolean).join(" "),
      style: { ...o, ...a },
      children: [
        r && /* @__PURE__ */ n.jsx("span", { className: "inline-block w-[5px] h-[5px] rounded-full bg-current shrink-0" }),
        e
      ]
    }
  );
}
function Te({ className: e, ...t }) {
  return /* @__PURE__ */ n.jsx("input", { className: ["input", e].filter(Boolean).join(" "), ...t });
}
function fn({ className: e, style: t, ...r }) {
  return /* @__PURE__ */ n.jsx(
    "textarea",
    {
      className: ["input resize-y min-h-[120px] leading-relaxed", e].filter(Boolean).join(" "),
      style: t,
      ...r
    }
  );
}
function gi({
  label: e,
  labelInside: t,
  adornmentLeft: r,
  adornmentRight: i,
  hint: a,
  error: o,
  style: s,
  ...l
}) {
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    e && /* @__PURE__ */ n.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: e }),
    /* @__PURE__ */ n.jsxs("div", { className: "relative flex items-center", children: [
      r && /* @__PURE__ */ n.jsx("div", { className: "absolute left-3 z-[1] text-ink-dim flex items-center pointer-events-none", children: r }),
      t ? /* @__PURE__ */ n.jsxs(
        "div",
        {
          className: "input flex flex-col gap-0.5 py-2 px-3.5 cursor-text w-full",
          style: {
            paddingLeft: r ? 38 : void 0,
            paddingRight: i ? 38 : void 0
          },
          children: [
            /* @__PURE__ */ n.jsx("span", { className: "font-mono text-[9px] tracking-[0.1em] uppercase text-ink-dim leading-none", children: t }),
            /* @__PURE__ */ n.jsx(
              "input",
              {
                className: "bg-transparent border-none outline-none text-ink text-sm p-0",
                ...l
              }
            )
          ]
        }
      ) : /* @__PURE__ */ n.jsx(
        Te,
        {
          className: "w-full",
          style: {
            paddingLeft: r ? 38 : void 0,
            paddingRight: i ? 38 : void 0,
            ...s
          },
          ...l
        }
      ),
      i && /* @__PURE__ */ n.jsx("div", { className: "absolute right-3 z-[1] text-ink-dim flex items-center", children: i })
    ] }),
    (a || o) && /* @__PURE__ */ n.jsx(
      "span",
      {
        className: `text-[11px] font-mono leading-tight ${o ? "text-danger" : "text-ink-faint"}`,
        children: o ?? a
      }
    )
  ] });
}
function vi({ value: e, max: t, style: r = "segmented", segments: i = 10, label: a }) {
  const o = Math.max(0, Math.min(1, e / t));
  if (r === "plain")
    return /* @__PURE__ */ n.jsxs("div", { children: [
      a && /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ n.jsx("span", { children: a }),
        /* @__PURE__ */ n.jsxs("span", { children: [
          e,
          "/",
          t
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "xpbar", children: /* @__PURE__ */ n.jsx("div", { className: "fill", style: { width: `${o * 100}%` } }) })
    ] });
  if (r === "segmented") {
    const s = Math.round(o * i);
    return /* @__PURE__ */ n.jsxs("div", { children: [
      a && /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ n.jsx("span", { children: a }),
        /* @__PURE__ */ n.jsxs("span", { children: [
          e,
          "/",
          t
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "xp-seg", children: Array.from({ length: i }).map((l, d) => /* @__PURE__ */ n.jsx("div", { className: `seg ${d < s ? "on" : ""}` }, d)) })
    ] });
  }
  if (r === "ring") {
    const l = 2 * Math.PI * 30;
    return /* @__PURE__ */ n.jsxs("div", { className: "inline-flex items-center gap-3", children: [
      /* @__PURE__ */ n.jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", children: [
        /* @__PURE__ */ n.jsx("circle", { cx: "40", cy: "40", r: 30, fill: "none", stroke: "var(--panel-2)", strokeWidth: "6" }),
        /* @__PURE__ */ n.jsx(
          "circle",
          {
            cx: "40",
            cy: "40",
            r: 30,
            fill: "none",
            stroke: "var(--color-primary)",
            strokeWidth: "6",
            strokeDasharray: l,
            strokeDashoffset: l * (1 - o),
            transform: "rotate(-90 40 40)",
            strokeLinecap: "round",
            style: {
              filter: "drop-shadow(0 0 6px var(--color-primary))",
              transition: "stroke-dashoffset 800ms ease"
            }
          }
        ),
        /* @__PURE__ */ n.jsxs(
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
              Math.round(o * 100),
              "%"
            ]
          }
        )
      ] }),
      a && /* @__PURE__ */ n.jsxs("div", { children: [
        /* @__PURE__ */ n.jsx("div", { className: "font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim", children: a }),
        /* @__PURE__ */ n.jsxs("div", { className: "font-mono text-sm font-bold", children: [
          e,
          "/",
          t
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ n.jsxs("div", { children: [
    a && /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
      /* @__PURE__ */ n.jsx("span", { children: a }),
      /* @__PURE__ */ n.jsxs("span", { children: [
        e,
        "/",
        t
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "relative h-3.5 border border-border rounded-[3px] bg-panel-2 overflow-hidden", children: [
      /* @__PURE__ */ n.jsx(
        "div",
        {
          className: "absolute inset-0.5 rounded-sm",
          style: {
            background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) ${o * 100}%, transparent ${o * 100}%)`
          }
        }
      ),
      /* @__PURE__ */ n.jsx(
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
function yi({ size: e = 28 }) {
  return /* @__PURE__ */ n.jsxs("svg", { width: e, height: e, viewBox: "0 0 32 32", children: [
    /* @__PURE__ */ n.jsx("defs", { children: /* @__PURE__ */ n.jsxs("linearGradient", { id: "lg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ n.jsx("stop", { offset: "0", stopColor: "var(--color-primary)" }),
      /* @__PURE__ */ n.jsx("stop", { offset: "1", stopColor: "var(--accent-magenta)" })
    ] }) }),
    /* @__PURE__ */ n.jsx("polygon", { points: "16,2 28,9 28,23 16,30 4,23 4,9", fill: "url(#lg)" }),
    /* @__PURE__ */ n.jsx("polygon", { points: "16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5", fill: "var(--bg)" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "16", cy: "16", r: "3.5", fill: "var(--color-primary)" })
  ] });
}
function uo({
  name: e = "GrowQuest",
  version: t = "v1.4"
}) {
  return /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2.5 font-display font-semibold text-lg tracking-[-0.02em] max-[720px]:text-base max-[420px]:[&_span:last-of-type]:text-sm", children: [
    /* @__PURE__ */ n.jsx("span", { className: "inline-grid place-items-center w-7 h-7 max-[720px]:w-6 max-[720px]:h-6", children: /* @__PURE__ */ n.jsx(yi, {}) }),
    /* @__PURE__ */ n.jsx("span", { children: e }),
    /* @__PURE__ */ n.jsx("span", { className: "chip brand-version", children: t })
  ] });
}
function ue({ children: e, dot: t }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim", children: [
    t !== !1 && /* @__PURE__ */ n.jsx("span", { className: "w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" }),
    e
  ] });
}
function X({ children: e, tone: t = "default" }) {
  const r = {
    default: "text-ink-dim border-border bg-panel-2",
    accent: "text-primary border-[color-mix(in_oklch,var(--color-primary)_40%,transparent)] bg-primary-soft",
    lime: "text-accent-lime border-[color-mix(in_oklch,var(--accent-lime)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-lime)_14%,transparent)]",
    magenta: "text-accent-magenta border-[color-mix(in_oklch,var(--accent-magenta)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-magenta)_14%,transparent)]",
    amber: "text-accent-amber border-[color-mix(in_oklch,var(--accent-amber)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-amber)_14%,transparent)]",
    ghost: "text-ink-dim border-border bg-transparent"
  }, i = r[t] ?? r.default;
  return /* @__PURE__ */ n.jsx("span", { className: `chip ${i}`, children: e });
}
function Ce({ amount: e, icon: t = !0 }) {
  return /* @__PURE__ */ n.jsxs("span", { className: "chip primary gap-1.5 font-semibold", children: [
    t && /* @__PURE__ */ n.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ n.jsx(
      "polygon",
      {
        points: "5,0 6.3,3.7 10,3.7 7,6 8.2,10 5,7.6 1.8,10 3,6 0,3.7 3.7,3.7",
        fill: "currentColor"
      }
    ) }),
    e,
    " XP"
  ] });
}
function un({ endsAt: e }) {
  const [t, r] = j(Date.now);
  G(() => {
    const l = setInterval(() => r(Date.now()), 1e3);
    return () => clearInterval(l);
  }, []);
  const i = Math.max(0, e - t), a = Math.floor(i / 36e5).toString().padStart(2, "0"), o = Math.floor(i % 36e5 / 6e4).toString().padStart(2, "0"), s = Math.floor(i % 6e4 / 1e3).toString().padStart(2, "0");
  return /* @__PURE__ */ n.jsxs("span", { className: "mono text-accent-magenta", children: [
    a,
    ":",
    o,
    ":",
    s
  ] });
}
function ji({
  values: e,
  color: t = "var(--color-primary)",
  w: r = 80,
  h: i = 24
}) {
  const a = Math.min(...e), o = Math.max(...e), s = e.map((l, d) => {
    const c = d / (e.length - 1) * r, u = i - (l - a) / (o - a || 1) * (i - 2) - 1;
    return `${c},${u}`;
  }).join(" ");
  return /* @__PURE__ */ n.jsx("svg", { width: r, height: i, viewBox: `0 0 ${r} ${i}`, children: /* @__PURE__ */ n.jsx("polyline", { points: s, fill: "none", stroke: t, strokeWidth: "1.5" }) });
}
function xo({ label: e }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-3 my-5", children: [
    /* @__PURE__ */ n.jsx("div", { className: "flex-1 h-px bg-border" }),
    e && /* @__PURE__ */ n.jsx("span", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim", children: e }),
    /* @__PURE__ */ n.jsx("div", { className: "flex-1 h-px bg-border" })
  ] });
}
const ki = [
  "var(--accent-cyan)",
  "var(--accent-magenta)",
  "var(--accent-lime)",
  "var(--accent-amber)",
  "var(--accent-violet)"
], po = Ue(function({
  badges: t,
  columns: r = 3,
  unlockedTones: i
}) {
  const a = de("profile.badgesEyebrow"), o = de("profile.badgeUnlocked"), s = de("profile.badgeLocked"), l = i && i.length > 0 ? i : ki, d = t.filter((c) => c.got).length;
  return /* @__PURE__ */ n.jsxs("div", { className: "panel p-5", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5", children: [
      "// ",
      a,
      " · ",
      d,
      "/",
      t.length
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "grid gap-2.5", style: { gridTemplateColumns: `repeat(${r}, 1fr)` }, children: t.map((c, u) => /* @__PURE__ */ n.jsxs(
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
          /* @__PURE__ */ n.jsx(
            "div",
            {
              className: "w-11 h-11 mx-auto mb-2 rounded-[10px] grid place-items-center border border-border",
              style: {
                background: c.got ? l[u % l.length] : "var(--panel)"
              },
              children: /* @__PURE__ */ n.jsx("svg", { width: "22", height: "22", viewBox: "0 0 22 22", children: /* @__PURE__ */ n.jsx(
                "polygon",
                {
                  points: "11,2 20,7 20,15 11,20 2,15 2,7",
                  fill: c.got ? "#05060A" : "var(--badge-grid-locked-fg)"
                }
              ) })
            }
          ),
          /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-[12px]", children: c.name }),
          /* @__PURE__ */ n.jsx("div", { className: "text-[10px] text-ink-faint mt-0.5 font-mono uppercase tracking-[0.08em]", children: c.got ? o : s })
        ]
      },
      c.id
    )) })
  ] });
});
function ho({ options: e, value: t, onChange: r, labels: i }) {
  return /* @__PURE__ */ n.jsx("div", { className: "flex flex-wrap gap-1 p-1 bg-panel-2 border border-border rounded-lg", children: e.map((a) => /* @__PURE__ */ n.jsx(
    "button",
    {
      onClick: () => r(a),
      style: {
        padding: "6px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: 6,
        background: t === a ? "var(--panel)" : "transparent",
        color: t === a ? "var(--ink)" : "var(--ink-dim)",
        border: t === a ? "1px solid var(--border)" : "1px solid transparent"
      },
      children: (i == null ? void 0 : i[a]) ?? a
    },
    a
  )) });
}
function wi({ variant: e = "isometric", accent: t }) {
  const r = t || "var(--color-primary)";
  if (e === "grid-poster")
    return /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      /* @__PURE__ */ n.jsxs("defs", { children: [
        /* @__PURE__ */ n.jsx("pattern", { id: "gp-grid", width: "24", height: "24", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ n.jsx("path", { d: "M24 0H0V24", fill: "none", stroke: r, strokeOpacity: "0.18", strokeWidth: "1" }) }),
        /* @__PURE__ */ n.jsxs("linearGradient", { id: "gp-fade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ n.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0" }),
          /* @__PURE__ */ n.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0.35" })
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("rect", { width: "480", height: "480", fill: "url(#gp-grid)" }),
      /* @__PURE__ */ n.jsx("rect", { width: "480", height: "480", fill: "url(#gp-fade)" }),
      /* @__PURE__ */ n.jsx(
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
      /* @__PURE__ */ n.jsx(
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
      /* @__PURE__ */ n.jsx(
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
      /* @__PURE__ */ n.jsx("circle", { cx: "380", cy: "130", r: "70", fill: "none", stroke: r, strokeWidth: "1.5" }),
      /* @__PURE__ */ n.jsx(
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
      /* @__PURE__ */ n.jsx("circle", { cx: "380", cy: "130", r: "8", fill: r })
    ] });
  if (e === "orbital")
    return /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      /* @__PURE__ */ n.jsx("defs", { children: /* @__PURE__ */ n.jsxs("radialGradient", { id: "orb-glow", children: [
        /* @__PURE__ */ n.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0.55" }),
        /* @__PURE__ */ n.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ n.jsx("rect", { width: "480", height: "480", fill: "transparent" }),
      /* @__PURE__ */ n.jsx("circle", { cx: "240", cy: "240", r: "200", fill: "url(#orb-glow)" }),
      [160, 110, 60].map((i, a) => /* @__PURE__ */ n.jsx(
        "ellipse",
        {
          cx: "240",
          cy: "240",
          rx: i * 1.6,
          ry: i * 0.5,
          fill: "none",
          stroke: r,
          strokeOpacity: 0.4 - a * 0.1,
          strokeWidth: "1",
          transform: `rotate(${-20 + a * 12} 240 240)`
        },
        a
      )),
      /* @__PURE__ */ n.jsx("circle", { cx: "240", cy: "240", r: "34", fill: r, opacity: "0.9" }),
      /* @__PURE__ */ n.jsx(
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
      [0, 72, 144, 216, 288].map((i, a) => {
        const o = i * Math.PI / 180, s = 240 + Math.cos(o) * 170, l = 240 + Math.sin(o) * 60;
        return /* @__PURE__ */ n.jsx("circle", { cx: s, cy: l, r: 6 + a % 3 * 2, fill: r, opacity: 0.7 }, a);
      }),
      /* @__PURE__ */ n.jsx("text", { x: "30", y: "40", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// ORBIT.SYS" })
    ] });
  if (e === "pixel") {
    const o = [];
    for (let s = 0; s < 12; s++)
      for (let l = 0; l < 12; l++) {
        const d = l + s * 0.5 - 3, c = s - l * 0.3 + 4;
        Math.hypot(d - 5, c - 5) < 3 + Math.sin(s * l * 0.3) * 1.5 && o.push({ x: l * 34 + 30, y: s * 30 + 40, hue: s * l % 3 });
      }
    return /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      o.map((s, l) => /* @__PURE__ */ n.jsx(
        "rect",
        {
          x: s.x,
          y: s.y,
          width: "28",
          height: "24",
          fill: s.hue === 0 ? r : s.hue === 1 ? "var(--accent-magenta)" : "var(--accent-lime)",
          opacity: 0.6 + s.hue * 0.15
        },
        l
      )),
      /* @__PURE__ */ n.jsx("text", { x: "30", y: "440", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// BLOCK.MAP" })
    ] });
  }
  return /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
    /* @__PURE__ */ n.jsxs("defs", { children: [
      /* @__PURE__ */ n.jsx(
        "pattern",
        {
          id: "iso-grid",
          width: "48",
          height: "28",
          patternUnits: "userSpaceOnUse",
          patternTransform: "skewX(-30)",
          children: /* @__PURE__ */ n.jsx("path", { d: "M48 0H0V28", fill: "none", stroke: r, strokeOpacity: "0.22", strokeWidth: "1" })
        }
      ),
      /* @__PURE__ */ n.jsxs("radialGradient", { id: "iso-glow", cx: "50%", cy: "55%", children: [
        /* @__PURE__ */ n.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0.35" }),
        /* @__PURE__ */ n.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ n.jsxs("linearGradient", { id: "iso-top", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ n.jsx("stop", { offset: "0", stopColor: r }),
        /* @__PURE__ */ n.jsx("stop", { offset: "1", stopColor: "var(--accent-magenta)" })
      ] })
    ] }),
    /* @__PURE__ */ n.jsx("rect", { width: "480", height: "480", fill: "url(#iso-grid)", transform: "translate(0 60)" }),
    /* @__PURE__ */ n.jsx("rect", { width: "480", height: "480", fill: "url(#iso-glow)" }),
    /* @__PURE__ */ n.jsxs("g", { transform: "translate(240 270)", children: [
      /* @__PURE__ */ n.jsx(
        "polygon",
        {
          points: "0,-40 140,30 0,100 -140,30",
          fill: r,
          fillOpacity: "0.08",
          stroke: r,
          strokeOpacity: "0.5"
        }
      ),
      /* @__PURE__ */ n.jsx(
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
    /* @__PURE__ */ n.jsxs("g", { transform: "translate(240 180)", children: [
      /* @__PURE__ */ n.jsx("polygon", { points: "0,0 70,30 70,100 0,70", fill: "var(--accent-magenta)", opacity: "0.85" }),
      /* @__PURE__ */ n.jsx("polygon", { points: "0,0 -70,30 -70,100 0,70", fill: r, opacity: "0.9" }),
      /* @__PURE__ */ n.jsx("polygon", { points: "0,-40 70,-10 70,30 0,0 -70,30 -70,-10", fill: "url(#iso-top)" }),
      /* @__PURE__ */ n.jsx(
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
    /* @__PURE__ */ n.jsxs(
      "g",
      {
        transform: "translate(90 140)",
        className: "animate-[float_4s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ n.jsx("polygon", { points: "0,0 40,16 40,56 0,40", fill: r, opacity: "0.9" }),
          /* @__PURE__ */ n.jsx("polygon", { points: "0,0 -40,16 -40,56 0,40", fill: r, opacity: "0.65" }),
          /* @__PURE__ */ n.jsx("polygon", { points: "0,-20 40,-4 40,16 0,0 -40,16 -40,-4", fill: r, opacity: "0.5" })
        ]
      }
    ),
    /* @__PURE__ */ n.jsxs(
      "g",
      {
        transform: "translate(380 120)",
        className: "animate-[float_5s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ n.jsx("circle", { r: "26", fill: "var(--accent-magenta)", opacity: "0.85" }),
          /* @__PURE__ */ n.jsx("circle", { r: "26", fill: "none", stroke: "#fff", strokeOpacity: "0.45", strokeWidth: "1" }),
          /* @__PURE__ */ n.jsx("ellipse", { cx: "0", cy: "0", rx: "26", ry: "7", fill: "none", stroke: "#fff", strokeOpacity: "0.3" })
        ]
      }
    ),
    /* @__PURE__ */ n.jsxs("g", { transform: "translate(110 360)", children: [
      /* @__PURE__ */ n.jsx("polygon", { points: "0,0 22,9 22,30 0,21", fill: "var(--accent-lime)" }),
      /* @__PURE__ */ n.jsx("polygon", { points: "0,0 -22,9 -22,30 0,21", fill: "var(--accent-lime)", opacity: "0.7" }),
      /* @__PURE__ */ n.jsx("polygon", { points: "0,-12 22,-3 22,9 0,0 -22,9 -22,-3", fill: "#fff", opacity: "0.85" })
    ] }),
    /* @__PURE__ */ n.jsxs(
      "g",
      {
        transform: "translate(380 380)",
        className: "animate-[float_3.5s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ n.jsx("polygon", { points: "0,0 18,8 18,26 0,18", fill: r }),
          /* @__PURE__ */ n.jsx("polygon", { points: "0,0 -18,8 -18,26 0,18", fill: r, opacity: "0.7" }),
          /* @__PURE__ */ n.jsx("polygon", { points: "0,-10 18,-2 18,8 0,0 -18,8 -18,-2", fill: "#fff", opacity: "0.85" })
        ]
      }
    ),
    /* @__PURE__ */ n.jsx("text", { x: "24", y: "36", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// QUEST.WORLD" }),
    /* @__PURE__ */ n.jsx(
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
    /* @__PURE__ */ n.jsx(
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
function Kt({ seed: e = 1, size: t = 40 }) {
  const r = [
    "var(--accent-cyan)",
    "var(--accent-magenta)",
    "var(--accent-lime)",
    "var(--accent-amber)",
    "var(--accent-violet)"
  ], i = r[e % r.length], a = r[(e + 2) % r.length], o = e % 3;
  return /* @__PURE__ */ n.jsxs(
    "svg",
    {
      width: t,
      height: t,
      viewBox: "0 0 40 40",
      className: "block rounded-md border border-border bg-panel-2",
      children: [
        /* @__PURE__ */ n.jsx("rect", { width: "40", height: "40", fill: "var(--panel-2)" }),
        o === 0 && /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx("circle", { cx: "20", cy: "20", r: "12", fill: i }),
          /* @__PURE__ */ n.jsx("circle", { cx: "20", cy: "20", r: "5", fill: a })
        ] }),
        o === 1 && /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx("polygon", { points: "20,6 34,20 20,34 6,20", fill: i }),
          /* @__PURE__ */ n.jsx("rect", { x: "16", y: "16", width: "8", height: "8", fill: a })
        ] }),
        o === 2 && /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx("rect", { x: "8", y: "8", width: "24", height: "24", fill: i }),
          /* @__PURE__ */ n.jsx("circle", { cx: "20", cy: "20", r: "6", fill: a })
        ] })
      ]
    }
  );
}
function Et({ type: e, size: t = 22 }) {
  const r = t, i = {
    width: r,
    height: r,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return e === "social" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ n.jsx("path", { d: "M8 12h8M12 8v8" })
  ] }) : e === "photo" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ n.jsx("path", { d: "M8 6l2-3h4l2 3" })
  ] }) : e === "refer" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "9", cy: "10", r: "3" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "17", cy: "8", r: "2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" })
  ] }) : e === "video" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ n.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor" })
  ] }) : e === "quiz" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ n.jsx("path", { d: "M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-2.5 2-2.5 4M12 17.5v.1" })
  ] }) : e === "review" ? /* @__PURE__ */ n.jsx("svg", { ...i, children: /* @__PURE__ */ n.jsx("polygon", { points: "12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9" }) }) : e === "event" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M3 10h18M8 3v4M16 3v4" })
  ] }) : e === "purchase" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("path", { d: "M5 7h14l-1.5 11H6.5L5 7z" }),
    /* @__PURE__ */ n.jsx("path", { d: "M9 7V5a3 3 0 016 0v2" })
  ] }) : e === "read_article" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "4", y: "3", width: "16", height: "18", rx: "2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M8 8h8M8 12h8M8 16h5" })
  ] }) : e === "profile" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ n.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ n.jsx("path", { d: "M15 15l1.5 1.5L19 14" })
  ] }) : e === "avatar" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ n.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ n.jsx("path", { d: "M18 14v4M16 16h4" })
  ] }) : e === "verify_email" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "3", y: "6", width: "18", height: "13", rx: "2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M3 8l9 6 9-6" }),
    /* @__PURE__ */ n.jsx("path", { d: "M14 17l2 2 4-4" })
  ] }) : e === "verify_phone" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "7", y: "2", width: "10", height: "20", rx: "2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M7 6h10M7 18h10" }),
    /* @__PURE__ */ n.jsx("path", { d: "M14 14l1.5 1.5L18 13" })
  ] }) : e === "spin_wheel" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ n.jsx("path", { d: "M12 3v9M12 12l6.4 6.4M12 12H3" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", stroke: "none" })
  ] }) : e === "scratch_card" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M7 12c1.5-2 3-2 4 0s2.5 2 4 0", strokeDasharray: "3 2" }),
    /* @__PURE__ */ n.jsx("path", { d: "M8 16h2M12 16h4" })
  ] }) : e === "badge_collect" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("path", { d: "M12 3l2.2 5.2H20l-4.6 3.4 1.8 5.4L12 14l-5.2 3 1.8-5.4L4 8.2h5.8z" }),
    /* @__PURE__ */ n.jsx("path", { d: "M9 21h6M12 17.5v3.5" })
  ] }) : e === "share" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("path", { d: "M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" }),
    /* @__PURE__ */ n.jsx("path", { d: "M16 6l-4-4-4 4M12 2v13" })
  ] }) : e === "invite" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "9", cy: "8", r: "3" }),
    /* @__PURE__ */ n.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5" }),
    /* @__PURE__ */ n.jsx("path", { d: "M18 8v6M15 11h6" })
  ] }) : e === "photo_proof" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ n.jsx("path", { d: "M8 6l2-3h4l2 3" }),
    /* @__PURE__ */ n.jsx("path", { d: "M15 11l1.5 1.5L19 10" })
  ] }) : e === "follow_social" ? /* @__PURE__ */ n.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ n.jsx("path", { d: "M8 12h8M12 8v8" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "18.5", cy: "5.5", r: "2.5", fill: "currentColor", stroke: "none" })
  ] }) : /* @__PURE__ */ n.jsx("svg", { ...i, children: /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "8" }) });
}
function Ni({ asset: e, fallback: t, alt: r = "", className: i }) {
  const [a, o] = j(!1);
  if (!(e && (e.type === "IMG" || e.type === "GIF") && !a)) return /* @__PURE__ */ n.jsx(n.Fragment, { children: t });
  const l = /* @__PURE__ */ n.jsx(
    "img",
    {
      src: e.src,
      alt: r,
      loading: "eager",
      decoding: "async",
      onError: () => o(!0),
      className: i ?? "block w-full h-full object-cover"
    }
  );
  return e.mobileSrc ? /* @__PURE__ */ n.jsxs("picture", { children: [
    /* @__PURE__ */ n.jsx("source", { media: "(max-width: 720px)", srcSet: e.mobileSrc }),
    l
  ] }) : l;
}
function mo({
  heroStyle: e,
  title: t = "Founders' Path",
  subtitle: r = "Complete 8 of 12 missions to unlock the Ascendant lootbox.",
  eyebrow: i = "// current season · week 04"
}) {
  const a = hi("missionsHero");
  return /* @__PURE__ */ n.jsxs("div", { className: "hero-banner", children: [
    /* @__PURE__ */ n.jsx("div", { className: "hero-banner-bg", children: /* @__PURE__ */ n.jsx(
      Ni,
      {
        asset: a,
        fallback: /* @__PURE__ */ n.jsx(wi, { variant: e }),
        alt: t
      }
    ) }),
    /* @__PURE__ */ n.jsxs("div", { className: "hero-banner-content", children: [
      /* @__PURE__ */ n.jsx(ue, { children: i }),
      /* @__PURE__ */ n.jsx("h2", { className: "display m-0 text-[26px] tracking-[-0.02em]", children: t }),
      /* @__PURE__ */ n.jsx("div", { className: "text-[13px] text-ink-dim max-w-[420px]", children: r })
    ] })
  ] });
}
const Mi = {
  rank: "rank",
  handle: "insider",
  streak: "streak",
  tier: "tier",
  xp: "xp"
}, Ci = {
  Oracle: "magenta",
  Ascendant: "lime"
}, bo = Ue(function({
  entries: t,
  streakEmoji: r = "🔥",
  columnLabels: i,
  tierToneMap: a,
  youTag: o = "YOU"
}) {
  const s = { ...Mi, ...i }, l = a ?? Ci;
  return /* @__PURE__ */ n.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "lb-head lb-row", children: [
      /* @__PURE__ */ n.jsx("span", { children: s.rank }),
      /* @__PURE__ */ n.jsx("span", { children: s.handle }),
      /* @__PURE__ */ n.jsx("span", { className: "lb-streak", children: s.streak }),
      /* @__PURE__ */ n.jsx("span", { className: "lb-tier", children: s.tier }),
      /* @__PURE__ */ n.jsx("span", { className: "lb-cell-right", children: s.xp })
    ] }),
    t.map((d) => /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: "lb-row",
        style: { background: d.me ? "var(--leaderboard-mine-bg)" : "var(--leaderboard-row-bg)" },
        children: [
          /* @__PURE__ */ n.jsx(
            "span",
            {
              className: "mono font-bold",
              style: { color: d.rank <= 3 ? "var(--leaderboard-top-rank)" : "var(--ink)" },
              children: String(d.rank).padStart(2, "0")
            }
          ),
          /* @__PURE__ */ n.jsxs("span", { className: "lb-identity", children: [
            /* @__PURE__ */ n.jsx(Kt, { seed: d.seed, size: 28 }),
            /* @__PURE__ */ n.jsx("span", { className: "font-semibold text-[14px]", children: d.handle }),
            d.me && /* @__PURE__ */ n.jsx(X, { tone: "accent", children: o })
          ] }),
          /* @__PURE__ */ n.jsxs("span", { className: "mono lb-streak text-[13px] text-accent-amber", children: [
            d.streak,
            r
          ] }),
          /* @__PURE__ */ n.jsx("span", { className: "lb-tier", children: /* @__PURE__ */ n.jsx(X, { tone: l[d.tier] ?? "accent", children: d.tier }) }),
          /* @__PURE__ */ n.jsx("span", { className: "mono lb-xp", children: d.xp.toLocaleString() })
        ]
      },
      d.rank
    ))
  ] });
});
function Ht({ shape: e, tint: t }) {
  const r = `var(--accent-${t})`;
  return /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 100 100", className: "block w-full h-full", children: [
    /* @__PURE__ */ n.jsx("rect", { width: "100", height: "100", fill: "var(--panel)" }),
    /* @__PURE__ */ n.jsx("g", { opacity: "0.18", stroke: r, strokeWidth: "1", children: Array.from({ length: 10 }).map((i, a) => /* @__PURE__ */ n.jsx("line", { x1: "0", y1: a * 10, x2: "100", y2: a * 10 }, a)) }),
    e === "hex" && /* @__PURE__ */ n.jsx("polygon", { points: "50,14 84,32 84,68 50,86 16,68 16,32", fill: r }),
    e === "circle" && /* @__PURE__ */ n.jsx("circle", { cx: "50", cy: "50", r: "30", fill: r }),
    e === "diamond" && /* @__PURE__ */ n.jsx("polygon", { points: "50,14 86,50 50,86 14,50", fill: r }),
    e === "square" && /* @__PURE__ */ n.jsx("rect", { x: "22", y: "22", width: "56", height: "56", fill: r })
  ] });
}
function ce({
  selected: e,
  correct: t,
  wrong: r,
  disabled: i,
  onClick: a,
  children: o,
  layout: s = "row"
}) {
  const l = t ? "var(--accent-lime)" : r ? "var(--danger)" : e ? "var(--color-primary)" : "var(--border)", d = t ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : r ? "color-mix(in oklch, var(--danger) 14%, transparent)" : e ? "var(--color-primary-soft)" : "var(--panel-2)", c = s === "row" ? "py-3.5 px-4 rounded-lg flex flex-row items-center gap-3" : "p-2.5 rounded-[10px] flex flex-col gap-2";
  return /* @__PURE__ */ n.jsx(
    "button",
    {
      disabled: i,
      onClick: a,
      className: `text-left border ${c}`,
      style: { borderColor: l, background: d },
      children: o
    }
  );
}
const Pt = {
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
      { id: "a", label: "Hero + single CTA above the fold", tint: "cyan" },
      { id: "b", label: "Carousel of 5 headlines", tint: "magenta" },
      { id: "c", label: "Testimonials first, CTA last", tint: "lime" },
      { id: "d", label: "Video autoplay + form", tint: "amber" }
    ],
    correct: "a"
  },
  imageOnly: {
    q: "Which is the correct brand mark?",
    choices: [
      { id: "a", label: "Hexagon", shape: "hex", tint: "cyan" },
      { id: "b", label: "Circle", shape: "circle", tint: "magenta" },
      { id: "c", label: "Diamond", shape: "diamond", tint: "lime" },
      { id: "d", label: "Square", shape: "square", tint: "amber" }
    ],
    correct: "a"
  }
};
function _i({
  variant: e,
  onComplete: t
}) {
  const r = e === "text" ? Pt.text : e === "textImage" ? Pt.textImage : Pt.imageOnly, [i, a] = j(null), [o, s] = j(!1), l = r.correct === i;
  return /* @__PURE__ */ n.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ n.jsxs(ue, { children: [
      "// quiz · 1 of 5 ·",
      " ",
      e === "text" ? "text answers" : e === "textImage" ? "text + image" : "images only"
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: r.q }),
    e === "text" && /* @__PURE__ */ n.jsx("div", { className: "flex flex-col gap-2", children: r.choices.map((d) => {
      const c = i === d.id, u = o && d.id === r.correct, m = o && c && !l;
      return /* @__PURE__ */ n.jsxs(
        ce,
        {
          selected: c,
          correct: u,
          wrong: m,
          disabled: o,
          onClick: () => a(d.id),
          layout: "row",
          children: [
            /* @__PURE__ */ n.jsx("span", { className: "mono w-6 h-6 rounded-[5px] border border-border bg-panel grid place-items-center text-[11px] font-bold shrink-0", children: d.id.toUpperCase() }),
            /* @__PURE__ */ n.jsx("span", { className: "flex-1 text-sm", children: d.label }),
            u && /* @__PURE__ */ n.jsx(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "var(--accent-lime)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ n.jsx("path", { d: "M3 8.5l3.5 3.5L13 5" })
              }
            ),
            m && /* @__PURE__ */ n.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                fill: "none",
                stroke: "var(--danger)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ n.jsx("path", { d: "M3 3l8 8M11 3l-8 8" })
              }
            )
          ]
        },
        d.id
      );
    }) }),
    e === "textImage" && /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: r.choices.map((d) => {
      const c = i === d.id, u = o && d.id === r.correct, m = o && c && !l;
      return /* @__PURE__ */ n.jsxs(
        ce,
        {
          selected: c,
          correct: u,
          wrong: m,
          disabled: o,
          onClick: () => a(d.id),
          layout: "column",
          children: [
            /* @__PURE__ */ n.jsxs("div", { className: "aspect-[16/10] rounded-md overflow-hidden bg-panel relative", children: [
              /* @__PURE__ */ n.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${d.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`
                  }
                }
              ),
              /* @__PURE__ */ n.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ n.jsxs(
                "div",
                {
                  className: "font-mono text-[10px] tracking-[0.12em] uppercase py-1 px-2 bg-panel border rounded-[4px]",
                  style: {
                    color: `var(--accent-${d.tint})`,
                    borderColor: `color-mix(in oklch, var(--accent-${d.tint}) 40%, transparent)`
                  },
                  children: [
                    "OPT ",
                    d.id.toUpperCase()
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2 text-[13px] text-left", children: [
              /* @__PURE__ */ n.jsx("span", { className: "mono w-5 h-5 rounded-[4px] border border-border grid place-items-center text-[10px] font-bold shrink-0", children: d.id.toUpperCase() }),
              /* @__PURE__ */ n.jsx("span", { children: d.label })
            ] })
          ]
        },
        d.id
      );
    }) }),
    e === "imageOnly" && /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: r.choices.map((d) => {
      const c = i === d.id, u = o && d.id === r.correct, m = o && c && !l;
      return /* @__PURE__ */ n.jsx(
        ce,
        {
          selected: c,
          correct: u,
          wrong: m,
          disabled: o,
          onClick: () => a(d.id),
          layout: "column",
          children: /* @__PURE__ */ n.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ n.jsx(Ht, { shape: d.shape, tint: d.tint }) })
        },
        d.id
      );
    }) }),
    o && /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: `p-3 rounded-lg text-[13px] border ${l ? "border-accent-lime" : "border-danger"}`,
        style: {
          background: l ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)"
        },
        children: [
          /* @__PURE__ */ n.jsx("strong", { children: l ? "Correct!" : "Not quite." }),
          " ",
          l ? "Nicely done." : "The correct answer is A."
        ]
      }
    ),
    /* @__PURE__ */ n.jsx("div", { className: "flex gap-2", children: o ? /* @__PURE__ */ n.jsx(T, { variant: "primary", className: "flex-1", onClick: t, children: "Continue" }) : /* @__PURE__ */ n.jsx(
      T,
      {
        variant: "primary",
        className: "flex-1",
        disabled: !i,
        onClick: () => s(!0),
        children: "Submit answer"
      }
    ) })
  ] });
}
const Si = {
  q: "Which GrowQuest feature would you use most?",
  choices: [
    { id: "a", label: "Daily missions" },
    { id: "b", label: "Spin-to-win lootbox" },
    { id: "c", label: "Referral boosts" },
    { id: "d", label: "Leaderboard competition" }
  ]
}, Ti = {
  q: "Which hero style fits your brand?",
  choices: [
    { id: "a", label: "Isometric world", tint: "cyan" },
    { id: "b", label: "Orbital / cosmic", tint: "magenta" },
    { id: "c", label: "Editorial poster", tint: "lime" },
    { id: "d", label: "Pixel / arcade", tint: "amber" }
  ]
}, $i = {
  q: "Pick your favorite vibe:",
  choices: [
    { id: "a", shape: "hex", tint: "cyan" },
    { id: "b", shape: "circle", tint: "magenta" },
    { id: "c", shape: "diamond", tint: "lime" },
    { id: "d", shape: "square", tint: "amber" }
  ]
};
function Ei({
  variant: e,
  onComplete: t,
  textMinLength: r = 20
}) {
  const [i, a] = j(null), [o, s] = j("");
  if (e === "textarea")
    return /* @__PURE__ */ n.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
      /* @__PURE__ */ n.jsx(ue, { children: "// survey · open question" }),
      /* @__PURE__ */ n.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: "What's the single biggest pain point in your growth stack right now?" }),
      /* @__PURE__ */ n.jsx(
        fn,
        {
          value: o,
          onChange: (d) => s(d.target.value),
          placeholder: `Type your answer… (minimum ${r} characters)`,
          className: "min-h-[180px]"
        }
      ),
      /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ n.jsxs("span", { children: [
          o.length,
          " chars"
        ] }),
        /* @__PURE__ */ n.jsx("span", { children: o.length >= r ? "ready to submit" : `${r - o.length} more to go` })
      ] }),
      /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: o.length < r, onClick: t, children: "Submit feedback" })
    ] });
  const l = e === "text" ? Si : e === "textImage" ? Ti : $i;
  return /* @__PURE__ */ n.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ n.jsx(ue, { children: "// survey · your take helps shape the roadmap" }),
    /* @__PURE__ */ n.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: l.q }),
    e === "text" && /* @__PURE__ */ n.jsx("div", { className: "flex flex-col gap-2", children: l.choices.map((d) => {
      const c = i === d.id;
      return /* @__PURE__ */ n.jsxs(ce, { selected: c, onClick: () => a(d.id), layout: "row", children: [
        /* @__PURE__ */ n.jsx(
          "span",
          {
            className: `w-[18px] h-[18px] rounded-full border-2 grid place-items-center shrink-0 ${c ? "border-accent" : "border-border"}`,
            children: c && /* @__PURE__ */ n.jsx("span", { className: "w-2 h-2 rounded-full bg-primary" })
          }
        ),
        /* @__PURE__ */ n.jsx("span", { className: "flex-1 text-sm", children: d.label })
      ] }, d.id);
    }) }),
    e === "textImage" && /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: l.choices.map((d) => {
      const c = i === d.id;
      return /* @__PURE__ */ n.jsxs(
        ce,
        {
          selected: c,
          onClick: () => a(d.id),
          layout: "column",
          children: [
            /* @__PURE__ */ n.jsx("div", { className: "aspect-[16/10] rounded-md overflow-hidden", children: /* @__PURE__ */ n.jsx(
              Ht,
              {
                shape: ["hex", "circle", "diamond", "square"][d.id.charCodeAt(0) - 97],
                tint: d.tint
              }
            ) }),
            /* @__PURE__ */ n.jsx("div", { className: "text-left text-[13px]", children: d.label })
          ]
        },
        d.id
      );
    }) }),
    e === "imageOnly" && /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: l.choices.map((d) => {
      const c = i === d.id;
      return /* @__PURE__ */ n.jsx(
        ce,
        {
          selected: c,
          onClick: () => a(d.id),
          layout: "column",
          children: /* @__PURE__ */ n.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ n.jsx(Ht, { shape: d.shape, tint: d.tint }) })
        },
        d.id
      );
    }) }),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !i, onClick: t, children: "Submit" })
  ] });
}
function Pi({
  onComplete: e,
  word: t = "GROWQUEST",
  maxWrong: r = 6,
  category: i = "growth engine brand"
}) {
  const [a, o] = j([]), s = a.filter((c) => !t.includes(c)), l = t.split("").every((c) => a.includes(c)), d = s.length >= r;
  return /* @__PURE__ */ n.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ n.jsxs(ue, { children: [
      "// hangman · guess the word · ",
      r - s.length,
      " lives"
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "text-sm text-ink-dim", children: [
      "Category: ",
      i
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "grid items-center gap-4 grid-cols-[120px_1fr] max-[720px]:grid-cols-[80px_1fr] max-[720px]:gap-2.5", children: [
      /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 100 130", width: "100", height: "130", children: [
        /* @__PURE__ */ n.jsx("line", { x1: "10", y1: "125", x2: "90", y2: "125", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ n.jsx("line", { x1: "30", y1: "125", x2: "30", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ n.jsx("line", { x1: "30", y1: "10", x2: "75", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ n.jsx("line", { x1: "75", y1: "10", x2: "75", y2: "25", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        s.length > 0 && /* @__PURE__ */ n.jsx("circle", { cx: "75", cy: "34", r: "9", fill: "none", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 1 && /* @__PURE__ */ n.jsx("line", { x1: "75", y1: "43", x2: "75", y2: "75", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 2 && /* @__PURE__ */ n.jsx("line", { x1: "75", y1: "55", x2: "62", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 3 && /* @__PURE__ */ n.jsx("line", { x1: "75", y1: "55", x2: "88", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 4 && /* @__PURE__ */ n.jsx("line", { x1: "75", y1: "75", x2: "65", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" }),
        s.length > 5 && /* @__PURE__ */ n.jsx("line", { x1: "75", y1: "75", x2: "85", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "flex gap-1.5 flex-wrap", children: t.split("").map((c, u) => /* @__PURE__ */ n.jsx(
        "span",
        {
          className: `w-7 h-9 border-b-2 border-ink-dim grid place-items-center font-mono text-xl font-bold ${a.includes(c) ? "text-primary" : "text-transparent"}`,
          children: c
        },
        u
      )) })
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "grid gap-1 grid-cols-9 max-[720px]:grid-cols-7 max-[420px]:grid-cols-6", children: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => {
      const u = a.includes(c), m = u && !t.includes(c), b = u && t.includes(c);
      return /* @__PURE__ */ n.jsx(
        "button",
        {
          disabled: u || l || d,
          onClick: () => o([...a, c]),
          className: `py-2 px-0 rounded-[5px] border border-border font-mono text-xs font-bold ${u ? "opacity-70" : "opacity-100"} ${b ? "bg-primary-soft text-primary" : m ? "text-danger" : "bg-panel-2 text-ink"}`,
          style: {
            background: m ? "color-mix(in oklch, var(--danger) 18%, transparent)" : void 0
          },
          children: c
        },
        c
      );
    }) }),
    (l || d) && /* @__PURE__ */ n.jsx(
      "div",
      {
        className: `p-3 rounded-lg text-[13px] border ${l ? "border-accent-lime" : "border-danger"}`,
        style: {
          background: l ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)"
        },
        children: l ? /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx("strong", { children: "Solved!" }),
          " You cracked ",
          t,
          "."
        ] }) : /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
          /* @__PURE__ */ n.jsx("strong", { children: "Game over." }),
          " The word was ",
          /* @__PURE__ */ n.jsx("strong", { children: t }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !l && !d, onClick: e, children: "Continue" })
  ] });
}
const zi = [
  { q: "How many tiers are in GrowQuest?", choices: ["2", "3", "4", "5"], correct: 2 },
  {
    q: "What currency powers redemptions?",
    choices: ["USD", "XP", "Tokens", "Credits"],
    correct: 1
  },
  { q: "Streak bonus milestone lands at day…", choices: ["3", "5", "7", "10"], correct: 2 }
];
function Ri({
  onComplete: e,
  questions: t = zi,
  timeLimit: r = 15,
  passScore: i = 2
}) {
  const [a, o] = j(0), [s, l] = j(null), [d, c] = j(0), [u, m] = j(r), [b, v] = j("answering");
  G(() => {
    if (b !== "answering") return;
    if (u <= 0) {
      v("reveal");
      return;
    }
    const w = setTimeout(() => m(u - 1), 1e3);
    return () => clearTimeout(w);
  }, [u, b]), G(() => {
    m(r), l(null), v("answering");
  }, [a, r]);
  const k = t[a], C = s === k.correct;
  function M(w) {
    b === "answering" && (l(w), v("reveal"), w === k.correct && c((_) => _ + 1));
  }
  function E() {
    a === t.length - 1 ? v("done") : o(a + 1);
  }
  if (b === "done") {
    const w = Math.round(d / t.length * 100), _ = d >= i;
    return /* @__PURE__ */ n.jsxs("div", { className: "p-7 text-center", children: [
      /* @__PURE__ */ n.jsx("div", { className: "w-[120px] h-[120px] mx-auto mb-4 relative", children: /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 120 120", children: [
        /* @__PURE__ */ n.jsx("circle", { cx: "60", cy: "60", r: "50", fill: "none", stroke: "var(--panel-2)", strokeWidth: "10" }),
        /* @__PURE__ */ n.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "50",
            fill: "none",
            stroke: _ ? "var(--accent-lime)" : "var(--danger)",
            strokeWidth: "10",
            strokeDasharray: 2 * Math.PI * 50,
            strokeDashoffset: 2 * Math.PI * 50 * (1 - w / 100),
            transform: "rotate(-90 60 60)",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ n.jsxs(
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
              d,
              "/",
              t.length
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ n.jsx("div", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-1.5", children: "// trivia complete" }),
      /* @__PURE__ */ n.jsx("h3", { className: "display m-0 mb-2 text-[22px] tracking-[-0.02em]", children: _ ? "Nice run!" : "Keep training." }),
      /* @__PURE__ */ n.jsx("p", { className: "text-ink-dim text-[13px] mb-4", children: _ ? "You beat the bar — XP unlocked." : `Needed ${i}/${t.length} to pass. Try again tomorrow for another shot.` }),
      /* @__PURE__ */ n.jsx(T, { variant: "primary", className: "w-full", onClick: e, children: "Continue" })
    ] });
  }
  return /* @__PURE__ */ n.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ n.jsxs(ue, { children: [
        "// trivia · q",
        a + 1,
        " / ",
        t.length
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ n.jsxs(bi, { tone: "accent", children: [
          "SCORE ",
          d
        ] }),
        /* @__PURE__ */ n.jsxs(
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
    /* @__PURE__ */ n.jsx("div", { className: "h-1 bg-panel-2 rounded-full overflow-hidden", children: /* @__PURE__ */ n.jsx(
      "div",
      {
        className: `h-full transition-[width] duration-1000 ease-linear ${u < 5 ? "bg-danger" : "bg-primary"}`,
        style: { width: `${u / r * 100}%` }
      }
    ) }),
    /* @__PURE__ */ n.jsx("div", { className: "text-[18px] font-semibold leading-snug py-2.5 px-0", children: k.q }),
    /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-2 gap-2", children: k.choices.map((w, _) => {
      const I = s === _, f = b === "reveal" && _ === k.correct, S = b === "reveal" && I && !C;
      return /* @__PURE__ */ n.jsxs(
        "button",
        {
          disabled: b !== "answering",
          onClick: () => M(_),
          className: `py-4 px-3.5 rounded-lg text-left flex items-center gap-2.5 text-sm border ${f ? "border-accent-lime" : S ? "border-danger" : I ? "border-accent" : "border-border"} ${f || S ? "" : "bg-panel-2"}`,
          style: f ? { background: "color-mix(in oklch, var(--accent-lime) 14%, transparent)" } : S ? { background: "color-mix(in oklch, var(--danger) 14%, transparent)" } : void 0,
          children: [
            /* @__PURE__ */ n.jsx("span", { className: "mono w-[22px] h-[22px] rounded-[4px] border border-border bg-panel grid place-items-center text-[11px] font-bold", children: String.fromCharCode(65 + _) }),
            /* @__PURE__ */ n.jsx("span", { children: w })
          ]
        },
        _
      );
    }) }),
    b === "reveal" && /* @__PURE__ */ n.jsx(T, { variant: "primary", onClick: E, children: a === t.length - 1 ? "See results" : "Next question" })
  ] });
}
function Ai(e) {
  const t = e.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (t) return { kind: "youtube", id: t[1] };
  const r = e.match(/vimeo\.com\/(\d+)/);
  return r ? { kind: "vimeo", id: r[1] } : { kind: "native" };
}
function Oi({ url: e, onComplete: t }) {
  const [r, i] = j(!1), [a, o] = j(10), s = Ai(e);
  return G(() => {
    if (s.kind === "native") return;
    const l = setInterval(() => {
      o((d) => d <= 1 ? (clearInterval(l), i(!0), 0) : d - 1);
    }, 1e3);
    return () => clearInterval(l);
  }, [s.kind]), /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "relative pb-[56.25%] bg-panel-2 rounded-lg overflow-hidden", children: [
      s.kind === "youtube" && /* @__PURE__ */ n.jsx(
        "iframe",
        {
          title: "YouTube video player",
          className: "absolute inset-0 w-full h-full border-none",
          src: `https://www.youtube.com/embed/${s.id}?autoplay=1`,
          allow: "autoplay; encrypted-media",
          allowFullScreen: !0
        }
      ),
      s.kind === "vimeo" && /* @__PURE__ */ n.jsx(
        "iframe",
        {
          title: "Vimeo video player",
          className: "absolute inset-0 w-full h-full border-none",
          src: `https://player.vimeo.com/video/${s.id}?autoplay=1`,
          allow: "autoplay; fullscreen",
          allowFullScreen: !0
        }
      ),
      s.kind === "native" && /* @__PURE__ */ n.jsx(
        "video",
        {
          className: "absolute inset-0 w-full h-full",
          src: e,
          controls: !0,
          onEnded: () => i(!0),
          children: /* @__PURE__ */ n.jsx("track", { kind: "captions" })
        }
      )
    ] }),
    s.kind !== "native" && !r && /* @__PURE__ */ n.jsxs("div", { className: "text-xs text-ink-dim text-center", children: [
      "Button available in ",
      a,
      "s"
    ] }),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !r, onClick: t, className: "w-full", children: "I've watched it" })
  ] });
}
function Ii({
  url: e,
  onComplete: t
}) {
  const [r, i] = j(!1), [a, o] = j(60), [s, l] = j(!1);
  G(() => {
    if (!r) return;
    const c = setInterval(() => {
      o((u) => u <= 1 ? (clearInterval(c), l(!0), 0) : u - 1);
    }, 1e3);
    return () => clearInterval(c);
  }, [r]);
  const d = r ? Math.round((60 - a) / 60 * 100) : 0;
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "p-4 bg-panel-2 border border-border rounded-[10px] flex flex-col gap-2", children: [
      /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim font-mono uppercase tracking-[0.06em]", children: "Article" }),
      /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-[15px]", children: "How XP & Levels work in GrowQuest" }),
      e && /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim", children: e.replace(/^https?:\/\//, "") })
    ] }),
    r ? /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between text-xs text-ink-dim", children: [
        /* @__PURE__ */ n.jsx("span", { children: s ? "Reading complete!" : `Reading… ${a}s remaining` }),
        /* @__PURE__ */ n.jsxs("span", { children: [
          d,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "h-1 bg-panel-2 rounded-sm overflow-hidden", children: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: "h-full bg-primary rounded-sm transition-[width] duration-1000 ease-linear",
          style: { width: `${d}%` }
        }
      ) })
    ] }) : /* @__PURE__ */ n.jsx(
      T,
      {
        variant: "ghost",
        onClick: () => {
          e && window.open(e, "_blank"), i(!0);
        },
        className: "w-full",
        children: "Open article ↗"
      }
    ),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !s, onClick: t, className: "w-full", children: "Mark as read" })
  ] });
}
function Fi({ onComplete: e }) {
  const [t, r] = j(""), [i, a] = j(""), o = [t.length > 0, i.length > 0].filter(Boolean).length;
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsx(
      gi,
      {
        label: "Display name",
        placeholder: "Your name",
        value: t,
        onChange: (s) => r(s.target.value)
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ n.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: "Bio" }),
      /* @__PURE__ */ n.jsx(
        fn,
        {
          placeholder: "Tell us about yourself…",
          value: i,
          onChange: (s) => a(s.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2 text-xs text-ink-dim", children: [
      /* @__PURE__ */ n.jsx("div", { className: "flex-1 h-1 bg-panel-2 rounded-sm overflow-hidden", children: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: `h-full rounded-sm transition-[width] duration-300 ease-out ${o === 2 ? "bg-accent-lime" : "bg-primary"}`,
          style: { width: `${o / 2 * 100}%` }
        }
      ) }),
      /* @__PURE__ */ n.jsxs("span", { className: "whitespace-nowrap", children: [
        o,
        "/2 fields"
      ] })
    ] }),
    /* @__PURE__ */ n.jsx(
      T,
      {
        variant: "primary",
        disabled: t.length === 0,
        onClick: e,
        className: "w-full",
        children: "Save profile"
      }
    )
  ] });
}
function Li({ onComplete: e }) {
  const [t, r] = j(null), [i, a] = j(null), o = Xt(null);
  function s(l) {
    a(l.name);
    const d = new FileReader();
    d.onload = (c) => {
      var u;
      return r((u = c.target) == null ? void 0 : u.result);
    }, d.readAsDataURL(l);
  }
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (l) => {
          var d;
          (d = l.target.files) != null && d[0] && s(l.target.files[0]);
        }
      }
    ),
    t ? /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ n.jsx(
        "img",
        {
          src: t,
          alt: "Preview",
          className: "w-[88px] h-[88px] rounded-full object-cover border-2 border-accent"
        }
      ),
      /* @__PURE__ */ n.jsx("span", { className: "text-xs text-ink-dim", children: i }),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => {
            r(null), a(null);
          },
          className: "text-xs text-ink-dim bg-transparent border-none cursor-pointer underline",
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ n.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var l;
          return (l = o.current) == null ? void 0 : l.click();
        },
        onKeyDown: (l) => {
          var d;
          (l.key === "Enter" || l.key === " ") && ((d = o.current) == null || d.click());
        },
        onDragOver: (l) => l.preventDefault(),
        onDrop: (l) => {
          l.preventDefault(), l.dataTransfer.files[0] && s(l.dataTransfer.files[0]);
        },
        className: "border-2 border-dashed border-border rounded-[10px] py-8 px-4 text-center cursor-pointer text-ink-dim text-[13px] transition-colors duration-150",
        children: [
          /* @__PURE__ */ n.jsx("div", { className: "text-[28px] mb-2", children: "📷" }),
          /* @__PURE__ */ n.jsx("div", { children: "Click or drag to upload a photo" }),
          /* @__PURE__ */ n.jsx("div", { className: "text-[11px] mt-1", children: "PNG, JPG up to 5 MB" })
        ]
      }
    ),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !t, onClick: e, className: "w-full", children: "Save photo" })
  ] });
}
function Bi({
  email: e,
  onComplete: t
}) {
  const [r, i] = j(""), [a, o] = j(0);
  return G(() => {
    if (a <= 0) return;
    const s = setInterval(() => o((l) => Math.max(0, l - 1)), 1e3);
    return () => clearInterval(s);
  }, [a]), /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-[15px] mb-1", children: "Enter the 6-digit code" }),
      /* @__PURE__ */ n.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Sent to ",
        e ?? "your email"
      ] })
    ] }),
    /* @__PURE__ */ n.jsx(
      Te,
      {
        type: "text",
        inputMode: "numeric",
        maxLength: 6,
        placeholder: "000000",
        value: r,
        onChange: (s) => i(s.target.value.replace(/\D/g, "").slice(0, 6)),
        className: "font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
      }
    ),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: r.length < 6, onClick: t, className: "w-full", children: "Verify" }),
    /* @__PURE__ */ n.jsx(
      "button",
      {
        disabled: a > 0,
        onClick: () => o(30),
        className: `bg-transparent border-none text-xs text-center ${a > 0 ? "cursor-not-allowed text-ink-dim no-underline" : "cursor-pointer text-primary underline"}`,
        children: a > 0 ? `Resend in ${a}s` : "Resend code"
      }
    )
  ] });
}
const Di = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+61", flag: "🇦🇺", name: "AU" }
];
function Hi({ onComplete: e }) {
  const [t, r] = j("phone"), [i, a] = j("+1"), [o, s] = j(""), [l, d] = j("");
  return t === "otp" ? /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-[15px] mb-1", children: "Enter the 6-digit code" }),
      /* @__PURE__ */ n.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Sent to ",
        i,
        " ",
        o
      ] })
    ] }),
    /* @__PURE__ */ n.jsx(
      Te,
      {
        type: "text",
        inputMode: "numeric",
        maxLength: 6,
        placeholder: "000000",
        value: l,
        onChange: (c) => d(c.target.value.replace(/\D/g, "").slice(0, 6)),
        className: "font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
      }
    ),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: l.length < 6, onClick: e, className: "w-full", children: "Verify" }),
    /* @__PURE__ */ n.jsx(
      "button",
      {
        onClick: () => {
          r("phone"), d("");
        },
        className: "bg-transparent border-none cursor-pointer text-xs text-primary underline text-center",
        children: "Change number"
      }
    )
  ] }) : /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { children: [
      /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim mb-1.5", children: "Country" }),
      /* @__PURE__ */ n.jsx(
        "select",
        {
          className: "input w-full",
          value: i,
          onChange: (c) => a(c.target.value),
          children: Di.map(({ code: c, flag: u, name: m }) => /* @__PURE__ */ n.jsxs("option", { value: c, children: [
            u,
            " ",
            m,
            " (",
            c,
            ")"
          ] }, c))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { children: [
      /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim mb-1.5", children: "Phone number" }),
      /* @__PURE__ */ n.jsx(
        Te,
        {
          type: "tel",
          placeholder: "Phone number",
          value: o,
          onChange: (c) => s(c.target.value.replace(/[^0-9]/g, ""))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx(
      T,
      {
        variant: "primary",
        disabled: o.length < 6,
        onClick: () => r("otp"),
        className: "w-full",
        children: "Send OTP"
      }
    )
  ] });
}
const _e = ["50 XP", "100 XP", "Miss", "200 XP", "75 XP", "Bonus!", "150 XP", "Miss"];
function Xi(e) {
  const t = (e % 360 + 360) % 360, r = Math.floor((360 - t) / (360 / _e.length)) % _e.length;
  return _e[r];
}
function qi({ onComplete: e }) {
  const [t, r] = j(!1), [i, a] = j(0), [o, s] = j(null);
  function l() {
    if (t) return;
    const b = 1440 + Math.floor(Math.random() * 360), v = i + b;
    r(!0), a(v), setTimeout(() => {
      s(Xi(v)), r(!1);
    }, 3100);
  }
  const d = 240, c = d / 2, u = _e.length, m = 2 * Math.PI / u;
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col items-center gap-5 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "relative w-[240px] h-[240px]", children: [
      /* @__PURE__ */ n.jsx(
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
      /* @__PURE__ */ n.jsxs(
        "svg",
        {
          width: d,
          height: d,
          style: {
            transform: `rotate(${i}deg)`,
            transition: t ? "transform 3s cubic-bezier(.17,.67,.12,.99)" : "none"
          },
          children: [
            _e.map((b, v) => {
              const k = v * m - Math.PI / 2, C = (v + 1) * m - Math.PI / 2, M = c + c * Math.cos(k), E = c + c * Math.sin(k), w = c + c * Math.cos(C), _ = c + c * Math.sin(C), I = k + m / 2, f = c + c * 0.65 * Math.cos(I), S = c + c * 0.65 * Math.sin(I);
              return /* @__PURE__ */ n.jsxs("g", { children: [
                /* @__PURE__ */ n.jsx(
                  "path",
                  {
                    d: `M${c},${c} L${M},${E} A${c},${c} 0 0,1 ${w},${_} Z`,
                    fill: v % 2 === 0 ? "var(--panel)" : "var(--panel-2)",
                    stroke: "var(--border)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ n.jsx(
                  "text",
                  {
                    x: f,
                    y: S,
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    transform: `rotate(${I * 180 / Math.PI + 90}, ${f}, ${S})`,
                    style: {
                      fontSize: 9,
                      fill: "var(--ink)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700
                    },
                    children: b
                  }
                )
              ] }, v);
            }),
            /* @__PURE__ */ n.jsx(
              "circle",
              {
                cx: c,
                cy: c,
                r: 18,
                fill: "var(--panel)",
                stroke: "var(--border)",
                strokeWidth: "2"
              }
            ),
            /* @__PURE__ */ n.jsx("circle", { cx: c, cy: c, r: 6, fill: "var(--color-primary)" })
          ]
        }
      )
    ] }),
    o && /* @__PURE__ */ n.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ n.jsx("div", { className: "text-[13px] text-ink-dim", children: "You got" }),
      /* @__PURE__ */ n.jsx("div", { className: "text-[22px] font-bold text-primary", children: o })
    ] }),
    o ? /* @__PURE__ */ n.jsx(T, { variant: "primary", onClick: e, className: "w-full", children: "Claim reward" }) : /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: t, onClick: l, className: "w-full", children: t ? "Spinning…" : "Spin the wheel" })
  ] });
}
const Ie = 16;
function Wi({
  reward: e = "200 XP",
  onComplete: t
}) {
  const [r, i] = j(/* @__PURE__ */ new Set()), [a, o] = j(!1);
  function s(c) {
    a || i((u) => {
      const m = new Set(u);
      return m.add(c), m.size / Ie * 100 >= 75 && !a && (o(!0), setTimeout(t, 1500)), m;
    });
  }
  function l() {
    const c = new Set(Array.from({ length: Ie }, (u, m) => m));
    i(c), o(!0), setTimeout(t, 1500);
  }
  const d = Math.round(r.size / Ie * 100);
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col items-center gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "relative w-[280px]", children: [
      /* @__PURE__ */ n.jsx("div", { className: "h-[140px] grid place-items-center bg-panel-2 border border-border rounded-[10px]", children: /* @__PURE__ */ n.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ n.jsx("div", { className: "text-[11px] text-ink-dim mb-1 font-mono uppercase tracking-[0.06em]", children: "You won" }),
        /* @__PURE__ */ n.jsx("div", { className: "text-[32px] font-extrabold text-primary", children: e })
      ] }) }),
      /* @__PURE__ */ n.jsx(
        "div",
        {
          className: `absolute inset-0 rounded-[10px] grid grid-cols-4 gap-0.5 p-0.5 ${a ? "pointer-events-none" : "pointer-events-auto"}`,
          children: Array.from({ length: Ie }, (c, u) => /* @__PURE__ */ n.jsx(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Scratch tile ${u + 1}`,
              onClick: () => s(u),
              onKeyDown: (m) => {
                (m.key === "Enter" || m.key === " ") && s(u);
              },
              onMouseEnter: (m) => {
                m.buttons === 1 && s(u);
              },
              className: `rounded-md cursor-pointer transition-[background] duration-150 min-h-8 ${r.has(u) ? "bg-transparent border-none" : "bg-panel border border-border"}`
            },
            u
          ))
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: `text-xs text-center ${a ? "text-primary" : "text-ink-dim"}`, children: a ? `🎉 You revealed: ${e}` : `Scratch to reveal… ${d}% uncovered` }),
    !a && /* @__PURE__ */ n.jsx(
      "button",
      {
        onClick: l,
        className: "bg-transparent border-none cursor-pointer text-[11px] text-ink-dim underline",
        children: "Reveal all"
      }
    )
  ] });
}
const Ui = [
  { id: "b1", name: "First Quest", got: !0, desc: "Completed your first mission." },
  { id: "b2", name: "Streak ×7", got: !0, desc: "7-day streak maintained." },
  { id: "b3", name: "Evangelist", got: !1, desc: "Refer 10 teammates." },
  { id: "b4", name: "Lorekeeper", got: !1, desc: "Complete all weekly quizzes." }
];
function Yi({
  badges: e = Ui,
  goal: t = 3,
  earned: r,
  onComplete: i
}) {
  const a = r ?? e.filter((s) => s.got).length, o = a >= t;
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between text-xs text-ink-dim", children: [
        /* @__PURE__ */ n.jsx("span", { children: "Badges collected" }),
        /* @__PURE__ */ n.jsxs("span", { className: o ? "text-accent-lime" : "text-ink", children: [
          a,
          "/",
          t
        ] })
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "h-1.5 bg-panel-2 rounded-[3px] overflow-hidden", children: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: `h-full rounded-[3px] transition-[width] duration-[400ms] ease-out ${o ? "bg-accent-lime" : "bg-primary"}`,
          style: {
            width: `${Math.min(100, a / t * 100)}%`
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-2 gap-2", children: e.map((s) => /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: `p-3 bg-panel-2 rounded-lg flex flex-col gap-1 border ${s.got ? "border-solid border-accent opacity-100" : "border-dashed border-border opacity-45"}`,
        children: [
          /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ n.jsx("span", { className: "text-[18px]", children: "🏅" }),
            s.got && /* @__PURE__ */ n.jsx("span", { className: "text-[10px] text-[#05060A] bg-primary py-px px-1.5 rounded-[4px] font-bold", children: "✓" })
          ] }),
          /* @__PURE__ */ n.jsx("div", { className: "text-xs font-semibold", children: s.name })
        ]
      },
      s.id
    )) }),
    !o && /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim text-center", children: "Keep completing missions to earn more badges" }),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !o, onClick: i, className: "w-full", children: o ? "Claim XP" : `Earn ${t - a} more badge${t - a !== 1 ? "s" : ""}` })
  ] });
}
function Gi({
  referralLink: e = "https://app.growquest.io/ref/demo-abc123",
  onComplete: t
}) {
  const [r, i] = j(!1), [a, o] = j(!1), s = r || a;
  function l() {
    navigator.clipboard.writeText(e).then(() => {
      i(!0), setTimeout(() => i(!1), 2e3), o(!0);
    });
  }
  function d(c) {
    const u = encodeURIComponent, m = {
      x: `https://x.com/intent/tweet?text=${u("Join me on GrowQuest! " + e)}`,
      whatsapp: `https://wa.me/?text=${u("Join me on GrowQuest! " + e)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${u(e)}`
    };
    window.open(m[c], "_blank"), o(!0);
  }
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { children: [
      /* @__PURE__ */ n.jsx("div", { className: "text-[11px] text-ink-dim font-mono uppercase tracking-[0.06em] mb-1.5", children: "Your referral link" }),
      /* @__PURE__ */ n.jsxs("div", { className: "flex gap-2 py-2.5 px-3 bg-panel-2 border border-border rounded-lg items-center", children: [
        /* @__PURE__ */ n.jsx("span", { className: "flex-1 font-mono text-xs text-ink-dim overflow-hidden text-ellipsis whitespace-nowrap", children: e }),
        /* @__PURE__ */ n.jsx(
          "button",
          {
            onClick: l,
            className: `py-1 px-2.5 rounded-[5px] border border-border text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-150 ${r ? "bg-primary" : "bg-panel text-ink"}`,
            style: r ? { color: "#05060A" } : void 0,
            children: r ? "Copied ✓" : "Copy"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { children: [
      /* @__PURE__ */ n.jsx("div", { className: "text-[11px] text-ink-dim mb-2", children: "Share via" }),
      /* @__PURE__ */ n.jsx("div", { className: "flex gap-2", children: [
        { id: "x", label: "𝕏" },
        { id: "whatsapp", label: "💬" },
        { id: "linkedin", label: "in" }
      ].map(({ id: c, label: u }) => /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => d(c),
          className: "py-2 px-3.5 rounded-md border border-border bg-panel-2 text-ink text-sm font-bold cursor-pointer",
          children: u
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim", children: "0 friends signed up · goal: 1" }),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !s, onClick: t, className: "w-full", children: "Done" })
  ] });
}
function Ji({
  shareText: e = "Check out GrowQuest — earn XP for real actions!",
  shareUrl: t = "https://growquest.io",
  onComplete: r
}) {
  const [i, a] = j(!1);
  function o(d) {
    const c = encodeURIComponent, u = {
      x: `https://x.com/intent/tweet?text=${c(e)}&url=${c(t)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${c(t)}`,
      whatsapp: `https://wa.me/?text=${c(e + " " + t)}`
    };
    window.open(u[d], "_blank"), a(!0);
  }
  function s() {
    navigator.clipboard.writeText(t), a(!0);
  }
  const l = [
    { id: "x", label: "𝕏 X / Twitter" },
    { id: "facebook", label: "Facebook" },
    { id: "whatsapp", label: "WhatsApp" }
  ];
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "p-3.5 bg-panel-2 border border-border rounded-[10px]", children: [
      /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-[13px] mb-1", children: e }),
      /* @__PURE__ */ n.jsx("div", { className: "text-[11px] text-ink-dim font-mono", children: t })
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim", children: "Share via" }),
    /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-2", children: [
      l.map(({ id: d, label: c }) => /* @__PURE__ */ n.jsxs(
        "button",
        {
          onClick: () => o(d),
          className: "py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left",
          children: [
            c,
            " ↗"
          ]
        },
        d
      )),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: s,
          className: "py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left",
          children: "📋 Copy link"
        }
      )
    ] }),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", disabled: !i, onClick: r, className: "w-full", children: "Done" })
  ] });
}
function Vi({ onComplete: e }) {
  const [t, r] = j(""), [i, a] = j([]);
  function o() {
    t.includes("@") && (a((l) => [...l, t]), r(""));
  }
  const s = t.includes("@");
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ n.jsx(
        Te,
        {
          type: "email",
          placeholder: "friend@example.com",
          value: t,
          onChange: (l) => r(l.target.value),
          onKeyDown: (l) => {
            l.key === "Enter" && o();
          },
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: o,
          disabled: !s,
          className: `py-0 px-4 rounded-lg border border-border text-xs font-bold whitespace-nowrap transition-all duration-150 ${s ? "bg-primary cursor-pointer" : "bg-panel-2 text-ink-dim cursor-not-allowed"}`,
          style: s ? { color: "#05060A" } : void 0,
          children: "Send"
        }
      )
    ] }),
    i.length === 0 ? /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim text-center py-3 px-0", children: "No invites sent yet" }) : /* @__PURE__ */ n.jsx("div", { className: "flex flex-col gap-1.5", children: i.map((l, d) => /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: "flex items-center gap-2 py-1.5 px-2.5 bg-panel-2 rounded-md text-xs",
        children: [
          /* @__PURE__ */ n.jsx("span", { className: "w-4 h-4 rounded-full bg-accent-lime text-[#05060A] grid place-items-center text-[9px] font-bold", children: "✓" }),
          /* @__PURE__ */ n.jsx("span", { className: "text-ink flex-1", children: l })
        ]
      },
      d
    )) }),
    /* @__PURE__ */ n.jsx(
      T,
      {
        variant: "primary",
        disabled: i.length === 0,
        onClick: e,
        className: "w-full",
        children: i.length === 0 ? "Send at least 1 invite" : `Done · ${i.length} invite${i.length !== 1 ? "s" : ""} sent`
      }
    )
  ] });
}
function Qi({ onComplete: e }) {
  const [t, r] = j(null), [i, a] = j(null), [o, s] = j(!1), l = Xt(null);
  function d(c) {
    a(c.name);
    const u = new FileReader();
    u.onload = (m) => {
      var b;
      return r((b = m.target) == null ? void 0 : b.result);
    }, u.readAsDataURL(c);
  }
  return o ? /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col items-center gap-5 py-8 px-6", children: [
    /* @__PURE__ */ n.jsx("div", { className: "text-[48px]", children: "⏳" }),
    /* @__PURE__ */ n.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-[15px] mb-1.5", children: "Photo submitted — pending review" }),
      /* @__PURE__ */ n.jsx("div", { className: "text-[13px] text-ink-dim leading-normal", children: "Our team will review your photo and approve it within 24h. You'll be notified when XP is credited." })
    ] }),
    /* @__PURE__ */ n.jsx(T, { variant: "primary", onClick: e, className: "w-full", children: "Got it" })
  ] }) : /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ n.jsx(
      "input",
      {
        ref: l,
        type: "file",
        accept: "image/*",
        capture: "environment",
        className: "hidden",
        onChange: (c) => {
          var u;
          (u = c.target.files) != null && u[0] && d(c.target.files[0]);
        }
      }
    ),
    t ? /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-2.5", children: [
      /* @__PURE__ */ n.jsx(
        "img",
        {
          src: t,
          alt: "Proof",
          className: "w-full max-h-[220px] object-cover rounded-lg border border-border"
        }
      ),
      /* @__PURE__ */ n.jsx("div", { className: "text-xs text-ink-dim", children: i }),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: () => {
            r(null), a(null);
          },
          className: "bg-transparent border-none cursor-pointer text-xs text-ink-dim underline text-left",
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ n.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var c;
          return (c = l.current) == null ? void 0 : c.click();
        },
        onKeyDown: (c) => {
          var u;
          (c.key === "Enter" || c.key === " ") && ((u = l.current) == null || u.click());
        },
        onDragOver: (c) => c.preventDefault(),
        onDrop: (c) => {
          c.preventDefault(), c.dataTransfer.files[0] && d(c.dataTransfer.files[0]);
        },
        className: "border-2 border-dashed border-border rounded-[10px] py-9 px-4 text-center cursor-pointer text-ink-dim text-[13px]",
        children: [
          /* @__PURE__ */ n.jsx("div", { className: "text-[32px] mb-2", children: "📸" }),
          /* @__PURE__ */ n.jsx("div", { className: "font-medium mb-1", children: "Upload photo proof" }),
          /* @__PURE__ */ n.jsx("div", { className: "text-[11px]", children: "Click to snap or choose a file · JPG, PNG" })
        ]
      }
    ),
    /* @__PURE__ */ n.jsx(
      T,
      {
        variant: "primary",
        disabled: !t,
        onClick: () => s(!0),
        className: "w-full",
        children: "Submit for review"
      }
    )
  ] });
}
function Zi({ platform: e }) {
  const t = e;
  return t === "Instagram" ? /* @__PURE__ */ n.jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", children: [
    /* @__PURE__ */ n.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "4", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ n.jsx("circle", { cx: "17.5", cy: "6.5", r: "1.2", fill: "currentColor" })
  ] }) : t === "Twitter" ? /* @__PURE__ */ n.jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ n.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }) : t === "YouTube" ? /* @__PURE__ */ n.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: [
        /* @__PURE__ */ n.jsx("rect", { x: "2", y: "5", width: "20", height: "14", rx: "3" }),
        /* @__PURE__ */ n.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor", stroke: "none" })
      ]
    }
  ) : t === "Telegram" ? /* @__PURE__ */ n.jsx(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: /* @__PURE__ */ n.jsx("path", { d: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z", strokeLinejoin: "round" })
    }
  ) : /* @__PURE__ */ n.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: [
        /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ n.jsx("path", { d: "M8 12h8M12 8v8" })
      ]
    }
  );
}
function Ki({
  platform: e = "Instagram",
  handle: t = "@growquest",
  url: r = "https://instagram.com/growquest",
  onComplete: i
}) {
  const [a, o] = j(!1);
  return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col items-center gap-6 py-8 px-6", children: [
    /* @__PURE__ */ n.jsx("div", { className: "w-[72px] h-[72px] rounded-[18px] bg-panel-2 border border-border grid place-items-center text-primary", children: /* @__PURE__ */ n.jsx(Zi, { platform: e }) }),
    /* @__PURE__ */ n.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ n.jsx("div", { className: "font-bold text-[22px] tracking-[-0.02em] mb-1", children: t }),
      /* @__PURE__ */ n.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Follow us on ",
        e,
        " to earn XP"
      ] })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ n.jsxs(
        T,
        {
          variant: "primary",
          onClick: () => {
            window.open(r, "_blank"), o(!0);
          },
          className: "w-full",
          children: [
            "Open ",
            e,
            " ↗"
          ]
        }
      ),
      /* @__PURE__ */ n.jsx(
        T,
        {
          variant: a ? "primary" : "ghost",
          disabled: !a,
          onClick: i,
          className: "w-full",
          children: "I've followed"
        }
      )
    ] })
  ] });
}
const eo = 'a,button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
function to(e, t) {
  G(() => {
    if (!t || !e.current) return;
    const r = e.current, i = Array.from(r.querySelectorAll(eo)), a = i[0], o = i[i.length - 1];
    a == null || a.focus();
    const s = (l) => {
      l.key === "Tab" && (l.shiftKey ? document.activeElement === a && (l.preventDefault(), o == null || o.focus()) : document.activeElement === o && (l.preventDefault(), a == null || a.focus()));
    };
    return r.addEventListener("keydown", s), () => r.removeEventListener("keydown", s);
  }, [t, e]);
}
function go({ m: e, onClose: t, onClaim: r }) {
  const i = gn(
    () => () => {
    },
    () => !0,
    () => !1
  ), a = Xt(null);
  if (to(a, e !== null), !e || !i) return null;
  const o = () => {
    r(e), t();
  };
  let s = null;
  if (e.type === "quiz") {
    const l = e.subtype === "quiz-textImage" ? "textImage" : e.subtype === "quiz-imageOnly" ? "imageOnly" : "text";
    s = /* @__PURE__ */ n.jsx(_i, { variant: l, onComplete: o });
  } else if (e.type === "survey") {
    const l = e.subtype === "survey-textImage" ? "textImage" : e.subtype === "survey-imageOnly" ? "imageOnly" : e.subtype === "survey-textarea" ? "textarea" : "text";
    s = /* @__PURE__ */ n.jsx(Ei, { variant: l, onComplete: o });
  } else e.type === "hangman" ? s = /* @__PURE__ */ n.jsx(Pi, { onComplete: o }) : e.type === "trivia" ? s = /* @__PURE__ */ n.jsx(Ri, { onComplete: o }) : e.type === "video" ? s = /* @__PURE__ */ n.jsx(Oi, { url: e.url ?? "", onComplete: o }) : e.type === "read_article" ? s = /* @__PURE__ */ n.jsx(Ii, { url: e.url, onComplete: o }) : e.type === "profile" ? s = /* @__PURE__ */ n.jsx(Fi, { onComplete: o }) : e.type === "avatar" ? s = /* @__PURE__ */ n.jsx(Li, { onComplete: o }) : e.type === "verify_email" ? s = /* @__PURE__ */ n.jsx(Bi, { onComplete: o }) : e.type === "verify_phone" ? s = /* @__PURE__ */ n.jsx(Hi, { onComplete: o }) : e.type === "spin_wheel" ? s = /* @__PURE__ */ n.jsx(qi, { onComplete: o }) : e.type === "scratch_card" ? s = /* @__PURE__ */ n.jsx(Wi, { onComplete: o }) : e.type === "badge_collect" ? s = /* @__PURE__ */ n.jsx(Yi, { onComplete: o }) : e.type === "refer" ? s = /* @__PURE__ */ n.jsx(Gi, { onComplete: o }) : e.type === "share" ? s = /* @__PURE__ */ n.jsx(Ji, { shareUrl: e.url, onComplete: o }) : e.type === "invite" ? s = /* @__PURE__ */ n.jsx(Vi, { onComplete: o }) : e.type === "photo_proof" ? s = /* @__PURE__ */ n.jsx(Qi, { onComplete: o }) : (e.type === "follow_social" || e.type === "social") && (s = /* @__PURE__ */ n.jsx(Ki, { url: e.url, onComplete: o }));
  return vn(
    /* @__PURE__ */ n.jsx(
      "div",
      {
        className: "modal-backdrop",
        role: "presentation",
        onClick: (l) => l.target === l.currentTarget && t(),
        onKeyDown: (l) => l.key === "Escape" && t(),
        children: /* @__PURE__ */ n.jsxs("div", { ref: a, className: "modal max-w-[560px]", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ n.jsxs("div", { className: "relative px-6 py-5 border-b border-[color:var(--mission-modal-header-border)] flex items-center gap-3", children: [
            /* @__PURE__ */ n.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ n.jsx("h2", { className: "display m-0 text-[20px] tracking-[-0.02em] text-[color:var(--mission-modal-title)]", children: e.title }),
              /* @__PURE__ */ n.jsxs("div", { className: "flex gap-2 mt-1.5", children: [
                /* @__PURE__ */ n.jsx(Ce, { amount: e.xp }),
                e.limited && e.endsAt && /* @__PURE__ */ n.jsxs(X, { tone: "magenta", children: [
                  "Ends in ",
                  /* @__PURE__ */ n.jsx(un, { endsAt: e.endsAt })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ n.jsx(
              "button",
              {
                onClick: t,
                "aria-label": "Close",
                className: "bg-[var(--mission-modal-close-bg)] border border-[color:var(--mission-modal-close-border)] text-[color:var(--mission-modal-close-icon)] grid place-items-center w-7 h-7 rounded-md",
                children: /* @__PURE__ */ n.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", children: /* @__PURE__ */ n.jsx(
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
          s ?? /* @__PURE__ */ n.jsx("div", { className: "p-6 text-ink-dim text-[13px] text-center", children: "Experience coming soon" })
        ] })
      }
    ),
    document.body
  );
}
function Ne(e) {
  return `var(--tone-${e})`;
}
const vo = Ue(function({
  m: t,
  density: r = "comfortable",
  layout: i = "split",
  onOpen: a
}) {
  const [o, s] = t.progress, l = s > 0 ? o / s : 0, d = r === "compact", c = d ? "p-3.5" : "p-[18px]";
  return i === "stack" ? /* @__PURE__ */ n.jsxs(
    "button",
    {
      onClick: () => a(t),
      className: `mission-card text-left flex flex-col gap-2.5 ${c} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-xl transition-all duration-150`,
      children: [
        /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ n.jsx(
            "div",
            {
              className: "bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-8 h-8 rounded-md",
              style: { color: Ne(t.tone) },
              children: /* @__PURE__ */ n.jsx(Et, { type: t.type, size: 18 })
            }
          ),
          t.limited && /* @__PURE__ */ n.jsxs(X, { tone: "magenta", children: [
            "LIMITED",
            t.endsAt ? /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
              " ",
              "· ",
              /* @__PURE__ */ n.jsx(un, { endsAt: t.endsAt })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ n.jsxs("div", { children: [
          /* @__PURE__ */ n.jsx(
            "div",
            {
              className: `font-semibold mb-1 text-[color:var(--mission-card-title)] ${d ? "text-[13px]" : "text-[15px]"}`,
              children: t.title
            }
          ),
          !d && /* @__PURE__ */ n.jsx("div", { className: "text-xs text-[color:var(--mission-card-body)] leading-relaxed", children: t.desc })
        ] }),
        /* @__PURE__ */ n.jsxs("div", { className: "flex justify-between items-center gap-2.5 mt-auto", children: [
          /* @__PURE__ */ n.jsx(Ce, { amount: t.xp }),
          /* @__PURE__ */ n.jsxs("span", { className: "font-mono text-[11px] text-[color:var(--mission-card-body)]", children: [
            o,
            "/",
            s
          ] })
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "xpbar", style: { height: 4 }, children: /* @__PURE__ */ n.jsx("div", { className: "fill", style: { width: `${l * 100}%` } }) })
      ]
    }
  ) : i === "list" ? /* @__PURE__ */ n.jsxs(
    "button",
    {
      onClick: () => a(t),
      className: `mission-card text-left flex items-center gap-3.5 ${c} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-[10px] w-full`,
      children: [
        /* @__PURE__ */ n.jsx(
          "div",
          {
            className: "bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-10 h-10 rounded-lg shrink-0",
            style: { color: Ne(t.tone) },
            children: /* @__PURE__ */ n.jsx(Et, { type: t.type, size: 20 })
          }
        ),
        /* @__PURE__ */ n.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ n.jsx("div", { className: "font-semibold text-sm mb-0.5 text-[color:var(--mission-card-title)]", children: t.title }),
          /* @__PURE__ */ n.jsx("div", { className: "text-xs text-[color:var(--mission-card-body)] overflow-hidden text-ellipsis whitespace-nowrap", children: t.desc })
        ] }),
        /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2.5 shrink-0", children: [
          t.limited && /* @__PURE__ */ n.jsx(X, { tone: "magenta", children: "LIMITED" }),
          /* @__PURE__ */ n.jsxs("span", { className: "font-mono text-[11px] text-[color:var(--mission-card-body)]", children: [
            o,
            "/",
            s
          ] }),
          /* @__PURE__ */ n.jsx(Ce, { amount: t.xp })
        ] })
      ]
    }
  ) : /* @__PURE__ */ n.jsxs(
    "button",
    {
      onClick: () => a(t),
      className: `mission-card text-left flex flex-col ${c} bg-[var(--mission-card-bg)] border border-[color:var(--mission-card-border)] rounded-xl relative overflow-hidden`,
      children: [
        /* @__PURE__ */ n.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-20 h-20",
            style: {
              opacity: "var(--mission-card-halo-opacity)",
              background: `radial-gradient(circle at 100% 0, ${Ne(t.tone)} 0%, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ n.jsxs(
          "div",
          {
            className: `flex justify-between items-start gap-2 relative ${d ? "mb-2.5" : "mb-3.5"}`,
            children: [
              /* @__PURE__ */ n.jsx(
                "div",
                {
                  className: "bg-[var(--mission-card-icon-bg)] border border-[color:var(--mission-card-icon-border)] grid place-items-center w-[34px] h-[34px] rounded-[7px]",
                  style: { color: Ne(t.tone) },
                  children: /* @__PURE__ */ n.jsx(Et, { type: t.type, size: 18 })
                }
              ),
              t.limited && /* @__PURE__ */ n.jsx(X, { tone: "magenta", children: "⏱ LIMITED" })
            ]
          }
        ),
        /* @__PURE__ */ n.jsx(
          "div",
          {
            className: `font-semibold mb-1 text-[color:var(--mission-card-title)] ${d ? "text-sm" : "text-base"}`,
            children: t.title
          }
        ),
        !d && /* @__PURE__ */ n.jsx("div", { className: "text-xs text-[color:var(--mission-card-body)] leading-relaxed mb-3.5", children: t.desc }),
        /* @__PURE__ */ n.jsxs("div", { className: `flex justify-between items-center gap-2.5 ${d ? "mt-2" : "mt-auto"}`, children: [
          /* @__PURE__ */ n.jsx(Ce, { amount: t.xp }),
          /* @__PURE__ */ n.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold tracking-[0.04em]",
              style: {
                background: Ne(t.tone),
                color: "var(--mission-card-cta-fg)"
              },
              children: [
                "GO",
                /* @__PURE__ */ n.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ n.jsx(
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
}), ro = {
  1: "var(--accent-amber)",
  2: "var(--accent-cyan)",
  3: "var(--accent-magenta)"
}, no = { 1: 180, 2: 150, 3: 130 };
function yo({ entries: e, rankColors: t, platformHeights: r }) {
  const i = t ?? ro, a = r ?? no, o = e.slice(0, 3), s = [o[1], o[0], o[2]].filter(Boolean);
  return /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-3 gap-3.5 mb-7", children: s.map((l) => {
    const d = i[l.rank] ?? "var(--color-primary)", c = a[l.rank] ?? 120;
    return /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col items-center gap-2.5", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ n.jsx(Kt, { seed: l.seed, size: 56 }),
        /* @__PURE__ */ n.jsx(
          "div",
          {
            className: "absolute -bottom-1.5 -right-1.5 w-[22px] h-[22px] rounded-[5px] text-[#05060A] grid place-items-center font-mono text-[11px] font-bold border-2 border-bg",
            style: { background: d },
            children: l.rank
          }
        )
      ] }),
      /* @__PURE__ */ n.jsx("div", { className: "font-bold text-[14px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: l.handle }),
      /* @__PURE__ */ n.jsxs("div", { className: "mono text-[12px] text-ink-dim", children: [
        l.xp.toLocaleString(),
        " XP"
      ] }),
      /* @__PURE__ */ n.jsxs(
        "div",
        {
          className: "w-full rounded-t-lg border border-border border-b-0 relative overflow-hidden",
          style: {
            height: c,
            background: `linear-gradient(180deg, ${d} 0%, transparent 100%)`
          },
          children: [
            /* @__PURE__ */ n.jsx("div", { className: "absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_8px,rgba(0,0,0,0.12)_8px_9px)]" }),
            /* @__PURE__ */ n.jsx("div", { className: "absolute top-2.5 left-2.5 font-mono text-[28px] font-bold text-[#05060A] opacity-80", children: String(l.rank).padStart(2, "0") })
          ]
        }
      )
    ] }, l.rank);
  }) });
}
function jo({
  persona: e,
  xpStyle: t,
  xpMax: r = 12e3,
  label: i = "Progress to Ascendant",
  walletAddress: a = "0xE63F6A · 356C10AC"
}) {
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "bg-[var(--profile-card-bg)] border border-[color:var(--profile-card-border)] rounded-[var(--radius-card,14px)] p-[18px] flex flex-col gap-3.5",
      style: { containerType: "inline-size" },
      children: [
        /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ n.jsx(Kt, { seed: 7, size: 44 }),
          /* @__PURE__ */ n.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ n.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ n.jsxs("span", { className: "font-bold text-[color:var(--profile-card-title)]", children: [
                "@",
                e.handle
              ] }),
              /* @__PURE__ */ n.jsx(X, { tone: "accent", children: e.tier })
            ] }),
            /* @__PURE__ */ n.jsx("div", { className: "font-mono text-[11px] text-[color:var(--profile-card-wallet)]", children: a })
          ] })
        ] }),
        /* @__PURE__ */ n.jsx(vi, { value: e.xp, max: r, style: t, label: i }),
        /* @__PURE__ */ n.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          { k: "Missions", v: `${e.missionsDone}/12` },
          { k: "XP", v: e.xp.toLocaleString() },
          { k: "Streak", v: `${e.streak}d` }
        ].map((o) => /* @__PURE__ */ n.jsxs(
          "div",
          {
            className: "p-2.5 bg-[var(--profile-card-stat-bg)] border border-[color:var(--profile-card-stat-border)] rounded-lg text-center",
            children: [
              /* @__PURE__ */ n.jsx("div", { className: "font-mono text-[9px] tracking-[0.12em] uppercase text-[color:var(--profile-card-wallet)]", children: o.k }),
              /* @__PURE__ */ n.jsx("div", { className: "font-bold text-[14px] mt-0.5 text-[color:var(--profile-card-title)]", children: o.v })
            ]
          },
          o.k
        )) })
      ]
    }
  );
}
const ko = Ue(function({
  r: t,
  persona: r,
  onRedeem: i,
  compact: a = !1
}) {
  const o = r.xp >= t.cost, s = `var(--tone-${t.tone})`;
  return /* @__PURE__ */ n.jsxs("div", { className: "bg-[var(--reward-card-bg)] border border-[color:var(--reward-card-border)] rounded-[var(--radius-card,14px)] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: "relative bg-[var(--reward-card-image-bg)] border-b border-[color:var(--reward-card-image-border)] overflow-hidden",
        style: { aspectRatio: a ? "2 / 1" : "4 / 3" },
        children: [
          t.imageUrl ? /* @__PURE__ */ n.jsx(
            "img",
            {
              src: t.imageUrl,
              alt: t.title,
              width: 400,
              height: 300,
              loading: "lazy",
              className: "w-full h-full object-cover block"
            }
          ) : /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
            /* @__PURE__ */ n.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, ${s} 20%, transparent) 0 8px, transparent 8px 18px)`
                }
              }
            ),
            /* @__PURE__ */ n.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ n.jsx(
              "div",
              {
                className: "rounded-xl text-[#05060A] grid place-items-center font-bold font-mono tracking-[0.1em] uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]",
                style: {
                  width: a ? 52 : 68,
                  height: a ? 52 : 68,
                  background: s,
                  fontSize: a ? 9 : 11
                },
                children: t.kind.slice(0, 4)
              }
            ) })
          ] }),
          t.limited && /* @__PURE__ */ n.jsx("div", { className: "absolute top-2.5 left-2.5", children: /* @__PURE__ */ n.jsx(X, { tone: "magenta", children: "LIMITED" }) }),
          /* @__PURE__ */ n.jsx("div", { className: "absolute top-2.5 right-2.5", children: /* @__PURE__ */ n.jsx(X, { children: t.stock }) })
        ]
      }
    ),
    /* @__PURE__ */ n.jsxs("div", { className: "flex flex-col gap-2 flex-1", style: { padding: a ? 10 : 14 }, children: [
      /* @__PURE__ */ n.jsxs("div", { children: [
        /* @__PURE__ */ n.jsx(
          "div",
          {
            className: "font-semibold text-[color:var(--reward-card-title)]",
            style: { fontSize: a ? 13 : 14 },
            children: t.title
          }
        ),
        /* @__PURE__ */ n.jsx("div", { className: "text-[11px] text-[color:var(--reward-card-body)] font-mono uppercase tracking-[0.1em] mt-0.5", children: t.kind })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto", children: [
        /* @__PURE__ */ n.jsx(Ce, { amount: t.cost.toLocaleString() }),
        /* @__PURE__ */ n.jsx(T, { variant: "primary", size: "sm", disabled: !o, onClick: () => i(t), children: o ? "Redeem" : "Locked" })
      ] })
    ] })
  ] });
});
function wo({ label: e, value: t, trend: r, trendColor: i }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "p-3.5 bg-panel-2 border border-border rounded-[10px]", children: [
    /* @__PURE__ */ n.jsx("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-1.5", children: e }),
    /* @__PURE__ */ n.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ n.jsx("span", { style: { fontWeight: 700, fontSize: 22 }, children: t }),
      /* @__PURE__ */ n.jsx(ji, { values: r, color: i })
    ] })
  ] });
}
function No({ tiers: e, currentXP: t }) {
  const r = de("profile.tierLadderEyebrow"), i = de("profile.tierLabelPrefix"), a = de("profile.tierXPSuffix"), o = [...e].reverse().find((s) => t >= s.min) ?? e[0];
  return /* @__PURE__ */ n.jsxs("div", { className: "panel p-5", children: [
    /* @__PURE__ */ n.jsx("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5", children: r }),
    /* @__PURE__ */ n.jsx("div", { className: "grid gap-2.5", style: { gridTemplateColumns: `repeat(${e.length}, 1fr)` }, children: e.map((s, l) => {
      const d = o.name === s.name, c = t >= s.min;
      return /* @__PURE__ */ n.jsxs(
        "div",
        {
          className: "p-3.5 rounded-[10px] border",
          style: {
            borderColor: d ? s.color : "var(--border)",
            background: d ? `color-mix(in oklch, ${s.color} var(--tier-ladder-current-mix), transparent)` : "var(--tier-ladder-surface)",
            opacity: c || d ? 1 : "var(--tier-ladder-locked-opacity)"
          },
          children: [
            /* @__PURE__ */ n.jsxs("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: [
              i,
              " ",
              String(l + 1).padStart(2, "0")
            ] }),
            /* @__PURE__ */ n.jsx(
              "div",
              {
                className: "font-bold text-[16px] mt-1",
                style: { color: d ? s.color : "var(--ink)" },
                children: s.name
              }
            ),
            /* @__PURE__ */ n.jsxs("div", { className: "font-mono text-[11px] text-ink-dim mt-0.5", children: [
              s.min.toLocaleString(),
              a
            ] })
          ]
        },
        s.name
      );
    }) })
  ] });
}
export {
  Li as AvatarUploadExperience,
  Yi as BadgeCollectExperience,
  po as BadgeGrid,
  uo as BrandLockup,
  lo as BrandProvider,
  T as Button,
  bi as Chip,
  un as Countdown,
  se as DEFAULT_CONFIG,
  Sr as DEFAULT_CONTENT,
  xo as Divider,
  Bi as EmailVerificationExperience,
  ue as Eyebrow,
  gi as Field,
  ho as FilterTabs,
  Ki as FollowSocialExperience,
  Pi as HangmanExperience,
  mo as HeroBanner,
  Ni as HeroMedia,
  Te as Input,
  Vi as InviteExperience,
  bo as LeaderboardTable,
  yi as Logo,
  vo as MissionCard,
  go as MissionModal,
  Hi as PhoneVerificationExperience,
  Qi as PhotoProofExperience,
  yo as Podium,
  jo as ProfileCard,
  Fi as ProfileCompletionExperience,
  _i as QuizExperience,
  Ii as ReadArticleExperience,
  Gi as ReferralExperience,
  ko as RewardCard,
  yn as SURFACES,
  Wi as ScratchCardExperience,
  Ji as ShareExperience,
  ji as Sparkline,
  qi as SpinWheelExperience,
  wo as StatCard,
  Ei as SurveyExperience,
  X as Tag,
  fn as Textarea,
  No as TierLadder,
  Ri as TriviaExperience,
  Oi as VideoExperience,
  vi as XPBar,
  Ce as XPPill,
  oo as applyBrand,
  si as deriveTokens,
  so as getCurrentBrand,
  co as preloadAssets,
  di as subscribeBrand,
  hi as useAsset,
  fo as useBrand,
  Zt as useBrandState,
  de as useContent
};
