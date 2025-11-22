# Quick Start - Composants Wines

Guide ultra-rapide pour utiliser les composants `WineCard` et `WineGrid`.

---

## 🚀 En 30 secondes

### Import
```tsx
import { WineCard, WineGrid } from "@/components/wines"
```

### Utilisation minimale
```tsx
<WineGrid>
  <WineCard
    name="Opus Blanc"
    subtitle="Blanc"
    imageSrc="/images/wines/blanc-opus-sf.png"
    href="/les-vins/opus-blanc"
  />
  <WineCard
    name="Opus Rouge"
    subtitle="Rouge"
    imageSrc="/images/wines/rouge-opus-sf.png"
    href="/les-vins/opus-rouge"
  />
</WineGrid>
```

**C'est tout ! ✨**

---

## 📖 Props essentielles

### WineCard

| Prop | Type | Obligatoire | Description |
|------|------|-------------|-------------|
| `name` | string | ✅ | Nom de la cuvée |
| `imageSrc` | string | ✅ | Chemin image (depuis /public) |
| `href` | string | ✅ | Lien vers page détail |
| `subtitle` | string | ❌ | Badge (ex: "Blanc", "Rouge") |
| `description` | string | ❌ | Description courte |

### WineGrid

| Prop | Type | Obligatoire | Description |
|------|------|-------------|-------------|
| `children` | ReactNode | ✅ | Composants WineCard |
| `className` | string | ❌ | Classes CSS additionnelles |

---

## 🎯 Cas d'usage fréquents

### 1. Liste simple
```tsx
<WineGrid>
  <WineCard name="Vin 1" imageSrc="..." href="..." />
  <WineCard name="Vin 2" imageSrc="..." href="..." />
  <WineCard name="Vin 3" imageSrc="..." href="..." />
</WineGrid>
```

### 2. Avec badges couleur
```tsx
<WineGrid>
  <WineCard name="Opus Blanc" subtitle="Blanc" imageSrc="..." href="..." />
  <WineCard name="Opus Rouge" subtitle="Rouge" imageSrc="..." href="..." />
</WineGrid>
```

### 3. Avec descriptions
```tsx
<WineCard
  name="Opus Blanc"
  subtitle="Blanc"
  description="Cuvée d'exception issue de nos meilleures parcelles"
  imageSrc="/images/wines/blanc-opus-sf.png"
  href="/les-vins/opus-blanc"
/>
```

### 4. Mapping depuis un tableau
```tsx
const vins = [
  { name: "Opus Blanc", slug: "opus-blanc", image: "...", color: "Blanc" },
  { name: "Opus Rouge", slug: "opus-rouge", image: "...", color: "Rouge" }
]

<WineGrid>
  {vins.map((vin) => (
    <WineCard
      key={vin.slug}
      name={vin.name}
      subtitle={vin.color}
      imageSrc={vin.image}
      href={`/les-vins/${vin.slug}`}
    />
  ))}
</WineGrid>
```

### 5. Avec les données lib/wines.ts
```tsx
import { gammes } from "@/lib/wines"

<WineGrid>
  {gammes[0].cuvees.map((cuvee) => (
    <WineCard
      key={cuvee.slug}
      name={cuvee.title}
      subtitle={cuvee.colorTag}
      imageSrc={cuvee.image || "/images/wines/placeholder.png"}
      href={cuvee.route}
    />
  ))}
</WineGrid>
```

---

## 📱 Responsive automatique

**Aucune configuration nécessaire !**

Le composant s'adapte automatiquement :
- **Mobile** : 2 colonnes
- **Tablette** : 3 colonnes  
- **Desktop** : 4 colonnes

---

## 🎨 Style Ruinart inclus

**Pas de CSS à ajouter !**

Tout est déjà intégré :
- ✅ Bouteilles uniformes (taille fixe)
- ✅ Espacement généreux
- ✅ Transitions douces
- ✅ Hover élégant
- ✅ Typographie légère

---

## 🖼️ Images

### Chemin attendu
```
/public/images/wines/blanc-opus-sf.png
```

### Dans le code
```tsx
imageSrc="/images/wines/blanc-opus-sf.png"
```

⚠️ **Important** : Le chemin commence par `/` (sans `public`)

---

## 🚨 Erreurs fréquentes

### ❌ Erreur 1 : Image not found
```tsx
// MAUVAIS
imageSrc="./public/images/wines/blanc-opus.png"

// BON
imageSrc="/images/wines/blanc-opus-sf.png"
```

### ❌ Erreur 2 : Props incorrectes
```tsx
// MAUVAIS (props obsolètes)
<WineCard title="..." color="..." image="..." link="..." />

// BON (nouvelles props)
<WineCard name="..." subtitle="..." imageSrc="..." href="..." />
```

### ❌ Erreur 3 : Oublier la key
```tsx
// MAUVAIS
{vins.map((vin) => <WineCard name={vin.name} ... />)}

// BON
{vins.map((vin) => <WineCard key={vin.slug} name={vin.name} ... />)}
```

---

## 📚 Aller plus loin

- **Documentation complète** → `README.md`
- **7 exemples détaillés** → `EXAMPLES.md`
- **Guide déploiement** → `DEPLOYMENT.md`

---

## ✅ Checklist rapide

Avant d'utiliser les composants :

- [ ] Images dans `/public/images/wines/`
- [ ] Nommage correct (minuscules, tirets)
- [ ] Import correct : `import { WineCard, WineGrid } from "@/components/wines"`
- [ ] Props obligatoires fournies : `name`, `imageSrc`, `href`
- [ ] Key unique dans les `.map()`

---

**C'est parti ! 🍷✨**

Vous êtes prêt à créer des pages de vins élégantes et professionnelles en quelques minutes.

