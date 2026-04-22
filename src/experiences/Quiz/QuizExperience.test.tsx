import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizExperience } from './QuizExperience'

describe('QuizExperience', () => {
  it('renders the question and 4 choice buttons', () => {
    render(<QuizExperience variant="text" onComplete={vi.fn()} />)
    expect(screen.getByText('Which metric best captures product-led growth?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Time to value/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Cost per click/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Monthly recurring/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Net promoter/i })).toBeInTheDocument()
  })

  it('Submit is disabled until a choice is selected', () => {
    render(<QuizExperience variant="text" onComplete={vi.fn()} />)
    const submit = screen.getByRole('button', { name: 'Submit answer' })
    expect(submit).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: /Time to value/i }))
    expect(submit).toBeEnabled()
  })

  it('submitting shows correct feedback and disables choices', () => {
    render(<QuizExperience variant="text" onComplete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /Time to value/i }))
    fireEvent.click(screen.getByRole('button', { name: 'Submit answer' }))
    expect(screen.getByText(/Correct!/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Time to value/i })).toBeDisabled()
  })

  it('Continue calls onComplete', () => {
    const onComplete = vi.fn()
    render(<QuizExperience variant="text" onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /Time to value/i }))
    fireEvent.click(screen.getByRole('button', { name: 'Submit answer' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onComplete).toHaveBeenCalledOnce()
  })
})
