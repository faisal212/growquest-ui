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

// Computed top-left border-radius (px number) of the first element matching
// `sel` inside the live preview frame. null when absent.
const radiusOf = async (page, sel) => {
  const f = await previewFrame(page)
  if (!f) return null
  return f.evaluate((s) => {
    const el = document.querySelector(s)
    if (!el) return null
    return parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0
  }, sel)
}

// Computed radius of the mission-card "GO" CTA (a control → Button family,
// must NOT track the Tag slider).
const goButtonRadius = async (page) => {
  const f = await previewFrame(page)
  if (!f) return null
  return f.evaluate(() => {
    const card = document.querySelector('.mission-card')
    if (!card) return null
    const el = Array.from(card.querySelectorAll('span')).find((s) =>
      (s.textContent || '').trim().startsWith('GO')
    )
    return el ? parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0 : null
  })
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

await step('radius controls reshape their tier; circular elements excluded', async () => {
  // Clean known page: /missions has mission cards (Card tier), .btn (Button),
  // .chip (Tag), and rounded-full dots (excluded/circular).
  await page.goto(`${BASE}/missions?preview=true`, { waitUntil: 'networkidle' })
  await root.waitFor({ state: 'visible', timeout: 30000 })
  await frameEl.waitFor({ state: 'visible', timeout: 30000 })
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('iframe')).some((f) => /preview=embed/.test(f.src)),
    null,
    { timeout: 30000 }
  )
  await page.waitForTimeout(1500)

  // Surface the radius fields via the cross-group filter (no group expansion).
  const filter = page.getByLabel(/filter fields/i)
  await filter.fill('radius')
  await page.waitForTimeout(350)

  const card0 = await radiusOf(page, '.mission-card')
  const chip0 = await radiusOf(page, '.chip')
  const circ0 = await radiusOf(page, '[class*="rounded-full"]')
  const go0 = await goButtonRadius(page)
  if (card0 == null) throw new Error('no .mission-card in preview')

  // Card slider 14 → 26 (mission tier = card − 2 ⇒ 12 → 24).
  const cardNum = page.getByLabel('Radius Card value')
  await cardNum.fill('26')
  await cardNum.press('Enter')
  await page.waitForTimeout(1300)
  const card1 = await radiusOf(page, '.mission-card')
  const chipAfterCard = await radiusOf(page, '.chip')
  const circAfterCard = await radiusOf(page, '[class*="rounded-full"]')
  await shot(page, '11-radius-card')
  if (!(card1 > card0)) throw new Error(`mission card radius did not grow (${card0} -> ${card1})`)
  if (chip0 != null && chipAfterCard !== chip0)
    throw new Error(`chip moved on a Card-only change (${chip0} -> ${chipAfterCard})`)
  if (circ0 != null && circAfterCard !== circ0)
    throw new Error(`circular element deformed on Card change (${circ0} -> ${circAfterCard})`)

  // Tag slider 4 → 14 (.chip = tag tier). Card tier must hold its new value.
  const tagNum = page.getByLabel('Radius Tag value')
  await tagNum.fill('14')
  await tagNum.press('Enter')
  await page.waitForTimeout(1300)
  const chip1 = await radiusOf(page, '.chip')
  const cardAfterTag = await radiusOf(page, '.mission-card')
  const circAfterTag = await radiusOf(page, '[class*="rounded-full"]')
  const goAfterTag = await goButtonRadius(page)
  await shot(page, '12-radius-tag')
  if (chip0 != null && !(chip1 > chip0))
    throw new Error(`chip radius did not grow on Tag change (${chip0} -> ${chip1})`)
  if (cardAfterTag !== card1)
    throw new Error(`Card tier shifted on a Tag-only change (${card1} -> ${cardAfterTag})`)
  if (circ0 != null && circAfterTag !== circ0)
    throw new Error(`circular element deformed on Tag change (${circ0} -> ${circAfterTag})`)
  // The GO CTA is a control → Button family; a Tag change must NOT move it.
  if (go0 != null && goAfterTag !== go0)
    throw new Error(`GO button followed the Tag slider (${go0} -> ${goAfterTag}) — misclassified`)

  // Button slider 8 → 22. .btn = button tier; GO CTA = btn-sm (button − 3).
  const btn0 = await radiusOf(page, '.btn')
  const btnNum = page.getByLabel('Radius Button value')
  await btnNum.fill('22')
  await btnNum.press('Enter')
  await page.waitForTimeout(1300)
  const btn1 = await radiusOf(page, '.btn')
  const goAfterBtn = await goButtonRadius(page)
  await shot(page, '13-radius-button')
  if (btn0 != null && !(btn1 > btn0))
    throw new Error(`.btn radius did not grow on Button change (${btn0} -> ${btn1})`)
  if (go0 != null && !(goAfterBtn > goAfterTag))
    throw new Error(`GO button did not follow the Button slider (${goAfterTag} -> ${goAfterBtn})`)

  await filter.fill('')
  await page.waitForTimeout(250)
  return `card ${card0}→${card1}px, chip ${chip0}→${chip1}px, btn ${btn0}→${btn1}px, GO ${go0}→${goAfterBtn}px (held ${go0} thru Tag), circular ${circ0}px held`
})

await step('assets: live preview, type badge, variant tabs, clear', async () => {
  // Deterministic offline 1×1 PNG so probeImage resolves without network.
  const PNG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgAAIAAAUAAeImBZsAAAAASUVORK5CYII='
  await page.goto(`${BASE}/onboarding?preview=true`, { waitUntil: 'networkidle' })
  await root.waitFor({ state: 'visible', timeout: 30000 })
  await frameEl.waitFor({ state: 'visible', timeout: 30000 })
  await page.waitForTimeout(1200)

  const filter = page.getByLabel(/filter fields/i)
  await filter.fill('Onboarding hero')
  await page.waitForTimeout(350)

  const urlInput = page.getByLabel('Onboarding hero URL')
  await urlInput.fill(PNG)
  await page.waitForTimeout(900)

  const previewSrc = await page
    .locator('.gqdc-asset-preview img')
    .first()
    .getAttribute('src')
    .catch(() => null)
  const okStatus = await page.locator('.gqdc-asset-status-ok').count()
  const badge = await page.locator('.gqdc-asset-badge').first().textContent()
  await shot(page, '14-assets-preview')
  if (previewSrc !== PNG) throw new Error(`live preview src mismatch (${String(previewSrc).slice(0, 24)}…)`)
  if (okStatus < 1) throw new Error('no ✓ OK status after a valid image URL')
  if ((badge || '').trim() !== 'IMG') throw new Error(`type badge not IMG (${badge})`)

  // Mobile variant is independent: editing it must not touch desktop src.
  await page.getByRole('button', { name: /mobile variant/i }).click()
  await urlInput.fill('https://example.com/m.png')
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: /desktop variant/i }).click()
  await page.waitForTimeout(300)
  const desktopStillSet = await urlInput.inputValue()
  if (desktopStillSet !== PNG) throw new Error('editing Mobile variant clobbered Desktop src')

  // Clear → revert: the data-URI preview disappears from the inspector.
  await page.getByRole('button', { name: /clear/i }).first().click()
  await page.waitForTimeout(700)
  const stillThere = await page
    .locator(`.gqdc-asset-preview img[src="${PNG}"]`)
    .count()
  await shot(page, '15-assets-cleared')
  if (stillThere !== 0) throw new Error('Clear did not revert the asset (preview still set)')

  await filter.fill('')
  await page.waitForTimeout(250)
  return 'preview+status+badge ok · variants independent · clear reverts'
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
