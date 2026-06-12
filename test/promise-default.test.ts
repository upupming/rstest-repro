import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { expect, test } from '@rstest/core'

// `export default <Promise>` is valid ESM. With @rstest/core <= 0.10.3 the
// `.ts` variant threw "Promise.prototype.then called on incompatible
// receiver [object Module]"; fixed in the pkg.pr.new build (ad1ccf8).
test('await a default-exported Promise (.mjs)', async () => {
  const url = pathToFileURL(
    join(__dirname, '..', 'fixtures', 'promise.mjs'),
  ).toString()

  const mod = await import(url) as { default: Promise<unknown> }

  await expect(mod.default).resolves.toEqual({ source: { entry: 'promise' } })
})

test('await a default-exported Promise (.ts)', async () => {
  const url = pathToFileURL(
    join(__dirname, '..', 'fixtures', 'promise.ts'),
  ).toString()

  const mod = await import(url) as { default: Promise<unknown> }

  await expect(mod.default).resolves.toEqual({ source: { entry: 'promise' } })
})
