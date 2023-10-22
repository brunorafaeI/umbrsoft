import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    include: ['src/**/*.test.ts'],
  },
  plugins: [tsconfigPaths()],
})