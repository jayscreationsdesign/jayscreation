import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function importProducts() {
  console.log('Lecture des produits...')

  // Lit le fichier products.ts comme texte
  // et extrait le tableau de produits
  const content = readFileSync('src/data/products.ts', 'utf8')

  // Extrait les donnees entre le premier [ et le dernier ]
  const match = content.match(/\[\s*\{[\s\S]*\}\s*\]/)
  if (!match) {
    console.log('ERREUR: Impossible de lire les produits')
    process.exit(1)
  }

  // Evalue le tableau (safe car c est notre propre fichier)
  let products
  try {
    // Remplace les imports TypeScript et les types
    let cleanContent = content
      .replace(/^import.*$/gm, '')
      .replace(/^export\s+/gm, '')
      .replace(/:\s*Product\b/g, '')
      .replace(/:\s*string\b/g, '')
      .replace(/:\s*number\b/g, '')
      .replace(/:\s*boolean\b/g, '')
      .replace(/as const/g, '')
      .replace(/\\u20AC/g, 'EUR') // Remplace les symboles euro

    // Extrait le tableau entre crochets
    const arrayMatch = cleanContent.match(/\[[\s\S]*\]/)
    if (!arrayMatch) {
      throw new Error('Impossible de trouver le tableau de produits')
    }

    const fn = new Function('return ' + arrayMatch[0])
    products = fn()
  } catch(e) {
    console.log('ERREUR parsing:', e.message)
    process.exit(1)
  }

  console.log(products.length + ' produits trouves')

  // Mappe vers la structure Supabase
  const rows = products.map(p => ({
    nom: p.name || p.nom || '',
    slug: p.slug || '',
    description: p.description || '',
    prix: p.numericPrice || p.prix || 0,
    prix_promo: p.numericPricePromo || p.prix_promo || null,
    categorie: p.category || p.categorie || '',
    sous_categorie: p.subcategory || p.sous_categorie || '',
    image_principale: p.image || p.image_principale || '',
    images: p.images || [],
    themes: p.themes || [],
    requires_theme: p.requiresTheme || p.requires_theme || false,
    personnalisable: true,
    actif: true,
    stock: p.stock || 99,
    meta_title: p.name || p.nom || '',
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

  console.log(rows.length + ' produits importes avec succes !')
}

importProducts()
