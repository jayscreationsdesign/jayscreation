export const COLORS = {
  gold: '#C8A96E',
  goldLight: '#D4B87A',
  cream: '#FAF7F2',
  chocolat: '#3C2415',
  chocolatLight: '#4E3222',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E8E0D4',
  creamDark: '#F0EBE3',
} as const;

export const FONTS = {
  playfair: '"Playfair Display", serif',
  inter: '"Inter", sans-serif',
} as const;

export const TIERS = {
  petale: { 
    name: 'Pétale', 
    icon: '🌸', 
    minPoints: 0, 
    maxPoints: 149, 
    multiplier: 1,
    color: COLORS.cream,
    textColor: COLORS.text,
    checkColor: COLORS.gold
  },
  orchidee: { 
    name: 'Orchidée', 
    icon: '🌺', 
    minPoints: 150, 
    maxPoints: 499, 
    multiplier: 1.5,
    color: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
    textColor: COLORS.white,
    checkColor: COLORS.white
  },
  diamant: { 
    name: 'Diamant', 
    icon: '💎', 
    minPoints: 500, 
    maxPoints: Infinity, 
    multiplier: 2,
    color: `linear-gradient(135deg, ${COLORS.chocolat}, ${COLORS.chocolatLight})`,
    textColor: COLORS.white,
    checkColor: COLORS.gold
  },
} as const;

export const REWARDS = [
  { 
    id: 'free_shipping', 
    name: 'Livraison offerte', 
    points: 50, 
    icon: '📦',
    description: 'Sur votre prochaine commande'
  },
  { 
    id: 'discount_5', 
    name: 'Bon de 5€', 
    points: 100, 
    icon: '🎫',
    description: 'Valable sur tout le site'
  },
  { 
    id: 'discount_15', 
    name: 'Bon de 15€', 
    points: 200, 
    icon: '🎁',
    description: 'Valable sur tout le site'
  },
  { 
    id: 'free_product', 
    name: 'Produit offert', 
    points: 350, 
    icon: '✨',
    description: 'Un article au choix parmi notre sélection'
  },
  { 
    id: 'custom_creation', 
    name: 'Création sur-mesure', 
    points: 500, 
    icon: '👑',
    description: 'Un design exclusif rien que pour vous'
  },
] as const;

export const EARN_METHODS = [
  { 
    icon: '🛒', 
    action: 'Achat en ligne', 
    points: '+1 à 2 pts/€', 
    description: 'Selon votre niveau'
  },
  { 
    icon: '👤', 
    action: 'Inscription', 
    points: '+20 pts', 
    description: 'Offerts à la création du compte'
  },
  { 
    icon: '🎂', 
    action: 'Anniversaire', 
    points: '+30 pts', 
    description: "Chaque année, jour J"
  },
  { 
    icon: '⭐', 
    action: 'Avis produit', 
    points: '+10 pts', 
    description: 'Par avis vérifié publié'
  },
  { 
    icon: '💌', 
    action: 'Parrainage', 
    points: '+50 pts', 
    description: 'Pour vous et votre filleul(e)'
  },
  { 
    icon: '📸', 
    action: 'Partage Instagram', 
    points: '+5 pts', 
    description: 'Taguez @jays_creations_design'
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    tier: 'Orchidée',
    avatar: 'S',
    content: "J'ai pu offrir des cadeaux baptême magnifiques à prix réduit grâce à mes points. Le programme est vraiment généreux !"
  },
  {
    name: 'Fatima L.',
    tier: 'Diamant',
    avatar: 'F',
    content: "La création sur-mesure offerte pour mon mariage était incroyable. Jay's Club récompense vraiment la fidélité."
  },
  {
    name: 'Camille D.',
    tier: 'Pétale',
    avatar: 'C',
    content: "Déjà 80 points en un seul achat ! J'adore le système, ça motive à revenir."
  },
] as const;

export const FAQ = [
  {
    question: 'Comment rejoindre le Jay\'s Club ?',
    answer: 'Le Jay\'s Club est automatique et gratuit. Dès la création de votre compte, vous êtes inscrit(e) au niveau Pétale et commencez à cumuler des points.'
  },
  {
    question: 'Mes points expirent-ils ?',
    answer: 'Vos points restent valables pendant 12 mois après votre dernier achat. Un achat remet le compteur à zéro.'
  },
  {
    question: 'Comment utiliser mes récompenses ?',
    answer: 'Rendez-vous dans votre espace \'Jay\'s Club\', onglet \'Récompenses\'. Cliquez sur \'Échanger\' et un code promo sera généré automatiquement.'
  },
  {
    question: 'Le parrainage, comment ça marche ?',
    answer: 'Partagez votre lien de parrainage depuis votre compte. Quand votre filleul(e) passe sa première commande, vous recevez chacun 50 points.'
  },
  {
    question: 'Puis-je cumuler les avantages de niveau avec les récompenses ?',
    answer: 'Oui ! Vos avantages de niveau (réductions permanentes, livraison offerte) se cumulent avec les récompenses que vous échangez.'
  },
] as const;
