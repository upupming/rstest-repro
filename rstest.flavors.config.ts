import { defineConfig } from '@rstest/core'

// Decision-feedback demos (expected to FAIL — they match plain-Node
// behavior; vitest used to mask this via vite's transform):
//   npx rstest run -c rstest.flavors.config.ts
export default defineConfig({
  include: ['test-flavors/**/*.test.ts'],
})
