import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          console.log('🛒 Panier actuel:', state.items); // Debug
          
          // Générer un ID unique si non fourni
          const itemWithId = {
            ...newItem,
            id: newItem.id || `${newItem.slug}-${newItem.theme || 'default'}-${Date.now()}`
          };
          
          const existingIndex = state.items.findIndex(
            (i) => i.slug === newItem.slug && 
            (i.theme || "") === (newItem.theme || "")
          );
          console.log('🛒 Index trouvé:', existingIndex); // Debug
          if (existingIndex >= 0) {
            console.log('🛒 Fusion article existant'); // Debug
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantite: updated[existingIndex].quantite + 1
            };
            console.log('🛒 Panier après fusion:', updated); // Debug
            return { items: updated };
          }
          console.log('🛒 Nouvel article ajouté avec ID:', itemWithId.id); // Debug
          return { items: [...state.items, { ...itemWithId, quantite: 1 }] };
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
