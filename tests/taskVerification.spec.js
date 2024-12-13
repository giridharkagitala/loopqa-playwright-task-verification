const { test, expect } = require('@playwright/test');
const testCases = require('../data/testCases.json');
const { login } = require('../utils/login');

test.describe('Task Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Perform login before each test
    await login(page);
  });

  testCases.forEach(({ section, task, column, tags }) => {
    test(`Verify task "${task}" in section "${section}"`, async ({ page }) => {
        console.log(`Starting test for task: "${task}" in section: "${section}"`);
    
        // Navigate to the correct section
        console.log(`Clicking on section: "${section}"`);
        await page.click(`button:has-text("${section}")`);
        console.log(`Successfully navigated to section: "${section}"`);
    
        // Find the task container using a more specific selector
        console.log(`Locating task container for task: "${task}"`);
        const taskContainer = page.locator(
          `div.bg-white.p-4.rounded-lg.shadow-sm.border:has(h3:has-text("${task}"))`
        );
        const taskCount = await taskContainer.count();
        console.log(`Found ${taskCount} task container(s) for task: "${task}"`);
        await expect(taskContainer).toBeVisible();
        console.log(`Task container is visible for task: "${task}"`);
    
        // Verify the column header
        console.log(`Locating column: "${column}"`);
        const columnLocator = page.locator(`h2:has-text("${column}")`);
        await expect(columnLocator).toBeVisible();
        console.log(`Column "${column}" is visible`);
    
        // Verify tags associated with the task
        for (const tag of tags) {
          console.log(`Verifying tag: "${tag}" for task: "${task}"`);
          const tagLocator = taskContainer.locator(`span:has-text("${tag}")`);
          await expect(tagLocator).toBeVisible();
          console.log(`Tag "${tag}" is visible for task: "${task}"`);
        }
    
        console.log(`Test for task: "${task}" in section: "${section}" completed successfully`);
      
    });
  });
});
