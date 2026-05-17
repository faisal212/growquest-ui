import { describe, it, expect, afterEach } from 'vitest'
import {
  getAssetUploadAdapter,
  setAssetUploadAdapter,
  resetAssetUploadAdapter,
  type AssetUploadAdapter,
} from './adapter'

afterEach(() => resetAssetUploadAdapter())

describe('asset upload adapter (phase-2 seam)', () => {
  it('defaults to null — no upload backend in phase 1', () => {
    expect(getAssetUploadAdapter()).toBeNull()
  })

  it('round-trips an injected adapter', () => {
    const fake: AssetUploadAdapter = { upload: async () => 'https://cdn/x.png' }
    setAssetUploadAdapter(fake)
    expect(getAssetUploadAdapter()).toBe(fake)
  })

  it('reset restores the null default', () => {
    setAssetUploadAdapter({ upload: async () => '' })
    resetAssetUploadAdapter()
    expect(getAssetUploadAdapter()).toBeNull()
  })
})
