# 🎬 GSAP ScrollSmoother React Starter - Guide d'Implémentation

## ✅ **Installation Complète Réussie**

### 🚀 **Composants GSAP Créés :**

#### 1. **ScrollSmootherWrapper** (`components/gsap/ScrollSmootherWrapper.tsx`)
- **Wrapper principal** pour ScrollSmoother
- **Configuration** : `speed=1.2`, `effects=true`, `normalizeScroll=true`
- **Hook personnalisé** `useScrollSmoother()` pour contrôler le scroll
- **Cleanup automatique** des instances GSAP
- **Optimisé pour Next.js** avec gestion SSR

#### 2. **ScrollAnimations** (`components/gsap/ScrollAnimations.tsx`)
- **ScrollAnimation** : 7 types d'animations (`fadeIn`, `slideUp`, `slideLeft`, `slideRight`, `scale`, `reveal`, `parallax`)
- **CinematicTextAnimation** : Animations de texte avec stagger
- **PremiumCardAnimation** : Animations premium pour les cartes de vin
- **Configurables** : `duration`, `delay`, `ease`, `trigger`

#### 3. **CinematicEffects** (`components/gsap/CinematicEffects.tsx`)
- **ParallaxImage** : Effet parallax pour les images de fond
- **AnimatedGrain** : Grain cinématographique animé
- **SectionReveal** : Révélations sophistiquées de sections
- **ZoomReveal** : Effet de zoom + blur pour les images

#### 4. **ClientLayout** (`components/ClientLayout.tsx`)
- **Wrapper global** pour ScrollSmoother
- **Grain animé global** avec intensité 0.12
- **Gestion de l'hydratation** Next.js

### 🎨 **Styles CSS Ajoutés :**

```css
/* GSAP ScrollSmoother Styles */
.smooth-wrapper {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.smooth-content {
  overflow: visible;
  width: 100%;
}

/* Optimisations performances */
.smooth-wrapper,
.smooth-content {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Classes pour animations cinématographiques */
.text-line {
  display: block;
  overflow: hidden;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Accessibilité - Respect préférences réduites */
@media (prefers-reduced-motion: reduce) {
  .smooth-wrapper {
    position: static !important;
    overflow: auto !important;
    height: auto !important;
  }
  
  .smooth-content {
    transform: none !important;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 🍷 **Implémentations Réussies :**

#### **Page /les-vins :**
- ✅ **Hero parallax** avec `ParallaxImage`
- ✅ **Titre cinématographique** avec `CinematicTextAnimation`
- ✅ **5 gammes animées** avec `PremiumCardAnimation` (index 0-4)
- ✅ **Animations séquentielles** : `fadeIn` → `slideUp` → `slideLeft/Right`
- ✅ **Grain unique global** avec SVG dynamique

#### **Pages de Cuvées :**
- ✅ **Grains uniques** par cuvée (basés sur l'ID)
- ✅ **Style cinématographique** sombre et luxueux
- ✅ **Zoom reveal** pour les images de bouteilles
- ✅ **Animations d'informations** avec délais eschelonnés
- ✅ **13 pages cuvées** transformées

### 🎛️ **Configuration Avancée :**

#### **Effets de Grain Uniques :**
```typescript
// Chaque cuvée a son grain unique
const grainIntensity = 0.85 + (wineIdNum % 5) * 0.03 // 0.85-0.97
const grainScale = 80 + (wineIdNum % 8) * 10        // 80-150px
const grainOpacity = 0.15 + (wineIdNum % 3) * 0.05  // 0.15-0.25
```

#### **Animations Disponibles :**
- **fadeIn** : Apparition douce avec déplacement Y
- **slideUp** : Glissement depuis le bas
- **slideLeft/Right** : Glissements latéraux
- **scale** : Effet de zoom
- **reveal** : Révélation avec clipPath
- **parallax** : Déplacement à vitesse différente du scroll

### 🚀 **Utilisation :**

#### **Animation Simple :**
```tsx
<ScrollAnimation animation="fadeIn" delay={0.2}>
  <div>Contenu animé</div>
</ScrollAnimation>
```

#### **Carte Premium :**
```tsx
<PremiumCardAnimation index={0}>
  <div>Carte de vin avec animation sophistiquée</div>
</PremiumCardAnimation>
```

#### **Parallax Image :**
```tsx
<ParallaxImage 
  src="/image.jpg" 
  alt="Description" 
  speed={0.3}
>
  <div>Contenu superposé</div>
</ParallaxImage>
```

#### **Grain Animé :**
```tsx
<AnimatedGrain intensity={0.15} speed={1} />
```

### 🎯 **Performances :**

- ✅ **SSR Safe** : Gestion de l'hydratation
- ✅ **Cleanup automatique** : Destruction des instances GSAP
- ✅ **Optimisations CSS** : `will-change`, `backface-visibility`
- ✅ **Responsive** : Breakpoints adaptés
- ✅ **Accessibilité** : Respect `prefers-reduced-motion`

### 🎬 **Résultat Final :**

**Un site web cinématographique complet** avec :
- **Défilement fluide** sur toutes les pages
- **Animations sophistiquées** et coordonnées
- **Effets de grain uniques** par cuvée
- **Parallax premium** sur les images
- **Révélations séquentielles** des contenus
- **Style sombre et luxueux** cohérent

## 🚀 **Prêt pour Production !**

Le site Château Lastours dispose maintenant d'une **expérience utilisateur cinématographique** complète avec GSAP ScrollSmoother intégré et optimisé pour Next.js 14.
