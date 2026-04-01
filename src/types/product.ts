export type Product = {
  id: string;
  created_at: string;
  nom: string;
  slug: string;
  description: string | null;
  prix: number;
  prix_promo: number | null;
  categorie: string | null;
  sous_categorie: string | null;
  image_principale: string | null;
  images: string[];
  themes: string[];
  requires_theme: boolean;
  personnalisable: boolean;
  actif: boolean;
  stock: number;
  meta_title: string | null;
  meta_description: string | null;
};

export type ProductInsert = Omit<Product, 'id' | 'created_at'>;
export type ProductUpdate = Partial<ProductInsert>;
