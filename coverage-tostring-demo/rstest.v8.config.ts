import { defineConfig } from '@rstest/core'
export default defineConfig({
  include: ['test/**/*.test.ts'],
  globals: true,
  coverage: { provider: 'v8', include: ['src/**'], reporters: ['text'] },
})
