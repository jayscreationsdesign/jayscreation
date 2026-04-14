// Script de test pour l'email de confirmation de commande
// Utilise les nouveaux templates refactoring

const { sendOrderConfirmationEmail } = require('./src/lib/email.ts');

// Données de test pour la commande
const testOrderData = {
  orderNumber: 'CMD-2026-0413-001',
  firstName: 'Anais',
  lastName: 'Test',
  email: 'test@example.com',
  phone: '06 12 34 56 78',
  items: [
    {
      name: 'Bouquet de fleurs personnalisé',
      quantity: 1,
      price: 45.00
    }
  ],
  totalAmount: 45.00,
  shippingAddress: '123 rue de la Paix, 75001 Paris',
  orderDate: new Date().toISOString()
};

async function testOrderConfirmation() {
  console.log('=== Test d\'envoi d\'email de confirmation de commande ===');
  console.log('Données de commande:', JSON.stringify(testOrderData, null, 2));
  console.log('');
  
  try {
    const result = await sendOrderConfirmationEmail('test@example.com', testOrderData);
    
    console.log('Résultat de l\'envoi:');
    console.log('- Succès global:', result.success);
    console.log('- Email client:', result.clientEmail.success ? 'OK' : 'Échec');
    console.log('- Copie email:', result.copyEmail.success ? 'OK' : 'Échec');
    console.log('- Notification admin:', result.adminNotification.success ? 'OK' : 'Échec');
    
    if (result.success) {
      console.log('');
      console.log('=== SUCCÈS ===');
      console.log('Tous les emails ont été envoyés avec succès vers commande@jayscreationsdesign.fr');
      console.log('');
      console.log('Emails envoyés:');
      console.log('1. Email de confirmation principal');
      console.log('2. Copie de l\'email');
      console.log('3. Notification admin pour traitement');
    } else {
      console.log('');
      console.log('=== ÉCHEC ===');
      console.log('Erreurs détectées:');
      if (!result.clientEmail.success) console.log('- Email client:', result.clientEmail.error);
      if (!result.copyEmail.success) console.log('- Copie email:', result.copyEmail.error);
      if (!result.adminNotification.success) console.log('- Notification admin:', result.adminNotification.error);
    }
    
  } catch (error) {
    console.error('Erreur lors du test:', error);
  }
}

// Vérifier les variables d'environnement
console.log('Vérification des variables d\'environnement:');
console.log('- IONOS_EMAIL_USER:', process.env.IONOS_EMAIL_USER ? 'Défini' : 'Non défini');
console.log('- IONOS_EMAIL_PASS:', process.env.IONOS_EMAIL_PASS ? 'Défini' : 'Non défini');
console.log('- IONOS_SMTP_HOST:', process.env.IONOS_SMTP_HOST || 'smtp.ionos.fr (défaut)');
console.log('- IONOS_SMTP_PORT:', process.env.IONOS_SMTP_PORT || '465 (défaut)');
console.log('');

// Exécuter le test
testOrderConfirmation();
