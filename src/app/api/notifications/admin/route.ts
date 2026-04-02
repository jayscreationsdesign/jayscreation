import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    // Validation du type de notification
    const validTypes = ['account_created', 'order_confirmed', 'quote_request', 'low_stock', 'abandoned_cart'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Type de notification invalide' },
        { status: 400 }
      );
    }

    // Configuration de l'email admin selon le type
    let subject, htmlContent;

    switch (type) {
      case 'account_created':
        subject = '👤 Nouveau compte client - Jay\'s Creations Design';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Nouveau compte client</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
                .content { background: #FAF7F2; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
                .info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B4513; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎨 Jay's Creations Design</h2>
                  <p>Nouveau compte client créé</p>
                </div>
                <div class="content">
                  <h3 style="color: #8B4513;">👤 Informations du nouveau client</h3>
                  <div class="info">
                    <p><strong>Nom:</strong> ${data.prenom} ${data.nom}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Date d'inscription:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                  </div>
                  <p><strong>Action recommandée:</strong> Bienvenue et suivi du client</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      case 'order_confirmed':
        subject = '📦 Nouvelle commande confirmée - Jay\'s Creations Design';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Nouvelle commande</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
                .content { background: #FAF7F2; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
                .urgent { background: #dc3545; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
                .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎨 Jay's Creations Design</h2>
                  <p>Nouvelle commande à traiter</p>
                </div>
                <div class="content">
                  <div class="urgent">⚠️ COMMANDE À TRAITER RAPIDEMENT</div>
                  <h3 style="color: #8B4513;">📋 Détails de la commande</h3>
                  <div class="order-details">
                    <p><strong>Client:</strong> ${data.client.prenom} ${data.client.nom}</p>
                    <p><strong>Email:</strong> ${data.client.email}</p>
                    <p><strong>Total:</strong> ${data.total.toFixed(2)}€</p>
                    <p><strong>Articles:</strong> ${data.items.length} produit(s)</p>
                    ${data.coupon ? `<p><strong>Coupon:</strong> ${data.coupon}</p>` : ''}
                  </div>
                  <p><strong>Action recommandée:</strong> Préparation et expédition</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      case 'quote_request':
        subject = '📋 Nouvelle demande de devis - Jay\'s Creations Design';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Demande de devis</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
                .content { background: #FAF7F2; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
                .urgent { background: #dc3545; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
                .quote-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎨 Jay's Creations Design</h2>
                  <p>Demande de devis personnalisé</p>
                </div>
                <div class="content">
                  <div class="urgent">📋 DEVIS À PRÉPARER</div>
                  <h3 style="color: #8B4513;">Détails de la demande</h3>
                  <div class="quote-details">
                    <p><strong>Client:</strong> ${data.prenom} ${data.nom}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Téléphone:</strong> ${data.telephone}</p>
                    <p><strong>Type de produit:</strong> ${data.typeProduit || 'Non spécifié'}</p>
                    <p><strong>Dimensions:</strong> ${data.dimensions || 'Non spécifié'}</p>
                    <p><strong>Thème:</strong> ${data.theme || 'Non spécifié'}</p>
                    <p><strong>Budget:</strong> ${data.budget || 'Non spécifié'}</p>
                    <p><strong>Délai:</strong> ${data.delai || 'Non spécifié'}</p>
                    ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
                  </div>
                  <p><strong>Action recommandée:</strong> Préparer un devis et contacter le client</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      case 'low_stock':
        subject = '⚠️ Alerte stock bas - Jay\'s Creations Design';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Alerte stock</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 30px 0; background: #dc3545; color: white; border-radius: 10px 10px 0 0; }
                .content { background: #FAF7F2; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #dc3545; border-top: none; }
                .stock-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>⚠️ ALERTE CRITIQUE</h2>
                  <p>Stock bas ou épuisé</p>
                </div>
                <div class="content">
                  <h3 style="color: #dc3545;">📦 Produit concerné</h3>
                  <div class="stock-info">
                    <p><strong>Nom:</strong> ${data.productName}</p>
                    <p><strong>Référence:</strong> ${data.productSku || 'N/A'}</p>
                    <p><strong>Stock actuel:</strong> ${data.currentStock}</p>
                    <p><strong>Seuil d'alerte:</strong> ${data.threshold || 5}</p>
                    <p><strong>Date de l'alerte:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                  </div>
                  <p><strong>Action recommandée:</strong> Réapprovisionnement urgent</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      case 'abandoned_cart':
        subject = '🛒 Panier abandonné - Jay\'s Creations Design';
        htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Panier abandonné</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
                .content { background: #FAF7F2; padding: 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
                .cart-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🛒 Jay's Creations Design</h2>
                  <p>Panier abandonné détecté</p>
                </div>
                <div class="content">
                  <h3 style="color: #8B4513;">Détails du panier abandonné</h3>
                  <div class="cart-info">
                    <p><strong>Client:</strong> ${data.customerEmail}</p>
                    <p><strong>Montant du panier:</strong> ${data.cartTotal.toFixed(2)}€</p>
                    <p><strong>Articles:</strong> ${data.itemCount} produit(s)</p>
                    <p><strong>Date d'abandon:</strong> ${new Date(data.abandonedAt).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Dernière activité:</strong> ${new Date(data.lastActivity).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <p><strong>Action recommandée:</strong> Email de relance client</p>
                </div>
              </div>
            </body>
          </html>
        `;
        break;

      default:
        throw new Error('Type de notification non supporté');
    }

    // Envoi de l'email à l'admin
    const result = await sendEmail({
      to: process.env.IONOS_ADMIN_EMAIL || 'contact@jayscreationsdesign.fr',
      subject,
      html: htmlContent
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Notification admin envoyée avec succès',
        messageId: result.messageId
      });
    } else {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de la notification", details: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur API notification admin:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
