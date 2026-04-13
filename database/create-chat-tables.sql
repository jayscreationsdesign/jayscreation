-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    visitor_name TEXT,
    visitor_email TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    last_message TEXT,
    unread_count INTEGER DEFAULT 0
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender TEXT NOT NULL CHECK (sender IN ('visitor', 'admin')),
    created_at TIMESTAMPTZ DEFAULT now(),
    read BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor_id ON chat_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Create function to increment unread count
CREATE OR REPLACE FUNCTION increment_unread_count(session_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE chat_sessions 
    SET unread_count = unread_count + 1,
        updated_at = now()
    WHERE id = session_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
