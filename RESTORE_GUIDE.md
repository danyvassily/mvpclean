# 🎯 Guide de Restauration des Images Manquantes

## 📋 Vue d'Ensemble

Ce projet a 102 fichiers qui sont actuellement des **pointeurs Git LFS** au lieu de vrais fichiers binaires. Cela empêche le push vers GitHub.

**BONNE NOUVELLE**: Si vous avez une sauvegarde de vos images, on peut tout restaurer automatiquement ! 🎉

---

## 🚀 Solution Complète en 4 Étapes

### ✅ Étape 1: Identifier les fichiers manquants

```bash
npm run list:missing
```

Ce script va :
- Lister les 102 fichiers qui sont des pointeurs LFS
- Les catégoriser par priorité (logos > château/vins > vignes > événements)
- Créer un fichier `reports/missing-files-list.txt` avec la liste complète

**Catégories de priorité:**
- 🔴 **Logos** (4 fichiers) - CRITIQUES pour la navbar/footer
- 🟠 **Estate/Wines** (55 fichiers) - Photos du château et bouteilles
- 🟡 **Vineyard/Production** (30 fichiers) - Photos de vignes et chai
- ⚪ **Events/Autres** (13 fichiers) - Événements, expériences

---

### ✅ Étape 2: Restaurer depuis votre sauvegarde

#### Option A: Restauration automatique (recommandé)

```bash
# Simulation d'abord (pour voir ce qui sera copié)
npm run restore:backup -- --backup-dir /chemin/vers/votre/sauvegarde --dry-run

# Puis copie réelle
npm run restore:backup -- --backup-dir /chemin/vers/votre/sauvegarde
```

Le script va :
1. ✅ Chercher automatiquement chaque fichier dans votre sauvegarde
2. ✅ Copier les fichiers trouvés au bon emplacement dans `public/`
3. ✅ Remplacer les pointeurs LFS par les vrais fichiers binaires
4. ✅ Afficher un résumé détaillé

**Exemple:**
```bash
# Si votre sauvegarde est dans ~/Desktop/Images-Chateau
npm run restore:backup -- --backup-dir ~/Desktop/Images-Chateau
```

#### Option B: Copie manuelle

Si vous préférez copier manuellement :

1. Consultez `reports/missing-files-list.txt`
2. Pour chaque fichier de la liste :
   - Cherchez-le dans votre sauvegarde
   - Copiez-le dans le dossier correspondant de `public/`
3. Vérifiez avec `npm run audit:images`

---

### ✅ Étape 3: Désactiver Git LFS et commiter

Une fois les fichiers restaurés :

```bash
# 1. Supprimer la configuration Git LFS
rm .gitattributes

# 2. Vérifier que les pointeurs sont remplacés
npm run audit:images

# 3. Ajouter tous les changements
git add .

# 4. Commiter avec un message clair
git commit -m "feat: restore all LFS images from backup and disable LFS"
```

---

### ✅ Étape 4: Pusher vers GitHub

#### Option A: Nouvelle branche (recommandé pour review)

```bash
# Créer une nouvelle branche
git checkout -b feat/images-restored

# Pusher
git push -u origin feat/images-restored
```

Ensuite sur GitHub :
1. Créez une Pull Request
2. Vérifiez le preview Vercel
3. Mergez dans `main` si tout fonctionne

#### Option B: Nouveau repo (pour repartir de zéro)

```bash
# Retirer l'ancien remote
git remote remove origin

# Ajouter le nouveau repo
git remote add origin git@github.com:VOTRE-USERNAME/nouveau-repo.git

# Pusher
git push -u origin main --force
```

---

## 📊 Résumé des Fichiers Manquants

### 🔴 PRIORITÉ 1 - Logos (4 fichiers)
```
logo-argente.png
logo-blanc-fond-noir.png
logo-chateau-lastours-1.jpg
verres-barriques-logo.jpg
```

### 🟠 PRIORITÉ 2 - Estate/Château (22 fichiers)
```
1683648345536-1.jpg
1686032198361.jpg
allee-lastours.jpg
buis-fleuri-1.jpg
... (voir reports/missing-files-list.txt pour la liste complète)
```

### 🟡 PRIORITÉ 3 - Vineyard/Vignes (43 fichiers)
Photos des vignes, raisins, tracteurs, etc.

### ⚪ PRIORITÉ 4 - Events/Événements (33 fichiers)
Photos d'événements, réceptions, tentes, etc.

---

## 🔍 Vérification Post-Restauration

Après la restauration, vérifiez que tout fonctionne :

```bash
# 1. Audit des images
npm run audit:images

# 2. Vérifier qu'il n'y a plus de pointeurs LFS
grep -r "git-lfs.github.com" public/ || echo "✅ Aucun pointeur LFS"

# 3. Tester localement
npm run dev
```

Visitez ces pages critiques :
- `/` - Hero image et logo
- `/les-vins` - Bouteilles
- `/domaine/terroir` - Photos de vignes
- `/evenements` - Photos d'événements

---

## ❓ FAQ

### Q: Le script ne trouve pas certains fichiers

**R:** Vérifiez que :
- Le nom du fichier est exactement le même dans votre sauvegarde
- Le fichier n'est pas dans un dossier ignoré (`.git`, `node_modules`, etc.)
- Vous avez les permissions de lecture sur le dossier

### Q: Dois-je restaurer TOUS les fichiers ?

**R:** Non ! Vous pouvez choisir de restaurer uniquement les prioritaires :
- 🔴 Les logos sont CRITIQUES
- 🟠 Les photos de château et bouteilles sont importantes
- ⚪ Les événements sont optionnels

### Q: Que faire si je n'ai plus la sauvegarde ?

**R:** Deux options :
1. Continuer sans ces fichiers (le site fonctionnera, mais avec des images manquantes)
2. Remplacer par de nouvelles photos

---

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les messages d'erreur du script
2. Consultez `reports/missing-files-list.txt`
3. Exécutez avec `--dry-run` d'abord pour simuler

**Exemple de debug:**
```bash
# Voir exactement ce qui serait copié
npm run restore:backup -- --backup-dir ~/Images --dry-run
```

---

## 📝 Checklist Complète

- [ ] Identifier les fichiers manquants (`npm run list:missing`)
- [ ] Localiser le dossier de sauvegarde
- [ ] Tester la restauration (`--dry-run`)
- [ ] Restaurer les fichiers
- [ ] Vérifier avec `npm run audit:images`
- [ ] Désactiver Git LFS (`rm .gitattributes`)
- [ ] Commiter les changements
- [ ] Pusher vers GitHub
- [ ] Tester sur Vercel preview
- [ ] Merger dans main

---

**Prêt à commencer ?** 🚀

```bash
# Commencez ici:
npm run list:missing
```

Puis indiquez-moi où se trouve votre dossier de sauvegarde !

