# 🚨 Contraintes Vercel & GitHub - Guide de Référence

> **Objectif**: Ce document liste TOUTES les contraintes techniques à respecter lors de la création de prompts pour éviter les erreurs avec Vercel et GitHub.

---

## 📋 Table des Matières

1. [Problèmes Git & Git LFS](#problèmes-git--git-lfs)
2. [Erreurs 400 sur les Images](#erreurs-400-sur-les-images)
3. [Règles de Nommage des Fichiers](#règles-de-nommage-des-fichiers)
4. [Structure des Dossiers](#structure-des-dossiers)
5. [Checklist de Validation](#checklist-de-validation)
6. [Commandes Recommandées](#commandes-recommandées)

---

## 🔴 1. Problèmes Git & Git LFS

### Problème Rencontré
- **102 objets Git LFS manquants** sur le serveur GitHub
- Push bloqué par des fichiers trackés avec LFS dont les objets n'existent pas
- Historique Git corrompu à cause de fichiers LFS mal gérés

### ✅ Solutions Appliquées
- **Désactivation complète de Git LFS**
- Suppression du fichier `.gitattributes`
- Migration vers un stockage standard Git (fichiers réels, pas de pointeurs)
- Normalisation de 440 assets

### 🎯 Contraintes pour les Prompts

```markdown
TOUJOURS inclure dans les prompts:

1. ❌ NE JAMAIS utiliser Git LFS
   - Pas de `git lfs install`
   - Pas de fichier `.gitattributes` avec LFS
   - Tous les assets doivent être commitées comme fichiers normaux

2. ✅ Utiliser des fichiers standards Git
   - Images directement dans le repo (< 5MB par fichier)
   - Compression optimisée AVANT commit
   - Utiliser des formats modernes (WebP, AVIF) pour réduire la taille

3. 🔄 En cas de problème de push:
   - Créer une nouvelle branche: git checkout -b feat/nom-feature
   - Pusher sur la nouvelle branche: git push -u origin feat/nom-feature
   - NE JAMAIS forcer sur main sans confirmation
```

### Workflow Git Recommandé

```bash
# TOUJOURS utiliser ce workflow:
git checkout -b feat/nouvelle-fonctionnalite
git add .
git commit -m "feat: description claire"
git push -u origin feat/nouvelle-fonctionnalite

# Puis créer une PR sur GitHub
```

---

## 🖼️ 2. Erreurs 400 sur les Images

### Problèmes Identifiés

#### A. Chemins d'Accès Incorrects
```jsx
// ❌ FAUX - Chemins relatifs qui cassent sur Vercel
<img src="../images/photo.jpg" />
<img src="../../assets/logo.png" />

// ✅ CORRECT - Chemins depuis /public
<img src="/images/photo.jpg" />
<img src="/assets/logo.png" />
```

#### B. Noms de Fichiers Problématiques
```
❌ FAUX:
- chateau-é-été.jpg (accents)
- logo, avec virgule.png (virgules)
- photo du château.jpg (espaces)
- Image(1).png (parenthèses)
- photo's.jpg (apostrophes)

✅ CORRECT:
- chateau-e-ete.jpg
- logo-avec-virgule.png
- photo-du-chateau.jpg
- image-1.png
- photos.jpg
```

#### C. Extensions Non Supportées
```
❌ À éviter:
- .JPEG (majuscules)
- .PNG (majuscules)
- .Jpg (mixte)

✅ Préférer:
- .jpg (minuscules)
- .png (minuscules)
- .webp (moderne, optimisé)
- .svg (pour logos et icônes)
```

### 🎯 Contraintes pour les Prompts

```markdown
Lors de la génération de code avec images:

1. Chemins absolus depuis /public
   - Toujours commencer par "/" 
   - Jamais de "../" ou "./"

2. Next.js Image Component
   ```jsx
   import Image from 'next/image'
   
   <Image 
     src="/images/nom-fichier.jpg"
     alt="Description précise"
     width={800}
     height={600}
     quality={85}
   />
   ```

3. Fallbacks obligatoires
   ```jsx
   <Image 
     src="/images/photo.jpg"
     onError={(e) => {
       e.currentTarget.src = '/images/placeholder.jpg'
     }}
     alt="Description"
   />
   ```
```

---

## 📝 3. Règles de Nommage des Fichiers

### Règles Strictes

#### ✅ AUTORISÉ
- Lettres minuscules: `a-z`
- Chiffres: `0-9`
- Tirets: `-` (séparateur préféré)
- Points: `.` (uniquement avant l'extension)

#### ❌ INTERDIT
- Accents: `é, è, à, ô, ç`
- Espaces: ` `
- Virgules: `,`
- Apostrophes: `'`
- Parenthèses: `()` 
- Crochets: `[]`
- Caractères spéciaux: `@, #, $, %, &, *`
- Majuscules dans les extensions: `.JPG` → `.jpg`

### Convention de Nommage Recommandée

```
Structure: [categorie]-[sous-categorie]-[description]-[numero].[extension]

Exemples:
✅ chateau-lastours-facade-principale-01.jpg
✅ logo-chateau-lastours-blanc.svg
✅ vignoble-vendange-automne-2024-03.webp
✅ evenement-concert-classique-juin-2024.jpg

❌ château lastours (façade).jpg
❌ Logo_Château-2024(1).PNG
❌ photo,vignoble,été.jpeg
```

### 🎯 Contraintes pour les Prompts

```markdown
Toujours inclure ces règles de nommage:

1. Fonction de normalisation automatique
   ```javascript
   function normalizeFilename(filename) {
     return filename
       .toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '') // Supprime accents
       .replace(/[^a-z0-9.-]/g, '-')     // Remplace caractères spéciaux
       .replace(/-+/g, '-')               // Supprime tirets multiples
       .replace(/^-|-$/g, '');            // Supprime tirets début/fin
   }
   ```

2. Validation avant upload
   ```javascript
   const VALID_FILENAME_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*\.(jpg|png|webp|svg)$/;
   
   if (!VALID_FILENAME_REGEX.test(filename)) {
     throw new Error(`Nom de fichier invalide: ${filename}`);
   }
   ```

3. Script de renommage automatique
   - Créer un script qui normalise tous les noms de fichiers
   - Exécuter AVANT chaque commit
   - Logger les changements pour traçabilité
```

---

## 📁 4. Structure des Dossiers

### Structure Recommandée

```
project-root/
├── public/
│   ├── images/
│   │   ├── chateau/          # Photos du château
│   │   ├── vignoble/         # Photos du vignoble
│   │   ├── evenements/       # Photos d'événements
│   │   ├── vins/             # Photos des vins
│   │   └── logos/            # Logos et branding
│   ├── assets/
│   │   ├── icons/            # Icônes SVG
│   │   └── documents/        # PDFs, docs
│   └── fonts/                # Polices personnalisées
├── src/
│   └── components/
│       └── ui/
│           └── ImageWithFallback.tsx
└── scripts/
    ├── normalize-filenames.ts
    └── audit-images.ts
```

### Règles de Dossiers

#### ✅ AUTORISÉ
- Noms de dossiers en minuscules
- Tirets pour séparer les mots
- Un seul niveau de catégorisation

```
✅ public/images/chateau/
✅ public/images/vignoble/
✅ public/assets/icons/
```

#### ❌ INTERDIT
- Espaces dans les noms de dossiers
- Accents ou caractères spéciaux
- Sous-dossiers trop profonds (> 3 niveaux)

```
❌ public/Images du Château/
❌ public/Événements 2024/
❌ public/images/château/vignoble/vendanges/automne/
```

### 🎯 Contraintes pour les Prompts

```markdown
Organisation des fichiers:

1. Catégorisation claire
   - Un dossier = une catégorie
   - Pas plus de 50 fichiers par dossier
   - Sous-catégories si nécessaire

2. Index des images
   ```typescript
   // src/config/images.ts
   export const IMAGES = {
     chateau: {
       facade: '/images/chateau/facade-principale.jpg',
       interieur: '/images/chateau/interieur-salon.jpg',
     },
     vignoble: {
       vendange: '/images/vignoble/vendange-automne.jpg',
     },
   } as const;
   ```

3. Script d'audit automatique
   - Vérifier que tous les fichiers référencés existent
   - Détecter les fichiers non utilisés
   - Valider les noms de fichiers
```

---

## ✅ 5. Checklist de Validation

### Avant Chaque Commit

```bash
# 1. Vérifier les noms de fichiers
npm run audit:filenames

# 2. Vérifier les références d'images
npm run audit:images

# 3. Optimiser les images
npm run optimize:images

# 4. Tester localement
npm run dev

# 5. Build de production
npm run build

# 6. Commit et push
git add .
git commit -m "feat: description"
git push
```

### Checklist Manuelle

- [ ] Tous les noms de fichiers sont en minuscules
- [ ] Aucun accent, espace, ou caractère spécial
- [ ] Toutes les images sont < 5MB
- [ ] Chemins d'accès absolus depuis /public
- [ ] Composant `<Image>` utilisé (Next.js)
- [ ] Alt text descriptif pour chaque image
- [ ] Fallback en cas d'erreur
- [ ] Pas de Git LFS activé
- [ ] Build Next.js réussi sans erreur
- [ ] Preview Vercel testé

---

## 🚀 6. Commandes Recommandées

### Scripts NPM à Créer

```json
{
  "scripts": {
    "audit:filenames": "tsx scripts/audit-filenames.ts",
    "audit:images": "tsx scripts/audit-images.ts",
    "optimize:images": "tsx scripts/optimize-images.ts",
    "normalize:filenames": "tsx scripts/normalize-filenames.ts",
    "dev": "next dev",
    "build": "next build",
    "deploy:preview": "vercel",
    "deploy:prod": "vercel --prod"
  }
}
```

### Commandes Git Sécurisées

```bash
# Workflow standard
git checkout -b feat/nouvelle-feature
git add .
git commit -m "feat: description claire"
git push -u origin feat/nouvelle-feature

# Vérification avant push
git status
git diff --cached
git log --oneline -5

# En cas de conflit
git pull origin main --rebase
git push origin feat/nouvelle-feature
```

### Commandes Vercel

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Lister les deployments
vercel list

# Logs en temps réel
vercel logs [deployment-url]
```

---

## 📊 7. Erreurs Communes et Solutions

### Erreur: "Image failed to load (400)"

**Causes possibles:**
1. Nom de fichier avec accents/espaces
2. Chemin relatif au lieu d'absolu
3. Fichier n'existe pas dans /public
4. Extension en majuscules

**Solution:**
```bash
# 1. Normaliser le nom
mv "château été.jpg" "chateau-ete.jpg"

# 2. Vérifier l'emplacement
ls -la public/images/

# 3. Corriger le code
# Avant: <img src="../images/château été.jpg" />
# Après:  <img src="/images/chateau-ete.jpg" />
```

### Erreur: "Git LFS objects missing"

**Solution:**
```bash
# 1. Désactiver LFS
rm .gitattributes
git rm --cached *.jpg *.png *.jpeg

# 2. Re-commit les vrais fichiers
git add public/images/
git commit -m "fix: remove LFS, add real files"

# 3. Push sur nouvelle branche
git checkout -b fix/remove-lfs
git push -u origin fix/remove-lfs
```

### Erreur: "Build failed on Vercel"

**Causes possibles:**
1. Images référencées mais absentes
2. Erreur de typo dans les chemins
3. Build timeout (trop d'images lourdes)

**Solution:**
```bash
# 1. Audit complet
npm run audit:images

# 2. Build local pour reproduire
npm run build

# 3. Vérifier les logs Vercel
vercel logs [deployment-url]
```

---

## 🎯 Template de Prompt Optimal

Lors de la création d'un prompt pour ChatGPT, **TOUJOURS** inclure cette section:

```markdown
### ⚠️ Contraintes Techniques Obligatoires

**Git & Versioning:**
- ❌ Pas de Git LFS
- ✅ Fichiers standards Git
- ✅ Nouvelle branche pour chaque feature

**Nommage des Fichiers:**
- ✅ Minuscules uniquement
- ✅ Tirets comme séparateurs
- ❌ Pas d'accents, espaces, virgules, parenthèses
- ❌ Pas de caractères spéciaux

**Structure des Chemins:**
- ✅ Chemins absolus depuis /public: "/images/nom-fichier.jpg"
- ❌ Pas de chemins relatifs: "../images/fichier.jpg"
- ✅ Utiliser Next.js <Image> component

**Images:**
- ✅ Format: .jpg, .png, .webp, .svg (minuscules)
- ✅ Taille: < 5MB par fichier
- ✅ Alt text descriptif obligatoire
- ✅ Fallback en cas d'erreur

**Organisation:**
- ✅ Dossiers: /public/images/[categorie]/
- ✅ Convention: [categorie]-[description]-[numero].extension
- ✅ Scripts d'audit avant commit

**Validation:**
- ✅ `npm run build` doit réussir
- ✅ Tester sur preview Vercel
- ✅ Vérifier toutes les images s'affichent
```

---

## 📚 Ressources et Scripts

### Scripts TypeScript Essentiels

#### 1. `scripts/normalize-filenames.ts`
```typescript
import fs from 'fs';
import path from 'path';

function normalizeFilename(filename: string): string {
  const [name, ...extParts] = filename.split('.');
  const ext = extParts.join('.').toLowerCase();
  
  const normalized = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${normalized}.${ext}`;
}

async function normalizeAllFiles(dir: string) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await normalizeAllFiles(fullPath);
    } else {
      const normalized = normalizeFilename(file.name);
      if (normalized !== file.name) {
        const newPath = path.join(dir, normalized);
        fs.renameSync(fullPath, newPath);
        console.log(`✅ Renommé: ${file.name} → ${normalized}`);
      }
    }
  }
}

normalizeAllFiles('./public/images');
```

#### 2. `scripts/audit-images.ts`
```typescript
import fs from 'fs';
import path from 'path';
import glob from 'glob';

interface ImageAudit {
  total: number;
  errors: string[];
  warnings: string[];
}

function auditImages(): ImageAudit {
  const audit: ImageAudit = { total: 0, errors: [], warnings: [] };
  
  // Vérifier tous les fichiers images
  const images = glob.sync('public/images/**/*.{jpg,jpeg,png,webp,svg}');
  audit.total = images.length;
  
  images.forEach(imagePath => {
    const filename = path.basename(imagePath);
    
    // Vérifier le nommage
    if (!/^[a-z0-9]+(-[a-z0-9]+)*\.(jpg|jpeg|png|webp|svg)$/.test(filename)) {
      audit.errors.push(`❌ Nom invalide: ${imagePath}`);
    }
    
    // Vérifier la taille
    const stats = fs.statSync(imagePath);
    const sizeMB = stats.size / (1024 * 1024);
    if (sizeMB > 5) {
      audit.warnings.push(`⚠️ Fichier lourd (${sizeMB.toFixed(2)}MB): ${imagePath}`);
    }
  });
  
  // Vérifier les références dans le code
  const codeFiles = glob.sync('src/**/*.{ts,tsx,js,jsx}');
  codeFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(/src=["']([^"']+)["']/g);
    
    if (matches) {
      matches.forEach(match => {
        const src = match.match(/src=["']([^"']+)["']/)?.[1];
        if (src && src.startsWith('/images')) {
          const fullPath = path.join('public', src);
          if (!fs.existsSync(fullPath)) {
            audit.errors.push(`❌ Image manquante: ${src} (référencée dans ${file})`);
          }
        }
      });
    }
  });
  
  return audit;
}

const result = auditImages();
console.log(`\n📊 Audit des Images\n`);
console.log(`Total: ${result.total} images`);
console.log(`\n❌ Erreurs (${result.errors.length}):`);
result.errors.forEach(e => console.log(e));
console.log(`\n⚠️ Avertissements (${result.warnings.length}):`);
result.warnings.forEach(w => console.log(w));
```

---

## 🎓 Résumé pour ChatGPT

Lorsque tu crées des prompts pour ce projet, **TOUJOURS** respecter:

### Les 10 Commandements

1. **Git LFS tu n'utiliseras pas** ❌
2. **Les noms en minuscules tu écriras** ✅
3. **Les accents tu supprimeras** ✅
4. **Les espaces par des tirets tu remplaceras** ✅
5. **Chemins absolus depuis /public tu emploieras** ✅
6. **Next.js Image component tu préféreras** ✅
7. **Alt text descriptif tu ajouteras** ✅
8. **Images < 5MB tu garderas** ✅
9. **Sur nouvelle branche tu pusheras** ✅
10. **Scripts d'audit tu exécuteras** ✅

### Format Standard de Prompt

```markdown
Contexte: [Description du besoin]

Objectif: [Ce qui doit être fait]

Contraintes Techniques:
- Nommage: minuscules, tirets, pas d'accents/espaces
- Chemins: absolus depuis /public
- Format: .jpg, .png, .webp (minuscules)
- Git: pas de LFS, nouvelle branche
- Next.js: utiliser <Image> component
- Validation: npm run build doit réussir

Livrables:
- [ ] Code avec images correctement référencées
- [ ] Script de normalisation des noms
- [ ] Script d'audit
- [ ] Documentation

Tests:
- [ ] Build local réussi
- [ ] Preview Vercel testé
- [ ] Toutes les images affichées
```

---

## 📞 Support

En cas de doute ou d'erreur, **TOUJOURS** se référer à ce document avant de coder.

**Workflow de débogage:**
1. Lire ce document
2. Exécuter les scripts d'audit
3. Corriger les erreurs identifiées
4. Tester localement
5. Pusher sur preview
6. Valider sur Vercel

---

**Dernière mise à jour:** 13 novembre 2024  
**Version:** 1.0  
**Projet:** Château Lastours

---

*Ce document est vivant et doit être mis à jour à chaque nouveau problème rencontré.*

