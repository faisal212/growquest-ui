import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TriviaExperience, type TriviaQuestion } from './TriviaExperience'

const questions: TriviaQuestion[] = [
  { q: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], correct: 1 },
  { q: 'Capital of France?', choices: ['Berlin', 'London', 'Paris', 'Madrid'], correct: 2 },
]

describe('TriviaExperience', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders the first question', () => {
    render(<TriviaExperience onComplete={vi.fn()} questions={questions} />)
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
  })

  it('renders all answer choices', () => {
    render(<TriviaExperience onComplete={vi.fn()} questions={questions} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('shows Next question button after an answer is selected', () => {
    render(<TriviaExperience onComplete={vi.fn()} questions={questions} />)
    fireEvent.click(screen.getByText('4'))
    expect(screen.getByRole('button', { name: 'Next question' })).toBeInTheDocument()
  })

  it('advances to the next question after clicking Next', () => {
    render(<TriviaExperience onComplete={vi.fn()} questions={questions} />)
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }))
    expect(screen.getByText('Capital of France?')).toBeInTheDocument()
  })

  it('shows See results button on the last question', () => {
    render(<TriviaExperience onComplete={vi.fn()} questions={questions} />)
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }))
    fireEvent.click(screen.getByText('Paris'))
    expect(screen.getByRole('button', { name: 'See results' })).toBeInTheDocument()
  })

  it('shows the score screen after all questions', () => {
    render(<TriviaExperience onComplete={vi.fn()} questions={questions} />)
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }))
    fireEvent.click(screen.getByText('Paris'))
    fireEvent.click(screen.getByRole('button', { name: 'See results' }))
    expect(screen.getByText(/trivia complete/i)).toBeInTheDocument()
  })

  it('calls onComplete when Continue is clicked on the score screen', () => {
    const onComplete = vi.fn()
    render(<TriviaExperience onComplete={onComplete} questions={questions} />)
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByRole('button', { name: 'Next question' }))
    fireEvent.click(screen.getByText('Paris'))
    fireEvent.click(screen.getByRole('button', { name: 'See results' }))
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onComplete).toHaveBeenCalledOnce()
  })
})
