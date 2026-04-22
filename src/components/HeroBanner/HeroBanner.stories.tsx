import type { Meta, StoryObj } from '@storybook/react'
import { HeroBanner } from './HeroBanner'

const meta = {
  title: 'Components/HeroBanner',
  component: HeroBanner,
  args: {
    heroStyle: 'grid-poster',
    title: "Founders' Path",
    subtitle: 'Complete 8 of 12 missions to unlock the Ascendant lootbox.',
    eyebrow: '// current season · week 04',
  },
  argTypes: {
    heroStyle: { control: 'radio', options: ['isometric', 'orbital', 'grid-poster', 'pixel'] },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    eyebrow: { control: 'text' },
  },
} satisfies Meta<typeof HeroBanner>
export default meta
type Story = StoryObj<typeof meta>

export const GridPoster: Story = { args: { heroStyle: 'grid-poster' } }
export const Isometric: Story = { args: { heroStyle: 'isometric' } }
export const Orbital: Story = { args: { heroStyle: 'orbital' } }
export const Pixel: Story = { args: { heroStyle: 'pixel' } }
export const CustomContent: Story = {
  args: {
    heroStyle: 'grid-poster',
    eyebrow: '// Q2 sprint · week 07',
    title: "Power Users' Path",
    subtitle: 'Reach 20,000 XP before the season ends to unlock Oracle status.',
  },
}
