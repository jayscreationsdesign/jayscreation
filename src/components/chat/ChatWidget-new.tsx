'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

interface Message {
  id: string
  session_id: string
  content: string
  sender: 'visitor' | 'admin'
  created_at: string
  read: boolean
}

const QUICK_REPLIES = [
  { label: 'Suivi de commande', key: 'suivi' },
  { label: 'Délais de livraison', key: 'delais' },
  { label: 'Personnalisation', key: 'perso' },
  { label: 'Tarifs & Devis', key: 'devis' },
  { label: 'Mariage', key: 'mariage' },
  { label: 'Baptême', key: 'bapteme' },
  { label: 'Anniversaire', key: 'anniversaire' },
  { label: 'Ramadan / Eid', key: 'ramadan' },
]

interface ChatWidgetProps {
  className?: string
}

export default function ChatWidget({ className = '' }: ChatWidgetProps) {
  const pathname = usePathname()
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // États
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [visitorId, setVisitorId] = useState<string>('')
  const [visitorName, setVisitorName] = useState<string | null>(null)
  const [visitorEmail, setVisitorEmail] = useState<string | null>(null)
  const [isCollectingInfo, setIsCollectingInfo] = useState(false)
  const [infoStep, setInfoStep] = useState<'name' | 'email' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<any>(null)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Initialisation au montage
  useEffect(() => {
    // 1. Générer/récupérer visitorId depuis localStorage
    let storedVisitorId = localStorage.getItem('jcd_visitor_id')
    if (!storedVisitorId) {
      storedVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('jcd_visitor_id', storedVisitorId)
    }
    setVisitorId(storedVisitorId)

    // 2. Récupérer sessionId existant depuis localStorage
    const storedSessionId = localStorage.getItem('jcd_session_id')
    if (storedSessionId) {
      setSessionId(storedSessionId)
      // 3. Charger les messages depuis Supabase
      loadMessages(storedSessionId)
    } else {
      // Afficher message de bienvenue si aucun historique
      const welcomeMessage: Message = {
        id: 'welcome-' + Date.now(),
        session_id: 'temp',
        content: `Bonjour ! Je suis ravie de vous accueillir chez 
Jay's Creations Design. 
Comment puis-je vous aider aujourd'hui ?`,
        sender: 'admin',
        created_at: new Date().toISOString(),
        read: false
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Realtime Supabase
  useEffect(() => {
    if (!sessionId || !supabase) return

    const channel = supabase
      .channel('chat-messages-' + sessionId)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: 'session_id=eq.' + sessionId
      }, (payload) => {
        const newMsg = payload.new as Message
        // Ne pas dupliquer
        setMessages(prev => {
          if (prev.some(m => m.id === newMsg.id)) return prev
          return [...prev, newMsg]
        })
        scrollToBottom()
        if (newMsg.sender === 'admin') {
          setIsTyping(false)
        }
      })
      .subscribe()

    subscriptionRef.current = channel

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current)
      }
    }
  }, [sessionId, supabase])

  // Charger les messages
  const loadMessages = async (sid: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sid)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
      scrollToBottom()
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  // Scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Envoyer un message
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !visitorId) return

    const trimmedContent = content.trim()
    setInputValue('')

    // 1. Ajouter message visiteur immédiatement en local
    const tempMessage: Message = {
      id: 'temp-' + Date.now(),
      session_id: sessionId || 'temp',
      content: trimmedContent,
      sender: 'visitor',
      created_at: new Date().toISOString(),
      read: false
    }
    setMessages(prev => [...prev, tempMessage])
    scrollToBottom()

    setIsLoading(true)
    try {
      // 3. POST /api/chat/message
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          visitorId,
          content: trimmedContent,
          visitorName,
          visitorEmail
        })
      })

      const data = await response.json()

      if (data.success) {
        // 4. Remplacer le message temp par le vrai
        setMessages(prev => prev.map(msg => 
          msg.id === tempMessage.id ? data.message : msg
        ))

        // 5. Sauvegarder sessionId retourné dans localStorage
        if (data.sessionId) {
          setSessionId(data.sessionId)
          localStorage.setItem('jcd_session_id', data.sessionId)
        }

        // 6. Si data.autoReply -> afficher isTyping 1.5s puis ajouter le message auto
        if (data.autoReply) {
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, data.autoReply])
            scrollToBottom()
          }, 1500)
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Réponse rapide
  const handleQuickReply = (key: string, label: string) => {
    // 1. Envoyer le label comme message visiteur
    // 2. Appeler handleSendMessage(label)
    handleSendMessage(label)
  }

  // Toggle chat
  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
    }
  }

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Styles pour conserver l'apparence actuelle
  const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#6B3A2A',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  }

  const bubbleStyle = {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '18px',
    fontSize: '14px',
    lineHeight: '1.4'
  }

  const visitorBubbleStyle = {
    ...bubbleStyle,
    backgroundColor: '#6B3A2A',
    color: 'white',
    borderBottomRightRadius: '4px'
  }

  const adminBubbleStyle = {
    ...bubbleStyle,
    backgroundColor: 'white',
    color: '#333',
    border: '1px solid #e8e0d0',
    borderBottomLeftRadius: '4px'
  }

  if (!visitorId) return null

  return (
    <div className={`fixed z-[9999] ${className}`}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#6B3A2A] text-white rounded-full shadow-lg hover:bg-[#8B4513] transition-all duration-200 flex items-center justify-center group"
        >
          <MessageCircle size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C8A96E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Besoin d'aide ?
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[340px] h-[480px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#6B3A2A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={avatarStyle}>JC</div>
              <div>
                <h3 className="font-semibold">Jay's Creations Design</h3>
                <p className="text-xs text-green-300">En ligne · Répond en moins d'1h</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-white/20 rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-[#FAF7F2] p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'admin' && (
                  <div style={avatarStyle} className="mr-2">JC</div>
                )}
                <div
                  style={message.sender === 'visitor' ? visitorBubbleStyle : adminBubbleStyle}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'visitor' ? 'text-white/70' : 'text-gray-500'}`}>
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            ))}

            {/* Boutons réponses rapides (uniquement après message de bienvenue) */}
            {messages.length === 1 && messages[0].sender === 'admin' && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.key}
                      onClick={() => handleQuickReply(reply.key, reply.label)}
                      className="text-xs bg-white border border-[#e8e0d0] rounded-full px-3 py-2 hover:bg-[#FAF7F2] transition-colors text-left"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Indicateur de frappe */}
            {isTyping && (
              <div style={{display:'flex', alignItems:'center', gap:8}} className="mb-4">
                <div style={avatarStyle}>JC</div>
                <div style={adminBubbleStyle}>
                  <span className="typing-dot">.</span>
                  <span className="typing-dot">.</span>
                  <span className="typing-dot">.</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#e8e0d0]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 bg-[#FAF7F2] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6B3A2A]/20"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 bg-[#6B3A2A] text-white rounded-full flex items-center justify-center hover:bg-[#8B4513] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
