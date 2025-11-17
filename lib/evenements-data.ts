/**
 * Données configurables pour les événements
 * Ces données peuvent être remplacées par un appel API ou une base de données
 * dans le futur pour permettre la gestion via back-office
 */

export interface Espace {
  id: string
  nom: string
  capaciteMax: number
  description?: string
  tarifBase?: number // Tarif de base en euros (optionnel)
  surface_m2?: number // Surface en m²
  image?: string // Chemin vers l'image
  actif: boolean
  ordre?: number // Ordre d'affichage
}

export interface OptionEvenement {
  id: string
  nom: string
  description?: string
  typeTarif: "flat" | "per_person"
  prix: number // Prix unitaire ou forfaitaire en euros
  actif: boolean
  categorie?: string // Ex: "restauration", "service", "materiel", etc.
  ordre?: number // Ordre d'affichage
}

/**
 * Espaces disponibles pour événements
 */
export const espaces: Espace[] = [
  {
    id: "tente-nomade",
    nom: "La Tente Nomade",
    capaciteMax: 200,
    description: "Au cœur des jardins à la française et des vignes centenaires, cet espace éphémère de 375m² offre une ambiance bucolique et sophistiquée. Parfait pour des mariages romantiques, des team building inspirants ou des soirées estivales conviviales.",
    tarifBase: 1500,
    surface_m2: 375,
    image: "/page/organiser-votre-evenement-ok/recpetion-mariage-tente-nomade-chateau-lastours-gaillac.jpg",
    actif: true,
    ordre: 1,
  },
  {
    id: "salle-reception",
    nom: "La Salle de Réception",
    capaciteMax: 80,
    description: "Située dans l'ancien chai à barriques, cette salle climatisée de 100m² allie charme intemporel et élégance contemporaine. Idéale pour galas, réceptions privées et cocktails professionnels.",
    tarifBase: 1200,
    surface_m2: 100,
    image: "/page/organiser-votre-evenement-ok/salle-de-reception-evenements-familials-professionnels.jpg",
    actif: true,
    ordre: 2,
  },
  {
    id: "salle-reunion",
    nom: "La Salle de Réunion",
    capaciteMax: 30,
    description: "À l'étage, équipée d'un vidéoprojecteur et d'un éclairage modulable, cet espace raffiné invite à la concentration et à la collaboration, parfait pour séminaires, conférences et ateliers.",
    tarifBase: 600,
    surface_m2: 50,
    image: "/page/organiser-votre-evenement-ok/salle-seminaire-reunion-video-projecteur.jpg",
    actif: true,
    ordre: 3,
  },
]

/**
 * Options disponibles pour événements
 */
export const optionsEvenement: OptionEvenement[] = [
  // Restauration
  {
    id: "cocktail-dinatoire",
    nom: "Cocktail dinatoire",
    description: "Assortiment de mets savoureux servis en cocktail",
    typeTarif: "per_person",
    prix: 35,
    actif: true,
    categorie: "restauration",
    ordre: 1,
  },
  {
    id: "service-table",
    nom: "Service à table",
    description: "Menu 3 services avec produits locaux",
    typeTarif: "per_person",
    prix: 55,
    actif: true,
    categorie: "restauration",
    ordre: 2,
  },
  {
    id: "traiteur-signature",
    nom: "Traiteur Signature",
    description: "Menu gastronomique 5 services avec accords mets-vins",
    typeTarif: "per_person",
    prix: 85,
    actif: true,
    categorie: "restauration",
    ordre: 3,
  },
  // Service
  {
    id: "service-bar",
    nom: "Service bar",
    description: "Bar mobile avec barman professionnel",
    typeTarif: "flat",
    prix: 400,
    actif: true,
    categorie: "service",
    ordre: 4,
  },
  {
    id: "service-salle",
    nom: "Service en salle",
    description: "Équipe de serveurs professionnels",
    typeTarif: "per_person",
    prix: 8,
    actif: true,
    categorie: "service",
    ordre: 5,
  },
  // Matériel
  {
    id: "sonorisation",
    nom: "Sonorisation",
    description: "Système son complet avec micros",
    typeTarif: "flat",
    prix: 300,
    actif: true,
    categorie: "materiel",
    ordre: 6,
  },
  {
    id: "eclairage",
    nom: "Éclairage professionnel",
    description: "Installation d'éclairage modulable",
    typeTarif: "flat",
    prix: 250,
    actif: true,
    categorie: "materiel",
    ordre: 7,
  },
  {
    id: "materiel-scene",
    nom: "Matériel de scène",
    description: "Scène, podium, estrade",
    typeTarif: "flat",
    prix: 200,
    actif: true,
    categorie: "materiel",
    ordre: 8,
  },
  // Animation
  {
    id: "dj",
    nom: "DJ",
    description: "Animation musicale avec DJ professionnel",
    typeTarif: "flat",
    prix: 500,
    actif: true,
    categorie: "animation",
    ordre: 9,
  },
  {
    id: "groupe-musique",
    nom: "Groupe de musique",
    description: "Animation musicale live",
    typeTarif: "flat",
    prix: 800,
    actif: true,
    categorie: "animation",
    ordre: 10,
  },
  // Décoration
  {
    id: "decoration-florale",
    nom: "Décoration florale",
    description: "Composition florale sur mesure",
    typeTarif: "flat",
    prix: 350,
    actif: true,
    categorie: "decoration",
    ordre: 11,
  },
  {
    id: "mobilier-design",
    nom: "Mobilier design",
    description: "Location de mobilier haut de gamme",
    typeTarif: "flat",
    prix: 450,
    actif: true,
    categorie: "decoration",
    ordre: 12,
  },
]

/**
 * Récupère tous les espaces actifs
 */
export function getAllEspaces(): Espace[] {
  return espaces.filter((e) => e.actif).sort((a, b) => (a.ordre || 0) - (b.ordre || 0))
}

/**
 * Récupère un espace par son ID
 */
export function getEspaceById(id: string): Espace | undefined {
  return espaces.find((e) => e.id === id && e.actif)
}

/**
 * Récupère toutes les options actives
 */
export function getAllOptions(): OptionEvenement[] {
  return optionsEvenement.filter((o) => o.actif).sort((a, b) => (a.ordre || 0) - (b.ordre || 0))
}

/**
 * Récupère une option par son ID
 */
export function getOptionById(id: string): OptionEvenement | undefined {
  return optionsEvenement.find((o) => o.id === id && o.actif)
}

/**
 * Récupère les options par catégorie
 */
export function getOptionsByCategorie(categorie: string): OptionEvenement[] {
  return getAllOptions().filter((o) => o.categorie === categorie)
}


