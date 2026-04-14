const { testEmailWithLogo } = require('./src/lib/email.ts');

async function runEmailTest() {
  console.log('Début du test d\'envoi d\'email de confirmation...');
  
  try {
    const result = await testEmailWithLogo();
    
    if (result.success) {
      console.log('Email de confirmation envoyé avec succès !');
      console.log('Message ID:', result.messageId);
      console.log('Vérifiez votre boîte de réception pour voir le logo.');
    } else {
      console.error('Échec de l\'envoi de l\'email:', result.error);
    }
  } catch (error) {
    console.error('Erreur lors du test:', error);
  }
}

runEmailTest();
