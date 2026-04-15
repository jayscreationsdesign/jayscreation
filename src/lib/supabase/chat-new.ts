import { supabase, ChatSession, ChatMessage, ChatResult } from './client'

export const chatService = {
  // Créer une session de chat
  async createSession(visitorId: string, visitorName?: string, visitorEmail?: string): Promise<ChatResult<ChatSession>> {
    if (!supabase) {
      return { ok: false, error: 'Supabase not available' }
    }

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          visitor_id: visitorId,
          visitor_name: visitorName,
          visitor_email: visitorEmail
        })
        .select()
        .single()

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true, data }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  },

  // Ajouter un message
  async addMessage(sessionId: string, role: 'user' | 'assistant', content: string): Promise<ChatResult<ChatMessage>> {
    if (!supabase) {
      return { ok: false, error: 'Supabase not available' }
    }

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          role,
          content
        })
        .select()
        .single()

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true, data }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  },

  // Lister les messages
  async listMessages(sessionId: string): Promise<ChatResult<ChatMessage[]>> {
    if (!supabase) {
      return { ok: false, error: 'Supabase not available' }
    }

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (error) {
        return { ok: false, error: error.message }
      }

      return { ok: true, data: data || [] }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  },

  // Obtenir une session existante
  async getSession(visitorId: string): Promise<ChatResult<ChatSession | null>> {
    if (!supabase) {
      return { ok: false, error: 'Supabase not available' }
    }

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('visitor_id', visitorId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        return { ok: false, error: error.message }
      }

      return { ok: true, data: data || null }
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }
}
