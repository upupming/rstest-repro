import { expect, rstest, test } from '@rstest/core'

// NO static import of @rsbuild/core in this file.
rstest.mock('@rsbuild/core', { mock: true })

// Under pnpm the automock is invisible to a dynamic-only import — the test
// receives the real module. Under npm (repo root) the same case passes.
test('automock visible to dynamic import (no static anchor)', async () => {
  const core = await import('@rsbuild/core')
  expect(rstest.isMockFunction(core.createRsbuild)).toBe(true)
})
