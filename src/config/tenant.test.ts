import { describe, it, expect } from 'vitest'
import { parseTenant } from './tenant'

describe('parseTenant', () => {
  it('extracts leftmost label from subdomain', () => {
    expect(parseTenant('acme.growquest.io')).toBe('acme')
    expect(parseTenant('globex.localhost:3000')).toBe('globex')
  })

  it('returns default for bare localhost', () => {
    expect(parseTenant('localhost')).toBe('default')
    expect(parseTenant('localhost:3000')).toBe('default')
  })

  it('returns default for apex domain', () => {
    expect(parseTenant('growquest.io')).toBe('default')
  })

  it('returns default for reserved subdomains', () => {
    expect(parseTenant('www.growquest.io')).toBe('default')
    expect(parseTenant('app.growquest.io')).toBe('default')
    expect(parseTenant('api.growquest.io')).toBe('default')
  })

  it('returns default for IP addresses', () => {
    expect(parseTenant('127.0.0.1:3000')).toBe('default')
    expect(parseTenant('192.168.1.10')).toBe('default')
  })

  it('returns default for empty/null/undefined', () => {
    expect(parseTenant(null)).toBe('default')
    expect(parseTenant(undefined)).toBe('default')
    expect(parseTenant('')).toBe('default')
  })

  it('strips port and lowercases', () => {
    expect(parseTenant('ACME.growquest.io:443')).toBe('acme')
  })
})
