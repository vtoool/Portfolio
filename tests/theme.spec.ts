import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('[aria-label*="theme"]').first();
    await expect(themeToggle).toBeVisible();
    
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    await expect(html).not.toHaveClass(/dark/);
  });
});
