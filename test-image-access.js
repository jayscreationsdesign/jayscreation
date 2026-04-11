// Test pour vérifier l'accès aux images du produit Étiquette Bouteille d'Eau
const fs = require('fs');
const path = require('path');

// Chemins des images à vérifier
const imagePaths = [
  '/public/images/products/Étiquette Bouteille d\'Eau.png',
  '/public/images/products/Étiquette Bouteille d\'Eau1.png',
  '/public/images/products/Étiquette Bouteille d\'Eau2.png',
  '/public/images/products/Étiquette Bouteille d\'Eau3.png'
];

console.log('???? VÉRIFICATION DES IMAGES DU PRODUIT Étiquette Bouteille d\'Eau\n');

imagePaths.forEach((imagePath, index) => {
  const fullPath = path.join(__dirname, imagePath);
  
  console.log(`Image ${index + 1}: ${imagePath}`);
  
  try {
    // Vérifier si le fichier existe
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      console.log(`   ???? Fichier trouvé: ${stats.size} bytes`);
      console.log(`   ???? Chemin complet: ${fullPath}`);
      console.log(`   ???? URL dans le navigateur: http://localhost:3000${imagePath}`);
    } else {
      console.log(`   ???? Fichier NON TROUVÉ: ${fullPath}`);
    }
  } catch (error) {
    console.log(`   ???? Erreur de lecture: ${error.message}`);
  }
  
  console.log('');
});

// Test de la structure du produit
console.log('???? VÉRIFICATION DE LA STRUCTURE DU PRODUIT\n');

try {
  const productsData = require('./src/data/products.ts');
  const product = productsData.products.find(p => p.slug === 'etiquette-bouteille-eau');
  
  if (product) {
    console.log('Produit trouvé:');
    console.log(`   ???? Nom: ${product.name}`);
    console.log(`   ???? Image principale: ${product.image}`);
    console.log(`   ???? Images additionnelles: ${product.images ? product.images.length : 0}`);
    
    if (product.images) {
      product.images.forEach((img, index) => {
        console.log(`      ${index + 1}. ${img}`);
      });
    }
  } else {
    console.log('Produit NON TROUVÉ avec slug: etiquette-bouteille-eau');
  }
} catch (error) {
  console.log(`Erreur de lecture du fichier produits: ${error.message}`);
  console.log('Note: Les fichiers TypeScript ne peuvent pas être lus directement avec require()');
}

// Test avec une simulation de la fonction getImageArray
console.log('\n???? SIMULATION DE LA FONCTION getImageArray\n');

const testImages = [
  "/images/products/Étiquette Bouteille d'Eau1.png",
  "/images/products/Étiquette Bouteille d'Eau2.png",
  "/images/products/Étiquette Bouteille d'Eau3.png"
];

console.log('Images d\'entrée:');
testImages.forEach((img, index) => {
  console.log(`   ${index + 1}. ${img}`);
});

// Simulation du filtrage
const filteredImages = testImages.filter(img => img && img.trim() !== "");
console.log('\nImages après filtrage:');
filteredImages.forEach((img, index) => {
  console.log(`   ${index + 1}. ${img}`);
});

console.log('\n???? CONCLUSION:');
console.log('Si toutes les images existent et sont correctement référencées,');
console.log('le problème pourrait venir de:');
console.log('1. Le composant ProductGallery');
console.log('2. La fonction getImageArray');
console.log('3. L\'affichage dans le navigateur (cache, CORS, etc.)');
console.log('4. Le chemin d\'accès dans le navigateur');
