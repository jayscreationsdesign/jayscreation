import { createClient } from '@/lib/supabase';
import { ChatSession, ChatMessage } from '@/types/chat';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const chatService = {
  // Sessions
  async createSession(visitorId: string, visitorName?: string, visitorEmail?: string): Promise<ChatSession> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        visitor_id: visitorId,
        visitor_name: visitorName,
        visitor_email: visitorEmail,
        status: 'open'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getSession(visitorId: string): Promise<ChatSession | null> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('visitor_id', visitorId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateSession(sessionId: string, updates: Partial<ChatSession>): Promise<ChatSession> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllSessions(): Promise<ChatSession[]> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async markSessionAsRead(sessionId: string): Promise<void> {
    await supabase
      .from('chat_sessions')
      .update({ unread_count: 0 })
      .eq('id', sessionId);

    await supabase
      .from('chat_messages')
      .update({ read: true })
      .eq('session_id', sessionId);
  },

  // Messages
  async sendMessage(sessionId: string, content: string, sender: 'visitor' | 'admin'): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        content,
        sender
      })
      .select()
      .single();

    if (error) throw error;

    // Update session last message and unread count
    if (sender === 'visitor') {
      await supabase.rpc('increment_unread_count', { session_id: sessionId });
      await supabase
        .from('chat_sessions')
        .update({
          last_message: content,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);
    } else {
      await supabase
        .from('chat_sessions')
        .update({
          last_message: content,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);
    }

    return data;
  },

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Realtime
  subscribeToMessages(sessionId: string, callback: (message: ChatMessage) => void) {
    return supabase
      .channel(`chat_messages_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => callback(payload.new as ChatMessage)
      )
      .subscribe();
  },

  subscribeToSessions(callback: (session: ChatSession) => void) {
    return supabase
      .channel('chat_sessions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_sessions'
        },
        (payload) => callback(payload.new as ChatSession)
      )
      .subscribe();
  }
};
