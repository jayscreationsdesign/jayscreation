const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration de l'optimisation
const config = {
  formats: ['webp', 'avif'],
  quality: 85,
  progressive: true,
  optimizeScans: true
};

// Dossiers à analyser
const imageDirs = [
  'public/images/products',
  'public/images/logo',
  'public/images',
  'public'
];

// Extensions d'images à traiter
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`\nAnalyse de: ${path.basename(inputPath)}`);
    console.log(`  Taille originale: ${metadata.width}x${metadata.height}`);
    console.log(`  Format: ${metadata.format}`);
    console.log(`  Taille fichier: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`);
    
    // Créer le dossier de sortie si nécessaire
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Optimiser l'image originale
    await image
      .jpeg({ quality: config.quality, progressive: config.progressive })
      .png({ progressive: config.progressive, optimizeScans: config.optimizeScans })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`  Taille optimisée: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`  Économie: ${savings}%`);
    
    // Générer les formats modernes
    for (const format of config.formats) {
      const formatPath = outputPath.replace(/\.[^/.]+$/, `.${format}`);
      await image
        .toFormat(format, { quality: config.quality })
        .toFile(formatPath);
      
      const formatSize = fs.statSync(formatPath).size;
      console.log(`  Format ${format}: ${(formatSize / 1024).toFixed(2)} KB`);
    }
    
    return {
      original: (originalSize / 1024).toFixed(2),
      optimized: (optimizedSize / 1024).toFixed(2),
      savings: savings
    };
  } catch (error) {
    console.error(`Erreur lors du traitement de ${inputPath}:`, error.message);
    return null;
  }
}

async function findImages(dir) {
  const images = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`Le dossier ${dir} n'existe pas`);
    return images;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Ignorer les dossiers node_modules et .next
      if (!['node_modules', '.next', '.git'].includes(file)) {
        images.push(...await findImages(filePath));
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        images.push(filePath);
      }
    }
  }
  
  return images;
}

async function optimizeAllImages() {
  console.log('=== Analyse et optimisation des images ===\n');
  
  let totalImages = 0;
  let totalSavings = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const dir of imageDirs) {
    console.log(`\nRecherche dans: ${dir}`);
    const images = await findImages(dir);
    console.log(`Images trouvées: ${images.length}`);
    
    for (const imagePath of images) {
      // Créer le chemin de sortie optimisé
      const relativePath = path.relative('public', imagePath);
      const outputPath = path.join('public/optimized', relativePath);
      
      const result = await optimizeImage(imagePath, outputPath);
      
      if (result) {
        totalImages++;
        totalSavings += parseFloat(result.savings);
        totalOriginalSize += parseFloat(result.original);
        totalOptimizedSize += parseFloat(result.optimized);
      }
    }
  }
  
  console.log('\n=== RÉSULTATS GLOBAUX ===');
  console.log(`Total images traitées: ${totalImages}`);
  console.log(`Taille totale originale: ${totalOriginalSize.toFixed(2)} KB`);
  console.log(`Taille totale optimisée: ${totalOptimizedSize.toFixed(2)} KB`);
  console.log(`Économie totale: ${totalSavings.toFixed(2)}%`);
  console.log(`Espace économisé: ${(totalOriginalSize - totalOptimizedSize).toFixed(2)} KB`);
  
  // Générer un rapport
  const report = {
    date: new Date().toISOString(),
    totalImages,
    totalOriginalSize: totalOriginalSize.toFixed(2),
    totalOptimizedSize: totalOptimizedSize.toFixed(2),
    totalSavings: totalSavings.toFixed(2),
    spaceSaved: (totalOriginalSize - totalOptimizedSize).toFixed(2)
  };
  
  fs.writeFileSync('image-optimization-report.json', JSON.stringify(report, null, 2));
  console.log('\nRapport sauvegardé dans: image-optimization-report.json');
}

// Exécuter l'optimisation
optimizeAllImages().catch(console.error);
