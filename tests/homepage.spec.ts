import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  
  await expect(page).toHaveTitle(/Portfolio|Victor/);
  
  await expect(page.locator('main')).toBeVisible();
});
