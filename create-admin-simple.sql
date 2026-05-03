-- Créer l'utilisateur admin (version simplifiée)
-- Cette requête doit être exécutée dans le dashboard Supabase

-- Étape 1: Créer le profil admin avec les colonnes minimales
INSERT INTO profils (
  id,
  email,
  role,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  'admin@jayscreationsdesign.fr',
  'admin',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profils WHERE email = 'admin@jayscreationsdesign.fr'
);

-- Étape 2: Vérification
SELECT 'Profil admin créé' as status, email, role 
FROM profils 
WHERE email = 'admin@jayscreationsdesign.fr';

-- NOTE: 
-- 1. Exécutez d'abord ce SQL pour créer le profil
-- 2. Allez dans Authentication → Users pour créer l'utilisateur
-- 3. L'utilisateur sera automatiquement lié au profil existant
