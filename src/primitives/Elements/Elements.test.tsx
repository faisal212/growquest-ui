import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Eyebrow } from './Elements'

describe('Eyebrow — themeable seam (default-preserving)', () => {
  it('exposes --eyebrow-fg / --eyebrow-dot seam vars with the global defaults as fallback', () => {
    const { container } = render(<Eyebrow>// season 04</Eyebrow>)
    const html = container.innerHTML
    // Text color: tenant seam var, falling back to the original --ink-dim.
    expect(html).toContain('var(--eyebrow-fg,var(--ink-dim))')
    // Dot: tenant seam var, falling back to the original --color-primary.
    expect(html).toContain('var(--eyebrow-dot,var(--color-primary))')
  })

  it('still renders the dot by default and hides it when dot={false}', () => {
    const a = render(<Eyebrow>x</Eyebrow>)
    expect(a.container.querySelector('span')).not.toBeNull()
    const b = render(<Eyebrow dot={false}>x</Eyebrow>)
    // Only the text remains (no leading dot span).
    expect(b.container.querySelectorAll('span').length).toBe(0)
  })
})
