import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionId, visitorId, content } = body
    
    console.log(' Message reçu:', { content, sessionId, visitorId })

    // 1. Créer session si nécessaire
    let currentSessionId = sessionId
    if (!currentSessionId) {
      const { data: session, error: sessionError } = 
        await supabase
          .from('chat_sessions')
          .insert({
            visitor_id: visitorId || 'anonymous',
            status: 'open',
            conversation_state: {
              step: 'welcome',
              topic: null,
              data: {}
            }
          })
          .select()
          .single()
      
      if (sessionError) {
        console.error('Erreur création session:', sessionError)
        // Continuer sans session Supabase
        currentSessionId = null
      } else {
        currentSessionId = session.id
      }
    }

    // 2. Récupérer l'état de conversation
    let conversationState = { 
      step: 'welcome', topic: null, data: {} 
    }
    
    if (currentSessionId) {
      const { data: session } = await supabase
        .from('chat_sessions')
        .select('conversation_state')
        .eq('id', currentSessionId)
        .single()
      
      if (session?.conversation_state) {
        conversationState = session.conversation_state
      }
    }

    // 3. Insérer le message visiteur
    let insertedMessage = null
    if (currentSessionId) {
      const { data: msg } = await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSessionId,
          content: content.trim(),
          sender: 'visitor',
          read: false
        })
        .select()
        .single()
      insertedMessage = msg
    }

    // 4. Déterminer la réponse automatique
    const getAutoReply = (
      msg: string, 
      state: any
    ): { reply: string; newState: any } => {
      const m = msg.toLowerCase()
      const step = state.step

      //  DÉTECTION SUJET DEPUIS WELCOME 
      if (step === 'welcome' || !step) {
        
        if (m.includes('suivi') || 
            m.includes('commande') || 
            m.includes('')) {
          return {
            reply: "Pour retrouver votre commande, j'ai besoin de quelques informations. \n\nQuel est votre numéro de commande ? (Format : JCD-2026-XXX)\n\nSi vous ne l'avez pas, tapez simplement votre adresse email.",
            newState: { step: 'suivi_numero', topic: 'suivi', data: {} }
          }
        }
        
        if (m.includes('délai') || 
            m.includes('livraison') || 
            m.includes('')) {
          return {
            reply: "Nos délais dépendent du type de création ! \n\n Papeterie digitale \u2192 immédiat après paiement\n Produits personnalisés \u2192 3-5 jours ouvrés\n Sweet table complète \u2192 5-7 jours ouvrés\n\nAvez-vous une date d'événement précise ? ",
            newState: { step: 'delais_date', topic: 'delais', data: {} }
          }
        }
        
        if (m.includes('devis') || 
            m.includes('tarif') || 
            m.includes('prix') || 
            m.includes('combien') ||
            m.includes('')) {
          return {
            reply: "Je vais vous préparer un devis personnalisé ! \n\nPour quel type de création ?\n\n Papeterie (faire-parts, menus...)\n Cadeaux invités\n Sweet table & décoration\n Sublimation (mugs, tumblers)\n Flocage textile\n Chocolat & dragées\n Pack complet\n\nTapez votre choix !",
            newState: { step: 'devis_produit', topic: 'devis', data: {} }
          }
        }
        
        if (m.includes('personnalis') || 
            m.includes('')) {
          return {
            reply: "Toutes nos créations sont 100% personnalisables ! \n\nSur quel produit souhaitez-vous des informations ?\n(Tapez le nom ou décrivez ce que vous cherchez)",
            newState: { step: 'perso_produit', topic: 'perso', data: {} }
          }
        }
        
        if (m.includes('mariage') || 
            m.includes('')) {
          return {
            reply: "Félicitations pour votre mariage ! \n\nQuelle est votre date de mariage ?",
            newState: { step: 'mariage_date', topic: 'mariage', data: {} }
          }
        }
        
        if (m.includes('baptême') || 
            m.includes('bapteme') || 
            m.includes('')) {
          return {
            reply: "Quel beau moment de vie ! \n\nC'est pour un baptême religieux ou une cérémonie laïque ?",
            newState: { step: 'bapteme_type', topic: 'bapteme', data: {} }
          }
        }
        
        if (m.includes('anniversaire') || 
            m.includes('')) {
          return {
            reply: "Quelle belle fête en préparation ! \n\nC'est pour quel âge ?",
            newState: { step: 'anniv_age', topic: 'anniversaire', data: {} }
          }
        }
        
        if (m.includes('ramadan') || 
            m.includes('eid') || 
            m.includes('')) {
          return {
            reply: "Ramadan Mubarak ! \n\nC'est pour le Ramadan ou l'Aïd el-Fitr / Aïd el-Adha ?",
            newState: { step: 'ramadan_type', topic: 'ramadan', data: {} }
          }
        }
        
        // Réponse générique
        return {
          reply: "Merci pour votre message ! \n\nJe reviens vers vous très rapidement. Puis-je vous aider avec :\n\n Suivi de commande\n Devis personnalisé\n Délais de livraison\n Personnalisation\n\nTapez votre besoin !",
          newState: { ...state, step: 'welcome' }
        }
      }

      //  PROGRESSION SUIVI 
      if (step === 'suivi_numero') {
        const hasOrderNum = m.includes('jcd') || 
                           /\d{3,}/.test(m)
        const hasEmail = m.includes('@')
        
        const newData = hasEmail 
          ? { ...state.data, email: msg.trim() }
          : { ...state.data, orderNumber: msg.trim() }
        
        return {
          reply: `Merci !  Et quel est le prénom associé à cette commande ?`,
          newState: { 
            step: 'suivi_prenom', 
            topic: 'suivi', 
            data: newData 
          }
        }
      }
      
      if (step === 'suivi_prenom') {
        const ref = state.data.orderNumber || state.data.email
        return {
          reply: `Parfait ${msg.trim()} ! \n\nJ'ai bien noté :\n Référence : ${ref}\n Prénom : ${msg.trim()}\n\nAnaïs va vérifier votre commande et revient vers vous très rapidement (sous 1h en horaires d'ouverture).\n\nAvez-vous d'autres questions ? `,
          newState: { 
            step: 'complete', 
            topic: 'suivi', 
            data: { ...state.data, name: msg.trim() } 
          }
        }
      }

      //  PROGRESSION DÉLAIS 
      if (step === 'delais_date') {
        return {
          reply: `Merci !  Votre date : ${msg.trim()}\n\nSelon nos délais habituels (3-5 jours ouvrés), votre commande est tout à fait réalisable.\n\nVoulez-vous passer commande maintenant ou souhaitez-vous un devis détaillé ? `,
          newState: { 
            step: 'complete', 
            topic: 'delais', 
            data: { ...state.data, eventDate: msg.trim() } 
          }
        }
      }

      //  PROGRESSION DEVIS 
      if (step === 'devis_produit') {
        return {
          reply: `Super choix ! \n\nPour quel événement est-ce ?\n(Mariage, baptême, anniversaire, Ramadan/Eid, EVJF, naissance, retraite...)`,
          newState: { 
            step: 'devis_evenement', 
            topic: 'devis', 
            data: { ...state.data, products: msg.trim() } 
          }
        }
      }
      
      if (step === 'devis_evenement') {
        return {
          reply: `Parfait ! \n\nQuelle est la date prévue de votre événement ?`,
          newState: { 
            step: 'devis_date', 
            topic: 'devis', 
            data: { ...state.data, eventType: msg.trim() } 
          }
        }
      }
      
      if (step === 'devis_date') {
        return {
          reply: `Noté ! \n\nCombien de personnes attendez-vous (ou quelle quantité souhaitez-vous) ?`,
          newState: { 
            step: 'devis_quantite', 
            topic: 'devis', 
            data: { ...state.data, eventDate: msg.trim() } 
          }
        }
      }
      
      if (step === 'devis_quantite') {
        return {
          reply: `Super ! \n\nAvez-vous un thème ou des couleurs en tête ?\n(Ex: champagne et or, bleu et blanc, tropical, princesse, minimaliste...)`,
          newState: { 
            step: 'devis_theme', 
            topic: 'devis', 
            data: { ...state.data, quantity: msg.trim() } 
          }
        }
      }
      
      if (step === 'devis_theme') {
        return {
          reply: `Magnifique ! \n\nDernière étape ! Votre prénom et adresse email pour recevoir le devis ?`,
          newState: { 
            step: 'devis_contact', 
            topic: 'devis', 
            data: { ...state.data, theme: msg.trim() } 
          }
        }
      }
      
      if (step === 'devis_contact') {
        const emailMatch = msg.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        )
        const email = emailMatch ? emailMatch[0] : msg
        const d = state.data
        return {
          reply: `Parfait !  Voici le récapitulatif :\n\n Produit : ${d.products || 'N/A'}\n Événement : ${d.eventType || 'N/A'}\n Date : ${d.eventDate || 'N/A'}\n Quantité : ${d.quantity || 'N/A'}\n Thème : ${d.theme || 'N/A'}\n Email : ${email}\n\nAnaïs vous prépare un devis détaillé et vous l'envoie sous 24h ouvrées. \n\nAvez-vous des précisions à ajouter ?`,
          newState: { 
            step: 'complete', 
            topic: 'devis', 
            data: { ...state.data, email } 
          }
        }
      }

      //  PROGRESSION MARIAGE 
      if (step === 'mariage_date') {
        return {
          reply: `Magnifique ! \n\nQuel est votre thème / vos couleurs de mariage ? \n(Ex: champagne, bohème, tropical, romantique, modern chic...)`,
          newState: { 
            step: 'mariage_theme', 
            topic: 'mariage', 
            data: { ...state.data, eventDate: msg.trim() } 
          }
        }
      }
      
      if (step === 'mariage_theme') {
        return {
          reply: `Très beau thème ! \n\nQuelles créations vous intéressent ?\n\n Faire-parts & papeterie\n Boîtes dragées & cadeaux\n Sweet table\n Cadres & souvenirs\n Sublimation (mugs, tumblers)\n Pack mariage complet\n\n(Vous pouvez choisir plusieurs)`,
          newState: { 
            step: 'mariage_produits', 
            topic: 'mariage', 
            data: { ...state.data, theme: msg.trim() } 
          }
        }
      }
      
      if (step === 'mariage_produits') {
        return {
          reply: `Super ! \n\nCombien d'invités attendez-vous ?`,
          newState: { 
            step: 'mariage_invites', 
            topic: 'mariage', 
            data: { ...state.data, products: msg.trim() } 
          }
        }
      }
      
      if (step === 'mariage_invites') {
        return {
          reply: `Votre prénom et email pour recevoir nos inspirations et un devis ? `,
          newState: { 
            step: 'mariage_contact', 
            topic: 'mariage', 
            data: { ...state.data, quantity: msg.trim() } 
          }
        }
      }
      
      if (step === 'mariage_contact') {
        const emailMatch = msg.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        )
        const email = emailMatch ? emailMatch[0] : ''
        const d = state.data
        return {
          reply: `Merci ! \n\nRécapitulatif mariage :\n Date : ${d.eventDate}\n Thème : ${d.theme}\n Invités : ${d.quantity}\n Créations : ${d.products}\n\nAnaïs vous contacte sous 24h avec des propositions sur mesure. Bonne préparation ! `,
          newState: { 
            step: 'complete', 
            topic: 'mariage', 
            data: { ...state.data, email } 
          }
        }
      }

      //  PROGRESSION BAPTÊME 
      if (step === 'bapteme_type') {
        return {
          reply: `Quelle est la date du baptême ? `,
          newState: { 
            step: 'bapteme_date', 
            topic: 'bapteme', 
            data: { ...state.data, eventType: msg.trim() } 
          }
        }
      }
      
      if (step === 'bapteme_date') {
        return {
          reply: `Quel thème ou couleurs avez-vous choisi ? \n(Ex: étoiles, animaux, fleurs, conte de fées, marin, princesse...)`,
          newState: { 
            step: 'bapteme_theme', 
            topic: 'bapteme', 
            data: { ...state.data, eventDate: msg.trim() } 
          }
        }
      }
      
      if (step === 'bapteme_theme') {
        return {
          reply: `Magnifique ! \n\nQuelles créations vous intéressent ?\n\n Livrets de messe / programmes\n Dragées & boîtes cadeaux\n Sweet table\n Faire-parts\n Pack baptême complet`,
          newState: { 
            step: 'bapteme_produits', 
            topic: 'bapteme', 
            data: { ...state.data, theme: msg.trim() } 
          }
        }
      }
      
      if (step === 'bapteme_produits') {
        return {
          reply: `Votre prénom et email pour le devis ? `,
          newState: { 
            step: 'bapteme_contact', 
            topic: 'bapteme', 
            data: { ...state.data, products: msg.trim() } 
          }
        }
      }
      
      if (step === 'bapteme_contact') {
        const emailMatch = msg.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        )
        const email = emailMatch ? emailMatch[0] : ''
        const d = state.data
        return {
          reply: `Merci ! \n\nRécapitulatif baptême :\n Date : ${d.eventDate}\n Thème : ${d.theme}\n Créations : ${d.products}\n\nAnaïs vous contacte sous 24h avec le devis. `,
          newState: { 
            step: 'complete', 
            topic: 'bapteme', 
            data: { ...state.data, email } 
          }
        }
      }

      //  PROGRESSION ANNIVERSAIRE 
      if (step === 'anniv_age') {
        return {
          reply: `Super ! \n\nQuel est le thème souhaité ? \n(Ex: licorne, super-héros, princesse, tropical, élégant...)`,
          newState: { 
            step: 'anniv_theme', 
            topic: 'anniversaire', 
            data: { ...state.data, quantity: msg.trim() } 
          }
        }
      }
      
      if (step === 'anniv_theme') {
        return {
          reply: `Génial ! \n\nQuelle est la date de la fête ? `,
          newState: { 
            step: 'anniv_date', 
            topic: 'anniversaire', 
            data: { ...state.data, theme: msg.trim() } 
          }
        }
      }
      
      if (step === 'anniv_date') {
        return {
          reply: `Noté ! \n\nVotre prénom et email pour le devis ? `,
          newState: { 
            step: 'anniv_contact', 
            topic: 'anniversaire', 
            data: { ...state.data, eventDate: msg.trim() } 
          }
        }
      }
      
      if (step === 'anniv_contact') {
        const emailMatch = msg.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        )
        const email = emailMatch ? emailMatch[0] : ''
        const d = state.data
        return {
          reply: `Parfait ! \n\nRécapitulatif :\n Âge : ${d.quantity}\n Thème : ${d.theme}\n Date : ${d.eventDate}\n\nAnaïs vous contacte sous 24h ! `,
          newState: { 
            step: 'complete', 
            topic: 'anniversaire', 
            data: { ...state.data, email } 
          }
        }
      }

      //  PROGRESSION RAMADAN 
      if (step === 'ramadan_type') {
        return {
          reply: `Quelles créations vous intéressent ? \n\n Boîtes cadeaux personnalisées\n Cartes et papeterie\n Mugs et tumblers\n Chocolats et confiseries\n Sweet table Ramadan\n Pack complet`,
          newState: { 
            step: 'ramadan_produits', 
            topic: 'ramadan', 
            data: { ...state.data, eventType: msg.trim() } 
          }
        }
      }
      
      if (step === 'ramadan_produits') {
        return {
          reply: `Pour combien de personnes / quelle quantité ? `,
          newState: { 
            step: 'ramadan_quantite', 
            topic: 'ramadan', 
            data: { ...state.data, products: msg.trim() } 
          }
        }
      }
      
      if (step === 'ramadan_quantite') {
        return {
          reply: `Votre prénom et email pour le devis ? `,
          newState: { 
            step: 'ramadan_contact', 
            topic: 'ramadan', 
            data: { ...state.data, quantity: msg.trim() } 
          }
        }
      }
      
      if (step === 'ramadan_contact') {
        const emailMatch = msg.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        )
        const email = emailMatch ? emailMatch[0] : ''
        const d = state.data
        return {
          reply: `Ramadan Mubarak ! \n\nRécapitulatif :\n Créations : ${d.products}\n Quantité : ${d.quantity}\n\nAnaïs vous contacte sous 24h avec le devis ! `,
          newState: { 
            step: 'complete', 
            topic: 'ramadan', 
            data: { ...state.data, email } 
          }
        }
      }

      //  PERSONNALISATION 
      if (step === 'perso_produit') {
        return {
          reply: `Super choix ! \n\nPour quel événement et avec quel thème / couleurs ?`,
          newState: { 
            step: 'perso_theme', 
            topic: 'perso', 
            data: { ...state.data, products: msg.trim() } 
          }
        }
      }
      
      if (step === 'perso_theme') {
        return {
          reply: `Votre prénom et email pour qu'Anaïs vous prépare un aperçu gratuit ? `,
          newState: { 
            step: 'perso_contact', 
            topic: 'perso', 
            data: { ...state.data, theme: msg.trim() } 
          }
        }
      }
      
      if (step === 'perso_contact') {
        const emailMatch = msg.match(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        )
        const email = emailMatch ? emailMatch[0] : ''
        return {
          reply: `Parfait ! \n\nAnaïs va créer un aperçu personnalisé gratuit et vous l'envoie sous 24-48h à ${email}.\n\nC'est sans engagement, juste pour vous montrer le résultat `,
          newState: { 
            step: 'complete', 
            topic: 'perso', 
            data: { ...state.data, email } 
          }
        }
      }

      // Fallback
      return {
        reply: "Merci !  Anaïs reviendra vers vous très rapidement. Avez-vous d'autres questions ?",
        newState: { ...state, step: 'complete' }
      }
    }

    // 5. Calculer la réponse
    const { reply, newState } = getAutoReply(
      content, conversationState
    )
    
    // 6. Mettre à jour l'état dans Supabase
    if (currentSessionId) {
      await supabase
        .from('chat_sessions')
        .update({
          conversation_state: newState,
          last_message: content.trim().substring(0, 100),
          updated_at: new Date().toISOString()
        })
        .eq('id', currentSessionId)
    }

    // 7. Insérer la réponse auto après délai
    let autoReplyMessage = null
    await new Promise(r => setTimeout(r, 1500))
    
    if (currentSessionId) {
      const { data: autoMsg } = await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSessionId,
          content: reply,
          sender: 'admin',
          read: false
        })
        .select()
        .single()
      autoReplyMessage = autoMsg
    }

    // 8. Email admin si dossier complet
    if (newState.step === 'complete' && newState.data) {
      try {
        const nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({
          host: 'smtp.ionos.fr',
          port: 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER_CONTACT,
            pass: process.env.SMTP_PASS_CONTACT
          }
        })
        
        const dataLines = Object.entries(newState.data)
          .filter(([, v]) => v)
          .map(([k, v]) => `<li><strong>${k}</strong> : ${v}</li>`)
          .join('')
        
        await transporter.sendMail({
          from: 'contact@jayscreationsdesign.fr',
          to: 'contact@jayscreationsdesign.fr',
          subject: ` Nouveau dossier  ${newState.topic}  ${newState.data.name || newState.data.email || 'Client'}`,
          encoding: 'utf-8',
          html: `
            <div style="font-family:Arial;max-width:500px;">
              <div style="background:#8B4513;padding:16px;
                          border-radius:8px 8px 0 0;">
                <h2 style="color:#D4A574;margin:0;">
                   Nouveau dossier client
                </h2>
                <p style="color:#FFF8F0;margin:4px 0 0;
                           font-size:13px;">
                  Sujet : ${newState.topic}
                </p>
              </div>
              <div style="background:#FFF8F0;padding:20px;
                           border:1px solid #E8D5C0;">
                <ul style="list-style:none;padding:0;
                            font-size:14px;color:#2C1A0E;">
                  ${dataLines}
                </ul>
                <div style="margin-top:16px;text-align:center;">
                  <a href="https://www.jayscreationsdesign.fr/admin/chat"
                     style="background:#8B4513;color:white;
                            padding:10px 24px;border-radius:20px;
                            text-decoration:none;font-size:13px;
                            font-weight:600;">
                     Répondre dans le chat
                  </a>
                </div>
              </div>
            </div>
          `
        })
      } catch (e) {
        console.error('Email admin error:', e)
      }
    }

    // 9. Retourner la réponse
    return Response.json({
      success: true,
      message: insertedMessage || {
        id: 'local-' + Date.now(),
        content,
        sender: 'visitor',
        created_at: new Date().toISOString()
      },
      autoReply: autoReplyMessage || {
        id: 'auto-' + Date.now(),
        content: reply,
        sender: 'admin',
        created_at: new Date().toISOString()
      },
      sessionId: currentSessionId
    })

  } catch (error) {
    console.error('Erreur route chat:', error)
    return Response.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
