import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HangmanExperience } from './HangmanExperience'

describe('HangmanExperience', () => {
  it('renders all 26 letter buttons', () => {
    render(<HangmanExperience onComplete={vi.fn()} />)
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((l) => {
      expect(screen.getByRole('button', { name: l })).toBeInTheDocument()
    })
  })

  it('correct guess reveals the letter in the word display', () => {
    render(<HangmanExperience onComplete={vi.fn()} word="GROWQUEST" />)
    fireEvent.click(screen.getByRole('button', { name: 'G' }))
    // Letter is shown (non-transparent) — button becomes disabled
    expect(screen.getByRole('button', { name: 'G' })).toBeDisabled()
  })

  it('wrong guess disables the letter button', () => {
    render(<HangmanExperience onComplete={vi.fn()} word="GROWQUEST" />)
    fireEvent.click(screen.getByRole('button', { name: 'Z' }))
    expect(screen.getByRole('button', { name: 'Z' })).toBeDisabled()
  })

  it('win condition: Continue enabled and calls onComplete after all letters guessed', () => {
    const onComplete = vi.fn()
    render(<HangmanExperience onComplete={onComplete} word="GROWQUEST" />)
    const continueBtn = screen.getByRole('button', { name: 'Continue' })
    expect(continueBtn).toBeDisabled()
    for (const letter of ['G', 'R', 'O', 'W', 'Q', 'U', 'E', 'S', 'T']) {
      fireEvent.click(screen.getByRole('button', { name: letter }))
    }
    expect(screen.getByText(/Solved!/)).toBeInTheDocument()
    expect(continueBtn).toBeEnabled()
    fireEvent.click(continueBtn)
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('lose condition: Continue enabled after maxWrong wrong guesses', () => {
    render(<HangmanExperience onComplete={vi.fn()} word="GROWQUEST" maxWrong={6} />)
    const continueBtn = screen.getByRole('button', { name: 'Continue' })
    expect(continueBtn).toBeDisabled()
    for (const letter of ['A', 'B', 'C', 'D', 'F', 'H']) {
      fireEvent.click(screen.getByRole('button', { name: letter }))
    }
    expect(screen.getByText(/Game over/)).toBeInTheDocument()
    expect(continueBtn).toBeEnabled()
  })
})
