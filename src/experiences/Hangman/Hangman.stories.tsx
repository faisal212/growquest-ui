import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { HangmanExperience } from './HangmanExperience'

const meta = {
  title: 'Experiences/Hangman',
  component: HangmanExperience,
  args: { onComplete: fn(), word: 'GROWQUEST', maxWrong: 6, category: 'growth engine brand' },
  argTypes: {
    word: { control: 'text' },
    maxWrong: { control: { type: 'range', min: 3, max: 10, step: 1 } },
    category: { control: 'text' },
    onComplete: { action: 'completed' },
  },
} satisfies Meta<typeof HangmanExperience>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const EasyMode: Story = { args: { word: 'XP', maxWrong: 10 } }
export const HardMode: Story = { args: { word: 'LEADERBOARD', maxWrong: 3 } }
