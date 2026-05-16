import { describe, it, expect, vi } from 'vitest'
import { isPreviewMessage, subscribePreviewMessages, type PreviewMessage } from './bridge'

describe('isPreviewMessage', () => {
  it('rejects non-objects', () => {
    expect(isPreviewMessage(null)).toBe(false)
    expect(isPreviewMessage(undefined)).toBe(false)
    expect(isPreviewMessage('gq-preview:ready')).toBe(false)
    expect(isPreviewMessage(42)).toBe(false)
    expect(isPreviewMessage([])).toBe(false)
  })

  it('rejects objects without a namespaced type', () => {
    expect(isPreviewMessage({})).toBe(false)
    expect(isPreviewMessage({ type: 'ready' })).toBe(false)
    expect(isPreviewMessage({ type: 'other:ready' })).toBe(false)
    expect(isPreviewMessage({ type: 123 })).toBe(false)
  })

  it('rejects a namespaced but unknown message type', () => {
    expect(isPreviewMessage({ type: 'gq-preview:explode' })).toBe(false)
  })

  it('accepts a bare ready message', () => {
    expect(isPreviewMessage({ type: 'gq-preview:ready' })).toBe(true)
  })

  it('validates applyPreview requires a config object', () => {
    expect(isPreviewMessage({ type: 'gq-preview:applyPreview', config: { mode: 'dark' } })).toBe(
      true
    )
    expect(isPreviewMessage({ type: 'gq-preview:applyPreview' })).toBe(false)
    expect(isPreviewMessage({ type: 'gq-preview:applyPreview', config: 'x' })).toBe(false)
  })

  it('validates navigate requires a route string', () => {
    expect(isPreviewMessage({ type: 'gq-preview:navigate', route: '/missions' })).toBe(true)
    expect(isPreviewMessage({ type: 'gq-preview:navigate' })).toBe(false)
    expect(isPreviewMessage({ type: 'gq-preview:navigate', route: 5 })).toBe(false)
  })

  it('validates setViewport requires a finite width number', () => {
    expect(isPreviewMessage({ type: 'gq-preview:setViewport', width: 390 })).toBe(true)
    expect(isPreviewMessage({ type: 'gq-preview:setViewport', width: 'big' })).toBe(false)
    expect(isPreviewMessage({ type: 'gq-preview:setViewport', width: Infinity })).toBe(false)
  })

  it('validates routeChanged requires a route string', () => {
    expect(isPreviewMessage({ type: 'gq-preview:routeChanged', route: '/profile' })).toBe(true)
    expect(isPreviewMessage({ type: 'gq-preview:routeChanged' })).toBe(false)
  })
})

describe('subscribePreviewMessages', () => {
  function dispatch(data: unknown, origin: string) {
    window.dispatchEvent(new MessageEvent('message', { data, origin }))
  }

  it('delivers a valid message from the expected origin', () => {
    const handler = vi.fn()
    const stop = subscribePreviewMessages(window, handler, {
      expectedOrigin: 'http://localhost:3000',
    })
    const msg: PreviewMessage = { type: 'gq-preview:ready' }
    dispatch(msg, 'http://localhost:3000')
    expect(handler).toHaveBeenCalledWith(msg)
    stop()
  })

  it('drops messages from a foreign origin', () => {
    const handler = vi.fn()
    const stop = subscribePreviewMessages(window, handler, {
      expectedOrigin: 'http://localhost:3000',
    })
    dispatch({ type: 'gq-preview:navigate', route: '/x' }, 'http://evil.example')
    expect(handler).not.toHaveBeenCalled()
    stop()
  })

  it('drops non-preview messages from the expected origin', () => {
    const handler = vi.fn()
    const stop = subscribePreviewMessages(window, handler, {
      expectedOrigin: 'http://localhost:3000',
    })
    dispatch({ type: 'react-devtools' }, 'http://localhost:3000')
    expect(handler).not.toHaveBeenCalled()
    stop()
  })

  it('stops delivering after unsubscribe', () => {
    const handler = vi.fn()
    const stop = subscribePreviewMessages(window, handler, {
      expectedOrigin: 'http://localhost:3000',
    })
    stop()
    dispatch({ type: 'gq-preview:ready' }, 'http://localhost:3000')
    expect(handler).not.toHaveBeenCalled()
  })
})
