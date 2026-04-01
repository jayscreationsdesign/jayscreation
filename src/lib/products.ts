import { supabase } from './supabase';
import type { Product } from '@/types/product';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      console.error('Error fetching all products:', error);
      throw new Error('Failed to fetch products');
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getAllProducts:', error);
    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('actif', true)
      .single();

    if (error) {
      console.error(`Error fetching product with slug ${slug}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error in getProductBySlug for ${slug}:`, error);
    return null;
  }
}

export async function getProductsByCategorie(categorie: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('categorie', categorie)
      .eq('actif', true)
      .order('nom', { ascending: true });

    if (error) {
      console.error(`Error fetching products for category ${categorie}:`, error);
      throw new Error('Failed to fetch products by category');
    }

    return data || [];
  } catch (error) {
    console.error(`Unexpected error in getProductsByCategorie for ${categorie}:`, error);
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
