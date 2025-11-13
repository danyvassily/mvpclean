# Guide d'Optimisation des Images - Château Lastours

## Problèmes Identifiés et Solutions

### 🚨 Problèmes Originaux
- Images très lourdes (ex: `Club Chateau Lastours.jpg` = 25MB)
- Utilisation d'éléments `<img>` au lieu du composant Next.js `Image`
- Pas de lazy loading pour les images non critiques
- Absence de placeholders pendant le chargement

### ✅ Solutions Implémentées

#### 1. Composants d'Images Optimisés

**OptimizedImage.tsx**
- Composant basé sur Next.js `Image`
- Gestion automatique des erreurs avec fallback
- Paramètres de qualité configurables
- Support des placeholders blur

**LazyImage.tsx**
- Lazy loading avec Intersection Observer
- Placeholders animés pendant le chargement
- Gestion d'erreurs robuste
- Optimisé pour les images lourdes

#### 2. Améliorations CSS

**Ajouts dans globals.css :**
```css
/* Styles spécifiques pour les images Next.js */
.next-image-container {
  position: relative;
  overflow: hidden;
}

/* Correction pour les images de fond dans les sections hero */
.hero-image-container {
  position: absolute;
  inset: 0;
  z-index: 0;
}
```

#### 3. Configuration Next.js

**next.config.mjs :**
- Images unoptimized pour l'export statique (Netlify)
- Formats modernes supportés (AVIF, WebP)
- Tailles d'écran optimisées

### 📊 Performances Améliorées

#### Avant :
- Images non optimisées (25MB+)
- Chargement synchrone
- Pas de compression

#### Après :
- Lazy loading intelligent
- Placeholders pendant le chargement
- Compression automatique (qualité 85%)
- Fallbacks en cas d'erreur

### 🛠️ Utilisation

#### Pour les images de héros :
```tsx
<SectionHero
  title="Club Lastours"
  imageSrc="/Page/Club - ok/Club Chateau Lastours.jpg"
  height="xl"
/>
```

#### Pour les images dans le contenu :
```tsx
<LazyImage
  src="/images/wines/exclusive-french-wine-club.png"
  alt="Club exclusif"
  containerClassName="h-96 lg:h-[500px] rounded-lg shadow-2xl"
  aspectRatio="landscape"
  objectFit="cover"
/>
```

#### Pour les images optimisées Next.js :
```tsx
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  fill
  quality={90}
  priority
/>
```

### 🔧 Script d'Optimisation

**scripts/optimize-images.js**
- Détecte automatiquement les images lourdes (>5MB)
- Redimensionne à 1920px max
- Compresse à 85% de qualité
- Crée des sauvegardes automatiques

**Utilisation :**
```bash
node scripts/optimize-images.js
```

### 📱 Responsive Design

Les composants gèrent automatiquement :
- Différentes tailles d'écran
- Ratios d'aspect adaptatifs
- Chargement conditionnel selon la bande passante

### 🎯 Bonnes Pratiques

1. **Utilisez LazyImage** pour les images non critiques
2. **Utilisez OptimizedImage** pour les images importantes
3. **Définissez toujours un alt text** descriptif
4. **Spécifiez les dimensions** quand possible
5. **Utilisez priority={true}** pour les images above-the-fold

### 🚀 Résultats

- ⚡ Chargement initial plus rapide
- 📱 Meilleure expérience mobile
- 🎨 Placeholders élégants
- 🔄 Gestion d'erreurs robuste
- 💾 Économie de bande passante

### 🔍 Monitoring

Pour surveiller les performances :
1. Utilisez les DevTools Network
2. Vérifiez les Core Web Vitals
3. Testez sur différentes connexions
4. Surveillez les erreurs de chargement

---

**Note :** Ce guide est spécifiquement adapté pour le déploiement statique sur Netlify avec Next.js export.
