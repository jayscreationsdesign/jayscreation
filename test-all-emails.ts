import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/WelcomeEmail';
import OrderConfirmationEmail from '@/emails/OrderConfirmationEmail';
import AbandonedCartEmail from '@/emails/AbandonedCartEmail';
import QuoteRequestEmail from '@/emails/QuoteRequestEmail';
import OrderNotificationEmail from '@/emails/OrderNotificationEmail';
import QuoteNotificationEmail from '@/emails/QuoteNotificationEmail';
import StockAlertEmail from '@/emails/StockAlertEmail';
import SignupNotificationEmail from '@/emails/SignupNotificationEmail';
import { sendEmail } from '@/lib/send-email';

// Données de test pour les emails
const testData = {
  user: {
    email: 'test@jayscreationsdesign.fr',
    firstName: 'Anais',
    lastName: 'Test',
  },
  order: {
    id: 'CMD-2024-001',
    items: [
      {
        name: 'Faire-part Mariage Personnalisé',
        quantity: 50,
        price: 2.50,
        image: '/images/products/mariage.jpg',
        theme: 'Romantique'
      },
      {
        name: 'Marque-places Table',
        quantity: 50,
        price: 1.20,
        image: '/images/products/marque-places.jpg',
        theme: 'Or'
      }
    ],
    total: 185.00,
    shippingAddress: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    paymentMethod: 'Carte bancaire'
  },
  cart: {
    items: [
      {
        name: 'Faire-part Mariage Personnalisé',
        quantity: 25,
        price: 2.50,
        image: '/images/products/mariage.jpg',
        theme: 'Romantique'
      }
    ],
    total: 62.50,
    abandonedAt: new Date()
  },
  quote: {
    id: 'DEVIS-2024-001',
    event: 'Mariage',
    date: '2024-06-15',
    guests: 100,
    products: ['Faire-parts', 'Menu', 'Marque-places'],
    message: 'Je souhaiterais un devis pour mon mariage de 100 personnes.'
  },
  product: {
    name: 'Faire-part Mariage Personnalisé',
    stock: 5,
    url: 'https://jayscreationsdesign.vercel.app/produit/faire-part-mariage'
  }
};

async function testAllEmails() {
  console.log('???? DÉBUT DES TESTS D\'EMAILS\n');

  const tests = [
    {
      name: 'Email de bienvenue',
      component: <WelcomeEmail firstName={testData.user.firstName} email={testData.user.email} />,
      to: testData.user.email
    },
    {
      name: 'Confirmation de commande',
      component: <OrderConfirmationEmail 
        order={testData.order} 
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />,
      to: testData.user.email
    },
    {
      name: 'Panier abandonné',
      component: <AbandonedCartEmail 
        cart={testData.cart}
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />,
      to: testData.user.email
    },
    {
      name: 'Demande de devis',
      component: <QuoteRequestEmail 
        quote={testData.quote}
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />,
      to: 'contact@jayscreationsdesign.fr'
    },
    {
      name: 'Notification admin commande',
      component: <OrderNotificationEmail 
        order={testData.order}
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />,
      to: 'contact@jayscreationsdesign.fr'
    },
    {
      name: 'Notification admin devis',
      component: <QuoteNotificationEmail 
        quote={testData.quote}
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />,
      to: 'contact@jayscreationsdesign.fr'
    },
    {
      name: 'Alerte stock',
      component: <StockAlertEmail 
        product={testData.product}
        currentStock={testData.product.stock}
      />,
      to: 'contact@jayscreationsdesign.fr'
    },
    {
      name: 'Notification inscription',
      component: <SignupNotificationEmail 
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />,
      to: 'contact@jayscreationsdesign.fr'
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const test of tests) {
    try {
      console.log(`???? Test: ${test.name}`);
      
      // Rendre l'email en HTML
      const html = await render(test.component);
      console.log(`   ???? HTML généré: ${html.length} caractères`);
      
      // Envoyer l'email
      const result = await sendEmail({
        type: 'welcome', // Type par défaut, sera remplacé selon le cas
        to: test.to,
        subject: `[TEST] ${test.name}`,
        from: 'contact',
        react: test.component
      });

      if (result.success) {
        console.log(`   ???? Email envoyé avec succès: ${result.messageId}`);
        successCount++;
      } else {
        console.log(`   ???? Erreur lors de l'envoi: ${result.error}`);
        failCount++;
      }
      
      console.log(''); // Ligne vide pour la lisibilité
      
    } catch (error) {
      console.log(`   ???? Erreur: ${error}`);
      failCount++;
    }
  }

  console.log('\n???? RÉSULTATS DES TESTS:');
  console.log(`   ???? Succès: ${successCount}/${tests.length}`);
  console.log(`   ???? Échecs: ${failCount}/${tests.length}`);
  
  if (failCount === 0) {
    console.log('   ???? TOUS LES EMAILS FONCTIONNENT CORRECTEMENT! ????');
  } else {
    console.log('   ???? CERTAINS EMAILS ONT ÉCHOUÉ - VÉRIFIER LES LOGS');
  }
}

// Fonction pour tester uniquement le rendu HTML (sans envoi)
async function testEmailRendering() {
  console.log('???? TEST DE RENDU HTML DES EMAILS\n');

  const tests = [
    {
      name: 'Email de bienvenue',
      component: <WelcomeEmail firstName={testData.user.firstName} email={testData.user.email} />
    },
    {
      name: 'Confirmation de commande',
      component: <OrderConfirmationEmail 
        order={testData.order} 
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />
    },
    {
      name: 'Panier abandonné',
      component: <AbandonedCartEmail 
        cart={testData.cart}
        customerEmail={testData.user.email}
        customerName={testData.user.firstName}
      />
    }
  ];

  for (const test of tests) {
    try {
      console.log(`???? Rendu: ${test.name}`);
      const html = await render(test.component);
      
      // Sauvegarder le HTML dans un fichier pour inspection
      const fs = require('fs');
      const fileName = `test-${test.name.toLowerCase().replace(/\s+/g, '-')}.html`;
      fs.writeFileSync(fileName, html);
      
      console.log(`   ???? Fichier créé: ${fileName}`);
      console.log(`   ???? Taille: ${html.length} caractères`);
      console.log('');
      
    } catch (error) {
      console.log(`   ???? Erreur de rendu: ${error}`);
    }
  }
}

// Exécuter les tests
if (require.main === module) {
  const args = process.argv;
  
  if (args.includes('--render-only')) {
    testEmailRendering();
  } else {
    testAllEmails();
  }
}

export { testAllEmails, testEmailRendering };
