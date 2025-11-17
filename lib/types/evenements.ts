/**
 * Types TypeScript pour la gestion des événements
 * Conforme aux spécifications de la page "Organiser votre événement"
 */

/**
 * Type pour les espaces d'événement
 * Permet la gestion dynamique via back office
 */
export type EspaceEvenement = {
  id: string
  nom: string
  description: string
  capaciteMax?: number
  imageUrl: string // chemin vers l'asset, dans /public
  surface_m2?: number
  tarifBaseHT?: number
  tarifParPersonneHT?: number
  ordre?: number
  actif: boolean
}

