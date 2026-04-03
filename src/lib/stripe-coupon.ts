import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Fonction pour créer le coupon BIENVENUE10 si'il n'existe pas
export async function ensureWelcomeCoupon() {
  const couponId = 'BIENVENUE10';
  
  try {
    // Vérifier si le coupon existe déjà
    await stripe.coupons.retrieve(couponId);
    console.log('✅ Coupon BIENVENUE10 déjà existant');
  } catch (error) {
    // Le coupon n'existe pas, le créer
    console.log('🎁 Création du coupon BIENVENUE10...');
    
    try {
      // Créer le coupon
      await stripe.coupons.create({
        id: couponId,
        percent_off: 10,
        duration: 'once', // usage unique
        max_redemptions: null, // pas de limite globale
        metadata: { 
          source: 'welcome_email',
          description: 'Coupon de bienvenue -10% pour nouveaux clients'
        },
      });

      // Créer le code promo associé
      await stripe.promotionCodes.create({
        coupon: couponId,
        code: 'BIENVENUE10',
        active: true,
      });

      console.log('✅ Coupon BIENVENUE10 créé avec succès');
    } catch (createError) {
      console.error('❌ Erreur création coupon:', createError);
      throw createError;
    }
  }
}

// Fonction pour vérifier si le coupon est valide
export async function validateWelcomeCoupon(code: string) {
  try {
    const promotionCode = await stripe.promotionCodes.list({
      code: code.toUpperCase(),
      limit: 1,
    });

    if (promotionCode.data.length === 0) {
      return { valid: false, error: 'Code promo invalide' };
    }

    const promo = promotionCode.data[0];
    
    if (!promo.active) {
      return { valid: false, error: 'Code promo inactif' };
    }

    if (promo.coupon?.times_redeemed && promo.coupon.max_redemptions && 
        promo.coupon.times_redeemed >= promo.coupon.max_redemptions) {
      return { valid: false, error: 'Code promo entièrement utilisé' };
    }

    return { 
      valid: true, 
      coupon: promo.coupon,
      percent_off: promo.coupon.percent_off || 0
    };

  } catch (error) {
    console.error('❌ Erreur validation coupon:', error);
    return { valid: false, error: 'Erreur lors de la validation' };
  }
}

// Fonction pour appliquer le coupon à une session checkout
export function applyWelcomeCouponToSession(checkoutParams: any, couponCode?: string) {
  if (couponCode && couponCode.toUpperCase() === 'BIENVENUE10') {
    return {
      ...checkoutParams,
      discounts: [{ coupon: 'BIENVENUE10' }],
      allow_promotion_codes: true,
    };
  }
  
  return {
    ...checkoutParams,
    allow_promotion_codes: true, // Permet au client de saisir le code manuellement
  };
}
