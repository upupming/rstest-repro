import * as core from '@rsbuild/core'
import { expect, rstest, test } from '@rstest/core'

rstest.mock('@rsbuild/core', { mock: true })

test('automock of @rsbuild/core, static-import view', () => {
  expect(rstest.isMockFunction(core.createRsbuild)).toBe(true)
})
