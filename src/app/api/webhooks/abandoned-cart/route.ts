import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const cart = await request.json();
    
    console.log('🛒 Panier abandonné détecté:', cart);

    // Email de récupération de panier abandonné
    await sendEmail(emailTemplates.abandonedCart({
      customer_email: cart.customer_email,
      items: cart.items,
      total: cart.total,
      abandoned_at: cart.abandoned_at || new Date().toISOString()
    }));

    // Email d'alerte à l'admin (optionnel)
    await sendEmail({
      to: 'contact@jayscreationsdesign.fr',
      subject: `🛒 Panier abandonné : ${cart.customer_email}`,
      html: `
        <h2>Panier abandonné détecté</h2>
        <p><strong>Client:</strong> ${cart.customer_email}</p>
        <p><strong>Articles:</strong> ${cart.items?.length || 0}</p>
        <p><strong>Total:</strong> ${cart.total}€</p>
        <p><strong>Date:</strong> ${new Date(cart.abandoned_at || new Date()).toLocaleDateString('fr-FR')}</p>
        <p><a href="https://www.jayscreationsdesign.fr/admin/abandoned-carts">Voir les paniers abandonnés</a></p>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email de panier abandonné envoyé avec succès',
      customer_email: cart.customer_email
    });

  } catch (error) {
    console.error('❌ Erreur webhook abandoned-cart:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email de panier abandonné' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook abandoned-cart - POST requis pour envoyer les emails de panier abandonné' 
  });
}
