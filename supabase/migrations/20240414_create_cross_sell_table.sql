-- Création de la table pour les produits fréquemment achetés ensemble
CREATE TABLE IF NOT EXISTS cross_sell (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  main_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  related_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_cross_sell_main_product ON cross_sell(main_product_id);
CREATE INDEX IF NOT EXISTS idx_cross_sell_related_product ON cross_sell(related_product_id);

-- Insertion de quelques associations pour démarrer
-- Note: Ces associations seront à adapter selon les produits réels
INSERT INTO cross_sell (main_product_id, related_product_id, position)
SELECT 
  p1.id,
  p2.id,
  1
FROM products p1, products p2 
WHERE p1.id != p2 
LIMIT 3;
