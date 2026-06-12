# rstest repro / regression suite

Originally a repro for two `@rstest/core@0.10.3` issues; both are **fixed** in
the pkg.pr.new build
`@rstest/core@https://pkg.pr.new/web-infra-dev/rstest/@rstest/core@1c6016a45bcad879db511027bd9e6132ed4b4fac`
(see https://github.com/web-infra-dev/rstest/pull/1357), which this repo now
pins. All tests pass against that build:

```bash
npm install
npx rstest run        # 7 passed
node verify-node.mjs  # plain-Node baseline for every fixture
```

## 1. `await`ing a default-exported Promise from a natively-imported `.ts` module — FIXED

With 0.10.3, dynamically importing (file URL, outside the bundle graph) a
`.ts` module whose `export default` is a Promise, then awaiting `default`,
threw:

```
TypeError: Method Promise.prototype.then called on incompatible receiver [object Module]
```

Plain Node and the identical `.mjs` fixture always worked; independent of the
nearest `package.json` `"type"`. See `test/promise-default.test.ts`.

## 2. Top-level mock of an externalized dependency without a static import anchor — FIXED

With 0.10.3, `rstest.mock('lodash-es', factory)` could silently miss consumers
(e.g. `src/math.ts`) when the test file had no static
`import ... from 'lodash-es'`. See `test/top-mock.test.ts` /
`test/top-mock-with-anchor.test.ts`.

## 3. User-registered `module.register` hooks — verified working

`fixtures/register/` mirrors `@lynx-js/rspeedy`'s custom loader
(`module.register()` hooks that force `.ts` to ESM regardless of package
`"type"`, à la ts-blank-space). `test/register-hooks.test.ts` verifies that
under rstest:

- with the hooks registered, the ESM-syntax `.ts` inside a
  `"type": "commonjs"` package loads (same as plain Node + hooks), and
- without the hooks it is rejected with `Unexpected token 'export'` —
  matching plain-Node behavior exactly.

So with the pinned build there is no remaining conflict between user loader
hooks and rstest.


## 4. loadConfig config-flavor demos (decision feedback, expected to FAIL)

```bash
npx rstest run -c rstest.flavors.config.ts   # 5 failed (by design)
node verify-flavors.mjs                      # plain Node fails with the SAME errors
```

Five config flavors that `@lynx-js/rspeedy`'s `loadConfig` tests covered under
vitest (runtime `import(fileURL)` of user config files):

| flavor | error (identical under rstest and plain Node) |
|---|---|
| CommonJS-syntax `.ts` under `"type": "module"` | `module is not defined in ES module scope` |
| ESM-syntax `.ts` under `"type": "commonjs"` | `Unexpected token 'export'` |
| ESM-syntax `.js` under `"type": "commonjs"` | `Cannot use import statement outside a module` |
| `.ts` with `enum` | `TypeScript enum is not supported in strip-only mode` |
| `.ts` with `const enum` | `TypeScript enum is not supported in strip-only mode` |

These previously passed under vitest only because vite transformed the config
files (full esbuild TS transform + CJS interop). rstest matches plain-Node
behavior exactly, so we do **not** consider these rstest bugs — they are
included to ask the design question: should rstest offer an opt-in vite-like
full TS transform for runtime-imported files, or is "match Node" the intended
(and final) semantics? Our `loadConfig` keeps these cases `test.skip`ped for
now.


## 5. Verified fixed on canary 1c6016a (PR #1414 / #1415)

All kept as passing regression tests in `test/`:

- aliased mock calls (`import { rstest as vi }` + `vi.mock(...)`) now **throw
  loudly** instead of silently no-oping — exactly the failure-visibility we
  hoped for
- automocking a huge module (`rstest.mock('@rsbuild/core', { mock: true })`)
  no longer blows the worker heap (was SIGABRT/OOM)
- factory-mocking a Node builtin (`node:os`) now works
  (`test/fixed-builtin-and-inbody-mock.test.ts`)
- `rstest.mock(...)` inside a test body now works
- automock without a static import anchor works (lodash-es and
  @rsbuild/core, both npm and a standalone pnpm project)

## 6. One remaining case we could NOT minimize (repros only in the lynx-stack monorepo)

In `lynx-family/lynx-stack` (branch `chore/cleanup-webpack-residuals`,
pnpm 11 monorepo), `rstest.mock('@rsbuild/core', { mock: true })` is still
invisible to a **dynamic-only** import (no static anchor in the test file);
with a static `import * as core from '@rsbuild/core'` it works. The same
case passes here both under npm (`test/fixed-automock-rsbuild-dynamic.test.ts`)
and under a standalone pnpm project (`pnpm-automock-demo/`), even with
multiple peer-hashed `@rsbuild/core` instances in `.pnpm` — so it seems to
need the full monorepo dependency graph. Repro inside lynx-stack:

```bash
git clone -b chore/cleanup-webpack-residuals https://github.com/lynx-family/lynx-stack
cd lynx-stack && pnpm install
cd packages/rspeedy/core
cat > test/__probe.test.ts <<'TS'
import { expect, rstest, test } from '@rstest/core'
rstest.mock('@rsbuild/core', { mock: true })
test('automock dynamic view (no anchor)', async () => {
  const core = await import('@rsbuild/core')
  expect(rstest.isMockFunction(core.createRsbuild)).toBe(true)
})
TS
npx rstest run test/__probe.test.ts   # fails: createRsbuild is the real one
```

## Environment

- Node.js: v24.12.0
- OS: macOS (darwin, arm64)
