import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    
    console.log('⚠️ Alerte de stock faible:', product);

    // Email d'alerte de stock faible
    await sendEmail(emailTemplates.lowStockAlert({
      id: product.id,
      name: product.name,
      sku: product.sku,
      stock: product.stock,
      alert_threshold: product.alert_threshold || 5
    }));

    return NextResponse.json({ 
      success: true, 
      message: 'Alerte de stock faible envoyée avec succès',
      product_id: product.id,
      current_stock: product.stock
    });

  } catch (error) {
    console.error('❌ Erreur webhook low-stock:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'alerte de stock' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook low-stock - POST requis pour envoyer les alertes de stock' 
  });
}
