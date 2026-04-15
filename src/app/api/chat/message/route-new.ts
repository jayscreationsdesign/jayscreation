import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, visitorId, content, visitorName, visitorEmail } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // ÉTAPE 1 - Créer ou récupérer la session
    let currentSessionId = sessionId
    if (!currentSessionId) {
      const { data: session, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          visitor_id: visitorId,
          visitor_name: visitorName || null,
          visitor_email: visitorEmail || null,
          status: 'open'
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

    // ÉTAPE 3 - Mettre à jour la session
    try {
      await supabase
        .from('chat_sessions')
        .update({
          last_message: content.trim().substring(0, 100),
          unread_count: supabase.rpc('increment', 
            { row_id: currentSessionId }),
          updated_at: new Date().toISOString()
        })
        .eq('id', currentSessionId)
    } catch (updateError) {
      console.error('Error updating session:', updateError)
      // Continue even if update fails
    }

    // ÉTAPE 4 - Déterminer la réponse automatique
    const getAutoReply = (msg: string): string => {
      const m = msg.toLowerCase()
      
      if (m.includes('suivi') || m.includes('commande') || 
          m.includes('suivi de commande') || m.includes('commande')) {
        return "Je vais vérifier ça pour vous ! Pouvez-vous me donner votre numéro de commande (format JCD-2026-XXX) ou l'adresse email utilisée lors de votre commande ?"
      }
      if (m.includes('délai') || m.includes('livraison') ||
          m.includes('délais') || m.includes('livraison')) {
        return "Nos délais de création sont de 3 à 5 jours ouvrés après validation de votre aperçu personnalisé. Avez-vous une date d'événement précise ? Je peux vérifier si c'est réalisable !"
      }
      if (m.includes('devis') || m.includes('tarif') || 
          m.includes('prix') || m.includes('combien') ||
          m.includes('tarifs')) {
        return "Je serais ravie de vous préparer un devis personnalisé ! Quel type de création vous intéresse ? (papeterie, sweet table, cadeaux invités, sublimation, chocolat...) Et pour quel événement ?"
      }
      if (m.includes('personnalis') || m.includes('personnalisation')) {
        return "Chaque création Jay's est 100% personnalisée ! Dites-moi votre thème, vos couleurs favorites et votre événement - je vous prépare des idées sur mesure"
      }
      if (m.includes('mariage')) {
        return "Félicitations pour votre mariage ! Nous créons de magnifiques collections : faire-parts, menus, marque-places, boîtes dragées, sweet tables... Quelle est votre date de mariage et votre thème ?"
      }
      if (m.includes('baptême') || m.includes('bapteme')) {
        return "Quel beau moment de vie ! Nous créons de jolies collections baptême : livrets de messe, dragées personnalisées, boîtes cadeaux, sweet tables... Quel thème ou couleurs avez-vous choisi ?"
      }
      if (m.includes('anniversaire')) {
        return "Super fête en préparation ! Nous faisons de la papeterie, des sweet tables et des cadeaux 100% personnalisés. Quel âge fête-t-on et quel thème vous fait envie ?"
      }
      if (m.includes('ramadan') || m.includes('eid')) {
        return "Ramadan Mubarak ! Nous créons de belles collections Ramadan et Eid : boîtes cadeaux, papeterie, sublimation... Quel type de création vous intéresse ?"
      }
      if (m.includes('sublimation') || m.includes('mug') || 
          m.includes('tumbler')) {
        return "Nos créations sublimation sont superbes ! Mugs, tumblers, cadres photo... Tout est personnalisé avec vos photos et textes. Quel produit vous intéresse ?"
      }
      if (m.includes('flock') || m.includes('flocage') || 
          m.includes('textile') || m.includes('tshirt') ||
          m.includes('t-shirt')) {
        return "Notre service de flocage textile donne un rendu premium ! Tee-shirts, sweats, tabliers... Quelle quantité et quel visuel avez-vous en tête ?"
      }
      if (m.includes('chocolat') || m.includes('dragée')) {
        return "Nos chocolats et dragées personnalisés sont un vrai succès ! Packaging sur mesure, saveurs au choix. Pour quel événement et quelle quantité ?"
      }
      if (m.includes('sweet table') || m.includes('candy')) {
        return "Une sweet table Jay's, c'est magique ! Nous créons des décors complets : supports, étiquettes, ballons, fleurs... Quel thème et quelle date d'événement ?"
      }
      if (m.includes('disponible') || m.includes('stock')) {
        return "Pour vérifier la disponibilité d'un produit, pouvez-vous me préciser lequel vous intéresse ? Je vérifie ça pour vous immédiatement !"
      }
      if (m.includes('retour') || m.includes('remboursement') || 
          m.includes('problème') || m.includes('probleme')) {
        return "Je suis désolée d'apprendre ça ! Pouvez-vous me donner votre numéro de commande et me décrire le problème ? Je vais tout faire pour arranger ça rapidement."
      }
      if (m.includes('bonjour') || m.includes('hello') || 
          m.includes('salut') || m.includes('bonsoir')) {
        return "Bonjour ! Ravie de vous accueillir chez Jay's Creations Design ! Comment puis-je vous aider aujourd'hui ?"
      }
      
      // Réponse générique
      return "Merci pour votre message ! Je reviens vers vous dans les plus brefs délais (généralement sous 1h pendant nos horaires). En attendant, découvrez nos créations sur notre boutique !"
    }

    // ÉTAPE 5 - Insérer la réponse auto dans Supabase
    const autoReplyContent = getAutoReply(content)
    
    // Délai simulé de 2 secondes avant insertion
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const { data: autoReplyMessage, error: autoReplyError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        content: autoReplyContent,
        sender: 'admin',
        read: false
      })
      .select()
      .single()

    if (autoReplyError) {
      console.error('Error inserting auto-reply:', autoReplyError)
      // Continue even if auto-reply fails
    }

    // ÉTAPE 6 - Email d'alerte admin
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
      
      await transporter.sendMail({
        from: 'commande@jayscreationsdesign.fr',
        to: 'contact@jayscreationsdesign.fr',
        subject: ' Nouveau message chat - Jay\'s Creations Design',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;">
            <div style="background:#8B4513;padding:16px;border-radius:8px 8px 0 0;">
              <h2 style="color:#D4A574;margin:0;font-size:16px;">
                 Nouveau message chat
              </h2>
            </div>
            <div style="background:#FFF8F0;padding:20px;border:1px solid #E8D5C0;">
              <p style="color:#2C1A0E;font-size:14px;margin:0 0 12px;">
                <strong>Visiteur :</strong> 
                ${visitorName || 'Anonyme'}
                ${visitorEmail ? ' · ' + visitorEmail : ''}
              </p>
              <div style="background:white;border-radius:8px;
                          border:1px solid #E8D5C0;padding:14px;
                          font-size:14px;color:#2C1A0E;">
                "${content}"
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
            <div style="background:#2C1A0E;padding:12px;
                        border-radius:0 0 8px 8px;text-align:center;">
              <p style="color:#D4A574;font-size:11px;margin:0;">
                Jay's Creations Design · Admin
              </p>
            </div>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Erreur email chat:', emailError)
      // Ne pas faire planter si email échoue
    }

    // ÉTAPE 7 - Retourner la réponse
    return NextResponse.json({
      success: true,
      message,
      autoReply: autoReplyMessage,
      sessionId: currentSessionId
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
