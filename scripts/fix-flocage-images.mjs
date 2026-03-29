import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = './public/images/products';
const SIZE = 1000;
const MAX = 700;
const BG = { r: 250, g: 247, b: 242 };

// Images de la catégorie flocage à traiter
const FLOCAGE_IMAGES = [
  'planche-etiquette-thermocollante.png',
  't-shirt-personnalise.png',
  't-shirt-kael.png',
  't-shirt-kael1.png',
  't-shirt-lara.png',
  't-shirt-philou.png'
];

async function processImage(filePath) {
  const name = path.basename(filePath);

  try {
    console.log('🔄 ' + name + ' — uniformisation flocage...');

    // Lire l'image existante
    const image = sharp(filePath);
    
    // Redimensionner si nécessaire
    const resized = await image
      .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: false })
      .png()
      .toBuffer();

    const meta = await sharp(resized).metadata();
    const w = meta.width;
    const h = meta.height;
    const left = Math.round((SIZE - w) / 2);
    const top = Math.round((SIZE - h) / 2);

    // Créer l'ombre portée identique à la papeterie
    const shadow = `<svg width="${SIZE}" height="${SIZE}">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
        </filter>
      </defs>
      <ellipse 
        cx="${SIZE / 2}" 
        cy="${top + h}" 
        rx="${Math.round(w * 0.45)}" 
        ry="25" 
        fill="rgba(60, 60, 60, 0.18)" 
        filter="url(#shadow)"
      />
    </svg>`;

    // Composer l'image finale avec fond crème et ombre
    await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { ...BG, alpha: 1 } } })
      .composite([
        { input: Buffer.from(shadow), top: 0, left: 0 },
        { input: resized, top, left }
      ])
      .png({ quality: 90 })
      .toFile(filePath + '.tmp');

    // Remplacer l'original
    fs.renameSync(filePath + '.tmp', filePath);
    console.log('✅ ' + name);
  } catch (e) {
    console.error('❌ ' + name + ': ' + e.message);
  }
}

async function main() {
  console.log('\n🎨 Uniformisation des images FLOCAGE avec le style de la papeterie\n');

  for (const imageName of FLOCAGE_IMAGES) {
    const filePath = path.join(INPUT_DIR, imageName);
    if (fs.existsSync(filePath)) {
      await processImage(filePath);
    } else {
      console.log('⏭️ Skip: ' + imageName + ' (fichier non trouvé)');
    }
  }

  console.log('\n🎉 Terminé ! Les images flocage ont maintenant le même style que la papeterie\n');
  console.log('🔍 Vérifiez le résultat sur http://localhost:3000/boutique?category=flocage');
}

main();
