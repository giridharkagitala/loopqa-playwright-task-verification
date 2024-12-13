const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory where your test files are located
  use: {
    headless: false, // Run tests in headless mode
    baseURL: process.env.BASE_URL, // Load base URL from .env file
    screenshot: 'only-on-failure', // Take screenshots on test failure
    trace: 'retain-on-failure', // Retain trace files for failed tests
  },
});
