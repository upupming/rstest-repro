import { expect, rstest, test } from '@rstest/core'

// NO static import of @rsbuild/core in this file.
rstest.mock('@rsbuild/core', { mock: true })

test('automock of @rsbuild/core, dynamic-import view', async () => {
  const core = await import('@rsbuild/core')
  expect(rstest.isMockFunction(core.createRsbuild)).toBe(true)
})
