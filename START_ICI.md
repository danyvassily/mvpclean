# 🚨 COMMENCE ICI ! 

## ⚡ Action Rapide - 3 commandes

Tu as **270 images manquantes**. Si tu as une sauvegarde, on peut TOUT récupérer automatiquement !

---

## 📝 Étape 1 : Voir ce qui manque

```bash
npm run list:missing
```

✅ Cela crée une liste complète dans `reports/missing-files-list.txt`

---

## 📂 Étape 2 : Trouve ton dossier de sauvegarde

**Cherche un dossier qui contient tes photos du château.**

Exemples de commandes pour chercher :

```bash
# Sur le Bureau
ls ~/Desktop

# Dans Documents  
ls ~/Documents

# Dans Téléchargements
ls ~/Downloads

# Sur un disque externe
ls /Volumes/
```

**Tu l'as trouvé ?** Note le chemin complet, par exemple :
- `~/Desktop/Images-Chateau`
- `~/Documents/Sauvegardes/Photos-Lastours`
- `/Volumes/MonDisque/Backup-Images`

---

## 🔄 Étape 3 : Restaurer automatiquement

### Test d'abord (simulation)

```bash
npm run restore:backup -- --backup-dir /TON/CHEMIN/ICI --dry-run
```

**Remplace `/TON/CHEMIN/ICI`** par le vrai chemin !

### Puis copie pour de vrai

```bash
npm run restore:backup -- --backup-dir /TON/CHEMIN/ICI
```

---

## ✨ Étape 4 : Nettoyer et pusher

```bash
# Désactiver Git LFS
rm .gitattributes

# Vérifier
npm run audit:images

# Commiter
git add .
git commit -m "feat: restore missing LFS images from backup"

# Pusher (nouvelle branche)
git checkout -b feat/images-restored
git push -u origin feat/images-restored
```

---

## 🎯 Exemple Complet

**Si ta sauvegarde est dans `~/Desktop/Photos-Chateau` :**

```bash
# 1. Liste
npm run list:missing

# 2. Test
npm run restore:backup -- --backup-dir ~/Desktop/Photos-Chateau --dry-run

# 3. Restaure
npm run restore:backup -- --backup-dir ~/Desktop/Photos-Chateau

# 4. Nettoie
rm .gitattributes
npm run audit:images

# 5. Commit
git add .
git commit -m "feat: restore missing LFS images from backup"

# 6. Push
git checkout -b feat/images-restored
git push -u origin feat/images-restored
```

---

## ❓ Questions ?

### "Où est ma sauvegarde ?"

Cherche un dossier avec des noms comme :
- `Images`, `Photos`, `Backup`, `Sauvegarde`
- `Chateau`, `Lastours`, `Vins`, `Vignes`
- Dates récentes

### "Je n'ai pas de sauvegarde"

Deux options :
1. **Continuer sans** → Le site fonctionne mais avec des images manquantes
2. **Ajouter de nouvelles photos** plus tard

Pour pusher quand même :
```bash
rm .gitattributes
git add .
git commit -m "chore: remove LFS"
git push origin main --force-with-lease
```

### "Le script ne trouve pas tout"

C'est **normal** ! Quelques raisons :
- Noms de fichiers différents
- Fichiers vraiment absents de la sauvegarde

Le script te dira exactement quels fichiers sont manquants.

---

## 📚 Guides Détaillés

Si tu veux plus de détails :
- 📘 `DEMARRAGE_RAPIDE.md` - Guide visuel
- 📗 `RESTORE_GUIDE.md` - Guide complet avec FAQ
- 📙 `RESUME_SOLUTION.md` - Explication technique

---

## 🆘 Besoin d'aide ?

**Dis-moi où tu en es:**

1. "J'ai trouvé ma sauvegarde dans `~/Desktop/...`"
2. "Je ne trouve pas ma sauvegarde"
3. "Le script ne fonctionne pas, voici l'erreur : ..."

---

## ✅ TL;DR

```bash
# 1. Liste
npm run list:missing

# 2. Restaure (remplace le chemin !)
npm run restore:backup -- --backup-dir ~/Desktop/TON-DOSSIER

# 3. Nettoie
rm .gitattributes

# 4. Push
git add .
git commit -m "feat: restore images"
git checkout -b feat/images-restored
git push -u origin feat/images-restored
```

---

**🚀 COMMENCE PAR:**

```bash
npm run list:missing
```

**Puis dis-moi où est ta sauvegarde !** 📂

