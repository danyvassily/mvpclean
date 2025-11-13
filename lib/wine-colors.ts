import type { Wine } from "./wines-data"

interface WineColorTheme {
  primary: string // Couleur principale pour les accents
  secondary: string // Couleur secondaire
  gradient: string // Gradient de fond
  overlay: string // Overlay avec la couleur
  badge: string // Couleur pour les badges
  text: string // Couleur du texte accentué
  border: string // Couleur des bordures
  bullet: string // Couleur pour les puces
}

// Couleurs sobres et élégantes pour chaque type de vin
const wineColorThemes: Record<string, WineColorTheme> = {
  // Vins Rouges - Tons bordeaux/grenat profonds
  rouge: {
    primary: "#6B1E3F", // Bordeaux profond
    secondary: "#8B2F47", // Bordeaux plus clair
    gradient: "from-gray-900 via-red-950/20 to-gray-900",
    overlay: "bg-red-950/10",
    badge: "bg-red-900/30 border-red-800/40 text-red-200",
    text: "text-red-200",
    border: "border-red-900/30",
    bullet: "bg-red-300/70"
  },
  
  // Vins Blancs - Tons dorés/champagne subtils
  blanc: {
    primary: "#8B7355", // Or ancien
    secondary: "#A68B5B", // Or plus clair
    gradient: "from-gray-900 via-yellow-950/15 to-gray-900",
    overlay: "bg-yellow-950/8",
    badge: "bg-yellow-900/25 border-yellow-800/35 text-yellow-200",
    text: "text-yellow-200",
    border: "border-yellow-900/25",
    bullet: "bg-yellow-300/70"
  },
  
  // Vins Rosés - Tons rose poudré/saumon délicats
  rose: {
    primary: "#8B4A6B", // Rose ancien
    secondary: "#A05D7A", // Rose plus clair
    gradient: "from-gray-900 via-pink-950/15 to-gray-900",
    overlay: "bg-pink-950/8",
    badge: "bg-pink-900/25 border-pink-800/35 text-pink-200",
    text: "text-pink-200",
    border: "border-pink-900/25",
    bullet: "bg-pink-300/70"
  },
  
  // Vins Effervescents - Tons argentés/perle sophistiqués
  effervescent: {
    primary: "#6B7280", // Gris argenté
    secondary: "#9CA3AF", // Gris plus clair
    gradient: "from-gray-900 via-slate-800/20 to-gray-900",
    overlay: "bg-slate-800/10",
    badge: "bg-slate-700/30 border-slate-600/40 text-slate-200",
    text: "text-slate-200",
    border: "border-slate-700/30",
    bullet: "bg-slate-300/70"
  },
  
  // Défaut pour les types non reconnus
  default: {
    primary: "#6B7280",
    secondary: "#9CA3AF", 
    gradient: "from-gray-900 via-gray-800 to-black",
    overlay: "bg-gray-800/10",
    badge: "bg-gray-700/30 border-gray-600/40 text-gray-200",
    text: "text-gray-200",
    border: "border-gray-700/30",
    bullet: "bg-gray-300/70"
  }
}

// Fonction pour obtenir le thème couleur d'un vin
export function getWineColorTheme(wine: Wine): WineColorTheme {
  // Logique de détection du type basée sur le nom ou les propriétés
  const wineName = wine.name.toLowerCase()
  const wineType = wine.type?.toLowerCase()
  
  // Priorité au type explicite
  if (wineType && wineColorThemes[wineType]) {
    return wineColorThemes[wineType]
  }
  
  // Détection par nom si pas de type explicite
  if (wineName.includes('rouge') || wineName.includes('red')) {
    return wineColorThemes.rouge
  }
  
  if (wineName.includes('blanc') || wineName.includes('white')) {
    return wineColorThemes.blanc
  }
  
  if (wineName.includes('rosé') || wineName.includes('rose') || wineName.includes('pink')) {
    return wineColorThemes.rose
  }
  
  if (wineName.includes('effervescent') || wineName.includes('méthode') || wineName.includes('perlé') || wineName.includes('perle')) {
    return wineColorThemes.effervescent
  }
  
  // Collections spécifiques
  if (wine.collection === 'methode' || wineName.includes('méthode')) {
    return wineColorThemes.effervescent
  }
  
  // Défaut
  return wineColorThemes.default
}

// Fonction helper pour créer des styles inline avec les couleurs
export function createWineStyles(theme: WineColorTheme) {
  return {
    heroBackground: `bg-gradient-to-br ${theme.gradient}`,
    accentColor: theme.primary,
    overlayClass: theme.overlay,
    badgeClass: theme.badge,
    textClass: theme.text,
    borderClass: theme.border
  }
}
