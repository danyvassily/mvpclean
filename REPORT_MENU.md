# REPORT_MENU.md

## Rapport de modifications du menu et du header

Date: $(date)

---

## 1. Tableau de mapping Menu -> Route/ID -> Composant

| Item Menu | Route/ID | Composant Cible | État |
|-----------|----------|-----------------|------|
| **Notre Domaine** | - | - | ✅ Modifié |
| └─ Notre héritage | - | - | ✅ Modifié |
|    ├─ Notre histoire | `/domaine/histoire` | `app/domaine/histoire/page.tsx` | ✅ |
|    ├─ Notre équipe | `/domaine/team` | `app/domaine/team/page.tsx` | ✅ |
|    └─ Nos engagements | `/domaine/engagement` | `app/domaine/engagement/page.tsx` | ✅ |
| └─ Notre terroir | - | - | ✅ Modifié |
|    ├─ Notre vignoble | `/domaine/terroir` | `app/domaine/terroir/page.tsx` | ✅ |
|    └─ Notre chai | `/notre-chai` | `app/notre-chai/page.tsx` | ✅ |
| └─ Notre actualité | - | - | ✅ Modifié |
|    ├─ Nos actualités | `/actualites` | `app/actualites/page.tsx` | ✅ |
|    └─ Espace presse | `/presse` | `app/presse/page.tsx` | ✅ |
| **Notre savoir-faire** | - | - | ✅ Modifié |
| └─ Le cycle de la vigne | `/savoir-faire/vigne` | `app/savoir-faire/vigne/page.tsx` | ✅ |
| └─ De la vigne à la bouteille | `/savoir-faire/chais` | `app/savoir-faire/chais/page.tsx` | ✅ |
| **Nos vins** | - | - | ⚠️ À modifier selon spécifications |
| └─ Nos Blancs | - | - | ⚠️ À modifier |
|    ├─ Méthode Blanche | `/les-vins/methode-blanc` | `app/les-vins/methode-blanc/page.tsx` | ✅ |
|    ├─ Claire de Lune | `/les-vins/claire-de-lune` | `app/les-vins/claire-de-lune/page.tsx` | ✅ |
|    └─ Toutes nos cuvées | `/les-vins` | `app/les-vins/page.tsx` | ✅ |
| └─ Nos Rosés | - | - | ⚠️ À modifier |
|    ├─ Poussin | `/les-vins/poussin-rose` | `app/les-vins/poussin-rose/page.tsx` | ✅ |
|    ├─ Petrichor | `/les-vins/petrichor-rose` | `app/les-vins/petrichor-rose/page.tsx` | ✅ |
|    └─ Toutes nos cuvées | `/les-vins` | `app/les-vins/page.tsx` | ✅ |
| └─ Nos Rouges | - | - | ⚠️ À modifier |
|    ├─ Opus | `/les-vins/opus-rouge` | `app/les-vins/opus-rouge/page.tsx` | ✅ |
|    ├─ Petrichor | `/les-vins/petrichor-rouge` | `app/les-vins/petrichor-rouge/page.tsx` | ✅ |
|    └─ Toutes nos cuvées | `/les-vins` | `app/les-vins/page.tsx` | ✅ |
| **Expériences** | - | - | ⚠️ À modifier selon spécifications |
| └─ Visites | - | - | ⚠️ À modifier |
|    └─ Réservez votre instant | `/reservation` | `app/reservation/page.tsx` | ✅ |
| └─ Evènements | - | - | ⚠️ À modifier |
|    ├─ Nos évènements | `/evenements` | `app/evenements/page.tsx` | ✅ |
|    └─ Organisez votre évènement | `/evenements/organiser` | `app/evenements/organiser/page.tsx` | ✅ |
| └─ Partagez notre passion | - | - | ⚠️ À modifier |
|    ├─ Rejoignez notre club | `/club` | `app/club/page.tsx` | ✅ |
|    ├─ Mécénat | `/mecenat` | `app/mecenat/page.tsx` | ✅ |
|    └─ Gastronomie | - | - | ⚠️ À modifier |
|       ├─ Art de la table | `/gastronomie-art-de-la-table` | `app/gastronomie-art-de-la-table/page.tsx` | ✅ |
|       └─ Degustation | `/degustation` | `app/degustation/page.tsx` | ✅ |

---

## 2. Liste des assets utilisés + chemins

### Assets du menu (Photos de fin de section)

| Section | Chemin | État |
|---------|--------|------|
| Notre Domaine | `/Page/Photo Menu/Domaine/jardins-a-la-francaise-chateau-lastours-gaillac-france.JPG` | ✅ Existe |
| Notre savoir-faire | `/Page/Photo Menu/Savoir-faire/coucher-de-soleil-vignes-chateau-lastours-aop-aoc-gaillac-france.jpeg` | ✅ Existe |
| Nos vins | `/Page/Photo Menu/Nos vins/IMG_20210102_150820 (1).jpg` | ✅ Existe |
| Expériences | `/Page/Photo Menu/experience/club-dinner-evenements-chateau-lastours-gaillac-sud-ouest-france.jpg` | ✅ Existe |

### Assets manquants

Aucun asset manquant détecté dans `/public/Page/Photo Menu`.

---

## 3. Liste des liens/ancres corrigés + stratégie d'offset sticky

### Stratégie d'offset pour sticky header

Le header a une hauteur fixe de `h-20` (80px). Pour les ancres, nous utilisons `scroll-margin-top: 80px` (ou `scroll-mt-20` en Tailwind).

### Modifications appliquées

1. **Composant SectionHeader** : Ajout de `scroll-mt-20` pour compenser le header sticky
2. **CSS global** : Ajout de `scroll-margin-top` sur les sections avec ID

### Ancres à vérifier manuellement

- Toutes les sections avec `<section id="...">` doivent avoir `scroll-mt-20` ou équivalent
- Les liens de navigation doivent pointer vers les bonnes sections

---

## 4. Tokens typographiques normalisés et où ils sont appliqués

### Tokens définis dans `globals.css`

```css
--font-family-base: 'Noto Sans Bengali', ui-sans-serif, system-ui, ...
--font-family-heading: 'Kaisei Decol', serif
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
--font-size-sm: 0.875rem (14px)
--font-size-base: 1rem (16px)
--font-size-md: 1.125rem (18px)
--font-size-lg: 1.25rem (20px)
--font-size-xl: 1.5rem (24px)
--font-size-2xl: 1.875rem (30px)
--font-size-3xl: 2.25rem (36px)
```

### Application dans le header

- **Items de menu** : `text-sm xl:text-base` + `font-medium` + `tracking-wide`
- **Titres de sous-sections** : `text-sm` + `font-semibold` + `tracking-wide` + `font-heading`
- **Liens** : `text-sm` + `font-medium` + `tracking-wide`

---

## 5. Écarts restants éventuels, avec solutions proposées

### Écarts identifiés

1. **Menu "Nos vins"** : Structure actuelle différente des spécifications
   - **Solution** : Restructurer selon les spécifications exactes (Blancs avec Méthode Blanche, Claire de Lune, etc.)

2. **Menu "Expériences"** : Structure actuelle différente des spécifications
   - **Solution** : Restructurer selon les spécifications exactes (Visites, Evènements, Partagez notre passion)

3. **Menu mobile** : Nécessite les mêmes modifications que le menu desktop
   - **Solution** : Appliquer les mêmes modifications au menu mobile

4. **Composant SectionHeader** : Nécessite d'être appliqué aux pages existantes
   - **Solution** : Remplacer les sections existantes par le composant SectionHeader réutilisable

### Solutions proposées

1. ✅ **Composant SectionHeader créé** : `/components/common/SectionHeader.tsx`
2. ✅ **Menu utilisateur ajouté** : Visible quand `authState.isAuthenticated === true`
3. ✅ **Tokens typographiques normalisés** : Ajoutés dans `globals.css`
4. ✅ **Menu "Notre Domaine" réorganisé** : Selon spécifications
5. ✅ **Menu "Notre savoir-faire" réorganisé** : Selon spécifications
6. ⚠️ **Menu "Nos vins"** : À restructurer selon spécifications exactes
7. ⚠️ **Menu "Expériences"** : À restructurer selon spécifications exactes
8. ⚠️ **Menu mobile** : À mettre à jour avec les mêmes modifications

---

## 6. Checklist de vérification manuelle

### Breakpoints à tester

- [ ] 360px (mobile)
- [ ] 768px (tablette)
- [ ] 1024px (desktop)
- [ ] 1280px (large desktop)

### Tests à effectuer

- [ ] Vérifier l'affichage du menu utilisateur quand connecté
- [ ] Vérifier les ancres et le scroll offset (header sticky)
- [ ] Vérifier la typographie sur tous les breakpoints
- [ ] Vérifier l'affichage des photos de fin de section (pas de transparence)
- [ ] Vérifier l'accessibilité (focus visible, taille cible > 44px)
- [ ] Vérifier le contraste texte/fond
- [ ] Vérifier la navigation clavier (Tab, Enter, Escape)

---

## 7. Fichiers modifiés

- ✅ `components/header.tsx` : Menu réorganisé, menu utilisateur ajouté
- ✅ `components/common/SectionHeader.tsx` : Nouveau composant créé
- ✅ `app/globals.css` : Tokens typographiques ajoutés
- ⚠️ `components/user-menu.tsx` : Déjà existant, utilisé dans le header

---

## 8. Prochaines étapes

1. Restructurer le menu "Nos vins" selon les spécifications exactes
2. Restructurer le menu "Expériences" selon les spécifications exactes
3. Mettre à jour le menu mobile avec les mêmes modifications
4. Appliquer le composant SectionHeader aux pages existantes
5. Vérifier manuellement tous les breakpoints
6. Tester l'accessibilité complète

