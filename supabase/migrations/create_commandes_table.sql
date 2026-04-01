-- Création de la table commandes
CREATE TABLE IF NOT EXISTS commandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  statut TEXT NOT NULL CHECK (statut IN ('en_attente', 'payee', 'annulee')),
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  client_nom TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_telephone TEXT NOT NULL,
  adresse_livraison TEXT NOT NULL,
  articles JSONB NOT NULL,
  personnalisation TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_commandes_stripe_session_id ON commandes(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_commandes_client_email ON commandes(client_email);
CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes(statut);
CREATE INDEX IF NOT EXISTS idx_commandes_created_at ON commandes(created_at);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_commandes_updated_at 
  BEFORE UPDATE ON commandes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security)
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs de voir leurs propres commandes
CREATE POLICY "Users can view their own orders" ON commandes
  FOR SELECT USING (
    auth.uid()::text = (
      SELECT auth.uid()::text 
      FROM auth.users 
      WHERE email = client_email
    )
  );

-- Politique pour permettre aux utilisateurs d'insérer leurs commandes
CREATE POLICY "Users can insert their own orders" ON commandes
  FOR INSERT WITH CHECK (
    auth.uid()::text = (
      SELECT auth.uid()::text 
      FROM auth.users 
      WHERE email = client_email
    )
  );
