import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category_slug');
    const subcategorySlug = searchParams.get('subcategory_slug');

    let filteredProducts = products;

    // Filtrer par catégorie
    if (categorySlug) {
      filteredProducts = filteredProducts.filter(p => 
        p.categorySlug === categorySlug || p.parentCategorySlug === categorySlug
      );
    }

    // Filtrer par sous-catégorie
    if (subcategorySlug) {
      filteredProducts = filteredProducts.filter(p => 
        p.categorySlug === subcategorySlug
      );
    }

    // Adapter les produits pour inclure les champs requis par FilterBar
    const adaptedProducts = filteredProducts.map(product => ({
      ...product,
      in_stock: true, // Par défaut, tous les produits sont en stock
      unit_price: product.numericPrice || 0,
      created_at: new Date().toISOString(), // Date par défaut
      sales_count: Math.floor(Math.random() * 100), // Simulation de ventes
      featured: Math.random() > 0.8, // 20% de chance d'être featured
      subcategory_slug: product.categorySlug !== product.parentCategorySlug ? product.categorySlug : null
    }));

    return NextResponse.json(adaptedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
