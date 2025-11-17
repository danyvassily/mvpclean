export interface Prestation {
  id: string
  slug: string
  titre: string
  description: string
  type?: string // Visite + dégustation, Groupe privé, etc.
  duree?: string // Ex: "1h30", "2h"
  prix?: string // Ex: "10€", "25€"
  image?: string // Chemin vers l'image
  highlights?: string[] // Points forts de la prestation
  populaire?: boolean // Badge "Populaire"
  disponible?: boolean // Pour activer/désactiver depuis le back-office
}

/**
 * Données des prestations disponibles pour réservation
 * Ces données peuvent être remplacées par un appel API ou une base de données
 * dans le futur pour permettre la gestion via back-office
 */
export const prestations: Prestation[] = [
  {
    id: "visite-degustation",
    slug: "visite-degustation",
    titre: "Visite + Dégustation",
    description: "Visite guidée du domaine avec découverte de nos chais traditionnels, jardins à la française et dégustation commentée de nos vins d'exception",
    type: "Visite + Dégustation",
    duree: "1h30",
    prix: "10€",
    image: "/images/heroes/chateau-lastours-hero.jpg",
    highlights: ["Visite des chais", "Jardins à la française", "Dégustation de 5 vins", "Découverte du terroir"],
    populaire: true,
    disponible: true,
  },
  {
    id: "groupe-prive-visite-degustation",
    slug: "groupe-prive-visite-degustation",
    titre: "Groupe privé Visite + Dégustation",
    description: "Expérience personnalisée pour votre groupe avec visite privée du domaine et dégustation exclusive de nos cuvées",
    type: "Groupe privé",
    duree: "2h",
    prix: "Sur devis",
    image: "/images/wines/wine-tasting-event.png",
    highlights: ["Visite privée", "Dégustation exclusive", "Accompagnement personnalisé", "Sur mesure"],
    populaire: false,
    disponible: true,
  },
  {
    id: "groupe-prive-degustation",
    slug: "groupe-prive-degustation",
    titre: "Groupe privé Dégustation",
    description: "Dégustation exclusive dans notre salon privé avec présentation personnalisée de notre gamme complète",
    type: "Groupe privé",
    duree: "1h30",
    prix: "Sur devis",
    image: "/images/wines/french-chateau-wine-cellar.png",
    highlights: ["Salon privé", "Gamme complète", "Service personnalisé", "Ambiance intimiste"],
    populaire: false,
    disponible: true,
  },
]

/**
 * Récupère toutes les prestations disponibles
 */
export function getAllPrestations(): Prestation[] {
  return prestations.filter((p) => p.disponible !== false)
}

/**
 * Récupère une prestation par son slug
 */
export function getPrestationBySlug(slug: string): Prestation | undefined {
  return prestations.find((p) => p.slug === slug && p.disponible !== false)
}

/**
 * Récupère une prestation par son ID
 */
export function getPrestationById(id: string): Prestation | undefined {
  return prestations.find((p) => p.id === id && p.disponible !== false)
}

