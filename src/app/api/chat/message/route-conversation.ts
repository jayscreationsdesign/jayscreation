import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as nodemailer from 'nodemailer'

interface ConversationState {
  step: string
  topic: string | null
  data: {
    orderNumber?: string
    email?: string
    name?: string
    eventType?: string
    eventDate?: string
    theme?: string
    products?: string[]
    quantity?: string
    budget?: string
    phone?: string
  }
}

// ARBRES DE CONVERSATION
const ARBRES = {
  suivi_start: "Pour retrouver votre commande, j'ai besoin de quelques informations. \n\nQuel est votre numéro de commande ? (Format : JCD-2026-XXX)\n\nSi vous ne l'avez pas, tapez votre adresse email.",
  
  suivi_order_number: (content: string, data: any) => {
    const msg = content.toLowerCase().trim()
    if (msg.includes('jcd-') || /^\w+-\d{4}-\d+$/.test(msg)) {
      return {
        reply: "Merci ! \n\nEt quel est le prénom associé à cette commande ?",
        newState: { step: 'suivi_name', data: { ...data, orderNumber: content } }
      }
    } else if (msg.includes('@')) {
      return {
        reply: "Merci ! Et quel est votre prénom ?",
        newState: { step: 'suivi_name', data: { ...data, email: content } }
      }
    }
    return {
      reply: "Je n'ai pas reconnu ce format. Pouvez-vous me donner votre numéro de commande (JCD-2026-XXX) ou votre adresse email ?",
      newState: { step: 'suivi_order_number', data }
    }
  },
  
  suivi_name: (content: string, data: any) => {
    const name = content.trim()
    const recap = data.orderNumber 
      ? `Commande : ${data.orderNumber}`
      : `Email : ${data.email}`
    
    return {
      reply: `Parfait ${name} ! \n\nJe recherche votre commande...\n\nJ'ai bien noté :\n${recap}\nPrénom : ${name}\n\nJe transmets ces informations à Anaïs qui reviendra vers vous très rapidement (généralement sous 1h pendant nos horaires d'ouverture).\n\nAvez-vous d'autres questions en attendant ?`,
      newState: { step: 'suivi_complete', topic: 'suivi', data: { ...data, name } }
    }
  },

  delais_start: "Nos délais dépendent du type de création ! \n\nPour quel type de produit souhaitez-vous connaître les délais ?\n\nPapeterie digitale (téléchargeable) \u2192 immédiat\nProduits personnalisés \u2192 3-5 jours ouvrés\nSweet table complète \u2192 5-7 jours ouvrés\n\nTapez votre type de produit ou posez votre question.",
  
  delais_event: "Avez-vous une date d'événement précise ? \n\nTapez votre date (ex: 15 juin 2026) pour que je vérifie si c'est réalisable !",
  
  delais_confirm: (content: string, data: any) => {
    const eventDate = content.trim()
    const daysUntil = Math.ceil((new Date(eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntil > 10) {
      return {
        reply: "Super, c'est tout à fait faisable ! \n\nNos délais de 3 à 5 jours ouvrés vous laissent largement le temps. Voulez-vous passer commande maintenant ou avez-vous besoin d'un devis ?",
        newState: { step: 'delais_complete', topic: 'delais', data: { ...data, eventDate } }
      }
    } else if (daysUntil < 7) {
      return {
        reply: "Votre date est très proche ! \n\nSelon le produit, c'est peut-être encore possible. Je vais demander à Anaïs de vérifier en urgence. Quel produit souhaitez-vous commander ?",
        newState: { step: 'delais_urgent', topic: 'delais', data: { ...data, eventDate } }
      }
    } else {
      return {
        reply: "C'est réalisable mais il faut faire vite ! \n\nNos délais de 3-5 jours ouvrés sont justes. Quel produit souhaitez-vous commander ?",
        newState: { step: 'delais_tight', topic: 'delais', data: { ...data, eventDate } }
      }
    }
  },

  devis_start: "Je vais vous préparer un devis personnalisé ! \n\nPour quel type de création ?\n\nPapeterie (faire-parts, menus, programmes...)\nCadeaux invités (boîtes, sachets, étiquettes...)\nSweet table & décoration\nSublimation (mugs, tumblers, cadres...)\nFlocage textile\nChocolat & dragées personnalisés\nPack complet événement\n\nTapez votre choix !",
  
  devis_event: (content: string, data: any) => {
    return {
      reply: "Pour quel événement ? \n\n(Mariage, baptême, anniversaire, Ramadan/Eid, EVJF, retraite, naissance...)",
      newState: { step: 'devis_date', data: { ...data, products: [content] } }
    }
  },
  
  devis_date: (content: string, data: any) => {
    return {
      reply: "Quelle est la date prévue de votre événement ?",
      newState: { step: 'devis_quantity', data: { ...data, eventType: content } }
    }
  },
  
  devis_quantity: (content: string, data: any) => {
    return {
      reply: "Combien de personnes attendez-vous (ou quelle quantité souhaitez-vous) ?",
      newState: { step: 'devis_theme', data: { ...data, eventDate: content } }
    }
  },
  
  devis_theme: (content: string, data: any) => {
    return {
      reply: "Avez-vous un thème ou des couleurs en tête ? \n\n(Ex: champagne et or, bleu et blanc, tropical, princesse, minimaliste...)",
      newState: { step: 'devis_contact', data: { ...data, quantity: content } }
    }
  },
  
  devis_contact: (content: string, data: any) => {
    return {
      reply: "Presque terminé ! \n\nQuel est votre prénom et votre adresse email pour que je vous envoie le devis ?",
      newState: { step: 'devis_complete', data: { ...data, theme: content } }
    }
  },
  
  devis_complete: (content: string, data: any) => {
    const parts = content.trim().split(/\s+/)
    const email = parts.find(p => p.includes('@')) || ''
    const name = parts.find(p => !p.includes('@')) || ''
    
    return {
      reply: `Parfait ${name} ! \n\nVoici ce que j'ai noté :\n\nProduit : ${data.products?.join(', ')}\nÉvénement : ${data.eventType}\nDate : ${data.eventDate}\nQuantité : ${data.quantity}\nThème : ${data.theme}\nEmail : ${email}\n\nAnaïs va vous préparer un devis détaillé et vous le fera parvenir par email sous 24h ouvrées.\n\nAvez-vous des précisions à ajouter ?`,
      newState: { step: 'devis_final', topic: 'devis', data: { ...data, name, email } }
    }
  },

  perso_start: "Toutes nos créations sont 100% personnalisables ! \n\nSur quel produit souhaitez-vous des informations ?\n\n(Tapez le nom du produit ou décrivez ce que vous cherchez)",
  
  perso_event: (content: string, data: any) => {
    return {
      reply: "Super choix ! Pour quel événement est-ce ? \n\nQuel est votre thème et vos couleurs ?",
      newState: { step: 'perso_details', data: { ...data, products: [content] } }
    }
  },
  
  perso_details: (content: string, data: any) => {
    return {
      reply: "Quelles informations souhaitez-vous personnaliser ?\n\nPar exemple : prénom(s), date, citation, photo, couleurs spécifiques...",
      newState: { step: 'perso_contact', data: { ...data, theme: content } }
    }
  },
  
  perso_contact: (content: string, data: any) => {
    return {
      reply: "Super ! Laissez-moi votre prénom et email pour qu'Anaïs puisse vous faire un aperçu personnalisé gratuitement !",
      newState: { step: 'perso_complete', data }
    }
  },
  
  perso_complete: (content: string, data: any) => {
    const parts = content.trim().split(/\s+/)
    const email = parts.find(p => p.includes('@')) || ''
    const name = parts.find(p => !p.includes('@')) || ''
    
    return {
      reply: `Parfait ! Anaïs va créer un aperçu personnalisé pour vous et vous l'envoyer par email sous 24-48h.\n\nVous recevrez votre aperçu à : ${email}\n\nC'est totalement gratuit et sans engagement`,
      newState: { step: 'perso_final', topic: 'perso', data: { ...data, name, email } }
    }
  },

  mariage_start: "Félicitations pour votre mariage ! \n\nQuelle est votre date de mariage ?",
  
  mariage_theme: (content: string, data: any) => {
    return {
      reply: "Magnifique ! Quel est votre thème / vos couleurs de mariage ? \n\n(Ex: champagne et blanc, bohème, tropical, romantique, modern chic...)",
      newState: { step: 'mariage_products', data: { ...data, eventDate: content } }
    }
  },
  
  mariage_products: (content: string, data: any) => {
    return {
      reply: "Quelles créations vous intéressent ? (Plusieurs choix possibles)\n\nFaire-parts & papeterie\nBoîtes dragées & cadeaux invités\nSweet table & décoration\nCadres & souvenirs personnalisés\nSublimation (mugs, tumblers)\nPack mariage complet",
      newState: { step: 'mariage_guests', data: { ...data, theme: content } }
    }
  },
  
  mariage_guests: (content: string, data: any) => {
    return {
      reply: "Combien d'invités attendez-vous ?",
      newState: { step: 'mariage_contact', data: { ...data, products: [content] } }
    }
  },
  
  mariage_contact: (content: string, data: any) => {
    return {
      reply: "Votre prénom et email pour recevoir nos inspirations et un devis ?",
      newState: { step: 'mariage_complete', data: { ...data, quantity: content } }
    }
  },
  
  mariage_complete: (content: string, data: any) => {
    const parts = content.trim().split(/\s+/)
    const email = parts.find(p => p.includes('@')) || ''
    const name = parts.find(p => !p.includes('@')) || ''
    
    return {
      reply: `Merci ${name} ! \n\nVotre mariage : ${data.eventDate}\nThème : ${data.theme}\nInvités : ${data.quantity}\nCréations souhaitées : ${data.products?.join(', ')}\n\nAnaïs vous contactera sous 24h avec des propositions sur mesure et les tarifs.\n\nBonne préparation !`,
      newState: { step: 'mariage_final', topic: 'mariage', data: { ...data, name, email } }
    }
  },

  bapteme_start: "Quel beau moment de vie ! \n\nC'est pour un baptême religieux ou une cérémonie laïque ?",
  
  bapteme_date: (content: string, data: any) => {
    return {
      reply: "Quelle est la date du baptême ?",
      newState: { step: 'bapteme_theme', data: { ...data, eventType: content } }
    }
  },
  
  bapteme_theme: (content: string, data: any) => {
    return {
      reply: "Quel thème ou couleurs avez-vous choisi ? \n\n(Ex: étoiles, animaux, fleurs, conte de fées, marin, princesse...)",
      newState: { step: 'bapteme_products', data: { ...data, eventDate: content } }
    }
  },
  
  bapteme_products: (content: string, data: any) => {
    return {
      reply: "Quelles créations vous intéressent ?\n\nLivrets de messe / programmes\nDragées & boîtes cadeaux\nSweet table décoration\nFaire-parts & papeterie\nAlbums & souvenirs\nPack baptême complet",
      newState: { step: 'bapteme_contact', data: { ...data, theme: content } }
    }
  },
  
  bapteme_contact: (content: string, data: any) => {
    return {
      reply: "Votre prénom et email pour le devis ?",
      newState: { step: 'bapteme_complete', data: { ...data, products: [content] } }
    }
  },
  
  bapteme_complete: (content: string, data: any) => {
    const parts = content.trim().split(/\s+/)
    const email = parts.find(p => p.includes('@')) || ''
    const name = parts.find(p => !p.includes('@')) || ''
    
    return {
      reply: `Merci ${name} ! \n\nJe vais préparer votre dossier baptême :\nType : ${data.eventType}\nDate : ${data.eventDate}\nThème : ${data.theme}\nCréations : ${data.products?.join(', ')}\n\nAnaïs vous contactera sous 24h avec un devis personnalisé.`,
      newState: { step: 'bapteme_final', topic: 'bapteme', data: { ...data, name, email } }
    }
  },

  anniv_start: "Quelle belle fête en préparation ! \n\nC'est pour quel âge ?",
  
  anniv_theme: (content: string, data: any) => {
    const age = parseInt(content)
    const isChild = age < 12
    
    return {
      reply: isChild 
        ? "Quel est le thème préféré de l'enfant ? \n\n(Ex: licorne, super-héros, dinosaures, princesse, foot...)"
        : "Quel est le thème ou l'ambiance souhaitée ? \n\n(Ex: élégant, tropical, années 80, Hollywood, bohème...)",
      newState: { step: 'anniv_products', data: { ...data, quantity: content } }
    }
  },
  
  anniv_products: (content: string, data: any) => {
    return {
      reply: "Quelles créations souhaitez-vous ?\n\nDécorations & ballons personnalisés\nSweet table\nInvitations & papeterie\nCadeaux & surprises\nMugs & cadeaux sublimation\nPack anniversaire complet",
      newState: { step: 'anniv_date', data: { ...data, theme: content } }
    }
  },
  
  anniv_date: (content: string, data: any) => {
    return {
      reply: "Quelle est la date de la fête ?",
      newState: { step: 'anniv_contact', data: { ...data, products: [content] } }
    }
  },
  
  anniv_contact: (content: string, data: any) => {
    return {
      reply: "Votre prénom et email pour recevoir le devis ?",
      newState: { step: 'anniv_complete', data: { ...data, eventDate: content } }
    }
  },
  
  anniv_complete: (content: string, data: any) => {
    const parts = content.trim().split(/\s+/)
    const email = parts.find(p => p.includes('@')) || ''
    const name = parts.find(p => !p.includes('@')) || ''
    
    return {
      reply: `Super ${name} ! \n\nVotre anniversaire :\nÂge : ${data.quantity}\nThème : ${data.theme}\nDate : ${data.eventDate}\nCréations : ${data.products?.join(', ')}\n\nAnaïs vous enverra un devis sous 24h !`,
      newState: { step: 'anniv_final', topic: 'anniversaire', data: { ...data, name, email } }
    }
  },

  ramadan_start: "Ramadan Mubarak ! \n\nC'est pour le Ramadan ou l'Aïd el-Fitr / Aïd el-Adha ?",
  
  ramadan_products: (content: string, data: any) => {
    return {
      reply: "Quelles créations vous intéressent ?\n\nBoîtes cadeaux Ramadan personnalisées\nCartes et papeterie\nMugs et tumblers sublimation\nChocolats et confiseries\nSweet table Ramadan\nPack Ramadan complet",
      newState: { step: 'ramadan_quantity', data: { ...data, eventType: content } }
    }
  },
  
  ramadan_quantity: (content: string, data: any) => {
    return {
      reply: "Pour combien de personnes / quelle quantité souhaitez-vous ?",
      newState: { step: 'ramadan_contact', data: { ...data, products: [content] } }
    }
  },
  
  ramadan_contact: (content: string, data: any) => {
    return {
      reply: "Votre prénom et email pour le devis ?",
      newState: { step: 'ramadan_complete', data: { ...data, quantity: content } }
    }
  },
  
  ramadan_complete: (content: string, data: any) => {
    const parts = content.trim().split(/\s+/)
    const email = parts.find(p => p.includes('@')) || ''
    const name = parts.find(p => !p.includes('@')) || ''
    
    return {
      reply: `Merci ${name} ! \n\nVotre dossier Ramadan :\nType : ${data.eventType}\nProduits : ${data.products?.join(', ')}\nQuantité : ${data.quantity}\n\nAnaïs vous contactera sous 24h avec un devis adapté.`,
      newState: { step: 'ramadan_final', topic: 'ramadan', data: { ...data, name, email } }
    }
  }
}

const processConversation = async (
  content: string,
  currentState: ConversationState,
  sessionId: string,
  supabase: any
): Promise<{ reply: string; newState: ConversationState }> => {

  const msg = content.toLowerCase().trim()
  const { step, data } = currentState

  // DÉTECTION NOUVEAU SUJET depuis welcome
  if (step === 'welcome' || step === 'complete') {
    if (msg.includes('suivi') || msg.includes('commande')) {
      return {
        reply: ARBRES.suivi_start,
        newState: { step: 'suivi_start', topic: 'suivi', data: {} }
      }
    }
    if (msg.includes('délai') || msg.includes('livraison')) {
      return {
        reply: ARBRES.delais_start,
        newState: { step: 'delais_start', topic: 'delais', data: {} }
      }
    }
    if (msg.includes('devis') || msg.includes('tarif') || msg.includes('prix')) {
      return {
        reply: ARBRES.devis_start,
        newState: { step: 'devis_start', topic: 'devis', data: {} }
      }
    }
    if (msg.includes('personnalis')) {
      return {
        reply: ARBRES.perso_start,
        newState: { step: 'perso_start', topic: 'perso', data: {} }
      }
    }
    if (msg.includes('mariage')) {
      return {
        reply: ARBRES.mariage_start,
        newState: { step: 'mariage_start', topic: 'mariage', data: {} }
      }
    }
    if (msg.includes('baptême') || msg.includes('bapteme')) {
      return {
        reply: ARBRES.bapteme_start,
        newState: { step: 'bapteme_start', topic: 'bapteme', data: {} }
      }
    }
    if (msg.includes('anniversaire')) {
      return {
        reply: ARBRES.anniv_start,
        newState: { step: 'anniv_start', topic: 'anniversaire', data: {} }
      }
    }
    if (msg.includes('ramadan') || msg.includes('eid')) {
      return {
        reply: ARBRES.ramadan_start,
        newState: { step: 'ramadan_start', topic: 'ramadan', data: {} }
      }
    }
    // Message générique
    return {
      reply: "Merci pour votre message ! Je reviens vers vous rapidement. En attendant, puis-je vous aider avec autre chose ? (devis, suivi commande, délais, personnalisation...)",
      newState: { ...currentState, step: 'welcome', topic: currentState.topic }
    }
  }

  // PROGRESSION DANS L'ARBRE COURANT
  const handler = ARBRES[step as keyof typeof ARBRES]
  if (typeof handler === 'function') {
    const result = handler(content, data)
    return {
      ...result,
      newState: {
        step: result.newState.step,
        topic: (result.newState as any).topic || currentState.topic,
        data: result.newState.data
      }
    }
  } else if (typeof handler === 'string') {
    return {
      reply: handler,
      newState: { ...currentState, topic: currentState.topic }
    }
  }

  // Message par défaut
  return {
    reply: "Je n'ai pas bien compris. Pouvez-vous reformuler ?",
    newState: { ...currentState, topic: currentState.topic }
  }
}

const sendAdminEmail = async (topic: string, data: any, visitorInfo: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.fr', 
      port: 587, 
      secure: false,
      auth: {
        user: process.env.SMTP_USER_COMMANDE,
        pass: process.env.SMTP_PASS_COMMANDE
      }
    })
    
    let recap = ''
    Object.entries(data).forEach(([key, value]) => {
      if (value && key !== 'name' && key !== 'email') {
        recap += `${key}: ${value}\n`
      }
    })
    
    await transporter.sendMail({
      from: 'commande@jayscreationsdesign.fr',
      to: 'contact@jayscreationsdesign.fr',
      subject: ` Nouveau dossier client - ${topic} - ${data.name || 'Anonyme'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;">
          <div style="background:#8B4513;padding:16px;border-radius:8px 8px 0 0;">
            <h2 style="color:#D4A574;margin:0;font-size:16px;">
               Dossier ${topic} complété
            </h2>
          </div>
          <div style="background:#FFF8F0;padding:20px;border:1px solid #E8D5C0;">
            <p style="color:#2C1A0E;font-size:14px;margin:0 0 12px;">
              <strong>Client :</strong> ${data.name || 'Anonyme'}
              ${data.email ? ' · ' + data.email : ''}
            </p>
            <div style="background:white;border-radius:8px;
                        border:1px solid #E8D5C0;padding:14px;
                        font-size:14px;color:#2C1A0E;white-space:pre-line;">
              ${recap}
            </div>
            <div style="margin-top:16px;text-align:center;">
              <a href="https://www.jayscreationsdesign.fr/admin/chat"
                 style="background:#8B4513;color:white;
                        padding:10px 24px;border-radius:20px;
                        text-decoration:none;font-size:13px;
                        font-weight:600;">
                 Répondre dans le chat admin
              </a>
            </div>
          </div>
        </div>
      `
    })
  } catch (emailError) {
    console.error('Erreur email admin:', emailError)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, visitorId, content, visitorName, visitorEmail } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // ÉTAPE 1 - Créer ou récupérer la session
    let currentSessionId = sessionId
    let conversationState: ConversationState = { step: 'welcome', topic: null, data: {} }
    
    if (!currentSessionId) {
      const { data: session, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          visitor_id: visitorId,
          visitor_name: visitorName || null,
          visitor_email: visitorEmail || null,
          status: 'open',
          conversation_state: conversationState
        })
        .select()
        .single()

      if (sessionError) {
        console.error('Error creating session:', sessionError)
        return NextResponse.json(
          { error: 'Failed to create session' },
          { status: 500 }
        )
      }

      currentSessionId = session.id
    } else {
      // Récupérer l'état de conversation existant
      const { data: session } = await supabase
        .from('chat_sessions')
        .select('conversation_state')
        .eq('id', currentSessionId)
        .single()
      
      if (session?.conversation_state) {
        conversationState = session.conversation_state
      }
    }

    // ÉTAPE 2 - Insérer le message visiteur
    const { data: message, error: messageError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        content: content.trim(),
        sender: 'visitor',
        read: false
      })
      .select()
      .single()

    if (messageError) {
      console.error('Error inserting message:', messageError)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // ÉTAPE 3 - Traiter la conversation
    const { reply, newState } = await processConversation(
      content,
      conversationState,
      currentSessionId,
      supabase
    )

    // ÉTAPE 4 - Mettre à jour l'état de conversation
    await supabase
      .from('chat_sessions')
      .update({
        conversation_state: newState,
        last_message: content.trim().substring(0, 100),
        updated_at: new Date().toISOString()
      })
      .eq('id', currentSessionId)

    // ÉTAPE 5 - Insérer la réponse auto
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const { data: autoReplyMessage, error: autoReplyError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        content: reply,
        sender: 'admin',
        read: false
      })
      .select()
      .single()

    // ÉTAPE 6 - Envoyer email admin si conversation terminée
    if (newState.step.includes('_complete') || newState.step.includes('_final')) {
      await sendAdminEmail(newState.topic || 'chat', newState.data, {
        name: visitorName,
        email: visitorEmail
      })
    }

    // ÉTAPE 7 - Retourner la réponse
    return NextResponse.json({
      success: true,
      message,
      autoReply: autoReplyMessage,
      sessionId: currentSessionId,
      conversationState: newState
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
