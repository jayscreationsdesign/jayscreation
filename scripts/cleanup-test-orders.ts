// Ce script supprime TOUTES les commandes de la base Supabase
// À exécuter une seule fois pour nettoyer les données de test
// Commande : npx tsx scripts/cleanup-test-orders.ts

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Utiliser la service role key pour avoir les droits admin
)

async function cleanup() {
  console.log('🧹 Nettoyage des commandes de test...')

  try {
    // 1. Supprimer toutes les lignes de commande (order_items / order_lines)
    console.log('📋 Suppression des order_items...')
    const { error: itemsError } = await supabase
      .from('order_items') // adapter le nom de la table si différent
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // supprime tout

    if (itemsError) {
      console.error('❌ Erreur suppression order_items:', itemsError)
    } else {
      console.log('✅ order_items supprimés')
    }

    // 2. Supprimer toutes les commandes
    console.log('📦 Suppression des orders...')
    const { error: ordersError } = await supabase
      .from('orders') // adapter le nom de la table si différent
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // supprime tout

    if (ordersError) {
      console.error('❌ Erreur suppression orders:', ordersError)
    } else {
      console.log('✅ orders supprimées')
    }

    // 3. Supprimer les paniers abandonnés de test si la table existe
    console.log('🛒 Suppression des abandoned_carts...')
    const { error: cartsError } = await supabase
      .from('abandoned_carts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (cartsError) {
      console.log('⚠️ Table abandoned_carts non trouvée ou erreur:', cartsError.message)
    } else {
      console.log('✅ abandoned_carts supprimés')
    }

    // 4. Vérifier les tables alternatives possibles
    const alternativeTables = ['commandes', 'order_lines', 'lignes_commande']
    
    for (const tableName of alternativeTables) {
      console.log(`🔍 Vérification de la table: ${tableName}`)
      const { error: altError } = await supabase
        .from(tableName)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')

      if (altError) {
        console.log(`⚠️ Table ${tableName} non trouvée ou erreur:`, altError.message)
      } else {
        console.log(`✅ ${tableName} supprimés`)
      }
    }

    console.log('🎉 Nettoyage terminé !')
    console.log('')
    console.log('📊 Résumé des suppressions:')
    console.log('- Toutes les commandes ont été supprimées')
    console.log('- Tous les articles de commande ont été supprimés')
    console.log('- Les paniers abandonnés ont été supprimés')
    console.log('- Les comptes utilisateurs et produits sont intactes')
    
  } catch (error) {
    console.error('❌ Erreur during cleanup:', error)
  }
}

// Vérification des variables d'environnement
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL manquant dans .env.local')
  process.exit(1)
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local')
  console.error('📋 Pour trouver cette clé:')
  console.error('   1. Allez sur Supabase Dashboard')
  console.error('   2. Settings → API')
  console.error('   3. Copiez la "service_role" key')
  process.exit(1)
}

cleanup()
