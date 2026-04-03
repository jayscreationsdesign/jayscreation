import React from 'react';
import { sendEmail } from './src/lib/send-email';
import { StockAlertEmail } from './src/emails/StockAlertEmail';

// Test du système d'alertes stock
async function testStockAlert() {
  console.log('⚠️ Test du système d\'alertes stock...\n');

  const stockData = {
    productName: 'Faire-part mariage - Floral Blanc Or',
    productId: 'fp-mariage-floral-blanc-or-001',
  };

  try {
    console.log(`📦 Alerte stock pour le produit : ${stockData.productName}`);
    
    // Envoyer l'alerte admin
    const result = await sendEmail({
      type: 'stock-alert',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: `⚠️ Rupture de stock : ${stockData.productName}`,
      from: 'commande',
      react: React.createElement(StockAlertEmail, {
        productName: stockData.productName,
        productId: stockData.productId,
      }),
    });

    console.log('📊 Résultat de l\'envoi :');
    console.log(`   • Admin (${process.env.ADMIN_EMAIL}): ${result.success ? '✅' : '❌'}`);

    if (result.success) {
      console.log(`   📧 Message ID: ${result.messageId}`);
    } else {
      console.log(`   ❌ Erreur: ${result.error}`);
    }

    console.log('\n✅ Test d\'alerte stock terminé !');
    console.log('📋 Vérifiez votre boîte mail :');
    console.log(`   • jayscreations.d@gmail.com (admin) - Sujet: "⚠️ Rupture de stock : ${stockData.productName}"`);

    console.log('\n📝 Contenu de l\'alerte :');
    console.log(`   • Produit: ${stockData.productName}`);
    console.log(`   • ID: ${stockData.productId}`);
    console.log(`   • Actions recommandées: Réapprovisionner ou masquer`);
    console.log(`   • Lien direct vers Supabase`);

    console.log('\n🎨 Design: Charte graphique Jay\'s Creations');
    console.log('📧 Transporteurs: IONOS SMTP');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testStockAlert();
