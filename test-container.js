const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const containerInfo = await page.evaluate(() => {
    const container = document.querySelector('div[class*="min-h-[180px]"]');
    if (container) {
      const rect = container.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        className: container.className
      };
    }
    return { error: 'container not found' };
  });
  
  console.log('Assets container:', JSON.stringify(containerInfo, null, 2));
  
  await browser.close();
})();
