const { chromium } = require('playwright');

const viewports = [
  { name: 'tablet-portrait', width: 768, height: 1024, theme: 'dark' },
  { name: 'tablet-square', width: 800, height: 800, theme: 'dark' },
  { name: 'small-tablet', width: 600, height: 800, theme: 'dark' },
  { name: 'mobile', width: 390, height: 844, theme: 'dark' },
  { name: 'desktop', width: 1920, height: 1080, theme: 'dark' },
  { name: 'tablet-portrait-light', width: 768, height: 1024, theme: 'light' },
  { name: 'tablet-square-light', width: 800, height: 800, theme: 'light' },
  { name: 'small-tablet-light', width: 600, height: 800, theme: 'light' },
  { name: 'mobile-light', width: 390, height: 844, theme: 'light' },
  { name: 'desktop-light', width: 1920, height: 1080, theme: 'light' }
];

async function takeScreenshots() {
  const browser = await chromium.launch();
  
  const url = process.argv[2] || 'https://portfolio-next-nxelcdc23-victors-projects-f085fed5.vercel.app';
  
  console.log(`Taking screenshots of: ${url}`);
  console.log('=====================================\n');
  
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for animations to settle
    await page.waitForTimeout(3000);
    
    // Toggle theme if needed (dark is default, toggle to light for light screenshots)
    if (viewport.theme === 'light') {
      try {
        // Find and click the theme toggle button
        const themeButton = await page.locator('button[aria-label*="theme"]').first();
        if (themeButton) {
          await themeButton.click();
          await page.waitForTimeout(1000);
        }
      } catch (e) {
        console.log(`Could not toggle theme for ${viewport.name}: ${e.message}`);
      }
    }
    
    // Take full page screenshot
    const fileName = `.screenshots/hero-${viewport.name}-${viewport.theme}.png`;
    await page.screenshot({ path: fileName, fullPage: true });
    
    console.log(`✓ Saved ${fileName} (${viewport.width}x${viewport.height})`);
    
    await context.close();
  }
  
  await browser.close();
  
  console.log('\n=====================================');
  console.log('All screenshots captured successfully!');
  console.log('Location: .screenshots/');
}

takeScreenshots().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
