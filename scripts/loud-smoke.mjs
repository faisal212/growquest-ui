// Loud-tenant visual smoke: visits each page with x-tenant-id: loud so the
// SSR layout fetches the override-heavy fakeApi tenant. Verifies that every
// Tier 1 copy key and Tier 2 visual recipe flows end-to-end.
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const OUT = process.argv[2] ?? '/tmp/gq-loud'
const BASE = process.argv[3] ?? 'http://localhost:3000'

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  extraHTTPHeaders: { 'x-tenant-id': 'loud' },
})

for (const path of ['onboarding', 'missions', 'leaderboard', 'profile']) {
  const page = await ctx.newPage()
  await page.goto(`${BASE}/${path}`, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${OUT}/${path}.png`, fullPage: true })
  await page.close()
}

await browser.close()
console.log('Loud smoke screenshots written to', OUT)
