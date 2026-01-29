const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  const breakpoint = await page.evaluate(() => {
    return window.innerWidth < 640 ? 'mobile' : window.innerWidth < 768 ? 'tablet' : 'desktop';
  });
  
  console.log('Viewport width:', await page.evaluate(() => window.innerWidth));
  console.log('Detected breakpoint:', breakpoint);
  
  // Check if assets container exists
  const hasAssets = await page.evaluate(() => {
    const assets = document.querySelectorAll('.floating-asset');
    return assets.length;
  });
  
  console.log('Number of floating assets found:', hasAssets);
  
  await browser.close();
})();
