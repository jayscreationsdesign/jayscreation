import nodemailer from 'nodemailer';
import { EMAIL_HEADER, EMAIL_FOOTER, EMAIL_MERCI, emailBande, emailCTA, emailWrap } from './email-template-base';

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
    email: process.env.ADMIN_EMAIL || 'contact@jayscreationsdesign.fr'
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
  host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.fr',
  port: parseInt(process.env.IONOS_SMTP_PORT || '587'),
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
    html: (firstName: string) => emailWrap(
      EMAIL_HEADER +
      emailBande('&#10003;', 'Bienvenue chez Jay\'s Creations Design', `Merci de vous être inscrit ${firstName} !`) +
      `<tr><td style="padding:28px; background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; line-height:1.6; padding-bottom:20px;">
              Merci de votre confiance et de votre intérêt pour nos créations artisanales.
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:0;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Ce qui vous attend :
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family:'Inter',Arial,sans-serif; font-size:14px; color:#2C1A0E; line-height:1.8; padding-left:20px;">
                          • <strong>Des cadres personnalisés</strong> uniques comme vous<br>
                          • <strong>Des thèmes originaux</strong> pour chaque occasion<br>
                          • <strong>Une qualité artisanale</strong> made in France<br>
                          • <strong>Un service client</strong> à votre écoute
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#2C1A0E; border-radius:10px; margin-bottom:0;">
                <tr>
                  <td style="text-align:center; padding:24px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:20px; font-weight:600; color:#FFF8F0; margin-bottom:8px;">
                      CODE DE BIENVENUE
                    </div>
                    <div style="font-family:'Inter',Arial,sans-serif; font-size:28px; font-weight:600; color:#D4A574; margin-bottom:8px;">
                      BIENVENUE10
                    </div>
                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#8B4513;">
                      10% de réduction sur votre première commande
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="text-align:center; padding-top:10px;">
              ${emailCTA('https://jayscreation.vercel.app/boutique', 'Découvrir la boutique')}
            </td>
          </tr>
        </table>
      </td></tr>` +
      EMAIL_MERCI +
      EMAIL_FOOTER
    )
  },

  orderConfirmation: {
    subject: 'Confirmation de commande - Jay\'s Creations Design',
    html: (orderData: any) => emailWrap(
      EMAIL_HEADER +
      emailBande('&#10003;', 'Confirmation de votre commande', `Commande #${orderData.orderNumber || orderData.id || 'CMD-' + Date.now()} - Merci pour votre confiance !`) +
      `<tr><td style="padding:28px; background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Récapitulatif de votre commande
                    </div>
                    ${orderData.items.map((item: any, index: number) => `
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                        <tr>
                          <td style="padding:16px 0; border-bottom:1px solid #E8E4DF;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="width:60%; padding-right:20px; vertical-align:top;">
                                  <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; font-weight:600; color:#2C1A0E; margin-bottom:8px;">
                                    ${item.name || item.nom}
                                  </div>
                                  ${item.theme ? `<div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px;">Thème: ${item.theme}</div>` : ''}
                                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa;">
                                    Quantité: ${item.quantity || item.quantite}
                                  </div>
                                </td>
                                <td style="width:40%; text-align:right; vertical-align:top;">
                                  <div style="font-family:'Inter',Arial,sans-serif; font-size:18px; font-weight:600; color:#8B4513;">
                                    ${item.price ? (item.price * (item.quantity || 1)).toFixed(2) : ((item.prix || 0) * (item.quantite || 1)).toFixed(2)}€
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    `).join('')}
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px; padding-top:16px; border-top:2px solid #8B4513;">
                      <tr>
                        <td style="width:50%;">
                          <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E;">
                            Total
                          </div>
                        </td>
                        <td style="width:50%; text-align:right;">
                          <div style="font-family:'Inter',Arial,sans-serif; font-size:22px; font-weight:700; color:#8B4513;">
                            ${orderData.total.toFixed(2)}€
                            ${orderData.discount > 0 ? `<br><span style="font-size:13px; color:#aaa; font-weight:400;">Remise: -${orderData.discount.toFixed(2)}€</span>` : ''}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${orderData.client ? `
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Adresse de livraison
                    </div>
                    <div style="font-family:'Inter',Arial,sans-serif; font-size:14px; color:#2C1A0E; line-height:1.8;">
                      <strong>${orderData.client.prenom} ${orderData.client.nom}</strong><br>
                      ${orderData.client.adresse}<br>
                      ${orderData.client.codePostal} ${orderData.client.ville}<br>
                      ${orderData.client.pays}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        ` : ''}
        </table>
      </td></tr>` +
      EMAIL_MERCI +
      EMAIL_FOOTER
    )
  },

  quoteRequest: {
    subject: 'Nouvelle demande de devis - Jay\'s Creations Design',
    html: (quoteData: any) => emailWrap(
      EMAIL_HEADER +
      emailBande('&#10003;', 'Nouvelle demande de devis', 'Une demande de devis a été reçue et nécessite votre attention') +
      `<tr><td style="padding:28px; background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Informations client
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td style="width:50%; padding-right:20px; vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Client</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.prenom} ${quoteData.nom}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Email</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.email}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="width:50%; padding-left:20px; vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Téléphone</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.telephone}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Date</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Détails de la demande
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td style="width:50%; padding-right:20px; vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Type de produit</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.typeProduit}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Dimensions souhaitées</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.dimensions}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="width:50%; padding-left:20px; vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Thème</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.theme}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Budget approximatif</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.budget}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px; padding-top:12px; border-top:1px solid #E8E4DF;">
                      <tr>
                        <td>
                          <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Délai souhaité</div>
                          <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${quoteData.delai}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${quoteData.message ? `
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Message personnalisé
                    </div>
                    <div style="font-family:'Inter',Arial,sans-serif; font-size:14px; color:#2C1A0E; line-height:1.6; font-style:italic;">
                      ${quoteData.message}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        ` : ''}
        </table>
      </td></tr>` +
      EMAIL_MERCI +
      EMAIL_FOOTER
    )
  },
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
  const adminEmail = process.env.ADMIN_EMAIL || 'contact@jayscreationsdesign.fr';
  const adminResult = await sendEmail({
    to: adminEmail,
    subject: 'Nouveau compte créé - Jay\'s Creations Design',
    html: emailWrap(
      EMAIL_HEADER +
      emailBande('&#10003;', 'Nouveau compte client créé', 'Un nouveau client s\'est inscrit sur la plateforme') +
      `<tr><td style="padding:28px; background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
                <tr>
                  <td style="padding:20px;">
                    <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px; display:flex; align-items:center;">
                      <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; margin-right:12px; display:inline-block;"></span>
                      Informations du nouveau client
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:50%; padding-right:20px; vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Prénom</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${firstName}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Email</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${email}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="width:50%; padding-left:20px; vertical-align:top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom:12px;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Date d'inscription</div>
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
      
              <!-- ═══ BLOC MERCI ═══ -->
              <tr>
                <td style="padding:0 28px 26px; background:#ffffff;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#2C1A0E; border-radius:12px; 
                                 text-align:center; padding:24px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; 
                                    font-size:17px; font-weight:600; 
                                    color:#FFF8F0; margin-bottom:7px;">
                          Actions recommandées
                        </div>
                        <div style="font-family:'Inter',Arial,sans-serif; 
                                    font-size:13px; color:#8B4513; line-height:1.6;">
                          Envoyer un email de bienvenue personnalisé<br>
                          Proposer une offre de bienvenue<br>
                          Contacter le client si nécessaire
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
      
              <!-- ═══ FOOTER ═══ -->
              <tr>
                <td style="background:#FFF8F0; padding:22px 28px; text-align:center; 
                           border-top:1px solid #E8E4DF;">
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:15px; 
                              font-weight:600; color:#2C1A0E; margin-bottom:5px;">
                    Jay's Creations Design
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; 
                              color:#aaa; margin-bottom:8px;">
                    contact@jayscreationsdesign.fr &nbsp;·&nbsp; 
                    commande@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23
                  </div>
                  <div style="font-size:11px; margin-top:4px;">
                    <a href="https://www.instagram.com/jays_creations_design/" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">Instagram</a> ·
                    <a href="https://www.tiktok.com/@jayscreationsdesign" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">TikTok</a> ·
                    <a href="https://www.jayscreationsdesign.fr/boutique" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">Boutique</a>
                  </div>
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:11px; 
                              color:#2C1A0E; font-style:italic; margin-top:10px;">
                    "L'art de capturer vos plus beaux moments"
                  </div>
                </td>
              </tr>
      
            </table>
          </td>
        </tr>
      </table>
      
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
    subject: `COPIE - ${emailTemplates.orderConfirmation.subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0; padding:0; background:#FFF8F0; font-family:'Inter',Arial,sans-serif;">
      
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" 
             style="background:#FFF8F0; padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0"
                   style="background:#ffffff; border-radius:16px; overflow:hidden; 
                          box-shadow:0 8px 32px rgba(44,26,14,0.12); max-width:600px;">
      
              <!-- ═══ HEADER ═══ -->
              <tr>
                <td style="background:#FFF8F0; text-align:center; padding:40px 24px 28px; 
                           border-bottom:3px solid #8B4513;">
                  
                  <!-- Anneau logo -->
                  <table role="presentation" cellpadding="0" cellspacing="0" 
                         style="margin:0 auto 18px; border-collapse:collapse;">
                    <tr>
                      <td width="148" height="148" 
                          style="width:148px; height:148px; border-radius:74px; 
                                 background-color:#8B4513; text-align:center; 
                                 vertical-align:middle; padding:0;">
                        <img src="https://www.jayscreationsdesign.fr/images/logo/logo.png.png"
                             width="138" height="138"
                             style="border-radius:69px; display:block; 
                                    margin:0 auto; border:0;"
                             alt="Jay's Creations Design" />
                      </td>
                    </tr>
                  </table>
      
                  <!-- Nom marque Great Vibes -->
                  <div style="font-family:'Great Vibes',cursive; font-size:42px; 
                              font-weight:400; color:#2C1A0E; letter-spacing:2px; 
                              line-height:1.2; margin-bottom:6px;">
                    Jay's Creations Design
                  </div>
      
                  <!-- Tagline -->
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; 
                              color:#D4A574; letter-spacing:3px; text-transform:uppercase; 
                              font-weight:500;">
                    Créations uniques pour moments précieux
                  </div>
                </td>
              </tr>
      
              <!-- ═══ BANDE TITRE ═══ -->
              <tr>
                <td style="background:#8B4513; text-align:center; padding:22px 24px;">
                  <div style="font-size:28px; color:#D4A574; margin-bottom:8px;">&#10003;</div>
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; 
                              font-weight:600; color:#D4A574; margin-bottom:6px;">
                    COPIE DE CONFIRMATION DE COMMANDE
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                              color:#D4A574;">
                    Copie interne pour suivi administratif
                  </div>
                </td>
              </tr>
      
              <!-- ═══ CONTENU PRINCIPAL ═══ -->
              <tr>
                <td style="padding:28px 28px 8px; background:#ffffff;">
                  
                  <!-- INFOS CLIENT RÉCAP BOX -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                         style="background:#FFF8F0; border-radius:10px; 
                                border:1px solid #E8E4DF; margin-bottom:22px;">
                    <tr>
                      <td style="padding:20px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; 
                                    font-weight:600; color:#2C1A0E; margin-bottom:16px; 
                                    display:flex; align-items:center;">
                          <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; 
                                margin-right:12px; display:inline-block;"></span>
                          Informations client et commande
                        </div>
                        
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width:50%; padding-right:20px; vertical-align:top;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Client</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${orderData.client.prenom} ${orderData.client.nom}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Email client</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${email}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Téléphone</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${orderData.client.telephone || 'Non renseigné'}</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width:50%; padding-left:20px; vertical-align:top;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Date</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Heure</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${new Date().toLocaleTimeString('fr-FR')}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Total</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#8B4513; font-weight:600; font-size:18px;">${orderData.total.toFixed(2)}€</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                  </table>
                  
                  <!-- ARTICLES RÉCAP BOX -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                         style="background:#FFF8F0; border-radius:10px; 
                                border:1px solid #E8E4DF; margin-bottom:22px;">
                    <tr>
                      <td style="padding:20px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; 
                                    font-weight:600; color:#2C1A0E; margin-bottom:16px; 
                                    display:flex; align-items:center;">
                          <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; 
                                margin-right:12px; display:inline-block;"></span>
                          Articles commandés
                        </div>
                        
                        ${orderData.items.map((item: any, index: number) => `
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                 style="margin-bottom:12px;">
                            <tr>
                              <td style="padding:12px; background:#ffffff; border-left:4px solid #8B4513; border-radius:0 8px 8px 0;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                            font-weight:600; color:#2C1A0E; margin-bottom:4px;">
                                  ${item.nom}
                                </div>
                                ${item.theme ? `<div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                    color:#aaa; margin-bottom:2px;">Thème: ${item.theme}</div>` : ''}
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa;">
                                  Quantité: ${item.quantite} × ${item.prix.toFixed(2)}€ = ${(item.prix * item.quantite).toFixed(2)}€
                                </div>
                              </td>
                            </tr>
                          </table>
                        `).join('')}
                        
                      </td>
                    </tr>
                  </table>
                  
                  <!-- ADRESSE LIVRAISON RÉCAP BOX -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                         style="background:#FFF8F0; border-radius:10px; 
                                border:1px solid #E8E4DF; margin-bottom:22px;">
                    <tr>
                      <td style="padding:20px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; 
                                    font-weight:600; color:#2C1A0E; margin-bottom:16px; 
                                    display:flex; align-items:center;">
                          <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; 
                                margin-right:12px; display:inline-block;"></span>
                          Adresse de livraison
                        </div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:14px; color:#2C1A0E; line-height:1.8;">
                          <strong>${orderData.client.prenom} ${orderData.client.nom}</strong><br>
                          ${orderData.client.adresse}<br>
                          ${orderData.client.codePostal} ${orderData.client.ville}<br>
                          ${orderData.client.pays}
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
      
              <!-- ═══ BLOC MERCI ═══ -->
              <tr>
                <td style="padding:0 28px 26px; background:#ffffff;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#2C1A0E; border-radius:12px; 
                                 text-align:center; padding:24px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; 
                                    font-size:17px; font-weight:600; 
                                    color:#FFF8F0; margin-bottom:7px;">
                          Actions recommandées
                        </div>
                        <div style="font-family:'Inter',Arial,sans-serif; 
                                    font-size:13px; color:#8B4513; line-height:1.6;">
                          📦 Préparer la commande<br>
                          📞 Contacter le client si nécessaire<br>
                          🚀 Organiser la livraison
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
      
              <!-- ═══ FOOTER ═══ -->
              <tr>
                <td style="background:#FFF8F0; padding:22px 28px; text-align:center; 
                           border-top:1px solid #E8E4DF;">
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:15px; 
                              font-weight:600; color:#2C1A0E; margin-bottom:5px;">
                    Jay's Creations Design
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; 
                              color:#aaa; margin-bottom:8px;">
                    contact@jayscreationsdesign.fr &nbsp;·&nbsp; 
                    commande@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23
                  </div>
                  <div style="font-size:11px; margin-top:4px;">
                    <a href="https://www.instagram.com/jays_creations_design/" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">Instagram</a> ·
                    <a href="https://www.tiktok.com/@jayscreationsdesign" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">TikTok</a> ·
                    <a href="https://www.jayscreationsdesign.fr/boutique" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">Boutique</a>
                  </div>
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:11px; 
                              color:#2C1A0E; font-style:italic; margin-top:10px;">
                    "L'art de capturer vos plus beaux moments"
                  </div>
                </td>
              </tr>
      
            </table>
          </td>
        </tr>
      </table>
      
      </body>
      </html>
    `
  });

  // 3. Envoyer une notification à commande@jayscreationsdesign.fr pour validation
  const adminResult = await sendEmail({
    to: emailSenders.orders.email, // commande@jayscreationsdesign.fr
    subject: 'NOUVELLE COMMANDE À VALIDER - Jay\'s Creations Design',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0; padding:0; background:#FFF8F0; font-family:'Inter',Arial,sans-serif;">
      
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" 
             style="background:#FFF8F0; padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0"
                   style="background:#ffffff; border-radius:16px; overflow:hidden; 
                          box-shadow:0 8px 32px rgba(44,26,14,0.12); max-width:600px;">
      
              <!-- ═══ HEADER ═══ -->
              <tr>
                <td style="background:#FFF8F0; text-align:center; padding:40px 24px 28px; 
                           border-bottom:3px solid #8B4513;">
                  
                  <!-- Anneau logo -->
                  <table role="presentation" cellpadding="0" cellspacing="0" 
                         style="margin:0 auto 18px; border-collapse:collapse;">
                    <tr>
                      <td width="148" height="148" 
                          style="width:148px; height:148px; border-radius:74px; 
                                 background-color:#8B4513; text-align:center; 
                                 vertical-align:middle; padding:0;">
                        <img src="https://www.jayscreationsdesign.fr/images/logo/logo.png.png"
                             width="138" height="138"
                             style="border-radius:69px; display:block; 
                                    margin:0 auto; border:0;"
                             alt="Jay's Creations Design" />
                      </td>
                    </tr>
                  </table>
      
                  <!-- Nom marque Great Vibes -->
                  <div style="font-family:'Great Vibes',cursive; font-size:42px; 
                              font-weight:400; color:#2C1A0E; letter-spacing:2px; 
                              line-height:1.2; margin-bottom:6px;">
                    Jay's Creations Design
                  </div>
      
                  <!-- Tagline -->
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; 
                              color:#D4A574; letter-spacing:3px; text-transform:uppercase; 
                              font-weight:500;">
                    Créations uniques pour moments précieux
                  </div>
                </td>
              </tr>
      
              <!-- ═══ BANDE TITRE ═══ -->
              <tr>
                <td style="background:#8B4513; text-align:center; padding:22px 24px;">
                  <div style="font-size:28px; color:#D4A574; margin-bottom:8px;">&#10003;</div>
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; 
                              font-weight:600; color:#D4A574; margin-bottom:6px;">
                    NOUVELLE COMMANDE À VALIDER
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                              color:#D4A574;">
                    Une commande nécessite votre validation
                  </div>
                </td>
              </tr>
      
              <!-- ═══ CONTENU PRINCIPAL ═══ -->
              <tr>
                <td style="padding:28px 28px 8px; background:#ffffff;">
                  
                  <!-- INFOS CLIENT RÉCAP BOX -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                         style="background:#FFF8F0; border-radius:10px; 
                                border:1px solid #E8E4DF; margin-bottom:22px;">
                    <tr>
                      <td style="padding:20px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; 
                                    font-weight:600; color:#2C1A0E; margin-bottom:16px; 
                                    display:flex; align-items:center;">
                          <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; 
                                margin-right:12px; display:inline-block;"></span>
                          Informations client et commande
                        </div>
                        
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width:50%; padding-right:20px; vertical-align:top;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Client</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${orderData.client.prenom} ${orderData.client.nom}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Email client</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${email}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Téléphone</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${orderData.client.telephone || 'Non renseigné'}</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td style="width:50%; padding-left:20px; vertical-align:top;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Date commande</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Heure</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#2C1A0E; font-weight:600;">${new Date().toLocaleTimeString('fr-FR')}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom:12px;">
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                color:#aaa; margin-bottom:4px; font-weight:500;">Montant total</div>
                                    <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                                color:#8B4513; font-weight:600; font-size:18px;">${orderData.total.toFixed(2)}€</div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                  </table>
                  
                  <!-- ARTICLES RÉCAP BOX -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                         style="background:#FFF8F0; border-radius:10px; 
                                border:1px solid #E8E4DF; margin-bottom:22px;">
                    <tr>
                      <td style="padding:20px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; 
                                    font-weight:600; color:#2C1A0E; margin-bottom:16px; 
                                    display:flex; align-items:center;">
                          <span style="width:8px; height:8px; background:#8B4513; border-radius:50%; 
                                margin-right:12px; display:inline-block;"></span>
                          Résumé des articles
                        </div>
                        
                        ${orderData.items.map((item: any, index: number) => `
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                                 style="margin-bottom:12px;">
                            <tr>
                              <td style="padding:12px; background:#ffffff; border-left:4px solid #8B4513; border-radius:0 8px 8px 0;">
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                            font-weight:600; color:#2C1A0E; margin-bottom:4px;">
                                  ${item.nom}
                                </div>
                                ${item.theme ? `<div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                                    color:#aaa; margin-bottom:2px;">Thème: ${item.theme}</div>` : ''}
                                <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa;">
                                  Quantité: ${item.quantite} × ${item.prix.toFixed(2)}€ = ${(item.prix * item.quantite).toFixed(2)}€
                                </div>
                              </td>
                            </tr>
                          </table>
                        `).join('')}
                        
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
      
              <!-- ═══ BLOC MERCI ═══ -->
              <tr>
                <td style="padding:0 28px 26px; background:#ffffff;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#2C1A0E; border-radius:12px; 
                                 text-align:center; padding:24px;">
                        <div style="font-family:'Playfair Display',Georgia,serif; 
                                    font-size:17px; font-weight:600; 
                                    color:#FFF8F0; margin-bottom:7px;">
                          ACTIONS REQUISES
                        </div>
                        <div style="font-family:'Inter',Arial,sans-serif; 
                                    font-size:13px; color:#8B4513; line-height:1.6;">
                          ✅ Vérifier la disponibilité des articles<br>
                          ✅ Contacter le client pour confirmation<br>
                          ✅ Préparer la commande<br>
                          ✅ Organiser la livraison
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
      
              <!-- ═══ FOOTER ═══ -->
              <tr>
                <td style="background:#FFF8F0; padding:22px 28px; text-align:center; 
                           border-top:1px solid #E8E4DF;">
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:15px; 
                              font-weight:600; color:#2C1A0E; margin-bottom:5px;">
                    Jay's Creations Design
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; 
                              color:#aaa; margin-bottom:8px;">
                    contact@jayscreationsdesign.fr &nbsp;·&nbsp; 
                    commande@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23
                  </div>
                  <div style="font-size:11px; margin-top:4px;">
                    <a href="https://www.instagram.com/jays_creations_design/" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">Instagram</a> ·
                    <a href="https://www.tiktok.com/@jayscreationsdesign" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">TikTok</a> ·
                    <a href="https://www.jayscreationsdesign.fr/boutique" 
                       style="color:#8B4513; text-decoration:none; 
                              margin:0 6px; font-weight:500;">Boutique</a>
                  </div>
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:11px; 
                              color:#2C1A0E; font-style:italic; margin-top:10px;">
                    "L'art de capturer vos plus beaux moments"
                  </div>
                </td>
              </tr>
      
            </table>
          </td>
        </tr>
      </table>
      
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
  const adminEmail = process.env.ADMIN_EMAIL || 'contact@jayscreationsdesign.fr';  
  return await sendEmail({
    to: adminEmail,
    subject: emailTemplates.quoteRequest.subject,
    html: emailTemplates.quoteRequest.html(quoteData)
  });
}
