# 🎠 Guide d'Utilisation - Carrousels d'Images Produits

## Carrousels sur les Pages de Catégories et Sous-Catégories

Les carrousels d'images sont maintenant intégrés directement sur les pages de catégories et sous-catégories de votre boutique !

## 🎯 Fonctionnalités

### ✅ Caractéristiques intégrées :
- **Navigation fluide** avec flèches gauche/droite
- **Indicateurs visuels** (compteur et points)
- **Mode responsive** (adapté mobile/desktop)
- **Effets hover** pour meilleure UX
- **Détection automatique** (carrousel seulement si plusieurs images)

### 🎨 Design :
- **Fonds semi-transparents** pour les boutons
- **Ombres et effets** modernes
- **Tailles adaptatives** selon l'écran
- **Animation douce** au changement d'image

## 📋 Ajout d'Images à un Produit

Pour ajouter un carrousel à un produit, modifiez `src/data/products.ts` :

```typescript
{
  id: "votre-id",
  name: "Votre Produit",
  image: "/images/products/votre-image-principale.png",
  images: [                    // ← Ajouter ce tableau
    "/images/products/votre-image-principale.png",
    "/images/products/votre-image-2.png",
    "/images/products/votre-image-3.png"
  ],
  // ... autres propriétés
}
```

### 🔄 Comportement automatique :
- **1 seule image** → Affichage simple sans carrousel
- **2+ images** → Carrousel avec navigation activée

## 📁 Structure des fichiers

### Composant principal :
```
src/components/boutique/ProductCarousel.tsx
```

### Intégration :
```
src/app/boutique/BoutiqueClient.tsx (ligne 476)
```

## 🎯 Exemples d'utilisation

### Produit avec carrousel (T-Shirt) :
```typescript
{
  id: "27",
  name: "T-Shirt Personnalisé",
  image: "/images/products/t-shirt-personnalise.png",
  images: [
    "/images/products/t-shirt-kael.png",
    "/images/products/t-shirt-kael1.png", 
    "/images/products/t-shirt-lara.png",
    "/images/products/t-shirt-philou.png"
  ],
  // ...
}
```

### Produit simple (1 image) :
```typescript
{
  id: "1",
  name: "Étiquette Bouteille d'Eau",
  image: "/images/products/etiquette-bouteille-eau.png",
  // Pas de propriété "images" → affichage simple
  // ...
}
```

## 🎨 Personnalisation du Carrousel

Pour modifier le style du carrousel, éditez `src/components/boutique/ProductCarousel.tsx` :

### Taille des boutons :
```typescript
className="h-8 w-8 md:h-10 md:w-10"  // Mobile / Desktop
```

### Couleurs et effets :
```typescript
className="bg-white/80 backdrop-blur-sm shadow-md"  // Boutons
className="bg-black/70 backdrop-blur-sm"           // Compteur
```

### Animations :
```typescript
className="transition-transform duration-300 hover:scale-105"
```

## 📱 Responsive Design

Le carrousel s'adapte automatiquement :

- **Mobile** : Boutons plus petits, espacement réduit
- **Desktop** : Boutons plus grands, meilleure visibilité
- **Touch** : Navigation par swipe possible (à implémenter si besoin)

## 🚀 Performance

- **Chargement optimisé** avec Next.js Image
- **Lazy loading** intégré
- **Compression automatique** des images
- **Cache intelligent** pour navigation rapide

## 🔧 Maintenance

### Pour ajouter de nouvelles images :
1. **Uploadez les images** dans `public/images/products/`
2. **Appliquez le style** avec le script de stylisation
3. **Ajoutez les chemins** dans le tableau `images` du produit
4. **Testez sur localhost** avant déploiement

### Pour supprimer des images :
1. **Retirez les chemins** du tableau `images`
2. **Gardez l'image principale** dans la propriété `image`
3. **Supprimez les fichiers** inutiles du dossier

---

## 🎉 Résultat

Vos clients peuvent maintenant :
- **Voir plusieurs angles** de chaque produit
- **Naviguer facilement** entre les images
- **Avoir une expérience immersive** directement depuis les catégories
- **Bénéficier d'un design moderne** et professionnel

*Carrousels intégrés avec succès sur Jay's Creations Design* 🎨
