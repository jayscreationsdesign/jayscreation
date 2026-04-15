// Script de test direct pour envoyer un email de confirmation
import { sendOrderConfirmationEmail } from './src/lib/email.js';

async function testEmail() {
  console.log('ð Envoi d\'un email de confirmation de commande de test...');
  
  try {
    // Données de test pour la commande
    const testOrder = {
      number: 'TEST-2024-001',
      customerName: 'Jean Dupont',
      customerEmail: 'test@example.com', // Remplacez par votre email pour recevoir le test
      total: 89.90,
      createdAt: new Date().toISOString(),
      items: [
        {
          name: 'Bougie "Soirée Romantique"',
          quantity: 2,
          price: 29.95
        },
        {
          name: 'Scented Candle "Vanille Douce"',
          quantity: 1,
          price: 30.00
        }
      ]
    };

    console.log('â Données de la commande :');
    console.log(`   - N°: ${testOrder.number}`);
    console.log(`   - Client: ${testOrder.customerName}`);
    console.log(`   - Email: ${testOrder.customerEmail}`);
    console.log(`   - Total: ${testOrder.total}â¬`);
    console.log(`   - Articles: ${testOrder.items.length}`);

    const result = await sendOrderConfirmationEmail(testOrder);
    
    if (result.success) {
      console.log('â Email de confirmation envoyÃ© avec succÃ¨s !');
      console.log('â VÃ©rifiez votre boÃ®te de rÃ©ception.');
    } else {
      console.log('â Erreur lors de l\'envoi :', result.error);
    }
  } catch (error) {
    console.log('â Erreur :', error.message);
    console.log('â VÃ©rifiez les variables d\'environnement SMTP :');
    console.log('   - SMTP_USER_COMMANDE');
    console.log('   - SMTP_PASS_COMMANDE');
    console.log('   - NEXT_PUBLIC_SITE_URL');
  }
}

testEmail();
