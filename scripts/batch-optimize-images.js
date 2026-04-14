// Script pour optimiser toutes les images du projet en lot
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  // Dossiers à traiter
  inputDirs: [
    'public/images',
    'public/images/logo',
    'public/images/products',
    'public/images/gallery'
  ],
  // Formats de sortie
  outputFormats: ['webp', 'avif'],
  // Qualité
  quality: 95,
  // Options de redimensionnement
  sizes: [
    { name: 'small', width: 300 },
    { name: 'medium', width: 600 },
    { name: 'large', width: 1200 }
  ]
};

// Fonction pour vérifier si un fichier est une image
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

// Fonction pour optimiser une image
async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const {
      width,
      height,
      format = 'webp',
      quality = config.quality,
      sharpen = true
    } = options;

    let pipeline = sharp(inputPath);

    // Redimensionnement si nécessaire
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3
      });
    }

    // Amélioration de la netteté
    if (sharpen) {
      pipeline = pipeline.sharpen(1.0, 1.0, 1.5);
    }

    // Application du format
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ 
          quality, 
          effort: 6,
          smartSubsample: true
        });
        break;
      case 'avif':
        pipeline = pipeline.avif({ 
          quality, 
          effort: 6
        });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ 
          quality, 
          progressive: true,
          mozjpeg: true
        });
        break;
      case 'png':
        pipeline = pipeline.png({ 
          compressionLevel: 9,
          adaptiveFiltering: true
        });
        break;
    }

    await pipeline.toFile(outputPath);
    
    // Récupérer les métadonnées
    const metadata = await sharp(outputPath).metadata();
    
    return {
      success: true,
      inputSize: (await fs.stat(inputPath)).size,
      outputSize: metadata.size,
      compression: ((1 - metadata.size / (await fs.stat(inputPath)).size) * 100).toFixed(2),
      metadata
    };
  } catch (error) {
    console.error(`Erreur lors de l'optimisation de ${inputPath}:`, error);
    return { success: false, error: error.message };
  }
}

// Fonction pour traiter un dossier
async function processDirectory(dirPath, outputBaseDir) {
  try {
    const files = await fs.readdir(dirPath);
    const results = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // Traitement récursif des sous-dossiers
        const subDirResults = await processDirectory(filePath, outputBaseDir);
        results.push(...subDirResults);
      } else if (isImageFile(file)) {
        // Traitement de l'image
        const relativePath = path.relative('public', filePath);
        const fileName = path.parse(file).name;
        const fileDir = path.dirname(relativePath);
        
        // Créer le dossier de sortie
        const outputDir = path.join(outputBaseDir, fileDir);
        await fs.mkdir(outputDir, { recursive: true });

        // Générer différents formats et tailles
        for (const format of config.outputFormats) {
          const outputPath = path.join(outputDir, `${fileName}.${format}`);
          const result = await optimizeImage(filePath, outputPath, { format });
          
          if (result.success) {
            results.push({
              input: filePath,
              output: outputPath,
              format,
              ...result
            });
          }
        }

        // Générer différentes tailles
        for (const size of config.sizes) {
          const sizeDir = path.join(outputDir, size.name);
          await fs.mkdir(sizeDir, { recursive: true });

          for (const format of config.outputFormats) {
            const outputPath = path.join(sizeDir, `${fileName}_${size.name}.${format}`);
            const result = await optimizeImage(filePath, outputPath, { 
              format, 
              width: size.width 
            });
            
            if (result.success) {
              results.push({
                input: filePath,
                output: outputPath,
                format,
                size: size.name,
                ...result
              });
            }
          }
        }
      }
    }

    return results;
  } catch (error) {
    console.error(`Erreur lors du traitement du dossier ${dirPath}:`, error);
    return [];
  }
}

// Fonction principale
async function main() {
  console.log('=== Optimisation des images ===');
  console.log('');

  const outputDir = 'public/images/optimized';
  await fs.mkdir(outputDir, { recursive: true });

  let totalResults = [];
  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (const inputDir of config.inputDirs) {
    try {
      await fs.access(inputDir);
      console.log(`Traitement du dossier: ${inputDir}`);
      
      const results = await processDirectory(inputDir, outputDir);
      totalResults.push(...results);

      // Calculer les statistiques
      for (const result of results) {
        if (result.success) {
          totalInputSize += result.inputSize;
          totalOutputSize += result.outputSize;
        }
      }

      console.log(`Terminé: ${results.length} fichiers traités`);
    } catch (error) {
      console.log(`Dossier ${inputDir} non trouvé, ignoré`);
    }
  }

  // Afficher les statistiques finales
  console.log('');
  console.log('=== Statistiques finales ===');
  console.log(`Fichiers traités: ${totalResults.length}`);
  console.log(`Taille d'entrée: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Taille de sortie: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  
  if (totalInputSize > 0) {
    const totalCompression = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(2);
    console.log(`Compression totale: ${totalCompression}%`);
  }

  // Afficher les erreurs
  const errors = totalResults.filter(r => !r.success);
  if (errors.length > 0) {
    console.log('');
    console.log('=== Erreurs ===');
    errors.forEach(error => {
      console.log(`- ${error.input}: ${error.error}`);
    });
  }

  console.log('');
  console.log('Optimisation terminée !');
  console.log(`Images optimisées dans: ${outputDir}`);
}

// Exécuter le script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, processDirectory };
