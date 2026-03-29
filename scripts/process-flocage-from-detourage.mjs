import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const DETOURAGE_DIR = './public/images/products/détourage';
const OUTPUT_DIR = './public/images/products';
const SIZE = 1000;
const MAX = 700;
const BG = { r: 250, g: 247, b: 242 };

// Images du flocage dans le dossier détourage
const FLOCAGE_IMAGES = [
  { source: 'planche-etiquette-thermocollante.png', target: 'planche-etiquette-thermocollante.png' },
  { source: 'lara-Photoroom (1).png', target: 't-shirt-lara.png' },
  { source: 'viper-Photoroom (1).png', target: 't-shirt-kael.png' },
  { source: 'transparent-Photoroom (2) (1).png', target: 't-shirt-personnalise.png' },
  { source: 'tasse-personnalisee.png', target: 't-shirt-kael1.png' }, // Si c'est un t-shirt
  { source: '.png', target: 't-shirt-philou.png' } // Image sans nom
];

async function processFlocageImage(imageInfo) {
  const sourcePath = path.join(DETOURAGE_DIR, imageInfo.source);
  const targetPath = path.join(OUTPUT_DIR, imageInfo.target);

  if (!fs.existsSync(sourcePath)) {
    console.log('⏭️ Skip: ' + imageInfo.source + ' (fichier source non trouvé)');
    return;
  }

  try {
    console.log('🔄 ' + imageInfo.source + ' → ' + imageInfo.target + ' — style papeterie...');

    // Lire l'image détourée
    const image = sharp(sourcePath);
    
    // Redimensionner comme la papeterie
    const resized = await image
      .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: false })
      .png()
      .toBuffer();

    const meta = await sharp(resized).metadata();
    const w = meta.width;
    const h = meta.height;
    const left = Math.round((SIZE - w) / 2);
    const top = Math.round((SIZE - h) / 2);

    // Créer l'ombre exactement comme la papeterie
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

    // Composer l'image finale avec fond crème et ombre identique à la papeterie
    await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { ...BG, alpha: 1 } } })
      .composite([
        { input: Buffer.from(shadow), top: 0, left: 0 },
        { input: resized, top, left }
      ])
      .png({ quality: 90 })
      .toFile(targetPath + '.tmp');

    // Remplacer le fichier cible
    fs.renameSync(targetPath + '.tmp', targetPath);
    console.log('✅ ' + imageInfo.target + ' (style papeterie appliqué)');
  } catch (e) {
    console.error('❌ ' + imageInfo.target + ': ' + e.message);
  }
}

async function main() {
  console.log('\n🎨 Traitement des images FLOCAGE depuis le dossier détourage\n');
  console.log('📋 Style cible: Papeterie personnalisée (fond crème #FAF7F2 + ombre grise)\n');

  for (const imageInfo of FLOCAGE_IMAGES) {
    await processFlocageImage(imageInfo);
  }

  console.log('\n🎉 Terminé ! Les images flocage ont maintenant le style exact de la papeterie\n');
  console.log('🔍 Vérifiez le résultat sur http://localhost:3000/boutique?category=flocage');
}

main();
