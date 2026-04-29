// Script pour créer un utilisateur admin Supabase
// À exécuter avec: node scripts/create-admin.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    const email = 'admin@jayscreationsdesign.fr';
    const password = 'Admin-Jays-2026!'; // Changez ce mot de passe

    // 1. Créer l'utilisateur dans Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        full_name: 'Administrateur Jays Creations'
      }
    });

    if (authError) {
      console.error('Erreur création utilisateur Auth:', authError);
      return;
    }

    console.log('Utilisateur Auth créé:', authData.user.id);

    // 2. Ajouter le profil dans la table profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: email,
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Erreur création profil:', profileError);
    } else {
      console.log('Profil admin créé avec succès!');
      console.log('Email:', email);
      console.log('Mot de passe:', password);
      console.log('URL de connexion: https://jayscreation.vercel.app/admin/login');
    }

  } catch (error) {
    console.error('Erreur:', error);
  }
}

createAdminUser();
