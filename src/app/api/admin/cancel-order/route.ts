import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendRefundEmail } from '@/lib/email';
import Stripe from 'stripe';

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
        statut: 'cancelled',
        token_used: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Erreur mise à jour commande:', updateError);
      return new NextResponse('Erreur lors de l\'annulation', { status: 500 });
    }

    // Rembourser via Stripe si payment_intent_id existe
    try {
      if (order.payment_intent_id && process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const refund = await stripe.refunds.create({
          payment_intent: order.payment_intent_id,
        });

        console.log('Remboursement Stripe créé:', refund.id);
      }
    } catch (stripeError) {
      console.error('Erreur remboursement Stripe:', stripeError);
    }

    // Envoyer l'email de remboursement au client
    try {
      await sendRefundEmail({
        number: order.id,
        customerEmail: order.client_email,
        customerName: order.client_nom,
        total: order.total,
        refundAmount: order.total,
        createdAt: order.created_at
      });
      console.log('Email remboursement envoyé à:', order.client_email);
    } catch (emailError) {
      console.error('Erreur envoi email remboursement:', emailError);
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
              background: #FFF8F0; 
              margin: 0; 
              padding: 40px 20px; 
              color: #2C1A0E;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(44,26,14,0.1);
              overflow: hidden;
            }
            .header {
              background: #DC2626;
              color: white;
              padding: 40px;
              text-align: center;
            }
            .cancel-icon {
              width: 80px;
              height: 80px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              font-size: 40px;
              color: #DC2626;
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
              background: #FFF8F0;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #DC2626;
              text-align: left;
            }
            .refund-info {
              background: #FEF2F2;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #DC2626;
              text-align: left;
            }
            .footer {
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #E8E4DF;
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
                Un remboursement a été initié pour <strong>${order.client_email}</strong>.
              </p>
              <div class="order-info">
                <p><strong>Client:</strong> ${order.client_nom}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}â¬</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              </div>
              <div class="refund-info">
                <p><strong>Montant remboursé:</strong> ${order.total.toFixed(2)}â¬</p>
                <p><strong>Délai:</strong> 5-10 jours ouvrés</p>
                <p><strong>Méthode:</strong> Stripe (carte bancaire)</p>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">
                Email d'annulation envoyé au client.
              </p>
            </div>
            <div class="footer">
              <p>Jay's Creations Design - Système d'annulation</p>
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
