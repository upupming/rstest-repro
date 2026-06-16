// A "source" module (consumer) that imports a RE-EXPORTED binding (`logger`,
// which `@rsbuild/core` re-exports from an internal chunk) and uses it.
// Mirrors `@lynx-js/rspeedy` re-exporting `logger` from `@rsbuild/core`.
import { logger } from '@rsbuild/core'

export function callLoggerError(): void {
  logger.error('hello from the consumer')
}
