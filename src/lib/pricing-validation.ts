import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Interface pour les items du panier avec le système de pricing hybride
interface CartItem {
  productId: string;
  productName: string;
  theme?: string | null;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  type: 'unit' | 'lot';
  lotName?: string;
  lotId?: string;
}

export async function validateCartItems(items: CartItem[]): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  // Valider chaque item du panier
  for (const item of items) {
    try {
      // Récupérer les informations du produit depuis Supabase
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', item.productId)
        .single();

      if (productError || !product) {
        errors.push(`Le produit "${item.productName}" n'est plus disponible.`);
        continue;
      }

      // Validation selon le type de pricing
      switch (product.pricing_type) {
        case 'unit_with_minimum':
          await validateUnitPricing(item, product, errors);
          break;

        case 'lot_pricing':
          await validateLotPricing(item, product, supabase, errors);
          break;

        case 'quote':
          errors.push(`Le produit "${item.productName}" nécessite un devis. Il ne peut pas être ajouté au panier.`);
          break;

        default:
          errors.push(`Type de tarification non valide pour le produit "${item.productName}".`);
      }
    } catch (error) {
      console.error(`Erreur validation item ${item.productId}:`, error);
      errors.push(`Erreur lors de la validation du produit "${item.productName}".`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

async function validateUnitPricing(item: CartItem, product: any, errors: string[]) {
  const quantity = item.quantity || 0;
  const minQuantity = product.min_quantity || 1;
  
  if (quantity < minQuantity) {
    errors.push(
      `La quantité minimum pour "${item.productName}" est de ${minQuantity} unités. ` +
      `Quantité actuelle: ${quantity}.`
    );
  }

  if (product.max_quantity && quantity > product.max_quantity) {
    errors.push(
      `La quantité maximum pour "${item.productName}" est de ${product.max_quantity} unités. ` +
      `Quantité actuelle: ${quantity}.`
    );
  }

  // Valider le pas d'incrémentation
  const step = product.quantity_step || 1;
  if (quantity % step !== 0) {
    errors.push(
      `La quantité pour "${item.productName}" doit être un multiple de ${step}. ` +
      `Quantité actuelle: ${quantity}.`
    );
  }

  // Valider le prix unitaire
  const expectedUnitPrice = product.unit_price;
  if (item.unitPrice && Math.abs(item.unitPrice - expectedUnitPrice) > 0.01) {
    errors.push(
      `Le prix unitaire pour "${item.productName}" a changé. ` +
      `Ancien: ${item.unitPrice}e, Nouveau: ${expectedUnitPrice}e.`
    );
  }
}

async function validateLotPricing(item: CartItem, product: any, supabase: any, errors: string[]) {
  if (!item.lotId) {
    errors.push(`Aucun lot sélectionné pour "${item.productName}".`);
    return;
  }

  // Récupérer les informations du lot
  const { data: lot, error: lotError } = await supabase
    .from('product_lots')
    .select('*')
    .eq('id', item.lotId)
    .eq('product_id', product.id)
    .single();

  if (lotError || !lot) {
    errors.push(`Le lot sélectionné pour "${item.productName}" n'est plus disponible.`);
    return;
  }

  // Valider que le lot correspond aux informations du panier
  if (item.lotName && item.lotName !== lot.lot_name) {
    errors.push(`Le nom du lot ne correspond pas pour "${item.productName}".`);
  }

  if (item.quantity && item.quantity !== lot.quantity) {
    errors.push(`La quantité du lot ne correspond pas pour "${item.productName}".`);
  }

  // Valider le prix du lot
  const expectedLotPrice = lot.lot_price;
  if (item.totalPrice && Math.abs(item.totalPrice - expectedLotPrice) > 0.01) {
    errors.push(
      `Le prix du lot pour "${item.productName}" a changé. ` +
      `Ancien: ${item.totalPrice}e, Nouveau: ${expectedLotPrice}e.`
    );
  }
}

// Middleware pour valider le panier avant la création de session Stripe
export async function validateCartMiddleware(body: any): Promise<NextResponse | null> {
  try {
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Panier invalide' },
        { status: 400 }
      );
    }

    const validation = await validateCartItems(items);

    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: 'Validation du panier échouée',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    return null; // Validation réussie
  } catch (error) {
    console.error('Erreur middleware validation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la validation du panier' },
      { status: 500 }
    );
  }
}
