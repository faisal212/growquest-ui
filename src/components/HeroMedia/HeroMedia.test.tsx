import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HeroMedia } from './HeroMedia'

describe('HeroMedia', () => {
  it('renders the fallback when no asset is supplied', () => {
    render(<HeroMedia fallback={<div data-testid="fallback">fallback</div>} />)
    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders an <img> for an IMG asset', () => {
    render(
      <HeroMedia
        asset={{ src: '/test/hero.png', type: 'IMG' }}
        fallback={<div data-testid="fallback">fallback</div>}
        alt="brand mark"
      />
    )
    const img = screen.getByRole('img', { name: 'brand mark' })
    expect(img).toHaveAttribute('src', '/test/hero.png')
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
  })

  it('renders an <img> for a GIF asset', () => {
    render(
      <HeroMedia
        asset={{ src: '/test/hero.gif', type: 'GIF' }}
        fallback={<div data-testid="fallback">fallback</div>}
        alt="animated mark"
      />
    )
    expect(screen.getByRole('img', { name: 'animated mark' })).toHaveAttribute(
      'src',
      '/test/hero.gif'
    )
  })

  it('falls back for JSON (Lottie) assets — player is deferred', () => {
    render(
      <HeroMedia
        asset={{ src: '/test/hero.json', type: 'JSON' }}
        fallback={<div data-testid="fallback">fallback</div>}
      />
    )
    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('falls back when the <img> fires onError', () => {
    render(
      <HeroMedia
        asset={{ src: '/missing.png', type: 'IMG' }}
        fallback={<div data-testid="fallback">fallback</div>}
        alt="will-fail"
      />
    )
    const img = screen.getByRole('img', { name: 'will-fail' })
    fireEvent.error(img)
    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('wraps the <img> in <picture> with a mobile <source> when mobileSrc is set', () => {
    render(
      <HeroMedia
        asset={{ src: '/desktop.png', type: 'IMG', mobileSrc: '/mobile.png' }}
        fallback={<div data-testid="fallback">fallback</div>}
        alt="branded"
      />
    )
    const img = screen.getByRole('img', { name: 'branded' })
    expect(img.getAttribute('src')).toBe('/desktop.png')
    const picture = img.closest('picture')
    expect(picture).not.toBeNull()
    const sources = picture!.querySelectorAll('source')
    expect(sources).toHaveLength(1)
    expect(sources[0].getAttribute('media')).toBe('(max-width: 720px)')
    expect(sources[0].getAttribute('srcset')).toBe('/mobile.png')
  })

  it('omits the <picture> wrapper when mobileSrc is absent', () => {
    render(
      <HeroMedia
        asset={{ src: '/desktop.png', type: 'IMG' }}
        fallback={<div data-testid="fallback">fallback</div>}
        alt="branded"
      />
    )
    const img = screen.getByRole('img', { name: 'branded' })
    expect(img.closest('picture')).toBeNull()
  })
})
