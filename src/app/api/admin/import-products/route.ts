import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { products } from '@/data/products'

export async function POST(request: NextRequest) {
  try {
    // Vérifier les produits existants
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('id, name')
    
    if (fetchError) {
      console.error('Erreur récupération produits existants:', fetchError)
      return NextResponse.json({ error: 'Erreur lors de la récupération des produits existants' }, { status: 500 })
    }

    const existingIds = new Set(existingProducts?.map(p => p.id) || [])
    const productsToImport = products.filter(p => !existingIds.has(p.id))
    
    console.log(`Produits existants: ${existingIds.size}`)
    console.log(`Produits à importer: ${productsToImport.length}`)

    if (productsToImport.length === 0) {
      return NextResponse.json({ 
        message: 'Tous les produits sont déjà importés',
        totalProducts: products.length,
        existingProducts: existingIds.size,
        newProducts: 0
      })
    }

    // Préparer les produits pour l'importation
    const productsToInsert = productsToImport.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.numericPrice || parseFloat(product.price.replace(/[^\d.,]/g, '').replace(',', '.')),
      stock: 100, // Stock par défaut
      is_active: true,
      image_url: product.image,
      description: product.description,
      category: product.category,
      category_slug: product.categorySlug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    // Importer les produits par lots de 10
    const batchSize = 10
    let importedCount = 0
    const errors: string[] = []

    for (let i = 0; i < productsToInsert.length; i += batchSize) {
      const batch = productsToInsert.slice(i, i + batchSize)
      
      const { data, error } = await supabase
        .from('products')
        .upsert(batch, { onConflict: 'id' })
        .select()

      if (error) {
        console.error(`Erreur lot ${i}-${i + batchSize}:`, error)
        errors.push(`Erreur lot ${i}-${i + batchSize}: ${error.message}`)
      } else {
        importedCount += batch.length
        console.log(`Lot ${i}-${i + batchSize} importé avec succès: ${batch.length} produits`)
      }
    }

    return NextResponse.json({
      message: `Import terminé avec succès`,
      totalProducts: products.length,
      existingProducts: existingIds.size,
      newProducts: importedCount,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Erreur lors de l\'importation:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'importation des produits' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des produits' }, { status: 500 })
    }

    return NextResponse.json({
      products: products || [],
      count: products?.length || 0
    })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
