import fe, { useState as j, useEffect as V, memo as F } from "react";
import { createPortal as ne } from "react-dom";
var X = { exports: {} }, I = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var se;
function ge() {
  if (se) return I;
  se = 1;
  var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function i(n, o, a) {
    var d = null;
    if (a !== void 0 && (d = "" + a), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      a = {};
      for (var c in o)
        c !== "key" && (a[c] = o[c]);
    } else a = o;
    return o = a.ref, {
      $$typeof: t,
      type: n,
      key: d,
      ref: o !== void 0 ? o : null,
      props: a
    };
  }
  return I.Fragment = r, I.jsx = i, I.jsxs = i, I;
}
var A = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oe;
function me() {
  return oe || (oe = 1, process.env.NODE_ENV !== "production" && function() {
    function t(s) {
      if (s == null) return null;
      if (typeof s == "function")
        return s.$$typeof === xe ? null : s.displayName || s.name || null;
      if (typeof s == "string") return s;
      switch (s) {
        case z:
          return "Fragment";
        case b:
          return "Profiler";
        case $:
          return "StrictMode";
        case P:
          return "Suspense";
        case le:
          return "SuspenseList";
        case de:
          return "Activity";
      }
      if (typeof s == "object")
        switch (typeof s.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), s.$$typeof) {
          case D:
            return "Portal";
          case _:
            return s.displayName || "Context";
          case v:
            return (s._context.displayName || "Context") + ".Consumer";
          case O:
            var h = s.render;
            return s = s.displayName, s || (s = h.displayName || h.name || "", s = s !== "" ? "ForwardRef(" + s + ")" : "ForwardRef"), s;
          case ce:
            return h = s.displayName || null, h !== null ? h : t(s.type) || "Memo";
          case L:
            h = s._payload, s = s._init;
            try {
              return t(s(h));
            } catch {
            }
        }
      return null;
    }
    function r(s) {
      return "" + s;
    }
    function i(s) {
      try {
        r(s);
        var h = !1;
      } catch {
        h = !0;
      }
      if (h) {
        h = console;
        var f = h.error, g = typeof Symbol == "function" && Symbol.toStringTag && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return f.call(
          h,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          g
        ), r(s);
      }
    }
    function n(s) {
      if (s === z) return "<>";
      if (typeof s == "object" && s !== null && s.$$typeof === L)
        return "<...>";
      try {
        var h = t(s);
        return h ? "<" + h + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var s = U.A;
      return s === null ? null : s.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function d(s) {
      if (K.call(s, "key")) {
        var h = Object.getOwnPropertyDescriptor(s, "key").get;
        if (h && h.isReactWarning) return !1;
      }
      return s.key !== void 0;
    }
    function c(s, h) {
      function f() {
        Z || (Z = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          h
        ));
      }
      f.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: f,
        configurable: !0
      });
    }
    function l() {
      var s = t(this.type);
      return ee[s] || (ee[s] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), s = this.props.ref, s !== void 0 ? s : null;
    }
    function x(s, h, f, g, M, Y) {
      var m = f.ref;
      return s = {
        $$typeof: C,
        type: s,
        key: h,
        props: f,
        _owner: g
      }, (m !== void 0 ? m : null) !== null ? Object.defineProperty(s, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(s, "ref", { enumerable: !1, value: null }), s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(s, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(s, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.defineProperty(s, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Y
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    }
    function p(s, h, f, g, M, Y) {
      var m = h.children;
      if (m !== void 0)
        if (g)
          if (pe(m)) {
            for (g = 0; g < m.length; g++)
              u(m[g]);
            Object.freeze && Object.freeze(m);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else u(m);
      if (K.call(h, "key")) {
        m = t(s);
        var R = Object.keys(h).filter(function(he) {
          return he !== "key";
        });
        g = 0 < R.length ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}", ie[m + g] || (R = 0 < R.length ? "{" + R.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          g,
          m,
          R,
          m
        ), ie[m + g] = !0);
      }
      if (m = null, f !== void 0 && (i(f), m = "" + f), d(h) && (i(h.key), m = "" + h.key), "key" in h) {
        f = {};
        for (var G in h)
          G !== "key" && (f[G] = h[G]);
      } else f = h;
      return m && c(
        f,
        typeof s == "function" ? s.displayName || s.name || "Unknown" : s
      ), x(
        s,
        m,
        f,
        o(),
        M,
        Y
      );
    }
    function u(s) {
      y(s) ? s._store && (s._store.validated = 1) : typeof s == "object" && s !== null && s.$$typeof === L && (s._payload.status === "fulfilled" ? y(s._payload.value) && s._payload.value._store && (s._payload.value._store.validated = 1) : s._store && (s._store.validated = 1));
    }
    function y(s) {
      return typeof s == "object" && s !== null && s.$$typeof === C;
    }
    var S = fe, C = Symbol.for("react.transitional.element"), D = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), v = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), le = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), de = Symbol.for("react.activity"), xe = Symbol.for("react.client.reference"), U = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = Object.prototype.hasOwnProperty, pe = Array.isArray, q = console.createTask ? console.createTask : function() {
      return null;
    };
    S = {
      react_stack_bottom_frame: function(s) {
        return s();
      }
    };
    var Z, ee = {}, te = S.react_stack_bottom_frame.bind(
      S,
      a
    )(), re = q(n(a)), ie = {};
    A.Fragment = z, A.jsx = function(s, h, f) {
      var g = 1e4 > U.recentlyCreatedOwnerStacks++;
      return p(
        s,
        h,
        f,
        !1,
        g ? Error("react-stack-top-frame") : te,
        g ? q(n(s)) : re
      );
    }, A.jsxs = function(s, h, f) {
      var g = 1e4 > U.recentlyCreatedOwnerStacks++;
      return p(
        s,
        h,
        f,
        !0,
        g ? Error("react-stack-top-frame") : te,
        g ? q(n(s)) : re
      );
    };
  }()), A;
}
process.env.NODE_ENV === "production" ? X.exports = ge() : X.exports = me();
var e = X.exports;
function w({
  variant: t = "default",
  size: r = "md",
  icon: i,
  iconLeft: n,
  iconRight: o,
  children: a,
  className: d,
  style: c,
  ...l
}) {
  const x = [
    "btn",
    t !== "default" ? t : "",
    r === "sm" ? "btn-sm" : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ e.jsxs("button", { className: x, style: c, ...l, children: [
    n,
    a,
    o ?? i
  ] });
}
const ue = {
  accent: {
    color: "var(--accent)",
    borderColor: "color-mix(in oklch, var(--accent) 40%, transparent)",
    background: "var(--accent-soft)"
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
function ye({ children: t, tone: r = "default", dot: i, className: n, style: o }) {
  const a = r !== "default" ? ue[r] : {};
  return /* @__PURE__ */ e.jsxs(
    "span",
    {
      className: ["chip", n].filter(Boolean).join(" "),
      style: { ...a, ...o },
      children: [
        i && /* @__PURE__ */ e.jsx(
          "span",
          {
            style: {
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "currentColor",
              display: "inline-block",
              flexShrink: 0
            }
          }
        ),
        t
      ]
    }
  );
}
function ve({ className: t, ...r }) {
  return /* @__PURE__ */ e.jsx("input", { className: ["input", t].filter(Boolean).join(" "), ...r });
}
function je({ className: t, style: r, ...i }) {
  return /* @__PURE__ */ e.jsx(
    "textarea",
    {
      className: ["input", t].filter(Boolean).join(" "),
      style: { resize: "vertical", minHeight: 120, lineHeight: 1.6, ...r },
      ...i
    }
  );
}
function Fe({
  label: t,
  labelInside: r,
  adornmentLeft: i,
  adornmentRight: n,
  hint: o,
  error: a,
  style: d,
  ...c
}) {
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
    t && /* @__PURE__ */ e.jsx(
      "span",
      {
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink-dim)"
        },
        children: t
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center" }, children: [
      i && /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: 12,
            zIndex: 1,
            color: "var(--ink-dim)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none"
          },
          children: i
        }
      ),
      r ? /* @__PURE__ */ e.jsxs(
        "div",
        {
          className: "input",
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: "8px 14px",
            cursor: "text",
            width: "100%",
            paddingLeft: i ? 38 : void 0,
            paddingRight: n ? 38 : void 0
          },
          children: [
            /* @__PURE__ */ e.jsx(
              "span",
              {
                style: {
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-dim)",
                  lineHeight: 1
                },
                children: r
              }
            ),
            /* @__PURE__ */ e.jsx(
              "input",
              {
                style: {
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--ink)",
                  fontSize: 14,
                  padding: 0
                },
                ...c
              }
            )
          ]
        }
      ) : /* @__PURE__ */ e.jsx(
        ve,
        {
          style: {
            paddingLeft: i ? 38 : void 0,
            paddingRight: n ? 38 : void 0,
            width: "100%",
            ...d
          },
          ...c
        }
      ),
      n && /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            position: "absolute",
            right: 12,
            zIndex: 1,
            color: "var(--ink-dim)",
            display: "flex",
            alignItems: "center"
          },
          children: n
        }
      )
    ] }),
    (o || a) && /* @__PURE__ */ e.jsx(
      "span",
      {
        style: {
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          lineHeight: 1.4,
          color: a ? "var(--danger)" : "var(--ink-faint)"
        },
        children: a ?? o
      }
    )
  ] });
}
function be({ value: t, max: r, style: i = "segmented", segments: n = 10, label: o }) {
  const a = Math.max(0, Math.min(1, t / r));
  if (i === "plain")
    return /* @__PURE__ */ e.jsxs("div", { children: [
      o && /* @__PURE__ */ e.jsxs("div", { className: "xpbar-label", children: [
        /* @__PURE__ */ e.jsx("span", { children: o }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          t,
          "/",
          r
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "xpbar", children: /* @__PURE__ */ e.jsx("div", { className: "fill", style: { width: `${a * 100}%` } }) })
    ] });
  if (i === "segmented") {
    const d = Math.round(a * n);
    return /* @__PURE__ */ e.jsxs("div", { children: [
      o && /* @__PURE__ */ e.jsxs("div", { className: "xpbar-label", children: [
        /* @__PURE__ */ e.jsx("span", { children: o }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          t,
          "/",
          r
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "xp-seg", children: Array.from({ length: n }).map((c, l) => /* @__PURE__ */ e.jsx("div", { className: `seg ${l < d ? "on" : ""}` }, l)) })
    ] });
  }
  if (i === "ring") {
    const c = 2 * Math.PI * 30;
    return /* @__PURE__ */ e.jsxs("div", { style: { display: "inline-flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ e.jsxs("svg", { width: "80", height: "80", viewBox: "0 0 80 80", children: [
        /* @__PURE__ */ e.jsx("circle", { cx: "40", cy: "40", r: 30, fill: "none", stroke: "var(--panel-2)", strokeWidth: "6" }),
        /* @__PURE__ */ e.jsx(
          "circle",
          {
            cx: "40",
            cy: "40",
            r: 30,
            fill: "none",
            stroke: "var(--accent)",
            strokeWidth: "6",
            strokeDasharray: c,
            strokeDashoffset: c * (1 - a),
            transform: "rotate(-90 40 40)",
            strokeLinecap: "round",
            style: {
              filter: "drop-shadow(0 0 6px var(--accent))",
              transition: "stroke-dashoffset 800ms ease"
            }
          }
        ),
        /* @__PURE__ */ e.jsxs(
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
              Math.round(a * 100),
              "%"
            ]
          }
        )
      ] }),
      o && /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-dim)"
            },
            children: o
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { style: { fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700 }, children: [
          t,
          "/",
          r
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { children: [
    o && /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-dim)"
        },
        children: [
          /* @__PURE__ */ e.jsx("span", { children: o }),
          /* @__PURE__ */ e.jsxs("span", { children: [
            t,
            "/",
            r
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          position: "relative",
          height: 14,
          border: "1px solid var(--border)",
          borderRadius: 3,
          background: "var(--panel-2)",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                position: "absolute",
                inset: 2,
                background: `linear-gradient(90deg, var(--accent) 0%, var(--accent) ${a * 100}%, transparent ${a * 100}%)`,
                borderRadius: 2
              }
            }
          ),
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(90deg, transparent 0 9px, color-mix(in oklch, var(--bg) 60%, transparent) 9px 10px)"
              }
            }
          )
        ]
      }
    )
  ] });
}
function ke({ size: t = 28 }) {
  return /* @__PURE__ */ e.jsxs("svg", { width: t, height: t, viewBox: "0 0 32 32", children: [
    /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsxs("linearGradient", { id: "lg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: "var(--accent)" }),
      /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: "var(--accent-magenta)" })
    ] }) }),
    /* @__PURE__ */ e.jsx("polygon", { points: "16,2 28,9 28,23 16,30 4,23 4,9", fill: "url(#lg)" }),
    /* @__PURE__ */ e.jsx("polygon", { points: "16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5", fill: "var(--bg)" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "16", cy: "16", r: "3.5", fill: "var(--accent)" })
  ] });
}
function De({
  name: t = "GrowQuest",
  version: r = "v1.4"
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "brand-lockup", children: [
    /* @__PURE__ */ e.jsx("span", { className: "logo", children: /* @__PURE__ */ e.jsx(ke, {}) }),
    /* @__PURE__ */ e.jsx("span", { children: t }),
    /* @__PURE__ */ e.jsx("span", { className: "chip brand-version", children: r })
  ] });
}
function T({ children: t, dot: r }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "eyebrow", children: [
    r !== !1 && /* @__PURE__ */ e.jsx(
      "span",
      {
        style: {
          width: 6,
          height: 6,
          background: "var(--accent)",
          borderRadius: 99,
          boxShadow: "0 0 8px var(--accent)"
        }
      }
    ),
    t
  ] });
}
function k({ children: t, tone: r = "default" }) {
  const i = {
    default: {
      color: "var(--ink-dim)",
      borderColor: "var(--border)",
      background: "var(--panel-2)"
    },
    accent: {
      color: "var(--accent)",
      borderColor: "color-mix(in oklch, var(--accent) 40%, transparent)",
      background: "var(--accent-soft)"
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
    },
    ghost: { color: "var(--ink-dim)", borderColor: "var(--border)", background: "transparent" }
  }, n = i[r] ?? i.default;
  return /* @__PURE__ */ e.jsx("span", { className: "chip", style: n, children: t });
}
function N({ amount: t, icon: r = !0 }) {
  return /* @__PURE__ */ e.jsxs("span", { className: "chip accent xp-pill", children: [
    r && /* @__PURE__ */ e.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ e.jsx(
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
function ae({ endsAt: t }) {
  const [r, i] = j(Date.now);
  V(() => {
    const c = setInterval(() => i(Date.now()), 1e3);
    return () => clearInterval(c);
  }, []);
  const n = Math.max(0, t - r), o = Math.floor(n / 36e5).toString().padStart(2, "0"), a = Math.floor(n % 36e5 / 6e4).toString().padStart(2, "0"), d = Math.floor(n % 6e4 / 1e3).toString().padStart(2, "0");
  return /* @__PURE__ */ e.jsxs("span", { className: "mono", style: { color: "var(--accent-magenta)" }, children: [
    o,
    ":",
    a,
    ":",
    d
  ] });
}
function we({
  values: t,
  color: r = "var(--accent)",
  w: i = 80,
  h: n = 24
}) {
  const o = Math.min(...t), a = Math.max(...t), d = t.map((c, l) => {
    const x = l / (t.length - 1) * i, p = n - (c - o) / (a - o || 1) * (n - 2) - 1;
    return `${x},${p}`;
  }).join(" ");
  return /* @__PURE__ */ e.jsx("svg", { width: i, height: n, viewBox: `0 0 ${i} ${n}`, children: /* @__PURE__ */ e.jsx("polyline", { points: d, fill: "none", stroke: r, strokeWidth: "1.5" }) });
}
function $e({ label: t }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "divider", children: [
    /* @__PURE__ */ e.jsx("div", { className: "divider-line" }),
    t && /* @__PURE__ */ e.jsx("span", { className: "eyebrow", children: t }),
    /* @__PURE__ */ e.jsx("div", { className: "divider-line" })
  ] });
}
const Se = ["cyan", "magenta", "lime", "amber", "violet"], Le = F(function({ badges: r, columns: i = 3 }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { padding: 20 }, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mono-label", style: { marginBottom: 14 }, children: [
      "// badges · ",
      r.filter((n) => n.got).length,
      "/",
      r.length
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gap: 10, gridTemplateColumns: `repeat(${i}, 1fr)` }, children: r.map((n, o) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        title: n.desc,
        style: {
          padding: 14,
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          textAlign: "center",
          opacity: n.got ? 1 : 0.4
        },
        children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                width: 44,
                height: 44,
                margin: "0 auto 8px",
                borderRadius: 10,
                background: n.got ? `var(--accent-${Se[o % 5]})` : "var(--panel)",
                display: "grid",
                placeItems: "center",
                border: "1px solid var(--border)"
              },
              children: /* @__PURE__ */ e.jsx("svg", { width: "22", height: "22", viewBox: "0 0 22 22", children: /* @__PURE__ */ e.jsx(
                "polygon",
                {
                  points: "11,2 20,7 20,15 11,20 2,15 2,7",
                  fill: n.got ? "#05060A" : "var(--ink-faint)"
                }
              ) })
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 12 }, children: n.name }),
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                fontSize: 10,
                color: "var(--ink-faint)",
                marginTop: 2,
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              },
              children: n.got ? "unlocked" : "locked"
            }
          )
        ]
      },
      n.id
    )) })
  ] });
});
function Ue({ options: t, value: r, onChange: i }) {
  return /* @__PURE__ */ e.jsx("div", { className: "filter-tabs", children: t.map((n) => /* @__PURE__ */ e.jsx(
    "button",
    {
      onClick: () => i(n),
      style: {
        padding: "6px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: 6,
        background: r === n ? "var(--panel)" : "transparent",
        color: r === n ? "var(--ink)" : "var(--ink-dim)",
        border: r === n ? "1px solid var(--border)" : "1px solid transparent"
      },
      children: n
    },
    n
  )) });
}
function Ce({ variant: t = "isometric", accent: r }) {
  const i = r || "var(--accent)";
  if (t === "grid-poster")
    return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
      /* @__PURE__ */ e.jsxs("defs", { children: [
        /* @__PURE__ */ e.jsx("pattern", { id: "gp-grid", width: "24", height: "24", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ e.jsx("path", { d: "M24 0H0V24", fill: "none", stroke: i, strokeOpacity: "0.18", strokeWidth: "1" }) }),
        /* @__PURE__ */ e.jsxs("linearGradient", { id: "gp-fade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: i, stopOpacity: "0" }),
          /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: i, stopOpacity: "0.35" })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("rect", { width: "480", height: "480", fill: "url(#gp-grid)" }),
      /* @__PURE__ */ e.jsx("rect", { width: "480", height: "480", fill: "url(#gp-fade)" }),
      /* @__PURE__ */ e.jsx(
        "text",
        {
          x: "28",
          y: "60",
          fontFamily: "JetBrains Mono",
          fontSize: "11",
          letterSpacing: "3",
          fill: i,
          opacity: "0.8",
          children: "QUEST // 01"
        }
      ),
      /* @__PURE__ */ e.jsx(
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
      /* @__PURE__ */ e.jsx(
        "text",
        {
          x: "28",
          y: "470",
          fontFamily: "Space Grotesk",
          fontWeight: "700",
          fontSize: "72",
          fill: i,
          letterSpacing: "-2",
          children: "UP."
        }
      ),
      /* @__PURE__ */ e.jsx("circle", { cx: "380", cy: "130", r: "70", fill: "none", stroke: i, strokeWidth: "1.5" }),
      /* @__PURE__ */ e.jsx(
        "circle",
        {
          cx: "380",
          cy: "130",
          r: "40",
          fill: "none",
          stroke: i,
          strokeWidth: "1",
          strokeDasharray: "4 4"
        }
      ),
      /* @__PURE__ */ e.jsx("circle", { cx: "380", cy: "130", r: "8", fill: i })
    ] });
  if (t === "orbital")
    return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
      /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsxs("radialGradient", { id: "orb-glow", children: [
        /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: i, stopOpacity: "0.55" }),
        /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: i, stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ e.jsx("rect", { width: "480", height: "480", fill: "transparent" }),
      /* @__PURE__ */ e.jsx("circle", { cx: "240", cy: "240", r: "200", fill: "url(#orb-glow)" }),
      [160, 110, 60].map((n, o) => /* @__PURE__ */ e.jsx(
        "ellipse",
        {
          cx: "240",
          cy: "240",
          rx: n * 1.6,
          ry: n * 0.5,
          fill: "none",
          stroke: i,
          strokeOpacity: 0.4 - o * 0.1,
          strokeWidth: "1",
          transform: `rotate(${-20 + o * 12} 240 240)`
        },
        o
      )),
      /* @__PURE__ */ e.jsx("circle", { cx: "240", cy: "240", r: "34", fill: i, opacity: "0.9" }),
      /* @__PURE__ */ e.jsx(
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
      [0, 72, 144, 216, 288].map((n, o) => {
        const a = n * Math.PI / 180, d = 240 + Math.cos(a) * 170, c = 240 + Math.sin(a) * 60;
        return /* @__PURE__ */ e.jsx("circle", { cx: d, cy: c, r: 6 + o % 3 * 2, fill: i, opacity: 0.7 }, o);
      }),
      /* @__PURE__ */ e.jsx("text", { x: "30", y: "40", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: i, children: "// ORBIT.SYS" })
    ] });
  if (t === "pixel") {
    const a = [];
    for (let d = 0; d < 12; d++)
      for (let c = 0; c < 12; c++) {
        const l = c + d * 0.5 - 3, x = d - c * 0.3 + 4;
        Math.hypot(l - 5, x - 5) < 3 + Math.sin(d * c * 0.3) * 1.5 && a.push({ x: c * 34 + 30, y: d * 30 + 40, hue: d * c % 3 });
      }
    return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
      a.map((d, c) => /* @__PURE__ */ e.jsx(
        "rect",
        {
          x: d.x,
          y: d.y,
          width: "28",
          height: "24",
          fill: d.hue === 0 ? i : d.hue === 1 ? "var(--accent-magenta)" : "var(--accent-lime)",
          opacity: 0.6 + d.hue * 0.15
        },
        c
      )),
      /* @__PURE__ */ e.jsx("text", { x: "30", y: "440", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: i, children: "// BLOCK.MAP" })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
    /* @__PURE__ */ e.jsxs("defs", { children: [
      /* @__PURE__ */ e.jsx(
        "pattern",
        {
          id: "iso-grid",
          width: "48",
          height: "28",
          patternUnits: "userSpaceOnUse",
          patternTransform: "skewX(-30)",
          children: /* @__PURE__ */ e.jsx("path", { d: "M48 0H0V28", fill: "none", stroke: i, strokeOpacity: "0.22", strokeWidth: "1" })
        }
      ),
      /* @__PURE__ */ e.jsxs("radialGradient", { id: "iso-glow", cx: "50%", cy: "55%", children: [
        /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: i, stopOpacity: "0.35" }),
        /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: i, stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ e.jsxs("linearGradient", { id: "iso-top", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: i }),
        /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: "var(--accent-magenta)" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("rect", { width: "480", height: "480", fill: "url(#iso-grid)", transform: "translate(0 60)" }),
    /* @__PURE__ */ e.jsx("rect", { width: "480", height: "480", fill: "url(#iso-glow)" }),
    /* @__PURE__ */ e.jsxs("g", { transform: "translate(240 270)", children: [
      /* @__PURE__ */ e.jsx(
        "polygon",
        {
          points: "0,-40 140,30 0,100 -140,30",
          fill: i,
          fillOpacity: "0.08",
          stroke: i,
          strokeOpacity: "0.5"
        }
      ),
      /* @__PURE__ */ e.jsx(
        "polygon",
        {
          points: "0,-20 100,22 0,62 -100,22",
          fill: "none",
          stroke: i,
          strokeOpacity: "0.3",
          strokeDasharray: "3 3"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("g", { transform: "translate(240 180)", children: [
      /* @__PURE__ */ e.jsx("polygon", { points: "0,0 70,30 70,100 0,70", fill: "var(--accent-magenta)", opacity: "0.85" }),
      /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -70,30 -70,100 0,70", fill: i, opacity: "0.9" }),
      /* @__PURE__ */ e.jsx("polygon", { points: "0,-40 70,-10 70,30 0,0 -70,30 -70,-10", fill: "url(#iso-top)" }),
      /* @__PURE__ */ e.jsx(
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
    /* @__PURE__ */ e.jsxs(
      "g",
      {
        transform: "translate(90 140)",
        style: { animation: "float 4s ease-in-out infinite", willChange: "transform" },
        children: [
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 40,16 40,56 0,40", fill: i, opacity: "0.9" }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -40,16 -40,56 0,40", fill: i, opacity: "0.65" }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,-20 40,-4 40,16 0,0 -40,16 -40,-4", fill: i, opacity: "0.5" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "g",
      {
        transform: "translate(380 120)",
        style: { animation: "float 5s ease-in-out infinite", willChange: "transform" },
        children: [
          /* @__PURE__ */ e.jsx("circle", { r: "26", fill: "var(--accent-magenta)", opacity: "0.85" }),
          /* @__PURE__ */ e.jsx("circle", { r: "26", fill: "none", stroke: "#fff", strokeOpacity: "0.45", strokeWidth: "1" }),
          /* @__PURE__ */ e.jsx("ellipse", { cx: "0", cy: "0", rx: "26", ry: "7", fill: "none", stroke: "#fff", strokeOpacity: "0.3" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs("g", { transform: "translate(110 360)", children: [
      /* @__PURE__ */ e.jsx("polygon", { points: "0,0 22,9 22,30 0,21", fill: "var(--accent-lime)" }),
      /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -22,9 -22,30 0,21", fill: "var(--accent-lime)", opacity: "0.7" }),
      /* @__PURE__ */ e.jsx("polygon", { points: "0,-12 22,-3 22,9 0,0 -22,9 -22,-3", fill: "#fff", opacity: "0.85" })
    ] }),
    /* @__PURE__ */ e.jsxs(
      "g",
      {
        transform: "translate(380 380)",
        style: { animation: "float 3.5s ease-in-out infinite", willChange: "transform" },
        children: [
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 18,8 18,26 0,18", fill: i }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -18,8 -18,26 0,18", fill: i, opacity: "0.7" }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,-10 18,-2 18,8 0,0 -18,8 -18,-2", fill: "#fff", opacity: "0.85" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx("text", { x: "24", y: "36", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: i, children: "// QUEST.WORLD" }),
    /* @__PURE__ */ e.jsx(
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
    /* @__PURE__ */ e.jsx(
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
function Q({ seed: t = 1, size: r = 40 }) {
  const i = [
    "var(--accent-cyan)",
    "var(--accent-magenta)",
    "var(--accent-lime)",
    "var(--accent-amber)",
    "var(--accent-violet)"
  ], n = i[t % i.length], o = i[(t + 2) % i.length], a = t % 3;
  return /* @__PURE__ */ e.jsxs(
    "svg",
    {
      width: r,
      height: r,
      viewBox: "0 0 40 40",
      style: {
        display: "block",
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--panel-2)"
      },
      children: [
        /* @__PURE__ */ e.jsx("rect", { width: "40", height: "40", fill: "var(--panel-2)" }),
        a === 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("circle", { cx: "20", cy: "20", r: "12", fill: n }),
          /* @__PURE__ */ e.jsx("circle", { cx: "20", cy: "20", r: "5", fill: o })
        ] }),
        a === 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("polygon", { points: "20,6 34,20 20,34 6,20", fill: n }),
          /* @__PURE__ */ e.jsx("rect", { x: "16", y: "16", width: "8", height: "8", fill: o })
        ] }),
        a === 2 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("rect", { x: "8", y: "8", width: "24", height: "24", fill: n }),
          /* @__PURE__ */ e.jsx("circle", { cx: "20", cy: "20", r: "6", fill: o })
        ] })
      ]
    }
  );
}
function B({ type: t, size: r = 22 }) {
  const i = r, n = {
    width: i,
    height: i,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return t === "social" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 12h8M12 8v8" })
  ] }) : t === "photo" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 6l2-3h4l2 3" })
  ] }) : t === "refer" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "9", cy: "10", r: "3" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "17", cy: "8", r: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" })
  ] }) : t === "video" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ e.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor" })
  ] }) : t === "quiz" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e.jsx("path", { d: "M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-2.5 2-2.5 4M12 17.5v.1" })
  ] }) : t === "review" ? /* @__PURE__ */ e.jsx("svg", { ...n, children: /* @__PURE__ */ e.jsx("polygon", { points: "12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9" }) }) : t === "event" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M3 10h18M8 3v4M16 3v4" })
  ] }) : t === "purchase" ? /* @__PURE__ */ e.jsxs("svg", { ...n, children: [
    /* @__PURE__ */ e.jsx("path", { d: "M5 7h14l-1.5 11H6.5L5 7z" }),
    /* @__PURE__ */ e.jsx("path", { d: "M9 7V5a3 3 0 016 0v2" })
  ] }) : /* @__PURE__ */ e.jsx("svg", { ...n, children: /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "8" }) });
}
function qe({
  heroStyle: t,
  title: r = "Founders' Path",
  subtitle: i = "Complete 8 of 12 missions to unlock the Ascendant lootbox.",
  eyebrow: n = "// current season · week 04"
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "hero-banner", children: [
    /* @__PURE__ */ e.jsx("div", { className: "hero-banner-bg", children: /* @__PURE__ */ e.jsx(Ce, { variant: t }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "hero-banner-content", children: [
      /* @__PURE__ */ e.jsx(T, { children: n }),
      /* @__PURE__ */ e.jsx("h2", { className: "display", style: { margin: 0, fontSize: 26, letterSpacing: "-0.02em" }, children: r }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 13, color: "var(--ink-dim)", maxWidth: 420 }, children: i })
    ] })
  ] });
}
const Te = {
  rank: "rank",
  handle: "insider",
  streak: "streak",
  tier: "tier",
  xp: "xp"
}, Ye = F(function({
  entries: r,
  streakEmoji: i = "🔥",
  columnLabels: n
}) {
  const o = { ...Te, ...n };
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { overflow: "hidden" }, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "lb-head lb-row", children: [
      /* @__PURE__ */ e.jsx("span", { children: o.rank }),
      /* @__PURE__ */ e.jsx("span", { children: o.handle }),
      /* @__PURE__ */ e.jsx("span", { className: "lb-streak", children: o.streak }),
      /* @__PURE__ */ e.jsx("span", { className: "lb-tier", children: o.tier }),
      /* @__PURE__ */ e.jsx("span", { className: "lb-cell-right", children: o.xp })
    ] }),
    r.map((a) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: "lb-row",
        style: { background: a.me ? "var(--accent-soft)" : "transparent" },
        children: [
          /* @__PURE__ */ e.jsx(
            "span",
            {
              className: "mono",
              style: { fontWeight: 700, color: a.rank <= 3 ? "var(--accent)" : "var(--ink)" },
              children: String(a.rank).padStart(2, "0")
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { className: "lb-identity", children: [
            /* @__PURE__ */ e.jsx(Q, { seed: a.seed, size: 28 }),
            /* @__PURE__ */ e.jsx("span", { style: { fontWeight: 600, fontSize: 14 }, children: a.handle }),
            a.me && /* @__PURE__ */ e.jsx(k, { tone: "accent", children: "YOU" })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "mono lb-streak", style: { fontSize: 13, color: "var(--accent-amber)" }, children: [
            a.streak,
            i
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "lb-tier", children: /* @__PURE__ */ e.jsx(
            k,
            {
              tone: a.tier === "Oracle" ? "magenta" : a.tier === "Ascendant" ? "lime" : "accent",
              children: a.tier
            }
          ) }),
          /* @__PURE__ */ e.jsx("span", { className: "mono lb-xp", children: a.xp.toLocaleString() })
        ]
      },
      a.rank
    ))
  ] });
});
function J({ shape: t, tint: r }) {
  const i = `var(--accent-${r})`;
  return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 100 100", style: { width: "100%", height: "100%", display: "block" }, children: [
    /* @__PURE__ */ e.jsx("rect", { width: "100", height: "100", fill: "var(--panel)" }),
    /* @__PURE__ */ e.jsx("g", { opacity: "0.18", stroke: i, strokeWidth: "1", children: Array.from({ length: 10 }).map((n, o) => /* @__PURE__ */ e.jsx("line", { x1: "0", y1: o * 10, x2: "100", y2: o * 10 }, o)) }),
    t === "hex" && /* @__PURE__ */ e.jsx("polygon", { points: "50,14 84,32 84,68 50,86 16,68 16,32", fill: i }),
    t === "circle" && /* @__PURE__ */ e.jsx("circle", { cx: "50", cy: "50", r: "30", fill: i }),
    t === "diamond" && /* @__PURE__ */ e.jsx("polygon", { points: "50,14 86,50 50,86 14,50", fill: i }),
    t === "square" && /* @__PURE__ */ e.jsx("rect", { x: "22", y: "22", width: "56", height: "56", fill: i })
  ] });
}
function E({
  selected: t,
  correct: r,
  wrong: i,
  disabled: n,
  onClick: o,
  children: a,
  layout: d = "row"
}) {
  const c = r ? "var(--accent-lime)" : i ? "var(--danger)" : t ? "var(--accent)" : "var(--border)", l = r ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : i ? "color-mix(in oklch, var(--danger) 14%, transparent)" : t ? "var(--accent-soft)" : "var(--panel-2)";
  return /* @__PURE__ */ e.jsx(
    "button",
    {
      disabled: n,
      onClick: o,
      style: {
        textAlign: "left",
        padding: d === "row" ? "14px 16px" : 10,
        borderRadius: d === "row" ? 8 : 10,
        border: `1px solid ${c}`,
        background: l,
        display: "flex",
        flexDirection: d === "column" ? "column" : "row",
        alignItems: d === "row" ? "center" : void 0,
        gap: d === "row" ? 12 : 8
      },
      children: a
    }
  );
}
const H = {
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
function Re({
  variant: t,
  onComplete: r
}) {
  const i = t === "text" ? H.text : t === "textImage" ? H.textImage : H.imageOnly, [n, o] = j(null), [a, d] = j(!1), c = i.correct === n;
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsxs(T, { children: [
      "// quiz · 1 of 5 ·",
      " ",
      t === "text" ? "text answers" : t === "textImage" ? "text + image" : "images only"
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.4 }, children: i.q }),
    t === "text" && /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: i.choices.map((l) => {
      const x = n === l.id, p = a && l.id === i.correct, u = a && x && !c;
      return /* @__PURE__ */ e.jsxs(
        E,
        {
          selected: x,
          correct: p,
          wrong: u,
          disabled: a,
          onClick: () => o(l.id),
          layout: "row",
          children: [
            /* @__PURE__ */ e.jsx(
              "span",
              {
                className: "mono",
                style: {
                  width: 24,
                  height: 24,
                  borderRadius: 5,
                  border: "1px solid var(--border)",
                  background: "var(--panel)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0
                },
                children: l.id.toUpperCase()
              }
            ),
            /* @__PURE__ */ e.jsx("span", { style: { flex: 1, fontSize: 14 }, children: l.label }),
            p && /* @__PURE__ */ e.jsx(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "var(--accent-lime)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ e.jsx("path", { d: "M3 8.5l3.5 3.5L13 5" })
              }
            ),
            u && /* @__PURE__ */ e.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                fill: "none",
                stroke: "var(--danger)",
                strokeWidth: "2.2",
                children: /* @__PURE__ */ e.jsx("path", { d: "M3 3l8 8M11 3l-8 8" })
              }
            )
          ]
        },
        l.id
      );
    }) }),
    t === "textImage" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: i.choices.map((l) => {
      const x = n === l.id, p = a && l.id === i.correct, u = a && x && !c;
      return /* @__PURE__ */ e.jsxs(
        E,
        {
          selected: x,
          correct: p,
          wrong: u,
          disabled: a,
          onClick: () => o(l.id),
          layout: "column",
          children: [
            /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: {
                  aspectRatio: "16/10",
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "var(--panel)",
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${l.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`
                      }
                    }
                  ),
                  /* @__PURE__ */ e.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center"
                      },
                      children: /* @__PURE__ */ e.jsxs(
                        "div",
                        {
                          style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: `var(--accent-${l.tint})`,
                            padding: "4px 8px",
                            background: "var(--panel)",
                            border: `1px solid color-mix(in oklch, var(--accent-${l.tint}) 40%, transparent)`,
                            borderRadius: 4
                          },
                          children: [
                            "OPT ",
                            l.id.toUpperCase()
                          ]
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  textAlign: "left"
                },
                children: [
                  /* @__PURE__ */ e.jsx(
                    "span",
                    {
                      className: "mono",
                      style: {
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        border: "1px solid var(--border)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0
                      },
                      children: l.id.toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ e.jsx("span", { children: l.label })
                ]
              }
            )
          ]
        },
        l.id
      );
    }) }),
    t === "imageOnly" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: i.choices.map((l) => {
      const x = n === l.id, p = a && l.id === i.correct, u = a && x && !c;
      return /* @__PURE__ */ e.jsx(
        E,
        {
          selected: x,
          correct: p,
          wrong: u,
          disabled: a,
          onClick: () => o(l.id),
          layout: "column",
          children: /* @__PURE__ */ e.jsx("div", { style: { aspectRatio: "1/1" }, children: /* @__PURE__ */ e.jsx(J, { shape: l.shape, tint: l.tint }) })
        },
        l.id
      );
    }) }),
    a && /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          padding: 12,
          borderRadius: 8,
          background: c ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)",
          border: `1px solid ${c ? "var(--accent-lime)" : "var(--danger)"}`,
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ e.jsx("strong", { children: c ? "Correct!" : "Not quite." }),
          " ",
          c ? "Nicely done." : "The correct answer is A."
        ]
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { display: "flex", gap: 8 }, children: a ? /* @__PURE__ */ e.jsx(w, { variant: "primary", style: { flex: 1 }, onClick: r, children: "Continue" }) : /* @__PURE__ */ e.jsx(
      w,
      {
        variant: "primary",
        style: { flex: 1 },
        disabled: !n,
        onClick: () => d(!0),
        children: "Submit answer"
      }
    ) })
  ] });
}
const Ne = {
  q: "Which GrowQuest feature would you use most?",
  choices: [
    { id: "a", label: "Daily missions" },
    { id: "b", label: "Spin-to-win lootbox" },
    { id: "c", label: "Referral boosts" },
    { id: "d", label: "Leaderboard competition" }
  ]
}, Ee = {
  q: "Which hero style fits your brand?",
  choices: [
    { id: "a", label: "Isometric world", tint: "cyan" },
    { id: "b", label: "Orbital / cosmic", tint: "magenta" },
    { id: "c", label: "Editorial poster", tint: "lime" },
    { id: "d", label: "Pixel / arcade", tint: "amber" }
  ]
}, ze = {
  q: "Pick your favorite vibe:",
  choices: [
    { id: "a", shape: "hex", tint: "cyan" },
    { id: "b", shape: "circle", tint: "magenta" },
    { id: "c", shape: "diamond", tint: "lime" },
    { id: "d", shape: "square", tint: "amber" }
  ]
};
function Ie({
  variant: t,
  onComplete: r,
  textMinLength: i = 20
}) {
  const [n, o] = j(null), [a, d] = j("");
  if (t === "textarea")
    return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ e.jsx(T, { children: "// survey · open question" }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.4 }, children: "What's the single biggest pain point in your growth stack right now?" }),
      /* @__PURE__ */ e.jsx(
        je,
        {
          value: a,
          onChange: (l) => d(l.target.value),
          placeholder: `Type your answer… (minimum ${i} characters)`,
          style: { minHeight: 180 }
        }
      ),
      /* @__PURE__ */ e.jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-dim)"
          },
          children: [
            /* @__PURE__ */ e.jsxs("span", { children: [
              a.length,
              " chars"
            ] }),
            /* @__PURE__ */ e.jsx("span", { children: a.length >= i ? "ready to submit" : `${i - a.length} more to go` })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(w, { variant: "primary", disabled: a.length < i, onClick: r, children: "Submit feedback" })
    ] });
  const c = t === "text" ? Ne : t === "textImage" ? Ee : ze;
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsx(T, { children: "// survey · your take helps shape the roadmap" }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.4 }, children: c.q }),
    t === "text" && /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: c.choices.map((l) => {
      const x = n === l.id;
      return /* @__PURE__ */ e.jsxs(E, { selected: x, onClick: () => o(l.id), layout: "row", children: [
        /* @__PURE__ */ e.jsx(
          "span",
          {
            style: {
              width: 18,
              height: 18,
              borderRadius: 99,
              border: "2px solid var(--border)",
              borderColor: x ? "var(--accent)" : "var(--border)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0
            },
            children: x && /* @__PURE__ */ e.jsx(
              "span",
              {
                style: { width: 8, height: 8, borderRadius: 99, background: "var(--accent)" }
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx("span", { style: { flex: 1, fontSize: 14 }, children: l.label })
      ] }, l.id);
    }) }),
    t === "textImage" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: c.choices.map((l) => {
      const x = n === l.id;
      return /* @__PURE__ */ e.jsxs(
        E,
        {
          selected: x,
          onClick: () => o(l.id),
          layout: "column",
          children: [
            /* @__PURE__ */ e.jsx("div", { style: { aspectRatio: "16/10", borderRadius: 6, overflow: "hidden" }, children: /* @__PURE__ */ e.jsx(
              J,
              {
                shape: ["hex", "circle", "diamond", "square"][l.id.charCodeAt(0) - 97],
                tint: l.tint
              }
            ) }),
            /* @__PURE__ */ e.jsx("div", { style: { textAlign: "left", fontSize: 13 }, children: l.label })
          ]
        },
        l.id
      );
    }) }),
    t === "imageOnly" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: c.choices.map((l) => {
      const x = n === l.id;
      return /* @__PURE__ */ e.jsx(
        E,
        {
          selected: x,
          onClick: () => o(l.id),
          layout: "column",
          children: /* @__PURE__ */ e.jsx("div", { style: { aspectRatio: "1/1" }, children: /* @__PURE__ */ e.jsx(J, { shape: l.shape, tint: l.tint }) })
        },
        l.id
      );
    }) }),
    /* @__PURE__ */ e.jsx(w, { variant: "primary", disabled: !n, onClick: r, children: "Submit" })
  ] });
}
function Ae({
  onComplete: t,
  word: r = "GROWQUEST",
  maxWrong: i = 6,
  category: n = "growth engine brand"
}) {
  const [o, a] = j([]), d = o.filter((x) => !r.includes(x)), c = r.split("").every((x) => o.includes(x)), l = d.length >= i;
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsxs(T, { children: [
      "// hangman · guess the word · ",
      i - d.length,
      " lives"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 14, color: "var(--ink-dim)" }, children: [
      "Category: ",
      n
    ] }),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: "hangman-stage",
        style: { display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, alignItems: "center" },
        children: [
          /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 100 130", width: "100", height: "130", children: [
            /* @__PURE__ */ e.jsx("line", { x1: "10", y1: "125", x2: "90", y2: "125", stroke: "var(--ink-dim)", strokeWidth: "3" }),
            /* @__PURE__ */ e.jsx("line", { x1: "30", y1: "125", x2: "30", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
            /* @__PURE__ */ e.jsx("line", { x1: "30", y1: "10", x2: "75", y2: "10", stroke: "var(--ink-dim)", strokeWidth: "3" }),
            /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "10", x2: "75", y2: "25", stroke: "var(--ink-dim)", strokeWidth: "3" }),
            d.length > 0 && /* @__PURE__ */ e.jsx("circle", { cx: "75", cy: "34", r: "9", fill: "none", stroke: "var(--danger)", strokeWidth: "2.5" }),
            d.length > 1 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "43", x2: "75", y2: "75", stroke: "var(--danger)", strokeWidth: "2.5" }),
            d.length > 2 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "55", x2: "62", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
            d.length > 3 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "55", x2: "88", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
            d.length > 4 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "75", x2: "65", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" }),
            d.length > 5 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "75", x2: "85", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" })
          ] }),
          /* @__PURE__ */ e.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: r.split("").map((x, p) => /* @__PURE__ */ e.jsx(
            "span",
            {
              style: {
                width: 28,
                height: 36,
                borderBottom: "2px solid var(--ink-dim)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 20,
                fontWeight: 700,
                color: o.includes(x) ? "var(--accent)" : "transparent"
              },
              children: x
            },
            p
          )) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "hangman-keys",
        style: { display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 4 },
        children: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((x) => {
          const p = o.includes(x), u = p && !r.includes(x), y = p && r.includes(x);
          return /* @__PURE__ */ e.jsx(
            "button",
            {
              disabled: p || c || l,
              onClick: () => a([...o, x]),
              style: {
                padding: "8px 0",
                borderRadius: 5,
                border: "1px solid var(--border)",
                background: y ? "var(--accent-soft)" : u ? "color-mix(in oklch, var(--danger) 18%, transparent)" : "var(--panel-2)",
                color: y ? "var(--accent)" : u ? "var(--danger)" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                opacity: p ? 0.7 : 1
              },
              children: x
            },
            x
          );
        })
      }
    ),
    (c || l) && /* @__PURE__ */ e.jsx(
      "div",
      {
        style: {
          padding: 12,
          borderRadius: 8,
          background: c ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)",
          border: `1px solid ${c ? "var(--accent-lime)" : "var(--danger)"}`,
          fontSize: 13
        },
        children: c ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Solved!" }),
          " You cracked ",
          r,
          "."
        ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Game over." }),
          " The word was ",
          /* @__PURE__ */ e.jsx("strong", { children: r }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(w, { variant: "primary", disabled: !c && !l, onClick: t, children: "Continue" })
  ] });
}
const We = [
  { q: "How many tiers are in GrowQuest?", choices: ["2", "3", "4", "5"], correct: 2 },
  {
    q: "What currency powers redemptions?",
    choices: ["USD", "XP", "Tokens", "Credits"],
    correct: 1
  },
  { q: "Streak bonus milestone lands at day…", choices: ["3", "5", "7", "10"], correct: 2 }
];
function _e({
  onComplete: t,
  questions: r = We,
  timeLimit: i = 15,
  passScore: n = 2
}) {
  const [o, a] = j(0), [d, c] = j(null), [l, x] = j(0), [p, u] = j(i), [y, S] = j("answering");
  V(() => {
    if (y !== "answering") return;
    if (p <= 0) {
      S("reveal");
      return;
    }
    const b = setTimeout(() => u(p - 1), 1e3);
    return () => clearTimeout(b);
  }, [p, y]), V(() => {
    u(i), c(null), S("answering");
  }, [o, i]);
  const C = r[o], D = d === C.correct;
  function z(b) {
    y === "answering" && (c(b), S("reveal"), b === C.correct && x((v) => v + 1));
  }
  function $() {
    o === r.length - 1 ? S("done") : a(o + 1);
  }
  if (y === "done") {
    const b = Math.round(l / r.length * 100), v = l >= n;
    return /* @__PURE__ */ e.jsxs("div", { style: { padding: 28, textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { width: 120, height: 120, margin: "0 auto 16px", position: "relative" }, children: /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 120 120", children: [
        /* @__PURE__ */ e.jsx("circle", { cx: "60", cy: "60", r: "50", fill: "none", stroke: "var(--panel-2)", strokeWidth: "10" }),
        /* @__PURE__ */ e.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: "50",
            fill: "none",
            stroke: v ? "var(--accent-lime)" : "var(--danger)",
            strokeWidth: "10",
            strokeDasharray: 2 * Math.PI * 50,
            strokeDashoffset: 2 * Math.PI * 50 * (1 - b / 100),
            transform: "rotate(-90 60 60)",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ e.jsxs(
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
              r.length
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ e.jsx("div", { className: "eyebrow", style: { marginBottom: 6 }, children: "// trivia complete" }),
      /* @__PURE__ */ e.jsx(
        "h3",
        {
          className: "display",
          style: { margin: "0 0 8px", fontSize: 22, letterSpacing: "-0.02em" },
          children: v ? "Nice run!" : "Keep training."
        }
      ),
      /* @__PURE__ */ e.jsx("p", { style: { color: "var(--ink-dim)", fontSize: 13, marginBottom: 16 }, children: v ? "You beat the bar — XP unlocked." : `Needed ${n}/${r.length} to pass. Try again tomorrow for another shot.` }),
      /* @__PURE__ */ e.jsx(w, { variant: "primary", style: { width: "100%" }, onClick: t, children: "Continue" })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ e.jsxs(T, { children: [
        "// trivia · q",
        o + 1,
        " / ",
        r.length
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ e.jsxs(ye, { tone: "accent", children: [
          "SCORE ",
          l
        ] }),
        /* @__PURE__ */ e.jsxs(
          "span",
          {
            className: "mono",
            style: {
              padding: "4px 8px",
              border: `1px solid ${p < 5 ? "var(--danger)" : "var(--border)"}`,
              borderRadius: 4,
              fontSize: 12,
              color: p < 5 ? "var(--danger)" : "var(--ink)"
            },
            children: [
              "⏱ ",
              String(p).padStart(2, "0"),
              "s"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        style: { height: 4, background: "var(--panel-2)", borderRadius: 99, overflow: "hidden" },
        children: /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              height: "100%",
              width: `${p / i * 100}%`,
              background: p < 5 ? "var(--danger)" : "var(--accent)",
              transition: "width 1s linear"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 18, fontWeight: 600, lineHeight: 1.4, padding: "10px 0" }, children: C.q }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }, children: C.choices.map((b, v) => {
      const _ = d === v, O = y === "reveal" && v === C.correct, P = y === "reveal" && _ && !D;
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          disabled: y !== "answering",
          onClick: () => z(v),
          style: {
            padding: "16px 14px",
            borderRadius: 8,
            border: `1px solid ${O ? "var(--accent-lime)" : P ? "var(--danger)" : _ ? "var(--accent)" : "var(--border)"}`,
            background: O ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : P ? "color-mix(in oklch, var(--danger) 14%, transparent)" : "var(--panel-2)",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14
          },
          children: [
            /* @__PURE__ */ e.jsx(
              "span",
              {
                className: "mono",
                style: {
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  border: "1px solid var(--border)",
                  background: "var(--panel)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  fontWeight: 700
                },
                children: String.fromCharCode(65 + v)
              }
            ),
            /* @__PURE__ */ e.jsx("span", { children: b })
          ]
        },
        v
      );
    }) }),
    y === "reveal" && /* @__PURE__ */ e.jsx(w, { variant: "primary", onClick: $, children: o === r.length - 1 ? "See results" : "Next question" })
  ] });
}
function W(t) {
  return `var(--accent-${t === "accent" ? "cyan" : t})`;
}
function Ge({ m: t, onClose: r, onClaim: i }) {
  const [n, o] = j(0);
  if (!t) return null;
  if (["quiz", "survey", "hangman", "trivia"].includes(t.type)) {
    const c = /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          position: "relative",
          padding: "20px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12
        },
        children: [
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ e.jsx("h2", { className: "display", style: { margin: 0, fontSize: 20, letterSpacing: "-0.02em" }, children: t.title }),
            /* @__PURE__ */ e.jsx("div", { style: { display: "flex", gap: 8, marginTop: 6 }, children: /* @__PURE__ */ e.jsx(N, { amount: t.xp }) })
          ] }),
          /* @__PURE__ */ e.jsx(
            "button",
            {
              onClick: r,
              "aria-label": "Close",
              className: "icon-box",
              style: { width: 28, height: 28, borderRadius: 6 },
              children: /* @__PURE__ */ e.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", children: /* @__PURE__ */ e.jsx(
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
        ]
      }
    ), l = () => {
      i(t), r();
    };
    let x = null;
    if (t.type === "quiz") {
      const p = t.subtype === "quiz-textImage" ? "textImage" : t.subtype === "quiz-imageOnly" ? "imageOnly" : "text";
      x = /* @__PURE__ */ e.jsx(Re, { variant: p, onComplete: l });
    } else if (t.type === "survey") {
      const p = t.subtype === "survey-textImage" ? "textImage" : t.subtype === "survey-imageOnly" ? "imageOnly" : t.subtype === "survey-textarea" ? "textarea" : "text";
      x = /* @__PURE__ */ e.jsx(Ie, { variant: p, onComplete: l });
    } else t.type === "hangman" ? x = /* @__PURE__ */ e.jsx(Ae, { onComplete: l }) : t.type === "trivia" && (x = /* @__PURE__ */ e.jsx(_e, { onComplete: l }));
    return ne(
      /* @__PURE__ */ e.jsx(
        "div",
        {
          className: "modal-backdrop",
          role: "presentation",
          onClick: r,
          onKeyDown: (p) => p.key === "Escape" && r(),
          children: /* @__PURE__ */ e.jsxs(
            "div",
            {
              className: "modal",
              role: "dialog",
              "aria-modal": "true",
              onClick: (p) => p.stopPropagation(),
              onKeyDown: (p) => p.stopPropagation(),
              style: { maxWidth: 560 },
              children: [
                c,
                x
              ]
            }
          )
        }
      ),
      document.body
    );
  }
  const d = [
    { t: "Launch", d: "Open the external action in a new tab." },
    { t: "Verify", d: "We confirm completion within ~30 seconds." },
    { t: "Claim", d: "XP drops into your wallet." }
  ];
  return ne(
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "modal-backdrop",
        role: "presentation",
        onClick: r,
        onKeyDown: (c) => c.key === "Escape" && r(),
        children: /* @__PURE__ */ e.jsxs("div", { className: "modal", role: "dialog", "aria-modal": "true", onClick: (c) => c.stopPropagation(), children: [
          /* @__PURE__ */ e.jsxs(
            "div",
            {
              style: {
                position: "relative",
                padding: "24px 24px 0",
                borderBottom: "1px solid var(--border)"
              },
              children: [
                /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", top: 16, right: 16 }, children: /* @__PURE__ */ e.jsx(
                  "button",
                  {
                    onClick: r,
                    "aria-label": "Close",
                    className: "icon-box",
                    style: { width: 28, height: 28, borderRadius: 6 },
                    children: /* @__PURE__ */ e.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", children: /* @__PURE__ */ e.jsx(
                      "path",
                      {
                        d: "M2 2l8 8M10 2l-8 8",
                        stroke: "currentColor",
                        strokeWidth: "1.6",
                        strokeLinecap: "round"
                      }
                    ) })
                  }
                ) }),
                /* @__PURE__ */ e.jsxs(T, { children: [
                  "// mission ",
                  t.id.toUpperCase(),
                  " · ",
                  t.type
                ] }),
                /* @__PURE__ */ e.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 18
                    },
                    children: [
                      /* @__PURE__ */ e.jsx(
                        "div",
                        {
                          className: "icon-box",
                          style: { width: 52, height: 52, borderRadius: 10, color: W(t.tone) },
                          children: /* @__PURE__ */ e.jsx(B, { type: t.type, size: 26 })
                        }
                      ),
                      /* @__PURE__ */ e.jsxs("div", { children: [
                        /* @__PURE__ */ e.jsx("h2", { className: "display", style: { margin: 0, fontSize: 22, letterSpacing: "-0.02em" }, children: t.title }),
                        /* @__PURE__ */ e.jsx("div", { style: { color: "var(--ink-dim)", fontSize: 13, marginTop: 2 }, children: t.desc })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ e.jsx(N, { amount: t.xp }),
              /* @__PURE__ */ e.jsxs(k, { children: [
                t.progress[0],
                "/",
                t.progress[1],
                " progress"
              ] }),
              t.limited && t.endsAt && /* @__PURE__ */ e.jsxs(k, { tone: "magenta", children: [
                "Ends in ",
                /* @__PURE__ */ e.jsx(ae, { endsAt: t.endsAt })
              ] })
            ] }),
            /* @__PURE__ */ e.jsxs(
              "div",
              {
                style: {
                  padding: 14,
                  background: "var(--panel-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 10
                },
                children: [
                  /* @__PURE__ */ e.jsx("div", { className: "eyebrow", style: { marginBottom: 10 }, children: "// how it works" }),
                  /* @__PURE__ */ e.jsx(
                    "ol",
                    {
                      style: {
                        margin: 0,
                        paddingLeft: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10
                      },
                      children: d.map((c, l) => /* @__PURE__ */ e.jsxs("li", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
                        /* @__PURE__ */ e.jsx(
                          "span",
                          {
                            style: {
                              width: 22,
                              height: 22,
                              borderRadius: 4,
                              background: l <= n ? "var(--accent)" : "var(--panel)",
                              color: l <= n ? "#05060A" : "var(--ink-dim)",
                              display: "grid",
                              placeItems: "center",
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              fontWeight: 700,
                              flexShrink: 0,
                              border: "1px solid var(--border)"
                            },
                            children: l + 1
                          }
                        ),
                        /* @__PURE__ */ e.jsxs("div", { children: [
                          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 13 }, children: c.t }),
                          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)" }, children: c.d })
                        ] })
                      ] }, l))
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
              /* @__PURE__ */ e.jsx(w, { variant: "ghost", onClick: r, children: "Later" }),
              /* @__PURE__ */ e.jsxs(
                w,
                {
                  variant: "primary",
                  style: { flex: 1 },
                  onClick: () => {
                    n < 2 ? o(n + 1) : (i(t), r());
                  },
                  children: [
                    n === 0 && "Launch mission",
                    n === 1 && "Verify completion",
                    n === 2 && `Claim +${t.xp} XP`
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    document.body
  );
}
const He = F(function({
  m: r,
  density: i = "comfortable",
  layout: n = "split",
  onOpen: o
}) {
  const [a, d] = r.progress, c = d > 0 ? a / d : 0, l = i === "compact", x = l ? 14 : 18;
  return n === "stack" ? /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: () => o(r),
      className: "mission-tile",
      style: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: x,
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        transition: "all 160ms ease"
      },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              className: "icon-box",
              style: { width: 32, height: 32, borderRadius: 6, color: W(r.tone) },
              children: /* @__PURE__ */ e.jsx(B, { type: r.type, size: 18 })
            }
          ),
          r.limited && /* @__PURE__ */ e.jsxs(k, { tone: "magenta", children: [
            "LIMITED",
            r.endsAt ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " ",
              "· ",
              /* @__PURE__ */ e.jsx(ae, { endsAt: r.endsAt })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: l ? 13 : 15, marginBottom: 4 }, children: r.title }),
          !l && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", lineHeight: 1.5 }, children: r.desc })
        ] }),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              marginTop: "auto"
            },
            children: [
              /* @__PURE__ */ e.jsx(N, { amount: r.xp }),
              /* @__PURE__ */ e.jsxs("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-dim)" }, children: [
                a,
                "/",
                d
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx("div", { className: "xpbar", style: { height: 4 }, children: /* @__PURE__ */ e.jsx("div", { className: "fill", style: { width: `${c * 100}%` } }) })
      ]
    }
  ) : n === "list" ? /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: () => o(r),
      className: "mission-tile",
      style: {
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: x,
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        width: "100%"
      },
      children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: "icon-box",
            style: {
              width: 40,
              height: 40,
              borderRadius: 8,
              color: W(r.tone),
              flexShrink: 0
            },
            children: /* @__PURE__ */ e.jsx(B, { type: r.type, size: 20 })
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 14, marginBottom: 2 }, children: r.title }),
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                fontSize: 12,
                color: "var(--ink-dim)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              },
              children: r.desc
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }, children: [
          r.limited && /* @__PURE__ */ e.jsx(k, { tone: "magenta", children: "LIMITED" }),
          /* @__PURE__ */ e.jsxs("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-dim)" }, children: [
            a,
            "/",
            d
          ] }),
          /* @__PURE__ */ e.jsx(N, { amount: r.xp })
        ] })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: () => o(r),
      className: "mission-tile",
      style: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        padding: x,
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        position: "relative",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              width: 80,
              height: 80,
              background: `radial-gradient(circle at 100% 0, var(--accent-${r.tone === "accent" ? "cyan" : r.tone}) 0%, transparent 70%)`,
              opacity: 0.25
            }
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: l ? 10 : 14,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ e.jsx(
                "div",
                {
                  className: "icon-box",
                  style: { width: 34, height: 34, borderRadius: 7, color: W(r.tone) },
                  children: /* @__PURE__ */ e.jsx(B, { type: r.type, size: 18 })
                }
              ),
              r.limited && /* @__PURE__ */ e.jsx(k, { tone: "magenta", children: "⏱ LIMITED" })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: l ? 14 : 16, marginBottom: 4 }, children: r.title }),
        !l && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", lineHeight: 1.5, marginBottom: 14 }, children: r.desc }),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              marginTop: l ? 8 : "auto"
            },
            children: [
              /* @__PURE__ */ e.jsx(N, { amount: r.xp }),
              /* @__PURE__ */ e.jsxs(
                "span",
                {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    background: W(r.tone),
                    color: "#05060A",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.04em"
                  },
                  children: [
                    "GO",
                    /* @__PURE__ */ e.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ e.jsx(
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
            ]
          }
        )
      ]
    }
  );
}), Oe = {
  1: "var(--accent-amber)",
  2: "var(--accent-cyan)",
  3: "var(--accent-magenta)"
}, Pe = { 1: 180, 2: 150, 3: 130 };
function Ve({ entries: t, rankColors: r, platformHeights: i }) {
  const n = r ?? Oe, o = i ?? Pe, a = t.slice(0, 3), d = [a[1], a[0], a[2]].filter(Boolean);
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 },
      children: d.map((c) => {
        const l = n[c.rank] ?? "var(--accent)", x = o[c.rank] ?? 120;
        return /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
                /* @__PURE__ */ e.jsx(Q, { seed: c.seed, size: 56 }),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      bottom: -6,
                      right: -6,
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      background: l,
                      color: "#05060A",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      border: "2px solid var(--bg)"
                    },
                    children: c.rank
                  }
                )
              ] }),
              /* @__PURE__ */ e.jsx(
                "div",
                {
                  style: {
                    fontWeight: 700,
                    fontSize: 14,
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: c.handle
                }
              ),
              /* @__PURE__ */ e.jsxs("div", { className: "mono", style: { fontSize: 12, color: "var(--ink-dim)" }, children: [
                c.xp.toLocaleString(),
                " XP"
              ] }),
              /* @__PURE__ */ e.jsxs(
                "div",
                {
                  style: {
                    width: "100%",
                    height: x,
                    background: `linear-gradient(180deg, ${l} 0%, transparent 100%)`,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    border: "1px solid var(--border)",
                    borderBottom: "none",
                    position: "relative",
                    overflow: "hidden"
                  },
                  children: [
                    /* @__PURE__ */ e.jsx(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          inset: 0,
                          backgroundImage: "repeating-linear-gradient(0deg, transparent 0 8px, rgba(0,0,0,0.12) 8px 9px)"
                        }
                      }
                    ),
                    /* @__PURE__ */ e.jsx(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          top: 10,
                          left: 10,
                          fontFamily: "var(--font-mono)",
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#05060A",
                          opacity: 0.8
                        },
                        children: String(c.rank).padStart(2, "0")
                      }
                    )
                  ]
                }
              )
            ]
          },
          c.rank
        );
      })
    }
  );
}
function Xe({
  persona: t,
  xpStyle: r,
  xpMax: i = 12e3,
  label: n = "Progress to Ascendant",
  walletAddress: o = "0xE63F6A · 356C10AC"
}) {
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "panel",
      style: { padding: 18, display: "flex", flexDirection: "column", gap: 14 },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ e.jsx(Q, { seed: 7, size: 44 }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
              /* @__PURE__ */ e.jsxs("span", { style: { fontWeight: 700 }, children: [
                "@",
                t.handle
              ] }),
              /* @__PURE__ */ e.jsx(k, { tone: "accent", children: t.tier })
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)" }, children: o })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(be, { value: t.xp, max: i, style: r, label: n }),
        /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }, children: [
          { k: "Missions", v: `${t.missionsDone}/12` },
          { k: "XP", v: t.xp.toLocaleString() },
          { k: "Streak", v: `${t.streak}d` }
        ].map((a) => /* @__PURE__ */ e.jsxs("div", { className: "stat-cell", children: [
          /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-faint)"
              },
              children: a.k
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 700, fontSize: 14, marginTop: 2 }, children: a.v })
        ] }, a.k)) })
      ]
    }
  );
}
const Je = F(function({
  r,
  persona: i,
  onRedeem: n,
  compact: o = !1
}) {
  const a = i.xp >= r.cost, d = r.tone === "accent" ? "cyan" : r.tone;
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { overflow: "hidden", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          aspectRatio: o ? "2 / 1" : "4 / 3",
          position: "relative",
          background: "var(--panel-2)",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden"
        },
        children: [
          r.imageUrl ? /* @__PURE__ */ e.jsx(
            "img",
            {
              src: r.imageUrl,
              alt: r.title,
              width: 400,
              height: 300,
              loading: "lazy",
              style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
            }
          ) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            /* @__PURE__ */ e.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${d}) 20%, transparent) 0 8px, transparent 8px 18px)`
                }
              }
            ),
            /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center" }, children: /* @__PURE__ */ e.jsx(
              "div",
              {
                style: {
                  width: o ? 52 : 68,
                  height: o ? 52 : 68,
                  borderRadius: 12,
                  background: `var(--accent-${d})`,
                  color: "#05060A",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  fontSize: o ? 9 : 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)"
                },
                children: r.kind.slice(0, 4)
              }
            ) })
          ] }),
          r.limited && /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", top: 10, left: 10 }, children: /* @__PURE__ */ e.jsx(k, { tone: "magenta", children: "LIMITED" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", top: 10, right: 10 }, children: /* @__PURE__ */ e.jsx(k, { children: r.stock }) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          padding: o ? 10 : 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1
        },
        children: [
          /* @__PURE__ */ e.jsxs("div", { children: [
            /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: o ? 13 : 14 }, children: r.title }),
            /* @__PURE__ */ e.jsx(
              "div",
              {
                style: {
                  fontSize: 11,
                  color: "var(--ink-dim)",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: 2
                },
                children: r.kind
              }
            )
          ] }),
          /* @__PURE__ */ e.jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                marginTop: "auto"
              },
              children: [
                /* @__PURE__ */ e.jsx(N, { amount: r.cost.toLocaleString() }),
                /* @__PURE__ */ e.jsx(w, { variant: "primary", size: "sm", disabled: !a, onClick: () => n(r), children: a ? "Redeem" : "Locked" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
function Qe({ label: t, value: r, trend: i, trendColor: n }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "stat-card", children: [
    /* @__PURE__ */ e.jsx("div", { className: "mono-label", style: { marginBottom: 6 }, children: t }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ e.jsx("span", { style: { fontWeight: 700, fontSize: 22 }, children: r }),
      /* @__PURE__ */ e.jsx(we, { values: i, color: n })
    ] })
  ] });
}
function Ke({ tiers: t, currentXP: r }) {
  const i = [...t].reverse().find((n) => r >= n.min) ?? t[0];
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { padding: 20 }, children: [
    /* @__PURE__ */ e.jsx("div", { className: "mono-label", style: { marginBottom: 14 }, children: "// tier ladder" }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        style: { display: "grid", gridTemplateColumns: `repeat(${t.length}, 1fr)`, gap: 10 },
        children: t.map((n, o) => {
          const a = i.name === n.name, d = r >= n.min;
          return /* @__PURE__ */ e.jsxs(
            "div",
            {
              style: {
                padding: 14,
                borderRadius: 10,
                border: a ? `1px solid ${n.color}` : "1px solid var(--border)",
                background: a ? `color-mix(in oklch, ${n.color} 12%, transparent)` : "var(--panel-2)",
                opacity: d || a ? 1 : 0.5
              },
              children: [
                /* @__PURE__ */ e.jsxs("div", { className: "mono-label", children: [
                  "tier ",
                  String(o + 1).padStart(2, "0")
                ] }),
                /* @__PURE__ */ e.jsx(
                  "div",
                  {
                    style: {
                      fontWeight: 700,
                      fontSize: 16,
                      marginTop: 4,
                      color: a ? n.color : "var(--ink)"
                    },
                    children: n.name
                  }
                ),
                /* @__PURE__ */ e.jsxs(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--ink-dim)",
                      marginTop: 2
                    },
                    children: [
                      n.min.toLocaleString(),
                      "+ XP"
                    ]
                  }
                )
              ]
            },
            n.name
          );
        })
      }
    )
  ] });
}
export {
  Le as BadgeGrid,
  De as BrandLockup,
  w as Button,
  ye as Chip,
  ae as Countdown,
  $e as Divider,
  T as Eyebrow,
  Fe as Field,
  Ue as FilterTabs,
  Ae as HangmanExperience,
  qe as HeroBanner,
  ve as Input,
  Ye as LeaderboardTable,
  ke as Logo,
  Ge as MissionModal,
  He as MissionTile,
  Ve as Podium,
  Xe as ProfileSnapshot,
  Re as QuizExperience,
  Je as RewardCard,
  we as Sparkline,
  Qe as StatCard,
  Ie as SurveyExperience,
  k as Tag,
  je as Textarea,
  Ke as TierLadder,
  _e as TriviaExperience,
  be as XPBar,
  N as XPPill
};
