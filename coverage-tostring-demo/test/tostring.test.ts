/// <reference types="@rstest/core/globals" />
// Uses globals (`globals: true`) so the identical file runs under both
// `rstest run --coverage` and `vitest run --coverage` for an apples-to-apples
// istanbul comparison.
import runtimeTemplate from '../src/runtime-template.js'
import runtimeTemplateIgnored from '../src/runtime-template-ignored.js'
import runtimeTemplateLicenseThenIgnore from '../src/runtime-template-license-then-ignore.js'

// Mimic webpack/rspack `Template.getFunctionContent(fn)`: strip the outer
// `function () { ... }` wrapper to get just the body, which then gets emitted
// as standalone runtime code into a bundle (and later executed there).
function getFunctionContent(fn: () => unknown): string {
  return fn.toString().replace(/^[^{]*\{/, '').replace(/\}\s*$/, '')
}

// Under `rstest run --coverage` (istanbul), `runtimeTemplate` is instrumented,
// so its `.toString()` body contains `cov_<hash>().f[0]++` etc. The matching
// `var cov_<hash> = ...` declaration lives at MODULE scope and is therefore NOT
// part of the extracted body. Emitting + running that body in any other scope
// throws `cov_<hash> is not defined`.
//
// EXPECTED (and what happens without --coverage / with v8): both tests pass.
// ACTUAL with rstest istanbul coverage: the first test fails.
test('plain template: toString() body must be self-contained', () => {
  const body = getFunctionContent(runtimeTemplate)
  expect(body).not.toMatch(/cov_\d+/) // body is istanbul-instrumented -> fails
  expect(() => new Function(body)()).not.toThrow() // `cov_… is not defined`
})

// The source opts out with `/* istanbul ignore file */`. babel-plugin-istanbul
// (vitest's istanbul provider) honors it and leaves the body clean. This test
// checks whether rstest's swc-plugin-coverage-instrument honors it too.
test('ignored template: /* istanbul ignore file */ keeps the body clean', () => {
  const body = getFunctionContent(runtimeTemplateIgnored)
  expect(body).not.toMatch(/cov_\d+/)
  expect(() => new Function(body)()).not.toThrow()
})

// Same directive, but a leading (empty) license-style block comment precedes it
// — exactly the shape of the real chunk-loading runtime files. If this fails,
// rstest only honors `/* istanbul ignore file */` when it is the FIRST comment.
test('ignored-but-not-first: directive after a leading block comment', () => {
  const body = getFunctionContent(runtimeTemplateLicenseThenIgnore)
  expect(body).not.toMatch(/cov_\d+/)
  expect(() => new Function(body)()).not.toThrow()
})
