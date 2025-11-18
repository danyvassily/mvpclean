# 📖 Guide : Texte sur Image - Lisibilité Maximale

> **Date de création** : Novembre 2024  
> **Objectif** : Garantir que tout texte superposé sur des images soit TOUJOURS lisible, sur tous les écrans (mobile, tablette, desktop).

---

## 🎯 Problème résolu

**Avant** :
- Texte noir sur photos claires → illisible
- Texte trop grand sur mobile → débordement, texte coupé
- Manque de contraste → mauvaise expérience utilisateur

**Après** :
- Texte toujours blanc avec ombre portée forte
- Tailles adaptées pour mobile/tablette
- Classes CSS réutilisables partout

---

## 📋 Classes CSS disponibles

### 1. `.text-on-image` - Classe principale

**Usage** : Appliquer au conteneur qui contient du texte superposé sur une image.

**Effet** :
- Texte blanc avec ombre portée forte
- Titres (h1-h6) : ombre renforcée + centrage automatique
- Paragraphes : légèrement transparents (95%)
- Tailles responsive automatiques (mobile/tablette)

**Exemple** :

```tsx
<div className="relative h-[60vh]">
  {/* Image de fond */}
  <Image src="/images/hero.jpg" alt="Hero" fill className="object-cover" />
  
  {/* Overlay gradient (recommandé) */}
  <div className="absolute inset-0 image-overlay-medium" />
  
  {/* Texte avec classe .text-on-image */}
  <div className="absolute inset-0 flex items-center justify-center text-on-image">
    <div className="text-center max-w-3xl px-6">
      <h1 className="text-4xl lg:text-6xl font-serif mb-6">
        Titre toujours lisible
      </h1>
      <p className="text-lg lg:text-xl">
        Texte descriptif avec contraste optimal
      </p>
    </div>
  </div>
</div>
```

---

### 2. Classes d'overlay (fonds sombres)

#### `.image-overlay-dark` - Overlay très sombre
**Quand l'utiliser** : Photos très claires, ou textes longs.

```tsx
<div className="absolute inset-0 image-overlay-dark" />
```

**Gradient** : `rgba(0,0,0,0.85) → rgba(0,0,0,0.5) → rgba(0,0,0,0.2)`

---

#### `.image-overlay-medium` - Overlay standard
**Quand l'utiliser** : Usage par défaut, photos moyennement claires.

```tsx
<div className="absolute inset-0 image-overlay-medium" />
```

**Gradient** : `rgba(0,0,0,0.7) → rgba(0,0,0,0.35) → transparent`

---

#### `.image-overlay-light` - Overlay léger
**Quand l'utiliser** : Photos déjà sombres, contraste déjà bon.

```tsx
<div className="absolute inset-0 image-overlay-light" />
```

**Gradient** : `rgba(0,0,0,0.5) → rgba(0,0,0,0.2) → transparent`

---

#### `.image-overlay-bottom` - Overlay gradient du bas
**Quand l'utiliser** : Texte positionné en bas de l'image uniquement.

```tsx
<div className="absolute inset-0 image-overlay-bottom" />
```

**Gradient** : `rgba(0,0,0,0.9) → rgba(0,0,0,0.5) → transparent` (70% de la hauteur)

---

### 3. Classes de backplate (alternatives)

#### `.text-backplate-light` - Fond blanc semi-transparent
**Quand l'utiliser** : Alternative à l'overlay sombre, style plus doux.

```tsx
<div className="text-backplate-light">
  <h2 className="text-slate-900">Titre sur fond blanc</h2>
  <p className="text-slate-700">Texte lisible sans ombre portée.</p>
</div>
```

**Effet** :
- Fond blanc 90% opaque avec flou (backdrop-filter)
- Texte sombre (#111827)
- Padding et border-radius automatiques
- Pas de text-shadow

---

#### `.text-backplate-dark` - Fond noir semi-transparent
**Quand l'utiliser** : Texte blanc avec fond sombre localisé (encadré).

```tsx
<div className="text-backplate-dark">
  <h2>Titre sur fond sombre</h2>
  <p>Texte blanc avec ombre légère.</p>
</div>
```

**Effet** :
- Fond noir 75% opaque avec flou
- Texte blanc avec ombre légère
- Padding et border-radius automatiques

---

### 4. `.force-white-text` - Forcer texte blanc

**Quand l'utiliser** : Si d'autres classes CSS tentent de modifier la couleur du texte.

```tsx
<div className="force-white-text">
  <h1>Ce texte sera TOUJOURS blanc, peu importe les autres classes</h1>
</div>
```

---

## 📱 Responsive : Tailles automatiques

Les classes `.text-on-image` ajustent **automatiquement** les tailles de police selon l'écran :

### Mobile (< 640px)
| Élément | Taille | Line-height |
|---------|--------|-------------|
| h1 | 30px (1.875rem) | 1.1 |
| h2 | 24px (1.5rem) | 1.15 |
| h3 | 20px (1.25rem) | 1.2 |
| h4 | 18px (1.125rem) | 1.25 |
| p | 14px (0.875rem) | 1.5 |
| span | 12px (0.75rem) | 1.4 |

**Bonus** :
- Padding réduit à 1rem
- Paragraphes limités à 90% de largeur (empêche débordement)
- Marges automatiques pour centrage

---

### Tablette (641px - 1024px)
| Élément | Taille | Line-height |
|---------|--------|-------------|
| h1 | 36px (2.25rem) | 1.1 |
| h2 | 30px (1.875rem) | 1.15 |
| h3 | 24px (1.5rem) | 1.2 |
| p | 16px (1rem) | 1.5 |

**Bonus** :
- Padding à 1.5rem
- Paragraphes limités à 95% de largeur

---

### Desktop (> 1024px)
Tailles définies dans vos classes Tailwind (ex: `text-4xl`, `text-6xl`) s'appliquent normalement.

---

## ✅ Checklist : Avant de créer un Hero ou une section avec texte sur image

- [ ] **Image de fond** : `<Image fill className="object-cover" />`
- [ ] **Overlay gradient** : Ajouter `.image-overlay-medium` (ou dark/light selon photo)
- [ ] **Conteneur de texte** : Ajouter `.text-on-image`
- [ ] **Texte blanc** : Utiliser `text-white` (ou laissez `.text-on-image` gérer)
- [ ] **Tailles responsive** : Utiliser `text-2xl lg:text-5xl` (les media queries CSS s'appliquent automatiquement)
- [ ] **Centrage mobile** : Ajouter `text-center` sur mobile (`sm:text-left` sur desktop si besoin)
- [ ] **Test visuel** : Vérifier sur mobile (375px), tablette (768px), desktop (1440px)

---

## 🎨 Exemples de patterns complets

### Pattern 1 : Hero standard avec overlay

```tsx
<section className="relative h-[60vh] lg:h-[70vh]">
  {/* Image */}
  <Image 
    src="/images/hero.jpg" 
    alt="Hero" 
    fill 
    className="object-cover" 
    priority 
  />
  
  {/* Overlay */}
  <div className="absolute inset-0 image-overlay-medium" />
  
  {/* Texte */}
  <div className="absolute inset-0 flex items-center justify-center text-on-image">
    <div className="text-center max-w-4xl px-6">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6">
        Notre Histoire
      </h1>
      <p className="text-base md:text-lg lg:text-xl">
        Un patrimoine vivant depuis 1579
      </p>
    </div>
  </div>
</section>
```

---

### Pattern 2 : Hero avec backplate blanc (style HeroHistory)

```tsx
<section className="relative h-[80vh]">
  {/* Image */}
  <Image 
    src="/images/histoire.jpg" 
    alt="Histoire" 
    fill 
    className="object-cover" 
  />
  
  {/* Texte avec backplate */}
  <div className="absolute inset-0 flex items-end p-8 lg:p-16">
    <div className="text-backplate-light max-w-3xl">
      <h1 className="text-4xl lg:text-6xl font-serif mb-4">
        Notre Histoire
      </h1>
      <p className="text-lg">
        Découvrez un domaine viticole d'exception
      </p>
    </div>
  </div>
</section>
```

---

### Pattern 3 : Section panoramique avec texte en overlay (style Terroir)

```tsx
<div className="relative h-[60vh]">
  {/* Image panoramique */}
  <Image 
    src="/images/vignoble.jpg" 
    alt="Vignoble" 
    fill 
    className="object-cover" 
  />
  
  {/* Overlay bottom gradient */}
  <div className="absolute inset-0 image-overlay-bottom" />
  
  {/* Texte en bas à gauche */}
  <div className="absolute inset-0 flex items-end justify-start">
    <div className="p-8 lg:p-16 max-w-2xl text-on-image text-left">
      <h2 className="text-3xl lg:text-5xl font-serif mb-6">
        Rive Droite
      </h2>
      <p className="text-lg">
        Sols argilo-calcaires, exposition sud-ouest
      </p>
    </div>
  </div>
</div>
```

---

### Pattern 4 : Hero SANS texte sur image (style Ruinart épuré)

**Recommandé pour pages éditoriales longues.**

```tsx
<section className="bg-white">
  {/* Image SANS texte */}
  <div className="relative h-[55vh] lg:h-[60vh]">
    <Image 
      src="/images/vins.jpg" 
      alt="Nos Vins" 
      fill 
      className="object-cover" 
    />
  </div>
  
  {/* Titre SOUS l'image sur fond blanc */}
  <div className="container mx-auto px-6 py-12 lg:py-16 text-center">
    <h1 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6">
      Nos Vins
    </h1>
    <p className="text-lg text-slate-700 max-w-3xl mx-auto">
      Vivez l'émotion Lastours
    </p>
  </div>
</section>
```

---

## 🚀 Avantages de cette approche

✅ **Lisibilité garantie** : Texte toujours blanc avec ombre portée forte  
✅ **Responsive automatique** : Tailles adaptées mobile/tablette/desktop  
✅ **Réutilisable** : Classes globales utilisables partout  
✅ **Maintenable** : Modifications centralisées dans `globals.css`  
✅ **Compatible Vercel** : Pas de JS client-side, pur CSS  
✅ **Performance** : Pas de calculs dynamiques, styles appliqués au build  

---

## 🛠️ Maintenance

### Modifier les tailles de police mobile/tablette

Éditer `app/globals.css`, section "RESPONSIVE" (lignes 640+) :

```css
@media (max-width: 640px) {
  .text-on-image h1 {
    font-size: 1.875rem !important; /* Modifier ici */
  }
}
```

---

### Ajouter un nouveau type d'overlay

Éditer `app/globals.css`, section "OVERLAYS" (lignes 608+) :

```css
.image-overlay-custom {
  background: linear-gradient(...) !important;
}
```

---

## 📞 Support

En cas de problème :
1. Vérifier que l'overlay gradient est bien appliqué
2. Vérifier que `.text-on-image` est sur le bon conteneur
3. Tester sur plusieurs tailles d'écran (DevTools)
4. Consulter les exemples de ce guide

---

**Dernière mise à jour** : Novembre 2024  
**Version** : 1.0  
**Projet** : Château Lastours

