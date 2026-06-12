import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { expect, test } from '@rstest/core'

// `export default <Promise>` is valid ESM and loads fine under plain Node
// (`node verify-node.mjs`). Awaiting the imported `default` throws
// "Promise.prototype.then called on incompatible receiver [object Module]"
// inside the rstest worker — but only for the `.ts` file: the identical
// `.mjs` fixture passes, so the broken Module wrapper comes from rstest's
// native TS loading path.
test('await a default-exported Promise (.mjs) — control, passes', async () => {
  const url = pathToFileURL(
    join(__dirname, '..', 'fixtures', 'promise.mjs'),
  ).toString()

  const mod = await import(url) as { default: Promise<unknown> }

  await expect(mod.default).resolves.toEqual({ source: { entry: 'promise' } })
})

test('await a default-exported Promise (.ts) — BUG, fails', async () => {
  const url = pathToFileURL(
    join(__dirname, '..', 'fixtures', 'promise.ts'),
  ).toString()

  const mod = await import(url) as { default: Promise<unknown> }

  await expect(mod.default).resolves.toEqual({ source: { entry: 'promise' } })
})
