export interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice?: number;
  category: string;
  categorySlug: string;
  parentCategorySlug?: string;
  image: string;
  images?: string[]; // Images additionnelles pour la galerie
  rating?: number;
  slug: string;
  description?: string;
  longDescription?: string;
  reviewCount?: number;
}

export const products: Product[] = [
  // PAPETERIE
  {
    id: "1",
    name: "Étiquette Bouteille d'Eau",
    price: "1,00€",
    numericPrice: 1,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Étiquette Bouteille d'Eau.png",
    images: [
      "/images/products/Étiquette Bouteille d'Eau1.png",
      "/images/products/Étiquette Bouteille d'Eau2.png"
    ],
    slug: "etiquette-bouteille-eau",
  },
  {
    id: "2",
    name: "Étiquette Capri-Sun",
    price: "1,50€",
    numericPrice: 1.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Étiquette Capri-Sun2.png",
    slug: "etiquette-capri-sun",
  },
  {
    id: "3",
    name: "Étiquette Champomy",
    price: "2,50€",
    numericPrice: 2.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/etiquette-champomy-tshirt-style.png",
    images: [
      "/images/products/etiquette-champomy-tshirt-style.png",
      "/images/products/etiquette-bouteille-eau-tshirt-style.png",
      "/images/products/etiquette-capri-sun-tshirt-style.png"
    ],
    slug: "etiquette-champomy",
  },
  {
    id: "4",
    name: "Étiquette Mini Canette Coca-Cola",
    price: "1,80€",
    numericPrice: 1.8,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "etiquette-mini-canette-coca",
  },
  {
    id: "5",
    name: "Stickers Personnalisés",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Stickers Personnalisés2.png",
    slug: "stickers-personnalises",
  },
  {
    id: "6",
    name: "Flyers & Cartes de Visite Sur Mesure",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "flyers-cartes-visite-sur-mesure",
  },
  {
    id: "7",
    name: "Boîte Cadeau Personnalisée",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîte Cadeau Personnalisée1.png",
    images: [
      "/images/products/Boîte Cadeau Personnalisée2.png",
      "/images/products/Boîte Cadeau Personnalisée3.png",
      "/images/products/Boîte Cadeau Personnalisée4.png",
      "/images/products/Boîte Cadeau Personnalisée5.png",
      "/images/products/Boîte Cadeau Personnalisée6.png",
      "/images/products/Boîte Cadeau Personnalisée8.png"
    ],
    slug: "boite-cadeau-personnalisee",
  },
  {
    id: "8",
    name: "Boîte de Lait Personnalisée",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîte de Lait Personnalisée4.png",
    images: [
      "/images/products/Boîte de Lait Personnalisée4.png",
      "/images/products/Boîte de Lait Personnalisée5.png"
    ],
    slug: "boite-lait-personnalisee",
  },
  {
    id: "9",
    name: "Boîte Pom'Potes Personnalisée",
    price: "2,30€",
    numericPrice: 2.3,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîte Pom'Potes Personnalisée2.png",
    slug: "boite-pompotes-personnalisee",
  },
  {
    id: "10",
    name: "Boîtes de Pop Corn Personnalisées",
    price: "2,50€ - 5,50€",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîtes de Pop Corn Personnalisées3.png",
    slug: "boites-pop-corn-personnalisees",
  },
  {
    id: "11",
    name: "Box Pyramide",
    price: "2,99€",
    numericPrice: 2.99,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Box Pyramide2.png",
    slug: "box-pyramide",
  },
  {
    id: "12",
    name: "Cadre Personnalisé",
    price: "15,00€",
    numericPrice: 15,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/cadre-personnalise-tshirt-style.png",
    images: [
      "/images/products/cadre-personnalise-tshirt-style.png",
      "/images/products/gourde-personnalisee-tshirt-style.png",
      "/images/products/tasse-personnalisee-tshirt-style.png"
    ],
    rating: 5,
    slug: "cadre-personnalise",
  },
  {
    id: "13",
    name: "Gourde Personnalisée",
    price: "25,00€",
    numericPrice: 25,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Gourde Personnalisée3.png",
    slug: "gourde-personnalisee",
  },
  {
    id: "14",
    name: "Haribo Dragibus",
    price: "2,80€",
    numericPrice: 2.8,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/haribo-dragibus.png",
    images: [
      "/images/products/haribo-dragibus.png",
      "/images/products/Haribo Dragibus2.png"
    ],
    slug: "haribo-dragibus",
  },
  {
    id: "15",
    name: "Kinder Bueno",
    price: "3,20€",
    numericPrice: 3.2,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    rating: 4,
    slug: "kinder-bueno",
  },
  {
    id: "16",
    name: "Kinder Country",
    price: "2,70€",
    numericPrice: 2.7,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "kinder-country",
  },
  {
    id: "17",
    name: "Kinder Maxi",
    price: "2,50€",
    numericPrice: 2.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/kinder-maxi.png",
    images: [
      "/images/products/kinder-maxi.png",
      "/images/products/Kinder Maxi2.png"
    ],
    slug: "kinder-maxi",
  },
  {
    id: "18",
    name: "M&Ms",
    price: "3,00€",
    numericPrice: 3,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/mms.png",
    images: [
      "/images/products/mms.png",
      "/images/products/M&Ms2.png"
    ],
    slug: "mms",
  },
  {
    id: "19",
    name: "Mini Nutella",
    price: "2,70€",
    numericPrice: 2.7,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/mini-nutella.png",
    slug: "mini-nutella",
  },
  {
    id: "20",
    name: "Paquet de Chips Personnalisé",
    price: "2,80€",
    numericPrice: 2.8,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Paquet de Chips Personnalisé3.png",
    images: [
      "/images/products/Paquet de Chips Personnalisé3.png",
      "/images/products/Paquet de Chips Personnalisé4.png"
    ],
    slug: "paquet-chips-personnalise",
  },
  {
    id: "21",
    name: "Plateau de Confiserie Personnalisé",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/plateau-confiserie-personnalise.png",
    images: [
      "/images/products/plateau-confiserie-personnalise.png",
      "/images/products/Plateau de Confiserie Personnalisé2.png"
    ],
    slug: "plateau-confiserie-personnalise",
  },
  {
    id: "22",
    name: "Sac Cadeau Personnalisé",
    price: "2,90€",
    numericPrice: 2.9,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/sac-cadeau-personnalise.png",
    images: [
      "/images/products/sac-cadeau-personnalise.png",
      "/images/products/Sac Cadeau Personnalisé2.png",
      "/images/products/Sac Cadeau Personnalisé3.png"
    ],
    slug: "sac-cadeau-personnalise",
  },
  {
    id: "23",
    name: "Sachet de Bonbons Personnalisé",
    price: "2,50€",
    numericPrice: 2.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/sachet-bonbons-personnalise.png",
    images: [
      "/images/products/sachet-bonbons-personnalise.png",
      "/images/products/Sachet de Bonbons Personnalisé2.png"
    ],
    slug: "sachet-bonbons-personnalise",
  },
  {
    id: "24",
    name: "Smarties",
    price: "3,00€",
    numericPrice: 3,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/smarties.png",
    images: [
      "/images/products/smarties.png",
      "/images/products/Smarties2.png",
      "/images/products/Smarties3.png",
      "/images/products/Smarties4.png"
    ],
    slug: "smarties",
  },
  {
    id: "25",
    name: "Tasse Personnalisée",
    price: "20,00€",
    numericPrice: 20,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/tasse-personnalisee-tshirt-style.png",
    images: [
      "/images/products/tasse-personnalisee-tshirt-style.png",
      "/images/products/planche-etiquette-thermocollante-tshirt-style.png",
      "/images/products/faire-part-mariage-elegant-tshirt-style.png"
    ],
    rating: 4,
    slug: "tasse-personnalisee",
  },

  // FLOCAGES
  {
    id: "26",
    name: "Planche d'Étiquette Thermocollante",
    price: "Sur devis",
    category: "Flocages",
    categorySlug: "flocage",
    image: "/images/products/planche-etiquette-thermocollante-tshirt-style.png",
    images: [
      "/images/products/planche-etiquette-thermocollante-tshirt-style.png",
      "/images/products/faire-part-mariage-elegant-tshirt-style.png",
      "/images/products/t-shirt-kael-styled.png"
    ],
    rating: 5,
    slug: "planche-etiquette-thermocollante",
  },
  {
    id: "27",
    name: "T-Shirt Personnalisé",
    price: "25,00€ - 30,00€",
    category: "Flocages",
    categorySlug: "flocage",
    image: "/images/products/T-Shirt Personnalisé.png",
    images: [
      "/images/products/T-Shirt Personnalisé1.png",
      "/images/products/T-Shirt Personnalisé2.png",
      "/images/products/T-Shirt Personnalisé3.png",
      "/images/products/T-Shirt Personnalisé4.png",
      "/images/products/T-Shirt Personnalisé5.png",
      "/images/products/T-Shirt Personnalisé6.png",
      "/images/products/T-Shirt Personnalisé8.png"
    ],
    rating: 4,
    slug: "tshirt-personnalise",
  },

  // MARIAGE - FAIRE-PARTS
  {
    id: "28",
    name: "Faire-Part Mariage Élégant",
    slug: "faire-part-mariage-elegant",
    price: "Sur devis",
    category: "Faire-parts",
    categorySlug: "faire-parts",
    parentCategorySlug: "mariage",
    image: "/images/products/faire-part-mariage-elegant-tshirt-style.png",
    images: [
      "/images/products/faire-part-mariage-elegant-tshirt-style.png",
      "/images/products/t-shirt-kael-styled.png",
      "/images/products/planche-etiquette-thermocollante-tshirt-style.png"
    ],
    description: "Faire-part de mariage élégant avec cadre géométrique, feuillage et finitions dorées. Entièrement personnalisable.",
    rating: 5,
  },
];
