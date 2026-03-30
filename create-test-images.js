const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createTestImages() {
  const testFolder = 'public/images/products/détourage';
  
  // Créer le dossier
  if (!fs.existsSync(testFolder)) {
    fs.mkdirSync(testFolder, { recursive: true });
  }
  
  console.log('🎨 Création d\'images de test...');
  
  // Créer différentes images de test
  const testImages = [
    {
      name: 'test-produit-1.png',
      width: 800,
      height: 600,
      color: { r: 255, g: 100, b: 100 }, // Rouge
      text: 'Produit 1'
    },
    {
      name: 'test-produit-2.png',
      width: 600,
      height: 800,
      color: { r: 100, g: 255, b: 100 }, // Vert
      text: 'Produit 2'
    },
    {
      name: 'test-produit-3.png',
      width: 1000,
      height: 1000,
      color: { r: 100, g: 100, b: 255 }, // Bleu
      text: 'Produit 3'
    },
    {
      name: 'test-produit-4.png',
      width: 1200,
      height: 400,
      color: { r: 255, g: 255, b: 100 }, // Jaune
      text: 'Produit 4'
    }
  ];
  
  for (const img of testImages) {
    const outputPath = path.join(testFolder, img.name);
    
    // Créer une image simple avec du texte
    const svg = `
      <svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="rgb(${img.color.r}, ${img.color.g}, ${img.color.b})" />
        <text x="50%" y="50%" 
              font-family="Arial, sans-serif" 
              font-size="48" 
              font-weight="bold"
              fill="white" 
              text-anchor="middle" 
              dominant-baseline="middle">
          ${img.text}
        </text>
        <text x="50%" y="60%" 
              font-family="Arial, sans-serif" 
              font-size="24" 
              fill="white" 
              text-anchor="middle" 
              dominant-baseline="middle">
          ${img.width}x${img.height}
        </text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Créé : ${img.name} (${img.width}x${img.height})`);
  }
  
  console.log('');
  console.log('🎉 Images de test créées avec succès !');
  console.log(`📁 Dossier : ${testFolder}`);
  console.log('');
  console.log('Vous pouvez maintenant tester le traitement avec :');
  console.log('  node test-image-processing.js');
  console.log('  node process-product-images.js');
}

createTestImages().catch(console.error);
