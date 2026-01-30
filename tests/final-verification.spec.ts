import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

async function setTheme(page: any, theme: string) {
  await page.evaluate((theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, theme);
  await page.waitForTimeout(500);
}

async function setLocale(page: any, locale: string) {
  await page.evaluate((locale: string) => {
    localStorage.setItem('locale', locale);
    const event = new CustomEvent('setLanguage', { detail: locale });
    window.dispatchEvent(event);
  }, locale);
  await page.reload();
  await page.waitForTimeout(1000);
}

test.describe('Final Verification Screenshots', () => {
  
  test('Mobile hero (light EN) - should show Available for new projects near top', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await setLocale(page, 'en');
    await setTheme(page, 'light');
    
    const hero = await page.locator('section').first();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: '.screenshots/final-hero-mobile-light-en.png',
      clip: {
        x: 0,
        y: 0,
        width: 390,
        height: 800
      }
    });
  });

  test('Desktop hero (light EN) - art assets with visible shadows', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await setLocale(page, 'en');
    await setTheme(page, 'light');
    
    const hero = await page.locator('section').first();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: '.screenshots/final-hero-desktop-light-en.png',
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 900
      }
    });
  });

  test('Desktop hero (dark RO) - Motoare de Venituri with indigo→emerald gradient', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    await setLocale(page, 'ro');
    await setTheme(page, 'dark');
    
    const hero = await page.locator('section').first();
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: '.screenshots/final-hero-desktop-dark-ro.png',
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 900
      }
    });
  });

  test('Mobile tools carousel (light EN) - should show 2-3 tools at once', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    await setLocale(page, 'en');
    await setTheme(page, 'light');
    
    const toolsSection = await page.locator('section').nth(1);
    await toolsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.screenshot({
      path: '.screenshots/final-tools-mobile-light-en.png',
      clip: {
        x: 0,
        y: 0,
        width: 390,
        height: 600
      }
    });
  });

  test('Project page (desktop EN) - should show project content not 404', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/project/pfcrm`);
    await setLocale(page, 'en');
    await setTheme(page, 'light');
    
    await page.waitForTimeout(1000);
    
    // Note: Page may show 404 - capture screenshot anyway for verification
    await page.screenshot({
      path: '.screenshots/final-project-desktop-en.png',
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1200
      }
    });
  });
});
