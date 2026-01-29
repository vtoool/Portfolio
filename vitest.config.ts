import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/tests/**',
      '**/e2e/**',
      '**/*.spec.ts',
      '**/*.spec.tsx'
    ],
    include: ['**/*.test.ts', '**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
});