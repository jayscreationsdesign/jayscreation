# 🎨 Traitement d'Images Produits

Scripts JavaScript pour traiter les images produits avec un fond uniforme, équivalents à votre script Python.

## 📋 Scripts disponibles

### 1. `process-product-images.js` - Script de base
Script simple qui reproduit exactement le comportement de votre script Python.

```bash
# Traiter toutes les images du dossier détourage
node process-product-images.js

# Traiter un fichier spécifique
node process-product-images.js --file mon-image.png
```

**Configuration :**
- Taille : 2000x2000px
- Fond : #F6F2EB (beige)
- Format : JPEG
- Qualité : 95%
- Dossier source : `public/images/products/détourage`
- Dossier cible : `public/images/products`

### 2. `process-product-images-advanced.js` - Script avancé
Script complet avec de nombreuses options de personnalisation.

```bash
# Afficher l'aide
node process-product-images-advanced.js --help

# Exemples d'utilisation
node process-product-images-advanced.js --size 1600 --background white
node process-product-images-advanced.js --format webp --quality 90
node process-product-images-advanced.js --padding 50 --background #FF0000
node process-product-images-advanced.js --file mon-image.jpg --size 1200
```

**Options disponibles :**
- `--size N` : Taille finale en pixels (défaut: 2000)
- `--background COLOR` : Couleur de fond (voir couleurs ci-dessous)
- `--format FORMAT` : Format de sortie (jpeg/png/webp)
- `--quality N` : Qualité 1-100 (défaut: 95)
- `--padding N` : Padding en pixels (défaut: 0)
- `--output PATH` : Dossier de sortie personnalisé
- `--debug` : Mode debug détaillé

### 3. `test-image-processing.js` - Script de test
Pour tester le traitement sur quelques images avec des logs détaillés.

```bash
node test-image-processing.js
```

### 4. `create-test-images.js` - Création d'images de test
Crée des images de test pour vérifier le fonctionnement.

```bash
node create-test-images.js
```

## 🎨 Couleurs de fond disponibles

### Noms prédéfinis
- `beige` : #F6F2EB (défaut)
- `white` : #FFFFFF
- `lightgray` : #F8F8F8
- `cream` : #FAF6F0
- `ivory` : #FFFFF0
- `lightblue` : #F0F8FF
- `lightgreen` : #F0FFF0

### Code hexadécimal
Vous pouvez aussi utiliser des codes hexadécimaux :
```bash
node process-product-images-advanced.js --background #FF5733
node process-product-images-advanced.js --background #2ECC71
```

## 📁 Structure des dossiers

```
public/images/products/
├── détourage/          # Images sources (PNG transparents)
│   ├── produit-1.png
│   ├── produit-2.png
│   └── ...
└──                    # Images traitées (JPEG/WebP avec fond)
    ├── produit-1.jpg
    ├── produit-2.jpg
    └── ...
```

## 🔧 Installation des dépendances

Assurez-vous d'avoir Sharp installé :
```bash
npm install sharp
```

## 📊 Formats de sortie

### JPEG (défaut)
- Idéal pour les photos
- Compression optimisée
- Compatible tous navigateurs
- Extension : `.jpg`

### PNG
- Support transparence (si activé)
- Qualité sans perte
- Taille fichiers plus grande
- Extension : `.png`

### WebP
- Meilleure compression
- Support transparence
- Navigateurs modernes
- Extension : `.webp`

## 🎯 Exemples d'utilisation

### Cas 1 : Traitement standard (comme votre Python)
```bash
node process-product-images.js
```
Résultat : Images 2000x2000px avec fond #F6F2EB en JPEG qualité 95%

### Cas 2 : Images plus petites pour le web
```bash
node process-product-images-advanced.js --size 1200 --quality 85
```
Résultat : Images 1200x1200px avec fond beige en JPEG qualité 85%

### Cas 3 : Format moderne WebP
```bash
node process-product-images-advanced.js --format webp --quality 90
```
Résultat : Images 2000x2000px avec fond beige en WebP qualité 90%

### Cas 4 : Fond blanc avec padding
```bash
node process-product-images-advanced.js --background white --padding 100
```
Résultat : Images 2000x2000px avec fond blanc et 100px de padding

### Cas 5 : Traitement d'une seule image
```bash
node process-product-images.js --file mon-produit.png
```
Résultat : Une seule image traitée

## 🚀 Performance

### Optimisations intégrées
- **Lanczos3** : Meilleure qualité de redimensionnement
- **Progressive JPEG** : Chargement progressif
- **MozJPEG** : Compression JPEG optimisée
- **Smart Subsample** : WebP optimisé
- **Hardware acceleration** : GPU pour les transformations

### Temps de traitement
- ~0.1s par image (2000x2000px)
- Parallélisation possible pour lots importants
- Utilisation mémoire optimisée

## 🔍 Débogage

### Mode debug
```bash
node process-product-images-advanced.js --debug
```

### Logs détaillés
Le script affiche :
- Dimensions originales
- Nouvelles dimensions
- Position de centrage
- Poids des fichiers
- Taux de réussite

### Erreurs communes
1. **Sharp non installé** : `npm install sharp`
2. **Dossier source vide** : Vérifiez `public/images/products/détourage`
3. **Permissions** : Vérifiez les droits d'écriture

## 📈 Comparaison avec Python

| Caractéristique | Python (PIL) | JavaScript (Sharp) |
|------------------|----------------|---------------------|
| Performance | Moyenne | **Excellente** |
| Mémoire | Élevée | **Optimisée** |
| Qualité | Bonne | **Excellente** |
| Formats | Limités | **Étendus** |
| Options | Basiques | **Avancées** |
| Intégration | Externe | **Natif** |

## 🔄 Workflow recommandé

1. **Préparation** : Placez vos images PNG transparentes dans `détourage/`
2. **Test** : Utilisez `test-image-processing.js` pour valider
3. **Traitement** : Lancez le script avec vos options
4. **Vérification** : Contrôlez les résultats dans `products/`
5. **Intégration** : Les images sont prêtes pour le carrousel

## 🎨 Personnalisation

### Ajouter une nouvelle couleur
Modifiez `BACKGROUNDS` dans le script avancé :
```javascript
const BACKGROUNDS = {
  // ... couleurs existantes
  marron: { r: 139, g: 69, b: 19 },
  orange: { r: 255, g: 165, b: 0 }
};
```

### Modifier les options par défaut
Changez `CONFIG` dans les scripts :
```javascript
const CONFIG = {
  size: 1600,        // Taille par défaut
  backgroundColor: { r: 255, g: 255, b: 255 }, // Fond blanc
  quality: 90,        // Qualité par défaut
  format: 'webp'      // Format par défaut
};
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs d'erreur
2. Testez avec `test-image-processing.js`
3. Utilisez le mode `--debug`
4. Vérifiez les dépendances avec `npm list sharp`

Les scripts sont conçus pour être robustes et informatifs en cas d'erreur.
