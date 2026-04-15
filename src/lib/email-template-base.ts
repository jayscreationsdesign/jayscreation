// Fonction d'encodage HTML pour les caractères spÃ©ciaux franÃ§ais
export function encodeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/Ã©/g, '&eacute;')
    .replace(/Ã¨/g, '&egrave;')
    .replace(/Ãª/g, '&ecirc;')
    .replace(/Ã /g, '&agrave;')
    .replace(/Ã¢/g, '&acirc;')
    .replace(/Ã´/g, '&ocirc;')
    .replace(/Ã»/g, '&ucirc;')
    .replace(/Ã¹/g, '&ugrave;')
    .replace(/Ã§/g, '&ccedil;')
    .replace(/â¬/g, '&euro;')
    .replace(/Â°/g, '&deg;')
    .replace(/Â«/g, '&laquo;')
    .replace(/Â»/g, '&raquo;');
}

export const emailWrap = (contenu: string) => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#FFF8F0;font-family:'Inter',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0"
           style="background:#ffffff;border-radius:16px;overflow:hidden;
                  box-shadow:0 8px 32px rgba(44,26,14,0.12);max-width:600px;">
      ${contenu}
    </table>
  </td></tr>
</table>
</body></html>`

export const EMAIL_HEADER = `
<tr><td style="background:#FFF8F0;text-align:center;
               padding:40px 24px 28px;border-bottom:3px solid #8B4513;">
  <img src="https://www.jayscreationsdesign.fr/images/logo/logo.png"
       width="120" height="120"
       style="display:block;margin:0 auto 14px;"
       alt="Jay's Creations Design" />
  <div style="font-family:'Great Vibes',cursive;font-size:42px;
              font-weight:400;color:#2C1A0E;letter-spacing:2px;
              margin-bottom:6px;line-height:1.2;">
    Jay's Creations Design
  </div>
  <div style="font-family:'Inter',Arial,sans-serif;font-size:11px;
              color:#D4A574;letter-spacing:3px;text-transform:uppercase;
              font-weight:500;">
    Cr&eacute;ations uniques pour moments pr&eacute;cieux
  </div>
</td></tr>`

export const EMAIL_FOOTER = `
<tr><td style="background:#FFF8F0;padding:22px 28px;
               text-align:center;border-top:1px solid #E8E4DF;">
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:15px;
              font-weight:600;color:#2C1A0E;margin-bottom:5px;">
    Jay's Creations Design
  </div>
  <div style="font-family:'Inter',Arial,sans-serif;font-size:12px;
              color:#aaa;margin-bottom:8px;">
    contact@jayscreationsdesign.fr &nbsp;·&nbsp;
    commande@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23
  </div>
  <div style="font-size:11px;margin-top:4px;">
    <a href="https://www.instagram.com/jays_creations_design/"
       style="color:#8B4513;text-decoration:none;margin:0 6px;font-weight:500;">
      Instagram
    </a> ·
    <a href="https://www.tiktok.com/@jayscreationsdesign"
       style="color:#8B4513;text-decoration:none;margin:0 6px;font-weight:500;">
      TikTok
    </a> ·
    <a href="https://www.jayscreationsdesign.fr/boutique"
       style="color:#8B4513;text-decoration:none;margin:0 6px;font-weight:500;">
      Boutique
    </a>
  </div>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:11px;
              color:#2C1A0E;font-style:italic;margin-top:10px;">
    &laquo; L'art de capturer vos plus beaux moments &raquo;
  </div>
</td></tr>`

export const emailCTAOutline = (lien: string, texte: string) => `
<table role="presentation" cellpadding="0" cellspacing="0"
       style="margin:0 auto 10px;">
  <tr><td style="border-radius:30px;">
    <a href="${lien}"
       style="display:inline-block;background:transparent;color:#8B4513;
              padding:12px 32px;border-radius:30px;font-size:14px;
              font-weight:600;text-decoration:none;letter-spacing:0.5px;
              font-family:'Inter',Arial,sans-serif;border:2px solid #8B4513;">
      ${texte}
    </a>
  </td></tr>
</table>`

export const EMAIL_MERCI = `
<tr>
  <td style="padding:0 28px 26px; background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:#2C1A0E; border-radius:12px; text-align:center; padding:24px;">
          <div style="font-family:'Playfair Display',Georgia,serif; font-size:17px; font-weight:600; color:#FFF8F0; margin-bottom:7px;">Merci pour votre confiance !</div>
          <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#8B4513;">Vous recevrez des mises &agrave; jour par email &agrave; chaque &eacute;tape.</div>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

export const emailBande = (icone: string, titre: string, sousTitre: string) => `
        <tr>
          <td style="background:#8B4513; text-align:center; padding:22px 24px;">
            <div style="font-size:28px; color:#D4A574; margin-bottom:8px;">${icone}</div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:22px; font-weight:600; color:#D4A574; margin-bottom:6px;">${titre}</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#D4A574;">${sousTitre}</div>
          </td>
        </tr>
`;

export const emailCTA = (lien: string, texte: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 26px;">
    <tr>
      <td style="border-radius:30px; background:#8B4513;">
        <a href="${lien}" style="display:inline-block; background:#8B4513; color:white; padding:14px 38px; border-radius:30px; font-size:14px; font-weight:600; text-decoration:none; letter-spacing:0.5px; font-family:'Inter',Arial,sans-serif; border:2px solid #8B4513;">
          ${texte}
        </a>
      </td>
    </tr>
  </table>
`;

