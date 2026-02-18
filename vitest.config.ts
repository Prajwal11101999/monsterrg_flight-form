/**
 * Vitest configuration for unit testing
 * 
 * Configuration highlights:
 * - Uses jsdom environment for DOM simulation
 * - Includes all *.spec.ts files from src directory
 * - Provides global test utilities (describe, it, expect) without imports
 * - Generates coverage reports in multiple formats (text, json, html, lcov)
 * 
 * Coverage exclusions:
 * - node_modules, test files, config files, environment files
 * 
 * @see {@link https://vitest.dev/config/} for more options
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    /** Enable global test APIs (describe, it, expect) without imports */
    globals: true,
    
    /** Use jsdom for browser-like DOM environment in tests */
    environment: 'jsdom',
    
    /** Test file pattern - all *.spec.ts files in src directory */
    include: ['src/**/*.spec.ts'],
    
    /** Setup file executed before tests (zone.js configuration) */
    setupFiles: ['src/test-setup.ts'],
    
    /** Code coverage configuration using V8 provider */
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test-setup.ts',
        '**/*.spec.ts',
        '**/*.config.ts',
        'src/environments/**',
      ],
    },
  },
});
