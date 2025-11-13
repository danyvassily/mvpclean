# ⚡ DÉMARRAGE RAPIDE - Récupération des Images

## 🎯 Objectif

Tu as **102 images manquantes** (pointeurs Git LFS au lieu des vrais fichiers).  
**SOLUTION**: Les restaurer depuis ta sauvegarde ! 🎉

---

## 📋 Commandes à Exécuter (dans l'ordre)

### 1️⃣ Voir la liste des fichiers manquants

```bash
npm run list:missing
```

📝 Cela crée un fichier `reports/missing-files-list.txt` avec tous les noms.

---

### 2️⃣ Restaurer depuis ta sauvegarde

#### 🔍 D'abord, tester en mode simulation (dry-run)

```bash
npm run restore:backup -- --backup-dir /chemin/vers/ta/sauvegarde --dry-run
```

**Exemple concret:**
```bash
# Si ta sauvegarde est sur le Bureau
npm run restore:backup -- --backup-dir ~/Desktop/Images-Chateau --dry-run

# Si elle est dans Documents
npm run restore:backup -- --backup-dir ~/Documents/Sauvegardes/Photos-Lastours --dry-run
```

#### ✅ Puis, copier pour de vrai

```bash
npm run restore:backup -- --backup-dir /chemin/vers/ta/sauvegarde
```

**Exemple:**
```bash
npm run restore:backup -- --backup-dir ~/Desktop/Images-Chateau
```

---

### 3️⃣ Désactiver Git LFS

```bash
rm .gitattributes
```

---

### 4️⃣ Vérifier que tout est OK

```bash
npm run audit:images
```

Tu devrais voir "⚠️ Pointeurs LFS: 0" (ou un nombre beaucoup plus petit).

---

### 5️⃣ Commiter les changements

```bash
git add .
git commit -m "feat: restore missing LFS images from backup"
```

---

### 6️⃣ Pusher vers GitHub

#### Option A: Nouvelle branche (recommandé)

```bash
git checkout -b feat/images-restored
git push -u origin feat/images-restored
```

#### Option B: Nouveau repo (si tu veux repartir de zéro)

```bash
git remote remove origin
git remote add origin git@github.com:TON-USERNAME/nouveau-repo.git
git push -u origin main --force
```

---

## 🎨 Résumé Visuel

```
                          TON DOSSIER DE SAUVEGARDE
                                    ↓
                    [Script cherche automatiquement]
                                    ↓
                    ┌───────────────────────────────┐
                    │  102 fichiers trouvés ?       │
                    │  ✅ Oui → Copiés dans public/ │
                    │  ❌ Non → Liste des manquants │
                    └───────────────────────────────┘
                                    ↓
                    ┌───────────────────────────────┐
                    │  rm .gitattributes            │
                    │  (désactiver Git LFS)         │
                    └───────────────────────────────┘
                                    ↓
                    ┌───────────────────────────────┐
                    │  git add .                    │
                    │  git commit -m "..."          │
                    └───────────────────────────────┘
                                    ↓
                    ┌───────────────────────────────┐
                    │  git push                     │
                    │  (nouvelle branche ou repo)   │
                    └───────────────────────────────┘
                                    ↓
                              🎉 SUCCÈS !
```

---

## ❓ Questions Fréquentes

### Q: Où se trouve mon dossier de sauvegarde ?

Cherche un dossier qui contient tes photos du château. Ça peut être :
- `~/Desktop/Images-Chateau`
- `~/Documents/Photos-Lastours`
- `~/Downloads/Sauvegarde-Images`
- `/Volumes/MonDisqueDur/Backup`
- etc.

Le script va chercher **récursivement** dans tous les sous-dossiers !

---

### Q: Le script ne trouve pas tous les fichiers

C'est normal ! Plusieurs raisons possibles :
- Le nom du fichier est différent dans ta sauvegarde
- Le fichier n'existe pas dans ta sauvegarde
- Le fichier est dans un dossier caché (`.git`, etc.)

**Solution:** Le script te donnera la liste des fichiers non trouvés. Tu pourras :
- Les chercher manuellement
- Les ignorer si ce ne sont pas des images critiques
- Les remplacer par de nouvelles photos

---

### Q: Quels sont les fichiers les plus importants ?

🔴 **CRITIQUES (à restaurer en priorité):**
- Les 4 logos (navbar, footer)
- Photos du château (page d'accueil)
- Photos de bouteilles (page vins)

🟡 **MOINS CRITIQUES:**
- Photos de vignes
- Photos d'événements
- Photos de production

---

### Q: Et si je n'ai plus la sauvegarde ?

Deux options :
1. **Continuer sans** → Le site fonctionnera, mais avec des images placeholder
2. **Prendre de nouvelles photos** → Remplacer progressivement les manquantes

---

## 🎯 Action Immédiate

**ÉTAPE 1**: Dis-moi où se trouve ton dossier de sauvegarde

```bash
# Par exemple:
ls ~/Desktop      # Chercher dans le Bureau
ls ~/Documents    # Chercher dans Documents
ls ~/Downloads    # Chercher dans Téléchargements
```

**ÉTAPE 2**: Une fois que tu as le chemin, lance:

```bash
npm run restore:backup -- --backup-dir /le/chemin/trouvé --dry-run
```

---

## 📞 Besoin d'aide ?

Lance juste:
```bash
npm run list:missing
```

Et montre-moi le résultat ! Je pourrai t'aider à identifier où chercher les fichiers.

---

## ✅ Checklist Rapide

```
□ J'ai localisé mon dossier de sauvegarde
□ J'ai testé avec --dry-run
□ J'ai restauré les fichiers
□ J'ai vérifié avec npm run audit:images
□ J'ai supprimé .gitattributes
□ J'ai commité les changements
□ J'ai pushé vers GitHub
□ J'ai vérifié le preview Vercel
```

---

**🚀 Prêt ? Commence par:**

```bash
npm run list:missing
```

**Puis dis-moi où est ta sauvegarde !** 🎯

