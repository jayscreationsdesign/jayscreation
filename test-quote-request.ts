import React from 'react';
import { sendEmail, sendMultipleEmails } from './src/lib/send-email';
import { QuoteRequestEmail } from './src/emails/QuoteRequestEmail';
import { QuoteNotificationEmail } from './src/emails/QuoteNotificationEmail';

// Test du système de demande de devis
async function testQuoteRequest() {
  console.log('📋 Test de demande de devis...\n');

  const quoteData = {
    customerName: 'Anaïs Manne',
    customerEmail: 'manne.anais@gmail.com',
    customerPhone: '07 49 07 28 61',
    prenom: 'Anaïs',
    quoteDetails: `Type de projet : Mariage
Date de l'événement : 15 juin 2024
Nombre d'invités : 100
Produits souhaités :
- Faire-parts mariage (50 unités)
- Tableaux d'accueil (2 unités)
- Menus de table (10 unités)
- Marque-places personnalisés (100 unités)
Budget approximatif : 500-800€
Délai souhaité : 1 mois avant l'événement
Notes supplémentaires : Thème floral blanc et or`,
  };

  try {
    console.log(`📧 Traitement de la demande de devis de ${quoteData.customerName}...`);
    
    // 1. Envoyer la confirmation au client
    const clientResult = await sendEmail({
      type: 'quote-request',
      to: quoteData.customerEmail,
      subject: 'Votre demande de devis a bien été reçue ✨',
      from: 'commande',
      react: React.createElement(QuoteRequestEmail, { 
        prenom: quoteData.prenom, 
        quoteDetails: quoteData.quoteDetails 
      }),
    });

    // 2. Envoyer la notification admin
    const adminResult = await sendEmail({
      type: 'quote-notification',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: `🔔 Nouvelle demande de devis de ${quoteData.customerName}`,
      from: 'commande',
      react: React.createElement(QuoteNotificationEmail, {
        customerName: quoteData.customerName,
        customerEmail: quoteData.customerEmail,
        customerPhone: quoteData.customerPhone,
        quoteDetails: quoteData.quoteDetails,
      }),
    });

    console.log('📊 Résultats des envois :');
    console.log(`   • Client (${quoteData.customerEmail}): ${clientResult.success ? '✅' : '❌'}`);
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

    console.log('\n✅ Test de demande de devis terminé !');
    console.log('📋 Vérifiez les boîtes mail :');
    console.log(`   • ${quoteData.customerEmail} (client) - Sujet: "Votre demande de devis a bien été reçue ✨"`);
    console.log(`   • jayscreations.d@gmail.com (admin) - Sujet: "🔔 Nouvelle demande de devis de ${quoteData.customerName}"`);

    console.log('\n📝 Contenu des emails :');
    console.log(`   • Client: Confirmation avec récapitulatif de la demande`);
    console.log(`   • Admin: Notification complète avec coordonnées client`);
    console.log(`   • Design: Charte graphique Jay's Creations`);
    console.log(`   • Transporteurs: IONOS SMTP`);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testQuoteRequest();
