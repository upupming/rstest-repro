import { expect, rstest, test } from '@rstest/core'
// The only difference from top-mock.test.ts: this static import "anchors"
// lodash-es into the test file's module graph.
import { add } from 'lodash-es'

import { calc } from '../src/math.js'

rstest.mock('lodash-es', () => {
  return {
    add: rstest.fn(() => 100),
  }
})

test('same mock with a static import anchor — works', () => {
  expect(rstest.isMockFunction(add)).toBe(true)
  expect(calc()).toBe(100)
})
