const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check z-index of text content by looking at the bio card
  const textCardZIndex = await page.evaluate(() => {
    const cards = document.querySelectorAll('[class*="bg-white"]');
    for (const card of cards) {
      const style = window.getComputedStyle(card);
      if (style.backgroundColor.includes('255')) { // white bg
        return { zIndex: style.zIndex, className: card.className };
      }
    }
    return { zIndex: 'not found', className: '' };
  });
  
  console.log('Text card z-index:', textCardZIndex.zIndex);
  
  // Check asset z-indices
  const assetZIndices = await page.evaluate(() => {
    const assets = document.querySelectorAll('.floating-asset');
    return Array.from(assets).map(el => window.getComputedStyle(el).zIndex);
  });
  
  console.log('Asset z-indices:', assetZIndices.join(', '));
  
  // Check if assets are actually rendered
  const imageInfo = await page.evaluate(() => {
    const imgs = document.querySelectorAll('.floating-asset img');
    return Array.from(imgs).map((img, i) => ({
      index: i,
      src: img.src.split('/').pop(),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      offsetTop: img.offsetTop,
      offsetLeft: img.offsetLeft,
      offsetParent: img.offsetParent ? img.offsetParent.tagName : 'none'
    }));
  });
  
  console.log('\nImage details:');
  imageInfo.forEach(img => {
    console.log(`${img.src}: naturalSize=${img.naturalWidth}x${img.naturalHeight}, offsetTop=${img.offsetTop}, offsetLeft=${img.offsetLeft}, parent=${img.offsetParent}`);
  });
  
  await browser.close();
})();
