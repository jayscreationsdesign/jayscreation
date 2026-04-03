// Script de test rapide pour les emails
import { triggerWelcomeEmail, triggerNewOrderEmails, triggerQuoteRequestEmail } from './src/lib/email-triggers';

async function testEmails() {
  console.log('🧪 DÉBUT DES TESTS EMAILS\n');

  try {
    // Test 1: Email de bienvenue
    console.log('📧 Test 1: Email de bienvenue...');
    await triggerWelcomeEmail({
      email: 'jayscreations.d@gmail.com',
      name: 'Test User'
    });
    console.log('✅ Email de bienvenue envoyé avec succès\n');

    // Attendre 2 secondes entre les tests
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Emails de commande
    console.log('📦 Test 2: Emails de commande...');
    await triggerNewOrderEmails({
      id: 'TEST-001',
      customer_name: 'Client Test',
      customer_email: 'jayscreations.d@gmail.com',
      customer_phone: '06 12 34 56 78',
      total: 49.90,
      items: [{ name: 'Faire-part test', quantity: 2 }],
      created_at: new Date().toISOString()
    });
    console.log('✅ Emails de commande envoyés avec succès\n');

    // Attendre 2 secondes entre les tests
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 3: Demande de devis
    console.log('📋 Test 3: Demande de devis...');
    await triggerQuoteRequestEmail({
      name: 'Test Client',
      email: 'jayscreations.d@gmail.com',
      phone: '06 98 76 54 32',
      product: 'Faire-part mariage test',
      quantity: '50',
      budget: '200-300€',
      event_date: '2024-06-15',
      message: 'Ceci est un test de demande de devis.'
    });
    console.log('✅ Demande de devis envoyée avec succès\n');

    console.log('🎉 TOUS LES TESTS EMAILS TERMINÉS AVEC SUCCÈS !');
    console.log('📧 Vérifiez vos boîtes mail :');
    console.log('   - jayscreations.d@gmail.com (emails clients)');
    console.log('   - commande@jayscreationsdesign.fr (emails admin)');
    console.log('   - contact@jayscreationsdesign.fr (copies admin)');

  } catch (error) {
    console.error('❌ ERREUR PENDANT LES TESTS:', error);
    console.log('\n🔍 Vérifiez :');
    console.log('   1. Variables d\'environnement (.env.local)');
    console.log('   2. Configuration DNS IONOS');
    console.log('   3. Logs Supabase');
  }
}

// Exécuter les tests
testEmails();
