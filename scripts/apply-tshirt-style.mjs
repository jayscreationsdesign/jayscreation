import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Images du T-Shirt Personnalisé comme référence de style
const referenceImages = [
  't-shirt-kael-styled.png',
  'IMG_5558-styled.png', 
  'IMG_5559-styled.png',
  'PicWish_09-styled.png',
  'PicWish_11-styled.png',
  'PicWish_18-styled.png'
];

// Images à traiter pour ressembler au T-Shirt
const targetImages = [
  'etiquette-bouteille-eau.png',
  'etiquette-capri-sun.png',
  'etiquette-champomy.png',
  'stickers-personnalises.png',
  'flyers-cartes-visite.png',
  'boite-de-lait-personnalisee.png',
  'boite-pompotes-personnalisee.png',
  'boites-pop-corn-personnalisees.png',
  'box-pyramide.png',
  'cadre-personnalise.png',
  'gourde-personnalisee.png',
  'tasse-personnalisee.png',
  'planche-etiquette-thermocollante.png',
  'faire-part-mariage-elegant.png'
];

const imageMagickPath = '"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe"';
const productsDir = 'public/images/products';

console.log('🎨 Application du style T-Shirt Personnalisé à toutes les images produits...\n');

targetImages.forEach(image => {
  const inputPath = path.join(productsDir, image);
  const outputPath = path.join(productsDir, image.replace('.png', '-tshirt-style.png'));
  
  if (fs.existsSync(inputPath)) {
    console.log(`🔄 Traitement de: ${image}`);
    
    try {
      // Appliquer le même style que les images T-Shirt
      const command = `${imageMagickPath} "${inputPath}" ` +
        `-resize 800x800^ ` + // Remplir l'espace
        `-gravity center ` + // Centrer l'image
        `-extent 800x800 ` + // Taille fixe
        `-background "#fdf8ec" ` + // Fond beige comme le T-Shirt
        `-quality 95 ` + // Qualité haute
        `-unsharp 0x1.5+1+0.02 ` + // Légère netteté
        `"${outputPath}"`;
      
      execSync(command, { stdio: 'inherit' });
      
      console.log(`✅ Image stylisée créée: ${image.replace('.png', '-tshirt-style.png')}`);
      console.log(`📏 Dimensions: 800x800`);
      console.log(`🎨 Fond: #fdf8ec (style T-Shirt)\n`);
      
    } catch (error) {
      console.error(`❌ Erreur lors du traitement de ${image}:`, error.message);
    }
  } else {
    console.log(`⚠️  Image non trouvée: ${inputPath}`);
  }
});

console.log('🎉 Style T-Shirt Personnalisé appliqué à toutes les images produits !');
