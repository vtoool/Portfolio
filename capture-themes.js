import { chromium } from 'playwright';

async function captureThemeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = 'https://portfolio-next-eight-khaki.vercel.app';
  
  // Capture light theme
  console.log('Capturing light theme...');
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  
  // Force light theme via localStorage
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'light-theme-updated.png', fullPage: true });
  console.log('Light theme screenshot saved to light-theme-updated.png');
  
  // Capture dark theme
  console.log('Capturing dark theme...');
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'dark-theme-updated.png', fullPage: true });
  console.log('Dark theme screenshot saved to dark-theme-updated.png');
  
  await browser.close();
  console.log('Done!');
}

captureThemeScreenshots().catch(console.error);
