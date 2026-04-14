import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Validation des données requises
    const requiredFields = ['client', 'items', 'total'];
    const missingFields = requiredFields.filter(field => !orderData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Champs requis manquants: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validation du client
    const { client } = orderData;
    const clientRequiredFields = ['prenom', 'nom', 'email'];
    const missingClientFields = clientRequiredFields.filter(field => !client[field]);
    
    if (missingClientFields.length > 0) {
      return NextResponse.json(
        { error: `Champs client requis manquants: ${missingClientFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client.email)) {
      return NextResponse.json(
        { error: 'Format email client invalide' },
        { status: 400 }
      );
    }

    // Génération d'un numéro de commande
    const orderId = `CMD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Envoi de l'email de confirmation
    const result = await sendOrderConfirmationEmail(client.email, {
      ...orderData,
      orderId
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de confirmation envoyé avec succès',
        orderId,
        messageId: result.clientEmail.messageId
      });
    } else {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de confirmation", details: result.clientEmail.error || result.copyEmail.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur API order confirmation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API Order Confirmation Email - Jay\'s Creations Design',
    usage: {
      method: 'POST',
      body: {
        client: {
          prenom: 'string (requis)',
          nom: 'string (requis)',
          email: 'string (requis)',
          telephone: 'string',
          adresse: 'string',
          codePostal: 'string',
          ville: 'string',
          pays: 'string'
        },
        items: 'array (requis)',
        total: 'number (requis)',
        discount: 'number (optionnel)',
        coupon: 'string (optionnel)'
      }
    }
  });
}
