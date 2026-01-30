import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3002';

test('Mobile - hero section (390x844)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-mobile-390x844.png',
    fullPage: false
  });
});

test('Desktop - hero section (1920x1080)', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-desktop-1920x1080.png',
    fullPage: false
  });
});

test('Tablet portrait - hero section (768x1024)', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-tablet-portrait-768x1024.png',
    fullPage: false
  });
});

test('Square viewport - hero section (800x800)', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-square-800x800.png',
    fullPage: false
  });
});

test('Small tablet - hero section (600x800)', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 800 });
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-small-tablet-600x800.png',
    fullPage: false
  });
});

test('Galaxy Fold - hero section (344x882)', async ({ page }) => {
  await page.setViewportSize({ width: 344, height: 882 });
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000); // Wait for animations
  await page.screenshot({
    path: '.screenshots/hero-galaxy-fold-344x882.png',
    fullPage: false
  });
});
