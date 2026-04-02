import type { Product as SupabaseProduct } from "@/types/product";
import type { Product as LocalProduct } from "@/data/products";
import type { CartItem } from "@/store/cartStore";

// Types unifiés
type UnifiedProduct = LocalProduct | SupabaseProduct;

// Interface pour le profil de recommandation
interface RecommendationProfile {
  categories: Set<string>;
  themes: Set<string>;
  events: Set<string>;
}

interface ProductScore {
  product: UnifiedProduct;
  score: number;
  reasons: string[];
}

// Fonction pour vérifier si c'est un produit Supabase
function isSupabaseProduct(product: UnifiedProduct): product is SupabaseProduct {
  return 'nom' in product;
}

// Fonction pour obtenir les champs unifiés
function getUnifiedFields(product: UnifiedProduct) {
  if (isSupabaseProduct(product)) {
    return {
      id: product.id,
      name: product.nom,
      price: typeof product.prix === 'number' ? product.prix : parseFloat(String(product.prix).replace(/[^0-9.,]/g, '')) || 0,
      category: product.categorie || '',
      themes: (product as any).themes || [],
      events: (product as any).events || [],
      rating: undefined,
      image: (product as any).images?.[0] || (product as any).image || '',
      slug: product.slug,
      description: product.description
    };
  } else {
    return {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.,]/g, '')) || 0 : product.price,
      category: product.category || '',
      themes: (product as any).themes || [],
      events: (product as any).events || [],
      rating: product.rating,
      image: (product as any).image || '',
      slug: product.slug,
      description: product.description
    };
  }
}

// Fonction pour construire le profil de recommandation
function buildRecommendationProfile(
  currentProduct: UnifiedProduct,
  cartItems: CartItem[]
): RecommendationProfile {
  const profile: RecommendationProfile = {
    categories: new Set(),
    themes: new Set(),
    events: new Set()
  };

  // Ajouter les infos du produit courant
  const currentFields = getUnifiedFields(currentProduct);
  if (currentFields.category) profile.categories.add(currentFields.category);
  currentFields.themes.forEach((theme: string) => profile.themes.add(theme));
  currentFields.events.forEach((event: string) => profile.events.add(event));

  // Ajouter les infos des produits du panier
  cartItems.forEach(cartItem => {
    // Chercher le produit correspondant dans la liste des produits
    if (cartItem.theme) {
      profile.themes.add(cartItem.theme);
    }
    // Pour la catégorie, on utilise le slug pour retrouver le produit
    const productSlug = cartItem.slug;
    // Note: On pourrait passer les produits en paramètre pour plus de précision
  });

  return profile;
}

// Fonction principale de recommandation avec scoring
export function getRelatedProducts(
  currentProduct: UnifiedProduct,
  cartItems: CartItem[],
  allProducts: UnifiedProduct[],
  limit: number = 8
): UnifiedProduct[] {
  const currentFields = getUnifiedFields(currentProduct);
  const profile = buildRecommendationProfile(currentProduct, cartItems);

  // Exclusions : produit courant et produits du panier
  const excludedIds = new Set([currentFields.id]);
  cartItems.forEach(item => excludedIds.add(item.id));

  // Filtrer les candidats
  const candidates = allProducts.filter(product => {
    const fields = getUnifiedFields(product);
    return !excludedIds.has(fields.id);
  });

  // Scorer chaque candidat
  const scoredProducts: ProductScore[] = candidates.map(product => {
    const fields = getUnifiedFields(product);
    let score = 0;
    const reasons: string[] = [];

    // Règle 1: Même catégorie que le produit courant (+2 points)
    if (fields.category && fields.category === currentFields.category) {
      score += 2;
      reasons.push(`Même catégorie "${fields.category}"`);
    }

    // Règle 2: Même catégorie qu'un produit du panier (+1 point)
    if (fields.category && profile.categories.has(fields.category) && fields.category !== currentFields.category) {
      score += 1;
      reasons.push(`Catégorie du panier "${fields.category}"`);
    }

    // Règle 3: Thèmes en commun avec le produit courant (+1 point par thème)
    const commonThemesWithCurrent = fields.themes.filter((theme: string) => 
      currentFields.themes.includes(theme)
    );
    if (commonThemesWithCurrent.length > 0) {
      score += commonThemesWithCurrent.length;
      reasons.push(`Thèmes courants: ${commonThemesWithCurrent.join(', ')}`);
    }

    // Règle 4: Thèmes en commun avec le panier (+1 point par thème)
    const commonThemesWithCart = fields.themes.filter((theme: string) => 
      profile.themes.has(theme) && !currentFields.themes.includes(theme)
    );
    if (commonThemesWithCart.length > 0) {
      score += commonThemesWithCart.length;
      reasons.push(`Thèmes panier: ${commonThemesWithCart.join(', ')}`);
    }

    // Règle 5: Événements en commun (+1 point par événement)
    const commonEvents = fields.events.filter((event: string) => 
      profile.events.has(event)
    );
    if (commonEvents.length > 0) {
      score += commonEvents.length;
      reasons.push(`Événements: ${commonEvents.join(', ')}`);
    }

    // Règle 6: Bonus popularité (+0.5 point si noté)
    if (fields.rating && fields.rating >= 4) {
      score += 0.5;
      reasons.push('Produit populaire');
    }

    return {
      product,
      score,
      reasons
    };
  });

  // Trier par score décroissant
  scoredProducts.sort((a, b) => b.score - a.score);

  // Filtrer les produits avec un score > 0
  const validRecommendations = scoredProducts.filter(item => item.score > 0);

  // Si aucun produit ne correspond, utiliser le cas de repli
  if (validRecommendations.length === 0) {
    const fallbackProducts = candidates
      .filter(product => {
        const fields = getUnifiedFields(product);
        return fields.rating && fields.rating >= 4; // Produits populaires
      })
      .sort((a, b) => {
        const aFields = getUnifiedFields(a);
        const bFields = getUnifiedFields(b);
        return (bFields.rating || 0) - (aFields.rating || 0);
      })
      .slice(0, limit);

    return fallbackProducts;
  }

  // Retourner les meilleurs produits limités
  return validRecommendations
    .slice(0, limit)
    .map(item => item.product);
}

// Fonction pour obtenir le titre et sous-titre selon le scoring
export function getRecommendationInfo(
  currentProduct: UnifiedProduct,
  cartItems: CartItem[],
  relatedProducts: UnifiedProduct[]
): { title: string; subtitle: string } {
  const currentFields = getUnifiedFields(currentProduct);
  
  // Si le panier contient des articles avec des thèmes
  const cartThemes = cartItems
    .filter(item => item.theme)
    .map(item => item.theme!)
    .filter((theme, index, arr) => arr.indexOf(theme) === index);

  if (cartThemes.length > 0 && relatedProducts.length > 0) {
    return {
      title: "Créations coordonnées pour votre panier",
      subtitle: `Parfaitement assorties à vos sélections ${cartThemes.slice(0, 2).join(', ')}${cartThemes.length > 2 ? '...' : ''}`
    };
  }

  // Si le produit courant a des thèmes spécifiques
  if (currentFields.themes.length > 0) {
    return {
      title: "Créations assorties pour votre événement",
      subtitle: `Complétez votre thématique ${currentFields.themes.slice(0, 2).join(', ')}${currentFields.themes.length > 2 ? '...' : ''} avec nos créations coordonnées`
    };
  }

  // Si le produit a une catégorie spécifique
  if (currentFields.category) {
    const categoryName = currentFields.category.toLowerCase();
    const isFeminine = ['faire-parts', 'invitations', 'cartes'].some(word => categoryName.includes(word));
    const accord = isFeminine ? 'artisanales' : 'artisanaux';
    
    return {
      title: "Découvertes similaires",
      subtitle: `Explorez notre collection de ${categoryName} ${accord}`
    };
  }

  // Par défaut
  return {
    title: "Nos coups de cœur pour vous",
    subtitle: "Des créations uniques qui sublimeront vos moments précieux"
  };
}

// Hook pour utiliser la logique de recommandation
export function useRecommendationLogic(
  currentProduct: UnifiedProduct,
  allProducts: UnifiedProduct[]
) {
  // Note: Ce hook doit être utilisé dans un composant client
  // Importez useCartStore directement dans le composant
  const { items } = { items: [] as CartItem[] }; // Placeholder
  
  const relatedProducts = getRelatedProducts(currentProduct, items, allProducts);
  const { title, subtitle } = getRecommendationInfo(currentProduct, items, relatedProducts);
  
  return {
    relatedProducts,
    title,
    subtitle,
    hasRecommendations: relatedProducts.length > 0
  };
}
