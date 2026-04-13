// Script de test pour l'email de confirmation de commande
const nodemailer = require('nodemailer');

// Configuration du transporteur Ionos (identique à src/lib/email.ts)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ionos.fr',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'commande@jayscreationsdesign.fr',
    pass: process.env.SMTP_PASS || 'Jay2005creations'
  }
});

// Données de test pour la commande
const orderData = {
  orderNumber: 'CMD-2024-TEST-001',
  client: {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'client.test@example.com',
    telephone: '06 12 34 56 78',
    adresse: '123 Rue de la Création',
    codePostal: '75001',
    ville: 'Paris',
    pays: 'France'
  },
  items: [
    {
      nom: 'Boîte à Souvenirs Personnalisée',
      theme: 'Romantique',
      quantite: 2,
      prix: 49.99
    },
    {
      nom: 'Album Photo sur Mesure',
      theme: 'Voyage',
      quantite: 1,
      prix: 89.99
    }
  ],
  total: 189.97,
  paymentMethod: 'Carte bancaire',
  shippingMethod: 'Livraison standard',
  estimatedDelivery: '5-7 jours ouvrés'
};

// Template HTML avec la nouvelle charte graphique
const emailTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
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

        <!-- HEADER -->
        <tr>
          <td style="background:#FFF8F0; text-align:center; padding:40px 24px 28px; 
                     border-bottom:3px solid #8B4513;">
            
            <!-- Anneau logo -->
            <table role="presentation" cellpadding="0" cellspacing="0" 
                   style="margin:0 auto 18px;">
              <tr>
                <td style="width:148px; height:148px; border-radius:50%; 
                           background:#8B4513; text-align:center; 
                           vertical-align:middle;
                           box-shadow:0 4px 20px rgba(139,69,19,0.35);">
                  <img src="https://www.jayscreationsdesign.fr/images/logo/logo.png"
                       width="138" height="138"
                       style="border-radius:50%; display:block; 
                              margin:5px auto 0;
                              object-fit:cover;"
                       alt="Jay's Creations Design" />
                </td>
              </tr>
            </table>

            <!-- Nom marque Great Vibes -->
            <div style="font-family:'Great Vibes',cursive; font-size:42px; 
                        font-weight:400; color:#2C1A0E; letter-spacing:2px; 
                        margin-bottom:6px; line-height:1.2;">
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

        <!-- BANDE TITRE -->
        <tr>
          <td style="background:#8B4513; text-align:center; padding:22px 24px;">
            <div style="font-size:28px; color:#D4A574; margin-bottom:8px;">!</div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; 
                        font-weight:600; color:#D4A574; margin-bottom:6px;">
              Confirmation de votre commande
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                        color:#D4A574;">
              Commande #${orderData.orderNumber} - Merci pour votre confiance !
            </div>
          </td>
        </tr>

        <!-- CONTENU PRINCIPAL -->
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
                                          color:#aaa; margin-bottom:4px; font-weight:500;">Numéro commande</div>
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                          color:#2C1A0E; font-weight:600;">${orderData.orderNumber}</div>
                            </td>
                          </tr>
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
                                          color:#aaa; margin-bottom:4px; font-weight:500;">Date commande</div>
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                          color:#2C1A0E; font-weight:600;">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="width:50%; padding-left:20px; vertical-align:top;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-bottom:12px;">
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                          color:#aaa; margin-bottom:4px; font-weight:500;">Email</div>
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                          color:#2C1A0E; font-weight:600;">${orderData.client.email}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:12px;">
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                          color:#aaa; margin-bottom:4px; font-weight:500;">Téléphone</div>
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                          color:#2C1A0E; font-weight:600;">${orderData.client.telephone}</div>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom:12px;">
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; 
                                          color:#aaa; margin-bottom:4px; font-weight:500;">Total</div>
                              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; 
                                          color:#8B4513; font-weight:600; font-size:18px;">${orderData.total.toFixed(2)}EUR</div>
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
                  
                  ${orderData.items.map((item, index) => `
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
                            Quantité: ${item.quantite} × ${item.prix.toFixed(2)}EUR = ${(item.prix * item.quantite).toFixed(2)}EUR
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

        <!-- BLOC MERCI -->
        <tr>
          <td style="padding:0 28px 26px; background:#ffffff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#2C1A0E; border-radius:12px; 
                           text-align:center; padding:24px;">
                  <div style="font-family:'Playfair Display',Georgia,serif; 
                              font-size:17px; font-weight:600; 
                              color:#FFF8F0; margin-bottom:7px;">
                    Merci pour votre commande !
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; 
                              font-size:13px; color:#8B4513; line-height:1.6;">
                    Nous vous enverrons une notification dès que votre commande sera expédiée.<br>
                    Livraison estimée : ${orderData.estimatedDelivery}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
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
`;

// Fonction d'envoi de l'email
async function sendTestEmail() {
  try {
    console.log('Envoi de l\'email de test à commande@jayscreationsdesign.fr...');
    
    const info = await transporter.sendMail({
      from: '"Jay\'s Creations Design" <commande@jayscreationsdesign.fr>',
      to: 'commande@jayscreationsdesign.fr',
      subject: `TEST - Confirmation de commande #${orderData.orderNumber}`,
      html: emailTemplate
    });

    console.log('Email envoyé avec succès !');
    console.log('ID du message:', info.messageId);
    console.log('URL de prévisualisation (nodemailer):', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
}

// Exécuter le test
sendTestEmail();
