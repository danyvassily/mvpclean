# 📋 RAPPORT D'ANALYSE ET CORRECTIONS DES ASSETS

**Date :** $(date)  
**Projet :** Château Lastours  
**Total d'assets analysés :** 620  
**Références trouvées :** 234  

---

## 📊 RÉSUMÉ EXÉCUTIF

### État actuel
- ✅ **Assets présents dans `/public` :** 620 fichiers
- ✅ **Références correctes :** 94
- ⚠️ **Références nécessitant correction :** 140
- 📦 **Assets non utilisés :** 0 (tous les assets semblent être référencés ou réservés)

### Types de problèmes identifiés
1. **Chemins incorrects** : Références qui ne correspondent pas aux chemins réels des fichiers
2. **Fichiers renommés** : Assets qui ont été renommés mais références non mises à jour
3. **Fichiers déplacés** : Assets qui ont été déplacés dans d'autres dossiers
4. **Fichiers manquants** : Références vers des fichiers qui n'existent plus

---

## 🔧 CORRECTIONS PROPOSÉES

### 1. Page "La vigne" - Assets manquants/renommés

#### ❌ Référence incorrecte :
```
/Page/La vigne - ok/la véraison .jpg
```

#### ✅ Correction proposée :
```
/Page/La vigne - ok/grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg
```

**Fichiers à modifier :**
- `app/actualites/page.tsx` (lignes 17, 44)
- `app/domaine/terroir/page.tsx` (ligne 114)
- `app/savoir-faire/vigne/page.tsx` (ligne 56)
- `components/header.tsx` (ligne 731)

---

#### ❌ Référence incorrecte :
```
/Page/La vigne - ok/image00002.jpeg
```

#### ✅ Correction proposée :
Chercher dans `photos/image00002.jpeg` ou `PHOTOS-WEB-LASTOURS/VIGNES/image00002.jpeg`

**Fichiers à modifier :**
- `app/actualites/page.tsx` (ligne 169)
- `app/domaine/terroir/page.tsx` (ligne 53)
- `app/savoir-faire/vigne/page.tsx` (ligne 98)
- `lib/news-data.ts` (ligne 19)

---

#### ❌ Référence incorrecte :
```
/Page/La vigne - ok/image00005.jpeg
/Page/La vigne - ok/image00036.jpeg
```

#### ✅ Correction proposée :
Chercher dans `photos/image00005.jpeg` et `photos/image00036.jpeg`

**Fichiers à modifier :**
- `app/domaine/terroir/page.tsx` (lignes 76, 85)
- `app/savoir-faire/vigne/page.tsx` (lignes 70, 84)
- `lib/news-data.ts` (lignes 52, 69)

---

#### ❌ Référence incorrecte :
```
/Page/La vigne - ok/IMG_20230809_124834.jpg
```

#### ✅ Correction proposée :
```
/PHOTOS-WEB-LASTOURS/VIGNES/IMG_20230809_124834.jpg
```

**Fichiers à modifier :**
- `app/domaine/terroir/page.tsx` (ligne 60)
- `app/savoir-faire/vigne/page.tsx` (ligne 138)

---

### 2. Page "Club" - Asset manquant

#### ❌ Référence incorrecte :
```
/Page/Club - ok/Club Chateau Lastours.jpg
```

#### ✅ Correction proposée :
**Fichier non trouvé.** Options :
1. Utiliser une image existante du dossier Club :
   - `/Page/Club - ok/arche-briques-rouges-pigeonnier-patrimoine-chateau-lastours-gaillac.jpg`
   - `/Page/Club - ok/vintotheque-anciennes-cuvees-prestiges-chateau-lastours-gaillac-france.jpg`
   - `/Page/Club - ok/voiture-de-collection-club-chateau-lastours-gaillac-sud-ouest-france.jpg`

2. Ou créer/utiliser un placeholder

**Fichiers à modifier :**
- `app/club/page.tsx` (ligne 22)

---

### 3. Page "Nos Engagements" - Chemins incorrects

#### ❌ Référence incorrecte :
```
/Page/Nos Engagement - ok/1682596442650.jpg
```

#### ✅ Correction proposée :
```
/PHOTOS-WEB-LASTOURS/VIGNES/1682596442650.jpg
```

**Fichiers à modifier :**
- `app/domaine/engagement/page.tsx` (ligne 91)
- `lib/asset-mapping.ts` (ligne 60)

---

#### ❌ Référence incorrecte :
```
/Page/Nos Engagement - ok/bulle-de-jazz-2021-chazo-127.jpg
```

#### ✅ Correction proposée :
Le fichier exact n'existe pas, mais des variantes sont disponibles :
- `/photos/bulle-de-jazz-2021-chazo-087.jpg`
- `/photos/bulle-de-jazz-2021-chazo-093.jpg`
- `/Page/Organiser notre évenement - ok/bulle-de-jazz-2021-chazo-066.jpg`

**Action recommandée :** Vérifier quel fichier correspond exactement à l'image souhaitée ou utiliser une variante.

**Fichiers à modifier :**
- `app/domaine/engagement/page.tsx` (ligne 11)
- `lib/asset-mapping.ts` (ligne 59)

---

#### ❌ Référence incorrecte :
```
/Page/Nos Engagement - ok/IMG_20230808_201123 - pas bonne taille.jpg
```

#### ✅ Correction proposée :
**Fichier non trouvé.** Vérifier si ce fichier existe sous un autre nom ou s'il doit être remplacé.

**Fichiers à modifier :**
- `app/domaine/engagement/page.tsx` (ligne 101)
- `lib/asset-mapping.ts` (ligne 61)

---

### 4. Page "Notre Vignoble" - Chemins incorrects

#### ❌ Référence incorrecte :
```
/Page/Notre vignoble - manque 1 photo/vignes.jpg
```

#### ✅ Correction proposée :
```
/PHOTOS-WEB-LASTOURS/VIGNES/vignes.jpg
```

**Fichiers à modifier :**
- `app/domaine/engagement/page.tsx` (ligne 136)
- `app/domaine/terroir/page.tsx` (ligne 15)
- `app/gastronomie/page.tsx` (ligne 427)

---

#### ❌ Référence incorrecte :
```
/Page/Notre vignoble - manque 1 photo/vieille vigne.jpg
```

#### ✅ Correction proposée :
```
/PHOTOS-WEB-LASTOURS/VIGNES/vieille vigne.jpg
```

**Fichiers à modifier :**
- `app/domaine/terroir/page.tsx` (ligne 67)

---

### 5. Page "Notre Histoire" - Chemin incorrect

#### ❌ Référence incorrecte :
```
/Page/Notre histoire - ok/007.jpg
```

#### ✅ Correction proposée :
```
/photos/007.jpg
```

**Fichiers à modifier :**
- `app/domaine/histoire/page.tsx` (ligne 18)
- `components/header.tsx` (ligne 575)

---

### 6. Page "Organiser votre événement" - Chemins avec accents

#### ❌ Référence incorrecte :
```
/Page/Page organiser votre événement/chateau-lastours-panoramic-view.jpg
/Page/Page organiser votre événement/accompagnement-personnalise.jpg
/Page/Page organiser votre événement/apero-concerts-ete.jpg
/Page/Page organiser votre événement/chateau-lastours-contact-background.jpg
```

#### ✅ Correction proposée :
```
/Page/Page organiser votre événement/chateau-lastours-panoramic-view.jpg
/Page/Page organiser votre événement/accompagnement-personnalise.jpg
/Page/Page organiser votre événement/apero-concerts-ete.jpg
/Page/Page organiser votre événement/chateau-lastours-contact-background.jpg
```

**Note :** Ces chemins semblent corrects mais peuvent avoir des problèmes d'encodage avec les accents. Vérifier que les accents dans le code correspondent exactement aux noms de dossiers.

**Fichiers à modifier :**
- `app/evenements/organiser/page.tsx` (lignes 28, 176, 299, 319)

---

### 7. Assets manquants - Images PNG de placeholder

#### ❌ Références incorrectes :
```
/wine-events-celebration-vineyard-gathering.png
/faq-help-support-wine-estate.png
/mecenat-partnership-wine-estate.png
/winemaking-team-portrait-in-vineyard.png
```

#### ✅ Correction proposée :
Ces fichiers semblent être des placeholders générés. Options :
1. Utiliser des images existantes similaires
2. Créer ces placeholders si nécessaire
3. Utiliser des images existantes du domaine

**Fichiers à modifier :**
- `app/evenements/page.tsx` (ligne 39)
- `app/faq/page.tsx` (ligne 148)
- `app/mecenat/page.tsx` (ligne 40)
- `app/domaine/team/page.tsx` (ligne 14)

---

### 8. Fichiers de données - Chemins PDF

#### ⚠️ Vérifications nécessaires pour les fichiers PDF :

**Fiches techniques référencées :**
- `/Fiche technique/FT_blanc_Domeni 2024.pdf` → Vérifier : `/Fiche technique/FT_blanc_Domeni 2024.pdf` ou `/fiche-technique/FT_blanc_Domeni 2024.pdf`
- `/Fiche technique/FT_rosé_Domeni_2024.pdf` → Vérifier : `/Fiche technique/FT_rosé_Domeni_2024.pdf` ou `/fiche-technique/FT_rosé_Domeni_2024.pdf`
- `/Fiche technique/FT_rouge_Domeni_2022.pdf` → Vérifier : `/Fiche technique/FT_rouge_Domeni_2022.pdf` ou `/fiche-technique/FT_rouge_Domeni_2022.pdf`

**Fichiers à vérifier :**
- `lib/wines-data.ts` (toutes les références `techSheetPdf`)

---

## 📝 ACTIONS RECOMMANDÉES

### Phase 1 : Corrections critiques (à faire immédiatement)
1. ✅ Corriger les chemins des images de la vigne
2. ✅ Corriger les chemins des images des engagements
3. ✅ Corriger les chemins des images du vignoble
4. ✅ Corriger les chemins avec accents pour "organiser votre événement"

### Phase 2 : Vérifications nécessaires
1. 🔍 Vérifier l'existence du fichier "Club Chateau Lastours.jpg" ou le remplacer
2. 🔍 Vérifier l'existence de "bulle-de-jazz-2021-chazo-127.jpg" ou utiliser une variante
3. 🔍 Vérifier l'existence de "IMG_20230808_201123 - pas bonne taille.jpg"
4. 🔍 Vérifier tous les chemins PDF dans `lib/wines-data.ts`

### Phase 3 : Assets manquants
1. 📦 Créer ou trouver les placeholders PNG manquants :
   - `wine-events-celebration-vineyard-gathering.png`
   - `faq-help-support-wine-estate.png`
   - `mecenat-partnership-wine-estate.png`
   - `winemaking-team-portrait-in-vineyard.png`

---

## 🔄 FICHIERS À MODIFIER (Résumé)

### Fichiers avec corrections multiples :
- `app/domaine/terroir/page.tsx` (7 corrections)
- `app/domaine/engagement/page.tsx` (4 corrections)
- `app/actualites/page.tsx` (3 corrections)
- `app/savoir-faire/vigne/page.tsx` (4 corrections)
- `app/evenements/organiser/page.tsx` (4 corrections)
- `components/header.tsx` (3 corrections)
- `lib/asset-mapping.ts` (3 corrections)
- `lib/news-data.ts` (3 corrections)
- `lib/wines-data.ts` (vérification de tous les chemins PDF)

---

## 📋 CHECKLIST DE VALIDATION

- [ ] Tous les chemins de la vigne corrigés
- [ ] Tous les chemins des engagements corrigés
- [ ] Tous les chemins du vignoble corrigés
- [ ] Chemins avec accents vérifiés
- [ ] Fichiers manquants identifiés et remplacés
- [ ] Placeholders PNG créés ou remplacés
- [ ] Chemins PDF vérifiés
- [ ] Tests de compilation réussis
- [ ] Vérification visuelle des pages concernées

---

## 📞 NOTES IMPORTANTES

1. **Ne pas supprimer automatiquement** : Tous les assets présents dans `/public` semblent être utilisés ou réservés pour usage futur.

2. **Encodage des accents** : Vérifier que les accents dans le code correspondent exactement aux noms de fichiers/dossiers.

3. **Casse des fichiers** : Certains systèmes de fichiers sont sensibles à la casse. Vérifier que les noms de fichiers correspondent exactement.

4. **Espaces dans les noms** : Certains fichiers ont des espaces en fin de nom (ex: "la véraison .jpg"). Vérifier et normaliser.

---

**Rapport généré automatiquement par le script `scripts/analyze-assets.js`**

