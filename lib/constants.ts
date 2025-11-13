/**
 * Constantes de design pour l'identité visuelle premium
 */

// Classes d'espacement cohérentes - Basées sur le système de rythme vertical unifié
// (Voir globals.css pour les variables CSS --rhythm-*)
export const SPACING = {
  // Sections principales - Espacement entre sections (basé sur Home: mt-6 lg:mt-8)
  sectionMargin: 'mt-6 lg:mt-8', // 24px / 32px
  
  // Sections avec padding interne (basé sur Home section "Nos Vins": py-8 lg:py-12)
  section: 'py-8 lg:py-12', // 32px / 48px (équivalent à var(--rhythm-1-33) / var(--rhythm-2))
  
  // Sections larges (alternatives pour sections importantes)
  sectionLarge: 'py-16 lg:py-24', // 64px / 96px
  
  // Container standard
  container: 'container mx-auto px-4 lg:px-8',
  
  // Hero sections
  hero: 'py-20 lg:py-24', // 80px / 96px
  
  // Cards
  card: 'p-8 lg:p-12', // 32px / 48px
  
  // Espacements texte internes (basés sur Home: space-y-5, space-y-6, space-y-8)
  textSpacingTight: 'space-y-5',    // 20px (var(--rhythm-0-83))
  textSpacingNormal: 'space-y-6',    // 24px (var(--rhythm-1))
  textSpacingLoose: 'space-y-8',      // 32px (var(--rhythm-1-33))
  
  // Gaps dans grilles (basés sur Home: gap-12 lg:gap-20)
  gridGap: 'gap-12 lg:gap-20', // 48px / 80px (var(--rhythm-2) / var(--rhythm-3-33))
} as const;

// Typographie
const TYPOGRAPHY = {
  kicker: 'tracking-wide uppercase text-[0.72rem] opacity-80',
  title: 'text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-wider',
  subtitle: 'text-base md:text-lg leading-relaxed opacity-90',
  body: 'text-base md:text-lg leading-relaxed',
} as const;
