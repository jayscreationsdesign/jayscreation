// Réexports des fonctions email serveur pour compatibilité
// Évite les imports nodemailer côté client
export {
  sendOrderConfirmationEmail,
  sendNewOrderAdminEmail,
  sendEmail,
  emailTemplates,
  sendQuoteRequestEmail,
  sendOrderInPreparationEmail,
  sendRefundEmail,
  sendWelcomeEmail,
  sendOrderShippedEmail,
  sendReviewRequestEmail,
  sendAbandonedCartEmail,
  sendQuoteFollowUpEmail,
  sendLoyaltyTierUpEmail
} from './email-server';
