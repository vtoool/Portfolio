import { chromium } from 'playwright';

const DEPLOY_URL = 'https://portfolio-next-eight-khaki.vercel.app';

async function testDebugSliders() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
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
    console.log('Testing debug sliders actually work...\n');

    // Test desktop with debug mode
    console.log('1. Testing desktop with debug mode...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(DEPLOY_URL + '?layoutMode=true', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const desktopTitle = await page.title();
    console.log(`   Page loaded: ${desktopTitle}`);

    // Check if debug panel exists
    const debugPanel = await page.$('.fixed.bottom-4.right-4');
    console.log(`   Debug panel visible: ${debugPanel !== null}`);

    // Check for floating assets
    const floatingAssets = await page.$$('.floating-asset');
    console.log(`   Floating assets count: ${floatingAssets.length}`);

    // Test mobile with debug mode
    console.log('\n2. Testing mobile with debug mode...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(DEPLOY_URL + '?layoutMode=true', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const mobileAssets = await page.$$('.floating-asset');
    console.log(`   Mobile floating assets count: ${mobileAssets.length}`);

    // Test slider interaction
    console.log('\n3. Testing slider interaction...');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(DEPLOY_URL + '?layoutMode=true', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Find and click on an asset to expand its controls
    const assetButton = await page.$('button:has-text("Me")');
    if (assetButton) {
      await assetButton.click();
      await page.waitForTimeout(500);

      // Find scale slider and try to adjust it
      const scaleSlider = await page.$('input[type="range"][min="0.1"][max="3"]');
      if (scaleSlider) {
        console.log(`   Scale slider found`);

        // Get initial scale value display
        const initialValue = await page.$eval('input[type="range"][min="0.1"][max="3"]', el => el.nextElementSibling?.textContent);
        console.log(`   Initial scale value: ${initialValue}`);

        // Move slider to a different value
        await scaleSlider.fill('2.5');
        await page.waitForTimeout(500);

        // Check if value changed
        const newValue = await page.$eval('input[type="range"][min="0.1"][max="3"]', el => el.nextElementSibling?.textContent);
        console.log(`   After slider change: ${newValue}`);

        if (initialValue !== newValue) {
          console.log('   ✅ Slider updates value!');
        } else {
          console.log('   ❌ Slider NOT updating');
        }
      } else {
        console.log(`   Scale slider NOT found`);
      }
    } else {
      console.log(`   Asset button NOT found`);
    }

    // Report errors
    if (errors.length > 0) {
      console.log('\n⚠️ Console errors found:');
      errors.forEach(err => console.log(`   - ${err}`));
    } else {
      console.log('\n✅ No console errors detected');
    }

    console.log('\n✅ Debug slider test completed!');

  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testDebugSliders();
