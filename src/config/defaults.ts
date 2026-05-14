import type { BrandConfig, ContentMap, SurfacePalette, Mode } from './schema'

/** Per-mode surface/ink palette. Matches the values currently in styles.css. */
export const SURFACES: Record<Mode, SurfacePalette> = {
  dark: {
    surface: '#0E1018',
    surface2: '#141722',
    surface3: '#1A1E2C',
    surfaceHover: '#1A1E2C',
    onSurface: '#E8EBF2',
    onSurfaceDim: '#8B93A7',
    onSurfaceFaint: '#555C6E',
    border: 'oklch(0.28 0.015 270)',
    borderStrong: 'oklch(0.38 0.02 270)',
  },
  light: {
    surface: '#FFFFFF',
    surface2: '#F9F8F4',
    surface3: '#F0EFE9',
    surfaceHover: '#F0EFE9',
    onSurface: '#0A0B10',
    onSurfaceDim: '#5A6275',
    onSurfaceFaint: '#9099AA',
    border: 'oklch(0.88 0.006 270)',
    borderStrong: 'oklch(0.78 0.01 270)',
  },
}

export const DEFAULT_CONTENT: ContentMap = {
  missions: {
    sectionEyebrow: '// missions',
    sectionTitle: 'Daily quests',
    rewardsEyebrow: '// rewards marketplace',
    rewardsTitle: 'Spend your XP',
    rewardsBalance: 'balance',
    dailyDrop: {
      eyebrow: '// daily drop',
      title: 'Daily streak',
      subtitle: 'Claim +50 XP every 24h',
    },
    spin: {
      eyebrow: '// lootbox',
      title: 'Spin-to-win',
      subtitle: '1 free spin available',
      prizes: 'PRIZES: XP · MERCH · RARE DROP',
    },
    readyToCollect: {
      eyebrow: '// ready to collect',
      empty: 'Complete a mission to collect rewards.',
      buttonEmpty: 'No rewards yet',
      buttonReady: (n: number) => `Collect (${n})`,
      waiting: (n: number) => `${n} reward${n > 1 ? 's' : ''} waiting.`,
    },
  },
}

export const DEFAULT_CONFIG: BrandConfig = {
  mode: 'dark',
  brand: {
    primary: 'oklch(0.86 0.18 200)',
    secondary: 'oklch(0.72 0.25 340)',
  },
}
