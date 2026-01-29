const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Check image wrapper div
  const wrapperStyles = await page.evaluate(() => {
    const wrappers = document.querySelectorAll('.floating-asset > div');
    return Array.from(wrappers).map((el, i) => {
      const style = window.getComputedStyle(el);
      return {
        index: i,
        position: style.position,
        left: style.left,
        top: style.top,
        transform: style.transform,
        width: style.width,
        height: style.height
      };
    });
  });
  
  console.log('Wrapper div styles:');
  wrapperStyles.forEach(w => {
    console.log(`Wrapper ${w.index}: position=${w.position}, left=${w.left}, top=${w.top}, transform=${w.transform}, size=${w.width}x${w.height}`);
  });
  
  // Check the actual img elements more closely
  const imgDetails = await page.evaluate(() => {
    const imgs = document.querySelectorAll('.floating-asset img');
    return Array.from(imgs).map((img, i) => {
      const style = window.getComputedStyle(img);
      const rect = img.getBoundingClientRect();
      return {
        index: i,
        src: img.src.split('/').pop(),
        display: style.display,
        width: style.width,
        height: style.height,
        maxWidth: style.maxWidth,
        maxHeight: style.maxHeight,
        rectWidth: rect.width,
        rectHeight: rect.height
      };
    });
  });
  
  console.log('\nImage details:');
  imgDetails.forEach(img => {
    console.log(`${img.src}: display=${img.display}, cssSize=${img.width}x${img.height}, maxSize=${img.maxWidth}x${img.maxHeight}, rectSize=${img.rectWidth.toFixed(1)}x${img.rectHeight.toFixed(1)}`);
  });
  
  await browser.close();
})();
