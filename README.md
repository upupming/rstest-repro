# rstest repro: `await`ing a default-exported Promise from a natively-imported `.ts` module throws

## Bug

When a test dynamically imports a **`.ts` file outside the bundle graph** (file
URL → handled by rstest's native ESM loading path), and that module
`export default`s a **Promise** (or any thenable), awaiting the imported
`default` throws:

```
TypeError: Method Promise.prototype.then called on incompatible receiver [object Module]
```

The same fixture:

- loads and awaits fine under **plain Node** (`node verify-node.mjs`), and
- works inside rstest when the file is **`.mjs`** instead of `.ts`.

So the Module wrapper produced by rstest's native `.ts` loading path appears to
expose the default export's `then` without binding it back to the underlying
Promise (the brand check in `Promise.prototype.then` then rejects the wrapper
as receiver).

## Reproduce

```bash
npm install
npx rstest run        # 1 failed | 2 passed
node verify-node.mjs  # all fixtures load fine under plain Node
```

- `test/promise-default.test.ts`
  - `.ts` fixture → **fails** with the receiver TypeError (the bug)
  - identical `.mjs` fixture → passes (control)
- `test/ts-cjs-detection.test.ts` → passes (control; shows the native `.ts`
  import path otherwise behaves like Node, including CJS-syntax detection)

## Fixture

```ts
// fixtures/promise.ts
export default Promise.resolve({ source: { entry: 'promise' } })
```

```ts
// test (essence)
const mod = await import(pathToFileURL(p).toString())
await mod.default // 💥 Promise.prototype.then called on incompatible receiver [object Module]
```

## Real-world impact

`@lynx-js/rspeedy`'s `loadConfig` supports `lynx.config.ts` files that
`export default` a Promise; its test suite hits this when running under rstest
(the config is loaded via a runtime `import(fileURL)`, i.e. outside the bundle
graph).

## Environment

- `@rstest/core`: 0.10.3
- Node.js: v24.12.0
- OS: macOS (darwin, arm64)
