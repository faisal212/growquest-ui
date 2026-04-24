import { useRef, useState } from 'react'
import { Button } from '../../primitives/Button'

export function PhotoProofExperience({ onComplete }: { onComplete: () => void }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  if (submitted) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '32px 24px',
        }}
      >
        <div style={{ fontSize: 48 }}>⏳</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
            Photo submitted — pending review
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>
            Our team will review your photo and approve it within 24h. You'll be notified when XP is
            credited.
          </div>
        </div>
        <Button variant="primary" onClick={onComplete} style={{ width: '100%' }}>
          Got it
        </Button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0])
        }}
      />

      {preview ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <img
            src={preview}
            alt="Proof"
            style={{
              width: '100%',
              maxHeight: 220,
              objectFit: 'cover',
              borderRadius: 8,
              border: '1px solid var(--border)',
            }}
          />
          <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>{fileName}</div>
          <button
            onClick={() => {
              setPreview(null)
              setFileName(null)
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              color: 'var(--ink-dim)',
              textDecoration: 'underline',
              textAlign: 'left',
            }}
          >
            Change photo
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
          }}
          style={{
            border: '2px dashed var(--border)',
            borderRadius: 10,
            padding: '36px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            color: 'var(--ink-dim)',
            fontSize: 13,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>Upload photo proof</div>
          <div style={{ fontSize: 11 }}>Click to snap or choose a file · JPG, PNG</div>
        </div>
      )}

      <Button
        variant="primary"
        disabled={!preview}
        onClick={() => setSubmitted(true)}
        style={{ width: '100%' }}
      >
        Submit for review
      </Button>
    </div>
  )
}
