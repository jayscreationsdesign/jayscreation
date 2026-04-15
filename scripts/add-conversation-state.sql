-- Ajouter la colonne conversation_state à la table chat_sessions
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS conversation_state JSONB 
DEFAULT '{"step": "welcome", "data": {}}'::jsonb;
