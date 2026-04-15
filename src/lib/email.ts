import nodemailer from 'nodemailer';
import { EMAIL_HEADER, EMAIL_FOOTER, EMAIL_MERCI, emailBande, emailCTA, emailCTAOutline, emailWrap, encodeHtml } from './email-template-base';

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
      subject: "✨ Commande confirmée — Jay's Creations Design",
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

  const itemsHtml = order.items.map((item: any) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #E8E4DF;font-size:13px;color:#2C1A0E;">
        ${item.name} (x${item.quantity})
      </td>
      <td style="padding:8px 0;border-bottom:1px solid #E8E4DF;
                 text-align:right;font-size:13px;font-weight:600;color:#8B4513;">
        ${(item.price * item.quantity).toFixed(2).replace('.', ',')}â¬
      </td>
    </tr>`).join('')

  const contenu = `
    <tr><td style="background:#92400E;text-align:center;padding:22px 24px;">
      <div style="font-size:24px;color:#FDE68A;margin-bottom:8px;">ð</div>
      <div style="font-family:'Playfair Display',serif;font-size:20px;
                  font-weight:600;color:#FDE68A;margin-bottom:6px;">
        Nouvelle commande Ã  traiter
      </div>
      <div style="font-size:12px;color:rgba(253,230,138,0.9);">
        Action requise â VÃ©rifiez la disponibilitÃ© des articles
      </div>
    </td></tr>
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFFBEB;border:1px solid #FDE68A;
                    border-radius:8px;margin-bottom:20px;">
        <tr><td style="padding:12px 16px;text-align:center;font-size:12px;
                        color:#92400E;font-weight:600;">
          â VÃ©rifiez la disponibilitÃ© avant de valider
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <table width="100%">
            <tr>
              <td width="50%">
                <div style="font-size:10px;color:#aaa;text-transform:uppercase;">NÂ° commande</div>
                <div style="font-size:14px;color:#2C1A0E;font-weight:700;margin-top:3px;">${order.number}</div>
              </td>
              <td width="50%">
                <div style="font-size:10px;color:#aaa;text-transform:uppercase;">Date</div>
                <div style="font-size:14px;color:#2C1A0E;font-weight:600;margin-top:3px;">
                  ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'})}
                </div>
              </td>
            </tr>
            <tr><td style="padding-top:10px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">Client</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;margin-top:3px;">${order.customerName}</div>
            </td>
            <td style="padding-top:10px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">Total</div>
              <div style="font-size:16px;color:#8B4513;font-weight:700;margin-top:3px;">${order.total.toFixed(2).replace('.', ',')}â¬</div>
            </td></tr>
            <tr><td colspan="2" style="padding-top:10px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">Email</div>
              <div style="font-size:13px;color:#2C1A0E;font-weight:600;margin-top:3px;">${order.customerEmail}</div>
            </td></tr>
            ${order.customerPhone ? `<tr><td colspan="2" style="padding-top:10px;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">TÃ©lÃ©phone</div>
              <div style="font-size:13px;color:#2C1A0E;font-weight:600;margin-top:3px;">${order.customerPhone}</div>
            </td></tr>` : ''}
          </table>
        </td></tr>
      </table>
      <div style="font-family:'Playfair Display',serif;font-size:15px;
                  font-weight:600;color:#2C1A0E;margin-bottom:12px;">
        Articles commandÃ©s
      </div>
      <table width="100%" style="margin-bottom:16px;">${itemsHtml}</table>
      <table width="100%">
        <tr><td style="text-align:right;padding:12px 0;border-top:2px solid #8B4513;">
          <span style="font-size:18px;font-weight:700;color:#2C1A0E;">
            Total : <span style="color:#8B4513;">${order.total.toFixed(2).replace('.', ',')}â¬</span>
          </span>
        </td></tr>
      </table>
      <p style="font-size:11px;color:#aaa;text-align:center;margin:16px 0 8px;font-style:italic;">
        Cliquez directement depuis cet email pour agir sur la commande :
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
        <tr>
          <td width="48%" style="padding-right:6px;">
            <a href="${validateUrl}"
               style="display:block;background:#166534;color:white;
                      text-align:center;padding:14px 10px;border-radius:30px;
                      font-size:13px;font-weight:700;text-decoration:none;
                      font-family:'Inter',Arial,sans-serif;">
              â VALIDER LA COMMANDE
            </a>
          </td>
          <td width="4%"></td>
          <td width="48%" style="padding-left:6px;">
            <a href="${cancelUrl}"
               style="display:block;background:white;color:#DC2626;
                      text-align:center;padding:13px 10px;border-radius:30px;
                      font-size:13px;font-weight:700;text-decoration:none;
                      font-family:'Inter',Arial,sans-serif;
                      border:2px solid #DC2626;">
              â ARTICLE INDISPONIBLE
            </a>
          </td>
        </tr>
      </table>
      <p style="font-size:10px;color:#aaa;text-align:center;margin-top:8px;">
        Valider â email "En prÃ©paration" envoyÃ© au client<br>
        Annuler â remboursement Stripe + email annulation envoyÃ© au client
      </p>
    </td></tr>`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: 'commande@jayscreationsdesign.fr',
      subject: `🔔 Nouvelle commande #${order.number} — ${order.customerName}`,
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

// EMAIL 2 - En prÃ©paration
export async function sendOrderInPreparationEmail(order: any) {
  const contenu = `
    ${emailBande('ð', 'En cours de crÃ©ation !', 'PrÃ©paration avec amour')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:16px;">
            Suivi de votre commande
          </div>
          <table width="100%" style="margin-bottom:16px;">
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;background:#8B4513;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:white;font-size:12px;font-weight:bold;">â</div>
                <div style="font-size:13px;color:#2C1A0E;font-weight:600;">ConfirmÃ©e</div>
              </div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;background:#8B4513;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:white;font-size:12px;font-weight:bold;">â</div>
                <div style="font-size:13px;color:#2C1A0E;font-weight:600;">En prÃ©paration</div>
              </div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;border:2px solid #E8E4DF;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:#aaa;font-size:12px;">â</div>
                <div style="font-size:13px;color:#aaa;">ExpÃ©dition</div>
              </div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;border:2px solid #E8E4DF;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:#aaa;font-size:12px;">â</div>
                <div style="font-size:13px;color:#aaa;">LivrÃ©e</div>
              </div>
            </td></tr>
          </table>
          <div style="font-size:12px;color:#888;text-align:center;margin-top:12px;">
            Commande nÂ°${order.number} â ${order.total.toFixed(2).replace('.', ',')}â¬
          </div>
        </td></tr>
      </table>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/compte/commandes',
        'â Voir ma commande')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Votre crÃ©ation est en cours de fabrication par nos artisans.
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "🎨 Votre commande est en cours de création !",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email pr&eacute;paration:', error)
    return { success: false, error }
  }
}

// EMAIL 3 - ExpÃ©diÃ©
export async function sendOrderShippedEmail(order: any) {
  const contenu = `
    ${emailBande('â', "C'est parti !", 'Votre colis est en chemin')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:16px;">
            Suivi de votre commande
          </div>
          <table width="100%" style="margin-bottom:16px;">
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;background:#8B4513;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:white;font-size:12px;font-weight:bold;">â</div>
                <div style="font-size:13px;color:#2C1A0E;font-weight:600;">ConfirmÃ©e</div>
              </div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;background:#8B4513;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:white;font-size:12px;font-weight:bold;">â</div>
                <div style="font-size:13px;color:#2C1A0E;font-weight:600;">En prÃ©paration</div>
              </div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;background:#8B4513;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:white;font-size:12px;font-weight:bold;">â</div>
                <div style="font-size:13px;color:#2C1A0E;font-weight:600;">ExpÃ©diÃ©e</div>
              </div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:20px;height:20px;border:2px solid #E8E4DF;border-radius:50%;
                            display:flex;align-items:center;justify-content:center;
                            color:#aaa;font-size:12px;">â</div>
                <div style="font-size:13px;color:#aaa;">LivrÃ©e</div>
              </div>
            </td></tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="background:#8B4513;border-radius:8px;margin-top:16px;">
            <tr><td style="padding:16px;text-align:center;">
              <div style="font-size:14px;color:#D4A574;font-weight:600;margin-bottom:8px;">
                NumÃ©ro de suivi
              </div>
              <div style="font-size:18px;color:white;font-weight:700;margin-bottom:4px;">
                ${order.trackingNumber || 'BientÃ´t disponible'}
              </div>
              <div style="font-size:12px;color:#D4A574;">
                Transporteur : ${order.carrier || 'Colissimo'}
              </div>
            </td></tr>
          </table>
        </td></tr>
      </table>
      ${emailCTA(order.trackingUrl || '#', 'ð Suivre mon colis')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Livraison prÃ©vue sous 2-3 jours ouvrÃ©s.
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "📦 Votre commande est en route !",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email exp&eacute;dition:', error)
    return { success: false, error }
  }
}

// EMAIL 4 - Demande d'avis
export async function sendReviewRequestEmail(order: any) {
  const contenu = `
    ${emailBande('â', 'Votre commande est arrivÃ©e ?', 'Partagez votre expÃ©rience')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;text-align:center;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:16px;">
            Notez votre expÃ©rience
          </div>
          <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px;">
            ${[1,2,3,4,5].map(star => `
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/avis?rating=${star}&order=${order.number}"
                 style="font-size:32px;color:#D4A574;text-decoration:none;">
                â
              </a>
            `).join('')}
          </div>
          <div style="font-size:13px;color:#8B4513;font-weight:600;margin-bottom:8px;">
            50 points Jay's Club offerts pour chaque avis ! â
          </div>
          <div style="font-size:12px;color:#888;">
            Commande nÂ°${order.number} â ${new Date(order.createdAt).toLocaleDateString('fr-FR')}
          </div>
        </td></tr>
      </table>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/avis', 'â Laisser mon avis')}
      ${emailCTAOutline(process.env.NEXT_PUBLIC_SITE_URL + '/boutique', 'â Renouveler ma commande')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Votre retour nous aide Ã  amÃ©liorer nos crÃ©ations.
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "💛 Votre avis nous tient à cœur",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email avis:', error)
    return { success: false, error }
  }
}

// EMAIL 5 - Remboursement
export async function sendRefundEmail(order: any) {
  const contenu = `
    ${emailBande('â', 'Remboursement initiÃ©', 'Nous traitons votre demande')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:16px;">
            DÃ©tails du remboursement
          </div>
          <table width="100%">
            <tr><td style="padding:8px 0;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">Commande nÂ°</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;margin-top:3px;">${order.number}</div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">Montant</div>
              <div style="font-size:16px;color:#8B4513;font-weight:700;margin-top:3px;">${order.refundAmount.toFixed(2).replace('.', ',')}â¬</div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <div style="font-size:10px;color:#aaa;text-transform:uppercase;">DÃ©lai</div>
              <div style="font-size:14px;color:#2C1A0E;font-weight:600;margin-top:3px;">5-10 jours ouvrÃ©s</div>
            </td></tr>
          </table>
        </td></tr>
      </table>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/boutique', 'â Retour Ã  la boutique')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Le remboursement apparaÃ®tra sur votre compte bancaire.
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterCommande.sendMail({
      from: "Jay's Creations Design <commande@jayscreationsdesign.fr>",
      to: order.customerEmail,
      subject: "Votre remboursement — Jay's Creations Design",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email remboursement:', error)
    return { success: false, error }
  }
}

// EMAIL 6 - Panier abandonnÃ©
export async function sendAbandonedCartEmail(cart: any) {
  const itemsHtml = cart.items.map((item: any) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #E8E4DF;font-size:13px;color:#2C1A0E;">
        ${item.name} (x${item.quantity})
      </td>
      <td style="padding:8px 0;border-bottom:1px solid #E8E4DF;
                 text-align:right;font-size:13px;font-weight:600;color:#8B4513;">
        ${(item.price * item.quantity).toFixed(2).replace('.', ',')}â¬
      </td>
    </tr>`).join('')

  const contenu = `
    ${emailBande('â', 'Votre panier vous attend !', 'Encore disponibles')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#8B4513;border-radius:8px;margin-bottom:20px;">
        <tr><td style="padding:16px;text-align:center;">
          <div style="font-size:16px;color:white;font-weight:700;margin-bottom:4px;">
            Code : BIENVENUE10
          </div>
          <div style="font-size:13px;color:#D4A574;">
            10% de rÃ©duction sur votre premiÃ¨re commande
          </div>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:12px;">
            Votre panier
          </div>
          <table width="100%" style="margin-bottom:16px;">${itemsHtml}</table>
          <table width="100%">
            <tr><td style="text-align:right;padding:12px 0;border-top:2px solid #8B4513;">
              <span style="font-size:18px;font-weight:700;color:#2C1A0E;">
                Total : <span style="color:#8B4513;">${cart.total.toFixed(2).replace('.', ',')}â¬</span>
              </span>
            </td></tr>
          </table>
        </td></tr>
      </table>
      <div style="background:#FFF3CD;border:1px solid #FFEAA7;border-radius:8px;
                  padding:12px;margin-bottom:16px;text-align:center;">
        <div style="font-size:12px;color:#856404;font-weight:600;">
          â Stock limitÃ© â Vite, ces articles peuvent disparaÃ®tre !
        </div>
      </div>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/panier', 'â Finaliser ma commande')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Votre panier expire dans 24h.
      </p>
    </td></tr>`

  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: cart.customerEmail,
      subject: "🛍️ Vous avez oublié quelque chose...",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email panier abandonn&eacute;:', error)
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

// EMAIL 8 - MontÃ©e de niveau Jay's Club
export async function sendLoyaltyTierUpEmail(customer: any, newTier: string) {
  const contenu = `
    ${emailBande('ð', 'Nouveau palier atteint !', 'Bienvenue niveau ' + newTier)}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;text-align:center;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:16px;">
            FÃ©licitations ${customer.firstName} !
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:16px;">
            <div style="text-align:center;">
              <div style="font-size:12px;color:#aaa;margin-bottom:4px;">Ancien niveau</div>
              <div style="font-size:20px;color:#8B4513;font-weight:700;">${customer.currentTier}</div>
            </div>
            <div style="font-size:24px;color:#D4A574;">â</div>
            <div style="text-align:center;">
              <div style="font-size:12px;color:#aaa;margin-bottom:4px;">Nouveau niveau</div>
              <div style="font-size:24px;color:#8B4513;font-weight:700;">${newTier}</div>
            </div>
          </div>
          <div style="font-size:14px;color:#2C1A0E;margin-bottom:12px;">
            Vos points actuels : <strong>${customer.points}</strong> points
          </div>
          <div style="font-size:13px;color:#8B4513;font-weight:600;">
            Nouveaux avantages dÃ©bloquÃ©s ! â
          </div>
        </td></tr>
      </table>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/jay-club', 'â DÃ©couvrir mes avantages')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Profitez dÃ¨s maintenant de vos nouveaux bÃ©nÃ©fices exclusifs.
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: customer.email,
      subject: `🎉 Félicitations ! Niveau ${newTier} atteint !`,
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email niveau:', error)
    return { success: false, error }
  }
}

// EMAIL 9 - Bienvenue
export async function sendWelcomeEmail(customer: any) {
  const contenu = `
    ${emailBande('â', 'Bienvenue !', 'Compte crÃ©Ã© avec succÃ¨s')}
    <tr><td style="padding:28px 28px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#8B4513;border-radius:8px;margin-bottom:20px;">
        <tr><td style="padding:16px;text-align:center;">
          <div style="font-size:16px;color:white;font-weight:700;margin-bottom:4px;">
            Code : BIENVENUE10
          </div>
          <div style="font-size:13px;color:#D4A574;">
            10% de rÃ©duction sur votre premiÃ¨re commande
          </div>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="background:#FFF8F0;border-radius:10px;
                    border:1px solid #E8E4DF;margin-bottom:20px;">
        <tr><td style="padding:20px;">
          <div style="font-family:'Playfair Display',serif;font-size:15px;
                      font-weight:600;color:#2C1A0E;margin-bottom:16px;">
            Vos bÃ©nÃ©fices exclusifs
          </div>
          <table width="100%" style="margin-bottom:16px;">
            <tr>
              <td width="50%" style="padding:8px;text-align:center;">
                <div style="font-size:24px;color:#8B4513;margin-bottom:4px;">â</div>
                <div style="font-size:12px;color:#2C1A0E;font-weight:600;">Jay's Club</div>
                <div style="font-size:11px;color:#888;">Programme de fidÃ©litÃ©</div>
              </td>
              <td width="50%" style="padding:8px;text-align:center;">
                <div style="font-size:24px;color:#8B4513;margin-bottom:4px;">â</div>
                <div style="font-size:12px;color:#2C1A0E;font-weight:600;">Livraison offerte</div>
                <div style="font-size:11px;color:#888;">DÃ¨s 50â¬ d'achat</div>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding:8px;text-align:center;">
                <div style="font-size:24px;color:#8B4513;margin-bottom:4px;">â</div>
                <div style="font-size:12px;color:#2C1A0E;font-weight:600;">CrÃ©ations uniques</div>
                <div style="font-size:11px;color:#888;">PiÃ¨ces artisanales</div>
              </td>
              <td width="50%" style="padding:8px;text-align:center;">
                <div style="font-size:24px;color:#8B4513;margin-bottom:4px;">â</div>
                <div style="font-size:12px;color:#2C1A0E;font-weight:600;">Service client</div>
                <div style="font-size:11px;color:#888;">7j/7 disponible</div>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
      ${emailCTA(process.env.NEXT_PUBLIC_SITE_URL + '/boutique', 'â DÃ©couvrir la boutique')}
      <p style="font-size:12px;color:#888;text-align:center;margin-top:8px;">
        Bienvenue dans l'univers Jay's Creations Design ${customer.firstName} !
      </p>
    </td></tr>
    ${EMAIL_MERCI}`

  try {
    await transporterContact.sendMail({
      from: "Jay's Creations Design <contact@jayscreationsdesign.fr>",
      to: customer.email,
      subject: "✨ Bienvenue chez Jay's Creations Design !",
      html: emailWrap(EMAIL_HEADER + contenu + EMAIL_FOOTER),
      encoding: 'utf-8',
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Erreur email bienvenue:', error)
    return { success: false, error }
  }
}
