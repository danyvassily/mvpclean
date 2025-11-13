# Patterns Ruinart - Référence de Style (STRUCTURE UNIQUEMENT)

**⚠️ IMPORTANT** : Ce document est UNIQUEMENT une référence de STRUCTURE et de LAYOUT.
Ne JAMAIS copier le code, le CSS, ni le contenu textuel de Ruinart.

## 1. Pages Vins / Champagnes (Grilles Produits)

### Structure générale :
```
┌─────────────────────────────────────────┐
│  HERO IMAGE (60vh)                      │
│  + TITRE CENTRÉ                         │
│  + TEXTE DESCRIPTIF COURT CENTRÉ        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  GRILLE DE PRODUITS                     │
│  - Desktop: 3-4 colonnes                │
│  - Tablette: 2 colonnes                 │
│  - Mobile: 1 colonne                    │
│                                         │
│  [IMG]  [IMG]  [IMG]  [IMG]            │
│  Nom    Nom    Nom    Nom              │
│  Desc   Desc   Desc   Desc             │
│  [CTA]  [CTA]  [CTA]  [CTA]            │
└─────────────────────────────────────────┘
```

### Caractéristiques :
- Fond blanc/clair uniforme
- Images de produits grandes, ratio respecté (`object-contain`)
- Nom de produit : `text-xl/2xl`, centré
- Description courte : `text-sm/base`, centrée, max 2-3 lignes
- CTA sobre : "Découvrir" / "En savoir plus"
- **PAS DE PRIX affiché**
- Marges respirantes entre cartes
- Hover subtil (scale 1.02)

---

## 2. Pages Engagements

### Structure générale :
```
┌─────────────────────────────────────────┐
│  HERO IMAGE (60-70vh)                   │
│  + TITRE PRINCIPAL CENTRÉ               │
│  + TEXTE INTRO CENTRÉ                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  INTRODUCTION (texte centré, max-w-3xl) │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  GRILLE ENGAGEMENTS (2x3 ou 3x2)       │
│                                         │
│  [IMAGE]         [IMAGE]         [IMAGE]│
│  Titre           Titre           Titre  │
│  Description     Description     Desc   │
│  [Découvrir]     [Découvrir]     [CTA]  │
└─────────────────────────────────────────┘
```

### Caractéristiques :
- Fond blanc
- Sections avec image + texte côte à côte (desktop) ou empilées (mobile/tablette)
- Grille de "cartes engagement" :
  - Image pleine largeur
  - Titre : `text-lg/xl`, gras
  - Description : `text-sm/base`, 2-4 lignes max
  - CTA : "Découvrir"
- Desktop : 2-3 colonnes
- Tablette : 2 colonnes
- Mobile : 1 colonne

---

## 3. Pages Éditoriales (Histoire, Vignoble, etc.)

### Structure générale :
```
┌─────────────────────────────────────────┐
│  HERO IMAGE (60-70vh)                   │
│  + TITRE H1 CENTRÉ                      │
│  + SOUS-TITRE COURT CENTRÉ              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  SECTION 1 : IMAGE + TEXTE              │
│  Desktop: [IMAGE]  |  [TEXTE]           │
│  Mobile:  [IMAGE]                       │
│           [TEXTE]                       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  SECTION 2 : TEXTE + IMAGE              │
│  Desktop: [TEXTE]  |  [IMAGE]           │
│  Mobile:  [IMAGE]                       │
│           [TEXTE]                       │
└─────────────────────────────────────────┘
```

### Caractéristiques :
- Alternance image/texte (gauche/droite sur desktop)
- Sur mobile/tablette : **toujours** image puis texte (stack vertical)
- Texte sur fond blanc, centré, `max-w-xl` ou `max-w-2xl`
- Titres : `text-2xl/3xl` mobile, `text-4xl/5xl` desktop
- Paragraphes : `text-sm/base`, `leading-relaxed`
- Marges verticales harmonisées : `py-12` mobile, `py-20` desktop
- **AUCUN texte long en overlay sur images** (sauf hero court)
- Séparateurs décoratifs (lignes fines, optionnel)

---

## 4. Pages Expériences / Visites

### Structure générale :
```
┌─────────────────────────────────────────┐
│  HERO IMAGE + TITRE                     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  SECTIONS ÉDITORIALES (image + texte)   │
│  Même pattern que pages éditoriales     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  GRILLE D'EXPÉRIENCES (cartes)          │
│  [IMAGE] [IMAGE] [IMAGE]                │
│  Titre   Titre   Titre                  │
│  Desc    Desc    Desc                   │
│  [CTA]   [CTA]   [CTA]                  │
└─────────────────────────────────────────┘
```

---

## 5. Typographie Générale

### Hiérarchie recommandée :
- **H1 (Hero)** : 
  - Mobile : `text-2xl/3xl` (24-30px)
  - Tablette : `text-3xl/4xl` (30-36px)
  - Desktop : `text-5xl/6xl` (48-60px)
  
- **H2 (Sections)** : 
  - Mobile : `text-2xl` (24px)
  - Tablette : `text-3xl` (30px)
  - Desktop : `text-4xl/5xl` (36-48px)

- **H3 (Sous-sections)** :
  - Mobile : `text-xl` (20px)
  - Desktop : `text-2xl/3xl` (24-30px)

- **Corps de texte** :
  - Mobile : `text-sm` (14px)
  - Desktop : `text-base/lg` (16-18px)
  - `leading-relaxed` (1.625)

- **Descriptions courtes** :
  - `text-sm` (14px), `leading-normal`

---

## 6. Espacements

### Marges verticales entre sections :
- Mobile : `py-12` (48px)
- Tablette : `py-16` (64px)
- Desktop : `py-20/24` (80-96px)

### Marges latérales (container) :
- Mobile : `px-4` (16px)
- Tablette : `px-6` (24px)
- Desktop : `px-8` (32px)
- Max-width : `max-w-7xl` ou `max-w-6xl` avec `mx-auto`

### Gaps dans grilles :
- Mobile : `gap-6/8` (24-32px)
- Desktop : `gap-10/12` (40-48px)

---

## 7. Couleurs

- **Fond principal** : Blanc (#FFFFFF)
- **Fond secondaire** : Off-white (#FAFAF9, #F8F5EE)
- **Textes** : Gris très foncé (#1F2937, #111827)
- **Textes secondaires** : Gris moyen (#4B5563, #6B7280)
- **Accents** : Or doux (#C6A869), Bordeaux (#7A1F2B)
- **CTA** : Gris foncé (#1F2937) avec hover (#111827)

---

## 8. Images

- **Ratio** : Respecté, jamais déformé
- **object-cover** : Pour les fonds, hero, sections
- **object-contain** : Pour les bouteilles/produits
- **Hauteur hero** : 
  - Mobile : `h-[55vh]`
  - Tablette : `h-[60vh]`
  - Desktop : `h-[70vh]`, `max-h-[700px]`

---

## 9. Boutons / CTA

- **Taille minimale** : `min-h-[44px]` (accessibilité tactile)
- **Padding** : `px-6/8 py-3/4`
- **Style** : 
  - Fond sombre (#1F2937) + texte blanc
  - OU bordure + texte sombre (ghost)
- **Hover** : Légère transition (`scale-[1.02]`, opacity)
- **Centré sur mobile** : `mx-auto` ou `flex justify-center`

---

## 10. Responsive - Règles d'Or

### Mobile (< 640px) :
- **1 colonne** pour tout (grilles, sections)
- **Image puis texte** (stack vertical)
- **Texte centré** dans blocs éditoriaux
- **Aucun texte long en overlay** sur images
- **Polices réduites** : `text-2xl` max pour titres

### Tablette (641-1023px) :
- **2 colonnes** pour grilles produits/cartes
- **Image puis texte** (stack vertical) pour sections éditoriales
- **Polices intermédiaires** : `text-3xl/4xl` pour titres

### Desktop (≥ 1024px) :
- **3-4 colonnes** pour grilles produits
- **2 colonnes** (image + texte) pour sections éditoriales avec alternance
- **Polices grandes** : `text-5xl/6xl` pour hero

---

## 11. Patterns à ÉVITER

❌ **Texte long en overlay sur images** (surtout mobile)
❌ **Polices trop grandes** sur mobile (`text-5xl` sur 375px)
❌ **Cards avec bordures/ombres lourdes** (préférer fond blanc simple)
❌ **Images déformées** (étirées en hauteur/largeur)
❌ **Overflow horizontal** sur mobile
❌ **CTA non centrés** sur mobile
❌ **Textes coupés** ou tronqués
❌ **Espaces vides énormes** entre sections

---

## 12. Composants Clés à Créer

- **`WineCard`** : Carte produit (image + nom + description + CTA)
- **`WineGrid`** : Grille responsive pour vins
- **`EngagementCard`** : Carte engagement (image + titre + description + CTA)
- **`StorySection`** : Section éditoriale (image + texte alternés) ✅ CRÉÉ
- **`HeroStandard`** : Hero propre, image non étirée ✅ REFACTORISÉ
- **`CTAGroup`** : Groupe de boutons CTA ✅ EXISTE
- **`SectionIntro`** : Intro centrée avec max-width

