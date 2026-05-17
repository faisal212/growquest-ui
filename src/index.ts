// Brand config — applyBrand, BrandProvider, hooks, types
export {
  applyBrand,
  getCurrentBrand,
  subscribeBrand,
  BrandProvider,
  useBrandState,
  useBrand,
  useContentSlice,
  useAsset,
  preloadAssets,
  deriveTokens,
  DEFAULT_CONFIG,
  DEFAULT_CONTENT,
  PALETTES,
} from './config'
export type {
  BrandConfig,
  BrandColors,
  ContentMap,
  AssetMap,
  AssetEntry,
  Mode,
  Overrides,
  PanelPalette,
  RadiusSet,
  FontSet,
} from './config'

// Design configurator (preview editor). PreviewMount is the lightweight CSR
// entry point; it lazy-loads the heavy editor only when an admin opens it, so
// nothing here lands on the end-user bundle. Consumers wire their real auth via
// setAdminSessionAdapter.
export { PreviewMount } from './preview/PreviewMount'
export type { PreviewMountProps } from './preview/PreviewMount'
export {
  setAdminSessionAdapter,
  getAdminSessionAdapter,
  resetAdminSessionAdapter,
} from './config/admin/adapter'
export type { AdminSession, AdminSessionAdapter } from './config/admin/adapter'
// Asset-upload seam — phase 1 ships no backend (URL-only); consumers/phase-2
// inject real storage here and the configurator's Upload affordance activates.
export {
  setAssetUploadAdapter,
  getAssetUploadAdapter,
  resetAssetUploadAdapter,
} from './config/upload/adapter'
export type { AssetUploadAdapter } from './config/upload/adapter'

// Primitives
export { Button } from './primitives/Button'
export type { ButtonProps } from './primitives/Button'
export { Chip } from './primitives/Chip'
export type { ChipProps } from './primitives/Chip'
export { Input, Textarea, Field } from './primitives/Input'
export type { InputProps, TextareaProps, FieldProps } from './primitives/Input'
export { XPBar } from './primitives/XPBar'
export type { XPBarProps } from './primitives/XPBar'
export { Logo, BrandLockup } from './primitives/Logo'
export { Tag, XPPill, Eyebrow, Countdown, Sparkline, Divider } from './primitives/Elements'

// Components
export { BadgeGrid } from './components/BadgeGrid'
export { FilterTabs } from './components/FilterTabs'
export { HeroBanner } from './components/HeroBanner'
export { HeroMedia } from './components/HeroMedia/HeroMedia'
export { LeaderboardTable } from './components/LeaderboardTable'
export { MissionModal } from './components/MissionModal'
export { MissionCard } from './components/MissionCard'
export { Podium } from './components/Podium'
export { ProfileCard } from './components/ProfileCard'
export { RewardCard } from './components/RewardCard'
export type { RewardCardProps } from './components/RewardCard'
export { StatCard } from './components/StatCard'
export { TierLadder } from './components/TierLadder'

// Experiences — tree-shake away in projects that don't use them
export { QuizExperience } from './experiences/Quiz'
export { SurveyExperience } from './experiences/Survey'
export { HangmanExperience } from './experiences/Hangman'
export { TriviaExperience } from './experiences/Trivia'
export { VideoExperience } from './experiences/Video'
export { ReadArticleExperience } from './experiences/ReadArticle'
export { ProfileCompletionExperience } from './experiences/ProfileCompletion'
export { AvatarUploadExperience } from './experiences/AvatarUpload'
export { EmailVerificationExperience } from './experiences/EmailVerification'
export { PhoneVerificationExperience } from './experiences/PhoneVerification'
export { SpinWheelExperience } from './experiences/SpinWheel'
export { ScratchCardExperience } from './experiences/ScratchCard'
export { BadgeCollectExperience } from './experiences/BadgeCollect'
export { ReferralExperience } from './experiences/Referral'
export { ShareExperience } from './experiences/Share'
export { InviteExperience } from './experiences/Invite'
export { PhotoProofExperience } from './experiences/PhotoProof'
export { FollowSocialExperience } from './experiences/FollowSocial'

// Types
export type {
  Tone,
  RewardKind,
  MissionType,
  Mission,
  Reward,
  Badge,
  Tier,
  Persona,
  LeaderboardEntry,
} from './types'
