export const EMAIL_HEADER = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; max-width:600px;">
        
        <!-- HEADER -->
        <tr>
          <td align="center" style="background:#FFF8F0; padding:40px 24px 28px; border-bottom:3px solid #8B4513;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 18px;">
              <tr>
                <td width="148" height="148" style="width:148px; height:148px; border-radius:74px; background-color:#8B4513; text-align:center; vertical-align:middle;">
                  <img src="https://www.jayscreationsdesign.fr/images/logo/logo_transparent.png.png" width="138" height="138" style="border-radius:69px; display:block; margin:0 auto; border:0;" alt="Jay's Creations Design" />
                </td>
              </tr>
            </table>
            <div style="font-family:'Great Vibes',cursive; font-size:42px; font-weight:400; color:#2C1A0E; letter-spacing:2px; margin-bottom:6px; line-height:1.2;">Jay's Creations Design</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:11px; color:#D4A574; letter-spacing:3px; text-transform:uppercase; font-weight:500;">Créations uniques pour moments précieux</div>
          </td>
        </tr>
`;

export const EMAIL_FOOTER = `
        <!-- FOOTER -->
        <tr>
          <td style="background:#FFF8F0; padding:22px 28px; text-align:center; border-top:1px solid #E8E4DF;">
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:15px; font-weight:600; color:#2C1A0E; margin-bottom:5px;">Jay's Creations Design</div>
            <div style="font-family:'Inter',Arial,sans-serif; font-size:12px; color:#aaa; margin-bottom:8px;">contact@jayscreationsdesign.fr &nbsp;·&nbsp; commande@jayscreationsdesign.fr &nbsp;·&nbsp; 07 63 92 08 23</div>
            <div style="font-size:11px; margin-top:4px;">
              <a href="https://www.instagram.com/jays_creations_design/" style="color:#8B4513; text-decoration:none; margin:0 6px; font-weight:500;">Instagram</a> ·
              <a href="https://www.tiktok.com/@jayscreationsdesign" style="color:#8B4513; text-decoration:none; margin:0 6px; font-weight:500;">TikTok</a> ·
              <a href="https://www.jayscreationsdesign.fr/boutique" style="color:#8B4513; text-decoration:none; margin:0 6px; font-weight:500;">Boutique</a>
            </div>
            <div style="font-family:'Playfair Display',Georgia,serif; font-size:11px; color:#2C1A0E; font-style:italic; margin-top:10px;">"L'art de capturer vos plus beaux moments"</div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`;

export const EMAIL_MERCI = `
        <tr>
          <td style="padding:0 28px 26px; background:#ffffff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#2C1A0E; border-radius:12px; text-align:center; padding:24px;">
                  <div style="font-family:'Playfair Display',Georgia,serif; font-size:17px; font-weight:600; color:#FFF8F0; margin-bottom:7px;">Merci pour votre confiance !</div>
                  <div style="font-family:'Inter',Arial,sans-serif; font-size:13px; color:#8B4513;">Vous recevrez des mises à jour par email à chaque étape.</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
`;

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

export const emailWrap = (contenu: string) => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background:#FFF8F0; font-family:'Inter',Arial,sans-serif;">
${contenu}
</body>
</html>`;
