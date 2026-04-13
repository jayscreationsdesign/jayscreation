// Script de test utilisant la fonction sendOrderConfirmationEmail du projet
import { sendOrderConfirmationEmail } from './src/lib/email.js';

// Données de test pour la commande
const orderData = {
  orderNumber: 'CMD-2024-TEST-002',
  client: {
    nom: 'Testeur',
    prenom: 'Alice',
    email: 'alice.test@example.com',
    telephone: '06 98 76 54 32',
    adresse: '45 Avenue des Créations',
    codePostal: '69000',
    ville: 'Lyon',
    pays: 'France'
  },
  items: [
    {
      nom: 'Boîte à Souvenirs Personnalisée',
      theme: 'Anniversaire',
      quantite: 1,
      prix: 49.99
    },
    {
      nom: 'Cadre Photo sur Mesure',
      theme: 'Famille',
      quantite: 2,
      prix: 29.99
    }
  ],
  total: 109.97,
  paymentMethod: 'Carte bancaire',
  shippingMethod: 'Livraison standard',
  estimatedDelivery: '3-5 jours ouvrés'
};

// Email du client (pour le test)
const customerEmail = 'alice.test@example.com';

// Fonction de test
async function testOrderConfirmationEmail() {
  try {
    console.log('Test d\'envoi d\'email de confirmation de commande...');
    console.log('Numéro de commande:', orderData.orderNumber);
    console.log('Client:', orderData.client.prenom, orderData.client.nom);
    console.log('Email client:', customerEmail);
    console.log('Total:', orderData.total.toFixed(2) + 'EUR');
    console.log('Nombre d\'articles:', orderData.items.length);
    
    // Appel de la fonction du projet
    const result = await sendOrderConfirmationEmail(customerEmail, orderData);
    
    console.log('\n--- RÉSULTAT ---');
    console.log('Succès global:', result.success);
    console.log('Email client:', result.clientEmail?.success ? 'Envoyé' : 'Échec');
    console.log('Copie admin:', result.adminCopy?.success ? 'Envoyée' : 'Échec');
    console.log('Notification validation:', result.validationNotification?.success ? 'Envoyée' : 'Échec');
    
    if (result.clientEmail?.messageId) {
      console.log('ID email client:', result.clientEmail.messageId);
    }
    if (result.adminCopy?.messageId) {
      console.log('ID copie admin:', result.adminCopy.messageId);
    }
    if (result.validationNotification?.messageId) {
      console.log('ID notification validation:', result.validationNotification.messageId);
    }
    
  } catch (error) {
    console.error('Erreur lors du test:', error.message);
    console.error('Détails:', error);
  }
}

// Exécuter le test
testOrderConfirmationEmail();
