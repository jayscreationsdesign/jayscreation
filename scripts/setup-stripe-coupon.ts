import { ensureWelcomeCoupon } from '../src/lib/stripe-coupon';

// Script pour créer le coupon Stripe BIENVENUE10
async function setupStripeCoupon() {
  console.log('🎁 Configuration du coupon Stripe BIENVENUE10...\n');

  try {
    // Vérifier que la clé secrète Stripe est disponible
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY n\'est pas défini dans .env.local');
    }

    console.log('🔑 Clé Stripe trouvée, création du coupon...');
    
    // Créer le coupon
    await ensureWelcomeCoupon();
    
    console.log('\n✅ Configuration terminée !');
    console.log('📋 Détails du coupon :');
    console.log('   • Code : BIENVENUE10');
    console.log('   • Remise : -10%');
    console.log('   • Durée : Usage unique');
    console.log('   • Validité : Illimitée');
    console.log('   • Source : Email de bienvenue');
    
    console.log('\n🛒 Utilisation dans Stripe Checkout :');
    console.log('   • allow_promotion_codes: true');
    console.log('   • Le client peut saisir BIENVENUE10');
    console.log('   • Ou appliquer automatiquement via discounts: [{ coupon: "BIENVENUE10" }]');
    
    console.log('\n🎉 Le coupon est maintenant prêt pour vos nouveaux clients !');

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    
    if (error.message.includes('STRIPE_SECRET_KEY')) {
      console.log('\n💡 Solution :');
      console.log('   1. Vérifiez que STRIPE_SECRET_KEY est dans .env.local');
      console.log('   2. Redémarrez votre serveur après avoir ajouté la clé');
      console.log('   3. Relancez ce script');
    }
  }
}

// Exécuter la configuration
setupStripeCoupon();
