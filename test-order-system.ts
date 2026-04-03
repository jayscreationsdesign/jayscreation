import React from 'react';
import { sendEmail, sendMultipleEmails } from './src/lib/send-email';
import { OrderConfirmationEmail } from './src/emails/OrderConfirmationEmail';
import { OrderNotificationEmail } from './src/emails/OrderNotificationEmail';

// Test du système de commandes
async function testOrderSystem() {
  console.log('📦 Test du système de commandes...\n');

  const orderData = {
    prenom: 'Anaïs',
    orderNumber: 'CMD-2024-001',
    customerEmail: 'manne.anais@gmail.com',
    customerName: 'Anaïs Manne',
    items: [
      { name: 'Faire-part mariage - Floral Blanc Or', quantity: 50, price: 2.50 },
      { name: 'Tableau d\'accueil personnalisé', quantity: 2, price: 15.00 },
      { name: 'Menu de table - Élégant', quantity: 10, price: 1.20 },
      { name: 'Marque-place personnalisé', quantity: 100, price: 0.80 },
      { name: 'Cadeaux invités - Sachets lavandes', quantity: 100, price: 1.50 },
    ],
    total: 295.00,
    shippingAddress: `Anaïs Manne
15 Quai d'Asnières
92390 Villeneuve-la-Garenne
France`,
  };

  try {
    console.log(`📧 Traitement de la commande ${orderData.orderNumber} pour ${orderData.customerName}...`);
    
    // 1. Envoyer la confirmation au client
    const clientResult = await sendEmail({
      type: 'order-confirmation',
      to: orderData.customerEmail,
      subject: `Commande #${orderData.orderNumber} confirmée ✨`,
      from: 'commande',
      react: React.createElement(OrderConfirmationEmail, { 
        prenom: orderData.prenom,
        orderNumber: orderData.orderNumber,
        items: orderData.items,
        total: orderData.total,
        shippingAddress: orderData.shippingAddress,
      }),
    });

    // 2. Envoyer la notification admin
    const adminResult = await sendEmail({
      type: 'order-notification',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: `🔔 Nouvelle commande #${orderData.orderNumber}`,
      from: 'commande',
      react: React.createElement(OrderNotificationEmail, {
        orderNumber: orderData.orderNumber,
        items: orderData.items,
        total: orderData.total,
        customerEmail: orderData.customerEmail,
        customerName: orderData.customerName,
      }),
    });

    console.log('📊 Résultats des envois :');
    console.log(`   • Client (${orderData.customerEmail}): ${clientResult.success ? '✅' : '❌'}`);
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

    console.log('\n✅ Test de commande terminé !');
    console.log('📋 Vérifiez les boîtes mail :');
    console.log(`   • ${orderData.customerEmail} (client) - Sujet: "Commande #${orderData.orderNumber} confirmée ✨"`);
    console.log(`   • jayscreations.d@gmail.com (admin) - Sujet: "🔔 Nouvelle commande #${orderData.orderNumber}"`);

    console.log('\n📝 Détails de la commande :');
    console.log(`   • Numéro: ${orderData.orderNumber}`);
    console.log(`   • Articles: ${orderData.items.length} produits`);
    console.log(`   • Total: ${orderData.total.toFixed(2)} €`);
    console.log(`   • Livraison: ${orderData.shippingAddress.split('\n')[0]}`);

    console.log('\n🎨 Design: Charte graphique Jay\'s Creations');
    console.log('📧 Transporteurs: IONOS SMTP');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testOrderSystem();
