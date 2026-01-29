# PNG to WebP Conversion Skill

This skill provides a method to convert PNG images to WebP format for better performance and optimization.

## Usage

### Quick Command
```bash
node scripts/convert-png-to-webp.js
```

### Configuration
Edit `scripts/convert-png-to-webp.js` to customize:
- Input directory: `public/art` (default)
- Quality: 80 (default, range 1-100)
- Output format: WebP

## Benefits
- **89-93% smaller file sizes** compared to PNG
- **Faster page loads** due to reduced bandwidth
- **Better Core Web Vitals** scores (LCP, CLS)
- **Browser support**: All modern browsers support WebP

## Conversion Results (Example)
| File | PNG Size | WebP Size | Reduction |
|------|----------|-----------|-----------|
| Me.png | 594.6 KB | 49.3 KB | 91.7% |
| Guitar.png | 689.5 KB | 47.2 KB | 93.2% |
| Map.png | 572.4 KB | 40.2 KB | 93.0% |
| Plane.png | 247.5 KB | 30.5 KB | 87.7% |
| Gear1.png | 330.8 KB | 34.3 KB | 89.6% |
| Gear2.png | 330.8 KB | 34.3 KB | 89.6% |

## Script Location
`scripts/convert-png-to-webp.js`

## Requirements
- Node.js with Sharp package installed (`npm install sharp`)
- Sharp is already a dependency of Next.js

## Manual Conversion
If you need to convert a single file:
```javascript
const sharp = require('sharp');

sharp('input.png')
  .webp({ quality: 80 })
  .toFile('output.webp');
```

## Updating References
After conversion, update file references in your code:
```bash
# In TypeScript files
replaceAll ".svg" with ".webp"
replaceAll ".png" with ".webp"
```
