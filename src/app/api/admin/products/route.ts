import { supabaseAdmin } from '@/lib/supabase-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = supabaseAdmin

    // Vérifier l'authentification admin
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session || session.user.email !== 'anais.manne@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Récupérer tous les produits avec stats de ventes
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name),
        sales_count:order_items(count)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(products)

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = supabaseAdmin

    // Vérifier l'authentification admin
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session || session.user.email !== 'anais.manne@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const productData = await request.json()

    // Créer le produit
    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        description: productData.description || null,
        price: productData.price,
        stock: productData.stock,
        category_id: productData.category_id || null,
        is_active: productData.is_active ?? true,
        sku: productData.sku || null,
        weight: productData.weight || null,
        dimensions: productData.dimensions || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(product, { status: 201 })

  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
