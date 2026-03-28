// scripts/uniformize-product-images.mjs
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = './public/images/products';
const OUTPUT_DIR = './public/images/products/uniform';
const CANVAS_SIZE = 1000;
const PRODUCT_MAX_SIZE = 750; // 75% de 1000px
const BG_COLOR = { r: 250, g: 247, b: 242 }; // #FAF7F2 (crème du site)

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
    
    // Calculate resize dimensions (70-80% of canvas space)
    const targetSize = Math.floor(CANVAS_SIZE * 0.75); // 75% = 750px
    const resizedImage = await sharp(inputPath)
      .resize(targetSize, targetSize, {
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

    // Create shadow with specifications exactes
    const shadowSvg = `
      <svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}">
        <defs>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          </filter>
        </defs>
        <ellipse 
          cx="${CANVAS_SIZE / 2}" 
          cy="${top + imgHeight - 20}" 
          rx="${imgWidth * 0.4}" 
          ry="15" 
          fill="rgba(200, 169, 110, 0.15)" 
          filter="url(#blur)" 
        />
      </svg>
    `;

    // Create final image with cream background
    const result = await sharp({
      create: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        channels: 4,
        background: { ...BG_COLOR, alpha: 1 }
      }
    })
    .composite([
      // Shadow layer
      {
        input: Buffer.from(shadowSvg),
        top: 0,
        left: 0,
      },
      // Product image (détouré et centré)
      {
        input: resizedImage,
        top: top,
        left: left,
      }
    ])
    .png({ quality: 90 })
    .toFile(outputPath);

    console.log(`✅ Done: ${filename} (${imgWidth}x${imgHeight}) - ${Math.round((imgWidth/CANVAS_SIZE)*100)}% du canvas`);
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

  console.log(`\n🎨 Uniformisation de ${files.length} images produits...\n`);
  console.log(`   Canvas: ${CANVAS_SIZE}x${CANVAS_SIZE}px carré`);
  console.log(`   Fond: #FAF7F2 (crème du site)`);
  console.log(`   Produit: 70-80% de l'espace, détourné et centré`);
  console.log(`   Ombre: #C8A96E dorée, flou 25, opacity 15%\n`);

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
