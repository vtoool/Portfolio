const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const consoleMessages = [];
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
    consoleMessages.push(`${msg.type()}: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    errors.push(`Page error: ${err.message}`);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  console.log('=== Console Messages ===');
  consoleMessages.forEach(m => console.log(m));
  
  console.log('\n=== Errors ===');
  errors.forEach(e => console.log(e));
  
  if (errors.length === 0) {
    console.log('No errors found!');
  }
  
  await browser.close();
})();
