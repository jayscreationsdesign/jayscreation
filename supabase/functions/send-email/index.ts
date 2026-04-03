import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, from, replyTo } = await req.json()

    // Configuration IONOS Email Marketing
    const emailConfig = {
      host: 'smtp.ionos.de',
      port: 587,
      secure: false,
      auth: {
        user: Deno.env.get('IONOS_EMAIL_USER'),
        pass: Deno.env.get('IONOS_EMAIL_PASS'),
      },
    }

    // Créer le contenu email
    const emailContent = `
      From: ${from || 'newsletter@jayscreationsdesign.fr'}
      To: ${to}
      Reply-To: ${replyTo || 'contact@jayscreationsdesign.fr'}
      Subject: ${subject}
      Content-Type: text/html; charset=utf-8
      
      ${html}
    `

    // Envoyer l'email via fetch vers un service SMTP externe
    // Note: Vous devrez configurer un service SMTP relay ou utiliser Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from || 'newsletter@jayscreationsdesign.fr',
        to: [to],
        subject: subject,
        html: html,
        reply_to: replyTo || 'contact@jayscreationsdesign.fr',
      }),
    })

    if (!response.ok) {
      throw new Error(`Erreur envoi email: ${response.statusText}`)
    }

    const data = await response.json()

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
