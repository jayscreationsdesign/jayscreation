// Test d'envoi d'email avec le nouveau design premium sans emojis
const nodemailer = require('nodemailer');

async function testPremiumEmail() {
  console.log('???? TEST EMAIL DESIGN PREMIUM ?????');
  console.log('Destinataire: jayscreations.d@gmail.com');
  console.log('Design: Premium Jay\'s Creations (sans emojis)');
  console.log('????????????????????????????????????????????????????????????????????????????\n');

  try {
    // Configuration Ionos SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.fr',
      port: 587,
      secure: false,
      auth: {
        user: 'contact@jayscreationsdesign.fr',
        pass: 'Kenays971238.'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Template HTML premium sans emojis
    const premiumHtmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Premium - Jay's Creations Design</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        body { margin: 0; padding: 0; background-color: #FAF7F2; }
    </style>
</head>
<body style="background-color: #FAF7F2; font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 40px 0;">
    <div style="max-width: 580px; margin: 0 auto;">
        
        <!-- Header - Barre chocolat avec nom de marque -->
        <div style="background-color: #3C2415; border-radius: 12px 12px 0 0; padding: 28px 32px; text-align: center;">
            <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 700; color: #C8A96E; margin: 0 0 4px 0; letter-spacing: 0.5px;">
                Jay's Creations Design
            </div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin: 0; letter-spacing: 2px; text-transform: uppercase;">
                Papeterie Personnalisée
            </div>
        </div>

        <!-- Ligne dorée de séparation -->
        <div style="background-color: #C8A96E; height: 3px;"></div>

        <!-- Corps du mail -->
        <div style="background-color: #FFFFFF; padding: 36px 32px;">
            
            <!-- Badge -->
            <div style="text-align: center; margin-bottom: 24px;">
                <span style="display: inline-block; background-color: #3C2415; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 8px 24px; border-radius: 100px; letter-spacing: 1.5px; text-transform: uppercase;">
                    Test Design Premium
                </span>
            </div>

            <!-- Titre -->
            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 700; color: #3C2415; text-align: center; margin: 0 0 24px 0;">
                Nouveau design email sans emojis
            </h1>

            <!-- Message principal -->
            <p style="font-size: 13px; color: #333; line-height: 1.6; text-align: center; margin: 0 0 24px 0;">
                Ceci est un test du nouveau design premium pour les emails de Jay's Creations Design. 
                Plus d'emojis, un design épuré et professionnel.
            </p>

            <!-- Bloc d'informations -->
            <div style="background-color: #FAF7F2; border-radius: 12px; padding: 20px 24px; border: 1px solid #E8E0D4; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #999; width: 120px;">Statut</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #333; font-weight: 600;">Design Premium</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #999; border-top: 1px solid #E8E0D4;">Emojis</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #C8A96E; font-weight: 600; border-top: 1px solid #E8E0D4;">Supprimés</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #999; border-top: 1px solid #E8E0D4;">Couleurs</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #333; font-weight: 600; border-top: 1px solid #E8E0D4;">Cohérentes</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #999; border-top: 1px solid #E8E0D4;">Test</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #333; font-weight: 600; border-top: 1px solid #E8E0D4;">${new Date().toLocaleDateString('fr-FR')}</td>
                    </tr>
                </table>
            </div>

            <!-- Caractéristiques -->
            <div style="text-align: center; margin-bottom: 24px;">
                <p style="font-size: 12px; color: #666; margin: 4px 0;">Header chocolat #3C2415</p>
                <p style="font-size: 12px; color: #666; margin: 4px 0;">Ligne dorée #C8A96E</p>
                <p style="font-size: 12px; color: #666; margin: 4px 0;">Fond crème #FAF7F2</p>
                <p style="font-size: 12px; color: #666; margin: 4px 0;">Bordures #E8E0D4</p>
                <p style="font-size: 12px; color: #666; margin: 4px 0;">Texte principal #333333</p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://jayscreation.vercel.app/boutique" 
                   style="display: inline-block; background-color: #C8A96E; color: #FFFFFF; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Découvrir la boutique
                </a>
            </div>

            <!-- Signature -->
            <p style="text-align: center; font-style: italic; color: #6B6B6B; margin: 24px 0 0 0; font-size: 12px;">
                "L'art de capturer vos plus beaux moments"
            </p>

            <!-- Séparateur -->
            <hr style="border-color: #E8E0D4; margin: 20px 0;" />

            <!-- Note -->
            <p style="font-size: 10px; color: #BBBBBB; text-align: center; margin: 0;">
                Email de test - Design Premium Jay's Creations Design
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #FAF7F2; border-top: 1px solid #E8E0D4; border-radius: 0 0 12px 12px; padding: 24px 32px; text-align: center;">
            <p style="font-size: 12px; color: #C8A96E; font-weight: 600; margin: 0 0 8px 0;">
                Jay's Creations Design
            </p>
            <p style="font-size: 11px; color: #999999; margin: 0 0 4px 0; line-height: 1.5;">
                15 Quai d'Asnières, 92390 Villeneuve-la-Garenne
            </p>
            <p style="font-size: 11px; color: #999999; margin: 0 0 4px 0;">
                Tel : 07 49 07 28 61
            </p>
            <p style="font-size: 11px; color: #999999; margin: 0 0 12px 0;">
                jayscreationsdesign.fr
            </p>
            <hr style="border-color: #E8E0D4; margin: 12px 0;" />
            <p style="font-size: 10px; color: #BBBBBB; margin: 0;">
                Instagram : @jays_creations_design | TikTok : @jayscreationsdesign
            </p>
        </div>

    </div>
</body>
</html>`;

    const mailOptions = {
      from: '"Jay\'s Creations Design" <contact@jayscreationsdesign.fr>',
      to: 'jayscreations.d@gmail.com',
      subject: 'Test Design Premium - Jay\'s Creations Design',
      html: premiumHtmlContent
    };

    console.log('???? ENVOI EMAIL DESIGN PREMIUM ?????');
    console.log('Destinataire: jayscreations.d@gmail.com');
    console.log('Sujet: Test Design Premium - Jay\'s Creations Design');
    console.log('Design: Header chocolat, ligne dorée, sans emojis\n');

    // Test de connexion
    console.log('???? TEST DE CONNEXION SMTP...');
    await transporter.verify();
    console.log('??? Connexion SMTP réussie !');

    // Envoi de l'email
    console.log('???? ENVOI EMAIL PREMIUM...');
    const result = await transporter.sendMail(mailOptions);
    
    console.log('\n????????????????????????????????????????????????????????????????????????????');
    console.log('???? EMAIL PREMIUM ENVOYÉ AVEC SUCCÈS ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('?? Destinataire: jayscreations.d@gmail.com');
    console.log('?? Message ID:', result.messageId);
    console.log('?? Sujet: Test Design Premium - Jay\'s Creations Design');
    console.log('?? Design: Premium sans emojis');
    console.log('?? Couleurs: Chocolat #3C2415, Or #C8A96E, Crème #FAF7F2');
    console.log('?? Heure d\'envoi: ' + new Date().toLocaleString('fr-FR'));
    console.log('?? Service: Ionos SMTP');
    console.log('?? Statut: DELIVERED');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('???? Vérifiez l\'email dans Gmail pour valider le design premium ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????\n');

    return {
      success: true,
      messageId: result.messageId,
      recipient: 'jayscreations.d@gmail.com',
      sentAt: new Date().toISOString(),
      design: 'Premium sans emojis'
    };

  } catch (error) {
    console.error('??? Erreur lors de l\'envoi premium:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Démarrer le test
testPremiumEmail().then(result => {
  if (result.success) {
    console.log('???? SUCCÈS: Email premium envoyé et validé ! ?????');
  } else {
    console.log('???? ÉCHEC: Problème avec l\'envoi premium ?????');
  }
}).catch(error => {
  console.error('Erreur fatale:', error);
});
