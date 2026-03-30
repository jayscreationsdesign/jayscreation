const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_FOLDER = 'public/images/products/détourage';
const OUTPUT_FOLDER = 'public/images/products';
const SIZE = 2000; // taille finale carrée
const BACKGROUND_COLOR = { r: 246, g: 242, b: 235 }; // #F6F2EB

// Créer le dossier de sortie
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

async function processImage(inputPath, outputPath) {
  try {
    // Lire l'image source
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculer le ratio pour redimensionner sans déformation
    const ratio = Math.min(SIZE / metadata.width, SIZE / metadata.height);
    const newWidth = Math.round(metadata.width * ratio);
    const newHeight = Math.round(metadata.height * ratio);
    
    // Redimensionner l'image
    const resizedImage = await image
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: false,
        kernel: sharp.kernel.lanczos3
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Créer le fond beige
    const background = sharp({
      create: {
        width: SIZE,
        height: SIZE,
        channels: 4,
        background: { ...BACKGROUND_COLOR, alpha: 1 }
      }
    });
    
    // Calculer les coordonnées pour centrer
    const x = Math.floor((SIZE - newWidth) / 2);
    const y = Math.floor((SIZE - newHeight) / 2);
    
    // Composer l'image sur le fond
    await background
      .composite([{
        input: resizedImage.data,
        raw: {
          width: newWidth,
          height: newHeight,
          channels: 4
        },
        left: x,
        top: y
      }])
      .jpeg({
        quality: 95,
        mozjpeg: true,
        progressive: true
      })
      .toFile(outputPath);
    
    console.log(`✅ Traitée : ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Erreur : ${path.basename(inputPath)} - ${error.message}`);
  }
}

async function processFolder() {
  try {
    const files = fs.readdirSync(INPUT_FOLDER);
    
    console.log(`🎨 Traitement des images avec fond #F6F2EB...`);
    console.log(`📁 Dossier source : ${INPUT_FOLDER}`);
    console.log(`📁 Dossier cible : ${OUTPUT_FOLDER}`);
    console.log(`📏 Taille : ${SIZE}x${SIZE}px`);
    console.log('');
    
    for (const filename of files) {
      if (filename.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/)) {
        const inputPath = path.join(INPUT_FOLDER, filename);
        const outputPath = path.join(OUTPUT_FOLDER, filename.replace(/\.[^/.]+$/, '.jpg'));
        
        await processImage(inputPath, outputPath);
      }
    }
    
    console.log('');
    console.log('🎉 Traitement terminé !');
    console.log(`📊 Images traitées : ${files.filter(f => f.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/)).length}`);
    
  } catch (error) {
    console.error('Erreur lors du traitement du dossier :', error);
  }
}

// Fonction pour traiter une seule image
async function processSingleImage(filename) {
  const inputPath = path.join(INPUT_FOLDER, filename);
  const outputPath = path.join(OUTPUT_FOLDER, filename.replace(/\.[^/.]+$/, '.jpg'));
  
  if (fs.existsSync(inputPath)) {
    await processImage(inputPath, outputPath);
  } else {
    console.error(`❌ Fichier non trouvé : ${inputPath}`);
  }
}

// Gestion des arguments de ligne de commande
const args = process.argv.slice(2);

if (args.length === 0) {
  // Traitement de tout le dossier
  processFolder();
} else if (args[0] === '--file' && args[1]) {
  // Traitement d'un fichier spécifique
  processSingleImage(args[1]);
} else {
  console.log('Usage :');
  console.log('  node process-product-images.js              # Traiter tout le dossier');
  console.log('  node process-product-images.js --file nom.jpg # Traiter un fichier spécifique');
}
