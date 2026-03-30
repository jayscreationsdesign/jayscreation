const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration avancée
const CONFIG = {
  input: 'public/images/products/détourage',
  output: 'public/images/products',
  size: 2000,
  backgroundColor: { r: 246, g: 242, b: 235 }, // #F6F2EB
  quality: 95,
  format: 'jpeg', // 'jpeg', 'png', 'webp'
  padding: 0, // Padding supplémentaire
  preserveTransparency: false,
  createSubfolders: false, // Créer des sous-dossiers par format
  backup: false, // Sauvegarder les originaux
  logLevel: 'info' // 'debug', 'info', 'warn', 'error'
};

// Couleurs prédéfinies
const BACKGROUNDS = {
  beige: { r: 246, g: 242, b: 235 }, // #F6F2EB
  white: { r: 255, g: 255, b: 255 }, // #FFFFFF
  lightgray: { r: 248, g: 248, b: 248 }, // #F8F8F8
  cream: { r: 250, g: 246, b: 240 }, // #FAF6F0
  ivory: { r: 255, g: 255, b: 240 }, // #FFFFF0
  lightblue: { r: 240, g: 248, b: 255 }, // #F0F8FF
  lightgreen: { r: 240, g: 255, b: 240 } // #F0FFF0
};

class ImageProcessor {
  constructor(config = {}) {
    this.config = { ...CONFIG, ...config };
    this.processed = 0;
    this.errors = 0;
    this.startTime = Date.now();
  }

  log(level, message) {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    if (levels[level] >= levels[this.config.logLevel]) {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }

  async processImage(inputPath, outputPath) {
    try {
      this.log('debug', `Traitement de : ${path.basename(inputPath)}`);
      
      // Lire l'image source
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Calculer les dimensions avec padding
      const effectiveSize = this.config.size - (this.config.padding * 2);
      const ratio = Math.min(effectiveSize / metadata.width, effectiveSize / metadata.height);
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
      
      // Créer le fond
      const background = sharp({
        create: {
          width: this.config.size,
          height: this.config.size,
          channels: 4,
          background: { ...this.config.backgroundColor, alpha: 1 }
        }
      });
      
      // Calculer les coordonnées pour centrer avec padding
      const x = this.config.padding + Math.floor((this.config.size - this.config.padding * 2 - newWidth) / 2);
      const y = this.config.padding + Math.floor((this.config.size - this.config.padding * 2 - newHeight) / 2);
      
      // Composer l'image
      const compositeOptions = [{
        input: resizedImage.data,
        raw: {
          width: newWidth,
          height: newHeight,
          channels: 4
        },
        left: x,
        top: y
      }];
      
      // Options de sortie selon le format
      const outputOptions = this.getOutputOptions();
      
      await background
        .composite(compositeOptions)
        .toFile(outputPath, outputOptions);
      
      this.processed++;
      this.log('info', `✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
      
    } catch (error) {
      this.errors++;
      this.log('error', `❌ ${path.basename(inputPath)} - ${error.message}`);
    }
  }

  getOutputOptions() {
    switch (this.config.format) {
      case 'jpeg':
        return {
          quality: this.config.quality,
          mozjpeg: true,
          progressive: true
        };
      case 'png':
        return {
          quality: this.config.quality,
          compressionLevel: 9,
          adaptiveFiltering: true
        };
      case 'webp':
        return {
          quality: this.config.quality,
          effort: 6,
          smartSubsample: true
        };
      default:
        return {};
    }
  }

  async processFolder() {
    try {
      // Créer les dossiers nécessaires
      this.ensureDirectories();
      
      // Lister les fichiers
      const files = fs.readdirSync(this.config.input);
      const imageFiles = files.filter(f => f.toLowerCase().match(/\.(png|jpg|jpeg|webp|tiff|gif)$/));
      
      this.log('info', `🎨 Traitement de ${imageFiles.length} images...`);
      this.log('info', `📁 Source : ${this.config.input}`);
      this.log('info', `📁 Cible : ${this.config.output}`);
      this.log('info', `📏 Taille : ${this.config.size}x${this.config.size}px`);
      this.log('info', `🎨 Fond : RGB(${this.config.backgroundColor.r}, ${this.config.backgroundColor.g}, ${this.config.backgroundColor.b})`);
      this.log('info', `📄 Format : ${this.config.format.toUpperCase()}`);
      this.log('info', '');
      
      // Traiter chaque image
      for (const filename of imageFiles) {
        const inputPath = path.join(this.config.input, filename);
        const outputFilename = this.getOutputFilename(filename);
        const outputPath = path.join(this.config.output, outputFilename);
        
        await this.processImage(inputPath, outputPath);
      }
      
      // Afficher le résumé
      this.printSummary();
      
    } catch (error) {
      this.log('error', `Erreur lors du traitement : ${error.message}`);
    }
  }

  ensureDirectories() {
    if (!fs.existsSync(this.config.output)) {
      fs.mkdirSync(this.config.output, { recursive: true });
    }
    
    if (this.config.backup && !fs.existsSync(`${this.config.output}/backup`)) {
      fs.mkdirSync(`${this.config.output}/backup`, { recursive: true });
    }
  }

  getOutputFilename(filename) {
    const baseName = path.parse(filename).name;
    const extension = this.config.format === 'jpeg' ? 'jpg' : this.config.format;
    
    if (this.config.createSubfolders) {
      return `${this.config.format}/${baseName}.${extension}`;
    }
    
    return `${baseName}.${extension}`;
  }

  printSummary() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
    console.log('');
    console.log('🎉 TRAITEMENT TERMINÉ');
    console.log('==================');
    console.log(`✅ Images traitées : ${this.processed}`);
    console.log(`❌ Erreurs : ${this.errors}`);
    console.log(`⏱️  Durée : ${duration}s`);
    console.log(`📊 Taux de réussite : ${((this.processed / (this.processed + this.errors)) * 100).toFixed(1)}%`);
  }

  async processSingleImage(filename) {
    const inputPath = path.join(this.config.input, filename);
    
    if (!fs.existsSync(inputPath)) {
      this.log('error', `Fichier non trouvé : ${inputPath}`);
      return;
    }
    
    const outputFilename = this.getOutputFilename(filename);
    const outputPath = path.join(this.config.output, outputFilename);
    
    await this.processImage(inputPath, outputPath);
  }
}

// Fonctions utilitaires
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...CONFIG };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--size':
        config.size = parseInt(args[++i]);
        break;
      case '--background':
        const colorName = args[++i];
        if (BACKGROUNDS[colorName]) {
          config.backgroundColor = BACKGROUNDS[colorName];
        } else if (colorName.match(/^#[0-9A-Fa-f]{6}$/)) {
          const hex = colorName.slice(1);
          config.backgroundColor = {
            r: parseInt(hex.substr(0, 2), 16),
            g: parseInt(hex.substr(2, 2), 16),
            b: parseInt(hex.substr(4, 2), 16)
          };
        }
        break;
      case '--format':
        config.format = args[++i];
        break;
      case '--quality':
        config.quality = parseInt(args[++i]);
        break;
      case '--padding':
        config.padding = parseInt(args[++i]);
        break;
      case '--output':
        config.output = args[++i];
        break;
      case '--debug':
        config.logLevel = 'debug';
        break;
      case '--help':
        showHelp();
        process.exit(0);
    }
  }
  
  return config;
}

function showHelp() {
  console.log(`
🎨 PROCESSOR D'IMAGES PRODUITS

Usage :
  node process-product-images-advanced.js [options]

Options :
  --size N              Taille finale en pixels (défaut: 2000)
  --background COLOR     Couleur de fond (défaut: beige)
  --format FORMAT        Format de sortie (jpeg/png/webp, défaut: jpeg)
  --quality N           Qualité 1-100 (défaut: 95)
  --padding N           Padding en pixels (défaut: 0)
  --output PATH          Dossier de sortie
  --debug               Mode debug

Couleurs de fond disponibles :
  beige, white, lightgray, cream, ivory, lightblue, lightgreen

Exemples :
  node process-product-images-advanced.js --size 1600 --background white
  node process-product-images-advanced.js --format webp --quality 90
  node process-product-images-advanced.js --padding 50 --background #FF0000
  node process-product-images-advanced.js --file mon-image.jpg --size 1200
`);
}

// Gestion principale
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help')) {
    showHelp();
    process.exit(0);
  }
  
  const config = parseArgs();
  const processor = new ImageProcessor(config);
  
  if (args.includes('--file') && args[args.indexOf('--file') + 1]) {
    const filename = args[args.indexOf('--file') + 1];
    processor.processSingleImage(filename);
  } else {
    processor.processFolder();
  }
}

module.exports = ImageProcessor;
