// Test avec le VRAI design des templates email-template-base.ts
// Utilise les composants exacts comme définis dans le fichier original

const nodemailer = require('nodemailer');

// Configuration SMTP
const SMTP_CONFIG = {
  user: 'commande@jayscreationsdesign.fr',
  pass: 'Kenays971238.',
  host: 'smtp.ionos.fr',
  port: 465,
  secure: true
};

// Transporteur
const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: SMTP_CONFIG.secure,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass
  }
});

// Fonction d'envoi
async function sendEmail(options) {
  try {
    const result = await transporter.sendMail({
      from: options.from || 'contact@jayscreationsdesign.fr',
      to: options.to,
      subject: options.subject,
      html: options.html
    });
    console.log('Email envoyé avec succès. Message ID:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Erreur:', error.message);
    return { success: false, error: error.message };
  }
}

// COMPOSANTS EXACTS de email-template-base.ts
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
                <td width="148" height="148" style="width:148px; height:148px; border-radius:74px; background-color:#8B4513; text-align:center; vertical-align:middle;">
                  <img src="https://www.jayscreationsdesign.fr/images/logo/logo.png.png" width="138" height="138" style="border-radius:69px; display:block; margin:0 auto; border:0;" alt="Jay's Creations Design" />
                </td>
              </tr>
            </table>
            <div style="font-family:'Great Vibes',cursive; font-size:42px; font-weight:400; color:#2C1A0E; letter-spacing:2px; margin-bottom:6px; line-height:1.2;">Jay's Creations Design</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; color:#D4A574; letter-spacing:3px; text-transform:uppercase; font-weight:500;">Créations uniques pour moments précieux</div>
          </td>
        </tr>`;

const EMAIL_FOOTER = `
        <!-- FOOTER -->
        <tr>
          <td style="background:#FFF8F0; padding:22px 28px; text-align:center; border-top:1px solid #E8E4DF;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:15px; font-weight:600; color:#2C1A0E; margin-bottom:5px;">Jay's Creations Design</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; color:#aaa; margin-bottom:8px;">contact@jayscreationsdesign.fr &nbsp;·&nbsp; commande@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23</div>
            <div style="font-size:11px; margin-top:4px;">
              <a href="https://www.instagram.com/jays_creations_design/" style="color:#8B4513; text-decoration:none; margin:0 6px; font-weight:500;">Instagram</a> ·
              <a href="https://www.tiktok.com/@jayscreationsdesign" style="color:#8B4513; text-decoration:none; margin:0 6px; font-weight:500;">TikTok</a> ·
              <a href="https://www.jayscreationsdesign.fr/boutique" style="color:#8B4513; text-decoration:none; margin:0 6px; font-weight:500;">Boutique</a>
            </div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:11px; color:#2C1A0E; font-style:italic; margin-top:10px;">"L'art de capturer vos plus beaux moments"</div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>`;

const EMAIL_MERCI = `
        <tr>
          <td style="padding:0 28px 26px; background:#ffffff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#2C1A0E; border-radius:12px; text-align:center; padding:24px;">
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:17px; font-weight:600; color:#FFF8F0; margin-bottom:7px;">Merci pour votre confiance !</div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#8B4513;">Vous recevrez des mises à jour par email à chaque étape.</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;

function emailBande(icone, titre, sousTitre) {
  return `
        <tr>
          <td style="background:#8B4513; text-align:center; padding:22px 24px;">
            <div style="font-size:28px; color:#D4A574; margin-bottom:8px;">${icone}</div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; font-weight:600; color:#D4A574; margin-bottom:6px;">${titre}</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#D4A574;">${sousTitre}</div>
          </td>
        </tr>`;
}

function emailCTA(lien, texte) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 26px;">
    <tr>
      <td style="border-radius:30px; background:#8B4513;">
        <a href="${lien}" style="display:inline-block; background:#8B4513; color:white; padding:14px 38px; border-radius:30px; font-size:14px; font-weight:600; text-decoration:none; letter-spacing:0.5px; font-family:'Inter',Arial,sans-serif; border:2px solid #8B4513;">
          ${texte}
        </a>
      </td>
    </tr>
  </table>`;
}

function emailWrap(contenu) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background:#FFF8F0; font-family:'Inter',Arial,sans-serif;">
${contenu}
</body>
</html>`;
}

// Template de bienvenue CORRECT
function getWelcomeTemplate(firstName) {
  return emailWrap(
    EMAIL_HEADER +
    emailBande('&#10003;', 'Bienvenue chez nous !', 'Votre compte a été créé avec succès') +
    `<tr>
          <td style="padding:28px 28px 8px; background:#ffffff;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
              Bonjour ${firstName},
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Nous sommes ravis de vous accueillir au sein de Jay's Creations Design. Votre compte a été créé avec succès et vous pouvez désormais profiter de tous nos services.
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Découvrez nos créations uniques et personnalisées qui rendront vos moments spéciaux encore plus mémorables.
            </div>
            ${emailCTA('https://www.jayscreationsdesign.fr/boutique', 'Explorer nos créations')}
          </td>
        </tr>` +
    EMAIL_MERCI +
    EMAIL_FOOTER
  );
}

// Template de confirmation de commande CORRECT
function getOrderConfirmationTemplate(orderData) {
  return emailWrap(
    EMAIL_HEADER +
    emailBande('&#10003;', 'Commande confirmée !', 'Nous avons bien reçu votre commande') +
    `<tr>
          <td style="padding:28px 28px 8px; background:#ffffff;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
              Bonjour ${orderData.firstName || 'Client'},
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Nous vous remercions pour votre confiance. Votre commande n°${orderData.orderNumber || 'N/A'} a été confirmée et est maintenant en préparation.
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#666; line-height:1.6; margin-bottom:20px;">
              Vous recevrez une notification dès que votre commande sera expédiée.
            </div>
            ${emailCTA('https://www.jayscreationsdesign.fr/mon-compte', 'Suivre ma commande')}
          </td>
        </tr>` +
    EMAIL_MERCI +
    EMAIL_FOOTER
  );
}

// Template de demande de devis CORRECT
function getQuoteRequestTemplate(quoteData) {
  return emailWrap(
    EMAIL_HEADER +
    emailBande('&#10003;', 'Nouvelle demande', 'Un client a demandé un devis personnalisé') +
    `<tr>
          <td style="padding:28px 28px 8px; background:#ffffff;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:18px; font-weight:600; color:#2C1A0E; margin-bottom:16px;">
              Nouvelle demande de devis
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; margin-bottom:22px;">
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
            ${emailCTA(`mailto:${quoteData.email}`, 'Répondre au client')}
          </td>
        </tr>` +
    EMAIL_MERCI +
    EMAIL_FOOTER
  );
}

// Données de test
const testData = {
  welcome: { firstName: 'Anais' },
  order: {
    orderNumber: 'CMD-2026-0413-001',
    firstName: 'Marie',
    email: 'marie@example.com'
  },
  quote: {
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    message: 'Devis pour mariage avec 15 tables de fleurs.'
  }
};

// Test avec le design CORRECT
async function testCorrectDesign() {
  console.log('=== TEST AVEC LE VRAI DESIGN email-template-base.ts ===');
  console.log('');
  
  try {
    await transporter.verify();
    console.log('Connexion SMTP OK');
    console.log('');
    
    // 1. Email de bienvenue
    console.log('1. Email de bienvenue (design correct)');
    const welcomeResult = await sendEmail({
      to: 'contact@jayscreationsdesign.fr',
      subject: 'Bienvenue chez Jay\'s Creations Design !',
      html: getWelcomeTemplate(testData.welcome.firstName)
    });
    
    // 2. Email de confirmation de commande
    console.log('2. Email de confirmation de commande (design correct)');
    const orderResult = await sendEmail({
      to: 'commande@jayscreationsdesign.fr',
      subject: 'Confirmation de votre commande - Jay\'s Creations Design',
      html: getOrderConfirmationTemplate(testData.order)
    });
    
    // 3. Email de demande de devis
    console.log('3. Email de demande de devis (design correct)');
    const quoteResult = await sendEmail({
      to: 'contact@jayscreationsdesign.fr',
      subject: 'Nouvelle demande de devis - Jay\'s Creations Design',
      html: getQuoteRequestTemplate(testData.quote)
    });
    
    console.log('');
    console.log('=== RÉSULTATS ===');
    console.log('Bienvenue:', welcomeResult.success ? 'OK' : 'ÉCHEC');
    console.log('Confirmation commande:', orderResult.success ? 'OK' : 'ÉCHEC');
    console.log('Demande devis:', quoteResult.success ? 'OK' : 'ÉCHEC');
    
    if (welcomeResult.success && orderResult.success && quoteResult.success) {
      console.log('');
      console.log('=== SUCCÈS ===');
      console.log('Emails envoyés avec le VRAI design de email-template-base.ts');
      console.log('');
      console.log('Caractéristiques du design correct:');
      console.log('- Header avec logo centré et police Great Vibes');
      console.log('- Footer avec réseaux sociaux et citation');
      console.log('- Bloc merci avec fond #2C1A0E');
      console.log('- Bande titre avec icônes &#10003;');
      console.log('- CTA avec bordures arrondies 30px');
      console.log('- Structure exacte du fichier original');
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

testCorrectDesign();
