var De = (e) => {
  throw TypeError(e);
};
var Ne = (e, t, n) => t.has(e) || De("Cannot " + n);
var l = (e, t, n) => (Ne(e, t, "read from private field"), n ? n.call(e) : t.get(e)), S = (e, t, n) => t.has(e) ? De("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), y = (e, t, n, r) => (Ne(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var je = (e, t, n, r) => ({
  set _(s) {
    y(e, t, s, n);
  },
  get _() {
    return l(e, t, r);
  }
});
import { u as lt, D as ue, P as dt, a as ut, p as Ze, c as pt, j as g, f as ft, n as Pe, s as ye, b as gt } from "./index-CcqYLS6w.js";
import ve, { useCallback as M, useState as P, useEffect as pe, useMemo as xe, useRef as ee } from "react";
function ht(e) {
  return typeof e == "function";
}
function Re(e, ...t) {
  return ht(e) ? e(...t) : e;
}
var W, D, C, se, $, K, I, J, ie, be, U, Q, V, oe, Y, me;
class bt {
  constructor({
    pluginId: t,
    debug: n = !1,
    enabled: r = !0,
    reconnectEveryMs: s = 300
  }) {
    S(this, W, !0);
    S(this, D);
    S(this, C);
    S(this, se);
    S(this, $);
    S(this, K);
    S(this, I);
    S(this, J);
    S(this, ie, 0);
    S(this, be, 5);
    S(this, U, !1);
    S(this, Q, !1);
    S(this, V, null);
    S(this, oe, () => {
      this.debugLog("Connected to event bus"), y(this, K, !0), y(this, U, !1), this.debugLog("Emitting queued events", l(this, $)), l(this, $).forEach((t) => this.emitEventToBus(t)), y(this, $, []), this.stopConnectLoop(), l(this, C).call(this).removeEventListener(
        "tanstack-connect-success",
        l(this, oe)
      );
    });
    // fired off right away and then at intervals
    S(this, Y, () => {
      if (l(this, ie) < l(this, be)) {
        je(this, ie)._++, this.dispatchCustomEvent("tanstack-connect", {});
        return;
      }
      l(this, C).call(this).removeEventListener(
        "tanstack-connect",
        l(this, Y)
      ), y(this, Q, !0), this.debugLog("Max retries reached, giving up on connection"), this.stopConnectLoop();
    });
    // This is run to register connection handlers on first emit attempt
    S(this, me, () => {
      l(this, U) || (y(this, U, !0), l(this, C).call(this).addEventListener(
        "tanstack-connect-success",
        l(this, oe)
      ), l(this, Y).call(this));
    });
    y(this, D, t), y(this, W, r), y(this, C, this.getGlobalTarget), y(this, se, n), this.debugLog(" Initializing event subscription for plugin", l(this, D)), y(this, $, []), y(this, K, !1), y(this, Q, !1), y(this, I, null), y(this, J, s);
  }
  startConnectLoop() {
    l(this, I) !== null || l(this, K) || (this.debugLog(`Starting connect loop (every ${l(this, J)}ms)`), y(this, I, setInterval(
      l(this, Y),
      l(this, J)
    )));
  }
  stopConnectLoop() {
    y(this, U, !1), l(this, I) !== null && (clearInterval(l(this, I)), y(this, I, null), y(this, $, []), this.debugLog("Stopped connect loop"));
  }
  debugLog(...t) {
    l(this, se) && console.log(`🌴 [tanstack-devtools:${l(this, D)}-plugin]`, ...t);
  }
  getGlobalTarget() {
    if (typeof globalThis < "u" && globalThis.__TANSTACK_EVENT_TARGET__)
      return this.debugLog("Using global event target"), globalThis.__TANSTACK_EVENT_TARGET__;
    if (typeof window < "u" && typeof window.addEventListener < "u")
      return this.debugLog("Using window as event target"), window;
    const t = typeof EventTarget < "u" ? new EventTarget() : void 0;
    return typeof t > "u" || typeof t.addEventListener > "u" ? (this.debugLog(
      "No event mechanism available, running in non-web environment"
    ), {
      addEventListener: () => {
      },
      removeEventListener: () => {
      },
      dispatchEvent: () => !1
    }) : (this.debugLog("Using new EventTarget as fallback"), t);
  }
  getPluginId() {
    return l(this, D);
  }
  dispatchCustomEventShim(t, n) {
    try {
      const r = new Event(t, {
        detail: n
      });
      l(this, C).call(this).dispatchEvent(r);
    } catch {
      this.debugLog("Failed to dispatch shim event");
    }
  }
  dispatchCustomEvent(t, n) {
    try {
      l(this, C).call(this).dispatchEvent(new CustomEvent(t, { detail: n }));
    } catch {
      this.dispatchCustomEventShim(t, n);
    }
  }
  emitEventToBus(t) {
    this.debugLog("Emitting event to client bus", t), this.dispatchCustomEvent("tanstack-dispatch-event", t);
  }
  createEventPayload(t, n) {
    return {
      type: `${l(this, D)}:${t}`,
      payload: n,
      pluginId: l(this, D)
    };
  }
  emit(t, n) {
    if (!l(this, W)) {
      this.debugLog(
        "Event bus client is disabled, not emitting event",
        t,
        n
      );
      return;
    }
    if (l(this, V) && (this.debugLog(
      "Emitting event to internal event target",
      t,
      n
    ), l(this, V).dispatchEvent(
      new CustomEvent(`${l(this, D)}:${t}`, {
        detail: this.createEventPayload(t, n)
      })
    )), l(this, Q)) {
      this.debugLog("Previously failed to connect, not emitting to bus");
      return;
    }
    if (!l(this, K)) {
      this.debugLog("Bus not available, will be pushed as soon as connected"), l(this, $).push(this.createEventPayload(t, n)), typeof CustomEvent < "u" && !l(this, U) && (l(this, me).call(this), this.startConnectLoop());
      return;
    }
    return this.emitEventToBus(this.createEventPayload(t, n));
  }
  on(t, n, r) {
    const s = (r == null ? void 0 : r.withEventTarget) ?? !1, o = `${l(this, D)}:${t}`;
    if (s && (l(this, V) || y(this, V, new EventTarget()), l(this, V).addEventListener(o, (d) => {
      n(d.detail);
    })), !l(this, W))
      return this.debugLog(
        "Event bus client is disabled, not registering event",
        o
      ), () => {
      };
    const f = (d) => {
      this.debugLog("Received event from bus", d.detail), n(d.detail);
    };
    return l(this, C).call(this).addEventListener(o, f), this.debugLog("Registered event to bus", o), () => {
      var d;
      s && ((d = l(this, V)) == null || d.removeEventListener(o, f)), l(this, C).call(this).removeEventListener(o, f);
    };
  }
  onAll(t) {
    if (!l(this, W))
      return this.debugLog("Event bus client is disabled, not registering event"), () => {
      };
    const n = (r) => {
      const s = r.detail;
      t(s);
    };
    return l(this, C).call(this).addEventListener("tanstack-devtools-global", n), () => l(this, C).call(this).removeEventListener(
      "tanstack-devtools-global",
      n
    );
  }
  onAllPluginEvents(t) {
    if (!l(this, W))
      return this.debugLog("Event bus client is disabled, not registering event"), () => {
      };
    const n = (r) => {
      const s = r.detail;
      l(this, D) && s.pluginId !== l(this, D) || t(s);
    };
    return l(this, C).call(this).addEventListener("tanstack-devtools-global", n), () => l(this, C).call(this).removeEventListener(
      "tanstack-devtools-global",
      n
    );
  }
}
W = new WeakMap(), D = new WeakMap(), C = new WeakMap(), se = new WeakMap(), $ = new WeakMap(), K = new WeakMap(), I = new WeakMap(), J = new WeakMap(), ie = new WeakMap(), be = new WeakMap(), U = new WeakMap(), Q = new WeakMap(), V = new WeakMap(), oe = new WeakMap(), Y = new WeakMap(), me = new WeakMap();
const mt = /* @__PURE__ */ new Map();
function vt(e, t) {
  mt.set(e, t);
}
function Me(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return null;
    }
}
function xt(e) {
  return typeof e.get == "function" ? e.get() : e.state;
}
function yt(e) {
  return {
    key: e.key,
    store: { state: Me(xt(e.store)) },
    options: Me(e.options)
  };
}
var Et = class extends bt {
  constructor(e) {
    super({
      pluginId: "pacer",
      debug: e == null ? void 0 : e.debug,
      /**
      * TanStack Devtools starts `ClientEventBus` inside an async dynamic import
      * after the first commit. Pacer utils often emit during the first render
      * (constructor → store sync). `EventClient` only retries `tanstack-connect`
      * `#maxRetries` times at `reconnectEveryMs` before it gives up and drops
      * all queued events permanently. Default 300ms × 5 ≈ 1.5s is often too
      * short; Form uses 1000ms here for the same reason.
      */
      reconnectEveryMs: 1e3
    });
  }
};
const St = (e, t) => {
  const n = t.key;
  n && (vt(n, t), Xe.emit(e, yt({
    ...t,
    key: n
  })));
}, Xe = new Et();
let b = /* @__PURE__ */ function(e) {
  return e[e.None = 0] = "None", e[e.Mutable = 1] = "Mutable", e[e.Watching = 2] = "Watching", e[e.RecursedCheck = 4] = "RecursedCheck", e[e.Recursed = 8] = "Recursed", e[e.Dirty = 16] = "Dirty", e[e.Pending = 32] = "Pending", e;
}({});
// @__NO_SIDE_EFFECTS__
function wt({ update: e, notify: t, unwatched: n }) {
  return {
    link: r,
    unlink: s,
    propagate: o,
    checkDirty: f,
    shallowPropagate: d
  };
  function r(i, u, a) {
    const h = u.depsTail;
    if (h !== void 0 && h.dep === i) return;
    const c = h !== void 0 ? h.nextDep : u.deps;
    if (c !== void 0 && c.dep === i) {
      c.version = a, u.depsTail = c;
      return;
    }
    const p = i.subsTail;
    if (p !== void 0 && p.version === a && p.sub === u) return;
    const m = u.depsTail = i.subsTail = {
      version: a,
      dep: i,
      sub: u,
      prevDep: h,
      nextDep: c,
      prevSub: p,
      nextSub: void 0
    };
    c !== void 0 && (c.prevDep = m), h !== void 0 ? h.nextDep = m : u.deps = m, p !== void 0 ? p.nextSub = m : i.subs = m;
  }
  function s(i, u = i.sub) {
    const a = i.dep, h = i.prevDep, c = i.nextDep, p = i.nextSub, m = i.prevSub;
    return c !== void 0 ? c.prevDep = h : u.depsTail = h, h !== void 0 ? h.nextDep = c : u.deps = c, p !== void 0 ? p.prevSub = m : a.subsTail = m, m !== void 0 ? m.nextSub = p : (a.subs = p) === void 0 && n(a), c;
  }
  function o(i) {
    let u = i.nextSub, a;
    e: do {
      const h = i.sub;
      let c = h.flags;
      if (c & (b.RecursedCheck | b.Recursed | b.Dirty | b.Pending) ? c & (b.RecursedCheck | b.Recursed) ? c & b.RecursedCheck ? !(c & (b.Dirty | b.Pending)) && v(i, h) ? (h.flags = c | (b.Recursed | b.Pending), c &= b.Mutable) : c = b.None : h.flags = c & ~b.Recursed | b.Pending : c = b.None : h.flags = c | b.Pending, c & b.Watching && t(h), c & b.Mutable) {
        const p = h.subs;
        if (p !== void 0) {
          const m = (i = p).nextSub;
          m !== void 0 && (a = {
            value: u,
            prev: a
          }, u = m);
          continue;
        }
      }
      if ((i = u) !== void 0) {
        u = i.nextSub;
        continue;
      }
      for (; a !== void 0; )
        if (i = a.value, a = a.prev, i !== void 0) {
          u = i.nextSub;
          continue e;
        }
      break;
    } while (!0);
  }
  function f(i, u) {
    let a, h = 0, c = !1;
    e: do {
      const p = i.dep, m = p.flags;
      if (u.flags & b.Dirty) c = !0;
      else if ((m & (b.Mutable | b.Dirty)) === (b.Mutable | b.Dirty)) {
        if (e(p)) {
          const x = p.subs;
          x.nextSub !== void 0 && d(x), c = !0;
        }
      } else if ((m & (b.Mutable | b.Pending)) === (b.Mutable | b.Pending)) {
        (i.nextSub !== void 0 || i.prevSub !== void 0) && (a = {
          value: i,
          prev: a
        }), i = p.deps, u = p, ++h;
        continue;
      }
      if (!c) {
        const x = i.nextDep;
        if (x !== void 0) {
          i = x;
          continue;
        }
      }
      for (; h--; ) {
        const x = u.subs, E = x.nextSub !== void 0;
        if (E ? (i = a.value, a = a.prev) : i = x, c) {
          if (e(u)) {
            E && d(x), u = i.sub;
            continue;
          }
          c = !1;
        } else u.flags &= ~b.Pending;
        u = i.sub;
        const k = i.nextDep;
        if (k !== void 0) {
          i = k;
          continue e;
        }
      }
      return c;
    } while (!0);
  }
  function d(i) {
    do {
      const u = i.sub, a = u.flags;
      (a & (b.Pending | b.Dirty)) === b.Pending && (u.flags = a | b.Dirty, (a & (b.Watching | b.RecursedCheck)) === b.Watching && t(u));
    } while ((i = i.nextSub) !== void 0);
  }
  function v(i, u) {
    let a = u.depsTail;
    for (; a !== void 0; ) {
      if (a === i) return !0;
      a = a.prevDep;
    }
    return !1;
  }
}
function et(e, t, n) {
  var o, f, d;
  const r = typeof e == "object", s = r ? e : void 0;
  return {
    next: (o = r ? e.next : e) == null ? void 0 : o.bind(s),
    error: (f = r ? e.error : t) == null ? void 0 : f.bind(s),
    complete: (d = r ? e.complete : n) == null ? void 0 : d.bind(s)
  };
}
const qe = [];
let de = 0;
const { link: Ae, unlink: _t, propagate: kt, checkDirty: tt, shallowPropagate: $e } = /* @__PURE__ */ wt({
  update(e) {
    return e._update();
  },
  notify(e) {
    qe[Oe++] = e, e.flags &= ~b.Watching;
  },
  unwatched(e) {
    e.depsTail !== void 0 && (e.depsTail = void 0, e.flags = b.Mutable | b.Dirty, fe(e));
  }
});
let ce = 0, Oe = 0, R;
function fe(e) {
  const t = e.depsTail;
  let n = t !== void 0 ? t.nextDep : e.deps;
  for (; n !== void 0; ) n = _t(n, e);
}
function qt() {
  for (; ce < Oe; ) {
    const e = qe[ce];
    qe[ce++] = void 0, e.notify();
  }
  ce = 0, Oe = 0;
}
function Ot(e, t) {
  const n = typeof e == "function", r = e, s = {
    _snapshot: n ? void 0 : e,
    subs: void 0,
    subsTail: void 0,
    deps: void 0,
    depsTail: void 0,
    flags: n ? b.None : b.Mutable,
    get() {
      return R !== void 0 && Ae(s, R, de), s._snapshot;
    },
    subscribe(o) {
      const f = et(o), d = { current: !1 }, v = Ct(() => {
        var i;
        s.get(), d.current ? (i = f.next) == null || i.call(f, s._snapshot) : d.current = !0;
      });
      return { unsubscribe: () => {
        v.stop();
      } };
    },
    _update(o) {
      const f = R, d = Object.is;
      if (n)
        R = s, ++de, s.depsTail = void 0;
      else if (o === void 0) return !1;
      n && (s.flags = b.Mutable | b.RecursedCheck);
      try {
        const v = s._snapshot, i = typeof o == "function" ? o(v) : o === void 0 && n ? r(v) : o;
        return v === void 0 || !d(v, i) ? (s._snapshot = i, !0) : !1;
      } finally {
        R = f, n && (s.flags &= ~b.RecursedCheck), fe(s);
      }
    }
  };
  return n ? (s.flags = b.Mutable | b.Dirty, s.get = function() {
    const o = s.flags;
    if (o & b.Dirty || o & b.Pending && tt(s.deps, s)) {
      if (s._update()) {
        const f = s.subs;
        f !== void 0 && $e(f);
      }
    } else o & b.Pending && (s.flags = o & ~b.Pending);
    return R !== void 0 && Ae(s, R, de), s._snapshot;
  }) : s.set = function(o) {
    if (s._update(o)) {
      const f = s.subs;
      f !== void 0 && (kt(f), $e(f), qt());
    }
  }, s;
}
function Ct(e) {
  const t = () => {
    const r = R;
    R = n, ++de, n.depsTail = void 0, n.flags = b.Watching | b.RecursedCheck;
    try {
      return e();
    } finally {
      R = r, n.flags &= ~b.RecursedCheck, fe(n);
    }
  }, n = {
    deps: void 0,
    depsTail: void 0,
    subs: void 0,
    subsTail: void 0,
    flags: b.Watching | b.RecursedCheck,
    notify() {
      const r = this.flags;
      r & b.Dirty || r & b.Pending && tt(this.deps, this) ? t() : this.flags = b.Watching;
    },
    stop() {
      this.flags = b.None, this.depsTail = void 0, fe(this);
    }
  };
  return t(), n;
}
var Lt = class {
  constructor(e, t) {
    this.atom = Ot(e), this.get = this.get.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), t && (this.actions = t(this));
  }
  setState(e) {
    this.atom.set(e);
  }
  get state() {
    return this.atom.get();
  }
  get() {
    return this.state;
  }
  subscribe(e) {
    return this.atom.subscribe(et(e));
  }
};
function Ie(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [r, s] of e) if (!t.has(r) || !Object.is(s, t.get(r))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const r of e) if (!t.has(r)) return !1;
    return !0;
  }
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  const n = Ve(e);
  if (n.length !== Ve(t).length) return !1;
  for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
  return !0;
}
function Ve(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
var Ce = { exports: {} }, Ee = {}, le = { exports: {} }, Se = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function Tt() {
  if (ze) return Se;
  ze = 1;
  var e = ve;
  function t(a, h) {
    return a === h && (a !== 0 || 1 / a === 1 / h) || a !== a && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, s = e.useEffect, o = e.useLayoutEffect, f = e.useDebugValue;
  function d(a, h) {
    var c = h(), p = r({ inst: { value: c, getSnapshot: h } }), m = p[0].inst, x = p[1];
    return o(
      function() {
        m.value = c, m.getSnapshot = h, v(m) && x({ inst: m });
      },
      [a, c, h]
    ), s(
      function() {
        return v(m) && x({ inst: m }), a(function() {
          v(m) && x({ inst: m });
        });
      },
      [a]
    ), f(c), c;
  }
  function v(a) {
    var h = a.getSnapshot;
    a = a.value;
    try {
      var c = h();
      return !n(a, c);
    } catch {
      return !0;
    }
  }
  function i(a, h) {
    return h();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? i : d;
  return Se.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u, Se;
}
var we = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function Dt() {
  return Be || (Be = 1, process.env.NODE_ENV !== "production" && function() {
    function e(c, p) {
      return c === p && (c !== 0 || 1 / c === 1 / p) || c !== c && p !== p;
    }
    function t(c, p) {
      u || s.startTransition === void 0 || (u = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var m = p();
      if (!a) {
        var x = p();
        o(m, x) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), a = !0);
      }
      x = f({
        inst: { value: m, getSnapshot: p }
      });
      var E = x[0].inst, k = x[1];
      return v(
        function() {
          E.value = m, E.getSnapshot = p, n(E) && k({ inst: E });
        },
        [c, m, p]
      ), d(
        function() {
          return n(E) && k({ inst: E }), c(function() {
            n(E) && k({ inst: E });
          });
        },
        [c]
      ), i(m), m;
    }
    function n(c) {
      var p = c.getSnapshot;
      c = c.value;
      try {
        var m = p();
        return !o(c, m);
      } catch {
        return !0;
      }
    }
    function r(c, p) {
      return p();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var s = ve, o = typeof Object.is == "function" ? Object.is : e, f = s.useState, d = s.useEffect, v = s.useLayoutEffect, i = s.useDebugValue, u = !1, a = !1, h = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    we.useSyncExternalStore = s.useSyncExternalStore !== void 0 ? s.useSyncExternalStore : h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), we;
}
var We;
function nt() {
  return We || (We = 1, process.env.NODE_ENV === "production" ? le.exports = Tt() : le.exports = Dt()), le.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ue;
function Nt() {
  if (Ue) return Ee;
  Ue = 1;
  var e = ve, t = nt();
  function n(i, u) {
    return i === u && (i !== 0 || 1 / i === 1 / u) || i !== i && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : n, s = t.useSyncExternalStore, o = e.useRef, f = e.useEffect, d = e.useMemo, v = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(i, u, a, h, c) {
    var p = o(null);
    if (p.current === null) {
      var m = { hasValue: !1, value: null };
      p.current = m;
    } else m = p.current;
    p = d(
      function() {
        function E(w) {
          if (!k) {
            if (k = !0, j = w, w = h(w), c !== void 0 && m.hasValue) {
              var O = m.value;
              if (c(O, w))
                return L = O;
            }
            return L = w;
          }
          if (O = L, r(j, w)) return O;
          var H = h(w);
          return c !== void 0 && c(O, H) ? (j = w, O) : (j = w, L = H);
        }
        var k = !1, j, L, A = a === void 0 ? null : a;
        return [
          function() {
            return E(u());
          },
          A === null ? void 0 : function() {
            return E(A());
          }
        ];
      },
      [u, a, h, c]
    );
    var x = s(i, p[0], p[1]);
    return f(
      function() {
        m.hasValue = !0, m.value = x;
      },
      [x]
    ), v(x), x;
  }, Ee;
}
var _e = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ge;
function jt() {
  return Ge || (Ge = 1, process.env.NODE_ENV !== "production" && function() {
    function e(i, u) {
      return i === u && (i !== 0 || 1 / i === 1 / u) || i !== i && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = ve, n = nt(), r = typeof Object.is == "function" ? Object.is : e, s = n.useSyncExternalStore, o = t.useRef, f = t.useEffect, d = t.useMemo, v = t.useDebugValue;
    _e.useSyncExternalStoreWithSelector = function(i, u, a, h, c) {
      var p = o(null);
      if (p.current === null) {
        var m = { hasValue: !1, value: null };
        p.current = m;
      } else m = p.current;
      p = d(
        function() {
          function E(w) {
            if (!k) {
              if (k = !0, j = w, w = h(w), c !== void 0 && m.hasValue) {
                var O = m.value;
                if (c(O, w))
                  return L = O;
              }
              return L = w;
            }
            if (O = L, r(j, w))
              return O;
            var H = h(w);
            return c !== void 0 && c(O, H) ? (j = w, O) : (j = w, L = H);
          }
          var k = !1, j, L, A = a === void 0 ? null : a;
          return [
            function() {
              return E(u());
            },
            A === null ? void 0 : function() {
              return E(A());
            }
          ];
        },
        [u, a, h, c]
      );
      var x = s(i, p[0], p[1]);
      return f(
        function() {
          m.hasValue = !0, m.value = x;
        },
        [x]
      ), v(x), x;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), _e;
}
process.env.NODE_ENV === "production" ? Ce.exports = Nt() : Ce.exports = jt();
var Pt = Ce.exports;
function Rt(e, t) {
  return e === t;
}
function He(e, t = (r) => r, n) {
  const r = (n == null ? void 0 : n.compare) ?? Rt, s = M((f) => {
    const { unsubscribe: d } = e.subscribe(f);
    return d;
  }, [e]), o = M(() => e.get(), [e]);
  return Pt.useSyncExternalStoreWithSelector(s, o, o, t, r);
}
function Ke() {
  return {
    canLeadingExecute: !0,
    executionCount: 0,
    isPending: !1,
    lastArgs: void 0,
    status: "idle",
    maybeExecuteCount: 0
  };
}
const Mt = {
  enabled: !0,
  leading: !1,
  trailing: !0,
  wait: 0
};
var z, N, G, ae, F, Z, Ye, At = (Ye = class {
  constructor(e, t) {
    S(this, z);
    S(this, N);
    /**
    * Returns the current enabled state of the debouncer
    */
    S(this, G);
    /**
    * Returns the current wait time in milliseconds
    */
    S(this, ae);
    S(this, F);
    S(this, Z);
    this.fn = e, this.store = new Lt(Ke()), this.setOptions = (n) => {
      this.options = {
        ...this.options,
        ...n
      }, l(this, G).call(this) || this.cancel();
    }, y(this, N, (n) => {
      this.store.setState((r) => {
        const s = {
          ...r,
          ...n
        }, { isPending: o } = s;
        return {
          ...s,
          status: l(this, G).call(this) ? o ? "pending" : "idle" : "disabled"
        };
      }), St("Debouncer", this);
    }), y(this, G, () => !!Re(this.options.enabled, this)), y(this, ae, () => Re(this.options.wait, this)), this.maybeExecute = (...n) => {
      if (!l(this, G).call(this)) return;
      l(this, N).call(this, { maybeExecuteCount: this.store.state.maybeExecuteCount + 1 });
      let r = !1;
      this.options.leading && this.store.state.canLeadingExecute && (l(this, N).call(this, { canLeadingExecute: !1 }), r = !0, l(this, F).call(this, ...n)), this.options.trailing && l(this, N).call(this, {
        isPending: !0,
        lastArgs: n
      }), l(this, z) && clearTimeout(l(this, z)), y(this, z, setTimeout(() => {
        l(this, N).call(this, { canLeadingExecute: !0 }), this.options.trailing && !r && l(this, F).call(this, ...n);
      }, l(this, ae).call(this)));
    }, y(this, F, (...n) => {
      var r, s;
      l(this, G).call(this) && (this.fn(...n), l(this, N).call(this, {
        executionCount: this.store.state.executionCount + 1,
        isPending: !1,
        lastArgs: void 0
      }), (s = (r = this.options).onExecute) == null || s.call(r, n, this));
    }), this.flush = () => {
      this.store.state.isPending && this.store.state.lastArgs && (l(this, Z).call(this), l(this, F).call(this, ...this.store.state.lastArgs));
    }, y(this, Z, () => {
      l(this, z) && (clearTimeout(l(this, z)), y(this, z, void 0));
    }), this.cancel = () => {
      l(this, Z).call(this), l(this, N).call(this, {
        canLeadingExecute: !0,
        isPending: !1
      });
    }, this.reset = () => {
      l(this, N).call(this, Ke());
    }, this.key = t.key, this.options = {
      ...Mt,
      ...t
    }, l(this, N).call(this, this.options.initialState ?? {}), this.key && Xe.on("d-Debouncer", (n) => {
      n.payload.key === this.key && (l(this, N).call(this, n.payload.store.state), this.setOptions(n.payload.options));
    });
  }
}, z = new WeakMap(), N = new WeakMap(), G = new WeakMap(), ae = new WeakMap(), F = new WeakMap(), Z = new WeakMap(), Ye);
function $t(e, t, n = () => ({})) {
  const r = {
    ...lt().debouncer,
    ...t
  }, [s] = P(() => {
    const f = new At(e, r);
    return f.Subscribe = function(v) {
      const i = He(f.store, v.selector, { compare: Ie });
      return typeof v.children == "function" ? v.children(i) : v.children;
    }, f;
  });
  s.fn = e, s.setOptions(r), pe(() => () => {
    r.onUnmount ? r.onUnmount(s) : s.cancel();
  }, []);
  const o = He(s.store, n, { compare: Ie });
  return xe(() => ({
    ...s,
    state: o
  }), [s, o]);
}
function rt(e, t) {
  const n = $t(e, t).maybeExecute;
  return M((...r) => n(...r), [n]);
}
const It = /* @__PURE__ */ new Set(["dark", "light"]);
function Vt(e) {
  if (!te(e)) return ue;
  const t = ge(e.mode) && It.has(e.mode) ? e.mode : ue.mode, n = zt(e.brand), r = {
    schemaVersion: Bt(e.schemaVersion) ? e.schemaVersion : 1,
    tenantId: ge(e.tenantId) ? e.tenantId : void 0,
    mode: t,
    brand: n
  };
  return te(e.content) && (r.content = e.content), te(e.assets) && (r.assets = e.assets), te(e.overrides) && (r.overrides = e.overrides), r;
}
function zt(e) {
  if (!te(e) || !ge(e.primary)) return ue.brand;
  const t = { primary: e.primary };
  return ge(e.secondary) && (t.secondary = e.secondary), t;
}
function te(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ge(e) {
  return typeof e == "string";
}
function Bt(e) {
  return typeof e == "number" && Number.isFinite(e);
}
const Fe = [
  { id: "desktop", label: "Desktop", width: 1440 },
  { id: "tablet", label: "Tablet", width: 834 },
  { id: "mobile", label: "Mobile", width: 390 }
];
function Wt(e) {
  const t = e && e.length > 0 ? e : "/", n = t.indexOf("?"), r = n === -1 ? t : t.slice(0, n), s = new URLSearchParams(n === -1 ? "" : t.slice(n + 1));
  return s.delete("preview"), s.set("preview", "embed"), `${r}?${s.toString()}`;
}
const st = [
  { id: "theme", label: "Theme", scope: "global" },
  { id: "brand", label: "Brand & Wordmark", scope: "global" },
  { id: "palette", label: "Palette", scope: "global" },
  { id: "shape", label: "Shape & Type", scope: "global" },
  { id: "nav", label: "Navigation", scope: "global" },
  { id: "footer", label: "Footer", scope: "global" },
  { id: "onboarding", label: "Onboarding", scope: "page", route: "/onboarding" },
  { id: "missions", label: "Missions", scope: "page", route: "/missions" },
  { id: "leaderboard", label: "Leaderboard", scope: "page", route: "/leaderboard" },
  { id: "profile", label: "Profile", scope: "page", route: "/profile" },
  { id: "assets", label: "Assets", scope: "assets" }
];
function ne(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (t) => t.toUpperCase());
}
const Ut = {
  brand: "brand",
  nav: "nav",
  footer: "footer",
  onboarding: "onboarding",
  leaderboard: "leaderboard",
  profile: "profile",
  missions: "missions"
};
function it(e, t) {
  return e === null || typeof e != "object" || Array.isArray(e) ? [{ path: t, isArray: Array.isArray(e) }] : Object.entries(e).flatMap(
    ([n, r]) => it(r, t ? `${t}.${n}` : n)
  );
}
function Gt() {
  return it(ut, "content").map(({ path: e, isArray: t }) => {
    const n = e.split("."), r = n[1], s = n[n.length - 1], o = t ? "list" : s === "body" ? "textarea" : "text";
    return { path: e, label: ne(s), kind: o, group: Ut[r] };
  });
}
const T = (e) => e.map((t) => ({ slot: t, kind: "color" })), Ht = [
  {
    recipe: "missionCard",
    group: "missions",
    fields: [
      ...T(["panel", "panel2", "border", "title", "body", "iconBoxBg", "iconBoxBorder", "ctaFg"]),
      { slot: "haloOpacity", kind: "range", min: 0, max: 1, step: 0.01 }
    ]
  },
  {
    recipe: "missionModal",
    group: "missions",
    fields: T([
      "panel",
      "panel2",
      "border",
      "title",
      "body",
      "backdrop",
      "headerBorder",
      "closeBg",
      "closeBorder",
      "closeIcon"
    ])
  },
  {
    recipe: "rewardCard",
    group: "missions",
    fields: T(["panel", "panel2", "border", "title", "body", "imageArea", "imageAreaBorder"])
  },
  {
    recipe: "heroBanner",
    group: "missions",
    fields: [
      ...T(["panel", "border"]),
      { slot: "overlayGradient", kind: "text" },
      { slot: "overlayMode", kind: "select", options: ["always", "eyebrow-only", "never"] }
    ]
  },
  {
    recipe: "onboardingCard",
    group: "onboarding",
    fields: T([
      "panel",
      "panel2",
      "border",
      "title",
      "body",
      "heroBg",
      "formBg",
      "statTileBg",
      "statTileBorder",
      "brandEmphasis",
      "linkColor"
    ])
  },
  {
    recipe: "leaderboardRow",
    group: "leaderboard",
    fields: [
      ...T(["rowPanel", "rowBorder", "headPanel", "headText", "mineHighlight", "topRankColor"]),
      { slot: "tierTones", kind: "toneMap" }
    ]
  },
  {
    recipe: "podium",
    group: "leaderboard",
    fields: [
      { slot: "rankColors.1", kind: "color" },
      { slot: "rankColors.2", kind: "color" },
      { slot: "rankColors.3", kind: "color" },
      { slot: "platformHeights.1", kind: "number", min: 0, max: 400 },
      { slot: "platformHeights.2", kind: "number", min: 0, max: 400 },
      { slot: "platformHeights.3", kind: "number", min: 0, max: 400 }
    ]
  },
  {
    recipe: "profileCard",
    group: "profile",
    fields: T([
      "panel",
      "panel2",
      "border",
      "title",
      "body",
      "statBg",
      "statBorder",
      "walletColor"
    ])
  },
  {
    recipe: "tierLadder",
    group: "profile",
    fields: [
      { slot: "currentMixPercent", kind: "range", min: 0, max: 100, step: 1 },
      { slot: "lockedOpacity", kind: "range", min: 0, max: 1, step: 0.05 },
      ...T(["panel", "panelCurrent"])
    ]
  },
  {
    recipe: "badgeGrid",
    group: "profile",
    fields: [...T(["panel", "border", "lockedFg"]), { slot: "unlockedTones", kind: "list" }]
  },
  {
    recipe: "statCard",
    group: "profile",
    fields: T(["trendDefault", "trendStreak", "trendRewards"])
  },
  { recipe: "xpChart", group: "profile", fields: T(["gradientFrom", "gradientTo"]) },
  {
    recipe: "topNav",
    group: "nav",
    fields: T(["panel", "border", "linkColor", "linkColorActive", "linkBgActive"])
  },
  { recipe: "footer", group: "footer", fields: T(["panel", "border", "textColor", "brandColor"]) }
];
function Kt() {
  return Ht.flatMap(
    (e) => e.fields.map((t) => ({
      path: `overrides.${e.recipe}.${t.slot}`,
      label: t.slot.split(".").map(ne).join(" "),
      kind: t.kind,
      group: e.group,
      options: t.options,
      min: t.min,
      max: t.max,
      step: t.step
    }))
  );
}
function Ft() {
  const e = [];
  e.push({ path: "mode", label: "Mode", kind: "mode", group: "theme" }), e.push({ path: "brand.primary", label: "Primary", kind: "color", group: "brand" }), e.push({ path: "brand.secondary", label: "Secondary", kind: "color", group: "brand" }), e.push(...Gt());
  for (const t of Object.keys(dt.dark))
    e.push({
      path: `overrides.palette.${t}`,
      label: ne(t),
      kind: "color",
      group: "palette"
    });
  for (const t of ["card", "button", "tag", "modal"])
    e.push({
      path: `overrides.radius.${t}`,
      label: `Radius ${ne(t)}`,
      kind: "text",
      group: "shape"
    });
  for (const t of ["display", "ui", "mono"])
    e.push({
      path: `overrides.fonts.${t}`,
      label: `Font ${ne(t)}`,
      kind: "text",
      group: "shape"
    });
  return e.push(...Kt()), e.push({
    path: "assets.onboardingHero",
    label: "Onboarding hero",
    kind: "asset",
    group: "assets"
  }), e.push({ path: "assets.missionsHero", label: "Missions hero", kind: "asset", group: "assets" }), e;
}
const ot = Ft();
function Jt(e) {
  return ot.filter((t) => t.group === e);
}
function Qt(e) {
  const t = st.find((n) => n.id === e);
  return (t == null ? void 0 : t.scope) === "page" ? t.route : void 0;
}
function Yt(e, t) {
  const n = Qt(e);
  return !n || n === t ? null : n;
}
function re(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function he(e, t) {
  let n = e;
  for (const r of t.split(".")) {
    if (!re(n)) return;
    n = n[r];
  }
  return n;
}
function Le(e, t, n) {
  const r = t.split("."), [s, ...o] = r, f = re(e) ? { ...e } : {};
  if (o.length === 0)
    f[s] = n;
  else {
    const d = re(f[s]) ? f[s] : {};
    f[s] = Le(d, o.join("."), n);
  }
  return f;
}
function at(e, t) {
  const n = t.split("."), [r, ...s] = n, o = re(e) ? { ...e } : {};
  return s.length === 0 ? delete o[r] : re(o[r]) && (o[r] = at(o[r], s.join("."))), o;
}
function Zt(e, t) {
  return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" ? JSON.stringify(e) === JSON.stringify(t) : !1;
}
function Je(e, t, n) {
  return n.filter((r) => !Zt(he(e, r), he(t, r)));
}
function Xt(e, t, n) {
  const r = he(t, n);
  return r === void 0 ? at(e, n) : Le(e, n, r);
}
const en = ot.map((e) => e.path);
function tn(e, t) {
  const [n, r] = P(e), [s, o] = P(e), [f, d] = P(e);
  e !== f && (d(e), r(e), o(e));
  const v = rt((x) => t.onApply(x), {
    wait: t.applyWaitMs ?? 120
  }), i = ee(!0);
  pe(() => {
    if (i.current) {
      i.current = !1;
      return;
    }
    v(s);
  }, [s, v]);
  const u = M((x, E) => {
    o((k) => Le(k, x, E));
  }, []), a = M((x) => o((E) => Xt(E, n, x)), [n]), h = M(() => o(n), [n]), c = M(() => r(s), [s]), p = xe(() => Je(n, s, en), [n, s]), m = M(
    (x) => Je(n, s, [x]).length > 0,
    [n, s]
  );
  return {
    draft: s,
    set: u,
    reset: a,
    discard: h,
    commitSaved: c,
    isModified: m,
    changedPaths: p,
    isDirty: p.length > 0
  };
}
const nn = pt("oklch");
function ke(e, t) {
  const n = 10 ** t;
  return Math.round(e * n) / n;
}
function Qe(e) {
  const t = Ze(e);
  if (!t) return e;
  const n = nn(t);
  if (!n) return e;
  const r = ke(n.l ?? 0, 4), s = ke(n.c ?? 0, 4), o = ke(n.h ?? 0, 2);
  return `oklch(${r} ${s} ${o})`;
}
function rn(e, t) {
  return t < 0 || t >= e.length ? e.slice() : e.filter((n, r) => r !== t);
}
function sn(e, t, n) {
  const r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r || t === n) return e.slice();
  const s = e.slice(), [o] = s.splice(t, 1);
  return s.splice(n, 0, o), s;
}
function on({
  id: e,
  label: t,
  value: n,
  onChange: r
}) {
  const [s, o] = P(n), [f, d] = P(n);
  n !== f && (d(n), o(n));
  const v = (() => {
    const u = Ze(n);
    return u ? ft(u) : "#000000";
  })(), i = () => {
    s !== n && r(Qe(s));
  };
  return /* @__PURE__ */ g.jsxs("span", { className: "gqdc-f-color", children: [
    /* @__PURE__ */ g.jsx("span", { className: "gqdc-f-swatch", style: { background: n } }),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        type: "color",
        "aria-label": `${t} colour picker`,
        value: v,
        onChange: (u) => r(Qe(u.target.value))
      }
    ),
    /* @__PURE__ */ g.jsx(
      "input",
      {
        id: e,
        "aria-label": `${t} colour value`,
        className: "gqdc-f-input",
        value: s,
        onChange: (u) => o(u.target.value),
        onBlur: i,
        onKeyDown: (u) => u.key === "Enter" && i()
      }
    )
  ] });
}
function an({ value: e, onChange: t }) {
  const n = Array.isArray(e) ? e : [], r = n.length > 0 && typeof n[0] == "object" && n[0] !== null, s = () => r ? Object.fromEntries(Object.keys(n[0]).map((o) => [o, ""])) : "";
  return /* @__PURE__ */ g.jsxs("div", { className: "gqdc-f-list", children: [
    n.map((o, f) => /* @__PURE__ */ g.jsxs("div", { className: "gqdc-f-listrow", children: [
      /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Move up",
          disabled: f === 0,
          onClick: () => t(sn(n, f, f - 1)),
          children: "↑"
        }
      ),
      r ? Object.entries(o).map(([d, v]) => /* @__PURE__ */ g.jsx(
        "input",
        {
          "aria-label": `item ${f} ${d}`,
          className: "gqdc-f-input",
          value: String(v ?? ""),
          onChange: (i) => {
            const u = n.slice();
            u[f] = { ...o, [d]: i.target.value }, t(u);
          }
        },
        d
      )) : /* @__PURE__ */ g.jsx(
        "input",
        {
          "aria-label": `item ${f}`,
          className: "gqdc-f-input",
          value: String(o ?? ""),
          onChange: (d) => {
            const v = n.slice();
            v[f] = d.target.value, t(v);
          }
        }
      ),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          "aria-label": `Remove item ${f}`,
          onClick: () => t(rn(n, f)),
          children: "✕"
        }
      )
    ] }, f)),
    /* @__PURE__ */ g.jsx("button", { type: "button", className: "gqdc-f-add", onClick: () => t([...n, s()]), children: "+ Add" })
  ] });
}
function cn({ def: e, value: t, modified: n, onChange: r, onReset: s }) {
  const o = e.path;
  let f;
  switch (e.kind) {
    case "mode":
      f = /* @__PURE__ */ g.jsx("span", { className: "gqdc-f-seg", role: "group", "aria-label": e.label, children: ["dark", "light"].map((d) => /* @__PURE__ */ g.jsx("button", { type: "button", "aria-pressed": t === d, onClick: () => r(d), children: d === "dark" ? "Dark" : "Light" }, d)) });
      break;
    case "color":
      f = /* @__PURE__ */ g.jsx(on, { id: o, label: e.label, value: String(t ?? ""), onChange: r });
      break;
    case "select":
      f = /* @__PURE__ */ g.jsx(
        "select",
        {
          id: o,
          "aria-label": e.label,
          className: "gqdc-f-input",
          value: String(t ?? ""),
          onChange: (d) => r(d.target.value),
          children: (e.options ?? []).map((d) => /* @__PURE__ */ g.jsx("option", { value: d, children: d }, d))
        }
      );
      break;
    case "number":
    case "range":
      f = /* @__PURE__ */ g.jsx(
        "input",
        {
          id: o,
          "aria-label": e.label,
          type: e.kind === "range" ? "range" : "number",
          className: "gqdc-f-input",
          min: e.min,
          max: e.max,
          step: e.step,
          value: Number(t ?? 0),
          onChange: (d) => r(Number(d.target.value))
        }
      );
      break;
    case "textarea":
      f = /* @__PURE__ */ g.jsx(
        "textarea",
        {
          id: o,
          "aria-label": e.label,
          className: "gqdc-f-input gqdc-f-ta",
          value: String(t ?? ""),
          onChange: (d) => r(d.target.value)
        }
      );
      break;
    case "list":
      f = /* @__PURE__ */ g.jsx(an, { value: t, onChange: r });
      break;
    case "asset": {
      const d = t ?? {}, v = (i) => r({ ...d, ...i });
      f = /* @__PURE__ */ g.jsxs("span", { className: "gqdc-f-asset", children: [
        /* @__PURE__ */ g.jsx(
          "input",
          {
            id: o,
            "aria-label": `${e.label} src`,
            className: "gqdc-f-input",
            placeholder: "src URL",
            value: d.src ?? "",
            onChange: (i) => v({ src: i.target.value })
          }
        ),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            "aria-label": `${e.label} mobile src`,
            className: "gqdc-f-input",
            placeholder: "mobile src (optional)",
            value: d.mobileSrc ?? "",
            onChange: (i) => v({ mobileSrc: i.target.value })
          }
        )
      ] });
      break;
    }
    case "toneMap": {
      const d = t ?? {};
      f = /* @__PURE__ */ g.jsx("div", { className: "gqdc-f-list", children: Object.entries(d).map(([v, i]) => /* @__PURE__ */ g.jsxs("div", { className: "gqdc-f-listrow", children: [
        /* @__PURE__ */ g.jsx("span", { className: "gqdc-f-lbl", children: v }),
        /* @__PURE__ */ g.jsxs(
          "select",
          {
            "aria-label": `${v} tone`,
            className: "gqdc-f-input",
            value: i,
            onChange: (u) => r({ ...d, [v]: u.target.value }),
            children: [
              /* @__PURE__ */ g.jsx("option", { value: "primary", children: "primary" }),
              /* @__PURE__ */ g.jsx("option", { value: "secondary", children: "secondary" })
            ]
          }
        )
      ] }, v)) });
      break;
    }
    default:
      f = /* @__PURE__ */ g.jsx(
        "input",
        {
          id: o,
          "aria-label": e.label,
          className: "gqdc-f-input",
          value: String(t ?? ""),
          onChange: (d) => r(d.target.value)
        }
      );
  }
  return /* @__PURE__ */ g.jsxs("div", { className: "gqdc-f-row", children: [
    /* @__PURE__ */ g.jsxs("label", { className: "gqdc-f-head", htmlFor: o, children: [
      n && /* @__PURE__ */ g.jsx("span", { className: "gqdc-f-dot", "aria-hidden": !0 }),
      /* @__PURE__ */ g.jsx("span", { className: "gqdc-f-label", children: e.label }),
      n && /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: "gqdc-f-reset",
          "aria-label": `Reset ${e.label}`,
          onClick: s,
          children: "⟲"
        }
      )
    ] }),
    f
  ] });
}
function ln({ draft: e, isModified: t, onSet: n, onReset: r, onActivateGroup: s }) {
  const [o, f] = P(""), [d, v] = P({}), i = o.trim().toLowerCase(), u = xe(() => {
    const a = (h) => !i || h.label.toLowerCase().includes(i) || h.path.toLowerCase().includes(i);
    return st.map((h) => ({
      group: h,
      fields: Jt(h.id).filter(a)
    })).filter((h) => h.fields.length > 0);
  }, [i]);
  return /* @__PURE__ */ g.jsxs("div", { className: "gqdc-insp", children: [
    /* @__PURE__ */ g.jsx("div", { className: "gqdc-insp-search", children: /* @__PURE__ */ g.jsx(
      "input",
      {
        "aria-label": "Filter fields",
        className: "gqdc-f-input",
        placeholder: "Filter fields…",
        value: o,
        onChange: (a) => f(a.target.value)
      }
    ) }),
    u.map(({ group: a, fields: h }) => {
      const c = !i && d[a.id];
      return /* @__PURE__ */ g.jsxs("section", { className: "gqdc-grp", children: [
        /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            className: "gqdc-grp-h",
            "aria-expanded": !c,
            onClick: () => v((p) => (!p[a.id] || s == null || s(a.id), { ...p, [a.id]: !p[a.id] })),
            children: [
              /* @__PURE__ */ g.jsx("span", { children: a.label }),
              a.route && /* @__PURE__ */ g.jsx("span", { className: "gqdc-grp-route", children: a.route })
            ]
          }
        ),
        !c && /* @__PURE__ */ g.jsx("div", { className: "gqdc-grp-b", children: h.map((p) => /* @__PURE__ */ g.jsx(
          cn,
          {
            def: p,
            value: he(e, p.path),
            modified: t(p.path),
            onChange: (m) => {
              s == null || s(p.group), n(p.path, m);
            },
            onReset: () => r(p.path)
          },
          p.path
        )) })
      ] }, a.id);
    })
  ] });
}
const dn = `
.gqdc-root{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  background:#070a0c;color:#cdd9e0;-webkit-font-smoothing:antialiased}
.gqdc-top{display:flex;align-items:center;gap:14px;padding:10px 16px;
  background:#0e151a;border-bottom:1px solid #1c2731;flex:0 0 auto}
.gqdc-brand{display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;color:#e6eef3}
.gqdc-dot{width:9px;height:9px;border-radius:50%;background:#34d8e8;
  box-shadow:0 0 10px rgba(52,216,232,.75)}
.gqdc-tenant{font-size:11px;color:#5d6e79;font-weight:500}
.gqdc-seg{display:flex;border:1px solid #243039;border-radius:9px;overflow:hidden;margin-left:auto}
.gqdc-seg button{appearance:none;background:transparent;border:0;border-right:1px solid #243039;
  color:#7e909c;font:inherit;font-size:11.5px;padding:6px 14px;cursor:pointer;transition:.12s}
.gqdc-seg button:last-child{border-right:0}
.gqdc-seg button:hover{color:#aebcc6}
.gqdc-seg button[aria-pressed="true"]{background:rgba(52,216,232,.15);color:#7fe9f3}
.gqdc-actions{display:flex;align-items:center;gap:9px}
.gqdc-btn{appearance:none;font:inherit;font-size:12px;font-weight:600;border-radius:8px;
  padding:7px 16px;cursor:pointer;transition:.12s;border:1px solid transparent}
.gqdc-save{background:#34d8e8;color:#04141a;display:flex;align-items:center;gap:7px}
.gqdc-save[disabled]{opacity:.45;cursor:not-allowed}
.gqdc-save .gqdc-dirty{width:6px;height:6px;border-radius:50%;background:#04141a}
.gqdc-ghost{background:transparent;color:#8aa2ad;border-color:#2a3a44}
.gqdc-ghost:not([disabled]):hover{color:#cdd9e0;border-color:#3a4c58}
.gqdc-ghost[disabled]{opacity:.4;cursor:not-allowed}
.gqdc-body{flex:1 1 auto;display:flex;min-height:0}
.gqdc-stage{flex:1 1 auto;display:flex;align-items:flex-start;justify-content:center;
  overflow:auto;padding:26px;background:radial-gradient(circle at 50% 22%,#11181e,#070a0c 70%)}
.gqdc-frame{height:100%;border:1px solid #2a3a44;border-radius:14px;background:#0c1216;
  box-shadow:0 28px 70px -28px rgba(0,0,0,.9);transition:width .22s cubic-bezier(.4,0,.2,1)}
.gqdc-inspector{flex:0 0 320px;background:#0d1318;border-left:1px solid #1c2731;
  display:flex;flex-direction:column;overflow:auto}
.gqdc-insp-h{padding:13px 15px;border-bottom:1px solid #1c2731;font-size:12px;
  font-weight:600;color:#e6eef3;display:flex;align-items:center;gap:9px;flex:0 0 auto}
.gqdc-insp-dirty{font-size:10px;font-weight:600;color:#04141a;background:#f5a3d4;
  border-radius:999px;padding:2px 8px;margin-left:auto}
.gqdc-insp{flex:1 1 auto;overflow:auto}
.gqdc-insp-search{padding:11px 13px;position:sticky;top:0;background:#0d1318;
  border-bottom:1px solid #161f26;z-index:1}
.gqdc-grp{border-bottom:1px solid #131c22}
.gqdc-grp-h{width:100%;appearance:none;background:#0e151a;border:0;cursor:pointer;
  display:flex;align-items:center;gap:8px;padding:10px 14px;font:inherit;font-size:11.5px;
  font-weight:600;color:#aebcc6;transition:.12s}
.gqdc-grp-h:hover{color:#e6eef3}
.gqdc-grp-h[aria-expanded="true"]{color:#7fe9f3;background:rgba(52,216,232,.07)}
.gqdc-grp-route{margin-left:auto;font-size:10px;font-weight:500;color:#5d6e79}
.gqdc-grp-route::before{content:"\\21B3  "}
.gqdc-grp-b{padding:4px 14px 12px}
.gqdc-f-row{margin:11px 0}
.gqdc-f-head{display:flex;align-items:center;gap:7px;margin-bottom:5px;
  font-size:11px;color:#93a2ac}
.gqdc-f-dot{width:5px;height:5px;border-radius:50%;background:#f5a3d4;flex:0 0 auto}
.gqdc-f-label{flex:1}
.gqdc-f-reset{appearance:none;background:transparent;border:1px solid #243039;
  color:#7e909c;border-radius:5px;font-size:10px;line-height:1;padding:3px 6px;cursor:pointer}
.gqdc-f-reset:hover{color:#cdd9e0;border-color:#3a4c58}
.gqdc-f-input{width:100%;box-sizing:border-box;background:#0a0e11;border:1px solid #243039;
  border-radius:6px;color:#cdd9e0;font:inherit;font-size:11.5px;padding:6px 8px}
.gqdc-f-input:focus{outline:0;border-color:#34d8e8}
.gqdc-f-ta{min-height:54px;resize:vertical;font-family:ui-sans-serif,system-ui}
.gqdc-f-color{display:flex;align-items:center;gap:7px}
.gqdc-f-color input[type=color]{width:26px;height:26px;padding:0;border:1px solid #36454f;
  border-radius:6px;background:none;cursor:pointer;flex:0 0 auto}
.gqdc-f-swatch{width:22px;height:22px;border-radius:6px;border:1px solid #36454f;flex:0 0 auto}
.gqdc-f-seg{display:flex;border:1px solid #243039;border-radius:6px;overflow:hidden}
.gqdc-f-seg button{flex:1;appearance:none;background:transparent;border:0;
  border-right:1px solid #243039;color:#7e909c;font:inherit;font-size:11px;
  padding:6px;cursor:pointer}
.gqdc-f-seg button:last-child{border-right:0}
.gqdc-f-seg button[aria-pressed="true"]{background:rgba(52,216,232,.15);color:#7fe9f3}
.gqdc-f-list{display:flex;flex-direction:column;gap:6px}
.gqdc-f-listrow{display:flex;align-items:center;gap:5px}
.gqdc-f-listrow button{appearance:none;background:#0a0e11;border:1px solid #243039;
  color:#7e909c;border-radius:5px;font-size:10px;padding:4px 7px;cursor:pointer;flex:0 0 auto}
.gqdc-f-listrow button:disabled{opacity:.35;cursor:not-allowed}
.gqdc-f-lbl{font-size:11px;color:#93a2ac;flex:1}
.gqdc-f-add{appearance:none;background:transparent;border:1px dashed #2a4a52;
  color:#34d8e8;border-radius:6px;font:inherit;font-size:11px;padding:5px;cursor:pointer}
.gqdc-f-asset{display:flex;flex-direction:column;gap:5px}
`;
function gn({ tenantId: e }) {
  var Te;
  const t = Pe.useRouter(), n = Pe.usePathname(), [r, s] = P("desktop"), [o, f] = P(ue), d = ee(null), v = ee(!1), i = ee(o), u = ee(n), a = typeof window < "u" ? window.location.origin : "", h = rt(
    (_) => {
      var X;
      const q = Yt(_, u.current), B = (X = d.current) == null ? void 0 : X.contentWindow;
      q && B && (u.current = q, ye(B, { type: "gq-preview:navigate", route: q }, a));
    },
    { wait: 250 }
  ), c = M(
    (_) => {
      var B;
      i.current = _;
      const q = (B = d.current) == null ? void 0 : B.contentWindow;
      v.current && q && ye(q, { type: "gq-preview:applyPreview", config: _ }, a);
    },
    [a]
  ), { draft: p, set: m, reset: x, discard: E, commitSaved: k, isModified: j, isDirty: L } = tn(o, {
    onApply: c
  }), [A, w] = P(!1), O = M(async () => {
    w(!0);
    try {
      (await fetch(`/api/brand/${encodeURIComponent(e)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(p)
      })).ok && k();
    } catch {
    } finally {
      w(!1);
    }
  }, [e, p, k]);
  pe(() => {
    let _ = !1;
    return fetch(`/api/brand/${encodeURIComponent(e)}`, {
      headers: { Accept: "application/json" }
    }).then((q) => q.ok ? q.json() : null).then((q) => {
      !_ && q && f(Vt(q));
    }).catch(() => {
    }), () => {
      _ = !0;
    };
  }, [e]), pe(() => gt(
    window,
    (q) => {
      var B;
      if (q.type === "gq-preview:ready") {
        v.current = !0;
        const X = (B = d.current) == null ? void 0 : B.contentWindow;
        X && ye(X, { type: "gq-preview:applyPreview", config: i.current }, a);
      } else q.type === "gq-preview:routeChanged" && (u.current = q.route);
    },
    { expectedOrigin: a }
  ), [a]);
  const H = xe(() => {
    const _ = typeof window < "u" ? window.location.search : "";
    return Wt(`${n}${_}`);
  }, [n]), ct = ((Te = Fe.find((_) => _.id === r)) == null ? void 0 : Te.width) ?? 1440;
  return /* @__PURE__ */ g.jsxs("div", { className: "gqdc-root", role: "region", "aria-label": "Design configurator", children: [
    /* @__PURE__ */ g.jsx("style", { children: dn }),
    /* @__PURE__ */ g.jsxs("div", { className: "gqdc-top", children: [
      /* @__PURE__ */ g.jsxs("span", { className: "gqdc-brand", children: [
        /* @__PURE__ */ g.jsx("span", { className: "gqdc-dot" }),
        "GrowQuest Studio",
        /* @__PURE__ */ g.jsxs("span", { className: "gqdc-tenant", children: [
          "· ",
          e
        ] })
      ] }),
      /* @__PURE__ */ g.jsx("div", { className: "gqdc-seg", role: "group", "aria-label": "Device preview width", children: Fe.map((_) => /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          "aria-pressed": r === _.id,
          onClick: () => s(_.id),
          children: _.label
        },
        _.id
      )) }),
      /* @__PURE__ */ g.jsxs("div", { className: "gqdc-actions", children: [
        /* @__PURE__ */ g.jsxs(
          "button",
          {
            type: "button",
            className: "gqdc-btn gqdc-save",
            disabled: !L || A,
            onClick: O,
            children: [
              L && /* @__PURE__ */ g.jsx("span", { className: "gqdc-dirty" }),
              A ? "Saving…" : "Save"
            ]
          }
        ),
        /* @__PURE__ */ g.jsx(
          "button",
          {
            type: "button",
            className: "gqdc-btn gqdc-ghost",
            disabled: !L || A,
            onClick: E,
            children: "Discard"
          }
        ),
        /* @__PURE__ */ g.jsx(
          "button",
          {
            type: "button",
            className: "gqdc-btn gqdc-ghost",
            onClick: () => t.replace(n),
            children: "Exit"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "gqdc-body", children: [
      /* @__PURE__ */ g.jsx("div", { className: "gqdc-stage", children: /* @__PURE__ */ g.jsx(
        "iframe",
        {
          ref: d,
          title: "Live preview",
          className: "gqdc-frame",
          src: H,
          style: { width: `${ct}px` }
        }
      ) }),
      /* @__PURE__ */ g.jsxs("aside", { className: "gqdc-inspector", "aria-label": "Inspector", children: [
        /* @__PURE__ */ g.jsxs("div", { className: "gqdc-insp-h", children: [
          "Inspector",
          L && /* @__PURE__ */ g.jsx("span", { className: "gqdc-insp-dirty", children: "unsaved" })
        ] }),
        /* @__PURE__ */ g.jsx(
          ln,
          {
            draft: p,
            isModified: j,
            onSet: m,
            onReset: x,
            onActivateGroup: h
          }
        )
      ] })
    ] })
  ] });
}
export {
  gn as DesignConfigurator
};
