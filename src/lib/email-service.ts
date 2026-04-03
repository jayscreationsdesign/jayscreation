import { supabaseAdmin } from './supabase-client';
import emailConfig from './email-config';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, from = emailConfig.addresses.from, replyTo = emailConfig.addresses.replyTo }: EmailData) {
  try {
    // Utiliser le service SMTP de Supabase
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      '00000000-0000-0000-0000-000000000000', // ID système pour l'envoi
      {
        email: to,
        user_metadata: {
          email_subject: subject,
          email_html: html,
          email_from: from,
          email_reply_to: replyTo
        }
      }
    );

    if (error) {
      console.error('Erreur envoi email:', error);
      throw error;
    }

    // Alternative : utiliser Edge Function si la méthode ci-dessus ne fonctionne pas
    const { data: edgeData, error: edgeError } = await supabaseAdmin.functions.invoke('send-email', {
      body: { to, subject, html, from, replyTo }
    });

    if (edgeError) {
      console.error('Erreur Edge Function:', edgeError);
      throw edgeError;
    }

    console.log('✅ Email envoyé à:', to);
    return { success: true, data: edgeData };

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    throw error;
  }
}

// Templates d'emails
export const emailTemplates = {
  welcomeCustomer: (email: string, name: string) => ({
    to: email,
    subject: 'Bienvenue chez Jay\'s Creations Design !',
    from: emailConfig.addresses.welcome,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue chez Jay's Creations Design</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin: 0;">Jay's Creations Design</h1>
            <p style="color: #666; margin: 5px 0;">Pour Sublimer Vos Événements</p>
          </div>
          
          <h2 style="color: #8B4513;">Bonjour ${name},</h2>
          
          <p style="color: #333; line-height: 1.6;">
            Merci beaucoup pour votre inscription sur Jay's Creations Design ! Nous sommes ravis de vous accueillir dans notre boutique de papeterie événementielle.
          </p>
          
          <p style="color: #333; line-height: 1.6;">
            Découvrez nos créations uniques : faire-part, invitations, menus personnalisés et bien plus encore pour rendre votre événement inoubliable.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.jayscreationsdesign.fr/boutique" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Découvrir nos créations
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              Envoyé depuis Jay's Creations Design<br>
              <a href="https://www.jayscreationsdesign.fr" style="color: #8B4513;">www.jayscreationsdesign.fr</a><br>
              Contact : contact@jayscreationsdesign.fr
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  newOrderAdmin: (order: any) => ({
    to: 'commande@jayscreationsdesign.fr',
    subject: `🔔 NOUVELLE COMMANDE #${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle commande</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin: 0;">Jay's Creations Design</h1>
            <p style="color: #666; margin: 5px 0;">Nouvelle commande reçue</p>
          </div>
          
          <h2 style="color: #d32f2f;">🔔 NOUVELLE COMMANDE #${order.id}</h2>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Client :</strong> ${order.customer_name || 'Nouveau client'}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> ${order.customer_email}</p>
            <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${order.customer_phone || 'Non renseigné'}</p>
            <p style="margin: 5px 0;"><strong>Date :</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Total :</strong> <span style="color: #2e7d32; font-size: 18px;">${order.total}€</span></p>
            <p style="margin: 5px 0;"><strong>Articles :</strong> ${order.items?.length || 0} article(s)</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.jayscreationsdesign.fr/admin/commandes" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Voir la commande
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 12px;">
              Cet email a été généré automatiquement par Jay's Creations Design
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  orderConfirmation: (order: any) => ({
    to: order.customer_email,
    subject: `Confirmation de votre commande #${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de commande</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin: 0;">Jay's Creations Design</h1>
            <p style="color: #666; margin: 5px 0;">Confirmation de commande</p>
          </div>
          
          <h2 style="color: #8B4513;">Merci pour votre commande !</h2>
          
          <p style="color: #333; line-height: 1.6;">
            Votre commande <strong>#${order.id}</strong> a été confirmée et est maintenant en préparation.
          </p>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Récapitulatif de la commande</h3>
            <p style="margin: 5px 0;"><strong>Numéro :</strong> #${order.id}</p>
            <p style="margin: 5px 0;"><strong>Date :</strong> ${new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
            <p style="margin: 5px 0;"><strong>Total :</strong> <span style="color: #8B4513; font-size: 18px;">${order.total}€</span></p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.jayscreationsdesign.fr/mon-compte" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Suivre ma commande
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              Jay's Creations Design<br>
              <a href="https://www.jayscreationsdesign.fr" style="color: #8B4513;">www.jayscreationsdesign.fr</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  quoteRequest: (quote: any) => ({
    to: 'contact@jayscreationsdesign.fr',
    subject: `📋 NOUVELLE DEMANDE DE DEVIS - ${quote.product}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle demande de devis</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin: 0;">Jay's Creations Design</h1>
            <p style="color: #666; margin: 5px 0;">Nouvelle demande de devis</p>
          </div>
          
          <h2 style="color: #8B4513;">📋 NOUVELLE DEMANDE DE DEVIS</h2>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Informations client</h3>
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${quote.name}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> ${quote.email}</p>
            <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${quote.phone || 'Non renseigné'}</p>
            <p style="margin: 5px 0;"><strong>Date :</strong> ${new Date(quote.created_at).toLocaleDateString('fr-FR')}</p>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Détails de la demande</h3>
            <p style="margin: 5px 0;"><strong>Produit intéressé :</strong> ${quote.product}</p>
            <p style="margin: 5px 0;"><strong>Quantité :</strong> ${quote.quantity || 'Non spécifiée'}</p>
            <p style="margin: 5px 0;"><strong>Budget :</strong> ${quote.budget || 'Non spécifié'}</p>
            <p style="margin: 5px 0;"><strong>Date événement :</strong> ${quote.event_date || 'Non spécifiée'}</p>
          </div>
          
          <div style="background-color: #fff3e0; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #f57c00; margin-top: 0;">Message du client</h3>
            <p style="margin: 0; font-style: italic;">"${quote.message}"</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${quote.email}" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; margin: 5px;">
              Répondre au client
            </a>
            <a href="https://www.jayscreationsdesign.fr/admin/devis" 
               style="background-color: #666; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; margin: 5px;">
              Voir tous les devis
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  lowStockAlert: (product: any) => ({
    to: 'commande@jayscreationsdesign.fr',
    subject: `⚠️ ALERTE - Stock faible pour ${product.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alerte de stock</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin: 0;">Jay's Creations Design</h1>
            <p style="color: #d32f2f; margin: 5px 0;">⚠️ Alerte de stock faible</p>
          </div>
          
          <h2 style="color: #d32f2f;">Stock critique détecté</h2>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Informations produit</h3>
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${product.name}</p>
            <p style="margin: 5px 0;"><strong>Référence :</strong> ${product.sku || product.id}</p>
            <p style="margin: 5px 0;"><strong>Stock actuel :</strong> <span style="color: #d32f2f; font-size: 18px; font-weight: bold;">${product.stock}</span></p>
            <p style="margin: 5px 0;"><strong>Seuil d'alerte :</strong> ${product.alert_threshold || 5}</p>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Actions recommandées</h3>
            <ul style="color: #333;">
              <li>Réapprovisionner le stock dès que possible</li>
              <li>Mettre le produit en "rupture" si nécessaire</li>
              <li>Informer les clients des délais de livraison</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.jayscreationsdesign.fr/admin/produits/${product.id}" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Gérer le stock
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  abandonedCart: (cart: any) => ({
    to: cart.customer_email,
    subject: 'Vous avez oublié quelque chose... 🛒',
    from: emailConfig.addresses.orders,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Panier abandonné</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin: 0;">Jay's Creations Design</h1>
            <p style="color: #666; margin: 5px 0;">Votre panier vous attend</p>
          </div>
          
          <h2 style="color: #8B4513;">Vous avez oublié quelque chose...</h2>
          
          <p style="color: #333; line-height: 1.6;">
            Nous avons remarqué que vous avez des articles dans votre panier sur Jay's Creations Design. Ne les laissez pas s'échapper !
          </p>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2e7d32; margin-top: 0;">Votre panier contient :</h3>
            <p style="margin: 5px 0;"><strong>Articles :</strong> ${cart.items?.length || 0}</p>
            <p style="margin: 5px 0;"><strong>Total :</strong> <span style="color: #2e7d32; font-size: 18px;">${cart.total}€</span></p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.jayscreationsdesign.fr/panier" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Retourner à mon panier
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; text-align: center; font-style: italic;">
            Cet article est très populaire et pourrait bientôt être en rupture de stock !
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              Envoyé depuis Jay's Creations Design<br>
              <a href="https://www.jayscreationsdesign.fr" style="color: #8B4513;">www.jayscreationsdesign.fr</a><br>
              Contact : contact@jayscreationsdesign.fr
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};
