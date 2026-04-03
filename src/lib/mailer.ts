import nodemailer from 'nodemailer';

// Configuration des transporteurs Nodemailer pour IONOS
interface TransporterConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    rejectUnauthorized: boolean;
  };
}

// Configuration commune pour les deux transporteurs
const baseConfig: Omit<TransporterConfig, 'auth'> = {
  host: process.env.SMTP_HOST || 'smtp.ionos.fr',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS sur port 587
  tls: {
    rejectUnauthorized: false,
  },
};

// Transporteur pour la boîte commande@jayscreationsdesign.fr
const commandeConfig: TransporterConfig = {
  ...baseConfig,
  auth: {
    user: process.env.SMTP_USER_COMMANDE || 'commande@jayscreationsdesign.fr',
    pass: process.env.SMTP_PASS_COMMANDE || 'Jayzon971238',
  },
};

// Transporteur pour la boîte contact@jayscreationsdesign.fr
const contactConfig: TransporterConfig = {
  ...baseConfig,
  auth: {
    user: process.env.SMTP_USER_CONTACT || 'contact@jayscreationsdesign.fr',
    pass: process.env.SMTP_PASS_CONTACT || 'Jayzon971238',
  },
};

// Création des transporteurs
const commandeTransporter = nodemailer.createTransport(commandeConfig);
const contactTransporter = nodemailer.createTransport(contactConfig);

// Type pour les expéditeurs
export type EmailSender = 'commande' | 'contact';

// Fonction pour récupérer le bon transporteur
export function getTransporter(sender: EmailSender) {
  switch (sender) {
    case 'commande':
      return commandeTransporter;
    case 'contact':
      return contactTransporter;
    default:
      throw new Error(`Invalid sender: ${sender}. Must be 'commande' or 'contact'.`);
  }
}

// Fonction pour récupérer l'adresse email complète de l'expéditeur
export function getSenderEmail(sender: EmailSender): string {
  switch (sender) {
    case 'commande':
      return process.env.SMTP_USER_COMMANDE || 'commande@jayscreationsdesign.fr';
    case 'contact':
      return process.env.SMTP_USER_CONTACT || 'contact@jayscreationsdesign.fr';
    default:
      throw new Error(`Invalid sender: ${sender}. Must be 'commande' or 'contact'.`);
  }
}

// Fonction pour vérifier la connexion des transporteurs
export async function verifyTransporters(): Promise<{ commande: boolean; contact: boolean }> {
  try {
    const commandeVerified = await commandeTransporter.verify();
    const contactVerified = await contactTransporter.verify();
    
    return {
      commande: commandeVerified,
      contact: contactVerified,
    };
  } catch (error) {
    console.error('Erreur vérification transporteurs:', error);
    return {
      commande: false,
      contact: false,
    };
  }
}

// Export des transporteurs pour les tests (uniquement en développement)
if (process.env.NODE_ENV === 'development') {
  console.log('📧 Transporteurs IONOS configurés:');
  console.log(`   • Commande: ${getSenderEmail('commande')}`);
  console.log(`   • Contact: ${getSenderEmail('contact')}`);
  console.log(`   • Serveur: ${baseConfig.host}:${baseConfig.port}`);
}
