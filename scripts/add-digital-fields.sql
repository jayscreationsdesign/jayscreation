-- Ajouter les champs numériques à la table products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS est_numerique boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS fichier_url text,
ADD COLUMN IF NOT EXISTS formats_inclus text[] DEFAULT '{}';

-- Créer la table download_tokens
CREATE TABLE IF NOT EXISTS download_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  token text UNIQUE NOT NULL,
  fichier_url text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Créer un index sur le token pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON download_tokens(token);
CREATE INDEX IF NOT EXISTS idx_download_tokens_expires ON download_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_download_tokens_used ON download_tokens(used);
