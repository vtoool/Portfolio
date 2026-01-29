const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  const assetStyles = await page.evaluate(() => {
    const assets = document.querySelectorAll('.floating-asset');
    return Array.from(assets).map((el, i) => {
      const style = window.getComputedStyle(el);
      return {
        index: i,
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
        position: style.position,
        transform: style.transform,
        opacity: style.opacity
      };
    });
  });
  
  console.log('Asset computed styles:');
  assetStyles.forEach(s => {
    console.log(`Asset ${s.index}: top=${s.top}, left=${s.left}, width=${s.width}, height=${s.height}, transform=${s.transform}, opacity=${s.opacity}`);
  });
  
  // Check if images are actually visible
  const imagesVisible = await page.evaluate(() => {
    const imgs = document.querySelectorAll('.floating-asset img');
    return Array.from(imgs).map((img, i) => {
      const style = window.getComputedStyle(img);
      return {
        index: i,
        src: img.src.split('/').pop(),
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        width: style.width,
        height: style.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      };
    });
  });
  
  console.log('\nImage visibility:');
  imagesVisible.forEach(img => {
    console.log(`${img.src}: display=${img.display}, visibility=${img.visibility}, opacity=${img.opacity}, renderedSize=${img.width}x${img.height}, naturalSize=${img.naturalWidth}x${img.naturalHeight}`);
  });
  
  await browser.close();
})();
