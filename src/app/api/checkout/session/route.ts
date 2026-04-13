import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      );
    }

    // Récupérer les détails de la session Stripe avec les line_items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details']
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Erreur lors de la récupération de la session Stripe:', error);
    return NextResponse.json(
      { error: 'Impossible de récupérer les détails de la commande' },
      { status: 500 }
    );
  }
}
