import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Jay's Creations Design",
  description: "Politique de confidentialité de Jay's Creations Design - Protection des données personnelles, RGPD, droits des utilisateurs.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Titre principal */}
          <h1 
            className="text-4xl font-bold mb-8 text-center"
            style={{ fontFamily: 'Playfair Display, serif', color: '#2C1A0E' }}
          >
            Politique de Confidentialité
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8" style={{ border: '1px solid #E8E4DF' }}>
            
            {/* Responsable du traitement */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Responsable du traitement
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>JAY'S CREATIONS DESIGN — Anaïs</strong></p>
                <p><strong>Adresse :</strong> 15 Quai d'Asnières, 92390 Villeneuve-la-Garenne</p>
                <p><strong>Email :</strong> jayscreations.d@gmail.com</p>
                <p><strong>Téléphone :</strong> 07 49 07 28 61</p>
                <p><strong>SIRET :</strong> 898 571 021 00028</p>
              </div>
            </section>

            {/* Données collectées */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Données collectées
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Nom, prénom, email, téléphone, adresse de livraison</strong></p>
                <p><strong>Données de paiement</strong> (traitées par Stripe/PayPal)</p>
                <p><strong>Données de navigation</strong> (cookies, adresse IP)</p>
              </div>
            </section>

            {/* Finalités */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Finalités
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Traitement et suivi des commandes</strong></p>
                <p><strong>Communication relative aux commandes</strong></p>
                <p><strong>Amélioration du service</strong></p>
              </div>
            </section>

            {/* Conservation */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Conservation
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Les données sont conservées 3 ans</strong> après la dernière commande.</p>
                <p><strong>Factures : 10 ans</strong> (obligation comptable)</p>
                <p><strong>Cookies : 13 mois maximum</strong></p>
              </div>
            </section>

            {/* Vos droits */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Vos droits
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Conformément au RGPD, vous disposez des droits d'accès, rectification, suppression et portabilité.</strong></p>
                <p><strong>Demande à :</strong> jayscreations.d@gmail.com</p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Cookies
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Le site utilise des cookies techniques nécessaires au fonctionnement et des cookies analytiques (avec votre consentement).</strong></p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Hébergement des données
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Vercel Inc. — San Francisco, USA</strong></p>
                <p><strong>Supabase Inc. — données hébergées en Europe</strong></p>
              </div>
            </section>

            {/* Date */}
            <section>
              <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Politique de confidentialité mise à jour le : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
