import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page without errors', async ({ page }) => {
    const errors: any[] = [];
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    // wait for network call to https://api2.amplitude.com/2/httpapi
    // timeout after 5 seconds
    const request = page.waitForRequest(async (request) => {
      return request.url().includes('/2/httpapi');
    });

    // Navigate to the home page
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    await Promise.race([
      request,
      new Promise((resolve, reject) => setTimeout(() => {
        reject(new Error('Test failure. Timed out waiting for API call'));
      }, 5000)),
    ]);

    // Check for errors
    expect(errors).toHaveLength(0);
  });
});
