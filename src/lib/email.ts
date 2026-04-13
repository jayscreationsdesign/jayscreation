import nodemailer from 'nodemailer';

// Configuration des expéditeurs selon le type d'email pour Jay's Creations Design
export const emailSenders = {
  transactional: {
    name: "Jay's Creations Design",
    email: process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr'
  },
  orders: {
    name: "Jay's Creations Design - Commandes",
    email: process.env.COMMANDE_UTILISATEUR_SMTP || 'commande@jayscreationsdesign.fr'
  },
  admin: {
    name: "Admin Jay's Creations",
    email: process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr'
  },
  support: {
    name: "Support Jay's Creations",
    email: 'support@jayscreationsdesign.fr'
  },
  noreply: {
    name: "Jay's Creations Design",
    email: 'noreply@jayscreationsdesign.fr'
  }
};

// Configuration pour Ionos Email Marketing
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ionos.fr',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true pour 465, false pour 587
  auth: {
    user: process.env.IONOS_EMAIL_USER, // votre-email@jayscreationsdesign.fr
    pass: process.env.IONOS_EMAIL_PASS, // votre mot de passe Ionos
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Templates d'emails pour Ionos
export const emailTemplates = {
  welcome: {
    subject: 'Bienvenue chez Jay\'s Creations Design !',
    html: (firstName: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenue chez Jay's Creations Design</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
            .cta { display: inline-block; background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 25px 0; font-weight: bold; transition: all 0.3s; }
            .cta:hover { background: #6b3410; transform: scale(1.05); }
            .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B4513; }
            .discount { background: linear-gradient(135deg, #8B4513, #D4A574); color: white; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎨 Jay's Creations Design</div>
              <p>Votre partenaire pour des créations uniques</p>
            </div>
            
            <div class="content">
              <h1 style="color: #8B4513; margin-bottom: 20px;">Bienvenue ${firstName} ! 👋</h1>
              <p style="font-size: 16px; margin-bottom: 20px;">Nous sommes absolument ravis de vous accueillir dans la famille Jay's Creations Design ! Merci de votre confiance et de votre intérêt pour nos créations artisanales.</p>
              
              <div class="features">
                <h3 style="color: #8B4513; margin-bottom: 15px;">🎁 Ce qui vous attend :</h3>
                <ul style="line-height: 1.8;">
                  <li>🖼️ <strong>Des cadres personnalisés</strong> uniques comme vous</li>
                  <li>🎨 <strong>Des thèmes originaux</strong> pour chaque occasion</li>
                  <li>✨ <strong>Une qualité artisanale</strong> made in France</li>
                  <li>🚀 <strong>Un service client</strong> à votre écoute</li>
                </ul>
              </div>
              
              <div class="discount">
                🎉 CODE DE BIENVENUE 🎉<br>
                <span style="font-size: 24px;">BIENVENUE10</span><br>
                <small>10% de réduction sur votre première commande</small>
              </div>
              
              <p style="text-align: center; margin: 25px 0;">
                <a href="https://jayscreation.vercel.app/boutique" class="cta">
                  🛍️ Découvrir la boutique
                </a>
              </p>
              
              <p style="text-align: center; font-style: italic; color: #6B6B6B;">
                "L'art de capturer vos plus beaux moments"
              </p>
            </div>
            
            <div class="footer">
              <p><strong>Jay's Creations Design</strong></p>
              <p>Créations uniques pour moments précieux</p>
              <p style="margin-top: 10px; font-size: 11px;">Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
            </div>
          </div>
        </body>
      </html>
    `
  },

  orderConfirmation: {
    subject: '📦 Confirmation de commande - Jay\'s Creations Design',
    html: (orderData: any) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de commande</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
            .order-summary { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
            .item { border-bottom: 1px solid #E8E4DF; padding: 15px 0; }
            .item:last-child { border-bottom: none; }
            .total { font-size: 20px; font-weight: bold; color: #8B4513; text-align: right; margin-top: 20px; padding-top: 15px; border-top: 2px solid #8B4513; }
            .discount { color: #28a745; font-size: 14px; }
            .address { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B4513; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎨 Jay's Creations Design</div>
              <p>Votre partenaire pour des créations uniques</p>
            </div>
            
            <div class="content">
              <h1 style="color: #8B4513; text-align: center; margin-bottom: 25px;">✅ Commande Confirmée !</h1>
              <p style="text-align: center; font-size: 18px; margin-bottom: 30px;">
                Merci <strong>${orderData.client.prenom} ${orderData.client.nom}</strong> !<br>
                Votre commande n°${orderData.orderId || 'CMD-' + Date.now()} est confirmée
              </p>
              
              <div class="order-summary">
                <h3 style="color: #8B4513; margin-bottom: 20px;">📋 Récapitulatif de votre commande</h3>
                ${orderData.items.map((item: any, index: number) => `
                  <div class="item">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong style="color: #8B4513; font-size: 16px;">${item.nom}</strong><br>
                        ${item.theme ? `<small style="color: #6B6B6B;">Thème: ${item.theme}</small><br>` : ''}
                        <small style="color: #6B6B6B;">Quantité: ${item.quantite}</small>
                      </div>
                      <div style="text-align: right;">
                        <strong style="color: #8B4513; font-size: 18px;">${(item.prix * item.quantite).toFixed(2)}€</strong>
                      </div>
                    </div>
                  </div>
                `).join('')}
                
                <div class="total">
                  Total: ${orderData.total.toFixed(2)}€
                  ${orderData.discount > 0 ? `<br><span class="discount">Remise coupon: -${orderData.discount.toFixed(2)}€</span>` : ''}
                </div>
              </div>
              
              <div class="address">
                <h4 style="color: #8B4513; margin-bottom: 15px;">📍 Adresse de livraison</h4>
                <p style="line-height: 1.8;">
                  <strong>${orderData.client.prenom} ${orderData.client.nom}</strong><br>
                  ${orderData.client.adresse}<br>
                  ${orderData.client.codePostal} ${orderData.client.ville}<br>
                  ${orderData.client.pays}
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px;">
                <p style="margin-bottom: 15px;">📧 Vous recevrez des mises à jour par email</p>
                <p style="color: #8B4513; font-weight: bold;">Merci pour votre confiance !</p>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Jay's Creations Design</strong></p>
              <p>Créations uniques pour moments précieux</p>
            </div>
          </div>
        </body>
      </html>
    `
  },

  quoteRequest: {
    subject: '📋 Nouvelle demande de devis - Jay\'s Creations Design',
    html: (quoteData: any) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle demande de devis</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
            .urgent { background: #dc3545; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .quote-details { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .info-item { background: #f8f9fa; padding: 15px; border-radius: 5px; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎨 Jay's Creations Design</div>
              <p>Nouvelle demande de devis reçue</p>
            </div>
            
            <div class="content">
              <div class="urgent">
                ⚠️ NOUVELLE DEMANDE DE DEVIS À TRAITER
              </div>
              
              <h1 style="color: #8B4513; text-align: center; margin-bottom: 25px;">📋 Détails de la demande</h1>
              
              <div class="quote-details">
                <div class="info-grid">
                  <div class="info-item">
                    <strong>👤 Client:</strong><br>
                    ${quoteData.prenom} ${quoteData.nom}
                  </div>
                  <div class="info-item">
                    <strong>📧 Email:</strong><br>
                    ${quoteData.email}
                  </div>
                  <div class="info-item">
                    <strong>📱 Téléphone:</strong><br>
                    ${quoteData.telephone}
                  </div>
                  <div class="info-item">
                    <strong>📅 Date:</strong><br>
                    ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <div style="margin: 25px 0;">
                  <h4 style="color: #8B4513; margin-bottom: 15px;">🎨 Détails de la demande</h4>
                  <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B4513;">
                    <p><strong>Type de produit:</strong> ${quoteData.typeProduit}</p>
                    <p><strong>Dimensions souhaitées:</strong> ${quoteData.dimensions}</p>
                    <p><strong>Thème:</strong> ${quoteData.theme}</p>
                    <p><strong>Budget approximatif:</strong> ${quoteData.budget}</p>
                    <p><strong>Délai souhaité:</strong> ${quoteData.delai}</p>
                  </div>
                </div>
                
                ${quoteData.message ? `
                  <div style="margin: 25px 0;">
                    <h4 style="color: #8B4513; margin-bottom: 15px;">💬 Message personnalisé</h4>
                    <div style="background: white; padding: 20px; border-radius: 8px; font-style: italic;">
                      ${quoteData.message}
                    </div>
                  </div>
                ` : ''}
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p><strong>Action recommandée:</strong></p>
                <p>Contacter le client dans les plus brefs délais pour discuter de sa demande</p>
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
  }
};

// Fonction d'envoi d'email avec Ionos
export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr'
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Jay's Creations Design" <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    console.log('Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
  }
}

// Fonctions spécifiques pour chaque type d'email
export async function sendWelcomeEmail(email: string, firstName: string) {
  // 1. Envoyer l'email de bienvenue au client
  const clientResult = await sendEmail({
    to: email,
    subject: emailTemplates.welcome.subject,
    html: emailTemplates.welcome.html(firstName)
  });

  // 2. Envoyer une notification admin pour la création de compte
  const adminEmail = process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr';
  const adminResult = await sendEmail({
    to: adminEmail,
    subject: '👕 Nouveau compte créé - Jay\'s Creations Design',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouveau compte créé</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
            .alert { background: #28a745; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .info-box { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎨 Jay's Creations Design</div>
              <p>Nouveau compte client créé</p>
            </div>
            
            <div class="content">
              <div class="alert">
                ✅ NOUVEAU COMPTE CLIENT CRÉÉ
              </div>
              
              <h1 style="color: #8B4513; text-align: center; margin-bottom: 25px;">👋 Informations du nouveau client</h1>
              
              <div class="info-box">
                <p><strong>👤 Prénom:</strong> ${firstName}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>📅 Date d'inscription:</strong> ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>⏰ Heure:</strong> ${new Date().toLocaleTimeString('fr-FR')}</p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p><strong>Actions recommandées:</strong></p>
                <p>✨ Envoyer un email de bienvenue personnalisé</p>
                <p>🎁 Proposer une offre de bienvenue</p>
                <p>📞 Contacter le client si nécessaire</p>
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

  return { 
    success: clientResult.success && adminResult.success, 
    clientEmail: clientResult,
    adminNotification: adminResult 
  };
}

export async function sendOrderConfirmationEmail(email: string, orderData: any) {
  // 1. Envoyer l'email de confirmation à commande@jayscreationsdesign.fr (au lieu du client)
  const clientResult = await sendEmail({
    to: emailSenders.orders.email, // commande@jayscreationsdesign.fr
    subject: emailTemplates.orderConfirmation.subject,
    html: emailTemplates.orderConfirmation.html(orderData),
    from: emailSenders.orders.email // Utilise commande@jayscreationsdesign.fr
  });

  // 2. Envoyer une copie à commande@jayscreationsdesign.fr pour suivi (doublon volontaire)
  const copyResult = await sendEmail({
    to: emailSenders.orders.email, // commande@jayscreationsdesign.fr
    subject: `📋 COPIE - ${emailTemplates.orderConfirmation.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Copie confirmation commande</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
            .copy-notice { background: #17a2b8; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .info-box { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛒 Jay's Creations Design</div>
              <p>Copie Confirmation Commande</p>
            </div>
            
            <div class="content">
              <div class="copy-notice">
                📋 COPIE DE CONFIRMATION DE COMMANDE
              </div>
              
              <h1 style="color: #8B4513; text-align: center; margin-bottom: 25px;">📦 Détails de la commande</h1>
              
              <div class="info-box">
                <p><strong>👤 Client:</strong> ${orderData.client.prenom} ${orderData.client.nom}</p>
                <p><strong>📧 Email du client:</strong> ${email}</p>
                <p><strong>📱 Téléphone:</strong> ${orderData.client.telephone || 'Non renseigné'}</p>
                <p><strong>📅 Date:</strong> ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>⏰ Heure:</strong> ${new Date().toLocaleTimeString('fr-FR')}</p>
                <p><strong>💰 Total:</strong> ${orderData.total.toFixed(2)}€</p>
              </div>
              
              <div style="margin: 25px 0;">
                <h4 style="color: #8B4513; margin-bottom: 15px;">📋 Articles commandés</h4>
                ${orderData.items.map((item: any, index: number) => `
                  <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #8B4513;">
                    <strong>${item.nom}</strong><br>
                    ${item.theme ? `<small>Thème: ${item.theme}</small><br>` : ''}
                    <small>Quantité: ${item.quantite} × ${item.prix.toFixed(2)}€ = ${(item.prix * item.quantite).toFixed(2)}€</small>
                  </div>
                `).join('')}
              </div>
              
              <div style="margin: 25px 0;">
                <h4 style="color: #8B4513; margin-bottom: 15px;">📍 Adresse de livraison</h4>
                <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B4513;">
                  <p><strong>${orderData.client.prenom} ${orderData.client.nom}</strong></p>
                  <p>${orderData.client.adresse}</p>
                  <p>${orderData.client.codePostal} ${orderData.client.ville}</p>
                  <p>${orderData.client.pays}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p><strong>Actions recommandées:</strong></p>
                <p>📦 Préparer la commande</p>
                <p>📞 Contacter le client si nécessaire</p>
                <p>🚀 Organiser la livraison</p>
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

  // 3. Envoyer une notification à commande@jayscreationsdesign.fr pour validation
  const adminResult = await sendEmail({
    to: emailSenders.orders.email, // commande@jayscreationsdesign.fr
    subject: '🛒 NOUVELLE COMMANDE À VALIDER - Jay\'s Creations Design',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle commande à valider</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #dc3545; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #dc3545; border-top: none; }
            .urgent { background: #dc3545; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .info-box { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🛒 Jay's Creations Design</div>
              <p>NOUVELLE COMMANDE</p>
            </div>
            
            <div class="content">
              <div class="urgent">
                🚨 NOUVELLE COMMANDE À VALIDER
              </div>
              
              <h1 style="color: #dc3545; text-align: center; margin-bottom: 25px;">📦 Détails de la commande</h1>
              
              <div class="info-box">
                <p><strong>👤 Client:</strong> ${orderData.client.prenom} ${orderData.client.nom}</p>
                <p><strong>📧 Email du client:</strong> ${email}</p>
                <p><strong>📱 Téléphone:</strong> ${orderData.client.telephone || 'Non renseigné'}</p>
                <p><strong>📅 Date de commande:</strong> ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>⏰ Heure:</strong> ${new Date().toLocaleTimeString('fr-FR')}</p>
                <p><strong>💰 Montant total:</strong> <span style="color: #dc3545; font-size: 18px;">${orderData.total.toFixed(2)}€</span></p>
              </div>
              
              <div style="margin: 25px 0;">
                <h4 style="color: #8B4513; margin-bottom: 15px;">📋 Résumé des articles</h4>
                ${orderData.items.map((item: any, index: number) => `
                  <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #dc3545;">
                    <strong>${item.nom}</strong><br>
                    ${item.theme ? `<small>Thème: ${item.theme}</small><br>` : ''}
                    <small>Quantité: ${item.quantite} × ${item.prix.toFixed(2)}€ = ${(item.prix * item.quantite).toFixed(2)}€</small>
                  </div>
                `).join('')}
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p><strong>⚠️ ACTIONS REQUISES:</strong></p>
                <p>✅ Vérifier la disponibilité des articles</p>
                <p>✅ Contacter le client pour confirmation</p>
                <p>✅ Préparer la commande</p>
                <p>✅ Organiser la livraison</p>
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

  return { 
    success: clientResult.success && copyResult.success && adminResult.success, 
    clientEmail: clientResult,
    adminCopy: copyResult,
    validationNotification: adminResult
  };
}

export async function sendQuoteRequestEmail(quoteData: any) {
  // Envoyer à l'administrateur du site
  const adminEmail = process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr';  
  return await sendEmail({
    to: adminEmail,
    subject: emailTemplates.quoteRequest.subject,
    html: emailTemplates.quoteRequest.html(quoteData)
  });
}
