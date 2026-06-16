import { expect, test, vi } from 'vitest'

// Same scenario as `reexport-mock.test.ts`, but under vitest. `@rsbuild/core`
// RE-EXPORTS `logger`: `export { logger, ... } from "./756.js"`.
import { logger } from '@rsbuild/core'

import { callLoggerError } from '../src/rsbuild-logger-consumer.js'

vi.mock('@rsbuild/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@rsbuild/core')>()
  return {
    ...actual,
    logger: {
      ...actual.logger,
      error: vi.fn(),
    },
  }
})

// CONTRAST with rstest: vitest correctly makes the re-exported `logger.error`
// the mock (rstest's `reexport-mock.test.ts` gets `undefined` here).
test('vitest: the re-exported logger.error IS the mock', () => {
  expect(vi.isMockFunction(logger.error)).toBe(true)
})

// And the mock reaches the consumer module too.
test('vitest: the consumer sees the mocked re-exported logger', () => {
  const mockedError = logger.error
  callLoggerError() // the consumer calls `logger.error(...)`
  expect(mockedError).toHaveBeenCalledTimes(1)
})
