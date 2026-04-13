import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { sendEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

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

    // Marquer le token comme utilisé
    await supabase
      .from('commandes')
      .update({ token_used: true })
      .eq('id', order.id);

    let refundStatus = 'non initié';
    let refundError = null;

    // Tenter le remboursement Stripe si payment_intent_id existe
    if (order.payment_intent_id) {
      try {
        const refund = await stripe.refunds.create({
          payment_intent: order.payment_intent_id,
          reason: 'requested_by_customer'
        });

        refundStatus = `remboursé (${refund.amount / 100}â?¬)`;
        console.log('Remboursement Stripe initié:', refund.id);
      } catch (stripeError) {
        refundError = stripeError instanceof Error ? stripeError.message : 'Erreur Stripe inconnue';
        refundStatus = `erreur: ${refundError}`;
        console.error('Erreur remboursement Stripe:', refundError);
      }
    } else {
      refundStatus = 'payment_intent_id manquant';
    }

    // Mettre à jour le statut de la commande
    const { error: updateError } = await supabase
      .from('commandes')
      .update({ 
        statut: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Erreur mise à jour commande:', updateError);
    }

    // Envoyer l'email d'annulation au client
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Article indisponible</title>
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
                background: linear-gradient(135deg, #c0392b, #e74c3c); 
                color: white; 
                border-radius: 12px 12px 0 0;
              }
              .logo { 
                font-family: 'Playfair Display', serif;
                font-size: 32px; 
                font-weight: 700; 
                margin-bottom: 10px;
                color: #FAF7F2;
              }
              .content { 
                padding: 40px 30px; 
                background: #FAF7F2;
                border-radius: 0 0 12px 12px;
              }
              .cancel-icon {
                width: 80px;
                height: 80px;
                background: #c0392b;
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
                color: #c0392b;
                text-align: center;
                margin-bottom: 20px;
              }
              .message {
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 30px;
                color: #666;
              }
              .order-info {
                background: white;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #c0392b;
              }
              .order-id {
                font-family: 'Playfair Display', serif;
                font-size: 18px;
                font-weight: 600;
                color: #1a3526;
                margin-bottom: 15px;
              }
              .refund-info {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
                border-left: 4px solid #f39c12;
              }
              .refund-title {
                font-weight: 600;
                color: #f39c12;
                margin-bottom: 10px;
              }
              .timeline {
                background: white;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #c0392b;
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
                background: #c0392b;
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
              .apology {
                font-style: italic;
                color: #666;
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #c0392b;
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
                <div class="cancel-icon">â</div>
                
                <h1 class="title">Article indisponible â Remboursement en cours</h1>
                
                <div class="message">
                  Chère/Cher <strong>${order.client_nom}</strong>,<br><br>
                  
                  Nous sommes sincèrement désolés, mais l'article que vous avez commandé est actuellement indisponible. 
                  Nous avons donc procédé à l'annulation de votre commande et à l'initiation de votre remboursement.
                </div>
                
                <div class="apology">
                  <strong>Nos plus sincères excuses pour ce désagrément.</strong><br>
                  Nous faisons tout notre possible pour éviter ce genre de situation et nous vous remercions 
                  de votre compréhension.
                </div>
                
                <div class="order-info">
                  <div class="order-id">Commande n° ${order.id}</div>
                  <p><strong>Date de commande:</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Email:</strong> ${order.client_email}</p>
                  <p><strong>Montant remboursé:</strong> ${order.total.toFixed(2)} â?¬</p>
                </div>
                
                <div class="refund-info">
                  <div class="refund-title">Informations sur le remboursement</div>
                  <p><strong>Statut:</strong> ${refundStatus}</p>
                  <p><strong>Délai de remboursement:</strong> 5-10 jours ouvrés</p>
                  <p><strong>Mode de remboursement:</strong> Sur votre moyen de paiement d'origine</p>
                  ${refundError ? `<p style="color: #c0392b;"><strong>Note:</strong> ${refundError}</p>` : ''}
                </div>
                
                <div class="timeline">
                  <div class="timeline-title">Processus de remboursement</div>
                  <div class="timeline-item">
                    <div class="timeline-icon">1</div>
                    <span>Annulation de la commande (immédiat)</span>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon">2</div>
                    <span>Demande de remboursement Stripe (immédiat)</span>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon">3</div>
                    <span>Traitement par votre banque (2-5 jours)</span>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon">4</div>
                    <span>Crédit sur votre compte (5-10 jours)</span>
                  </div>
                </div>
                
                <div style="text-align: center; margin: 40px 0; padding: 25px; background: white; border-radius: 8px; border: 2px solid #c0392b;">
                  <p style="margin-bottom: 15px; color: #666;">Pour toute question sur votre remboursement</p>
                  <p style="font-family: 'Playfair Display', serif; color: #1a3526; font-weight: 600;">
                    contact@jayscreationsdesign.fr
                  </p>
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
        subject: 'â Article indisponible â Remboursement en cours',
        html: emailHtml,
        from: 'commande@jayscreationsdesign.fr'
      });

      console.log('Email d\'annulation envoyé à:', order.client_email);
    } catch (emailError) {
      console.error('Erreur envoi email annulation:', emailError);
    }

    // Retourner une page HTML simple
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Commande Annulée</title>
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
              background: #c0392b;
              color: white;
              padding: 40px;
              text-align: center;
            }
            .cancel-icon {
              width: 80px;
              height: 80px;
              background: #FAF7F2;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 40px;
              color: #c0392b;
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
              border-left: 4px solid #c0392b;
              text-align: left;
            }
            .refund-status {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              border-left: 4px solid #f39c12;
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
              <div class="cancel-icon">â</div>
              <div class="title">Commande Annulée</div>
              <p>Remboursement initié</p>
            </div>
            <div class="content">
              <p class="message">
                La commande <strong>${order.id}</strong> a été annulée.<br>
                Un email a été envoyé à <strong>${order.client_email}</strong>.
              </p>
              <div class="order-info">
                <p><strong>Client:</strong> ${order.client_nom}</p>
                <p><strong>Montant:</strong> ${order.total.toFixed(2)} â?¬</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              </div>
              <div class="refund-status">
                <p><strong>Statut remboursement:</strong> ${refundStatus}</p>
                <p><strong>Délai:</strong> 5-10 jours ouvrés</p>
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
    console.error('Erreur annulation commande:', error);
    return new NextResponse('Erreur serveur', { status: 500 });
  }
}
