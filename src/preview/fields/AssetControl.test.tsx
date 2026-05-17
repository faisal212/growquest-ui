import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AssetControl } from './AssetControl'
import { resetAssetUploadAdapter, setAssetUploadAdapter } from '../../config/upload/adapter'
import type { FieldDef } from '../registry'

const def: FieldDef = {
  path: 'assets.onboardingHero',
  label: 'Onboarding hero',
  kind: 'asset',
  group: 'assets',
}

const setup = (value: unknown) => {
  const onChange = vi.fn()
  render(<AssetControl id={def.path} def={def} value={value} onChange={onChange} />)
  return { onChange }
}

afterEach(() => resetAssetUploadAdapter())

describe('AssetControl', () => {
  it('edits the desktop src and auto-detects the type', () => {
    const { onChange } = setup(undefined)
    fireEvent.change(screen.getByLabelText('Onboarding hero URL'), {
      target: { value: 'https://cdn/x/loop.gif' },
    })
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ src: 'https://cdn/x/loop.gif', type: 'GIF' })
    )
  })

  it('shows the auto-detected type badge', () => {
    setup({ src: 'https://cdn/x/a.json', type: 'JSON' })
    expect(screen.getByText('JSON')).toBeInTheDocument()
  })

  it('Mobile tab edits mobileSrc, not src', () => {
    const { onChange } = setup({ src: 'https://cdn/d.png', type: 'IMG' })
    fireEvent.click(screen.getByRole('button', { name: /mobile variant/i }))
    fireEvent.change(screen.getByLabelText('Onboarding hero URL'), {
      target: { value: 'https://cdn/m.png' },
    })
    const calls = onChange.mock.calls
    const arg = calls[calls.length - 1]?.[0]
    expect(arg).toMatchObject({ src: 'https://cdn/d.png', mobileSrc: 'https://cdn/m.png' })
  })

  it('Clear reverts to the built-in asset (emits undefined)', () => {
    const { onChange } = setup({ src: 'https://cdn/d.png', type: 'IMG' })
    fireEvent.click(screen.getByRole('button', { name: /clear/i }))
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  it('Upload is disabled with no adapter and enabled once one is injected', () => {
    const { rerender } = render(
      <AssetControl id={def.path} def={def} value={undefined} onChange={vi.fn()} />
    )
    expect(screen.getByRole('button', { name: /upload/i })).toBeDisabled()
    setAssetUploadAdapter({ upload: async () => 'https://cdn/up.png' })
    rerender(<AssetControl id={def.path} def={def} value={undefined} onChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: /upload/i })).toBeEnabled()
  })
})
