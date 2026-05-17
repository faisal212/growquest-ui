import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Field } from './Field'
import { FIELDS, type FieldDef } from '../registry'

const def = (over: Partial<FieldDef>): FieldDef => ({
  path: 'x',
  label: 'X',
  kind: 'text',
  group: 'g',
  ...over,
})

function setup(d: FieldDef, value: unknown) {
  const onChange = vi.fn()
  const onReset = vi.fn()
  render(<Field def={d} value={value} modified={false} onChange={onChange} onReset={onReset} />)
  return { onChange, onReset }
}

describe('Field dispatcher', () => {
  it('renders a text input and emits raw string changes', () => {
    const { onChange } = setup(def({ kind: 'text', label: 'Headline' }), 'hi')
    fireEvent.change(screen.getByLabelText('Headline'), { target: { value: 'yo' } })
    expect(onChange).toHaveBeenCalledWith('yo')
  })

  it('renders a mode toggle and emits the chosen mode', () => {
    const { onChange } = setup(def({ kind: 'mode', label: 'Mode' }), 'dark')
    fireEvent.click(screen.getByRole('button', { name: /light/i }))
    expect(onChange).toHaveBeenCalledWith('light')
  })

  it('normalises a colour entry to oklch on commit', () => {
    const { onChange } = setup(def({ kind: 'color', label: 'Primary' }), '#000000')
    const text = screen.getByLabelText('Primary colour value')
    fireEvent.change(text, { target: { value: '#FF8C00' } })
    fireEvent.blur(text)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(String(onChange.mock.calls[0][0]).startsWith('oklch(')).toBe(true)
  })

  it('renders a select with the declared options', () => {
    const { onChange } = setup(
      def({ kind: 'select', label: 'Overlay', options: ['always', 'never'] }),
      'always'
    )
    fireEvent.change(screen.getByLabelText('Overlay'), { target: { value: 'never' } })
    expect(onChange).toHaveBeenCalledWith('never')
  })

  it('renders a list and removes an item wholesale', () => {
    const { onChange } = setup(def({ kind: 'list', label: 'Stats' }), [
      { key: 'XP', value: 'A' },
      { key: 'Tiers', value: 'B' },
    ])
    fireEvent.click(screen.getAllByRole('button', { name: /remove/i })[0])
    expect(onChange).toHaveBeenCalledWith([{ key: 'Tiers', value: 'B' }])
  })

  it('Add on an empty stats list appends a correctly-shaped object, not a string', () => {
    // Real registry def: this is what the configurator actually uses. A tenant
    // with no stats override gives value=undefined; the first "+ Add" must yield
    // a {key,value} object — a string "" corrupts the array and breaks render.
    const statsDef = FIELDS.find((f) => f.path === 'content.onboarding.stats')!
    expect(statsDef.kind).toBe('list')
    const { onChange } = setup(statsDef, undefined)
    fireEvent.click(screen.getByRole('button', { name: '+ Add' }))
    expect(onChange).toHaveBeenCalledWith([{ key: '', value: '' }])
  })

  it('renders a px slider and emits an Npx string on change', () => {
    const { onChange } = setup(
      def({ kind: 'lengthPx', label: 'Radius Card', min: 0, max: 32, step: 1, default: 14 }),
      '14px'
    )
    fireEvent.change(screen.getByLabelText('Radius Card'), { target: { value: '20' } })
    expect(onChange).toHaveBeenCalledWith('20px')
  })

  it('seeds the px slider from def.default when the value is empty', () => {
    setup(
      def({ kind: 'lengthPx', label: 'Radius Card', min: 0, max: 32, step: 1, default: 14 }),
      undefined
    )
    expect((screen.getByLabelText('Radius Card') as HTMLInputElement).value).toBe('14')
  })

  it('parses an existing Npx value back onto the slider', () => {
    setup(
      def({ kind: 'lengthPx', label: 'Radius Card', min: 0, max: 32, step: 1, default: 14 }),
      '9px'
    )
    expect((screen.getByLabelText('Radius Card') as HTMLInputElement).value).toBe('9')
  })

  it('shows a reset control when modified and calls onReset', () => {
    const onReset = vi.fn()
    render(
      <Field def={def({ label: 'Body' })} value="x" modified onChange={vi.fn()} onReset={onReset} />
    )
    fireEvent.click(screen.getByRole('button', { name: /reset body/i }))
    expect(onReset).toHaveBeenCalled()
  })
})
