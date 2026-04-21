import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function importProducts() {
  console.log('Lecture des produits...')

  try {
    // Import direct du fichier products.ts
    const { products } = await import('../src/data/products.ts')
    
    console.log(products.length + ' produits trouvés')

    // Mappe vers la structure Supabase avec UUIDs générés
    const rows = products.map(p => ({
      id: randomUUID(), // Générer un UUID pour chaque produit
      nom: p.name || '',
      slug: p.slug || '',
      description: p.description || '',
      prix: p.numericPrice || 0,
      prix_promo: null,
      categorie: p.category || '',
      sous_categorie: p.sous_categorie || '',
      image_principale: p.image || '',
      images: p.images || [],
      themes: p.themes || [],
      requires_theme: p.requiresTheme || false,
      personnalisable: true,
      actif: true,
      stock: 99,
      meta_title: p.name || '',
      meta_description: p.description || ''
    }))

    console.log('Import en cours...')

    // D'abord supprimer les produits existants
    console.log('Suppression des produits existants...')
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    if (deleteError) {
      console.log('AVERTISSEMENT suppression:', deleteError.message)
    }

    // Puis insérer les nouveaux produits
    const { data, error } = await supabase
      .from('products')
      .insert(rows)
      .select()

    if (error) {
      console.log('ERREUR import:', error.message)
      process.exit(1)
    }

    console.log(rows.length + ' produits importés avec succès !')
    console.log('Produits insérés:', data?.length || 0)

    // Afficher quelques exemples
    if (data && data.length > 0) {
      console.log('\nExemples de produits importés:')
      data.slice(0, 3).forEach(p => {
        console.log(`- ${p.nom} (${p.slug}) - ${p.prix} EUR`)
      })
    }

  } catch (error) {
    console.log('ERREUR:', error.message)
    process.exit(1)
  }
}

importProducts()
