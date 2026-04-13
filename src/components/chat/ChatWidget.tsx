'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send } from 'lucide-react'
import { chatService } from '@/lib/supabase/chat'
import { ChatMessage, ChatSession } from '@/types/chat'

interface ChatWidgetProps {
  className?: string
}

export default function ChatWidget({ className = '' }: ChatWidgetProps) {
  const pathname = usePathname()
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const [isOpen, setIsOpen] = useState(false)
  const [visitorId, setVisitorId] = useState<string>('')
  const [session, setSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<any>(null)

  // Quick replies
  const quickReplies = [
    "Suivi de commande",
    "Délais de livraison",
    "Personnalisation",
    "Tarifs & Devis"
  ]

  // Initialize visitor ID
  useEffect(() => {
    let storedId = localStorage.getItem('jcd_visitor_id')
    if (!storedId) {
      storedId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('jcd_visitor_id', storedId)
    }
    setVisitorId(storedId)
  }, [])

  // Load session when visitor ID is ready
  useEffect(() => {
    if (!visitorId) return

    const loadSession = async () => {
      try {
        const existingSession = await chatService.getSession(visitorId)
        if (existingSession) {
          setSession(existingSession)
          setUnreadCount(existingSession.unread_count)
          loadMessages(existingSession.id)
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        // Ignorer silencieusement si les tables n'existent pas encore
        if (errorMessage.includes('relation does not exist') || 
            errorMessage.includes('table not found') ||
            errorMessage.includes('does not exist')) {
          console.log('Chat tables not yet created - initializing empty session')
          return
        }
        console.error('Error loading session:', error)
      }
    }

    loadSession()
  }, [visitorId])

  // Load messages for session
  const loadMessages = async (sessionId: string) => {
    try {
      const messages = await chatService.getMessages(sessionId)
      setMessages(messages)
      scrollToBottom()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      // Ignorer silencieusement si les tables n'existent pas encore
      if (errorMessage.includes('relation does not exist') || 
          errorMessage.includes('table not found') ||
          errorMessage.includes('does not exist')) {
        console.log('Chat tables not yet created - skipping messages load')
        return
      }
      console.error('Error loading messages:', error)
    }
  }

  // Subscribe to new messages
  useEffect(() => {
    if (!session) return

    const subscription = chatService.subscribeToMessages(session.id, (newMessage) => {
      setMessages(prev => [...prev, newMessage])
      scrollToBottom()
      
      if (newMessage.sender === 'admin') {
        setIsTyping(false)
      }
    })

    subscriptionRef.current = subscription

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [session])

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim() || !visitorId) return

    setIsLoading(true)
    try {
      let currentSession = session

      // Create session if doesn't exist
      if (!currentSession) {
        currentSession = await chatService.createSession(visitorId)
        setSession(currentSession)
      }

      // Send message
      await chatService.sendMessage(currentSession.id, content, 'visitor')
      setInputMessage('')
      
      // Reload messages
      await loadMessages(currentSession.id)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle quick reply
  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  // Toggle chat
  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
      if (session) {
        chatService.markSessionAsRead(session.id)
      }
    }
  }

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
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
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#6B3A2A] font-bold">JC</span>
              </div>
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
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#6B3A2A] text-2xl">JC</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Bonjour ! Je suis ravie de vous accueillir chez Jay's Creations Design. Comment puis-je vous aider ? 
                </p>
                <p className="text-sm text-gray-500">Lun-Ven 7h-19h · Week-end 10h-17h</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'visitor'
                      ? 'bg-[#6B3A2A] text-white rounded-br-2px'
                      : 'bg-white border border-[#e8e0d0] rounded-bl-2px'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'visitor' ? 'text-white/70' : 'text-gray-500'}`}>
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-[#e8e0d0] px-4 py-2 rounded-2xl rounded-bl-2px">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 0 && (
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white border border-[#e8e0d0] rounded-full px-3 py-1 hover:bg-[#FAF7F2] transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#e8e0d0]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Tapez votre message..."
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
        </div>
      )}
    </div>
  )
}
