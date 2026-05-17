var je = (e) => {
  throw TypeError(e);
};
var De = (e, t, n) => t.has(e) || je("Cannot " + n);
var p = (e, t, n) => (De(e, t, "read from private field"), n ? n.call(e) : t.get(e)), k = (e, t, n) => t.has(e) ? je("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), E = (e, t, n, r) => (De(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Pe = (e, t, n, r) => ({
  set _(s) {
    E(e, t, s, n);
  },
  get _() {
    return p(e, t, r);
  }
});
import { u as dt, D as pe, P as ut, a as pt, p as Xe, c as ft, j as l, g as gt, f as ht, n as Re, s as ye, b as bt } from "./index-icNreKhD.js";
import xe, { useCallback as M, useState as P, useEffect as se, useMemo as ve, useRef as ee } from "react";
function mt(e) {
  return typeof e == "function";
}
function Me(e, ...t) {
  return mt(e) ? e(...t) : e;
}
var U, j, L, ie, I, H, $, J, oe, be, W, Q, z, ae, Y, me;
class xt {
  constructor({
    pluginId: t,
    debug: n = !1,
    enabled: r = !0,
    reconnectEveryMs: s = 300
  }) {
    k(this, U, !0);
    k(this, j);
    k(this, L);
    k(this, ie);
    k(this, I);
    k(this, H);
    k(this, $);
    k(this, J);
    k(this, oe, 0);
    k(this, be, 5);
    k(this, W, !1);
    k(this, Q, !1);
    k(this, z, null);
    k(this, ae, () => {
      this.debugLog("Connected to event bus"), E(this, H, !0), E(this, W, !1), this.debugLog("Emitting queued events", p(this, I)), p(this, I).forEach((t) => this.emitEventToBus(t)), E(this, I, []), this.stopConnectLoop(), p(this, L).call(this).removeEventListener(
        "tanstack-connect-success",
        p(this, ae)
      );
    });
    // fired off right away and then at intervals
    k(this, Y, () => {
      if (p(this, oe) < p(this, be)) {
        Pe(this, oe)._++, this.dispatchCustomEvent("tanstack-connect", {});
        return;
      }
      p(this, L).call(this).removeEventListener(
        "tanstack-connect",
        p(this, Y)
      ), E(this, Q, !0), this.debugLog("Max retries reached, giving up on connection"), this.stopConnectLoop();
    });
    // This is run to register connection handlers on first emit attempt
    k(this, me, () => {
      p(this, W) || (E(this, W, !0), p(this, L).call(this).addEventListener(
        "tanstack-connect-success",
        p(this, ae)
      ), p(this, Y).call(this));
    });
    E(this, j, t), E(this, U, r), E(this, L, this.getGlobalTarget), E(this, ie, n), this.debugLog(" Initializing event subscription for plugin", p(this, j)), E(this, I, []), E(this, H, !1), E(this, Q, !1), E(this, $, null), E(this, J, s);
  }
  startConnectLoop() {
    p(this, $) !== null || p(this, H) || (this.debugLog(`Starting connect loop (every ${p(this, J)}ms)`), E(this, $, setInterval(
      p(this, Y),
      p(this, J)
    )));
  }
  stopConnectLoop() {
    E(this, W, !1), p(this, $) !== null && (clearInterval(p(this, $)), E(this, $, null), E(this, I, []), this.debugLog("Stopped connect loop"));
  }
  debugLog(...t) {
    p(this, ie) && console.log(`🌴 [tanstack-devtools:${p(this, j)}-plugin]`, ...t);
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
    return p(this, j);
  }
  dispatchCustomEventShim(t, n) {
    try {
      const r = new Event(t, {
        detail: n
      });
      p(this, L).call(this).dispatchEvent(r);
    } catch {
      this.debugLog("Failed to dispatch shim event");
    }
  }
  dispatchCustomEvent(t, n) {
    try {
      p(this, L).call(this).dispatchEvent(new CustomEvent(t, { detail: n }));
    } catch {
      this.dispatchCustomEventShim(t, n);
    }
  }
  emitEventToBus(t) {
    this.debugLog("Emitting event to client bus", t), this.dispatchCustomEvent("tanstack-dispatch-event", t);
  }
  createEventPayload(t, n) {
    return {
      type: `${p(this, j)}:${t}`,
      payload: n,
      pluginId: p(this, j)
    };
  }
  emit(t, n) {
    if (!p(this, U)) {
      this.debugLog(
        "Event bus client is disabled, not emitting event",
        t,
        n
      );
      return;
    }
    if (p(this, z) && (this.debugLog(
      "Emitting event to internal event target",
      t,
      n
    ), p(this, z).dispatchEvent(
      new CustomEvent(`${p(this, j)}:${t}`, {
        detail: this.createEventPayload(t, n)
      })
    )), p(this, Q)) {
      this.debugLog("Previously failed to connect, not emitting to bus");
      return;
    }
    if (!p(this, H)) {
      this.debugLog("Bus not available, will be pushed as soon as connected"), p(this, I).push(this.createEventPayload(t, n)), typeof CustomEvent < "u" && !p(this, W) && (p(this, me).call(this), this.startConnectLoop());
      return;
    }
    return this.emitEventToBus(this.createEventPayload(t, n));
  }
  on(t, n, r) {
    const s = (r == null ? void 0 : r.withEventTarget) ?? !1, a = `${p(this, j)}:${t}`;
    if (s && (p(this, z) || E(this, z, new EventTarget()), p(this, z).addEventListener(a, (d) => {
      n(d.detail);
    })), !p(this, U))
      return this.debugLog(
        "Event bus client is disabled, not registering event",
        a
      ), () => {
      };
    const f = (d) => {
      this.debugLog("Received event from bus", d.detail), n(d.detail);
    };
    return p(this, L).call(this).addEventListener(a, f), this.debugLog("Registered event to bus", a), () => {
      var d;
      s && ((d = p(this, z)) == null || d.removeEventListener(a, f)), p(this, L).call(this).removeEventListener(a, f);
    };
  }
  onAll(t) {
    if (!p(this, U))
      return this.debugLog("Event bus client is disabled, not registering event"), () => {
      };
    const n = (r) => {
      const s = r.detail;
      t(s);
    };
    return p(this, L).call(this).addEventListener("tanstack-devtools-global", n), () => p(this, L).call(this).removeEventListener(
      "tanstack-devtools-global",
      n
    );
  }
  onAllPluginEvents(t) {
    if (!p(this, U))
      return this.debugLog("Event bus client is disabled, not registering event"), () => {
      };
    const n = (r) => {
      const s = r.detail;
      p(this, j) && s.pluginId !== p(this, j) || t(s);
    };
    return p(this, L).call(this).addEventListener("tanstack-devtools-global", n), () => p(this, L).call(this).removeEventListener(
      "tanstack-devtools-global",
      n
    );
  }
}
U = new WeakMap(), j = new WeakMap(), L = new WeakMap(), ie = new WeakMap(), I = new WeakMap(), H = new WeakMap(), $ = new WeakMap(), J = new WeakMap(), oe = new WeakMap(), be = new WeakMap(), W = new WeakMap(), Q = new WeakMap(), z = new WeakMap(), ae = new WeakMap(), Y = new WeakMap(), me = new WeakMap();
const vt = /* @__PURE__ */ new Map();
function yt(e, t) {
  vt.set(e, t);
}
function Ae(e) {
  if (e !== void 0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      return null;
    }
}
function Et(e) {
  return typeof e.get == "function" ? e.get() : e.state;
}
function kt(e) {
  return {
    key: e.key,
    store: { state: Ae(Et(e.store)) },
    options: Ae(e.options)
  };
}
var wt = class extends xt {
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
const qt = (e, t) => {
  const n = t.key;
  n && (yt(n, t), et.emit(e, kt({
    ...t,
    key: n
  })));
}, et = new wt();
let b = /* @__PURE__ */ function(e) {
  return e[e.None = 0] = "None", e[e.Mutable = 1] = "Mutable", e[e.Watching = 2] = "Watching", e[e.RecursedCheck = 4] = "RecursedCheck", e[e.Recursed = 8] = "Recursed", e[e.Dirty = 16] = "Dirty", e[e.Pending = 32] = "Pending", e;
}({});
// @__NO_SIDE_EFFECTS__
function St({ update: e, notify: t, unwatched: n }) {
  return {
    link: r,
    unlink: s,
    propagate: a,
    checkDirty: f,
    shallowPropagate: d
  };
  function r(i, c, o) {
    const h = c.depsTail;
    if (h !== void 0 && h.dep === i) return;
    const u = h !== void 0 ? h.nextDep : c.deps;
    if (u !== void 0 && u.dep === i) {
      u.version = o, c.depsTail = u;
      return;
    }
    const g = i.subsTail;
    if (g !== void 0 && g.version === o && g.sub === c) return;
    const m = c.depsTail = i.subsTail = {
      version: o,
      dep: i,
      sub: c,
      prevDep: h,
      nextDep: u,
      prevSub: g,
      nextSub: void 0
    };
    u !== void 0 && (u.prevDep = m), h !== void 0 ? h.nextDep = m : c.deps = m, g !== void 0 ? g.nextSub = m : i.subs = m;
  }
  function s(i, c = i.sub) {
    const o = i.dep, h = i.prevDep, u = i.nextDep, g = i.nextSub, m = i.prevSub;
    return u !== void 0 ? u.prevDep = h : c.depsTail = h, h !== void 0 ? h.nextDep = u : c.deps = u, g !== void 0 ? g.prevSub = m : o.subsTail = m, m !== void 0 ? m.nextSub = g : (o.subs = g) === void 0 && n(o), u;
  }
  function a(i) {
    let c = i.nextSub, o;
    e: do {
      const h = i.sub;
      let u = h.flags;
      if (u & (b.RecursedCheck | b.Recursed | b.Dirty | b.Pending) ? u & (b.RecursedCheck | b.Recursed) ? u & b.RecursedCheck ? !(u & (b.Dirty | b.Pending)) && x(i, h) ? (h.flags = u | (b.Recursed | b.Pending), u &= b.Mutable) : u = b.None : h.flags = u & ~b.Recursed | b.Pending : u = b.None : h.flags = u | b.Pending, u & b.Watching && t(h), u & b.Mutable) {
        const g = h.subs;
        if (g !== void 0) {
          const m = (i = g).nextSub;
          m !== void 0 && (o = {
            value: c,
            prev: o
          }, c = m);
          continue;
        }
      }
      if ((i = c) !== void 0) {
        c = i.nextSub;
        continue;
      }
      for (; o !== void 0; )
        if (i = o.value, o = o.prev, i !== void 0) {
          c = i.nextSub;
          continue e;
        }
      break;
    } while (!0);
  }
  function f(i, c) {
    let o, h = 0, u = !1;
    e: do {
      const g = i.dep, m = g.flags;
      if (c.flags & b.Dirty) u = !0;
      else if ((m & (b.Mutable | b.Dirty)) === (b.Mutable | b.Dirty)) {
        if (e(g)) {
          const v = g.subs;
          v.nextSub !== void 0 && d(v), u = !0;
        }
      } else if ((m & (b.Mutable | b.Pending)) === (b.Mutable | b.Pending)) {
        (i.nextSub !== void 0 || i.prevSub !== void 0) && (o = {
          value: i,
          prev: o
        }), i = g.deps, c = g, ++h;
        continue;
      }
      if (!u) {
        const v = i.nextDep;
        if (v !== void 0) {
          i = v;
          continue;
        }
      }
      for (; h--; ) {
        const v = c.subs, y = v.nextSub !== void 0;
        if (y ? (i = o.value, o = o.prev) : i = v, u) {
          if (e(c)) {
            y && d(v), c = i.sub;
            continue;
          }
          u = !1;
        } else c.flags &= ~b.Pending;
        c = i.sub;
        const q = i.nextDep;
        if (q !== void 0) {
          i = q;
          continue e;
        }
      }
      return u;
    } while (!0);
  }
  function d(i) {
    do {
      const c = i.sub, o = c.flags;
      (o & (b.Pending | b.Dirty)) === b.Pending && (c.flags = o | b.Dirty, (o & (b.Watching | b.RecursedCheck)) === b.Watching && t(c));
    } while ((i = i.nextSub) !== void 0);
  }
  function x(i, c) {
    let o = c.depsTail;
    for (; o !== void 0; ) {
      if (o === i) return !0;
      o = o.prevDep;
    }
    return !1;
  }
}
function tt(e, t, n) {
  var a, f, d;
  const r = typeof e == "object", s = r ? e : void 0;
  return {
    next: (a = r ? e.next : e) == null ? void 0 : a.bind(s),
    error: (f = r ? e.error : t) == null ? void 0 : f.bind(s),
    complete: (d = r ? e.complete : n) == null ? void 0 : d.bind(s)
  };
}
const Ce = [];
let ue = 0;
const { link: Ie, unlink: _t, propagate: Ct, checkDirty: nt, shallowPropagate: $e } = /* @__PURE__ */ St({
  update(e) {
    return e._update();
  },
  notify(e) {
    Ce[Oe++] = e, e.flags &= ~b.Watching;
  },
  unwatched(e) {
    e.depsTail !== void 0 && (e.depsTail = void 0, e.flags = b.Mutable | b.Dirty, fe(e));
  }
});
let le = 0, Oe = 0, R;
function fe(e) {
  const t = e.depsTail;
  let n = t !== void 0 ? t.nextDep : e.deps;
  for (; n !== void 0; ) n = _t(n, e);
}
function Ot() {
  for (; le < Oe; ) {
    const e = Ce[le];
    Ce[le++] = void 0, e.notify();
  }
  le = 0, Oe = 0;
}
function Lt(e, t) {
  const n = typeof e == "function", r = e, s = {
    _snapshot: n ? void 0 : e,
    subs: void 0,
    subsTail: void 0,
    deps: void 0,
    depsTail: void 0,
    flags: n ? b.None : b.Mutable,
    get() {
      return R !== void 0 && Ie(s, R, ue), s._snapshot;
    },
    subscribe(a) {
      const f = tt(a), d = { current: !1 }, x = Tt(() => {
        var i;
        s.get(), d.current ? (i = f.next) == null || i.call(f, s._snapshot) : d.current = !0;
      });
      return { unsubscribe: () => {
        x.stop();
      } };
    },
    _update(a) {
      const f = R, d = Object.is;
      if (n)
        R = s, ++ue, s.depsTail = void 0;
      else if (a === void 0) return !1;
      n && (s.flags = b.Mutable | b.RecursedCheck);
      try {
        const x = s._snapshot, i = typeof a == "function" ? a(x) : a === void 0 && n ? r(x) : a;
        return x === void 0 || !d(x, i) ? (s._snapshot = i, !0) : !1;
      } finally {
        R = f, n && (s.flags &= ~b.RecursedCheck), fe(s);
      }
    }
  };
  return n ? (s.flags = b.Mutable | b.Dirty, s.get = function() {
    const a = s.flags;
    if (a & b.Dirty || a & b.Pending && nt(s.deps, s)) {
      if (s._update()) {
        const f = s.subs;
        f !== void 0 && $e(f);
      }
    } else a & b.Pending && (s.flags = a & ~b.Pending);
    return R !== void 0 && Ie(s, R, ue), s._snapshot;
  }) : s.set = function(a) {
    if (s._update(a)) {
      const f = s.subs;
      f !== void 0 && (Ct(f), $e(f), Ot());
    }
  }, s;
}
function Tt(e) {
  const t = () => {
    const r = R;
    R = n, ++ue, n.depsTail = void 0, n.flags = b.Watching | b.RecursedCheck;
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
      r & b.Dirty || r & b.Pending && nt(this.deps, this) ? t() : this.flags = b.Watching;
    },
    stop() {
      this.flags = b.None, this.depsTail = void 0, fe(this);
    }
  };
  return t(), n;
}
var Nt = class {
  constructor(e, t) {
    this.atom = Lt(e), this.get = this.get.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), t && (this.actions = t(this));
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
    return this.atom.subscribe(tt(e));
  }
};
function ze(e, t) {
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
var Le = { exports: {} }, Ee = {}, de = { exports: {} }, ke = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ge;
function jt() {
  if (Ge) return ke;
  Ge = 1;
  var e = xe;
  function t(o, h) {
    return o === h && (o !== 0 || 1 / o === 1 / h) || o !== o && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, s = e.useEffect, a = e.useLayoutEffect, f = e.useDebugValue;
  function d(o, h) {
    var u = h(), g = r({ inst: { value: u, getSnapshot: h } }), m = g[0].inst, v = g[1];
    return a(
      function() {
        m.value = u, m.getSnapshot = h, x(m) && v({ inst: m });
      },
      [o, u, h]
    ), s(
      function() {
        return x(m) && v({ inst: m }), o(function() {
          x(m) && v({ inst: m });
        });
      },
      [o]
    ), f(u), u;
  }
  function x(o) {
    var h = o.getSnapshot;
    o = o.value;
    try {
      var u = h();
      return !n(o, u);
    } catch {
      return !0;
    }
  }
  function i(o, h) {
    return h();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? i : d;
  return ke.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, ke;
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
var Ue;
function Dt() {
  return Ue || (Ue = 1, process.env.NODE_ENV !== "production" && function() {
    function e(u, g) {
      return u === g && (u !== 0 || 1 / u === 1 / g) || u !== u && g !== g;
    }
    function t(u, g) {
      c || s.startTransition === void 0 || (c = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var m = g();
      if (!o) {
        var v = g();
        a(m, v) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), o = !0);
      }
      v = f({
        inst: { value: m, getSnapshot: g }
      });
      var y = v[0].inst, q = v[1];
      return x(
        function() {
          y.value = m, y.getSnapshot = g, n(y) && q({ inst: y });
        },
        [u, m, g]
      ), d(
        function() {
          return n(y) && q({ inst: y }), u(function() {
            n(y) && q({ inst: y });
          });
        },
        [u]
      ), i(m), m;
    }
    function n(u) {
      var g = u.getSnapshot;
      u = u.value;
      try {
        var m = g();
        return !a(u, m);
      } catch {
        return !0;
      }
    }
    function r(u, g) {
      return g();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var s = xe, a = typeof Object.is == "function" ? Object.is : e, f = s.useState, d = s.useEffect, x = s.useLayoutEffect, i = s.useDebugValue, c = !1, o = !1, h = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    we.useSyncExternalStore = s.useSyncExternalStore !== void 0 ? s.useSyncExternalStore : h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), we;
}
var We;
function st() {
  return We || (We = 1, process.env.NODE_ENV === "production" ? de.exports = jt() : de.exports = Dt()), de.exports;
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
var Be;
function Pt() {
  if (Be) return Ee;
  Be = 1;
  var e = xe, t = st();
  function n(i, c) {
    return i === c && (i !== 0 || 1 / i === 1 / c) || i !== i && c !== c;
  }
  var r = typeof Object.is == "function" ? Object.is : n, s = t.useSyncExternalStore, a = e.useRef, f = e.useEffect, d = e.useMemo, x = e.useDebugValue;
  return Ee.useSyncExternalStoreWithSelector = function(i, c, o, h, u) {
    var g = a(null);
    if (g.current === null) {
      var m = { hasValue: !1, value: null };
      g.current = m;
    } else m = g.current;
    g = d(
      function() {
        function y(w) {
          if (!q) {
            if (q = !0, _ = w, w = h(w), u !== void 0 && m.hasValue) {
              var O = m.value;
              if (u(O, w))
                return T = O;
            }
            return T = w;
          }
          if (O = T, r(_, w)) return O;
          var F = h(w);
          return u !== void 0 && u(O, F) ? (_ = w, O) : (_ = w, T = F);
        }
        var q = !1, _, T, A = o === void 0 ? null : o;
        return [
          function() {
            return y(c());
          },
          A === null ? void 0 : function() {
            return y(A());
          }
        ];
      },
      [c, o, h, u]
    );
    var v = s(i, g[0], g[1]);
    return f(
      function() {
        m.hasValue = !0, m.value = v;
      },
      [v]
    ), x(v), v;
  }, Ee;
}
var qe = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function Rt() {
  return Fe || (Fe = 1, process.env.NODE_ENV !== "production" && function() {
    function e(i, c) {
      return i === c && (i !== 0 || 1 / i === 1 / c) || i !== i && c !== c;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = xe, n = st(), r = typeof Object.is == "function" ? Object.is : e, s = n.useSyncExternalStore, a = t.useRef, f = t.useEffect, d = t.useMemo, x = t.useDebugValue;
    qe.useSyncExternalStoreWithSelector = function(i, c, o, h, u) {
      var g = a(null);
      if (g.current === null) {
        var m = { hasValue: !1, value: null };
        g.current = m;
      } else m = g.current;
      g = d(
        function() {
          function y(w) {
            if (!q) {
              if (q = !0, _ = w, w = h(w), u !== void 0 && m.hasValue) {
                var O = m.value;
                if (u(O, w))
                  return T = O;
              }
              return T = w;
            }
            if (O = T, r(_, w))
              return O;
            var F = h(w);
            return u !== void 0 && u(O, F) ? (_ = w, O) : (_ = w, T = F);
          }
          var q = !1, _, T, A = o === void 0 ? null : o;
          return [
            function() {
              return y(c());
            },
            A === null ? void 0 : function() {
              return y(A());
            }
          ];
        },
        [c, o, h, u]
      );
      var v = s(i, g[0], g[1]);
      return f(
        function() {
          m.hasValue = !0, m.value = v;
        },
        [v]
      ), x(v), v;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), qe;
}
process.env.NODE_ENV === "production" ? Le.exports = Pt() : Le.exports = Rt();
var Mt = Le.exports;
function At(e, t) {
  return e === t;
}
function He(e, t = (r) => r, n) {
  const r = (n == null ? void 0 : n.compare) ?? At, s = M((f) => {
    const { unsubscribe: d } = e.subscribe(f);
    return d;
  }, [e]), a = M(() => e.get(), [e]);
  return Mt.useSyncExternalStoreWithSelector(s, a, a, t, r);
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
const It = {
  enabled: !0,
  leading: !1,
  trailing: !0,
  wait: 0
};
var V, D, B, ce, K, Z, Ze, $t = (Ze = class {
  constructor(e, t) {
    k(this, V);
    k(this, D);
    /**
    * Returns the current enabled state of the debouncer
    */
    k(this, B);
    /**
    * Returns the current wait time in milliseconds
    */
    k(this, ce);
    k(this, K);
    k(this, Z);
    this.fn = e, this.store = new Nt(Ke()), this.setOptions = (n) => {
      this.options = {
        ...this.options,
        ...n
      }, p(this, B).call(this) || this.cancel();
    }, E(this, D, (n) => {
      this.store.setState((r) => {
        const s = {
          ...r,
          ...n
        }, { isPending: a } = s;
        return {
          ...s,
          status: p(this, B).call(this) ? a ? "pending" : "idle" : "disabled"
        };
      }), qt("Debouncer", this);
    }), E(this, B, () => !!Me(this.options.enabled, this)), E(this, ce, () => Me(this.options.wait, this)), this.maybeExecute = (...n) => {
      if (!p(this, B).call(this)) return;
      p(this, D).call(this, { maybeExecuteCount: this.store.state.maybeExecuteCount + 1 });
      let r = !1;
      this.options.leading && this.store.state.canLeadingExecute && (p(this, D).call(this, { canLeadingExecute: !1 }), r = !0, p(this, K).call(this, ...n)), this.options.trailing && p(this, D).call(this, {
        isPending: !0,
        lastArgs: n
      }), p(this, V) && clearTimeout(p(this, V)), E(this, V, setTimeout(() => {
        p(this, D).call(this, { canLeadingExecute: !0 }), this.options.trailing && !r && p(this, K).call(this, ...n);
      }, p(this, ce).call(this)));
    }, E(this, K, (...n) => {
      var r, s;
      p(this, B).call(this) && (this.fn(...n), p(this, D).call(this, {
        executionCount: this.store.state.executionCount + 1,
        isPending: !1,
        lastArgs: void 0
      }), (s = (r = this.options).onExecute) == null || s.call(r, n, this));
    }), this.flush = () => {
      this.store.state.isPending && this.store.state.lastArgs && (p(this, Z).call(this), p(this, K).call(this, ...this.store.state.lastArgs));
    }, E(this, Z, () => {
      p(this, V) && (clearTimeout(p(this, V)), E(this, V, void 0));
    }), this.cancel = () => {
      p(this, Z).call(this), p(this, D).call(this, {
        canLeadingExecute: !0,
        isPending: !1
      });
    }, this.reset = () => {
      p(this, D).call(this, Ke());
    }, this.key = t.key, this.options = {
      ...It,
      ...t
    }, p(this, D).call(this, this.options.initialState ?? {}), this.key && et.on("d-Debouncer", (n) => {
      n.payload.key === this.key && (p(this, D).call(this, n.payload.store.state), this.setOptions(n.payload.options));
    });
  }
}, V = new WeakMap(), D = new WeakMap(), B = new WeakMap(), ce = new WeakMap(), K = new WeakMap(), Z = new WeakMap(), Ze);
function zt(e, t, n = () => ({})) {
  const r = {
    ...dt().debouncer,
    ...t
  }, [s] = P(() => {
    const f = new $t(e, r);
    return f.Subscribe = function(x) {
      const i = He(f.store, x.selector, { compare: ze });
      return typeof x.children == "function" ? x.children(i) : x.children;
    }, f;
  });
  s.fn = e, s.setOptions(r), se(() => () => {
    r.onUnmount ? r.onUnmount(s) : s.cancel();
  }, []);
  const a = He(s.store, n, { compare: ze });
  return ve(() => ({
    ...s,
    state: a
  }), [s, a]);
}
function rt(e, t) {
  const n = zt(e, t).maybeExecute;
  return M((...r) => n(...r), [n]);
}
const Vt = /* @__PURE__ */ new Set(["dark", "light"]);
function Gt(e) {
  if (!te(e)) return pe;
  const t = ge(e.mode) && Vt.has(e.mode) ? e.mode : pe.mode, n = Ut(e.brand), r = {
    schemaVersion: Wt(e.schemaVersion) ? e.schemaVersion : 1,
    tenantId: ge(e.tenantId) ? e.tenantId : void 0,
    mode: t,
    brand: n
  };
  return te(e.content) && (r.content = e.content), te(e.assets) && (r.assets = e.assets), te(e.overrides) && (r.overrides = e.overrides), r;
}
function Ut(e) {
  if (!te(e) || !ge(e.primary)) return pe.brand;
  const t = { primary: e.primary };
  return ge(e.secondary) && (t.secondary = e.secondary), t;
}
function te(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ge(e) {
  return typeof e == "string";
}
function Wt(e) {
  return typeof e == "number" && Number.isFinite(e);
}
const Je = [
  { id: "desktop", label: "Desktop", width: 1440 },
  { id: "tablet", label: "Tablet", width: 834 },
  { id: "mobile", label: "Mobile", width: 390 }
];
function Bt(e) {
  const t = e && e.length > 0 ? e : "/", n = t.indexOf("?"), r = n === -1 ? t : t.slice(0, n), s = new URLSearchParams(n === -1 ? "" : t.slice(n + 1));
  return s.delete("preview"), s.set("preview", "embed"), `${r}?${s.toString()}`;
}
const it = [
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
const Ft = {
  brand: "brand",
  nav: "nav",
  footer: "footer",
  onboarding: "onboarding",
  leaderboard: "leaderboard",
  profile: "profile",
  missions: "missions"
};
function ot(e, t) {
  return e === null || typeof e != "object" || Array.isArray(e) ? [{ path: t, isArray: Array.isArray(e) }] : Object.entries(e).flatMap(
    ([n, r]) => ot(r, t ? `${t}.${n}` : n)
  );
}
function Ht() {
  return ot(pt, "content").map(({ path: e, isArray: t }) => {
    const n = e.split("."), r = n[1], s = n[n.length - 1], a = t ? "list" : s === "body" ? "textarea" : "text";
    return { path: e, label: ne(s), kind: a, group: Ft[r] };
  });
}
const N = (e) => e.map((t) => ({ slot: t, kind: "color" })), Kt = [
  {
    recipe: "missionCard",
    group: "missions",
    fields: [
      ...N(["panel", "panel2", "border", "title", "body", "iconBoxBg", "iconBoxBorder", "ctaFg"]),
      { slot: "haloOpacity", kind: "range", min: 0, max: 1, step: 0.01 }
    ]
  },
  {
    recipe: "missionModal",
    group: "missions",
    fields: N([
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
    fields: N(["panel", "panel2", "border", "title", "body", "imageArea", "imageAreaBorder"])
  },
  {
    recipe: "heroBanner",
    group: "missions",
    fields: [
      ...N(["panel", "border"]),
      { slot: "overlayGradient", kind: "text" },
      { slot: "overlayMode", kind: "select", options: ["always", "eyebrow-only", "never"] }
    ]
  },
  {
    recipe: "onboardingCard",
    group: "onboarding",
    fields: N([
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
      ...N(["rowPanel", "rowBorder", "headPanel", "headText", "mineHighlight", "topRankColor"]),
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
    fields: N([
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
      ...N(["panel", "panelCurrent"])
    ]
  },
  {
    recipe: "badgeGrid",
    group: "profile",
    fields: [...N(["panel", "border", "lockedFg"]), { slot: "unlockedTones", kind: "list" }]
  },
  {
    recipe: "statCard",
    group: "profile",
    fields: N(["trendDefault", "trendStreak", "trendRewards"])
  },
  { recipe: "xpChart", group: "profile", fields: N(["gradientFrom", "gradientTo"]) },
  {
    recipe: "topNav",
    group: "nav",
    fields: N(["panel", "border", "linkColor", "linkColorActive", "linkBgActive"])
  },
  { recipe: "footer", group: "footer", fields: N(["panel", "border", "textColor", "brandColor"]) }
];
function Jt() {
  return Kt.flatMap(
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
function Qt() {
  const e = [];
  e.push({ path: "mode", label: "Mode", kind: "mode", group: "theme" }), e.push({ path: "brand.primary", label: "Primary", kind: "color", group: "brand" }), e.push({ path: "brand.secondary", label: "Secondary", kind: "color", group: "brand" }), e.push(...Ht());
  for (const n of Object.keys(ut.dark))
    e.push({
      path: `overrides.palette.${n}`,
      label: ne(n),
      kind: "color",
      group: "palette"
    });
  const t = { card: 14, button: 8, tag: 4, modal: 16 };
  for (const n of ["card", "button", "tag", "modal"])
    e.push({
      path: `overrides.radius.${n}`,
      label: `Radius ${ne(n)}`,
      kind: "lengthPx",
      group: "shape",
      min: 0,
      max: 32,
      step: 1,
      default: t[n]
    });
  for (const n of ["display", "ui", "mono"])
    e.push({
      path: `overrides.fonts.${n}`,
      label: `Font ${ne(n)}`,
      kind: "text",
      group: "shape"
    });
  return e.push(...Jt()), e.push({
    path: "assets.onboardingHero",
    label: "Onboarding hero",
    kind: "asset",
    group: "assets"
  }), e.push({ path: "assets.missionsHero", label: "Missions hero", kind: "asset", group: "assets" }), e;
}
const at = Qt();
function Yt(e) {
  return at.filter((t) => t.group === e);
}
function Zt(e) {
  const t = it.find((n) => n.id === e);
  return (t == null ? void 0 : t.scope) === "page" ? t.route : void 0;
}
function Xt(e, t) {
  const n = Zt(e);
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
function Te(e, t, n) {
  const r = t.split("."), [s, ...a] = r, f = re(e) ? { ...e } : {};
  if (a.length === 0)
    f[s] = n;
  else {
    const d = re(f[s]) ? f[s] : {};
    f[s] = Te(d, a.join("."), n);
  }
  return f;
}
function ct(e, t) {
  const n = t.split("."), [r, ...s] = n, a = re(e) ? { ...e } : {};
  return s.length === 0 ? delete a[r] : re(a[r]) && (a[r] = ct(a[r], s.join("."))), a;
}
function en(e, t) {
  return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" ? JSON.stringify(e) === JSON.stringify(t) : !1;
}
function Qe(e, t, n) {
  return n.filter((r) => !en(he(e, r), he(t, r)));
}
function tn(e, t, n) {
  const r = he(t, n);
  return r === void 0 ? ct(e, n) : Te(e, n, r);
}
const nn = at.map((e) => e.path);
function sn(e, t) {
  const [n, r] = P(e), [s, a] = P(e), [f, d] = P(e);
  e !== f && (d(e), r(e), a(e));
  const x = rt((v) => t.onApply(v), {
    wait: t.applyWaitMs ?? 120
  }), i = ee(!0);
  se(() => {
    if (i.current) {
      i.current = !1;
      return;
    }
    x(s);
  }, [s, x]);
  const c = M((v, y) => {
    a((q) => Te(q, v, y));
  }, []), o = M((v) => a((y) => tn(y, n, v)), [n]), h = M(() => a(n), [n]), u = M(() => r(s), [s]), g = ve(() => Qe(n, s, nn), [n, s]), m = M(
    (v) => Qe(n, s, [v]).length > 0,
    [n, s]
  );
  return {
    draft: s,
    set: c,
    reset: o,
    discard: h,
    commitSaved: u,
    isModified: m,
    changedPaths: g,
    isDirty: g.length > 0
  };
}
const rn = ft("oklch");
function Se(e, t) {
  const n = 10 ** t;
  return Math.round(e * n) / n;
}
function Ye(e) {
  const t = Xe(e);
  if (!t) return e;
  const n = rn(t);
  if (!n) return e;
  const r = Se(n.l ?? 0, 4), s = Se(n.c ?? 0, 4), a = Se(n.h ?? 0, 2);
  return `oklch(${r} ${s} ${a})`;
}
function on(e, t) {
  return t < 0 || t >= e.length ? e.slice() : e.filter((n, r) => r !== t);
}
function an(e, t, n) {
  const r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r || t === n) return e.slice();
  const s = e.slice(), [a] = s.splice(t, 1);
  return s.splice(n, 0, a), s;
}
function _e(e) {
  if (!e) return "IMG";
  const t = e.split(/[?#]/)[0].toLowerCase();
  return t.endsWith(".json") ? "JSON" : t.endsWith(".gif") ? "GIF" : "IMG";
}
const cn = {
  "assets.onboardingHero": {
    hint: "Replaces the built-in illustration on Onboarding. Setting it also hides the decorative chips.",
    recommended: "Recommended ≥1600×900, landscape · JPG / PNG / WebP / GIF"
  },
  "assets.missionsHero": {
    hint: "Replaces the built-in art behind the Missions hero banner text.",
    recommended: "Recommended ≥1600×600, wide · JPG / PNG / WebP / GIF"
  }
}, ln = {
  hint: "Replaces the built-in artwork. Clear to restore it.",
  recommended: "Recommended a large landscape image · JPG / PNG / WebP / GIF"
};
function dn(e) {
  return cn[e] ?? ln;
}
function un(e, t = () => new Image()) {
  return new Promise((n, r) => {
    const s = t();
    s.onload = () => n({ w: s.naturalWidth, h: s.naturalHeight }), s.onerror = () => r(new Error("image failed to load")), s.src = e;
  });
}
function pn({ id: e, def: t, value: n, onChange: r }) {
  const s = n ?? void 0, [a, f] = P("desktop"), d = a === "desktop" ? (s == null ? void 0 : s.src) ?? "" : (s == null ? void 0 : s.mobileSrc) ?? "", x = dn(t.path), i = _e(s == null ? void 0 : s.src), c = gt(), [o, h] = P({ k: "idle" });
  se(() => {
    if (!d) {
      h({ k: "idle" });
      return;
    }
    if (_e(d) === "JSON") {
      h({ k: "lottie" });
      return;
    }
    let y = !0;
    return h({ k: "checking" }), un(d).then(({ w: q, h: _ }) => y && h({ k: "ok", w: q, h: _ })).catch(() => y && h({ k: "error" })), () => {
      y = !1;
    };
  }, [d]);
  const u = (y) => {
    const _ = { ...{ src: "", type: "IMG", ...s ?? {} }, ...y };
    r({ ..._, type: _e(_.src) });
  }, g = (y) => u(a === "desktop" ? { src: y } : { mobileSrc: y }), m = o.k === "ok" ? `✓ ${o.w}×${o.h}` : o.k === "checking" ? "⏳ resolving image…" : o.k === "error" ? "⚠ couldn’t load this URL" : o.k === "lottie" ? "ⓘ Lottie — falls back to built-in for now" : "Currently: built-in art", v = `gqdc-asset-status gqdc-asset-status-${o.k}`;
  return /* @__PURE__ */ l.jsxs("span", { className: "gqdc-f-asset", children: [
    /* @__PURE__ */ l.jsxs("span", { className: "gqdc-asset-meta", children: [
      /* @__PURE__ */ l.jsx("span", { className: "gqdc-asset-hint", children: x.hint }),
      /* @__PURE__ */ l.jsx("span", { className: "gqdc-asset-badge", children: i })
    ] }),
    /* @__PURE__ */ l.jsxs("span", { className: "gqdc-asset-tabs", role: "group", "aria-label": `${t.label} variant`, children: [
      /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          "aria-label": "desktop variant",
          "aria-pressed": a === "desktop",
          onClick: () => f("desktop"),
          children: "Desktop"
        }
      ),
      /* @__PURE__ */ l.jsxs(
        "button",
        {
          type: "button",
          "aria-label": "mobile variant",
          "aria-pressed": a === "mobile",
          onClick: () => f("mobile"),
          children: [
            "Mobile",
            s != null && s.mobileSrc ? "" : " ·opt"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ l.jsx("span", { className: "gqdc-asset-preview", "aria-hidden": !0, children: d && o.k === "ok" ? /* @__PURE__ */ l.jsx("img", { src: d, alt: "" }) : /* @__PURE__ */ l.jsx("span", { className: "gqdc-asset-preview-empty", children: o.k === "checking" ? "⏳" : o.k === "error" ? "⚠" : o.k === "lottie" ? "Lottie" : "built-in art" }) }),
    /* @__PURE__ */ l.jsxs("span", { className: "gqdc-asset-row", children: [
      /* @__PURE__ */ l.jsx(
        "input",
        {
          id: e,
          "aria-label": `${t.label} URL`,
          className: "gqdc-f-input",
          placeholder: a === "desktop" ? "Paste image URL" : "Paste mobile image URL (optional)",
          value: d,
          onChange: (y) => g(y.target.value)
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          className: "gqdc-asset-upload",
          "aria-label": "Upload image",
          disabled: !c,
          title: c ? "Upload an image" : "Storage not connected",
          children: "⬆"
        }
      )
    ] }),
    /* @__PURE__ */ l.jsx("span", { className: v, children: m }),
    /* @__PURE__ */ l.jsxs("span", { className: "gqdc-asset-foot", children: [
      /* @__PURE__ */ l.jsx("span", { className: "gqdc-asset-rec", children: x.recommended }),
      s && /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          className: "gqdc-asset-clear",
          "aria-label": `Clear ${t.label}`,
          onClick: () => r(void 0),
          children: "Clear → built-in"
        }
      )
    ] })
  ] });
}
function fn({
  id: e,
  label: t,
  value: n,
  onChange: r
}) {
  const [s, a] = P(n), [f, d] = P(n);
  n !== f && (d(n), a(n));
  const x = (() => {
    const c = Xe(n);
    return c ? ht(c) : "#000000";
  })(), i = () => {
    s !== n && r(Ye(s));
  };
  return /* @__PURE__ */ l.jsxs("span", { className: "gqdc-f-color", children: [
    /* @__PURE__ */ l.jsx("span", { className: "gqdc-f-swatch", style: { background: n } }),
    /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "color",
        "aria-label": `${t} colour picker`,
        value: x,
        onChange: (c) => r(Ye(c.target.value))
      }
    ),
    /* @__PURE__ */ l.jsx(
      "input",
      {
        id: e,
        "aria-label": `${t} colour value`,
        className: "gqdc-f-input",
        value: s,
        onChange: (c) => a(c.target.value),
        onBlur: i,
        onKeyDown: (c) => c.key === "Enter" && i()
      }
    )
  ] });
}
function gn({ value: e, onChange: t }) {
  const n = Array.isArray(e) ? e : [], r = n.length > 0 && typeof n[0] == "object" && n[0] !== null, s = () => r ? Object.fromEntries(Object.keys(n[0]).map((a) => [a, ""])) : "";
  return /* @__PURE__ */ l.jsxs("div", { className: "gqdc-f-list", children: [
    n.map((a, f) => /* @__PURE__ */ l.jsxs("div", { className: "gqdc-f-listrow", children: [
      /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Move up",
          disabled: f === 0,
          onClick: () => t(an(n, f, f - 1)),
          children: "↑"
        }
      ),
      r ? Object.entries(a).map(([d, x]) => /* @__PURE__ */ l.jsx(
        "input",
        {
          "aria-label": `item ${f} ${d}`,
          className: "gqdc-f-input",
          value: String(x ?? ""),
          onChange: (i) => {
            const c = n.slice();
            c[f] = { ...a, [d]: i.target.value }, t(c);
          }
        },
        d
      )) : /* @__PURE__ */ l.jsx(
        "input",
        {
          "aria-label": `item ${f}`,
          className: "gqdc-f-input",
          value: String(a ?? ""),
          onChange: (d) => {
            const x = n.slice();
            x[f] = d.target.value, t(x);
          }
        }
      ),
      /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          "aria-label": `Remove item ${f}`,
          onClick: () => t(on(n, f)),
          children: "✕"
        }
      )
    ] }, f)),
    /* @__PURE__ */ l.jsx("button", { type: "button", className: "gqdc-f-add", onClick: () => t([...n, s()]), children: "+ Add" })
  ] });
}
function hn({ def: e, value: t, modified: n, onChange: r, onReset: s }) {
  const a = e.path;
  let f;
  switch (e.kind) {
    case "mode":
      f = /* @__PURE__ */ l.jsx("span", { className: "gqdc-f-seg", role: "group", "aria-label": e.label, children: ["dark", "light"].map((d) => /* @__PURE__ */ l.jsx("button", { type: "button", "aria-pressed": t === d, onClick: () => r(d), children: d === "dark" ? "Dark" : "Light" }, d)) });
      break;
    case "color":
      f = /* @__PURE__ */ l.jsx(fn, { id: a, label: e.label, value: String(t ?? ""), onChange: r });
      break;
    case "select":
      f = /* @__PURE__ */ l.jsx(
        "select",
        {
          id: a,
          "aria-label": e.label,
          className: "gqdc-f-input",
          value: String(t ?? ""),
          onChange: (d) => r(d.target.value),
          children: (e.options ?? []).map((d) => /* @__PURE__ */ l.jsx("option", { value: d, children: d }, d))
        }
      );
      break;
    case "number":
    case "range":
      f = /* @__PURE__ */ l.jsx(
        "input",
        {
          id: a,
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
    case "lengthPx": {
      const d = parseInt(String(t ?? ""), 10), x = Number.isFinite(d) ? d : e.default ?? 0, i = (c) => {
        const o = parseInt(c, 10);
        r(`${Number.isFinite(o) ? o : e.default ?? 0}px`);
      };
      f = /* @__PURE__ */ l.jsxs("span", { className: "gqdc-f-range", children: [
        /* @__PURE__ */ l.jsx(
          "input",
          {
            id: a,
            "aria-label": e.label,
            type: "range",
            min: e.min ?? 0,
            max: e.max ?? 32,
            step: e.step ?? 1,
            value: x,
            onChange: (c) => i(c.target.value)
          }
        ),
        /* @__PURE__ */ l.jsx(
          "input",
          {
            "aria-label": `${e.label} value`,
            type: "number",
            className: "gqdc-f-input gqdc-f-num",
            min: e.min ?? 0,
            max: e.max ?? 32,
            step: e.step ?? 1,
            value: x,
            onChange: (c) => i(c.target.value)
          }
        ),
        /* @__PURE__ */ l.jsx("span", { className: "gqdc-f-unit", "aria-hidden": !0, children: "px" })
      ] });
      break;
    }
    case "textarea":
      f = /* @__PURE__ */ l.jsx(
        "textarea",
        {
          id: a,
          "aria-label": e.label,
          className: "gqdc-f-input gqdc-f-ta",
          value: String(t ?? ""),
          onChange: (d) => r(d.target.value)
        }
      );
      break;
    case "list":
      f = /* @__PURE__ */ l.jsx(gn, { value: t, onChange: r });
      break;
    case "asset":
      f = /* @__PURE__ */ l.jsx(pn, { id: a, def: e, value: t, onChange: r });
      break;
    case "toneMap": {
      const d = t ?? {};
      f = /* @__PURE__ */ l.jsx("div", { className: "gqdc-f-list", children: Object.entries(d).map(([x, i]) => /* @__PURE__ */ l.jsxs("div", { className: "gqdc-f-listrow", children: [
        /* @__PURE__ */ l.jsx("span", { className: "gqdc-f-lbl", children: x }),
        /* @__PURE__ */ l.jsxs(
          "select",
          {
            "aria-label": `${x} tone`,
            className: "gqdc-f-input",
            value: i,
            onChange: (c) => r({ ...d, [x]: c.target.value }),
            children: [
              /* @__PURE__ */ l.jsx("option", { value: "primary", children: "primary" }),
              /* @__PURE__ */ l.jsx("option", { value: "secondary", children: "secondary" })
            ]
          }
        )
      ] }, x)) });
      break;
    }
    default:
      f = /* @__PURE__ */ l.jsx(
        "input",
        {
          id: a,
          "aria-label": e.label,
          className: "gqdc-f-input",
          value: String(t ?? ""),
          onChange: (d) => r(d.target.value)
        }
      );
  }
  return /* @__PURE__ */ l.jsxs("div", { className: "gqdc-f-row", children: [
    /* @__PURE__ */ l.jsxs("label", { className: "gqdc-f-head", htmlFor: a, children: [
      n && /* @__PURE__ */ l.jsx("span", { className: "gqdc-f-dot", "aria-hidden": !0 }),
      /* @__PURE__ */ l.jsx("span", { className: "gqdc-f-label", children: e.label }),
      n && /* @__PURE__ */ l.jsx(
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
function bn({ draft: e, isModified: t, onSet: n, onReset: r, onActivateGroup: s }) {
  const [a, f] = P(""), [d, x] = P({}), i = a.trim().toLowerCase(), c = ve(() => {
    const o = (h) => !i || h.label.toLowerCase().includes(i) || h.path.toLowerCase().includes(i);
    return it.map((h) => ({
      group: h,
      fields: Yt(h.id).filter(o)
    })).filter((h) => h.fields.length > 0);
  }, [i]);
  return /* @__PURE__ */ l.jsxs("div", { className: "gqdc-insp", children: [
    /* @__PURE__ */ l.jsx("div", { className: "gqdc-insp-search", children: /* @__PURE__ */ l.jsx(
      "input",
      {
        "aria-label": "Filter fields",
        className: "gqdc-f-input",
        placeholder: "Filter fields…",
        value: a,
        onChange: (o) => f(o.target.value)
      }
    ) }),
    c.map(({ group: o, fields: h }) => {
      const u = !i && d[o.id];
      return /* @__PURE__ */ l.jsxs("section", { className: "gqdc-grp", children: [
        /* @__PURE__ */ l.jsxs(
          "button",
          {
            type: "button",
            className: "gqdc-grp-h",
            "aria-expanded": !u,
            onClick: () => x((g) => (!g[o.id] || s == null || s(o.id), { ...g, [o.id]: !g[o.id] })),
            children: [
              /* @__PURE__ */ l.jsx("span", { children: o.label }),
              o.route && /* @__PURE__ */ l.jsx("span", { className: "gqdc-grp-route", children: o.route })
            ]
          }
        ),
        !u && /* @__PURE__ */ l.jsx("div", { className: "gqdc-grp-b", children: h.map((g) => /* @__PURE__ */ l.jsx(
          hn,
          {
            def: g,
            value: he(e, g.path),
            modified: t(g.path),
            onChange: (m) => {
              s == null || s(g.group), n(g.path, m);
            },
            onReset: () => r(g.path)
          },
          g.path
        )) })
      ] }, o.id);
    })
  ] });
}
const mn = `
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
.gqdc-f-range{display:flex;align-items:center;gap:8px}
.gqdc-f-range input[type=range]{flex:1;min-width:0;accent-color:#34d8e8;cursor:pointer}
.gqdc-f-range .gqdc-f-num{width:48px;flex:0 0 auto;text-align:right;padding:5px 6px}
.gqdc-f-range .gqdc-f-unit{color:#7e909c;font-size:11px;flex:0 0 auto}
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
.gqdc-f-asset{display:flex;flex-direction:column;gap:7px}
.gqdc-asset-meta{display:flex;align-items:flex-start;gap:8px}
.gqdc-asset-hint{flex:1;font-size:10px;line-height:1.4;color:#6b7785}
.gqdc-asset-badge{flex:0 0 auto;font-size:9px;color:#7fe9f3;border:1px solid #2a5b63;
  border-radius:4px;padding:1px 5px;letter-spacing:.04em}
.gqdc-asset-tabs{display:flex;border:1px solid #243039;border-radius:6px;overflow:hidden}
.gqdc-asset-tabs button{flex:1;appearance:none;background:transparent;border:0;
  border-right:1px solid #243039;color:#7e909c;font:inherit;font-size:11px;
  padding:5px;cursor:pointer}
.gqdc-asset-tabs button:last-child{border-right:0}
.gqdc-asset-tabs button[aria-pressed="true"]{background:rgba(52,216,232,.15);color:#7fe9f3}
.gqdc-asset-preview{display:block;height:104px;border-radius:6px;overflow:hidden;
  border:1px solid #243039;background:linear-gradient(135deg,#13202a,#0e1622)}
.gqdc-asset-preview img{width:100%;height:100%;object-fit:cover;display:block}
.gqdc-asset-preview-empty{width:100%;height:100%;display:flex;align-items:center;
  justify-content:center;font-size:10px;color:#8b93a7}
.gqdc-asset-row{display:flex;gap:6px}
.gqdc-asset-upload{flex:0 0 auto;background:#0a0e11;border:1px solid #243039;
  color:#cdd9e0;border-radius:6px;font-size:12px;padding:0 9px;cursor:pointer}
.gqdc-asset-upload:disabled{opacity:.45;cursor:not-allowed}
.gqdc-asset-status{font-size:10px;color:#6b7785}
.gqdc-asset-status-ok{color:#5fd38a}
.gqdc-asset-status-checking{color:#d7c357}
.gqdc-asset-status-error{color:#e08787}
.gqdc-asset-status-lottie{color:#7fe9f3}
.gqdc-asset-foot{display:flex;align-items:center;justify-content:space-between;gap:8px}
.gqdc-asset-rec{font-size:10px;color:#6b7785}
.gqdc-asset-clear{flex:0 0 auto;background:transparent;border:1px solid #2c3a44;
  color:#93a2ac;border-radius:5px;font:inherit;font-size:10px;padding:3px 8px;cursor:pointer}
.gqdc-asset-clear:hover{color:#cdd9e0;border-color:#3a4c58}
`;
function En({ tenantId: e }) {
  var Ne;
  const t = Re.useRouter(), n = Re.usePathname(), [r, s] = P("desktop"), [a, f] = P(pe), d = ee(null), x = ee(!1), i = ee(a), c = ee(n), o = typeof window < "u" ? window.location.origin : "", h = rt(
    (S) => {
      var X;
      const C = Xt(S, c.current), G = (X = d.current) == null ? void 0 : X.contentWindow;
      C && G && (c.current = C, ye(G, { type: "gq-preview:navigate", route: C }, o));
    },
    { wait: 250 }
  ), u = M(
    (S) => {
      var G;
      i.current = S;
      const C = (G = d.current) == null ? void 0 : G.contentWindow;
      x.current && C && ye(C, { type: "gq-preview:applyPreview", config: S }, o);
    },
    [o]
  ), { draft: g, set: m, reset: v, discard: y, commitSaved: q, isModified: _, isDirty: T } = sn(a, {
    onApply: u
  }), [A, w] = P(!1), O = M(async () => {
    w(!0);
    try {
      (await fetch(`/api/brand/${encodeURIComponent(e)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(g)
      })).ok && q();
    } catch {
    } finally {
      w(!1);
    }
  }, [e, g, q]);
  se(() => {
    let S = !1;
    return fetch(`/api/brand/${encodeURIComponent(e)}`, {
      headers: { Accept: "application/json" }
    }).then((C) => C.ok ? C.json() : null).then((C) => {
      !S && C && f(Gt(C));
    }).catch(() => {
    }), () => {
      S = !0;
    };
  }, [e]), se(() => bt(
    window,
    (C) => {
      var G;
      if (C.type === "gq-preview:ready") {
        x.current = !0;
        const X = (G = d.current) == null ? void 0 : G.contentWindow;
        X && ye(X, { type: "gq-preview:applyPreview", config: i.current }, o);
      } else C.type === "gq-preview:routeChanged" && (c.current = C.route);
    },
    { expectedOrigin: o }
  ), [o]);
  const F = ve(() => {
    const S = typeof window < "u" ? window.location.search : "";
    return Bt(`${n}${S}`);
  }, [n]), lt = ((Ne = Je.find((S) => S.id === r)) == null ? void 0 : Ne.width) ?? 1440;
  return /* @__PURE__ */ l.jsxs("div", { className: "gqdc-root", role: "region", "aria-label": "Design configurator", children: [
    /* @__PURE__ */ l.jsx("style", { children: mn }),
    /* @__PURE__ */ l.jsxs("div", { className: "gqdc-top", children: [
      /* @__PURE__ */ l.jsxs("span", { className: "gqdc-brand", children: [
        /* @__PURE__ */ l.jsx("span", { className: "gqdc-dot" }),
        "GrowQuest Studio",
        /* @__PURE__ */ l.jsxs("span", { className: "gqdc-tenant", children: [
          "· ",
          e
        ] })
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: "gqdc-seg", role: "group", "aria-label": "Device preview width", children: Je.map((S) => /* @__PURE__ */ l.jsx(
        "button",
        {
          type: "button",
          "aria-pressed": r === S.id,
          onClick: () => s(S.id),
          children: S.label
        },
        S.id
      )) }),
      /* @__PURE__ */ l.jsxs("div", { className: "gqdc-actions", children: [
        /* @__PURE__ */ l.jsxs(
          "button",
          {
            type: "button",
            className: "gqdc-btn gqdc-save",
            disabled: !T || A,
            onClick: O,
            children: [
              T && /* @__PURE__ */ l.jsx("span", { className: "gqdc-dirty" }),
              A ? "Saving…" : "Save"
            ]
          }
        ),
        /* @__PURE__ */ l.jsx(
          "button",
          {
            type: "button",
            className: "gqdc-btn gqdc-ghost",
            disabled: !T || A,
            onClick: y,
            children: "Discard"
          }
        ),
        /* @__PURE__ */ l.jsx(
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
    /* @__PURE__ */ l.jsxs("div", { className: "gqdc-body", children: [
      /* @__PURE__ */ l.jsx("div", { className: "gqdc-stage", children: /* @__PURE__ */ l.jsx(
        "iframe",
        {
          ref: d,
          title: "Live preview",
          className: "gqdc-frame",
          src: F,
          style: { width: `${lt}px` }
        }
      ) }),
      /* @__PURE__ */ l.jsxs("aside", { className: "gqdc-inspector", "aria-label": "Inspector", children: [
        /* @__PURE__ */ l.jsxs("div", { className: "gqdc-insp-h", children: [
          "Inspector",
          T && /* @__PURE__ */ l.jsx("span", { className: "gqdc-insp-dirty", children: "unsaved" })
        ] }),
        /* @__PURE__ */ l.jsx(
          bn,
          {
            draft: g,
            isModified: _,
            onSet: m,
            onReset: v,
            onActivateGroup: h
          }
        )
      ] })
    ] })
  ] });
}
export {
  En as DesignConfigurator
};
