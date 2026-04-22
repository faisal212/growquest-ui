export type MissionType =
  | 'social'
  | 'photo'
  | 'refer'
  | 'video'
  | 'quiz'
  | 'survey'
  | 'hangman'
  | 'trivia'
  | 'review'
  | 'event'
  | 'purchase'
  | 'bundle'

export type MissionSubtype =
  | 'quiz-text'
  | 'quiz-textImage'
  | 'quiz-imageOnly'
  | 'survey-text'
  | 'survey-textImage'
  | 'survey-imageOnly'
  | 'survey-textarea'

/** Accent color token used for mission/reward tinting. 'accent' follows the user's active accent setting. */
export type Tone = 'accent' | 'lime' | 'magenta' | 'amber'

export type RewardKind = 'merch' | 'digital' | 'access' | 'experience'

export interface Mission {
  id: string
  type: MissionType
  subtype?: MissionSubtype
  title: string
  desc: string
  xp: number
  progress: [number, number]
  tone: Tone
  url?: string
  limited?: boolean
  /** Unix ms timestamp when this limited mission expires. */
  endsAt?: number
}

export interface LeaderboardEntry {
  rank: number
  handle: string
  xp: number
  streak: number
  tier: string
  me: boolean
  seed: number
}

export interface Reward {
  id: string
  title: string
  cost: number
  stock: string
  tone: Tone
  kind: RewardKind
  limited?: boolean
  imageUrl?: string
}

export interface Badge {
  id: string
  name: string
  got: boolean
  desc: string
}

export interface Tier {
  name: string
  min: number
  color: string
}

export interface Persona {
  handle: string
  xp: number
  missionsDone: number
  rewardsClaimed: number
  streak: number
  tier: string
  ready: number
}

export interface Tweaks {
  theme: 'dark' | 'light'
  accent: 'cyan' | 'lime' | 'magenta' | 'amber' | 'violet'
  tileLayout: 'split' | 'stack' | 'list'
  xpStyle: 'notched' | 'ring' | 'segmented' | 'plain'
  tileDensity: 'comfortable' | 'compact'
  heroStyle: 'isometric' | 'orbital' | 'grid-poster' | 'pixel'
  rewardsLayout: 'stacked' | 'side-by-side' | 'rewards-left'
  rewardsRatio: 'balanced' | 'missions-heavy' | 'rewards-heavy'
  mobileNav: 'top' | 'bottom'
  mobileDensity: 'comfortable' | 'compact'
  mobileHero: 'show' | 'hide'
}

export interface ClaimPayload {
  title: string
  xp?: number
  cost?: number
  redeemed?: boolean
}
