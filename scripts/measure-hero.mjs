// Measure the rendered dimensions of the onboarding left pane and the
// missions hero banner across a few viewport widths. Used to inform the
// default-image aspect ratio choice.
import { chromium } from 'playwright'

const BASE = 'http://localhost:3001'
const VIEWPORTS = [
  { name: 'desktop-wide', width: 1440, height: 900 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'laptop', width: 1080, height: 720 },
  { name: 'tablet', width: 820, height: 1024 },
  { name: 'tablet-narrow', width: 720, height: 1024 },
  { name: 'mobile-large', width: 480, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-small', width: 360, height: 800 },
]

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await ctx.newPage()

  await page.goto(`${BASE}/onboarding`, { waitUntil: 'load' })
  await page.waitForTimeout(2000)
  console.log(`  [${vp.name}] onboarding url:`, page.url())
  console.log(`  [${vp.name}] onboarding title:`, await page.title())
  const onboarding = await page.evaluate(() => {
    // Find the first <img> inside an onboarding hero-ish container, or fall back
    // to the grid's first column.
    const img = document.querySelector('img[src*="placehold"], img[alt*="GrowQuest"]')
    const target =
      document.querySelector('[class*="onboarding-hero"]') ??
      (img ? img.closest('div[style*="onboarding-card-hero-bg"]') ?? img.parentElement?.parentElement : null)
    if (!target) {
      const classes = Array.from(document.querySelectorAll('*'))
        .map((el) => el.className)
        .filter((c) => typeof c === 'string' && c.includes('onboarding'))
        .slice(0, 5)
      return { error: 'not found', classes }
    }
    const r = target.getBoundingClientRect()
    return { width: Math.round(r.width), height: Math.round(r.height), tagName: target.tagName }
  })

  await page.goto(`${BASE}/missions`, { waitUntil: 'load' })
  await page.waitForTimeout(2000)
  console.log(`  [${vp.name}] missions url:`, page.url())
  const missions = await page.evaluate(() => {
    const banner = document.querySelector('.hero-banner')
    if (!banner) {
      const classes = Array.from(document.querySelectorAll('*'))
        .map((el) => el.className)
        .filter((c) => typeof c === 'string' && c.includes('hero'))
        .slice(0, 5)
      return { error: 'not found', classes }
    }
    const r = banner.getBoundingClientRect()
    return { width: Math.round(r.width), height: Math.round(r.height) }
  })

  console.log(`viewport ${vp.name} (${vp.width}x${vp.height}):`)
  if (onboarding && onboarding.width) {
    const ratio = (onboarding.width / onboarding.height).toFixed(2)
    console.log(`  onboarding hero pane: ${onboarding.width}x${onboarding.height}  → ${ratio}:1`)
  } else {
    console.log('  onboarding hero pane:', JSON.stringify(onboarding))
  }
  if (missions && missions.width) {
    const ratio = (missions.width / missions.height).toFixed(2)
    console.log(`  missions hero banner: ${missions.width}x${missions.height}  → ${ratio}:1`)
  } else {
    console.log('  missions hero banner:', JSON.stringify(missions))
  }

  await page.close()
  await ctx.close()
}

await browser.close()
