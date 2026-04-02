import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Jay's Creations Design",
  description: "Politique de confidentialité de Jay's Creations Design - Protection des données personnelles, RGPD, droits des utilisateurs et traitement des informations.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Titre principal */}
        <h1 className="text-3xl font-semibold text-[#2C1A0E] mb-6 text-center">
          Politique de confidentialité
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#8B4513]/20">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Introduction
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Jay's Creations Design s'engage à protéger la vie privée et les données 
                personnelles de ses clients et utilisateurs. Cette politique de confidentialité 
                explique comment nous collectons, utilisons, protégeons et partageons vos 
                informations personnelles.
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) 
                et à la loi française "Informatique et Libertés", cette politique s'applique 
                à toutes les données collectées via notre site https://jayscreations.fr.
              </p>
            </div>
          </section>

          {/* Responsable du traitement */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              1. Responsable du traitement
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Le responsable du traitement des données personnelles est :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Raison sociale :</strong> Jay's Creations Design</li>
                <li><strong>Forme juridique :</strong> [À COMPLÉTER]</li>
                <li><strong>Adresse :</strong> 15 QUAI D'ASNIERES, 92390 VILLENEUVE-LA-GARENNE, France</li>
                <li><strong>SIRET :</strong> 89857102100028</li>
                <li><strong>Email de contact :</strong> jayscreations.d@gmail.com</li>
                <li><strong>Téléphone :</strong> +33 7 63 92 08 23</li>
              </ul>
            </div>
          </section>

          {/* Données collectées */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              2. Données personnelles collectées
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données de commande</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale complète</li>
                <li>Informations de paiement (traitées par notre prestataire)</li>
                <li>Détails des produits commandés et personnalisations</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données de compte client</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Identifiants de connexion (email, mot de passe chiffré)</li>
                <li>Historique des commandes</li>
                <li>Adresses de livraison et de facturation enregistrées</li>
                <li>Préférences et paramètres du compte</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données de communication</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Messages envoyés via le formulaire de contact</li>
                <li>Correspondances par email</li>
                <li>Consentement à la newsletter (si souscrit)</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données techniques</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Adresse IP</li>
                <li>Type de navigateur et système d'exploitation</li>
                <li>Pages visitées et durée des visites</li>
                <li>Cookies et données de navigation</li>
              </ul>
            </div>
          </section>

          {/* Finalités et bases légales */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              3. Finalités et bases légales du traitement
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Exécution du contrat</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Traitement des commandes et expédition des produits</li>
                <li>Gestion des personnalisations demandées</li>
                <li>Facturation et paiement</li>
                <li>Service client et suivi des commandes</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Obligations légales</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Conservation des factures et documents comptables</li>
                <li>Lutte contre la fraude et le blanchiment</li>
                <li>Répondre aux réclamations et demandes officielles</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Consentement</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Envoi de newsletters et communications marketing</li>
                <li>Cookies de mesure d'audience et de personnalisation</li>
                <li>Partage sur réseaux sociaux (avec consentement explicite)</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Intérêt légitime</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Amélioration du site et de l'expérience utilisateur</li>
                <li>Analyse des statistiques de fréquentation</li>
                <li>Sécurisation du site et prévention des fraudes</li>
                <li>Personnalisation de l'offre commerciale</li>
              </ul>
            </div>
          </section>

          {/* Destinataires des données */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              4. Destinataires des données
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Vos données personnelles peuvent être partagées avec les tiers suivants 
                dans le cadre des finalités décrites :
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Prestataires techniques</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Hébergeur web :</strong> [NOM DE L'HÉBERGEUR]</li>
                <li><strong>Prestataire de paiement :</strong> [STRIPE/PAYPAL/AUTRE]</li>
                <li><strong>Solution d'emailing :</strong> [MAILCHIMP/AUTRE]</li>
                <li><strong>Outils d'analyse :</strong> Google Analytics</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Partenaires logistiques</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Transporteurs :</strong> [LA POSTE/CHRONOPOST/AUTRES]</li>
                <li><strong>Prestataires d'impression :</strong> [IMPRIMEURS PARTENAIRES]</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Autorités compétentes</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Administration fiscale et douanes</li>
                <li>Autorités judiciaires (sur réquisition)</li>
                <li>Commission Nationale Informatique et Libertés (CNIL)</li>
              </ul>
              
              <p>
                Tous nos sous-traitants sont sélectionnés avec soin et signent des 
                contrats garantissant un niveau de protection des données équivalent 
                au nôtre.
              </p>
            </div>
          </section>

          {/* Durées de conservation */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              5. Durées de conservation
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données clients</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Comptes clients actifs :</strong> Pendant toute la durée de la relation commerciale</li>
                <li><strong>Comptes clients inactifs :</strong> 3 ans après la dernière commande</li>
                <li><strong>Historique des commandes :</strong> 10 ans (obligation comptable)</li>
                <li><strong>Factures et documents fiscaux :</strong> 10 ans</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données de prospection</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Newsletter :</strong> Jusqu'à désabonnement</li>
                <li><strong>Leads commerciaux :</strong> 3 ans après dernier contact</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Données techniques</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Logs de connexion :</strong> 1 an</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
                <li><strong>Statistiques de navigation :</strong> 26 mois (Google Analytics)</li>
              </ul>
              
              <p>
                Au-delà de ces durées, les données sont soit supprimées, soit anonymisées 
                pour des fins statistiques.
              </p>
            </div>
          </section>

          {/* Droits des personnes */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              6. Droits des personnes concernées
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Conformément au RGPD, vous disposez des droits suivants sur vos données 
                personnelles :
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit d'accès</h3>
              <p>
                Vous pouvez demander une copie de toutes vos données personnelles que nous détenons.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit de rectification</h3>
              <p>
                Vous pouvez demander la correction de données inexactes ou incomplètes.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit à l'effacement</h3>
              <p>
                Vous pouvez demander la suppression de vos données, sauf obligation légale 
                de les conserver.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit à la limitation</h3>
              <p>
                Vous pouvez limiter le traitement de vos données dans certains cas.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit à la portabilité</h3>
              <p>
                Vous pouvez recevoir vos données dans un format structuré et les transmettre 
                à un autre responsable de traitement.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit d'opposition</h3>
              <p>
                Vous pouvez vous opposer au traitement de vos données pour des motifs 
                légitimes, notamment au marketing direct.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Droit de retrait du consentement</h3>
              <p>
                Vous pouvez retirer votre consentement à tout moment pour les traitements 
                basés sur votre consentement.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Comment exercer vos droits</h3>
              <p>
                Pour exercer ces droits, contactez-nous par :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Email : jayscreations.d@gmail.com</li>
                <li>Téléphone : +33 7 63 92 08 23</li>
                <li>Courrier : 15 QUAI D'ASNIERES, 92390 VILLENEUVE-LA-GARENNE, France</li>
              </ul>
              
              <p>
                Nous répondrons à votre demande dans un délai d'un mois maximum, 
                prolongé de deux mois si nécessaire.
              </p>
            </div>
          </section>

          {/* Sécurité des données */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              7. Sécurité des données
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Jay's Creations Design met en œuvre des mesures techniques et organisationnelles 
                appropriées pour protéger vos données personnelles contre :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>La perte accidentelle ou la destruction</li>
                <li>L'accès non autorisé</li>
                <li>La modification, la divulgation ou l'altération</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Mesures de sécurité mises en place</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Mots de passe chiffrés et hachés</li>
                <li>Contrôle d'accès strict aux données</li>
                <li>Sauvegardes régulières et sécurisées</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>
            </div>
          </section>

          {/* Cookies et traceurs */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              8. Cookies et traceurs
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Notre site utilise des cookies pour améliorer votre expérience et analyser 
                notre trafic. Vous pouvez consulter notre politique de cookies détaillée 
                <a href="/politique-de-cookies" className="text-[#8B4513] hover:underline"> ici</a>.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">Types de cookies utilisés</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                <li><strong>Cookies de mesure d'audience :</strong> Google Analytics</li>
                <li><strong>Cookies fonctionnels :</strong> Mémorisation des préférences</li>
                <li><strong>Cookies publicitaires :</strong> [AVEC CONSENTEMENT]</li>
              </ul>
            </div>
          </section>

          {/* Transferts internationaux */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              9. Transferts internationaux
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Vos données sont principalement hébergées et traitées dans l'Union Européenne. 
                Certains de nos prestataires peuvent être basés hors de l'UE, notamment :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Google Analytics :</strong> États-Unis (avec garanties SCC)</li>
                <li><strong>[AUTRES PRESTATAIRES HORS UE] :</strong> [PAYS]</li>
              </ul>
              
              <p>
                Ces transferts sont encadrés par des clauses contractuelles types approuvées 
                par la Commission Européenne ou par des décisions d'adéquation.
              </p>
            </div>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0O] mt-8 mb-3">
              10. Modifications de la politique
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité 
                à tout moment pour nous conformer aux évolutions légales et réglementaires.
              </p>
              <p>
                Toute modification sera notifiée aux utilisateurs par email ou via une 
                notification sur le site. La date de la dernière mise à jour sera toujours 
                indiquée en bas de cette page.
              </p>
            </div>
          </section>

          {/* Contact CNIL */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              11. Réclamation auprès de la CNIL
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Si vous estimez que le traitement de vos données constitue une violation 
                de la réglementation, vous avez le droit d'introduire une réclamation 
                auprès de la Commission Nationale Informatique et Libertés (CNIL) :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Adresse :</strong> 3 Place de Fontenoy - 75007 Paris</li>
                <li><strong>Site web :</strong> https://www.cnil.fr</li>
                <li><strong>Téléphone :</strong> 01 53 73 22 22</li>
              </ul>
            </div>
          </section>

          {/* Informations à personnaliser */}
          <section className="mb-8 bg-[#FAF7F2] p-4 rounded-lg border border-[#8B4513]/30">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mb-3">
              📝 INFORMATIONS À PERSONNALISER
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-1">
              <p><strong>[NOM DE L'HÉBERGEUR]</strong> : Nom de votre hébergeur web</p>
              <p><strong>[STRIPE/PAYPAL/AUTRE]</strong> : Votre prestataire de paiement</p>
              <p><strong>[MAILCHIMP/AUTRE]</strong> : Votre solution d'emailing</p>
              <p><strong>[LA POSTE/CHRONOPOST/AUTRES]</strong> : Vos transporteurs</p>
              <p><strong>[IMPRIMEURS PARTENAIRES]</strong> : Vos prestataires d'impression</p>
              <p><strong>[AVEC CONSENTEMENT]</strong> : Si vous utilisez des cookies publicitaires</p>
              <p><strong>[AUTRES PRESTATAIRES HORS UE]</strong> : Autres prestataires internationaux</p>
              <p><strong>[PAYS]</strong> : Pays des prestataires hors UE</p>
            </div>
          </section>

          {/* Date de mise à jour */}
          <section className="mb-8">
            <div className="text-sm text-[#6B6B6B] leading-relaxed">
              <p>
                Cette politique de confidentialité a été mise à jour le : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
