import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new NextResponse('Token manquant', { status: 400 });
    }

    // Connexion à Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Vérifier le token et récupérer la commande
    const { data: order, error: orderError } = await supabase
      .from('commandes')
      .select('*')
      .eq('admin_token', token)
      .eq('token_used', false)
      .single();

    if (orderError || !order) {
      console.error('Erreur recherche commande:', orderError);
      return new NextResponse('Token invalide ou déjà utilisé', { status: 400 });
    }

    // Mettre à jour le statut et marquer le token comme utilisé
    const { error: updateError } = await supabase
      .from('commandes')
      .update({ 
        statut: 'confirmed',
        token_used: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Erreur mise à jour commande:', updateError);
      return new NextResponse('Erreur lors de la validation', { status: 500 });
    }

    // Envoyer l'email de confirmation au client
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Votre commande est confirmée</title>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
            <style>
              body { 
                font-family: 'Inter', sans-serif; 
                line-height: 1.6; 
                color: #1a3526; 
                margin: 0; 
                padding: 0; 
                background-color: #FAF7F2;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
                background: white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header { 
                text-align: center; 
                padding: 40px 0; 
                background: linear-gradient(135deg, #1a3526, #2d4a3d); 
                color: white; 
                border-radius: 12px 12px 0 0;
              }
              .logo { 
                font-family: 'Playfair Display', serif;
                font-size: 32px; 
                font-weight: 700; 
                margin-bottom: 10px;
                color: #C8A96E;
              }
              .content { 
                padding: 40px 30px; 
                background: #FAF7F2;
                border-radius: 0 0 12px 12px;
              }
              .success-icon {
                width: 80px;
                height: 80px;
                background: #1a3526;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 30px;
                font-size: 40px;
                color: white;
              }
              .title {
                font-family: 'Playfair Display', serif;
                font-size: 28px;
                font-weight: 700;
                color: #1a3526;
                text-align: center;
                margin-bottom: 20px;
              }
              .order-info {
                background: white;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #C8A96E;
              }
              .order-id {
                font-family: 'Playfair Display', serif;
                font-size: 18px;
                font-weight: 600;
                color: #1a3526;
                margin-bottom: 15px;
              }
              .items-list {
                margin: 20px 0;
              }
              .item {
                padding: 15px 0;
                border-bottom: 1px solid #E8D4B8;
              }
              .item:last-child {
                border-bottom: none;
              }
              .item-name {
                font-weight: 600;
                color: #1a3526;
                margin-bottom: 5px;
              }
              .item-details {
                color: #666;
                font-size: 14px;
              }
              .total {
                font-family: 'Playfair Display', serif;
                font-size: 24px;
                font-weight: 700;
                color: #1a3526;
                text-align: right;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 2px solid #C8A96E;
              }
              .timeline {
                background: white;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #1a3526;
              }
              .timeline-title {
                font-family: 'Playfair Display', serif;
                font-size: 18px;
                font-weight: 600;
                color: #1a3526;
                margin-bottom: 15px;
              }
              .timeline-item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                color: #666;
              }
              .timeline-icon {
                width: 24px;
                height: 24px;
                background: #C8A96E;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                font-size: 12px;
                color: white;
                flex-shrink: 0;
              }
              .footer { 
                text-align: center; 
                padding: 30px 20px; 
                font-size: 12px; 
                color: #666; 
                border-top: 1px solid #E8D4B8;
                margin-top: 40px;
              }
              .signature {
                font-family: 'Playfair Display', serif;
                font-style: italic;
                color: #1a3526;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Jay's Creations Design</div>
                <p>Créations uniques pour moments précieux</p>
              </div>
              
              <div class="content">
                <div class="success-icon">â</div>
                
                <h1 class="title">Votre commande est confirmée !</h1>
                
                <p style="text-align: center; font-size: 16px; margin-bottom: 30px; color: #666;">
                  Chère/Cher <strong>${order.client_nom}</strong>,<br>
                  Nous avons le plaisir de vous informer que votre commande a été validée et est maintenant en préparation.
                </p>
                
                <div class="order-info">
                  <div class="order-id">Commande n° ${order.id}</div>
                  <p><strong>Date de commande:</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Email:</strong> ${order.client_email}</p>
                  <p><strong>Téléphone:</strong> ${order.client_telephone}</p>
                </div>
                
                <div class="order-info">
                  <h3 style="font-family: 'Playfair Display', serif; color: #1a3526; margin-bottom: 20px;">Récapitulatif de votre commande</h3>
                  <div class="items-list">
                    ${order.articles.map((item: any, index: number) => `
                      <div class="item">
                        <div class="item-name">${item.nom || item.name}</div>
                        <div class="item-details">
                          Quantité: ${item.quantite || item.quantity} | 
                          ${item.theme ? `Thème: ${item.theme}` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                  <div class="total">
                    Total: ${order.total.toFixed(2)} â?¬
                  </div>
                </div>
                
                <div class="timeline">
                  <div class="timeline-title">Délai de traitement estimé</div>
                  <div class="timeline-item">
                    <div class="timeline-icon">1</div>
                    <span>Préparation de votre commande (2-3 jours)</span>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon">2</div>
                    <span>Fabrication artisanale (5-7 jours)</span>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon">3</div>
                    <span>Expédition (1-2 jours)</span>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon">4</div>
                    <span>Livraison chez vous</span>
                  </div>
                </div>
                
                <div style="text-align: center; margin: 40px 0; padding: 25px; background: white; border-radius: 8px; border: 2px solid #C8A96E;">
                  <p style="margin-bottom: 15px; color: #666;">Vous recevrez des mises à jour par email à chaque étape</p>
                  <p style="font-family: 'Playfair Display', serif; color: #1a3526; font-weight: 600;">Merci pour votre confiance !</p>
                </div>
              </div>
              
              <div class="footer">
                <p><strong>Jay's Creations Design</strong></p>
                <p>contact@jayscreationsdesign.fr</p>
                <p class="signature">"L'art de capturer vos plus beaux moments"</p>
              </div>
            </div>
          </body>
        </html>
      `;

      await sendEmail({
        to: order.client_email,
        subject: 'â Votre commande Jay\'s Creations Design est confirmée !',
        html: emailHtml,
        from: 'commande@jayscreationsdesign.fr'
      });

      console.log('Email de confirmation envoyé à:', order.client_email);
    } catch (emailError) {
      console.error('Erreur envoi email confirmation:', emailError);
    }

    // Retourner une page HTML simple
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Commande Validée</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Inter', sans-serif; 
              background: #FAF7F2; 
              margin: 0; 
              padding: 40px 20px; 
              color: #1a3526;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: #1a3526;
              color: white;
              padding: 40px;
              text-align: center;
            }
            .success-icon {
              width: 80px;
              height: 80px;
              background: #C8A96E;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 40px;
              color: white;
            }
            .title {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 10px;
            }
            .content {
              padding: 40px;
              text-align: center;
            }
            .message {
              font-size: 18px;
              margin-bottom: 30px;
              line-height: 1.6;
            }
            .order-info {
              background: #FAF7F2;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #C8A96E;
              text-align: left;
            }
            .footer {
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #E8D4B8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">â</div>
              <div class="title">Commande Validée !</div>
              <p>Email envoyé au client</p>
            </div>
            <div class="content">
              <p class="message">
                La commande <strong>${order.id}</strong> a été validée avec succès.<br>
                Un email de confirmation a été envoyé à <strong>${order.client_email}</strong>.
              </p>
              <div class="order-info">
                <p><strong>Client:</strong> ${order.client_nom}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)} â?¬</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              </div>
            </div>
            <div class="footer">
              <p>Jay's Creations Design - Système de validation</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(htmlResponse, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Erreur validation commande:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  }
}
