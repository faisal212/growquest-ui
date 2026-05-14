import ur, { useState as j, useEffect as G, useMemo as hr, useContext as pr, createContext as mr, memo as Xe, useRef as Bt, useSyncExternalStore as br } from "react";
import { createPortal as gr } from "react-dom";
function Dt(e, t) {
  if (!t) return e;
  if (typeof e != "object" || e === null) return t ?? e;
  const n = Array.isArray(e) ? [...e] : { ...e };
  for (const a of Object.keys(t)) {
    const i = e[a], s = t[a];
    s !== void 0 && (i && typeof i == "object" && !Array.isArray(i) && s && typeof s == "object" && !Array.isArray(s) ? n[a] = Dt(i, s) : n[a] = s);
  }
  return n;
}
const vr = {
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
}, _n = {
  missions: {
    sectionEyebrow: "// missions",
    sectionTitle: "Daily quests",
    rewardsEyebrow: "// rewards marketplace",
    rewardsTitle: "Spend your XP",
    rewardsBalance: "balance",
    dailyDrop: {
      eyebrow: "// daily drop",
      title: "Daily streak",
      subtitle: "Claim +50 XP every 24h"
    },
    spin: {
      eyebrow: "// lootbox",
      title: "Spin-to-win",
      subtitle: "1 free spin available",
      prizes: "PRIZES: XP · MERCH · RARE DROP"
    },
    readyToCollect: {
      eyebrow: "// ready to collect",
      empty: "Complete a mission to collect rewards.",
      buttonEmpty: "No rewards yet",
      buttonReady: (e) => `Collect (${e})`,
      waiting: (e) => `${e} reward${e > 1 ? "s" : ""} waiting.`
    }
  }
}, we = {
  mode: "dark",
  brand: {
    primary: "oklch(0.86 0.18 200)",
    secondary: "oklch(0.72 0.25 340)"
  }
}, Tn = (e, t) => {
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
}, yr = {
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
}, jr = (e) => Tn(yr[e.toLowerCase()], 6), kr = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i, wr = (e) => {
  let t;
  return (t = e.match(kr)) ? Tn(parseInt(t[1], 16), t[1].length) : void 0;
}, U = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)", Ne = `${U}%`, qt = `(?:${U}%|${U})`, Nr = `(?:${U}(deg|grad|rad|turn)|${U})`, de = "\\s*,\\s*", Mr = new RegExp(
  `^rgba?\\(\\s*${U}${de}${U}${de}${U}\\s*(?:,\\s*${qt}\\s*)?\\)$`
), Cr = new RegExp(
  `^rgba?\\(\\s*${Ne}${de}${Ne}${de}${Ne}\\s*(?:,\\s*${qt}\\s*)?\\)$`
), _r = (e) => {
  let t = { mode: "rgb" }, n;
  if (n = e.match(Mr))
    n[1] !== void 0 && (t.r = n[1] / 255), n[2] !== void 0 && (t.g = n[2] / 255), n[3] !== void 0 && (t.b = n[3] / 255);
  else if (n = e.match(Cr))
    n[1] !== void 0 && (t.r = n[1] / 100), n[2] !== void 0 && (t.g = n[2] / 100), n[3] !== void 0 && (t.b = n[3] / 100);
  else
    return;
  return n[4] !== void 0 ? t.alpha = Math.max(0, Math.min(1, n[4] / 100)) : n[5] !== void 0 && (t.alpha = Math.max(0, Math.min(1, +n[5]))), t;
}, $n = (e, t) => e === void 0 ? void 0 : typeof e != "object" ? An(e) : e.mode !== void 0 ? e : t ? { ...e, mode: t } : void 0, Sn = (e = "rgb") => (t) => (t = $n(t, e)) !== void 0 ? (
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
) : void 0, L = {}, En = {}, Ie = [], Pn = {}, Tr = (e) => e, N = (e) => (L[e.mode] = {
  ...L[e.mode],
  ...e.toMode
}, Object.keys(e.fromMode || {}).forEach((t) => {
  L[t] || (L[t] = {}), L[t][e.mode] = e.fromMode[t];
}), e.ranges || (e.ranges = {}), e.difference || (e.difference = {}), e.channels.forEach((t) => {
  if (e.ranges[t] === void 0 && (e.ranges[t] = [0, 1]), !e.interpolate[t])
    throw new Error(`Missing interpolator for: ${t}`);
  typeof e.interpolate[t] == "function" && (e.interpolate[t] = {
    use: e.interpolate[t]
  }), e.interpolate[t].fixup || (e.interpolate[t].fixup = Tr);
}), En[e.mode] = e, (e.parse || []).forEach((t) => {
  $r(t, e.mode);
}), Sn(e.mode)), zn = (e) => En[e], $r = (e, t) => {
  if (typeof e == "string") {
    if (!t)
      throw new Error("'mode' required when 'parser' is a string");
    Pn[e] = t;
  } else typeof e == "function" && Ie.indexOf(e) < 0 && Ie.push(e);
}, St = /[^\x00-\x7F]|[a-zA-Z_]/, Sr = /[^\x00-\x7F]|[-\w]/, h = {
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
function ze(e) {
  let t = e[g], n = e[g + 1];
  return t === "-" || t === "+" ? /\d/.test(n) || n === "." && /\d/.test(e[g + 2]) : t === "." ? /\d/.test(n) : /\d/.test(t);
}
function Et(e) {
  if (g >= e.length)
    return !1;
  let t = e[g];
  if (St.test(t))
    return !0;
  if (t === "-") {
    if (e.length - g < 2)
      return !1;
    let n = e[g + 1];
    return !!(n === "-" || St.test(n));
  }
  return !1;
}
const Er = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 9 / 10,
  turn: 360
};
function ve(e) {
  let t = "";
  if ((e[g] === "-" || e[g] === "+") && (t += e[g++]), t += Re(e), e[g] === "." && /\d/.test(e[g + 1]) && (t += e[g++] + Re(e)), (e[g] === "e" || e[g] === "E") && ((e[g + 1] === "-" || e[g + 1] === "+") && /\d/.test(e[g + 2]) ? t += e[g++] + e[g++] + Re(e) : /\d/.test(e[g + 1]) && (t += e[g++] + Re(e))), Et(e)) {
    let n = Fe(e);
    return n === "deg" || n === "rad" || n === "turn" || n === "grad" ? { type: h.Hue, value: t * Er[n] } : void 0;
  }
  return e[g] === "%" ? (g++, { type: h.Percentage, value: +t }) : { type: h.Number, value: +t };
}
function Re(e) {
  let t = "";
  for (; /\d/.test(e[g]); )
    t += e[g++];
  return t;
}
function Fe(e) {
  let t = "";
  for (; g < e.length && Sr.test(e[g]); )
    t += e[g++];
  return t;
}
function Pr(e) {
  let t = Fe(e);
  return e[g] === "(" ? (g++, { type: h.Function, value: t }) : t === "none" ? { type: h.None, value: void 0 } : { type: h.Ident, value: t };
}
function zr(e = "") {
  let t = e.trim(), n = [], a;
  for (g = 0; g < t.length; ) {
    if (a = t[g++], a === `
` || a === "	" || a === " ") {
      for (; g < t.length && (t[g] === `
` || t[g] === "	" || t[g] === " "); )
        g++;
      continue;
    }
    if (a === ",")
      return;
    if (a === ")") {
      n.push({ type: h.ParenClose });
      continue;
    }
    if (a === "+") {
      if (g--, ze(t)) {
        n.push(ve(t));
        continue;
      }
      return;
    }
    if (a === "-") {
      if (g--, ze(t)) {
        n.push(ve(t));
        continue;
      }
      if (Et(t)) {
        n.push({ type: h.Ident, value: Fe(t) });
        continue;
      }
      return;
    }
    if (a === ".") {
      if (g--, ze(t)) {
        n.push(ve(t));
        continue;
      }
      return;
    }
    if (a === "/") {
      for (; g < t.length && (t[g] === `
` || t[g] === "	" || t[g] === " "); )
        g++;
      let i;
      if (ze(t) && (i = ve(t), i.type !== h.Hue)) {
        n.push({ type: h.Alpha, value: i });
        continue;
      }
      if (Et(t) && Fe(t) === "none") {
        n.push({
          type: h.Alpha,
          value: { type: h.None, value: void 0 }
        });
        continue;
      }
      return;
    }
    if (/\d/.test(a)) {
      g--, n.push(ve(t));
      continue;
    }
    if (St.test(a)) {
      g--, n.push(Pr(t));
      continue;
    }
    return;
  }
  return n;
}
function Rr(e) {
  e._i = 0;
  let t = e[e._i++];
  if (!t || t.type !== h.Function || t.value !== "color" || (t = e[e._i++], t.type !== h.Ident))
    return;
  const n = Pn[t.value];
  if (!n)
    return;
  const a = { mode: n }, i = Rn(e, !1);
  if (!i)
    return;
  const s = zn(n).channels;
  for (let o = 0, l, d; o < s.length; o++)
    l = i[o], d = s[o], l.type !== h.None && (a[d] = l.type === h.Number ? l.value : l.value / 100, d === "alpha" && (a[d] = Math.max(0, Math.min(1, a[d]))));
  return a;
}
function Rn(e, t) {
  const n = [];
  let a;
  for (; e._i < e.length; ) {
    if (a = e[e._i++], a.type === h.None || a.type === h.Number || a.type === h.Alpha || a.type === h.Percentage || t && a.type === h.Hue) {
      n.push(a);
      continue;
    }
    if (a.type === h.ParenClose) {
      if (e._i < e.length)
        return;
      continue;
    }
    return;
  }
  if (!(n.length < 3 || n.length > 4)) {
    if (n.length === 4) {
      if (n[3].type !== h.Alpha)
        return;
      n[3] = n[3].value;
    }
    return n.length === 3 && n.push({ type: h.None, value: void 0 }), n.every((i) => i.type !== h.Alpha) ? n : void 0;
  }
}
function Ar(e, t) {
  e._i = 0;
  let n = e[e._i++];
  if (!n || n.type !== h.Function)
    return;
  let a = Rn(e, t);
  if (a)
    return a.unshift(n.value), a;
}
const An = (e) => {
  if (typeof e != "string")
    return;
  const t = zr(e), n = t ? Ar(t, !0) : void 0;
  let a, i = 0, s = Ie.length;
  for (; i < s; )
    if ((a = Ie[i++](e, n)) !== void 0)
      return a;
  return t ? Rr(t) : void 0;
};
function Or(e, t) {
  if (!t || t[0] !== "rgb" && t[0] !== "rgba")
    return;
  const n = { mode: "rgb" }, [, a, i, s, o] = t;
  if (!(a.type === h.Hue || i.type === h.Hue || s.type === h.Hue))
    return a.type !== h.None && (n.r = a.type === h.Number ? a.value / 255 : a.value / 100), i.type !== h.None && (n.g = i.type === h.Number ? i.value / 255 : i.value / 100), s.type !== h.None && (n.b = s.type === h.Number ? s.value / 255 : s.value / 100), o.type !== h.None && (n.alpha = Math.min(
      1,
      Math.max(
        0,
        o.type === h.Number ? o.value : o.value / 100
      )
    )), n;
}
const Ir = (e) => e === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0, Fr = (e, t, n) => e + n * (t - e), Lr = (e) => {
  let t = [];
  for (let n = 0; n < e.length - 1; n++) {
    let a = e[n], i = e[n + 1];
    a === void 0 && i === void 0 ? t.push(void 0) : a !== void 0 && i !== void 0 ? t.push([a, i]) : t.push(a !== void 0 ? [a, a] : [i, i]);
  }
  return t;
}, Br = (e) => (t) => {
  let n = Lr(t);
  return (a) => {
    let i = a * n.length, s = a >= 1 ? n.length - 1 : Math.max(Math.floor(i), 0), o = n[s];
    return o === void 0 ? void 0 : e(o[0], o[1], i - s);
  };
}, p = Br(Fr), A = (e) => {
  let t = !1, n = e.map((a) => a !== void 0 ? (t = !0, a) : 1);
  return t ? n : e;
}, fe = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parse: [
    Or,
    wr,
    _r,
    jr,
    Ir,
    "srgb"
  ],
  serialize: "srgb",
  interpolate: {
    r: p,
    g: p,
    b: p,
    alpha: { use: p, fixup: A }
  },
  gamut: !0,
  white: { r: 1, g: 1, b: 1 },
  black: { r: 0, g: 0, b: 0 }
}, nt = (e = 0) => Math.pow(Math.abs(e), 563 / 256) * Math.sign(e), Qt = (e) => {
  let t = nt(e.r), n = nt(e.g), a = nt(e.b), i = {
    mode: "xyz65",
    x: 0.5766690429101305 * t + 0.1855582379065463 * n + 0.1882286462349947 * a,
    y: 0.297344975250536 * t + 0.6273635662554661 * n + 0.0752914584939979 * a,
    z: 0.0270313613864123 * t + 0.0706888525358272 * n + 0.9913375368376386 * a
  };
  return e.alpha !== void 0 && (i.alpha = e.alpha), i;
}, rt = (e) => Math.pow(Math.abs(e), 256 / 563) * Math.sign(e), Kt = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = {
    mode: "a98",
    r: rt(
      e * 2.0415879038107465 - t * 0.5650069742788597 - 0.3447313507783297 * n
    ),
    g: rt(
      e * -0.9692436362808798 + t * 1.8759675015077206 + 0.0415550574071756 * n
    ),
    b: rt(
      e * 0.0134442806320312 - t * 0.1183623922310184 + 1.0151749943912058 * n
    )
  };
  return a !== void 0 && (i.alpha = a), i;
}, it = (e = 0) => {
  const t = Math.abs(e);
  return t <= 0.04045 ? e / 12.92 : (Math.sign(e) || 1) * Math.pow((t + 0.055) / 1.055, 2.4);
}, xe = ({ r: e, g: t, b: n, alpha: a }) => {
  let i = {
    mode: "lrgb",
    r: it(e),
    g: it(t),
    b: it(n)
  };
  return a !== void 0 && (i.alpha = a), i;
}, ee = (e) => {
  let { r: t, g: n, b: a, alpha: i } = xe(e), s = {
    mode: "xyz65",
    x: 0.4123907992659593 * t + 0.357584339383878 * n + 0.1804807884018343 * a,
    y: 0.2126390058715102 * t + 0.715168678767756 * n + 0.0721923153607337 * a,
    z: 0.0193308187155918 * t + 0.119194779794626 * n + 0.9505321522496607 * a
  };
  return i !== void 0 && (s.alpha = i), s;
}, at = (e = 0) => {
  const t = Math.abs(e);
  return t > 31308e-7 ? (Math.sign(e) || 1) * (1.055 * Math.pow(t, 1 / 2.4) - 0.055) : e * 12.92;
}, ue = ({ r: e, g: t, b: n, alpha: a }, i = "rgb") => {
  let s = {
    mode: i,
    r: at(e),
    g: at(t),
    b: at(n)
  };
  return a !== void 0 && (s.alpha = a), s;
}, te = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = ue({
    r: e * 3.2409699419045226 - t * 1.537383177570094 - 0.4986107602930034 * n,
    g: e * -0.9692436362808796 + t * 1.8759675015077204 + 0.0415550574071756 * n,
    b: e * 0.0556300796969936 - t * 0.2039769588889765 + 1.0569715142428784 * n
  });
  return a !== void 0 && (i.alpha = a), i;
}, Dr = {
  ...fe,
  mode: "a98",
  parse: ["a98-rgb"],
  serialize: "a98-rgb",
  fromMode: {
    rgb: (e) => Kt(ee(e)),
    xyz65: Kt
  },
  toMode: {
    rgb: (e) => te(Qt(e)),
    xyz65: Qt
  }
}, F = (e) => (e = e % 360) < 0 ? e + 360 : e, qr = (e, t) => e.map((n, a, i) => {
  if (n === void 0)
    return n;
  let s = F(n);
  return a === 0 || e[a - 1] === void 0 ? s : t(s - F(i[a - 1]));
}).reduce((n, a) => !n.length || a === void 0 || n[n.length - 1] === void 0 ? (n.push(a), n) : (n.push(a + n[n.length - 1]), n), []), H = (e) => qr(e, (t) => Math.abs(t) <= 180 ? t : t - 360 * Math.sign(t)), O = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0], Xr = Math.PI / 180, Hr = 180 / Math.PI;
let en = O[3] * O[4], tn = O[1] * O[4], nn = O[1] * O[2] - O[0] * O[3];
const Wr = ({ r: e, g: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = (nn * n + e * en - t * tn) / (nn + en - tn), s = n - i, o = (O[4] * (t - i) - O[2] * s) / O[3], l = {
    mode: "cubehelix",
    l: i,
    s: i === 0 || i === 1 ? void 0 : Math.sqrt(s * s + o * o) / (O[4] * i * (1 - i))
  };
  return l.s && (l.h = Math.atan2(o, s) * Hr - 120), a !== void 0 && (l.alpha = a), l;
}, Yr = ({ h: e, s: t, l: n, alpha: a }) => {
  let i = { mode: "rgb" };
  e = (e === void 0 ? 0 : e + 120) * Xr, n === void 0 && (n = 0);
  let s = t === void 0 ? 0 : t * n * (1 - n), o = Math.cos(e), l = Math.sin(e);
  return i.r = n + s * (O[0] * o + O[1] * l), i.g = n + s * (O[2] * o + O[3] * l), i.b = n + s * (O[4] * o + O[5] * l), a !== void 0 && (i.alpha = a), i;
}, He = (e, t) => {
  if (e.h === void 0 || t.h === void 0 || !e.s || !t.s)
    return 0;
  let n = F(e.h), a = F(t.h), i = Math.sin((a - n + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(e.s * t.s) * i;
}, Ur = (e, t) => {
  if (e.h === void 0 || t.h === void 0)
    return 0;
  let n = F(e.h), a = F(t.h);
  return Math.abs(a - n) > 180 ? n - (a - 360 * Math.sign(a - n)) : a - n;
}, We = (e, t) => {
  if (e.h === void 0 || t.h === void 0 || !e.c || !t.c)
    return 0;
  let n = F(e.h), a = F(t.h), i = Math.sin((a - n + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(e.c * t.c) * i;
}, W = (e) => {
  let t = e.reduce(
    (a, i) => {
      if (i !== void 0) {
        let s = i * Math.PI / 180;
        a.sin += Math.sin(s), a.cos += Math.cos(s);
      }
      return a;
    },
    { sin: 0, cos: 0 }
  ), n = Math.atan2(t.sin, t.cos) * 180 / Math.PI;
  return n < 0 ? 360 + n : n;
}, Gr = {
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
    rgb: Wr
  },
  toMode: {
    rgb: Yr
  },
  interpolate: {
    h: {
      use: p,
      fixup: H
    },
    s: p,
    l: p,
    alpha: {
      use: p,
      fixup: A
    }
  },
  difference: {
    h: He
  },
  average: {
    h: W
  }
}, J = ({ l: e, a: t, b: n, alpha: a }, i = "lch") => {
  t === void 0 && (t = 0), n === void 0 && (n = 0);
  let s = Math.sqrt(t * t + n * n), o = { mode: i, l: e, c: s };
  return s && (o.h = F(Math.atan2(n, t) * 180 / Math.PI)), a !== void 0 && (o.alpha = a), o;
}, V = ({ l: e, c: t, h: n, alpha: a }, i = "lab") => {
  n === void 0 && (n = 0);
  let s = {
    mode: i,
    l: e,
    a: t ? t * Math.cos(n / 180 * Math.PI) : 0,
    b: t ? t * Math.sin(n / 180 * Math.PI) : 0
  };
  return a !== void 0 && (s.alpha = a), s;
}, On = Math.pow(29, 3) / Math.pow(3, 3), In = Math.pow(6, 3) / Math.pow(29, 3), R = {
  X: 0.3457 / 0.3585,
  Y: 1,
  Z: (1 - 0.3457 - 0.3585) / 0.3585
}, oe = {
  X: 0.3127 / 0.329,
  Y: 1,
  Z: (1 - 0.3127 - 0.329) / 0.329
};
let st = (e) => Math.pow(e, 3) > In ? Math.pow(e, 3) : (116 * e - 16) / On;
const Fn = ({ l: e, a: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = (e + 16) / 116, s = t / 500 + i, o = i - n / 200, l = {
    mode: "xyz65",
    x: st(s) * oe.X,
    y: st(i) * oe.Y,
    z: st(o) * oe.Z
  };
  return a !== void 0 && (l.alpha = a), l;
}, Ye = (e) => te(Fn(e)), ot = (e) => e > In ? Math.cbrt(e) : (On * e + 16) / 116, Ln = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = ot(e / oe.X), s = ot(t / oe.Y), o = ot(n / oe.Z), l = {
    mode: "lab65",
    l: 116 * s - 16,
    a: 500 * (i - s),
    b: 200 * (s - o)
  };
  return a !== void 0 && (l.alpha = a), l;
}, Ue = (e) => {
  let t = Ln(ee(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
}, Le = 1, Bn = 1, _e = 26 / 180 * Math.PI, Be = Math.cos(_e), De = Math.sin(_e), Dn = 100 / Math.log(139 / 100), Pt = ({ l: e, c: t, h: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = {
    mode: "lab65",
    l: (Math.exp(e * Le / Dn) - 1) / 39e-4
  }, s = (Math.exp(0.0435 * t * Bn * Le) - 1) / 0.075, o = s * Math.cos(n / 180 * Math.PI - _e), l = s * Math.sin(n / 180 * Math.PI - _e);
  return i.a = o * Be - l / 0.83 * De, i.b = o * De + l / 0.83 * Be, a !== void 0 && (i.alpha = a), i;
}, zt = ({ l: e, a: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = t * Be + n * De, s = 0.83 * (n * Be - t * De), o = Math.sqrt(i * i + s * s), l = {
    mode: "dlch",
    l: Dn / Le * Math.log(1 + 39e-4 * e),
    c: Math.log(1 + 0.075 * o) / (0.0435 * Bn * Le)
  };
  return l.c && (l.h = F((Math.atan2(s, i) + _e) / Math.PI * 180)), a !== void 0 && (l.alpha = a), l;
}, rn = (e) => Pt(J(e, "dlch")), an = (e) => V(zt(e), "dlab"), Jr = {
  mode: "dlab",
  parse: ["--din99o-lab"],
  serialize: "--din99o-lab",
  toMode: {
    lab65: rn,
    rgb: (e) => Ye(rn(e))
  },
  fromMode: {
    lab65: an,
    rgb: (e) => an(Ue(e))
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344]
  },
  interpolate: {
    l: p,
    a: p,
    b: p,
    alpha: {
      use: p,
      fixup: A
    }
  }
}, Vr = {
  mode: "dlch",
  parse: ["--din99o-lch"],
  serialize: "--din99o-lch",
  toMode: {
    lab65: Pt,
    dlab: (e) => V(e, "dlab"),
    rgb: (e) => Ye(Pt(e))
  },
  fromMode: {
    lab65: zt,
    dlab: (e) => J(e, "dlch"),
    rgb: (e) => zt(Ue(e))
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360]
  },
  interpolate: {
    l: p,
    c: p,
    h: {
      use: p,
      fixup: H
    },
    alpha: {
      use: p,
      fixup: A
    }
  },
  difference: {
    h: We
  },
  average: {
    h: W
  }
};
function Zr({ h: e, s: t, i: n, alpha: a }) {
  e = F(e !== void 0 ? e : 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.abs(e / 60 % 2 - 1), s;
  switch (Math.floor(e / 60)) {
    case 0:
      s = {
        r: n * (1 + t * (3 / (2 - i) - 1)),
        g: n * (1 + t * (3 * (1 - i) / (2 - i) - 1)),
        b: n * (1 - t)
      };
      break;
    case 1:
      s = {
        r: n * (1 + t * (3 * (1 - i) / (2 - i) - 1)),
        g: n * (1 + t * (3 / (2 - i) - 1)),
        b: n * (1 - t)
      };
      break;
    case 2:
      s = {
        r: n * (1 - t),
        g: n * (1 + t * (3 / (2 - i) - 1)),
        b: n * (1 + t * (3 * (1 - i) / (2 - i) - 1))
      };
      break;
    case 3:
      s = {
        r: n * (1 - t),
        g: n * (1 + t * (3 * (1 - i) / (2 - i) - 1)),
        b: n * (1 + t * (3 / (2 - i) - 1))
      };
      break;
    case 4:
      s = {
        r: n * (1 + t * (3 * (1 - i) / (2 - i) - 1)),
        g: n * (1 - t),
        b: n * (1 + t * (3 / (2 - i) - 1))
      };
      break;
    case 5:
      s = {
        r: n * (1 + t * (3 / (2 - i) - 1)),
        g: n * (1 - t),
        b: n * (1 + t * (3 * (1 - i) / (2 - i) - 1))
      };
      break;
    default:
      s = { r: n * (1 - t), g: n * (1 - t), b: n * (1 - t) };
  }
  return s.mode = "rgb", a !== void 0 && (s.alpha = a), s;
}
function Qr({ r: e, g: t, b: n, alpha: a }) {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.max(e, t, n), s = Math.min(e, t, n), o = {
    mode: "hsi",
    s: e + t + n === 0 ? 0 : 1 - 3 * s / (e + t + n),
    i: (e + t + n) / 3
  };
  return i - s !== 0 && (o.h = (i === e ? (t - n) / (i - s) + (t < n) * 6 : i === t ? (n - e) / (i - s) + 2 : (e - t) / (i - s) + 4) * 60), a !== void 0 && (o.alpha = a), o;
}
const Kr = {
  mode: "hsi",
  toMode: {
    rgb: Zr
  },
  parse: ["--hsi"],
  serialize: "--hsi",
  fromMode: {
    rgb: Qr
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: p, fixup: H },
    s: p,
    i: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: He
  },
  average: {
    h: W
  }
};
function ei({ h: e, s: t, l: n, alpha: a }) {
  e = F(e !== void 0 ? e : 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = n + t * (n < 0.5 ? n : 1 - n), s = i - (i - n) * 2 * Math.abs(e / 60 % 2 - 1), o;
  switch (Math.floor(e / 60)) {
    case 0:
      o = { r: i, g: s, b: 2 * n - i };
      break;
    case 1:
      o = { r: s, g: i, b: 2 * n - i };
      break;
    case 2:
      o = { r: 2 * n - i, g: i, b: s };
      break;
    case 3:
      o = { r: 2 * n - i, g: s, b: i };
      break;
    case 4:
      o = { r: s, g: 2 * n - i, b: i };
      break;
    case 5:
      o = { r: i, g: 2 * n - i, b: s };
      break;
    default:
      o = { r: 2 * n - i, g: 2 * n - i, b: 2 * n - i };
  }
  return o.mode = "rgb", a !== void 0 && (o.alpha = a), o;
}
function ti({ r: e, g: t, b: n, alpha: a }) {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.max(e, t, n), s = Math.min(e, t, n), o = {
    mode: "hsl",
    s: i === s ? 0 : (i - s) / (1 - Math.abs(i + s - 1)),
    l: 0.5 * (i + s)
  };
  return i - s !== 0 && (o.h = (i === e ? (t - n) / (i - s) + (t < n) * 6 : i === t ? (n - e) / (i - s) + 2 : (e - t) / (i - s) + 4) * 60), a !== void 0 && (o.alpha = a), o;
}
const ni = (e, t) => {
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
}, ri = new RegExp(
  `^hsla?\\(\\s*${Nr}${de}${Ne}${de}${Ne}\\s*(?:,\\s*${qt}\\s*)?\\)$`
), ii = (e) => {
  let t = e.match(ri);
  if (!t) return;
  let n = { mode: "hsl" };
  return t[3] !== void 0 ? n.h = +t[3] : t[1] !== void 0 && t[2] !== void 0 && (n.h = ni(t[1], t[2])), t[4] !== void 0 && (n.s = Math.min(Math.max(0, t[4] / 100), 1)), t[5] !== void 0 && (n.l = Math.min(Math.max(0, t[5] / 100), 1)), t[6] !== void 0 ? n.alpha = Math.max(0, Math.min(1, t[6] / 100)) : t[7] !== void 0 && (n.alpha = Math.max(0, Math.min(1, +t[7]))), n;
};
function ai(e, t) {
  if (!t || t[0] !== "hsl" && t[0] !== "hsla")
    return;
  const n = { mode: "hsl" }, [, a, i, s, o] = t;
  if (a.type !== h.None) {
    if (a.type === h.Percentage)
      return;
    n.h = a.value;
  }
  if (i.type !== h.None) {
    if (i.type === h.Hue)
      return;
    n.s = i.value / 100;
  }
  if (s.type !== h.None) {
    if (s.type === h.Hue)
      return;
    n.l = s.value / 100;
  }
  return o.type !== h.None && (n.alpha = Math.min(
    1,
    Math.max(
      0,
      o.type === h.Number ? o.value : o.value / 100
    )
  )), n;
}
const qn = {
  mode: "hsl",
  toMode: {
    rgb: ei
  },
  fromMode: {
    rgb: ti
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [ai, ii],
  serialize: (e) => `hsl(${e.h !== void 0 ? e.h : "none"} ${e.s !== void 0 ? e.s * 100 + "%" : "none"} ${e.l !== void 0 ? e.l * 100 + "%" : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    h: { use: p, fixup: H },
    s: p,
    l: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: He
  },
  average: {
    h: W
  }
};
function Xn({ h: e, s: t, v: n, alpha: a }) {
  e = F(e !== void 0 ? e : 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.abs(e / 60 % 2 - 1), s;
  switch (Math.floor(e / 60)) {
    case 0:
      s = { r: n, g: n * (1 - t * i), b: n * (1 - t) };
      break;
    case 1:
      s = { r: n * (1 - t * i), g: n, b: n * (1 - t) };
      break;
    case 2:
      s = { r: n * (1 - t), g: n, b: n * (1 - t * i) };
      break;
    case 3:
      s = { r: n * (1 - t), g: n * (1 - t * i), b: n };
      break;
    case 4:
      s = { r: n * (1 - t * i), g: n * (1 - t), b: n };
      break;
    case 5:
      s = { r: n, g: n * (1 - t), b: n * (1 - t * i) };
      break;
    default:
      s = { r: n * (1 - t), g: n * (1 - t), b: n * (1 - t) };
  }
  return s.mode = "rgb", a !== void 0 && (s.alpha = a), s;
}
function Hn({ r: e, g: t, b: n, alpha: a }) {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.max(e, t, n), s = Math.min(e, t, n), o = {
    mode: "hsv",
    s: i === 0 ? 0 : 1 - s / i,
    v: i
  };
  return i - s !== 0 && (o.h = (i === e ? (t - n) / (i - s) + (t < n) * 6 : i === t ? (n - e) / (i - s) + 2 : (e - t) / (i - s) + 4) * 60), a !== void 0 && (o.alpha = a), o;
}
const Wn = {
  mode: "hsv",
  toMode: {
    rgb: Xn
  },
  parse: ["--hsv"],
  serialize: "--hsv",
  fromMode: {
    rgb: Hn
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: p, fixup: H },
    s: p,
    v: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: He
  },
  average: {
    h: W
  }
};
function si({ h: e, w: t, b: n, alpha: a }) {
  if (t === void 0 && (t = 0), n === void 0 && (n = 0), t + n > 1) {
    let i = t + n;
    t /= i, n /= i;
  }
  return Xn({
    h: e,
    s: n === 1 ? 1 : 1 - t / (1 - n),
    v: 1 - n,
    alpha: a
  });
}
function oi(e) {
  let t = Hn(e);
  if (t === void 0) return;
  let n = t.s !== void 0 ? t.s : 0, a = t.v !== void 0 ? t.v : 0, i = {
    mode: "hwb",
    w: (1 - n) * a,
    b: 1 - a
  };
  return t.h !== void 0 && (i.h = t.h), t.alpha !== void 0 && (i.alpha = t.alpha), i;
}
function li(e, t) {
  if (!t || t[0] !== "hwb")
    return;
  const n = { mode: "hwb" }, [, a, i, s, o] = t;
  if (a.type !== h.None) {
    if (a.type === h.Percentage)
      return;
    n.h = a.value;
  }
  if (i.type !== h.None) {
    if (i.type === h.Hue)
      return;
    n.w = i.value / 100;
  }
  if (s.type !== h.None) {
    if (s.type === h.Hue)
      return;
    n.b = s.value / 100;
  }
  return o.type !== h.None && (n.alpha = Math.min(
    1,
    Math.max(
      0,
      o.type === h.Number ? o.value : o.value / 100
    )
  )), n;
}
const di = {
  mode: "hwb",
  toMode: {
    rgb: si
  },
  fromMode: {
    rgb: oi
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [li],
  serialize: (e) => `hwb(${e.h !== void 0 ? e.h : "none"} ${e.w !== void 0 ? e.w * 100 + "%" : "none"} ${e.b !== void 0 ? e.b * 100 + "%" : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    h: { use: p, fixup: H },
    w: p,
    b: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: Ur
  },
  average: {
    h: W
  }
}, Yn = 203, Ge = 0.1593017578125, Un = 78.84375, Je = 0.8359375, Ve = 18.8515625, Ze = 18.6875;
function lt(e) {
  if (e < 0) return 0;
  const t = Math.pow(e, 1 / Un);
  return 1e4 * Math.pow(Math.max(0, t - Je) / (Ve - Ze * t), 1 / Ge);
}
function dt(e) {
  if (e < 0) return 0;
  const t = Math.pow(e / 1e4, Ge);
  return Math.pow((Je + Ve * t) / (1 + Ze * t), Un);
}
const ct = (e) => Math.max(e / Yn, 0), sn = ({ i: e, t, p: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  const i = lt(
    e + 0.008609037037932761 * t + 0.11102962500302593 * n
  ), s = lt(
    e - 0.00860903703793275 * t - 0.11102962500302599 * n
  ), o = lt(
    e + 0.5600313357106791 * t - 0.32062717498731885 * n
  ), l = {
    mode: "xyz65",
    x: ct(
      2.070152218389422 * i - 1.3263473389671556 * s + 0.2066510476294051 * o
    ),
    y: ct(
      0.3647385209748074 * i + 0.680566024947227 * s - 0.0453045459220346 * o
    ),
    z: ct(
      -0.049747207535812 * i - 0.0492609666966138 * s + 1.1880659249923042 * o
    )
  };
  return a !== void 0 && (l.alpha = a), l;
}, ft = (e = 0) => Math.max(e * Yn, 0), on = ({ x: e, y: t, z: n, alpha: a }) => {
  const i = ft(e), s = ft(t), o = ft(n), l = dt(
    0.3592832590121217 * i + 0.6976051147779502 * s - 0.0358915932320289 * o
  ), d = dt(
    -0.1920808463704995 * i + 1.1004767970374323 * s + 0.0753748658519118 * o
  ), c = dt(
    0.0070797844607477 * i + 0.0748396662186366 * s + 0.8433265453898765 * o
  ), f = 0.5 * l + 0.5 * d, m = 1.61376953125 * l - 3.323486328125 * d + 1.709716796875 * c, b = 4.378173828125 * l - 4.24560546875 * d - 0.132568359375 * c, v = { mode: "itp", i: f, t: m, p: b };
  return a !== void 0 && (v.alpha = a), v;
}, ci = {
  mode: "itp",
  channels: ["i", "t", "p", "alpha"],
  parse: ["--ictcp"],
  serialize: "--ictcp",
  toMode: {
    xyz65: sn,
    rgb: (e) => te(sn(e))
  },
  fromMode: {
    xyz65: on,
    rgb: (e) => on(ee(e))
  },
  ranges: {
    i: [0, 0.581],
    t: [-0.369, 0.272],
    p: [-0.164, 0.331]
  },
  interpolate: {
    i: p,
    t: p,
    p,
    alpha: { use: p, fixup: A }
  }
}, fi = 134.03437499999998, xi = 16295499532821565e-27, xt = (e) => {
  if (e < 0) return 0;
  let t = Math.pow(e / 1e4, Ge);
  return Math.pow((Je + Ve * t) / (1 + Ze * t), fi);
}, ut = (e = 0) => Math.max(e * 203, 0), Gn = ({ x: e, y: t, z: n, alpha: a }) => {
  e = ut(e), t = ut(t), n = ut(n);
  let i = 1.15 * e - 0.15 * n, s = 0.66 * t + 0.34 * e, o = xt(0.41478972 * i + 0.579999 * s + 0.014648 * n), l = xt(-0.20151 * i + 1.120649 * s + 0.0531008 * n), d = xt(-0.0166008 * i + 0.2648 * s + 0.6684799 * n), c = (o + l) / 2, f = {
    mode: "jab",
    j: 0.44 * c / (1 - 0.56 * c) - xi,
    a: 3.524 * o - 4.066708 * l + 0.542708 * d,
    b: 0.199076 * o + 1.096799 * l - 1.295875 * d
  };
  return a !== void 0 && (f.alpha = a), f;
}, ui = 134.03437499999998, ln = 16295499532821565e-27, ht = (e) => {
  if (e < 0) return 0;
  let t = Math.pow(e, 1 / ui);
  return 1e4 * Math.pow((Je - t) / (Ze * t - Ve), 1 / Ge);
}, pt = (e) => e / 203, Jn = ({ j: e, a: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = (e + ln) / (0.44 + 0.56 * (e + ln)), s = ht(i + 0.13860504 * t + 0.058047316 * n), o = ht(i - 0.13860504 * t - 0.058047316 * n), l = ht(i - 0.096019242 * t - 0.8118919 * n), d = {
    mode: "xyz65",
    x: pt(
      1.661373024652174 * s - 0.914523081304348 * o + 0.23136208173913045 * l
    ),
    y: pt(
      -0.3250758611844533 * s + 1.571847026732543 * o - 0.21825383453227928 * l
    ),
    z: pt(-0.090982811 * s - 0.31272829 * o + 1.5227666 * l)
  };
  return a !== void 0 && (d.alpha = a), d;
}, Vn = (e) => {
  let t = Gn(ee(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
}, Zn = (e) => te(Jn(e)), hi = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parse: ["--jzazbz"],
  serialize: "--jzazbz",
  fromMode: {
    rgb: Vn,
    xyz65: Gn
  },
  toMode: {
    rgb: Zn,
    xyz65: Jn
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134]
  },
  interpolate: {
    j: p,
    a: p,
    b: p,
    alpha: { use: p, fixup: A }
  }
}, dn = ({ j: e, a: t, b: n, alpha: a }) => {
  t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.sqrt(t * t + n * n), s = {
    mode: "jch",
    j: e,
    c: i
  };
  return i && (s.h = F(Math.atan2(n, t) * 180 / Math.PI)), a !== void 0 && (s.alpha = a), s;
}, cn = ({ j: e, c: t, h: n, alpha: a }) => {
  n === void 0 && (n = 0);
  let i = {
    mode: "jab",
    j: e,
    a: t ? t * Math.cos(n / 180 * Math.PI) : 0,
    b: t ? t * Math.sin(n / 180 * Math.PI) : 0
  };
  return a !== void 0 && (i.alpha = a), i;
}, pi = {
  mode: "jch",
  parse: ["--jzczhz"],
  serialize: "--jzczhz",
  toMode: {
    jab: cn,
    rgb: (e) => Zn(cn(e))
  },
  fromMode: {
    rgb: (e) => dn(Vn(e)),
    jab: dn
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360]
  },
  interpolate: {
    h: { use: p, fixup: H },
    c: p,
    j: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: We
  },
  average: {
    h: W
  }
}, Qe = Math.pow(29, 3) / Math.pow(3, 3), Xt = Math.pow(6, 3) / Math.pow(29, 3);
let mt = (e) => Math.pow(e, 3) > Xt ? Math.pow(e, 3) : (116 * e - 16) / Qe;
const Ht = ({ l: e, a: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = (e + 16) / 116, s = t / 500 + i, o = i - n / 200, l = {
    mode: "xyz50",
    x: mt(s) * R.X,
    y: mt(i) * R.Y,
    z: mt(o) * R.Z
  };
  return a !== void 0 && (l.alpha = a), l;
}, $e = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = ue({
    r: e * 3.1341359569958707 - t * 1.6173863321612538 - 0.4906619460083532 * n,
    g: e * -0.978795502912089 + t * 1.916254567259524 + 0.03344273116131949 * n,
    b: e * 0.07195537988411677 - t * 0.2289768264158322 + 1.405386058324125 * n
  });
  return a !== void 0 && (i.alpha = a), i;
}, Qn = (e) => $e(Ht(e)), Se = (e) => {
  let { r: t, g: n, b: a, alpha: i } = xe(e), s = {
    mode: "xyz50",
    x: 0.436065742824811 * t + 0.3851514688337912 * n + 0.14307845442264197 * a,
    y: 0.22249319175623702 * t + 0.7168870538238823 * n + 0.06061979053616537 * a,
    z: 0.013923904500943465 * t + 0.09708128566574634 * n + 0.7140993584005155 * a
  };
  return i !== void 0 && (s.alpha = i), s;
}, bt = (e) => e > Xt ? Math.cbrt(e) : (Qe * e + 16) / 116, Wt = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = bt(e / R.X), s = bt(t / R.Y), o = bt(n / R.Z), l = {
    mode: "lab",
    l: 116 * s - 16,
    a: 500 * (i - s),
    b: 200 * (s - o)
  };
  return a !== void 0 && (l.alpha = a), l;
}, Kn = (e) => {
  let t = Wt(Se(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
};
function mi(e, t) {
  if (!t || t[0] !== "lab")
    return;
  const n = { mode: "lab" }, [, a, i, s, o] = t;
  if (!(a.type === h.Hue || i.type === h.Hue || s.type === h.Hue))
    return a.type !== h.None && (n.l = Math.min(Math.max(0, a.value), 100)), i.type !== h.None && (n.a = i.type === h.Number ? i.value : i.value * 125 / 100), s.type !== h.None && (n.b = s.type === h.Number ? s.value : s.value * 125 / 100), o.type !== h.None && (n.alpha = Math.min(
      1,
      Math.max(
        0,
        o.type === h.Number ? o.value : o.value / 100
      )
    )), n;
}
const Yt = {
  mode: "lab",
  toMode: {
    xyz50: Ht,
    rgb: Qn
  },
  fromMode: {
    xyz50: Wt,
    rgb: Kn
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  },
  parse: [mi],
  serialize: (e) => `lab(${e.l !== void 0 ? e.l : "none"} ${e.a !== void 0 ? e.a : "none"} ${e.b !== void 0 ? e.b : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    l: p,
    a: p,
    b: p,
    alpha: { use: p, fixup: A }
  }
}, bi = {
  ...Yt,
  mode: "lab65",
  parse: ["--lab-d65"],
  serialize: "--lab-d65",
  toMode: {
    xyz65: Fn,
    rgb: Ye
  },
  fromMode: {
    xyz65: Ln,
    rgb: Ue
  },
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  }
};
function gi(e, t) {
  if (!t || t[0] !== "lch")
    return;
  const n = { mode: "lch" }, [, a, i, s, o] = t;
  if (a.type !== h.None) {
    if (a.type === h.Hue)
      return;
    n.l = Math.min(Math.max(0, a.value), 100);
  }
  if (i.type !== h.None && (n.c = Math.max(
    0,
    i.type === h.Number ? i.value : i.value * 150 / 100
  )), s.type !== h.None) {
    if (s.type === h.Percentage)
      return;
    n.h = s.value;
  }
  return o.type !== h.None && (n.alpha = Math.min(
    1,
    Math.max(
      0,
      o.type === h.Number ? o.value : o.value / 100
    )
  )), n;
}
const Ut = {
  mode: "lch",
  toMode: {
    lab: V,
    rgb: (e) => Qn(V(e))
  },
  fromMode: {
    rgb: (e) => J(Kn(e)),
    lab: J
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  },
  parse: [gi],
  serialize: (e) => `lch(${e.l !== void 0 ? e.l : "none"} ${e.c !== void 0 ? e.c : "none"} ${e.h !== void 0 ? e.h : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  interpolate: {
    h: { use: p, fixup: H },
    c: p,
    l: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: We
  },
  average: {
    h: W
  }
}, vi = {
  ...Ut,
  mode: "lch65",
  parse: ["--lch-d65"],
  serialize: "--lch-d65",
  toMode: {
    lab65: (e) => V(e, "lab65"),
    rgb: (e) => Ye(V(e, "lab65"))
  },
  fromMode: {
    rgb: (e) => J(Ue(e), "lch65"),
    lab65: (e) => J(e, "lch65")
  },
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  }
}, er = ({ l: e, u: t, v: n, alpha: a }) => {
  t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.sqrt(t * t + n * n), s = {
    mode: "lchuv",
    l: e,
    c: i
  };
  return i && (s.h = F(Math.atan2(n, t) * 180 / Math.PI)), a !== void 0 && (s.alpha = a), s;
}, tr = ({ l: e, c: t, h: n, alpha: a }) => {
  n === void 0 && (n = 0);
  let i = {
    mode: "luv",
    l: e,
    u: t ? t * Math.cos(n / 180 * Math.PI) : 0,
    v: t ? t * Math.sin(n / 180 * Math.PI) : 0
  };
  return a !== void 0 && (i.alpha = a), i;
}, nr = (e, t, n) => 4 * e / (e + 15 * t + 3 * n), rr = (e, t, n) => 9 * t / (e + 15 * t + 3 * n), yi = nr(R.X, R.Y, R.Z), ji = rr(R.X, R.Y, R.Z), ki = (e) => e <= Xt ? Qe * e : 116 * Math.cbrt(e) - 16, Rt = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = ki(t / R.Y), s = nr(e, t, n), o = rr(e, t, n);
  !isFinite(s) || !isFinite(o) ? i = s = o = 0 : (s = 13 * i * (s - yi), o = 13 * i * (o - ji));
  let l = {
    mode: "luv",
    l: i,
    u: s,
    v: o
  };
  return a !== void 0 && (l.alpha = a), l;
}, wi = (e, t, n) => 4 * e / (e + 15 * t + 3 * n), Ni = (e, t, n) => 9 * t / (e + 15 * t + 3 * n), Mi = wi(R.X, R.Y, R.Z), Ci = Ni(R.X, R.Y, R.Z), At = ({ l: e, u: t, v: n, alpha: a }) => {
  if (e === void 0 && (e = 0), e === 0)
    return { mode: "xyz50", x: 0, y: 0, z: 0 };
  t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = t / (13 * e) + Mi, s = n / (13 * e) + Ci, o = R.Y * (e <= 8 ? e / Qe : Math.pow((e + 16) / 116, 3)), l = o * (9 * i) / (4 * s), d = o * (12 - 3 * i - 20 * s) / (4 * s), c = { mode: "xyz50", x: l, y: o, z: d };
  return a !== void 0 && (c.alpha = a), c;
}, _i = (e) => er(Rt(Se(e))), Ti = (e) => $e(At(tr(e))), $i = {
  mode: "lchuv",
  toMode: {
    luv: tr,
    rgb: Ti
  },
  fromMode: {
    rgb: _i,
    luv: er
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
    h: { use: p, fixup: H },
    c: p,
    l: p,
    alpha: { use: p, fixup: A }
  },
  difference: {
    h: We
  },
  average: {
    h: W
  }
}, Si = {
  ...fe,
  mode: "lrgb",
  toMode: {
    rgb: ue
  },
  fromMode: {
    rgb: xe
  },
  parse: ["srgb-linear"],
  serialize: "srgb-linear"
}, Ei = {
  mode: "luv",
  toMode: {
    xyz50: At,
    rgb: (e) => $e(At(e))
  },
  fromMode: {
    xyz50: Rt,
    rgb: (e) => Rt(Se(e))
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
    l: p,
    u: p,
    v: p,
    alpha: { use: p, fixup: A }
  }
}, ir = ({ r: e, g: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.cbrt(
    0.412221469470763 * e + 0.5363325372617348 * t + 0.0514459932675022 * n
  ), s = Math.cbrt(
    0.2119034958178252 * e + 0.6806995506452344 * t + 0.1073969535369406 * n
  ), o = Math.cbrt(
    0.0883024591900564 * e + 0.2817188391361215 * t + 0.6299787016738222 * n
  ), l = {
    mode: "oklab",
    l: 0.210454268309314 * i + 0.7936177747023054 * s - 0.0040720430116193 * o,
    a: 1.9779985324311684 * i - 2.42859224204858 * s + 0.450593709617411 * o,
    b: 0.0259040424655478 * i + 0.7827717124575296 * s - 0.8086757549230774 * o
  };
  return a !== void 0 && (l.alpha = a), l;
}, Ke = (e) => {
  let t = ir(xe(e));
  return e.r === e.b && e.b === e.g && (t.a = t.b = 0), t;
}, Ee = ({ l: e, a: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = Math.pow(e + 0.3963377773761749 * t + 0.2158037573099136 * n, 3), s = Math.pow(e - 0.1055613458156586 * t - 0.0638541728258133 * n, 3), o = Math.pow(e - 0.0894841775298119 * t - 1.2914855480194092 * n, 3), l = {
    mode: "lrgb",
    r: 4.076741636075957 * i - 3.3077115392580616 * s + 0.2309699031821044 * o,
    g: -1.2684379732850317 * i + 2.6097573492876887 * s - 0.3413193760026573 * o,
    b: -0.0041960761386756 * i - 0.7034186179359362 * s + 1.7076146940746117 * o
  };
  return a !== void 0 && (l.alpha = a), l;
}, et = (e) => ue(Ee(e));
function Ot(e) {
  const a = 1.170873786407767;
  return 0.5 * (a * e - 0.206 + Math.sqrt((a * e - 0.206) * (a * e - 0.206) + 4 * 0.03 * a * e));
}
function qe(e) {
  return (e * e + 0.206 * e) / (1.170873786407767 * (e + 0.03));
}
function Pi(e, t) {
  let n, a, i, s, o, l, d, c;
  -1.88170328 * e - 0.80936493 * t > 1 ? (n = 1.19086277, a = 1.76576728, i = 0.59662641, s = 0.75515197, o = 0.56771245, l = 4.0767416621, d = -3.3077115913, c = 0.2309699292) : 1.81444104 * e - 1.19445276 * t > 1 ? (n = 0.73956515, a = -0.45954404, i = 0.08285427, s = 0.1254107, o = 0.14503204, l = -1.2684380046, d = 2.6097574011, c = -0.3413193965) : (n = 1.35733652, a = -915799e-8, i = -1.1513021, s = -0.50559606, o = 692167e-8, l = -0.0041960863, d = -0.7034186147, c = 1.707614701);
  let f = n + a * e + i * t + s * e * e + o * e * t, m = 0.3963377774 * e + 0.2158037573 * t, b = -0.1055613458 * e - 0.0638541728 * t, v = -0.0894841775 * e - 1.291485548 * t;
  {
    let k = 1 + f * m, C = 1 + f * b, M = 1 + f * v, S = k * k * k, w = C * C * C, _ = M * M * M, I = 3 * m * k * k, u = 3 * b * C * C, E = 3 * v * M * M, Z = 6 * m * m * k, Q = 6 * b * b * C, B = 6 * v * v * M, Y = l * S + d * w + c * _, D = l * I + d * u + c * E, q = l * Z + d * Q + c * B;
    f = f - Y * D / (D * D - 0.5 * Y * q);
  }
  return f;
}
function Gt(e, t) {
  let n = Pi(e, t), a = Ee({ l: 1, a: n * e, b: n * t }), i = Math.cbrt(1 / Math.max(a.r, a.g, a.b)), s = i * n;
  return [i, s];
}
function zi(e, t, n, a, i, s = null) {
  s || (s = Gt(e, t));
  let o;
  if ((n - i) * s[1] - (s[0] - i) * a <= 0)
    o = s[1] * i / (a * s[0] + s[1] * (i - n));
  else {
    o = s[1] * (i - 1) / (a * (s[0] - 1) + s[1] * (i - n));
    {
      let l = n - i, d = a, c = 0.3963377774 * e + 0.2158037573 * t, f = -0.1055613458 * e - 0.0638541728 * t, m = -0.0894841775 * e - 1.291485548 * t, b = l + d * c, v = l + d * f, k = l + d * m;
      {
        let C = i * (1 - o) + o * n, M = o * a, S = C + M * c, w = C + M * f, _ = C + M * m, I = S * S * S, u = w * w * w, E = _ * _ * _, Z = 3 * b * S * S, Q = 3 * v * w * w, B = 3 * k * _ * _, Y = 6 * b * b * S, D = 6 * v * v * w, q = 6 * k * k * _, he = 4.0767416621 * I - 3.3077115913 * u + 0.2309699292 * E - 1, pe = 4.0767416621 * Z - 3.3077115913 * Q + 0.2309699292 * B, me = 4.0767416621 * Y - 3.3077115913 * D + 0.2309699292 * q, be = pe / (pe * pe - 0.5 * he * me), ne = -he * be, ge = -1.2684380046 * I + 2.6097574011 * u - 0.3413193965 * E - 1, re = -1.2684380046 * Z + 2.6097574011 * Q - 0.3413193965 * B, Pe = -1.2684380046 * Y + 2.6097574011 * D - 0.3413193965 * q, x = re / (re * re - 0.5 * ge * Pe), y = -ge * x, $ = -0.0041960863 * I - 0.7034186147 * u + 1.707614701 * E - 1, P = -0.0041960863 * Z - 0.7034186147 * Q + 1.707614701 * B, ie = -0.0041960863 * Y - 0.7034186147 * D + 1.707614701 * q, ae = P / (P * P - 0.5 * $ * ie), z = -$ * ae;
        ne = be >= 0 ? ne : 1e6, y = x >= 0 ? y : 1e6, z = ae >= 0 ? z : 1e6, o += Math.min(ne, Math.min(y, z));
      }
    }
  }
  return o;
}
function Jt(e, t, n = null) {
  n || (n = Gt(e, t));
  let a = n[0], i = n[1];
  return [i / a, i / (1 - a)];
}
function ar(e, t, n) {
  let a = Gt(t, n), i = zi(t, n, e, 1, e, a), s = Jt(t, n, a), o = 0.11516993 + 1 / (7.4477897 + 4.1590124 * n + t * (-2.19557347 + 1.75198401 * n + t * (-2.13704948 - 10.02301043 * n + t * (-4.24894561 + 5.38770819 * n + 4.69891013 * t)))), l = 0.11239642 + 1 / (1.6132032 - 0.68124379 * n + t * (0.40370612 + 0.90148123 * n + t * (-0.27087943 + 0.6122399 * n + t * (299215e-8 - 0.45399568 * n - 0.14661872 * t)))), d = i / Math.min(e * s[0], (1 - e) * s[1]), c = e * o, f = (1 - e) * l, m = 0.9 * d * Math.sqrt(
    Math.sqrt(
      1 / (1 / (c * c * c * c) + 1 / (f * f * f * f))
    )
  );
  return c = e * 0.4, f = (1 - e) * 0.8, [Math.sqrt(1 / (1 / (c * c) + 1 / (f * f))), m, i];
}
function fn(e) {
  const t = e.l !== void 0 ? e.l : 0, n = e.a !== void 0 ? e.a : 0, a = e.b !== void 0 ? e.b : 0, i = { mode: "okhsl", l: Ot(t) };
  e.alpha !== void 0 && (i.alpha = e.alpha);
  let s = Math.sqrt(n * n + a * a);
  if (!s)
    return i.s = 0, i;
  let [o, l, d] = ar(t, n / s, a / s), c;
  if (s < l) {
    let f = 0, m = 0.8 * o, b = 1 - m / l;
    c = (s - f) / (m + b * (s - f)) * 0.8;
  } else {
    let f = l, m = 0.2 * l * l * 1.25 * 1.25 / o, b = 1 - m / (d - l);
    c = 0.8 + 0.2 * ((s - f) / (m + b * (s - f)));
  }
  return c && (i.s = c, i.h = F(Math.atan2(a, n) * 180 / Math.PI)), i;
}
function xn(e) {
  let t = e.h !== void 0 ? e.h : 0, n = e.s !== void 0 ? e.s : 0, a = e.l !== void 0 ? e.l : 0;
  const i = { mode: "oklab", l: qe(a) };
  if (e.alpha !== void 0 && (i.alpha = e.alpha), !n || a === 1)
    return i.a = i.b = 0, i;
  let s = Math.cos(t / 180 * Math.PI), o = Math.sin(t / 180 * Math.PI), [l, d, c] = ar(i.l, s, o), f, m, b, v;
  n < 0.8 ? (f = 1.25 * n, m = 0, b = 0.8 * l, v = 1 - b / d) : (f = 5 * (n - 0.8), m = d, b = 0.2 * d * d * 1.25 * 1.25 / l, v = 1 - b / (c - d));
  let k = m + f * b / (1 - v * f);
  return i.a = k * s, i.b = k * o, i;
}
const Ri = {
  ...qn,
  mode: "okhsl",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--okhsl"],
  serialize: "--okhsl",
  fromMode: {
    oklab: fn,
    rgb: (e) => fn(Ke(e))
  },
  toMode: {
    oklab: xn,
    rgb: (e) => et(xn(e))
  }
};
function un(e) {
  let t = e.l !== void 0 ? e.l : 0, n = e.a !== void 0 ? e.a : 0, a = e.b !== void 0 ? e.b : 0, i = Math.sqrt(n * n + a * a), s = i ? n / i : 1, o = i ? a / i : 1, [l, d] = Jt(s, o), c = 0.5, f = 1 - c / l, m = d / (i + t * d), b = m * t, v = m * i, k = qe(b), C = v * k / b, M = Ee({ l: k, a: s * C, b: o * C }), S = Math.cbrt(
    1 / Math.max(M.r, M.g, M.b, 0)
  );
  t = t / S, i = i / S * Ot(t) / t, t = Ot(t);
  const w = {
    mode: "okhsv",
    s: i ? (c + d) * v / (d * c + d * f * v) : 0,
    v: t ? t / b : 0
  };
  return w.s && (w.h = F(Math.atan2(a, n) * 180 / Math.PI)), e.alpha !== void 0 && (w.alpha = e.alpha), w;
}
function hn(e) {
  const t = { mode: "oklab" };
  e.alpha !== void 0 && (t.alpha = e.alpha);
  const n = e.h !== void 0 ? e.h : 0, a = e.s !== void 0 ? e.s : 0, i = e.v !== void 0 ? e.v : 0, s = Math.cos(n / 180 * Math.PI), o = Math.sin(n / 180 * Math.PI), [l, d] = Jt(s, o), c = 0.5, f = 1 - c / l, m = 1 - a * c / (c + d - d * f * a), b = a * d * c / (c + d - d * f * a), v = qe(m), k = b * v / m, C = Ee({
    l: v,
    a: s * k,
    b: o * k
  }), M = Math.cbrt(
    1 / Math.max(C.r, C.g, C.b, 0)
  ), S = qe(i * m), w = b * S / m;
  return t.l = S * M, t.a = w * s * M, t.b = w * o * M, t;
}
const Ai = {
  ...Wn,
  mode: "okhsv",
  channels: ["h", "s", "v", "alpha"],
  parse: ["--okhsv"],
  serialize: "--okhsv",
  fromMode: {
    oklab: un,
    rgb: (e) => un(Ke(e))
  },
  toMode: {
    oklab: hn,
    rgb: (e) => et(hn(e))
  }
};
function Oi(e, t) {
  if (!t || t[0] !== "oklab")
    return;
  const n = { mode: "oklab" }, [, a, i, s, o] = t;
  if (!(a.type === h.Hue || i.type === h.Hue || s.type === h.Hue))
    return a.type !== h.None && (n.l = Math.min(
      Math.max(0, a.type === h.Number ? a.value : a.value / 100),
      1
    )), i.type !== h.None && (n.a = i.type === h.Number ? i.value : i.value * 0.4 / 100), s.type !== h.None && (n.b = s.type === h.Number ? s.value : s.value * 0.4 / 100), o.type !== h.None && (n.alpha = Math.min(
      1,
      Math.max(
        0,
        o.type === h.Number ? o.value : o.value / 100
      )
    )), n;
}
const Ii = {
  ...Yt,
  mode: "oklab",
  toMode: {
    lrgb: Ee,
    rgb: et
  },
  fromMode: {
    lrgb: ir,
    rgb: Ke
  },
  ranges: {
    l: [0, 1],
    a: [-0.4, 0.4],
    b: [-0.4, 0.4]
  },
  parse: [Oi],
  serialize: (e) => `oklab(${e.l !== void 0 ? e.l : "none"} ${e.a !== void 0 ? e.a : "none"} ${e.b !== void 0 ? e.b : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`
};
function Fi(e, t) {
  if (!t || t[0] !== "oklch")
    return;
  const n = { mode: "oklch" }, [, a, i, s, o] = t;
  if (a.type !== h.None) {
    if (a.type === h.Hue)
      return;
    n.l = Math.min(
      Math.max(0, a.type === h.Number ? a.value : a.value / 100),
      1
    );
  }
  if (i.type !== h.None && (n.c = Math.max(
    0,
    i.type === h.Number ? i.value : i.value * 0.4 / 100
  )), s.type !== h.None) {
    if (s.type === h.Percentage)
      return;
    n.h = s.value;
  }
  return o.type !== h.None && (n.alpha = Math.min(
    1,
    Math.max(
      0,
      o.type === h.Number ? o.value : o.value / 100
    )
  )), n;
}
const Li = {
  ...Ut,
  mode: "oklch",
  toMode: {
    oklab: (e) => V(e, "oklab"),
    rgb: (e) => et(V(e, "oklab"))
  },
  fromMode: {
    rgb: (e) => J(Ke(e), "oklch"),
    oklab: (e) => J(e, "oklch")
  },
  parse: [Fi],
  serialize: (e) => `oklch(${e.l !== void 0 ? e.l : "none"} ${e.c !== void 0 ? e.c : "none"} ${e.h !== void 0 ? e.h : "none"}${e.alpha < 1 ? ` / ${e.alpha}` : ""})`,
  ranges: {
    l: [0, 1],
    c: [0, 0.4],
    h: [0, 360]
  }
}, pn = (e) => {
  let { r: t, g: n, b: a, alpha: i } = xe(e), s = {
    mode: "xyz65",
    x: 0.486570948648216 * t + 0.265667693169093 * n + 0.1982172852343625 * a,
    y: 0.2289745640697487 * t + 0.6917385218365062 * n + 0.079286914093745 * a,
    z: 0 * t + 0.0451133818589026 * n + 1.043944368900976 * a
  };
  return i !== void 0 && (s.alpha = i), s;
}, mn = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = ue(
    {
      r: e * 2.4934969119414263 - t * 0.9313836179191242 - 0.402710784450717 * n,
      g: e * -0.8294889695615749 + t * 1.7626640603183465 + 0.0236246858419436 * n,
      b: e * 0.0358458302437845 - t * 0.0761723892680418 + 0.9568845240076871 * n
    },
    "p3"
  );
  return a !== void 0 && (i.alpha = a), i;
}, Bi = {
  ...fe,
  mode: "p3",
  parse: ["display-p3"],
  serialize: "display-p3",
  fromMode: {
    rgb: (e) => mn(ee(e)),
    xyz65: mn
  },
  toMode: {
    rgb: (e) => te(pn(e)),
    xyz65: pn
  }
}, gt = (e) => {
  let t = Math.abs(e);
  return t >= 1 / 512 ? Math.sign(e) * Math.pow(t, 1 / 1.8) : 16 * e;
}, bn = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = {
    mode: "prophoto",
    r: gt(
      e * 1.3457868816471585 - t * 0.2555720873797946 - 0.0511018649755453 * n
    ),
    g: gt(
      e * -0.5446307051249019 + t * 1.5082477428451466 + 0.0205274474364214 * n
    ),
    b: gt(e * 0 + t * 0 + 1.2119675456389452 * n)
  };
  return a !== void 0 && (i.alpha = a), i;
}, vt = (e = 0) => {
  let t = Math.abs(e);
  return t >= 16 / 512 ? Math.sign(e) * Math.pow(t, 1.8) : e / 16;
}, gn = (e) => {
  let t = vt(e.r), n = vt(e.g), a = vt(e.b), i = {
    mode: "xyz50",
    x: 0.7977666449006423 * t + 0.1351812974005331 * n + 0.0313477341283922 * a,
    y: 0.2880748288194013 * t + 0.7118352342418731 * n + 899369387256e-16 * a,
    z: 0 * t + 0 * n + 0.8251046025104602 * a
  };
  return e.alpha !== void 0 && (i.alpha = e.alpha), i;
}, Di = {
  ...fe,
  mode: "prophoto",
  parse: ["prophoto-rgb"],
  serialize: "prophoto-rgb",
  fromMode: {
    xyz50: bn,
    rgb: (e) => bn(Se(e))
  },
  toMode: {
    xyz50: gn,
    rgb: (e) => $e(gn(e))
  }
}, vn = 1.09929682680944, qi = 0.018053968510807, yt = (e) => {
  const t = Math.abs(e);
  return t > qi ? (Math.sign(e) || 1) * (vn * Math.pow(t, 0.45) - (vn - 1)) : 4.5 * e;
}, yn = ({ x: e, y: t, z: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  let i = {
    mode: "rec2020",
    r: yt(
      e * 1.7166511879712683 - t * 0.3556707837763925 - 0.2533662813736599 * n
    ),
    g: yt(
      e * -0.6666843518324893 + t * 1.6164812366349395 + 0.0157685458139111 * n
    ),
    b: yt(
      e * 0.0176398574453108 - t * 0.0427706132578085 + 0.9421031212354739 * n
    )
  };
  return a !== void 0 && (i.alpha = a), i;
}, jn = 1.09929682680944, Xi = 0.018053968510807, jt = (e = 0) => {
  let t = Math.abs(e);
  return t < Xi * 4.5 ? e / 4.5 : (Math.sign(e) || 1) * Math.pow((t + jn - 1) / jn, 1 / 0.45);
}, kn = (e) => {
  let t = jt(e.r), n = jt(e.g), a = jt(e.b), i = {
    mode: "xyz65",
    x: 0.6369580483012911 * t + 0.1446169035862083 * n + 0.1688809751641721 * a,
    y: 0.262700212011267 * t + 0.6779980715188708 * n + 0.059301716469862 * a,
    z: 0 * t + 0.0280726930490874 * n + 1.0609850577107909 * a
  };
  return e.alpha !== void 0 && (i.alpha = e.alpha), i;
}, Hi = {
  ...fe,
  mode: "rec2020",
  fromMode: {
    xyz65: yn,
    rgb: (e) => yn(ee(e))
  },
  toMode: {
    xyz65: kn,
    rgb: (e) => te(kn(e))
  },
  parse: ["rec2020"],
  serialize: "rec2020"
}, K = 0.0037930732552754493, sr = Math.cbrt(K), kt = (e) => Math.cbrt(e) - sr, Wi = (e) => {
  const { r: t, g: n, b: a, alpha: i } = xe(e), s = kt(0.3 * t + 0.622 * n + 0.078 * a + K), o = kt(0.23 * t + 0.692 * n + 0.078 * a + K), l = kt(
    0.2434226892454782 * t + 0.2047674442449682 * n + 0.5518098665095535 * a + K
  ), d = {
    mode: "xyb",
    x: (s - o) / 2,
    y: (s + o) / 2,
    /* Apply default chroma from luma (subtract Y from B) */
    b: l - (s + o) / 2
  };
  return i !== void 0 && (d.alpha = i), d;
}, wt = (e) => Math.pow(e + sr, 3), Yi = ({ x: e, y: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  const i = wt(e + t) - K, s = wt(t - e) - K, o = wt(n + t) - K, l = ue({
    r: 11.031566904639861 * i - 9.866943908131562 * s - 0.16462299650829934 * o,
    g: -3.2541473810744237 * i + 4.418770377582723 * s - 0.16462299650829934 * o,
    b: -3.6588512867136815 * i + 2.7129230459360922 * s + 1.9459282407775895 * o
  });
  return a !== void 0 && (l.alpha = a), l;
}, Ui = {
  mode: "xyb",
  channels: ["x", "y", "b", "alpha"],
  parse: ["--xyb"],
  serialize: "--xyb",
  toMode: {
    rgb: Yi
  },
  fromMode: {
    rgb: Wi
  },
  ranges: {
    x: [-0.0154, 0.0281],
    y: [0, 0.8453],
    b: [-0.2778, 0.388]
  },
  interpolate: {
    x: p,
    y: p,
    b: p,
    alpha: { use: p, fixup: A }
  }
}, Gi = {
  mode: "xyz50",
  parse: ["xyz-d50"],
  serialize: "xyz-d50",
  toMode: {
    rgb: $e,
    lab: Wt
  },
  fromMode: {
    rgb: Se,
    lab: Ht
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825]
  },
  interpolate: {
    x: p,
    y: p,
    z: p,
    alpha: { use: p, fixup: A }
  }
}, Ji = (e) => {
  let { x: t, y: n, z: a, alpha: i } = e;
  t === void 0 && (t = 0), n === void 0 && (n = 0), a === void 0 && (a = 0);
  let s = {
    mode: "xyz50",
    x: 1.0479298208405488 * t + 0.0229467933410191 * n - 0.0501922295431356 * a,
    y: 0.0296278156881593 * t + 0.990434484573249 * n - 0.0170738250293851 * a,
    z: -0.0092430581525912 * t + 0.0150551448965779 * n + 0.7518742899580008 * a
  };
  return i !== void 0 && (s.alpha = i), s;
}, Vi = (e) => {
  let { x: t, y: n, z: a, alpha: i } = e;
  t === void 0 && (t = 0), n === void 0 && (n = 0), a === void 0 && (a = 0);
  let s = {
    mode: "xyz65",
    x: 0.9554734527042182 * t - 0.0230985368742614 * n + 0.0632593086610217 * a,
    y: -0.0283697069632081 * t + 1.0099954580058226 * n + 0.021041398966943 * a,
    z: 0.0123140016883199 * t - 0.0205076964334779 * n + 1.3303659366080753 * a
  };
  return i !== void 0 && (s.alpha = i), s;
}, Zi = {
  mode: "xyz65",
  toMode: {
    rgb: te,
    xyz50: Ji
  },
  fromMode: {
    rgb: ee,
    xyz50: Vi
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
    x: p,
    y: p,
    z: p,
    alpha: { use: p, fixup: A }
  }
}, Qi = ({ r: e, g: t, b: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  const i = {
    mode: "yiq",
    y: 0.29889531 * e + 0.58662247 * t + 0.11448223 * n,
    i: 0.59597799 * e - 0.2741761 * t - 0.32180189 * n,
    q: 0.21147017 * e - 0.52261711 * t + 0.31114694 * n
  };
  return a !== void 0 && (i.alpha = a), i;
}, Ki = ({ y: e, i: t, q: n, alpha: a }) => {
  e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = 0);
  const i = {
    mode: "rgb",
    r: e + 0.95608445 * t + 0.6208885 * n,
    g: e - 0.27137664 * t - 0.6486059 * n,
    b: e - 1.10561724 * t + 1.70250126 * n
  };
  return a !== void 0 && (i.alpha = a), i;
}, ea = {
  mode: "yiq",
  toMode: {
    rgb: Ki
  },
  fromMode: {
    rgb: Qi
  },
  channels: ["y", "i", "q", "alpha"],
  parse: ["--yiq"],
  serialize: "--yiq",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522]
  },
  interpolate: {
    y: p,
    i: p,
    q: p,
    alpha: { use: p, fixup: A }
  }
}, ta = (e) => Math.max(0, Math.min(1, e || 0)), Nt = (e) => Math.round(ta(e) * 255), na = Sn("rgb"), ra = (e) => {
  if (e === void 0)
    return;
  let t = Nt(e.r), n = Nt(e.g), a = Nt(e.b);
  return "#" + (1 << 24 | t << 16 | n << 8 | a).toString(16).slice(1);
}, Ae = (e) => {
  const t = $n(e);
  if (!t)
    return;
  const n = zn(t.mode);
  if (!n.serialize || typeof n.serialize == "string") {
    let a = `color(${n.serialize || `--${t.mode}`} `;
    return n.channels.forEach((i, s) => {
      i !== "alpha" && (a += (s ? " " : "") + (t[i] !== void 0 ? t[i] : "none"));
    }), t.alpha !== void 0 && t.alpha < 1 && (a += ` / ${t.alpha}`), a + ")";
  }
  if (typeof n.serialize == "function")
    return n.serialize(t);
}, ia = (e) => ra(na(e));
N(Dr);
N(Gr);
N(Jr);
N(Vr);
N(Kr);
N(qn);
N(Wn);
N(di);
N(ci);
N(hi);
N(pi);
N(Yt);
N(bi);
N(Ut);
N(vi);
N($i);
N(Si);
N(Ei);
N(Ri);
N(Ai);
N(Ii);
const aa = N(Li);
N(Bi);
N(Di);
N(Hi);
N(fe);
N(Ui);
N(Gi);
N(Zi);
N(ea);
function sa(e) {
  var o, l, d, c, f, m, b, v, k, C, M, S, w, _, I;
  const t = {}, n = e.mode, a = oa(vr[n], (o = e.overrides) == null ? void 0 : o.surface);
  t["--surface"] = a.surface, t["--surface-2"] = a.surface2, t["--surface-3"] = a.surface3, t["--surface-hover"] = a.surfaceHover, t["--on-surface"] = a.onSurface, t["--on-surface-dim"] = a.onSurfaceDim, t["--on-surface-faint"] = a.onSurfaceFaint, t["--border-token"] = a.border, t["--border-strong-token"] = a.borderStrong;
  const i = Mt(e.brand.primary) ?? Mt("oklch(0.86 0.18 200)");
  if (t["--color-primary"] = Ae(i) ?? e.brand.primary, t["--color-primary-hover"] = Ae(wn(i, n === "dark" ? 0.04 : -0.06)), t["--color-primary-soft"] = Ct(i, 0.18), t["--color-primary-faint"] = Ct(i, 0.08), t["--on-primary"] = (i.l ?? 0.5) > 0.62 ? "#0A0B10" : "#FFFFFF", e.brand.secondary) {
    const u = Mt(e.brand.secondary);
    u && (t["--color-secondary"] = Ae(u), t["--color-secondary-hover"] = Ae(wn(u, n === "dark" ? 0.04 : -0.06)), t["--color-secondary-soft"] = Ct(u, 0.18), t["--on-secondary"] = (u.l ?? 0.5) > 0.62 ? "#0A0B10" : "#FFFFFF");
  }
  t["--halo-amber"] = "radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)", t["--halo-magenta"] = "radial-gradient(circle, var(--accent-magenta) 0%, transparent 70%)", t["--halo-primary"] = `radial-gradient(circle, ${t["--color-primary"]} 0%, transparent 70%)`, t["--radius-card"] = ((d = (l = e.overrides) == null ? void 0 : l.radius) == null ? void 0 : d.card) ?? "14px", t["--radius-button"] = ((f = (c = e.overrides) == null ? void 0 : c.radius) == null ? void 0 : f.button) ?? "8px", t["--radius-tag"] = ((b = (m = e.overrides) == null ? void 0 : m.radius) == null ? void 0 : b.tag) ?? "4px", t["--radius-modal"] = ((k = (v = e.overrides) == null ? void 0 : v.radius) == null ? void 0 : k.modal) ?? "16px", (M = (C = e.overrides) == null ? void 0 : C.fonts) != null && M.display && (t["--font-display"] = e.overrides.fonts.display), (w = (S = e.overrides) == null ? void 0 : S.fonts) != null && w.ui && (t["--font-ui"] = e.overrides.fonts.ui), (I = (_ = e.overrides) == null ? void 0 : _.fonts) != null && I.mono && (t["--font-mono"] = e.overrides.fonts.mono), t["--tone-accent"] = "var(--accent-cyan)", t["--tone-lime"] = "var(--accent-lime)", t["--tone-magenta"] = "var(--accent-magenta)", t["--tone-amber"] = "var(--accent-amber)", t["--mission-tile-bg"] = "var(--panel)", t["--mission-tile-border"] = "var(--border)", t["--mission-tile-icon-bg"] = "var(--panel-2)", t["--mission-tile-icon-border"] = "var(--border)", t["--mission-tile-title"] = "var(--ink)", t["--mission-tile-body"] = "var(--ink-dim)", t["--mission-tile-cta-fg"] = "#05060A", t["--mission-tile-halo-opacity"] = "0.25", t["--mission-modal-backdrop"] = "color-mix(in oklch, #000 60%, transparent)", t["--mission-modal-bg"] = "var(--panel)", t["--mission-modal-border"] = "var(--border)", t["--mission-modal-header-border"] = "var(--border)", t["--mission-modal-title"] = "var(--ink)", t["--mission-modal-body"] = "var(--ink-dim)", t["--mission-modal-close-bg"] = "var(--panel-2)", t["--mission-modal-close-border"] = "var(--border)", t["--mission-modal-close-icon"] = "var(--ink)", t["--reward-card-bg"] = "var(--panel)", t["--reward-card-border"] = "var(--border)", t["--reward-card-image-bg"] = "var(--panel-2)", t["--reward-card-image-border"] = "var(--border)", t["--reward-card-title"] = "var(--ink)", t["--reward-card-body"] = "var(--ink-dim)", t["--profile-card-bg"] = "var(--panel)", t["--profile-card-border"] = "var(--border)", t["--profile-card-title"] = "var(--ink)", t["--profile-card-body"] = "var(--ink-dim)", t["--profile-card-stat-bg"] = "var(--panel-2)", t["--profile-card-stat-border"] = "var(--border)", t["--profile-card-wallet"] = "var(--ink-faint)", t["--leaderboard-row-bg"] = "transparent", t["--leaderboard-row-border"] = "var(--border)", t["--leaderboard-head-bg"] = "transparent", t["--leaderboard-head-text"] = "var(--ink-dim)", t["--leaderboard-mine-bg"] = "var(--color-primary-soft)", t["--leaderboard-top-rank"] = "var(--color-primary)";
  const s = e.overrides;
  if (s != null && s.missionTile) {
    const u = s.missionTile;
    u.surface && (t["--mission-tile-bg"] = u.surface), u.border && (t["--mission-tile-border"] = u.border);
    const E = u.iconBoxBg ?? u.surface2;
    E && (t["--mission-tile-icon-bg"] = E), u.iconBoxBorder && (t["--mission-tile-icon-border"] = u.iconBoxBorder), u.title && (t["--mission-tile-title"] = u.title), u.body && (t["--mission-tile-body"] = u.body), u.ctaFg && (t["--mission-tile-cta-fg"] = u.ctaFg), typeof u.haloOpacity == "number" && (t["--mission-tile-halo-opacity"] = String(u.haloOpacity));
  }
  if (s != null && s.missionModal) {
    const u = s.missionModal;
    u.backdrop && (t["--mission-modal-backdrop"] = u.backdrop), u.surface && (t["--mission-modal-bg"] = u.surface), u.border && (t["--mission-modal-border"] = u.border), u.headerBorder && (t["--mission-modal-header-border"] = u.headerBorder), u.title && (t["--mission-modal-title"] = u.title), u.body && (t["--mission-modal-body"] = u.body), u.closeBg && (t["--mission-modal-close-bg"] = u.closeBg), u.closeBorder && (t["--mission-modal-close-border"] = u.closeBorder), u.closeIcon && (t["--mission-modal-close-icon"] = u.closeIcon);
  }
  if (s != null && s.rewardCard) {
    const u = s.rewardCard;
    u.surface && (t["--reward-card-bg"] = u.surface), u.border && (t["--reward-card-border"] = u.border);
    const E = u.imageArea ?? u.surface2;
    E && (t["--reward-card-image-bg"] = E), u.imageAreaBorder && (t["--reward-card-image-border"] = u.imageAreaBorder), u.title && (t["--reward-card-title"] = u.title), u.body && (t["--reward-card-body"] = u.body);
  }
  if (s != null && s.profileCard) {
    const u = s.profileCard;
    u.surface && (t["--profile-card-bg"] = u.surface), u.border && (t["--profile-card-border"] = u.border), u.title && (t["--profile-card-title"] = u.title), u.body && (t["--profile-card-body"] = u.body);
    const E = u.statBg ?? u.surface2;
    E && (t["--profile-card-stat-bg"] = E), u.statBorder && (t["--profile-card-stat-border"] = u.statBorder), u.walletColor && (t["--profile-card-wallet"] = u.walletColor);
  }
  if (s != null && s.leaderboardRow) {
    const u = s.leaderboardRow;
    u.rowSurface && (t["--leaderboard-row-bg"] = u.rowSurface), u.rowBorder && (t["--leaderboard-row-border"] = u.rowBorder), u.headSurface && (t["--leaderboard-head-bg"] = u.headSurface), u.headText && (t["--leaderboard-head-text"] = u.headText), u.mineHighlight && (t["--leaderboard-mine-bg"] = u.mineHighlight), u.topRankColor && (t["--leaderboard-top-rank"] = u.topRankColor);
  }
  return s != null && s.tones && (s.tones.accent && (t["--tone-accent"] = s.tones.accent), s.tones.lime && (t["--tone-lime"] = s.tones.lime), s.tones.magenta && (t["--tone-magenta"] = s.tones.magenta), s.tones.amber && (t["--tone-amber"] = s.tones.amber)), t;
}
function oa(e, t) {
  return t ? { ...e, ...t } : e;
}
function Mt(e) {
  try {
    const t = An(e);
    return t ? aa(t) : void 0;
  } catch {
    return;
  }
}
function wn(e, t) {
  return { ...e, l: or((e.l ?? 0.5) + t, 0, 1) };
}
function Ct(e, t) {
  const n = ia({ ...e, alpha: void 0 }) ?? "#000000", a = Math.round(or(t, 0, 1) * 255).toString(16).padStart(2, "0");
  return `${n}${a}`;
}
function or(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
let lr = we;
const _t = /* @__PURE__ */ new Set(), It = /* @__PURE__ */ new Set();
function la(e) {
  return It.add(e), () => {
    It.delete(e);
  };
}
function ts(e) {
  const t = {
    mode: e.mode ?? we.mode,
    brand: e.brand ?? we.brand,
    logos: e.logos,
    content: e.content,
    assets: e.assets,
    overrides: Dt(we.overrides ?? {}, e.overrides)
  };
  if (lr = t, typeof document < "u") {
    const n = document.documentElement;
    n.dataset.theme = t.mode;
    const a = sa(t);
    for (const i of _t)
      i in a || n.style.removeProperty(i);
    _t.clear();
    for (const [i, s] of Object.entries(a))
      n.style.setProperty(i, s), _t.add(i);
  }
  for (const n of It) n(t);
}
function ns() {
  return lr;
}
var Ft = { exports: {} }, ye = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nn;
function da() {
  if (Nn) return ye;
  Nn = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(a, i, s) {
    var o = null;
    if (s !== void 0 && (o = "" + s), i.key !== void 0 && (o = "" + i.key), "key" in i) {
      s = {};
      for (var l in i)
        l !== "key" && (s[l] = i[l]);
    } else s = i;
    return i = s.ref, {
      $$typeof: e,
      type: a,
      key: o,
      ref: i !== void 0 ? i : null,
      props: s
    };
  }
  return ye.Fragment = t, ye.jsx = n, ye.jsxs = n, ye;
}
var je = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mn;
function ca() {
  return Mn || (Mn = 1, process.env.NODE_ENV !== "production" && function() {
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
        case S:
          return "StrictMode";
        case E:
          return "Suspense";
        case Z:
          return "SuspenseList";
        case Y:
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
          case u:
            var y = x.render;
            return x = x.displayName, x || (x = y.displayName || y.name || "", x = x !== "" ? "ForwardRef(" + x + ")" : "ForwardRef"), x;
          case Q:
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
    function n(x) {
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
    function a(x) {
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
    function i() {
      var x = q.A;
      return x === null ? null : x.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function o(x) {
      if (he.call(x, "key")) {
        var y = Object.getOwnPropertyDescriptor(x, "key").get;
        if (y && y.isReactWarning) return !1;
      }
      return x.key !== void 0;
    }
    function l(x, y) {
      function $() {
        be || (be = !0, console.error(
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
      return ne[x] || (ne[x] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), x = this.props.ref, x !== void 0 ? x : null;
    }
    function c(x, y, $, P, ie, ae) {
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
        value: ie
      }), Object.defineProperty(x, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ae
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    }
    function f(x, y, $, P, ie, ae) {
      var z = y.children;
      if (z !== void 0)
        if (P)
          if (pe(z)) {
            for (P = 0; P < z.length; P++)
              m(z[P]);
            Object.freeze && Object.freeze(z);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else m(z);
      if (he.call(y, "key")) {
        z = e(x);
        var se = Object.keys(y).filter(function(xr) {
          return xr !== "key";
        });
        P = 0 < se.length ? "{key: someKey, " + se.join(": ..., ") + ": ...}" : "{key: someKey}", Pe[z + P] || (se = 0 < se.length ? "{" + se.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          P,
          z,
          se,
          z
        ), Pe[z + P] = !0);
      }
      if (z = null, $ !== void 0 && (n($), z = "" + $), o(y) && (n(y.key), z = "" + y.key), "key" in y) {
        $ = {};
        for (var tt in y)
          tt !== "key" && ($[tt] = y[tt]);
      } else $ = y;
      return z && l(
        $,
        typeof x == "function" ? x.displayName || x.name || "Unknown" : x
      ), c(
        x,
        z,
        $,
        i(),
        ie,
        ae
      );
    }
    function m(x) {
      b(x) ? x._store && (x._store.validated = 1) : typeof x == "object" && x !== null && x.$$typeof === B && (x._payload.status === "fulfilled" ? b(x._payload.value) && x._payload.value._store && (x._payload.value._store.validated = 1) : x._store && (x._store.validated = 1));
    }
    function b(x) {
      return typeof x == "object" && x !== null && x.$$typeof === k;
    }
    var v = ur, k = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), I = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), D = Symbol.for("react.client.reference"), q = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, he = Object.prototype.hasOwnProperty, pe = Array.isArray, me = console.createTask ? console.createTask : function() {
      return null;
    };
    v = {
      react_stack_bottom_frame: function(x) {
        return x();
      }
    };
    var be, ne = {}, ge = v.react_stack_bottom_frame.bind(
      v,
      s
    )(), re = me(a(s)), Pe = {};
    je.Fragment = M, je.jsx = function(x, y, $) {
      var P = 1e4 > q.recentlyCreatedOwnerStacks++;
      return f(
        x,
        y,
        $,
        !1,
        P ? Error("react-stack-top-frame") : ge,
        P ? me(a(x)) : re
      );
    }, je.jsxs = function(x, y, $) {
      var P = 1e4 > q.recentlyCreatedOwnerStacks++;
      return f(
        x,
        y,
        $,
        !0,
        P ? Error("react-stack-top-frame") : ge,
        P ? me(a(x)) : re
      );
    };
  }()), je;
}
process.env.NODE_ENV === "production" ? Ft.exports = da() : Ft.exports = ca();
var r = Ft.exports;
const fa = {
  config: we,
  content: _n,
  assets: {}
}, dr = mr(fa);
function rs({ value: e, children: t }) {
  const [n, a] = j(null);
  G(() => la(a), []);
  const i = n ?? e, s = hr(
    () => ({
      config: i,
      content: Dt(_n, i.content),
      assets: i.assets ?? {}
    }),
    [i]
  );
  return /* @__PURE__ */ r.jsx(dr.Provider, { value: s, children: t });
}
function Vt() {
  return pr(dr);
}
function is(e) {
  const { content: t } = Vt();
  return xa(t, e);
}
function xa(e, t) {
  const n = t.split(".");
  let a = e;
  for (const i of n) {
    if (a == null || typeof a != "object") return "";
    a = a[i];
  }
  return a;
}
const Cn = /* @__PURE__ */ new Set();
function as(e) {
  const { assets: t } = Vt();
  return t[e];
}
function ss(e) {
  if (!(typeof document > "u"))
    for (const t of e) {
      if (!(t != null && t.src) || Cn.has(t.src)) continue;
      const n = document.createElement("link");
      n.rel = "preload", n.href = t.src, n.as = t.type === "JSON" ? "fetch" : "image", t.type === "JSON" && (n.crossOrigin = "anonymous"), document.head.appendChild(n), Cn.add(t.src);
    }
}
function os() {
  return Vt().config;
}
function T({
  variant: e = "default",
  size: t = "md",
  icon: n,
  iconLeft: a,
  iconRight: i,
  children: s,
  className: o,
  style: l,
  ...d
}) {
  const c = [
    "btn",
    e !== "default" ? e : "",
    t === "sm" ? "px-3 py-2 text-xs" : "",
    o
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ r.jsxs("button", { className: c, style: l, ...d, children: [
    a,
    s,
    i ?? n
  ] });
}
const ua = {
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
function ha({ children: e, tone: t = "default", dot: n, className: a, style: i }) {
  const s = t !== "default" ? ua[t] : {};
  return /* @__PURE__ */ r.jsxs(
    "span",
    {
      className: ["chip", a].filter(Boolean).join(" "),
      style: { ...s, ...i },
      children: [
        n && /* @__PURE__ */ r.jsx("span", { className: "inline-block w-[5px] h-[5px] rounded-full bg-current shrink-0" }),
        e
      ]
    }
  );
}
function Te({ className: e, ...t }) {
  return /* @__PURE__ */ r.jsx("input", { className: ["input", e].filter(Boolean).join(" "), ...t });
}
function cr({ className: e, style: t, ...n }) {
  return /* @__PURE__ */ r.jsx(
    "textarea",
    {
      className: ["input resize-y min-h-[120px] leading-relaxed", e].filter(Boolean).join(" "),
      style: t,
      ...n
    }
  );
}
function pa({
  label: e,
  labelInside: t,
  adornmentLeft: n,
  adornmentRight: a,
  hint: i,
  error: s,
  style: o,
  ...l
}) {
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    e && /* @__PURE__ */ r.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: e }),
    /* @__PURE__ */ r.jsxs("div", { className: "relative flex items-center", children: [
      n && /* @__PURE__ */ r.jsx("div", { className: "absolute left-3 z-[1] text-ink-dim flex items-center pointer-events-none", children: n }),
      t ? /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "input flex flex-col gap-0.5 py-2 px-3.5 cursor-text w-full",
          style: {
            paddingLeft: n ? 38 : void 0,
            paddingRight: a ? 38 : void 0
          },
          children: [
            /* @__PURE__ */ r.jsx("span", { className: "font-mono text-[9px] tracking-[0.1em] uppercase text-ink-dim leading-none", children: t }),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                className: "bg-transparent border-none outline-none text-ink text-sm p-0",
                ...l
              }
            )
          ]
        }
      ) : /* @__PURE__ */ r.jsx(
        Te,
        {
          className: "w-full",
          style: {
            paddingLeft: n ? 38 : void 0,
            paddingRight: a ? 38 : void 0,
            ...o
          },
          ...l
        }
      ),
      a && /* @__PURE__ */ r.jsx("div", { className: "absolute right-3 z-[1] text-ink-dim flex items-center", children: a })
    ] }),
    (i || s) && /* @__PURE__ */ r.jsx(
      "span",
      {
        className: `text-[11px] font-mono leading-tight ${s ? "text-danger" : "text-ink-faint"}`,
        children: s ?? i
      }
    )
  ] });
}
function ma({ value: e, max: t, style: n = "segmented", segments: a = 10, label: i }) {
  const s = Math.max(0, Math.min(1, e / t));
  if (n === "plain")
    return /* @__PURE__ */ r.jsxs("div", { children: [
      i && /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ r.jsx("span", { children: i }),
        /* @__PURE__ */ r.jsxs("span", { children: [
          e,
          "/",
          t
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "xpbar", children: /* @__PURE__ */ r.jsx("div", { className: "fill", style: { width: `${s * 100}%` } }) })
    ] });
  if (n === "segmented") {
    const o = Math.round(s * a);
    return /* @__PURE__ */ r.jsxs("div", { children: [
      i && /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ r.jsx("span", { children: i }),
        /* @__PURE__ */ r.jsxs("span", { children: [
          e,
          "/",
          t
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "xp-seg", children: Array.from({ length: a }).map((l, d) => /* @__PURE__ */ r.jsx("div", { className: `seg ${d < o ? "on" : ""}` }, d)) })
    ] });
  }
  if (n === "ring") {
    const l = 2 * Math.PI * 30;
    return /* @__PURE__ */ r.jsxs("div", { className: "inline-flex items-center gap-3", children: [
      /* @__PURE__ */ r.jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", children: [
        /* @__PURE__ */ r.jsx("circle", { cx: "40", cy: "40", r: 30, fill: "none", stroke: "var(--panel-2)", strokeWidth: "6" }),
        /* @__PURE__ */ r.jsx(
          "circle",
          {
            cx: "40",
            cy: "40",
            r: 30,
            fill: "none",
            stroke: "var(--color-primary)",
            strokeWidth: "6",
            strokeDasharray: l,
            strokeDashoffset: l * (1 - s),
            transform: "rotate(-90 40 40)",
            strokeLinecap: "round",
            style: {
              filter: "drop-shadow(0 0 6px var(--color-primary))",
              transition: "stroke-dashoffset 800ms ease"
            }
          }
        ),
        /* @__PURE__ */ r.jsxs(
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
              Math.round(s * 100),
              "%"
            ]
          }
        )
      ] }),
      i && /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx("div", { className: "font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim", children: i }),
        /* @__PURE__ */ r.jsxs("div", { className: "font-mono text-sm font-bold", children: [
          e,
          "/",
          t
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ r.jsxs("div", { children: [
    i && /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between mb-1.5 font-mono text-[11px] text-ink-dim", children: [
      /* @__PURE__ */ r.jsx("span", { children: i }),
      /* @__PURE__ */ r.jsxs("span", { children: [
        e,
        "/",
        t
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "relative h-3.5 border border-border rounded-[3px] bg-panel-2 overflow-hidden", children: [
      /* @__PURE__ */ r.jsx(
        "div",
        {
          className: "absolute inset-0.5 rounded-sm",
          style: {
            background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) ${s * 100}%, transparent ${s * 100}%)`
          }
        }
      ),
      /* @__PURE__ */ r.jsx(
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
function ba({ size: e = 28 }) {
  return /* @__PURE__ */ r.jsxs("svg", { width: e, height: e, viewBox: "0 0 32 32", children: [
    /* @__PURE__ */ r.jsx("defs", { children: /* @__PURE__ */ r.jsxs("linearGradient", { id: "lg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ r.jsx("stop", { offset: "0", stopColor: "var(--color-primary)" }),
      /* @__PURE__ */ r.jsx("stop", { offset: "1", stopColor: "var(--accent-magenta)" })
    ] }) }),
    /* @__PURE__ */ r.jsx("polygon", { points: "16,2 28,9 28,23 16,30 4,23 4,9", fill: "url(#lg)" }),
    /* @__PURE__ */ r.jsx("polygon", { points: "16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5", fill: "var(--bg)" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "16", cy: "16", r: "3.5", fill: "var(--color-primary)" })
  ] });
}
function ls({
  name: e = "GrowQuest",
  version: t = "v1.4"
}) {
  return /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2.5 font-display font-semibold text-lg tracking-[-0.02em] max-[720px]:text-base max-[420px]:[&_span:last-of-type]:text-sm", children: [
    /* @__PURE__ */ r.jsx("span", { className: "inline-grid place-items-center w-7 h-7 max-[720px]:w-6 max-[720px]:h-6", children: /* @__PURE__ */ r.jsx(ba, {}) }),
    /* @__PURE__ */ r.jsx("span", { children: e }),
    /* @__PURE__ */ r.jsx("span", { className: "chip brand-version", children: t })
  ] });
}
function ce({ children: e, dot: t }) {
  return /* @__PURE__ */ r.jsxs("div", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim", children: [
    t !== !1 && /* @__PURE__ */ r.jsx("span", { className: "w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]" }),
    e
  ] });
}
function X({ children: e, tone: t = "default" }) {
  const n = {
    default: "text-ink-dim border-border bg-panel-2",
    accent: "text-primary border-[color-mix(in_oklch,var(--color-primary)_40%,transparent)] bg-primary-soft",
    lime: "text-accent-lime border-[color-mix(in_oklch,var(--accent-lime)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-lime)_14%,transparent)]",
    magenta: "text-accent-magenta border-[color-mix(in_oklch,var(--accent-magenta)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-magenta)_14%,transparent)]",
    amber: "text-accent-amber border-[color-mix(in_oklch,var(--accent-amber)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-amber)_14%,transparent)]",
    ghost: "text-ink-dim border-border bg-transparent"
  }, a = n[t] ?? n.default;
  return /* @__PURE__ */ r.jsx("span", { className: `chip ${a}`, children: e });
}
function Me({ amount: e, icon: t = !0 }) {
  return /* @__PURE__ */ r.jsxs("span", { className: "chip primary gap-1.5 font-semibold", children: [
    t && /* @__PURE__ */ r.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ r.jsx(
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
function fr({ endsAt: e }) {
  const [t, n] = j(Date.now);
  G(() => {
    const l = setInterval(() => n(Date.now()), 1e3);
    return () => clearInterval(l);
  }, []);
  const a = Math.max(0, e - t), i = Math.floor(a / 36e5).toString().padStart(2, "0"), s = Math.floor(a % 36e5 / 6e4).toString().padStart(2, "0"), o = Math.floor(a % 6e4 / 1e3).toString().padStart(2, "0");
  return /* @__PURE__ */ r.jsxs("span", { className: "mono text-accent-magenta", children: [
    i,
    ":",
    s,
    ":",
    o
  ] });
}
function ga({
  values: e,
  color: t = "var(--color-primary)",
  w: n = 80,
  h: a = 24
}) {
  const i = Math.min(...e), s = Math.max(...e), o = e.map((l, d) => {
    const c = d / (e.length - 1) * n, f = a - (l - i) / (s - i || 1) * (a - 2) - 1;
    return `${c},${f}`;
  }).join(" ");
  return /* @__PURE__ */ r.jsx("svg", { width: n, height: a, viewBox: `0 0 ${n} ${a}`, children: /* @__PURE__ */ r.jsx("polyline", { points: o, fill: "none", stroke: t, strokeWidth: "1.5" }) });
}
function ds({ label: e }) {
  return /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 my-5", children: [
    /* @__PURE__ */ r.jsx("div", { className: "flex-1 h-px bg-border" }),
    e && /* @__PURE__ */ r.jsx("span", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim", children: e }),
    /* @__PURE__ */ r.jsx("div", { className: "flex-1 h-px bg-border" })
  ] });
}
const va = ["cyan", "magenta", "lime", "amber", "violet"], cs = Xe(function({ badges: t, columns: n = 3 }) {
  return /* @__PURE__ */ r.jsxs("div", { className: "panel p-5", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5", children: [
      "// badges · ",
      t.filter((a) => a.got).length,
      "/",
      t.length
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "grid gap-2.5", style: { gridTemplateColumns: `repeat(${n}, 1fr)` }, children: t.map((a, i) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        title: a.desc,
        className: "p-3.5 bg-panel-2 border border-border rounded-[10px] text-center",
        style: { opacity: a.got ? 1 : 0.4 },
        children: [
          /* @__PURE__ */ r.jsx(
            "div",
            {
              className: "w-11 h-11 mx-auto mb-2 rounded-[10px] grid place-items-center border border-border",
              style: {
                background: a.got ? `var(--accent-${va[i % 5]})` : "var(--panel)"
              },
              children: /* @__PURE__ */ r.jsx("svg", { width: "22", height: "22", viewBox: "0 0 22 22", children: /* @__PURE__ */ r.jsx(
                "polygon",
                {
                  points: "11,2 20,7 20,15 11,20 2,15 2,7",
                  fill: a.got ? "#05060A" : "var(--ink-faint)"
                }
              ) })
            }
          ),
          /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-[12px]", children: a.name }),
          /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-ink-faint mt-0.5 font-mono uppercase tracking-[0.08em]", children: a.got ? "unlocked" : "locked" })
        ]
      },
      a.id
    )) })
  ] });
});
function fs({ options: e, value: t, onChange: n }) {
  return /* @__PURE__ */ r.jsx("div", { className: "flex flex-wrap gap-1 p-1 bg-panel-2 border border-border rounded-lg", children: e.map((a) => /* @__PURE__ */ r.jsx(
    "button",
    {
      onClick: () => n(a),
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
      children: a
    },
    a
  )) });
}
function ya({ variant: e = "isometric", accent: t }) {
  const n = t || "var(--color-primary)";
  if (e === "grid-poster")
    return /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      /* @__PURE__ */ r.jsxs("defs", { children: [
        /* @__PURE__ */ r.jsx("pattern", { id: "gp-grid", width: "24", height: "24", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ r.jsx("path", { d: "M24 0H0V24", fill: "none", stroke: n, strokeOpacity: "0.18", strokeWidth: "1" }) }),
        /* @__PURE__ */ r.jsxs("linearGradient", { id: "gp-fade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ r.jsx("stop", { offset: "0", stopColor: n, stopOpacity: "0" }),
          /* @__PURE__ */ r.jsx("stop", { offset: "1", stopColor: n, stopOpacity: "0.35" })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("rect", { width: "480", height: "480", fill: "url(#gp-grid)" }),
      /* @__PURE__ */ r.jsx("rect", { width: "480", height: "480", fill: "url(#gp-fade)" }),
      /* @__PURE__ */ r.jsx(
        "text",
        {
          x: "28",
          y: "60",
          fontFamily: "JetBrains Mono",
          fontSize: "11",
          letterSpacing: "3",
          fill: n,
          opacity: "0.8",
          children: "QUEST // 01"
        }
      ),
      /* @__PURE__ */ r.jsx(
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
      /* @__PURE__ */ r.jsx(
        "text",
        {
          x: "28",
          y: "470",
          fontFamily: "Space Grotesk",
          fontWeight: "700",
          fontSize: "72",
          fill: n,
          letterSpacing: "-2",
          children: "UP."
        }
      ),
      /* @__PURE__ */ r.jsx("circle", { cx: "380", cy: "130", r: "70", fill: "none", stroke: n, strokeWidth: "1.5" }),
      /* @__PURE__ */ r.jsx(
        "circle",
        {
          cx: "380",
          cy: "130",
          r: "40",
          fill: "none",
          stroke: n,
          strokeWidth: "1",
          strokeDasharray: "4 4"
        }
      ),
      /* @__PURE__ */ r.jsx("circle", { cx: "380", cy: "130", r: "8", fill: n })
    ] });
  if (e === "orbital")
    return /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      /* @__PURE__ */ r.jsx("defs", { children: /* @__PURE__ */ r.jsxs("radialGradient", { id: "orb-glow", children: [
        /* @__PURE__ */ r.jsx("stop", { offset: "0", stopColor: n, stopOpacity: "0.55" }),
        /* @__PURE__ */ r.jsx("stop", { offset: "1", stopColor: n, stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ r.jsx("rect", { width: "480", height: "480", fill: "transparent" }),
      /* @__PURE__ */ r.jsx("circle", { cx: "240", cy: "240", r: "200", fill: "url(#orb-glow)" }),
      [160, 110, 60].map((a, i) => /* @__PURE__ */ r.jsx(
        "ellipse",
        {
          cx: "240",
          cy: "240",
          rx: a * 1.6,
          ry: a * 0.5,
          fill: "none",
          stroke: n,
          strokeOpacity: 0.4 - i * 0.1,
          strokeWidth: "1",
          transform: `rotate(${-20 + i * 12} 240 240)`
        },
        i
      )),
      /* @__PURE__ */ r.jsx("circle", { cx: "240", cy: "240", r: "34", fill: n, opacity: "0.9" }),
      /* @__PURE__ */ r.jsx(
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
      [0, 72, 144, 216, 288].map((a, i) => {
        const s = a * Math.PI / 180, o = 240 + Math.cos(s) * 170, l = 240 + Math.sin(s) * 60;
        return /* @__PURE__ */ r.jsx("circle", { cx: o, cy: l, r: 6 + i % 3 * 2, fill: n, opacity: 0.7 }, i);
      }),
      /* @__PURE__ */ r.jsx("text", { x: "30", y: "40", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: n, children: "// ORBIT.SYS" })
    ] });
  if (e === "pixel") {
    const s = [];
    for (let o = 0; o < 12; o++)
      for (let l = 0; l < 12; l++) {
        const d = l + o * 0.5 - 3, c = o - l * 0.3 + 4;
        Math.hypot(d - 5, c - 5) < 3 + Math.sin(o * l * 0.3) * 1.5 && s.push({ x: l * 34 + 30, y: o * 30 + 40, hue: o * l % 3 });
      }
    return /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
      s.map((o, l) => /* @__PURE__ */ r.jsx(
        "rect",
        {
          x: o.x,
          y: o.y,
          width: "28",
          height: "24",
          fill: o.hue === 0 ? n : o.hue === 1 ? "var(--accent-magenta)" : "var(--accent-lime)",
          opacity: 0.6 + o.hue * 0.15
        },
        l
      )),
      /* @__PURE__ */ r.jsx("text", { x: "30", y: "440", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: n, children: "// BLOCK.MAP" })
    ] });
  }
  return /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 480 480", className: "block w-full h-full", children: [
    /* @__PURE__ */ r.jsxs("defs", { children: [
      /* @__PURE__ */ r.jsx(
        "pattern",
        {
          id: "iso-grid",
          width: "48",
          height: "28",
          patternUnits: "userSpaceOnUse",
          patternTransform: "skewX(-30)",
          children: /* @__PURE__ */ r.jsx("path", { d: "M48 0H0V28", fill: "none", stroke: n, strokeOpacity: "0.22", strokeWidth: "1" })
        }
      ),
      /* @__PURE__ */ r.jsxs("radialGradient", { id: "iso-glow", cx: "50%", cy: "55%", children: [
        /* @__PURE__ */ r.jsx("stop", { offset: "0", stopColor: n, stopOpacity: "0.35" }),
        /* @__PURE__ */ r.jsx("stop", { offset: "1", stopColor: n, stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ r.jsxs("linearGradient", { id: "iso-top", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ r.jsx("stop", { offset: "0", stopColor: n }),
        /* @__PURE__ */ r.jsx("stop", { offset: "1", stopColor: "var(--accent-magenta)" })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("rect", { width: "480", height: "480", fill: "url(#iso-grid)", transform: "translate(0 60)" }),
    /* @__PURE__ */ r.jsx("rect", { width: "480", height: "480", fill: "url(#iso-glow)" }),
    /* @__PURE__ */ r.jsxs("g", { transform: "translate(240 270)", children: [
      /* @__PURE__ */ r.jsx(
        "polygon",
        {
          points: "0,-40 140,30 0,100 -140,30",
          fill: n,
          fillOpacity: "0.08",
          stroke: n,
          strokeOpacity: "0.5"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "polygon",
        {
          points: "0,-20 100,22 0,62 -100,22",
          fill: "none",
          stroke: n,
          strokeOpacity: "0.3",
          strokeDasharray: "3 3"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("g", { transform: "translate(240 180)", children: [
      /* @__PURE__ */ r.jsx("polygon", { points: "0,0 70,30 70,100 0,70", fill: "var(--accent-magenta)", opacity: "0.85" }),
      /* @__PURE__ */ r.jsx("polygon", { points: "0,0 -70,30 -70,100 0,70", fill: n, opacity: "0.9" }),
      /* @__PURE__ */ r.jsx("polygon", { points: "0,-40 70,-10 70,30 0,0 -70,30 -70,-10", fill: "url(#iso-top)" }),
      /* @__PURE__ */ r.jsx(
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
    /* @__PURE__ */ r.jsxs(
      "g",
      {
        transform: "translate(90 140)",
        className: "animate-[float_4s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ r.jsx("polygon", { points: "0,0 40,16 40,56 0,40", fill: n, opacity: "0.9" }),
          /* @__PURE__ */ r.jsx("polygon", { points: "0,0 -40,16 -40,56 0,40", fill: n, opacity: "0.65" }),
          /* @__PURE__ */ r.jsx("polygon", { points: "0,-20 40,-4 40,16 0,0 -40,16 -40,-4", fill: n, opacity: "0.5" })
        ]
      }
    ),
    /* @__PURE__ */ r.jsxs(
      "g",
      {
        transform: "translate(380 120)",
        className: "animate-[float_5s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ r.jsx("circle", { r: "26", fill: "var(--accent-magenta)", opacity: "0.85" }),
          /* @__PURE__ */ r.jsx("circle", { r: "26", fill: "none", stroke: "#fff", strokeOpacity: "0.45", strokeWidth: "1" }),
          /* @__PURE__ */ r.jsx("ellipse", { cx: "0", cy: "0", rx: "26", ry: "7", fill: "none", stroke: "#fff", strokeOpacity: "0.3" })
        ]
      }
    ),
    /* @__PURE__ */ r.jsxs("g", { transform: "translate(110 360)", children: [
      /* @__PURE__ */ r.jsx("polygon", { points: "0,0 22,9 22,30 0,21", fill: "var(--accent-lime)" }),
      /* @__PURE__ */ r.jsx("polygon", { points: "0,0 -22,9 -22,30 0,21", fill: "var(--accent-lime)", opacity: "0.7" }),
      /* @__PURE__ */ r.jsx("polygon", { points: "0,-12 22,-3 22,9 0,0 -22,9 -22,-3", fill: "#fff", opacity: "0.85" })
    ] }),
    /* @__PURE__ */ r.jsxs(
      "g",
      {
        transform: "translate(380 380)",
        className: "animate-[float_3.5s_ease-in-out_infinite] will-change-transform",
        children: [
          /* @__PURE__ */ r.jsx("polygon", { points: "0,0 18,8 18,26 0,18", fill: n }),
          /* @__PURE__ */ r.jsx("polygon", { points: "0,0 -18,8 -18,26 0,18", fill: n, opacity: "0.7" }),
          /* @__PURE__ */ r.jsx("polygon", { points: "0,-10 18,-2 18,8 0,0 -18,8 -18,-2", fill: "#fff", opacity: "0.85" })
        ]
      }
    ),
    /* @__PURE__ */ r.jsx("text", { x: "24", y: "36", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: n, children: "// QUEST.WORLD" }),
    /* @__PURE__ */ r.jsx(
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
    /* @__PURE__ */ r.jsx(
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
function Zt({ seed: e = 1, size: t = 40 }) {
  const n = [
    "var(--accent-cyan)",
    "var(--accent-magenta)",
    "var(--accent-lime)",
    "var(--accent-amber)",
    "var(--accent-violet)"
  ], a = n[e % n.length], i = n[(e + 2) % n.length], s = e % 3;
  return /* @__PURE__ */ r.jsxs(
    "svg",
    {
      width: t,
      height: t,
      viewBox: "0 0 40 40",
      className: "block rounded-md border border-border bg-panel-2",
      children: [
        /* @__PURE__ */ r.jsx("rect", { width: "40", height: "40", fill: "var(--panel-2)" }),
        s === 0 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("circle", { cx: "20", cy: "20", r: "12", fill: a }),
          /* @__PURE__ */ r.jsx("circle", { cx: "20", cy: "20", r: "5", fill: i })
        ] }),
        s === 1 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("polygon", { points: "20,6 34,20 20,34 6,20", fill: a }),
          /* @__PURE__ */ r.jsx("rect", { x: "16", y: "16", width: "8", height: "8", fill: i })
        ] }),
        s === 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("rect", { x: "8", y: "8", width: "24", height: "24", fill: a }),
          /* @__PURE__ */ r.jsx("circle", { cx: "20", cy: "20", r: "6", fill: i })
        ] })
      ]
    }
  );
}
function Tt({ type: e, size: t = 22 }) {
  const n = t, a = {
    width: n,
    height: n,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return e === "social" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 12h8M12 8v8" })
  ] }) : e === "photo" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 6l2-3h4l2 3" })
  ] }) : e === "refer" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "9", cy: "10", r: "3" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "17", cy: "8", r: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" })
  ] }) : e === "video" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ r.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor" })
  ] }) : e === "quiz" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-2.5 2-2.5 4M12 17.5v.1" })
  ] }) : e === "review" ? /* @__PURE__ */ r.jsx("svg", { ...a, children: /* @__PURE__ */ r.jsx("polygon", { points: "12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9" }) }) : e === "event" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M3 10h18M8 3v4M16 3v4" })
  ] }) : e === "purchase" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("path", { d: "M5 7h14l-1.5 11H6.5L5 7z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 7V5a3 3 0 016 0v2" })
  ] }) : e === "read_article" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "4", y: "3", width: "16", height: "18", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 8h8M8 12h8M8 16h5" })
  ] }) : e === "profile" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ r.jsx("path", { d: "M15 15l1.5 1.5L19 14" })
  ] }) : e === "avatar" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ r.jsx("path", { d: "M18 14v4M16 16h4" })
  ] }) : e === "verify_email" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "3", y: "6", width: "18", height: "13", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M3 8l9 6 9-6" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14 17l2 2 4-4" })
  ] }) : e === "verify_phone" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "7", y: "2", width: "10", height: "20", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7 6h10M7 18h10" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14 14l1.5 1.5L18 13" })
  ] }) : e === "spin_wheel" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 3v9M12 12l6.4 6.4M12 12H3" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", stroke: "none" })
  ] }) : e === "scratch_card" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7 12c1.5-2 3-2 4 0s2.5 2 4 0", strokeDasharray: "3 2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 16h2M12 16h4" })
  ] }) : e === "badge_collect" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("path", { d: "M12 3l2.2 5.2H20l-4.6 3.4 1.8 5.4L12 14l-5.2 3 1.8-5.4L4 8.2h5.8z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 21h6M12 17.5v3.5" })
  ] }) : e === "share" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("path", { d: "M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16 6l-4-4-4 4M12 2v13" })
  ] }) : e === "invite" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "9", cy: "8", r: "3" }),
    /* @__PURE__ */ r.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M18 8v6M15 11h6" })
  ] }) : e === "photo_proof" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 6l2-3h4l2 3" }),
    /* @__PURE__ */ r.jsx("path", { d: "M15 11l1.5 1.5L19 10" })
  ] }) : e === "follow_social" ? /* @__PURE__ */ r.jsxs("svg", { ...a, children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 12h8M12 8v8" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "18.5", cy: "5.5", r: "2.5", fill: "currentColor", stroke: "none" })
  ] }) : /* @__PURE__ */ r.jsx("svg", { ...a, children: /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "8" }) });
}
function xs({
  heroStyle: e,
  title: t = "Founders' Path",
  subtitle: n = "Complete 8 of 12 missions to unlock the Ascendant lootbox.",
  eyebrow: a = "// current season · week 04"
}) {
  return /* @__PURE__ */ r.jsxs("div", { className: "hero-banner", children: [
    /* @__PURE__ */ r.jsx("div", { className: "hero-banner-bg", children: /* @__PURE__ */ r.jsx(ya, { variant: e }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "hero-banner-content", children: [
      /* @__PURE__ */ r.jsx(ce, { children: a }),
      /* @__PURE__ */ r.jsx("h2", { className: "display m-0 text-[26px] tracking-[-0.02em]", children: t }),
      /* @__PURE__ */ r.jsx("div", { className: "text-[13px] text-ink-dim max-w-[420px]", children: n })
    ] })
  ] });
}
const ja = {
  rank: "rank",
  handle: "insider",
  streak: "streak",
  tier: "tier",
  xp: "xp"
}, us = Xe(function({
  entries: t,
  streakEmoji: n = "🔥",
  columnLabels: a
}) {
  const i = { ...ja, ...a };
  return /* @__PURE__ */ r.jsxs("div", { className: "panel overflow-hidden", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "lb-head lb-row", children: [
      /* @__PURE__ */ r.jsx("span", { children: i.rank }),
      /* @__PURE__ */ r.jsx("span", { children: i.handle }),
      /* @__PURE__ */ r.jsx("span", { className: "lb-streak", children: i.streak }),
      /* @__PURE__ */ r.jsx("span", { className: "lb-tier", children: i.tier }),
      /* @__PURE__ */ r.jsx("span", { className: "lb-cell-right", children: i.xp })
    ] }),
    t.map((s) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "lb-row",
        style: { background: s.me ? "var(--leaderboard-mine-bg)" : "var(--leaderboard-row-bg)" },
        children: [
          /* @__PURE__ */ r.jsx(
            "span",
            {
              className: "mono font-bold",
              style: { color: s.rank <= 3 ? "var(--leaderboard-top-rank)" : "var(--ink)" },
              children: String(s.rank).padStart(2, "0")
            }
          ),
          /* @__PURE__ */ r.jsxs("span", { className: "lb-identity", children: [
            /* @__PURE__ */ r.jsx(Zt, { seed: s.seed, size: 28 }),
            /* @__PURE__ */ r.jsx("span", { className: "font-semibold text-[14px]", children: s.handle }),
            s.me && /* @__PURE__ */ r.jsx(X, { tone: "accent", children: "YOU" })
          ] }),
          /* @__PURE__ */ r.jsxs("span", { className: "mono lb-streak text-[13px] text-accent-amber", children: [
            s.streak,
            n
          ] }),
          /* @__PURE__ */ r.jsx("span", { className: "lb-tier", children: /* @__PURE__ */ r.jsx(
            X,
            {
              tone: s.tier === "Oracle" ? "magenta" : s.tier === "Ascendant" ? "lime" : "accent",
              children: s.tier
            }
          ) }),
          /* @__PURE__ */ r.jsx("span", { className: "mono lb-xp", children: s.xp.toLocaleString() })
        ]
      },
      s.rank
    ))
  ] });
});
function Lt({ shape: e, tint: t }) {
  const n = `var(--accent-${t})`;
  return /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 100 100", className: "block w-full h-full", children: [
    /* @__PURE__ */ r.jsx("rect", { width: "100", height: "100", fill: "var(--panel)" }),
    /* @__PURE__ */ r.jsx("g", { opacity: "0.18", stroke: n, strokeWidth: "1", children: Array.from({ length: 10 }).map((a, i) => /* @__PURE__ */ r.jsx("line", { x1: "0", y1: i * 10, x2: "100", y2: i * 10 }, i)) }),
    e === "hex" && /* @__PURE__ */ r.jsx("polygon", { points: "50,14 84,32 84,68 50,86 16,68 16,32", fill: n }),
    e === "circle" && /* @__PURE__ */ r.jsx("circle", { cx: "50", cy: "50", r: "30", fill: n }),
    e === "diamond" && /* @__PURE__ */ r.jsx("polygon", { points: "50,14 86,50 50,86 14,50", fill: n }),
    e === "square" && /* @__PURE__ */ r.jsx("rect", { x: "22", y: "22", width: "56", height: "56", fill: n })
  ] });
}
function le({
  selected: e,
  correct: t,
  wrong: n,
  disabled: a,
  onClick: i,
  children: s,
  layout: o = "row"
}) {
  const l = t ? "var(--accent-lime)" : n ? "var(--danger)" : e ? "var(--color-primary)" : "var(--border)", d = t ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : n ? "color-mix(in oklch, var(--danger) 14%, transparent)" : e ? "var(--color-primary-soft)" : "var(--panel-2)", c = o === "row" ? "py-3.5 px-4 rounded-lg flex flex-row items-center gap-3" : "p-2.5 rounded-[10px] flex flex-col gap-2";
  return /* @__PURE__ */ r.jsx(
    "button",
    {
      disabled: a,
      onClick: i,
      className: `text-left border ${c}`,
      style: { borderColor: l, background: d },
      children: s
    }
  );
}
const $t = {
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
function ka({
  variant: e,
  onComplete: t
}) {
  const n = e === "text" ? $t.text : e === "textImage" ? $t.textImage : $t.imageOnly, [a, i] = j(null), [s, o] = j(!1), l = n.correct === a;
  return /* @__PURE__ */ r.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsxs(ce, { children: [
      "// quiz · 1 of 5 ·",
      " ",
      e === "text" ? "text answers" : e === "textImage" ? "text + image" : "images only"
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: n.q }),
    e === "text" && /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-2", children: n.choices.map((d) => {
      const c = a === d.id, f = s && d.id === n.correct, m = s && c && !l;
      return /* @__PURE__ */ r.jsxs(
        le,
        {
          selected: c,
          correct: f,
          wrong: m,
          disabled: s,
          onClick: () => i(d.id),
          layout: "row",
          children: [
            /* @__PURE__ */ r.jsx("span", { className: "mono w-6 h-6 rounded-[5px] border border-border bg-panel grid place-items-center text-[11px] font-bold shrink-0", children: d.id.toUpperCase() }),
            /* @__PURE__ */ r.jsx("span", { className: "flex-1 text-sm", children: d.label }),
            f && /* @__PURE__ */ r.jsx(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "var(--accent-lime)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ r.jsx("path", { d: "M3 8.5l3.5 3.5L13 5" })
              }
            ),
            m && /* @__PURE__ */ r.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                fill: "none",
                stroke: "var(--danger)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ r.jsx("path", { d: "M3 3l8 8M11 3l-8 8" })
              }
            )
          ]
        },
        d.id
      );
    }) }),
    e === "textImage" && /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: n.choices.map((d) => {
      const c = a === d.id, f = s && d.id === n.correct, m = s && c && !l;
      return /* @__PURE__ */ r.jsxs(
        le,
        {
          selected: c,
          correct: f,
          wrong: m,
          disabled: s,
          onClick: () => i(d.id),
          layout: "column",
          children: [
            /* @__PURE__ */ r.jsxs("div", { className: "aspect-[16/10] rounded-md overflow-hidden bg-panel relative", children: [
              /* @__PURE__ */ r.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${d.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`
                  }
                }
              ),
              /* @__PURE__ */ r.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ r.jsxs(
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
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-[13px] text-left", children: [
              /* @__PURE__ */ r.jsx("span", { className: "mono w-5 h-5 rounded-[4px] border border-border grid place-items-center text-[10px] font-bold shrink-0", children: d.id.toUpperCase() }),
              /* @__PURE__ */ r.jsx("span", { children: d.label })
            ] })
          ]
        },
        d.id
      );
    }) }),
    e === "imageOnly" && /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: n.choices.map((d) => {
      const c = a === d.id, f = s && d.id === n.correct, m = s && c && !l;
      return /* @__PURE__ */ r.jsx(
        le,
        {
          selected: c,
          correct: f,
          wrong: m,
          disabled: s,
          onClick: () => i(d.id),
          layout: "column",
          children: /* @__PURE__ */ r.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ r.jsx(Lt, { shape: d.shape, tint: d.tint }) })
        },
        d.id
      );
    }) }),
    s && /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: `p-3 rounded-lg text-[13px] border ${l ? "border-accent-lime" : "border-danger"}`,
        style: {
          background: l ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)"
        },
        children: [
          /* @__PURE__ */ r.jsx("strong", { children: l ? "Correct!" : "Not quite." }),
          " ",
          l ? "Nicely done." : "The correct answer is A."
        ]
      }
    ),
    /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: s ? /* @__PURE__ */ r.jsx(T, { variant: "primary", className: "flex-1", onClick: t, children: "Continue" }) : /* @__PURE__ */ r.jsx(
      T,
      {
        variant: "primary",
        className: "flex-1",
        disabled: !a,
        onClick: () => o(!0),
        children: "Submit answer"
      }
    ) })
  ] });
}
const wa = {
  q: "Which GrowQuest feature would you use most?",
  choices: [
    { id: "a", label: "Daily missions" },
    { id: "b", label: "Spin-to-win lootbox" },
    { id: "c", label: "Referral boosts" },
    { id: "d", label: "Leaderboard competition" }
  ]
}, Na = {
  q: "Which hero style fits your brand?",
  choices: [
    { id: "a", label: "Isometric world", tint: "cyan" },
    { id: "b", label: "Orbital / cosmic", tint: "magenta" },
    { id: "c", label: "Editorial poster", tint: "lime" },
    { id: "d", label: "Pixel / arcade", tint: "amber" }
  ]
}, Ma = {
  q: "Pick your favorite vibe:",
  choices: [
    { id: "a", shape: "hex", tint: "cyan" },
    { id: "b", shape: "circle", tint: "magenta" },
    { id: "c", shape: "diamond", tint: "lime" },
    { id: "d", shape: "square", tint: "amber" }
  ]
};
function Ca({
  variant: e,
  onComplete: t,
  textMinLength: n = 20
}) {
  const [a, i] = j(null), [s, o] = j("");
  if (e === "textarea")
    return /* @__PURE__ */ r.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
      /* @__PURE__ */ r.jsx(ce, { children: "// survey · open question" }),
      /* @__PURE__ */ r.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: "What's the single biggest pain point in your growth stack right now?" }),
      /* @__PURE__ */ r.jsx(
        cr,
        {
          value: s,
          onChange: (d) => o(d.target.value),
          placeholder: `Type your answer… (minimum ${n} characters)`,
          className: "min-h-[180px]"
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between font-mono text-[11px] text-ink-dim", children: [
        /* @__PURE__ */ r.jsxs("span", { children: [
          s.length,
          " chars"
        ] }),
        /* @__PURE__ */ r.jsx("span", { children: s.length >= n ? "ready to submit" : `${n - s.length} more to go` })
      ] }),
      /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: s.length < n, onClick: t, children: "Submit feedback" })
    ] });
  const l = e === "text" ? wa : e === "textImage" ? Na : Ma;
  return /* @__PURE__ */ r.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsx(ce, { children: "// survey · your take helps shape the roadmap" }),
    /* @__PURE__ */ r.jsx("div", { className: "text-[17px] font-semibold leading-snug", children: l.q }),
    e === "text" && /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-2", children: l.choices.map((d) => {
      const c = a === d.id;
      return /* @__PURE__ */ r.jsxs(le, { selected: c, onClick: () => i(d.id), layout: "row", children: [
        /* @__PURE__ */ r.jsx(
          "span",
          {
            className: `w-[18px] h-[18px] rounded-full border-2 grid place-items-center shrink-0 ${c ? "border-accent" : "border-border"}`,
            children: c && /* @__PURE__ */ r.jsx("span", { className: "w-2 h-2 rounded-full bg-primary" })
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: "flex-1 text-sm", children: d.label })
      ] }, d.id);
    }) }),
    e === "textImage" && /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: l.choices.map((d) => {
      const c = a === d.id;
      return /* @__PURE__ */ r.jsxs(
        le,
        {
          selected: c,
          onClick: () => i(d.id),
          layout: "column",
          children: [
            /* @__PURE__ */ r.jsx("div", { className: "aspect-[16/10] rounded-md overflow-hidden", children: /* @__PURE__ */ r.jsx(
              Lt,
              {
                shape: ["hex", "circle", "diamond", "square"][d.id.charCodeAt(0) - 97],
                tint: d.tint
              }
            ) }),
            /* @__PURE__ */ r.jsx("div", { className: "text-left text-[13px]", children: d.label })
          ]
        },
        d.id
      );
    }) }),
    e === "imageOnly" && /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: l.choices.map((d) => {
      const c = a === d.id;
      return /* @__PURE__ */ r.jsx(
        le,
        {
          selected: c,
          onClick: () => i(d.id),
          layout: "column",
          children: /* @__PURE__ */ r.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ r.jsx(Lt, { shape: d.shape, tint: d.tint }) })
        },
        d.id
      );
    }) }),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !a, onClick: t, children: "Submit" })
  ] });
}
function _a({
  onComplete: e,
  word: t = "GROWQUEST",
  maxWrong: n = 6,
  category: a = "growth engine brand"
}) {
  const [i, s] = j([]), o = i.filter((c) => !t.includes(c)), l = t.split("").every((c) => i.includes(c)), d = o.length >= n;
  return /* @__PURE__ */ r.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsxs(ce, { children: [
      "// hangman · guess the word · ",
      n - o.length,
      " lives"
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "text-sm text-ink-dim", children: [
      "Category: ",
      a
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "grid items-center gap-4 grid-cols-[120px_1fr] max-[720px]:grid-cols-[80px_1fr] max-[720px]:gap-2.5", children: [
      /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 100 130", width: "100", height: "130", children: [
        /* @__PURE__ */ r.jsx("line", { x1: "10", y1: "125", x2: "90", y2: "125", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ r.jsx("line", { x1: "30", y1: "125", x2: "30", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ r.jsx("line", { x1: "30", y1: "10", x2: "75", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        /* @__PURE__ */ r.jsx("line", { x1: "75", y1: "10", x2: "75", y2: "25", stroke: "var(--ink-dim)", strokeWidth: "3" }),
        o.length > 0 && /* @__PURE__ */ r.jsx("circle", { cx: "75", cy: "34", r: "9", fill: "none", stroke: "var(--danger)", strokeWidth: "2.5" }),
        o.length > 1 && /* @__PURE__ */ r.jsx("line", { x1: "75", y1: "43", x2: "75", y2: "75", stroke: "var(--danger)", strokeWidth: "2.5" }),
        o.length > 2 && /* @__PURE__ */ r.jsx("line", { x1: "75", y1: "55", x2: "62", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
        o.length > 3 && /* @__PURE__ */ r.jsx("line", { x1: "75", y1: "55", x2: "88", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
        o.length > 4 && /* @__PURE__ */ r.jsx("line", { x1: "75", y1: "75", x2: "65", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" }),
        o.length > 5 && /* @__PURE__ */ r.jsx("line", { x1: "75", y1: "75", x2: "85", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex gap-1.5 flex-wrap", children: t.split("").map((c, f) => /* @__PURE__ */ r.jsx(
        "span",
        {
          className: `w-7 h-9 border-b-2 border-ink-dim grid place-items-center font-mono text-xl font-bold ${i.includes(c) ? "text-primary" : "text-transparent"}`,
          children: c
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "grid gap-1 grid-cols-9 max-[720px]:grid-cols-7 max-[420px]:grid-cols-6", children: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => {
      const f = i.includes(c), m = f && !t.includes(c), b = f && t.includes(c);
      return /* @__PURE__ */ r.jsx(
        "button",
        {
          disabled: f || l || d,
          onClick: () => s([...i, c]),
          className: `py-2 px-0 rounded-[5px] border border-border font-mono text-xs font-bold ${f ? "opacity-70" : "opacity-100"} ${b ? "bg-primary-soft text-primary" : m ? "text-danger" : "bg-panel-2 text-ink"}`,
          style: {
            background: m ? "color-mix(in oklch, var(--danger) 18%, transparent)" : void 0
          },
          children: c
        },
        c
      );
    }) }),
    (l || d) && /* @__PURE__ */ r.jsx(
      "div",
      {
        className: `p-3 rounded-lg text-[13px] border ${l ? "border-accent-lime" : "border-danger"}`,
        style: {
          background: l ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)"
        },
        children: l ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("strong", { children: "Solved!" }),
          " You cracked ",
          t,
          "."
        ] }) : /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("strong", { children: "Game over." }),
          " The word was ",
          /* @__PURE__ */ r.jsx("strong", { children: t }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !l && !d, onClick: e, children: "Continue" })
  ] });
}
const Ta = [
  { q: "How many tiers are in GrowQuest?", choices: ["2", "3", "4", "5"], correct: 2 },
  {
    q: "What currency powers redemptions?",
    choices: ["USD", "XP", "Tokens", "Credits"],
    correct: 1
  },
  { q: "Streak bonus milestone lands at day…", choices: ["3", "5", "7", "10"], correct: 2 }
];
function $a({
  onComplete: e,
  questions: t = Ta,
  timeLimit: n = 15,
  passScore: a = 2
}) {
  const [i, s] = j(0), [o, l] = j(null), [d, c] = j(0), [f, m] = j(n), [b, v] = j("answering");
  G(() => {
    if (b !== "answering") return;
    if (f <= 0) {
      v("reveal");
      return;
    }
    const w = setTimeout(() => m(f - 1), 1e3);
    return () => clearTimeout(w);
  }, [f, b]), G(() => {
    m(n), l(null), v("answering");
  }, [i, n]);
  const k = t[i], C = o === k.correct;
  function M(w) {
    b === "answering" && (l(w), v("reveal"), w === k.correct && c((_) => _ + 1));
  }
  function S() {
    i === t.length - 1 ? v("done") : s(i + 1);
  }
  if (b === "done") {
    const w = Math.round(d / t.length * 100), _ = d >= a;
    return /* @__PURE__ */ r.jsxs("div", { className: "p-7 text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "w-[120px] h-[120px] mx-auto mb-4 relative", children: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 120 120", children: [
        /* @__PURE__ */ r.jsx("circle", { cx: "60", cy: "60", r: "50", fill: "none", stroke: "var(--panel-2)", strokeWidth: "10" }),
        /* @__PURE__ */ r.jsx(
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
        /* @__PURE__ */ r.jsxs(
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
      /* @__PURE__ */ r.jsx("div", { className: "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-dim mb-1.5", children: "// trivia complete" }),
      /* @__PURE__ */ r.jsx("h3", { className: "display m-0 mb-2 text-[22px] tracking-[-0.02em]", children: _ ? "Nice run!" : "Keep training." }),
      /* @__PURE__ */ r.jsx("p", { className: "text-ink-dim text-[13px] mb-4", children: _ ? "You beat the bar — XP unlocked." : `Needed ${a}/${t.length} to pass. Try again tomorrow for another shot.` }),
      /* @__PURE__ */ r.jsx(T, { variant: "primary", className: "w-full", onClick: e, children: "Continue" })
    ] });
  }
  return /* @__PURE__ */ r.jsxs("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ r.jsxs(ce, { children: [
        "// trivia · q",
        i + 1,
        " / ",
        t.length
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ r.jsxs(ha, { tone: "accent", children: [
          "SCORE ",
          d
        ] }),
        /* @__PURE__ */ r.jsxs(
          "span",
          {
            className: `mono py-1 px-2 border rounded-[4px] text-xs ${f < 5 ? "border-danger text-danger" : "border-border text-ink"}`,
            children: [
              "⏱ ",
              String(f).padStart(2, "0"),
              "s"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "h-1 bg-panel-2 rounded-full overflow-hidden", children: /* @__PURE__ */ r.jsx(
      "div",
      {
        className: `h-full transition-[width] duration-1000 ease-linear ${f < 5 ? "bg-danger" : "bg-primary"}`,
        style: { width: `${f / n * 100}%` }
      }
    ) }),
    /* @__PURE__ */ r.jsx("div", { className: "text-[18px] font-semibold leading-snug py-2.5 px-0", children: k.q }),
    /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 gap-2", children: k.choices.map((w, _) => {
      const I = o === _, u = b === "reveal" && _ === k.correct, E = b === "reveal" && I && !C;
      return /* @__PURE__ */ r.jsxs(
        "button",
        {
          disabled: b !== "answering",
          onClick: () => M(_),
          className: `py-4 px-3.5 rounded-lg text-left flex items-center gap-2.5 text-sm border ${u ? "border-accent-lime" : E ? "border-danger" : I ? "border-accent" : "border-border"} ${u || E ? "" : "bg-panel-2"}`,
          style: u ? { background: "color-mix(in oklch, var(--accent-lime) 14%, transparent)" } : E ? { background: "color-mix(in oklch, var(--danger) 14%, transparent)" } : void 0,
          children: [
            /* @__PURE__ */ r.jsx("span", { className: "mono w-[22px] h-[22px] rounded-[4px] border border-border bg-panel grid place-items-center text-[11px] font-bold", children: String.fromCharCode(65 + _) }),
            /* @__PURE__ */ r.jsx("span", { children: w })
          ]
        },
        _
      );
    }) }),
    b === "reveal" && /* @__PURE__ */ r.jsx(T, { variant: "primary", onClick: S, children: i === t.length - 1 ? "See results" : "Next question" })
  ] });
}
function Sa(e) {
  const t = e.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (t) return { kind: "youtube", id: t[1] };
  const n = e.match(/vimeo\.com\/(\d+)/);
  return n ? { kind: "vimeo", id: n[1] } : { kind: "native" };
}
function Ea({ url: e, onComplete: t }) {
  const [n, a] = j(!1), [i, s] = j(10), o = Sa(e);
  return G(() => {
    if (o.kind === "native") return;
    const l = setInterval(() => {
      s((d) => d <= 1 ? (clearInterval(l), a(!0), 0) : d - 1);
    }, 1e3);
    return () => clearInterval(l);
  }, [o.kind]), /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "relative pb-[56.25%] bg-panel-2 rounded-lg overflow-hidden", children: [
      o.kind === "youtube" && /* @__PURE__ */ r.jsx(
        "iframe",
        {
          title: "YouTube video player",
          className: "absolute inset-0 w-full h-full border-none",
          src: `https://www.youtube.com/embed/${o.id}?autoplay=1`,
          allow: "autoplay; encrypted-media",
          allowFullScreen: !0
        }
      ),
      o.kind === "vimeo" && /* @__PURE__ */ r.jsx(
        "iframe",
        {
          title: "Vimeo video player",
          className: "absolute inset-0 w-full h-full border-none",
          src: `https://player.vimeo.com/video/${o.id}?autoplay=1`,
          allow: "autoplay; fullscreen",
          allowFullScreen: !0
        }
      ),
      o.kind === "native" && /* @__PURE__ */ r.jsx(
        "video",
        {
          className: "absolute inset-0 w-full h-full",
          src: e,
          controls: !0,
          onEnded: () => a(!0),
          children: /* @__PURE__ */ r.jsx("track", { kind: "captions" })
        }
      )
    ] }),
    o.kind !== "native" && !n && /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-ink-dim text-center", children: [
      "Button available in ",
      i,
      "s"
    ] }),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !n, onClick: t, className: "w-full", children: "I've watched it" })
  ] });
}
function Pa({
  url: e,
  onComplete: t
}) {
  const [n, a] = j(!1), [i, s] = j(60), [o, l] = j(!1);
  G(() => {
    if (!n) return;
    const c = setInterval(() => {
      s((f) => f <= 1 ? (clearInterval(c), l(!0), 0) : f - 1);
    }, 1e3);
    return () => clearInterval(c);
  }, [n]);
  const d = n ? Math.round((60 - i) / 60 * 100) : 0;
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "p-4 bg-panel-2 border border-border rounded-[10px] flex flex-col gap-2", children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim font-mono uppercase tracking-[0.06em]", children: "Article" }),
      /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-[15px]", children: "How XP & Levels work in GrowQuest" }),
      e && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim", children: e.replace(/^https?:\/\//, "") })
    ] }),
    n ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between text-xs text-ink-dim", children: [
        /* @__PURE__ */ r.jsx("span", { children: o ? "Reading complete!" : `Reading… ${i}s remaining` }),
        /* @__PURE__ */ r.jsxs("span", { children: [
          d,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "h-1 bg-panel-2 rounded-sm overflow-hidden", children: /* @__PURE__ */ r.jsx(
        "div",
        {
          className: "h-full bg-primary rounded-sm transition-[width] duration-1000 ease-linear",
          style: { width: `${d}%` }
        }
      ) })
    ] }) : /* @__PURE__ */ r.jsx(
      T,
      {
        variant: "ghost",
        onClick: () => {
          e && window.open(e, "_blank"), a(!0);
        },
        className: "w-full",
        children: "Open article ↗"
      }
    ),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !o, onClick: t, className: "w-full", children: "Mark as read" })
  ] });
}
function za({ onComplete: e }) {
  const [t, n] = j(""), [a, i] = j(""), s = [t.length > 0, a.length > 0].filter(Boolean).length;
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsx(
      pa,
      {
        label: "Display name",
        placeholder: "Your name",
        value: t,
        onChange: (o) => n(o.target.value)
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ r.jsx("span", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: "Bio" }),
      /* @__PURE__ */ r.jsx(
        cr,
        {
          placeholder: "Tell us about yourself…",
          value: a,
          onChange: (o) => i(o.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-xs text-ink-dim", children: [
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 h-1 bg-panel-2 rounded-sm overflow-hidden", children: /* @__PURE__ */ r.jsx(
        "div",
        {
          className: `h-full rounded-sm transition-[width] duration-300 ease-out ${s === 2 ? "bg-accent-lime" : "bg-primary"}`,
          style: { width: `${s / 2 * 100}%` }
        }
      ) }),
      /* @__PURE__ */ r.jsxs("span", { className: "whitespace-nowrap", children: [
        s,
        "/2 fields"
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(
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
function Ra({ onComplete: e }) {
  const [t, n] = j(null), [a, i] = j(null), s = Bt(null);
  function o(l) {
    i(l.name);
    const d = new FileReader();
    d.onload = (c) => {
      var f;
      return n((f = c.target) == null ? void 0 : f.result);
    }, d.readAsDataURL(l);
  }
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsx(
      "input",
      {
        ref: s,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (l) => {
          var d;
          (d = l.target.files) != null && d[0] && o(l.target.files[0]);
        }
      }
    ),
    t ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ r.jsx(
        "img",
        {
          src: t,
          alt: "Preview",
          className: "w-[88px] h-[88px] rounded-full object-cover border-2 border-accent"
        }
      ),
      /* @__PURE__ */ r.jsx("span", { className: "text-xs text-ink-dim", children: a }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => {
            n(null), i(null);
          },
          className: "text-xs text-ink-dim bg-transparent border-none cursor-pointer underline",
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ r.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var l;
          return (l = s.current) == null ? void 0 : l.click();
        },
        onKeyDown: (l) => {
          var d;
          (l.key === "Enter" || l.key === " ") && ((d = s.current) == null || d.click());
        },
        onDragOver: (l) => l.preventDefault(),
        onDrop: (l) => {
          l.preventDefault(), l.dataTransfer.files[0] && o(l.dataTransfer.files[0]);
        },
        className: "border-2 border-dashed border-border rounded-[10px] py-8 px-4 text-center cursor-pointer text-ink-dim text-[13px] transition-colors duration-150",
        children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-[28px] mb-2", children: "📷" }),
          /* @__PURE__ */ r.jsx("div", { children: "Click or drag to upload a photo" }),
          /* @__PURE__ */ r.jsx("div", { className: "text-[11px] mt-1", children: "PNG, JPG up to 5 MB" })
        ]
      }
    ),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !t, onClick: e, className: "w-full", children: "Save photo" })
  ] });
}
function Aa({
  email: e,
  onComplete: t
}) {
  const [n, a] = j(""), [i, s] = j(0);
  return G(() => {
    if (i <= 0) return;
    const o = setInterval(() => s((l) => Math.max(0, l - 1)), 1e3);
    return () => clearInterval(o);
  }, [i]), /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-[15px] mb-1", children: "Enter the 6-digit code" }),
      /* @__PURE__ */ r.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Sent to ",
        e ?? "your email"
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(
      Te,
      {
        type: "text",
        inputMode: "numeric",
        maxLength: 6,
        placeholder: "000000",
        value: n,
        onChange: (o) => a(o.target.value.replace(/\D/g, "").slice(0, 6)),
        className: "font-mono text-[28px] tracking-[0.35em] text-center py-3 px-4"
      }
    ),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: n.length < 6, onClick: t, className: "w-full", children: "Verify" }),
    /* @__PURE__ */ r.jsx(
      "button",
      {
        disabled: i > 0,
        onClick: () => s(30),
        className: `bg-transparent border-none text-xs text-center ${i > 0 ? "cursor-not-allowed text-ink-dim no-underline" : "cursor-pointer text-primary underline"}`,
        children: i > 0 ? `Resend in ${i}s` : "Resend code"
      }
    )
  ] });
}
const Oa = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+61", flag: "🇦🇺", name: "AU" }
];
function Ia({ onComplete: e }) {
  const [t, n] = j("phone"), [a, i] = j("+1"), [s, o] = j(""), [l, d] = j("");
  return t === "otp" ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-5 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-[15px] mb-1", children: "Enter the 6-digit code" }),
      /* @__PURE__ */ r.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Sent to ",
        a,
        " ",
        s
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(
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
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: l.length < 6, onClick: e, className: "w-full", children: "Verify" }),
    /* @__PURE__ */ r.jsx(
      "button",
      {
        onClick: () => {
          n("phone"), d("");
        },
        className: "bg-transparent border-none cursor-pointer text-xs text-primary underline text-center",
        children: "Change number"
      }
    )
  ] }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim mb-1.5", children: "Country" }),
      /* @__PURE__ */ r.jsx(
        "select",
        {
          className: "input w-full",
          value: a,
          onChange: (c) => i(c.target.value),
          children: Oa.map(({ code: c, flag: f, name: m }) => /* @__PURE__ */ r.jsxs("option", { value: c, children: [
            f,
            " ",
            m,
            " (",
            c,
            ")"
          ] }, c))
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim mb-1.5", children: "Phone number" }),
      /* @__PURE__ */ r.jsx(
        Te,
        {
          type: "tel",
          placeholder: "Phone number",
          value: s,
          onChange: (c) => o(c.target.value.replace(/[^0-9]/g, ""))
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx(
      T,
      {
        variant: "primary",
        disabled: s.length < 6,
        onClick: () => n("otp"),
        className: "w-full",
        children: "Send OTP"
      }
    )
  ] });
}
const Ce = ["50 XP", "100 XP", "Miss", "200 XP", "75 XP", "Bonus!", "150 XP", "Miss"];
function Fa(e) {
  const t = (e % 360 + 360) % 360, n = Math.floor((360 - t) / (360 / Ce.length)) % Ce.length;
  return Ce[n];
}
function La({ onComplete: e }) {
  const [t, n] = j(!1), [a, i] = j(0), [s, o] = j(null);
  function l() {
    if (t) return;
    const b = 1440 + Math.floor(Math.random() * 360), v = a + b;
    n(!0), i(v), setTimeout(() => {
      o(Fa(v)), n(!1);
    }, 3100);
  }
  const d = 240, c = d / 2, f = Ce.length, m = 2 * Math.PI / f;
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center gap-5 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "relative w-[240px] h-[240px]", children: [
      /* @__PURE__ */ r.jsx(
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
      /* @__PURE__ */ r.jsxs(
        "svg",
        {
          width: d,
          height: d,
          style: {
            transform: `rotate(${a}deg)`,
            transition: t ? "transform 3s cubic-bezier(.17,.67,.12,.99)" : "none"
          },
          children: [
            Ce.map((b, v) => {
              const k = v * m - Math.PI / 2, C = (v + 1) * m - Math.PI / 2, M = c + c * Math.cos(k), S = c + c * Math.sin(k), w = c + c * Math.cos(C), _ = c + c * Math.sin(C), I = k + m / 2, u = c + c * 0.65 * Math.cos(I), E = c + c * 0.65 * Math.sin(I);
              return /* @__PURE__ */ r.jsxs("g", { children: [
                /* @__PURE__ */ r.jsx(
                  "path",
                  {
                    d: `M${c},${c} L${M},${S} A${c},${c} 0 0,1 ${w},${_} Z`,
                    fill: v % 2 === 0 ? "var(--panel)" : "var(--panel-2)",
                    stroke: "var(--border)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ r.jsx(
                  "text",
                  {
                    x: u,
                    y: E,
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    transform: `rotate(${I * 180 / Math.PI + 90}, ${u}, ${E})`,
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
            /* @__PURE__ */ r.jsx(
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
            /* @__PURE__ */ r.jsx("circle", { cx: c, cy: c, r: 6, fill: "var(--color-primary)" })
          ]
        }
      )
    ] }),
    s && /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-[13px] text-ink-dim", children: "You got" }),
      /* @__PURE__ */ r.jsx("div", { className: "text-[22px] font-bold text-primary", children: s })
    ] }),
    s ? /* @__PURE__ */ r.jsx(T, { variant: "primary", onClick: e, className: "w-full", children: "Claim reward" }) : /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: t, onClick: l, className: "w-full", children: t ? "Spinning…" : "Spin the wheel" })
  ] });
}
const Oe = 16;
function Ba({
  reward: e = "200 XP",
  onComplete: t
}) {
  const [n, a] = j(/* @__PURE__ */ new Set()), [i, s] = j(!1);
  function o(c) {
    i || a((f) => {
      const m = new Set(f);
      return m.add(c), m.size / Oe * 100 >= 75 && !i && (s(!0), setTimeout(t, 1500)), m;
    });
  }
  function l() {
    const c = new Set(Array.from({ length: Oe }, (f, m) => m));
    a(c), s(!0), setTimeout(t, 1500);
  }
  const d = Math.round(n.size / Oe * 100);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "relative w-[280px]", children: [
      /* @__PURE__ */ r.jsx("div", { className: "h-[140px] grid place-items-center bg-panel-2 border border-border rounded-[10px]", children: /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-ink-dim mb-1 font-mono uppercase tracking-[0.06em]", children: "You won" }),
        /* @__PURE__ */ r.jsx("div", { className: "text-[32px] font-extrabold text-primary", children: e })
      ] }) }),
      /* @__PURE__ */ r.jsx(
        "div",
        {
          className: `absolute inset-0 rounded-[10px] grid grid-cols-4 gap-0.5 p-0.5 ${i ? "pointer-events-none" : "pointer-events-auto"}`,
          children: Array.from({ length: Oe }, (c, f) => /* @__PURE__ */ r.jsx(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Scratch tile ${f + 1}`,
              onClick: () => o(f),
              onKeyDown: (m) => {
                (m.key === "Enter" || m.key === " ") && o(f);
              },
              onMouseEnter: (m) => {
                m.buttons === 1 && o(f);
              },
              className: `rounded-md cursor-pointer transition-[background] duration-150 min-h-8 ${n.has(f) ? "bg-transparent border-none" : "bg-panel border border-border"}`
            },
            f
          ))
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: `text-xs text-center ${i ? "text-primary" : "text-ink-dim"}`, children: i ? `🎉 You revealed: ${e}` : `Scratch to reveal… ${d}% uncovered` }),
    !i && /* @__PURE__ */ r.jsx(
      "button",
      {
        onClick: l,
        className: "bg-transparent border-none cursor-pointer text-[11px] text-ink-dim underline",
        children: "Reveal all"
      }
    )
  ] });
}
const Da = [
  { id: "b1", name: "First Quest", got: !0, desc: "Completed your first mission." },
  { id: "b2", name: "Streak ×7", got: !0, desc: "7-day streak maintained." },
  { id: "b3", name: "Evangelist", got: !1, desc: "Refer 10 teammates." },
  { id: "b4", name: "Lorekeeper", got: !1, desc: "Complete all weekly quizzes." }
];
function qa({
  badges: e = Da,
  goal: t = 3,
  earned: n,
  onComplete: a
}) {
  const i = n ?? e.filter((o) => o.got).length, s = i >= t;
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between text-xs text-ink-dim", children: [
        /* @__PURE__ */ r.jsx("span", { children: "Badges collected" }),
        /* @__PURE__ */ r.jsxs("span", { className: s ? "text-accent-lime" : "text-ink", children: [
          i,
          "/",
          t
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "h-1.5 bg-panel-2 rounded-[3px] overflow-hidden", children: /* @__PURE__ */ r.jsx(
        "div",
        {
          className: `h-full rounded-[3px] transition-[width] duration-[400ms] ease-out ${s ? "bg-accent-lime" : "bg-primary"}`,
          style: {
            width: `${Math.min(100, i / t * 100)}%`
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 gap-2", children: e.map((o) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: `p-3 bg-panel-2 rounded-lg flex flex-col gap-1 border ${o.got ? "border-solid border-accent opacity-100" : "border-dashed border-border opacity-45"}`,
        children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-[18px]", children: "🏅" }),
            o.got && /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-[#05060A] bg-primary py-px px-1.5 rounded-[4px] font-bold", children: "✓" })
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: "text-xs font-semibold", children: o.name })
        ]
      },
      o.id
    )) }),
    !s && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim text-center", children: "Keep completing missions to earn more badges" }),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !s, onClick: a, className: "w-full", children: s ? "Claim XP" : `Earn ${t - i} more badge${t - i !== 1 ? "s" : ""}` })
  ] });
}
function Xa({
  referralLink: e = "https://app.growquest.io/ref/demo-abc123",
  onComplete: t
}) {
  const [n, a] = j(!1), [i, s] = j(!1), o = n || i;
  function l() {
    navigator.clipboard.writeText(e).then(() => {
      a(!0), setTimeout(() => a(!1), 2e3), s(!0);
    });
  }
  function d(c) {
    const f = encodeURIComponent, m = {
      x: `https://x.com/intent/tweet?text=${f("Join me on GrowQuest! " + e)}`,
      whatsapp: `https://wa.me/?text=${f("Join me on GrowQuest! " + e)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${f(e)}`
    };
    window.open(m[c], "_blank"), s(!0);
  }
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-ink-dim font-mono uppercase tracking-[0.06em] mb-1.5", children: "Your referral link" }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2 py-2.5 px-3 bg-panel-2 border border-border rounded-lg items-center", children: [
        /* @__PURE__ */ r.jsx("span", { className: "flex-1 font-mono text-xs text-ink-dim overflow-hidden text-ellipsis whitespace-nowrap", children: e }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: l,
            className: `py-1 px-2.5 rounded-[5px] border border-border text-[11px] font-semibold cursor-pointer whitespace-nowrap transition-all duration-150 ${n ? "bg-primary" : "bg-panel text-ink"}`,
            style: n ? { color: "#05060A" } : void 0,
            children: n ? "Copied ✓" : "Copy"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-ink-dim mb-2", children: "Share via" }),
      /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: [
        { id: "x", label: "𝕏" },
        { id: "whatsapp", label: "💬" },
        { id: "linkedin", label: "in" }
      ].map(({ id: c, label: f }) => /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => d(c),
          className: "py-2 px-3.5 rounded-md border border-border bg-panel-2 text-ink text-sm font-bold cursor-pointer",
          children: f
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim", children: "0 friends signed up · goal: 1" }),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !o, onClick: t, className: "w-full", children: "Done" })
  ] });
}
function Ha({
  shareText: e = "Check out GrowQuest — earn XP for real actions!",
  shareUrl: t = "https://growquest.io",
  onComplete: n
}) {
  const [a, i] = j(!1);
  function s(d) {
    const c = encodeURIComponent, f = {
      x: `https://x.com/intent/tweet?text=${c(e)}&url=${c(t)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${c(t)}`,
      whatsapp: `https://wa.me/?text=${c(e + " " + t)}`
    };
    window.open(f[d], "_blank"), i(!0);
  }
  function o() {
    navigator.clipboard.writeText(t), i(!0);
  }
  const l = [
    { id: "x", label: "𝕏 X / Twitter" },
    { id: "facebook", label: "Facebook" },
    { id: "whatsapp", label: "WhatsApp" }
  ];
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "p-3.5 bg-panel-2 border border-border rounded-[10px]", children: [
      /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-[13px] mb-1", children: e }),
      /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-ink-dim font-mono", children: t })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim", children: "Share via" }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
      l.map(({ id: d, label: c }) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          onClick: () => s(d),
          className: "py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left",
          children: [
            c,
            " ↗"
          ]
        },
        d
      )),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: o,
          className: "py-2.5 px-3.5 rounded-lg border border-border bg-panel-2 text-ink text-[13px] font-medium cursor-pointer text-left",
          children: "📋 Copy link"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", disabled: !a, onClick: n, className: "w-full", children: "Done" })
  ] });
}
function Wa({ onComplete: e }) {
  const [t, n] = j(""), [a, i] = j([]);
  function s() {
    t.includes("@") && (i((l) => [...l, t]), n(""));
  }
  const o = t.includes("@");
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ r.jsx(
        Te,
        {
          type: "email",
          placeholder: "friend@example.com",
          value: t,
          onChange: (l) => n(l.target.value),
          onKeyDown: (l) => {
            l.key === "Enter" && s();
          },
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: s,
          disabled: !o,
          className: `py-0 px-4 rounded-lg border border-border text-xs font-bold whitespace-nowrap transition-all duration-150 ${o ? "bg-primary cursor-pointer" : "bg-panel-2 text-ink-dim cursor-not-allowed"}`,
          style: o ? { color: "#05060A" } : void 0,
          children: "Send"
        }
      )
    ] }),
    a.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim text-center py-3 px-0", children: "No invites sent yet" }) : /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1.5", children: a.map((l, d) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "flex items-center gap-2 py-1.5 px-2.5 bg-panel-2 rounded-md text-xs",
        children: [
          /* @__PURE__ */ r.jsx("span", { className: "w-4 h-4 rounded-full bg-accent-lime text-[#05060A] grid place-items-center text-[9px] font-bold", children: "✓" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-ink flex-1", children: l })
        ]
      },
      d
    )) }),
    /* @__PURE__ */ r.jsx(
      T,
      {
        variant: "primary",
        disabled: a.length === 0,
        onClick: e,
        className: "w-full",
        children: a.length === 0 ? "Send at least 1 invite" : `Done · ${a.length} invite${a.length !== 1 ? "s" : ""} sent`
      }
    )
  ] });
}
function Ya({ onComplete: e }) {
  const [t, n] = j(null), [a, i] = j(null), [s, o] = j(!1), l = Bt(null);
  function d(c) {
    i(c.name);
    const f = new FileReader();
    f.onload = (m) => {
      var b;
      return n((b = m.target) == null ? void 0 : b.result);
    }, f.readAsDataURL(c);
  }
  return s ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center gap-5 py-8 px-6", children: [
    /* @__PURE__ */ r.jsx("div", { className: "text-[48px]", children: "⏳" }),
    /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-[15px] mb-1.5", children: "Photo submitted — pending review" }),
      /* @__PURE__ */ r.jsx("div", { className: "text-[13px] text-ink-dim leading-normal", children: "Our team will review your photo and approve it within 24h. You'll be notified when XP is credited." })
    ] }),
    /* @__PURE__ */ r.jsx(T, { variant: "primary", onClick: e, className: "w-full", children: "Got it" })
  ] }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 p-6", children: [
    /* @__PURE__ */ r.jsx(
      "input",
      {
        ref: l,
        type: "file",
        accept: "image/*",
        capture: "environment",
        className: "hidden",
        onChange: (c) => {
          var f;
          (f = c.target.files) != null && f[0] && d(c.target.files[0]);
        }
      }
    ),
    t ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2.5", children: [
      /* @__PURE__ */ r.jsx(
        "img",
        {
          src: t,
          alt: "Proof",
          className: "w-full max-h-[220px] object-cover rounded-lg border border-border"
        }
      ),
      /* @__PURE__ */ r.jsx("div", { className: "text-xs text-ink-dim", children: a }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => {
            n(null), i(null);
          },
          className: "bg-transparent border-none cursor-pointer text-xs text-ink-dim underline text-left",
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ r.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var c;
          return (c = l.current) == null ? void 0 : c.click();
        },
        onKeyDown: (c) => {
          var f;
          (c.key === "Enter" || c.key === " ") && ((f = l.current) == null || f.click());
        },
        onDragOver: (c) => c.preventDefault(),
        onDrop: (c) => {
          c.preventDefault(), c.dataTransfer.files[0] && d(c.dataTransfer.files[0]);
        },
        className: "border-2 border-dashed border-border rounded-[10px] py-9 px-4 text-center cursor-pointer text-ink-dim text-[13px]",
        children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-[32px] mb-2", children: "📸" }),
          /* @__PURE__ */ r.jsx("div", { className: "font-medium mb-1", children: "Upload photo proof" }),
          /* @__PURE__ */ r.jsx("div", { className: "text-[11px]", children: "Click to snap or choose a file · JPG, PNG" })
        ]
      }
    ),
    /* @__PURE__ */ r.jsx(
      T,
      {
        variant: "primary",
        disabled: !t,
        onClick: () => o(!0),
        className: "w-full",
        children: "Submit for review"
      }
    )
  ] });
}
function Ua({ platform: e }) {
  const t = e;
  return t === "Instagram" ? /* @__PURE__ */ r.jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "4", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "17.5", cy: "6.5", r: "1.2", fill: "currentColor" })
  ] }) : t === "Twitter" ? /* @__PURE__ */ r.jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ r.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }) : t === "YouTube" ? /* @__PURE__ */ r.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: [
        /* @__PURE__ */ r.jsx("rect", { x: "2", y: "5", width: "20", height: "14", rx: "3" }),
        /* @__PURE__ */ r.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor", stroke: "none" })
      ]
    }
  ) : t === "Telegram" ? /* @__PURE__ */ r.jsx(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: /* @__PURE__ */ r.jsx("path", { d: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z", strokeLinejoin: "round" })
    }
  ) : /* @__PURE__ */ r.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      children: [
        /* @__PURE__ */ r.jsx("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ r.jsx("path", { d: "M8 12h8M12 8v8" })
      ]
    }
  );
}
function Ga({
  platform: e = "Instagram",
  handle: t = "@growquest",
  url: n = "https://instagram.com/growquest",
  onComplete: a
}) {
  const [i, s] = j(!1);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center gap-6 py-8 px-6", children: [
    /* @__PURE__ */ r.jsx("div", { className: "w-[72px] h-[72px] rounded-[18px] bg-panel-2 border border-border grid place-items-center text-primary", children: /* @__PURE__ */ r.jsx(Ua, { platform: e }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "font-bold text-[22px] tracking-[-0.02em] mb-1", children: t }),
      /* @__PURE__ */ r.jsxs("div", { className: "text-[13px] text-ink-dim", children: [
        "Follow us on ",
        e,
        " to earn XP"
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2 w-full", children: [
      /* @__PURE__ */ r.jsxs(
        T,
        {
          variant: "primary",
          onClick: () => {
            window.open(n, "_blank"), s(!0);
          },
          className: "w-full",
          children: [
            "Open ",
            e,
            " ↗"
          ]
        }
      ),
      /* @__PURE__ */ r.jsx(
        T,
        {
          variant: i ? "primary" : "ghost",
          disabled: !i,
          onClick: a,
          className: "w-full",
          children: "I've followed"
        }
      )
    ] })
  ] });
}
const Ja = 'a,button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
function Va(e, t) {
  G(() => {
    if (!t || !e.current) return;
    const n = e.current, a = Array.from(n.querySelectorAll(Ja)), i = a[0], s = a[a.length - 1];
    i == null || i.focus();
    const o = (l) => {
      l.key === "Tab" && (l.shiftKey ? document.activeElement === i && (l.preventDefault(), s == null || s.focus()) : document.activeElement === s && (l.preventDefault(), i == null || i.focus()));
    };
    return n.addEventListener("keydown", o), () => n.removeEventListener("keydown", o);
  }, [t, e]);
}
function hs({ m: e, onClose: t, onClaim: n }) {
  const a = br(
    () => () => {
    },
    () => !0,
    () => !1
  ), i = Bt(null);
  if (Va(i, e !== null), !e || !a) return null;
  const s = () => {
    n(e), t();
  };
  let o = null;
  if (e.type === "quiz") {
    const l = e.subtype === "quiz-textImage" ? "textImage" : e.subtype === "quiz-imageOnly" ? "imageOnly" : "text";
    o = /* @__PURE__ */ r.jsx(ka, { variant: l, onComplete: s });
  } else if (e.type === "survey") {
    const l = e.subtype === "survey-textImage" ? "textImage" : e.subtype === "survey-imageOnly" ? "imageOnly" : e.subtype === "survey-textarea" ? "textarea" : "text";
    o = /* @__PURE__ */ r.jsx(Ca, { variant: l, onComplete: s });
  } else e.type === "hangman" ? o = /* @__PURE__ */ r.jsx(_a, { onComplete: s }) : e.type === "trivia" ? o = /* @__PURE__ */ r.jsx($a, { onComplete: s }) : e.type === "video" ? o = /* @__PURE__ */ r.jsx(Ea, { url: e.url ?? "", onComplete: s }) : e.type === "read_article" ? o = /* @__PURE__ */ r.jsx(Pa, { url: e.url, onComplete: s }) : e.type === "profile" ? o = /* @__PURE__ */ r.jsx(za, { onComplete: s }) : e.type === "avatar" ? o = /* @__PURE__ */ r.jsx(Ra, { onComplete: s }) : e.type === "verify_email" ? o = /* @__PURE__ */ r.jsx(Aa, { onComplete: s }) : e.type === "verify_phone" ? o = /* @__PURE__ */ r.jsx(Ia, { onComplete: s }) : e.type === "spin_wheel" ? o = /* @__PURE__ */ r.jsx(La, { onComplete: s }) : e.type === "scratch_card" ? o = /* @__PURE__ */ r.jsx(Ba, { onComplete: s }) : e.type === "badge_collect" ? o = /* @__PURE__ */ r.jsx(qa, { onComplete: s }) : e.type === "refer" ? o = /* @__PURE__ */ r.jsx(Xa, { onComplete: s }) : e.type === "share" ? o = /* @__PURE__ */ r.jsx(Ha, { shareUrl: e.url, onComplete: s }) : e.type === "invite" ? o = /* @__PURE__ */ r.jsx(Wa, { onComplete: s }) : e.type === "photo_proof" ? o = /* @__PURE__ */ r.jsx(Ya, { onComplete: s }) : (e.type === "follow_social" || e.type === "social") && (o = /* @__PURE__ */ r.jsx(Ga, { url: e.url, onComplete: s }));
  return gr(
    /* @__PURE__ */ r.jsx(
      "div",
      {
        className: "modal-backdrop",
        role: "presentation",
        onClick: (l) => l.target === l.currentTarget && t(),
        onKeyDown: (l) => l.key === "Escape" && t(),
        children: /* @__PURE__ */ r.jsxs("div", { ref: i, className: "modal max-w-[560px]", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "relative px-6 py-5 border-b border-[color:var(--mission-modal-header-border)] flex items-center gap-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ r.jsx("h2", { className: "display m-0 text-[20px] tracking-[-0.02em] text-[color:var(--mission-modal-title)]", children: e.title }),
              /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2 mt-1.5", children: [
                /* @__PURE__ */ r.jsx(Me, { amount: e.xp }),
                e.limited && e.endsAt && /* @__PURE__ */ r.jsxs(X, { tone: "magenta", children: [
                  "Ends in ",
                  /* @__PURE__ */ r.jsx(fr, { endsAt: e.endsAt })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                onClick: t,
                "aria-label": "Close",
                className: "bg-[var(--mission-modal-close-bg)] border border-[color:var(--mission-modal-close-border)] text-[color:var(--mission-modal-close-icon)] grid place-items-center w-7 h-7 rounded-md",
                children: /* @__PURE__ */ r.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", children: /* @__PURE__ */ r.jsx(
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
          o ?? /* @__PURE__ */ r.jsx("div", { className: "p-6 text-ink-dim text-[13px] text-center", children: "Experience coming soon" })
        ] })
      }
    ),
    document.body
  );
}
function ke(e) {
  return `var(--tone-${e})`;
}
const ps = Xe(function({
  m: t,
  density: n = "comfortable",
  layout: a = "split",
  onOpen: i
}) {
  const [s, o] = t.progress, l = o > 0 ? s / o : 0, d = n === "compact", c = d ? "p-3.5" : "p-[18px]";
  return a === "stack" ? /* @__PURE__ */ r.jsxs(
    "button",
    {
      onClick: () => i(t),
      className: `mission-tile text-left flex flex-col gap-2.5 ${c} bg-[var(--mission-tile-bg)] border border-[color:var(--mission-tile-border)] rounded-xl transition-all duration-150`,
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ r.jsx(
            "div",
            {
              className: "bg-[var(--mission-tile-icon-bg)] border border-[color:var(--mission-tile-icon-border)] grid place-items-center w-8 h-8 rounded-md",
              style: { color: ke(t.tone) },
              children: /* @__PURE__ */ r.jsx(Tt, { type: t.type, size: 18 })
            }
          ),
          t.limited && /* @__PURE__ */ r.jsxs(X, { tone: "magenta", children: [
            "LIMITED",
            t.endsAt ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
              " ",
              "· ",
              /* @__PURE__ */ r.jsx(fr, { endsAt: t.endsAt })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx(
            "div",
            {
              className: `font-semibold mb-1 text-[color:var(--mission-tile-title)] ${d ? "text-[13px]" : "text-[15px]"}`,
              children: t.title
            }
          ),
          !d && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-[color:var(--mission-tile-body)] leading-relaxed", children: t.desc })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-center gap-2.5 mt-auto", children: [
          /* @__PURE__ */ r.jsx(Me, { amount: t.xp }),
          /* @__PURE__ */ r.jsxs("span", { className: "font-mono text-[11px] text-[color:var(--mission-tile-body)]", children: [
            s,
            "/",
            o
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "xpbar", style: { height: 4 }, children: /* @__PURE__ */ r.jsx("div", { className: "fill", style: { width: `${l * 100}%` } }) })
      ]
    }
  ) : a === "list" ? /* @__PURE__ */ r.jsxs(
    "button",
    {
      onClick: () => i(t),
      className: `mission-tile text-left flex items-center gap-3.5 ${c} bg-[var(--mission-tile-bg)] border border-[color:var(--mission-tile-border)] rounded-[10px] w-full`,
      children: [
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "bg-[var(--mission-tile-icon-bg)] border border-[color:var(--mission-tile-icon-border)] grid place-items-center w-10 h-10 rounded-lg shrink-0",
            style: { color: ke(t.tone) },
            children: /* @__PURE__ */ r.jsx(Tt, { type: t.type, size: 20 })
          }
        ),
        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ r.jsx("div", { className: "font-semibold text-sm mb-0.5 text-[color:var(--mission-tile-title)]", children: t.title }),
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-[color:var(--mission-tile-body)] overflow-hidden text-ellipsis whitespace-nowrap", children: t.desc })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2.5 shrink-0", children: [
          t.limited && /* @__PURE__ */ r.jsx(X, { tone: "magenta", children: "LIMITED" }),
          /* @__PURE__ */ r.jsxs("span", { className: "font-mono text-[11px] text-[color:var(--mission-tile-body)]", children: [
            s,
            "/",
            o
          ] }),
          /* @__PURE__ */ r.jsx(Me, { amount: t.xp })
        ] })
      ]
    }
  ) : /* @__PURE__ */ r.jsxs(
    "button",
    {
      onClick: () => i(t),
      className: `mission-tile text-left flex flex-col ${c} bg-[var(--mission-tile-bg)] border border-[color:var(--mission-tile-border)] rounded-xl relative overflow-hidden`,
      children: [
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-20 h-20",
            style: {
              opacity: "var(--mission-tile-halo-opacity)",
              background: `radial-gradient(circle at 100% 0, ${ke(t.tone)} 0%, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ r.jsxs(
          "div",
          {
            className: `flex justify-between items-start gap-2 relative ${d ? "mb-2.5" : "mb-3.5"}`,
            children: [
              /* @__PURE__ */ r.jsx(
                "div",
                {
                  className: "bg-[var(--mission-tile-icon-bg)] border border-[color:var(--mission-tile-icon-border)] grid place-items-center w-[34px] h-[34px] rounded-[7px]",
                  style: { color: ke(t.tone) },
                  children: /* @__PURE__ */ r.jsx(Tt, { type: t.type, size: 18 })
                }
              ),
              t.limited && /* @__PURE__ */ r.jsx(X, { tone: "magenta", children: "⏱ LIMITED" })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: `font-semibold mb-1 text-[color:var(--mission-tile-title)] ${d ? "text-sm" : "text-base"}`,
            children: t.title
          }
        ),
        !d && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-[color:var(--mission-tile-body)] leading-relaxed mb-3.5", children: t.desc }),
        /* @__PURE__ */ r.jsxs("div", { className: `flex justify-between items-center gap-2.5 ${d ? "mt-2" : "mt-auto"}`, children: [
          /* @__PURE__ */ r.jsx(Me, { amount: t.xp }),
          /* @__PURE__ */ r.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold tracking-[0.04em]",
              style: {
                background: ke(t.tone),
                color: "var(--mission-tile-cta-fg)"
              },
              children: [
                "GO",
                /* @__PURE__ */ r.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ r.jsx(
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
}), Za = {
  1: "var(--accent-amber)",
  2: "var(--accent-cyan)",
  3: "var(--accent-magenta)"
}, Qa = { 1: 180, 2: 150, 3: 130 };
function ms({ entries: e, rankColors: t, platformHeights: n }) {
  const a = t ?? Za, i = n ?? Qa, s = e.slice(0, 3), o = [s[1], s[0], s[2]].filter(Boolean);
  return /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-3 gap-3.5 mb-7", children: o.map((l) => {
    const d = a[l.rank] ?? "var(--color-primary)", c = i[l.rank] ?? 120;
    return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center gap-2.5", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ r.jsx(Zt, { seed: l.seed, size: 56 }),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "absolute -bottom-1.5 -right-1.5 w-[22px] h-[22px] rounded-[5px] text-[#05060A] grid place-items-center font-mono text-[11px] font-bold border-2 border-bg",
            style: { background: d },
            children: l.rank
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "font-bold text-[14px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: l.handle }),
      /* @__PURE__ */ r.jsxs("div", { className: "mono text-[12px] text-ink-dim", children: [
        l.xp.toLocaleString(),
        " XP"
      ] }),
      /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "w-full rounded-t-lg border border-border border-b-0 relative overflow-hidden",
          style: {
            height: c,
            background: `linear-gradient(180deg, ${d} 0%, transparent 100%)`
          },
          children: [
            /* @__PURE__ */ r.jsx("div", { className: "absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_8px,rgba(0,0,0,0.12)_8px_9px)]" }),
            /* @__PURE__ */ r.jsx("div", { className: "absolute top-2.5 left-2.5 font-mono text-[28px] font-bold text-[#05060A] opacity-80", children: String(l.rank).padStart(2, "0") })
          ]
        }
      )
    ] }, l.rank);
  }) });
}
function bs({
  persona: e,
  xpStyle: t,
  xpMax: n = 12e3,
  label: a = "Progress to Ascendant",
  walletAddress: i = "0xE63F6A · 356C10AC"
}) {
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "bg-[var(--profile-card-bg)] border border-[color:var(--profile-card-border)] rounded-[var(--radius-card,14px)] p-[18px] flex flex-col gap-3.5",
      style: { containerType: "inline-size" },
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ r.jsx(Zt, { seed: 7, size: 44 }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ r.jsxs("span", { className: "font-bold text-[color:var(--profile-card-title)]", children: [
                "@",
                e.handle
              ] }),
              /* @__PURE__ */ r.jsx(X, { tone: "accent", children: e.tier })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "font-mono text-[11px] text-[color:var(--profile-card-wallet)]", children: i })
          ] })
        ] }),
        /* @__PURE__ */ r.jsx(ma, { value: e.xp, max: n, style: t, label: a }),
        /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          { k: "Missions", v: `${e.missionsDone}/12` },
          { k: "XP", v: e.xp.toLocaleString() },
          { k: "Streak", v: `${e.streak}d` }
        ].map((s) => /* @__PURE__ */ r.jsxs(
          "div",
          {
            className: "p-2.5 bg-[var(--profile-card-stat-bg)] border border-[color:var(--profile-card-stat-border)] rounded-lg text-center",
            children: [
              /* @__PURE__ */ r.jsx("div", { className: "font-mono text-[9px] tracking-[0.12em] uppercase text-[color:var(--profile-card-wallet)]", children: s.k }),
              /* @__PURE__ */ r.jsx("div", { className: "font-bold text-[14px] mt-0.5 text-[color:var(--profile-card-title)]", children: s.v })
            ]
          },
          s.k
        )) })
      ]
    }
  );
}
const gs = Xe(function({
  r: t,
  persona: n,
  onRedeem: a,
  compact: i = !1
}) {
  const s = n.xp >= t.cost, o = `var(--tone-${t.tone})`;
  return /* @__PURE__ */ r.jsxs("div", { className: "bg-[var(--reward-card-bg)] border border-[color:var(--reward-card-border)] rounded-[var(--radius-card,14px)] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "relative bg-[var(--reward-card-image-bg)] border-b border-[color:var(--reward-card-image-border)] overflow-hidden",
        style: { aspectRatio: i ? "2 / 1" : "4 / 3" },
        children: [
          t.imageUrl ? /* @__PURE__ */ r.jsx(
            "img",
            {
              src: t.imageUrl,
              alt: t.title,
              width: 400,
              height: 300,
              loading: "lazy",
              className: "w-full h-full object-cover block"
            }
          ) : /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, ${o} 20%, transparent) 0 8px, transparent 8px 18px)`
                }
              }
            ),
            /* @__PURE__ */ r.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "rounded-xl text-[#05060A] grid place-items-center font-bold font-mono tracking-[0.1em] uppercase shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]",
                style: {
                  width: i ? 52 : 68,
                  height: i ? 52 : 68,
                  background: o,
                  fontSize: i ? 9 : 11
                },
                children: t.kind.slice(0, 4)
              }
            ) })
          ] }),
          t.limited && /* @__PURE__ */ r.jsx("div", { className: "absolute top-2.5 left-2.5", children: /* @__PURE__ */ r.jsx(X, { tone: "magenta", children: "LIMITED" }) }),
          /* @__PURE__ */ r.jsx("div", { className: "absolute top-2.5 right-2.5", children: /* @__PURE__ */ r.jsx(X, { children: t.stock }) })
        ]
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2 flex-1", style: { padding: i ? 10 : 14 }, children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "font-semibold text-[color:var(--reward-card-title)]",
            style: { fontSize: i ? 13 : 14 },
            children: t.title
          }
        ),
        /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-[color:var(--reward-card-body)] font-mono uppercase tracking-[0.1em] mt-0.5", children: t.kind })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto", children: [
        /* @__PURE__ */ r.jsx(Me, { amount: t.cost.toLocaleString() }),
        /* @__PURE__ */ r.jsx(T, { variant: "primary", size: "sm", disabled: !s, onClick: () => a(t), children: s ? "Redeem" : "Locked" })
      ] })
    ] })
  ] });
});
function vs({ label: e, value: t, trend: n, trendColor: a }) {
  return /* @__PURE__ */ r.jsxs("div", { className: "p-3.5 bg-panel-2 border border-border rounded-[10px]", children: [
    /* @__PURE__ */ r.jsx("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-1.5", children: e }),
    /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ r.jsx("span", { style: { fontWeight: 700, fontSize: 22 }, children: t }),
      /* @__PURE__ */ r.jsx(ga, { values: n, color: a })
    ] })
  ] });
}
function ys({ tiers: e, currentXP: t }) {
  const n = [...e].reverse().find((a) => t >= a.min) ?? e[0];
  return /* @__PURE__ */ r.jsxs("div", { className: "panel p-5", children: [
    /* @__PURE__ */ r.jsx("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim mb-3.5", children: "// tier ladder" }),
    /* @__PURE__ */ r.jsx("div", { className: "grid gap-2.5", style: { gridTemplateColumns: `repeat(${e.length}, 1fr)` }, children: e.map((a, i) => {
      const s = n.name === a.name, o = t >= a.min;
      return /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "p-3.5 rounded-[10px] border",
          style: {
            borderColor: s ? a.color : "var(--border)",
            background: s ? `color-mix(in oklch, ${a.color} 12%, transparent)` : "var(--panel-2)",
            opacity: o || s ? 1 : 0.5
          },
          children: [
            /* @__PURE__ */ r.jsxs("div", { className: "font-mono text-[10px] tracking-[0.12em] uppercase text-ink-dim", children: [
              "tier ",
              String(i + 1).padStart(2, "0")
            ] }),
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "font-bold text-[16px] mt-1",
                style: { color: s ? a.color : "var(--ink)" },
                children: a.name
              }
            ),
            /* @__PURE__ */ r.jsxs("div", { className: "font-mono text-[11px] text-ink-dim mt-0.5", children: [
              a.min.toLocaleString(),
              "+ XP"
            ] })
          ]
        },
        a.name
      );
    }) })
  ] });
}
export {
  Ra as AvatarUploadExperience,
  qa as BadgeCollectExperience,
  cs as BadgeGrid,
  ls as BrandLockup,
  rs as BrandProvider,
  T as Button,
  ha as Chip,
  fr as Countdown,
  we as DEFAULT_CONFIG,
  _n as DEFAULT_CONTENT,
  ds as Divider,
  Aa as EmailVerificationExperience,
  ce as Eyebrow,
  pa as Field,
  fs as FilterTabs,
  Ga as FollowSocialExperience,
  _a as HangmanExperience,
  xs as HeroBanner,
  Te as Input,
  Wa as InviteExperience,
  us as LeaderboardTable,
  ba as Logo,
  hs as MissionModal,
  ps as MissionTile,
  Ia as PhoneVerificationExperience,
  Ya as PhotoProofExperience,
  ms as Podium,
  za as ProfileCompletionExperience,
  bs as ProfileSnapshot,
  ka as QuizExperience,
  Pa as ReadArticleExperience,
  Xa as ReferralExperience,
  gs as RewardCard,
  vr as SURFACES,
  Ba as ScratchCardExperience,
  Ha as ShareExperience,
  ga as Sparkline,
  La as SpinWheelExperience,
  vs as StatCard,
  Ca as SurveyExperience,
  X as Tag,
  cr as Textarea,
  ys as TierLadder,
  $a as TriviaExperience,
  Ea as VideoExperience,
  ma as XPBar,
  Me as XPPill,
  ts as applyBrand,
  sa as deriveTokens,
  ns as getCurrentBrand,
  ss as preloadAssets,
  la as subscribeBrand,
  as as useAsset,
  os as useBrand,
  Vt as useBrandState,
  is as useContent
};
