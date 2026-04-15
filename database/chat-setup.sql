-- =============================================
-- Tables pour le chat existant de Jay's Creations Design
-- Compatible avec le code actuel
-- =============================================

-- Table des sessions de chat (existant dans le code)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL UNIQUE,
  visitor_name TEXT,
  visitor_email TEXT,
  status TEXT DEFAULT 'open',
  last_message TEXT,
  unread_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des messages de chat (existant dans le code)
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('visitor', 'admin')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor_id ON chat_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Function pour incrémenter unread_count (utilisée dans le code)
CREATE OR REPLACE FUNCTION increment_unread_count(session_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE chat_sessions 
  SET unread_count = unread_count + 1,
      updated_at = NOW()
  WHERE id = session_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Supprimer le trigger existant s'il existe, puis le recréer
DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON chat_sessions;

CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS pour la sécurité
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Politiques RLS simples pour permettre tout
CREATE POLICY "Allow all chat_sessions" ON chat_sessions FOR ALL USING (true);
CREATE POLICY "Allow all chat_messages" ON chat_messages FOR ALL USING (true);

-- =============================================
-- Instructions d'installation RAPIDE
-- =============================================
/*
1. Allez sur https://supabase.com/dashboard
2. Connectez-vous à votre projet
3. Cliquez sur "SQL Editor" dans le menu
4. Copiez tout ce script
5. Collez dans l'éditeur
6. Cliquez sur "Run"
7. Le chat fonctionnera immédiatement
*/
