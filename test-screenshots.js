const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const viewportSizes = [
    { name: 'tablet-landscape', width: 1024, height: 768 },
    { name: 'tablet-portrait', width: 768, height: 1024 },
    { name: 'mobile-large', width: 414, height: 896 },
    { name: 'mobile-small', width: 375, height: 667 }
  ];

  for (const size of viewportSizes) {
    const page = await context.newPage();
    await page.setViewportSize({ width: size.width, height: size.height });

    console.log(`\n=== Testing ${size.name} (${size.width}x${size.height}) ===`);

    try {
      await page.goto('https://portfolio-next-eight-khaki.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Full page screenshot
      await page.screenshot({
        path: `.screenshots/${size.name}-fullpage.png`,
        fullPage: true
      });
      console.log(`  ✓ Full page screenshot captured`);

      // Check for issues
      const issues = [];

      // Check if BentoGrid is visible
      const bentoGrid = await page.$('.grid, [class*="grid"]');
      if (bentoGrid) {
        const gridBox = await bentoGrid.boundingBox();
        console.log(`  ✓ BentoGrid found: ${gridBox?.width}x${gridBox?.height}px`);

        // Check grid items
        const cards = await page.$$('[class*="bento-card"], [class*="ProjectCard"]');
        console.log(`  ✓ Found ${cards.length} project cards`);
      }

      // Check for horizontal scroll issues
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      if (bodyWidth > viewportWidth) {
        issues.push(`Horizontal overflow detected: body=${bodyWidth}px, viewport=${viewportWidth}px`);
      }

      // Check text overflow
      const textElements = await page.$$('h1, h2, h3, p');
      for (const el of textElements.slice(0, 10)) {
        const overflow = await page.evaluate((element) => {
          return element.scrollWidth > element.offsetWidth;
        }, el);
        if (overflow) {
          issues.push(`Text overflow detected in element`);
        }
      }

      // Check for broken images
      const images = await page.$$('img');
      for (const img of images.slice(0, 5)) {
        const naturalWidth = await img.evaluate((i) => i.naturalWidth);
        if (naturalWidth === 0) {
          console.log(`  ⚠ Broken image detected`);
        }
      }

      // Report issues
      if (issues.length > 0) {
        console.log(`  ❌ Issues found:`);
        issues.forEach(issue => console.log(`     - ${issue}`));
      } else {
        console.log(`  ✓ No visual issues detected`);
      }

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('\n✅ All viewport tests completed!');
})();
