-- ==========================================
-- SYSTÈME DE PRICING HYBRIDE - MISE À JOUR BDD
-- ==========================================

-- PARTIE 1: Modifier la table products existante
-- ==========================================

-- Type de tarification du produit
ALTER TABLE products ADD COLUMN IF NOT EXISTS pricing_type TEXT DEFAULT 'unit_with_minimum'
  CHECK (pricing_type IN ('unit_with_minimum', 'lot_pricing', 'quote'));

-- Pour pricing_type = 'unit_with_minimum'
ALTER TABLE products ADD COLUMN IF NOT EXISTS unit_price DECIMAL(10,2);          -- Prix unitaire
ALTER TABLE products ADD COLUMN IF NOT EXISTS min_quantity INTEGER DEFAULT 1;     -- Quantité minimum
ALTER TABLE products ADD COLUMN IF NOT EXISTS max_quantity INTEGER DEFAULT 999;   -- Quantité maximum (optionnel)
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity_step INTEGER DEFAULT 1;    -- Pas d'incrémentation (ex: par 5, par 10)

-- Pour pricing_type = 'lot_pricing'
-- Les lots sont stockés dans une table séparée (voir ci-dessous)

-- Pour pricing_type = 'quote'
-- Aucun champ supplémentaire nécessaire - pas de prix, bouton "Demander un devis"

-- ==========================================
-- PARTIE 2: Créer la table product_lots
-- ==========================================

CREATE TABLE IF NOT EXISTS product_lots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  lot_name TEXT NOT NULL,                    -- Ex: "Lot de 10", "Lot de 20"
  quantity INTEGER NOT NULL,                 -- Nombre d'unités dans le lot
  lot_price DECIMAL(10,2) NOT NULL,          -- Prix total du lot
  unit_price_in_lot DECIMAL(10,2),           -- Prix par unité dans ce lot (calculé)
  savings_percent DECIMAL(5,2),              -- % d'économie par rapport au prix unitaire
  is_popular BOOLEAN DEFAULT false,          -- Mettre en avant ce lot ("Le + populaire")
  sort_order INTEGER DEFAULT 0,             -- Ordre d'affichage
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS sur la table product_lots
ALTER TABLE product_lots ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
CREATE POLICY "Anyone can view lots" ON product_lots
  FOR SELECT USING (true);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_lots_product ON product_lots(product_id);

-- ==========================================
-- PARTIE 3: Exemples de données
-- ==========================================

-- Produit 1 : Boîte Pom'Potes -- prix unitaire avec minimum
UPDATE products SET 
  pricing_type = 'unit_with_minimum',
  unit_price = 2.30,
  min_quantity = 10,
  max_quantity = 100,
  quantity_step = 1
WHERE slug = 'boite-pompotes-personnalisee';

-- Produit 2 : Magnet Personnalisé -- vente par lots (si ce produit existe)
-- D'abord, créer le produit s'il n'existe pas
INSERT INTO products (id, name, slug, pricing_type, unit_price, category, categorySlug, image, description, longDescription, rating)
VALUES (
  gen_random_uuid(),
  'Magnet Personnalisé',
  'magnet-personnalise',
  'lot_pricing',
  3.00,
  'Papeterie',
  'papeterie-sweet-tables',
  '/images/products/placeholder.png',
  'Magnet personnalisé pour réfrigérateur et événements. Design pratique et élégant, personnalisable avec vos noms, dates et thème. Parfait pour mariage, anniversaire et souvenirs.',
  'Créez des magnets personnalisés uniques pour vos événements ! Nos magnets sont entièrement personnalisables avec vos couleurs, thème, noms et dates. Parfaits pour mariage, anniversaire, baby-shower ou toute célébration spéciale. Qualité premium et aimant puissant pour une tenue durable. Idéaux comme cadeaux d'invités ou souvenirs personnalisés.',
  5
) ON CONFLICT (slug) DO UPDATE SET
  pricing_type = EXCLUDED.pricing_type,
  unit_price = EXCLUDED.unit_price;

-- Insérer les lots pour le Magnet Personnalisé
INSERT INTO product_lots (product_id, lot_name, quantity, lot_price, unit_price_in_lot, savings_percent, is_popular, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'magnet-personnalise'), 'Lot de 10', 10, 25.00, 2.50, 17, false, 1),
  ((SELECT id FROM products WHERE slug = 'magnet-personnalise'), 'Lot de 20', 20, 40.00, 2.00, 33, true, 2),
  ((SELECT id FROM products WHERE slug = 'magnet-personnalise'), 'Lot de 50', 50, 80.00, 1.60, 47, false, 3)
ON CONFLICT DO NOTHING;

-- Produit 3 : Cadre Personnalisé -- sur devis
UPDATE products SET 
  pricing_type = 'quote'
WHERE slug = 'cadre-personnalise';

-- ==========================================
-- PARTIE 4: Migration des produits existants
-- ==========================================

-- Pour les produits qui ont déjà un prix mais pas de pricing_type, 
-- les convertir en pricing_type = 'unit_with_minimum'
UPDATE products 
SET 
  pricing_type = 'unit_with_minimum',
  unit_price = CASE 
    WHEN price ~ '^[0-9,]+\.[0-9]{2}' THEN CAST(REPLACE(price, ',', '.') AS DECIMAL(10,2))
    WHEN price ~ '^[0-9,]+ - [0-9,]+\.[0-9]{2}' THEN CAST(SPLIT_PART(REPLACE(price, ',', '.'), ' - ', 1) AS DECIMAL(10,2))
    ELSE NULL
  END,
  min_quantity = 1
WHERE pricing_type IS NULL 
  AND price IS NOT NULL 
  AND price != 'Sur devis';

-- Pour les produits avec "Sur devis", les convertir en pricing_type = 'quote'
UPDATE products 
SET pricing_type = 'quote'
WHERE price = 'Sur devis' OR pricing_type IS NULL;

-- ==========================================
-- PARTIE 5: Validation
-- ==========================================

-- Afficher un résumé des produits par type de pricing
SELECT 
  pricing_type,
  COUNT(*) as nombre_produits,
  STRING_AGG(name, ', ' ORDER BY name) as exemples
FROM products 
GROUP BY pricing_type 
ORDER BY pricing_type;

-- Afficher les lots créés
SELECT 
  p.name as produit,
  l.lot_name,
  l.quantity,
  l.lot_price,
  l.unit_price_in_lot,
  l.savings_percent,
  l.is_popular
FROM product_lots l
JOIN products p ON l.product_id = p.id
ORDER BY p.name, l.sort_order;
