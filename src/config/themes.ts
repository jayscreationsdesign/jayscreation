export type ThemeCategory = {
  id: string
  label: string
  themes: { id: string; label: string }[]
}

export const THEME_CATEGORIES: ThemeCategory[] = [
  {
    id: "disney",
    label: "Personnages Disney",
    themes: [
      { id: "minnie", label: "Minnie" },
      { id: "stitch", label: "Stitch" },
      { id: "mickey", label: "Mickey" },
      { id: "elsa", label: "Elsa" },
      { id: "anna", label: "Anna" },
      { id: "cars", label: "Cars" },
      { id: "toy-story", label: "Toy Story" },
    ],
  },
  {
    id: "univers",
    label: "Univers Magiques",
    themes: [
      { id: "licorne", label: "Licorne" },
      { id: "dinosaure", label: "Dinosaure" },
      { id: "jungle", label: "Jungle" },
      { id: "espace", label: "Espace" },
      { id: "princesse", label: "Princesse" },
      { id: "pirate", label: "Pirate" },
      { id: "magie", label: "Magie" },
      { id: "fee", label: "Fée" },
    ],
  },
  {
    id: "evenements",
    label: "Événements",
    themes: [
      { id: "mariage", label: "Mariage" },
      { id: "anniversaire", label: "Anniversaire" },
      { id: "bapteme", label: "Baptême" },
      { id: "baby-shower", label: "Baby Shower" },
      { id: "communion", label: "Communion" },
      { id: "naissance", label: "Naissance" },
      { id: "noel", label: "Noël" },
      { id: "paques", label: "Pâques" },
      { id: "lapins", label: "Lapins" },
      { id: "halloween", label: "Halloween" },
      { id: "effrayant", label: "Effrayant" },
      { id: "citrouilles", label: "Citrouilles" },
      { id: "saint-valentin", label: "Saint-Valentin" },
      { id: "amour", label: "Amour" },
      { id: "coeurs", label: "Coeurs" },
      { id: "romantique", label: "Romantique" },
    ],
  },
  {
    id: "styles",
    label: "Styles",
    themes: [
      { id: "classique", label: "Classique" },
      { id: "elegance", label: "Élégance" },
      { id: "moderne", label: "Moderne" },
      { id: "original", label: "Original" },
      { id: "vintage", label: "Vintage" },
      { id: "rustique", label: "Rustique" },
      { id: "tropical", label: "Tropical" },
      { id: "nautique", label: "Nautique" },
    ],
  },
  {
    id: "couleurs",
    label: "Couleurs",
    themes: [
      { id: "rose", label: "Rose" },
      { id: "bleu", label: "Bleu" },
      { id: "vert", label: "Vert" },
      { id: "jaune", label: "Jaune" },
      { id: "rouge", label: "Rouge" },
      { id: "violet", label: "Violet" },
      { id: "orange", label: "Orange" },
      { id: "noir", label: "Noir" },
      { id: "blanc", label: "Blanc" },
      { id: "or", label: "Or" },
      { id: "argent", label: "Argent" },
    ],
  },
  {
    id: "enfants",
    label: "Enfants",
    themes: [
      { id: "enfants", label: "Enfants" },
      { id: "coloré", label: "Coloré" },
      { id: "ludique", label: "Ludique" },
      { id: "garcon", label: "Garçon" },
      { id: "fille", label: "Fille" },
      { id: "bebe", label: "Bébé" },
      { id: "ferme", label: "Ferme" },
      { id: "animaux", label: "Animaux" },
    ],
  },
  {
    id: "loisirs",
    label: "Loisirs",
    themes: [
      { id: "cinema", label: "Cinéma" },
      { id: "soiree", label: "Soirée" },
      { id: "sport", label: "Sport" },
      { id: "musique", label: "Musique" },
      { id: "voyage", label: "Voyage" },
      { id: "lecture", label: "Lecture" },
      { id: "jeux", label: "Jeux" },
      { id: "photo", label: "Photo" },
    ],
  },
  {
    id: "professionnel",
    label: "Professionnel",
    themes: [
      { id: "professionnel", label: "Professionnel" },
      { id: "entreprise", label: "Entreprise" },
      { id: "business", label: "Business" },
      { id: "corporate", label: "Corporate" },
      { id: "logo", label: "Logo" },
      { id: "branding", label: "Branding" },
    ],
  },
  {
    id: "saisons",
    label: "Saisons",
    themes: [
      { id: "printemps", label: "Printemps" },
      { id: "ete", label: "Été" },
      { id: "automne", label: "Automne" },
      { id: "hiver", label: "Hiver" },
      { id: "festif", label: "Festif" },
    ],
  },
  {
    id: "alimentaire",
    label: "Alimentaire",
    themes: [
      { id: "chocolat", label: "Chocolat" },
      { id: "noisettes", label: "Noisettes" },
      { id: "lait", label: "Lait" },
      { id: "cereales", label: "Céréales" },
      { id: "doux", label: "Doux" },
      { id: "noisette", label: "Noisette" },
      { id: "bonbons", label: "Bonbons" },
    ],
  },
  {
    id: "papeterie-telechargeable",
    label: "Papeterie Téléchargeable",
    themes: [
      { id: "minnie", label: "Minnie" },
      { id: "rose", label: "Rose" },
      { id: "classique", label: "Classique" },
    ],
  },
  {
    id: "divers",
    label: "Divers",
    themes: [
      { id: "personnalise", label: "Personnalisé" },
      { id: "unique", label: "Unique" },
      { id: "sur-mesure", label: "Sur-mesure" },
      { id: "creatif", label: "Créatif" },
      { id: "artiste", label: "Artiste" },
      { id: "cadeau", label: "Cadeau" },
      { id: "souvenir", label: "Souvenir" },
      { id: "decoration", label: "Décoration" },
      { id: "photo", label: "Photo" },
      { id: "hawai", label: "Hawaï" },
    ],
  },
]

// Export pour compatibilité avec le code existant
export interface Theme {
  id: string;
  label: string;
  color: string;
}

export const ALL_THEMES: Theme[] = THEME_CATEGORIES.flatMap(category => 
  category.themes.map(theme => ({
    id: theme.id,
    label: theme.label,
    color: "#8B4513" // Couleur par défaut
  }))
)
