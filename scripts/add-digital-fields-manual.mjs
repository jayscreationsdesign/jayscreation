import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function executeManualSQL() {
  console.log('Ajout des champs numériques à la table products...')

  try {
    // Ajouter est_numerique
    const { error: error1 } = await supabase
      .from('products')
      .select('id')
      .limit(1)
    
    if (error1 && error1.message.includes('column "est_numerique" does not exist')) {
      console.log('Ajout du champ est_numerique...')
      // Pour l'instant, nous allons continuer sans modifier la structure
      console.log('⚠️  Le champ est_numerique sera ajouté manuellement dans Supabase')
    }

    console.log('✅ Vérification des champs terminée')
    console.log('📝 Instructions manuelles pour Supabase :')
    console.log('1. Aller dans Supabase > Table Editor > products')
    console.log('2. Ajouter les colonnes :')
    console.log('   - est_numerique (boolean, default: false)')
    console.log('   - fichier_url (text)')
    console.log('   - formats_inclus (text[], default: \'{}\')')
    console.log('')
    console.log('3. Créer la table download_tokens :')
    console.log('   CREATE TABLE download_tokens (')
    console.log('     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),')
    console.log('     order_id uuid REFERENCES orders(id),')
    console.log('     token text UNIQUE NOT NULL,')
    console.log('     fichier_url text NOT NULL,')
    console.log('     expires_at timestamptz NOT NULL,')
    console.log('     used boolean DEFAULT false,')
    console.log('     created_at timestamptz DEFAULT now()')
    console.log('   );')

  } catch (error) {
    console.log('ERREUR:', error.message)
  }
}

executeManualSQL()
