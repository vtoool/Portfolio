const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
  });

  try {
    await page.goto('https://portfolio-next-eight-khaki.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log('Page title:', title);

    const heroSection = await page.$('section');
    if (heroSection) {
      console.log('Hero section found');
    }

    if (errors.length > 0) {
      console.log('Console errors:', errors);
    } else {
      console.log('No console errors detected');
    }

  } catch (err) {
    console.error('Error:', err.message);
  }

  await browser.close();
})();
