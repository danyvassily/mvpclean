/**
 * Exports groupés des composants Wine
 * 
 * Permet des imports plus propres :
 * ```ts
 * import { WineCard, WineGrid } from "@/components/wines"
 * ```
 * 
 * au lieu de :
 * ```ts
 * import { WineCard } from "@/components/wines/WineCard"
 * import { WineGrid } from "@/components/wines/WineGrid"
 * ```
 */

export { WineCard } from "./WineCard"
export { WineGrid } from "./WineGrid"
export { default as WineCardDefault } from "./WineCard"
export { default as WineGridDefault } from "./WineGrid"

