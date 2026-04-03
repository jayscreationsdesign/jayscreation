import { sendEmail } from './src/lib/send-email';
import React from 'react';
import { WelcomeEmail } from './src/emails/WelcomeEmail';

// Envoi d'emails de bienvenue
async function sendWelcomeEmails() {
  console.log('📧 Envoi d\'emails de bienvenue...\n');

  try {
    // Email pour Mannefred
    const mannefredResult = await sendEmail({
      type: 'welcome',
      to: 'mannefred.b@gmail.com',
      subject: 'Bienvenue chez Jay\'s Creations Design ✨',
      from: 'contact',
      react: React.createElement(WelcomeEmail, { 
        prenom: 'Mannefred', 
        email: 'mannefred.b@gmail.com' 
      }),
    });

    // Email pour Anaïs
    const anaisResult = await sendEmail({
      type: 'welcome',
      to: 'anais.manne@gmail.com',
      subject: 'Bienvenue chez Jay\'s Creations Design ✨',
      from: 'contact',
      react: React.createElement(WelcomeEmail, { 
        prenom: 'Anaïs', 
        email: 'anais.manne@gmail.com' 
      }),
    });

    console.log('📊 Résultats des envois :');
    console.log(`   • Mannefred: ${mannefredResult.success ? '✅' : '❌'}`);
    console.log(`   • Anaïs: ${anaisResult.success ? '✅' : '❌'}`);

    if (mannefredResult.success) {
      console.log(`   📧 Message ID Mannefred: ${mannefredResult.messageId}`);
    }
    if (anaisResult.success) {
      console.log(`   📧 Message ID Anaïs: ${anaisResult.messageId}`);
    }

    if (!mannefredResult.success) {
      console.log(`   ❌ Erreur Mannefred: ${mannefredResult.error}`);
    }
    if (!anaisResult.success) {
      console.log(`   ❌ Erreur Anaïs: ${anaisResult.error}`);
    }

    console.log('\n✅ Emails de bienvenue envoyés !');
    console.log('📋 Vérifiez les boîtes mail :');
    console.log('   • mannefred.b@gmail.com');
    console.log('   • anais.manne@gmail.com');
    console.log('   • Sujet: "Bienvenue chez Jay\'s Creations Design ✨"');

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
  }
}

// Exécuter l'envoi
sendWelcomeEmails();
