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
- mocking a Node builtin (`node:os`) works for the source module too — see
  the limitation in section 7
- `rstest.mock(...)` inside a test body now works
- automock without a static import anchor works (lodash-es and
  @rsbuild/core, both npm and a standalone pnpm project)

## 6. Remaining issue (root cause found): automock invisible to dynamic imports when the host `@rspack/core` is older than 2.0.8

Minimal repro: **`pnpm-automock-demo/`** — a standalone pnpm project that pins
`@rspack/core` to **2.0.6** via `pnpm.overrides`:

```bash
cd pnpm-automock-demo
pnpm install
npx rstest run     # 1 failed: automock invisible to dynamic-only import
                   # (the static-import control passes)
```

Root cause (verified by diffing the compiled output in `dist/.rstest-temp`
with `DEBUG=rstest`):

- with `@rspack/core` **2.0.8**, a dynamic `import('@rsbuild/core')` compiles
  to a call wrapped with the runtime mock lookup:

  ```js
  __webpack_require__.e("_rsbuild_core").then(
    __webpack_require__.rstest_dynamic_require
      ? __webpack_require__.rstest_dynamic_require.bind(..., "@rsbuild/core?e6a1", "@rsbuild/core")
      : __webpack_require__.bind(..., "@rsbuild/core?e6a1"))
  ```

- with `@rspack/core` **2.0.6**, the native `RstestPlugin` does not emit the
  `rstest_dynamic_require` wrapper at all:

  ```js
  __webpack_require__.e("_rsbuild_core").then(
    __webpack_require__.bind(__webpack_require__, "@rsbuild/core?e27c"))
  ```

  so the doppelganger module is loaded directly and the registered mock
  (keyed on a different module id, `@rsbuild/core?5ad7`) is silently
  bypassed — the test receives the real module.

This is why it reproduced in `lynx-family/lynx-stack` (which pins
`@rspack/core` to 2.0.6 workspace-wide) but not in this repo: rstest resolves
whatever `@rspack/core` the host installation provides, and silently degrades
when the host version lacks the injection support.

**Suggestion:** have `@rstest/core` check the resolved `@rspack/core` version
(or feature-detect `rspack.experiments.RstestPlugin`'s
`injectDynamicImportOrigin` support) and fail loudly / warn instead of
silently compiling mocks that dynamic imports bypass — same spirit as the
new loud error for aliased `rstest.mock` calls.


## 7. Node-builtin mock: works, but test-body `mockReturnValue` needs the `default` export

Contrary to the older `0.10.3` belief that "rstest can't mock Node builtins",
the current canary **can** mock them (both factory and automock forms reach the
source module). The real, narrower limitation surfaces only when the return
value is set from the **test body** via `rstest.mocked(...).mockReturnValue(...)`:

```bash
npx rstest run test/builtin-mock-namespace-limitation.test.ts   # 2 passed
```

| how the SOURCE reads the builtin | test-body `mockReturnValue` reaches src? |
|---|---|
| `const { default: os } = await import('node:os')` | ✅ yes |
| `const os = await import('node:os'); os.networkInterfaces()` (namespace named export) | ❌ no — src gets the auto-stub (undefined) |

After `automock`, a builtin's **namespace named export** and its **`default`**
export are different mock references, so a `mockReturnValue` applied to the
`default` one is invisible to source code that reads the namespace named
export. This is why `@lynx-js/rspeedy`'s `findIp` source was switched to read
`import('node:os')`'s `default` export (so the test's mock — applied to the
same `default` object — is visible to `src`).

**Suggestion:** make the automocked namespace named exports and `default`
share the same mock function reference, so `mockReturnValue` on either is
visible regardless of how the consumer imports the builtin.


## Environment

- Node.js: v24.12.0
- OS: macOS (darwin, arm64)
