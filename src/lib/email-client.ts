// Fichier de compatibilité client - ne contient que des exports vides
// Les vraies fonctions email sont côté serveur dans email-server.ts

export const sendOrderConfirmationEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendNewOrderAdminEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const emailTemplates = {};

export const sendQuoteRequestEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendOrderInPreparationEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendRefundEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendWelcomeEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendOrderShippedEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendReviewRequestEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendAbandonedCartEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendQuoteFollowUpEmail = async () => {
  throw new Error('Email functions are server-side only');
};

export const sendLoyaltyTierUpEmail = async () => {
  throw new Error('Email functions are server-side only');
};
