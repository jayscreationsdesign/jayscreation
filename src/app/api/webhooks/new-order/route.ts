import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email-service';
import { getUserPoints, calculatePurchasePoints } from '@/lib/loyalty';

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

    // Ajouter des points de fidélité (NON BLOQUANT)
    if (order.user_id) {
      try {
        // Obtenir le palier actuel de l'utilisateur
        const loyaltyData = await getUserPoints(order.user_id);
        const currentTier = loyaltyData?.tier || 'petale';
        
        // Calculer les points selon le montant et le palier
        const pointsEarned = calculatePurchasePoints(order.total, currentTier);
        
        // Ajouter les points
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        await fetch(`${baseUrl}/api/loyalty/add-points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-secret': process.env.LOYALTY_API_SECRET || 'jcd-loyalty-secret',
          },
          body: JSON.stringify({
            userId: order.user_id,
            type: 'purchase',
            points: pointsEarned,
            description: `Achat de ${order.total}€`,
            referenceId: order.id
          }),
        });
        
        console.log(`✅ ${pointsEarned} points de fidélité ajoutés pour la commande ${order.id}`);
      } catch (loyaltyError) {
        console.error('❌ Erreur ajout points fidélité (non bloquant):', loyaltyError);
      }
    }

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
