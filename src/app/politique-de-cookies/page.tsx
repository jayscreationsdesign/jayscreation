import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies | Jay's Creations Design",
  description: "Politique de cookies de Jay's Creations Design - Utilisation des cookies, gestion des consentements et protection de la vie privée.",
};

export default function PolitiqueCookiesPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Titre principal */}
        <h1 className="text-3xl font-semibold text-[#2C1A0E] mb-6 text-center">
          Politique de cookies
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#8B4513]/20">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Qu'est-ce qu'un cookie ?
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, 
                tablette, smartphone) lorsque vous visitez notre site. Il permet de stocker 
                des informations sur votre navigation et de vous reconnaître lors de vos 
                visites ultérieures.
              </p>
              <p>
                Les cookies sont largement utilisés pour rendre les sites web plus 
                fonctionnels et pour recueillir des informations sur leur utilisation.
              </p>
            </div>
          </section>

          {/* Types de cookies */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Types de cookies utilisés sur notre site
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">🔒 Cookies essentiels (obligatoires)</h3>
              <p>
                Ces cookies sont indispensables au fonctionnement du site et ne peuvent 
                être désactivés. Ils sont généralement activés en réponse à des actions 
                que vous effectuez, comme la connexion à votre compte ou le remplissage 
                d'un formulaire.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Gestion de votre panier d'achat</li>
                <li>Maintien de votre session de connexion</li>
                <li>Sécurisation du site et prévention de la fraude</li>
                <li>Acceptation ou refus des cookies</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">📊 Cookies de mesure d'audience (analytics)</h3>
              <p>
                Ces cookies nous permettent de mesurer l'audience de notre site et 
                d'analyser le comportement des visiteurs pour améliorer nos services.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Nombre de visiteurs et pages vues</li>
                <li>Temps passé sur le site</li>
                <li>Pages les plus visitées</li>
                <li>Taux de rebond et sources de trafic</li>
              </ul>
              <p><strong>Outil utilisé :</strong> Google Analytics</p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">⚙️ Cookies fonctionnels</h3>
              <p>
                Ces cookies améliorent votre expérience en mémorisant vos préférences 
                et vos choix pour faciliter vos prochaines visites.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Mémorisation de vos choix de personnalisation</li>
                <li>Sauvegarde des produits dans votre panier</li>
                <li>Mémorisation de votre langue ou devise</li>
                <li>Affichage adapté à votre appareil</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">🎯 Cookies publicitaires (marketing)</h3>
              <p>
                Ces cookies sont utilisés pour vous proposer des publicités pertinentes 
                en fonction de vos centres d'intérêt et de votre navigation.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Publicités ciblées sur nos produits</li>
                <li>Limitation de la fréquence d'affichage des publicités</li>
                <li>Mesure de l'efficacité des campagnes publicitaires</li>
                <li>Personnalisation des offres commerciales</li>
              </ul>
              <p><strong>Activation : Uniquement avec votre consentement explicite</strong></p>
            </div>
          </section>

          {/* Tableau des cookies */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Détail des cookies utilisés
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-[#6B6B6B] border border-[#E8E4DF] rounded-lg">
                <thead className="bg-[#FAF7F2]">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-[#2C1A0E] border-b">Nom du cookie</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#2C1A0E] border-b">Finalité</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#2C1A0E] border-b">Durée</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#2C1A0E] border-b">Éditeur</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">cart_session</td>
                    <td className="px-4 py-2">Maintien du panier</td>
                    <td className="px-4 py-2">Session</td>
                    <td className="px-4 py-2">Jay's Creations Design</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">user_session</td>
                    <td className="px-4 py-2">Connexion utilisateur</td>
                    <td className="px-4 py-2">7 jours</td>
                    <td className="px-4 py-2">Jay's Creations Design</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">cookie_consent</td>
                    <td className="px-4 py-2">Choix cookies</td>
                    <td className="px-4 py-2">1 an</td>
                    <td className="px-4 py-2">Jay's Creations Design</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">_ga</td>
                    <td className="px-4 py-2">Google Analytics</td>
                    <td className="px-4 py-2">2 ans</td>
                    <td className="px-4 py-2">Google</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">_gid</td>
                    <td className="px-4 py-2">Google Analytics</td>
                    <td className="px-4 py-2">24 heures</td>
                    <td className="px-4 py-2">Google</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">_gat</td>
                    <td className="px-4 py-2">Google Analytics</td>
                    <td className="px-4 py-2">1 minute</td>
                    <td className="px-4 py-2">Google</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">[PUBLICITAIRES]</td>
                    <td className="px-4 py-2">Publicités ciblées</td>
                    <td className="px-4 py-2">Variable</td>
                    <td className="px-4 py-2">[PRESTATAIRES]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#6B6B6B] mt-2">
              [PUBLICITAIRES] et [PRESTATAIRES] à compléter selon vos outils marketing
            </p>
          </section>

          {/* Gestion des cookies */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Comment gérer vos préférences cookies ?
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">🎛️ Bandeau de consentement</h3>
              <p>
                Lors de votre première visite, un bandeau de cookies s'affiche pour vous 
                informer de l'utilisation de cookies et vous demander votre consentement.
              </p>
              <p>
                Vous pouvez accepter tous les cookies, refuser les cookies non essentiels, 
                ou personnaliser vos choix en accédant aux paramètres détaillés.
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">⚙️ Modification de vos choix</h3>
              <p>
                Vous pouvez modifier vos préférences cookies à tout moment de plusieurs manières :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Via le bouton "Paramètres cookies" en bas du site</li>
                <li>Via les paramètres de votre navigateur web</li>
                <li>Via les liens de désabonnement dans nos emails</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">🌐 Paramètres des navigateurs</h3>
              <p>
                Chaque navigateur web permet de gérer les cookies différemment :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                <li><strong>Edge :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
              </ul>
              <p>
                Vous pouvez choisir de bloquer tous les cookies, de recevoir une notification 
                lorsqu'un cookie est déposé, ou de supprimer les cookies existants.
              </p>
            </div>
          </section>

          {/* Durées de conservation */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Durées de conservation des cookies
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                La durée de conservation des cookies varie selon leur type :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
                <li><strong>Cookies persistants :</strong> De quelques minutes à plusieurs années</li>
                <li><strong>Cookies d'analyse :</strong> 24 heures à 2 ans maximum</li>
                <li><strong>Cookies de consentement :</strong> 6 mois à 1 an</li>
              </ul>
              <p>
                Les cookies sont automatiquement supprimés à l'expiration de leur durée 
                de conservation, ou vous pouvez les supprimer manuellement à tout moment.
              </p>
            </div>
          </section>

          {/* Cookies tiers */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Cookies tiers
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Notre site utilise des cookies tiers déposés par des partenaires externes 
                pour des fonctionnalités spécifiques :
              </p>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">🔍 Google Analytics</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Éditeur :</strong> Google LLC</li>
                <li><strong>Pays :</strong> États-Unis</li>
                <li><strong>Finalité :</strong> Analyse d'audience</li>
                <li><strong>Politique :</strong> <a href="https://policies.google.com/privacy" className="text-[#8B4513] hover:underline" target="_blank" rel="noopener">politique Google</a></li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">💳 Prestataires de paiement</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>[STRIPE/PAYPAL]</strong> : Cookies pour la sécurité des transactions</li>
                <li><strong>Finalité :</strong> Prévention de la fraude et suivi des paiements</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">📣 Réseaux sociaux (si utilisés)</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Facebook, Instagram, Pinterest</strong> : Cookies de partage et de suivi</li>
                <li><strong>Finalité :</strong> Partage de contenu et publicités ciblées</li>
              </ul>
              
              <p>
                Ces tiers ont leurs propres politiques de confidentialité. Nous vous 
                encourageons à les consulter pour comprendre comment ils utilisent 
                vos données.
              </p>
            </div>
          </section>

          {/* Impact sur l'expérience */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0O] mt-8 mb-3">
              Impact de la désactivation des cookies
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">🔒 Cookies essentiels</h3>
              <p>
                La désactivation de ces cookies affectera gravement le fonctionnement du site :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Impossible de maintenir votre panier</li>
                <li>Perte de votre connexion utilisateur</li>
                <li>Problèmes de sécurité</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">📊 Cookies d'analyse</h3>
              <p>
                La désactivation n'empêche pas l'utilisation du site mais nous empêche de :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Mesurer l'audience du site</li>
                <li>Améliorer les performances</li>
                <li>Détecter les problèmes techniques</li>
              </ul>
              
              <h3 className="font-semibold text-[#2C1A0E] mt-4 mb-2">⚙️ Cookies fonctionnels</h3>
              <p>
                La désactivation peut entraîner :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Perte de vos préférences personnelles</li>
                <li>Moins de confort de navigation</li>
                <li>Publicités moins pertinentes</li>
              </ul>
            </div>
          </section>

          {/* Législation */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0O] mt-8 mb-3">
              Cadre légal
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Notre utilisation des cookies respecte :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Règlement RGPD</strong> (UE 2016/679)</li>
                <li><strong>Directive ePrivacy</strong> ("Cookie Law")</li>
                <li><strong>Loi française Informatique et Libertés</strong></li>
                <li><strong>Recommandations de la CNIL</strong></li>
              </ul>
              
              <p>
                Nous appliquons le principe du "privacy by design" et obtenons votre 
                consentement éclairé avant tout dépôt de cookie non essentiel.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mt-8 mb-3">
              Contact et questions
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-2">
              <p>
                Pour toute question concernant notre politique de cookies ou l'exercice 
                de vos droits, vous pouvez nous contacter :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Email :</strong> jayscreations.d@gmail.com</li>
                <li><strong>Téléphone :</strong> +33 7 63 92 08 23</li>
                <li><strong>Adresse :</strong> 15 QUAI D'ASNIERES, 92390 VILLENEUVE-LA-GARENNE, France</li>
              </ul>
              
              <p>
                Vous pouvez également contacter la CNIL pour toute réclamation concernant 
                le traitement de vos données personnelles.
              </p>
            </div>
          </section>

          {/* Informations à personnaliser */}
          <section className="mb-8 bg-[#FAF7F2] p-4 rounded-lg border border-[#8B4513]/30">
            <h2 className="text-lg font-semibold text-[#2C1A0E] mb-3">
              📝 INFORMATIONS À PERSONNALISER
            </h2>
            <div className="text-sm text-[#6B6B6B] leading-relaxed space-y-1">
              <p><strong>[PUBLICITAIRES]</strong> : Noms des cookies publicitaires utilisés</p>
              <p><strong>[PRESTATAIRES]</strong> : Noms des prestataires publicitaires</p>
              <p><strong>[STRIPE/PAYPAL]</strong> : Votre ou vos prestataires de paiement</p>
              <p><strong>[FACEBOOK, INSTAGRAM, PINTEREST]</strong> : Réseaux sociaux utilisés</p>
            </div>
          </section>

          {/* Date de mise à jour */}
          <section className="mb-8">
            <div className="text-sm text-[#6B6B6B] leading-relaxed">
              <p>
                Cette politique de cookies a été mise à jour le : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
