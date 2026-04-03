import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_test_key');

export async function POST(request: NextRequest) {
  try {
    const { type, to, data } = await request.json();

    let emailConfig;

    switch (type) {
      case 'welcome':
        emailConfig = {
          from: 'Jay\'s Creations Design <onboarding@resend.dev>',
          to: [to],
          subject: '✅ Test Email - Bienvenue chez Jay\'s Creations Design',
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; border: 2px solid #8B4513;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #8B4513;">🎨 Jay's Creations Design</h1>
                  <p style="color: #666;">Test d'email de bienvenue</p>
                </div>
                
                <h2 style="color: #8B4513;">Bonjour ${data?.firstName || 'Test User'} !</h2>
                
                <p style="color: #333; line-height: 1.6;">
                  Ceci est un test d'email de bienvenue depuis votre site Jay's Creations Design.
                </p>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #2e7d32; margin-top: 0;">✅ Test réussi si vous recevez cet email</h3>
                  <p>Le système d'envoi d'emails fonctionne parfaitement !</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p style="color: #8B4513; font-weight: bold;">Date du test: ${new Date().toLocaleString('fr-FR')}</p>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      case 'order':
        emailConfig = {
          from: 'Jay\'s Creations Design <commandes@jayscreationsdesign.fr>',
          to: [to, 'commande@jayscreationsdesign.fr'],
          subject: `🛒 TEST - Commande #${data?.orderId || 'TEST-001'}`,
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; border: 2px solid #dc3545;">
                <div style="text-align: center; margin-bottom: 30px; background: #dc3545; color: white; padding: 20px; border-radius: 10px 10px 0 0; margin: -30px -30px 30px -30px;">
                  <h1 style="margin: 0;">🛒 COMMANDE TEST</h1>
                  <p style="margin: 5px 0;">Email de test de commande</p>
                </div>
                
                <h2 style="color: #dc3545;">Merci pour votre commande !</h2>
                
                <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #8B4513; margin-top: 0;">Récapitulatif</h3>
                  <p><strong>Numéro:</strong> #${data?.orderId || 'TEST-001'}</p>
                  <p><strong>Client:</strong> ${data?.customerName || 'Client Test'}</p>
                  <p><strong>Total:</strong> ${data?.total || '49.90'}€</p>
                </div>
                
                <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="color: #1976d2; margin-top: 0;">Articles test</h4>
                  <p>• Faire-part design personnalisé</p>
                  <p>• Service de livraison premium</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p><strong>🎉 SYSTÈME EMAIL FONCTIONNEL !</strong></p>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      case 'quote':
        emailConfig = {
          from: 'Jay\'s Creations Design <contact@jayscreationsdesign.fr>',
          to: ['contact@jayscreationsdesign.fr'],
          subject: '📋 TEST - Demande de devis reçue',
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; border: 2px solid #8B4513;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #8B4513;">📋 DEMANDE DE DEVIS TEST</h1>
                  <p style="color: #666;">Test du système de demandes</p>
                </div>
                
                <h2 style="color: #8B4513;">Nouvelle demande de devis</h2>
                
                <div style="background: #f8f8f8; padding: 20pxpx; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #8B4513; margin-top: 0;">Informations client</h3>
                  <p><strong>Nom:</strong> ${data?.name || 'Client Test'}</p>
                  <p><strong>Email:</strong> ${data?.email || 'test@example.com'}</p>
                  <p><strong>Téléphone:</strong> ${data?.phone || '06 00 00 00 00'}</p>
                </div>
                
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="color: #856404; margin-top: 0;">Détails de la demande</h4>
                  <p><strong>Produit:</strong> ${data?.product || 'Faire-part mariage'}</p>
                  <p><strong>Quantité:</strong> ${data?.quantity || '50'}</p>
                  <p><strong>Budget:</strong> ${data?.budget || '200-300€'}</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <p><strong>✅ TEST DEVIS FONCTIONNEL !</strong></p>
                </div>
              </div>
            </body>
            </html>
          `
        };
        break;

      default:
        throw new Error('Type d\'email non valide');
    }

    const result = await resend.emails.send(emailConfig);

    return NextResponse.json({ 
      success: true, 
      message: 'Email de test envoyé avec succès',
      id: result.data?.id 
    });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    }, { status: 500 });
  }
}
