import { expect, rstest, test } from '@rstest/core'

// NO static import of @rsbuild/core in this file.
rstest.mock('@rsbuild/core', { mock: true })

// With @rspack/core pinned to 2.0.6 (see pnpm.overrides) the automock is
// invisible to a dynamic-only import — rspack 2.0.6's RstestPlugin lacks the
// `rstest_dynamic_require` injection, so rstest silently degrades. With
// @rspack/core >= 2.0.8 this test passes.
test('automock visible to dynamic import (no static anchor)', async () => {
  const core = await import('@rsbuild/core')
  expect(rstest.isMockFunction(core.createRsbuild)).toBe(true)
})
