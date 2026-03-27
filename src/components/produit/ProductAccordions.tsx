"use client";

import { useState } from "react";
import { type Product } from "@/data/products";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E8E4DF]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2C2C2C]">
          {item.title}
        </span>
        <span className="text-base font-light text-[#2C2C2C]">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="pb-5 text-sm leading-relaxed text-[#6B6B6B] whitespace-pre-line" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
          {item.content}
        </div>
      )}
    </div>
  );
}

export default function ProductAccordions({ product }: { product: Product }) {
  const [openId, setOpenId] = useState<string>("avantages");

  const items: AccordionItem[] = [
    {
      id: "avantages",
      title: "Avantages",
      content:
        product.longDescription ||
        `• Création artisanale 100% faite à la main\n• Matériaux premium et finitions dorées soignées\n• Personnalisation complète : couleurs, texte, police, thème\n• Aperçu maquette envoyé sous 24h après commande\n• Modifications illimitées jusqu'à votre validation finale\n• Livraison suivie en France métropolitaine\n• Service client réactif, disponible par email et téléphone`,
    },
    {
      id: "personnalisation",
      title: "Personnalisation",
      content:
        "Chaque produit est entièrement personnalisable :\n\n• Choix du thème (mariage, baptême, anniversaire...)\n• Choix des couleurs\n• Texte personnalisé (prénoms, date, message)\n• Choix de la police d'écriture\n\nAprès commande, vous recevrez un aperçu maquette sous 24h pour validation avant réalisation.",
    },
    {
      id: "livraison",
      title: "Livraison & Délais",
      content:
        "Délai de réalisation : 15 à 25 jours ouvrés selon la date de votre événement. Nous traitons les commandes par date d'événement pour vous garantir une livraison à temps.\n\nLivraison en France métropolitaine. Vous recevrez un email avec votre numéro de suivi dès l'expédition.",
    },
    {
      id: "retours",
      title: "Retours & Conditions",
      content:
        "Chaque produit étant personnalisé et réalisé sur-mesure, les retours et échanges ne sont pas acceptés sauf en cas de défaut de fabrication avéré.\n\nContactez-nous dans les 48h suivant la réception à jayscreations.d@gmail.com ou au 07 49 07 28 61.",
    },
    {
      id: "faq-inline",
      title: "Questions Fréquentes",
      content:
        "Comment se passe la personnalisation ?\nAprès votre commande, nous vous envoyons un aperçu maquette sous 24h. Vous pouvez demander des modifications jusqu'à validation finale.\n\nPuis-je commander pour un événement proche ?\nContactez-nous directement pour vérifier la disponibilité. Nous faisons notre maximum pour les urgences.",
    },
  ];

  return (
    <div className="border-t border-[#E8E4DF]">
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? "" : item.id)}
        />
      ))}
    </div>
  );
}
