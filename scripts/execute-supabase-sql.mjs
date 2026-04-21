import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function executeSQL() {
  console.log('Exécution des modifications SQL pour les produits numériques...')

  try {
    const sql = readFileSync('scripts/add-digital-fields.sql', 'utf8')
    
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })
    
    if (error) {
      console.log('ERREUR:', error.message)
      process.exit(1)
    }
    
    console.log('✅ Modifications SQL exécutées avec succès !')
    console.log('Champs ajoutés à la table products : est_numerique, fichier_url, formats_inclus')
    console.log('Table download_tokens créée avec succès')
    
  } catch (error) {
    console.log('ERREUR:', error.message)
    process.exit(1)
  }
}

executeSQL()
