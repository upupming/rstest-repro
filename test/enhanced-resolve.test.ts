import { expect, rstest, test } from '@rstest/core'

import { create } from 'enhanced-resolve'

test('enhanced-resolve', () => {
  expect(create).toBeDefined()
})
