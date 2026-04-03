#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configuration des variables d\'environnement pour les emails...\n');

// Créer le fichier .env.local s'il n'existe pas
const envLocalPath = path.join(__dirname, '../.env.local');
const envExamplePath = path.join(__dirname, '../.env.example');

if (!fs.existsSync(envLocalPath)) {
  console.log('📁 Création du fichier .env.local...');
  fs.copyFileSync(envExamplePath, envLocalPath);
  console.log('✅ .env.local créé avec succès\n');
} else {
  console.log('ℹ️  Le fichier .env.local existe déjà\n');
}

// Créer le fichier .env pour Supabase Edge Functions
const supabaseEnvPath = path.join(__dirname, '../supabase/.env');
const supabaseEnvExamplePath = path.join(__dirname, '../supabase/.env.example');

if (!fs.existsSync(supabaseEnvPath)) {
  console.log('📁 Création du fichier supabase/.env...');
  fs.copyFileSync(supabaseEnvExamplePath, supabaseEnvPath);
  console.log('✅ supabase/.env créé avec succès\n');
} else {
  console.log('ℹ️  Le fichier supabase/.env existe déjà\n');
}

console.log('📋 ÉTAPES SUIVANTES :\n');
console.log('1. 📝 Modifiez .env.local avec vos vraies identifiants IONOS');
console.log('2. 📝 Modifiez supabase/.env avec les mêmes identifiants');
console.log('3. 🔐 Configurez les enregistrements DNS IONOS (SPF, DKIM, DMARC)');
console.log('4. ⚙️  Configurez SMTP dans Supabase Dashboard');
console.log('5. 🧪 Testez les emails sur /test-emails\n');

console.log('📖 Documentation complète dans les fichiers .env.example\n');

console.log('🚀 Configuration terminée !');
