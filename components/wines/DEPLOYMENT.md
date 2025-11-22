# Guide Déploiement - Composants Wines

Guide spécifique pour le déploiement des composants `WineCard` et `WineGrid` sur Vercel avec GitHub.

---

## ✅ Checklist pré-déploiement

### 1. Assets Images

#### Vérifier la structure
```bash
# Lister tous les fichiers PNG de bouteilles
ls -la public/images/wines/*.png
ls -la public/images/vins/*.png
```

#### Contraintes obligatoires
- ✅ **Emplacement** : `/public/images/wines/` ou `/public/images/vins/`
- ✅ **Format** : PNG avec fond transparent
- ✅ **Nommage** : 
  - Tout en minuscules
  - Tirets (pas d'underscores)
  - Pas d'accents, pas d'espaces
  - Exemples valides : `blanc-opus-sf.png`, `rouge-domeni-sf.png`
  - ❌ Exemples invalides : `Blanc Opus.png`, `rouge_domeni.PNG`

#### Optimisation recommandée
```bash
# Installer sharp (déjà inclus avec Next.js)
npm install sharp

# Les images seront automatiquement optimisées par Next.js
# Pas besoin de script manuel si vous utilisez next/image
```

---

### 2. Imports et Chemins

#### ✅ Chemins absolus (recommandé)
```tsx
import { WineCard, WineGrid } from "@/components/wines"
import Image from "next/image"

<Image src="/images/wines/blanc-opus-sf.png" ... />
```

#### ❌ Chemins relatifs (à éviter)
```tsx
// NE PAS FAIRE
import { WineCard } from "../../components/wines/WineCard"
import Image from "../../../public/images/wines/blanc-opus.png"
```

---

### 3. Configuration Next.js

Vérifier `next.config.js` :

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Active l'optimisation d'images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domaines autorisés si images externes (pas le cas ici)
    // domains: [],
  },
  
  // Autres configs...
}

module.exports = nextConfig
```

---

### 4. Variables d'environnement

Aucune variable d'environnement spécifique nécessaire pour ces composants.

Si vous ajoutez un CDN pour les images :

```env
# .env.local
NEXT_PUBLIC_CDN_URL=https://cdn.example.com
```

Puis dans le code :

```tsx
const imageUrl = process.env.NEXT_PUBLIC_CDN_URL 
  ? `${process.env.NEXT_PUBLIC_CDN_URL}/wines/blanc-opus-sf.png`
  : "/images/wines/blanc-opus-sf.png"

<Image src={imageUrl} ... />
```

---

## 🚀 Déploiement sur Vercel

### 1. Via GitHub (recommandé)

#### Push sur GitHub
```bash
git add .
git commit -m "feat: Add Ruinart-style wine components"
git push origin main
```

#### Configuration Vercel
1. Connecter le repo GitHub à Vercel
2. **Framework Preset** : Next.js
3. **Root Directory** : `.` (racine)
4. **Build Command** : `npm run build` (par défaut)
5. **Output Directory** : `.next` (par défaut)

#### Variables d'environnement Vercel
Si nécessaire, ajouter dans Vercel Dashboard → Settings → Environment Variables :
```
NEXT_PUBLIC_SITE_URL=https://chateaulastours.com
```

---

### 2. Déploiement manuel (alternative)

#### Build local
```bash
# Installer les dépendances
npm install

# Build de production
npm run build

# Tester le build localement
npm start
```

#### Deploy CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🔍 Tests pré-déploiement

### 1. Build local
```bash
npm run build
```

**Vérifier qu'il n'y a pas d'erreurs** :
- ✅ Pas d'erreur TypeScript
- ✅ Pas d'erreur de build
- ✅ Pas d'images manquantes
- ✅ Pas de chemins cassés

### 2. Test en dev
```bash
npm run dev
```

**Tester manuellement** :
- ✅ Toutes les bouteilles s'affichent
- ✅ Les images ne sont pas crop
- ✅ Le hover fonctionne
- ✅ Les liens sont corrects
- ✅ Responsive sur mobile/tablette/desktop

### 3. Lighthouse
```bash
# Ouvrir Chrome DevTools
# Onglet Lighthouse
# Cocher : Performance, Accessibility, Best Practices, SEO
# Generate report
```

**Objectifs** :
- Performance : > 90
- Accessibility : > 95
- Best Practices : > 95
- SEO : > 90

---

## ⚠️ Erreurs courantes et solutions

### Erreur : Image not found

**Symptôme** :
```
Error: Image not found: /images/wines/blanc-opus-sf.png
```

**Solutions** :
1. Vérifier que le fichier existe dans `/public/images/wines/`
2. Vérifier le nommage (minuscules, tirets)
3. Vérifier le chemin (commence par `/`, pas `./`)
4. Relancer le serveur de dev après ajout d'images

---

### Erreur : Invalid src prop

**Symptôme** :
```
Error: Invalid src prop on `next/image`
```

**Solutions** :
1. Utiliser un chemin absolu depuis `/public` :
   ```tsx
   src="/images/wines/blanc-opus-sf.png" // ✅
   src="./images/wines/blanc-opus-sf.png" // ❌
   ```

2. Ou configurer un domaine externe dans `next.config.js`

---

### Erreur : Images trop lourdes

**Symptôme** :
Build warning : "Image optimization taking too long"

**Solutions** :
1. Réduire la taille des PNGs source :
   ```bash
   # Installer imagemagick
   brew install imagemagick
   
   # Optimiser
   mogrify -resize 400x1200 -quality 85 public/images/wines/*.png
   ```

2. Utiliser des WebP (Next.js le fait automatiquement avec `next/image`)

---

### Erreur : TypeScript

**Symptôme** :
```
Type error: Property 'subtitle' does not exist on type 'WineCardProps'
```

**Solution** :
Vérifier que vous utilisez les bons props définis dans `WineCard.tsx` :
```tsx
// ✅ Correct
<WineCard name="..." subtitle="..." imageSrc="..." href="..." />

// ❌ Incorrect (props qui n'existent plus)
<WineCard title="..." color="..." image="..." link="..." />
```

---

## 📊 Performance Vercel

### Monitoring

1. **Vercel Analytics** : Activer dans le dashboard
2. **Core Web Vitals** : Surveiller LCP, FID, CLS
3. **Logs** : Vérifier dans Vercel → Logs

### Optimisations automatiques Vercel

- ✅ **Image Optimization** : Automatique avec `next/image`
- ✅ **CDN Global** : Distribution mondiale des assets
- ✅ **Edge Caching** : Cache intelligent
- ✅ **Compression** : Gzip/Brotli automatique
- ✅ **HTTP/3** : Support automatique

### Optimisations manuelles

#### 1. Lazy loading images
```tsx
<WineCard
  // ...
  loading="lazy" // Ajouter cette prop si nécessaire
/>
```

#### 2. Priority pour images above-the-fold
```tsx
{gamme.cuvees.map((cuvee, index) => (
  <WineCard
    // ...
    priority={index < 4} // 4 premières bouteilles en priority
  />
))}
```

#### 3. Preload critical assets
```tsx
// app/layout.tsx
<head>
  <link
    rel="preload"
    as="image"
    href="/images/wines/blanc-opus-sf.png"
  />
</head>
```

---

## 🔒 Sécurité

### Headers recommandés

Ajouter dans `next.config.js` :

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}
```

### CSP (Content Security Policy)

Si vous utilisez un CDN externe pour les images, configurer CSP :

```js
// next.config.js
{
  key: 'Content-Security-Policy',
  value: "img-src 'self' https://cdn.example.com data:;"
}
```

---

## 📝 Checklist finale

Avant de déployer en production :

- [ ] ✅ Toutes les images sont dans `/public/images/wines/`
- [ ] ✅ Nommage correct (minuscules, tirets, pas d'accents)
- [ ] ✅ Build local réussi (`npm run build`)
- [ ] ✅ Tests manuels en dev OK
- [ ] ✅ Lighthouse score > 90 sur tous les critères
- [ ] ✅ Pas d'erreur TypeScript
- [ ] ✅ Pas d'erreur de linter
- [ ] ✅ Responsive testé (mobile, tablette, desktop)
- [ ] ✅ Accessibilité vérifiée (focus, alt texts)
- [ ] ✅ Links fonctionnels
- [ ] ✅ Hover effects OK
- [ ] ✅ Git commit + push
- [ ] ✅ Vercel deploy lancé
- [ ] ✅ Preview URL testée
- [ ] ✅ Production URL validée

---

## 🐛 Debug en production

### Vérifier les logs Vercel

```bash
# CLI
vercel logs <deployment-url>

# Ou dans le dashboard Vercel
# → Project → Deployments → Logs
```

### Tester en local avec build de prod

```bash
# Build
npm run build

# Servir en local
npm start

# Ou avec Vercel CLI
vercel dev --prod
```

### Comparer preview vs production

1. Déployer sur une branche feature
2. Obtenir l'URL preview Vercel
3. Comparer avec production
4. Merger si OK

---

## 📞 Support

### Ressources officielles

- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Vercel Analytics](https://vercel.com/docs/analytics)

### En cas de problème

1. Vérifier les logs Vercel
2. Tester en local avec build de prod
3. Comparer avec l'environnement de dev
4. Consulter la documentation Next.js/Vercel

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2024  
**Statut** : ✅ Prêt pour déploiement

