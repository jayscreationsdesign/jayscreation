import { testEmailSystem } from '../src/lib/send-email';

// Script de test pour le système d'emails IONOS
async function runEmailTests() {
  console.log('🧪 DÉMARRAGE DES TESTS EMAILS IONOS\n');

  try {
    // Tester le système complet
    await testEmailSystem();

    console.log('\n✅ Tests terminés !');
    console.log('\n📋 Vérifiez vos boîtes mail :');
    console.log('   • jayscreations.d@gmail.com (admin)');
    console.log('   • commande@jayscreationsdesign.fr (test commande)');
    console.log('   • contact@jayscreationsdesign.fr (test contact)');

    console.log('\n🔧 Si les emails ne sont pas reçus :');
    console.log('   1. Vérifiez les identifiants IONOS');
    console.log('   2. Activez "Accès apps moins sécurisées" dans Gmail');
    console.log('   3. Utilisez un App Password Gmail');
    console.log('   4. Consultez les logs ci-dessus');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
}

// Exécuter les tests
runEmailTests();
