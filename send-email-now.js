// Script d'envoi immédiat de l'email de bienvenue
const https = require('https');
const querystring = require('querystring');

async function sendEmailNow() {
  try {
    // Données pour l'API
    const postData = querystring.stringify({
      email: 'mannefred.b@gmail.com',
      firstName: 'Mannefred'
    });

    const options = {
      hostname: 'jayscreation.vercel.app',
      port: 443,
      path: '/api/email/welcome',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('Envoi de l\'email de bienvenue à mannefred.b@gmail.com...');
    console.log('Données:', { email: 'mannefred.b@gmail.com', firstName: 'Mannefred' });

    const req = https.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('Response:', responseData);
        
        try {
          const response = JSON.parse(responseData);
          if (response.success) {
            console.log('??? Email envoyé avec succès à mannefred.b@gmail.com !');
            console.log('??? Message ID:', response.messageId);
          } else {
            console.log('??? Erreur lors de l\'envoi:', response.error);
          }
        } catch (e) {
          console.log('Réponse brute:', responseData);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Erreur HTTP:', error);
      console.log('Tentative avec serveur local...');
      
      // Si l'API Vercel ne répond pas, essayer localement
      tryLocalServer();
    });

    req.write(postData);
    req.end();

  } catch (error) {
    console.error('Erreur générale:', error);
  }
}

function tryLocalServer() {
  const http = require('http');
  const querystring = require('querystring');

  const postData = querystring.stringify({
    email: 'mannefred.b@gmail.com',
    firstName: 'Mannefred'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/email/welcome',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('Tentative avec serveur local...');

  const req = http.request(options, (res) => {
    console.log(`Status Local: ${res.statusCode}`);
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response Local:', responseData);
      
      try {
        const response = JSON.parse(responseData);
        if (response.success) {
          console.log('??? Email envoyé avec succès via serveur local !');
        } else {
          console.log('??? Erreur locale:', response.error);
          console.log('??? Création d\'une confirmation manuelle...');
          createManualConfirmation();
        }
      } catch (e) {
        console.log('Réponse locale brute:', responseData);
        createManualConfirmation();
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erreur serveur local:', error);
    createManualConfirmation();
  });

  req.write(postData);
  req.end();
}

function createManualConfirmation() {
  console.log('\n????????????????????????????????????????????????????????????????????????????');
  console.log('???? CONFIRMATION MANUELLE D\'ENVOI D\'EMAIL ?????');
  console.log('????????????????????????????????????????????????????????????????????????????');
  console.log('Destinataire: mannefred.b@gmail.com');
  console.log('Sujet: Bienvenue chez Jay\'s Creations Design !');
  console.log('Prénom: Mannefred');
  console.log('Code promo: BIENVENUE10');
  console.log('Lien boutique: https://jayscreation.vercel.app/boutique');
  console.log('Statut: PRÊT À ÊTRE ENVOYÉ MANUELLEMENT');
  console.log('????????????????????????????????????????????????????????????????????????????');
  console.log('Template HTML généré et disponible dans send-welcome-simple.js');
  console.log('????????????????????????????????????????????????????????????????????????????\n');
}

// Démarrer l'envoi
sendEmailNow();
