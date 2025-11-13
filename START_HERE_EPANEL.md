# 🚀 COMMENCE ICI - Déploiement ePanel

## 🎯 Tu es au bon endroit !

Ce guide va t'aider à mettre ton site **Château Lastours** en ligne sur ton hébergeur ePanel.

---

## 📚 J'ai Créé 7 Documents Pour Toi

### 🏃 Documents "Action"

| 📄 Document | 🎯 Utilité | ⏱️ Durée |
|------------|-----------|----------|
| **START_HERE_EPANEL.md** | ← Tu es ici ! Point de départ | 2 min |
| **QUICK_START_EPANEL.md** | Guide ultra-rapide en 5 étapes | 5 min |
| **prepare-epanel-deploy.sh** | Script automatique de préparation | 3-5 min |

### 📖 Documents "Référence"

| 📄 Document | 🎯 Utilité | ⏱️ Durée |
|------------|-----------|----------|
| **EPANEL_DEPLOYMENT_GUIDE.md** | Guide complet et détaillé (35+ pages) | 30 min |
| **EPANEL_CHECKLIST.md** | Checklist pour suivre ta progression | 40 min |
| **FILEZILLA_SETUP.md** | Configuration FileZilla avec visuels | 15 min |
| **EPANEL_README.md** | Vue d'ensemble et architecture | 10 min |

### 🔧 Fichiers Techniques

| 📄 Fichier | 🎯 Utilité |
|-----------|-----------|
| **.htaccess** | Configuration Apache (réécriture URLs, cache, sécurité) |

---

## 🎭 Quel Est Ton Profil ?

### 👤 Débutant Complet
> "C'est ma première fois, je ne connais pas FTP"

**Ton parcours :**
1. 📖 Lis **QUICK_START_EPANEL.md** (5 min)
2. 🔌 Configure FileZilla avec **FILEZILLA_SETUP.md** (15 min)
3. ✅ Suis la **EPANEL_CHECKLIST.md** étape par étape
4. 🆘 En cas de problème : section Dépannage dans **EPANEL_DEPLOYMENT_GUIDE.md**

⏱️ **Temps total estimé** : 45-60 minutes

---

### 🔧 Intermédiaire
> "Je connais FTP, mais c'est mon premier site Next.js"

**Ton parcours :**
1. ⚡ Lis **QUICK_START_EPANEL.md** (5 min)
2. 🚀 Lance `./prepare-epanel-deploy.sh` (3 min)
3. 📤 Upload via FileZilla le contenu de `out/` vers `public_html/`
4. ✅ Teste ton site

⏱️ **Temps total estimé** : 25-35 minutes

---

### 🚀 Expert
> "J'ai l'habitude, donne-moi juste les commandes"

**Ton parcours :**
```bash
# 1. Prépare le build
./prepare-epanel-deploy.sh

# 2. Upload via FTP (FileZilla ou ligne de commande)
# Contenu de out/ → public_html/

# 3. Configure SSL dans ePanel (Let's Encrypt)

# 4. Test et optimisation
```

⏱️ **Temps total estimé** : 15-20 minutes

---

## ⚡ Quick Start (Ultra-Rapide)

Si tu veux commencer MAINTENANT :

### 1️⃣ Prépare le Build (2-3 min)

```bash
cd "/Users/danyvassily/dev /chateaulastour-mvp/chateaulastour"
./prepare-epanel-deploy.sh
```

Attends le message : **"🎉 Tout est prêt pour le déploiement !"**

---

### 2️⃣ Télécharge FileZilla (2 min)

Si pas déjà installé : https://filezilla-project.org/download.php

---

### 3️⃣ Connecte-toi (3 min)

**Dans FileZilla** (en haut de la fenêtre) :
- **Hôte** : `ftp.tondomaine.com`
- **Utilisateur** : ton identifiant FTP
- **Mot de passe** : ton mot de passe FTP  
- **Port** : `21`
- Clique sur **"Connexion rapide"**

💡 Tu trouveras tes identifiants dans ton ePanel → Section "FTP Accounts"

---

### 4️⃣ Upload les Fichiers (15-30 min)

1. **À GAUCHE** : Va dans le dossier `out/`
2. **À DROITE** : Va dans `public_html/`
3. Sélectionne **TOUT** dans `out/` (Cmd+A / Ctrl+A)
4. Glisse-dépose de gauche à droite
5. ☕ Attends la fin de l'upload

---

### 5️⃣ Teste ! (1 min)

Ouvre ton navigateur :

```
https://tondomaine.com
```

✅ **Ça marche ?** → Félicitations ! 🎉  
❌ **Ça ne marche pas ?** → Consulte la section Dépannage ci-dessous

---

## 🆘 Dépannage Express

### 🔴 Erreur : Page blanche ou 404

**Solutions rapides :**
1. Vérifie que tu as uploadé le **contenu** de `out/`, pas le dossier lui-même
2. Vérifie que `index.html` est à la racine de `public_html/`
3. Vérifie que `.htaccess` est présent dans `public_html/`

**Guide détaillé :** `EPANEL_DEPLOYMENT_GUIDE.md` → Section "Dépannage"

---

### 🔴 Erreur : Images manquantes

**Solutions rapides :**
1. Vérifie que le dossier `_next/` est bien uploadé
2. Vérifie les permissions : dossiers = 755, fichiers = 644
3. Vide le cache de ton navigateur (Ctrl+Shift+R / Cmd+Shift+R)

---

### 🔴 Erreur : Routes ne fonctionnent pas

**Solutions rapides :**
1. Vérifie que `.htaccess` est présent et lisible
2. Dans FileZilla : Menu `Serveur` → `Forcer l'affichage des fichiers cachés`
3. Contacte ton hébergeur pour activer `mod_rewrite`

---

### 🔴 Erreur : Impossible de se connecter en FTP

**Solutions rapides :**
1. Double-vérifie tes identifiants dans ePanel
2. Essaye le port 21 (FTP) ou 22 (SFTP)
3. Contacte le support de ton hébergeur

---

## 📖 Documentation Complète

Pour tout comprendre en détail :

### 🏗️ Architecture et Processus
👉 **EPANEL_README.md**
- Vue d'ensemble du déploiement
- Architecture du projet
- Workflow de mise à jour

### 📋 Guide Pas-à-Pas
👉 **EPANEL_DEPLOYMENT_GUIDE.md**
- Guide complet de 35+ pages
- Tous les détails, toutes les étapes
- Section dépannage exhaustive

### ✅ Suivi de Progression
👉 **EPANEL_CHECKLIST.md**
- Checklist complète
- Cases à cocher pour suivre ton avancement
- Vérifications post-déploiement

### 🔌 Configuration FTP
👉 **FILEZILLA_SETUP.md**
- Configuration visuelle de FileZilla
- Captures d'écran et explications
- Paramètres optimaux

---

## 🎯 Prérequis

Avant de commencer, assure-toi d'avoir :

### Sur Ton Ordinateur
- [x] Node.js >= 18.0.0
- [x] pnpm >= 8.0.0  
- [ ] FileZilla installé

### Chez Ton Hébergeur
- [ ] Accès à ePanel
- [ ] Identifiants FTP
- [ ] Domaine configuré (pointant vers public_html/)

---

## 📊 Ce Qui Va Être Déployé

```
Ton Site Château Lastours
│
├── 📄 Pages (HTML statique)
│   ├── Page d'accueil
│   ├── Les Vins (+ pages individuelles)
│   ├── Le Domaine (histoire, terroir, équipe)
│   ├── Événements
│   ├── Réservation
│   ├── Club
│   └── Autres pages...
│
├── 🎨 Assets Next.js (_next/)
│   ├── CSS compilé et minifié
│   ├── JavaScript optimisé
│   ├── Images optimisées
│   └── Polices
│
├── 🖼️ Médias (public/)
│   ├── Photos des vins
│   ├── Photos du domaine
│   ├── PDFs (fiches techniques)
│   └── Autres assets
│
└── ⚙️ Configuration
    └── .htaccess (URLs propres, cache, sécurité)

Taille totale : ~6.7 Go
Nombre de fichiers : ~2500+
```

---

## ⏱️ Estimation des Temps

| Étape | Temps Estimé |
|-------|--------------|
| Préparation du build (script) | 3-5 min |
| Installation FileZilla | 2-3 min |
| Configuration FTP | 2-5 min |
| Upload des fichiers | 15-30 min |
| Configuration SSL | 2-3 min |
| Tests et vérifications | 5-10 min |
| **TOTAL** | **30-60 min** |

💡 Le temps d'upload dépend de ta connexion Internet

---

## 🎯 Prochaines Étapes Après Déploiement

Une fois ton site en ligne :

### Immédiat
- [ ] Teste toutes les pages principales
- [ ] Vérifie que les images s'affichent
- [ ] Teste la navigation
- [ ] Vérifie le responsive (mobile/tablette/desktop)

### Court Terme (24-48h)
- [ ] Configure Google Analytics (optionnel)
- [ ] Soumets ton sitemap à Google Search Console
- [ ] Teste les performances (PageSpeed Insights)
- [ ] Configure les sauvegardes automatiques

### Long Terme
- [ ] Optimise le SEO
- [ ] Configure un CDN (Cloudflare)
- [ ] Mets en place un monitoring
- [ ] Planifie les mises à jour

---

## 💡 Conseils Importants

### ✅ À FAIRE
- ✅ Toujours tester en local avant de déployer
- ✅ Sauvegarder l'ancien contenu du serveur
- ✅ Vérifier que `.htaccess` est bien uploadé
- ✅ Tester sur différents navigateurs
- ✅ Vider le cache après l'upload

### ❌ À NE PAS FAIRE
- ❌ Modifier les fichiers directement sur le serveur
- ❌ Fermer FileZilla pendant l'upload
- ❌ Oublier de copier le fichier .htaccess
- ❌ Upload le dossier `out/` au lieu de son contenu
- ❌ Oublier d'activer le SSL/HTTPS

---

## 📞 Besoin d'Aide ?

### Documentation Interne
1. **QUICK_START_EPANEL.md** - Pour démarrer vite
2. **EPANEL_DEPLOYMENT_GUIDE.md** - Guide complet
3. **FILEZILLA_SETUP.md** - Configuration FTP

### Support Hébergeur
Contacte le support de ton hébergeur avec :
- Description précise du problème
- URL concernée
- Message d'erreur (copie exacte)
- Capture d'écran si possible

### Outils de Test
- 🔍 Google PageSpeed Insights : https://pagespeed.web.dev/
- 📊 GTmetrix : https://gtmetrix.com/
- 🌐 SSL Labs : https://www.ssllabs.com/ssltest/

---

## 🎉 Prêt à Commencer ?

### Choisis Ta Méthode

**Méthode Rapide** (si tu es pressé)
```bash
./prepare-epanel-deploy.sh
# Puis upload via FileZilla
```

**Méthode Guidée** (si tu veux tout comprendre)
👉 Ouvre **QUICK_START_EPANEL.md**

**Méthode Complète** (pour tout maîtriser)
👉 Ouvre **EPANEL_DEPLOYMENT_GUIDE.md**

---

## ✨ Ce Qui Est Inclus

Ton déploiement inclut automatiquement :

### 🚀 Performance
- ✅ Compression Gzip activée
- ✅ Mise en cache optimisée (1 an pour les assets)
- ✅ CSS et JS minifiés
- ✅ Images optimisées

### 🔒 Sécurité
- ✅ Redirection HTTP → HTTPS forcée
- ✅ En-têtes de sécurité (XSS, Clickjacking, etc.)
- ✅ Protection des fichiers sensibles
- ✅ Content Security Policy

### 🎯 SEO
- ✅ URLs propres et SEO-friendly
- ✅ Meta tags optimisés
- ✅ Sitemap.xml
- ✅ Structured data

### 🌐 Fonctionnalités
- ✅ Routes Next.js fonctionnelles
- ✅ Page 404 personnalisée
- ✅ Support trailing slash
- ✅ Gestion automatique des redirections

---

## 🏁 C'est Parti !

Tu as maintenant tout ce qu'il faut pour déployer ton site ! 🍷

**Prochaine action :** Lance le script de préparation

```bash
./prepare-epanel-deploy.sh
```

Puis suis les instructions qui s'affichent ! 

---

**Bonne chance et bon déploiement ! 🚀**

*P.S. : N'oublie pas de célébrer avec une bonne bouteille une fois que ton site sera en ligne ! 🍾*
