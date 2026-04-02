import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Vérification de la clé Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe | null = null;
if (stripeSecretKey) {
  try {
    stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20' as any,
    });
  } catch (error) {
    console.error('Erreur initialisation Stripe:', error);
  }
} else {
  console.warn('STRIPE_SECRET_KEY non configurée');
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({
        error: 'Stripe non configuré',
        message: 'Veuillez configurer STRIPE_SECRET_KEY dans vos variables d\'environnement'
      }, { status: 500 });
    }

    const body = await request.json();
    const { productName, productDescription = "Produit gratuit", currency = 'eur' } = body;

    if (!productName) {
      return NextResponse.json({
        error: 'Nom du produit requis'
      }, { status: 400 });
    }

    // Créer un tarif gratuit (unit_amount = 0)
    const price = await stripe.prices.create({
      currency: currency,
      unit_amount: 0, // 0 centimes = gratuit
      product_data: {
        name: productName,
      },
      nickname: `Tarif gratuit - ${productName}`,
    });

    console.log('✅ Tarif gratuit créé:', {
      priceId: price.id,
      productName,
      unitAmount: price.unit_amount,
      currency: price.currency
    });

    return NextResponse.json({
      success: true,
      price: {
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        product_name: productName,
        created: price.created
      },
      message: 'Tarif gratuit créé avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur création tarif gratuit:', error);
    
    return NextResponse.json({
      error: 'Erreur lors de la création du tarif gratuit',
      message: error.message || 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({
        error: 'Stripe non configuré'
      }, { status: 500 });
    }

    // Récupérer tous les tarifs gratuits existants
    const prices = await stripe.prices.list({
      limit: 100,
    });

    // Filtrer uniquement les tarifs gratuits (unit_amount = 0)
    const freePrices = prices.data
      .filter(price => price.unit_amount === 0 && price.currency === 'eur')
      .map(price => ({
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        nickname: price.nickname,
        created: price.created,
        product_name: typeof price.product === 'object' && price.product !== null ? 
          (price.product as any).name || 'Produit inconnu' : 'Produit inconnu'
      }));

    return NextResponse.json({
      success: true,
      prices: freePrices,
      count: freePrices.length,
      message: `${freePrices.length} tarifs gratuits trouvés`
    });

  } catch (error: any) {
    console.error('❌ Erreur récupération tarifs gratuits:', error);
    
    return NextResponse.json({
      error: 'Erreur lors de la récupération des tarifs gratuits',
      message: error.message || 'Erreur inconnue'
    }, { status: 500 });
  }
}
