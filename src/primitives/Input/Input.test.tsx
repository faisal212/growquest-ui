import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input, Textarea, Field } from './Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('fires onChange', () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('respects disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Write here" />)
    expect(screen.getByPlaceholderText('Write here')).toBeInTheDocument()
  })

  it('fires onChange', () => {
    const onChange = vi.fn()
    render(<Textarea onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'text' } })
    expect(onChange).toHaveBeenCalledOnce()
  })
})

describe('Field', () => {
  it('renders the label', () => {
    render(<Field label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders the hint text', () => {
    render(<Field hint="We will not spam you" />)
    expect(screen.getByText('We will not spam you')).toBeInTheDocument()
  })

  it('renders the error and prefers it over hint', () => {
    render(<Field hint="Hint" error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(screen.queryByText('Hint')).not.toBeInTheDocument()
  })

  it('renders labelInside variant', () => {
    render(<Field labelInside="Search" placeholder="Type to search" />)
    expect(screen.getByText('Search')).toBeInTheDocument()
  })
})
