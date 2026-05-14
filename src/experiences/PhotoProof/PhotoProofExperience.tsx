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
      <div className="flex flex-col items-center gap-5 py-8 px-6">
        <div className="text-[48px]">⏳</div>
        <div className="text-center">
          <div className="font-semibold text-[15px] mb-1.5">Photo submitted — pending review</div>
          <div className="text-[13px] text-ink-dim leading-normal">
            Our team will review your photo and approve it within 24h. You'll be notified when XP is
            credited.
          </div>
        </div>
        <Button variant="primary" onClick={onComplete} className="w-full">
          Got it
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0])
        }}
      />

      {preview ? (
        <div className="flex flex-col gap-2.5">
          <img
            src={preview}
            alt="Proof"
            className="w-full max-h-[220px] object-cover rounded-lg border border-border"
          />
          <div className="text-xs text-ink-dim">{fileName}</div>
          <button
            onClick={() => {
              setPreview(null)
              setFileName(null)
            }}
            className="bg-transparent border-none cursor-pointer text-xs text-ink-dim underline text-left"
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
          className="border-2 border-dashed border-border rounded-[10px] py-9 px-4 text-center cursor-pointer text-ink-dim text-[13px]"
        >
          <div className="text-[32px] mb-2">📸</div>
          <div className="font-medium mb-1">Upload photo proof</div>
          <div className="text-[11px]">Click to snap or choose a file · JPG, PNG</div>
        </div>
      )}

      <Button
        variant="primary"
        disabled={!preview}
        onClick={() => setSubmitted(true)}
        className="w-full"
      >
        Submit for review
      </Button>
    </div>
  )
}
