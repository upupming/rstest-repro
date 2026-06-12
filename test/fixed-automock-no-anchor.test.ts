import { expect, rstest, test } from '@rstest/core'

rstest.mock('lodash-es', { mock: true })

test('B automock without static anchor effective', async () => {
  const { add } = await import('lodash-es')
  expect(rstest.isMockFunction(add)).toBe(true)
})
