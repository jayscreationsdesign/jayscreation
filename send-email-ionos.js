// Envoi d'email avec Ionos SMTP
const nodemailer = require('nodemailer');

async function sendEmailWithIonos() {
  console.log('???? ENVOI EMAIL AVEC IONOS SMTP ?????');
  console.log('Destinataire: mannefred.b@gmail.com');
  console.log('Prénom: Mannefred');
  console.log('????????????????????????????????????????????????????????????????????????????\n');

  try {
    // Configuration Ionos SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.fr',
      port: 587,
      secure: false,
      auth: {
        user: 'contact@jayscreationsdesign.fr',
        pass: 'Jay2024!@#' // Mot de passe à configurer
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Template HTML de l'email de bienvenue
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
      from: '"Jay\'s Creations Design" <contact@jayscreationsdesign.fr>',
      to: 'mannefred.b@gmail.com',
      subject: 'Bienvenue chez Jay\'s Creations Design !',
      html: htmlContent
    };

    console.log('???? CONNEXION À IONOS SMTP ?????');
    console.log('Serveur: smtp.ionos.fr:587');
    console.log('Email: contact@jayscreationsdesign.fr');
    console.log('Destinataire: mannefred.b@gmail.com');
    console.log('Sujet: Bienvenue chez Jay\'s Creations Design !\n');

    // Test de connexion
    console.log('???? TEST DE CONNEXION SMTP...');
    await transporter.verify();
    console.log('??? Connexion SMTP réussie !');

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
    console.log('?? Service: Ionos SMTP');
    console.log('?? Statut: DELIVERED');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('???? L\'email de bienvenue a été envoyé avec succès à mannefred.b@gmail.com ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????\n');

    return {
      success: true,
      messageId: result.messageId,
      recipient: 'mannefred.b@gmail.com',
      sentAt: new Date().toISOString(),
      service: 'Ionos SMTP'
    };

  } catch (error) {
    console.error('??? Erreur lors de l\'envoi avec Ionos:', error.message);
    
    if (error.message.includes('Invalid login') || error.message.includes('Authentication failed')) {
      console.log('\n???? DIAGNOSTIC: Problème d\'authentification Ionos');
      console.log('???? Solution: Vérifier les identifiants contact@jayscreationsdesign.fr');
      console.log('???? Action: Configurer le bon mot de passe dans Ionos');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n???? DIAGNOSTIC: Problème de connexion au serveur SMTP');
      console.log('???? Solution: Vérifier l\'accès au serveur smtp.ionos.fr');
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Démarrer l'envoi
sendEmailWithIonos().then(result => {
  if (result.success) {
    console.log('???? SUCCÈS TOTAL: Email de bienvenue envoyé ! ?????');
  } else {
    console.log('???? ÉCHEC: Vérifier la configuration Ionos SMTP ?????');
  }
}).catch(error => {
  console.error('Erreur fatale:', error);
});
