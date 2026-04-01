import { products, type Product } from "@/data/products";
import type { Product as SupabaseProduct } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

// Types unifiés
type UnifiedProduct = Product | SupabaseProduct;
type CartItem = {
  id: string;
  nom: string;
  prix: number | string;
  quantite: number;
  image: string;
  theme?: string;
  slug: string;
};

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
      image: (product as any).images?.[0] || (product as any).image || '',
      slug: product.slug,
      rating: undefined,
      description: product.description
    };
  } else {
    return {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.,]/g, '')) || 0 : product.price,
      category: product.category || '',
      themes: (product as any).themes || [],
      image: (product as any).image || '',
      slug: product.slug,
      rating: product.rating,
      description: product.description
    };
  }
}

// Fonction principale de recommandation
export function getRelatedProducts(
  currentProduct: UnifiedProduct,
  cartItems?: CartItem[]
): Product[] {
  const currentFields = getUnifiedFields(currentProduct);
  
  // 1. Exclure le produit courant
  let candidates = products.filter(p => p.id !== currentFields.id);
  
  // 2. Priorité 1: Produits de la même catégorie
  const sameCategoryProducts = candidates.filter(p => 
    p.category === currentFields.category
  );
  
  // 3. Priorité 2: Produits partageant des thèmes
  const sameThemeProducts = candidates.filter(p => {
    const productThemes = (p as any).themes || [];
    return currentFields.themes.some((theme: string) => 
      productThemes.includes(theme)
    );
  });
  
  // 4. Priorité 3: Compléments du panier
  let cartComplementProducts: Product[] = [];
  if (cartItems && cartItems.length > 0) {
    // Analyser les thèmes du panier
    const cartThemes = cartItems
      .filter(item => item.theme)
      .map(item => item.theme!)
      .filter((theme, index, arr) => arr.indexOf(theme) === index); // Unique
    
    // Analyser les catégories du panier
    const cartCategories = cartItems
      .map(item => {
        const product = products.find(p => p.slug === item.slug);
        return product?.category || '';
      })
      .filter(cat => cat !== '')
      .filter((cat, index, arr) => arr.indexOf(cat) === index); // Unique
    
    // Produits complémentaires selon les thèmes du panier
    if (cartThemes.length > 0) {
      cartComplementProducts = candidates.filter(p => {
        const productThemes = (p as any).themes || [];
        return cartThemes.some(theme => productThemes.includes(theme));
      });
    }
    
    // Si pas assez de produits, ajouter selon les catégories du panier
    if (cartComplementProducts.length < 4 && cartCategories.length > 0) {
      const categoryComplements = candidates.filter(p => 
        cartCategories.includes(p.category || '')
      );
      cartComplementProducts = [
        ...cartComplementProducts,
        ...categoryComplements.filter(p => 
          !cartComplementProducts.some(cp => cp.id === p.id)
        )
      ];
    }
  }
  
  // 5. Combiner et dédupliquer les recommandations
  const recommendations = [
    ...sameCategoryProducts,
    ...sameThemeProducts.filter(p => 
      !sameCategoryProducts.some(cp => cp.id === p.id)
    ),
    ...cartComplementProducts.filter(p => 
      !sameCategoryProducts.some(cp => cp.id === p.id) &&
      !sameThemeProducts.some(cp => cp.id === p.id)
    )
  ];
  
  // 6. Si pas assez de recommandations, ajouter les produits populaires
  if (recommendations.length < 4) {
    const popularProducts = products
      .filter(p => p.rating)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .filter(p => 
        p.id !== currentFields.id &&
        !recommendations.some(r => r.id === p.id)
      );
    
    recommendations.push(...popularProducts);
  }
  
  // 7. Limiter à 8 produits maximum
  return recommendations.slice(0, 8);
}

// Hook pour utiliser la logique de recommandation avec le panier
export function useRelatedProducts(currentProduct: UnifiedProduct): Product[] {
  const { items } = useCartStore();
  
  return getRelatedProducts(currentProduct, items);
}

// Fonction pour obtenir le titre dynamique selon la logique utilisée
export function getRecommendationTitle(
  currentProduct: UnifiedProduct,
  cartItems?: CartItem[]
): { title: string; subtitle: string } {
  const currentFields = getUnifiedFields(currentProduct);
  
  // Si le panier contient des articles
  if (cartItems && cartItems.length > 0) {
    const cartThemes = cartItems
      .filter(item => item.theme)
      .map(item => item.theme!)
      .filter((theme, index, arr) => arr.indexOf(theme) === index);
    
    if (cartThemes.length > 0) {
      return {
        title: "Pour compléter votre sélection",
        subtitle: `D'autres créations pour vos événements ${cartThemes.join(', ')}`
      };
    }
  }
  
  // Si le produit a des thèmes spécifiques
  if (currentFields.themes.length > 0) {
    return {
      title: "Pour le même événement",
      subtitle: `D'autres créations pour vos ${currentFields.themes.join(', ')}`
    };
  }
  
  // Si le produit a une catégorie spécifique
  if (currentFields.category) {
    return {
      title: "Dans la même catégorie",
      subtitle: `Découvrez d'autres ${currentFields.category.toLowerCase()}`
    };
  }
  
  // Par défaut
  return {
    title: "Vous aimerez peut-être aussi",
    subtitle: "Découvrez d'autres créations qui pourraient vous plaire"
  };
}
