import { test, expect } from '@playwright/test';

const locales = ['en', 'ro'];
const themes = ['light', 'dark'];
const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'mobile', width: 390, height: 844 },
];

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
    // Set locale in localStorage if using localStorage-based i18n
    localStorage.setItem('locale', locale);
    // Or update the language context if available
    const event = new CustomEvent('setLanguage', { detail: locale });
    window.dispatchEvent(event);
  }, locale);
  await page.reload();
  await page.waitForTimeout(1000);
}

for (const locale of locales) {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test.describe(`${viewport.name} - ${theme} - ${locale}`, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height } });

        test(`Hero section - ${viewport.name}-${theme}-${locale}`, async ({ page }) => {
          await page.goto('http://localhost:3000');
          await setLocale(page, locale);
          await setTheme(page, theme);
          
          // Take screenshot of hero section
          const hero = await page.locator('section').first();
          await hero.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          
          await page.screenshot({
            path: `.screenshots/hero-${viewport.name}-${theme}-${locale}.png`,
            clip: {
              x: 0,
              y: 0,
              width: viewport.width,
              height: Math.min(viewport.height, 900)
            }
          });
        });

        test(`Tools carousel - ${viewport.name}-${theme}-${locale}`, async ({ page }) => {
          await page.goto('http://localhost:3000');
          await setLocale(page, locale);
          await setTheme(page, theme);
          
          const toolsSection = await page.locator('section').nth(1);
          await toolsSection.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          
          await page.screenshot({
            path: `.screenshots/tools-${viewport.name}-${theme}-${locale}.png`,
            clip: {
              x: 0,
              y: 0,
              width: viewport.width,
              height: Math.min(viewport.height, 600)
            }
          });
        });

        test(`Portfolio section - ${viewport.name}-${theme}-${locale}`, async ({ page }) => {
          await page.goto('http://localhost:3000');
          await setLocale(page, locale);
          await setTheme(page, theme);
          
          await page.locator('#portfolio').scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          
          await page.screenshot({
            path: `.screenshots/portfolio-${viewport.name}-${theme}-${locale}.png`,
            clip: {
              x: 0,
              y: 0,
              width: viewport.width,
              height: Math.min(viewport.height, 1200)
            }
          });
        });

        test(`Services section - ${viewport.name}-${theme}-${locale}`, async ({ page }) => {
          await page.goto('http://localhost:3000');
          await setLocale(page, locale);
          await setTheme(page, theme);
          
          await page.locator('#services').scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          
          await page.screenshot({
            path: `.screenshots/services-${viewport.name}-${theme}-${locale}.png`,
            clip: {
              x: 0,
              y: 0,
              width: viewport.width,
              height: Math.min(viewport.height, 1000)
            }
          });
        });

        test(`Project detail page - ${viewport.name}-${theme}-${locale}`, async ({ page }) => {
          // Test first project page
          await page.goto('http://localhost:3000/project/pfcrm');
          await setLocale(page, locale);
          await setTheme(page, theme);
          
          await page.waitForTimeout(1000);
          
          await page.screenshot({
            path: `.screenshots/project-pfcrm-${viewport.name}-${theme}-${locale}.png`,
            clip: {
              x: 0,
              y: 0,
              width: viewport.width,
              height: Math.min(viewport.height, 1200)
            }
          });
        });
      });
    }
  }
}
