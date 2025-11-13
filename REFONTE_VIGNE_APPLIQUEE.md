# REFONTE_VIGNE_APPLIQUEE.md

## Résumé des modifications appliquées

Date: $(date)

---

## ✅ Modifications complétées

### 1. Structure et Assets

- ✅ **Créé dossier ASSET**: `/public/ASSET/le-cycle-de-la-vigne/`
- ✅ **Copié tous les assets** depuis `/public/Page/La vigne - ok/` vers le nouveau dossier
- ✅ **12 fichiers copiés** (3 documents Word + 9 images)

### 2. Nouvelle Route

- ✅ **Créé route**: `/app/le-cycle-de-la-vigne/page.tsx`
- ✅ **H1 correct**: "Le cycle de la vigne"
- ✅ **Metadata conforme**: Title et description générés depuis H1 + contenu
- ✅ **Slug conforme**: `/le-cycle-de-la-vigne`

### 3. Redirections 301

- ✅ **Redirection Netlify**: `/la-vigne` → `/le-cycle-de-la-vigne/` (netlify.toml)
- ✅ **Redirection Netlify**: `/savoir-faire/vigne` → `/le-cycle-de-la-vigne/` (netlify.toml)
- ✅ **Page redirect**: `/app/la-vigne/page.tsx` avec redirect Next.js
- ✅ **Page redirect**: `/app/savoir-faire/vigne/page.tsx` avec redirect Next.js

### 4. Composants créés

- ✅ **FullBleedImage**: Composant image plein écran avec Next/Image, fill, sizes, et gestion portrait/paysage
- ✅ **ImageTextBlock**: Composant bloc image+texte avec backplate clair, alignement configurable

### 5. Images et Contenu

- ✅ **Uniquement images ASSET**: Toutes les images utilisées proviennent de `/ASSET/le-cycle-de-la-vigne/`
- ✅ **Alt text dérivé**: Noms de fichiers utilisés pour générer les alt text descriptifs
- ✅ **Gestion portrait/paysage**: Composants prêts pour art direction
- ✅ **Next/Image utilisé**: Remplacé tous les `<img>` par `<Image>` avec fill et sizes

### 6. CTA

- ✅ **Route correcte**: CTA pointe vers `/reservation` (route Visite détectée)
- ✅ **Taille cible**: Bouton ≥ 44px (conforme accessibilité)
- ✅ **Focus visible**: Ajouté `focus:ring-2 focus:ring-wine-gold`

### 7. Espacements

- ✅ **Token rythme ajouté**: Dans `tailwind.config.mjs` (rhythm, rhythm-0.5, rhythm-1, rhythm-2, rhythm-3)
- ✅ **Espacements structurés**: Utilisation de valeurs cohérentes (h-12, h-16, h-20, mb-12, mb-16, mb-20)
- ✅ **Pas de gouffres**: Espacements réduits sur mobile

### 8. Navigation

- ✅ **Header mis à jour**: Menu mobile et desktop pointent vers `/le-cycle-de-la-vigne`
- ✅ **Sitemap mis à jour**: Route `/le-cycle-de-la-vigne` ajoutée

---

## ⚠️ Notes importantes

### Contenu texte

**IMPORTANT**: Les textes actuels dans `cycleSections` sont des placeholders basés sur les noms d'images. 

**Action requise**: 
- Extraire le contenu réel depuis `/public/ASSET/le-cycle-de-la-vigne/La vigne FR.docx`
- Remplacer les textes dans `cycleSections` par le contenu réel
- Respecter l'ordre des sections défini dans le document Word

### Images utilisées

**Images ASSET utilisées dans la page**:
1. ✅ `jardins-a-la-francaise-lever-de-soleil.jpeg` (Hero)
2. ✅ `vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg` (Hiver)
3. ✅ `debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg` (Débourrement)
4. ✅ `travail-dans-la-vigne-palissage.jpg` (Palissage)
5. ✅ `grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg` (Véraison)
6. ✅ `allee-de-vignes-cepage-blanc.jpg` (Cépages)

**Images ASSET disponibles non encore utilisées**:
- `allee-de-vigne-a-l-aube-cepage-rouge.jpg` (1600x1066, portrait)
- `allee-de-vigne-grappe-de-raisins-mur-cepage-rouge.jpg` (3000x4000, portrait)
- `plantier-cepage-braucol-chateau-lastours-gaillac-france.jpeg` (3024x4032, portrait)

### Art direction

Les composants `FullBleedImage` et `ImageTextBlock` sont prêts pour l'art direction portrait/paysage, mais aucune source alternative n'est encore configurée. Si le document Word fournit des indications sur des versions portrait/paysage, ajouter les props `portraitSrc` et `landscapeSrc`.

---

## 📋 Checklist de conformité

### Nommage & SEO
- [x] ✅ H1 = "Le cycle de la vigne"
- [x] ✅ Slug = `/le-cycle-de-la-vigne`
- [x] ✅ Redirection 301 `/la-vigne` → `/le-cycle-de-la-vigne`
- [x] ✅ Redirection 301 `/savoir-faire/vigne` → `/le-cycle-de-la-vigne`
- [x] ✅ Metadata title conforme
- [x] ✅ Metadata description depuis H1 + contenu

### Contenus
- [ ] ⚠️ Textes à remplacer par contenu ASSET (placeholders actuels)
- [x] ✅ Images uniquement depuis ASSET
- [x] ✅ Alt text dérivé des noms fichiers ASSET
- [ ] ⚠️ Ordre sections à vérifier avec document Word

### Images plein écran
- [x] ✅ Next/Image utilisé
- [x] ✅ Layout fill/object-fit configuré
- [x] ✅ sizes configuré
- [x] ✅ Composants prêts pour portrait/paysage
- [x] ✅ Texte lisible avec backplate clair

### Espacements
- [x] ✅ Token rythme défini
- [x] ✅ Marges cohérentes appliquées
- [x] ✅ Pas de gouffres sur mobile

### CTA
- [x] ✅ Pointe vers `/reservation` (Visite)
- [x] ✅ Taille cible ≥ 44px
- [x] ✅ Focus visible

### Accessibilité
- [x] ✅ Alt text depuis ASSET
- [ ] ⚠️ Contraste AA à vérifier (backplate clair ajouté)
- [x] ✅ Focus visible
- [ ] ⚠️ Navigation clavier à tester

---

## 🔧 Actions restantes

1. **Extraction contenu Word**: Ouvrir `La vigne FR.docx` et extraire les sections réelles
2. **Mise à jour cycleSections**: Remplacer les placeholders par le contenu réel
3. **Vérification ordre**: S'assurer que l'ordre des sections correspond au document
4. **Test visuel**: Vérifier l'affichage sur différents devices et orientations
5. **Test accessibilité**: Vérifier contraste AA et navigation clavier

---

## 📁 Fichiers modifiés/créés

### Nouveaux fichiers
- `/app/le-cycle-de-la-vigne/page.tsx`
- `/app/la-vigne/page.tsx` (redirect)
- `/components/common/FullBleedImage.tsx`
- `/components/common/ImageTextBlock.tsx`

### Fichiers modifiés
- `/app/savoir-faire/vigne/page.tsx` (remplacé par redirect)
- `/components/header.tsx` (routes mises à jour)
- `/app/sitemap/page.tsx` (route mise à jour)
- `/netlify.toml` (redirections ajoutées)
- `/tailwind.config.mjs` (token rythme ajouté)

### Assets
- `/public/ASSET/le-cycle-de-la-vigne/` (dossier créé avec tous les assets)

---

**Fin du résumé**

