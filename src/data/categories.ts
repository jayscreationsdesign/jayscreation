export interface Category {
  name: string;
  slug: string;
  children?: Category[];
}

export const categories: Category[] = [
  {
    name: "Sweet Tables & Décoration",
    slug: "sweet-tables-decoration",
    children: [
      { name: "Guirlandes + Ballons", slug: "guirlandes-ballons" },
    ],
  },
  {
    name: "Anniversaires",
    slug: "anniversaires",
    children: [
      { name: "Papeterie", slug: "papeterie-sweet-tables" },
      {
        name: "Posters / Affiches",
        slug: "posters-affiches",
        children: [
          { name: "Toppers", slug: "toppers" },
        ],
      },
    ],
  },
  {
    name: "Cadeaux Invités",
    slug: "cadeaux-invites",
    children: [
      { name: "Bougies", slug: "bougies" },
      { name: "Carte de remerciement", slug: "carte-remerciement" },
      { name: "Coffrets", slug: "coffrets" },
      { name: "Contenants Dragées", slug: "contenants-dragees" },
      { name: "Magnet", slug: "magnet" },
      { name: "Sacs / Cônes / Boîtes", slug: "sacs-cones-boites" },
    ],
  },
  {
    name: "Mariage",
    slug: "mariage",
    children: [
      { name: "Faire-parts", slug: "faire-parts" },
      { name: "Invitations", slug: "invitations" },
      { name: "Menus", slug: "menus" },
      { name: "Tableaux d'accueil", slug: "tableaux-accueil" },
      { name: "Marque-places", slug: "marque-places" },
    ],
  },
  {
    name: "Baptême",
    slug: "bapteme",
    children: [
      { name: "Faire-parts baptême", slug: "faire-parts-bapteme" },
      { name: "Invitations baptême", slug: "invitations-bapteme" },
      { name: "Menus baptême", slug: "menus-bapteme" },
      { name: "Tableaux d'accueil baptême", slug: "tableaux-accueil-bapteme" },
      { name: "Marque-places baptême", slug: "marque-places-bapteme" },
      { name: "Cadeaux invités baptême", slug: "cadeaux-invites-bapteme" },
    ],
  },
  {
    name: "Chocolat",
    slug: "chocolat",
    children: [
      { name: "Baptême / Naissance", slug: "bapteme-naissance" },
      { name: "Chocolats Spéciaux", slug: "chocolats-speciaux" },
      { name: "Divers événements", slug: "divers-evenements" },
      { name: "Mariage / Fiançaille", slug: "mariage-fiancaille" },
      { name: "Nos Boîtes", slug: "nos-boites" },
    ],
  },
  {
    name: "Formation",
    slug: "formation",
  },
  {
    name: "Papeterie Téléchargeable",
    slug: "papeterie-telechargeable",
    children: [
      { name: "Autres Univers", slug: "autres-univers" },
      { name: "Cadeaux Maîtresses & Maîtres", slug: "cadeaux-maitresses-maitres" },
      { name: "Univers Adulte & Mariage", slug: "univers-adulte-mariage" },
      { name: "Univers Baby Shower", slug: "univers-baby-shower" },
      { name: "Univers Manga / Jeux Vidéo", slug: "univers-manga-jeux-video" },
      { name: "Univers Mickey & Minnie", slug: "univers-mickey-minnie" },
      { name: "Univers Princesse", slug: "univers-princesse" },
      { name: "Univers Super Héros", slug: "univers-super-heros" },
    ],
  },
  {
    name: "Divers Objets & Cadeaux Personnalisés",
    slug: "divers-objets-cadeaux",
  },
  {
    name: "Ramadan / Eid 2026",
    slug: "ramadan-eid-2026",
  },
  {
    name: "Services",
    slug: "services",
    children: [
      { name: "Flocage", slug: "flocage" },
      { name: "Sublimations", slug: "sublimations" },
    ],
  },
];
