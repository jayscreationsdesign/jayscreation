// Envoi d'email de bienvenue à anais.manne@gmail.com
import { Resend } from 'resend';

const resend = new Resend('re_test_key');

async function sendWelcomeEmail() {
  try {
    console.log('📧 Envoi d\'email de bienvenue à anais.manne@gmail.com...');
    
    const result = await resend.emails.send({
      from: 'Jay\'s Creations Design <onboarding@resend.dev>',
      to: ['anais.manne@gmail.com'],
      subject: '🎉 Bienvenue chez Jay\'s Creations Design !',
      html: `
        <!DOCTYPE html>
        <html>
        <body style='font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;'>
          <div style='max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; border: 2px solid #8B4513;'>
            <div style='text-align: center; margin-bottom: 30px;'>
              <h1 style='color: #8B4513;'>🎨 Jay's Creations Design</h1>
              <p style='color: #666;'>Pour Sublimer Vos Événements</p>
            </div>
            
            <h2 style='color: #8B4513;'>Bonjour Anaïs !</h2>
            
            <p style='color: #333; line-height: 1.6;'>
              Nous sommes absolument ravis de vous accueillir dans la famille Jay's Creations Design ! 
              Merci beaucoup pour votre intérêt pour nos créations uniques.
            </p>
            
            <div style='background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;'>
              <h3 style='color: #2e7d32; margin-top: 0;'>🎁 Votre avantage de bienvenue</h3>
              <p style='color: #2e7d32; font-weight: bold; font-size: 18px;'>CODE: BIENVENUE10</p>
              <p style='color: #333;'>Profitez de 10% de réduction sur votre première commande</p>
            </div>
            
            <div style='background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;'>
              <h4 style='color: #1976d2; margin-top: 0;'>🎨 Découvrez nos créations</h4>
              <ul style='color: #333; line-height: 1.8;'>
                <li>🖼️ Faire-part et invitations personnalisées</li>
                <li>📋 Menus et tableaux de mariage</li>
                <li>🎪 Créations pour tous les événements</li>
                <li>✨ Design unique et artisanal</li>
              </ul>
            </div>
            
            <div style='text-align: center; margin: 30px 0;'>
              <a href='http://localhost:3000/boutique' 
                 style='background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;'>
                🛍️ Découvrir la boutique
              </a>
            </div>
            
            <div style='background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;'>
              <h4 style='color: #f57c00; margin-top: 0;'>💬 Besoin d'aide ?</h4>
              <p style='color: #333;'>
                Notre équipe est à votre disposition pour vous accompagner dans vos projets créatifs.
                N'hésitez pas à nous contacter !
              </p>
              <p style='color: #8B4513; font-weight: bold;'>📧 contact@jayscreationsdesign.fr</p>
            </div>
            
            <div style='text-align: center; margin: 30px 0;'>
              <p style='color: #8B4513; font-style: italic; font-size: 16px;'>
                "L'art de capturer vos plus beaux moments"
              </p>
            </div>
            
            <div style='border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;'>
              <p style='color: #666; font-size: 12px; text-align: center;'>
                <strong>Jay's Creations Design</strong><br>
                Créations uniques pour moments précieux<br>
                <a href='http://localhost:3000' style='color: #8B4513;'>www.jayscreationsdesign.fr</a><br>
                Date: ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Email de bienvenue envoyé avec succès !');
    console.log('📧 Destinataire: anais.manne@gmail.com');
    console.log('🆔 Message ID:', result.data?.id);
    console.log('📨 Vérifiez votre boîte de réception !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
  }
}

// Exécuter l'envoi
sendWelcomeEmail();
