// scripts/uniformize-product-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = './public/images/products';
const OUTPUT_DIR = './public/images/products/uniform';
const CANVAS_SIZE = 1000;
const PRODUCT_MAX_SIZE = 750;
const BG_COLOR = { r: 255, g: 253, b: 250 }; // #FFFDFA (blanc cassé très subtil)

async function uniformizeImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    
    // Skip placeholder
    if (filename === 'placeholder.png') {
      console.log(`⏭️ Skipped: ${filename}`);
      return;
    }

    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate resize dimensions (fit within PRODUCT_MAX_SIZE maintaining ratio)
    const resizedImage = await sharp(inputPath)
      .resize(PRODUCT_MAX_SIZE, PRODUCT_MAX_SIZE, {
        fit: 'inside',
        withoutEnlargement: false,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    // Get resized dimensions
    const resizedMeta = await sharp(resizedImage).metadata();
    const imgWidth = resizedMeta.width;
    const imgHeight = resizedMeta.height;

    // Calculate centered position
    const left = Math.round((CANVAS_SIZE - imgWidth) / 2);
    const top = Math.round((CANVAS_SIZE - imgHeight) / 2);

    // Create sophisticated shadow with multiple layers for depth
    const shadowSvg = `
      <svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}">
        <defs>
          <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
          <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="35" />
          </filter>
          <radialGradient id="bgGradient">
            <stop offset="0%" stop-color="#FFFDFA" />
            <stop offset="100%" stop-color="#FAF9F7" />
          </radialGradient>
        </defs>
        
        <!-- Subtle background gradient -->
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        
        <!-- Main shadow -->
        <ellipse 
          cx="${CANVAS_SIZE / 2}" 
          cy="${top + imgHeight - 15}" 
          rx="${imgWidth * 0.4}" 
          ry="18" 
          fill="rgba(200, 169, 110, 0.08)" 
          filter="url(#blur2)" 
        />
        
        <!-- Secondary shadow for depth -->
        <ellipse 
          cx="${CANVAS_SIZE / 2}" 
          cy="${top + imgHeight - 10}" 
          rx="${imgWidth * 0.3}" 
          ry="12" 
          fill="rgba(200, 169, 110, 0.12)" 
          filter="url(#blur1)" 
        />
      </svg>
    `;

    // Create final image with professional composite
    const result = await sharp({
      create: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        channels: 4,
        background: { ...BG_COLOR, alpha: 1 }
      }
    })
    .composite([
      // Background with gradient and shadows
      {
        input: Buffer.from(shadowSvg),
        top: 0,
        left: 0,
      },
      // Product image
      {
        input: resizedImage,
        top: top,
        left: left,
      }
    ])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outputPath);

    console.log(`✅ Done: ${filename} (${imgWidth}x${imgHeight})`);
  } catch (error) {
    console.error(`❌ Error with ${path.basename(inputPath)}:`, error.message);
  }
}

async function main() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all PNG files
  const files = fs.readdirSync(PRODUCTS_DIR)
    .filter(f => f.endsWith('.png') && f !== 'placeholder.png')
    .filter(f => !fs.statSync(path.join(PRODUCTS_DIR, f)).isDirectory());

  console.log(`\n🎨 Uniformisation professionnelle de ${files.length} images produits...\n`);
  console.log(`   Fond: #FFFDFA (blanc cassé subtil avec dégradé)`);
  console.log(`   Taille: ${CANVAS_SIZE}x${CANVAS_SIZE}px`);
  console.log(`   Produit: max ${PRODUCT_MAX_SIZE}px, centré`);
  console.log(`   Ombre: multicouches dorées sophistiquées\n`);

  for (const file of files) {
    const inputPath = path.join(PRODUCTS_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    await uniformizeImage(inputPath, outputPath);
  }

  console.log(`\n🎉 Terminé ! Images uniformisées dans : ${OUTPUT_DIR}`);
  console.log(`\n📋 Prochaine étape :`);
  console.log(`   1. Vérifie les images dans ${OUTPUT_DIR}`);
  console.log(`   2. Si elles te plaisent, copie-les dans ${PRODUCTS_DIR} pour remplacer les originales`);
}

main();
