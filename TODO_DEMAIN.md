# ☀️ TO-DO DEMAIN MATIN

**Date:** 14 novembre 2024  
**Temps estimé:** 6-8 heures

---

## 🚨 PRIORITÉ 1 - URGENT (Matin)

### ✅ Tâche 1: Logos Manquants (1h)
**3 logos critiques manquants:**

```bash
cd "/Users/danyvassily/dev /chateauxlastversion"

# Fichiers à créer/récupérer:
# 1. public/images/logos/logo-argente.png
# 2. public/images/logos/logo-blanc-fond-noir.png  
# 3. public/images/logos/logo-chateau-lastours-1.jpg

# Où les trouver:
# - Fichiers sources Photoshop/Illustrator
# - Ou recréer sur Canva
# - Ou demander au graphiste
```

**Dimensions recommandées:** 1000x400px

---

### ✅ Tâche 2: Page Événements (2-3h)
**18 images manquantes** - 2 options:

#### Option A: Photos de Stock (RAPIDE - 1h)
```bash
# Sites gratuits:
# - unsplash.com (chercher: "french château wedding")
# - pexels.com (chercher: "wine cellar event")
# - pixabay.com (chercher: "vineyard party")

# Télécharger 15-20 images et les placer dans:
# public/images/events/
```

#### Option B: Refaire la Page (MIEUX - 3h)
```typescript
// app/evenements/page.tsx
// Utiliser uniquement les 30 images disponibles
// Créer une belle galerie avec ce qu'on a

// Images disponibles:
// - accompagnement-personnalise.jpg
// - apero-concerts-ete.jpg
// - bulle-de-jazz-2021-chazo-066.jpg
// - carte-de-menu-mariage-chateau-lastours-gaillac-france.jpg
// ... (voir AUDIT_IMAGES_MANQUANTES.md)
```

---

## 🎯 PRIORITÉ 2 (Après-midi)

### ✅ Tâche 3: Page Vignoble (2h)
**15 images manquantes** sur 52

```bash
# Action:
# 1. Identifier les 37 meilleures photos disponibles
# 2. Créer une galerie organisée:
#    - Cycle de la vigne (printemps, été, automne, hiver)
#    - Travail dans les vignes
#    - Cépages
# 3. Retoucher app/notre-vignoble/page.tsx
```

---

### ✅ Tâche 4: Page Château (1h)
**12 images manquantes** sur 45

```bash
# Action:
# 1. Utiliser les 33 photos disponibles
# 2. Organiser par thème:
#    - Architecture (façades, intérieurs)
#    - Jardins à la française
#    - Histoire (pigeonnier, fontaine)
# 3. Retoucher app/domaine/histoire/page.tsx
```

---

## ⚡ PRIORITÉ 3 (Fin de journée - 1h)

### ✅ Tâche 5: Tests & Deploy

```bash
cd "/Users/danyvassily/dev /chateauxlastversion"

# 1. Vérifier qu'il n'y a plus d'images corrompues
find public/images -type f -size 0

# 2. Vérifier qu'il n'y a plus de pointeurs LFS
grep -r "version https://git-lfs.github.com/spec/v1" public/ 2>/dev/null

# 3. Test local
npm run dev
# Ouvrir: http://localhost:3000
# Tester toutes les pages modifiées

# 4. Build production
npm run build

# 5. Si tout est OK, push
git add .
git commit -m "fix: add missing images for events, vineyard and estate pages"
git push

# 6. Deploy Vercel
vercel --prod --yes
```

---

## 📁 FICHIERS À MODIFIER

### Pages à retoucher:
```
✏️ app/evenements/page.tsx (PRIORITÉ 1)
✏️ app/evenements/organiser/page.tsx
✏️ app/notre-vignoble/page.tsx (PRIORITÉ 2)
✏️ app/la-vigne/page.tsx
✏️ app/domaine/histoire/page.tsx (PRIORITÉ 2)
✏️ components/header.tsx (si logos manquants)
```

### Dossiers d'images à compléter:
```
📁 public/images/logos/ (3 fichiers manquants) ⚠️ URGENT
📁 public/images/events/ (18 fichiers manquants)
📁 public/images/vineyard/ (15 fichiers manquants)
📁 public/images/estate/ (12 fichiers manquants)
```

---

## 🎨 RESSOURCES

### Sites d'Images Gratuites:
- **Unsplash** - https://unsplash.com
- **Pexels** - https://pexels.com
- **Pixabay** - https://pixabay.com

### Mots-clés de recherche:
```
Pour Événements:
- "french château wedding"
- "wine cellar event"
- "vineyard party tent"
- "elegant wine tasting"

Pour Vignoble:
- "vineyard sunset france"
- "grape harvest"
- "wine growing"
- "french vineyard rows"

Pour Château:
- "french château architecture"
- "french garden"
- "historic wine estate"
```

### Outils d'Optimisation:
- **TinyPNG** - https://tinypng.com (compression)
- **Squoosh** - https://squoosh.app (Google, gratuit)

---

## 📊 ÉTAT ACTUEL

| Page | Images OK | Manquantes | État |
|------|-----------|------------|------|
| Événements | 30/48 | 18 | 🔴 À refaire |
| Vignoble | 37/52 | 15 | 🟡 À améliorer |
| Château | 33/45 | 12 | 🟡 À améliorer |
| Logos | 12/15 | 3 | 🔴 URGENT |
| Équipe | 9/9 | 0 | ✅ Parfait |
| Vins | 69/73 | 4 | ✅ Bon |

---

## ⏱️ PLANNING SUGGÉRÉ

```
09h00 - 10h00 → Logos (3 fichiers)
10h00 - 13h00 → Page Événements (refaire)
13h00 - 14h00 → Pause déjeuner
14h00 - 16h00 → Page Vignoble (améliorer)
16h00 - 17h00 → Page Château (améliorer)
17h00 - 18h00 → Tests & Deploy
```

---

## 🚀 COMMANDES RAPIDES

```bash
# Aller dans le projet
cd "/Users/danyvassily/dev /chateauxlastversion"

# Compter les images par dossier
for dir in public/images/*/; do 
  echo "$dir: $(find "$dir" -type f | wc -l)"
done

# Voir les petits fichiers (potentiellement corrompus)
find public/images -type f -size -1k

# Dev local
npm run dev

# Build
npm run build

# Push & Deploy
git add . && git commit -m "fix: update images" && git push
vercel --prod --yes
```

---

## 💡 CONSEIL

**Commence par les logos !** C'est le plus important et le plus rapide.

Ensuite, pour la page événements, je recommande **Option A** (photos de stock) :
- ✅ Rapide (1h)
- ✅ Professionnel
- ✅ Tu pourras remplacer plus tard par tes vraies photos

---

## 📞 BESOIN D'AIDE ?

Si tu bloques sur quelque chose demain:
1. Ouvre **AUDIT_IMAGES_MANQUANTES.md** (détails complets)
2. Pose-moi des questions sur une page spécifique
3. Montre-moi tes nouvelles images, je t'aide à les intégrer

---

**Bonne nuit et bon courage demain ! 💪**

Le plus dur est fait (push GitHub ✅, deploy Vercel ✅).  
Demain c'est juste de l'amélioration visuelle ! 🎨

