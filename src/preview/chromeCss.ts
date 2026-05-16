/**
 * Self-contained stylesheet for the configurator chrome. Hardcoded palette
 * (not tenant CSS vars) so a tenant's theme can't distort the tooling. All
 * selectors are `gqdc-*` namespaced and injected via a single <style> the
 * editor renders.
 */
export const CHROME_CSS = `
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
`
