import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Jay's Creations Design",
  description: "Conditions Générales de Vente de Jay's Creations Design - Prix, commandes, paiement, livraison, droit de rétractation et garanties.",
};

export default function CGVPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Titre principal */}
          <h1 
            className="text-4xl font-bold mb-8 text-center"
            style={{ fontFamily: 'Playfair Display, serif', color: '#2C1A0E' }}
          >
            Conditions Générales de Vente
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8" style={{ border: '1px solid #E8E4DF' }}>
            
            {/* Objet */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 1 — Objet
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Les présentes CGV régissent les ventes de produits personnalisés 
                  réalisées par JAY'S CREATIONS DESIGN, entrepreneur individuel, 
                  SIRET 898 571 021 00028, dont le siège est au 
                  15 Quai d'Asnières, 92390 Villeneuve-la-Garenne.
                </p>
              </div>
            </section>

            {/* Produits */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 2 — Produits
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Nos produits sont des créations personnalisées (papeterie, cadeaux, 
                  articles de flocage) fabriquées sur mesure selon les spécifications 
                  du client.
                </p>
                <p>
                  Chaque commande est unique et fabriquée spécifiquement pour le client.
                </p>
              </div>
            </section>

            {/* Prix */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 3 — Prix
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Les prix sont indiqués en euros TTC. TVA non applicable — 
                  Art. 293B du CGI.
                </p>
                <p>
                  JAY'S CREATIONS DESIGN se réserve le droit de modifier ses prix à tout moment.
                </p>
              </div>
            </section>

            {/* Commande */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 4 — Commande
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  La commande est validée après paiement intégral. Un email de confirmation 
                  est envoyé avec récapitulatif.
                </p>
                <p>
                  Un aperçu/maquette est envoyé sous 24h pour validation avant production.
                </p>
              </div>
            </section>

            {/* Paiement */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 5 — Paiement
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Le paiement est exigible à la commande. Moyens acceptés : 
                  carte bancaire (Stripe), PayPal, Klarna.
                </p>
                <p>
                  Transactions sécurisées via protocole SSL.
                </p>
              </div>
            </section>

            {/* Livraison */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 6 — Livraison
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Zone : France métropolitaine. Délai : 7 à 15 jours ouvrés 
                  après validation de la maquette.
                </p>
                <p>
                  Livraison offerte dès 50€ d'achat.
                </p>
              </div>
            </section>

            {/* Droit de rétractation */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 7 — Droit de rétractation
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Conformément à l'article L221-28 du Code de la consommation, 
                  le droit de rétractation ne s'applique pas aux produits 
                  personnalisés fabriqués sur mesure.
                </p>
                <p>
                  <strong>Les produits personnalisés ne peuvent donc pas être retournés 
                  ni échangés après validation de la commande.</strong>
                </p>
              </div>
            </section>

            {/* Garanties */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 8 — Garanties
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Garantie de conformité : produits conformes à la commande et 
                  exempts de vices cachés.
                </p>
                <p>
                  Garantie légale de 2 ans contre les vices cachés.
                </p>
              </div>
            </section>

            {/* Réclamations */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 9 — Réclamations
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Toute réclamation doit être adressée dans les 14 jours suivant 
                  la réception à : jayscreations.d@gmail.com ou 07 49 07 28 61.
                </p>
              </div>
            </section>

            {/* Médiation */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 10 — Médiation
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  En cas de litige, vous pouvez recourir au médiateur : 
                  CM2C — Centre de Médiation et d'Arbitrage, 
                  14 rue Saint Jean, 75017 Paris, www.cm2c.net
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Article 11 — Droit applicable
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Les présentes CGV sont soumises au droit français. Tribunal compétent : 
                  celui du lieu de siège social.
                </p>
              </div>
            </section>

            {/* Date */}
            <section>
              <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  CGV mises à jour le : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
