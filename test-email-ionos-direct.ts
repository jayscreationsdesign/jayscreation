import nodemailer from 'nodemailer';

// Configuration directe avec les identifiants Ionos
async function testEmailIonosDirect() {
  console.log('???? Test d\'envoi d\'email direct avec Ionos...\n');

  try {
    // Configuration du transporteur SMTP Ionos avec identifiants directs
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.fr',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'contact@jayscreationsdesign.fr',
        pass: 'Jay2024!@#',
      },
    });

    // Vérifier la connexion
    await transporter.verify();
    console.log('???? Connexion SMTP réussie');

    // Email de test pour anais.manne@gmail.com
    const mailOptions = {
      from: `"Jay's Creations Design" <contact@jayscreationsdesign.fr>`,
      to: 'anais.manne@gmail.com',
      subject: '???? Test de confirmation d\'email - Jay\'s Creations Design',
      html: `
        <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F2;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3C2415; font-family: 'Poppins', sans-serif; font-weight: 600; margin: 0;">
              Jay's Creations Design
            </h1>
            <p style="color: #C8A96E; font-family: 'DM Sans', sans-serif; margin: 5px 0;">
              Créations sur mesure pour vos moments précieux
            </p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3C2415; font-family: 'Poppins', sans-serif; font-weight: 500; margin-bottom: 20px;">
              ???? Test de confirmation d'email
            </h2>
            
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
              Bonjour Anais,
            </p>
            
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
              Ceci est un test pour vérifier que l'envoi d'emails fonctionne correctement avec la configuration SMTP Ionos.
            </p>
            
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
              Si vous recevez cet email, cela signifie que le système d'emails est opérationnel et que les emails de confirmation de compte devraient fonctionner.
            </p>
            
            <div style="background-color: #F5F3EF; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="color: #3C2415; font-family: 'DM Sans', sans-serif; margin: 0; font-size: 14px;">
                <strong>Détails du test :</strong><br>
                Date : ${new Date().toLocaleString('fr-FR')}<br>
                Destinataire : anais.manne@gmail.com<br>
                Serveur SMTP : smtp.ionos.fr:587
              </p>
            </div>
            
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 30px;">
              Une question ? Répondez directement à cet email.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://jayscreation.vercel.app" style="display: inline-block; background-color: #3C2415; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-family: 'Poppins', sans-serif; font-weight: 500;">
                Visiter la boutique
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8E0D4;">
            <p style="color: #999999; font-family: 'DM Sans', sans-serif; font-size: 12px; margin: 0;">
              Jay's Creations Design © 2026 - Tous droits réservés
            </p>
          </div>
        </div>
      `,
    };

    // Envoyer l'email
    const result = await transporter.sendMail(mailOptions);
    
    console.log('\n???? Email envoyé avec succès !');
    console.log('Message ID:', result.messageId);
    console.log('Réponse:', result.response);
    
    return { success: true, messageId: result.messageId };

  } catch (error: any) {
    console.error('\n???? Erreur lors de l\'envoi de l\'email:');
    console.error('Erreur:', error.message);
    
    if (error.code) {
      console.error('Code erreur:', error.code);
    }
    
    if (error.command) {
      console.error('Commande:', error.command);
    }
    
    return { success: false, error: error.message };
  }
}

// Exécuter le test
testEmailIonosDirect()
  .then(result => {
    if (result.success) {
      console.log('\n???? Test terminé avec succès !');
      console.log('???? L\'email devrait arriver dans quelques instants à anais.manne@gmail.com');
    } else {
      console.log('\n???? Test échoué !');
    }
  })
  .catch((error: any) => {
    console.error('Erreur inattendue:', error.message);
  });
