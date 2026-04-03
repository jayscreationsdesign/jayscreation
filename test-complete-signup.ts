import React from 'react';
import { sendEmail, sendMultipleEmails } from './src/lib/send-email';
import { WelcomeEmail } from './src/emails/WelcomeEmail';
import { SignupNotificationEmail } from './src/emails/SignupNotificationEmail';

// Test du système complet de création de compte
async function testCompleteAccountCreation() {
  console.log('👤 Test COMPLET de création de compte...\n');

  const userData = {
    prenom: 'Anaïs',
    nom: 'Manne',
    email: 'manne.anais@gmail.com',
    date: new Date().toLocaleString('fr-FR'),
  };

  try {
    console.log(`📧 Création du compte pour ${userData.email}...`);
    
    // 1. Envoyer l'email de bienvenue au client
    const welcomeResult = await sendEmail({
      type: 'welcome',
      to: userData.email,
      subject: 'Bienvenue chez Jay\'s Creations Design ✨',
      from: 'contact',
      react: React.createElement(WelcomeEmail, { 
        prenom: userData.prenom, 
        email: userData.email 
      }),
    });

    // 2. Envoyer la notification admin
    const adminResult = await sendEmail({
      type: 'signup-notification',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: '🔔 Nouveau compte client : Anaïs Manne',
      from: 'contact',
      react: React.createElement(SignupNotificationEmail, {
        prenom: userData.prenom,
        nom: userData.nom,
        email: userData.email,
        date: userData.date,
      }),
    });

    console.log('📊 Résultats des envois :');
    console.log(`   • Welcome Email (${userData.email}): ${welcomeResult.success ? '✅' : '❌'}`);
    console.log(`   • Admin Notification (${process.env.ADMIN_EMAIL}): ${adminResult.success ? '✅' : '❌'}`);

    if (welcomeResult.success) {
      console.log(`   📧 Message ID Welcome: ${welcomeResult.messageId}`);
    }
    if (adminResult.success) {
      console.log(`   📧 Message ID Admin: ${adminResult.messageId}`);
    }

    if (!welcomeResult.success) {
      console.log(`   ❌ Erreur Welcome: ${welcomeResult.error}`);
    }
    if (!adminResult.success) {
      console.log(`   ❌ Erreur Admin: ${adminResult.error}`);
    }

    console.log('\n✅ Test de création de compte terminé !');
    console.log('📋 Vérifiez les boîtes mail :');
    console.log(`   • ${userData.email} (client) - Sujet: "Bienvenue chez Jay's Creations Design ✨"`);
    console.log(`   • jayscreations.d@gmail.com (admin) - Sujet: "🔔 Nouveau compte client : Anaïs Manne"`);

    console.log('\n📝 Contenu des emails :');
    console.log(`   • Client: Welcome avec coupon BIENVENUE10`);
    console.log(`   • Admin: Notification avec détails du client`);
    console.log(`   • Design: Charte graphique Jay's Creations`);
    console.log(`   • Transporteurs: IONOS SMTP`);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
}

// Exécuter le test
testCompleteAccountCreation();
