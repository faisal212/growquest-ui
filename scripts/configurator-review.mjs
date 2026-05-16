// Playwright UX review of the design configurator. localhost resolves to the
// `default` tenant (proxy.ts derives tenant from Host), so the admin cookie
// must be gq_admin=default. Drives the real editor flows, asserts behaviour,
// and captures screenshots for a scored UX review. Mirrors loud-smoke.mjs.
//
//   node scripts/configurator-review.mjs [outDir] [baseUrl]
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const OUT = process.argv[2] ?? join(tmpdir(), 'gq-configurator')
const BASE = process.argv[3] ?? 'http://localhost:3000'
const TENANT = 'default'

await mkdir(OUT, { recursive: true })
const results = []
const consoleErrors = []
const step = async (name, fn) => {
  const t0 = Date.now()
  try {
    const note = await fn()
    results.push({ name, ok: true, ms: Date.now() - t0, note: note ?? '' })
    console.log(`PASS  ${name}${note ? ' — ' + note : ''}`)
  } catch (e) {
    results.push({ name, ok: false, ms: Date.now() - t0, note: String(e.message || e) })
    console.log(`FAIL  ${name} — ${e.message || e}`)
  }
}
const shot = (page, n) => page.screenshot({ path: join(OUT, `${n}.png`) })
// Resolve the live preview frame by the iframe ELEMENT (its src attribute is
// pinned to the host route; client-side bridge navigation changes the frame's
// document URL but not the attribute — so identify by element, read live).
const previewFrame = async (page) => {
  const h = await page.locator('iframe.gqdc-frame').elementHandle()
  return h ? h.contentFrame() : null
}
const framePath = async (page) => {
  const f = await previewFrame(page)
  if (!f) return ''
  try {
    return new URL(f.url()).pathname
  } catch {
    return ''
  }
}
const primaryVar = async (page) => {
  const f = await previewFrame(page)
  return f
    ? f.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
      )
    : ''
}

const browser = await chromium.launch()

// 1. Gate negative — no admin cookie → no editor.
await step('gate: no cookie → editor absent', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(`${BASE}/missions?preview=true`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const n = await page.locator('[role="region"][aria-label="Design configurator"]').count()
  await shot(page, '01-gate-no-cookie')
  await ctx.close()
  if (n !== 0) throw new Error(`editor present without admin cookie (${n})`)
})

// 1b. Gate negative — cookie for a DIFFERENT tenant → still no editor.
await step('gate: cookie for wrong tenant → editor absent (silent)', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  await ctx.addCookies([{ name: 'gq_admin', value: 'someotherco', url: BASE }])
  const page = await ctx.newPage()
  await page.goto(`${BASE}/missions?preview=true`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const n = await page.locator('[role="region"][aria-label="Design configurator"]').count()
  const hint = await page.getByText(/admin|tenant|preview/i).count()
  await ctx.close()
  if (n !== 0) throw new Error('editor shown for mismatched tenant')
  return `no editor, no on-screen hint elements matched (${hint}) — silent denial`
})

// Authorized context.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
await ctx.addCookies([{ name: 'gq_admin', value: TENANT, url: BASE }])
const page = await ctx.newPage()
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`))
const putResponses = []
page.on('response', (r) => {
  if (r.request().method() === 'PUT' && /\/api\/brand\//.test(r.url())) putResponses.push(r.status())
})

const root = page.locator('[role="region"][aria-label="Design configurator"]')
const frameEl = page.locator('iframe.gqdc-frame')

await step('gate: admin cookie → editor mounts (CSR)', async () => {
  await page.goto(`${BASE}/missions?preview=true`, { waitUntil: 'networkidle' })
  await root.waitFor({ state: 'visible', timeout: 30000 })
  await frameEl.waitFor({ state: 'visible', timeout: 30000 })
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('iframe')).some((f) => /preview=embed/.test(f.src)),
    null,
    { timeout: 30000 }
  )
  await page.waitForTimeout(2000)
  await shot(page, '02-editor-mounted')
})

await step('device presets resize the frame (1440/834/390)', async () => {
  const widths = {}
  for (const [label, expect] of [['Desktop', '1440px'], ['Tablet', '834px'], ['Mobile', '390px']]) {
    await page.getByRole('button', { name: label, exact: true }).click()
    await page.waitForTimeout(450)
    const w = await frameEl.evaluate((el) => el.style.width)
    widths[label] = w
    await shot(page, `03-device-${label.toLowerCase()}`)
    if (w !== expect) throw new Error(`${label}: width ${w} !== ${expect}`)
  }
  await page.getByRole('button', { name: 'Desktop', exact: true }).click()
  await page.waitForTimeout(400)
  return JSON.stringify(widths)
})

await step('live preview: editing Primary updates the framed app', async () => {
  // Brand & Wordmark is global + expanded by default — edit directly.
  const before = await primaryVar(page)
  const input = page.getByLabel('Primary colour value')
  await input.fill('#ff0000')
  await input.press('Enter')
  await page.waitForTimeout(900)
  const after = await primaryVar(page)
  await shot(page, '04-live-edit-primary')
  if (!after || after === before) throw new Error(`--color-primary unchanged (${before} -> ${after})`)
  return `primary ${before || '∅'} -> ${after}`
})

await step('affordances: modified dot + reset + unsaved badge', async () => {
  const dot = await page.locator('.gqdc-f-dot').count()
  const resetBtn = await page.getByRole('button', { name: /Reset Primary/i }).count()
  const dirty = await page.locator('.gqdc-insp-dirty').count()
  if (dot < 1) throw new Error('no modified dot')
  if (resetBtn < 1) throw new Error('no per-field reset')
  if (dirty < 1) throw new Error('no unsaved badge')
  return `dots=${dot} reset=${resetBtn} unsaved=${dirty}`
})

await step('filter narrows fields across groups', async () => {
  const filter = page.getByLabel(/filter fields/i)
  await filter.fill('primary')
  await page.waitForTimeout(350)
  const nameVisible = await page.getByLabel('Name').count()
  const primaryVisible = await page.getByLabel('Primary colour value').count()
  await shot(page, '05-filter-primary')
  if (nameVisible !== 0) throw new Error('unrelated field "Name" still shown')
  if (primaryVisible < 1) throw new Error('matching field hidden')
  await filter.fill('')
  await page.waitForTimeout(250)
})

await step('reset reverts the field and clears its dot', async () => {
  const before = await primaryVar(page)
  await page.getByRole('button', { name: /Reset Primary/i }).first().click()
  await page.waitForTimeout(900)
  const after = await primaryVar(page)
  const dot = await page.locator('.gqdc-f-dot').count()
  await shot(page, '06-after-reset')
  if (after === before) throw new Error(`reset did not change preview (${before})`)
  return `dot count after reset: ${dot}`
})

await step('auto-navigate: editing an Onboarding field routes the frame', async () => {
  await page.getByLabel('Title Lead').fill('Join the')
  const t0 = Date.now()
  let p = ''
  while (Date.now() - t0 < 12000) {
    p = await framePath(page)
    if (p === '/onboarding') break
    await page.waitForTimeout(250)
  }
  await page.waitForTimeout(800)
  await shot(page, '07-autonav-onboarding')
  if (p !== '/onboarding') throw new Error(`frame did not route to /onboarding (got ${p || '∅'})`)
  return `frame → ${p}`
})

await step('global group does NOT navigate (Palette edit stays put)', async () => {
  const before = await framePath(page)
  const pal = page.getByLabel('Bg').first()
  await pal.fill('#101010')
  await pal.press('Enter')
  await page.waitForTimeout(1500)
  const after = await framePath(page)
  await shot(page, '08-palette-no-nav')
  if (before !== after) throw new Error(`global edit navigated: ${before} -> ${after}`)
  return `stayed on ${after}`
})

await step('Save persists (PUT 200) and clears the unsaved badge', async () => {
  const seed = await page.evaluate(async () => {
    const r = await fetch('/api/brand/default', { headers: { Accept: 'application/json' } })
    return (await r.json())?.brand?.primary ?? ''
  })
  const input = page.getByLabel('Primary colour value')
  await input.fill('#1188ff')
  await input.press('Enter')
  await page.waitForTimeout(600)
  await page.locator('.gqdc-save').click()
  await page.waitForTimeout(2000)
  const dirty = await page.locator('.gqdc-insp-dirty').count()
  const saved = await page.evaluate(async () => {
    const r = await fetch('/api/brand/default', { headers: { Accept: 'application/json' } })
    return (await r.json())?.brand?.primary ?? ''
  })
  await shot(page, '09-after-save')
  if (!putResponses.includes(200)) throw new Error(`no PUT 200 (saw ${JSON.stringify(putResponses)})`)
  if (dirty !== 0) throw new Error('unsaved badge still present after save')
  if (saved === seed) throw new Error(`store did not change (still ${seed})`)
  return `seed ${seed} -> saved ${saved}; PUT ${JSON.stringify(putResponses)}`
})

await step('Discard reverts unsaved edits', async () => {
  const saved = await primaryVar(page)
  const input = page.getByLabel('Primary colour value')
  await input.fill('#00ff99')
  await input.press('Enter')
  await page.waitForTimeout(700)
  await page.locator('.gqdc-ghost', { hasText: 'Discard' }).click()
  await page.waitForTimeout(900)
  const after = await primaryVar(page)
  await shot(page, '10-after-discard')
  if (after !== saved) throw new Error(`discard did not restore (${saved} vs ${after})`)
})

await browser.close()

const passed = results.filter((r) => r.ok).length
await writeFile(
  join(OUT, 'summary.json'),
  JSON.stringify({ base: BASE, tenant: TENANT, passed, total: results.length, consoleErrors, results }, null, 2)
)
console.log(`\n${passed}/${results.length} steps passed. Console errors: ${consoleErrors.length}`)
console.log(`Screenshots + summary.json in ${OUT}`)
process.exit(passed === results.length ? 0 : 1)
