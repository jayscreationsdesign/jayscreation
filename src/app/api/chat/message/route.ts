import { NextRequest, NextResponse } from 'next/server'
import { chatService } from '@/lib/supabase/chat'
import * as nodemailer from 'nodemailer'

// Auto-responses logic
function getAutoResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('commande') || lowerMessage.includes('suivi')) {
    return "Je vérifie votre commande. Pouvez-vous me donner votre numéro de commande ou email de commande ?"
  }
  
  if (lowerMessage.includes('délai') || lowerMessage.includes('livraison')) {
    return "Nos délais habituels sont de 3 à 5 jours ouvrés après validation de votre aperçu. Avez-vous une date d'événement précise ?"
  }
  
  if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('devis')) {
    return "Je serais ravie de vous faire un devis personnalisé ! Quel type de produit vous intéresse ?"
  }
  
  if (lowerMessage.includes('personnalis')) {
    return "Tous nos produits sont 100% personnalisables ! Dites-moi votre thème et je vous propose des idées."
  }
  
  return "Merci pour votre message ! Je reviens vers vous très rapidement. En attendant, n'hésitez pas à consulter notre boutique."
}

// Email notification
async function sendEmailNotification(visitorName: string | undefined, visitorEmail: string | undefined, message: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message chat</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #faf7f2;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white;">
          <!-- Header -->
          <div style="background-color: #6B3A2A; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Jay's Creations Design</h1>
            <p style="color: #C8A96E; margin: 5px 0 0 0; font-size: 14px;">Nouveau message chat</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="background-color: #faf7f2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #6B3A2A; margin: 0 0 15px 0; font-size: 18px;">Détails du message</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #3d2010;">Visiteur:</strong>
                <p style="margin: 5px 0; color: #6b6b6b;">
                  ${visitorName || 'Visiteur anonyme'}
                  ${visitorEmail ? `(${visitorEmail})` : ''}
                </p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #3d2010;">Message:</strong>
                <p style="margin: 5px 0; color: #6b6b6b; background-color: white; padding: 10px; border-radius: 4px; border-left: 4px solid #6B3A2A;">
                  ${message}
                </p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #3d2010;">Date:</strong>
                <p style="margin: 5px 0; color: #6b6b6b;">${new Date().toLocaleString('fr-FR')}</p>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="https://jayscreationsdesign.fr/admin/chat" 
                 style="background-color: #6B3A2A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Répondre au message
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #6B3A2A; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 12px;">
              © 2024 Jay's Creations Design - Tous droits réservés
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'commande@jayscreationsdesign.fr',
      to: 'contact@jayscreationsdesign.fr',
      subject: 'Nouveau message chat - Jay\'s Creations',
      html: htmlContent,
    })

    console.log('Email notification sent successfully')
  } catch (error: unknown) {
    console.error('Error sending email notification:', error instanceof Error ? error.message : String(error))
  }
}

// WhatsApp notification (Twilio)
async function sendWhatsAppNotification(visitorName: string | undefined, message: string) {
  try {
    const twilio = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )

    const whatsappMessage = `Nouveau message chat JCD\nDe: ${visitorName || 'Visiteur anonyme'}\nMessage: ${message}\nRépondre: jayscreationsdesign.fr/admin/chat`

    await twilio.messages.create({
      body: whatsappMessage,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO,
    })

    console.log('WhatsApp notification sent successfully')
  } catch (error: unknown) {
    // Silently fail if Twilio is not configured
    console.log('WhatsApp notification not sent (Twilio not configured):', error instanceof Error ? error.message : String(error))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { visitorId, visitorName, visitorEmail, content, isFirstMessage } = body

    if (!visitorId || !content) {
      return NextResponse.json(
        { error: 'visitorId and content are required' },
        { status: 400 }
      )
    }

    // Get or create session
    let session = await chatService.getSession(visitorId)
    if (!session) {
      session = await chatService.createSession(visitorId, visitorName, visitorEmail)
    }

    // Send message
    const message = await chatService.sendMessage(session.id, content, 'visitor')

    // Send notifications
    await sendEmailNotification(visitorName, visitorEmail, content)
    await sendWhatsAppNotification(visitorName, content)

    // Send auto-response if it's the first message
    if (isFirstMessage) {
      setTimeout(async () => {
        try {
          const autoResponse = getAutoResponse(content)
          await chatService.sendMessage(session.id, autoResponse, 'admin')
        } catch (error: unknown) {
          console.error('Error sending auto-response:', error instanceof Error ? error.message : String(error))
        }
      }, 1000)
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageId: message.id
    })

  } catch (error: unknown) {
    console.error('Error in chat message API:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API - Jay\'s Creations Design',
    usage: {
      method: 'POST',
      body: {
        visitorId: 'string (required)',
        visitorName: 'string (optional)',
        visitorEmail: 'string (optional)',
        content: 'string (required)',
        isFirstMessage: 'boolean (optional)'
      }
    }
  })
}
