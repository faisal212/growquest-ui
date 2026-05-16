import { describe, it, expect } from 'vitest'
import { getAtPath, setAtPath, deleteAtPath } from './paths'

describe('getAtPath', () => {
  const obj = { a: { b: { c: 1 } }, list: [1, 2], n: null }

  it('reads a nested value', () => {
    expect(getAtPath(obj, 'a.b.c')).toBe(1)
  })

  it('returns the whole subtree for a partial path', () => {
    expect(getAtPath(obj, 'a.b')).toEqual({ c: 1 })
  })

  it('returns undefined for a missing path without throwing', () => {
    expect(getAtPath(obj, 'a.x.y')).toBeUndefined()
    expect(getAtPath(obj, 'n.deep')).toBeUndefined()
  })

  it('reads array values held at a path', () => {
    expect(getAtPath(obj, 'list')).toEqual([1, 2])
  })
})

describe('setAtPath', () => {
  it('sets a nested value without mutating the original', () => {
    const orig = { a: { b: 1 } }
    const next = setAtPath(orig, 'a.b', 2)
    expect(next).toEqual({ a: { b: 2 } })
    expect(orig).toEqual({ a: { b: 1 } })
    expect(next).not.toBe(orig)
    expect(next.a).not.toBe(orig.a)
  })

  it('creates intermediate objects for a missing path', () => {
    expect(setAtPath({}, 'x.y.z', 5)).toEqual({ x: { y: { z: 5 } } })
  })

  it('replaces a non-object intermediate with an object', () => {
    expect(setAtPath({ a: 3 }, 'a.b', 1)).toEqual({ a: { b: 1 } })
  })

  it('sets an array value wholesale', () => {
    expect(setAtPath({ s: { list: [1] } }, 's.list', [9, 8])).toEqual({
      s: { list: [9, 8] },
    })
  })
})

describe('deleteAtPath', () => {
  it('removes a leaf without mutating the original', () => {
    const orig = { a: { b: 1, c: 2 } }
    const next = deleteAtPath(orig, 'a.b')
    expect(next).toEqual({ a: { c: 2 } })
    expect(orig).toEqual({ a: { b: 1, c: 2 } })
    expect(next).not.toBe(orig)
  })

  it('is a no-op clone for a missing path', () => {
    const orig = { a: { b: 1 } }
    const next = deleteAtPath(orig, 'a.x.y')
    expect(next).toEqual(orig)
    expect(next).not.toBe(orig)
  })
})
