import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { interpolate } from './interpolate'

describe('interpolate', () => {
  it('returns empty array for empty template', () => {
    expect(interpolate('', {})).toEqual([])
  })

  it('passes through templates with no placeholders', () => {
    const parts = interpolate('Hello world', {})
    expect(parts).toEqual(['Hello world'])
  })

  it('replaces a single placeholder', () => {
    const parts = interpolate('Hello {name}!', { name: 'Quest' })
    const { container } = render(<>{parts}</>)
    expect(container.textContent).toBe('Hello Quest!')
  })

  it('replaces repeated placeholders', () => {
    const parts = interpolate('{x} + {x} = {sum}', { x: '1', sum: '2' })
    const { container } = render(<>{parts}</>)
    expect(container.textContent).toBe('1 + 1 = 2')
  })

  it('leaves unknown placeholders as literal text', () => {
    const parts = interpolate('Hello {missing}!', {})
    const { container } = render(<>{parts}</>)
    expect(container.textContent).toBe('Hello {missing}!')
  })

  it('handles consecutive placeholders without surrounding text', () => {
    const parts = interpolate('{a}{b}', { a: 'foo', b: 'bar' })
    const { container } = render(<>{parts}</>)
    expect(container.textContent).toBe('foobar')
  })

  it('renders React node slots inline', () => {
    const parts = interpolate('Click {link} now', {
      link: <a href="/x">here</a>,
    })
    const { container } = render(<>{parts}</>)
    expect(container.textContent).toBe('Click here now')
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/x')
  })
})
