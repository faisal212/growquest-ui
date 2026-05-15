// Verify the <picture> network behavior: desktop loads 720x800, mobile loads 720x400.
// Inspects Network requests via Playwright.
import { chromium } from 'playwright'

const BASE = 'http://localhost:3001'
const browser = await chromium.launch()

for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  const page = await ctx.newPage()
  const heroRequests = []
  page.on('request', (req) => {
    const url = req.url()
    if (url.includes('placehold.co') && url.includes('GrowQuest') && !url.includes('Missions')) {
      heroRequests.push(url)
    }
  })
  await page.goto(`${BASE}/onboarding`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const imgInfo = await page.evaluate(() => {
    const img = document.querySelector('picture img, .onboarding-hero img')
    if (!img) return null
    return {
      currentSrc: img.currentSrc,
      src: img.getAttribute('src'),
      hasPicture: !!img.closest('picture'),
    }
  })
  console.log(`${vp.name} (${vp.width}px):`)
  console.log(`  picture wrapper: ${imgInfo?.hasPicture}`)
  console.log(`  img src attr:    ${imgInfo?.src}`)
  console.log(`  img currentSrc:  ${imgInfo?.currentSrc}`)
  console.log(`  network requests for onboarding hero:`)
  for (const url of heroRequests) console.log(`    - ${url}`)
  await page.close()
  await ctx.close()
}

await browser.close()
