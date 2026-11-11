import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0, // Không retry thao tác tạo booking để tránh tạo đơn trùng.
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['./reporters/FileReporter.ts'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }], ['junit', { outputFile: 'test-results/junit.xml' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://demo5.cybersoft.edu.vn',
    viewport: { width: 1440, height: 1000 },
    locale: 'vi-VN',
    timezoneId: 'Asia/Ho_Chi_Minh',
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
