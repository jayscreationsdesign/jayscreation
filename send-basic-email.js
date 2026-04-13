// Script pour envoyer un email ultra-simple et basique
// Exécuter avec: node send-basic-email.js

require('dotenv').config({ path: '.env.local' });

async function sendBasicEmail() {
  try {
    console.log('=== ENVOI EMAIL ULTRA-SIMPLE ===\n');

    // Importer les fonctions d'email
    const { sendEmail } = require('./src/lib/email.ts');

    // Données de commande
    const orderData = {
      id: 'JCD-' + Date.now(),
      client_nom: 'Anais Manne',
      client_email: 'anais.manne@gmail.com',
      total: 29.90,
      articles: [
        { 
          nom: 'Cadre Personnalisé Romantique', 
          quantite: 1, 
          prix: 29.90
        }
      ],
      created_at: new Date().toISOString()
    };

    console.log('Données commande:');
    console.log('- Client:', orderData.client_nom);
    console.log('- Email:', orderData.client_email);
    console.log('- Total:', orderData.total + 'â?¬');

    // Email HTML ultra-simple et basique
    const emailHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
          
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border: 1px solid #ddd;">
            
            <div style="text-align: center; padding: 20px; background-color: #8B4513; color: white; margin: -30px -30px 30px -30px;">
              <h1 style="margin: 0; font-size: 24px;">Jay's Creations Design</h1>
              <p style="margin: 5px 0 0;">Confirmation de commande</p>
            </div>
            
            <h2 style="color: #333; text-align: center;">Commande Confirmée !</h2>
            
            <p style="text-align: center; font-size: 16px;">
              Bonjour <strong>${orderData.client_nom}</strong>,<br>
              Votre commande n°${orderData.id} est confirmée.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #8B4513;">
              <h3 style="color: #8B4513; margin-top: 0;">Récapitulatif de votre commande</h3>
              
              <p><strong>Commande n°:</strong> ${orderData.id}</p>
              <p><strong>Date:</strong> ${new Date(orderData.created_at).toLocaleDateString('fr-FR')}</p>
              <p><strong>Email:</strong> ${orderData.client_email}</p>
              
              <h4 style="color: #333; margin: 20px 0 10px 0;">Articles:</h4>
              
              ${orderData.articles.map((item, index) => `
                <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <p style="margin: 0;"><strong>${item.nom}</strong></p>
                  <p style="margin: 5px 0 0; color: #666;">Quantité: ${item.quantite}</p>
                  <p style="margin: 5px 0 0; text-align: right; font-weight: bold; color: #8B4513;">${(item.prix * item.quantite).toFixed(2)}â?¬</p>
                </div>
              `).join('')}
              
              <div style="text-align: right; margin-top: 20px; padding-top: 15px; border-top: 2px solid #8B4513;">
                <strong style="font-size: 18px; color: #8B4513;">Total: ${orderData.total.toFixed(2)}â?¬</strong>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9f9f9;">
              <p style="margin: 0;">Merci pour votre confiance !</p>
              <p style="margin: 10px 0 0; color: #666;">Vous recevrez des mises à jour par email.</p>
            </div>
            
            <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 30px;">
              <p style="margin: 0; font-weight: bold;">Jay's Creations Design</p>
              <p style="margin: 5px 0 0; color: #666; font-size: 14px;">contact@jayscreationsdesign.fr</p>
            </div>
            
          </div>
          
        </body>
      </html>
    `;

    console.log('\nEnvoi de l\'email ultra-simple...');

    // Envoyer l'email
    const result = await sendEmail({
      to: orderData.client_email,
      subject: 'Confirmation de commande - Jay\'s Creations Design',
      html: emailHtml,
      from: 'contact@jayscreationsdesign.fr'
    });

    if (result.success) {
      console.log('\nâ EMAIL ULTRA-SIMPLE ENVOYÉ AVEC SUCCÈS â');
      console.log('Destinataire:', orderData.client_email);
      console.log('Sujet:', 'Confirmation de commande - Jay\'s Creations Design');
      console.log('Message ID:', result.messageId);
      console.log('\nâ Email basique et fonctionnel envoyé !');
    } else {
      console.error('\nERREUR ENVOI EMAIL:', result.error);
    }

  } catch (error) {
    console.error('Erreur générale:', error);
  }
}

// Exécuter l'envoi
sendBasicEmail();
