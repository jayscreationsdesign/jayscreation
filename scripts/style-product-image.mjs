#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import { argv } from 'process';

const execAsync = promisify(exec);

const magickPath = '"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe"';
const productsPath = 'C:\\Users\\Anais.DESKTOP-P18LD7P\\Documents\\jayscreation\\public\\images\\products';

// Configuration universelle pour toutes les images produits
const PRODUCT_STYLE_CONFIG = {
  size: 1000,
  productSize: 900,
  backgroundColor: '#fdf8ec', // Couleur de fond demandée
  gravity: 'center'
};

async function styleProductImage(inputFileName, outputFileName = null) {
  try {
    // Si aucun nom de sortie n'est spécifié, on ajoute "-styled" au nom d'entrée
    if (!outputFileName) {
      const nameWithoutExt = inputFileName.replace(/\.[^/.]+$/, '');
      const ext = inputFileName.split('.').pop();
      outputFileName = `${nameWithoutExt}-styled.${ext}`;
    }

    console.log(`🎨 Style de l'image produit: ${inputFileName} → ${outputFileName}`);
    
    const command = `${magickPath} "${productsPath}\\${inputFileName}" ` +
      `-resize ${PRODUCT_STYLE_CONFIG.productSize}x${PRODUCT_STYLE_CONFIG.productSize} ` +
      `-background "${PRODUCT_STYLE_CONFIG.backgroundColor}" ` +
      `-gravity ${PRODUCT_STYLE_CONFIG.gravity} ` +
      `-extent ${PRODUCT_STYLE_CONFIG.size}x${PRODUCT_STYLE_CONFIG.size} ` +
      `"${productsPath}\\${outputFileName}"`;
    
    console.log('⚡ Application du style produit...');
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes('deprecated')) {
      console.warn('⚠️ Warning:', stderr);
    }
    
    console.log(`✅ Image stylisée créée avec succès !`);
    console.log(`📁 Fichier: ${outputFileName}`);
    console.log(`🎨 Couleur de fond: ${PRODUCT_STYLE_CONFIG.backgroundColor}`);
    console.log(`📏 Dimensions: ${PRODUCT_STYLE_CONFIG.size}x${PRODUCT_STYLE_CONFIG.size}`);
    
    return outputFileName;
    
  } catch (error) {
    console.error('❌ Erreur lors du style de l\'image:', error);
    process.exit(1);
  }
}

// Fonction pour traiter toutes les images non-stylisées
async function styleAllProductImages() {
  try {
    console.log('🔍 Recherche des images produits à styliser...');
    
    const { stdout } = await execAsync(`dir "${productsPath}\\*.png" /b`);
    const allImages = stdout.split('\n').filter(name => 
      name.trim() && 
      !name.includes('-styled') && 
      !name.includes('placeholder')
    );
    
    console.log(`📋 ${allImages.length} images trouvées à traiter`);
    
    for (const image of allImages) {
      await styleProductImage(image.trim());
    }
    
    console.log('🎉 Toutes les images produits ont été stylisées !');
    
  } catch (error) {
    console.error('❌ Erreur lors du traitement en lot:', error);
    process.exit(1);
  }
}

// Affichage de l'aide
function showHelp() {
  console.log(`
🎨 Script de Style d'Images Produits - Jay's Creations Design

Usage:
  node style-product-image.mjs <nom-image> [nom-sortie]
  node style-product-image.mjs --all
  node style-product-image.mjs --help

Exemples:
  node style-product-image.mjs mon-produit.png
  node style-product-image.mjs mon-produit.png mon-produit-final.png
  node style-product-image.mjs --all

Configuration actuelle:
  🎨 Couleur de fond: ${PRODUCT_STYLE_CONFIG.backgroundColor}
  📏 Dimensions: ${PRODUCT_STYLE_CONFIG.size}x${PRODUCT_STYLE_CONFIG.size}
  📦 Taille du produit: ${PRODUCT_STYLE_CONFIG.productSize}x${PRODUCT_STYLE_CONFIG.productSize}
  🎯 Position: centre
`);
}

// Gestion des arguments
const args = argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

if (args.includes('--all')) {
  styleAllProductImages();
} else {
  const inputFileName = args[0];
  const outputFileName = args[1];
  
  if (!inputFileName) {
    console.error('❌ Veuillez spécifier un nom d\'image en entrée');
    showHelp();
    process.exit(1);
  }
  
  styleProductImage(inputFileName, outputFileName);
}
