import { useRef, useState } from 'react'
import { Button } from '../../primitives/Button'

export function AvatarUploadExperience({ onComplete }: { onComplete: () => void }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0])
        }}
      />

      {preview ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--accent)',
            }}
          />
          <span style={{ fontSize: 12, color: 'var(--ink-dim)' }}>{fileName}</span>
          <button
            onClick={() => {
              setPreview(null)
              setFileName(null)
            }}
            style={{
              fontSize: 12,
              color: 'var(--ink-dim)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
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
            padding: '32px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            color: 'var(--ink-dim)',
            fontSize: 13,
            transition: 'border-color 0.15s',
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
          <div>Click or drag to upload a photo</div>
          <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG up to 5 MB</div>
        </div>
      )}

      <Button variant="primary" disabled={!preview} onClick={onComplete} style={{ width: '100%' }}>
        Save photo
      </Button>
    </div>
  )
}
