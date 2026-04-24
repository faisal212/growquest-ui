import ye, { useState as p, useEffect as M, memo as Y, useRef as ee, useSyncExternalStore as je } from "react";
import { createPortal as be } from "react-dom";
var K = { exports: {} }, D = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ae;
function ke() {
  if (ae) return D;
  ae = 1;
  var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
  function r(i, o, s) {
    var l = null;
    if (s !== void 0 && (l = "" + s), o.key !== void 0 && (l = "" + o.key), "key" in o) {
      s = {};
      for (var a in o)
        a !== "key" && (s[a] = o[a]);
    } else s = o;
    return o = s.ref, {
      $$typeof: t,
      type: i,
      key: l,
      ref: o !== void 0 ? o : null,
      props: s
    };
  }
  return D.Fragment = n, D.jsx = r, D.jsxs = r, D;
}
var P = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ce;
function we() {
  return ce || (ce = 1, process.env.NODE_ENV !== "production" && function() {
    function t(x) {
      if (x == null) return null;
      if (typeof x == "function")
        return x.$$typeof === ge ? null : x.displayName || x.name || null;
      if (typeof x == "string") return x;
      switch (x) {
        case T:
          return "Fragment";
        case S:
          return "Profiler";
        case W:
          return "StrictMode";
        case E:
          return "Suspense";
        case pe:
          return "SuspenseList";
        case ue:
          return "Activity";
      }
      if (typeof x == "object")
        switch (typeof x.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), x.$$typeof) {
          case A:
            return "Portal";
          case R:
            return x.displayName || "Context";
          case k:
            return (x._context.displayName || "Context") + ".Consumer";
          case z:
            var f = x.render;
            return x = x.displayName, x || (x = f.displayName || f.name || "", x = x !== "" ? "ForwardRef(" + x + ")" : "ForwardRef"), x;
          case fe:
            return f = x.displayName || null, f !== null ? f : t(x.type) || "Memo";
          case H:
            f = x._payload, x = x._init;
            try {
              return t(x(f));
            } catch {
            }
        }
      return null;
    }
    function n(x) {
      return "" + x;
    }
    function r(x) {
      try {
        n(x);
        var f = !1;
      } catch {
        f = !0;
      }
      if (f) {
        f = console;
        var m = f.error, y = typeof Symbol == "function" && Symbol.toStringTag && x[Symbol.toStringTag] || x.constructor.name || "Object";
        return m.call(
          f,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          y
        ), n(x);
      }
    }
    function i(x) {
      if (x === T) return "<>";
      if (typeof x == "object" && x !== null && x.$$typeof === H)
        return "<...>";
      try {
        var f = t(x);
        return f ? "<" + f + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var x = q.A;
      return x === null ? null : x.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function l(x) {
      if (ne.call(x, "key")) {
        var f = Object.getOwnPropertyDescriptor(x, "key").get;
        if (f && f.isReactWarning) return !1;
      }
      return x.key !== void 0;
    }
    function a(x, f) {
      function m() {
        re || (re = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          f
        ));
      }
      m.isReactWarning = !0, Object.defineProperty(x, "key", {
        get: m,
        configurable: !0
      });
    }
    function d() {
      var x = t(this.type);
      return ie[x] || (ie[x] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), x = this.props.ref, x !== void 0 ? x : null;
    }
    function c(x, f, m, y, $, V) {
      var j = m.ref;
      return x = {
        $$typeof: w,
        type: x,
        key: f,
        props: m,
        _owner: y
      }, (j !== void 0 ? j : null) !== null ? Object.defineProperty(x, "ref", {
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
        value: $
      }), Object.defineProperty(x, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: V
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    }
    function h(x, f, m, y, $, V) {
      var j = f.children;
      if (j !== void 0)
        if (y)
          if (ve(j)) {
            for (y = 0; y < j.length; y++)
              u(j[y]);
            Object.freeze && Object.freeze(j);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else u(j);
      if (ne.call(f, "key")) {
        j = t(x);
        var I = Object.keys(f).filter(function(me) {
          return me !== "key";
        });
        y = 0 < I.length ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}", le[j + y] || (I = 0 < I.length ? "{" + I.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          y,
          j,
          I,
          j
        ), le[j + y] = !0);
      }
      if (j = null, m !== void 0 && (r(m), j = "" + m), l(f) && (r(f.key), j = "" + f.key), "key" in f) {
        m = {};
        for (var J in f)
          J !== "key" && (m[J] = f[J]);
      } else m = f;
      return j && a(
        m,
        typeof x == "function" ? x.displayName || x.name || "Unknown" : x
      ), c(
        x,
        j,
        m,
        o(),
        $,
        V
      );
    }
    function u(x) {
      v(x) ? x._store && (x._store.validated = 1) : typeof x == "object" && x !== null && x.$$typeof === H && (x._payload.status === "fulfilled" ? v(x._payload.value) && x._payload.value._store && (x._payload.value._store.validated = 1) : x._store && (x._store.validated = 1));
    }
    function v(x) {
      return typeof x == "object" && x !== null && x.$$typeof === w;
    }
    var b = ye, w = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), W = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), R = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), pe = Symbol.for("react.suspense_list"), fe = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), ue = Symbol.for("react.activity"), ge = Symbol.for("react.client.reference"), q = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = Object.prototype.hasOwnProperty, ve = Array.isArray, X = console.createTask ? console.createTask : function() {
      return null;
    };
    b = {
      react_stack_bottom_frame: function(x) {
        return x();
      }
    };
    var re, ie = {}, se = b.react_stack_bottom_frame.bind(
      b,
      s
    )(), oe = X(i(s)), le = {};
    P.Fragment = T, P.jsx = function(x, f, m) {
      var y = 1e4 > q.recentlyCreatedOwnerStacks++;
      return h(
        x,
        f,
        m,
        !1,
        y ? Error("react-stack-top-frame") : se,
        y ? X(i(x)) : oe
      );
    }, P.jsxs = function(x, f, m) {
      var y = 1e4 > q.recentlyCreatedOwnerStacks++;
      return h(
        x,
        f,
        m,
        !0,
        y ? Error("react-stack-top-frame") : se,
        y ? X(i(x)) : oe
      );
    };
  }()), P;
}
process.env.NODE_ENV === "production" ? K.exports = ke() : K.exports = we();
var e = K.exports;
function g({
  variant: t = "default",
  size: n = "md",
  icon: r,
  iconLeft: i,
  iconRight: o,
  children: s,
  className: l,
  style: a,
  ...d
}) {
  const c = [
    "btn",
    t !== "default" ? t : "",
    n === "sm" ? "btn-sm" : "",
    l
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ e.jsxs("button", { className: c, style: a, ...d, children: [
    i,
    s,
    o ?? r
  ] });
}
const Se = {
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
function Ce({ children: t, tone: n = "default", dot: r, className: i, style: o }) {
  const s = n !== "default" ? Se[n] : {};
  return /* @__PURE__ */ e.jsxs(
    "span",
    {
      className: ["chip", i].filter(Boolean).join(" "),
      style: { ...s, ...o },
      children: [
        r && /* @__PURE__ */ e.jsx(
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
function F({ className: t, ...n }) {
  return /* @__PURE__ */ e.jsx("input", { className: ["input", t].filter(Boolean).join(" "), ...n });
}
function xe({ className: t, style: n, ...r }) {
  return /* @__PURE__ */ e.jsx(
    "textarea",
    {
      className: ["input", t].filter(Boolean).join(" "),
      style: { resize: "vertical", minHeight: 120, lineHeight: 1.6, ...n },
      ...r
    }
  );
}
function de({
  label: t,
  labelInside: n,
  adornmentLeft: r,
  adornmentRight: i,
  hint: o,
  error: s,
  style: l,
  ...a
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
      r && /* @__PURE__ */ e.jsx(
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
          children: r
        }
      ),
      n ? /* @__PURE__ */ e.jsxs(
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
            paddingLeft: r ? 38 : void 0,
            paddingRight: i ? 38 : void 0
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
                children: n
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
                ...a
              }
            )
          ]
        }
      ) : /* @__PURE__ */ e.jsx(
        F,
        {
          style: {
            paddingLeft: r ? 38 : void 0,
            paddingRight: i ? 38 : void 0,
            width: "100%",
            ...l
          },
          ...a
        }
      ),
      i && /* @__PURE__ */ e.jsx(
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
          children: i
        }
      )
    ] }),
    (o || s) && /* @__PURE__ */ e.jsx(
      "span",
      {
        style: {
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          lineHeight: 1.4,
          color: s ? "var(--danger)" : "var(--ink-faint)"
        },
        children: s ?? o
      }
    )
  ] });
}
function Re({ value: t, max: n, style: r = "segmented", segments: i = 10, label: o }) {
  const s = Math.max(0, Math.min(1, t / n));
  if (r === "plain")
    return /* @__PURE__ */ e.jsxs("div", { children: [
      o && /* @__PURE__ */ e.jsxs("div", { className: "xpbar-label", children: [
        /* @__PURE__ */ e.jsx("span", { children: o }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          t,
          "/",
          n
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "xpbar", children: /* @__PURE__ */ e.jsx("div", { className: "fill", style: { width: `${s * 100}%` } }) })
    ] });
  if (r === "segmented") {
    const l = Math.round(s * i);
    return /* @__PURE__ */ e.jsxs("div", { children: [
      o && /* @__PURE__ */ e.jsxs("div", { className: "xpbar-label", children: [
        /* @__PURE__ */ e.jsx("span", { children: o }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          t,
          "/",
          n
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "xp-seg", children: Array.from({ length: i }).map((a, d) => /* @__PURE__ */ e.jsx("div", { className: `seg ${d < l ? "on" : ""}` }, d)) })
    ] });
  }
  if (r === "ring") {
    const a = 2 * Math.PI * 30;
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
            strokeDasharray: a,
            strokeDashoffset: a * (1 - s),
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
              Math.round(s * 100),
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
          n
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
            n
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
                background: `linear-gradient(90deg, var(--accent) 0%, var(--accent) ${s * 100}%, transparent ${s * 100}%)`,
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
function Te({ size: t = 28 }) {
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
function xt({
  name: t = "GrowQuest",
  version: n = "v1.4"
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "brand-lockup", children: [
    /* @__PURE__ */ e.jsx("span", { className: "logo", children: /* @__PURE__ */ e.jsx(Te, {}) }),
    /* @__PURE__ */ e.jsx("span", { children: t }),
    /* @__PURE__ */ e.jsx("span", { className: "chip brand-version", children: n })
  ] });
}
function _({ children: t, dot: n }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "eyebrow", children: [
    n !== !1 && /* @__PURE__ */ e.jsx(
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
function C({ children: t, tone: n = "default" }) {
  const r = {
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
  }, i = r[n] ?? r.default;
  return /* @__PURE__ */ e.jsx("span", { className: "chip", style: i, children: t });
}
function O({ amount: t, icon: n = !0 }) {
  return /* @__PURE__ */ e.jsxs("span", { className: "chip accent xp-pill", children: [
    n && /* @__PURE__ */ e.jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", children: /* @__PURE__ */ e.jsx(
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
function he({ endsAt: t }) {
  const [n, r] = p(Date.now);
  M(() => {
    const a = setInterval(() => r(Date.now()), 1e3);
    return () => clearInterval(a);
  }, []);
  const i = Math.max(0, t - n), o = Math.floor(i / 36e5).toString().padStart(2, "0"), s = Math.floor(i % 36e5 / 6e4).toString().padStart(2, "0"), l = Math.floor(i % 6e4 / 1e3).toString().padStart(2, "0");
  return /* @__PURE__ */ e.jsxs("span", { className: "mono", style: { color: "var(--accent-magenta)" }, children: [
    o,
    ":",
    s,
    ":",
    l
  ] });
}
function ze({
  values: t,
  color: n = "var(--accent)",
  w: r = 80,
  h: i = 24
}) {
  const o = Math.min(...t), s = Math.max(...t), l = t.map((a, d) => {
    const c = d / (t.length - 1) * r, h = i - (a - o) / (s - o || 1) * (i - 2) - 1;
    return `${c},${h}`;
  }).join(" ");
  return /* @__PURE__ */ e.jsx("svg", { width: r, height: i, viewBox: `0 0 ${r} ${i}`, children: /* @__PURE__ */ e.jsx("polyline", { points: l, fill: "none", stroke: n, strokeWidth: "1.5" }) });
}
function ht({ label: t }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "divider", children: [
    /* @__PURE__ */ e.jsx("div", { className: "divider-line" }),
    t && /* @__PURE__ */ e.jsx("span", { className: "eyebrow", children: t }),
    /* @__PURE__ */ e.jsx("div", { className: "divider-line" })
  ] });
}
const Ee = ["cyan", "magenta", "lime", "amber", "violet"], pt = Y(function({ badges: n, columns: r = 3 }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { padding: 20 }, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "mono-label", style: { marginBottom: 14 }, children: [
      "// badges · ",
      n.filter((i) => i.got).length,
      "/",
      n.length
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gap: 10, gridTemplateColumns: `repeat(${r}, 1fr)` }, children: n.map((i, o) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        title: i.desc,
        style: {
          padding: 14,
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          textAlign: "center",
          opacity: i.got ? 1 : 0.4
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
                background: i.got ? `var(--accent-${Ee[o % 5]})` : "var(--panel)",
                display: "grid",
                placeItems: "center",
                border: "1px solid var(--border)"
              },
              children: /* @__PURE__ */ e.jsx("svg", { width: "22", height: "22", viewBox: "0 0 22 22", children: /* @__PURE__ */ e.jsx(
                "polygon",
                {
                  points: "11,2 20,7 20,15 11,20 2,15 2,7",
                  fill: i.got ? "#05060A" : "var(--ink-faint)"
                }
              ) })
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 12 }, children: i.name }),
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
              children: i.got ? "unlocked" : "locked"
            }
          )
        ]
      },
      i.id
    )) })
  ] });
});
function ft({ options: t, value: n, onChange: r }) {
  return /* @__PURE__ */ e.jsx("div", { className: "filter-tabs", children: t.map((i) => /* @__PURE__ */ e.jsx(
    "button",
    {
      onClick: () => r(i),
      style: {
        padding: "6px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: 6,
        background: n === i ? "var(--panel)" : "transparent",
        color: n === i ? "var(--ink)" : "var(--ink-dim)",
        border: n === i ? "1px solid var(--border)" : "1px solid transparent"
      },
      children: i
    },
    i
  )) });
}
function Me({ variant: t = "isometric", accent: n }) {
  const r = n || "var(--accent)";
  if (t === "grid-poster")
    return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
      /* @__PURE__ */ e.jsxs("defs", { children: [
        /* @__PURE__ */ e.jsx("pattern", { id: "gp-grid", width: "24", height: "24", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ e.jsx("path", { d: "M24 0H0V24", fill: "none", stroke: r, strokeOpacity: "0.18", strokeWidth: "1" }) }),
        /* @__PURE__ */ e.jsxs("linearGradient", { id: "gp-fade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0" }),
          /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0.35" })
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
          fill: r,
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
          fill: r,
          letterSpacing: "-2",
          children: "UP."
        }
      ),
      /* @__PURE__ */ e.jsx("circle", { cx: "380", cy: "130", r: "70", fill: "none", stroke: r, strokeWidth: "1.5" }),
      /* @__PURE__ */ e.jsx(
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
      /* @__PURE__ */ e.jsx("circle", { cx: "380", cy: "130", r: "8", fill: r })
    ] });
  if (t === "orbital")
    return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
      /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsxs("radialGradient", { id: "orb-glow", children: [
        /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0.55" }),
        /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ e.jsx("rect", { width: "480", height: "480", fill: "transparent" }),
      /* @__PURE__ */ e.jsx("circle", { cx: "240", cy: "240", r: "200", fill: "url(#orb-glow)" }),
      [160, 110, 60].map((i, o) => /* @__PURE__ */ e.jsx(
        "ellipse",
        {
          cx: "240",
          cy: "240",
          rx: i * 1.6,
          ry: i * 0.5,
          fill: "none",
          stroke: r,
          strokeOpacity: 0.4 - o * 0.1,
          strokeWidth: "1",
          transform: `rotate(${-20 + o * 12} 240 240)`
        },
        o
      )),
      /* @__PURE__ */ e.jsx("circle", { cx: "240", cy: "240", r: "34", fill: r, opacity: "0.9" }),
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
      [0, 72, 144, 216, 288].map((i, o) => {
        const s = i * Math.PI / 180, l = 240 + Math.cos(s) * 170, a = 240 + Math.sin(s) * 60;
        return /* @__PURE__ */ e.jsx("circle", { cx: l, cy: a, r: 6 + o % 3 * 2, fill: r, opacity: 0.7 }, o);
      }),
      /* @__PURE__ */ e.jsx("text", { x: "30", y: "40", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// ORBIT.SYS" })
    ] });
  if (t === "pixel") {
    const s = [];
    for (let l = 0; l < 12; l++)
      for (let a = 0; a < 12; a++) {
        const d = a + l * 0.5 - 3, c = l - a * 0.3 + 4;
        Math.hypot(d - 5, c - 5) < 3 + Math.sin(l * a * 0.3) * 1.5 && s.push({ x: a * 34 + 30, y: l * 30 + 40, hue: l * a % 3 });
      }
    return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 480 480", style: { width: "100%", height: "100%", display: "block" }, children: [
      s.map((l, a) => /* @__PURE__ */ e.jsx(
        "rect",
        {
          x: l.x,
          y: l.y,
          width: "28",
          height: "24",
          fill: l.hue === 0 ? r : l.hue === 1 ? "var(--accent-magenta)" : "var(--accent-lime)",
          opacity: 0.6 + l.hue * 0.15
        },
        a
      )),
      /* @__PURE__ */ e.jsx("text", { x: "30", y: "440", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// BLOCK.MAP" })
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
          children: /* @__PURE__ */ e.jsx("path", { d: "M48 0H0V28", fill: "none", stroke: r, strokeOpacity: "0.22", strokeWidth: "1" })
        }
      ),
      /* @__PURE__ */ e.jsxs("radialGradient", { id: "iso-glow", cx: "50%", cy: "55%", children: [
        /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: r, stopOpacity: "0.35" }),
        /* @__PURE__ */ e.jsx("stop", { offset: "1", stopColor: r, stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ e.jsxs("linearGradient", { id: "iso-top", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ e.jsx("stop", { offset: "0", stopColor: r }),
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
          fill: r,
          fillOpacity: "0.08",
          stroke: r,
          strokeOpacity: "0.5"
        }
      ),
      /* @__PURE__ */ e.jsx(
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
    /* @__PURE__ */ e.jsxs("g", { transform: "translate(240 180)", children: [
      /* @__PURE__ */ e.jsx("polygon", { points: "0,0 70,30 70,100 0,70", fill: "var(--accent-magenta)", opacity: "0.85" }),
      /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -70,30 -70,100 0,70", fill: r, opacity: "0.9" }),
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
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 40,16 40,56 0,40", fill: r, opacity: "0.9" }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -40,16 -40,56 0,40", fill: r, opacity: "0.65" }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,-20 40,-4 40,16 0,0 -40,16 -40,-4", fill: r, opacity: "0.5" })
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
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 18,8 18,26 0,18", fill: r }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,0 -18,8 -18,26 0,18", fill: r, opacity: "0.7" }),
          /* @__PURE__ */ e.jsx("polygon", { points: "0,-10 18,-2 18,8 0,0 -18,8 -18,-2", fill: "#fff", opacity: "0.85" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx("text", { x: "24", y: "36", fontFamily: "JetBrains Mono", fontSize: "10", letterSpacing: "2", fill: r, children: "// QUEST.WORLD" }),
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
function te({ seed: t = 1, size: n = 40 }) {
  const r = [
    "var(--accent-cyan)",
    "var(--accent-magenta)",
    "var(--accent-lime)",
    "var(--accent-amber)",
    "var(--accent-violet)"
  ], i = r[t % r.length], o = r[(t + 2) % r.length], s = t % 3;
  return /* @__PURE__ */ e.jsxs(
    "svg",
    {
      width: n,
      height: n,
      viewBox: "0 0 40 40",
      style: {
        display: "block",
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--panel-2)"
      },
      children: [
        /* @__PURE__ */ e.jsx("rect", { width: "40", height: "40", fill: "var(--panel-2)" }),
        s === 0 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("circle", { cx: "20", cy: "20", r: "12", fill: i }),
          /* @__PURE__ */ e.jsx("circle", { cx: "20", cy: "20", r: "5", fill: o })
        ] }),
        s === 1 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("polygon", { points: "20,6 34,20 20,34 6,20", fill: i }),
          /* @__PURE__ */ e.jsx("rect", { x: "16", y: "16", width: "8", height: "8", fill: o })
        ] }),
        s === 2 && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("rect", { x: "8", y: "8", width: "24", height: "24", fill: i }),
          /* @__PURE__ */ e.jsx("circle", { cx: "20", cy: "20", r: "6", fill: o })
        ] })
      ]
    }
  );
}
function G({ type: t, size: n = 22 }) {
  const r = n, i = {
    width: r,
    height: r,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return t === "social" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "8" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 12h8M12 8v8" })
  ] }) : t === "photo" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 6l2-3h4l2 3" })
  ] }) : t === "refer" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "9", cy: "10", r: "3" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "17", cy: "8", r: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-2 2-3.5 4-3.5" })
  ] }) : t === "video" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ e.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor" })
  ] }) : t === "quiz" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e.jsx("path", { d: "M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-2.5 2-2.5 4M12 17.5v.1" })
  ] }) : t === "review" ? /* @__PURE__ */ e.jsx("svg", { ...i, children: /* @__PURE__ */ e.jsx("polygon", { points: "12,3 14.5,9 21,9.5 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9.5 9.5,9" }) }) : t === "event" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M3 10h18M8 3v4M16 3v4" })
  ] }) : t === "purchase" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("path", { d: "M5 7h14l-1.5 11H6.5L5 7z" }),
    /* @__PURE__ */ e.jsx("path", { d: "M9 7V5a3 3 0 016 0v2" })
  ] }) : t === "read_article" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "4", y: "3", width: "16", height: "18", rx: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 8h8M8 12h8M8 16h5" })
  ] }) : t === "profile" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ e.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ e.jsx("path", { d: "M15 15l1.5 1.5L19 14" })
  ] }) : t === "avatar" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "8", r: "4" }),
    /* @__PURE__ */ e.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
    /* @__PURE__ */ e.jsx("path", { d: "M18 14v4M16 16h4" })
  ] }) : t === "verify_email" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "6", width: "18", height: "13", rx: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M3 8l9 6 9-6" }),
    /* @__PURE__ */ e.jsx("path", { d: "M14 17l2 2 4-4" })
  ] }) : t === "verify_phone" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "7", y: "2", width: "10", height: "20", rx: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M7 6h10M7 18h10" }),
    /* @__PURE__ */ e.jsx("path", { d: "M14 14l1.5 1.5L18 13" })
  ] }) : t === "spin_wheel" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e.jsx("path", { d: "M12 3v9M12 12l6.4 6.4M12 12H3" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "2", fill: "currentColor", stroke: "none" })
  ] }) : t === "scratch_card" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M7 12c1.5-2 3-2 4 0s2.5 2 4 0", strokeDasharray: "3 2" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 16h2M12 16h4" })
  ] }) : t === "badge_collect" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("path", { d: "M12 3l2.2 5.2H20l-4.6 3.4 1.8 5.4L12 14l-5.2 3 1.8-5.4L4 8.2h5.8z" }),
    /* @__PURE__ */ e.jsx("path", { d: "M9 21h6M12 17.5v3.5" })
  ] }) : t === "share" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("path", { d: "M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" }),
    /* @__PURE__ */ e.jsx("path", { d: "M16 6l-4-4-4 4M12 2v13" })
  ] }) : t === "invite" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "9", cy: "8", r: "3" }),
    /* @__PURE__ */ e.jsx("path", { d: "M3 20c0-3 2.5-5 6-5s6 2 6 5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M18 8v6M15 11h6" })
  ] }) : t === "photo_proof" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "13", r: "3.5" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 6l2-3h4l2 3" }),
    /* @__PURE__ */ e.jsx("path", { d: "M15 11l1.5 1.5L19 10" })
  ] }) : t === "follow_social" ? /* @__PURE__ */ e.jsxs("svg", { ...i, children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 12h8M12 8v8" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "18.5", cy: "5.5", r: "2.5", fill: "currentColor", stroke: "none" })
  ] }) : /* @__PURE__ */ e.jsx("svg", { ...i, children: /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "8" }) });
}
function ut({
  heroStyle: t,
  title: n = "Founders' Path",
  subtitle: r = "Complete 8 of 12 missions to unlock the Ascendant lootbox.",
  eyebrow: i = "// current season · week 04"
}) {
  return /* @__PURE__ */ e.jsxs("div", { className: "hero-banner", children: [
    /* @__PURE__ */ e.jsx("div", { className: "hero-banner-bg", children: /* @__PURE__ */ e.jsx(Me, { variant: t }) }),
    /* @__PURE__ */ e.jsxs("div", { className: "hero-banner-content", children: [
      /* @__PURE__ */ e.jsx(_, { children: i }),
      /* @__PURE__ */ e.jsx("h2", { className: "display", style: { margin: 0, fontSize: 26, letterSpacing: "-0.02em" }, children: n }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 13, color: "var(--ink-dim)", maxWidth: 420 }, children: r })
    ] })
  ] });
}
const Ae = {
  rank: "rank",
  handle: "insider",
  streak: "streak",
  tier: "tier",
  xp: "xp"
}, gt = Y(function({
  entries: n,
  streakEmoji: r = "🔥",
  columnLabels: i
}) {
  const o = { ...Ae, ...i };
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { overflow: "hidden" }, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "lb-head lb-row", children: [
      /* @__PURE__ */ e.jsx("span", { children: o.rank }),
      /* @__PURE__ */ e.jsx("span", { children: o.handle }),
      /* @__PURE__ */ e.jsx("span", { className: "lb-streak", children: o.streak }),
      /* @__PURE__ */ e.jsx("span", { className: "lb-tier", children: o.tier }),
      /* @__PURE__ */ e.jsx("span", { className: "lb-cell-right", children: o.xp })
    ] }),
    n.map((s) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: "lb-row",
        style: { background: s.me ? "var(--accent-soft)" : "transparent" },
        children: [
          /* @__PURE__ */ e.jsx(
            "span",
            {
              className: "mono",
              style: { fontWeight: 700, color: s.rank <= 3 ? "var(--accent)" : "var(--ink)" },
              children: String(s.rank).padStart(2, "0")
            }
          ),
          /* @__PURE__ */ e.jsxs("span", { className: "lb-identity", children: [
            /* @__PURE__ */ e.jsx(te, { seed: s.seed, size: 28 }),
            /* @__PURE__ */ e.jsx("span", { style: { fontWeight: 600, fontSize: 14 }, children: s.handle }),
            s.me && /* @__PURE__ */ e.jsx(C, { tone: "accent", children: "YOU" })
          ] }),
          /* @__PURE__ */ e.jsxs("span", { className: "mono lb-streak", style: { fontSize: 13, color: "var(--accent-amber)" }, children: [
            s.streak,
            r
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "lb-tier", children: /* @__PURE__ */ e.jsx(
            C,
            {
              tone: s.tier === "Oracle" ? "magenta" : s.tier === "Ascendant" ? "lime" : "accent",
              children: s.tier
            }
          ) }),
          /* @__PURE__ */ e.jsx("span", { className: "mono lb-xp", children: s.xp.toLocaleString() })
        ]
      },
      s.rank
    ))
  ] });
});
function Z({ shape: t, tint: n }) {
  const r = `var(--accent-${n})`;
  return /* @__PURE__ */ e.jsxs("svg", { viewBox: "0 0 100 100", style: { width: "100%", height: "100%", display: "block" }, children: [
    /* @__PURE__ */ e.jsx("rect", { width: "100", height: "100", fill: "var(--panel)" }),
    /* @__PURE__ */ e.jsx("g", { opacity: "0.18", stroke: r, strokeWidth: "1", children: Array.from({ length: 10 }).map((i, o) => /* @__PURE__ */ e.jsx("line", { x1: "0", y1: o * 10, x2: "100", y2: o * 10 }, o)) }),
    t === "hex" && /* @__PURE__ */ e.jsx("polygon", { points: "50,14 84,32 84,68 50,86 16,68 16,32", fill: r }),
    t === "circle" && /* @__PURE__ */ e.jsx("circle", { cx: "50", cy: "50", r: "30", fill: r }),
    t === "diamond" && /* @__PURE__ */ e.jsx("polygon", { points: "50,14 86,50 50,86 14,50", fill: r }),
    t === "square" && /* @__PURE__ */ e.jsx("rect", { x: "22", y: "22", width: "56", height: "56", fill: r })
  ] });
}
function N({
  selected: t,
  correct: n,
  wrong: r,
  disabled: i,
  onClick: o,
  children: s,
  layout: l = "row"
}) {
  const a = n ? "var(--accent-lime)" : r ? "var(--danger)" : t ? "var(--accent)" : "var(--border)", d = n ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : r ? "color-mix(in oklch, var(--danger) 14%, transparent)" : t ? "var(--accent-soft)" : "var(--panel-2)";
  return /* @__PURE__ */ e.jsx(
    "button",
    {
      disabled: i,
      onClick: o,
      style: {
        textAlign: "left",
        padding: l === "row" ? "14px 16px" : 10,
        borderRadius: l === "row" ? 8 : 10,
        border: `1px solid ${a}`,
        background: d,
        display: "flex",
        flexDirection: l === "column" ? "column" : "row",
        alignItems: l === "row" ? "center" : void 0,
        gap: l === "row" ? 12 : 8
      },
      children: s
    }
  );
}
const Q = {
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
function Ie({
  variant: t,
  onComplete: n
}) {
  const r = t === "text" ? Q.text : t === "textImage" ? Q.textImage : Q.imageOnly, [i, o] = p(null), [s, l] = p(!1), a = r.correct === i;
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsxs(_, { children: [
      "// quiz · 1 of 5 ·",
      " ",
      t === "text" ? "text answers" : t === "textImage" ? "text + image" : "images only"
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.4 }, children: r.q }),
    t === "text" && /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: r.choices.map((d) => {
      const c = i === d.id, h = s && d.id === r.correct, u = s && c && !a;
      return /* @__PURE__ */ e.jsxs(
        N,
        {
          selected: c,
          correct: h,
          wrong: u,
          disabled: s,
          onClick: () => o(d.id),
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
                children: d.id.toUpperCase()
              }
            ),
            /* @__PURE__ */ e.jsx("span", { style: { flex: 1, fontSize: 14 }, children: d.label }),
            h && /* @__PURE__ */ e.jsx(
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
        d.id
      );
    }) }),
    t === "textImage" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: r.choices.map((d) => {
      const c = i === d.id, h = s && d.id === r.correct, u = s && c && !a;
      return /* @__PURE__ */ e.jsxs(
        N,
        {
          selected: c,
          correct: h,
          wrong: u,
          disabled: s,
          onClick: () => o(d.id),
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
                        backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${d.tint}) 30%, transparent) 0 6px, transparent 6px 14px)`
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
                            color: `var(--accent-${d.tint})`,
                            padding: "4px 8px",
                            background: "var(--panel)",
                            border: `1px solid color-mix(in oklch, var(--accent-${d.tint}) 40%, transparent)`,
                            borderRadius: 4
                          },
                          children: [
                            "OPT ",
                            d.id.toUpperCase()
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
                      children: d.id.toUpperCase()
                    }
                  ),
                  /* @__PURE__ */ e.jsx("span", { children: d.label })
                ]
              }
            )
          ]
        },
        d.id
      );
    }) }),
    t === "imageOnly" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: r.choices.map((d) => {
      const c = i === d.id, h = s && d.id === r.correct, u = s && c && !a;
      return /* @__PURE__ */ e.jsx(
        N,
        {
          selected: c,
          correct: h,
          wrong: u,
          disabled: s,
          onClick: () => o(d.id),
          layout: "column",
          children: /* @__PURE__ */ e.jsx("div", { style: { aspectRatio: "1/1" }, children: /* @__PURE__ */ e.jsx(Z, { shape: d.shape, tint: d.tint }) })
        },
        d.id
      );
    }) }),
    s && /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          padding: 12,
          borderRadius: 8,
          background: a ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)",
          border: `1px solid ${a ? "var(--accent-lime)" : "var(--danger)"}`,
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ e.jsx("strong", { children: a ? "Correct!" : "Not quite." }),
          " ",
          a ? "Nicely done." : "The correct answer is A."
        ]
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { display: "flex", gap: 8 }, children: s ? /* @__PURE__ */ e.jsx(g, { variant: "primary", style: { flex: 1 }, onClick: n, children: "Continue" }) : /* @__PURE__ */ e.jsx(
      g,
      {
        variant: "primary",
        style: { flex: 1 },
        disabled: !i,
        onClick: () => l(!0),
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
}, _e = {
  q: "Which hero style fits your brand?",
  choices: [
    { id: "a", label: "Isometric world", tint: "cyan" },
    { id: "b", label: "Orbital / cosmic", tint: "magenta" },
    { id: "c", label: "Editorial poster", tint: "lime" },
    { id: "d", label: "Pixel / arcade", tint: "amber" }
  ]
}, We = {
  q: "Pick your favorite vibe:",
  choices: [
    { id: "a", shape: "hex", tint: "cyan" },
    { id: "b", shape: "circle", tint: "magenta" },
    { id: "c", shape: "diamond", tint: "lime" },
    { id: "d", shape: "square", tint: "amber" }
  ]
};
function De({
  variant: t,
  onComplete: n,
  textMinLength: r = 20
}) {
  const [i, o] = p(null), [s, l] = p("");
  if (t === "textarea")
    return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ e.jsx(_, { children: "// survey · open question" }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.4 }, children: "What's the single biggest pain point in your growth stack right now?" }),
      /* @__PURE__ */ e.jsx(
        xe,
        {
          value: s,
          onChange: (d) => l(d.target.value),
          placeholder: `Type your answer… (minimum ${r} characters)`,
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
              s.length,
              " chars"
            ] }),
            /* @__PURE__ */ e.jsx("span", { children: s.length >= r ? "ready to submit" : `${r - s.length} more to go` })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: s.length < r, onClick: n, children: "Submit feedback" })
    ] });
  const a = t === "text" ? Ne : t === "textImage" ? _e : We;
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsx(_, { children: "// survey · your take helps shape the roadmap" }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.4 }, children: a.q }),
    t === "text" && /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: a.choices.map((d) => {
      const c = i === d.id;
      return /* @__PURE__ */ e.jsxs(N, { selected: c, onClick: () => o(d.id), layout: "row", children: [
        /* @__PURE__ */ e.jsx(
          "span",
          {
            style: {
              width: 18,
              height: 18,
              borderRadius: 99,
              border: "2px solid var(--border)",
              borderColor: c ? "var(--accent)" : "var(--border)",
              display: "grid",
              placeItems: "center",
              flexShrink: 0
            },
            children: c && /* @__PURE__ */ e.jsx(
              "span",
              {
                style: { width: 8, height: 8, borderRadius: 99, background: "var(--accent)" }
              }
            )
          }
        ),
        /* @__PURE__ */ e.jsx("span", { style: { flex: 1, fontSize: 14 }, children: d.label })
      ] }, d.id);
    }) }),
    t === "textImage" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: a.choices.map((d) => {
      const c = i === d.id;
      return /* @__PURE__ */ e.jsxs(
        N,
        {
          selected: c,
          onClick: () => o(d.id),
          layout: "column",
          children: [
            /* @__PURE__ */ e.jsx("div", { style: { aspectRatio: "16/10", borderRadius: 6, overflow: "hidden" }, children: /* @__PURE__ */ e.jsx(
              Z,
              {
                shape: ["hex", "circle", "diamond", "square"][d.id.charCodeAt(0) - 97],
                tint: d.tint
              }
            ) }),
            /* @__PURE__ */ e.jsx("div", { style: { textAlign: "left", fontSize: 13 }, children: d.label })
          ]
        },
        d.id
      );
    }) }),
    t === "imageOnly" && /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: a.choices.map((d) => {
      const c = i === d.id;
      return /* @__PURE__ */ e.jsx(
        N,
        {
          selected: c,
          onClick: () => o(d.id),
          layout: "column",
          children: /* @__PURE__ */ e.jsx("div", { style: { aspectRatio: "1/1" }, children: /* @__PURE__ */ e.jsx(Z, { shape: d.shape, tint: d.tint }) })
        },
        d.id
      );
    }) }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !i, onClick: n, children: "Submit" })
  ] });
}
function Pe({
  onComplete: t,
  word: n = "GROWQUEST",
  maxWrong: r = 6,
  category: i = "growth engine brand"
}) {
  const [o, s] = p([]), l = o.filter((c) => !n.includes(c)), a = n.split("").every((c) => o.includes(c)), d = l.length >= r;
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsxs(_, { children: [
      "// hangman · guess the word · ",
      r - l.length,
      " lives"
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 14, color: "var(--ink-dim)" }, children: [
      "Category: ",
      i
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
            l.length > 0 && /* @__PURE__ */ e.jsx("circle", { cx: "75", cy: "34", r: "9", fill: "none", stroke: "var(--danger)", strokeWidth: "2.5" }),
            l.length > 1 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "43", x2: "75", y2: "75", stroke: "var(--danger)", strokeWidth: "2.5" }),
            l.length > 2 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "55", x2: "62", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
            l.length > 3 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "55", x2: "88", y2: "65", stroke: "var(--danger)", strokeWidth: "2.5" }),
            l.length > 4 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "75", x2: "65", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" }),
            l.length > 5 && /* @__PURE__ */ e.jsx("line", { x1: "75", y1: "75", x2: "85", y2: "95", stroke: "var(--danger)", strokeWidth: "2.5" })
          ] }),
          /* @__PURE__ */ e.jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: n.split("").map((c, h) => /* @__PURE__ */ e.jsx(
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
                color: o.includes(c) ? "var(--accent)" : "transparent"
              },
              children: c
            },
            h
          )) })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "hangman-keys",
        style: { display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 4 },
        children: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => {
          const h = o.includes(c), u = h && !n.includes(c), v = h && n.includes(c);
          return /* @__PURE__ */ e.jsx(
            "button",
            {
              disabled: h || a || d,
              onClick: () => s([...o, c]),
              style: {
                padding: "8px 0",
                borderRadius: 5,
                border: "1px solid var(--border)",
                background: v ? "var(--accent-soft)" : u ? "color-mix(in oklch, var(--danger) 18%, transparent)" : "var(--panel-2)",
                color: v ? "var(--accent)" : u ? "var(--danger)" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                opacity: h ? 0.7 : 1
              },
              children: c
            },
            c
          );
        })
      }
    ),
    (a || d) && /* @__PURE__ */ e.jsx(
      "div",
      {
        style: {
          padding: 12,
          borderRadius: 8,
          background: a ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : "color-mix(in oklch, var(--danger) 14%, transparent)",
          border: `1px solid ${a ? "var(--accent-lime)" : "var(--danger)"}`,
          fontSize: 13
        },
        children: a ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Solved!" }),
          " You cracked ",
          n,
          "."
        ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx("strong", { children: "Game over." }),
          " The word was ",
          /* @__PURE__ */ e.jsx("strong", { children: n }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !a && !d, onClick: t, children: "Continue" })
  ] });
}
const Oe = [
  { q: "How many tiers are in GrowQuest?", choices: ["2", "3", "4", "5"], correct: 2 },
  {
    q: "What currency powers redemptions?",
    choices: ["USD", "XP", "Tokens", "Credits"],
    correct: 1
  },
  { q: "Streak bonus milestone lands at day…", choices: ["3", "5", "7", "10"], correct: 2 }
];
function Be({
  onComplete: t,
  questions: n = Oe,
  timeLimit: r = 15,
  passScore: i = 2
}) {
  const [o, s] = p(0), [l, a] = p(null), [d, c] = p(0), [h, u] = p(r), [v, b] = p("answering");
  M(() => {
    if (v !== "answering") return;
    if (h <= 0) {
      b("reveal");
      return;
    }
    const S = setTimeout(() => u(h - 1), 1e3);
    return () => clearTimeout(S);
  }, [h, v]), M(() => {
    u(r), a(null), b("answering");
  }, [o, r]);
  const w = n[o], A = l === w.correct;
  function T(S) {
    v === "answering" && (a(S), b("reveal"), S === w.correct && c((k) => k + 1));
  }
  function W() {
    o === n.length - 1 ? b("done") : s(o + 1);
  }
  if (v === "done") {
    const S = Math.round(d / n.length * 100), k = d >= i;
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
            stroke: k ? "var(--accent-lime)" : "var(--danger)",
            strokeWidth: "10",
            strokeDasharray: 2 * Math.PI * 50,
            strokeDashoffset: 2 * Math.PI * 50 * (1 - S / 100),
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
              d,
              "/",
              n.length
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
          children: k ? "Nice run!" : "Keep training."
        }
      ),
      /* @__PURE__ */ e.jsx("p", { style: { color: "var(--ink-dim)", fontSize: 13, marginBottom: 16 }, children: k ? "You beat the bar — XP unlocked." : `Needed ${i}/${n.length} to pass. Try again tomorrow for another shot.` }),
      /* @__PURE__ */ e.jsx(g, { variant: "primary", style: { width: "100%" }, onClick: t, children: "Continue" })
    ] });
  }
  return /* @__PURE__ */ e.jsxs("div", { style: { padding: 24, display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ e.jsxs(_, { children: [
        "// trivia · q",
        o + 1,
        " / ",
        n.length
      ] }),
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ e.jsxs(Ce, { tone: "accent", children: [
          "SCORE ",
          d
        ] }),
        /* @__PURE__ */ e.jsxs(
          "span",
          {
            className: "mono",
            style: {
              padding: "4px 8px",
              border: `1px solid ${h < 5 ? "var(--danger)" : "var(--border)"}`,
              borderRadius: 4,
              fontSize: 12,
              color: h < 5 ? "var(--danger)" : "var(--ink)"
            },
            children: [
              "⏱ ",
              String(h).padStart(2, "0"),
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
              width: `${h / r * 100}%`,
              background: h < 5 ? "var(--danger)" : "var(--accent)",
              transition: "width 1s linear"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 18, fontWeight: 600, lineHeight: 1.4, padding: "10px 0" }, children: w.q }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }, children: w.choices.map((S, k) => {
      const R = l === k, z = v === "reveal" && k === w.correct, E = v === "reveal" && R && !A;
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          disabled: v !== "answering",
          onClick: () => T(k),
          style: {
            padding: "16px 14px",
            borderRadius: 8,
            border: `1px solid ${z ? "var(--accent-lime)" : E ? "var(--danger)" : R ? "var(--accent)" : "var(--border)"}`,
            background: z ? "color-mix(in oklch, var(--accent-lime) 14%, transparent)" : E ? "color-mix(in oklch, var(--danger) 14%, transparent)" : "var(--panel-2)",
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
                children: String.fromCharCode(65 + k)
              }
            ),
            /* @__PURE__ */ e.jsx("span", { children: S })
          ]
        },
        k
      );
    }) }),
    v === "reveal" && /* @__PURE__ */ e.jsx(g, { variant: "primary", onClick: W, children: o === n.length - 1 ? "See results" : "Next question" })
  ] });
}
function Fe(t) {
  const n = t.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (n) return { kind: "youtube", id: n[1] };
  const r = t.match(/vimeo\.com\/(\d+)/);
  return r ? { kind: "vimeo", id: r[1] } : { kind: "native" };
}
function $e({ url: t, onComplete: n }) {
  const [r, i] = p(!1), [o, s] = p(10), l = Fe(t);
  return M(() => {
    if (l.kind === "native") return;
    const a = setInterval(() => {
      s((d) => d <= 1 ? (clearInterval(a), i(!0), 0) : d - 1);
    }, 1e3);
    return () => clearInterval(a);
  }, [l.kind]), /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", paddingBottom: "56.25%", background: "var(--panel-2)", borderRadius: 8, overflow: "hidden" }, children: [
      l.kind === "youtube" && /* @__PURE__ */ e.jsx(
        "iframe",
        {
          title: "YouTube video player",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" },
          src: `https://www.youtube.com/embed/${l.id}?autoplay=1`,
          allow: "autoplay; encrypted-media",
          allowFullScreen: !0
        }
      ),
      l.kind === "vimeo" && /* @__PURE__ */ e.jsx(
        "iframe",
        {
          title: "Vimeo video player",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" },
          src: `https://player.vimeo.com/video/${l.id}?autoplay=1`,
          allow: "autoplay; fullscreen",
          allowFullScreen: !0
        }
      ),
      l.kind === "native" && /* @__PURE__ */ e.jsx(
        "video",
        {
          style: { position: "absolute", inset: 0, width: "100%", height: "100%" },
          src: t,
          controls: !0,
          onEnded: () => i(!0),
          children: /* @__PURE__ */ e.jsx("track", { kind: "captions" })
        }
      )
    ] }),
    l.kind !== "native" && !r && /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 12, color: "var(--ink-dim)", textAlign: "center" }, children: [
      "Button available in ",
      o,
      "s"
    ] }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !r, onClick: n, style: { width: "100%" }, children: "I've watched it" })
  ] });
}
function Le({
  url: t,
  onComplete: n
}) {
  const [r, i] = p(!1), [o, s] = p(60), [l, a] = p(!1);
  M(() => {
    if (!r) return;
    const c = setInterval(() => {
      s((h) => h <= 1 ? (clearInterval(c), a(!0), 0) : h - 1);
    }, 1e3);
    return () => clearInterval(c);
  }, [r]);
  const d = r ? Math.round((60 - o) / 60 * 100) : 0;
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          padding: 16,
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Article" }),
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 15 }, children: "How XP & Levels work in GrowQuest" }),
          t && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)" }, children: t.replace(/^https?:\/\//, "") })
        ]
      }
    ),
    r ? /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-dim)" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: l ? "Reading complete!" : `Reading… ${o}s remaining` }),
        /* @__PURE__ */ e.jsxs("span", { children: [
          d,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { height: 4, background: "var(--panel-2)", borderRadius: 2, overflow: "hidden" }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            height: "100%",
            width: `${d}%`,
            background: "var(--accent)",
            transition: "width 1s linear",
            borderRadius: 2
          }
        }
      ) })
    ] }) : /* @__PURE__ */ e.jsx(
      g,
      {
        variant: "ghost",
        onClick: () => {
          t && window.open(t, "_blank"), i(!0);
        },
        style: { width: "100%" },
        children: "Open article ↗"
      }
    ),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !l, onClick: n, style: { width: "100%" }, children: "Mark as read" })
  ] });
}
function Ue({ onComplete: t }) {
  const [n, r] = p(""), [i, o] = p(""), s = [n.length > 0, i.length > 0].filter(Boolean).length;
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsx(de, { label: "Display name", children: /* @__PURE__ */ e.jsx(
      F,
      {
        placeholder: "Your name",
        value: n,
        onChange: (l) => r(l.target.value)
      }
    ) }),
    /* @__PURE__ */ e.jsx(de, { label: "Bio", children: /* @__PURE__ */ e.jsx(
      xe,
      {
        placeholder: "Tell us about yourself…",
        value: i,
        onChange: (l) => o(l.target.value)
      }
    ) }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-dim)" }, children: [
      /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            flex: 1,
            height: 4,
            background: "var(--panel-2)",
            borderRadius: 2,
            overflow: "hidden"
          },
          children: /* @__PURE__ */ e.jsx(
            "div",
            {
              style: {
                height: "100%",
                width: `${s / 2 * 100}%`,
                background: s === 2 ? "var(--accent-lime)" : "var(--accent)",
                transition: "width 0.3s ease",
                borderRadius: 2
              }
            }
          )
        }
      ),
      /* @__PURE__ */ e.jsxs("span", { style: { whiteSpace: "nowrap" }, children: [
        s,
        "/2 fields"
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: n.length === 0, onClick: t, style: { width: "100%" }, children: "Save profile" })
  ] });
}
function Ge({ onComplete: t }) {
  const [n, r] = p(null), [i, o] = p(null), s = ee(null);
  function l(a) {
    o(a.name);
    const d = new FileReader();
    d.onload = (c) => {
      var h;
      return r((h = c.target) == null ? void 0 : h.result);
    }, d.readAsDataURL(a);
  }
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsx(
      "input",
      {
        ref: s,
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: (a) => {
          var d;
          (d = a.target.files) != null && d[0] && l(a.target.files[0]);
        }
      }
    ),
    n ? /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ e.jsx(
        "img",
        {
          src: n,
          alt: "Preview",
          style: { width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }
        }
      ),
      /* @__PURE__ */ e.jsx("span", { style: { fontSize: 12, color: "var(--ink-dim)" }, children: i }),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => {
            r(null), o(null);
          },
          style: { fontSize: 12, color: "var(--ink-dim)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" },
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var a;
          return (a = s.current) == null ? void 0 : a.click();
        },
        onKeyDown: (a) => {
          var d;
          (a.key === "Enter" || a.key === " ") && ((d = s.current) == null || d.click());
        },
        onDragOver: (a) => a.preventDefault(),
        onDrop: (a) => {
          a.preventDefault(), a.dataTransfer.files[0] && l(a.dataTransfer.files[0]);
        },
        style: {
          border: "2px dashed var(--border)",
          borderRadius: 10,
          padding: "32px 16px",
          textAlign: "center",
          cursor: "pointer",
          color: "var(--ink-dim)",
          fontSize: 13,
          transition: "border-color 0.15s"
        },
        children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 28, marginBottom: 8 }, children: "📷" }),
          /* @__PURE__ */ e.jsx("div", { children: "Click or drag to upload a photo" }),
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 11, marginTop: 4 }, children: "PNG, JPG up to 5 MB" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !n, onClick: t, style: { width: "100%" }, children: "Save photo" })
  ] });
}
function Ye({
  email: t,
  onComplete: n
}) {
  const [r, i] = p(0);
  return M(() => {
    if (r <= 0) return;
    const o = setInterval(() => i((s) => Math.max(0, s - 1)), 1e3);
    return () => clearInterval(o);
  }, [r]), /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "32px 24px" }, children: [
    /* @__PURE__ */ e.jsx(
      "div",
      {
        style: {
          width: 64,
          height: 64,
          borderRadius: 14,
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          display: "grid",
          placeItems: "center",
          color: "var(--accent)"
        },
        children: /* @__PURE__ */ e.jsx(G, { type: "verify_email", size: 32 })
      }
    ),
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 16, marginBottom: 6 }, children: "Check your inbox" }),
      /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 13, color: "var(--ink-dim)", lineHeight: 1.5 }, children: [
        "We sent a verification link to",
        " ",
        t ? /* @__PURE__ */ e.jsx("strong", { style: { color: "var(--ink)" }, children: t }) : "your email address",
        ".",
        /* @__PURE__ */ e.jsx("br", {}),
        "Click the link to verify your address."
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      "button",
      {
        disabled: r > 0,
        onClick: () => i(30),
        style: {
          background: "none",
          border: "none",
          cursor: r > 0 ? "not-allowed" : "pointer",
          fontSize: 12,
          color: r > 0 ? "var(--ink-dim)" : "var(--accent)",
          textDecoration: r > 0 ? "none" : "underline"
        },
        children: r > 0 ? `Resend in ${r}s` : "Resend email"
      }
    ),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", onClick: n, style: { width: "100%" }, children: "I've verified my email" })
  ] });
}
const He = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+61", flag: "🇦🇺", name: "AU" }
];
function qe({ onComplete: t }) {
  const [n, r] = p("phone"), [i, o] = p("+1"), [s, l] = p(""), [a, d] = p("");
  return n === "otp" ? /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 15, marginBottom: 4 }, children: "Enter the 6-digit code" }),
      /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 13, color: "var(--ink-dim)" }, children: [
        "Sent to ",
        i,
        " ",
        s
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(
      F,
      {
        type: "text",
        inputMode: "numeric",
        maxLength: 6,
        placeholder: "000000",
        value: a,
        onChange: (c) => d(c.target.value.replace(/\D/g, "").slice(0, 6)),
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: 28,
          letterSpacing: "0.35em",
          textAlign: "center",
          padding: "12px 16px"
        }
      }
    ),
    /* @__PURE__ */ e.jsx(
      g,
      {
        variant: "primary",
        disabled: a.length < 6,
        onClick: t,
        style: { width: "100%" },
        children: "Verify"
      }
    ),
    /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: () => {
          r("phone"), d("");
        },
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 12,
          color: "var(--accent)",
          textDecoration: "underline",
          textAlign: "center"
        },
        children: "Change number"
      }
    )
  ] }) : /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", marginBottom: 6 }, children: "Country" }),
      /* @__PURE__ */ e.jsx(
        "select",
        {
          className: "input",
          value: i,
          onChange: (c) => o(c.target.value),
          style: { width: "100%" },
          children: He.map(({ code: c, flag: h, name: u }) => /* @__PURE__ */ e.jsxs("option", { value: c, children: [
            h,
            " ",
            u,
            " (",
            c,
            ")"
          ] }, c))
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", marginBottom: 6 }, children: "Phone number" }),
      /* @__PURE__ */ e.jsx(
        F,
        {
          type: "tel",
          placeholder: "Phone number",
          value: s,
          onChange: (c) => l(c.target.value.replace(/[^0-9]/g, ""))
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(
      g,
      {
        variant: "primary",
        disabled: s.length < 6,
        onClick: () => r("otp"),
        style: { width: "100%" },
        children: "Send OTP"
      }
    )
  ] });
}
const B = ["50 XP", "100 XP", "Miss", "200 XP", "75 XP", "Bonus!", "150 XP", "Miss"];
function Xe(t) {
  const n = (t % 360 + 360) % 360, r = Math.floor((360 - n) / (360 / B.length)) % B.length;
  return B[r];
}
function Ve({ onComplete: t }) {
  const [n, r] = p(!1), [i, o] = p(0), [s, l] = p(null);
  function a() {
    if (n) return;
    const v = 1440 + Math.floor(Math.random() * 360), b = i + v;
    r(!0), o(b), setTimeout(() => {
      l(Xe(b)), r(!1);
    }, 3100);
  }
  const d = 240, c = d / 2, h = B.length, u = 2 * Math.PI / h;
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", width: d, height: d }, children: [
      /* @__PURE__ */ e.jsx("div", { style: {
        position: "absolute",
        top: -10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "18px solid var(--accent)",
        zIndex: 10
      } }),
      /* @__PURE__ */ e.jsxs(
        "svg",
        {
          width: d,
          height: d,
          style: { transform: `rotate(${i}deg)`, transition: n ? "transform 3s cubic-bezier(.17,.67,.12,.99)" : "none" },
          children: [
            B.map((v, b) => {
              const w = b * u - Math.PI / 2, A = (b + 1) * u - Math.PI / 2, T = c + c * Math.cos(w), W = c + c * Math.sin(w), S = c + c * Math.cos(A), k = c + c * Math.sin(A), R = w + u / 2, z = c + c * 0.65 * Math.cos(R), E = c + c * 0.65 * Math.sin(R);
              return /* @__PURE__ */ e.jsxs("g", { children: [
                /* @__PURE__ */ e.jsx(
                  "path",
                  {
                    d: `M${c},${c} L${T},${W} A${c},${c} 0 0,1 ${S},${k} Z`,
                    fill: b % 2 === 0 ? "var(--panel)" : "var(--panel-2)",
                    stroke: "var(--border)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ e.jsx(
                  "text",
                  {
                    x: z,
                    y: E,
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    transform: `rotate(${R * 180 / Math.PI + 90}, ${z}, ${E})`,
                    style: { fontSize: 9, fill: "var(--ink)", fontFamily: "var(--font-mono)", fontWeight: 700 },
                    children: v
                  }
                )
              ] }, b);
            }),
            /* @__PURE__ */ e.jsx("circle", { cx: c, cy: c, r: 18, fill: "var(--panel)", stroke: "var(--border)", strokeWidth: "2" }),
            /* @__PURE__ */ e.jsx("circle", { cx: c, cy: c, r: 6, fill: "var(--accent)" })
          ]
        }
      )
    ] }),
    s && /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 13, color: "var(--ink-dim)" }, children: "You got" }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 22, fontWeight: 700, color: "var(--accent)" }, children: s })
    ] }),
    s ? /* @__PURE__ */ e.jsx(g, { variant: "primary", onClick: t, style: { width: "100%" }, children: "Claim reward" }) : /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: n, onClick: a, style: { width: "100%" }, children: n ? "Spinning…" : "Spin the wheel" })
  ] });
}
const L = 16;
function Je({
  reward: t = "200 XP",
  onComplete: n
}) {
  const [r, i] = p(/* @__PURE__ */ new Set()), [o, s] = p(!1);
  function l(c) {
    o || i((h) => {
      const u = new Set(h);
      return u.add(c), u.size / L * 100 >= 75 && !o && (s(!0), setTimeout(n, 1500)), u;
    });
  }
  function a() {
    const c = new Set(Array.from({ length: L }, (h, u) => u));
    i(c), s(!0), setTimeout(n, 1500);
  }
  const d = Math.round(r.size / L * 100);
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { position: "relative", width: 280 }, children: [
      /* @__PURE__ */ e.jsx("div", { style: {
        height: 140,
        display: "grid",
        placeItems: "center",
        background: "var(--panel-2)",
        border: "1px solid var(--border)",
        borderRadius: 10
      }, children: /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center" }, children: [
        /* @__PURE__ */ e.jsx("div", { style: { fontSize: 11, color: "var(--ink-dim)", marginBottom: 4, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em" }, children: "You won" }),
        /* @__PURE__ */ e.jsx("div", { style: { fontSize: 32, fontWeight: 800, color: "var(--accent)" }, children: t })
      ] }) }),
      /* @__PURE__ */ e.jsx("div", { style: {
        position: "absolute",
        inset: 0,
        borderRadius: 10,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        padding: 2,
        pointerEvents: o ? "none" : "auto"
      }, children: Array.from({ length: L }, (c, h) => /* @__PURE__ */ e.jsx(
        "div",
        {
          role: "button",
          tabIndex: 0,
          "aria-label": `Scratch tile ${h + 1}`,
          onClick: () => l(h),
          onKeyDown: (u) => {
            (u.key === "Enter" || u.key === " ") && l(h);
          },
          onMouseEnter: (u) => {
            u.buttons === 1 && l(h);
          },
          style: {
            background: r.has(h) ? "transparent" : "var(--panel)",
            border: r.has(h) ? "none" : "1px solid var(--border)",
            borderRadius: 6,
            cursor: "pointer",
            transition: "background 0.15s",
            minHeight: 32
          }
        },
        h
      )) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: o ? "var(--accent)" : "var(--ink-dim)", textAlign: "center" }, children: o ? `🎉 You revealed: ${t}` : `Scratch to reveal… ${d}% uncovered` }),
    !o && /* @__PURE__ */ e.jsx(
      "button",
      {
        onClick: a,
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 11,
          color: "var(--ink-dim)",
          textDecoration: "underline"
        },
        children: "Reveal all"
      }
    )
  ] });
}
const Qe = [
  { id: "b1", name: "First Quest", got: !0, desc: "Completed your first mission." },
  { id: "b2", name: "Streak ×7", got: !0, desc: "7-day streak maintained." },
  { id: "b3", name: "Evangelist", got: !1, desc: "Refer 10 teammates." },
  { id: "b4", name: "Lorekeeper", got: !1, desc: "Complete all weekly quizzes." }
];
function Ke({
  badges: t = Qe,
  goal: n = 3,
  earned: r,
  onComplete: i
}) {
  const o = r ?? t.filter((l) => l.got).length, s = o >= n;
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-dim)" }, children: [
        /* @__PURE__ */ e.jsx("span", { children: "Badges collected" }),
        /* @__PURE__ */ e.jsxs("span", { style: { color: s ? "var(--accent-lime)" : "var(--ink)" }, children: [
          o,
          "/",
          n
        ] })
      ] }),
      /* @__PURE__ */ e.jsx("div", { style: { height: 6, background: "var(--panel-2)", borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ e.jsx(
        "div",
        {
          style: {
            height: "100%",
            width: `${Math.min(100, o / n * 100)}%`,
            background: s ? "var(--accent-lime)" : "var(--accent)",
            transition: "width 0.4s ease",
            borderRadius: 3
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: t.map((l) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          padding: 12,
          background: "var(--panel-2)",
          border: `1px ${l.got ? "solid" : "dashed"} ${l.got ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 8,
          opacity: l.got ? 1 : 0.45,
          display: "flex",
          flexDirection: "column",
          gap: 4
        },
        children: [
          /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ e.jsx("span", { style: { fontSize: 18 }, children: "🏅" }),
            l.got && /* @__PURE__ */ e.jsx("span", { style: {
              fontSize: 10,
              background: "var(--accent)",
              color: "#05060A",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 700
            }, children: "✓" })
          ] }),
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, fontWeight: 600 }, children: l.name })
        ]
      },
      l.id
    )) }),
    !s && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", textAlign: "center" }, children: "Keep completing missions to earn more badges" }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !s, onClick: i, style: { width: "100%" }, children: s ? "Claim XP" : `Earn ${n - o} more badge${n - o !== 1 ? "s" : ""}` })
  ] });
}
function Ze({
  referralLink: t = "https://app.growquest.io/ref/demo-abc123",
  onComplete: n
}) {
  const [r, i] = p(!1), [o, s] = p(!1), l = r || o;
  function a() {
    navigator.clipboard.writeText(t).then(() => {
      i(!0), setTimeout(() => i(!1), 2e3), s(!0);
    });
  }
  function d(c) {
    const h = encodeURIComponent, u = {
      x: `https://x.com/intent/tweet?text=${h("Join me on GrowQuest! " + t)}`,
      whatsapp: `https://wa.me/?text=${h("Join me on GrowQuest! " + t)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${h(t)}`
    };
    window.open(u[c], "_blank"), s(!0);
  }
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 11, color: "var(--ink-dim)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }, children: "Your referral link" }),
      /* @__PURE__ */ e.jsxs("div", { style: {
        display: "flex",
        gap: 8,
        padding: "10px 12px",
        background: "var(--panel-2)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ e.jsx("span", { style: {
          flex: 1,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--ink-dim)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, children: t }),
        /* @__PURE__ */ e.jsx(
          "button",
          {
            onClick: a,
            style: {
              padding: "4px 10px",
              borderRadius: 5,
              border: "1px solid var(--border)",
              background: r ? "var(--accent)" : "var(--panel)",
              color: r ? "#05060A" : "var(--ink)",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s"
            },
            children: r ? "Copied ✓" : "Copy"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 11, color: "var(--ink-dim)", marginBottom: 8 }, children: "Share via" }),
      /* @__PURE__ */ e.jsx("div", { style: { display: "flex", gap: 8 }, children: [
        { id: "x", label: "𝕏" },
        { id: "whatsapp", label: "💬" },
        { id: "linkedin", label: "in" }
      ].map(({ id: c, label: h }) => /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => d(c),
          style: {
            padding: "8px 14px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "var(--panel-2)",
            color: "var(--ink)",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer"
          },
          children: h
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)" }, children: "0 friends signed up · goal: 1" }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !l, onClick: n, style: { width: "100%" }, children: "Done" })
  ] });
}
function et({
  shareText: t = "Check out GrowQuest — earn XP for real actions!",
  shareUrl: n = "https://growquest.io",
  onComplete: r
}) {
  const [i, o] = p(!1);
  function s(d) {
    const c = encodeURIComponent, h = {
      x: `https://x.com/intent/tweet?text=${c(t)}&url=${c(n)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${c(n)}`,
      whatsapp: `https://wa.me/?text=${c(t + " " + n)}`
    };
    window.open(h[d], "_blank"), o(!0);
  }
  function l() {
    navigator.clipboard.writeText(n), o(!0);
  }
  const a = [
    { id: "x", label: "𝕏 X / Twitter" },
    { id: "facebook", label: "Facebook" },
    { id: "whatsapp", label: "WhatsApp" }
  ];
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: {
      padding: 14,
      background: "var(--panel-2)",
      border: "1px solid var(--border)",
      borderRadius: 10
    }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 13, marginBottom: 4 }, children: t }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 11, color: "var(--ink-dim)", fontFamily: "var(--font-mono)" }, children: n })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)" }, children: "Share via" }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      a.map(({ id: d, label: c }) => /* @__PURE__ */ e.jsxs(
        "button",
        {
          onClick: () => s(d),
          style: {
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--panel-2)",
            color: "var(--ink)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left"
          },
          children: [
            c,
            " ↗"
          ]
        },
        d
      )),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: l,
          style: {
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--panel-2)",
            color: "var(--ink)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left"
          },
          children: "📋 Copy link"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: !i, onClick: r, style: { width: "100%" }, children: "Done" })
  ] });
}
function tt({ onComplete: t }) {
  const [n, r] = p(""), [i, o] = p([]);
  function s() {
    n.includes("@") && (o((l) => [...l, n]), r(""));
  }
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ e.jsx(
        F,
        {
          type: "email",
          placeholder: "friend@example.com",
          value: n,
          onChange: (l) => r(l.target.value),
          onKeyDown: (l) => {
            l.key === "Enter" && s();
          },
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: s,
          disabled: !n.includes("@"),
          style: {
            padding: "0 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: n.includes("@") ? "var(--accent)" : "var(--panel-2)",
            color: n.includes("@") ? "#05060A" : "var(--ink-dim)",
            fontSize: 12,
            fontWeight: 700,
            cursor: n.includes("@") ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
            transition: "all 0.15s"
          },
          children: "Send"
        }
      )
    ] }),
    i.length === 0 ? /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", textAlign: "center", padding: "12px 0" }, children: "No invites sent yet" }) : /* @__PURE__ */ e.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: i.map((l, a) => /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          background: "var(--panel-2)",
          borderRadius: 6,
          fontSize: 12
        },
        children: [
          /* @__PURE__ */ e.jsx("span", { style: {
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "var(--accent-lime, #84cc16)",
            display: "grid",
            placeItems: "center",
            fontSize: 9,
            fontWeight: 700,
            color: "#05060A"
          }, children: "✓" }),
          /* @__PURE__ */ e.jsx("span", { style: { color: "var(--ink)", flex: 1 }, children: l })
        ]
      },
      a
    )) }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", disabled: i.length === 0, onClick: t, style: { width: "100%" }, children: i.length === 0 ? "Send at least 1 invite" : `Done · ${i.length} invite${i.length !== 1 ? "s" : ""} sent` })
  ] });
}
function nt({ onComplete: t }) {
  const [n, r] = p(null), [i, o] = p(null), [s, l] = p(!1), a = ee(null);
  function d(c) {
    o(c.name);
    const h = new FileReader();
    h.onload = (u) => {
      var v;
      return r((v = u.target) == null ? void 0 : v.result);
    }, h.readAsDataURL(c);
  }
  return s ? /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "32px 24px" }, children: [
    /* @__PURE__ */ e.jsx("div", { style: { fontSize: 48 }, children: "⏳" }),
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 15, marginBottom: 6 }, children: "Photo submitted — pending review" }),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 13, color: "var(--ink-dim)", lineHeight: 1.5 }, children: "Our team will review your photo and approve it within 24h. You'll be notified when XP is credited." })
    ] }),
    /* @__PURE__ */ e.jsx(g, { variant: "primary", onClick: t, style: { width: "100%" }, children: "Got it" })
  ] }) : /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
    /* @__PURE__ */ e.jsx(
      "input",
      {
        ref: a,
        type: "file",
        accept: "image/*",
        capture: "environment",
        style: { display: "none" },
        onChange: (c) => {
          var h;
          (h = c.target.files) != null && h[0] && d(c.target.files[0]);
        }
      }
    ),
    n ? /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
      /* @__PURE__ */ e.jsx(
        "img",
        {
          src: n,
          alt: "Proof",
          style: { width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }
        }
      ),
      /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)" }, children: i }),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          onClick: () => {
            r(null), o(null);
          },
          style: { background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "var(--ink-dim)", textDecoration: "underline", textAlign: "left" },
          children: "Change photo"
        }
      )
    ] }) : /* @__PURE__ */ e.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => {
          var c;
          return (c = a.current) == null ? void 0 : c.click();
        },
        onKeyDown: (c) => {
          var h;
          (c.key === "Enter" || c.key === " ") && ((h = a.current) == null || h.click());
        },
        onDragOver: (c) => c.preventDefault(),
        onDrop: (c) => {
          c.preventDefault(), c.dataTransfer.files[0] && d(c.dataTransfer.files[0]);
        },
        style: {
          border: "2px dashed var(--border)",
          borderRadius: 10,
          padding: "36px 16px",
          textAlign: "center",
          cursor: "pointer",
          color: "var(--ink-dim)",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 32, marginBottom: 8 }, children: "📸" }),
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 500, marginBottom: 4 }, children: "Upload photo proof" }),
          /* @__PURE__ */ e.jsx("div", { style: { fontSize: 11 }, children: "Click to snap or choose a file · JPG, PNG" })
        ]
      }
    ),
    /* @__PURE__ */ e.jsx(
      g,
      {
        variant: "primary",
        disabled: !n,
        onClick: () => l(!0),
        style: { width: "100%" },
        children: "Submit for review"
      }
    )
  ] });
}
function rt({ platform: t }) {
  const n = t;
  return n === "Instagram" ? /* @__PURE__ */ e.jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", children: [
    /* @__PURE__ */ e.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "4", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ e.jsx("circle", { cx: "17.5", cy: "6.5", r: "1.2", fill: "currentColor" })
  ] }) : n === "Twitter" ? /* @__PURE__ */ e.jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ e.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }) : n === "YouTube" ? /* @__PURE__ */ e.jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", children: [
    /* @__PURE__ */ e.jsx("rect", { x: "2", y: "5", width: "20", height: "14", rx: "3" }),
    /* @__PURE__ */ e.jsx("polygon", { points: "10,9 16,12 10,15", fill: "currentColor", stroke: "none" })
  ] }) : n === "Telegram" ? /* @__PURE__ */ e.jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", children: /* @__PURE__ */ e.jsx("path", { d: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z", strokeLinejoin: "round" }) }) : /* @__PURE__ */ e.jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", children: [
    /* @__PURE__ */ e.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ e.jsx("path", { d: "M8 12h8M12 8v8" })
  ] });
}
function it({
  platform: t = "Instagram",
  handle: n = "@growquest",
  url: r = "https://instagram.com/growquest",
  onComplete: i
}) {
  const [o, s] = p(!1);
  return /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "32px 24px" }, children: [
    /* @__PURE__ */ e.jsx("div", { style: {
      width: 72,
      height: 72,
      borderRadius: 18,
      background: "var(--panel-2)",
      border: "1px solid var(--border)",
      display: "grid",
      placeItems: "center",
      color: "var(--accent)"
    }, children: /* @__PURE__ */ e.jsx(rt, { platform: t }) }),
    /* @__PURE__ */ e.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", marginBottom: 4 }, children: n }),
      /* @__PURE__ */ e.jsxs("div", { style: { fontSize: 13, color: "var(--ink-dim)" }, children: [
        "Follow us on ",
        t,
        " to earn XP"
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, width: "100%" }, children: [
      /* @__PURE__ */ e.jsxs(
        g,
        {
          variant: "primary",
          onClick: () => {
            window.open(r, "_blank"), s(!0);
          },
          style: { width: "100%" },
          children: [
            "Open ",
            t,
            " ↗"
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          variant: o ? "primary" : "ghost",
          disabled: !o,
          onClick: i,
          style: { width: "100%" },
          children: "I've followed"
        }
      )
    ] })
  ] });
}
const st = 'a,button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
function ot(t, n) {
  M(() => {
    if (!n || !t.current) return;
    const r = t.current, i = Array.from(r.querySelectorAll(st)), o = i[0], s = i[i.length - 1];
    o == null || o.focus();
    const l = (a) => {
      a.key === "Tab" && (a.shiftKey ? document.activeElement === o && (a.preventDefault(), s == null || s.focus()) : document.activeElement === s && (a.preventDefault(), o == null || o.focus()));
    };
    return r.addEventListener("keydown", l), () => r.removeEventListener("keydown", l);
  }, [n, t]);
}
function vt({ m: t, onClose: n, onClaim: r }) {
  const i = je(
    () => () => {
    },
    () => !0,
    () => !1
  ), o = ee(null);
  if (ot(o, t !== null), !t || !i) return null;
  const s = () => {
    r(t), n();
  };
  let l = null;
  if (t.type === "quiz") {
    const a = t.subtype === "quiz-textImage" ? "textImage" : t.subtype === "quiz-imageOnly" ? "imageOnly" : "text";
    l = /* @__PURE__ */ e.jsx(Ie, { variant: a, onComplete: s });
  } else if (t.type === "survey") {
    const a = t.subtype === "survey-textImage" ? "textImage" : t.subtype === "survey-imageOnly" ? "imageOnly" : t.subtype === "survey-textarea" ? "textarea" : "text";
    l = /* @__PURE__ */ e.jsx(De, { variant: a, onComplete: s });
  } else t.type === "hangman" ? l = /* @__PURE__ */ e.jsx(Pe, { onComplete: s }) : t.type === "trivia" ? l = /* @__PURE__ */ e.jsx(Be, { onComplete: s }) : t.type === "video" ? l = /* @__PURE__ */ e.jsx($e, { url: t.url ?? "", onComplete: s }) : t.type === "read_article" ? l = /* @__PURE__ */ e.jsx(Le, { url: t.url, onComplete: s }) : t.type === "profile" ? l = /* @__PURE__ */ e.jsx(Ue, { onComplete: s }) : t.type === "avatar" ? l = /* @__PURE__ */ e.jsx(Ge, { onComplete: s }) : t.type === "verify_email" ? l = /* @__PURE__ */ e.jsx(Ye, { onComplete: s }) : t.type === "verify_phone" ? l = /* @__PURE__ */ e.jsx(qe, { onComplete: s }) : t.type === "spin_wheel" ? l = /* @__PURE__ */ e.jsx(Ve, { onComplete: s }) : t.type === "scratch_card" ? l = /* @__PURE__ */ e.jsx(Je, { onComplete: s }) : t.type === "badge_collect" ? l = /* @__PURE__ */ e.jsx(Ke, { onComplete: s }) : t.type === "refer" ? l = /* @__PURE__ */ e.jsx(Ze, { onComplete: s }) : t.type === "share" ? l = /* @__PURE__ */ e.jsx(et, { shareUrl: t.url, onComplete: s }) : t.type === "invite" ? l = /* @__PURE__ */ e.jsx(tt, { onComplete: s }) : t.type === "photo_proof" ? l = /* @__PURE__ */ e.jsx(nt, { onComplete: s }) : (t.type === "follow_social" || t.type === "social") && (l = /* @__PURE__ */ e.jsx(it, { url: t.url, onComplete: s }));
  return be(
    /* @__PURE__ */ e.jsx(
      "div",
      {
        className: "modal-backdrop",
        role: "presentation",
        onClick: (a) => a.target === a.currentTarget && n(),
        onKeyDown: (a) => a.key === "Escape" && n(),
        children: /* @__PURE__ */ e.jsxs(
          "div",
          {
            ref: o,
            className: "modal",
            role: "dialog",
            "aria-modal": "true",
            style: { maxWidth: 560 },
            children: [
              /* @__PURE__ */ e.jsxs(
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
                      /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 6 }, children: [
                        /* @__PURE__ */ e.jsx(O, { amount: t.xp }),
                        t.limited && t.endsAt && /* @__PURE__ */ e.jsxs(C, { tone: "magenta", children: [
                          "Ends in ",
                          /* @__PURE__ */ e.jsx(he, { endsAt: t.endsAt })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ e.jsx(
                      "button",
                      {
                        onClick: n,
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
              ),
              l ?? /* @__PURE__ */ e.jsx("div", { style: { padding: 24, color: "var(--ink-dim)", fontSize: 13, textAlign: "center" }, children: "Experience coming soon" })
            ]
          }
        )
      }
    ),
    document.body
  );
}
function U(t) {
  return `var(--accent-${t === "accent" ? "cyan" : t})`;
}
const mt = Y(function({
  m: n,
  density: r = "comfortable",
  layout: i = "split",
  onOpen: o
}) {
  const [s, l] = n.progress, a = l > 0 ? s / l : 0, d = r === "compact", c = d ? 14 : 18;
  return i === "stack" ? /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: () => o(n),
      className: "mission-tile",
      style: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: c,
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
              style: { width: 32, height: 32, borderRadius: 6, color: U(n.tone) },
              children: /* @__PURE__ */ e.jsx(G, { type: n.type, size: 18 })
            }
          ),
          n.limited && /* @__PURE__ */ e.jsxs(C, { tone: "magenta", children: [
            "LIMITED",
            n.endsAt ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
              " ",
              "· ",
              /* @__PURE__ */ e.jsx(he, { endsAt: n.endsAt })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: d ? 13 : 15, marginBottom: 4 }, children: n.title }),
          !d && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", lineHeight: 1.5 }, children: n.desc })
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
              /* @__PURE__ */ e.jsx(O, { amount: n.xp }),
              /* @__PURE__ */ e.jsxs("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-dim)" }, children: [
                s,
                "/",
                l
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx("div", { className: "xpbar", style: { height: 4 }, children: /* @__PURE__ */ e.jsx("div", { className: "fill", style: { width: `${a * 100}%` } }) })
      ]
    }
  ) : i === "list" ? /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: () => o(n),
      className: "mission-tile",
      style: {
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: c,
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
              color: U(n.tone),
              flexShrink: 0
            },
            children: /* @__PURE__ */ e.jsx(G, { type: n.type, size: 20 })
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: 14, marginBottom: 2 }, children: n.title }),
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
              children: n.desc
            }
          )
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }, children: [
          n.limited && /* @__PURE__ */ e.jsx(C, { tone: "magenta", children: "LIMITED" }),
          /* @__PURE__ */ e.jsxs("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-dim)" }, children: [
            s,
            "/",
            l
          ] }),
          /* @__PURE__ */ e.jsx(O, { amount: n.xp })
        ] })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "button",
    {
      onClick: () => o(n),
      className: "mission-tile",
      style: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        padding: c,
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
              background: `radial-gradient(circle at 100% 0, var(--accent-${n.tone === "accent" ? "cyan" : n.tone}) 0%, transparent 70%)`,
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
              marginBottom: d ? 10 : 14,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ e.jsx(
                "div",
                {
                  className: "icon-box",
                  style: { width: 34, height: 34, borderRadius: 7, color: U(n.tone) },
                  children: /* @__PURE__ */ e.jsx(G, { type: n.type, size: 18 })
                }
              ),
              n.limited && /* @__PURE__ */ e.jsx(C, { tone: "magenta", children: "⏱ LIMITED" })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: d ? 14 : 16, marginBottom: 4 }, children: n.title }),
        !d && /* @__PURE__ */ e.jsx("div", { style: { fontSize: 12, color: "var(--ink-dim)", lineHeight: 1.5, marginBottom: 14 }, children: n.desc }),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              marginTop: d ? 8 : "auto"
            },
            children: [
              /* @__PURE__ */ e.jsx(O, { amount: n.xp }),
              /* @__PURE__ */ e.jsxs(
                "span",
                {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    background: U(n.tone),
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
}), lt = {
  1: "var(--accent-amber)",
  2: "var(--accent-cyan)",
  3: "var(--accent-magenta)"
}, at = { 1: 180, 2: 150, 3: 130 };
function yt({ entries: t, rankColors: n, platformHeights: r }) {
  const i = n ?? lt, o = r ?? at, s = t.slice(0, 3), l = [s[1], s[0], s[2]].filter(Boolean);
  return /* @__PURE__ */ e.jsx(
    "div",
    {
      style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 },
      children: l.map((a) => {
        const d = i[a.rank] ?? "var(--accent)", c = o[a.rank] ?? 120;
        return /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
            children: [
              /* @__PURE__ */ e.jsxs("div", { style: { position: "relative" }, children: [
                /* @__PURE__ */ e.jsx(te, { seed: a.seed, size: 56 }),
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
                      background: d,
                      color: "#05060A",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      border: "2px solid var(--bg)"
                    },
                    children: a.rank
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
                  children: a.handle
                }
              ),
              /* @__PURE__ */ e.jsxs("div", { className: "mono", style: { fontSize: 12, color: "var(--ink-dim)" }, children: [
                a.xp.toLocaleString(),
                " XP"
              ] }),
              /* @__PURE__ */ e.jsxs(
                "div",
                {
                  style: {
                    width: "100%",
                    height: c,
                    background: `linear-gradient(180deg, ${d} 0%, transparent 100%)`,
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
                        children: String(a.rank).padStart(2, "0")
                      }
                    )
                  ]
                }
              )
            ]
          },
          a.rank
        );
      })
    }
  );
}
function jt({
  persona: t,
  xpStyle: n,
  xpMax: r = 12e3,
  label: i = "Progress to Ascendant",
  walletAddress: o = "0xE63F6A · 356C10AC"
}) {
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: "panel",
      style: { padding: 18, display: "flex", flexDirection: "column", gap: 14 },
      children: [
        /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ e.jsx(te, { seed: 7, size: 44 }),
          /* @__PURE__ */ e.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
              /* @__PURE__ */ e.jsxs("span", { style: { fontWeight: 700 }, children: [
                "@",
                t.handle
              ] }),
              /* @__PURE__ */ e.jsx(C, { tone: "accent", children: t.tier })
            ] }),
            /* @__PURE__ */ e.jsx("div", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)" }, children: o })
          ] })
        ] }),
        /* @__PURE__ */ e.jsx(Re, { value: t.xp, max: r, style: n, label: i }),
        /* @__PURE__ */ e.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }, children: [
          { k: "Missions", v: `${t.missionsDone}/12` },
          { k: "XP", v: t.xp.toLocaleString() },
          { k: "Streak", v: `${t.streak}d` }
        ].map((s) => /* @__PURE__ */ e.jsxs("div", { className: "stat-cell", children: [
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
              children: s.k
            }
          ),
          /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 700, fontSize: 14, marginTop: 2 }, children: s.v })
        ] }, s.k)) })
      ]
    }
  );
}
const bt = Y(function({
  r: n,
  persona: r,
  onRedeem: i,
  compact: o = !1
}) {
  const s = r.xp >= n.cost, l = n.tone === "accent" ? "cyan" : n.tone;
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
          n.imageUrl ? /* @__PURE__ */ e.jsx(
            "img",
            {
              src: n.imageUrl,
              alt: n.title,
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
                  backgroundImage: `repeating-linear-gradient(135deg, color-mix(in oklch, var(--accent-${l}) 20%, transparent) 0 8px, transparent 8px 18px)`
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
                  background: `var(--accent-${l})`,
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
                children: n.kind.slice(0, 4)
              }
            ) })
          ] }),
          n.limited && /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", top: 10, left: 10 }, children: /* @__PURE__ */ e.jsx(C, { tone: "magenta", children: "LIMITED" }) }),
          /* @__PURE__ */ e.jsx("div", { style: { position: "absolute", top: 10, right: 10 }, children: /* @__PURE__ */ e.jsx(C, { children: n.stock }) })
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
            /* @__PURE__ */ e.jsx("div", { style: { fontWeight: 600, fontSize: o ? 13 : 14 }, children: n.title }),
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
                children: n.kind
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
                /* @__PURE__ */ e.jsx(O, { amount: n.cost.toLocaleString() }),
                /* @__PURE__ */ e.jsx(g, { variant: "primary", size: "sm", disabled: !s, onClick: () => i(n), children: s ? "Redeem" : "Locked" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
function kt({ label: t, value: n, trend: r, trendColor: i }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "stat-card", children: [
    /* @__PURE__ */ e.jsx("div", { className: "mono-label", style: { marginBottom: 6 }, children: t }),
    /* @__PURE__ */ e.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ e.jsx("span", { style: { fontWeight: 700, fontSize: 22 }, children: n }),
      /* @__PURE__ */ e.jsx(ze, { values: r, color: i })
    ] })
  ] });
}
function wt({ tiers: t, currentXP: n }) {
  const r = [...t].reverse().find((i) => n >= i.min) ?? t[0];
  return /* @__PURE__ */ e.jsxs("div", { className: "panel", style: { padding: 20 }, children: [
    /* @__PURE__ */ e.jsx("div", { className: "mono-label", style: { marginBottom: 14 }, children: "// tier ladder" }),
    /* @__PURE__ */ e.jsx(
      "div",
      {
        style: { display: "grid", gridTemplateColumns: `repeat(${t.length}, 1fr)`, gap: 10 },
        children: t.map((i, o) => {
          const s = r.name === i.name, l = n >= i.min;
          return /* @__PURE__ */ e.jsxs(
            "div",
            {
              style: {
                padding: 14,
                borderRadius: 10,
                border: s ? `1px solid ${i.color}` : "1px solid var(--border)",
                background: s ? `color-mix(in oklch, ${i.color} 12%, transparent)` : "var(--panel-2)",
                opacity: l || s ? 1 : 0.5
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
                      color: s ? i.color : "var(--ink)"
                    },
                    children: i.name
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
                      i.min.toLocaleString(),
                      "+ XP"
                    ]
                  }
                )
              ]
            },
            i.name
          );
        })
      }
    )
  ] });
}
export {
  Ge as AvatarUploadExperience,
  Ke as BadgeCollectExperience,
  pt as BadgeGrid,
  xt as BrandLockup,
  g as Button,
  Ce as Chip,
  he as Countdown,
  ht as Divider,
  Ye as EmailVerificationExperience,
  _ as Eyebrow,
  de as Field,
  ft as FilterTabs,
  it as FollowSocialExperience,
  Pe as HangmanExperience,
  ut as HeroBanner,
  F as Input,
  tt as InviteExperience,
  gt as LeaderboardTable,
  Te as Logo,
  vt as MissionModal,
  mt as MissionTile,
  qe as PhoneVerificationExperience,
  nt as PhotoProofExperience,
  yt as Podium,
  Ue as ProfileCompletionExperience,
  jt as ProfileSnapshot,
  Ie as QuizExperience,
  Le as ReadArticleExperience,
  Ze as ReferralExperience,
  bt as RewardCard,
  Je as ScratchCardExperience,
  et as ShareExperience,
  ze as Sparkline,
  Ve as SpinWheelExperience,
  kt as StatCard,
  De as SurveyExperience,
  C as Tag,
  xe as Textarea,
  wt as TierLadder,
  Be as TriviaExperience,
  $e as VideoExperience,
  Re as XPBar,
  O as XPPill
};
