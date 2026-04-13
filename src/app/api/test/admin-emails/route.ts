import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@jayscreationsdesign.fr';
    const results = [];

    console.log('Test des emails admin vers:', adminEmail);

    // 1. Test email de bienvenue (nouveau compte)
    try {
      await sendEmail({
        to: adminEmail,
        subject: 'TEST - Nouveau compte créé - Jay\'s Creations Design',
        html: emailTemplates.welcome.html('TestUser')
      });
      results.push({ type: 'welcome', status: 'success', message: 'Email bienvenue envoyé' });
    } catch (error) {
      results.push({ type: 'welcome', status: 'error', message: error instanceof Error ? error.message : 'Erreur inconnue' });
    }

    // 2. Test email de confirmation commande
    try {
      const orderData = {
        id: 'TEST-CMD-' + Date.now(),
        customer_name: 'Test Client',
        customer_email: 'test@example.com',
        total: 29.90,
        items: [
          { name: 'Cadre Personnalisé Test', quantity: 1, price: 29.90 }
        ],
        created_at: new Date().toISOString()
      };

      await sendEmail({
        to: adminEmail,
        subject: 'TEST - Confirmation commande - Jay\'s Creations Design',
        html: emailTemplates.orderConfirmation.html(orderData)
      });
      results.push({ type: 'orderConfirmation', status: 'success', message: 'Email confirmation commande envoyé' });
    } catch (error) {
      results.push({ type: 'orderConfirmation', status: 'error', message: error instanceof Error ? error.message : 'Erreur inconnue' });
    }

    // 3. Test email de demande de devis
    try {
      const quoteData = {
        prenom: 'Test',
        nom: 'Client',
        email: 'test@example.com',
        telephone: '0123456789',
        typeProduit: 'Cadre Personnalisé',
        dimensions: '30x40cm',
        message: 'Ceci est un test de demande de devis'
      };

      await sendEmail({
        to: adminEmail,
        subject: 'TEST - Demande de devis - Jay\'s Creations Design',
        html: emailTemplates.quoteRequest.html(quoteData)
      });
      results.push({ type: 'quoteRequest', status: 'success', message: 'Email demande devis envoyé' });
    } catch (error) {
      results.push({ type: 'quoteRequest', status: 'error', message: error instanceof Error ? error.message : 'Erreur inconnue' });
    }

    // 4. Test email webhook Stripe (nouvelle commande)
    try {
      const webhookOrderData = {
        id: 'TEST-WEBHOOK-' + Date.now(),
        customer_name: 'Webhook Test Client',
        customer_email: 'webhook@example.com',
        total: 1.80,
        items: [
          { name: 'Produit Test Webhook', quantity: 1, price: 1.80 }
        ],
        created_at: new Date().toISOString()
      };

      await sendEmail({
        to: adminEmail,
        subject: 'TEST - Webhook Stripe - Jay\'s Creations Design',
        html: `
          <h2>TEST WEBHOOK STRIPE</h2>
          <p><strong>Commande:</strong> ${webhookOrderData.id}</p>
          <p><strong>Client:</strong> ${webhookOrderData.customer_name}</p>
          <p><strong>Email:</strong> ${webhookOrderData.customer_email}</p>
          <p><strong>Total:</strong> ${webhookOrderData.total} EUR</p>
          <h3>Articles:</h3>
          <ul>
            ${webhookOrderData.items.map((item: any) => 
              `<li>${item.name} - Quantité: ${item.quantity} - Prix: ${item.price} EUR</li>`
            ).join('')}
          </ul>
          <p><em>Ceci est un test du webhook Stripe pour vérifier que les emails admin fonctionnent.</em></p>
        `
      });
      results.push({ type: 'webhookStripe', status: 'success', message: 'Email webhook Stripe envoyé' });
    } catch (error) {
      results.push({ type: 'webhookStripe', status: 'error', message: error instanceof Error ? error.message : 'Erreur inconnue' });
    }

    // 5. Test email notification admin (format existant)
    try {
      await sendEmail({
        to: adminEmail,
        subject: 'TEST - Notification Admin - Jay\'s Creations Design',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #8B4513; color: white; padding: 20px; text-align: center;">
              <h1>TEST NOTIFICATION ADMIN</h1>
            </div>
            <div style="padding: 20px; background: #FAF7F2;">
              <h2>Ceci est un test des emails admin</h2>
              <p>Tous les types d'emails devraient arriver dans cette boîte mail.</p>
              <ul>
                <li> Email de bienvenue (nouveau compte) </li>
                <li> Email de confirmation commande </li>
                <li> Email de demande de devis </li>
                <li> Email webhook Stripe </li>
                <li> Email notification admin </li>
              </ul>
              <p><strong>Envoyé le:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        `
      });
      results.push({ type: 'adminNotification', status: 'success', message: 'Email notification admin envoyé' });
    } catch (error) {
      results.push({ type: 'adminNotification', status: 'error', message: error instanceof Error ? error.message : 'Erreur inconnue' });
    }

    return NextResponse.json({
      success: true,
      message: 'Test des emails admin terminé',
      adminEmail,
      results,
      summary: {
        total: results.length,
        success: results.filter(r => r.status === 'success').length,
        errors: results.filter(r => r.status === 'error').length
      }
    });

  } catch (error) {
    console.error('Erreur test emails admin:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors du test des emails admin',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
