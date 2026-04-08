// Script simple pour envoyer un email de bienvenue à mannefred.b@gmail.com
// Utilise une approche directe avec nodemailer et configuration temporaire

const nodemailer = require('nodemailer');

async function sendWelcomeEmail() {
  try {
    // Configuration du transporteur avec un service SMTP gratuit pour tester
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com', // À configurer
        pass: 'test-password'    // À configurer
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
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 30px 0; background: #8B4513; color: white; border-radius: 10px 10px 0 0; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { background: #FAF7F2; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 2px solid #8B4513; border-top: none; }
            .cta { display: inline-block; background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 25px 0; font-weight: bold; transition: all 0.3s; }
            .cta:hover { background: #6b3410; transform: scale(1.05); }
            .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B4513; }
            .discount { background: linear-gradient(135deg, #8B4513, #D4A574); color: white; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 30px 20px; font-size: 12px; color: #6B6B6B; border-top: 1px solid #E8E4DF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">? Jay's Creations Design</div>
              <p>Votre partenaire pour des créations uniques</p>
            </div>
            
            <div class="content">
              <h1 style="color: #8B4513; margin-bottom: 20px;">Bienvenue Mannefred ! ?</h1>
              <p style="font-size: 16px; margin-bottom: 20px;">Nous sommes absolument ravis de vous accueillir dans la famille Jay's Creations Design ! Merci de votre confiance et de votre intérêt pour nos créations artisanales.</p>
              
              <div class="features">
                <h3 style="color: #8B4513; margin-bottom: 15px;">? Ce qui vous attend :</h3>
                <ul style="line-height: 1.8;">
                  <li>? <strong>Des faire-parts personnalisés</strong> uniques comme vous</li>
                  <li>? <strong>Des thèmes originaux</strong> pour chaque occasion</li>
                  <li>? <strong>Une qualité artisanale</strong> made in France</li>
                  <li>? <strong>Un service client</strong> à votre écoute</li>
                </ul>
              </div>
              
              <div class="discount">
                ? CODE DE BIENVENUE ?<br>
                <span style="font-size: 24px;">BIENVENUE10</span><br>
                <small>10% de réduction sur votre première commande</small>
              </div>
              
              <p style="text-align: center; margin: 25px 0;">
                <a href="https://jayscreation.vercel.app/boutique" class="cta">
                  ?? Découvrir la boutique
                </a>
              </p>
              
              <p style="text-align: center; font-style: italic; color: #6B6B6B;">
                "L'art de capturer vos plus beaux moments"
              </p>
            </div>
            
            <div class="footer">
              <p><strong>Jay's Creations Design</strong></p>
              <p>Créations uniques pour moments précieux</p>
              <p style="margin-top: 10px; font-size: 11px;">Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: '"Jay\'s Creations Design" <contact@jayscreationsdesign.fr>',
      to: 'mannefred.b@gmail.com',
      subject: 'Bienvenue chez Jay\'s Creations Design !',
      html: htmlContent
    };

    console.log('Tentative d\'envoi de l\'email de bienvenue à mannefred.b@gmail.com...');
    
    // Pour l'instant, affichons juste les détails sans envoyer réellement
    console.log('Email destiné à:', 'mannefred.b@gmail.com');
    console.log('Sujet:', 'Bienvenue chez Jay\'s Creations Design !');
    console.log('Template HTML généré avec succès');
    console.log('Longueur du HTML:', htmlContent.length, 'caractères');
    
    // Simulation d'envoi réussi
    console.log('? Email de bienvenue prêt à être envoyé à mannefred.b@gmail.com');
    console.log('? Contenu: Bienvenue Mannefred avec code BIENVENUE10');
    console.log('? Lien boutique: https://jayscreation.vercel.app/boutique');
    
    return { success: true, message: 'Email de bienvenue préparé avec succès' };
    
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, error: error.message };
  }
}

sendWelcomeEmail().then(result => {
  console.log('Résultat:', result);
}).catch(error => {
  console.error('Erreur fatale:', error);
});
