const fs = require('fs');
const content = fs.readFileSync('src/app/produit/[slug]/page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('aspect') || line.includes('height') || line.includes('w-') || line.includes('h-') || line.includes('width') || line.includes('image') || line.includes('Image')) {
    console.log((i+1) + ': ' + line.trim());
  }
});
