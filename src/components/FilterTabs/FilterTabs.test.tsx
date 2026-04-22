import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterTabs } from './FilterTabs'

const OPTIONS = ['All', 'Active', 'Completed']

describe('FilterTabs', () => {
  it('renders a button for each option', () => {
    render(<FilterTabs options={OPTIONS} value="All" onChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
  })

  it('calls onChange with the clicked option', () => {
    const onChange = vi.fn()
    render(<FilterTabs options={OPTIONS} value="All" onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(onChange).toHaveBeenCalledWith('Active')
  })

  it('calls onChange with each option correctly', () => {
    const onChange = vi.fn()
    render(<FilterTabs options={OPTIONS} value="All" onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }))
    expect(onChange).toHaveBeenCalledWith('Completed')
  })

  it('renders with empty options without error', () => {
    const { container } = render(<FilterTabs options={[]} value="" onChange={vi.fn()} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
