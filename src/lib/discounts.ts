export interface Coupon {
  id: string;
  code: string;
  titre: string;
  description: string;
  type: 'pourcentage' | 'montant_fixe' | 'livraison_gratuite';
  valeur: number; // pourcentage ou montant en euros
  minimum_commande?: number;
  date_debut: string;
  date_fin?: string;
  statut: 'actif' | 'inactif' | 'expiré';
  utilisations_max?: number;
  utilisations_restantes?: number;
  categories_applicables?: string[]; // slugs de catégories
  produits_applicables?: string[]; // IDs de produits
  exclusions?: string[]; // IDs de produits exclus
}

export interface AppliedDiscount {
  coupon: Coupon;
  montant_reduction: number;
  type_reduction: 'pourcentage' | 'montant_fixe' | 'livraison_gratuite';
}

// Codes de réduction officiels du site
export const OFFICIAL_COUPONS: Coupon[] = [
  {
    id: 'bienvenue10',
    code: 'BIENVENUE10',
    titre: 'Offre de bienvenue',
    description: '10% de réduction sur votre première commande',
    type: 'pourcentage',
    valeur: 10,
    minimum_commande: 50,
    date_debut: '2024-01-01',
    date_fin: '2024-12-31',
    statut: 'actif',
    utilisations_max: 1,
    utilisations_restantes: 1,
  },
  {
    id: 'fidelite5',
    code: 'FIDELITE5',
    titre: 'Réduction fidélité',
    description: '5% de réduction pour nos clients fidèles',
    type: 'pourcentage',
    valeur: 5,
    minimum_commande: 30,
    date_debut: '2024-01-01',
    date_fin: '2024-12-31',
    statut: 'actif',
    utilisations_max: 10,
    utilisations_restantes: 10,
  },
  {
    id: 'livraison75',
    code: 'LIVRAISON75',
    titre: 'Livraison offerte',
    description: 'Frais de livraison offerts dès 75\u20AC d\'achat',
    type: 'livraison_gratuite',
    valeur: 0,
    minimum_commande: 75,
    date_debut: '2024-01-01',
    date_fin: '2024-12-31',
    statut: 'actif',
    utilisations_max: 999,
    utilisations_restantes: 999,
  },
  {
    id: 'special15',
    code: 'SPECIAL15',
    titre: 'Offre spéciale',
    description: '15\u20AC de réduction sur toute la boutique',
    type: 'montant_fixe',
    valeur: 15,
    minimum_commande: 100,
    date_debut: '2024-06-01',
    date_fin: '2024-08-31',
    statut: 'actif',
    utilisations_max: 3,
    utilisations_restantes: 3,
  }
];

export function validateCoupon(code: string, montantCommande: number): Coupon | null {
  const upperCode = code.toUpperCase().trim();
  
  // D'abord vérifier les coupons officiels
  const officialCoupon = OFFICIAL_COUPONS.find(c => 
    c.code.toUpperCase() === upperCode && 
    c.statut === 'actif'
  );
  
  if (officialCoupon) {
    // Vérifier la date d'expiration
    if (officialCoupon.date_fin) {
      const dateFin = new Date(officialCoupon.date_fin);
      const aujourdHui = new Date();
      if (aujourdHui > dateFin) return null;
    }
    
    // Vérifier le minimum de commande
    if (officialCoupon.minimum_commande && montantCommande < officialCoupon.minimum_commande) {
      return null;
    }
    
    // Vérifier les utilisations restantes
    if (officialCoupon.utilisations_restantes !== undefined && officialCoupon.utilisations_restantes <= 0) {
      return null;
    }
    
    return officialCoupon;
  }
  
  // Vérifier si c'est un coupon de fidélité (commence par LOYALTY-)
  if (upperCode.startsWith('LOYALTY-')) {
    // Pour l'instant, valider les coupons de fidélité de manière basique
    // Dans une implémentation complète, il faudrait vérifier dans la base de données
    return {
      id: 'loyalty-coupon',
      code: upperCode,
      titre: 'Récompense fidélité',
      description: 'Récompense obtenue grâce au programme de fidélité',
      type: 'montant_fixe',
      valeur: upperCode.includes('DISCOUNT_5') ? 5 : 
              upperCode.includes('DISCOUNT_15') ? 15 : 0,
      minimum_commande: upperCode.includes('DISCOUNT_5') ? 30 : 
                        upperCode.includes('DISCOUNT_15') ? 50 : 0,
      date_debut: new Date().toISOString().split('T')[0],
      date_fin: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      statut: 'actif',
      utilisations_max: 1,
      utilisations_restantes: 1
    };
  }
  
  return null;
}

export function calculateDiscount(coupon: Coupon, montantCommande: number): number {
  switch (coupon.type) {
    case 'pourcentage':
      return (montantCommande * coupon.valeur) / 100;
    case 'montant_fixe':
      return Math.min(coupon.valeur, montantCommande);
    case 'livraison_gratuite':
      // La livraison gratuite ne réduit pas le montant de la commande
      return 0;
    default:
      return 0;
  }
}

export function formatDiscountValue(coupon: Coupon): string {
  switch (coupon.type) {
    case 'pourcentage':
      return `-${coupon.valeur}%`;
    case 'montant_fixe':
      return `-${coupon.valeur.toFixed(2)}\u20AC`;
    case 'livraison_gratuite':
      return 'Livraison offerte';
    default:
      return '';
  }
}
