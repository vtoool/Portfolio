const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Test mobile view (iPhone 14 Pro dimensions)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  try {
    console.log('Loading mobile view...');
    await page.goto('https://portfolio-next-eight-khaki.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    console.log('Page title:', await page.title());

    if (errors.length > 0) {
      console.log('Console errors:', JSON.stringify(errors, null, 2));
    } else {
      console.log('No console errors!');
    }

    // Take screenshot
    await page.screenshot({ path: '.screenshots/mobile-art-check.png', fullPage: true });
    console.log('Mobile screenshot saved');

  } catch (err) {
    console.error('Error:', err.message);
  }

  await browser.close();
})();
