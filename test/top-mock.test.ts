import { expect, rstest, test } from '@rstest/core'

import { calc } from '../src/math.js'

// NOTE: this file does NOT import 'lodash-es' statically.

rstest.mock('lodash-es', () => {
  return {
    add: rstest.fn(() => 100),
  }
})

// lodash-es lives in node_modules and is externalized by rstest. With
// @rstest/core 0.10.3 the mock could silently miss consumers when this file
// had no static `import ... from 'lodash-es'` anchor; fixed in the
// pkg.pr.new build (ad1ccf8) — both the test's own dynamic import and
// `src/math.ts` see the mock now.
test('mock without a static import anchor', async () => {
  const { add } = await import('lodash-es')
  expect(add(1, 2)).toBe(100)
  expect(calc()).toBe(100)
})
