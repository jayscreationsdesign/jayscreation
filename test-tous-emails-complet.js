// Test COMPLET de tous les types d'emails avec les bons destinataires
// Utilise les nouveaux templates refactoring et les vrais identifiants

const nodemailer = require('nodemailer');

// Configuration SMTP correcte
const SMTP_CONFIG = {
  user: 'commande@jayscreationsdesign.fr',
  pass: 'Kenays971238.',
  host: 'smtp.ionos.fr',
  port: 465,
  secure: true
};

// Configuration des expéditeurs et destinataires
const emailConfig = {
  transactional: {
    from: 'contact@jayscreationsdesign.fr',
    name: "Jay's Creations Design"
  },
  orders: {
    from: 'commande@jayscreationsdesign.fr',
    name: "Jay's Creations Design - Commandes"
  },
  admin: {
    to: 'contact@jayscreationsdesign.fr'
  },
  ordersEmail: {
    to: 'commande@jayscreationsdesign.fr'
  }
};

// Transporteur Nodemailer
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
      from: options.from || emailConfig.transactional.from,
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

// Templates avec la nouvelle structure
function getWelcomeTemplate(firstName) {
  return emailWrap(
    EMAIL_HEADER +
    emailBande('&#10003;', 'Bienvenue chez nous !', 'Votre compte a été créé avec succès') +
    `<tr><td style="padding:28px; background:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-bottom:20px;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
              Bonjour ${firstName},
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Nous sommes ravis de vous accueillir au sein de Jay's Creations Design. Votre compte a été créé avec succès et vous pouvez désormais profiter de tous nos services.
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Découvrez nos créations uniques et personnalisées qui rendront vos moments spéciaux encore plus mémorables.
            </div>
            ${emailCTA('Explorer nos créations', 'https://www.jayscreationsdesign.fr')}
          </td>
        </tr>
      </table>
    </td></tr>` +
    EMAIL_MERCI +
    EMAIL_FOOTER
  );
}

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

function getQuoteRequestTemplate(quoteData) {
  return emailWrap(
    EMAIL_HEADER +
    emailBande('&#10003;', 'Nouvelle demande', 'Un client a demandé un devis personnalisé') +
    `<tr><td style="padding:28px; background:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-bottom:20px;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
              Nouvelle demande de devis
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:20px;">
              <tr>
                <td style="padding:20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:50%; padding-right:20px; vertical-align:top;">
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Nom</div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600; margin-bottom:12px;">${quoteData.name || 'N/A'}</div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Email</div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600; margin-bottom:12px;">${quoteData.email || 'N/A'}</div>
                      </td>
                      <td style="width:50%; padding-left:20px; vertical-align:top;">
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Téléphone</div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600; margin-bottom:12px;">${quoteData.phone || 'N/A'}</div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Date</div>
                        <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600; margin-bottom:12px;">${new Date().toLocaleDateString('fr-FR')}</div>
                      </td>
                    </tr>
                  </table>
                  ${quoteData.message ? `
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Message</div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; line-height:1.5;">${quoteData.message}</div>
                  ` : ''}
                </td>
              </tr>
            </table>
            ${emailCTA('Répondre au client', `mailto:${quoteData.email}`)}
          </td>
        </tr>
      </table>
    </td></tr>` +
    EMAIL_MERCI +
    EMAIL_FOOTER
  );
}

function getAdminNotificationTemplate(type, data) {
  let content = '';
  
  switch(type) {
    case 'newAccount':
      content = emailWrap(
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
                            <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Prénom</div>
                            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${data.firstName}</div>
                          </td>
                          <td style="width:50%; padding-left:20px; vertical-align:top;">
                            <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#aaa; margin-bottom:4px; font-weight:500;">Email</div>
                            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; font-weight:600;">${data.email}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                ${emailCTA('Voir le compte', 'https://www.jayscreationsdesign.fr/admin')}
              </td>
            </tr>
          </table>
        </td></tr>` +
        EMAIL_MERCI +
        EMAIL_FOOTER
      );
      break;
      
    case 'orderProcessing':
      content = emailWrap(
        EMAIL_HEADER +
        emailBande('&#10003;', 'Nouvelle commande à traiter', 'Une commande nécessite votre attention') +
        `<tr><td style="padding:28px; background:#ffffff;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:20px;">
                <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
                  Actions requises pour la commande n°${data.orderNumber}
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
      );
      break;
  }
  
  return content;
}

// Données de test réalistes
const testData = {
  welcome: {
    firstName: 'Anais',
    email: 'contact@jayscreationsdesign.fr'
  },
  orderConfirmation: {
    orderNumber: 'CMD-2026-0413-001',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@example.com',
    phone: '06 23 45 67 89',
    items: [
      { name: 'Bouquet de fleurs personnalisé', quantity: 1, price: 45.00 },
      { name: 'Carte de voeux artisanale', quantity: 2, price: 12.50 }
    ],
    totalAmount: 70.00
  },
  quoteRequest: {
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    message: 'Je souhaiterais un devis pour un mariage avec 15 tables de fleurs et des centres de tables personnalisés.'
  }
};

// Test complet de tous les emails
async function testAllEmails() {
  console.log('=== TEST COMPLET DE TOUS LES TYPES D\'EMAILS ===');
  console.log('');
  console.log('Configuration SMTP:');
  console.log('- Serveur:', SMTP_CONFIG.host);
  console.log('- Port:', SMTP_CONFIG.port);
  console.log('- Utilisateur:', SMTP_CONFIG.user);
  console.log('- Sécurité:', SMTP_CONFIG.secure ? 'SSL' : 'TLS');
  console.log('');
  
  try {
    // Vérifier la connexion
    console.log('Vérification de la connexion SMTP...');
    await transporter.verify();
    console.log('Connexion SMTP réussie !');
    console.log('');
    
    const results = [];
    
    // 1. Email de bienvenue (vers le client)
    console.log('1. ENVOI EMAIL DE BIENVENUE');
    console.log('   Destinataire:', testData.welcome.email);
    const welcomeResult = await sendEmail({
      to: testData.welcome.email,
      subject: 'Bienvenue chez Jay\'s Creations Design !',
      html: getWelcomeTemplate(testData.welcome.firstName),
      from: emailConfig.transactional.from
    });
    results.push({ type: 'Bienvenue', result: welcomeResult });
    console.log('');
    
    // 2. Email de confirmation de commande (vers commande@jayscreationsdesign.fr)
    console.log('2. ENVOI EMAIL DE CONFIRMATION DE COMMANDE');
    console.log('   Destinataire:', emailConfig.ordersEmail.to);
    const orderResult = await sendEmail({
      to: emailConfig.ordersEmail.to,
      subject: 'Confirmation de votre commande - Jay\'s Creations Design',
      html: getOrderConfirmationTemplate(testData.orderConfirmation),
      from: emailConfig.orders.from
    });
    results.push({ type: 'Confirmation commande', result: orderResult });
    console.log('');
    
    // 3. Copie de confirmation de commande
    console.log('3. ENVOI COPIE CONFIRMATION COMMANDE');
    console.log('   Destinataire:', emailConfig.ordersEmail.to);
    const copyResult = await sendEmail({
      to: emailConfig.ordersEmail.to,
      subject: 'COPIE - Confirmation de votre commande - Jay\'s Creations Design',
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
                  Commande n°${testData.orderConfirmation.orderNumber} pour ${testData.orderConfirmation.firstName}
                </div>
                <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
                  Email original : ${testData.orderConfirmation.email}
                </div>
              </td>
            </tr>
          </table>
        </td></tr>` +
        EMAIL_MERCI +
        EMAIL_FOOTER
      ),
      from: emailConfig.orders.from
    });
    results.push({ type: 'Copie commande', result: copyResult });
    console.log('');
    
    // 4. Email de demande de devis (vers admin)
    console.log('4. ENVOI EMAIL DEMANDE DE DEVIS');
    console.log('   Destinataire:', emailConfig.admin.to);
    const quoteResult = await sendEmail({
      to: emailConfig.admin.to,
      subject: 'Nouvelle demande de devis - Jay\'s Creations Design',
      html: getQuoteRequestTemplate(testData.quoteRequest),
      from: emailConfig.transactional.from
    });
    results.push({ type: 'Demande devis', result: quoteResult });
    console.log('');
    
    // 5. Notification admin nouveau compte
    console.log('5. ENVOI NOTIFICATION ADMIN NOUVEAU COMPTE');
    console.log('   Destinataire:', emailConfig.admin.to);
    const adminAccountResult = await sendEmail({
      to: emailConfig.admin.to,
      subject: 'Nouveau compte créé - Jay\'s Creations Design',
      html: getAdminNotificationTemplate('newAccount', testData.welcome),
      from: emailConfig.transactional.from
    });
    results.push({ type: 'Notification admin compte', result: adminAccountResult });
    console.log('');
    
    // 6. Notification admin traitement commande
    console.log('6. ENVOI NOTIFICATION ADMIN TRAITEMENT COMMANDE');
    console.log('   Destinataire:', emailConfig.ordersEmail.to);
    const adminOrderResult = await sendEmail({
      to: emailConfig.ordersEmail.to,
      subject: 'TRAITEMENT REQUIS - ' + testData.orderConfirmation.orderNumber,
      html: getAdminNotificationTemplate('orderProcessing', testData.orderConfirmation),
      from: emailConfig.orders.from
    });
    results.push({ type: 'Notification admin commande', result: adminOrderResult });
    console.log('');
    
    // Résultats finaux
    console.log('=== RÉSULTATS FINAUX ===');
    const successCount = results.filter(r => r.result.success).length;
    const totalCount = results.length;
    
    console.log(`Emails envoyés: ${successCount}/${totalCount}`);
    console.log('');
    
    results.forEach(({ type, result }) => {
      console.log(`${type}: ${result.success ? 'OK' : 'ÉCHEC'}`);
      if (!result.success) {
        console.log(`  Erreur: ${result.error}`);
      } else {
        console.log(`  Message ID: ${result.messageId}`);
      }
    });
    
    console.log('');
    if (successCount === totalCount) {
      console.log('=== SUCCÈS TOTAL ===');
      console.log('Tous les emails ont été envoyés avec succès !');
      console.log('');
      console.log('Destinataires utilisés:');
      console.log('- Clients:', testData.welcome.email);
      console.log('- Admin principal:', emailConfig.admin.to);
      console.log('- Commandes:', emailConfig.ordersEmail.to);
      console.log('');
      console.log('Nouveaux templates refactoring utilisés:');
      console.log('- Logo centré avec structure de table imbriquée');
      console.log('- Police Great Vibes chargée depuis Google Fonts');
      console.log('- Icônes &#10003; au lieu de "!"');
      console.log('- Structure table-based avec styles inline');
      console.log('- Charte graphique unifiée avec composants de base');
      console.log('');
      console.log('Test complet de tous les types d\'emails RÉUSSI !');
    } else {
      console.log('=== ÉCHEC PARTIEL ===');
      console.log('Certains emails n\'ont pas pu être envoyés.');
    }
    
  } catch (error) {
    console.error('Erreur lors du test:', error);
  }
}

// Exécuter le test complet
testAllEmails();
