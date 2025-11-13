# 🚨 PROCHAINES ÉTAPES CRITIQUES

## Action Immédiate Requise

### 1. Résoudre les Pointeurs Git LFS (BLOQUANT) ⚠️

**Problème:** 270 fichiers images sont des pointeurs Git LFS, pas des vrais binaires.

**Solution:**

```bash
# Option A: Récupérer les fichiers depuis LFS (si le repo LFS est configuré)
git lfs pull --include="public/**"

# Vérifier
tsx scripts/check-lfs-pointers.ts
```

**Si git lfs n'est pas configuré ou ne fonctionne pas:**

```bash
# Option B: Identifier les fichiers manquants et les remplacer
tsx scripts/check-lfs-pointers.ts > lfs-report.txt

# Puis remplacer manuellement les fichiers les plus critiques:
# - photos-web-lastours/logo/logo.png
# - photos-web-lastours/photos-general/*.jpg
# - photos-web-lastours/vignes/*.jpg
# - etc.
```

---

## 2. Test Local Rapide ⚡

```bash
# Démarrer le serveur
pnpm dev
```

### Pages critiques à tester:

| Page | URL | Vérifier |
|------|-----|----------|
| **Accueil** | `/` | Hero image, sections, logo navbar |
| **Vins** | `/les-vins` | Images de bouteilles |
| **Vignoble** | `/domaine/terroir` | Photos de vignes |
| **Événements** | `/evenements` | Photos d'événements |
| **Contact** | `/contact` | Hero et formulaire |

**Regarder la console réseau du navigateur:**
- Pas d'erreurs 400/404 sur `/_next/image?url=...`
- Tous les `<Image>` Next.js doivent charger

---

## 3. Audit Post-Correction 📊

```bash
# Re-scanner après avoir résolu LFS
pnpm run audit:images

# Le résultat devrait montrer:
# - ✅ Références valides: beaucoup plus
# - ❌ Références manquantes: beaucoup moins
# - ⚠️ Pointeurs LFS: 0 (si résolu)
```

---

## 4. Nettoyer (Optionnel) 🧹

```bash
# Supprimer les vieux rapports JSON qui polluent l'audit
rm ASSETS_*.json
rm REPORT_*.md (sauf les nouveaux)
rm *-validation.json
rm image-*.json

# Garder seulement:
# - IMAGES_FIX_GUIDE.md
# - CORRECTION_IMAGES_COMPLETE.md
# - NEXT_STEPS_CRITICAL.md
# - reports/ (dossier)
```

---

## 5. Commit et Push 🚀

```bash
git add .
git commit -m "chore(images): normalize all assets, fix references, organize structure

- Normalized 440 assets to /public/images with categories
- Fixed 626 image references across 70 files
- Created comprehensive audit and fix scripts
- Generated detailed reports for tracking

[CRITICAL] Need to resolve 270 Git LFS pointers before production deploy"

git push
```

---

## 6. Vérifier Vercel Preview 🌐

1. Attendre le déploiement sur Vercel
2. Ouvrir le preview URL
3. **Ouvrir DevTools** (F12) → Network
4. Filtrer par "Img" ou "image"
5. **Vérifier:** Aucune requête en rouge (400/404)
6. Naviguer sur toutes les pages principales
7. **Vérifier:** Logo navbar visible partout

### Si des erreurs 400/404 apparaissent:

```bash
# Noter les URLs en erreur
# Format: /_next/image?url=%2Fpath%2Fto%2Fimage.jpg

# Décoder l'URL (%2F = /)
# Vérifier si le fichier existe:
ls -la public/path/to/image.jpg

# Si manquant: chercher dans le mapping
grep "image.jpg" reports/asset-moves-mapping.json
```

---

## 7. Cas d'Urgence: Rollback 🔄

Si le site ne fonctionne pas du tout en preview:

```bash
# Annuler les changements
git reset --hard HEAD~1

# Ou revenir à un commit spécifique
git reset --hard <commit-hash>

# Forcer le push (avec précaution!)
git push --force
```

---

## ✅ Checklist Avant Production

- [ ] Git LFS résolu (0 pointeurs restants)
- [ ] `pnpm dev` fonctionne sans erreurs
- [ ] Logo navbar s'affiche partout
- [ ] Hero home page s'affiche
- [ ] Toutes les images de vins chargent
- [ ] Preview Vercel: 0 erreurs 400/404 en console
- [ ] Audit final: < 100 références cassées (et toutes non critiques)

---

## 🆘 En Cas de Problème

### Problème 1: Trop de références cassées

**Solution:** Exclure les vieux rapports JSON de l'audit

```typescript
// Dans scripts/fix-missing-images.ts, modifier scanDirectory:
if (entry.name.startsWith('.') || 
    entry.name === 'node_modules' || 
    entry.name === '.next' ||
    entry.name === 'reports' ||
    entry.name.includes('REPORT_') ||     // Ajouter
    entry.name.includes('ASSETS_') ||     // Ajouter
    entry.name.endsWith('validation.json') // Ajouter
) {
  continue;
}
```

### Problème 2: Images ne chargent pas en prod mais marchent en local

**Causes possibles:**
1. Fichiers LFS non résolus
2. Chemins avec casse incorrecte (Linux = case-sensitive)
3. Fichiers non commités

**Solution:**
```bash
# Vérifier que tous les fichiers sont commités
git status

# Vérifier la casse des chemins
ls -la public/images/wines/Claire-de-Lune.jpg  # Mauvais (majuscule)
ls -la public/images/wines/claire-de-lune.jpg  # Bon (minuscule)
```

### Problème 3: Next.js Image Optimization erreurs

**Solution:** Vérifier `next.config.mjs`

```javascript
// Devrait contenir:
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 60,
  // Pas de unoptimized: true (sauf pour export statique)
}
```

---

## 📞 Support Scripts

Tous les scripts sont dans `/scripts/`:

```bash
# Audit complet
pnpm run audit:images

# Fix automatique
pnpm run fix:images

# Vérifier LFS
tsx scripts/check-lfs-pointers.ts

# Normaliser assets
tsx scripts/normalize-and-move-assets.ts --write

# Mettre à jour références
tsx scripts/update-code-references.ts --write

# Cas spécifiques
tsx scripts/fix-specific-cases.ts --write
```

---

## 🎯 Objectif Final

**Site Vercel en production:**
- ✅ Toutes les images chargent
- ✅ 0 erreurs 400/404
- ✅ Logo navbar visible
- ✅ Hero home page visible
- ✅ Performance optimale (Next.js Image Optimization)

**Time to Complete:** 1-2 heures (selon résolution LFS)

---

**Status Actuel:** 90% terminé ✅  
**Bloquant:** Résolution Git LFS ⚠️  
**ETA Production:** < 2 heures si LFS résolu rapidement

