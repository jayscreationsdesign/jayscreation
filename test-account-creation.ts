import { sendEmail, sendMultipleEmails } from './src/lib/send-email';
import React from 'react';
import { WelcomeEmail } from './src/emails/WelcomeEmail';

// Simulation de création de compte avec envoi d'emails
async function testAccountCreation() {
  console.log('👤 Test de création de compte...\n');

  const userData = {
    prenom: 'Anaïs',
    email: 'manne.anais@gmail.com',
  };

  try {
    console.log(`📧 Création du compte pour ${userData.email}...`);
    
    // Envoyer l'email de bienvenue au client ET une copie à l'admin
    const results = await sendMultipleEmails({
      type: 'welcome',
      recipients: {
        client: userData.email,
        admin: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      },
      subject: 'Bienvenue chez Jay\'s Creations Design ✨',
      from: 'contact',
      react: React.createElement(WelcomeEmail, { 
        prenom: userData.prenom, 
        email: userData.email 
      }),
    });

    console.log('📊 Résultats des envois :');
    console.log(`   • Client (${userData.email}): ${results.client.success ? '✅' : '❌'}`);
    console.log(`   • Admin (${process.env.ADMIN_EMAIL}): ${results.admin.success ? '✅' : '❌'}`);

    if (results.client.success) {
      console.log(`   📧 Message ID Client: ${results.client.messageId}`);
    }
    if (results.admin.success) {
      console.log(`   📧 Message ID Admin: ${results.admin.messageId}`);
    }

    if (!results.client.success) {
      console.log(`   ❌ Erreur Client: ${results.client.error}`);
    }
    if (!results.admin.success) {
      console.log(`   ❌ Erreur Admin: ${results.admin.error}`);
    }

    console.log('\n✅ Test de création de compte terminé !');
    console.log('📋 Vérifiez les boîtes mail :');
    console.log(`   • ${userData.email} (client)`);
    console.log(`   • jayscreations.d@gmail.com (admin)`);
    console.log('   • Sujet: "Bienvenue chez Jay\'s Creations Design ✨"');
    console.log('   • Sujet admin: "🔔 Bienvenue chez Jay\'s Creations Design ✨"');

    console.log('\n📝 Contenu de l\'email :');
    console.log(`   • Prénom: ${userData.prenom}`);
    console.log(`   • Email du compte: ${userData.email}`);
    console.log(`   • Bouton: "Découvrir la boutique →"`);
    console.log(`   • Design: Charte graphique Jay's Creations`);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testAccountCreation();
