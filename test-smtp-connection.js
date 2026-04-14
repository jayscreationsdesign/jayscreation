// Test de connexion SMTP pour trouver les bons identifiants

const nodemailer = require('nodemailer');

// Différentes configurations à tester
const configs = [
  {
    name: 'Configuration 1: commande@jayscreationsdesign.fr',
    config: {
      host: 'smtp.ionos.fr',
      port: 465,
      secure: true,
      auth: {
        user: 'commande@jayscreationsdesign.fr',
        pass: 'Anais2025'
      }
    }
  },
  {
    name: 'Configuration 2: contact@jayscreationsdesign.fr',
    config: {
      host: 'smtp.ionos.fr',
      port: 465,
      secure: true,
      auth: {
        user: 'contact@jayscreationsdesign.fr',
        pass: 'Anais2025'
      }
    }
  },
  {
    name: 'Configuration 3: commande@jayscreationsdesign.fr (port 587)',
    config: {
      host: 'smtp.ionos.fr',
      port: 587,
      secure: false,
      auth: {
        user: 'commande@jayscreationsdesign.fr',
        pass: 'Anais2025'
      }
    }
  },
  {
    name: 'Configuration 4: contact@jayscreationsdesign.fr (port 587)',
    config: {
      host: 'smtp.ionos.fr',
      port: 587,
      secure: false,
      auth: {
        user: 'contact@jayscreationsdesign.fr',
        pass: 'Anais2025'
      }
    }
  }
];

async function testConnection(name, config) {
  console.log(`\n=== Test de ${name} ===`);
  
  try {
    const transporter = nodemailer.createTransport(config);
    
    // Vérifier la connexion
    await transporter.verify();
    console.log('Connexion SMTP réussie !');
    
    // Envoyer un email de test
    const testEmail = await transporter.sendMail({
      from: config.auth.user,
      to: 'commande@jayscreationsdesign.fr',
      subject: `Test SMTP - ${name}`,
      html: `
        <h2>Test de connexion SMTP réussi</h2>
        <p>Configuration: ${name}</p>
        <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
        <p>Ce email confirme que la connexion SMTP fonctionne.</p>
      `
    });
    
    console.log('Email de test envoyé avec succès !');
    console.log('Message ID:', testEmail.messageId);
    return true;
    
  } catch (error) {
    console.error('Échec de la connexion:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('=== Test des configurations SMTP ===');
  console.log('Recherche de la configuration fonctionnelle...\n');
  
  let workingConfig = null;
  
  for (const test of configs) {
    const success = await testConnection(test.name, test.config);
    if (success) {
      workingConfig = test;
      break;
    }
  }
  
  if (workingConfig) {
    console.log(`\n=== CONFIGURATION FONCTIONNELLE TROUVÉE ===`);
    console.log(`Utiliser: ${workingConfig.name}`);
    console.log('Vous pouvez maintenant utiliser cette configuration pour les emails.');
  } else {
    console.log('\n=== AUCUNE CONFIGURATION FONCTIONNELLE ===');
    console.log('Veuillez vérifier les identifiants SMTP avec Ionos.');
    console.log('Possibilités:');
    console.log('1. Le mot de passe a changé');
    console.log('2. L\'utilisateur SMTP est différent');
    console.log('3. Les paramètres serveur sont incorrects');
  }
}

runTests();
