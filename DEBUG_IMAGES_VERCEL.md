# Guide de Débogage - Images Non Affichées sur Vercel

## 🔍 Diagnostic du Problème

### Problème Identifié
Les images ne s'affichent pas sur le site Vercel : `https://chateauxlastversion-3s5yxi2u5-danyvassilys-projects.vercel.app/`

### Causes Possibles

1. **Preview Deployment Protégé (401)**
   - Le déploiement preview nécessite une authentification
   - Les images peuvent être bloquées par la protection

2. **Chemins d'Images Incorrects**
   - Les chemins dans le code ne correspondent pas aux fichiers réels
   - Problèmes de casse (majuscules/minuscules)

3. **Configuration Next.js Image**
   - Problème avec l'optimisation automatique
   - Images non trouvées par le système d'optimisation

4. **Build Incomplet**
   - Les images ne sont pas incluses dans le build
   - Problème de déploiement

---

## ✅ Vérifications à Effectuer

### 1. Vérifier les Chemins d'Images

Les images doivent être dans `public/` et les chemins doivent correspondre exactement :

```bash
# Vérifier que les images existent
ls -la public/images/gastronomy/repas-vins-lastours.jpg
ls -la public/page/gastronomie-art-de-table-manque-eventuel-photo-chambrage/*.jpg
```

### 2. Vérifier la Console du Navigateur

Ouvrir la console du navigateur (F12) et vérifier :
- Erreurs 404 pour les images
- Erreurs de CORS
- Erreurs de chargement

### 3. Vérifier les URLs des Images

Les images Next.js sont servies via `/_next/image` :
- URL attendue : `/_next/image?url=/images/gastronomy/repas-vins-lastours.jpg&w=1920&q=75`

### 4. Tester l'Accès Direct aux Images

Tester l'accès direct aux images (si le déploiement le permet) :
```
https://chateauxlastversion-3s5yxi2u5-danyvassilys-projects.vercel.app/images/gastronomy/repas-vins-lastours.jpg
```

---

## 🔧 Solutions à Essayer

### Solution 1 : Vérifier le Build Local

```bash
cd chateaulastour
pnpm build
pnpm start
```

Vérifier que les images s'affichent en local.

### Solution 2 : Vérifier la Configuration Next.js

La configuration actuelle est correcte, mais vérifier qu'il n'y a pas de `unoptimized: true` global :

```javascript
// next.config.mjs
images: {
  // Pas de unoptimized: true ici
  formats: ["image/avif", "image/webp"],
  // ...
}
```

### Solution 3 : Ajouter un Domaine d'Image Externe (si nécessaire)

Si les images viennent d'un domaine externe, ajouter dans `next.config.mjs` :

```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "votre-domaine.com",
    },
  ],
}
```

### Solution 4 : Vérifier le Déploiement Production

Le preview deployment peut avoir des restrictions. Vérifier sur le déploiement production :
- Aller sur Vercel Dashboard
- Vérifier le déploiement production (pas preview)
- Tester les images sur le domaine de production

### Solution 5 : Activer les Logs de Débogage

Ajouter temporairement des logs pour déboguer :

```tsx
<Image
  src="/images/gastronomy/repas-vins-lastours.jpg"
  alt="..."
  fill
  onError={(e) => {
    console.error("Image error:", e);
    console.error("Image src:", "/images/gastronomy/repas-vins-lastours.jpg");
  }}
  onLoad={() => {
    console.log("Image loaded successfully");
  }}
/>
```

---

## 🚨 Actions Immédiates

1. **Vérifier le Build Local**
   ```bash
   pnpm build
   pnpm start
   ```
   Si les images fonctionnent en local, le problème est lié au déploiement Vercel.

2. **Vérifier les Logs Vercel**
   - Aller sur Vercel Dashboard
   - Vérifier les logs du déploiement
   - Chercher les erreurs liées aux images

3. **Vérifier le Déploiement Production**
   - Le preview deployment peut avoir des restrictions
   - Tester sur le domaine de production

4. **Vérifier la Console du Navigateur**
   - Ouvrir F12 sur le site Vercel
   - Vérifier les erreurs dans l'onglet Console
   - Vérifier les requêtes dans l'onglet Network

---

## 📝 Checklist de Débogage

- [ ] Les images existent dans `public/`
- [ ] Les chemins dans le code correspondent aux fichiers
- [ ] Le build local fonctionne
- [ ] Pas d'erreurs dans la console du navigateur
- [ ] Les URLs des images sont correctes
- [ ] Le déploiement production fonctionne (pas seulement preview)
- [ ] Les logs Vercel ne montrent pas d'erreurs

---

## 🔗 Ressources

- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Vercel Image Optimization](https://vercel.com/docs/image-optimization)
- [Vercel Deployment Troubleshooting](https://vercel.com/docs/troubleshooting)

