# 📊 AUDIT COMPLET DE L'ESPACE DISQUE - Château Lastours

**Date de l'audit :** $(date)  
**Taille totale du projet :** ~3.8 GB

---

## 📋 RÉSUMÉ EXÉCUTIF

### Économie totale estimée : **~1.0 - 1.3 GB**

Les principales sources d'économies identifiées :
1. **Dossier `.git/`** : 2.1 GB (Git LFS avec objets volumineux)
2. **Dossier `out/`** : 466 MB (build statique - peut être régénéré)
3. **Dossier `.next/`** : 234 MB (cache Next.js - peut être régénéré)
4. **Documentation redondante** : ~656 KB (56 fichiers .md)
5. **Images non optimisées** : ~76 MB (8 fichiers > 10MB)
6. **Fichiers temporaires** : ~18 MB (ZIP, DOCX, HTML)

---

## 📊 RÉPARTITION DÉTAILLÉE PAR CATÉGORIE

| Catégorie | Taille | Description | Action recommandée |
|-----------|--------|-------------|-------------------|
| **`.git/`** | **2.1 GB** | Repository Git avec Git LFS | Optimiser Git LFS |
| **`node_modules/`** | **585 MB** | Dépendances npm/pnpm | ✅ Nécessaire (peut être régénéré) |
| **`out/`** | **466 MB** | Build statique Next.js | ❌ Supprimer (régénéré au build) |
| **`public/`** | **455 MB** | Assets statiques (images, PDFs) | Optimiser les images |
| **`.next/`** | **234 MB** | Cache Next.js | ❌ Supprimer (régénéré au build) |
| **Documentation** | **~656 KB** | 56 fichiers .md | Archiver les anciens rapports |
| **Code source** | **~1.1 MB** | Fichiers .ts/.tsx | ✅ Nécessaire |

---

## 🔍 ANALYSE DÉTAILLÉE

### 1. Dossier `.git/` (2.1 GB) 🔴 PRIORITÉ HAUTE

**Problème :** Le repository Git contient beaucoup d'objets volumineux via Git LFS.

**Détails :**
- Git LFS : ~434 MB d'objets
- Pack Git : 1.7 GB (contient l'historique complet)

**Actions recommandées :**
```bash
# Nettoyer les anciens objets Git LFS non référencés
git lfs prune --verify-remote

# Nettoyer le cache Git
git gc --aggressive --prune=now

# Si vous n'avez pas besoin de tout l'historique, considérez un shallow clone
```

**Économie estimée :** 300-500 MB (selon l'historique)

---

### 2. Dossier `out/` (466 MB) 🔴 PRIORITÉ HAUTE

**Problème :** Le dossier `out/` est généré lors du build et ne devrait pas être versionné.

**Action immédiate :**
```bash
# Supprimer le dossier out/
rm -rf out/
```

**Note :** Ce dossier est déjà dans `.gitignore`, mais il existe localement.

**Économie :** **466 MB** (immédiat)

---

### 3. Dossier `.next/` (234 MB) 🟡 PRIORITÉ MOYENNE

**Problème :** Cache Next.js qui peut être régénéré.

**Action :**
```bash
# Supprimer le cache
rm -rf .next/
```

**Note :** Le cache sera régénéré au prochain `pnpm dev` ou `pnpm build`.

**Économie :** **234 MB** (immédiat)

---

### 4. Images volumineuses dans `public/` (76 MB) 🟡 PRIORITÉ MOYENNE

**Problème :** 8 fichiers images > 10 MB trouvés.

**Fichiers concernés :**
1. `public/Page/Nos evenements - ok/soiree-partenaire-rugby-chateau-lastours-gaillac-france.jpg` - **84.87 MB**
2. `public/ASSET/histoire-du-domaine/pigeonnier-ancien-sud-ouest-france.jpg` - **17.28 MB**
3. `public/Page/Nos evenements - ok/pigeonnier-renove-domaine-viticole-gaillac-france.jpg` - **17.28 MB**
4. `public/Page/_common/histoire-hero.jpg` - **17.28 MB**
5. `public/Page/Photo Menu/Domaine/jardins-a-la-francaise-chateau-lastours-gaillac-france.JPG` - **15.73 MB**
6. `public/Page/Page Engagement/wetransfer_logo-hve-png_2025-08-08_1426.zip` - **14.12 MB** ⚠️ (fichier ZIP inutile)
7. `public/Page/Nos Engagement - ok/nos-engagements-agriculture-raisonnee-chateau-lastours-aop-aoc-gaillac-france.jpg` - **12.42 MB**
8. `public/Page/Notre Chai - manque 1 photo/fermentation-malo-lactique-chateau-lastours-france.jpg` - **11.13 MB**

**Actions recommandées :**
```bash
# 1. Supprimer le fichier ZIP inutile
rm "public/Page/Page Engagement/wetransfer_logo-hve-png_2025-08-08_1426.zip"

# 2. Optimiser les images avec sharp (déjà dans les dépendances)
# Créer un script d'optimisation pour réduire la taille des images
```

**Économie estimée :** 30-40 MB après optimisation (40-50% de réduction)

---

### 5. Documentation redondante (56 fichiers .md) 🟢 PRIORITÉ BASSE

**Problème :** Beaucoup de fichiers de documentation/rapport qui pourraient être archivés.

**Fichiers identifiés comme potentiellement redondants :**
- `REPORT_*.md` (plusieurs rapports)
- `*_DEPLOYMENT_GUIDE.md` (guides de déploiement multiples)
- `*_SUMMARY.md` (résumés)
- `AUDIT.md`, `OPTIMIZATION_REPORT.md`, etc.

**Action recommandée :**
```bash
# Créer un dossier archive pour les anciens rapports
mkdir -p docs/archive
mv REPORT_*.md docs/archive/ 2>/dev/null
mv *_DEPLOYMENT_GUIDE.md docs/archive/ 2>/dev/null
mv *_SUMMARY.md docs/archive/ 2>/dev/null
```

**Économie :** ~200-300 KB (peu significatif mais améliore l'organisation)

---

### 6. Fichiers temporaires et backups (~18 MB)

**Problème :** Fichiers ZIP, DOCX, HTML dans le dossier `public/` qui ne sont probablement pas utilisés.

**Action :**
```bash
# Nettoyer les fichiers temporaires
find . -name ".DS_Store" -delete
find . -name "*.log" -not -path "./node_modules/*" -delete
find public -name "*.zip" -delete  # Après vérification
find public -name "*.docx" -delete  # Après vérification (sauf si nécessaires)
```

**Économie :** ~18 MB

---

## ✅ PLAN D'ACTION RECOMMANDÉ

### Phase 1 : Nettoyage immédiat (Économie : ~700 MB)

```bash
# 1. Supprimer le dossier out/
rm -rf out/

# 2. Supprimer le cache .next/
rm -rf .next/

# 3. Supprimer le fichier ZIP inutile
rm "public/Page/Page Engagement/wetransfer_logo-hve-png_2025-08-08_1426.zip"
```

### Phase 2 : Optimisation Git (Économie : ~300-500 MB)

```bash
# Nettoyer Git LFS
git lfs prune --verify-remote

# Nettoyer le cache Git
git gc --aggressive --prune=now
```

### Phase 3 : Optimisation des images (Économie : ~30-40 MB)

Créer un script pour optimiser automatiquement les images volumineuses.

### Phase 4 : Organisation (Économie : ~200-300 KB)

Archiver les anciens fichiers de documentation.

---

## 📈 RÉSUMÉ DES ÉCONOMIES

| Action | Économie | Priorité |
|--------|----------|----------|
| Supprimer `out/` | **466 MB** | 🔴 Haute |
| Supprimer `.next/` | **234 MB** | 🔴 Haute |
| Optimiser Git LFS | **300-500 MB** | 🟡 Moyenne |
| Optimiser images | **30-40 MB** | 🟡 Moyenne |
| Supprimer ZIP/DOCX | **18 MB** | 🟡 Moyenne |
| **TOTAL** | **~1.0 - 1.3 GB** | |

---

## 🛠️ SCRIPTS UTILITAIRES

### Script de nettoyage rapide

Créer un script `clean.sh` :

```bash
#!/bin/bash
echo "🧹 Nettoyage du projet..."

# Supprimer les dossiers de build
rm -rf out/ .next/

# Supprimer les fichiers temporaires
find . -name ".DS_Store" -delete
find . -name "*.log" -not -path "./node_modules/*" -delete

# Supprimer le fichier ZIP inutile
rm -f "public/Page/Page Engagement/wetransfer_logo-hve-png_2025-08-08_1426.zip"

echo "✅ Nettoyage terminé !"
```

### Script d'optimisation Git

```bash
#!/bin/bash
echo "🔧 Optimisation Git..."

# Nettoyer Git LFS
git lfs prune --verify-remote

# Nettoyer le cache Git
git gc --aggressive --prune=now

echo "✅ Optimisation Git terminée !"
```

---

## 📝 NOTES IMPORTANTES

1. **Ne supprimez JAMAIS `node_modules/`** sans être sûr de pouvoir le régénérer (il est nécessaire pour le développement)

2. **Le dossier `out/`** est généré automatiquement lors du build (`pnpm build`), donc sa suppression est sans risque

3. **Le dossier `.next/`** est un cache qui sera régénéré automatiquement

4. **Git LFS** : Assurez-vous d'avoir une sauvegarde avant de nettoyer Git LFS

5. **Images** : Gardez toujours les originaux avant optimisation, ou utilisez un système de versioning

---

## 🔄 MAINTENANCE RÉGULIÈRE

Pour éviter que le projet ne devienne trop lourd à l'avenir :

1. **Ajouter dans `.gitignore`** tous les fichiers temporaires
2. **Optimiser les images** avant de les ajouter au projet
3. **Nettoyer régulièrement** les dossiers `out/` et `.next/`
4. **Archiver** les anciens rapports et documentations
5. **Utiliser Git LFS** uniquement pour les fichiers vraiment nécessaires

---

**Rapport généré par :** `scripts/audit-espace.js`  
**Fichier JSON détaillé :** `AUDIT_ESPACE.json`

