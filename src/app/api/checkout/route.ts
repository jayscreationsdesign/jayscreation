import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase';

// Vérifier si les variables d'environnement sont disponibles
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY non définie - API checkout en mode mock');
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20' as any,
}) : null;

export async function POST(request: NextRequest) {
  try {
    // Si Stripe n'est pas configuré, retourner une réponse mock
    if (!stripe) {
      return NextResponse.json({
        message: 'Service de paiement non configuré - Mode démo',
        url: '/commande/succes'
      });
    }

    const { items, client } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Panier invalide ou vide' },
        { status: 400 }
      );
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

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Création des line_items pour Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nom,
          description: item.theme ? `Thème: ${item.theme}` : undefined,
          images: [item.image],
        },
        unit_amount: Math.round(item.prix * 100), // Conversion en centimes
      },
      quantity: item.quantite,
    }));

    // Calcul du total
    const total = items.reduce((sum: number, item: any) => sum + item.prix * item.quantite, 0);

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commande/annulation`,
      expires_at: Math.floor(Date.now() / 1000) + 1800 as number, // Expire dans 30 minutes (timestamp Unix en secondes)
      metadata: {
        client_nom: `${client.prenom} ${client.nom}`,
        client_email: client.email,
        client_telephone: client.telephone,
        adresse_complete: `${client.adresse}, ${client.codePostal} ${client.ville}, ${client.pays}`,
        personnalisation: client.personnalisation || '',
        articles_json: JSON.stringify(items),
      },
      customer_email: client.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
      },
    });

    // Sauvegarde dans Supabase
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { error: dbError } = await supabase
      .from('commandes')
      .insert({
        stripe_session_id: session.id,
        statut: 'en_attente',
        total: total,
        client_nom: `${client.prenom} ${client.nom}`,
        client_email: client.email,
        client_telephone: client.telephone,
        adresse_livraison: `${client.adresse}, ${client.codePostal} ${client.ville}, ${client.pays}`,
        articles: items,
        personnalisation: client.personnalisation || null,
      });

    if (dbError) {
      console.error('Erreur Supabase:', dbError);
      // On continue même si la sauvegarde échoue, le paiement est prioritaire
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur API Checkout:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}
