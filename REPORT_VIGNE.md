# REPORT_VIGNE.md

## Rapport de vérification - Page "Le cycle de la vigne"

Date: $(date)

---

## 1. État actuel vs Spécifications

### ❌ PROBLÈMES CRITIQUES IDENTIFIÉS

#### 1.1 Nommage & SEO

| Spécification | État Actuel | Statut |
|--------------|-------------|--------|
| **Titre H1 exact**: "Le cycle de la vigne" | `title="La Vigne"` (ligne 126) | ❌ INCORRECT |
| **Slug/page**: `/le-cycle-de-la-vigne` | `/savoir-faire/vigne` | ❌ INCORRECT |
| **Redirection 301**: `/la-vigne` → `/le-cycle-de-la-vigne` | Aucune redirection | ❌ MANQUANT |
| **Metadata title**: "Le cycle de la vigne \| Château Lastours" | "La Vigne \| Château Lastours" (ligne 8) | ❌ INCORRECT |
| **Metadata description**: Généré depuis H1 + premier paragraphe ASSET | Texte inventé (ligne 9) | ❌ INCORRECT |

#### 1.2 Source de données

| Spécification | État Actuel | Statut |
|--------------|-------------|--------|
| **Source unique**: `/public/ASSET/le-cycle-de-la-vigne` | **Dossier n'existe pas** | ❌ CRITIQUE |
| **Assets disponibles**: `/public/Page/La vigne - ok/` | ✅ Existe (12 fichiers) | ⚠️ PATH DIFFÉRENT |
| **Textes ASSET uniquement** | Textes inventés dans `vigneSections` (lignes 18-103) | ❌ VIOLATION |

**⚠️ IMPORTANT**: Le dossier `/public/ASSET/le-cycle-de-la-vigne` n'existe pas. Les assets sont dans `/public/Page/La vigne - ok/`. 

**Recommandation**: 
- Créer le dossier `/public/ASSET/le-cycle-de-la-vigne` et y copier les assets
- OU mettre à jour les spécifications pour pointer vers `/public/Page/La vigne - ok/`

#### 1.3 Contenus (Violations)

| Violation | Exemple dans le code | Ligne |
|-----------|---------------------|-------|
| **Textes inventés** | "Au Château Lastours, la vigne n'est pas simplement une culture..." | 24 |
| **Kickers génériques** | "Notre Philosophie", "Savoir-Faire", "La Magie de la Nature" | 22, 36, 50 |
| **Titres inventés** | "Une Passion pour la Vigne", "Le Travail de la Vigne" | 23, 37 |
| **Images hors ASSET** | `/photos/image00036.jpeg`, `/photos/image00005.jpeg`, `/photos/image00002.jpeg` | 69, 83, 97 |
| **Image hero hors ASSET** | `/PHOTOS-WEB-LASTOURS/VIGNES/IMG_20230809_124834.jpg` | 137 |

#### 1.4 Images utilisées vs Images ASSET disponibles

**Images disponibles dans `/public/Page/La vigne - ok/`**:
- ✅ `allee-de-vigne-a-l-aube-cepage-rouge.jpg` (1600x1066, portrait)
- ✅ `allee-de-vigne-grappe-de-raisins-mur-cepage-rouge.jpg` (3000x4000, portrait)
- ✅ `allee-de-vignes-cepage-blanc.jpg` (12000x9000, paysage)
- ✅ `debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg` (2994x3523, portrait)
- ✅ `grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg` (1280x853, paysage)
- ✅ `jardins-a-la-francaise-lever-de-soleil.jpeg` (4032x3024, paysage)
- ✅ `plantier-cepage-braucol-chateau-lastours-gaillac-france.jpeg` (3024x4032, portrait)
- ✅ `travail-dans-la-vigne-palissage.jpg` (3840x5376, portrait)
- ✅ `vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg` (4032x3024, paysage)

**Images utilisées dans le code**:
- ❌ `/Page/La vigne - ok/20230426_214346.jpg` → **N'existe pas** (ligne 27)
- ❌ `/Page/La vigne - ok/Palissage vigne .jpg` → **N'existe pas** (ligne 41)
- ✅ `/Page/La vigne - ok/grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg` → Existe (ligne 55)
- ❌ `/photos/image00036.jpeg` → Hors ASSET (ligne 69)
- ❌ `/photos/image00005.jpeg` → Hors ASSET (ligne 83)
- ❌ `/photos/image00002.jpeg` → Hors ASSET (ligne 97)
- ❌ `/PHOTOS-WEB-LASTOURS/VIGNES/IMG_20230809_124834.jpg` → Hors ASSET (ligne 137)

#### 1.5 Structure et Responsiveness

| Spécification | État Actuel | Statut |
|--------------|-------------|--------|
| **Images plein écran** | Utilise `<img>` au lieu de Next/Image | ❌ NON OPTIMISÉ |
| **Layout fill/object-fit** | Non utilisé | ❌ MANQUANT |
| **sizes/srcset** | Non configuré | ❌ MANQUANT |
| **Art direction portrait/paysage** | Pas de gestion différenciée | ❌ MANQUANT |
| **Hauteur responsive** | `h-[60vh] lg:h-[70vh] xl:h-[80vh]` fixe | ⚠️ PARTIEL |
| **Overlay sombre imposé** | `bg-gradient-to-t from-black/60` (ligne 167) | ❌ NON CONFORME |
| **Backplate texte** | Pas de backplate clair | ❌ MANQUANT |

#### 1.6 Espacements

| Spécification | État Actuel | Statut |
|--------------|-------------|--------|
| **Token rythme vertical** | Aucun token défini | ❌ MANQUANT |
| **Marges sections** | `mb-12 lg:mb-16 xl:mb-20` (arbitraire) | ⚠️ NON STRUCTURÉ |
| **Espacement titre/paragraphe** | `mb-8`, `mb-6` (fixes) | ⚠️ NON STRUCTURÉ |
| **Gaps excessifs mobile** | Espace après hero `h-16 lg:h-24` | ⚠️ À VÉRIFIER |

#### 1.7 CTA

| Spécification | État Actuel | Statut |
|--------------|-------------|--------|
| **CTA pointe vers Visite** | Pointe vers `/savoir-faire/chais` (ligne 218) | ❌ INCORRECT |
| **Route réelle Visite** | `/reservation` (détectée dans header.tsx) | ✅ TROUVÉE |
| **Libellé CTA** | "Visiter nos Chais" → Doit pointer vers Visite | ❌ INCORRECT |
| **Taille cible bouton** | `px-16 py-6` → ~44px hauteur | ✅ CONFORME |
| **Focus visible** | Pas de style focus spécifique | ⚠️ À VÉRIFIER |

#### 1.8 Accessibilité

| Spécification | État Actuel | Statut |
|--------------|-------------|--------|
| **Alt text dérivé ASSET** | Textes inventés (ex: "Vignes au coucher du soleil") | ❌ INCORRECT |
| **Contraste AA texte sur image** | Blanc sur overlay sombre → À vérifier | ⚠️ À MESURER |
| **Ordre tabulation** | Non vérifié | ⚠️ À VÉRIFIER |
| **Navigation clavier** | Pas de gestion spécifique | ⚠️ À VÉRIFIER |

---

## 2. Tableau Section/Bloc → Fichier ASSET

| Section/Bloc Actuel | Fichier Texte ASSET | Fichier Image ASSET | Statut |
|---------------------|---------------------|---------------------|--------|
| **Hero** | `La vigne FR.docx` | Images disponibles mais non mappées | ❌ À CORRIGER |
| **Passion** (inventé) | `La vigne FR.docx` | `/Page/La vigne - ok/20230426_214346.jpg` (❌ n'existe pas) | ❌ À SUPPRIMER |
| **Travail** (inventé) | `La vigne FR.docx` | `/Page/La vigne - ok/Palissage vigne .jpg` (❌ n'existe pas) | ❌ À SUPPRIMER |
| **Véraison** (inventé) | `La vigne FR.docx` | `grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg` (✅ existe) | ⚠️ TITRE À CORRIGER |
| **Terroir** (inventé) | `La vigne FR.docx` | `/photos/image00036.jpeg` (❌ hors ASSET) | ❌ À SUPPRIMER |
| **Engagement** (inventé) | `La vigne FR.docx` | `/photos/image00005.jpeg` (❌ hors ASSET) | ❌ À SUPPRIMER |
| **Vendanges** (inventé) | `La vigne FR.docx` | `/photos/image00002.jpeg` (❌ hors ASSET) | ❌ À SUPPRIMER |

**⚠️ NOTE**: Les sections actuelles sont toutes inventées. Il faut extraire le contenu réel depuis `La vigne FR.docx` pour créer les sections conformes.

---

## 3. Liste des images utilisées

| Chemin Image | Dimensions | Orientation | Alt Text Actuel | Alt Text Correct (ASSET) | Statut |
|--------------|------------|-------------|-----------------|-------------------------|--------|
| `/PHOTOS-WEB-LASTOURS/VIGNES/IMG_20230809_124834.jpg` | ? | ? | "La Vigne - Château Lastours" | À définir depuis ASSET | ❌ HORS ASSET |
| `/Page/La vigne - ok/20230426_214346.jpg` | - | - | "Vignes au coucher du soleil" | **N'existe pas** | ❌ MANQUANT |
| `/Page/La vigne - ok/Palissage vigne .jpg` | - | - | "Palissage des vignes" | **N'existe pas** | ❌ MANQUANT |
| `grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg` | 1280x853 | Paysage | "La véraison - Changement de couleur" | Dérivé du nom fichier | ✅ EXISTE |
| `/photos/image00036.jpeg` | ? | ? | "Terroir et vignoble" | **Hors ASSET** | ❌ HORS ASSET |
| `/photos/image00005.jpeg` | ? | ? | "Viticulture durable" | **Hors ASSET** | ❌ HORS ASSET |
| `/photos/image00002.jpeg` | ? | ? | "Les vendanges" | **Hors ASSET** | ❌ HORS ASSET |

**Images ASSET disponibles non utilisées**:
- ✅ `allee-de-vigne-a-l-aube-cepage-rouge.jpg` (1600x1066, portrait)
- ✅ `allee-de-vigne-grappe-de-raisins-mur-cepage-rouge.jpg` (3000x4000, portrait)
- ✅ `allee-de-vignes-cepage-blanc.jpg` (12000x9000, paysage)
- ✅ `debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg` (2994x3523, portrait)
- ✅ `jardins-a-la-francaise-lever-de-soleil.jpeg` (4032x3024, paysage)
- ✅ `plantier-cepage-braucol-chateau-lastours-gaillac-france.jpeg` (3024x4032, portrait)
- ✅ `travail-dans-la-vigne-palissage.jpg` (3840x5376, portrait)
- ✅ `vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg` (4032x3024, paysage)

---

## 4. Règles d'art direction

### État Actuel
- ❌ Pas d'art direction
- ❌ Pas de `<picture>` ou sources alternatives
- ❌ Pas de gestion portrait/paysage
- ❌ Pas de sizes/srcset

### Recommandations

**Pour images plein écran**:
```tsx
<Image
  src="/Page/La vigne - ok/[image].jpg"
  alt="..."
  fill
  sizes="(max-width: 768px) 100vw, 100vw"
  className="object-cover"
  priority={isHero}
/>
```

**Pour art direction portrait/paysage**:
```tsx
<picture>
  <source 
    media="(orientation: portrait)" 
    srcSet="/Page/La vigne - ok/[portrait].jpg"
  />
  <source 
    media="(orientation: landscape)" 
    srcSet="/Page/La vigne - ok/[paysage].jpg"
  />
  <Image ... />
</picture>
```

**Composants recommandés**:
- `<FullBleedImage>` avec wrapper ratio
- `<ImageTextBlock>` avec align configurable

---

## 5. Stratégie d'espacement

### État Actuel
- Aucun token défini
- Espacements arbitraires (`mb-12`, `py-24`, etc.)

### Recommandation

**Token CSS**:
```css
:root {
  --rhythm: 24px;
}
```

**Application**:
- Sections majeures: `mb-[calc(var(--rhythm)*2)]` à `mb-[calc(var(--rhythm)*3)]` (48px-72px)
- Entre titre/chapeau/paragraphe: `mb-[calc(var(--rhythm)*0.5)]` à `mb-[calc(var(--rhythm)*1)]` (12px-24px)
- Mobile: réduire à 1.5x rhythm max pour éviter gouffres

**Classes Tailwind personnalisées**:
```js
// tailwind.config.mjs
spacing: {
  'rhythm': '24px',
  'rhythm-0.5': '12px',
  'rhythm-1': '24px',
  'rhythm-2': '48px',
  'rhythm-3': '72px',
}
```

---

## 6. Route CTA "Visite"

### Détection de la route

**Route trouvée**: `/reservation`

**Preuve**:
- `components/header.tsx` ligne 558: `<Link href="/reservation">`
- `components/header.tsx` ligne 890: `href="/reservation"`
- `app/reservation/page.tsx` existe et contient les expériences de visite

**Mapping CTA**:
```tsx
<TransitionLink 
  href="/reservation"  // ✅ Route réelle détectée
  className="..."
>
  Réservez votre visite  // Libellé à confirmer depuis ASSET
</TransitionLink>
```

**Test de navigation**:
- ✅ Route `/reservation` existe
- ✅ Page contient formulaire de réservation
- ⚠️ Libellé exact du CTA à vérifier dans ASSET

---

## 7. Vérifications A11Y

### Contraste texte sur image
- **État actuel**: Texte blanc sur overlay `from-black/60`
- **Test requis**: Mesurer ratio de contraste AA (4.5:1 minimum)
- **Recommandation**: Ajouter backplate clair semi-opaque (`bg-white/80`) si nécessaire

### Tailles cibles
- **Bouton CTA**: `px-16 py-6` → Hauteur ≈ 44px ✅
- **Links**: À vérifier (doit être ≥ 44px)

### Focus visible
- **État actuel**: Pas de style focus spécifique
- **Recommandation**: Ajouter `focus:ring-2 focus:ring-wine-gold focus:outline-none`

### Ordre de tabulation
- **État actuel**: Non vérifié
- **Recommandation**: Tester navigation clavier complète

### Alt text
- **État actuel**: Textes inventés
- **Recommandation**: Dériver depuis nom fichier ASSET + contexte

---

## 8. Assets manquants ou obsolètes

### Assets manquants référencés dans le code
- ❌ `/Page/La vigne - ok/20230426_214346.jpg` → N'existe pas
- ❌ `/Page/La vigne - ok/Palissage vigne .jpg` → N'existe pas

**Note**: Le fichier `debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg` correspond peut-être à `20230426_214346.jpg` (date EXIF: 2023:04:26 21:43:46).

### Assets obsolètes
- ⚠️ `/photos/image00036.jpeg` → À marquer obsolète si remplacé
- ⚠️ `/photos/image00005.jpeg` → À marquer obsolète si remplacé
- ⚠️ `/photos/image00002.jpeg` → À marquer obsolète si remplacé
- ⚠️ `/PHOTOS-WEB-LASTOURS/VIGNES/IMG_20230809_124834.jpg` → À marquer obsolète si remplacé

### Assets ASSET non utilisés
- ✅ `allee-de-vigne-a-l-aube-cepage-rouge.jpg` → Disponible, non utilisé
- ✅ `allee-de-vigne-grappe-de-raisins-mur-cepage-rouge.jpg` → Disponible, non utilisé
- ✅ `allee-de-vignes-cepage-blanc.jpg` → Disponible, non utilisé
- ✅ `debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg` → Disponible, non utilisé
- ✅ `jardins-a-la-francaise-lever-de-soleil.jpeg` → Disponible, non utilisé
- ✅ `plantier-cepage-braucol-chateau-lastours-gaillac-france.jpeg` → Disponible, non utilisé
- ✅ `travail-dans-la-vigne-palissage.jpg` → Disponible, non utilisé
- ✅ `vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg` → Disponible, non utilisé

---

## 9. Checklist de conformité

### Nommage & SEO
- [ ] ❌ H1 = "Le cycle de la vigne"
- [ ] ❌ Slug = `/le-cycle-de-la-vigne`
- [ ] ❌ Redirection 301 `/la-vigne` → `/le-cycle-de-la-vigne`
- [ ] ❌ Metadata title conforme
- [ ] ❌ Metadata description depuis ASSET

### Contenus
- [ ] ❌ Aucun titre générique injecté
- [ ] ❌ Seuls titres ASSET affichés
- [ ] ❌ Textes uniquement depuis ASSET
- [ ] ❌ Images uniquement depuis ASSET
- [ ] ❌ Ordre sections selon ASSET

### Images plein écran
- [ ] ❌ Next/Image utilisé
- [ ] ❌ Layout fill/object-fit configuré
- [ ] ❌ sizes/srcset configuré
- [ ] ❌ Portrait/paysage géré
- [ ] ❌ Texte lisible avec backplate si nécessaire

### Espacements
- [ ] ❌ Token rythme défini
- [ ] ❌ Marges cohérentes appliquées
- [ ] ❌ Pas de gouffres sur mobile

### CTA
- [ ] ❌ Pointe vers `/reservation` (Visite)
- [ ] ❌ Libellé depuis ASSET
- [ ] ✅ Taille cible ≥ 44px

### Accessibilité
- [ ] ❌ Alt text depuis ASSET
- [ ] ⚠️ Contraste AA vérifié
- [ ] ⚠️ Focus visible
- [ ] ⚠️ Navigation clavier OK

---

## 10. Actions recommandées

### Priorité CRITIQUE
1. ✅ **Créer dossier `/public/ASSET/le-cycle-de-la-vigne`** OU mettre à jour spécifications
2. ✅ **Extraire contenu depuis `La vigne FR.docx`** pour connaître sections réelles
3. ✅ **Renommer route** `/savoir-faire/vigne` → `/le-cycle-de-la-vigne`
4. ✅ **Créer redirection 301** `/la-vigne` → `/le-cycle-de-la-vigne`
5. ✅ **Corriger CTA** pour pointer vers `/reservation`

### Priorité HAUTE
6. ✅ **Remplacer tous les textes inventés** par contenu ASSET
7. ✅ **Remplacer toutes les images hors ASSET** par images ASSET
8. ✅ **Corriger H1 et metadata** selon spécifications
9. ✅ **Implémenter Next/Image** avec fill et sizes

### Priorité MOYENNE
10. ✅ **Implémenter art direction** portrait/paysage
11. ✅ **Créer composants** `<FullBleedImage>` et `<ImageTextBlock>`
12. ✅ **Définir token rythme** et appliquer espacements cohérents
13. ✅ **Ajouter backplate texte** si nécessaire pour contraste

### Priorité BASSE
14. ✅ **Vérifier contraste AA** et corriger si nécessaire
15. ✅ **Ajouter styles focus** pour accessibilité
16. ✅ **Tester navigation clavier** complète

---

## 11. Conclusion

**État global**: ❌ **NON CONFORME**

La page actuelle viole la majorité des spécifications :
- ❌ Titre incorrect ("La Vigne" au lieu de "Le cycle de la vigne")
- ❌ Route incorrecte (`/savoir-faire/vigne` au lieu de `/le-cycle-de-la-vigne`)
- ❌ Tous les textes sont inventés (violation majeure)
- ❌ Plusieurs images hors ASSET utilisées
- ❌ CTA pointe vers mauvais endroit (Chais au lieu de Visite)
- ❌ Pas d'optimisation Next/Image
- ❌ Pas de gestion portrait/paysage
- ❌ Pas de token d'espacement structuré

**Recommandation**: Refonte complète nécessaire selon spécifications.

---

**Fin du rapport**

