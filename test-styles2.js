const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const assets = await page.evaluate(() => {
    const els = document.querySelectorAll('.floating-asset');
    return Array.from(els).map((el, i) => {
      const style = window.getComputedStyle(el);
      return {
        index: i,
        top: style.top,
        left: style.left,
        transform: style.transform,
        width: style.width,
        height: style.height
      };
    });
  });
  
  console.log('Asset computed styles:');
  assets.forEach(a => console.log(`Asset ${a.index}: top=${a.top}, left=${a.left}, transform=${a.transform}, size=${a.width}x${a.height}`));
  
  await browser.close();
})();
