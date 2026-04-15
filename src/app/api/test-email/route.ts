import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    // Données de test pour la commande
    const testOrder = {
      number: 'TEST-2024-001',
      customerName: 'Jean Dupont',
      customerEmail: 'commande@jayscreationsdesign.fr', // Email de test
      total: 89.90,
      createdAt: new Date().toISOString(),
      items: [
        {
          name: 'Bougie "Soirée Romantique"',
          quantity: 2,
          price: 29.95
        },
        {
          name: 'Scented Candle "Vanille Douce"',
          quantity: 1,
          price: 30.00
        }
      ]
    };

    console.log('ð Envoi d\'un email de confirmation de commande de test...');
    console.log('â Données de la commande :');
    console.log(`   - N°: ${testOrder.number}`);
    console.log(`   - Client: ${testOrder.customerName}`);
    console.log(`   - Email: ${testOrder.customerEmail}`);
    console.log(`   - Total: ${testOrder.total}â¬`);
    console.log(`   - Articles: ${testOrder.items.length}`);

    const result = await sendOrderConfirmationEmail(testOrder);
    
    if (result.success) {
      console.log('â Email de confirmation envoyÃ© avec succÃ¨s !');
      return NextResponse.json({
        success: true,
        message: 'Email de confirmation envoyÃ© avec succÃ¨s !',
        emailSent: testOrder.customerEmail,
        orderNumber: testOrder.number
      });
    } else {
      console.log('â Erreur lors de l\'envoi :', result.error);
      return NextResponse.json({
        success: false,
        error: result.error,
        message: 'Erreur lors de l\'envoi de l\'email'
      }, { status: 500 });
    }
  } catch (error) {
    console.log('â Erreur :', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Erreur serveur lors de l\'envoi de l\'email'
    }, { status: 500 });
  }
}
