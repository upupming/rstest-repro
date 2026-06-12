import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { expect, test, rstest } from '@rstest/core'

// rstest.mocked()

// Control case (passes): `fixtures/cjs-pkg/package.json` has no `"type"`
// field, so Node's module-syntax detection loads this CommonJS-syntax `.ts`
// as CJS — rstest correctly matches plain-Node behavior here, showing the
// native `.ts` import path generally works.
test('dynamic import of a CommonJS-syntax .ts file — control, passes', async () => {
  const url = pathToFileURL(
    join(__dirname, '..', 'fixtures', 'cjs-pkg', 'cjs-style.config.ts'),
  ).toString()

  const mod = await import(url) as { default: { source: { entry: string } } }

  expect(mod.default.source.entry).toBe('cjs-style')
})
