import { createClient } from '@supabase/supabase-js'

// Configuration pour le nouveau projet Supabase
const SUPABASE_URL = 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MjM1NDAsImV4cCI6MjA5MDA5OTU0MH0.gaglop45XZ9EDRmQACbiDTSWw5FmU7yrMrh24aUxdaI'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDUyMzU0MCwiZXhwIjoyMDkwMDk5NTQwfQ.g7G3SvP8Q12otYv7yiKjeBARU1DHxvKJ3rKvLqScnzk'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function setupSupabase() {
  console.log('???? Configuration Supabase - Jay\'s Creations Design')
  console.log('URL:', SUPABASE_URL)
  console.log('')

  try {
    // Test de connexion
    console.log('1. Test de connexion...')
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1)
    if (error && !error.message.includes('does not exist')) {
      throw error
    }
    console.log('???? Connexion réussie !')

    // Création des tables
    console.log('')
    console.log('2. Création des tables...')

    // Table profiles
    console.log('   - Création table profiles...')
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          prenom TEXT,
          nom TEXT,
          telephone TEXT,
          adresse TEXT,
          code_postal TEXT,
          ville TEXT,
          pays TEXT DEFAULT 'France',
          date_naissance DATE,
          preferences_newsletter BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
        CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);
      `
    })

    if (profilesError) {
      console.log('   Erreur profiles (normal si la table existe):', profilesError.message)
    } else {
      console.log('   ???? Table profiles créée')
    }

    // Table commandes
    console.log('   - Création table commandes...')
    const { error: commandesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS commandes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES profiles(id),
          numero_commande TEXT UNIQUE NOT NULL,
          statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'preparation', 'expediee', 'livree', 'annulee')),
          montant_total DECIMAL(10,2) NOT NULL,
          frais_livraison DECIMAL(10,2) DEFAULT 0,
          methode_paiement TEXT,
          adresse_livraison JSONB,
          adresse_facturation JSONB,
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_commandes_user_id ON commandes(user_id);
        CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes(statut);
        CREATE INDEX IF NOT EXISTS idx_commandes_created_at ON commandes(created_at);
      `
    })

    if (commandesError) {
      console.log('   Erreur commandes (normal si la table existe):', commandesError.message)
    } else {
      console.log('   ???? Table commandes créée')
    }

    // Table produits
    console.log('   - Création table produits...')
    const { error: produitsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS produits (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          nom TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          prix DECIMAL(10,2) NOT NULL,
          prix_promotion DECIMAL(10,2),
          image TEXT,
          images JSONB DEFAULT '[]',
          categorie TEXT,
          tags JSONB DEFAULT '[]',
          stock INTEGER DEFAULT 0,
          actif BOOLEAN DEFAULT true,
          featured BOOLEAN DEFAULT false,
          specifications JSONB DEFAULT '{}',
          seo_title TEXT,
          seo_description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_produits_slug ON produits(slug);
        CREATE INDEX IF NOT EXISTS idx_produits_categorie ON produits(categorie);
        CREATE INDEX IF NOT EXISTS idx_produits_actif ON produits(actif);
        CREATE INDEX IF NOT EXISTS idx_produits_featured ON produits(featured);
      `
    })

    if (produitsError) {
      console.log('   Erreur produits (normal si la table existe):', produitsError.message)
    } else {
      console.log('   ???? Table produits créée')
    }

    // Configuration RLS (Row Level Security)
    console.log('')
    console.log('3. Configuration RLS...')

    // Activer RLS sur profiles
    await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`
    })

    // Politiques RLS pour profiles
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Users can view own profile" ON profiles
          FOR SELECT USING (auth.uid() = id);
          
        CREATE POLICY "Users can update own profile" ON profiles
          FOR UPDATE USING (auth.uid() = id);
          
        CREATE POLICY "Users can insert own profile" ON profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
      `
    })

    console.log('   ???? RLS configuré pour profiles')

    // Activer RLS sur commandes
    await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;`
    })

    // Politiques RLS pour commandes
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Users can view own orders" ON commandes
          FOR SELECT USING (auth.uid() = user_id);
          
        CREATE POLICY "Users can update own orders" ON commandes
          FOR UPDATE USING (auth.uid() = user_id);
      `
    })

    console.log('   ???? RLS configuré pour commandes')

    // Trigger pour updated_at
    console.log('')
    console.log('4. Configuration triggers...')
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        
        DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE ON profiles
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
            
        DROP TRIGGER IF EXISTS update_commandes_updated_at ON commandes;
        CREATE TRIGGER update_commandes_updated_at
            BEFORE UPDATE ON commandes
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
            
        DROP TRIGGER IF EXISTS update_produits_updated_at ON produits;
        CREATE TRIGGER update_produits_updated_at
            BEFORE UPDATE ON produits
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
      `
    })

    console.log('   ???? Triggers updated_at configurés')

    console.log('')
    console.log('???? Configuration Supabase terminée avec succès !')
    console.log('')
    console.log('Variables à ajouter dans .env.local :')
    console.log(`NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}`)
    console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}`)
    console.log(`SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_KEY}`)

  } catch (error: any) {
    console.error('???? Erreur lors de la configuration:', error.message)
    process.exit(1)
  }
}

setupSupabase()
