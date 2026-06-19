import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Where Playwright looks for your test scripts
  testDir: './tests',

  // Runs tests within a single file at the same time if possible
  fullyParallel: true,

  // Generates the clean browser-based test execution report
  reporter: 'html',

  use: {
    // Records a visual timeline debug trace only if a test fails and has to retry
    trace: 'on-first-retry',
  },

  // The specific browsers your testing suite runs against
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});