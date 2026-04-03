import { NextRequest, NextResponse } from 'next/server';

// Vercel Cron Job pour les paniers abandonnés
export async function GET(request: NextRequest) {
  try {
    console.log('🕐 Vérification des paniers abandonnés...');
    
    // En dev, simuler la recherche de paniers abandonnés
    const abandonedCarts = [
      {
        customerEmail: 'test@example.com',
        customerName: 'Test Client',
        items: [
          { name: 'Faire-part mariage', price: 25.00 },
          { name: 'Menu mariage', price: 15.00 }
        ],
        cartUrl: 'https://jayscreationsdesign.fr/panier',
        abandonedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
        reminded: false
      }
    ];

    const results = [];

    for (const cart of abandonedCarts) {
      try {
        // Envoyer l'email de relance
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/emails/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-secret': process.env.EMAIL_API_SECRET!,
          },
          body: JSON.stringify({
            type: 'abandoned-cart',
            data: {
              prenom: cart.customerName.split(' ')[0],
              items: cart.items,
              cartUrl: cart.cartUrl,
            },
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          console.log(`✅ Email de relance envoyé à ${cart.customerEmail}`);
          results.push({ email: cart.customerEmail, success: true });
        } else {
          console.error(`❌ Erreur envoi à ${cart.customerEmail}:`, result.error);
          results.push({ email: cart.customerEmail, success: false, error: result.error });
        }
      } catch (error) {
        console.error(`❌ Erreur traitement panier ${cart.customerEmail}:`, error);
        results.push({ email: cart.customerEmail, success: false, error: 'Erreur traitement' });
      }
    }

    console.log(`📊 Traitement terminé: ${results.length} paniers vérifiés`);

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erreur cron abandoned-carts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur serveur' 
      },
      { status: 500 }
    );
  }
}
