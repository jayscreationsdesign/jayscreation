import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

export interface CartItem {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
  image: string;
  theme?: string;
  personnalisation?: string;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantite: (id: string, quantite: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        console.log('🛒 Ajout article:', newItem); // Debug
        set((state) => {
          console.log('🛒 Panier actuel avant ajout:', state.items); // Debug
          
          // Chercher un article existant avec le même produit et thème (pas le même ID)
          const existingItem = state.items.find((i) => 
            i.slug === newItem.slug && 
            (i.theme || "") === (newItem.theme || "")
          );
          console.log('🛒 Article existant trouvé:', existingItem); // Debug
          
          if (existingItem) {
            console.log('🛒 Fusion article existant'); // Debug
            const updated = state.items.map((item) =>
              (item.slug === newItem.slug && (item.theme || "") === (newItem.theme || ""))
                ? { ...item, quantite: item.quantite + newItem.quantite }
                : item
            );
            console.log('🛒 Panier après fusion:', updated); // Debug
            return { items: updated };
          }
          
          console.log('🛒 Nouvel article ajouté avec ID:', newItem.id); // Debug
          const newItems = [...state.items, { ...newItem }];
          console.log('🛒 Panier après ajout:', newItems); // Debug
          return { items: newItems };
        });
      },
      
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      updateQuantite: (id: string, quantite: number) => {
        if (quantite <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantite } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      get total() {
        return get().items.reduce((sum, item) => sum + item.prix * item.quantite, 0);
      },
      
      get count() {
        return get().items.reduce((sum, item) => sum + item.quantite, 0);
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true, // Ignore l'hydratation côté serveur
    }
  )
);

// Hook pour gérer l'hydratation du store
export const useCartStoreHydration = () => {
  const hasHydrated = useCartStore.persist.hasHydrated;
  
  useEffect(() => {
    // Forcer l'hydratation côté client
    useCartStore.persist.rehydrate();
  }, []);
  
  return hasHydrated();
};
