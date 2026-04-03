import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const quote = await request.json();
    
    console.log('📋 Nouvelle demande de devis:', quote);

    // Email à l'admin pour la demande de devis
    await sendEmail(emailTemplates.quoteRequest({
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      product: quote.product,
      quantity: quote.quantity,
      budget: quote.budget,
      event_date: quote.event_date,
      message: quote.message,
      created_at: quote.created_at || new Date().toISOString()
    }));

    // Email de confirmation au client (optionnel)
    await sendEmail({
      to: quote.email,
      subject: 'Nous avons bien reçu votre demande de devis',
      html: `
        <h2>Bonjour ${quote.name},</h2>
        <p>Merci pour votre demande de devis concernant <strong>${quote.product}</strong>.</p>
        <p>Nous l'avons bien reçue et nous vous répondrons dans les plus brefs délais.</p>
        <p>Référence de votre demande : #${Date.now()}</p>
        <p><a href="https://www.jayscreationsdesign.fr">Visiter notre site</a></p>
        <br>
        <p>L'équipe Jay's Creations Design</p>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Demande de devis traitée avec succès',
      quote_id: Date.now()
    });

  } catch (error) {
    console.error('❌ Erreur webhook quote-request:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande de devis' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook quote-request - POST requis pour traiter les demandes de devis' 
  });
}
