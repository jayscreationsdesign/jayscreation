import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { sendEmail, emailTemplates } from '../../../../lib/email';
import { sendOrderConfirmationEmail, sendNewOrderAdminEmail } from '../../../../lib/email-server';
import * as nodemailer from 'nodemailer';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY non configuré - API webhooks/stripe sera non fonctionnelle');
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2026-03-25.dahlia',
}) : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Service Stripe non configuré' }, { status: 503 });
    }

    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Signature Stripe manquante' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
    } catch (err) {
      console.error('Erreur webhook Stripe:', err);
      return NextResponse.json({ error: 'Signature webhook invalide' }, { status: 400 });
    }

    console.log('Événement Stripe reçu:', event.type);

    // Gérer les événements de paiement complété
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Session complétée:', session.id);
      console.log('Client email:', session.customer_details?.email);
      console.log('Montant:', session.amount_total);

      try {
        // Récupérer les détails de la session avec les line_items
        const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items']
        });

        const items = sessionWithItems.line_items?.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.amount_total / 100
        })) || [];

        // Vérifier si la commande contient des produits numériques
        const articlesJson = session.metadata?.articles_json || '[]';
        const articles = JSON.parse(articlesJson);
        const hasDigitalProducts = articles.some((item: any) => item.estNumerique === true);

        console.log('🔍 Produits numériques détectés:', hasDigitalProducts);

        const orderData: any = {
          id: session.id,
          customer_name: session.customer_details?.name || 'Client',
          customer_email: session.customer_details?.email || '',
          customer_phone: session.metadata?.client_telephone || '',
          total: session.amount_total ? session.amount_total / 100 : 0,
          items: items,
          created_at: new Date(session.created * 1000).toISOString(),
          metadata: session.metadata
        };

        console.log('Données commande préparées:', orderData);

        // Si commande numérique, envoyer les emails spécifiques
        if (hasDigitalProducts) {
          console.log('🎯 Envoi des emails pour commande numérique');
          await sendDigitalOrderEmails(session.metadata, articles);
        }

        // 1. Email de confirmation au client
        try {
          await sendEmail({
            to: orderData.customer_email,
            subject: `Confirmation de votre commande ${orderData.id}`,
            html: `<h1>Merci pour votre commande!</h1><p>Votre commande ${orderData.id} a été confirmée.</p><p>Total: ${orderData.total} DH</p>`
          });
          console.log('Email confirmation client envoyé à:', orderData.customer_email);
        } catch (emailError) {
          console.error('Erreur envoi email client:', emailError);
        }

        // 2. Email notification admin
        try {
          const adminEmail = process.env.ADMIN_EMAIL || 'contact@jayscreationsdesign.fr';
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreationsdesign.fr';
          
          await sendEmail({
            to: adminEmail,
            subject: 'Nouvelle commande - Jay\'s Creations Design',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
                    .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
                    .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
                    .order-details { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
                    .item { border-bottom: 1px solid #E8E4DF; padding: 15px 0; }
                    .item:last-child { border-bottom: none; }
                    .total { font-size: 20px; font-weight: bold; color: #8B4513; text-align: right; margin-top: 20px; padding-top: 15px; border-top: 2px solid #8B4513; }
                    .actions { text-align: center; margin: 30px 0; }
                    .btn { display: inline-block; padding: 14px 28px; margin: 0 8px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; transition: all 0.3s; }
                    .btn-validate { background: #1a3526; color: white; }
                    .btn-validate:hover { background: #2d4a3d; transform: translateY(-2px); }
                    .btn-cancel { background: #c0392b; color: white; }
                    .btn-cancel:hover { background: #e74c3c; transform: translateY(-2px); }
                    .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <div class="logo">Jay's Creations Design</div>
                      <p>Nouvelle commande à valider</p>
                    </div>
                    
                    <div class="content">
                      <h2 style="color: #8B4513; text-align: center; margin-bottom: 25px;">Nouvelle commande reçue</h2>
                      
                      <div class="order-details">
                        <h3 style="color: #8B4513; margin-bottom: 20px;">Informations commande</h3>
                        <p><strong>Commande n°:</strong> ${orderData.id}</p>
                        <p><strong>Client:</strong> ${orderData.customer_name}</p>
                        <p><strong>Email:</strong> ${orderData.customer_email}</p>
                        <p><strong>Téléphone:</strong> ${orderData.customer_phone}</p>
                        <p><strong>Date:</strong> ${new Date(orderData.created_at).toLocaleDateString('fr-FR')}</p>
                        <p><strong>Total:</strong> ${orderData.total.toFixed(2)} EUR</p>
                      </div>
                      
                      <div class="order-details">
                        <h3 style="color: #8B4513; margin-bottom: 20px;">Articles commandés</h3>
                        ${orderData.items.map((item: any) => `
                          <div class="item">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                              <div>
                                <strong style="color: #8B4513;">${item.name}</strong><br>
                                <small style="color: #6B6B6B;">Quantité: ${item.quantity}</small>
                              </div>
                              <div style="text-align: right;">
                                <strong style="color: #8B4513;">${item.price.toFixed(2)} EUR</strong>
                              </div>
                            </div>
                          </div>
                        `).join('')}
                        
                        <div class="total">
                          Total: ${orderData.total.toFixed(2)} EUR
                        </div>
                      </div>
                      
                      <div class="actions">
                        <h3 style="color: #8B4513; margin-bottom: 20px;">Actions requises</h3>
                        <div style="text-align: center; margin: 30px 0; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                          <a href="${siteUrl}/api/admin/validate-order?token=${orderData.adminToken}"
                             class="btn btn-validate">
                            â VALIDER LA COMMANDE
                          </a>
                          <a href="${siteUrl}/api/admin/cancel-order?token=${orderData.adminToken}"
                             class="btn btn-cancel">
                            â ARTICLE INDISPONIBLE
                          </a>
                        </div>
                        <p style="text-align: center; color: #666; font-size: 14px; margin-top: 20px;">
                          Cliquez sur VALIDER pour confirmer la commande et envoyer un email au client.<br>
                          Cliquez sur ARTICLE INDISPONIBLE pour annuler et rembourser.
                        </p>
                      </div>
                    </div>
                    
                    <div class="footer">
                      <p><strong>Jay's Creations Design</strong></p>
                      <p>Email automatique - ${new Date().toLocaleString('fr-FR')}</p>
                    </div>
                  </div>
                </body>
              </html>
            `
          });
          console.log('Email notification admin envoyé avec boutons de validation');
        } catch (adminEmailError) {
          console.error('Erreur envoi email admin:', adminEmailError);
        }

        // 3. Mettre à jour le statut dans Supabase si disponible
        try {
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );

          // Générer un token unique pour la validation admin
          const adminToken = crypto.randomUUID();

          // Mettre à jour la commande avec le token et le payment_intent_id
          const { data: orderUpdate, error: updateError } = await supabase
            .from('commandes')
            .update({ 
              statut: 'pending',
              admin_token: adminToken,
              payment_intent_id: session.payment_intent as string,
              updated_at: new Date().toISOString()
            })
            .eq('stripe_session_id', session.id)
            .select()
            .single();

          if (updateError) {
            console.error('Erreur mise à jour commande:', updateError);
          } else {
            console.log('Commande mise à jour avec token de validation:', adminToken);
            
            // Ajouter le token aux données pour l'email admin
            orderData.adminToken = adminToken;
          }
        } catch (dbError) {
          console.error('Erreur mise à jour Supabase:', dbError);
        }

      } catch (processingError) {
        console.error('Erreur traitement session complétée:', processingError);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Erreur webhook Stripe:', error);
    return NextResponse.json(
      { error: 'Erreur traitement webhook' },
      { status: 500 }
    );
  }
}

// Fonction pour envoyer les emails spécifiques aux commandes numériques
async function sendDigitalOrderEmails(metadata: any, articles: any[]) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.fr', 
    port: 587, 
    secure: false,
    auth: { 
      user: 'commande@jayscreationsdesign.fr',
      pass: 'Kenays971238.' 
    }
  })

  // Email au client
  const clientEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Votre fichier personnalisé Jay's Creations</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #FAF7F2; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-width: 150px; }
        .title { color: #6B3A2A; font-size: 24px; margin-bottom: 20px; }
        .content { color: #2C2C2C; line-height: 1.6; }
        .order-details { background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6B6B6B; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://jayscreationsdesign.fr/images/logo/logo.png" alt="Jay's Creations Design" class="logo">
        </div>
        
        <h1 class="title">Merci pour votre commande !</h1>
        
        <div class="content">
          <p>Jay's Creations prépare votre fichier personnalisé sous 72h.</p>
          <p>Vous recevrez un nouvel email avec votre lien de téléchargement dès que votre fichier sera prêt.</p>
          
          <div class="order-details">
            <h3 style="color: #6B3A2A; margin-top: 0;">Détails de votre commande :</h3>
            <p><strong>Client :</strong> ${metadata.client_nom}</p>
            <p><strong>Email :</strong> ${metadata.client_email}</p>
            <p><strong>Personnalisation :</strong> ${metadata.personnalisation || 'Standard'}</p>
            
            <h4 style="color: #6B3A2A; margin-top: 15px;">Articles commandés :</h4>
            ${articles.map((item: any) => `
              <p>• ${item.productName || item.nom} ${item.theme ? `(Thème: ${item.theme})` : ''}</p>
            `).join('')}
          </div>
          
          <p style="text-align: center; margin-top: 30px;">
            <strong>À très bientôt pour votre fichier personnalisé !</strong><br>
            L'équipe Jay's Creations
          </p>
        </div>
        
        <div class="footer">
          <p>Jay's Creations Design - Créations personnalisées pour vos événements</p>
          <p>contact@jayscreationsdesign.fr</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Email d'alerte à Anais
  const alertEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle commande numérique à traiter</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #FAF7F2; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .alert { background-color: #FFE4E8; border-left: 4px solid #993556; padding: 15px; margin: 20px 0; }
        .order-details { background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="alert">
          <h2 style="color: #993556; margin-top: 0;">🚨 NOUVELLE COMMANDE NUMÉRIQUE</h2>
        </div>
        
        <h3 style="color: #6B3A2A;">Détails du client :</h3>
        <p><strong>Nom :</strong> ${metadata.client_nom}</p>
        <p><strong>Email :</strong> ${metadata.client_email}</p>
        <p><strong>Téléphone :</strong> ${metadata.client_telephone}</p>
        <p><strong>Adresse :</strong> ${metadata.adresse_complete}</p>
        <p><strong>Personnalisation :</strong> ${metadata.personnalisation || 'Standard'}</p>
        
        <div class="order-details">
          <h4 style="color: #6B3A2A; margin-top: 0;">Articles à préparer :</h4>
          ${articles.map((item: any) => `
            <p>• ${item.productName || item.nom} ${item.theme ? `(Thème: ${item.theme})` : ''} ${item.estNumerique ? '📁 NUMÉRIQUE' : ''}</p>
          `).join('')}
        </div>
        
        <p style="text-align: center; margin-top: 30px;">
          <strong>Action requise :</strong> Préparer les fichiers et envoyer les liens de téléchargement
        </p>
      </div>
    </body>
    </html>
  `

  try {
    // Envoyer l'email au client
    await transporter.sendMail({
      from: 'commande@jayscreationsdesign.fr',
      to: metadata.client_email,
      subject: 'Votre fichier personnalisé Jay\'s Creations est en préparation',
      html: clientEmailHtml,
    })
    console.log('✅ Email client envoyé pour commande numérique')

    // Envoyer l'alerte à Anais
    await transporter.sendMail({
      from: 'commande@jayscreationsdesign.fr',
      to: 'commande@jayscreationsdesign.fr',
      subject: 'Nouvelle commande numérique à traiter',
      html: alertEmailHtml,
    })
    console.log('✅ Alerte email envoyée à Anais pour commande numérique')
  } catch (error) {
    console.error('❌ Erreur envoi emails commande numérique:', error)
  }
}
