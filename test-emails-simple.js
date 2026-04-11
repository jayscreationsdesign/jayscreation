const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP Ionos
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr',
  port: 587,
  secure: false,
  auth: {
    user: 'contact@jayscreationsdesign.fr',
    pass: 'Kenays971238.',
  },
});

// Templates d'emails HTML simples
const emailTemplates = {
  welcome: {
    subject: '???? Bienvenue chez Jay\'s Creations Design !',
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
            Bienvenue parmi nous !
          </h2>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Bonjour Anais,
          </p>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Merci de vous être inscrit(e) sur Jay's Creations Design ! Nous sommes ravis de vous accueillir dans notre communauté.
          </p>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Découvrez nos créations personnalisées pour sublimer vos événements :
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://jayscreationsdesign.vercel.app/boutique" 
               style="display: inline-block; background-color: #8B4513; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 25px; font-weight: 500; font-family: 'DM Sans', sans-serif;">
              Découvrir la boutique
            </a>
          </div>
          
          <p style="color: #6B6B6B; font-family: 'DM Sans', sans-serif; font-size: 14px; margin-top: 30px;">
            À bientôt,<br>
            L'équipe Jay's Creations Design
          </p>
        </div>
      </div>
    `
  },

  orderConfirmation: {
    subject: '???? Confirmation de votre commande CMD-2024-001',
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
            Confirmation de commande
          </h2>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Bonjour Anais,
          </p>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Nous vous remercions pour votre commande <strong>CMD-2024-001</strong>. Elle est maintenant confirmée et en préparation !
          </p>
          
          <div style="background-color: #F5F0EB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-bottom: 15px;">Récapitulatif de votre commande</h3>
            
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E8E4DF;">
                <span>Faire-part Mariage Personnalisé x50</span>
                <span>125,00 ?</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E8E4DF;">
                <span>Marque-places Table x50</span>
                <span>60,00 ?</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold;">
                <span>Total</span>
                <span>185,00 ?</span>
              </div>
            </div>
          </div>
          
          <div style="background-color: #F5F0EB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-bottom: 15px;">Adresse de livraison</h3>
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; margin: 5px 0;">
              123 Rue de la Paix<br>
              75001 Paris<br>
              France
            </p>
          </div>
          
          <p style="color: #6B6B6B; font-family: 'DM Sans', sans-serif; font-size: 14px; margin-top: 30px;">
            Merci pour votre confiance,<br>
            L'équipe Jay's Creations Design
          </p>
        </div>
      </div>
    `
  },

  abandonedCart: {
    subject: '???? Votre panier vous attend !',
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
            Votre panier vous attend !
          </h2>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Bonjour Anais,
          </p>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Nous avons remarqué que vous avez des articles dans votre panier. Ne les laissez pas s'échapper !
          </p>
          
          <div style="background-color: #F5F0EB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-bottom: 15px;">Votre panier</h3>
            
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E8E4DF;">
                <span>Faire-part Mariage Personnalisé x25</span>
                <span>62,50 ?</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold;">
                <span>Total</span>
                <span>62,50 ?</span>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://jayscreationsdesign.vercel.app/panier" 
               style="display: inline-block; background-color: #8B4513; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 25px; font-weight: 500; font-family: 'DM Sans', sans-serif;">
              Finaliser ma commande
            </a>
          </div>
          
          <p style="color: #6B6B6B; font-family: 'DM Sans', sans-serif; font-size: 14px; margin-top: 30px;">
            À bientôt,<br>
            L'équipe Jay's Creations Design
          </p>
        </div>
      </div>
    `
  },

  quoteRequest: {
    subject: '???? Nouvelle demande de devis - Mariage',
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
            Nouvelle demande de devis
          </h2>
          
          <p style="color: #333333; font-family: 'DM Sans', sans-serif; line-height: 1.6; margin-bottom: 20px;">
            Une nouvelle demande de devis a été reçue :
          </p>
          
          <div style="background-color: #F5F0EB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-bottom: 15px;">Détails de la demande</h3>
            
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; margin: 5px 0;">
              <strong>Client :</strong> Anais Test<br>
              <strong>Email :</strong> test@jayscreationsdesign.fr<br>
              <strong>Événement :</strong> Mariage<br>
              <strong>Date :</strong> 15/06/2024<br>
              <strong>Nombre d'invités :</strong> 100<br>
              <strong>Produits souhaités :</strong> Faire-parts, Menu, Marque-places
            </p>
            
            <p style="color: #333333; font-family: 'DM Sans', sans-serif; margin: 15px 0; padding: 15px; background-color: white; border-radius: 5px;">
              <strong>Message du client :</strong><br>
              "Je souhaiterais un devis pour mon mariage de 100 personnes."
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:test@jayscreationsdesign.fr" 
               style="display: inline-block; background-color: #8B4513; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 25px; font-weight: 500; font-family: 'DM Sans', sans-serif;">
              Répondre au client
            </a>
          </div>
        </div>
      </div>
    `
  }
};

async function testAllEmails() {
  console.log('???? DÉBUT DES TESTS D\'EMAILS\n');

  const testEmails = [
    {
      name: 'Email de bienvenue (client)',
      to: 'anais.manne@gmail.com',
      template: emailTemplates.welcome
    },
    {
      name: 'Confirmation de commande (client)',
      to: 'anais.manne@gmail.com',
      template: emailTemplates.orderConfirmation
    },
    {
      name: 'Panier abandonné (client)',
      to: 'anais.manne@gmail.com',
      template: emailTemplates.abandonedCart
    },
    {
      name: 'Demande de devis (admin)',
      to: 'contact@jayscreationsdesign.fr',
      template: emailTemplates.quoteRequest
    },
    {
      name: 'Notification admin commande',
      to: 'contact@jayscreationsdesign.fr',
      template: emailTemplates.orderConfirmation
    },
    {
      name: 'Contact client vers admin',
      to: 'contact@jayscreationsdesign.fr',
      template: emailTemplates.quoteRequest
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const test of testEmails) {
    try {
      console.log(`???? Test: ${test.name}`);
      console.log(`   ???? Destinataire: ${test.to}`);
      
      const mailOptions = {
        from: `"Jay's Creations Design" <contact@jayscreationsdesign.fr>`,
        to: test.to,
        subject: `[TEST] ${test.template.subject}`,
        html: test.template.html
      };

      const result = await transporter.sendMail(mailOptions);
      
      console.log(`   ???? Email envoyé avec succès: ${result.messageId}`);
      console.log(`   ???? Réponse: ${result.response}`);
      successCount++;
      
    } catch (error) {
      console.log(`   ???? Erreur lors de l'envoi: ${error.message}`);
      failCount++;
    }
    
    console.log(''); // Ligne vide pour la lisibilité
    
    // Attendre 1 seconde entre chaque envoi pour éviter les limitations
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n???? RÉSULTATS DES TESTS:');
  console.log(`   ???? Succès: ${successCount}/${testEmails.length}`);
  console.log(`   ???? Échecs: ${failCount}/${testEmails.length}`);
  
  if (failCount === 0) {
    console.log('   ???? TOUS LES EMAILS FONCTIONNENT CORRECTEMENT! ????');
  } else {
    console.log('   ???? CERTAINS EMAILS ONT ÉCHOUÉ - VÉRIFIER LES LOGS');
  }

  // Fermer la connexion
  transporter.close();
}

// Test de connexion SMTP
async function testSmtpConnection() {
  console.log('???? TEST DE CONNEXION SMTP\n');
  
  try {
    await transporter.verify();
    console.log('   ???? Connexion SMTP réussie');
    return true;
  } catch (error) {
    console.log(`   ???? Erreur de connexion: ${error.message}`);
    return false;
  }
}

// Exécuter les tests
async function runTests() {
  console.log('???? TEST COMPLET DU SYSTÈME D\'EMAILS\n');
  
  // Test de connexion
  const isConnected = await testSmtpConnection();
  
  if (isConnected) {
    // Test des emails
    await testAllEmails();
  } else {
    console.log('???? IMPOSSIBLE DE TESTER LES EMAILS - CONNEXION SMTP ÉCHOUÉE');
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testAllEmails, testSmtpConnection, runTests };
