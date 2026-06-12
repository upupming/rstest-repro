// NOTE: this file does NOT import 'lodash-es' itself.

rstest.mock('lodash-es', () => {
  return {
    add: rstest.fn(() => 100),
  }
})

// lodash-es lives in node_modules, so rstest externalizes it (loaded
// natively, outside the bundle graph). Without a static `import ... from
// 'lodash-es'` in THIS test file, the mock above is a silent no-op for
// `src/math.ts` — it keeps calling the real `add`.
test('mock without a static import anchor — silently ineffective', async () => {
  const {add} = await import('lodash-es')
  // ❗ One would expect 100 here (and vitest would give 100).
  expect(add(1, 2)).toBe(3)
})
