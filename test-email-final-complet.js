// Script de test COMPLET pour l'email de confirmation de commande
// Utilise les vrais identifiants Ionos et les nouveaux templates refactoring

const nodemailer = require('nodemailer');

// Identifiants IONOS - configuration finale correcte
const SMTP_CONFIG = {
  user: 'commande@jayscreationsdesign.fr',
  pass: 'Kenays971238.',
  host: 'smtp.ionos.fr',
  port: 465,
  secure: true
};

// Configuration des expéditeurs
const emailSenders = {
  transactional: {
    name: "Jay's Creations Design",
    email: 'contact@jayscreationsdesign.fr'
  },
  orders: {
    name: "Jay's Creations Design - Commandes",
    email: 'commande@jayscreationsdesign.fr'
  }
};

// Transporteur Nodemailer avec les vrais identifiants
const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: SMTP_CONFIG.secure,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass
  }
});

// Fonction générique d'envoi d'email
async function sendEmail(options) {
  try {
    const mailOptions = {
      from: options.from || emailSenders.transactional.email,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès. Message ID:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error.message);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
}

// Composants de template (extraits de email-template-base.ts)
const EMAIL_HEADER = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; max-width:600px;">
        
        <!-- HEADER -->
        <tr>
          <td align="center" style="background:#FFF8F0; padding:40px 24px 28px; border-bottom:3px solid #8B4513;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 18px;">
              <tr>
                <td width="148" height="148" style="width:148px; height:148px; border-radius:74px; background-color:#8B4513; text-align:center; vertical-align:middle; padding:0;">
                  <img src="https://www.jayscreationsdesign.fr/images/logo/logo.png.png" width="138" height="138" style="border-radius:69px; display:block; margin:0 auto; border:0;" alt="Jay's Creations Design" />
                </td>
              </tr>
            </table>
            
            <div style="font-family:'Great Vibes',cursive; font-size:42px; font-weight:400; color:#2C1A0E; letter-spacing:2px; line-height:1.2; margin-bottom:6px;">
              Jay's Creations Design
            </div>
            
            <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; color:#D4A574; letter-spacing:3px; text-transform:uppercase; font-weight:500;">
              Créations uniques pour moments précieux
            </div>
          </td>
        </tr>`;

const EMAIL_FOOTER = `
        <!-- FOOTER -->
        <tr>
          <td style="border-top:3px solid #8B4513; background:#FFF8F0; text-align:center; padding:32px 24px;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:16px; font-weight:600; color:#2C1A0E; margin-bottom:12px;">
              Jay's Creations Design
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; color:#2C1A0E; margin-bottom:20px;">
              contact&nbsp;&nbsp;&nbsp;commande
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; color:#2C1A0E; line-height:1.5;">
              <a href="https://www.jayscreationsdesign.fr" style="color:#8B4513; text-decoration:none; font-weight:500;">www.jayscreationsdesign.fr</a> | 
              <a href="https://www.jayscreationsdesign.fr/mentions-legales" style="color:#8B4513; text-decoration:none; font-weight:500;">Mentions légales</a> | 
              <a href="https://www.jayscreationsdesign.fr/conditions-generales" style="color:#8B4513; text-decoration:none; font-weight:500;">CGV</a>
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:10px; color:#2C1A0E; margin-top:16px; font-style:italic;">
              © 2026 Jay's Creations Design. Tous droits réservés.
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

const EMAIL_MERCI = `
        <!-- BLOC MERCI -->
        <tr>
          <td style="text-align:center; padding:32px 24px; background:#ffffff;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center; padding-bottom:16px;">
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:8px;">
                    MERCI DE VOTRE CONFIANCE
                  </div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#8B4513; line-height:1.5;">
                    ACTIONS REQUISES
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;

function emailBande(icon, titre, sousTitre) {
  return `
        <!-- BANDE TITRE -->
        <tr>
          <td style="background:#8B4513; text-align:center; padding:22px 24px;">
            <div style="font-size:28px; color:#D4A574; margin-bottom:8px;">${icon}</div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; font-weight:600; color:#D4A574; margin-bottom:6px;">
              ${titre}
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#D4A574;">
              ${sousTitre}
            </div>
          </td>
        </tr>`;
}

function emailCTA(texte, url) {
  return `
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto 0;">
                <tr>
                  <td style="background:#8B4513; border-radius:8px; text-align:center;">
                    <a href="${url}" style="display:inline-block; padding:16px 32px; font-family:'Inter',Arial,sans-serif; font-size:16px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">
                      ${texte}
                    </a>
                  </td>
                </tr>
              </table>`;
}

function emailWrap(content) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background:#FFF8F0; font-family:'Inter',Arial,sans-serif;">
${content}
</body>
</html>`;
}

// Template de confirmation de commande avec la nouvelle structure
function getOrderConfirmationTemplate(orderData) {
  return emailWrap(
    EMAIL_HEADER +
    emailBande('&#10003;', 'Commande confirmée !', 'Nous avons bien reçu votre commande') +
    `<tr><td style="padding:28px; background:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-bottom:20px;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
              Bonjour ${orderData.firstName || 'Client'},
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Nous vous remercions pour votre confiance. Votre commande n°${orderData.orderNumber || 'N/A'} a été confirmée et est maintenant en préparation.
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Vous recevrez une notification dès que votre commande sera expédiée.
            </div>
            ${emailCTA('Suivre ma commande', 'https://www.jayscreationsdesign.fr/mon-compte')}
          </td>
        </tr>
      </table>
    </td></tr>` +
    EMAIL_MERCI +
    EMAIL_FOOTER
  );
}

// Fonction principale d'envoi de confirmation de commande
async function sendOrderConfirmationEmail(email, orderData) {
  console.log('Envoi des emails de confirmation de commande...');
  
  // 1. Envoyer l'email de confirmation principal
  console.log('1. Envoi de l\'email de confirmation principal...');
  const clientResult = await sendEmail({
    to: emailSenders.orders.email,
    subject: 'Confirmation de votre commande - Jay\'s Creations Design',
    html: getOrderConfirmationTemplate(orderData),
    from: emailSenders.orders.email
  });

  // 2. Envoyer une copie
  console.log('2. Envoi de la copie...');
  const copyResult = await sendEmail({
    to: emailSenders.orders.email,
    subject: `COPIE - Confirmation de votre commande - Jay\'s Creations Design`,
    html: emailWrap(
      EMAIL_HEADER +
      emailBande('&#10003;', 'COPIE - Commande confirmée', 'Copie de la confirmation de commande') +
      `<tr><td style="padding:28px; background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px;">
              <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
                Copie de confirmation de commande
              </div>
              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
                Commande n°${orderData.orderNumber || 'N/A'} pour ${orderData.firstName || 'Client'}
              </div>
              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
                Email original : ${email}
              </div>
            </td>
          </tr>
        </table>
      </td></tr>` +
      EMAIL_MERCI +
      EMAIL_FOOTER
    ),
    from: emailSenders.orders.email
  });

  // 3. Envoyer une notification admin
  console.log('3. Envoi de la notification admin...');
  const adminResult = await sendEmail({
    to: emailSenders.orders.email,
    subject: `TRAITEMENT REQUIS - ${orderData.orderNumber || 'N/A'}`,
    html: emailWrap(
      EMAIL_HEADER +
      emailBande('&#10003;', 'Nouvelle commande à traiter', 'Une commande nécessite votre attention') +
      `<tr><td style="padding:28px; background:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:20px;">
              <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
                Actions requises pour la commande n°${orderData.orderNumber || 'N/A'}
              </div>
              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:16px;">
                &#10003; Vérifier la disponibilité des articles
              </div>
              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:16px;">
                &#10003; Contacter le client pour confirmation
              </div>
              <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
                &#10003; Préparer la commande pour expédition
              </div>
              ${emailCTA('Voir les détails', 'https://www.jayscreationsdesign.fr/admin')}
            </td>
          </tr>
        </table>
      </td></tr>` +
      EMAIL_MERCI +
      EMAIL_FOOTER
    ),
    from: emailSenders.orders.email
  });

  return { 
    success: clientResult.success && copyResult.success && adminResult.success, 
    clientEmail: clientResult,
    copyEmail: copyResult,
    adminNotification: adminResult 
  };
}

// Données de test réalistes
const testOrderData = {
  orderNumber: 'CMD-2026-0413-001',
  firstName: 'Anais',
  lastName: 'Test',
  email: 'anais.test@example.com',
  phone: '06 12 34 56 78',
  items: [
    {
      name: 'Bouquet de fleurs personnalisé',
      quantity: 1,
      price: 45.00
    },
    {
      name: 'Carte de voeux artisanale',
      quantity: 2,
      price: 12.50
    }
  ],
  totalAmount: 70.00,
  shippingAddress: '123 rue de la Paix, 75001 Paris',
  orderDate: new Date().toISOString()
};

// Test principal
async function testEmailConfirmationComplete() {
  console.log('=== TEST COMPLET D\'EMAIL DE CONFIRMATION DE COMMANDE ===');
  console.log('');
  console.log('Configuration SMTP:');
  console.log('- Serveur:', SMTP_CONFIG.host);
  console.log('- Port:', SMTP_CONFIG.port);
  console.log('- Utilisateur:', SMTP_CONFIG.user);
  console.log('- Sécurité:', SMTP_CONFIG.secure ? 'SSL' : 'TLS');
  console.log('');
  console.log('Données de commande:');
  console.log('- Numéro:', testOrderData.orderNumber);
  console.log('- Client:', testOrderData.firstName + ' ' + testOrderData.lastName);
  console.log('- Email:', testOrderData.email);
  console.log('- Articles:', testOrderData.items.length);
  console.log('- Total:', testOrderData.totalAmount + ' EUR');
  console.log('');
  
  try {
    // Tester la connexion SMTP d'abord
    console.log('Vérification de la connexion SMTP...');
    await transporter.verify();
    console.log('Connexion SMTP réussie !');
    console.log('');
    
    // Envoyer les emails
    const result = await sendOrderConfirmationEmail('anais.test@example.com', testOrderData);
    
    console.log('');
    console.log('=== RÉSULTAT DE L\'ENVOI ===');
    console.log('- Succès global:', result.success ? 'OK' : 'ÉCHEC');
    console.log('- Email principal:', result.clientEmail.success ? 'OK' : 'ÉCHEC');
    console.log('- Copie email:', result.copyEmail.success ? 'OK' : 'ÉCHEC');
    console.log('- Notification admin:', result.adminNotification.success ? 'OK' : 'ÉCHEC');
    
    if (result.success) {
      console.log('');
      console.log('=== SUCCÈS TOTAL ===');
      console.log('Tous les emails ont été envoyés avec succès !');
      console.log('');
      console.log('Emails envoyés vers: commande@jayscreationsdesign.fr');
      console.log('1. Email de confirmation principal');
      console.log('2. Copie de l\'email');
      console.log('3. Notification admin pour traitement');
      console.log('');
      console.log('Nouveaux templates utilisés:');
      console.log('Logo centré avec structure de table imbriquée');
      console.log('Police Great Vibes chargée depuis Google Fonts');
      console.log('Icônes &#10003; au lieu de "!"');
      console.log('Structure table-based avec styles inline');
      console.log('Charte graphique unifiée avec composants de base');
      console.log('');
      console.log('Refactoring des templates email RÉUSSI !');
    } else {
      console.log('');
      console.log('=== ÉCHEC PARTIEL ===');
      console.log('Erreurs détectées:');
      if (!result.clientEmail.success) console.log('- Email principal:', result.clientEmail.error);
      if (!result.copyEmail.success) console.log('- Copie email:', result.copyEmail.error);
      if (!result.adminNotification.success) console.log('- Notification admin:', result.adminNotification.error);
    }
    
  } catch (error) {
    console.error('Erreur lors du test:', error);
  }
}

// Exécuter le test complet
testEmailConfirmationComplete();
