import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Inspector } from './Inspector'
import type { BrandConfig } from '../config/schema'

const draft: BrandConfig = {
  mode: 'dark',
  brand: { primary: 'oklch(0.86 0.18 200)' },
  content: { brand: { name: 'GrowQuest' } },
}

function setup() {
  const onSet = vi.fn()
  const onReset = vi.fn()
  render(<Inspector draft={draft} isModified={() => false} onSet={onSet} onReset={onReset} />)
  return { onSet, onReset }
}

describe('Inspector', () => {
  it('renders a section per group with a route hint on page groups', () => {
    setup()
    const onboarding = screen.getByRole('button', { name: /onboarding/i })
    expect(onboarding).toBeInTheDocument()
    expect(screen.getByText('/onboarding')).toBeInTheDocument()
  })

  it('renders fields for a group (content.brand.name under Brand)', () => {
    setup()
    expect(screen.getByLabelText('Name')).toHaveValue('GrowQuest')
  })

  it('edits propagate to onSet by path', () => {
    const { onSet } = setup()
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Acme' } })
    expect(onSet).toHaveBeenCalledWith('content.brand.name', 'Acme')
  })

  it('the filter box narrows fields by label across groups', () => {
    setup()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/filter fields/i), {
      target: { value: 'primary' },
    })
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Primary colour value')).toBeInTheDocument()
  })

  it('collapsing a group hides its fields', () => {
    setup()
    const header = screen.getByRole('button', { name: /^Brand & Wordmark/i })
    fireEvent.click(header)
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument()
  })

  it('notifies onActivateGroup when a group expands and when a field is edited', () => {
    const onActivateGroup = vi.fn()
    render(
      <Inspector
        draft={draft}
        isModified={() => false}
        onSet={vi.fn()}
        onReset={vi.fn()}
        onActivateGroup={onActivateGroup}
      />
    )
    // collapse then expand Brand → activation on expand only
    const header = screen.getByRole('button', { name: /^Brand & Wordmark/i })
    fireEvent.click(header) // collapse
    fireEvent.click(header) // expand
    expect(onActivateGroup).toHaveBeenLastCalledWith('brand')
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Z' } })
    expect(onActivateGroup).toHaveBeenLastCalledWith('brand')
  })
})
