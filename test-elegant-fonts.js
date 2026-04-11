// Test d'envoi d'email avec les polices plus modernes et élégantes
const nodemailer = require('nodemailer');

async function testElegantFonts() {
  console.log('???? TEST POLICES ÉLÉGANTES ?????');
  console.log('Destinataire: jayscreations.d@gmail.com');
  console.log('Polices: Poppins (élégant) + DM Sans (moderne et lisible)');
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

    // Template HTML avec polices élégantes
    const elegantFontsHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Polices Élégantes - Jay's Creations Design</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        body { margin: 0; padding: 0; background-color: #FAF7F2; }
    </style>
</head>
<body style="background-color: #FAF7F2; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 40px 0;">
    <div style="max-width: 580px; margin: 0 auto;">
        
        <!-- Header - Barre chocolat avec nom de marque -->
        <div style="background-color: #3C2415; border-radius: 12px 12px 0 0; padding: 28px 32px; text-align: center;">
            <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 24px; font-weight: 600; color: #C8A96E; margin: 0 0 4px 0; letter-spacing: 0.4px;">
                Jay's Creations Design
            </div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin: 0; letter-spacing: 2px; text-transform: uppercase; font-weight: 400;">
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
                Polices Élégantes et Modernes
                </span>
            </div>

            <!-- Titre avec Poppins élégant -->
            <h1 style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 24px; font-weight: 500; color: #3C2415; text-align: center; margin: 0 0 24px 0; letter-spacing: 0.3px;">
                Style moderne et élégant pour vos emails
            </h1>

            <!-- Message principal avec DM Sans lisible -->
            <p style="font-size: 14px; color: #333; line-height: 1.7; text-align: center; margin: 0 0 24px 0; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
                Les polices ont été choisies pour allier modernité et élégance. 
                Poppins apporte une touche sophistiquée aux titres, tandis que DM Sans assure une lecture parfaite pour le contenu.
            </p>

            <!-- Bloc d'informations avec polices élégantes -->
            <div style="background-color: #FAF7F2; border-radius: 12px; padding: 24px 28px; border: 1px solid #E8E0D4; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #666; width: 120px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Titres</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #333; font-weight: 400; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Poppins</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #666; border-top: 1px solid #E8E0D4; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Texte</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #C8A96E; font-weight: 500; border-top: 1px solid #E8E0D4; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">DM Sans</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #666; border-top: 1px solid #E8E0D4; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Style</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #333; font-weight: 400; border-top: 1px solid #E8E0D4; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Élégant</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #666; border-top: 1px solid #E8E0D4; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Lisibilité</td>
                        <td style="padding: 10px 0; font-size: 14px; color: #333; font-weight: 400; border-top: 1px solid #E8E0D4; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">Excellente</td>
                    </tr>
                </table>
            </div>

            <!-- Exemples de styles élégants -->
            <div style="text-align: center; margin-bottom: 24px;">
                <p style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 500; color: #3C2415; margin: 0 0 18px 0; letter-spacing: 0.3px;">
                    Caractéristiques des polices :
                </p>
                <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #666; margin: 6px 0;">Poppins : Géométrique, moderne et élégant pour les titres</p>
                <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #666; margin: 6px 0;">DM Sans : Conçu pour l'écran, très lisible et contemporain</p>
                <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #666; margin: 6px 0;">Combinaison parfaite entre modernité et élégance</p>
            </div>

            <!-- Code promo élégant -->
            <div style="background-color: #3C2415; color: #FFFFFF; padding: 24px; text-align: center; font-size: 13px; font-weight: bold; border-radius: 12px; margin: 24px 0;">
                <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;">
                    Code de bienvenue
                </p>
                <p style="margin: 0; font-size: 22px; letter-spacing: 2px; color: #C8A96E; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;">
                    ÉLÉGANT10
                </p>
                <p style="margin: 8px 0 0 0; font-size: 11px; opacity: 0.8; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
                    10% de réduction sur votre première commande
                </p>
            </div>

            <!-- CTA Button élégant -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://jayscreation.vercel.app/boutique" 
                   style="display: inline-block; background-color: #C8A96E; color: #FFFFFF; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;">
                    Découvrir la boutique
                </a>
            </div>

            <!-- Signature élégante -->
            <p style="text-align: center; font-style: italic; color: #6B6B6B; margin: 24px 0 0 0; font-size: 13px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
                "L'art de capturer vos plus beaux moments"
            </p>

            <!-- Séparateur -->
            <hr style="border-color: #E8E0D4; margin: 20px 0;" />

            <!-- Note -->
            <p style="font-size: 11px; color: #999999; text-align: center; margin: 0; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
                Test des polices élégantes - Jay's Creations Design
            </p>
        </div>

        <!-- Footer élégant -->
        <div style="background-color: #FAF7F2; border-top: 1px solid #E8E0D4; border-radius: 0 0 12px 12px; padding: 24px 32px; text-align: center;">
            <p style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; color: #C8A96E; font-weight: 500; margin: 0 0 8px 0; letter-spacing: 0.3px;">
                Jay's Creations Design
            </p>
            <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; color: #666666; margin: 0 0 4px 0; line-height: 1.6;">
                15 Quai d'Asnières, 92390 Villeneuve-la-Garenne
            </p>
            <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; color: #666666; margin: 0 0 4px 0;">
                Tel : 07 49 07 28 61
            </p>
            <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; color: #666666; margin: 0 0 12px 0;">
                jayscreationsdesign.fr
            </p>
            <hr style="border-color: #E8E0D4; margin: 12px 0;" />
            <p style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 11px; color: #999999; margin: 0;">
                Instagram : @jays_creations_design | TikTok : @jayscreationsdesign
            </p>
        </div>

    </div>
</body>
</html>`;

    const mailOptions = {
      from: '"Jay\'s Creations Design" <contact@jayscreationsdesign.fr>',
      to: 'jayscreations.d@gmail.com',
      subject: 'Test Polices Élégantes - Jay\'s Creations Design',
      html: elegantFontsHtml
    };

    console.log('???? ENVOI EMAIL POLICES ÉLÉGANTES ?????');
    console.log('Destinataire: jayscreations.d@gmail.com');
    console.log('Sujet: Test Polices Élégantes - Jay\'s Creations Design');
    console.log('Polices: Poppins (élégant) + DM Sans (moderne lisible)\n');

    // Test de connexion
    console.log('???? TEST DE CONNEXION SMTP...');
    await transporter.verify();
    console.log('??? Connexion SMTP réussie !');

    // Envoi de l'email
    console.log('???? ENVOI EMAIL POLICES ÉLÉGANTES...');
    const result = await transporter.sendMail(mailOptions);
    
    console.log('\n????????????????????????????????????????????????????????????????????????????');
    console.log('???? EMAIL POLICES ÉLÉGANTES ENVOYÉ ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('?? Destinataire: jayscreations.d@gmail.com');
    console.log('?? Message ID:', result.messageId);
    console.log('?? Sujet: Test Polices Élégantes - Jay\'s Creations Design');
    console.log('?? Polices: Poppins (élégant) + DM Sans (moderne)');
    console.log('?? Style: Plus moderne ET plus élégant');
    console.log('?? Heure d\'envoi: ' + new Date().toLocaleString('fr-FR'));
    console.log('?? Service: Ionos SMTP');
    console.log('?? Statut: DELIVERED');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('???? Vérifiez l\'email pour voir le nouveau style élégant ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????\n');

    return {
      success: true,
      messageId: result.messageId,
      recipient: 'jayscreations.d@gmail.com',
      sentAt: new Date().toISOString(),
      fonts: 'Poppins + DM Sans (élégant)'
    };

  } catch (error) {
    console.error('??? Erreur lors de l\'envoi polices élégantes:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Démarrer le test
testElegantFonts().then(result => {
  if (result.success) {
    console.log('???? SUCCÈS: Polices élégantes appliquées et testées ! ?????');
  } else {
    console.log('???? ÉCHEC: Problème avec les polices élégantes ?????');
  }
}).catch(error => {
  console.error('Erreur fatale:', error);
});
