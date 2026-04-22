# Changelog

All notable changes to growquest-ui are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Version numbers follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.1.0] - 2026-04-22

Initial public release of the growquest-ui component library.

### Added

**Primitives**
- `Button`, `Chip`, `Input`, `Textarea`, `Field` — core interactive atoms
- `XPBar` — horizontal progress bar for XP and level display
- `Logo`, `BrandLockup` — wordmark and lockup components
- `Tag`, `XPPill`, `Eyebrow`, `Countdown`, `Sparkline`, `Divider` — utility display elements

**Components**
- `MissionTile` — mission card with type icon, XP value, progress bar, and launch CTA
- `MissionModal` — full-screen modal launcher for missions with `React.memo`
- `RewardCard` — reward card with image, cost, stock indicator, and claim CTA; `width`/`height` set to eliminate CLS
- `BadgeGrid` — achievement badge grid with earned/unearned state
- `LeaderboardTable` — ranked user table with streak, tier, and self-highlight
- `Podium` — top-3 leaderboard podium display
- `FilterTabs` — horizontal tab bar for content filtering
- `HeroBanner` — full-width hero with persona stats and customisable art style
- `ProfileSnapshot` — compact user stats header
- `StatCard` — single-metric card with icon
- `TierLadder` — XP tier progression ladder
- `React.memo` applied to `RewardCard`, `MissionTile`, `LeaderboardTable`, `BadgeGrid` to reduce TBT in list-heavy pages

**Experiences** — tree-shakeable interactive mini-games
- `QuizExperience` — multiple-choice quiz with scoring and feedback
- `SurveyExperience` — single/multi-select survey with progress
- `HangmanExperience` — word-guessing game with letter grid
- `TriviaExperience` — timed trivia question set

**Screens** (app-only, not exported from library)
- Welcome, Missions, Rewards, Leaderboard, Profile, Celebration full-page layouts

**Infrastructure**
- Vite + React + TypeScript project scaffold
- Tailwind CSS 4 with CSS custom properties for theming (light/dark, accent colours)
- ESLint (flat config) + Prettier + Husky pre-commit hooks
- Storybook 10 with a11y addon, docs addon, theme decorator, and mobile viewport story variants
- Vitest unit tests (25 tests across 6 files)
- Library build via `vite.lib.config.ts` — ES module only, react/react-dom/react-router-dom externalised
- `vite-plugin-dts` — generates `dist/index.d.ts` for full TypeScript autocomplete
- `src/index.ts` as explicit public API — screens and internal utilities excluded
- `package.json` exports map with `"types"` condition; `sideEffects: ["*.css"]` for tree-shaking
- CDN reward images at `cdn.grow-quest.com`; `public/reward-placeholder.svg` as offline fallback

---

[Unreleased]: https://github.com/faisal212/growquest-ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/faisal212/growquest-ui/releases/tag/v0.1.0
