# Changelog

All notable changes to growquest-ui are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Version numbers follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.2.0] - 2026-04-24

### Added

**Experiences** — 14 new tree-shakeable mission experience components:
- `VideoExperience` — YouTube/Vimeo iframe or `<video>`, 10 s countdown unlock
- `ReadArticleExperience` — article card + `window.open` + 60 s client-side timer
- `ProfileCompletionExperience` — display name + bio textarea + progress bar
- `AvatarUploadExperience` — drag-drop file picker + circular image preview
- `EmailVerificationExperience` — envelope icon + 30 s resend cooldown
- `PhoneVerificationExperience` — 8 country codes, phone → 6-digit OTP step
- `SpinWheelExperience` — SVG 8-segment wheel with CSS rotation + result reveal
- `ScratchCardExperience` — 4×4 CSS tile grid, auto-completes at 75% revealed
- `BadgeCollectExperience` — badge grid (earned / unearned) + progress bar
- `ReferralExperience` — referral link box + clipboard copy + share buttons
- `ShareExperience` — content preview card + X / Facebook / WhatsApp / copy
- `InviteExperience` — email input + sent-invite list
- `PhotoProofExperience` — file upload → "pending admin review" state
- `FollowSocialExperience` — platform SVG icon + "Open platform" → "I've followed"

All 18 experience types are now wired in `MissionModal`; `body === null` fallback renders "Experience coming soon".

---

## [0.1.1] - 2026-04-22

### Fixed
- `MissionModal` SSR crash — replaced `createPortal(..., document.body)` with `useSyncExternalStore` client-hydration guard for Next.js App Router compatibility

### Changed
- Moved `react-router-dom`, `tailwindcss`, `@tailwindcss/vite` from `dependencies` → `devDependencies`
- Removed duplicate `react` / `react-dom` from `dependencies` (already in `peerDependencies`)

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

[Unreleased]: https://github.com/faisal212/growquest-ui/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/faisal212/growquest-ui/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/faisal212/growquest-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/faisal212/growquest-ui/releases/tag/v0.1.0
