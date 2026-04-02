import { supabase } from './supabase';
import type { Product } from '@/types/product';

export async function getAllProducts(): Promise<Product[]> {
  try {
    // Vérifier si supabase est configuré
    if (!(supabase as any).from) {
      // Gestion silencieuse - ne bloque pas l'affichage
      console.log('Supabase non configuré - retour de produits vides');
      return [];
    }

    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      console.error('Error fetching all products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getAllProducts:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Vérifier si supabase est configuré
    if (!(supabase as any).from) {
      // Gestion silencieuse - ne bloque pas l'affichage
      console.log('Supabase non configuré - retour de produit null');
      return null;
    }

    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('actif', true)
      .single();

    if (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getProductBySlug:', error);
    return null;
  }
}

export async function getProductsByCategorie(categorie: string): Promise<Product[]> {
  try {
    // Vérifier si supabase est configuré
    if (!(supabase as any).from) {
      // Gestion silencieuse - ne bloque pas l'affichage
      console.log('Supabase non configuré - retour de produits vides');
      return [];
    }

    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .eq('categorie', categorie)
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getProductsByCategorie:', error);
    throw error;
  }
}

export async function getProductsBySousCategorie(sous_categorie: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('sous_categorie', sous_categorie)
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      console.error(`Error fetching products for subcategory ${sous_categorie}:`, error);
      throw new Error('Failed to fetch products by subcategory');
    }

    return data || [];
  } catch (error) {
    console.error(`Unexpected error in getProductsBySousCategorie for ${sous_categorie}:`, error);
    throw error;
  }
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('actif', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      throw new Error('Failed to fetch featured products');
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getFeaturedProducts:', error);
    throw error;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    // Vérifier si supabase est configuré
    if (!(supabase as any).from) {
      // Gestion silencieuse - ne bloque pas l'affichage
      console.log('Supabase non configuré - retour de produits vides');
      return [];
    }

    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .eq('actif', true)
      .or(`nom.ilike.%${query}%,description.ilike.%${query}%`)
      .order('nom', { ascending: true });

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in searchProducts:', error);
    throw error;
  }
}

export async function getProductsByTheme(theme: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .contains('themes', [theme])
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      console.error(`Error fetching products for theme ${theme}:`, error);
      throw new Error('Failed to fetch products by theme');
    }

    return data || [];
  } catch (error) {
    console.error(`Unexpected error in getProductsByTheme for ${theme}:`, error);
    throw error;
  }
}
