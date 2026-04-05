import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

// Configuration SMTP pour IONOS
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.ionos.fr',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS sur port 587
  auth: {
    user: process.env.SMTP_USER_CONTACT || 'contact@jayscreationsdesign.fr',
    pass: process.env.SMTP_PASS_CONTACT || 'Jayzon971238',
  },
  tls: {
    rejectUnauthorized: false,
  },
};

console.log('🧪 Test de connexion SMTP IONOS');
console.log('📋 Configuration:');
console.log(`   Host: ${smtpConfig.host}`);
console.log(`   Port: ${smtpConfig.port}`);
console.log(`   User: ${smtpConfig.auth.user}`);
console.log(`   Pass: ${smtpConfig.auth.pass ? '***' : 'NON DÉFINI'}`);

async function testSMTPConnection() {
  try {
    console.log('\n🔗 Création du transporteur...');
    const transporter = nodemailer.createTransport(smtpConfig);
    
    console.log('⏳ Test de connexion...');
    const verified = await transporter.verify();
    
    if (verified) {
      console.log('✅ Connexion SMTP réussie !');
      
      // Test d'envoi d'email
      console.log('\n📧 Test d\'envoi d\'email...');
      const testEmail = await transporter.sendMail({
        from: `"Jay's Creations Test" <${smtpConfig.auth.user}>`,
        to: smtpConfig.auth.user, // Envoyer à soi-même pour tester
        subject: '🧪 Test SMTP - Jay\'s Creations',
        html: `
          <h1>Test de connexion SMTP réussi !</h1>
          <p>Ceci est un email de test pour vérifier que la connexion SMTP fonctionne correctement.</p>
          <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
          <p>Configuration:</p>
          <ul>
            <li>Host: ${smtpConfig.host}</li>
            <li>Port: ${smtpConfig.port}</li>
            <li>User: ${smtpConfig.auth.user}</li>
          </ul>
        `,
      });
      
      console.log('✅ Email de test envoyé avec succès !');
      console.log(`📬 Message ID: ${testEmail.messageId}`);
      console.log(`📨 Destinataire: ${smtpConfig.auth.user}`);
      
    } else {
      console.log('❌ Connexion SMTP échouée');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test SMTP:', error);
    
    if (error instanceof Error) {
      console.error('\n📋 Détails de l\'erreur:');
      console.error(`   Message: ${error.message}`);
      console.error(`   Code: ${error.name}`);
      
      if ('code' in error) {
        console.error(`   Code SMTP: ${(error as any).code}`);
      }
      
      if ('command' in error) {
        console.error(`   Commande: ${(error as any).command}`);
      }
    }
  }
}

// Exécuter le test
testSMTPConnection().then(() => {
  console.log('\n🏁 Test terminé');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 Test échoué:', error);
  process.exit(1);
});
