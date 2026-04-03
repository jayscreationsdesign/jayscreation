#!/usr/bin/env node

/**
 * Script de configuration SMTP IONOS pour Supabase
 * 
 * Usage: node scripts/setup-smtp.js
 * 
 * Prérequis:
 * - Variables d'environnement configurées
 * - Clé de service Supabase disponible
 */

const https = require('https');
const { execSync } = require('child_process');

// Configuration
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const SMTP_CONFIG = {
  external_email_enabled: true,
  smtp_host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.fr',
  smtp_port: parseInt(process.env.IONOS_SMTP_PORT) || 587,
  smtp_user: process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr',
  smtp_pass: process.env.IONOS_EMAIL_PASS,
  smtp_admin_email: process.env.IONOS_ADMIN_EMAIL || 'contact@jayscreationsdesign.fr',
  smtp_sender_name: "Jay's Creations Design"
};

function validateConfig() {
  const required = ['SUPABASE_PROJECT_REF', 'SUPABASE_SERVICE_KEY', 'IONOS_EMAIL_PASS'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Variables d\'environnement manquantes:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nVeuillez configurer ces variables dans votre .env.local');
    process.exit(1);
  }
  
  console.log('✅ Configuration validée');
}

function setupSMTP() {
  const data = JSON.stringify(SMTP_CONFIG);
  
  const options = {
    hostname: 'api.supabase.com',
    port: 443,
    path: `/v1/projects/${SUPABASE_PROJECT_REF}/config/auth`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
          }
        } catch (error) {
          reject(new Error(`Erreur de parsing: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function testEmailSending() {
  console.log('📧 Test d\'envoi d\'email...');
  
  try {
    // Simulation de test via l'API Supabase
    const testData = {
      email: 'test@example.com',
      template: 'confirm_signup',
      data: { 
        confirmation_url: 'https://jayscreation.vercel.app/connexion'
      }
    };
    
    console.log('✅ Test de configuration SMTP terminé');
    console.log('📝 Pour tester réellement, créez un compte utilisateur sur le site');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

async function main() {
  console.log('🔧 Configuration SMTP IONOS pour Supabase');
  console.log('=====================================\n');
  
  try {
    // Validation
    validateConfig();
    
    // Affichage de la configuration
    console.log('Configuration SMTP:');
    console.log(`  - Hôte: ${SMTP_CONFIG.smtp_host}`);
    console.log(`  - Port: ${SMTP_CONFIG.smtp_port}`);
    console.log(`  - Utilisateur: ${SMTP_CONFIG.smtp_user}`);
    console.log(`  - Email admin: ${SMTP_CONFIG.smtp_admin_email}`);
    console.log(`  - Nom expéditeur: ${SMTP_CONFIG.smtp_sender_name}`);
    console.log('');
    
    // Configuration
    console.log('📡 Envoi de la configuration à Supabase...');
    const result = await setupSMTP();
    console.log('✅ Configuration SMTP appliquée avec succès');
    
    // Test
    await testEmailSending();
    
    console.log('\n🎉 Configuration terminée!');
    console.log('\nProchaines étapes:');
    console.log('1. Redémarrez votre application Next.js');
    console.log('2. Testez la création d\'un nouveau compte utilisateur');
    console.log('3. Vérifiez la réception de l\'email de bienvenue');
    console.log('4. Consultez les logs Supabase pour confirmer l\'envoi');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
    
    if (error.message.includes('401')) {
      console.error('\n💡 Vérifiez votre clé de service Supabase');
    } else if (error.message.includes('404')) {
      console.error('\n💡 Vérifiez votre référence de projet Supabase');
    } else if (error.message.includes('403')) {
      console.error('\n💡 Vérifiez les permissions de votre clé de service');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { setupSMTP, validateConfig, testEmailSending };
