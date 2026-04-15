-- =============================================
-- Tables pour le système de chat Jay's Creations Design
-- Compatible avec le nouveau système de chat
-- =============================================

-- Table des sessions de chat
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  status TEXT DEFAULT 'open' 
    CHECK (status IN ('open','in_progress','closed')),
  last_message TEXT,
  unread_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des messages de chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) 
    ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender TEXT NOT NULL 
    CHECK (sender IN ('visitor','admin')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_chat_messages_session 
  ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor 
  ON chat_sessions(visitor_id);

-- Activer Realtime
ALTER PUBLICATION supabase_realtime 
  ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime 
  ADD TABLE chat_sessions;

-- Policies RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert sessions" 
  ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read sessions" 
  ON chat_sessions FOR SELECT USING (true);
CREATE POLICY "Public update sessions" 
  ON chat_sessions FOR UPDATE USING (true);

CREATE POLICY "Public insert messages" 
  ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read messages" 
  ON chat_messages FOR SELECT USING (true);

-- Fonction increment pour unread_count
CREATE OR REPLACE FUNCTION increment(row_id UUID)
RETURNS INTEGER AS $$
  SELECT unread_count + 1 FROM chat_sessions 
  WHERE id = row_id;
$$ LANGUAGE SQL;

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Supprimer trigger existant s'il y en a un
DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON chat_sessions;

-- Créer trigger pour updated_at
CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Instructions d'installation
-- =============================================
/*
1. Allez sur https://supabase.com/dashboard
2. Connectez-vous à votre projet
3. Cliquez sur "SQL Editor" dans le menu
4. Copiez tout ce script
5. Collez dans l'éditeur
6. Cliquez sur "Run"
7. Les tables seront créées avec Realtime activé
*/
