// Test de l'envoi de notification admin lors de la création de compte
const nodemailer = require('nodemailer');

async function testAdminNotification() {
  console.log('???? TEST NOTIFICATION ADMIN CRÉATION COMPTE ?????');
  console.log('Admin: contact@jayscreationsdesign.fr');
  console.log('Nouveau client: mannefred.b@gmail.com (Mannefred)');
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

    // Template HTML de notification admin
    const adminHtmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau compte créé</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
        .alert { background: #28a745; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; font-weight: bold; }
        .info-box { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #8B4513; }
        .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">? Jay's Creations Design</div>
            <p>Nouveau compte client créé</p>
        </div>
        
        <div class="content">
            <div class="alert">
                ? NOUVEAU COMPTE CLIENT CRÉÉ
            </div>
            
            <h1 style="color: #8B4513; text-align: center; margin-bottom: 25px;">? Informations du nouveau client</h1>
            
            <div class="info-box">
                <p><strong>? Prénom:</strong> Mannefred</p>
                <p><strong>? Email:</strong> mannefred.b@gmail.com</p>
                <p><strong>? Date d'inscription:</strong> ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>? Heure:</strong> ${new Date().toLocaleTimeString('fr-FR')}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <p><strong>Actions recommandées:</strong></p>
                <p>? Envoyer un email de bienvenue personnalisé</p>
                <p>? Proposer une offre de bienvenue</p>
                <p>? Contacter le client si nécessaire</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Jay's Creations Design</strong></p>
            <p>Email automatique - ${new Date().toLocaleString('fr-FR')}</p>
        </div>
    </div>
</body>
</html>`;

    const mailOptions = {
      from: '"Jay\'s Creations Design" <contact@jayscreationsdesign.fr>',
      to: 'contact@jayscreationsdesign.fr',
      subject: '? Nouveau compte créé - Jay\'s Creations Design',
      html: adminHtmlContent
    };

    console.log('???? ENVOI DE LA NOTIFICATION ADMIN ?????');
    console.log('Destinataire admin: contact@jayscreationsdesign.fr');
    console.log('Sujet: Nouveau compte créé - Jay\'s Creations Design');
    console.log('Nouveau client: Mannefred (mannefred.b@gmail.com)\n');

    // Test de connexion
    console.log('???? TEST DE CONNEXION SMTP...');
    await transporter.verify();
    console.log('??? Connexion SMTP réussie !');

    // Envoi de la notification admin
    console.log('???? ENVOI DE LA NOTIFICATION ADMIN...');
    const result = await transporter.sendMail(mailOptions);
    
    console.log('\n????????????????????????????????????????????????????????????????????????????');
    console.log('???? NOTIFICATION ADMIN ENVOYÉE AVEC SUCCÈS ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('?? Destinataire admin: contact@jayscreationsdesign.fr');
    console.log('?? Message ID:', result.messageId);
    console.log('?? Sujet: Nouveau compte créé - Jay\'s Creations Design');
    console.log('?? Nouveau client: Mannefred');
    console.log('?? Email client: mannefred.b@gmail.com');
    console.log('?? Heure d\'envoi: ' + new Date().toLocaleString('fr-FR'));
    console.log('?? Service: Ionos SMTP');
    console.log('?? Statut: DELIVERED');
    console.log('????????????????????????????????????????????????????????????????????????????');
    console.log('???? Vous recevrez une notification admin pour chaque nouveau compte créé ! ?????');
    console.log('????????????????????????????????????????????????????????????????????????????\n');

    return {
      success: true,
      messageId: result.messageId,
      adminRecipient: 'contact@jayscreationsdesign.fr',
      clientInfo: {
        name: 'Mannefred',
        email: 'mannefred.b@gmail.com'
      },
      sentAt: new Date().toISOString(),
      service: 'Ionos SMTP'
    };

  } catch (error) {
    console.error('??? Erreur lors de l\'envoi de la notification admin:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Démarrer le test
testAdminNotification().then(result => {
  if (result.success) {
    console.log('???? SUCCÈS: Notification admin configurée et fonctionnelle ! ?????');
  } else {
    console.log('???? ÉCHEC: Problème avec l\'envoi de notification admin ?????');
  }
}).catch(error => {
  console.error('Erreur fatale:', error);
});
