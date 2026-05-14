import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrandProvider } from './BrandProvider'
import { useContent } from './content'
import { DEFAULT_CONFIG } from './defaults'
import { renderWithBrand } from '../test/renderWithBrand'

describe('useContent', () => {
  it('returns the default value for a known path', () => {
    function Probe() {
      return <span>{useContent<string>('missions.sectionTitle')}</span>
    }
    renderWithBrand(<Probe />)
    expect(screen.getByText('Daily quests')).toBeInTheDocument()
  })

  it('overrides resolve when supplied via BrandProvider value', () => {
    function Title() {
      return <span data-testid="title">{useContent<string>('missions.sectionTitle')}</span>
    }
    render(
      <BrandProvider
        value={{
          ...DEFAULT_CONFIG,
          content: { missions: { sectionTitle: 'Acme Quests' } },
        }}
      >
        <Title />
      </BrandProvider>
    )
    expect(screen.getByTestId('title').textContent).toBe('Acme Quests')
  })

  it('falls back to default when no provider is present', () => {
    function Probe() {
      return <span data-testid="missing">{useContent<string>('missions.sectionTitle')}</span>
    }
    render(<Probe />)
    expect(screen.getByTestId('missing').textContent).toBe('Daily quests')
  })

  it('returns empty string for an unknown path', () => {
    function Probe() {
      return <span data-testid="missing">{useContent<string>('nope.does.not.exist')}</span>
    }
    renderWithBrand(<Probe />)
    expect(screen.getByTestId('missing').textContent).toBe('')
  })
})
