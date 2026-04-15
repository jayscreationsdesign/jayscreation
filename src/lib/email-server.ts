import nodemailer from 'nodemailer';
import { EMAIL_HEADER, EMAIL_FOOTER, EMAIL_MERCI, emailBande, emailCTA, emailWrap, encodeHtml } from './email-template-base';

// TRANSPORTEURS
const transporterCommande = nodemailer.createTransport({
  host: 'smtp.ionos.fr', port: 587, secure: false,
  auth: { user: 'commande@jayscreationsdesign.fr',
          pass: 'Kenays971238.' }
})

const transporterContact = nodemailer.createTransport({
  host: 'smtp.ionos.fr', port: 587, secure: false,
  auth: { user: process.env.SMTP_USER_CONTACT,
          pass: process.env.SMTP_PASS_CONTACT }
})

// EMAIL 1 - Confirmation commande client
export async function sendOrderConfirmationEmail(order: any) {
  const itemsHtml = order.items.map((item: any) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:#FFF8F0;border-radius:8px;
                  border:1px solid #E8E4DF;margin-bottom:8px;">
      <tr>
        <td style="padding:14px 16px;">
          <table width="100%">
            <tr>
              <td>
                <div style="font-size:14px;font-weight:600;color:#2C1A0E;">
                  ${encodeHtml(item.name)}
                </div>
                <div style="font-size:12px;color:#aaa;margin-top:3px;">
                  Quantit&eacute; : ${item.quantity}
                </div>
              </td>
              <td style="text-align:right;vertical-align:middle;">
                <div style="font-family:'Playfair Display',serif;
                            font-size:20px;font-weight:700;color:#8B4513;">
                  ${(item.price * item.quantity).toFixed(2).replace('.', ',')}&euro;
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`).join('')

  const contenu = `
    ${emailBande('&#10003;', 'Commande confirm&eacute;e !',
      'Merci ' + encodeHtml(order.customerName) + ' &agrave; votre commande est valid&eacute;e')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:14px;
                      padding-bottom:10px;border-bottom:1px solid #E8E4DF;">
            &#9679; R&eacute;capitulatif de votre commande
          </div>
          <table width="100%">
            <tr>
              <td width="50%">
                <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                            letter-spacing:1px;">Commande n&deg;</div>
                <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                            margin-top:3px;">${encodeHtml(order.number)}</div>
              </td>
              <td width="50%">
                <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                            letter-spacing:1px;">Date</div>
                <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                            margin-top:3px;">
                  ${new Date(order.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </td>
            </tr>
            <tr><td colspan="2" style="padding-top:12px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;">Email</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                          margin-top:3px;">${encodeHtml(order.customerEmail)}</div>
            </td></tr>
          </table>
        </td></tr>
      </table>
      <div style="font-family:'Playfair Display',serif;font-size:15px;
                  font-weight:600;color:#2C1A0E;margin-bottom:12px;">
        Articles command&eacute;s
      </div>
      ${itemsHtml}
      <table width="100%">
        <tr><td style="text-align:right;padding:14px 0;
                       border-top:2px solid #8B4513;">
          <span style="font-family:'Playfair Display',serif;font-size:20px;
                       font-weight:700;color:#2C1A0E;">
            Total : <span style="color:#8B4513;">
              ${order.total.toFixed(2).replace('.', ',')}&euro;
            </span>
          </span>
        </td></tr>
      </table>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/compte/commandes',
        '&agrave; Suivre ma commande')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Votre cr&eacute;ation sera pr&eacute;par&eacute;e avec soin sous 3 &agrave; 5 jours ouvr&eacute;s.
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "â¨ Commande confirm&eacute;e â Jay's Creations Design",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email confirmation:', error)
    return { success: false, error }
  }
}

// EMAIL ADMIN - Nouvelle commande avec 2 CTAs
export async function sendNewOrderAdminEmail(order: any) {
  const validateUrl = process.env.NEXT_PUBLIC_SITE_URL +
    '/api/admin/validate-order?token=' + order.adminToken
  const cancelUrl = process.env.NEXT_PUBLIC_SITE_URL +
    '/api/admin/cancel-order?token=' + order.adminToken

  const contenu = `
    ${emailBande('â', 'Nouvelle commande !', 'En attente de validation')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:14px;
                      padding-bottom:10px;border-bottom:1px solid #E8E4DF;">
            â D&eacute;tails de la commande
          </div>
          <table width="100%">
            <tr>
              <td width="50%">
                <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                            letter-spacing:1px;">Client</div>
                <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                            margin-top:3px;">${encodeHtml(order.customerName)}</div>
              </td>
              <td width="50%">
                <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                            letter-spacing:1px;">Email</div>
                <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                            margin-top:3px;">${encodeHtml(order.customerEmail)}</div>
              </td>
            </tr>
            <tr><td colspan="2" style="padding-top:12px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;">Total</div>
              <div style="font-size:18px;color:#8B4513;font-weight:700;
                          margin-top:3px;">
                ${order.total.toFixed(2).replace('.', ',')}&euro;
              </div>
            </td></tr>
          </table>
        </td></tr>
      </table>
      <div style="font-family:'Playfair Display',serif;font-size:15px;
                  font-weight:600;color:#2C1A0E;margin-bottom:12px;">
        Actions rapides
      </div>
      ${emailCTA(validateUrl, 'â Valider la commande')}
      ${emailBande(cancelUrl, 'â Annuler la commande', '#dc3545')}
      <p style="font-size:10px;color:#aaa;text-align:center;margin-top:8px;">
        Valider â email "En pr&eacute;paration" envoy&eacute; au client<br>
        Annuler â remboursement Stripe + email annulation envoy&eacute; au client
      </p>
    </td></tr>`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: 'commande@jayscreationsdesign.fr',
      subject: `â Nouvelle commande #${encodeHtml(order.number)} â ${encodeHtml(order.customerName)}`,
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email admin:', error)
    return { success: false, error }
  }
}

// Autres fonctions email...
export async function sendEmail(params: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  try {
    await transporterContact.sendMail({
      from: params.from || "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: params.to,
      subject: params.subject,
      html: params.html,
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email générique:', error)
    return { success: false, error }
  }
}

export const emailTemplates = {
  orderConfirmation: 'order-confirmation',
  orderShipped: 'order-shipped',
  refund: 'refund',
  welcome: 'welcome',
  quoteRequest: 'quote-request'
}

export async function sendQuoteRequestEmail(data: {
  customerName: string
  customerEmail: string
  projectType: string
  projectDescription: string
  budget: string
  urgency: string
}) {
  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: 'contact@jayscreationsdesign.fr',
      subject: `â Nouvelle demande de devis - ${data.customerName}`,
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(
        EMAIL_HEADER +
        emailBande('â', 'Nouvelle demande de devis', 'Client intéressé') +
        `<tr><td style="padding:28px;background:#ffffff;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="background:#FFF8F0;border-radius:10px;
                        border:1px solid #E8E4DF;margin-bottom:20px;">
            <tr><td style="padding:20px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Client</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                          margin-bottom:12px;">${data.customerName}</div>
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Email</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                          margin-bottom:12px;">${data.customerEmail}</div>
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Type de projet</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                          margin-bottom:12px;">${data.projectType}</div>
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Description</div>
              <div style="font-size:14px;color:#555;line-height:1.6;
                          margin-bottom:12px;">${data.projectDescription}</div>
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Budget</div>
              <div style="font-size:14px;color:#8B4513;font-weight:600;
                          margin-bottom:12px;">${data.budget}</div>
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Urgence</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;">${data.urgency}</div>
            </td></tr>
          </table>
          ${emailCTA('mailto:' + data.customerEmail, 'â Contacter le client')}
        </td></tr>` +
        EMAIL_MERCI +
        EMAIL_FOOTER
      )
    })
    
    return { success: true }
  } catch (error) {
    console.error('Erreur email demande devis:', error)
    return { success: false, error }
  }
}

// Fonctions manquantes pour compatibilité
export async function sendOrderInPreparationEmail(order: any) {
  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "â¨ Votre commande est en cours de création !",
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email préparation:', error)
    return { success: false, error }
  }
}

export async function sendRefundEmail(order: any) {
  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "Votre remboursement â Jay's Creations Design",
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email remboursement:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(customer: any) {
  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: customer.email,
      subject: "â¨ Bienvenue chez Jay's Creations Design !",
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email bienvenue:', error)
    return { success: false, error }
  }
}

export async function sendOrderShippedEmail(order: any) {
  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "â¨ Votre commande est en route !",
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email expédition:', error)
    return { success: false, error }
  }
}

export async function sendReviewRequestEmail(order: any) {
  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "â Votre avis nous tient à cÅur",
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email avis:', error)
    return { success: false, error }
  }
}

export async function sendAbandonedCartEmail(cart: any) {
  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: cart.customerEmail,
      subject: "â Vous avez oublié quelque chose...",
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email panier abandonné:', error)
    return { success: false, error }
  }
}

export async function sendQuoteFollowUpEmail(quote: {
  customerName: string
  customerEmail: string
  projectDescription: string
  estimatedPrice: number
  quoteNumber: string
}) {
  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: quote.customerEmail,
      subject: "ð Suite à votre demande de devis",
      encoding: 'utf-8',
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      html: emailWrap(
        EMAIL_HEADER +
        emailBande('ð', 'Votre projet nous tient &agrave; c&oelig;ur',
          'Avez-vous des questions sur votre devis ?') +
        `<tr><td style="padding:28px;background:#ffffff;">
          <p style="font-size:14px;color:#2C1A0E;margin-bottom:16px;">
            Bonjour ${quote.customerName},
          </p>
          <p style="font-size:14px;color:#555;margin-bottom:20px;line-height:1.6;">
            Nous avons envoy&eacute; votre devis il y a 48h et voulions 
            prendre de vos nouvelles.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="background:#FFF8F0;border-radius:10px;
                        border:1px solid #E8E4DF;margin-bottom:20px;">
            <tr><td style="padding:20px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Projet</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;
                          margin-bottom:12px;">${quote.projectDescription}</div>
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;
                          letter-spacing:1px;margin-bottom:4px;">Estimation</div>
              <div style="font-size:18px;color:#8B4513;font-weight:700;">
                ${quote.estimatedPrice.toFixed(2).replace('.', ',')} &euro;
              </div>
            </td></tr>
          </table>
          ${emailCTA('mailto:contact@jayscreationsdesign.fr',
            '&#128140; R&eacute;pondre au devis')}
          <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
            Ou appelez-nous : <strong style="color:#8B4513;">07 63 92 08 23</strong>
          </p>
        </td></tr>` +
        EMAIL_MERCI +
        EMAIL_FOOTER
      )
    })
    
    // Copie admin
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: 'contact@jayscreationsdesign.fr',
      subject: `ð Relance devis envoy&eacute;e &mdash; ${quote.customerName}`,
      encoding: 'utf-8',
      html: `<p>Relance envoy&eacute;e &agrave; ${quote.customerEmail} pour le devis ${quote.quoteNumber}</p>` 
    })
    
    return { success: true }
  } catch (error) {
    console.error('Erreur email devis:', error)
    return { success: false, error }
  }
}

export async function sendLoyaltyTierUpEmail(customer: any, newTier: string) {
  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: customer.email,
      subject: `â Félicitations ! Niveau ${newTier} atteint !`,
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      },
      html: emailWrap(EMAIL_HEADER + EMAIL_FOOTER)
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email niveau:', error)
    return { success: false, error }
  }
}
