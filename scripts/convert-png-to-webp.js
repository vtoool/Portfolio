const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const artDir = path.join(process.cwd(), 'public/art');

const pngFiles = fs.readdirSync(artDir).filter(file => file.endsWith('.png'));

async function convertPngToWebp() {
  console.log('Converting PNG files to WebP...\n');

  for (const pngFile of pngFiles) {
    const pngPath = path.join(artDir, pngFile);
    const webpFile = pngFile.replace('.png', '.webp');
    const webpPath = path.join(artDir, webpFile);

    try {
      const stats = fs.statSync(pngPath);
      const pngSize = stats.size;

      await sharp(pngPath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const reduction = ((pngSize - webpStats.size) / pngSize * 100).toFixed(1);

      console.log(`✓ ${pngFile} → ${webpFile}`);
      console.log(`  PNG: ${(pngSize / 1024).toFixed(1)} KB → WebP: ${(webpStats.size / 1024).toFixed(1)} KB (${reduction}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Failed to convert ${pngFile}:`, error.message);
    }
  }

  console.log('Conversion complete!');
}

convertPngToWebp();
