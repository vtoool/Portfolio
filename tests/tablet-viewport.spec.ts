import { test, expect } from '@playwright/test';

test('Tablet portrait - hero section (768x1024)', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-tablet-portrait-768x1024.png',
    fullPage: false
  });
});

test('Square viewport - hero section (800x800)', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-square-800x800.png',
    fullPage: false
  });
});

test('Small tablet - hero section (600x800)', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-small-tablet-600x800.png',
    fullPage: false
  });
});
