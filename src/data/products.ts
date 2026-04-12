import type { ProductPricing } from '@/types/pricing'

export interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice?: number;
  category: string;
  categorySlug: string;
  parentCategorySlug?: string;
  sous_categorie?: string;
  image: string;
  images?: string[]; // Images additionnelles pour la galerie
  rating?: number;
  slug: string;
  description?: string;
  longDescription?: string;
  reviewCount?: number;
  themes?: string[]; // Thèmes disponibles pour ce produit
  pricing?: ProductPricing; // Système de prix par quantité
  pricing_type?: string; // Type de pricing : 'unit_pricing', 'lot_pricing', 'quote'
  sizes?: Array<{
    id: string;
    label: string;
    dimension: string;
    price: number;
  }>; // Tailles disponibles avec prix
}

export const products: Product[] = [
  // PAPETERIE
  {
    id: "7",
    name: "Boîte Cadeau Personnalisée",
    price: "5,90\u20AC",
    numericPrice: 5.90,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîte Cadeau Personnalisée1.png",
    images: [
      "/images/products/Boîte Cadeau Personnalisée2.png",
      "/images/products/Boîte Cadeau Personnalisée3.png",
      "/images/products/Boîte Cadeau Personnalisée4.png",
      "/images/products/Boîte Cadeau Personnalisée6.png",
      "/images/products/Boîte Cadeau Personnalisée8.png"
    ],
    slug: "boite-cadeau-personnalisee",
    themes: ["Minnie", "Classique", "Rose"],
    description: "Boîte cadeau personnalisée premium pour mariage, anniversaire et baby-shower. Design élégant avec finitions dorées, personnalisable avec vos noms, dates et thème. Qualité artisanale garantie pour sublimer vos événements spéciaux. Emballage parfait pour vos cadeaux et souvenirs.",
    longDescription: "Créez une boîte cadeau unique et personnalisée pour vos événements les plus précieux. Notre boîte cadeau premium est entièrement personnalisable avec vos couleurs, thème, noms et dates. Idéale pour mariage, anniversaire, baby-shower ou toute célébration spéciale. Finitions artisanales de qualité avec détails dorés pour un rendu élégant et sophistiqué. Parfaite pour présenter vos cadeaux, friandises personnalisées ou souvenirs mémorables. Livraison offerte et personnalisation illimitée jusqu'à validation.",
    pricing: {
      unitPrice: 5.90,
      minQuantity: 10,
      tiers: [
        { min: 10, pricePerUnit: 5.49 } // 10 pour 54,90\u20AC
      ]
    },
    pricing_type: "lot_pricing"
  },
  {
    id: "8",
    name: "Boîte de Lait Personnalisée",
    price: "4,90\u20AC",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîte de Lait Personnalisée5.png",
    images: [
      "/images/products/Boîte de Lait Personnalisée4.png",
      "/images/products/Boîte de Lait Personnalisée2.png",
      "/images/products/Boîte de Lait Personnalisée3.png",
      "/images/products/Boîte de Lait Personnalisée6.png"
    ],
    slug: "boite-lait-personnalisee",
    themes: ["Classique", "Élégant", "Personnalisé"],
    description: "Boîte de lait personnalisée pour baptême, naissance et communion. Design charmant avec motifs délicats et personnalisable avec prénom, date et thème. Création artisanale française pour célébrer les moments précieux de votre enfant.",
    longDescription: "Célébrez les grands moments de votre enfant avec notre boîte de lait personnalisée artisanale. Parfaitement adaptée pour baptême, naissance et communion, cette boîte charmante est entièrement personnalisable avec le prénom de votre enfant, date de célébration et thème choisi. Design délicat avec motifs enfantins et finitions soignées. Création française 100% personnalisable, idéale pour contenir des friandises, petits cadeaux ou souvenirs de la cérémonie. Qualité premium et livraison offerte pour sublimer ces instants inoubliables.",
    pricing: {
      unitPrice: 4.90,
      minQuantity: 10,
      tiers: [
        { min: 10, pricePerUnit: 4.49 } // 10 pour 44,90\u20AC
      ]
    },
    pricing_type: "lot_pricing"
  },
  {
    id: "9",
    name: "Boîte Pom'Potes Personnalisée",
    price: "2,30\u20AC",
    numericPrice: 2.3,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîte Pom'Potes Personnalisée2.png",
    slug: "boite-pompotes-personnalisee",
    themes: ["Enfants", "Coloré", "Ludique"],
    description: "Boîte Pom'Potes personnalisée pour anniversaire, baby-shower et Noël. Design ludique et coloré, personnalisable avec prénom, âge et thème. Parfaite pour distribuer aux enfants lors de vos célébrations.",
    longDescription: "Ravissez les enfants avec notre boîte Pom'Potes personnalisée ! Idéale pour anniversaire, baby-shower et Noël, cette boîte ludique et colorée est entièrement personnalisable avec le prénom de l'enfant, âge et thème de la fête. Design attrayant avec motifs joyeux et couleurs vives qui plairont aux petits comme aux grands. Parfaite pour contenir des bonbons, petits jouets ou surprises. Création française de qualité, livraison rapide et personnalisation sur-mesure pour des moments de fête inoubliables.",
    pricing: {
      unitPrice: 2.30,
      minQuantity: 6,
      tiers: [
        { min: 10, pricePerUnit: 1.99 } // 10 pour 19,90\u20AC
      ]
    },
    pricing_type: "lot_pricing"
  },
  {
    id: "10",
    name: "Pots à Pop Corn Personnalisé",
    price: "2,50\u20AC - 5,50\u20AC",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Boîtes de Pop Corn Personnalisées2.png",
    images: [
      "/images/products/Boîtes de Pop Corn Personnalisées2.png",
      "/images/products/Boîtes de Pop Corn Personnalisées4.png"
    ],
    slug: "boites-pop-corn-personnalisees",
    themes: ["Cinéma", "Soirée", "Moderne"],
    description: "Pots à pop corn personnalisé pour cinéma maison, soirée film et événements. Design moderne et amusant, personnalisable avec vos noms, date et thème. Parfait pour vos soirées cinéma entre amis ou en famille.",
    longDescription: "Transformez vos soirées cinéma en moments inoubliables avec nos pots à pop corn personnalisés ! Design moderne et élégant adapté à tous vos événements : mariage, anniversaire, soirée film, baby-shower. Personnalisation complète avec vos noms, dates, messages et thème choisi. Pots de qualité supérieure avec fond renforcé pour éviter les fuites. Facile à assembler et à remplir avec votre pop corn préféré. Format individuel parfait pour chaque invité. Création française avec matériaux recyclables et encres alimentaires. Livraison rapide et personnalisation illimitée jusqu'à validation. L'accessoire indispensable pour vos soirées cinéma personnalisées !",
    pricing: {
      unitPrice: 2.50,
      minQuantity: 6,
      tiers: [
        { min: 10, pricePerUnit: 2.19 } // 10 pour 21,90\u20AC
      ]
    },
    pricing_type: "lot_pricing",
    rating: 5,
    sizes: [
      { id: "S", label: "Petit", dimension: "10 cm", price: 2.50 },
      { id: "M", label: "Moyen", dimension: "15 cm", price: 3.90 },
      { id: "L", label: "Grand", dimension: "20 cm", price: 5.50 }
    ],
  },
  {
    id: "11",
    name: "Box Pyramide",
    price: "2,99\u20AC",
    numericPrice: 2.99,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Box Pyramide2.png",
    slug: "box-pyramide",
    themes: ["Original", "Élégant", "Moderne"],
    description: "Box pyramide personnalisée pour événements et fêtes. Design élégant et original en forme de pyramide, personnalisable avec vos couleurs, texte et logo. Idéale pour mariage, anniversaire et événements d'entreprise.",
    longDescription: "Surprenez vos invités avec notre box pyramide personnalisée au design unique et élégant ! Cette boîte originale en forme de pyramide est entièrement personnalisable avec vos couleurs, texte, logo ou thème. Parfaite pour mariage, anniversaire, événements d'entreprise ou lancements de produits. Format innovant qui attire l'attention et laisse une impression durable. Création française de qualité avec matériaux premium et finitions soignées. Idéale pour contenir des confiseries, produits cosmétiques ou cadeaux d'entreprise. Personnalisation illimitée et livraison offerte pour un impact mémorable.",
    pricing: {
      unitPrice: 2.99,
      minQuantity: 6,
      tiers: [
        { min: 10, pricePerUnit: 2.59 } // 10 pour 25,90\u20AC
      ]
    },
    pricing_type: "lot_pricing"
  },
  {
    id: "12",
    name: "Cadre Personnalisé",
    price: "15,00\u20AC",
    numericPrice: 15,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "cadre-personnalise",
    themes: ["Photo", "Souvenir", "Personnalisé"],
    description: "Cadre personnalisé pour photos et souvenirs. Design élégant et moderne, personnalisable avec vos noms, dates et messages. Parfait pour mariage, anniversaire, naissance et tous vos moments précieux.",
    longDescription: "Mettez en valeur vos plus beaux souvenirs avec notre cadre personnalisé artisanal ! Ce cadre élégant et moderne est entièrement personnalisable avec vos noms, dates, messages ou citations spéciales. Parfait pour encadrer vos photos de mariage, anniversaire, naissance, diplôme ou tout moment précieux. Création française de qualité avec matériaux premium et finitions soignées. Disponible en plusieurs tailles et couleurs pour s'adapter à votre décoration. Idéal comme cadeau personnalisé ou pour votre propre décoration intérieure. Personnalisation sur-mesure et livraison soignée.",
    pricing: {
      unitPrice: 15.00,
      minQuantity: 3,
      tiers: [
        { min: 5, pricePerUnit: 13.90 } // 5 pour 69,50\u20AC
      ]
    },
    pricing_type: "lot_pricing"
  },
  {
    id: "30",
    name: "Cône Friandise Personnalisé",
    slug: "cone-friandise-personnalise",
    themes: ["Minnie", "Rose", "Classique"],
    price: "3,90\u20AC",
    numericPrice: 3.90,
    pricing_type: "lot_pricing",
    category: "Papeterie Personnalisée",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/67.png",
    images: [
      "/images/products/67.png",
      "/images/products/68.png",
      "/images/products/Site internet (3).png",
      "/images/products/Site internet (1).png",
      "/images/products/Site internet (2).png",
      "/images/products/Site internet (7).png"
    ],
    description: "Cône friandise personnalisé pour mariage, baptême et anniversaire. Design pratique et élégant, personnalisable avec vos noms, dates et thème. Idéal pour distribuer bonbons et confiseries lors de vos célébrations.",
    longDescription: "Ajoutez une touche d'élégance pratique à vos événements avec notre cône friandise personnalisé ! Parfait pour mariage, baptême, anniversaire et toutes vos célébrations, ce cône pratique et élégant est entièrement personnalisable avec vos noms, dates de l'événement et thème choisi. Format idéal pour distribuer bonbons, confiseries, dragées ou petites friandises à vos invités. Création française de qualité avec matériaux résistants et finitions soignées. Design stable et facile à manipuler pour vos invités. Personnalisation sur-mesure et livraison rapide pour des événements mémorables et pratiques.",
    rating: 5,
    pricing: {
      unitPrice: 3.90,
      minQuantity: 6,
      tiers: [
        { min: 6, pricePerUnit: 3.49 } // 6 pour 20,94\u20AC
      ]
    }
  },
  {
    id: "6",
    name: "Flyers & Cartes de Visite Sur Mesure",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Flyers & Cartes de Visite Sur Mesure2.png",
    images: [
      "/images/products/Flyers & Cartes de Visite Sur Mesure2.png"
    ],
    slug: "flyers-cartes-visite-sur-mesure",
    themes: ["Professionnel", "Entreprise", "Moderne"],
    description: "Flyers et cartes de visite sur mesure pour professionnels et événements. Design professionnel et moderne, personnalisable avec votre logo, couleurs et informations. Parfait pour communication d'entreprise et promotion événementielle.",
    longDescription: "Communiquez avec style et professionnalisme grâce à nos flyers et cartes de visite sur mesure ! Parfaits pour professionnels, entreprises, événements et promotions, ces supports de communication sont entièrement personnalisables avec votre logo, couleurs corporatives, informations de contact et message. Design moderne et percutant pour attirer l'attention et mémoriser votre marque. Création française de qualité avec papier premium et finitions soignées. Idéal pour networking, marketing événementiel, lancement de produits ou communication d'entreprise. Personnalisation complète et livraison rapide pour une communication efficace."
  },
  {
    id: "13",
    name: "Gourde Personnalisée",
    price: "25,00\u20AC",
    numericPrice: 25,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Gourde Personnalisée2.png",
    images: [
      "/images/products/Gourde Personnalisée3.png"
    ],
    slug: "gourde-personnalisee",
    themes: ["Stitch", "Hawaï", "Bleu"],
    description: "Gourde personnalisée pour sport, bureau et événements. Design moderne et éco-responsable, personnalisable avec vos noms, logo et couleurs. Parfaite pour mariage, entreprise et usage quotidien.",
    longDescription: "Hydratez-vous avec style grâce à notre gourde personnalisée premium ! Design moderne et éco-responsable, cette gourde réutilisable est entièrement personnalisable avec vos noms, logo, couleurs et messages. Parfaite pour mariage, événements d'entreprise, sport ou usage quotidien. Matériaux de qualité supérieure avec isolation thermique pour garder vos boissons au frais ou au chaud. Création française durable avec finitions soignées et design ergonomique. Idéale comme cadeau promotionnel, souvenir d'événement ou pour votre usage personnel. Personnalisation sur-mesure et livraison rapide pour une hydratation stylisée et responsable."
  },

  // PAPETERIE SAISONNIÈRE
  {
    id: "31",
    name: "Carte de Noël Personnalisée",
    slug: "carte-noel-personnalisee",
    themes: ["Noël", "Festif", "Hiver"],
    price: "Sur devis",
    category: "Papeterie Saisonnière",
    categorySlug: "papeterie-saisonniere",
    image: "/images/products/placeholder.png",
    description: "Carte de Noël personnalisée pour vœux de fin d'année. Design festif et élégant avec motifs de Noël, personnalisable avec vos noms, messages et photos. Parfaite pour envoyer vos vœux chaleureux à vos proches.",
    longDescription: "Envoyez vos vœux de Noël avec notre carte personnalisée festive et élégante ! Parfaite pour célébrer la magie de Noël, cette carte est entièrement personnalisable avec vos noms, messages personnalisés, photos de famille et motifs de Noël traditionnels ou modernes. Design de qualité avec finitions soignées et couleurs festives qui illuminent vos vœux. Idéale pour famille, amis, collègues ou clients. Création française artisanale avec papier premium et impression de qualité. Personnalisation complète et livraison rapide pour des vœux de Noël inoubliables et chaleureux.",
    rating: 5,
  },
  {
    id: "32",
    name: "Décoration Saint-Valentin",
    slug: "decoration-saint-valentin",
    themes: ["Amour", "Cœurs", "Romantique"],
    price: "Sur devis",
    category: "Papeterie Saisonnière",
    categorySlug: "papeterie-saisonniere",
    image: "/images/products/placeholder.png",
    description: "Décoration Saint-Valentin pour célébrer l'amour. Design romantique avec cœurs et motifs d'amour, personnalisable avec vos noms, date et messages. Parfaite pour déclarer votre flamme et surprendre votre bien-aimé.",
    longDescription: "Déclarez votre amour avec notre décoration Saint-Valentin romantique et personnalisée ! Célébrez la fête des amoureux avec des créations uniques entièrement personnalisables avec vos noms, date spéciale, messages d'amour et motifs romantiques. Design élégant avec cœurs, fleurs et symboles d'amour qui expriment vos sentiments les plus doux. Parfaite pour surprendre votre partenaire, organiser une déclaration romantique ou décorer votre soirée Saint-Valentin. Création française artisanale avec matériaux premium et finitions soignées. Personnalisation complète et livraison rapide pour une célébration d'amour inoubliable et mémorable.",
    rating: 5,
  },
  {
    id: "33",
    name: "Garniture Pâques",
    slug: "garniture-paques",
    themes: ["Pâques", "Printemps", "Lapins"],
    price: "Sur devis",
    category: "Papeterie Saisonnière",
    categorySlug: "paques",
    sous_categorie: "Pâques",
    image: "/images/products/placeholder.png",
    description: "Garniture Pâques avec œufs et lapins décoratifs. Ambiance printanière et joyeuse, personnalisable avec vos noms, messages et couleurs. Parfaite pour célébrer la résurrection et le renouveau du printemps.",
    longDescription: "Célébrez Pâques avec notre garniture festive et printanière ! Créez une ambiance joyeuse et colorée avec des décorations entièrement personnalisables featuring œufs décoratifs, lapins symboliques et motifs printaniers. Parfaitement adaptée pour célébrer la résurrection et le renouveau, cette garniture est personnalisable avec vos noms, messages de Pâques et couleurs choisies. Idéale pour décorer votre maison, organiser une chasse aux œufs ou célébrer en famille. Création française artisanale avec matériaux de qualité et finitions soignées. Personnalisation complète et livraison rapide pour des fêtes de Pâques inoubliables et pleines de joie.",
    rating: 5,
  },
  {
    id: "34",
    name: "Décoration Halloween",
    slug: "decoration-halloween",
    themes: ["Halloween", "Effrayant", "Citrouilles"],
    price: "Sur devis",
    category: "Papeterie Saisonnière",
    categorySlug: "papeterie-saisonniere",
    image: "/images/products/placeholder.png",
    description: "Décoration Halloween avec citrouilles et motifs effrayants. Pour une soirée mémorable et terrifiante, personnalisable avec vos messages, noms et thème gothique. Parfaite pour effrayer vos invités et célébrer Halloween.",
    longDescription: "Transformez votre soirée en un Halloween mémorable avec notre décoration effrayante et personnalisée ! Créez une ambiance terrifiante avec des citrouilles sculptées, fantômes, chauves-souris et motifs horribles entièrement personnalisables avec vos messages d'Halloween, noms et thème gothique. Parfaite pour effrayer vos invités, organiser une soirée d'horreur ou célébrer la nuit la plus effrayante de l'année. Design authentique avec couleurs sombres et détails effrayants pour une immersion totale. Création française artisanale avec matériaux résistants et finitions soignées. Personnalisation complète et livraison rapide pour une célébration d'Halloween inoubliable et terrifiante.",
    rating: 5,
  },
  {
    id: "35",
    name: "Boîte à Oeuf de Pâques Personnalisée",
    slug: "boite-oeuf-paques-personnalisee",
    themes: ["Pâques", "Stitch", "Printemps"],
    price: "6,90\u20AC",
    category: "Papeterie Saisonnière",
    categorySlug: "paques",
    sous_categorie: "Pâques",
    image: "/images/products/36.png",
    images: [
      "/images/products/38.png"
    ],
    description: "Boîte à œuf de Pâques personnalisée pour vos célébrations printanières. Design unique et coloré avec motifs de Pâques, personnalisable avec vos noms, messages et couleurs. Parfaite pour chasse aux œufs et cadeaux de Pâques.",
    longDescription: "Rendez votre chasse aux œufs inoubliable avec notre boîte à œuf de Pâques personnalisée ! Design unique et coloré avec motifs traditionnels de Pâques, cette boîte est entièrement personnalisable avec vos noms, messages de Pâques, couleurs choisies et thématiques printanières. Parfaite pour organiser une chasse aux œufs mémorable, distribuer des œufs en chocolat ou offrir des cadeaux de Pâques personnalisés. Création française artisanale avec matériaux résistants et finitions soignées. Format adapté pour contenir plusieurs œufs et facile à manipuler par les enfants. Personnalisation complète et livraison rapide pour des célébrations de Pâques joyeuses et mémorables.",
    rating: 5,
    pricing: {
      unitPrice: 6.38,
      minQuantity: 5,
      tiers: [
        { min: 5, pricePerUnit: 6.38 } // 5 pour 31,90\u20AC
      ]
    },
    pricing_type: "lot_pricing"
  },
  {
    id: "14",
    name: "Haribo Dragibus",
    price: "2,80\u20AC",
    numericPrice: 2.8,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Haribo Dragibus2.png",
    slug: "haribo-dragibus",
    themes: ["Bonbons", "Coloré", "Festif"],
    description: "Haribo Dragibus personnalisé pour événements et fêtes. Bonbons colorés et sucrés, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et toutes vos célébrations gourmandes.",
    longDescription: "Régalez vos invités avec nos Haribo Dragibus personnalisés ! Ces bonbons colorés et sucrés sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaits pour mariage, anniversaire, baby-shower ou toute célébration gourmande, les Dragibus sont appréciés par petits et grands. Packaging personnalisé avec design élégant et couleurs assorties à votre événement. Qualité Haribo garantie avec saveurs fruitées intenses et texture unique. Idéal pour sweet table, cadeaux d'invités ou distribution pendant la fête. Personnalisation sur-mesure et livraison rapide pour des moments sucrés inoubliables."
  },
  {
    id: "15",
    name: "Kinder Bueno",
    price: "3,20\u20AC",
    numericPrice: 3.2,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    rating: 4,
    slug: "kinder-bueno",
    themes: ["Chocolat", "Noisettes", "Gourmand"],
    description: "Kinder Bueno personnalisé pour événements gourmands. Chocolat croquant et noisettes, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et fêtes sucrées.",
    longDescription: "Faites fondre vos invités avec nos Kinder Bueno personnalisés ! Ces barres chocolatées croquantes avec noisettes sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour mariage, anniversaire, baby-shower ou toute célébration gourmande, les Kinder Bueno séduisent les amateurs de chocolat. Packaging élégant personnalisé avec design moderne et couleurs assorties. Qualité Kinder garantie avec chocolat de qualité et noisettes croustillantes. Idéal pour sweet table, cadeaux gourmands ou distribution pendant la fête. Personnalisation sur-mesure et livraison soignée pour des moments chocolatés inoubliables."
  },
  {
    id: "16",
    name: "Kinder Country",
    price: "2,70\u20AC",
    numericPrice: 2.7,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "kinder-country",
    themes: ["Lait", "Céréales", "Doux"],
    description: "Kinder Country personnalisé pour événements doux. Lait et céréales croquantes, personnalisable avec vos noms, dates et thème. Parfait pour mariage, baptême et célébrations familiales.",
    longDescription: "Régalez-vous avec nos Kinder Country personnalisés ! Ces barres douces avec céréales croquantes sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour mariage, baptême, baby-shower ou célébrations familiales, les Kinder Country plaisent aux enfants comme aux adultes. Packaging personnalisé avec design chaleureux et couleurs douces. Qualité Kinder garantie avec lait frais et céréales croustillantes. Idéal pour sweet table, cadeaux pour enfants ou distribution pendant la fête. Personnalisation sur-mesure et livraison rapide pour des moments tendres inoubliables."
  },
  {
    id: "17",
    name: "Kinder Maxi",
    price: "2,50\u20AC",
    numericPrice: 2.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Kinder Maxi2.png",
    slug: "kinder-maxi",
    themes: ["Chocolat", "Gourmand", "Classique"],
    description: "Kinder Maxi personnalisé pour événements généreux. Lait et cacao intenses, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et grandes célébrations.",
    longDescription: "Partagez la générosité avec nos Kinder Maxi personnalisés ! Ces barres au format généreux avec lait et cacao intenses sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour mariage, anniversaire, baby-shower ou grandes célébrations, les Kinder Maxi satisfont les gourmands les plus exigeants. Packaging personnalisé avec design élégant et couleurs riches. Qualité Kinder garantie avec chocolat intense et texture crémeuse. Idéal pour sweet table, cadeaux impressionnants ou distribution pendant la fête. Personnalisation sur-mesure et livraison soignée pour des moments généreux inoubliables."
  },
  {
    id: "18",
    name: "M&Ms",
    price: "3,00\u20AC",
    numericPrice: 3,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/M&Ms2.png",
    slug: "mms",
    themes: ["Coloré", "Festif", "Chocolat"],
    description: "M&Ms personnalisés pour événements colorés. Chocolat au lait en coque colorée, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et fêtes joyeuses.",
    longDescription: "Ajoutez de la couleur à vos événements avec nos M&Ms personnalisés ! Ces chocolats au lait en coque colorée sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaits pour mariage, anniversaire, baby-shower ou fêtes joyeuses, les M&Ms enchantent petits et grands avec leurs couleurs vives. Packaging personnalisé avec design dynamique et couleurs assorties. Qualité M&Ms garantie avec chocolat de qualité et coque croquante. Idéal pour sweet table, cadeaux colorés ou distribution pendant la fête. Personnalisation sur-mesure et livraison rapide pour des moments colorés inoubliables."
  },
  {
    id: "19",
    name: "Mini Nutella",
    price: "2,70\u20AC",
    numericPrice: 2.7,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Mini Nutella2.png",
    slug: "mini-nutella",
    themes: ["Chocolat", "Gourmand", "Noisette"],
    description: "Mini Nutella personnalisé pour événements gourmands. Pâte à tartiner chocolat noisette, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et goûters d'enfants.",
    longDescription: "Régalez petits et grands avec nos Mini Nutella personnalisés ! Ces pots de pâte à tartiner chocolat noisette sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaits pour mariage, anniversaire, baby-shower ou goûters d'enfants, les Mini Nutella séduisent les amateurs de saveurs douces. Packaging personnalisé avec design gourmand et couleurs chaleureuses. Qualité Nutella garantie avec pâte onctueuse et saveur authentique. Idéal pour sweet table, cadeaux gourmands ou distribution pendant la fête. Personnalisation sur-mesure et livraison soignée pour des moments gourmands inoubliables."
  },
  {
    id: "20",
    name: "Paquet de Chips Personnalisé",
    price: "2,80\u20AC",
    numericPrice: 2.8,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Paquet de Chips Personnalisé2.png",
    images: [
      "/images/products/Paquet de Chips Personnalisé5.png",
      "/images/products/Paquet de Chips Personnalisé2.png",
      "/images/products/Paquet de Chips Personnalisé4.png",
      "/images/products/Paquet de Chips Personnalisé3.png"
    ],
    slug: "paquet-chips-personnalise",
    themes: ["Salé", "Festif", "Original"],
    description: "Paquet de chips personnalisé pour événements salés. Chips croustillantes et salées, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et soirées conviviales.",
    longDescription: "Ajoutez une touche salée à vos événements avec nos paquets de chips personnalisés ! Ces chips croustillantes et salées sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaits pour mariage, anniversaire, baby-shower ou soirées conviviales, les chips plaisent à tous les invités. Packaging personnalisé avec design moderne et couleurs dynamiques. Qualité garantie avec chips fraîches et croustillantes. Idéal pour sweet table, apéritifs personnalisés ou distribution pendant la fête. Personnalisation sur-mesure et livraison rapide pour des moments salés inoubliables."
  },
  {
    id: "21",
    name: "Plateau de Confiserie Personnalisé",
    price: "8,90\u20AC",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Plateau de Confiserie Personnalisé2.png",
    slug: "plateau-confiserie-personnalise",
    themes: ["Confiseries", "Assortiment", "Gourmand"],
    description: "Plateau de confiserie personnalisé pour événements gourmets. Assortiment varié de bonbons et friandises, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et réceptions élégantes.",
    longDescription: "Impressionnez vos invités avec notre plateau de confiserie personnalisé haut de gamme ! Cet assortiment varié de bonbons et friandises est entièrement personnalisable avec vos noms, dates de l'événement et thème choisi. Parfait pour mariage, anniversaire, baby-shower ou réceptions élégantes, ce plateau offre une expérience gourmande sophistiquée. Design élégant avec présentation soignée et couleurs assorties à votre événement. Sélection de confiseries de qualité avec saveurs variées pour satisfaire tous les palais. Idéal pour centre de table, sweet table ou distribution personnalisée. Personnalisation complète et livraison soignée pour des moments gourmets inoubliables."
  },
  {
    id: "22",
    name: "Sac Cadeau Personnalisé",
    price: "2,90\u20AC",
    numericPrice: 2.9,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Sac Cadeau Personnalisé1.png",
    images: [
      "/images/products/Sac Cadeau Personnalisé2.png",
      "/images/products/Sac Cadeau Personnalisé3.png"
    ],
    slug: "sac-cadeau-personnalise",
    themes: ["Emballage", "Élégant", "Cadeau"],
    description: "Sac cadeau personnalisé pour événements et cadeaux. Design élégant et pratique, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et distribution de cadeaux.",
    longDescription: "Emballez vos cadeaux avec style grâce à notre sac cadeau personnalisé ! Ce sac élégant et pratique est entièrement personnalisable avec vos noms, dates de l'événement et thème choisi. Parfait pour mariage, anniversaire, baby-shower ou distribution de cadeaux, ce sac allie esthétique et fonctionnalité. Design moderne avec matériaux résistants et finitions soignées. Format adapté pour contenir divers cadeaux et friandises. Idéal pour cadeaux d'invités, souvenirs d'événement ou emballage personnalisé. Personnalisation sur-mesure et livraison rapide pour des cadeaux emballés avec élégance."
  },
  {
    id: "23",
    name: "Sachet de Bonbons Personnalisé",
    price: "2,50\u20AC",
    numericPrice: 2.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/bonbon4.png",
    images: [
      "/images/products/bonbon4.png",
      "/images/products/Sachet de Bonbons Personnalisé2.png"
    ],
    slug: "sachet-bonbons-personnalise",
    themes: ["Bonbons", "Distribution", "Festif"],
    description: "Sachet de bonbons personnalisé pour événements sucrés. Assortiment de bonbons variés, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et cadeaux gourmands.",
    longDescription: "Régalez vos invités avec notre sachet de bonbons personnalisé ! Cet assortiment de bonbons variés est entièrement personnalisable avec vos noms, dates de l'événement et thème choisi. Parfait pour mariage, anniversaire, baby-shower ou cadeaux gourmands, ce sachet offre une expérience sucrée mémorable. Design charmant avec matériaux de qualité et finitions soignées. Format pratique pour distribution individuelle ou sweet table. Sélection de bonbons appréciés par petits et grands. Idéal pour cadeaux d'invités, souvenirs personnalisés ou distribution pendant la fête. Personnalisation sur-mesure et livraison rapide pour des moments sucrés inoubliables."
  },
  {
    id: "24",
    name: "Smarties",
    price: "3,00\u20AC",
    numericPrice: 3,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Smarties1.png",
    images: [
      "/images/products/Smarties2.png",
      "/images/products/Smarties3.png",
      "/images/products/Smarties4.png"
    ],
    slug: "smarties",
    themes: ["Coloré", "Enfants", "Festif"],
    description: "Smarties personnalisés pour événements colorés. Chocolat au lait en coque colorée, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et fêtes joyeuses.",
    longDescription: "Ajoutez une touche colorée et joyeuse à vos événements avec nos Smarties personnalisés ! Ces chocolats au lait en coque colorée sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaits pour mariage, anniversaire, baby-shower ou fêtes joyeuses, les Smarties enchantent petits et grands avec leurs couleurs vives et saveurs fruitées. Packaging personnalisé avec design dynamique et couleurs assorties. Qualité Smarties garantie avec chocolat de qualité et coque croustillante. Idéal pour sweet table, cadeaux colorés ou distribution pendant la fête. Personnalisation sur-mesure et livraison rapide pour des moments joyeux inoubliables."
  },
  {
    id: "5",
    name: "Stickers Personnalisés",
    price: "Sur devis",
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Stickers Personnalisés2.png",
    slug: "stickers-personnalises",
    themes: ["Décoration", "Personnalisé", "Coloré"],
    description: "Stickers personnalisés pour événements et branding. Design créatif et adhésif, personnalisable avec vos logos, textes et couleurs. Parfait pour mariage, entreprise et communication visuelle.",
    longDescription: "Communiquez avec créativité grâce à nos stickers personnalisés ! Ces autocollants créatifs et adhésifs sont entièrement personnalisables avec vos logos, textes, images et couleurs. Parfaits pour mariage, événements, entreprise ou communication visuelle, ces stickers offrent une solution polyvalente et efficace. Design moderne avec matériaux de qualité et adhérence durable. Format adapté pour divers supports et applications. Idéal pour branding, décoration événementielle, étiquetage personnalisé ou communication marketing. Personnalisation complète et livraison rapide pour une communication visuelle impactante."
  },
  {
    id: "25",
    name: "Tasse Personnalisée",
    price: "20,00\u20AC",
    numericPrice: 20,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "tasse-personnalisee",
    themes: ["Boisson", "Personnalisé", "Quotidien"],
    description: "Tasse personnalisée pour bureau et événements. Design élégant et pratique, personnalisable avec vos noms, logos et messages. Parfait pour mariage, entreprise et usage quotidien.",
    longDescription: "Commencez la journée avec style grâce à notre tasse personnalisée premium ! Cette tasse élégante et pratique est entièrement personnalisable avec vos noms, logos, messages ou citations spéciales. Parfaite pour mariage, événements d'entreprise, bureau ou usage quotidien, elle allie esthétique et fonctionnalité. Matériaux de qualité supérieure avec céramique durable et impression haute définition. Format ergonomique avec poignée confortable et base stable. Idéale comme cadeau promotionnel, souvenir d'événement ou pour votre consommation personnelle. Personnalisation sur-mesure et livraison soignée pour des moments caféinés stylisés."
  },
  {
    id: "1",
    name: "Étiquette Bouteille d'Eau",
    price: "1,00\u20AC",
    numericPrice: 1,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Étiquette Bouteille d'Eau.png",
    images: [
      "/images/products/Étiquette Bouteille d'Eau1.png",
      "/images/products/Étiquette Bouteille d'Eau2.png",
      "/images/products/Étiquette Bouteille d'Eau3.png"
    ],
    slug: "etiquette-bouteille-eau",
    themes: ["Élégant", "Rafraîchissant", "Moderne"],
    description: "Étiquette bouteille d'eau personnalisée pour événements. Design pratique et élégant, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et rafraîchissement personnalisé.",
    longDescription: "Rafraîchissez vos invités avec style grâce à nos étiquettes bouteille d'eau personnalisées ! Ces étiquettes pratiques et élégantes sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour mariage, anniversaire, baby-shower ou événements d'entreprise, elles transforment des bouteilles simples en éléments décoratifs personnalisés. Design moderne avec matériaux résistants à l'eau et adhérence durable. Format adapté pour bouteilles standards et facile à appliquer. Idéal pour tables d'invités, distribution personnalisée ou branding événementiel. Personnalisation sur-mesure et livraison rapide pour un rafraîchissement stylisé."
  },
  {
    id: "2",
    name: "Étiquette Capri-Sun",
    price: "1,50\u20AC",
    numericPrice: 1.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Étiquette CapriSun2.png",
    images: [
      "/images/products/Étiquette CapriSun2.png",
      "/images/products/Étiquette CapriSun4.png"
    ],
    slug: "etiquette-capri-sun",
    themes: ["Enfants", "Jus", "Coloré"],
    description: "Étiquette Capri-Sun personnalisée pour événements enfants. Design coloré et ludique, personnalisable avec vos noms, dates et thème. Parfait pour anniversaire, baby-shower et boissons personnalisées.",
    longDescription: "Ravissez les enfants avec nos étiquettes Capri-Sun personnalisées ! Ces étiquettes colorées et ludiques sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour anniversaire, baby-shower, fêtes d'enfants ou événements familiaux, elles transforment les jus Capri-Sun en éléments décoratifs amusants. Design enfantin avec couleurs vives et motifs joyeux qui plaisent aux petits. Matériaux résistants et faciles à appliquer sur les emballages originaux. Idéal pour tables d'enfants, cadeaux d'invités ou animation de fête. Personnalisation sur-mesure et livraison rapide pour des moments enfants joyeux."
  },
  {
    id: "3",
    name: "Étiquette Champomy",
    price: "2,50\u20AC",
    numericPrice: 2.5,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "etiquette-champomy",
    themes: ["Fête", "Élégant", "Sans Alcool"],
    description: "Étiquette Champomy personnalisée pour événements enfants. Design festif et élégant, personnalisable avec vos noms, dates et thème. Parfait pour baptême, anniversaire et célébrations sans alcool.",
    longDescription: "Célébrez en élégance avec nos étiquettes Champomy personnalisées ! Ces étiquettes festives et élégantes sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour baptême, anniversaire, baby-shower ou célébrations familiales, elles transforment les jus Champomy en boissons festives personnalisées. Design sophistiqué avec couleurs douces et motifs élégants adaptés aux célébrations. Matériaux premium avec finitions soignées et adhérence parfaite. Idéal pour tables d'honneur, cadeaux d'invités ou moments spéciaux. Personnalisation sur-mesure et livraison soignée pour des célébrations élégantes inoubliables."
  },
  {
    id: "4",
    name: "Étiquette Mini Canette Coca-Cola",
    price: "1,80\u20AC",
    numericPrice: 1.8,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "etiquette-mini-canette-coca",
    themes: ["Moderne", "Rafraîchissant", "Coca-Cola"],
    description: "Étiquette mini canette Coca-Cola personnalisée pour événements. Design moderne et rafraîchissant, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et boissons personnalisées.",
    longDescription: "Rafraîchissez vos événements avec nos étiquettes mini canette Coca-Cola personnalisées ! Ces étiquettes modernes et rafraîchissantes sont entièrement personnalisables avec vos noms, dates de l'événement et thème choisi. Parfaites pour mariage, anniversaire, baby-shower ou événements d'entreprise, elles transforment les mini canettes Coca-Cola en éléments décoratifs personnalisés. Design dynamique avec couleurs énergiques et motifs contemporains. Matériaux résistants adaptés aux canettes et faciles à appliquer. Idéal pour bars événementiels, tables d'invités ou distribution personnalisée. Personnalisation sur-mesure et livraison rapide pour un rafraîchissement moderne inoubliable."
  },

  // FLOCAGES
  {
    id: "26",
    name: "Planche d'Étiquette Thermocollante",
    price: "Sur devis",
    category: "Flocages",
    categorySlug: "flocage",
    image: "/images/products/placeholder.png",
    images: [],
    rating: 5,
    slug: "planche-etiquette-thermocollante",
    themes: ["Textile", "Personnalisé", "Professionnel"],
    description: "Planche d'étiquette thermocollante pour textile et personnalisations. Design professionnel et durable, personnalisable avec vos logos, textes et images. Parfait pour vêtements, accessoires et branding.",
    longDescription: "Personnalisez vos textiles avec notre planche d'étiquette thermocollante professionnelle ! Cette solution de marquage textile est entièrement personnalisable avec vos logos, textes, images et designs. Parfaite pour vêtements, accessoires, uniformes d'équipe ou branding d'entreprise, elle offre une application facile et un résultat durable. Matériaux thermocollants de qualité supérieure avec excellente adhérence et résistance au lavage. Design moderne avec finitions professionnelles et couleurs vives. Idéal pour flocage personnalisé, marquage textile ou création de ligne de vêtements. Personnalisation complète et livraison rapide pour un branding textile impactant."
  },
  {
    id: "27",
    name: "T-Shirt Personnalisé",
    price: "25,00\u20AC - 30,00\u20AC",
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
    themes: ["Personnages", "Super-héros", "Original"],
    description: "T-shirt personnalisé pour événements et branding. Design moderne et confortable, personnalisable avec vos logos, textes et images. Parfait pour mariage, entreprise et groupes.",
    longDescription: "Exprimez votre style avec notre t-shirt personnalisé premium ! Ce t-shirt moderne et confortable est entièrement personnalisable avec vos logos, textes, images et designs. Parfait pour mariage, événements d'entreprise, groupes d'amis ou promotion de marque, il allie confort et style. Matériaux de qualité supérieure avec coton respirant et finitions soignées. Impression haute définition durable et résistante au lavage. Coupe ajustée et disponible en plusieurs tailles. Idéal pour uniformes d'équipe, cadeaux personnalisés ou création de ligne de vêtements. Personnalisation complète et livraison soignée pour un style unique inoubliable."
  },

  // MARIAGE - FAIRE-PARTS
  {
    id: "28",
    name: "Faire-Part Mariage Élégant",
    slug: "faire-part-mariage-elegant",
    themes: ["Mariage", "Élégant", "Doré"],
    price: "Sur devis",
    category: "Faire-parts",
    categorySlug: "faire-parts",
    parentCategorySlug: "mariage",
    image: "/images/products/Faire-Part Mariage Élégant.png",
    description: "Faire-part de mariage élégant avec cadre géométrique, feuillage et finitions dorées. Entièrement personnalisable avec vos noms, date et informations de cérémonie. Création artisanale française pour un mariage inoubliable.",
    longDescription: "Annoncez votre mariage avec notre faire-part élégant et sophistiqué ! Ce faire-part premium présente un cadre géométrique délicat avec feuillage artistique et finitions dorées luxueuses. Entièrement personnalisable avec vos noms de mariés, date de mariage, lieu de cérémonie et informations de réception. Création artisanale française avec papier de qualité et impression haute définition. Design intemporel qui allie modernité et tradition pour un impact mémorable. Idéal pour annoncer votre union avec classe et élégance. Personnalisation complète, maquette sous 24h et livraison soignée pour des faire-parts dignes de ce jour spécial.",
    rating: 5,
  },

  // MARIAGE - MARQUE-PLACES
  {
    id: "29",
    name: "Éventail Programme de Mariage",
    slug: "eventail-programme-mariage",
    themes: ["Mariage", "Élégant", "Programme"],
    price: "Sur devis",
    category: "Marque-places",
    categorySlug: "marque-places",
    parentCategorySlug: "mariage",
    image: "/images/products/Eventail programme mariage4.png",
    images: [
      "/images/products/Eventail programme mariage2.png",
      "/images/products/Eventail programme mariage5.png"
    ],
    description: "Éventail programme de mariage élégant et pratique pour vos invités. Design personnalisable avec programme détaillé, noms, date et thème de mariage. Accessoire utile et décoratif pour votre cérémonie.",
    longDescription: "Guidez vos invités avec style grâce à notre éventail programme de mariage élégant et fonctionnel ! Cet accessoire pratique présente le déroulement complet de votre cérémonie avec horaires, lieux et informations importantes. Entièrement personnalisable avec vos noms, date de mariage, programme détaillé et thème choisi. Design raffiné avec matériaux de qualité et finitions soignées. Format compact et facile à manipuler pour vos invités. Double fonction : programme informatif et éventail rafraîchissant. Création artisanale française avec impression de qualité. Personnalisation complète et livraison soignée pour un mariage parfaitement orchestré.",
    rating: 5,
  },

  // PRODUITS PERSONNALISÉS - SYSTÈME DE PRIX PAR QUANTITÉ
  {
    id: "30",
    name: "Boîte à Pop Corn Personnalisée",
    price: "Sur devis",
    numericPrice: 2.50,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/boite-pop-corn.png",
    slug: "boite-pop-corn-personnalisee",
    themes: ["Anniversaire", "Cinéma", "Fête"],
    description: "Boîte à pop corn personnalisée pour vos événements. Design original et personnalisable avec vos couleurs, thème et texte.",
    pricing: {
      unitPrice: 2.50,
      minQuantity: 6
    }
  },
  {
    id: "31",
    name: "Kinder Maxi Personnalisé",
    price: "Sur devis",
    numericPrice: 3.50,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/kinder-maxi.png",
    slug: "kinder-maxi-personnalise",
    themes: ["Anniversaire", "Enfant", "Chocolat"],
    description: "Kinder Maxi personnalisé avec votre design. Idéal pour anniversaires et fêtes d'enfants.",
    pricing: {
      unitPrice: 3.50,
      minQuantity: 6
    }
  },
  {
    id: "32",
    name: "Capri-Sun Personnalisé",
    price: "Sur devis",
    numericPrice: 2.00,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/capri-sun.png",
    slug: "capri-sun-personnalise",
    themes: ["Anniversaire", "Été", "Enfant"],
    description: "Capri-Sun personnalisé avec étiquette sur mesure. Rafraîchissement personnalisé pour vos événements.",
    pricing: {
      unitPrice: 2.00,
      minQuantity: 6
    }
  },
  {
    id: "33",
    name: "Carte de Remerciement",
    price: "1,80\u20AC",
    numericPrice: 1.80,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "",
    slug: "carte-remerciement",
    themes: ["Mariage", "Anniversaire", "Remerciement"],
    description: "Carte de remerciement personnalisée pour vos événements. Design élégant et message personnalisé.",
    pricing: {
      unitPrice: 1.80,
      minQuantity: 20
    }
  },
  {
    id: "34",
    name: "Étiquette Bouteille d'Eau",
    price: "Sur devis",
    numericPrice: 1.50,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/etiquette-bouteille-eau.png",
    slug: "etiquette-bouteille-eau",
    themes: ["Mariage", "Anniversaire", "Événement"],
    description: "Étiquette personnalisée pour bouteilles d'eau. Design personnalisable pour vos événements.",
    pricing: {
      unitPrice: 1.50,
      minQuantity: 6
    }
  },
  {
    id: "35",
    name: "Flacon Bulle de Savon",
    price: "Sur devis",
    numericPrice: 2.80,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/flacon-bulle-savon.png",
    slug: "flacon-bulle-savon",
    themes: ["Mariage", "Anniversaire", "Enfant"],
    description: "Flacon bulle de savon personnalisé. Idéal pour mariages et fêtes d'enfants.",
    pricing: {
      unitPrice: 2.80,
      minQuantity: 6
    }
  },
  {
    id: "36",
    name: "Paquet de Chips Personnalisé",
    price: "Sur devis",
    numericPrice: 2.20,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/paquet-chips.png",
    slug: "paquet-chips-personnalise",
    themes: ["Anniversaire", "Fête", "Snack"],
    description: "Paquet de chips personnalisé avec votre design. Snack original pour vos événements.",
    pricing: {
      unitPrice: 2.20,
      minQuantity: 6
    }
  },
  {
    id: "37",
    name: "Pringles Personnalisé",
    price: "Sur devis",
    numericPrice: 3.00,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/Pringles2.png",
    images: [
      "/images/products/Pringles2.png"
    ],
    slug: "pringles-personnalise",
    themes: ["Anniversaire", "Fête", "Snack"],
    description: "Pringles personnalisé avec étiquette sur mesure. Snack iconique personnalisé pour vos événements.",
    pricing: {
      unitPrice: 3.00,
      minQuantity: 6
    }
  },
  {
    id: "38",
    name: "Sac Cadeau Personnalisé",
    price: "Sur devis",
    numericPrice: 4.50,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/sac-cadeau.png",
    slug: "sac-cadeau-personnalise",
    themes: ["Mariage", "Anniversaire", "Cadeau"],
    description: "Sac cadeau personnalisé avec délai de fabrication. Design élégant et personnalisé.",
    pricing: {
      unitPrice: 4.50,
      minQuantity: 6
    }
  },
  {
    id: "39",
    name: "Sachet de Bonbon Personnalisé",
    price: "4,00\u20AC",
    numericPrice: 4.00,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/sachet-bonbon.png",
    slug: "sachet-bonbon-personnalise",
    themes: ["Anniversaire", "Fête", "Bonbon"],
    description: "Sachet de bonbon personnalisé avec vos couleurs et thème. Friandise personnalisée pour vos événements.",
    pricing: {
      unitPrice: 4.00,
      minQuantity: 6
    }
  },
  {
    id: "40",
    name: "Haribo Dragibus",
    price: "Sur devis",
    numericPrice: 3.50,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/haribo-dragibus.png",
    slug: "haribo-dragibus",
    themes: ["Anniversaire", "Enfant", "Bonbon"],
    description: "Haribo Dragibus personnalisé. Bonbons iconiques personnalisés pour vos événements.",
    pricing: {
      unitPrice: 3.50,
      minQuantity: 6
    }
  },
  {
    id: "41",
    name: "M&M's Personnalisé",
    price: "Sur devis",
    numericPrice: 4.00,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/mms.png",
    slug: "mms-personnalise",
    themes: ["Anniversaire", "Fête", "Chocolat"],
    description: "M&M's personnalisé avec votre design. Chocolats iconiques personnalisés pour vos événements.",
    pricing: {
      unitPrice: 4.00,
      minQuantity: 6
    }
  },
  {
    id: "42",
    name: "Cône Pyramide",
    price: "1,90\u20AC",
    numericPrice: 1.90,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/cone-pyramide.png",
    slug: "cone-pyramide",
    themes: ["Mariage", "Anniversaire", "Décoration"],
    description: "Cône pyramide personnalisé pour vos événements. Décoration élégante et pratique.",
    pricing: {
      unitPrice: 1.90,
      minQuantity: 10
    }
  },
  {
    id: "43",
    name: "Cône Friandise Personnalisée",
    price: "3,90\u20AC",
    numericPrice: 3.90,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/cone-friandise.png",
    slug: "cone-friandise-personnalisee",
    themes: ["Mariage", "Anniversaire", "Friandise"],
    description: "Cône friandise personnalisée avec votre design. Présentation élégante pour vos bonbons.",
    pricing: {
      unitPrice: 3.90,
      minQuantity: 6,
      tiers: [
        { min: 6, pricePerUnit: 3.49 } // 6 pour 20,94\u20AC
      ]
    }
  },
  {
    id: "44",
    name: "Boîte à Oeufs Personnalisée",
    price: "6,90\u20AC",
    numericPrice: 6.90,
    category: "Sweet Tables & Décoration",
    categorySlug: "sweet-tables-decoration",
    image: "/images/products/boite-oeufs.png",
    slug: "boite-oeufs-personnalisee",
    themes: ["Pâques", "Anniversaire", "Cadeau"],
    description: "Boîte à oeufs personnalisée pour vos événements. Design original et personnalisable.",
    pricing: {
      unitPrice: 6.90,
      minQuantity: 1,
      tiers: [
        { min: 5, pricePerUnit: 6.38 } // 5 pour 31,90\u20AC
      ]
    }
  },

  // TUBE BULLES DE SAVON PERSONNALISÉ
  {
    id: "45",
    name: "Tube bulles de savon personnalisé",
    price: "1,80\u20AC",
    numericPrice: 1.80,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/placeholder.png",
    slug: "tube-bulles-savon-personnalise",
    themes: ["Mariage", "Anniversaire", "Enfant", "Fête"],
    description: "Tube bulles de savon personnalisé pour vos événements. Design amusant et original, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et fêtes d'enfants.",
    longDescription: "Créez des souvenirs magiques avec notre tube bulles de savon personnalisé ! Ce produit ludique et original est parfait pour animer vos événements et faire plaisir à vos invités. Tube de bulles de savon de qualité supérieure avec liquide non toxique et sûr pour les enfants. Personnalisation complète avec vos noms, dates, messages et thème choisi. Design élégant et moderne adapté à tous types d'événements : mariage, anniversaire, baptême, baby-shower, fêtes d'enfants. Emballage individuel parfait pour cadeaux d'invités ou souvenirs à emporter. Fabriqué en France avec matériaux de qualité. Livraison rapide et personnalisation illimitée jusqu'à validation.",
    pricing: {
      unitPrice: 1.80,
      minQuantity: 6
    },
    rating: 5,
  },

  // PRINGLES PERSONNALISÉ
  {
    id: "46",
    name: "Pringles Personnalisé",
    price: "2,99\u20AC",
    numericPrice: 2.99,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/Pringles2.png",
    images: [
      "/images/products/Pringles2.png"
    ],
    slug: "pringles-personnalise",
    themes: ["Mariage", "Anniversaire", "Fête", "Gourmand"],
    description: "Pringles personnalisé pour vos événements. Chips de qualité supérieure avec emballage personnalisé à vos couleurs, thème et texte. Parfait pour apéritifs, mariages et fêtes.",
    longDescription: "Surprenez vos invités avec nos Pringles personnalisés ! Chips de qualité supérieure dans leur emballage iconique entièrement personnalisé. Design moderne et amusant adapté à tous vos événements : mariage, anniversaire, baby-shower, fêtes d'entreprise. Personnalisation complète avec vos noms, dates, messages, logo et thème choisi. Chips croustillantes et savoureuses pour ravir tous vos convives. Format individuel parfait pour cadeaux d'invités ou souvenirs à emporter. Emballage de qualité avec impression haute définition. Fabriqué en France avec matériaux alimentaires sûrs. Livraison rapide et personnalisation illimitée jusqu'à validation. L'alternative parfaite aux traditionnelles dragées de mariage !",
    pricing: {
      unitPrice: 2.99,
      minQuantity: 5
    },
    rating: 5,
  },

  // ÉTIQUETTE POM'POTES PERSONNALISÉE
  {
    id: "47",
    name: "Étiquette Pom'Potes Personnalisée",
    price: "2,50\u20AC",
    numericPrice: 2.50,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/77.png",
    images: [
      "/images/products/77.png",
      "/images/products/Pom Potes2.png"
    ],
    slug: "etiquette-pompotes-personnalisee",
    themes: ["Enfants", "Coloré", "Ludique", "École"],
    description: "Étiquette Pom'Potes personnalisée pour anniversaire, goûter d'école et fêtes. Design ludique et coloré, personnalisable avec prénom, âge et thème. Parfaite pour identifier les gourdes des enfants.",
    longDescription: "Personnalisez les gourdes de vos enfants avec nos étiquettes Pom'Potes personnalisées ! Idéales pour l'école, les goûters d'anniversaire, les colonies de vacances et les activités sportives. Design attrayant et résistant avec couleurs vives qui plaisent aux enfants. Personnalisation complète avec le prénom de l'enfant, classe, numéro de téléphone et motif choisi. Étiquettes auto-adhésives de qualité supérieure, résistantes à l'eau et aux frottements. Faciles à appliquer et à retirer sans laisser de traces. Dimensions optimales pour tous les types de gourdes et bouteilles. Création française avec matériaux non toxiques et encres alimentaires. Livraison rapide et personnalisation sur-mesure pour des objets uniques et pratiques !",
    pricing: {
      unitPrice: 2.50,
      minQuantity: 6,
      tiers: [
        { min: 10, pricePerUnit: 2.19 } // 10 pour 21,90\u20AC
      ]
    },
    pricing_type: "lot_pricing",
    rating: 5,
  },

  // CAHIER DE COLORIAGE PERSONNALISÉ
  {
    id: "48",
    name: "Cahier de coloriage personnalisé",
    price: "2,90\u20AC",
    numericPrice: 2.90,
    category: "Papeterie",
    categorySlug: "papeterie-sweet-tables",
    image: "/images/products/CAhier2.png",
    images: [
      "/images/products/CAhier2.png",
      "/images/products/Cahier3.png",
      "/images/products/cahiercrayon.png"
    ],
    slug: "cahier-coloriage-personnalise",
    themes: ["Enfants", "Coloriage", "Activités", "Fête"],
    description: "Cahier de coloriage personnalisé pour anniversaire, activités et loisirs. Design adapté avec prénom, thème et illustrations personnalisées. Parfait pour occuper les enfants lors d'événements.",
    longDescription: "Offrez aux enfants un moment de créativité avec nos cahiers de coloriage personnalisés ! Idéaux pour les anniversaires, activités d'animation, colonies de vacances et loisirs créatifs. Chaque cahier est entièrement personnalisé avec le prénom de l'enfant, thème choisi et illustrations adaptées à l'âge et aux préférences. Format pratique avec pages de qualité supérieure, papier épais adapté aux feutres et crayons de couleur. Couverture personnalisée avec design unique et photo si souhaité. Création française avec matériaux écologiques et encres non toxiques. Option crayons de couleurs disponibles pour un kit complet. Parfait pour cadeaux d'invités, activités d'animation et occupation créative. Livraison rapide et personnalisation sur-mesure pour des moments inoubliables !",
    pricing: {
      unitPrice: 2.90,
      minQuantity: 6,
      tiers: [
        { min: 12, pricePerUnit: 2.69 }, // 12 pour 32,28\u20AC
        { min: 24, pricePerUnit: 2.49 }  // 24 pour 59,76\u20AC
      ]
    },
    pricing_type: "lot_pricing",
    sizes: [
      { id: "Cahier", label: "Cahier seul", dimension: "A5", price: 2.90 },
      { id: "Cahier+Crayons", label: "Avec crayons", dimension: "A5 + 12 crayons", price: 5.00 }
    ],
    rating: 5,
  },
  // ÉTIQUETTES PERSONNALISÉES
  {
    id: "49",
    name: "Étiquette Champomy",
    price: "1,50\u20AC",
    numericPrice: 1.50,
    category: "Étiquettes Personnalisées",
    categorySlug: "etiquettes-personnalisees",
    image: "/images/products/Étiquette Capri-Sun2.png",
    images: [
      "/images/products/Étiquette Capri-Sun2.png",
      "/images/products/Étiquette Capri-Sun3.png"
    ],
    slug: "etiquette-champomy",
    themes: ["Anniversaire", "Enfants", "Fête", "Personnalisé"],
    description: "Étiquette personnalisée pour bouteille Champomy. Design adapté avec prénom, âge et thème. Parfait pour anniversaires et célébrations d'enfants.",
    longDescription: "Personnalisez vos bouteilles Champomy avec nos étiquettes uniques ! Idéales pour les anniversaires, baby-showers et fêtes d'enfants. Chaque étiquette est entièrement personnalisée avec le prénom de l'enfant, âge, date et thème choisi. Qualité d'impression supérieure avec papier adhésif résistant à l'humidité. Facile à appliquer et à retirer sans laisser de traces. Design élégant qui sublimera votre table de fête. Parfait pour cadeaux d'invités et souvenirs personnalisés. Création française avec matériaux écologiques. Livraison rapide et personnalisation sur-mesure pour des moments inoubliables !",
    pricing: {
      unitPrice: 1.50,
      minQuantity: 10,
      tiers: [
        { min: 20, pricePerUnit: 1.35 }, // 20 pour 27,00\u20AC
        { min: 50, pricePerUnit: 1.25 }  // 50 pour 62,50\u20AC
      ]
    },
    pricing_type: "lot_pricing",
    rating: 5,
  },
  {
    id: "50",
    name: "Étiquette Mini Canette Coca-Cola",
    price: "1,20\u20AC",
    numericPrice: 1.20,
    category: "Étiquettes Personnalisées",
    categorySlug: "etiquettes-personnalisees",
    image: "/images/products/placeholder.png",
    slug: "etiquette-mini-canette-coca-cola",
    themes: ["Anniversaire", "Enfants", "Fête", "Coca-Cola", "Personnalisé"],
    description: "Étiquette personnalisée pour mini canette Coca-Cola. Design adapté avec prénom, âge et thème. Parfait pour anniversaires et fêtes d'enfants.",
    longDescription: "Transformez vos mini canettes Coca-Cola en objets de décoration personnalisés ! Nos étiquettes sont spécialement conçues pour s'adapter parfaitement aux mini canettes. Personnalisez avec prénom, âge, date et thème pour une touche unique à votre événement. Qualité d'impression professionnelle avec papier adhésif résistant. Facile à appliquer et résistant à l'humidité. Design moderne qui plaira aux enfants et adultes. Idéal pour anniversaires, baby-showers et fêtes thématiques. Parfait pour cadeaux d'invités et décoration de table. Création française avec matériaux de qualité. Livraison rapide et personnalisation sur-mesure !",
    pricing: {
      unitPrice: 1.20,
      minQuantity: 12,
      tiers: [
        { min: 24, pricePerUnit: 1.10 }, // 24 pour 26,40\u20AC
        { min: 60, pricePerUnit: 1.00 }  // 60 pour 60,00\u20AC
      ]
    },
    pricing_type: "lot_pricing",
    rating: 5,
  },
  {
    id: "51",
    name: "Étiquette Bouteille d'Eau",
    price: "1,00\u20AC",
    numericPrice: 1.00,
    category: "Étiquettes Personnalisées",
    categorySlug: "etiquettes-personnalisees",
    image: "/images/products/Étiquette Bouteille d'Eau.png",
    images: [
      "/images/products/Étiquette Bouteille d'Eau1.png",
      "/images/products/Étiquette Bouteille d'Eau2.png",
      "/images/products/Étiquette Bouteille d'Eau3.png"
    ],
    slug: "etiquette-bouteille-eau",
    themes: ["Anniversaire", "Mariage", "Baptême", "Personnalisé", "Événement"],
    description: "Étiquette personnalisée pour bouteille d'eau. Design élégant avec prénom, date et thème. Parfait pour tous types d'événements.",
    longDescription: "Ajoutez une touche personnalisée à vos bouteilles d'eau avec nos étiquettes élégantes ! Convient parfaitement pour tous types d'événements : mariages, baptêmes, anniversaires, entreprises et fêtes. Personnalisation complète avec noms, dates, messages et thème choisi. Qualité d'impression supérieure avec papier adhésif waterproof et résistant. Facile à appliquer sur toutes les bouteilles standards. Design minimaliste et chic qui s'intègre parfaitement à votre décoration. Idéal pour cadeaux d'invités, tables de réception et bureaux. Création française avec matériaux écologiques et encres alimentaires. Livraison rapide et personnalisation sur-mesure pour des événements mémorables !",
    pricing: {
      unitPrice: 1.00,
      minQuantity: 15,
      tiers: [
        { min: 30, pricePerUnit: 0.90 }, // 30 pour 27,00\u20AC
        { min: 75, pricePerUnit: 0.80 }  // 75 pour 60,00\u20AC
      ]
    },
    pricing_type: "lot_pricing",
    rating: 5,
  },
];
