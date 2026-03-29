# 🎨 Guide d'Utilisation - Style d'Images Produits

## Script Universel pour le Style des Images Produits

Ce script applique automatiquement le style Jay's Creations Design à toutes les images produits.

## 🎨 Configuration Actuelle
- **Couleur de fond**: `#fdf8ec` (beige clair)
- **Dimensions finales**: 1000x1000 pixels
- **Taille du produit**: 900x900 pixels (centré)
- **Position**: Centré avec marge uniforme

## 📋 Utilisation

### 1. Pour une seule image
```bash
node scripts/style-product-image.mjs mon-image.png
```
Résultat: `mon-image-styled.png`

### 2. Avec nom de sortie personnalisé
```bash
node scripts/style-product-image.mjs mon-image.png mon-image-finale.png
```

### 3. Pour toutes les images non-stylisées
```bash
node scripts/style-product-image.mjs --all
```

### 4. Voir l'aide
```bash
node scripts/style-product-image.mjs --help
```

## 🔄 Processus d'Ajout d'un Nouveau Produit

1. **Ajoutez votre image** dans `public/images/products/`
2. **Appliquez le style** avec le script:
   ```bash
   node scripts/style-product-image.mjs votre-image.png
   ```
3. **Mettez à jour `src/data/products.ts`** avec le nom de l'image stylisée:
   ```typescript
   {
     id: "votre-id",
     name: "Votre Produit",
     image: "/images/products/votre-image-styled.png",
     // ... autres propriétés
   }
   ```

## 📁 Fichiers Créés

- **Images originales**: conservées avec leur nom d'origine
- **Images stylisées**: suffixe `-styled` ajouté automatiquement
- **Exemple**: `mon-produit.png` → `mon-produit-styled.png`

## ✅ Avantages

- **Cohérence visuelle**: Toutes les images ont le même style
- **Automatisation**: Plus besoin de retouche manuelle
- **Flexibilité**: Facile à modifier pour changer les couleurs/dimensions
- **Traitement par lot**: Possibilité de traiter plusieurs images d'un coup

## 🔧 Personnalisation

Pour modifier le style de toutes les images futures, éditez la constante `PRODUCT_STYLE_CONFIG` dans le script `style-product-image.mjs`:

```javascript
const PRODUCT_STYLE_CONFIG = {
  size: 1000,           // Taille finale de l'image
  productSize: 900,       // Taille du produit
  backgroundColor: '#fdf8ec', // Couleur de fond
  gravity: 'center'       // Position du produit
};
```

## 🎯 Bonnes Pratiques

1. **Toujours utiliser les images stylisées** dans `products.ts`
2. **Garder les originales** pour référence
3. **Tester sur localhost** avant déploiement
4. **Utiliser des noms descriptifs** pour les images

---
*Script créé pour Jay's Creations Design - Tous droits réservés*
