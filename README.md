# growquest-ui

A gamification UI kit for React — missions, rewards, leaderboards, and interactive experiences.

![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![React](https://img.shields.io/badge/React-18%2B-61dafb)
![Storybook](https://img.shields.io/badge/Storybook-10-ff4785)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Install

```bash
npm install growquest-ui
```

Then import the styles once in your app entry:

```typescript
import 'growquest-ui/styles.css'
```

---

## Quick start

```tsx
import { MissionCard, RewardCard, XPBar } from 'growquest-ui'
import 'growquest-ui/styles'

export default function App() {
  return (
    <>
      <XPBar value={72} label="Level 4" />

      <MissionCard
        mission={{
          id: 'm1',
          type: 'quiz',
          title: 'Brand Knowledge Quiz',
          desc: 'Test what you know',
          xp: 150,
          progress: [0, 1],
          tone: 'accent',
        }}
        onLaunch={(m) => console.log('launch', m)}
      />

      <RewardCard
        reward={{
          id: 'r1',
          title: 'Branded T-Shirt',
          cost: 500,
          stock: 'In stock',
          tone: 'accent',
          kind: 'merch',
        }}
        onClaim={(r) => console.log('claim', r)}
      />
    </>
  )
}
```

---

## Usage in Next.js

Import the stylesheet in your root layout:

```tsx
// app/layout.tsx
import 'growquest-ui/styles.css'
```

Interactive components (`MissionModal`, `*Experience`, `Countdown`, `FilterTabs`, `MissionCard`, `RewardCard`) use React hooks and must run on the client. Wrap them in a `'use client'` boundary — this is the standard Next.js pattern for third-party UI libraries:

```tsx
// components/MissionModalWrapper.tsx
'use client'
export { MissionModal } from 'growquest-ui'
```

Or just add `'use client'` to the file where you use them directly.

Purely presentational components (`HeroBanner`, `Podium`, `ProfileCard`, `StatCard`, `TierLadder`, `BadgeGrid`, `LeaderboardTable`, `Logo`, `BrandLockup`, `Chip`, `Tag`, `XPPill`, `Eyebrow`, `Divider`, `Sparkline`) work in Server Components with no extra setup.

---

## API

### Primitives

| Export | Description |
|--------|-------------|
| `Button` | Primary action button with `tone`, `size`, `variant`, `disabled` props |
| `Chip` | Compact label/badge with optional icon |
| `Input` | Single-line text input |
| `Textarea` | Multi-line text input |
| `Field` | Label + input wrapper |
| `XPBar` | Horizontal progress bar for XP / level progress |
| `Logo` | Wordmark logo |
| `BrandLockup` | Logo + tagline lockup |
| `Tag` | Small inline tag |
| `XPPill` | XP value pill badge |
| `Eyebrow` | Small uppercase label |
| `Countdown` | Live countdown timer |
| `Sparkline` | Mini trend line chart |
| `Divider` | Section separator |

### Components

| Export | Description |
|--------|-------------|
| `BadgeGrid` | Grid of achievement badge cards |
| `FilterTabs` | Horizontal tab bar for filtering content |
| `HeroBanner` | Full-width hero section with persona stats |
| `LeaderboardTable` | Ranked user table with streak and tier columns |
| `MissionModal` | Full-screen modal for launching a mission |
| `MissionCard` | Card for a single mission with progress indicator |
| `Podium` | Top-3 leaderboard podium |
| `ProfileCard` | Compact user stats header |
| `RewardCard` | Reward card with claim CTA and stock indicator |
| `StatCard` | Single metric card with icon |
| `TierLadder` | Visual XP tier progression ladder |

### Experiences

Interactive mini-games — tree-shake away if unused.

| Export | Description |
|--------|-------------|
| `QuizExperience` | Multiple-choice quiz with scoring |
| `SurveyExperience` | Single/multi-select survey |
| `HangmanExperience` | Word-guessing game |
| `TriviaExperience` | Timed trivia question set |

### Screens

Full-page route-level layouts.

| Export | Description |
|--------|-------------|
| *(screens are excluded from the library entry point)* | Import directly from `src/screens/` if building the full app |

### Types

```typescript
import type {
  Mission,        // mission card data
  Reward,         // reward card data
  Badge,          // achievement badge
  Tier,           // XP tier definition
  Persona,        // user profile data
  LeaderboardEntry,
  Tone,           // 'accent' | 'lime' | 'magenta' | 'amber'
  MissionType,    // 'quiz' | 'survey' | 'social' | ...
  RewardKind,     // 'merch' | 'digital' | 'access' | 'experience'
} from 'growquest-ui'
```

---

## Theming

The library uses CSS custom properties. Override them on `:root` or a container:

```css
:root {
  --accent-cyan: #06b6d4;
  --accent-lime: #84cc16;
  --accent-magenta: #d946ef;
  --accent-amber: #f59e0b;
}
```

Both `light` and `dark` themes are supported via the `data-theme` attribute on the root element.

---

## Development

```bash
git clone https://github.com/faisal212/growquest-ui.git
cd growquest-ui
npm install

npm run dev        # React app at http://localhost:5173
npm run storybook  # Component explorer at http://localhost:6006
npm test           # Vitest unit tests
npm run lint       # ESLint
npm run build:lib  # Build dist/index.js + dist/index.d.ts
```

---

## Contributing

1. Fork and create a feature branch
2. Add or update the component + co-located `.stories.tsx` + `.test.tsx`
3. Run `npm test && npm run lint` — both must pass
4. Open a pull request

---

## Publishing

This package is currently distributed via GitHub install. npm publish is planned for v1.0.0 when the API stabilises.

---

## License

MIT
