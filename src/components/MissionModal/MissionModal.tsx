import React, { useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { XPPill, Tag, Countdown } from '../../atoms'
import {
  QuizExperience,
  SurveyExperience,
  HangmanExperience,
  TriviaExperience,
  VideoExperience,
  ReadArticleExperience,
  ProfileCompletionExperience,
  AvatarUploadExperience,
  EmailVerificationExperience,
  PhoneVerificationExperience,
  SpinWheelExperience,
  ScratchCardExperience,
  BadgeCollectExperience,
  ReferralExperience,
  ShareExperience,
  InviteExperience,
  PhotoProofExperience,
  FollowSocialExperience,
} from '../../screens/experiences'
import { useFocusTrap } from '../../utils/useFocusTrap'
import type { Mission } from '../../types'

export interface MissionModalProps {
  m: Mission | null
  onClose: () => void
  onClaim: (m: Mission) => void
}

/** Full-screen modal wrapping a mission's experience. Every mission type has a dedicated embedded UI. */
export function MissionModal({ m, onClose, onClaim }: MissionModalProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, m !== null)
  if (!m || !mounted) return null

  const handleComplete = () => {
    onClaim(m)
    onClose()
  }

  let body: React.ReactNode = null
  if (m.type === 'quiz') {
    const variant =
      m.subtype === 'quiz-textImage'
        ? 'textImage'
        : m.subtype === 'quiz-imageOnly'
          ? 'imageOnly'
          : 'text'
    body = <QuizExperience variant={variant} onComplete={handleComplete} />
  } else if (m.type === 'survey') {
    const variant =
      m.subtype === 'survey-textImage'
        ? 'textImage'
        : m.subtype === 'survey-imageOnly'
          ? 'imageOnly'
          : m.subtype === 'survey-textarea'
            ? 'textarea'
            : 'text'
    body = <SurveyExperience variant={variant} onComplete={handleComplete} />
  } else if (m.type === 'hangman') {
    body = <HangmanExperience onComplete={handleComplete} />
  } else if (m.type === 'trivia') {
    body = <TriviaExperience onComplete={handleComplete} />
  } else if (m.type === 'video') {
    body = <VideoExperience url={m.url ?? ''} onComplete={handleComplete} />
  } else if (m.type === 'read_article') {
    body = <ReadArticleExperience url={m.url} onComplete={handleComplete} />
  } else if (m.type === 'profile') {
    body = <ProfileCompletionExperience onComplete={handleComplete} />
  } else if (m.type === 'avatar') {
    body = <AvatarUploadExperience onComplete={handleComplete} />
  } else if (m.type === 'verify_email') {
    body = <EmailVerificationExperience onComplete={handleComplete} />
  } else if (m.type === 'verify_phone') {
    body = <PhoneVerificationExperience onComplete={handleComplete} />
  } else if (m.type === 'spin_wheel') {
    body = <SpinWheelExperience onComplete={handleComplete} />
  } else if (m.type === 'scratch_card') {
    body = <ScratchCardExperience onComplete={handleComplete} />
  } else if (m.type === 'badge_collect') {
    body = <BadgeCollectExperience onComplete={handleComplete} />
  } else if (m.type === 'refer') {
    body = <ReferralExperience onComplete={handleComplete} />
  } else if (m.type === 'share') {
    body = <ShareExperience shareUrl={m.url} onComplete={handleComplete} />
  } else if (m.type === 'invite') {
    body = <InviteExperience onComplete={handleComplete} />
  } else if (m.type === 'photo_proof') {
    body = <PhotoProofExperience onComplete={handleComplete} />
  } else if (m.type === 'follow_social' || m.type === 'social') {
    body = <FollowSocialExperience url={m.url} onComplete={handleComplete} />
  }

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        style={{ maxWidth: 560 }}
      >
        <div
          style={{
            position: 'relative',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 className="display" style={{ margin: 0, fontSize: 20, letterSpacing: '-0.02em' }}>
              {m.title}
            </h2>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <XPPill amount={m.xp} />
              {m.limited && m.endsAt && (
                <Tag tone="magenta">
                  Ends in <Countdown endsAt={m.endsAt} />
                </Tag>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="icon-box"
            style={{ width: 28, height: 28, borderRadius: 6 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {body ?? (
          <div style={{ padding: 24, color: 'var(--ink-dim)', fontSize: 13, textAlign: 'center' }}>
            Experience coming soon
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
