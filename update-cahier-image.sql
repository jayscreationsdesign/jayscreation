-- Trouver le produit "Cahier de coloriage personnalisé"
SELECT id, name, images FROM products 
WHERE name ILIKE '%cahier de coloriage personnalisé%';

-- Mettre à jour la première image du produit
UPDATE products 
SET images = ARRAY_REPLACE(
  images, 
  images[1], 
  '/images/products/Cahier2.png'
)
WHERE name ILIKE '%cahier de coloriage personnalisé%';

-- Vérifier la mise à jour
SELECT id, name, images FROM products 
WHERE name ILIKE '%cahier de coloriage personnalisé%';
