import React from 'react';
import { sendEmail, sendMultipleEmails } from './src/lib/send-email';
import { AbandonedCartEmail } from './src/emails/AbandonedCartEmail';
import { AbandonedCartNotificationEmail } from './src/emails/AbandonedCartNotificationEmail';

// Test du système de paniers abandonnés
async function testAbandonedCart() {
  console.log('🛒 Test du système de paniers abandonnés...\n');

  const cartData = {
    customerName: 'Anaïs Manne',
    customerEmail: 'manne.anais@gmail.com',
    cartDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('fr-FR'), // Il y a 2 heures
    timeElapsed: '2 heures',
    items: [
      { name: 'Faire-part mariage - Floral Blanc Or', price: 2.50, image: '/images/fp-floral.jpg' },
      { name: 'Tableau d\'accueil personnalisé', price: 15.00, image: '/images/tableau.jpg' },
      { name: 'Menu de table - Élégant', price: 1.20, image: '/images/menu.jpg' },
    ],
    total: 18.70,
    cartUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/panier?session=abc123`,
    prenom: 'Anaïs',
  };

  try {
    console.log(`🛒 Traitement du panier abandonné de ${cartData.customerName} (${cartData.timeElapsed})`);
    
    // 1. Envoyer la relance au client
    const clientResult = await sendEmail({
      type: 'abandoned-cart',
      to: cartData.customerEmail,
      subject: 'Vous avez oublié quelque chose ? 🛒',
      from: 'contact',
      react: React.createElement(AbandonedCartEmail, {
        prenom: cartData.prenom,
        items: cartData.items,
        cartUrl: cartData.cartUrl,
      }),
    });

    // 2. Envoyer la notification admin
    const adminResult = await sendEmail({
      type: 'abandoned-cart-notification',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: `🔔 Panier abandonné par ${cartData.customerName}`,
      from: 'contact',
      react: React.createElement(AbandonedCartNotificationEmail, {
        customerName: cartData.customerName,
        customerEmail: cartData.customerEmail,
        cartDate: cartData.cartDate,
        timeElapsed: cartData.timeElapsed,
        items: cartData.items,
        total: cartData.total,
      }),
    });

    console.log('📊 Résultats des envois :');
    console.log(`   • Client (${cartData.customerEmail}): ${clientResult.success ? '✅' : '❌'}`);
    console.log(`   • Admin (${process.env.ADMIN_EMAIL}): ${adminResult.success ? '✅' : '❌'}`);

    if (clientResult.success) {
      console.log(`   📧 Message ID Client: ${clientResult.messageId}`);
    }
    if (adminResult.success) {
      console.log(`   📧 Message ID Admin: ${adminResult.messageId}`);
    }

    if (!clientResult.success) {
      console.log(`   ❌ Erreur Client: ${clientResult.error}`);
    }
    if (!adminResult.success) {
      console.log(`   ❌ Erreur Admin: ${adminResult.error}`);
    }

    console.log('\n✅ Test de panier abandonné terminé !');
    console.log('📋 Vérifiez les boîtes mail :');
    console.log(`   • ${cartData.customerEmail} (client) - Sujet: "Vous avez oublié quelque chose ? 🛒"`);
    console.log(`   • jayscreations.d@gmail.com (admin) - Sujet: "🔔 Panier abandonné par ${cartData.customerName}"`);

    console.log('\n📝 Détails du panier :');
    console.log(`   • Client: ${cartData.customerName}`);
    console.log(`   • Temps écoulé: ${cartData.timeElapsed}`);
    console.log(`   • Articles: ${cartData.items.length} produits`);
    console.log(`   • Total potentiel: ${cartData.total.toFixed(2)} €`);
    console.log(`   • Lien panier: ${cartData.cartUrl}`);

    console.log('\n🎨 Design: Charte graphique Jay\'s Creations');
    console.log('📧 Transporteurs: IONOS SMTP');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testAbandonedCart();
