-- Vérifier la structure exacte de la table profils
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profils' 
ORDER BY ordinal_position;
