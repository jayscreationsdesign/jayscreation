import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateCartMiddleware } from '@/lib/pricing-validation';

// Vérification de la clé Stripe avec fallback pour le déploiement
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
  console.warn('STRIPE_SECRET_KEY non configurée - Mode démo');
}

export async function POST(request: NextRequest) {
  try {
    // Mode démo si Stripe n'est pas configuré
    if (!stripe) {
      return NextResponse.json({
        message: 'Service de paiement non configuré - Mode démo',
        url: '/commande/succes'
      });
    }
    // Parsing du body avec validation
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { items, client } = body;

    // Validation du panier avec le middleware de pricing hybride
    const validationResult = await validateCartMiddleware(body);
    if (validationResult) {
      return validationResult; // Retourne l'erreur si validation échoue
    }

    // Validation des données client
    const requiredFields = ['prenom', 'nom', 'email', 'telephone', 'adresse', 'codePostal', 'ville', 'pays'];
    for (const field of requiredFields) {
      if (!client[field] || client[field].trim() === '') {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Construction des URLs obligatoires avec new URL() (ASCII uniquement)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';
    
    console.log('DEBUG - Variables d\'environnement:', {
      STRIPE_SECRET_KEY: stripeSecretKey ? 'CONFIGURED' : 'NOT_CONFIGURED',
      STRIPE_KEY_PREFIX: process.env.STRIPE_SECRET_KEY?.substring(0, 8) || 'NOT_SET',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'NOT_SET',
      baseUrl: baseUrl
    });
    
    if (!baseUrl) {
      throw new Error("Missing baseUrl for Stripe callbacks");
    }

    // URLs construites proprement avec new URL() - 100% ASCII
    const successUrl = new URL("/checkout/success", baseUrl);
    successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");

    const cancelUrl = new URL("/checkout/cancel", baseUrl);

    console.log("🔧 URLs Stripe validées:", {
      baseUrl,
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString()
    });

    // Calcul du total pour déterminer si la commande est gratuite
    const totalAmount = items.reduce((sum: number, item: any) => {
      const unitPrice = Number(item.prix) || 0;
      const quantity = Number(item.quantite) || 0;
      return sum + unitPrice * quantity;
    }, 0);

    // Vérifier si la commande est gratuite (total = 0) ou si un coupon 100% est appliqué
    const hasFreeCoupon = body.coupon === 'GRATUIT100' || body.coupon === 'FREE100';
    const isFreeOrder = totalAmount === 0 || hasFreeCoupon;

    console.log('🔧 Analyse commande:', {
      totalAmount,
      hasFreeCoupon,
      isFreeOrder,
      itemCount: items.length
    });

    // Si la commande est gratuite, rediriger directement vers la page de succès
    if (isFreeOrder) {
      // Créer une session gratuite pour suivi
      const freeSessionId = `free_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return NextResponse.json({
        message: 'Commande gratuite traitée avec succès',
        url: `/checkout/success?session_id=${freeSessionId}&free_order=true`,
        sessionId: freeSessionId,
        isFreeOrder: true
      });
    }
    // Validation et construction des line_items pour le système de pricing hybride
    const line_items = items.map((item: any, index: number) => {
      let unitPrice: number;
      let quantity: number;
      let productName: string;
      let description: string | undefined;

      // Adapter selon le type de pricing
      switch (item.type) {
        case 'unit':
          unitPrice = Number(item.unitPrice);
          quantity = Number(item.quantity);
          productName = item.productName || 'Produit sans nom';
          description = item.theme ? `Thème: ${item.theme} | Quantité: ${quantity}` : undefined;
          break;
        
        case 'lot':
          unitPrice = Number(item.unitPrice);
          quantity = 1; // Un lot = 1 unité pour Stripe
          productName = item.lotName ? `${item.productName} - ${item.lotName}` : item.productName || 'Produit sans nom';
          description = item.theme ? `Thème: ${item.theme} | Lot: ${item.lotName} (${item.quantity} unités)` : undefined;
          break;
        
        default:
          // Fallback pour l'ancien format
          unitPrice = Number(item.prix);
          quantity = Number(item.quantite);
          productName = item.nom || 'Produit sans nom';
          description = item.theme ? `Thème: ${item.theme}` : undefined;
      }
      
      if (!unitPrice || unitPrice <= 0) {
        throw new Error(`Prix invalide pour l'article ${index}: ${unitPrice}`);
      }
      
      if (!quantity || quantity <= 0) {
        throw new Error(`Quantité invalide pour l'article ${index}: ${quantity}`);
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName,
            description: description,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: quantity,
      };
    });

    // Validation finale des line_items
    if (line_items.length === 0) {
      return NextResponse.json(
        { error: 'Aucun article valide dans le panier' },
        { status: 400 }
      );
    }

    // Création de la session Stripe avec logging détaillé
    console.log('🔧 Création session Stripe avec:', {
      itemCount: items.length,
      baseUrl,
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      totalAmount: items.reduce((sum: number, item: any) => sum + Number(item.prix) * Number(item.quantite), 0)
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      expires_at: Math.floor(Date.now() / 1000) + 1800,
      metadata: {
        client_nom: `${client.prenom} ${client.nom}`,
        client_email: client.email,
        client_telephone: client.telephone,
        adresse_complete: `${client.adresse}, ${client.codePostal} ${client.ville}, ${client.pays}`,
        personnalisation: client.personnalisation || '',
        articles_json: JSON.stringify(items),
      },
      customer_email: client.email,
    });

    console.log('✅ Session Stripe créée:', session.id);

    // Sauvegarde dans Supabase (non bloquant)
    try {
      const { createClient } = require('@/lib/supabase');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
      );
      await supabase.from('commandes').insert({
        stripe_session_id: session.id,
        statut: 'en_attente',
        total: items.reduce((sum: number, item: any) => sum + Number(item.prix) * Number(item.quantite), 0),
        client_nom: `${client.prenom} ${client.nom}`,
        client_email: client.email,
        client_telephone: client.telephone,
        adresse_livraison: `${client.adresse}, ${client.codePostal} ${client.ville}, ${client.pays}`,
        articles: items,
        personnalisation: client.personnalisation || null,
      });
    } catch (dbError) {
      console.error('⚠️ Erreur Supabase (non bloquant):', dbError);
    }

    // Envoi des emails de notification (non bloquant)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      
      // 1. Email de confirmation au client
      const emailResponse = await fetch(`${baseUrl}/api/email/order-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: {
            prenom: client.prenom,
            nom: client.nom,
            email: client.email,
            telephone: client.telephone,
            adresse: client.adresse,
            codePostal: client.codePostal,
            ville: client.ville,
            pays: client.pays
          },
          items,
          total: items.reduce((sum: number, item: any) => sum + Number(item.prix) * Number(item.quantite), 0),
          coupon: session.metadata?.coupon || ''
        })
      });

      if (emailResponse.ok) {
        console.log('✅ Email confirmation client envoyé');
      } else {
        console.error('❌ Erreur email confirmation client');
      }
    } catch (emailError) {
      console.error('⚠️ Erreur envoi email client:', emailError);
    }

    // 2. Notification admin
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      
      const adminResponse = await fetch(`${baseUrl}/api/notifications/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order_confirmed',
          data: {
            client: {
              prenom: client.prenom,
              nom: client.nom,
              email: client.email
            },
            items,
            total: items.reduce((sum: number, item: any) => sum + Number(item.prix) * Number(item.quantite), 0),
            coupon: session.metadata?.coupon || ''
          }
        })
      });

      if (adminResponse.ok) {
        console.log('  Notification admin commande envoyée');
      } else {
        console.error(' Erreur notification admin');
      }

    } catch (adminError) {
      console.error(' Erreur notification admin:', adminError);
    }

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    // Logging détaillé de l'erreur complète
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      type: (error as any)?.type,
      code: (error as any)?.code,
      param: (error as any)?.param,
      rawError: error
    };
    
    console.error('DEBUG - Erreur complète checkout:', errorDetails);

    // Message d'erreur spécifique selon le type d'erreur
    let errorMessage = 'Erreur serveur lors de la validation du panier';
    
    if (error instanceof Error) {
      if ((error as any).type === 'StripeCardError') {
        errorMessage = 'Erreur de carte bancaire';
      } else if ((error as any).type === 'StripeRateLimitError') {
        errorMessage = 'Trop de requêtes, veuillez réessayer plus tard';
      } else if ((error as any).type === 'StripeInvalidRequestError') {
        errorMessage = 'Requête invalide: ' + error.message;
      } else if ((error as any).type === 'StripeAPIError') {
        errorMessage = 'Erreur API Stripe: ' + error.message;
      } else if ((error as any).type === 'StripeConnectionError') {
        errorMessage = 'Erreur de connexion avec Stripe';
      } else if ((error as any).type === 'StripeAuthenticationError') {
        errorMessage = 'Erreur d\'authentification Stripe (clé API invalide)';
      } else {
        errorMessage = error.message;
      }
    }

    console.error('CHECKOUT ERROR DETAILS:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    })

    return NextResponse.json(
      { 
        error: 'Erreur serveur lors de la validation du panier',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
