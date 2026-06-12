# rstest repro / regression suite

Originally a repro for two `@rstest/core@0.10.3` issues; both are **fixed** in
the pkg.pr.new build
`@rstest/core@https://pkg.pr.new/web-infra-dev/rstest/@rstest/core@ad1ccf802cc28ef1389064578c9069956d945ad6`
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

## Environment

- Node.js: v24.12.0
- OS: macOS (darwin, arm64)
