import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const order = await request.json();
    
    console.log('🔔 Nouvelle commande reçue:', order);

    // Email à l'admin
    await sendEmail(emailTemplates.newOrderAdmin({
      id: order.id,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      total: order.total,
      items: order.items,
      created_at: order.created_at
    }));

    // Email de confirmation au client
    await sendEmail(emailTemplates.orderConfirmation({
      id: order.id,
      customer_email: order.customer_email,
      total: order.total,
      created_at: order.created_at
    }));

    return NextResponse.json({ 
      success: true, 
      message: 'Emails de commande envoyés avec succès',
      order_id: order.id
    });

  } catch (error) {
    console.error('❌ Erreur webhook new-order:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi des emails de commande' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook new-order - POST requis pour envoyer les emails' 
  });
}
