import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { TriviaExperience } from './TriviaExperience'
import type { TriviaQuestion } from './TriviaExperience'

const defaultQuestions: TriviaQuestion[] = [
  { q: 'How many tiers are in GrowQuest?', choices: ['2', '3', '4', '5'], correct: 2 },
  {
    q: 'What currency powers redemptions?',
    choices: ['USD', 'XP', 'Tokens', 'Credits'],
    correct: 1,
  },
  { q: 'Streak bonus milestone lands at day…', choices: ['3', '5', '7', '10'], correct: 2 },
]

const meta = {
  title: 'Experiences/Trivia',
  component: TriviaExperience,
  args: { onComplete: fn(), questions: defaultQuestions, timeLimit: 15, passScore: 2 },
  argTypes: {
    questions: { control: 'object' },
    timeLimit: { control: { type: 'range', min: 5, max: 30, step: 5 } },
    passScore: { control: { type: 'range', min: 1, max: 5, step: 1 } },
    onComplete: { action: 'completed' },
  },
} satisfies Meta<typeof TriviaExperience>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FastMode: Story = { args: { timeLimit: 5 } }
export const EasyPass: Story = { args: { passScore: 1 } }
