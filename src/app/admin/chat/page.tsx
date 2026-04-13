'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, Send, CheckCircle, Clock, X, Users, Filter } from 'lucide-react'
import { chatService } from '@/lib/supabase/chat'
import { ChatSession, ChatMessage } from '@/types/chat'

export default function ChatAdminPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress'>('all')
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<any>(null)

  // Quick replies for admin
  const adminQuickReplies = [
    "Votre aperçu est prêt !",
    "Commande confirmée",
    "Je reviens vers vous sous 1h",
    "Merci pour votre patience !"
  ]

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simple check - in production, use proper auth
        const token = localStorage.getItem('admin_token')
        if (!token) {
          router.push('/admin/login')
          return
        }
      } catch (error) {
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  // Load sessions
  useEffect(() => {
    loadSessions()
  }, [filter])

  const loadSessions = async () => {
    setIsLoadingSessions(true)
    try {
      const allSessions = await chatService.getAllSessions()
      const filteredSessions = filter === 'all' 
        ? allSessions 
        : allSessions.filter(s => s.status === filter)
      setSessions(filteredSessions)
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      setIsLoadingSessions(false)
    }
  }

  // Load messages when session is selected
  useEffect(() => {
    if (!selectedSession) return

    loadMessages(selectedSession.id)
    markSessionAsRead(selectedSession.id)

    // Subscribe to new messages
    const subscription = chatService.subscribeToMessages(selectedSession.id, (newMessage) => {
      setMessages(prev => [...prev, newMessage])
      scrollToBottom()
    })

    subscriptionRef.current = subscription

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [selectedSession])

  // Subscribe to session updates
  useEffect(() => {
    const subscription = chatService.subscribeToSessions((updatedSession) => {
      setSessions(prev => {
        const index = prev.findIndex(s => s.id === updatedSession.id)
        if (index >= 0) {
          const newSessions = [...prev]
          newSessions[index] = updatedSession
          return newSessions
        }
        return [updatedSession, ...prev]
      })
    })

    return () => {
      subscription?.unsubscribe?.()
    }
  }, [])

  const loadMessages = async (sessionId: string) => {
    try {
      const messages = await chatService.getMessages(sessionId)
      setMessages(messages)
      scrollToBottom()
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const markSessionAsRead = async (sessionId: string) => {
    try {
      await chatService.markSessionAsRead(sessionId)
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, unread_count: 0 } : s
      ))
    } catch (error) {
      console.error('Error marking session as read:', error)
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedSession) return

    setIsLoading(true)
    try {
      await chatService.sendMessage(selectedSession.id, content, 'admin')
      setInputMessage('')
      await loadMessages(selectedSession.id)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-[#C8A96E] text-white'
      case 'in_progress': return 'bg-[#6B3A2A] text-white'
      case 'closed': return 'bg-gray-400 text-white'
      default: return 'bg-gray-400 text-white'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Ouvert'
      case 'in_progress': return 'En cours'
      case 'closed': return 'Fermé'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-[#e8e0d0] flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#e8e0d0]">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-[#3d2010]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Conversations
              </h1>
              <div className="flex items-center gap-2 text-[#6B3A2A]">
                <Users size={20} />
                <span className="text-sm font-medium">{sessions.length}</span>
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex gap-2">
              {(['all', 'open', 'in_progress'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === f
                      ? 'bg-[#6B3A2A] text-white'
                      : 'bg-[#FAF7F2] text-[#6b6b6b] hover:bg-[#e8e0d0]'
                  }`}
                >
                  {f === 'all' ? 'Toutes' : f === 'open' ? 'Ouvertes' : 'En cours'}
                </button>
              ))}
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingSessions ? (
              <div className="p-6 text-center text-[#6b6b6b]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B3A2A] mx-auto mb-2"></div>
                Chargement...
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-6 text-center text-[#6b6b6b]">
                <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                Aucune conversation
              </div>
            ) : (
              <div className="divide-y divide-[#e8e0d0]">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`w-full p-4 text-left hover:bg-[#FAF7F2] transition-colors ${
                      selectedSession?.id === session.id ? 'bg-[#FAF7F2] border-l-4 border-[#C8A96E]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#3d2010] truncate">
                          {session.visitor_name || 'Visiteur anonyme'}
                        </h3>
                        {session.visitor_email && (
                          <p className="text-xs text-[#6b6b6b] truncate">{session.visitor_email}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                          {getStatusLabel(session.status)}
                        </span>
                        {session.unread_count > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {session.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#6b6b6b] truncate mb-1">
                      {session.last_message || 'Nouvelle conversation'}
                    </p>
                    <p className="text-xs text-[#6b6b6b] flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(session.updated_at)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedSession ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-[#e8e0d0] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#3d2010]">
                      {selectedSession.visitor_name || 'Visiteur anonyme'}
                    </h2>
                    {selectedSession.visitor_email && (
                      <p className="text-sm text-[#6b6b6b]">{selectedSession.visitor_email}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedSession.status)}`}>
                        {getStatusLabel(selectedSession.status)}
                      </span>
                      <span className="text-xs text-[#6b6b6b]">
                        Session ID: {selectedSession.id.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      chatService.updateSession(selectedSession.id, { status: 'closed' })
                      setSelectedSession(null)
                    }}
                    className="text-[#6b6b6b] hover:text-[#3d2010] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#FAF7F2]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'visitor' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        message.sender === 'visitor'
                          ? 'bg-white border border-[#e8e0d0] rounded-bl-2px'
                          : 'bg-[#6B3A2A] text-white rounded-br-2px'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'visitor' ? 'text-[#6b6b6b]' : 'text-white/70'}`}>
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-6 py-2 bg-white border-t border-[#e8e0d0]">
                <div className="flex gap-2 flex-wrap">
                  {adminQuickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-[#FAF7F2] border border-[#e8e0d0] rounded-full px-3 py-1 hover:bg-[#e8e0d0] transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-[#e8e0d0]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                    placeholder="Tapez votre réponse..."
                    className="flex-1 px-4 py-2 bg-[#FAF7F2] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6B3A2A]/20"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={isLoading || !inputMessage.trim()}
                    className="w-10 h-10 bg-[#6B3A2A] text-white rounded-full flex items-center justify-center hover:bg-[#8B4513] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle size={64} className="mx-auto mb-4 text-[#6b6b6b] opacity-50" />
                <h3 className="text-lg font-medium text-[#3d2010] mb-2">Sélectionnez une conversation</h3>
                <p className="text-[#6b6b6b]">Choisissez une conversation dans la liste pour commencer à répondre</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
