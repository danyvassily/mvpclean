/**
 * Utilitaires pour la slugification et normalisation des noms
 */

// Mapping des caractères accentués vers leurs équivalents
const accentMap: Record<string, string> = {
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ç': 'c', 'ñ': 'n',
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A',
  'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
  'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
  'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
  'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
  'Ç': 'C', 'Ñ': 'N'
}

/**
 * Supprime les accents d'une chaîne
 */
function removeAccents(str: string): string {
  return str.split('').map(char => accentMap[char] || char).join('')
}

/**
 * Normalise un nom en minuscule, sans accents ni caractères spéciaux
 */
function normalizeName(name: string): string {
  if (!name) return ""
  return removeAccents(name)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Garde lettres, chiffres, espaces, tirets
    .replace(/[\s-]+/g, ' ') // Remplace espaces/tirets multiples par un seul espace
}

/**
 * Convertit une chaîne en slug compatible URL
 * @param input - La chaîne à convertir
 * @returns Le slug normalisé
 */
export function toSlug(input: string): string {
  return removeAccents(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Supprime tous les caractères spéciaux sauf espaces et tirets
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Remplace les tirets multiples par un seul
    .replace(/^-|-$/g, '') // Supprime les tirets en début/fin
}

/**
 * Vérifie si deux noms correspondent (avec tolérance)
 * @param name1 - Premier nom
 * @param name2 - Deuxième nom
 * @returns true si les noms correspondent
 */
export function namesMatch(name1: string, name2: string): boolean {
  const normalized1 = normalizeName(name1)
  const normalized2 = normalizeName(name2)
  
  // Correspondance exacte
  if (normalized1 === normalized2) return true
  
  // Correspondance partielle (un contient l'autre)
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true
  
  // Correspondance par mots-clés
  const words1 = normalized1.split(' ').filter(w => w.length > 2)
  const words2 = normalized2.split(' ').filter(w => w.length > 2)
  
  const commonWords = words1.filter(word => words2.includes(word))
  return commonWords.length >= Math.min(words1.length, words2.length) * 0.6
}
