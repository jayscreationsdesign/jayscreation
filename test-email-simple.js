// Script de test simple pour l'envoi d'email
const nodemailer = require('nodemailer');

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.fr',
  port: parseInt(process.env.IONOS_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.IONOS_EMAIL_USER,
    pass: process.env.IONOS_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Template HTML de test avec logo
const emailTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background:#FFF8F0; font-family:'Inter',Arial,sans-serif;">

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
                  <img src="https://jayscreationsdesign.fr/images/logo/logo_final.png" 
                       width="138" height="138" 
                       style="border-radius:69px; display:block; margin:0 auto; border:0;" 
                       alt="Jay's Creations Design"
                       onerror="this.onerror=null; this.src='https://jayscreationsdesign.fr/images/logo/logo.png';" />
                </td>
              </tr>
            </table>
            <div style="font-family:'Great Vibes',cursive; font-size:42px; font-weight:400; color:#2C1A0E; letter-spacing:2px; margin-bottom:6px; line-height:1.2;">Jay's Creations Design</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; color:#D4A574; letter-spacing:3px; text-transform:uppercase; font-weight:500;">Créations uniques pour moments précieux</div>
          </td>
        </tr>

        <!-- CONTENU -->
        <tr>
          <td style="padding:28px; background:#ffffff;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; font-weight:600; color:#2C1A0E; margin-bottom:16px; text-align:center;">
              &#10003; Test d'Email de Confirmation
            </div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:15px; color:#2C1A0E; line-height:1.6; margin-bottom:20px;">
              Ceci est un test pour vérifier que le logo s'affiche correctement dans les emails.
            </div>
            <div style="background:#FFF8F0; border-radius:10px; border:1px solid #E8E4DF; padding:20px; margin-bottom:20px;">
              <div style="font-family:'Playfair Display',Georgia,serif; font-size:16px; font-weight:600; color:#2C1A0E; margin-bottom:12px;">
                Informations de test :
              </div>
              <div style="font-family:'Inter',Arial,sans-serif; font-size:14px; color:#2C1A0E;">
                - Date: ${new Date().toLocaleDateString('fr-FR')}<br>
                - Heure: ${new Date().toLocaleTimeString('fr-FR')}<br>
                - Logo URL: https://jayscreationsdesign.fr/images/logo/logo_final.png
              </div>
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#FFF8F0; padding:22px 28px; text-align:center; border-top:1px solid #E8E4DF;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:15px; font-weight:600; color:#2C1A0E; margin-bottom:5px;">Jay's Creations Design</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; color:#aaa; margin-bottom:8px;">contact@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23</div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:11px; color:#2C1A0E; font-style:italic; margin-top:10px;">"L'art de capturer vos plus beaux moments"</div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;

async function sendTestEmail() {
  try {
    console.log('Envoi de l\'email de test...');
    
    const info = await transporter.sendMail({
      from: `"Jay's Creations Design" <${process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr'}>`,
      to: 'commande@jayscreationsdesign.fr',
      subject: 'TEST - Email de confirmation avec logo',
      html: emailTemplate
    });

    console.log('Email envoyé avec succès !');
    console.log('Message ID:', info.messageId);
    console.log('Vérifiez votre boîte de réception commande@jayscreationsdesign.fr');
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
  }
}

sendTestEmail();
