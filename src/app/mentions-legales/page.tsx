import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Jay's Creations Design",
  description: "Mentions légales de Jay's Creations Design - Éditeur, hébergement, propriété intellectuelle et protection des données.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Titre principal */}
          <h1 
            className="text-4xl font-bold mb-8 text-center"
            style={{ fontFamily: 'Playfair Display, serif', color: '#2C1A0E' }}
          >
            Mentions Légales
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8" style={{ border: '1px solid #E8E4DF' }}>
            
            {/* Éditeur du site */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Éditeur du site
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Raison sociale :</strong> JAY'S CREATIONS DESIGN</p>
                <p><strong>Forme juridique :</strong> Entrepreneur individuel</p>
                <p><strong>SIRET :</strong> 898 571 021 00028</p>
                <p><strong>Adresse :</strong> 15 Quai d'Asnières, 92390 Villeneuve-la-Garenne</p>
                <p><strong>Email :</strong> jayscreations.d@gmail.com</p>
                <p><strong>Téléphone :</strong> 07 49 07 28 61</p>
                <p><strong>Directrice de publication :</strong> Anaïs</p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Hébergement
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
                <p><strong>Site web :</strong> vercel.com</p>
                <p><strong>Téléphone :</strong> +1 (415) 231-8878</p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Propriété Intellectuelle
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Tous les contenus présents sur le site jayscreationsdesign.fr 
                  (textes, images, logos, créations) sont la propriété exclusive 
                  de JAY'S CREATIONS DESIGN et sont protégés par le droit d'auteur français.
                </p>
                <p>
                  Toute reproduction est interdite sans autorisation écrite préalable.
                </p>
              </div>
            </section>

            {/* Données personnelles */}
            <section className="mb-8">
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: '#8B4513', borderBottom: '1px solid #E8E4DF', paddingBottom: '8px' }}
              >
                Protection des Données Personnelles
              </h2>
              <div className="text-sm space-y-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6B6B', lineHeight: '1.6' }}>
                <p>
                  Conformément au RGPD, nous protégeons vos données et respectons vos droits.
                </p>
                <p>
                  Pour exercer vos droits : jayscreations.d@gmail.com
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
