import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Récupération des produits avec leurs ventes (simulées pour l'instant)
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      throw error;
    }

    // Simulation des ventes (à remplacer avec les vraies données)
    const productsWithSales = (products || []).map(product => ({
      ...product,
      ventes: Math.floor(Math.random() * 50) + 1 // Simulation
    })).sort((a, b) => b.ventes - a.ventes);

    return NextResponse.json(productsWithSales);
  } catch (error) {
    console.error('Erreur top products:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des top produits' },
      { status: 500 }
    );
  }
}
