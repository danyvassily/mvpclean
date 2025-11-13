# 🎯 Guide de Correction des Images Manquantes

Ce guide explique comment utiliser les scripts d'audit et de correction pour résoudre tous les problèmes d'images en production Vercel.

## 📋 Vue d'ensemble

Les scripts permettent de :
- ✅ Détecter toutes les références d'images cassées
- ✅ Identifier les pointeurs Git LFS
- ✅ Normaliser les noms de fichiers (kebab-case, sans accents, sans espaces)
- ✅ Déplacer les assets dans `/public/images` avec une structure cohérente
- ✅ Mettre à jour automatiquement toutes les références dans le code
- ✅ Corriger les cas critiques (logo navbar, header home)

## 🚀 Installation

Installez la dépendance `tsx` (si ce n'est pas déjà fait) :

```bash
pnpm install
```

## 📝 Scripts disponibles

### 1. Vérification des pointeurs LFS

**But :** Détecter si des fichiers images sont des pointeurs Git LFS au lieu de vrais binaires.

```bash
tsx scripts/check-lfs-pointers.ts
```

**Si des pointeurs LFS sont détectés :**

```bash
# Récupérer les fichiers binaires
git lfs pull --include="public/**"

# Vérifier que c'est OK
tsx scripts/check-lfs-pointers.ts
```

### 2. Normalisation et déplacement des assets

**But :** Normaliser les noms et déplacer tous les assets dans `/public/images/`.

```bash
# Mode simulation (recommandé en premier)
tsx scripts/normalize-and-move-assets.ts

# Mode écriture (applique les changements)
tsx scripts/normalize-and-move-assets.ts --write
```

**Résultat :**
- Crée `/public/images/` avec des sous-dossiers par catégorie
- Génère `reports/asset-moves-mapping.json` avec le mapping ancien → nouveau chemin

### 3. Mise à jour des références dans le code

**But :** Mettre à jour automatiquement toutes les références d'images dans le code source.

```bash
# Mode simulation
tsx scripts/update-code-references.ts

# Mode écriture
tsx scripts/update-code-references.ts --write
```

**Fichiers traités :** `.tsx`, `.ts`, `.jsx`, `.js`, `.css`, `.scss`, `.json`, `.md`, `.mdx`

### 4. Audit complet des images

**But :** Scanner toutes les références d'images et générer un rapport détaillé.

```bash
# Mode lecture seule (génère les rapports)
npm run audit:images

# Ou avec tsx directement
tsx scripts/fix-missing-images.ts --check
```

**Rapports générés :**
- `reports/image-audit.csv` : Liste détaillée de toutes les références
- `reports/fixed-images.json` : Résumé des corrections
- `reports/lfs-images.json` : Liste des pointeurs LFS

### 5. Correction automatique

**But :** Appliquer les corrections automatiquement (utilise le matching fuzzy).

```bash
npm run fix:images

# Ou avec tsx directement
tsx scripts/fix-missing-images.ts --write
```

### 6. Correction des cas critiques

**But :** Corriger spécifiquement le logo navbar et le hero de la page d'accueil.

```bash
# Mode simulation
tsx scripts/fix-specific-cases.ts

# Mode écriture
tsx scripts/fix-specific-cases.ts --write
```

## 🎯 Workflow recommandé

### Étape 1 : Diagnostiquer

```bash
# 1. Vérifier les pointeurs LFS
tsx scripts/check-lfs-pointers.ts

# 2. Auditer les images
npm run audit:images
```

### Étape 2 : Préparer (si des pointeurs LFS existent)

```bash
# Récupérer les binaires depuis LFS
git lfs pull --include="public/**"

# Vérifier
tsx scripts/check-lfs-pointers.ts
```

### Étape 3 : Normaliser et déplacer

```bash
# Simulation d'abord
tsx scripts/normalize-and-move-assets.ts

# Si OK, appliquer
tsx scripts/normalize-and-move-assets.ts --write
```

### Étape 4 : Mettre à jour le code

```bash
# Simulation d'abord
tsx scripts/update-code-references.ts

# Si OK, appliquer
tsx scripts/update-code-references.ts --write
```

### Étape 5 : Corriger les cas spécifiques

```bash
# Simulation d'abord
tsx scripts/fix-specific-cases.ts

# Si OK, appliquer
tsx scripts/fix-specific-cases.ts --write
```

### Étape 6 : Vérification finale

```bash
# Re-auditer pour vérifier qu'il n'y a plus de références cassées
npm run audit:images

# Devrait retourner code 0 (succès)
```

### Étape 7 : Commit

```bash
# Mettre à jour .gitattributes pour retirer LFS des images
# (si vous avez converti les pointeurs en binaires)

git add .
git commit -m "chore(images): normalize assets to /public/images, fix broken refs, remove git-lfs pointers"
git push
```

## 📊 Interpréter les rapports

### reports/image-audit.csv

Format CSV avec les colonnes :
- `whereFound` : Type de référence (code, css, etc.)
- `filePath` : Fichier source contenant la référence
- `line` : Numéro de ligne
- `rawSrc` : Chemin source original
- `resolvedPublicPath` : Chemin résolu
- `exists` : Le fichier existe ?
- `caseMismatch` : Problème de casse ?
- `probableMatch` : Correspondance trouvée par fuzzy matching
- `notes` : Notes additionnelles

### reports/lfs-images.json

Liste des pointeurs LFS détectés avec :
- `filePath` : Chemin du fichier
- `isPointer` : true si c'est un pointeur
- `version` : Version LFS
- `oid` : Hash SHA256
- `size` : Taille réelle du fichier

### reports/fixed-images.json

Résumé des corrections :
- `scanned` : Nombre de références scannées
- `found` : Références valides
- `moved` : Fichiers déplacés
- `renamed` : Fichiers renommés
- `referencesPatched` : Références corrigées
- `lfsPointers` : Pointeurs LFS détectés
- `errors` : Liste des erreurs

## ⚠️ Cas particuliers

### Logo de la navbar

Le script cherche automatiquement le meilleur logo dans :
1. `/public/images/logos/logo.svg`
2. `/public/images/logos/logo.png`
3. `/public/images/logos/logo.png`
4. `/public/images/logos/logo-chateau-lastours.png`

Si aucun n'est trouvé, placez votre logo dans `/public/images/logos/logo.svg` ou `.png`.

### Image hero de la page d'accueil

Le script cherche automatiquement la meilleure image dans :
1. `/public/images/heroes/images/heroes/chateau-lastours-hero.jpg`
2. `/public/images/heroes/chateau-lastours-hero.jpg`
3. `/public/images/heroes/hero.jpg`

Si aucune n'est trouvée, placez votre image hero dans `/public/images/heroes/images/heroes/chateau-lastours-hero.jpg`.

### Chemins avec %2F (encodés)

Les chemins comme `image%2Fphoto.jpg` sont automatiquement détectés et corrigés en `image/photo.jpg`.

### Imports d'images TypeScript

Les imports comme :
```typescript
import logo from './logo.png';
```

Sont convertis en chaînes pour éviter les problèmes avec Next.js Image Optimization :
```typescript
const logo = "/images/logos/logo.png";
```

## 🔧 Résolution de problèmes

### "Pointeurs LFS détectés"

**Problème :** Les fichiers images sont des pointeurs Git LFS, pas des vrais binaires.

**Solution :**
```bash
git lfs pull --include="public/**"
```

### "Aucun mapping trouvé"

**Problème :** Le fichier `reports/asset-moves-mapping.json` n'existe pas.

**Solution :**
```bash
tsx scripts/normalize-and-move-assets.ts --write
```

### "Références cassées après correction"

**Problème :** Certaines références sont encore cassées après avoir exécuté les scripts.

**Solution :**
1. Vérifiez `reports/image-audit.csv` pour voir les références problématiques
2. Corrigez manuellement les cas particuliers
3. Re-exécutez `npm run audit:images` pour vérifier

### "Fichier non trouvé"

**Problème :** Un fichier est référencé mais n'existe pas.

**Solutions possibles :**
1. Le fichier est un pointeur LFS → exécutez `git lfs pull`
2. Le fichier n'existe vraiment pas → remplacez-le par un placeholder ou ajoutez le bon fichier
3. Le nom a changé → le fuzzy matching devrait le trouver

## 📚 Structure recommandée pour /public/images

```
/public/
  /images/
    /logos/          # Logos du site
    /wines/          # Bouteilles et gammes de vins
    /vineyard/       # Vignes et vignoble
    /estate/         # Château et bâtiments
    /events/         # Événements
    /team/           # Équipe
    /experiences/    # Œnotourisme et visites
    /production/     # Vinification et production
    /gastronomy/     # Gastronomie et accords
    /heroes/         # Images hero et headers
    /placeholders/   # Images de placeholder
    /general/        # Autres images
```

## ✅ Critères de succès

✅ `npm run audit:images` retourne code 0  
✅ Aucune requête `/_next/image?...` en 400/404 dans la console Vercel  
✅ Logo navbar s'affiche correctement  
✅ Image header home s'affiche correctement  
✅ `reports/image-audit.csv` liste 0 références manquantes  
✅ Aucun pointeur LFS dans `reports/lfs-images.json`  

## 🎉 Après correction

Une fois toutes les corrections appliquées :

1. **Testez en local :**
   ```bash
   pnpm dev
   ```
   Visitez les pages principales et vérifiez que toutes les images s'affichent.

2. **Testez en preview Vercel :**
   ```bash
   git push
   ```
   Vérifiez le preview Vercel.

3. **Déployez en production :**
   Mergez votre PR vers `main`.

## 📞 Support

En cas de problème, vérifiez :
- Les rapports dans `/reports/`
- Les logs de console des scripts
- La console réseau du navigateur pour les requêtes d'images

Pour les cas complexes, exécutez chaque script en mode simulation (`--check` ou sans `--write`) pour voir ce qui serait changé avant de l'appliquer.

