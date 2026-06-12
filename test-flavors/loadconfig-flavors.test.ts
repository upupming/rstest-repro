import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { expect, test } from '@rstest/core'

// These mirror config flavors that @lynx-js/rspeedy's `loadConfig` test
// suite covered under vitest (they passed because vitest loaded configs
// through vite's lenient transform). Under rstest they fail — but plain
// Node fails them with the *identical* errors (`node verify-flavors.mjs`),
// so this is a product/design question rather than an rstest defect:
// should the runner (or the product) provide a vite-like full TS transform
// for runtime-imported config files?

const u = (...p: string[]) =>
  pathToFileURL(join(__dirname, '..', 'fixtures', 'loadconfig-flavors', ...p))
    .toString()

test('CommonJS-syntax .ts under a "type": "module" package', async () => {
  // plain Node: ReferenceError: module is not defined in ES module scope
  const mod = await import(u('cjs-syntax.config.ts')) as { default: unknown }
  expect(mod.default).toEqual({ source: { entry: 'cjs-syntax' } })
})

test('ESM-syntax .ts under a "type": "commonjs" package', async () => {
  // plain Node: SyntaxError: Unexpected token 'export'
  const mod = await import(
    u('commonjs-pkg', 'export-default.config.ts')
  ) as { default: unknown }
  expect(mod.default).toEqual({ source: { entry: 'export-default' } })
})

test('ESM-syntax .js under a "type": "commonjs" package', async () => {
  // plain Node: SyntaxError: Cannot use import statement outside a module
  const mod = await import(
    u('commonjs-pkg', 'esm-syntax.config.js')
  ) as { default: unknown }
  expect(mod.default).toEqual({ source: { entry: 'esm/syntax' } })
})

test('.ts config containing an enum', async () => {
  // plain Node: TypeScript enum is not supported in strip-only mode
  const mod = await import(u('enum.config.ts')) as { default: unknown }
  expect(mod.default).toEqual({ source: { entry: 'dev' } })
})

test('.ts config containing a const enum', async () => {
  // plain Node: TypeScript enum is not supported in strip-only mode
  const mod = await import(u('const-enum.config.ts')) as { default: unknown }
  expect(mod.default).toEqual({ source: { entry: 'dev' } })
})
