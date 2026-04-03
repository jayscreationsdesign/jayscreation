import React from 'react';
import { render } from '@react-email/render';
import { getTransporter, getSenderEmail, type EmailSender } from './mailer';

// Types pour les emails
export type EmailType = 
  | 'welcome' 
  | 'order-confirmation' 
  | 'order-notification' 
  | 'quote-request' 
  | 'quote-notification' 
  | 'stock-alert' 
  | 'abandoned-cart';

interface SendEmailParams {
  type: EmailType;
  to: string | string[];
  subject: string;
  from: EmailSender;
  react: React.ReactElement;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Fonction utilitaire générique pour envoyer un email
export async function sendEmail({ 
  type, 
  to, 
  subject, 
  from, 
  react 
}: SendEmailParams): Promise<SendEmailResult> {
  try {
    // 1. Rendre le composant React Email en HTML
    const html = await render(react);
    
    // 2. Récupérer le bon transporteur
    const transporter = getTransporter(from);
    
    // 3. Préparer les options d'envoi
    const mailOptions = {
      from: `"Jay's Creations Design" <${getSenderEmail(from)}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    };
    
    // 4. Envoyer l'email
    const result = await transporter.sendMail(mailOptions);
    
    // 5. Logger le résultat
    console.log(`✅ Email envoyé - Type: ${type}, From: ${from}, To: ${Array.isArray(to) ? to.join(', ') : to}, MessageID: ${result.messageId}`);
    
    // 6. Retourner le succès
    return {
      success: true,
      messageId: result.messageId,
    };
    
  } catch (error) {
    // Logger l'erreur
    console.error(`❌ Erreur envoi email - Type: ${type}, From: ${from}, To: ${Array.isArray(to) ? to.join(', ') : to}:`, error);
    
    // Retourner l'erreur
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue lors de l\'envoi d\'email',
    };
  }
}

// Fonction pour envoyer un email à plusieurs destinataires (client + admin)
export async function sendMultipleEmails({
  type,
  recipients,
  subject,
  from,
  react,
}: {
  type: EmailType;
  recipients: {
    client?: string;
    admin?: string;
  };
  subject: string;
  from: EmailSender;
  react: React.ReactElement;
}): Promise<{ client: SendEmailResult; admin: SendEmailResult }> {
  const results = {
    client: { success: false } as SendEmailResult,
    admin: { success: false } as SendEmailResult,
  };
  
  // Envoyer au client si spécifié
  if (recipients.client) {
    results.client = await sendEmail({
      type,
      to: recipients.client,
      subject,
      from,
      react,
    });
  }
  
  // Envoyer à l'admin si spécifié
  if (recipients.admin) {
    results.admin = await sendEmail({
      type,
      to: recipients.admin,
      subject: `🔔 ${subject}`, // Préfixer pour les emails admin
      from,
      react,
    });
  }
  
  return results;
}

// Fonction de test pour vérifier que tout fonctionne
export async function testEmailSystem(): Promise<void> {
  console.log('🧪 Test du système d\'emails IONOS...');
  
  try {
    // Importer EmailLayout pour le test
    const { EmailLayout } = await import('../emails/components/EmailLayout');
    
    const testEmail = React.createElement(
      EmailLayout,
      {},
      React.createElement('div', { style: { padding: '20px', textAlign: 'center' } }, [
        React.createElement('h2', {}, '🧪 Test du système d\'emails IONOS'),
        React.createElement('p', {}, 'Ceci est un test pour vérifier que IONOS SMTP fonctionne correctement.'),
        React.createElement('p', {}, `Date: ${new Date().toLocaleString('fr-FR')}`)
      ])
    );
    
    // Tester avec les deux transporteurs
    const commandeResult = await sendEmail({
      type: 'welcome',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: '🧪 Test IONOS - Transporteur Commande',
      from: 'commande',
      react: testEmail,
    });
    
    const contactResult = await sendEmail({
      type: 'welcome',
      to: process.env.ADMIN_EMAIL || 'jayscreations.d@gmail.com',
      subject: '🧪 Test IONOS - Transporteur Contact',
      from: 'contact',
      react: testEmail,
    });
    
    console.log('📊 Résultats des tests:');
    console.log(`   • Transporteur Commande: ${commandeResult.success ? '✅' : '❌'}`);
    console.log(`   • Transporteur Contact: ${contactResult.success ? '✅' : '❌'}`);
    
    if (commandeResult.success && contactResult.success) {
      console.log('🎉 Système d\'emails IONOS opérationnel !');
    } else {
      console.log('❌ Le système d\'emails a des problèmes.');
      if (!commandeResult.success) console.log(`   • Erreur commande: ${commandeResult.error}`);
      if (!contactResult.success) console.log(`   • Erreur contact: ${contactResult.error}`);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test du système d\'emails:', error);
  }
}
