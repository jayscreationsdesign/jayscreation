/**
 * Configuration SMTP IONOS pour Supabase
 * 
 * Ce fichier centralise la configuration SMTP et fournit des utilitaires
 * pour la validation et le monitoring de l'envoi d'emails.
 */

export interface SMTPConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  adminEmail: string;
  senderName: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

/**
 * Récupère la configuration SMTP depuis les variables d'environnement
 */
export function getSMTPConfig(): SMTPConfig {
  const config = {
    host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.fr',
    port: parseInt(process.env.IONOS_SMTP_PORT || '587'),
    user: process.env.IONOS_EMAIL_USER || 'contact@jayscreationsdesign.fr',
    pass: process.env.IONOS_EMAIL_PASS || '',
    adminEmail: process.env.IONOS_ADMIN_EMAIL || 'contact@jayscreationsdesign.fr',
    senderName: "Jay's Creations Design"
  };

  // Validation de la configuration
  const required = ['pass'];
  const missing = required.filter(key => !config[key as keyof SMTPConfig]);
  
  if (missing.length > 0) {
    throw new Error(`Variables SMTP manquantes: ${missing.join(', ')}`);
  }

  return config;
}

/**
 * Valide la configuration SMTP
 */
export function validateSMTPConfig(config: SMTPConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.host) errors.push('L\'hôte SMTP est requis');
  if (!config.port || config.port < 1 || config.port > 65535) errors.push('Le port SMTP doit être entre 1 et 65535');
  if (!config.user) errors.push('L\'utilisateur SMTP est requis');
  if (!config.pass) errors.push('Le mot de passe SMTP est requis');
  if (!config.adminEmail) errors.push('L\'email admin est requis');
  if (!config.senderName) errors.push('Le nom de l\'expéditeur est requis');

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(config.adminEmail)) {
    errors.push('L\'email admin n\'est pas valide');
  }
  if (!emailRegex.test(config.user)) {
    errors.push('L\'utilisateur SMTP n\'est pas un email valide');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Templates d'emails personnalisés pour Jay's Creations
 */
export const EmailTemplates = {
  welcome: (userName: string): EmailTemplate => ({
    subject: 'Bienvenue chez Jay\'s Creations Design',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D4A574 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Jay's Creations Design</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Créations florales d'exception</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 20px;">Bienvenue ${userName} !</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Nous sommes ravis de vous accueillir chez Jay's Creations Design. 
            Votre compte a été créé avec succès et vous pouvez dès maintenant 
            découvrir nos créations florales uniques.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Profitez de nos collections exclusives et bénéficiez d'un service 
            personnalisé pour tous vos événements spéciaux.
          </p>
        </div>
        
        <div style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://jayscreation.vercel.app'}" 
             style="background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin-bottom: 20px;">
            Découvrir nos créations
          </a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
          <p>&copy; 2024 Jay's Creations Design. Tous droits réservés.</p>
          <p>Cet email a été envoyé via notre service SMTP IONOS.</p>
        </div>
      </div>
    `,
    text: `Bienvenue chez Jay's Creations Design !\n\nMerci de vous être inscrit. Découvrez nos créations florales uniques sur notre site.`
  }),

  resetPassword: (resetLink: string): EmailTemplate => ({
    subject: 'Réinitialisation de votre mot de passe - Jay\'s Creations',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D4A574 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Jay's Creations Design</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Réinitialisation de mot de passe</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 20px;">Demande de réinitialisation</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Vous avez demandé la réinitialisation de votre mot de passe. 
            Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; text-align: center;">
            Ce lien expirera dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, 
            ignorez cet email.
          </p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
          <p>&copy; 2024 Jay's Creations Design. Tous droits réservés.</p>
        </div>
      </div>
    `,
    text: `Réinitialisation de mot de passe\n\nCliquez sur ce lien pour réinitialiser votre mot de passe: ${resetLink}\n\nCe lien expirera dans 1 heure.`
  }),

  orderConfirmation: (orderDetails: any): EmailTemplate => ({
    subject: `Confirmation de votre commande #${orderDetails.id} - Jay's Creations`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D4A574 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Jay's Creations Design</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Commande confirmée</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 20px;">Commande #${orderDetails.id}</h2>
          <p style="color: #666; line-height: 1.6;">
            Merci pour votre commande ! Nous vous confirmons la bonne réception 
            et le traitement de votre commande.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Récapitulatif:</h3>
            <p style="color: #666; margin: 5px 0;">Montant: ${orderDetails.total}€</p>
            <p style="color: #666; margin: 5px 0;">Date: ${orderDetails.date}</p>
            <p style="color: #666; margin: 5px 0;">Statut: ${orderDetails.status}</p>
          </div>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
          <p>&copy; 2024 Jay's Creations Design. Tous droits réservés.</p>
        </div>
      </div>
    `
  })
};

/**
 * Utilitaires de monitoring pour les emails
 */
export class EmailMonitor {
  private static sentEmails: Array<{
    timestamp: Date;
    template: string;
    recipient: string;
    success: boolean;
    error?: string;
  }> = [];

  static logEmail(template: string, recipient: string, success: boolean, error?: string) {
    this.sentEmails.push({
      timestamp: new Date(),
      template,
      recipient,
      success,
      error
    });

    // Nettoyage des logs anciens (garder 100 derniers)
    if (this.sentEmails.length > 100) {
      this.sentEmails = this.sentEmails.slice(-100);
    }
  }

  static getStats() {
    const total = this.sentEmails.length;
    const successful = this.sentEmails.filter(e => e.success).length;
    const failed = total - successful;
    const successRate = total > 0 ? (successful / total) * 100 : 0;

    return {
      total,
      successful,
      failed,
      successRate,
      recent: this.sentEmails.slice(-10)
    };
  }

  static clearLogs() {
    this.sentEmails = [];
  }
}

/**
 * Hook React pour monitoring des emails (optionnel)
 * Importez ce hook dans vos composants React si nécessaire
 */
export function useEmailMonitor() {
  // Note: Pour utiliser ce hook, importez useState et useEffect depuis React
  // import { useState, useEffect } from 'react';
  
  // Décommentez le code ci-dessous dans votre composant React:
  /*
  const [stats, setStats] = useState(EmailMonitor.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(EmailMonitor.getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
  */
  
  // Retourne les stats actuelles pour usage non-React
  return EmailMonitor.getStats();
}
