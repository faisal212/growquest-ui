import type { Meta, StoryObj, ArgTypes } from '@storybook/react'
import { fn } from 'storybook/test'
import MissionsScreen from './missions'
import type { Persona, Tweaks, Mission, Reward } from '../../types'

// Screen story args are flat (persona + tweaks fields spread); render assembles them into the nested props.
// satisfies Meta<any> is intentional — Storybook's type system can't express this flat-to-nested mapping.
type MissionsStoryArgs = Persona &
  Tweaks & {
    onClaim: (m: Mission) => void
    onRedeem: (r: Reward) => void
  }

const PERSONA_ARGS: Persona = {
  handle: 'alpha',
  xp: 9840,
  missionsDone: 7,
  rewardsClaimed: 2,
  streak: 12,
  tier: 'Voyager',
  ready: 2,
}

const TWEAKS_ARGS: Tweaks = {
  theme: 'dark',
  accent: 'amber',
  tileLayout: 'stack',
  xpStyle: 'notched',
  tileDensity: 'comfortable',
  heroStyle: 'grid-poster',
  rewardsLayout: 'stacked',
  rewardsRatio: 'balanced',
  mobileNav: 'top',
  mobileDensity: 'comfortable',
  mobileHero: 'show',
}

const PERSONA_ARG_TYPES: ArgTypes = {
  handle: { control: 'text', table: { category: 'Persona' } },
  xp: { control: { type: 'range', min: 0, max: 25000, step: 100 }, table: { category: 'Persona' } },
  missionsDone: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    table: { category: 'Persona' },
  },
  rewardsClaimed: {
    control: { type: 'range', min: 0, max: 50, step: 1 },
    table: { category: 'Persona' },
  },
  streak: { control: { type: 'range', min: 0, max: 90, step: 1 }, table: { category: 'Persona' } },
  tier: {
    control: 'select',
    options: ['Scout', 'Voyager', 'Ascendant', 'Oracle'],
    table: { category: 'Persona' },
  },
  ready: { control: { type: 'range', min: 0, max: 10, step: 1 }, table: { category: 'Persona' } },
}

const TWEAKS_ARG_TYPES: ArgTypes = {
  theme: { control: 'radio', options: ['dark', 'light'], table: { category: 'Tweaks' } },
  accent: {
    control: 'select',
    options: ['amber', 'cyan', 'lime', 'magenta'],
    table: { category: 'Tweaks' },
  },
  xpStyle: {
    control: 'radio',
    options: ['notched', 'ring', 'segmented', 'plain'],
    table: { category: 'Tweaks' },
  },
  heroStyle: {
    control: 'select',
    options: ['grid-poster', 'isometric', 'orbital', 'pixel'],
    table: { category: 'Tweaks' },
  },
  tileLayout: {
    control: 'radio',
    options: ['stack', 'split', 'list'],
    table: { category: 'Tweaks' },
  },
  tileDensity: {
    control: 'radio',
    options: ['comfortable', 'compact'],
    table: { category: 'Tweaks' },
  },
  rewardsLayout: {
    control: 'radio',
    options: ['stacked', 'side-by-side'],
    table: { category: 'Tweaks' },
  },
  rewardsRatio: {
    control: 'radio',
    options: ['balanced', 'missions-heavy', 'rewards-heavy'],
    table: { category: 'Tweaks' },
  },
  mobileNav: { control: 'radio', options: ['top', 'bottom'], table: { category: 'Tweaks' } },
  mobileDensity: {
    control: 'radio',
    options: ['comfortable', 'compact'],
    table: { category: 'Tweaks' },
  },
  mobileHero: { control: 'radio', options: ['show', 'hide'], table: { category: 'Tweaks' } },
}

function buildPersona(a: MissionsStoryArgs): Persona {
  return {
    handle: a.handle,
    xp: a.xp,
    missionsDone: a.missionsDone,
    rewardsClaimed: a.rewardsClaimed,
    streak: a.streak,
    tier: a.tier,
    ready: a.ready,
  }
}
function buildTweaks(a: MissionsStoryArgs): Tweaks {
  return {
    theme: a.theme,
    accent: a.accent,
    tileLayout: a.tileLayout,
    xpStyle: a.xpStyle,
    tileDensity: a.tileDensity,
    heroStyle: a.heroStyle,
    rewardsLayout: a.rewardsLayout,
    rewardsRatio: a.rewardsRatio,
    mobileNav: a.mobileNav,
    mobileDensity: a.mobileDensity,
    mobileHero: a.mobileHero,
  }
}

const meta = {
  title: 'Screens/Missions',
  component: MissionsScreen,
  parameters: { layout: 'fullscreen' },
  args: {
    ...PERSONA_ARGS,
    ...TWEAKS_ARGS,
    onClaim: fn(),
    onRedeem: fn(),
  },
  argTypes: {
    ...PERSONA_ARG_TYPES,
    ...TWEAKS_ARG_TYPES,
    onClaim: { action: 'claimed' },
    onRedeem: { action: 'redeemed' },
  },
  render: (args: MissionsStoryArgs) => (
    <MissionsScreen
      persona={buildPersona(args)}
      tweaks={buildTweaks(args)}
      onClaim={args.onClaim}
      onRedeem={args.onRedeem}
    />
  ),
} satisfies Meta<any>
export default meta
type Story = StoryObj<any>

export const ActivePersona: Story = {}
export const NewPersona: Story = {
  args: {
    handle: 'you',
    xp: 0,
    missionsDone: 0,
    rewardsClaimed: 0,
    streak: 0,
    tier: 'Scout',
    ready: 0,
  },
}
export const PowerPersona: Story = {
  args: {
    handle: 'northstar',
    xp: 18420,
    missionsDone: 11,
    rewardsClaimed: 6,
    streak: 47,
    tier: 'Ascendant',
    ready: 3,
  },
}
export const ListLayout: Story = { args: { tileLayout: 'list' } }
export const SplitLayout: Story = { args: { tileLayout: 'split' } }
export const SideBySide: Story = { args: { rewardsLayout: 'side-by-side' } }
export const CompactDensity: Story = { args: { tileDensity: 'compact' } }
export const Mobile: Story = {
  name: '· Mobile',
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: { mobileNav: 'bottom', mobileHero: 'show', mobileDensity: 'comfortable' },
  decorators: [
    (Story) => (
      <div style={{ width: 375, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
