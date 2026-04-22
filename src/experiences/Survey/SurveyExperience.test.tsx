import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SurveyExperience } from './SurveyExperience'

describe('SurveyExperience', () => {
  it('text variant: renders question and choices', () => {
    render(<SurveyExperience variant="text" onComplete={vi.fn()} />)
    expect(screen.getByText('Which GrowQuest feature would you use most?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Daily missions/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Leaderboard/i })).toBeInTheDocument()
  })

  it('text variant: selecting a choice enables Submit, which calls onComplete', () => {
    const onComplete = vi.fn()
    render(<SurveyExperience variant="text" onComplete={onComplete} />)
    const submit = screen.getByRole('button', { name: 'Submit' })
    expect(submit).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: /Daily missions/i }))
    expect(submit).toBeEnabled()
    fireEvent.click(submit)
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('textarea variant: Submit is disabled until textMinLength is reached', () => {
    render(<SurveyExperience variant="textarea" onComplete={vi.fn()} textMinLength={10} />)
    const textarea = screen.getByRole('textbox')
    const submit = screen.getByRole('button', { name: 'Submit feedback' })
    fireEvent.change(textarea, { target: { value: 'tooshort' } })
    expect(submit).toBeDisabled()
    fireEvent.change(textarea, { target: { value: 'longenoughtext' } })
    expect(submit).toBeEnabled()
  })

  it('textarea variant: char counter reflects input length', () => {
    render(<SurveyExperience variant="textarea" onComplete={vi.fn()} textMinLength={20} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello world' } })
    expect(screen.getByText('11 chars')).toBeInTheDocument()
  })
})
