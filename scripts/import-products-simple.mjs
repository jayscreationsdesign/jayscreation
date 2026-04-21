import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function importProducts() {
  console.log('Lecture des produits...')

  try {
    // Import direct du fichier products.ts
    const { products } = await import('../src/data/products.ts')
    
    console.log(products.length + ' produits trouvés')

    // Mappe vers la structure Supabase
    const rows = products.map(p => ({
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

    const { data, error } = await supabase
      .from('products')
      .upsert(rows, { onConflict: 'slug' })
      .select()

    if (error) {
      console.log('ERREUR import:', error.message)
      process.exit(1)
    }

    console.log(rows.length + ' produits importés avec succès !')
    console.log('Produits importés:', data?.length || 0)

  } catch (error) {
    console.log('ERREUR:', error.message)
    process.exit(1)
  }
}

importProducts()
