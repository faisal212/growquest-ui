// Strip JSONC comments + measure JSON wire size of the fully-populated reference config.
import { readFileSync, writeFileSync } from 'node:fs'
import { gzipSync, brotliCompressSync } from 'node:zlib'

const raw = readFileSync('docs/brand-config-reference.jsonc', 'utf8')

// String-aware JSONC comment stripper.
let out = ''
let i = 0
let inStr = false
let esc = false
while (i < raw.length) {
  const c = raw[i]
  if (inStr) {
    if (esc) {
      esc = false
      out += c
      i++
      continue
    }
    if (c === '\\') {
      esc = true
      out += c
      i++
      continue
    }
    if (c === '"') {
      inStr = false
      out += c
      i++
      continue
    }
    out += c
    i++
    continue
  }
  if (c === '"') {
    inStr = true
    out += c
    i++
    continue
  }
  if (c === '/' && raw[i + 1] === '/') {
    while (i < raw.length && raw[i] !== '\n') i++
    continue
  }
  if (c === '/' && raw[i + 1] === '*') {
    i += 2
    while (i < raw.length && !(raw[i] === '*' && raw[i + 1] === '/')) i++
    i += 2
    continue
  }
  out += c
  i++
}
out = out.replace(/,(\s*[}\]])/g, '$1')

const obj = JSON.parse(out)
const minified = JSON.stringify(obj)
const pretty = JSON.stringify(obj, null, 2)
writeFileSync('/tmp/brand-reference.min.json', minified)
writeFileSync('/tmp/brand-reference.pretty.json', pretty)

const fmt = (n) => `${n.toLocaleString()} bytes (${(n / 1024).toFixed(2)} KB)`
console.log('--- fully-populated reference config (every overrideable field set) ---')
console.log('minified JSON:        ', fmt(minified.length))
console.log('pretty (2-space):     ', fmt(pretty.length))
console.log('gzip(min):            ', fmt(gzipSync(minified).length))
console.log('gzip(pretty):         ', fmt(gzipSync(pretty).length))
console.log('brotli(min):          ', fmt(brotliCompressSync(minified).length))
