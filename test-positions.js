const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const positions = await page.evaluate(() => {
    const assets = document.querySelectorAll('.floating-asset');
    return Array.from(assets).map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        index: i,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        opacity: window.getComputedStyle(el).opacity,
        visibility: window.getComputedStyle(el).visibility,
        zIndex: window.getComputedStyle(el).zIndex
      };
    });
  });
  
  console.log('Asset positions and styles:');
  positions.forEach(p => {
    console.log(`Asset ${p.index}: top=${p.top.toFixed(0)}px, left=${p.left.toFixed(0)}px, size=${p.width.toFixed(0)}x${p.height.toFixed(0)}px, opacity=${p.opacity}, visibility=${p.visibility}, zIndex=${p.zIndex}`);
  });
  
  await browser.close();
})();
