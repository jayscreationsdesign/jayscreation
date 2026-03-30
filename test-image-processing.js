const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration de test
const TEST_CONFIG = {
  input: 'public/images/products/détourage',
  output: 'test-output',
  size: 800, // Plus petit pour les tests
  backgroundColor: { r: 246, g: 242, b: 235 }, // #F6F2EB
  quality: 90,
  format: 'jpeg'
};

async function testProcessing() {
  console.log('🧪 TEST DE TRAITEMENT D\'IMAGES');
  console.log('================================');
  
  // Créer le dossier de test
  if (!fs.existsSync(TEST_CONFIG.output)) {
    fs.mkdirSync(TEST_CONFIG.output, { recursive: true });
  }
  
  try {
    // Lister les fichiers
    const files = fs.readdirSync(TEST_CONFIG.input);
    const imageFiles = files.filter(f => f.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/));
    
    console.log(`📁 Fichiers trouvés : ${imageFiles.length}`);
    console.log(`📏 Taille de test : ${TEST_CONFIG.size}x${TEST_CONFIG.size}px`);
    console.log(`🎨 Fond : RGB(${TEST_CONFIG.backgroundColor.r}, ${TEST_CONFIG.backgroundColor.g}, ${TEST_CONFIG.backgroundColor.b})`);
    console.log('');
    
    // Traiter seulement les 3 premières images pour le test
    const testFiles = imageFiles.slice(0, 3);
    
    for (const filename of testFiles) {
      console.log(`🔄 Traitement de : ${filename}`);
      
      const inputPath = path.join(TEST_CONFIG.input, filename);
      const outputPath = path.join(TEST_CONFIG.output, filename.replace(/\.[^/.]+$/, '.jpg'));
      
      try {
        // Lire l'image
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        console.log(`   📐 Dimensions originales : ${metadata.width}x${metadata.height}`);
        
        // Calculer le ratio
        const ratio = Math.min(TEST_CONFIG.size / metadata.width, TEST_CONFIG.size / metadata.height);
        const newWidth = Math.round(metadata.width * ratio);
        const newHeight = Math.round(metadata.height * ratio);
        
        console.log(`   📏 Nouvelles dimensions : ${newWidth}x${newHeight}`);
        
        // Redimensionner
        const resizedImage = await image
          .resize(newWidth, newHeight, {
            fit: 'inside',
            kernel: sharp.kernel.lanczos3
          })
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        
        // Créer le fond
        const background = sharp({
          create: {
            width: TEST_CONFIG.size,
            height: TEST_CONFIG.size,
            channels: 4,
            background: { ...TEST_CONFIG.backgroundColor, alpha: 1 }
          }
        });
        
        // Calculer le centrage
        const x = Math.floor((TEST_CONFIG.size - newWidth) / 2);
        const y = Math.floor((TEST_CONFIG.size - newHeight) / 2);
        
        console.log(`   📍 Position : (${x}, ${y})`);
        
        // Composer
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
            quality: TEST_CONFIG.quality,
            progressive: true
          })
          .toFile(outputPath);
        
        console.log(`   ✅ Sauvegardé : ${path.basename(outputPath)}`);
        console.log(`   📊 Poids : ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
        
      } catch (error) {
        console.error(`   ❌ Erreur : ${error.message}`);
      }
      
      console.log('');
    }
    
    console.log('🎉 TEST TERMINÉ');
    console.log(`📂 Vérifiez le dossier : ${TEST_CONFIG.output}`);
    
  } catch (error) {
    console.error('Erreur générale :', error);
  }
}

// Fonction pour vérifier les dépendances
function checkDependencies() {
  try {
    require('sharp');
    console.log('✅ Sharp est installé');
    return true;
  } catch (error) {
    console.error('❌ Sharp n\'est pas installé. Installez-le avec :');
    console.error('   npm install sharp');
    return false;
  }
}

// Vérifier le dossier d'entrée
function checkInputFolder() {
  if (!fs.existsSync(TEST_CONFIG.input)) {
    console.error(`❌ Le dossier d'entrée n'existe pas : ${TEST_CONFIG.input}`);
    return false;
  }
  
  const files = fs.readdirSync(TEST_CONFIG.input);
  const imageFiles = files.filter(f => f.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/));
  
  if (imageFiles.length === 0) {
    console.error(`❌ Aucune image trouvée dans : ${TEST_CONFIG.input}`);
    return false;
  }
  
  console.log(`✅ ${imageFiles.length} images trouvées dans le dossier d'entrée`);
  return true;
}

// Exécution principale
async function main() {
  console.log('🔍 Vérification des dépendances...');
  
  if (!checkDependencies()) {
    process.exit(1);
  }
  
  if (!checkInputFolder()) {
    process.exit(1);
  }
  
  console.log('');
  await testProcessing();
}

if (require.main === module) {
  main().catch(console.error);
}
