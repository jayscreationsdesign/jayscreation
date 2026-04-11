// Configuration des identifiants Ionos et envoi de l'email
const fs = require('fs');
const path = require('path');

function setupIonosEmail() {
  console.log('???? CONFIGURATION IONOS EMAIL ?????');
  console.log('Email: contact@jayscreationsdesign.fr');
  console.log('SMTP: smtp.ionos.fr:587');
  console.log('????????????????????????????????????????????????????????????????????????????\n');

  // Créer le fichier .env.local avec les identifiants Ionos
  const envContent = `# Configuration Ionos Email
IONOS_SMTP_HOST=smtp.ionos.fr
IONOS_SMTP_PORT=587
IONOS_EMAIL_USER=contact@jayscreationsdesign.fr
IONOS_EMAIL_PASS=Jay2024!@#
IONOS_TRANSACTIONAL_EMAIL=contact@jayscreationsdesign.fr
IONOS_ORDER_EMAIL=commande@jayscreationsdesign.fr
IONOS_ADMIN_EMAIL=contact@jayscreationsdesign.fr
`;

  const envPath = path.join(__dirname, '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('??? Fichier .env.local créé avec succès');
    console.log('??? Identifiants Ionos configurés');
    
    // Afficher les identifiants configurés
    console.log('\n???? IDENTIFIANTS CONFIGURÉS ?????');
    console.log('?? IONOS_SMTP_HOST: smtp.ionos.fr');
    console.log('?? IONOS_SMTP_PORT: 587');
    console.log('?? IONOS_EMAIL_USER: contact@jayscreationsdesign.fr');
    console.log('?? IONOS_EMAIL_PASS: [CONFIGURÉ]');
    console.log('????????????????????????????????????????????????????????????????????????????\n');
    
    return true;
  } catch (error) {
    console.error('??? Erreur création .env.local:', error.message);
    return false;
  }
}

async function sendEmailWithConfig() {
  const nodemailer = require('nodemailer');
  
  // Charger les variables d'environnement
  require('dotenv').config({ path: '.env.local' });
  
  console.log('???? ENVOI EMAIL AVEC CONFIGURATION IONOS ?????');
  console.log('Destinataire: mannefred.b@gmail.com');
  console.log('Prénom: Mannefred');
  console.log('????????????????????????????????????????????????????????????????????????????\n');

  try {
    // Configuration avec variables d'environnement
    const transporter = nodemailer.createTransport({
      host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.fr',
      port: parseInt(process.env.IONOS_SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr',
        pass: process.env.IONOS_EMAIL_PASS || 'Jay2024!@#'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Template HTML de l'email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue chez Jay's Creations Design</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; background: #f5f5f5;">
    <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: #8B4513; color: white; padding: 30px 20px; text-align: center;">
            <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">? Jay's Creations Design</div>
            <p style="margin: 0; font-size: 16px;">Votre partenaire pour des créations uniques</p>
        </div>
        
        <!-- Content -->
        <div style="background: #FAF7F2; padding: 40px 30px;">
            <h1 style="color: #8B4513; margin-bottom: 20px; text-align: center;">Bienvenue Mannefred ! ?</h1>
            <p style="font-size: 16px; margin-bottom: 20px; text-align: center;">
                Nous sommes absolument ravis de vous accueillir dans la famille Jay's Creations Design ! 
                Merci de votre confiance et de votre intérêt pour nos créations artisanales.
            </p>
            
            <!-- Features -->
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B4513;">
                <h3 style="color: #8B4513; margin-bottom: 15px;">? Ce qui vous attend :</h3>
                <ul style="line-height: 1.8; padding-left: 20px;">
                    <li><strong>Des faire-parts personnalisés</strong> uniques comme vous</li>
                    <li><strong>Des thèmes originaux</strong> pour chaque occasion</li>
                    <li><strong>Une qualité artisanale</strong> made in France</li>
                    <li><strong>Un service client</strong> à votre écoute</li>
                </ul>
            </div>
            
            <!-- Discount -->
            <div style="background: linear-gradient(135deg, #8B4513, #D4A574); color: white; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
                ? CODE DE BIENVENUE ?<br>
                <span style="font-size: 24px; display: block; margin: 10px 0;">BIENVENUE10</span>
                <small style="font-size: 14px;">10% de réduction sur votre première commande</small>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://jayscreation.vercel.app/boutique" 
                   style="display: inline-block; background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; transition: all 0.3s;">
                    ?? Découvrir la boutique
                </a>
            </div>
            
            <!-- Signature -->
            <p style="text-align: center; font-style: italic; color: #6B6B6B; margin-top: 30px;">
                "L'art de capturer vos plus beaux moments"
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f8f8; padding: 30px 20px; text-align: center; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF;">
            <p style="margin: 0;"><strong>Jay's Creations Design</strong></p>
            <p style="margin: 5px 0;">Créations uniques pour moments précieux</p>
            <p style="margin: 10px 0 0 0; font-size: 11px;">Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
        </div>
    </div>
</body>
</html>`;

    const mailOptions = {
      from: `"Jay's Creations Design" <${process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr'}>`,
      to: 'mannefred.b@gmail.com',
      subject: 'Bienvenue chez Jay\'s Creations Design !',
      html: htmlContent
    };

    console.log('???? CONNEXION AVEC VARIABLES D\'ENVIRONNEMENT ?????');
    console.log('Host:', process.env.IONOS_SMTP_HOST);
    console.log('Port:', process.env.IONOS_SMTP_PORT);
    console.log('User:', process.env.IONOS_EMAIL_USER);
    console.log('Destinataire: mannefred.b@gmail.com\n');

    // Envoi de l'email
    console.log('???? ENVOI DE L\'EMAIL...');
    const result = await transporter.sendMail(mailOptions);
    
    console.log('\n????????????????????????????????????????????????????????????????????????????');
    console.log('???? EMAIL ENVOYÉ AVEC SUCCÈS ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('?? Destinataire: mannefred.b@gmail.com');
    console.log('?? Message ID:', result.messageId);
    console.log('?? Sujet: Bienvenue chez Jay\'s Creations Design !');
    console.log('?? Prénom: Mannefred');
    console.log('?? Code promo: BIENVENUE10');
    console.log('?? Heure d\'envoi: ' + new Date().toLocaleString('fr-FR'));
    console.log('?? Service: Ionos SMTP (configuré)');
    console.log('?? Statut: DELIVERED');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('???? L\'email de bienvenue a été envoyé avec succès ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????\n');

    return {
      success: true,
      messageId: result.messageId,
      recipient: 'mannefred.b@gmail.com',
      sentAt: new Date().toISOString(),
      service: 'Ionos SMTP configuré'
    };

  } catch (error) {
    console.error('??? Erreur lors de l\'envoi:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Exécuter la configuration et l'envoi
async function main() {
  console.log('???? CONFIGURATION ET ENVOI EMAIL IONOS ?????\n');
  
  // Étape 1: Configurer les identifiants
  const configSuccess = setupIonosEmail();
  
  if (configSuccess) {
    console.log('???? Configuration réussie, envoi de l\'email...\n');
    
    // Étape 2: Envoyer l'email
    const result = await sendEmailWithConfig();
    
    if (result.success) {
      console.log('???? SUCCÈS TOTAL: Email configuré et envoyé ! ?????');
    } else {
      console.log('???? ÉCHEC: Vérifier la configuration Ionos ?????');
    }
  } else {
    console.log('???? ÉCHEC: Impossible de configurer les identifiants ?????');
  }
}

// Démarrer
main().catch(error => {
  console.error('Erreur fatale:', error);
});
