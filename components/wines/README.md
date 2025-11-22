# Composants Wines - Style Ruinart

Documentation des composants réutilisables pour l'affichage des bouteilles de vin, inspirés du design épuré de Ruinart.

## 🎨 Philosophie Design

- **Minimalisme absolu** : Fond blanc, typographie légère, espacement généreux
- **Uniformité des bouteilles** : Toutes les bouteilles ont EXACTEMENT la même taille visuelle (42-65px de large selon breakpoint)
- **Ratio fixe** : Conteneurs avec `aspect-ratio: 1/3` pour garantir des proportions identiques
- **Pas de prix** : Conformément aux règles métier Château Lastours
- **Transitions douces** : 500ms pour un effet luxueux

## 📦 Composants

### `WineCard`

Carte individuelle pour une bouteille de vin.

#### Props

```typescript
interface WineCardProps {
  name: string          // Nom de la cuvée (ex: "Opus Blanc")
  subtitle?: string     // Badge optionnel (ex: "Blanc", "Rouge")
  description?: string  // Description courte (optionnelle)
  imageSrc: string      // Chemin vers l'image PNG transparente
  href: string          // Lien vers la fiche détaillée
  className?: string    // Classes CSS additionnelles
}
```

#### Exemple d'utilisation

```tsx
import { WineCard } from "@/components/wines/WineCard"

<WineCard
  name="Opus Blanc"
  subtitle="Blanc"
  imageSrc="/images/wines/blanc-opus-sf.png"
  href="/les-vins/opus-blanc"
/>
```

#### Caractéristiques

- **Tailles uniformes** : Toutes les bouteilles ont les mêmes dimensions visuelles
  - Mobile : 42px large
  - SM : 50px
  - MD : 55px
  - LG : 65px
- **Aspect ratio** : 1:3 (hauteur = 3× largeur) pour format bouteille
- **Image** : `object-contain` pour préserver le ratio sans crop
- **Hover** : Opacité à 80% + scale 105% sur la bouteille
- **Focus** : Ring subtil pour accessibilité

---

### `WineGrid`

Grille responsive pour afficher plusieurs bouteilles.

#### Props

```typescript
interface WineGridProps {
  children: ReactNode   // WineCard components
  className?: string    // Classes CSS additionnelles
}
```

#### Exemple d'utilisation

```tsx
import { WineGrid } from "@/components/wines/WineGrid"
import { WineCard } from "@/components/wines/WineCard"

<WineGrid>
  <WineCard name="Opus Blanc" href="/les-vins/opus-blanc" imageSrc="..." />
  <WineCard name="Opus Rouge" href="/les-vins/opus-rouge" imageSrc="..." />
  <WineCard name="Doméni Blanc" href="/les-vins/domeni-blanc" imageSrc="..." />
</WineGrid>
```

#### Caractéristiques

- **Grille responsive style Ruinart** :
  - Mobile : 2 colonnes
  - Tablette (md) : 3 colonnes
  - Desktop (lg) : 4 colonnes
- **Espacement généreux** :
  - Mobile : gap-8 (32px)
  - SM : gap-10 (40px)
  - MD : gap-12 (48px)
  - LG : gap-16 (64px)
- **Centrage parfait** : `place-items-center`

---

## 🏗️ Utilisation complète dans une page

### Exemple : Page "Nos Vins" avec gammes

```tsx
import { gammes } from "@/lib/wines"
import { WineCard } from "@/components/wines/WineCard"
import { WineGrid } from "@/components/wines/WineGrid"

export default function WinesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="...">
        {/* Hero content */}
      </section>

      {/* Gammes de vins */}
      {gammes.map((gamme, index) => (
        <section
          key={gamme.id}
          className={`py-12 sm:py-16 md:py-20 lg:py-32 ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
          }`}
        >
          <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl">
            {/* Titre de la gamme */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900">
                {gamme.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-slate-600 mt-4">
                {gamme.description}
              </p>
            </div>

            {/* Grille de cuvées */}
            <WineGrid>
              {gamme.cuvees.map((cuvee) => (
                <WineCard
                  key={cuvee.slug}
                  name={cuvee.title}
                  subtitle={cuvee.colorTag}
                  imageSrc={cuvee.image || "/images/wines/placeholder.png"}
                  href={cuvee.route}
                />
              ))}
            </WineGrid>
          </div>
        </section>
      ))}
    </div>
  )
}
```

---

## 🎯 Points clés à respecter

### ✅ À FAIRE

1. **Utiliser les assets fournis** : PNG transparents dans `/public/images/wines/` ou `/public/images/vins/`
2. **Respecter les tailles uniformes** : Ne pas modifier les dimensions du conteneur
3. **Pas de prix** : Conformément aux règles métier
4. **Espacement généreux** : Style Ruinart = beaucoup d'espace blanc
5. **Accessibilité** : Focus ring, alt texts, rôles ARIA si nécessaire

### ❌ À ÉVITER

1. ❌ Afficher des prix
2. ❌ Modifier les dimensions des bouteilles (casse l'uniformité)
3. ❌ Réduire les espacements (perd le style Ruinart)
4. ❌ Ajouter trop d'informations (garde le minimalisme)
5. ❌ Utiliser des images non-optimisées ou avec fond

---

## 🖼️ Assets Images

### Structure attendue

```
/public/images/wines/  (ou /vins/)
├── blanc-domeni-sf.png
├── blanc-opus-sf.png
├── blanc-perle-sf.png
├── claire-de-lune-sf.png
├── la-methode-blanc-st.png
├── la-methode-rose-sf.png
├── petrichor-st.png
├── petrichor-ros-sf.png
├── pigeonnier-sf.png
├── poussin-blanc-sf.png
├── poussin-rose-sf.png
├── rose-domeni-sf.png
├── rouge-domeni-sf.png
└── rouge-opus-sf.png
```

### Recommandations images

- **Format** : PNG avec fond transparent
- **Qualité** : 85-90
- **Dimensions** : Minimum 200px de large pour la bouteille
- **Nommage** : Minuscules, tirets, pas d'accents (ex: `blanc-domeni-sf.png`)
- **Optimisation** : Utiliser `next/image` avec `quality={90}`

---

## 🔧 Personnalisation

### Modifier les tailles de bouteilles

Si nécessaire, ajuster dans `WineCard.tsx` :

```tsx
// Ligne ~55
<div 
  className="relative w-full max-w-[42px] sm:max-w-[50px] md:max-w-[55px] lg:max-w-[65px]" 
  style={{ aspectRatio: '1 / 3' }}
>
```

⚠️ **Important** : Garder le ratio 1:3 et des valeurs uniformes pour toutes les cartes.

### Modifier l'espacement de la grille

Dans `WineGrid.tsx` :

```tsx
// Ligne ~32
"gap-8 sm:gap-10 md:gap-12 lg:gap-16"
```

### Modifier le nombre de colonnes

Dans `WineGrid.tsx` :

```tsx
// Ligne ~31
"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

---

## 📱 Responsive

| Breakpoint | Colonnes | Gap | Taille bouteille |
|------------|----------|-----|------------------|
| Mobile (< 640px) | 2 | 32px | 42px |
| SM (640px+) | 2 | 40px | 50px |
| MD (768px+) | 3 | 48px | 55px |
| LG (1024px+) | 4 | 64px | 65px |

---

## 🚀 Déploiement Vercel

### Points de vigilance

1. **Chemins d'images** : Utiliser `/public/images/...` (pas de chemins relatifs)
2. **Next.js Image** : Toujours utiliser `next/image` avec `sizes` appropriés
3. **Lazy loading** : `loading="lazy"` sauf pour les 2-4 premières bouteilles
4. **Priority** : Ajouter `priority` pour les images above-the-fold
5. **Quality** : 85-90 pour un bon compromis taille/qualité

---

## 📄 Licence et Crédits

- **Design inspiré de** : Ruinart (structure/layout uniquement, pas de copie de code)
- **Développé pour** : Château Lastours
- **Framework** : Next.js 14+ (App Router)
- **Styling** : Tailwind CSS 3+

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2024

