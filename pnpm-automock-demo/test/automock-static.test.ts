import * as core from '@rsbuild/core'
import { expect, rstest, test } from '@rstest/core'

rstest.mock('@rsbuild/core', { mock: true })

// Control: with a static import anchor the automock works under pnpm too.
test('automock visible via static import', () => {
  expect(rstest.isMockFunction(core.createRsbuild)).toBe(true)
})
