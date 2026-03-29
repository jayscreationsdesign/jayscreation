#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const magickPath = '"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe"';
const productsPath = 'C:\\Users\\Anais.DESKTOP-P18LD7P\\Documents\\jayscreation\\public\\images\\products';

async function createStyledFairePart() {
  try {
    console.log('🎨 Création de l\'image stylisée du faire-part...');
    
    // Étape 1: Analyser le fond de l'image de référence
    console.log('📊 Analyse du style de l\'image de référence...');
    
    // Étape 2: Créer l'image stylisée avec le même style
    const command = `${magickPath} "${productsPath}\\faire-part-mariage.png" ` +
      `-resize 900x900 ` +
      `-background "#fdf8ec" ` +
      `-gravity center ` +
      `-extent 1000x1000 ` +
      `"${productsPath}\\faire-part-mariage-styled.png"`;
    
    console.log('⚡ Exécution de la commande ImageMagick...');
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes('deprecated')) {
      console.warn('⚠️ Warning:', stderr);
    }
    
    console.log('✅ Image stylisée créée avec succès !');
    console.log('📁 Fichier: faire-part-mariage-styled.png');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'image stylisée:', error);
    process.exit(1);
  }
}

createStyledFairePart();
