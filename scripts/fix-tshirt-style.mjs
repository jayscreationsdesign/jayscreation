import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = './public/images/products';
const SIZE = 1000;
const MAX = 700;
const BG = { r: 250, g: 247, b: 242 };

// Images T-Shirt à corriger pour correspondre au style de la troisième image
const TSHIRT_IMAGES = [
  't-shirt-personnalise.png',
  't-shirt-kael.png',
  't-shirt-kael1.png',
  't-shirt-lara.png',
  't-shirt-philou.png'
];

async function processTShirtImage(imageName) {
  const filePath = path.join(INPUT_DIR, imageName);

  if (!fs.existsSync(filePath)) {
    console.log('⏭️ Skip: ' + imageName + ' (fichier non trouvé)');
    return;
  }

  try {
    console.log('🔄 ' + imageName + ' — correction style T-Shirt...');

    // Lire l'image existante
    const image = sharp(filePath);
    
    // Forcer le redimensionnement comme la troisième image
    const resized = await image
      .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: false })
      .png()
      .toBuffer();

    const meta = await sharp(resized).metadata();
    const w = meta.width;
    const h = meta.height;
    const left = Math.round((SIZE - w) / 2);
    const top = Math.round((SIZE - h) / 2);

    // Créer l'ombre exactement comme la troisième image (plus visible)
    const shadow = `<svg width="${SIZE}" height="${SIZE}">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
        </filter>
      </defs>
      <ellipse 
        cx="${SIZE / 2}" 
        cy="${top + h - 5}" 
        rx="${Math.round(w * 0.5)}" 
        ry="20" 
        fill="rgba(80, 80, 80, 0.25)" 
        filter="url(#shadow)"
      />
    </svg>`;

    // Composer l'image finale avec fond crème et ombre plus visible
    await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { ...BG, alpha: 1 } } })
      .composite([
        { input: Buffer.from(shadow), top: 0, left: 0 },
        { input: resized, top, left }
      ])
      .png({ quality: 90 })
      .toFile(filePath + '.tmp');

    // Remplacer l'original
    fs.renameSync(filePath + '.tmp', filePath);
    console.log('✅ ' + imageName + ' (style corrigé)');
  } catch (e) {
    console.error('❌ ' + imageName + ': ' + e.message);
  }
}

async function main() {
  console.log('\n🎨 Correction des images T-SHIRT pour correspondre au style de référence\n');
  console.log('📋 Style cible: Fond crème #FAF7F2 + ombre grise plus visible\n');

  for (const imageName of TSHIRT_IMAGES) {
    await processTShirtImage(imageName);
  }

  console.log('\n🎉 Terminé ! Les T-Shirts ont maintenant le même style que l\'image de référence\n');
  console.log('🔍 Vérifiez le résultat sur http://localhost:3000/boutique?category=flocage');
}

main();
