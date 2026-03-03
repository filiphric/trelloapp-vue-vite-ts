import { defineConfig } from '@playwright/test'
import constants from './constants'
const { APP } = constants

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 1,
  timeout: 60000,
  use: {
    baseURL: `http://localhost:${APP}`,
    viewport: { width: 700, height: 550 },
    actionTimeout: 10000,
    trace: 'on-first-retry',
    testIdAttribute: 'data-test-id',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'logged-in',
      dependencies: ['setup'],
      use: {
        storageState: 'e2e/.auth/user.json',
      },
      testIgnore: [/auth\.setup\.ts/, /(login|signup)\.spec\.ts/],
    },
    {
      name: 'no-auth',
      testMatch: [/(login|signup)\.spec\.ts/],
      use: {
        storageState: { cookies: [], origins: [] },
      },
    },
  ],
})
