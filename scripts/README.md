# 🛠️ Scripts d'Audit et Correction des Images

Ce dossier contient tous les scripts TypeScript pour auditer et corriger les problèmes d'images dans le projet.

## 📋 Scripts Disponibles

### 1. `fix-missing-images.ts` - Script Principal d'Audit

**Usage:**
```bash
# Mode check (audit seulement, génère rapports)
pnpm run audit:images
# ou
tsx scripts/fix-missing-images.ts --check

# Mode write (applique corrections automatiques)
pnpm run fix:images
# ou
tsx scripts/fix-missing-images.ts --write
```

**Fonctionnalités:**
- ✅ Scanne toutes les références d'images dans le code (.tsx, .ts, .css, .json, .md)
- ✅ Détecte les pointeurs Git LFS
- ✅ Résolution fuzzy (Levenshtein distance) pour trouver correspondances
- ✅ Génère rapports CSV et JSON détaillés
- ✅ Applique corrections automatiques avec matching intelligent

**Rapports générés:**
- `reports/image-audit.csv` - Liste complète des références
- `reports/fixed-images.json` - Résumé des corrections
- `reports/lfs-images.json` - Pointeurs LFS détectés

---

### 2. `normalize-and-move-assets.ts` - Normalisation et Déplacement

**Usage:**
```bash
# Simulation (voir ce qui sera fait)
tsx scripts/normalize-and-move-assets.ts

# Application des changements
tsx scripts/normalize-and-move-assets.ts --write
```

**Fonctionnalités:**
- ✅ Normalise les noms de fichiers (kebab-case, sans accents, sans espaces)
- ✅ Catégorise automatiquement les images
- ✅ Déplace tous les assets dans `/public/images/`
- ✅ Génère mapping complet ancien → nouveau chemin

**Catégories créées:**
- `logos/` - Logos du site
- `wines/` - Bouteilles et vins
- `vineyard/` - Vignes et vignoble
- `production/` - Vinification et chai
- `estate/` - Château et bâtiments
- `events/` - Événements et réceptions
- `experiences/` - Œnotourisme et visites
- `team/` - Équipe
- `gastronomy/` - Gastronomie
- `heroes/` - Images hero et headers
- `placeholders/` - Placeholders
- `general/` - Divers

**Rapport généré:**
- `reports/asset-moves-mapping.json`

---

### 3. `update-code-references.ts` - Mise à Jour du Code

**Usage:**
```bash
# Simulation
tsx scripts/update-code-references.ts

# Application des changements
tsx scripts/update-code-references.ts --write
```

**Fonctionnalités:**
- ✅ Utilise le mapping généré par `normalize-and-move-assets.ts`
- ✅ Met à jour automatiquement toutes les références dans le code
- ✅ Supporte TSX, TS, JSX, JS, CSS, SCSS, JSON, MD, MDX
- ✅ Remplacement sécurisé avec regex escaped

**Fichiers traités:**
- Tous les fichiers source (app/, components/, lib/)
- Fichiers de styles (CSS, SCSS)
- Fichiers de contenu (JSON, MD, MDX)

---

### 4. `check-lfs-pointers.ts` - Vérification Git LFS

**Usage:**
```bash
tsx scripts/check-lfs-pointers.ts
```

**Fonctionnalités:**
- ✅ Détecte tous les pointeurs Git LFS dans `/public`
- ✅ Vérifie si Git LFS est installé
- ✅ Vérifie si on peut puller depuis LFS
- ✅ Génère rapport détaillé avec étapes de remediation

**Rapport généré:**
- `reports/lfs-pointers-detailed.json`

**Output:**
- Liste de tous les pointeurs détectés
- Instructions pour résoudre le problème
- Statistiques (total images, vrais fichiers, pointeurs)

---

### 5. `fix-specific-cases.ts` - Cas Critiques

**Usage:**
```bash
# Simulation
tsx scripts/fix-specific-cases.ts

# Application des changements
tsx scripts/fix-specific-cases.ts --write
```

**Fonctionnalités:**
- ✅ Corrige le logo de la navbar
- ✅ Corrige l'image hero de la page d'accueil
- ✅ Supprime les chemins encodés (%2F)
- ✅ Convertit les imports d'images en chaînes

**Cibles:**
- Logo: cherche dans plusieurs emplacements possibles
- Hero: cherche la meilleure image hero disponible
- Imports: supprime les imports statiques d'images

---

### 6. `fix-all-images.sh` - Script Orchestrateur (Bash)

**Usage:**
```bash
# Simulation complète
./scripts/fix-all-images.sh

# Application de toutes les corrections
./scripts/fix-all-images.sh --write
```

**Fonctionnalités:**
- ✅ Exécute tous les scripts dans le bon ordre
- ✅ Vérifications à chaque étape
- ✅ Résumé final avec statistiques
- ✅ Affichage coloré et structuré

**Étapes exécutées:**
1. Vérification Git LFS
2. Audit initial
3. Normalisation et déplacement
4. Mise à jour du code
5. Correction des cas spécifiques
6. Audit final

---

### 7. `show-final-summary.sh` - Résumé Visuel (Bash)

**Usage:**
```bash
./scripts/show-final-summary.sh
```

**Fonctionnalités:**
- ✅ Affiche un résumé visuel complet
- ✅ Statistiques détaillées
- ✅ Structure créée
- ✅ Prochaines étapes
- ✅ Couleurs et formatage

---

## 🚀 Workflow Recommandé

### Première Exécution

```bash
# 1. Vérifier Git LFS
tsx scripts/check-lfs-pointers.ts

# 2. Si LFS nécessaire, puller
git lfs pull --include="public/**"

# 3. Normaliser et déplacer (simulation d'abord)
tsx scripts/normalize-and-move-assets.ts
tsx scripts/normalize-and-move-assets.ts --write

# 4. Mettre à jour le code (simulation d'abord)
tsx scripts/update-code-references.ts
tsx scripts/update-code-references.ts --write

# 5. Corriger cas spécifiques (simulation d'abord)
tsx scripts/fix-specific-cases.ts
tsx scripts/fix-specific-cases.ts --write

# 6. Audit final
pnpm run audit:images

# 7. Afficher résumé
./scripts/show-final-summary.sh
```

### Maintenance Continue

```bash
# Auditer régulièrement
pnpm run audit:images

# Si nouvelles références cassées détectées
pnpm run fix:images
```

---

## 📊 Rapports Générés

Tous les rapports sont générés dans `/reports/`:

| Fichier | Description |
|---------|-------------|
| `image-audit.csv` | Liste complète de toutes les références d'images |
| `fixed-images.json` | Résumé des corrections appliquées |
| `lfs-images.json` | Liste des pointeurs Git LFS |
| `lfs-pointers-detailed.json` | Rapport détaillé Git LFS avec remediation |
| `asset-moves-mapping.json` | Mapping ancien → nouveau chemin |

---

## 🔧 Configuration

### Extensions d'Images Supportées

Défini dans chaque script:
```typescript
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'];
```

### Extensions de Code Source

Défini dans `update-code-references.ts`:
```typescript
const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.json', '.md', '.mdx'];
```

### Dossiers Ignorés

Dans tous les scripts:
```typescript
if (entry.name.startsWith('.') || 
    entry.name === 'node_modules' || 
    entry.name === '.next' ||
    entry.name === 'reports') {
  continue;
}
```

---

## 🐛 Débogage

### Script ne trouve pas les images

**Vérifier:**
```bash
# Lister toutes les images dans public
find public -type f \( -name "*.jpg" -o -name "*.png" \) | head -20
```

### Références non mises à jour

**Vérifier le mapping:**
```bash
cat reports/asset-moves-mapping.json | jq '.' | head -50
```

### Pointeurs LFS non détectés

**Vérifier manuellement:**
```bash
# Un pointeur LFS commence par:
head -5 public/some-image.jpg
# Devrait montrer: version https://git-lfs.github.com/spec
```

---

## 📝 Ajout de Nouvelles Catégories

Pour ajouter une nouvelle catégorie d'images, éditer `normalize-and-move-assets.ts`:

```typescript
function categorizeImage(imagePath: string): string {
  const lower = imagePath.toLowerCase();
  const basename = path.basename(lower);
  
  // Ajouter votre nouvelle catégorie
  if (lower.includes('nouvelle-categorie')) return 'nouvelle-categorie';
  
  // ... reste du code
}
```

---

## 🆘 Support

En cas de problème:

1. Vérifier les logs du script (stdout/stderr)
2. Consulter les rapports dans `/reports/`
3. Lire la documentation:
   - `IMAGES_FIX_GUIDE.md`
   - `CORRECTION_IMAGES_COMPLETE.md`
   - `NEXT_STEPS_CRITICAL.md`

---

## 📚 Documentation Complète

- **Guide d'utilisation:** `/IMAGES_FIX_GUIDE.md`
- **Rapport complet:** `/CORRECTION_IMAGES_COMPLETE.md`
- **Actions critiques:** `/NEXT_STEPS_CRITICAL.md`

---

**Créé par:** AI Senior Next.js Engineer  
**Date:** 12 Novembre 2025  
**Version:** 1.0.0

