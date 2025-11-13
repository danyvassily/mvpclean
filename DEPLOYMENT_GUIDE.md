# 🚀 Guide de Déploiement - Château Lastours

Ce guide vous permet de déployer l'application sur GitHub et Netlify.

## 📋 Prérequis

- Node.js 18+ installé
- pnpm installé (`npm install -g pnpm`)
- Compte GitHub avec accès SSH configuré
- Compte Netlify

## 🔧 Configuration Git

### 1. Vérifier la configuration du remote

```bash
cd "/Users/danyvassily/dev /chateaulastour-mvp/chateaulastour"
git remote -v
```

### 2. Mettre à jour le remote (si nécessaire)

```bash
# Si le remote n'existe pas encore
git remote add origin git@github.com:danyvassily/chateauxlastversion.git

# Ou si vous voulez remplacer l'existant
git remote set-url origin git@github.com:danyvassily/chateauxlastversion.git
```

### 3. Vérifier l'état du dépôt

```bash
git status
```

## 📦 Préparation du Build

### 1. Nettoyer les anciens builds

```bash
pnpm run clean
```

### 2. Vérifier que les dépendances sont à jour

```bash
pnpm install
```

### 3. Tester le build localement

```bash
pnpm run build
```

Le build devrait créer un dossier `out/` avec tous les fichiers statiques.

### 4. Tester le build localement (optionnel)

```bash
pnpm run start
# Ou servez le dossier out/ avec un serveur statique
```

## 🔐 Configuration SSH GitHub (si nécessaire)

Si vous n'avez pas encore configuré SSH avec GitHub :

```bash
# Vérifier si une clé SSH existe
ls -la ~/.ssh/id_ed25519.pub

# Si elle n'existe pas, en créer une
ssh-keygen -t ed25519 -C "votre.email@example.com"

# Afficher la clé publique
cat ~/.ssh/id_ed25519.pub

# Ajouter la clé dans GitHub :
# 1. Aller sur GitHub > Settings > SSH and GPG keys
# 2. Cliquer sur "New SSH key"
# 3. Coller le contenu de la clé publique
```

## 📤 Push sur GitHub

### 1. Ajouter tous les fichiers modifiés

```bash
# Vérifier ce qui sera ajouté
git status

# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Ou ajouter fichier par fichier si vous préférez
git add package.json netlify.toml next.config.mjs
```

### 2. Créer un commit

```bash
git commit -m "feat: Application prête pour le déploiement Netlify

- Configuration build statique Next.js
- Correction route paiement-stub pour export statique
- Configuration Netlify optimisée
- Mise à jour repository GitHub"
```

### 3. Pusher sur GitHub

```bash
# Pour la première fois
git push -u origin main

# Pour les push suivants
git push origin main
```

**Note :** Si vous avez des conflits avec l'historique existant sur GitHub, vous pouvez forcer le push (⚠️ attention, cela écrase l'historique) :

```bash
git push -u origin main --force
```

## 🌐 Déploiement sur Netlify

### Option 1 : Déploiement via GitHub (Recommandé)

1. **Connecter Netlify à GitHub**
   - Aller sur [Netlify](https://app.netlify.com)
   - Cliquer sur "Add new site" > "Import an existing project"
   - Choisir "GitHub" et autoriser Netlify
   - Sélectionner le repository `chateauxlastversion`

2. **Configuration du build**
   - **Build command :** `pnpm install --frozen-lockfile && pnpm run build`
   - **Publish directory :** `out`
   - **Branch to deploy :** `main`

3. **Variables d'environnement** (si nécessaire)
   - Dans les paramètres du site sur Netlify
   - Aller dans "Site settings" > "Environment variables"
   - Ajouter les variables nécessaires (actuellement aucune n'est requise)

4. **Déployer**
   - Netlify détectera automatiquement les changements sur GitHub
   - Ou cliquez sur "Trigger deploy" > "Deploy site"

### Option 2 : Déploiement manuel (Drag & Drop)

1. **Build local**
   ```bash
   pnpm run build
   ```

2. **Zipper le dossier out/**
   ```bash
   cd out
   zip -r ../chateau-lastours-build.zip .
   cd ..
   ```

3. **Uploader sur Netlify**
   - Aller sur [Netlify](https://app.netlify.com)
   - Cliquer sur "Add new site" > "Deploy manually"
   - Glisser-déposer le fichier `chateau-lastours-build.zip`

## ✅ Vérification du Déploiement

### 1. Vérifier le build Netlify

- Aller dans l'onglet "Deploys" de votre site Netlify
- Vérifier que le build est en "Published"

### 2. Tester le site

- Ouvrir l'URL fournie par Netlify (format : `https://[nom-du-site].netlify.app`)
- Vérifier que toutes les pages fonctionnent
- Tester les routes dynamiques (`/les-vins/[slug]`, etc.)

### 3. Vérifier les redirections

Les redirections configurées dans `netlify.toml` devraient fonctionner automatiquement :
- `/home` → `/`
- `/la-vigne` → `/le-cycle-de-la-vigne/`
- `/notre-chai` → `/de-la-vigne-a-la-bouteille/`
- etc.

## 🔄 Mises à jour futures

Pour déployer des mises à jour :

1. **Faire les modifications** dans votre code
2. **Tester localement** : `pnpm run dev`
3. **Commit et push** :
   ```bash
   git add .
   git commit -m "feat: description des changements"
   git push origin main
   ```
4. **Netlify déploiera automatiquement** (si connecté à GitHub)

## 🐛 Résolution de problèmes

### Build échoue sur Netlify

1. Vérifier les logs de build dans Netlify
2. Vérifier que toutes les dépendances sont dans `package.json`
3. Vérifier que la version de Node.js correspond (18+)

### Les images ne s'affichent pas

- Vérifier que les fichiers dans `public/` sont bien commités
- Vérifier les chemins dans le code (doivent être relatifs à `/`)

### Les routes dynamiques ne fonctionnent pas

- Vérifier que `netlify.toml` contient les bonnes redirections
- Vérifier que `next.config.mjs` a `output: "export"`

### Erreur "Module not found"

- Vérifier que `pnpm-lock.yaml` est commité
- Vérifier que toutes les dépendances sont dans `package.json`

## 📝 Structure des fichiers importants

```
chateaulastour/
├── package.json          # Configuration projet et scripts
├── next.config.mjs       # Configuration Next.js (export statique)
├── netlify.toml          # Configuration Netlify (redirections, headers)
├── .gitignore           # Fichiers ignorés par Git
├── tsconfig.json        # Configuration TypeScript
└── out/                 # Dossier généré par le build (ne pas commiter)
```

## 🔗 Liens utiles

- **Repository GitHub :** https://github.com/danyvassily/chateauxlastversion
- **Documentation Next.js :** https://nextjs.org/docs
- **Documentation Netlify :** https://docs.netlify.com
- **Netlify Status :** https://www.netlifystatus.com

## 📞 Support

Pour toute question ou problème :
- Vérifier les logs de build Netlify
- Consulter la documentation Next.js
- Ouvrir une issue sur GitHub

---

**Dernière mise à jour :** $(date)
