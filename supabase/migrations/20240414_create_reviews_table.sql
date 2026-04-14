-- Création de la table des avis clients
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved BOOLEAN DEFAULT false
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Insertion des avis pré-remplis pour démarrer
INSERT INTO reviews (product_id, customer_name, rating, comment, verified_purchase, approved)
SELECT 
  (SELECT id FROM products ORDER BY created_at DESC LIMIT 1),
  'Sophie M.',
  5,
  'Absolument magnifique, qualité irréprochable !',
  true,
  true
WHERE EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO reviews (product_id, customer_name, rating, comment, verified_purchase, approved)
SELECT 
  (SELECT id FROM products ORDER BY created_at DESC LIMIT 1),
  'Marie L.',
  5,
  'Livraison rapide, emballage soigné, je recommande !',
  true,
  true
WHERE EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO reviews (product_id, customer_name, rating, comment, verified_purchase, approved)
SELECT 
  (SELECT id FROM products ORDER BY created_at DESC LIMIT 1),
  'Fatou D.',
  5,
  'Exactement ce que je cherchais pour mon mariage',
  true,
  true
WHERE EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO reviews (product_id, customer_name, rating, comment, verified_purchase, approved)
SELECT 
  (SELECT id FROM products ORDER BY created_at DESC LIMIT 1),
  'Camille R.',
  4,
  'Très belle qualité, conforme aux photos',
  true,
  true
WHERE EXISTS (SELECT 1 FROM products LIMIT 1);

INSERT INTO reviews (product_id, customer_name, rating, comment, verified_purchase, approved)
SELECT 
  (SELECT id FROM products ORDER BY created_at DESC LIMIT 1),
  'Amina K.',
  5,
  'Service client au top, créations uniques !',
  true,
  true
WHERE EXISTS (SELECT 1 FROM products LIMIT 1);
