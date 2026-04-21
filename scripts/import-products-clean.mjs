import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function generateUniqueSlug(slug, existingSlugs) {
  let uniqueSlug = slug
  let counter = 1
  
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
  
  return uniqueSlug
}

async function importProducts() {
  console.log('Lecture des produits...')

  try {
    // Import direct du fichier products.ts
    const { products } = await import('../src/data/products.ts')
    
    console.log(products.length + ' produits trouvés')

    // Récupérer les slugs existants
    const { data: existingProducts } = await supabase
      .from('products')
      .select('slug')
    
    const existingSlugs = new Set(existingProducts?.map(p => p.slug) || [])

    // Mappe vers la structure Supabase avec slugs uniques
    const rows = products.map(p => {
      const uniqueSlug = generateUniqueSlug(p.slug || '', existingSlugs)
      existingSlugs.add(uniqueSlug) // Ajouter à l'ensemble pour éviter les doublons
      
      return {
        id: randomUUID(),
        nom: p.name || '',
        slug: uniqueSlug,
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
      }
    })

    console.log('Import en cours...')

    // Insérer les produits par lots pour éviter les erreurs
    const batchSize = 10
    let totalImported = 0
    
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize)
      
      const { data, error } = await supabase
        .from('products')
        .insert(batch)
        .select()

      if (error) {
        console.log(`ERREUR lot ${i}-${i + batchSize}:`, error.message)
      } else {
        totalImported += batch.length
        console.log(`Lot ${i}-${i + batchSize} importé: ${batch.length} produits`)
      }
    }

    console.log(`\n${totalImported} produits importés avec succès !`)

    // Afficher quelques exemples
    const { data: sampleProducts } = await supabase
      .from('products')
      .select('nom, slug, prix')
      .limit(5)

    if (sampleProducts) {
      console.log('\nExemples de produits importés:')
      sampleProducts.forEach(p => {
        console.log(`- ${p.nom} (${p.slug}) - ${p.prix} EUR`)
      })
    }

  } catch (error) {
    console.log('ERREUR:', error.message)
    process.exit(1)
  }
}

importProducts()
