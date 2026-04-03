// Configuration centralisée des emails
export const emailConfig = {
  // Configuration IONOS Email Marketing (CONFIGURÉE)
  ionos: {
    host: process.env.IONOS_SMTP_HOST || 'smtp.ionos.de',
    port: parseInt(process.env.IONOS_SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.IONOS_EMAIL_USER || 'jayscreations.d@gmail.com',
      pass: process.env.IONOS_EMAIL_PASS || 'Kenays238'
    }
  },

  // Adresses emails
  addresses: {
    from: process.env.IONOS_TRANSACTIONAL_EMAIL || 'contact@jayscreationsdesign.fr',
    replyTo: process.env.IONOS_ADMIN_EMAIL || 'contact@jayscreationsdesign.fr',
    admin: process.env.IONOS_ADMIN_EMAIL || 'contact@jayscreationsdesign.fr',
    orders: process.env.IONOS_ORDER_EMAIL || 'commande@jayscreationsdesign.fr',
    welcome: process.env.IONOS_WELCOME_EMAIL || 'commande@jayscreationsdesign.fr',
    test: process.env.TEST_EMAIL || 'contact@jayscreationsdesign.fr'
  },

  // URLs du site
  urls: {
    site: process.env.SITE_URL || 'https://www.jayscreationsdesign.fr',
    admin: process.env.SITE_URL ? `${process.env.SITE_URL}/admin` : 'https://www.jayscreationsdesign.fr/admin',
    cart: process.env.SITE_URL ? `${process.env.SITE_URL}/panier` : 'https://www.jayscreationsdesign.fr/panier',
    account: process.env.SITE_URL ? `${process.env.SITE_URL}/compte` : 'https://www.jayscreationsdesign.fr/compte'
  },

  // Configuration Resend (alternative)
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.IONOS_TRANSACTIONAL_EMAIL || 'newsletter@jayscreationsdesign.fr'
  },

  // Vérification de la configuration
  isConfigured(): boolean {
    return !!(process.env.IONOS_EMAIL_USER && process.env.IONOS_EMAIL_PASS);
  },

  // Configuration pour le développement
  isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  },

  // Email de test pour le développement
  getTestEmail(): string {
    return this.isDevelopment() ? this.addresses.test : this.addresses.admin;
  }
};

export default emailConfig;
