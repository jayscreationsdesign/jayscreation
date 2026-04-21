"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Star,
  HelpCircle,
  Heart,
  Truck,
  RotateCcw,
  MessageCircle,
  Tag,
} from "lucide-react";
import { type Product } from "@/data/products";

interface ProductTabsCompleteProps {
  product: Product;
}

const accordions = [
  {
    id: "avantages",
    title: "Avantages",
    icon: Star,
    content:
      "Créez une boîte cadeau unique et personnalisée pour vos événements les plus précieux. Notre boîte cadeau premium est entièrement personnalisable avec vos couleurs, thème, noms et dates. Idéale pour mariage, anniversaire, baby-shower ou toute célébration spéciale. Finitions artisanales de qualité avec détails dorés pour un rendu élégant et sophistiqué. Parfaite pour présenter vos cadeaux, friandises personnalisées ou souvenirs mémorables. Livraison offerte et personnalisation illimitée jusqu'à validation.",
  },
  {
    id: "personnalisation",
    title: "Personnalisation",
    icon: Tag,
    content:
      "Chaque produit est entièrement personnalisable :\n\n- Choix du thème (mariage, baptême, anniversaire...)\n- Choix des couleurs\n- Texte personnalisé (prénoms, date, message)\n- Choix de la police d'écriture\n\nAprès commande, vous recevrez un aperçu maquette sous 24h pour validation avant réalisation.",
  },
  {
    id: "materiaux",
    title: "Matériaux",
    icon: HelpCircle,
    content:
      "Nos créations sont réalisées avec des matériaux soigneusement sélectionnés : papier premium 300g, impressions haute définition, finitions brillantes ou mates selon le produit, et dorures à chaud pour les collections premium. Nous privilégions des matériaux durables et résistants pour que vos souvenirs traversent le temps.",
  },
  {
    id: "creation",
    title: "Création",
    icon: Heart,
    content:
      "Chaque commande est une création unique, pensée et réalisée avec passion. Après validation de votre commande, nous concevons un visuel personnalisé selon votre thème, vos couleurs et vos envies. Un aperçu maquette vous est envoyé sous 24h pour validation. Aucune impression n'est lancée sans votre accord.",
  },
  {
    id: "livraison",
    title: "Livraison & Délais",
    icon: Truck,
    content:
      "Délai de réalisation : 15 à 25 jours ouvrés selon la date de votre événement. Nous traitons les commandes par date d'événement pour vous garantir une livraison à temps. Livraison en France métropolitaine. Vous recevrez un email avec votre numéro de suivi dès l'expédition.",
  },
  {
    id: "retours",
    title: "Retours & Conditions",
    icon: RotateCcw,
    content:
      "Chaque produit étant personnalisé et réalisé sur-mesure, les retours et échanges ne sont pas acceptés sauf en cas de défaut de fabrication avéré. Contactez-nous dans les 48h suivant la réception à jayscreations.d@gmail.com ou au 07 63 92 08 23.",
  },
  {
    id: "faq",
    title: "Questions Fréquentes",
    icon: MessageCircle,
    content:
      "Comment se passe la personnalisation ?\nAprès votre commande, nous vous envoyons un aperçu maquette sous 24h. Vous pouvez demander des modifications jusqu'à validation finale.\n\nPuis-je commander pour un événement proche ?\nContactez-nous directement pour vérifier la disponibilité. Nous faisons notre maximum pour les urgences.",
  },
];

const tabs = [
  { id: "description", label: "Description", icon: null },
  { id: "informations", label: "Informations complémentaires", icon: null },
  { id: "avantages", label: "Avantages", icon: Star },
  { id: "personnalisation", label: "Personnalisation", icon: Tag },
  { id: "materiaux", label: "Matériaux", icon: HelpCircle },
  { id: "creation", label: "Création", icon: Heart },
  { id: "livraison", label: "Livraison & Délais", icon: Truck },
  { id: "retours", label: "Retours & Conditions", icon: RotateCcw },
  { id: "faq", label: "Questions Fréquentes", icon: MessageCircle },
];

function AccordionRow({
  accordion,
  isOpen,
  onToggle,
}: {
  accordion: (typeof accordions)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = accordion.icon;
  return (
    <div className="border-b border-[#e8e0d0]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} color="#C8A96E" strokeWidth={1.5} />
          <span
            className="font-semibold uppercase tracking-widest text-[#6B3A2A]"
            style={{ fontSize: "12px", letterSpacing: "1.5px" }}
          >
            {accordion.title}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-[#C8A96E] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div
          className="pb-6 text-[#6B6B6B]"
          style={{ fontSize: "14px", lineHeight: "1.8" }}
        >
          {accordion.content.split("\n").map((line, i) => (
            <p key={i} className={line === "" ? "mt-2" : ""}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductTabsComplete({ product }: ProductTabsCompleteProps) {
  const [activeTab, setActiveTab] = useState("description");
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Ajout du style pour les éléments select
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      select {
        width: 100%;
        min-width: 0;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      {/* Barre d'onglets */}
      <div className="border-b border-[#e8e0d0] overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-6 pb-4 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#C8A96E] text-[#C8A96E]"
                    : "text-[#9a8880] hover:text-[#8B4513]"
                }`}
                style={{ letterSpacing: "1px" }}
              >
                {Icon && <Icon size={15} color="#C8A96E" strokeWidth={1.5} />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="py-8">
        {/* Description */}
        {activeTab === "description" && (
          <div className="space-y-3 text-[#6B6B6B]" style={{ fontSize: "14px", lineHeight: "1.8" }}>
            <p>Étiquette au format PDF pour une impression sur feuille A4</p>
            <p>Fichier haute résolution</p>
            <p>Aucun produit physique n'est vendu, le contenu est entièrement digital.</p>
            <p>Nous n'apportons pas de modifications à nos conceptions ou aux mesures de nos produits.</p>
            <p>Vous serez responsable de l'impression et de l'assemblage.</p>
            <p>Pour une qualité optimale, privilégiez du papier brillant. Pour l'assemblage, optez pour du ruban adhésif double face ou un pistolet à colle.</p>
            <p>Après l'envoi du lien de téléchargement, nous ne procédons à aucun retour, modification ou remboursement.</p>
            <p>Veuillez lire la description avant achat.</p>
          </div>
        )}

        {/* Informations complémentaires */}
        {activeTab === "informations" && (
          <table className="w-full text-sm text-[#6B6B6B]">
            <tbody>
              <tr className="border-b border-[#e8e0d0]">
                <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Format</td>
                <td className="py-3">PDF haute résolution</td>
              </tr>
              <tr className="border-b border-[#e8e0d0]">
                <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Réception</td>
                <td className="py-3">Sous 72h par email</td>
              </tr>
              <tr className="border-b border-[#e8e0d0]">
                <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Impression</td>
                <td className="py-3">Illimitée</td>
              </tr>
              <tr className="border-b border-[#e8e0d0]">
                <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Produit physique</td>
                <td className="py-3">Non inclus</td>
              </tr>
            </tbody>
          </table>
        )}

        
        {/* Avantages */}
        {activeTab === "avantages" && (
          <p className="text-sm text-[#3C2415]" style={{ lineHeight: "1.8" }}>
            Créez une boîte cadeau unique et personnalisée pour vos événements les plus précieux.
            Notre boîte cadeau premium est entièrement personnalisable avec vos couleurs, thème, noms et dates.
            Idéale pour mariage, anniversaire, baby-shower ou toute célébration spéciale.
            Finitions artisanales de qualité avec détails dorés pour un rendu élégant et sophistiqué.
            Parfaite pour présenter vos cadeaux, friandises personnalisées ou souvenirs mémorables.
            Livraison offerte et personnalisation illimitée jusqu'à validation.
          </p>
        )}

        {/* Personnalisation */}
        {activeTab === "personnalisation" && (
          <div className="text-sm text-[#3C2415]" style={{ lineHeight: "1.8" }}>
            <p>Chaque produit est entièrement personnalisable :</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Choix du thème (mariage, baptême, anniversaire...)",
                "Choix des couleurs",
                "Texte personnalisé (prénoms, date, message)",
                "Choix de la police d'écriture",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#C8A96E] mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Après commande, vous recevrez un aperçu maquette sous 24h pour validation avant réalisation.
            </p>
          </div>
        )}

        {/* Matériaux */}
        {activeTab === "materiaux" && (
          <p className="text-sm text-[#3C2415]" style={{ lineHeight: "1.8" }}>
            Nos créations sont réalisées avec des matériaux soigneusement sélectionnés : papier premium 300g,
            impressions haute définition, finitions brillantes ou mates selon le produit, et dorures à chaud
            pour les collections premium. Nous privilégions des matériaux durables et résistants pour que
            vos souvenirs traversent le temps.
          </p>
        )}

        {/* Création */}
        {activeTab === "creation" && (
          <p className="text-sm text-[#3C2415]" style={{ lineHeight: "1.8" }}>
            Chaque commande est une création unique, pensée et réalisée avec passion.
            Après validation de votre commande, nous concevons un visuel personnalisé selon votre thème,
            vos couleurs et vos envies. Un aperçu maquette vous est envoyé sous 24h pour validation.
            Aucune impression n'est lancée sans votre accord.
          </p>
        )}

        {/* Livraison */}
        {activeTab === "livraison" && (
          <p className="text-sm text-[#3C2415]" style={{ lineHeight: "1.8" }}>
            Délai de réalisation : 15 à 25 jours ouvrés selon la date de votre événement.
            Nous traitons les commandes par date d'événement pour vous garantir une livraison à temps.
            Livraison en France métropolitaine.
            Vous recevrez un email avec votre numéro de suivi dès l'expédition.
          </p>
        )}

        {/* Retours */}
        {activeTab === "retours" && (
          <p className="text-sm text-[#3C2415]" style={{ lineHeight: "1.8" }}>
            Chaque produit étant personnalisé et réalisé sur-mesure, les retours et échanges ne sont
            pas acceptés sauf en cas de défaut de fabrication avéré. Contactez-nous dans les 48h suivant
            la réception à jayscreations.d@gmail.com ou au 07 63 92 08 23.
          </p>
        )}

        {/* FAQ */}
        {activeTab === "faq" && (
          <div className="text-sm text-[#3C2415] space-y-4" style={{ lineHeight: "1.8" }}>
            <div>
              <p className="font-semibold">Comment se passe la personnalisation ?</p>
              <p>
                Après votre commande, nous vous envoyons un aperçu maquette sous 24h.
                Vous pouvez demander des modifications jusqu'à validation finale.
              </p>
            </div>
            <div>
              <p className="font-semibold">Puis-je commander pour un événement proche ?</p>
              <p>
                Contactez-nous directement pour vérifier la disponibilité.
                Nous faisons notre maximum pour les urgences.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
