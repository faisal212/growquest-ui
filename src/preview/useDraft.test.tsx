import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDraft } from './useDraft'
import type { BrandConfig } from '../config/schema'

const loaded: BrandConfig = {
  mode: 'dark',
  brand: { primary: '#111', secondary: '#222' },
  content: { brand: { name: 'GrowQuest' } },
}

describe('useDraft', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts clean and matching the loaded config', () => {
    const { result } = renderHook(() => useDraft(loaded, { onApply: vi.fn() }))
    expect(result.current.isDirty).toBe(false)
    expect(result.current.draft).toEqual(loaded)
  })

  it('set() updates the draft and marks the path modified + dirty', () => {
    const { result } = renderHook(() => useDraft(loaded, { onApply: vi.fn() }))
    act(() => result.current.set('brand.primary', '#abc'))
    expect(result.current.draft.brand.primary).toBe('#abc')
    expect(result.current.isModified('brand.primary')).toBe(true)
    expect(result.current.isDirty).toBe(true)
  })

  it('reset() reverts a path and clears dirty when nothing else changed', () => {
    const { result } = renderHook(() => useDraft(loaded, { onApply: vi.fn() }))
    act(() => result.current.set('brand.primary', '#abc'))
    act(() => result.current.reset('brand.primary'))
    expect(result.current.draft.brand.primary).toBe('#111')
    expect(result.current.isDirty).toBe(false)
  })

  it('discard() reverts every edit and clears dirty', () => {
    const { result } = renderHook(() => useDraft(loaded, { onApply: vi.fn() }))
    act(() => result.current.set('brand.primary', '#abc'))
    act(() => result.current.set('content.brand.name', 'X'))
    act(() => result.current.discard())
    expect(result.current.draft).toEqual(loaded)
    expect(result.current.isDirty).toBe(false)
  })

  it('commitSaved() rebaselines so the saved draft is the new clean state', () => {
    const { result } = renderHook(() => useDraft(loaded, { onApply: vi.fn() }))
    act(() => result.current.set('brand.primary', '#abc'))
    expect(result.current.isDirty).toBe(true)
    act(() => result.current.commitSaved())
    expect(result.current.isDirty).toBe(false)
    // a further edit is dirty again, and reset reverts to the SAVED value
    act(() => result.current.set('brand.primary', '#def'))
    expect(result.current.isDirty).toBe(true)
    act(() => result.current.reset('brand.primary'))
    expect(result.current.draft.brand.primary).toBe('#abc')
  })

  it('debounces onApply — fires once after the wait with the latest draft', () => {
    const onApply = vi.fn()
    const { result } = renderHook(() => useDraft(loaded, { onApply, applyWaitMs: 120 }))
    act(() => result.current.set('brand.primary', '#a'))
    act(() => result.current.set('brand.primary', '#b'))
    expect(onApply).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(150))
    expect(onApply).toHaveBeenCalledTimes(1)
    expect(onApply.mock.calls[0][0].brand.primary).toBe('#b')
  })
})
