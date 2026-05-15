import { useRef } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrandProvider } from './BrandProvider'
import { useContentSlice } from './content'
import { DEFAULT_CONFIG, DEFAULT_CONTENT } from './defaults'
import type { ContentMap } from './schema'
import { renderWithBrand } from '../test/renderWithBrand'

describe('useContentSlice', () => {
  it('returns the default slice for a known namespace', () => {
    function Probe() {
      const t = useContentSlice('missions')
      return <span>{t.sectionTitle}</span>
    }
    renderWithBrand(<Probe />)
    expect(screen.getByText('Daily quests')).toBeInTheDocument()
  })

  it('merges a sparse override on top of the default slice', () => {
    function Probe() {
      const t = useContentSlice('missions')
      return (
        <>
          <span data-testid="title">{t.sectionTitle}</span>
          <span data-testid="hero">{t.heroTitle}</span>
        </>
      )
    }
    render(
      <BrandProvider
        value={{
          ...DEFAULT_CONFIG,
          content: { missions: { sectionTitle: 'Acme Quests' } },
        }}
      >
        <Probe />
      </BrandProvider>
    )
    expect(screen.getByTestId('title').textContent).toBe('Acme Quests')
    expect(screen.getByTestId('hero').textContent).toBe("Founders' Path")
  })

  it('falls back to default when no provider is present', () => {
    function Probe() {
      const t = useContentSlice('missions')
      return <span data-testid="missing">{t.sectionTitle}</span>
    }
    render(<Probe />)
    expect(screen.getByTestId('missing').textContent).toBe('Daily quests')
  })

  it('exposes defaults for every namespace', () => {
    const namespaces: (keyof ContentMap)[] = [
      'brand',
      'nav',
      'footer',
      'onboarding',
      'leaderboard',
      'profile',
      'missions',
    ]
    for (const ns of namespaces) {
      function Probe() {
        const slice = useContentSlice(ns)
        return <span data-testid={ns}>{JSON.stringify(slice)}</span>
      }
      const { unmount } = renderWithBrand(<Probe />)
      const got = screen.getByTestId(ns).textContent
      expect(got).toBe(JSON.stringify(DEFAULT_CONTENT[ns]))
      unmount()
    }
  })

  it('returns a stable slice reference across re-renders when config is unchanged', () => {
    const seen: object[] = []
    function Probe() {
      const t = useContentSlice('missions')
      const renders = useRef(0)
      renders.current += 1
      seen.push(t)
      return <span data-testid="render">{renders.current}</span>
    }
    const { rerender } = renderWithBrand(<Probe />)
    rerender(
      <BrandProvider value={DEFAULT_CONFIG}>
        <Probe />
      </BrandProvider>
    )
    rerender(
      <BrandProvider value={DEFAULT_CONFIG}>
        <Probe />
      </BrandProvider>
    )
    // First render uses renderWithBrand's provider; subsequent rerenders use the explicit one above.
    // Across the two explicit rerenders with the same DEFAULT_CONFIG, the slice reference must match.
    expect(seen.length).toBeGreaterThanOrEqual(3)
    const last = seen[seen.length - 1]
    const prev = seen[seen.length - 2]
    expect(last).toBe(prev)
  })

  it('partial section overrides fall back to defaults for unset keys', () => {
    function Probe() {
      const profile = useContentSlice('profile')
      return (
        <>
          <span data-testid="overridden">{profile.activityEyebrow}</span>
          <span data-testid="default">{profile.xpChartEyebrow}</span>
        </>
      )
    }
    render(
      <BrandProvider
        value={{
          ...DEFAULT_CONFIG,
          content: { profile: { activityEyebrow: '// vibes' } },
        }}
      >
        <Probe />
      </BrandProvider>
    )
    expect(screen.getByTestId('overridden').textContent).toBe('// vibes')
    expect(screen.getByTestId('default').textContent).toBe('// xp over 14 days')
  })
})
