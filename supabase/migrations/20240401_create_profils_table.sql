-- Création de la table des profils utilisateurs
-- Cette table stocke les informations complémentaires des utilisateurs

CREATE TABLE IF NOT EXISTS profils (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  prenom TEXT,
  nom TEXT,
  telephone TEXT,
  adresse_livraison TEXT,
  ville TEXT,
  code_postal TEXT,
  client_email TEXT REFERENCES auth.users(email)
);

-- Création de la table des commandes
CREATE TABLE IF NOT EXISTS commandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_commande TEXT UNIQUE NOT NULL,
  client_email TEXT REFERENCES auth.users(email),
  date_commande TIMESTAMPTZ DEFAULT NOW(),
  statut TEXT CHECK (statut IN ('en_attente', 'payee', 'annulee')) DEFAULT 'en_attente',
  total DECIMAL(10,2) NOT NULL,
  articles JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_profils_email ON profils(client_email);
CREATE INDEX IF NOT EXISTS idx_profils_id ON profils(id);
CREATE INDEX IF NOT EXISTS idx_commandes_email ON commandes(client_email);
CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes(statut);
CREATE INDEX IF NOT EXISTS idx_commandes_date ON commandes(date_commande DESC);

-- RLS (Row Level Security) pour la table profils
ALTER TABLE profils ENABLE ROW LEVEL SECURITY;

-- Politique RLS : les utilisateurs peuvent voir et modifier leur propre profil
CREATE POLICY "Users can view own profile" ON profils
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profils
  FOR UPDATE USING (auth.uid() = id);

-- RLS pour la table commandes
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- Politique RLS : les utilisateurs peuvent voir leurs propres commandes
CREATE POLICY "Users can view own orders" ON commandes
  FOR SELECT USING (auth.email() = client_email);
