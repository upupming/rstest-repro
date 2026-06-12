import os from 'node:os'
import { expect, rstest, test } from '@rstest/core'

rstest.mock('node:os', () => {
  return { ...rstest.requireActual<typeof import('node:os')>('node:os'), hostname: rstest.fn(() => 'MOCKED') }
})

test('A builtin mock effective', () => {
  expect(os.hostname()).toBe('MOCKED')
})

test('C in-body mock effective', async () => {
  rstest.mock('lodash-es', () => ({ add: rstest.fn(() => 100) }))
  const { add } = await import('lodash-es')
  expect(add(1, 2)).toBe(100)
})
