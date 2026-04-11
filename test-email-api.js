// Test direct de l'API email pour diagnostiquer le problème
const https = require('https');

function testEmailAPI() {
  console.log('???? TEST DE L\'API EMAIL BIENVENUE ?????');
  console.log('Email cible: mannefred.b@gmail.com');
  console.log('Prénom: Mannefred');
  console.log('????????????????????????????????????????????????????????????????????????????\n');

  const postData = JSON.stringify({
    email: 'mannefred.b@gmail.com',
    firstName: 'Mannefred'
  });

  const options = {
    hostname: 'jayscreation.vercel.app',
    port: 443,
    path: '/api/email/welcome',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('Envoi de la requête à l\'API...');
  console.log('URL: https://jayscreation.vercel.app/api/email/welcome');
  console.log('Données:', postData);

  const req = https.request(options, (res) => {
    console.log(`\n???? STATUT DE LA RÉPONSE: ${res.statusCode}`);
    console.log('Headers:', JSON.stringify(res.headers, null, 2));
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('\n???? RÉPONSE COMPLÈTE:');
      console.log(responseData);
      
      try {
        const response = JSON.parse(responseData);
        console.log('\n???? ANALYSE DE LA RÉPONSE:');
        
        if (response.success) {
          console.log('??? Succès: Email envoyé');
          console.log('??? Message ID:', response.messageId);
          console.log('??? Message:', response.message);
        } else {
          console.log('??? Erreur: Email non envoyé');
          console.log('??? Erreur:', response.error);
          console.log('??? Détails:', response.details);
          
          // Diagnostiquer le problème
          if (response.details && response.details.includes('Missing credentials')) {
            console.log('\n???? DIAGNOSTIC: Problème de configuration SMTP');
            console.log('???? Cause: Identifiants Ionos non configurés');
            console.log('???? Solution: Configurer IONOS_EMAIL_USER et IONOS_EMAIL_PASS');
          } else if (response.details && response.details.includes('PLAIN')) {
            console.log('\n???? DIAGNOSTIC: Authentification SMTP échouée');
            console.log('???? Cause: Mauvais identifiants ou mot de passe');
          }
        }
      } catch (e) {
        console.log('??? Erreur parsing JSON:', e.message);
        console.log('??? Réponse brute:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('??? Erreur HTTP:', error);
    console.log('??? Tentative avec serveur local...');
    testLocalAPI();
  });

  req.write(postData);
  req.end();
}

function testLocalAPI() {
  const http = require('http');
  
  const postData = JSON.stringify({
    email: 'mannefred.b@gmail.com',
    firstName: 'Mannefred'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/email/welcome',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('\n???? TEST API LOCALE ?????');

  const req = http.request(options, (res) => {
    console.log(`Statut Local: ${res.statusCode}`);
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response Local:', responseData);
    });
  });

  req.on('error', (error) => {
    console.error('Erreur serveur local:', error);
    console.log('\n???? DIAGNOSTIC FINAL:');
    console.log('???? L\'API email n\'est pas accessible');
    console.log('???? Serveur local non démarré ou API non fonctionnelle');
    console.log('???? Configuration SMTP probablement manquante');
  });

  req.write(postData);
  req.end();
}

// Démarrer le test
testEmailAPI();
