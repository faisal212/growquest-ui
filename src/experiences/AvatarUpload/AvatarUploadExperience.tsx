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
    <div className="flex flex-col gap-4 p-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0])
        }}
      />

      {preview ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={preview}
            alt="Preview"
            className="w-[88px] h-[88px] rounded-full object-cover border-2 border-accent"
          />
          <span className="text-xs text-ink-dim">{fileName}</span>
          <button
            onClick={() => {
              setPreview(null)
              setFileName(null)
            }}
            className="text-xs text-ink-dim bg-transparent border-none cursor-pointer underline"
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
          className="border-2 border-dashed border-border rounded-[var(--r-inset)] py-8 px-4 text-center cursor-pointer text-ink-dim text-[13px] transition-colors duration-150"
        >
          <div className="text-[28px] mb-2">📷</div>
          <div>Click or drag to upload a photo</div>
          <div className="text-[11px] mt-1">PNG, JPG up to 5 MB</div>
        </div>
      )}

      <Button variant="primary" disabled={!preview} onClick={onComplete} className="w-full">
        Save photo
      </Button>
    </div>
  )
}
