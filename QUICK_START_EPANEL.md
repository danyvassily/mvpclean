# 🚀 Quick Start - Déploiement ePanel en 5 Minutes

## ⚡ Pour les Pressés

### 1️⃣ Prépare le Build (2 min)

```bash
cd "/Users/danyvassily/dev /chateaulastour-mvp/chateaulastour"
./prepare-epanel-deploy.sh
```

Attends que le script termine. Tu verras un message "🎉 Tout est prêt pour le déploiement !"

---

### 2️⃣ Télécharge FileZilla (si pas déjà fait)

👉 https://filezilla-project.org/download.php?type=client

---

### 3️⃣ Connecte-toi à ton Serveur

**Dans FileZilla :**

| Champ | Valeur |
|-------|--------|
| Hôte | `ftp.tondomaine.com` |
| Nom d'utilisateur | Ton identifiant FTP |
| Mot de passe | Ton mot de passe FTP |
| Port | `21` |

Clique sur **Connexion rapide**

---

### 4️⃣ Upload les Fichiers (15-30 min)

1. **À gauche** : Navigue vers le dossier `out/` de ton projet
2. **À droite** : Navigue vers `public_html/`
3. Sélectionne **TOUT** dans `out/` (Cmd+A ou Ctrl+A)
4. Glisse-dépose vers `public_html/`
5. ☕ Prends un café pendant l'upload !

---

### 5️⃣ Teste ton Site

Ouvre ton navigateur et va sur :

```
https://tondomaine.com
```

✅ Si ça marche : **Félicitations !** 🎉

❌ Si ça ne marche pas : Consulte `EPANEL_DEPLOYMENT_GUIDE.md` (section Dépannage)

---

## 📋 Checklist Ultra-Rapide

- [ ] Script exécuté et terminé avec succès
- [ ] FileZilla installé et configuré
- [ ] Fichiers uploadés dans `public_html/`
- [ ] Site accessible en HTTPS
- [ ] Navigation et images fonctionnent

---

## 🆘 Problèmes Courants

### Le site n'affiche rien

➡️ Vérifie que tu as uploadé le **contenu** de `out/`, pas le dossier lui-même

### Les routes ne marchent pas

➡️ Vérifie que le fichier `.htaccess` est bien dans `public_html/`

### Les images ne s'affichent pas

➡️ Vérifie que le dossier `_next/` est bien uploadé

---

## 📚 Documentation Complète

Pour plus de détails, consulte :

- 📖 **Guide complet** : `EPANEL_DEPLOYMENT_GUIDE.md`
- ✅ **Checklist détaillée** : `EPANEL_CHECKLIST.md`

---

## 🔄 Mises à Jour Futures

Pour mettre à jour ton site :

```bash
# 1. Modifie ton code
# 2. Relance le script
./prepare-epanel-deploy.sh

# 3. Re-upload via FTP (uniquement les fichiers modifiés)
```

---

**Temps total estimé** : 20-40 minutes (dont 15-30 min d'upload)

Bonne chance ! 🍷✨
