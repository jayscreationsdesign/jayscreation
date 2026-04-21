const fs = require('fs');
const content = fs.readFileSync('src/components/produit/ProductGallery.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('aspect') || line.includes('max-w') || line.includes('w-') || line.includes('h-') || line.includes('product-gallery')) {
    console.log((i+1) + ': ' + line.trim());
  }
});
