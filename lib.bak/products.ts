export type ProductCategoryValue =
  | "papeterie"
  | "flyers"
  | "flocages"
  | "objets-cadeaux";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  priceMax?: number;
  category: ProductCategoryValue;
  categoryLabel: string;
  rating?: number | null;
};

export function formatPriceLabel(price: number | null, priceMax?: number): string {
  if (price === null) return "Sur devis";
  const fmt = (n: number) => n.toFixed(2).replace(".", ",") + "€";
  if (priceMax !== undefined) return `De ${fmt(price)} à ${fmt(priceMax)}`;
  return fmt(price);
}

export const CATEGORIES: Array<{
  label: string;
  value: "all" | ProductCategoryValue;
}> = [
  { label: "Tout", value: "all" },
  { label: "Papeterie Personnalisée", value: "papeterie" },
  { label: "Flyers & Cartes de visite", value: "flyers" },
  { label: "Flocages", value: "flocages" },
  { label: "Objets & Cadeaux Personnalisés", value: "objets-cadeaux" },
];

export const PRODUCTS: Product[] = [
  {
    id: "obj-1",
    name: "Boîte Cadeau Personnalisée",
    slug: "boite-cadeau-personnalisee",
    price: null,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-2",
    name: "Boîte de Lait Personnalisée",
    slug: "boite-de-lait-personnalisee",
    price: null,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-3",
    name: "Boîte Pom'Potes Personnalisée",
    slug: "boite-pompotes-personnalisee",
    price: 2.30,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-4",
    name: "Boîtes de Pop Corn Personnalisées",
    slug: "boites-pop-corn-personnalisees",
    price: 2.50,
    priceMax: 5.50,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-5",
    name: "Box Pyramide",
    slug: "box-pyramide",
    price: 2.99,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-6",
    name: "Cadre Personnalisé",
    slug: "cadre-personnalise",
    price: 15.00,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
    rating: 5,
  },
  {
    id: "pap-1",
    name: "Étiquette Bouteille d'Eau",
    slug: "etiquette-bouteille-eau",
    price: 1.00,
    category: "papeterie",
    categoryLabel: "Papeterie Personnalisée",
  },
  {
    id: "pap-2",
    name: "Étiquette Capri-Sun",
    slug: "etiquette-capri-sun",
    price: 1.50,
    category: "papeterie",
    categoryLabel: "Papeterie Personnalisée",
  },
  {
    id: "pap-3",
    name: "Étiquette Champomy",
    slug: "etiquette-champomy",
    price: 2.50,
    category: "papeterie",
    categoryLabel: "Papeterie Personnalisée",
  },
  {
    id: "pap-4",
    name: "Étiquette Mini Canette Coca-Cola",
    slug: "etiquette-mini-canette-coca",
    price: 1.80,
    category: "papeterie",
    categoryLabel: "Papeterie Personnalisée",
  },
  {
    id: "fly-1",
    name: "Flyers & Cartes de Visite Sur Mesure",
    slug: "flyers-cartes-visite-sur-mesure",
    price: null,
    category: "flyers",
    categoryLabel: "Flyers & Cartes de visite",
    rating: 5,
  },
  {
    id: "obj-7",
    name: "Gourde Personnalisée",
    slug: "gourde-personnalisee",
    price: 25.00,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-8",
    name: "Haribo Dragibus",
    slug: "haribo-dragibus",
    price: 2.80,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-9",
    name: "Kinder Bueno",
    slug: "kinder-bueno",
    price: 3.20,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-10",
    name: "Kinder Country",
    slug: "kinder-country",
    price: 2.70,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-11",
    name: "Kinder Maxi",
    slug: "kinder-maxi",
    price: 2.50,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-12",
    name: "M&Ms",
    slug: "m-and-ms",
    price: 3.00,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-13",
    name: "Mini Nutella",
    slug: "mini-nutella",
    price: 2.70,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-14",
    name: "Paquet de Chips Personnalisé",
    slug: "paquet-chips-personnalise",
    price: 2.80,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "flo-1",
    name: "Planche d'Étiquette Thermocollante",
    slug: "planche-etiquette-thermocollante",
    price: null,
    category: "flocages",
    categoryLabel: "Flocages",
  },
  {
    id: "obj-15",
    name: "Plateau de Confiserie Personnalisé",
    slug: "plateau-confiserie-personnalise",
    price: null,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-16",
    name: "Sac Cadeau Personnalisé",
    slug: "sac-cadeau-personnalise",
    price: 2.90,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-17",
    name: "Sachet de Bonbons Personnalisé",
    slug: "sachet-bonbons-personnalise",
    price: 2.50,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "obj-18",
    name: "Smarties",
    slug: "smarties",
    price: 3.00,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
  {
    id: "pap-5",
    name: "Stickers Personnalisés",
    slug: "stickers-personnalises",
    price: null,
    category: "papeterie",
    categoryLabel: "Papeterie Personnalisée",
    rating: 4,
  },
  {
    id: "flo-2",
    name: "T-Shirt Personnalisé",
    slug: "t-shirt-personnalise",
    price: 25.00,
    priceMax: 30.00,
    category: "flocages",
    categoryLabel: "Flocages",
    rating: 4,
  },
  {
    id: "obj-19",
    name: "Tasse Personnalisée",
    slug: "tasse-personnalisee",
    price: 20.00,
    category: "objets-cadeaux",
    categoryLabel: "Objets & Cadeaux Personnalisés",
  },
];
