import { expect, rstest, test } from '@rstest/core'

// `@rsbuild/core` RE-EXPORTS `logger`:  `export { logger, ... } from "./756.js"`.
// Static named-import "anchor" — the same trick that fixes the *direct-export*
// case in `top-mock-with-anchor.test.ts`.
import { logger } from '@rsbuild/core'

import { callLoggerError } from '../src/rsbuild-logger-consumer.js'

// Mock the package and override the re-exported `logger.error`.
rstest.mock('@rsbuild/core', async () => {
  const actual = await rstest.importActual<typeof import('@rsbuild/core')>(
    '@rsbuild/core',
  )
  return {
    ...actual,
    logger: {
      ...actual.logger,
      error: rstest.fn(),
    },
  }
})

// BUG: after `rstest.mock`, a named import of a RE-EXPORTED binding resolves to
// `undefined` — even with the static anchor. (For a *direct* export the anchor
// makes the import resolve to the mock; see `top-mock-with-anchor.test.ts`.)
// Reproduced on @rstest/core 0.10.4 (and 0.10.5, used by the real project).
test('BUG: mocking a package makes its re-exported binding `undefined`', () => {
  expect(logger).toBeUndefined()
})

// The same `undefined` reaches consumer modules, so the consumer crashes when it
// calls the re-exported binding.
test('BUG: the consumer crashes because its re-exported `logger` is `undefined`', () => {
  expect(() => callLoggerError()).toThrow(
    /Cannot read properties of undefined \(reading 'error'\)/,
  )
})
