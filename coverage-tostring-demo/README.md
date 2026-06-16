# coverage + `Function.prototype.toString()` codegen

Minimal demo of why migrating a project's coverage from **v8** to **istanbul**
breaks the common "ship a runtime by `.toString()`-ing a function" codegen
pattern (webpack/rspack `Template.getFunctionContent`, used by
`@lynx-js/chunk-loading-webpack-plugin` and friends).

## What it shows

`src/runtime-template.js` exports a function whose **body** is later extracted
via `fn.toString()` and executed as standalone code (`new Function(body)()`) —
exactly how plugins emit runtime into a bundle. The test asserts the extracted
body is self-contained.

Under **istanbul** (source instrumentation) the body becomes:

```js
cov_xxxx().f[0]++;
var x = (cov_xxxx().s[0]++, 1);
return x + 1;
```

The matching `var cov_xxxx = …` declaration lives at **module scope**, so it is
not part of the extracted body → running the body elsewhere throws
`cov_xxxx is not defined`.

## Results

```bash
npm install
npm test                                   # rstest + istanbul  -> 1 FAIL (plain), 2 pass
npm run test:vitest                        # vitest + istanbul  -> 1 FAIL (plain), 2 pass  (identical)
npx rstest run --coverage -c rstest.v8.config.ts   # rstest + v8 -> 3 pass
npm run test:no-coverage                   # rstest, no coverage -> 3 pass
```

| provider | plain template | `/* istanbul ignore file */` (1st line) | ignore after a leading block comment |
| --- | --- | --- | --- |
| rstest + istanbul | ❌ instrumented | ✅ honored | ✅ honored |
| vitest + istanbul | ❌ instrumented | ✅ honored | ✅ honored |
| rstest + v8 | ✅ clean | ✅ | ✅ |

## Conclusion — **not an rstest bug**

- rstest's istanbul provider behaves **identically to vitest's** istanbul
  provider. The breakage is inherent to *any* istanbul (source-instrumentation)
  coverage meeting the `.toString()`-as-codegen pattern.
- `/* istanbul ignore file */` **is** honored by rstest (first line *or* after a
  leading block comment).
- rstest's **v8** provider (`@rstest/coverage-v8`) does not instrument source,
  so it does not break this pattern — same as the `@vitest/coverage-v8` a
  project would have used before migrating.

### Fixes for a real project

1. Switch the rstest coverage provider to **v8** (`@rstest/coverage-v8`,
   `coverage.provider: 'v8'`) — matches pre-migration v8 behavior, no source
   instrumentation, nothing else to do.
2. Or keep istanbul and put `/* istanbul ignore file */` at the top of every
   runtime-template file that gets `.toString()`-emitted into a bundle.
