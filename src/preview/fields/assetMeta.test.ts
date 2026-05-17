import { describe, it, expect } from 'vitest'
import { detectAssetType, assetMetaFor, probeImage } from './assetMeta'

describe('detectAssetType', () => {
  it('detects JSON (Lottie), GIF, and defaults to IMG', () => {
    expect(detectAssetType('https://cdn/x/anim.json')).toBe('JSON')
    expect(detectAssetType('https://cdn/x/loop.GIF')).toBe('GIF')
    expect(detectAssetType('https://cdn/x/hero.png')).toBe('IMG')
    expect(detectAssetType('https://cdn/x/hero.webp')).toBe('IMG')
  })

  it('ignores query/hash and treats empty as IMG', () => {
    expect(detectAssetType('https://cdn/a.json?v=2#x')).toBe('JSON')
    expect(detectAssetType('https://cdn/no-extension')).toBe('IMG')
    expect(detectAssetType('')).toBe('IMG')
  })
})

describe('assetMetaFor', () => {
  it('has hint + recommended for known assets and a safe default', () => {
    const ob = assetMetaFor('assets.onboardingHero')
    expect(ob.hint.length).toBeGreaterThan(0)
    expect(ob.recommended.length).toBeGreaterThan(0)
    const unknown = assetMetaFor('assets.somethingNew')
    expect(typeof unknown.hint).toBe('string')
    expect(typeof unknown.recommended).toBe('string')
  })
})

describe('probeImage', () => {
  it('resolves with natural dimensions on load', async () => {
    const fake = { src: '', naturalWidth: 0, naturalHeight: 0 } as Record<string, unknown>
    const p = probeImage('https://cdn/ok.png', () => fake as unknown as HTMLImageElement)
    fake.naturalWidth = 1600
    fake.naturalHeight = 900
    ;(fake.onload as () => void)()
    await expect(p).resolves.toEqual({ w: 1600, h: 900 })
  })

  it('rejects on error', async () => {
    const fake = { src: '' } as Record<string, unknown>
    const p = probeImage('https://cdn/bad', () => fake as unknown as HTMLImageElement)
    ;(fake.onerror as () => void)()
    await expect(p).rejects.toThrow()
  })
})
