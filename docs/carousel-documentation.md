# Documentation Système Carrousel Images Produits

## Vue d'ensemble

Un système de carrousel complet et réutilisable pour les images produits, avec activation conditionnelle automatique basée sur le nombre d'images disponibles.

## Architecture

### Composants principaux

1. **`ImageCarousel`** (`src/components/ui/ImageCarousel.tsx`)
   - Composant universel de carrousel
   - Supporte 2 variants : `category` et `product`
   - Gère automatiquement le cas d'une seule image

2. **`ProductCard`** (`src/components/ui/ProductCard.tsx`)
   - Carte produit intelligente avec carrousel intégré
   - Active le carrousel uniquement si plusieurs images

3. **`ProductCarousel`** (`src/components/boutique/ProductCarousel.tsx`)
   - Wrapper pour les fiches produits
   - Utilise le variant `product` avec thumbnails

4. **`ProductGallery`** (`src/components/produit/ProductGallery.tsx`)
   - Galerie complète pour les pages produit
   - Configuration optimisée pour l'expérience produit

### Hooks utilitaires

1. **`useProductImages`** (`src/hooks/useProductImages.ts`)
   - Gère la logique des images produits
   - Détecte automatiquement les produits multi-images

2. **`useImageAltText`** - Génère les textes alternatifs accessibles
3. **`useCarouselAria`** - Gère les attributs ARIA pour l'accessibilité

## Utilisation

### Pages catégories (listing produits)

```tsx
import ProductCard from "@/components/ui/ProductCard";

// Utilisation automatique - le carrousel s'active si plusieurs images
<ProductCard 
  product={product}
  showCategory={true}
  showRating={true}
  aspectRatio="square"
/>
```

### Fiches produits

```tsx
import ProductGallery from "@/components/produit/ProductGallery";

// Galerie complète avec thumbnails
<ProductGallery product={product} />
```

### Carrousel personnalisé

```tsx
import ImageCarousel from "@/components/ui/ImageCarousel";

<ImageCarousel
  images={["/image1.jpg", "/image2.jpg", "/image3.jpg"]}
  alt="Mon produit"
  variant="category" // ou "product"
  aspectRatio="square"
  showArrows={true}
  showDots={true}
  showThumbnails={false} // pour les pages catégories
  autoPlay={false}
/>
```

## Comportement automatique

### Règle d'activation
- **SI** nombre d'images > 1 → Carrousel activé
- **SINON** → Image simple statique

### Détection automatique
```tsx
// Le composant gère automatiquement :
const images = product.images ? [product.image, ...product.images] : [product.image];
const hasMultipleImages = images.length > 1;
```

## Variants

### Category (pages listing)
- Flèches discrètes (8x8 sur mobile, 9x9 sur desktop)
- Dots simples
- Pas de thumbnails
- Compteur d'images
- Support swipe mobile

### Product (fiches produits)
- Flèches plus grandes (12x12)
- Dots plus visibles
- Thumbnails horizontaux
- Compteur d'images
- Bouton play/pause (si autoPlay)
- Support swipe mobile

## Accessibilité

### Navigation clavier
- `ArrowLeft` : Image précédente
- `ArrowRight` : Image suivante
- `Tab` : Navigation entre éléments

### Attributs ARIA
- `aria-label` sur tous les boutons
- `role="region"` avec `aria-label` pour le carrousel
- `aria-current` sur l'image active

### Support lecteurs d'écran
- Textes alternatifs descriptifs
- Annonces des changements d'images
- Structure sémantique HTML5

## Responsive Design

### Mobile (< 768px)
- Flèches : 32x32px
- Thumbnails : 48x48px
- Dots : 6x6px
- Touch/swipe prioritaire

### Desktop (≥ 768px)
- Flèches : 36x36px
- Thumbnails : 80x80px
- Dots : 8x8px
- Hover states

## Performance

### Lazy loading
- Images outside viewport non chargées
- `sizes` optimisés pour chaque contexte
- `priority` sur première image

### Optimisations
- Backdrop filter hardware acceleration
- Transform GPU pour animations
- Reduced motion support

## CSS Classes

### Classes principales
- `.image-carousel` : Conteneur principal
- `.carousel-nav-btn` : Boutons navigation
- `.carousel-dot` : Indicateurs dots
- `.carousel-thumbnail` : Miniatures

### États
- `.carousel-loading` : État de chargement
- `.carousel-swipe-hint` : Indication swipe

### Media queries
- `@media (max-width: 768px)` : Optimisations mobile
- `@media (prefers-contrast: high)` : Mode contraste élevé
- `@media (prefers-reduced-motion: reduce)` : Mouvements réduits

## Données produits

### Structure attendue
```tsx
interface Product {
  id: string;
  name: string;
  image: string; // Image principale
  images?: string[]; // Images additionnelles (optionnel)
  // ... autres propriétés
}
```

### Exemples
```tsx
// Produit avec une seule image → Image statique
{
  image: "/products/mon-produit.png",
  // images: non défini ou vide
}

// Produit avec plusieurs images → Carrousel activé
{
  image: "/products/mon-produit-1.png",
  images: [
    "/products/mon-produit-2.png",
    "/products/mon-produit-3.png"
  ]
}
```

## Personnalisation

### Thèmes
Les couleurs sont basées sur les variables CSS du site :
- `--accent` : #C8A96E (boutons actifs)
- `--foreground` : #2C2C2C (textes)
- `--background` : #FAF7F2 (fond)

### Animations
- Durée : 300ms par défaut
- Fonction : `ease` standard
- Support `prefers-reduced-motion`

## Dépannage

### Problèmes courants
1. **Images qui ne s'affichent pas**
   - Vérifier les chemins dans `product.image` et `product.images`
   - Confirmer que les fichiers existent dans `public/images/`

2. **Carrousel qui ne s'active pas**
   - Vérifier que `product.images` contient bien des URLs valides
   - Confirmer que le tableau n'est pas vide

3. **Performance**
   - Utiliser des images optimisées (WebP si possible)
   - Limiter le nombre d'images par produit (< 10 recommandé)

### Debug
```tsx
// Pour vérifier les images d'un produit
console.log('Images:', product.images ? [product.image, ...product.images] : [product.image]);
console.log('Has multiple:', (product.images?.length || 0) > 0);
```

## Évolution future

### Améliorations possibles
1. **Zoom sur images** : Lightbox fullscreen
2. **Vidéo** : Support vidéos dans le carrousel
3. **360°** : Rotation produit
4. **Lazy loading avancé** : Intersection Observer
5. **Analytics** : Tracking interactions carrousel

### Maintenance
- Mettre à jour les dépendances (Lucide icons)
- Tester sur nouveaux navigateurs
- Vérifier l'accessibilité régulière
