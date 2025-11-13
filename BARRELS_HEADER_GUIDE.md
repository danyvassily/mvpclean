# 🍷 Guide : Remplacer l'Image Header par les Tonneaux

## 📂 **Fichier à Remplacer :**
```
/public/images/wines/wine-barrels-header.jpg
```

## 🔄 **Comment Procéder :**

### **Étape 1 : Sauvegarder Votre Image**
1. Enregistrez votre image des tonneaux
2. Renommez-la en : `wine-barrels-header.jpg`
3. Format recommandé : **JPG** ou **PNG**
4. Résolution optimale : **1920x1080px** ou plus

### **Étape 2 : Remplacer le Fichier**
Remplacez le fichier placeholder existant :
```bash
# Depuis votre dossier du projet
cp /chemin/vers/votre/image.jpg public/images/wines/wine-barrels-header.jpg
```

### **Étape 3 : Vérifier le Résultat**
- Rechargez la page `/les-vins`
- L'animation se déclenchera automatiquement
- Durée : **3.5 secondes** d'animation d'entrée

## 🎬 **Animations Créées :**

### **HeroBarrelsAnimation** 
- ✅ **Zoom + Déflou** : L'image apparaît avec un zoom et se défloute progressivement
- ✅ **Rotation subtile** : Légère rotation au début pour un effet dramatique  
- ✅ **Parallax** : L'image bouge différemment du scroll
- ✅ **Grain animé** : Texture cinématographique en mouvement
- ✅ **Particules flottantes** : 25 particules qui montent et dérivent
- ✅ **Gradient dynamique** : L'overlay s'assombrit au scroll

### **Séquence d'Animation :**
1. **0-2.5s** : Zoom out + déflou de l'image
2. **0.3-3.3s** : Rotation de l'image vers sa position finale
3. **1-2.5s** : Apparition du gradient overlay
4. **1.5-3.5s** : Montée du grain cinématographique
5. **3.5s+** : Animation continue du grain et des particules

### **Effets au Scroll :**
- **Parallax** : L'image descend plus lentement que le contenu
- **Assombrissement** : Le gradient devient plus opaque
- **Zoom out** : L'image rapetisse légèrement

## 🎨 **Caractéristiques du Header :**

- **Taille** : **100vh** (plein écran)
- **Position** : Centrée
- **Filtres** : Contraste et saturation améliorés
- **Overlay** : Gradient noir avec 3 points d'arrêt
- **Grain** : Pattern SVG fractal avec 3 octaves
- **Particules** : Mouvement vertical + dérive latérale

## 🚀 **Performance :**

- **Optimisé GSAP** : Cleanup automatique des animations
- **ScrollTrigger** : Synchronisation fluide avec le scroll
- **Hardware acceleration** : Transform3D pour les performances
- **Responsive** : Texte adaptatif pour mobile/tablet/desktop

## 🎯 **Résultat Final :**

Une **animation d'entrée spectaculaire** de 3.5 secondes qui transforme votre image des tonneaux en un header cinématographique avec :
- Effet de **révélation dramatique**
- **Particules atmosphériques** 
- **Grain vintage** en mouvement
- **Parallax fluide** au scroll
- **Typographie premium** superposée

**L'image prendra toute la place du header** et créera une expérience immersive parfaite pour présenter vos collections de vins ! 🍷✨
