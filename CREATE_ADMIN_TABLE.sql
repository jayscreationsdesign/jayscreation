-- SUPPRIMER LA TABLE EXISTANTE (si besoin)
DROP TABLE IF EXISTS admin_users;

-- CRÉER LA TABLE ADMIN_USERS
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  login VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  actif BOOLEAN DEFAULT true,
  derniere_connexion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRÉER LES INDEX
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_login ON admin_users(login);

-- INSÉRER L'ADMIN PAR DÉFAUT
INSERT INTO admin_users (email, login, password_hash, nom, prenom, role) 
VALUES (
  'contact@jayscreationsdesign.fr',
  'anais',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W',
  'Manne',
  'Anais',
  'super_admin'
);

-- VÉRIFICATION
SELECT * FROM admin_users;
