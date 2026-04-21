"use client";

import { useState } from "react";
import { Star, Ruler, HelpCircle, Heart, Truck, RotateCcw, MessageCircle } from 'lucide-react';
import { type Product } from "@/data/products";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon: any;
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
  const Icon = item.icon;
  
  return (
    <div className="border-b border-[#8B4513]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <div className="flex items-center gap-2.5">
          <Icon size={18} color="#8B4513" strokeWidth={1.5} />
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2C2C2C]">
            {item.title}
          </span>
        </div>
        <span className="text-base font-light text-[#2C2C2C]">
          {isOpen ? "â" : "+"}
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
      id: "description",
      title: "DESCRIPTION",
      icon: MessageCircle,
      content:
        product.estNumerique 
          ? "Etiquette au format PDF pour une impression sur feuille A4\nFichier haute résolution\nAucun produit physique n'est vendu, le contenu est entièrement digital\nNous n'apportons pas de modifications à nos conceptions ou aux mesures de nos produits\nVous serez responsable de l'impression et de l'assemblage\nPour une qualité optimale, privilégiez du papier brillant\nAprès l'envoi du lien de téléchargement, nous ne procédons à aucun retour, modification ou remboursement\nVeuillez lire la description avant achat"
          : (
            product.longDescription ||
            `Création artisanale 100% faite à la main\nMatériaux premium et finitions dorées soignées\nPersonnalisation complète : couleurs, texte, police, thème\nAperçu maquette envoyé sous 24h après commande\nModifications illimitées jusqu'à votre validation finale\nLivraison suivie en France métropolitaine\nService client réactif, disponible par email et téléphone`
          ),
    },
    {
      id: "informations",
      title: "INFORMATIONS COMPLÉMENTAIRES",
      icon: HelpCircle,
      content:
        product.estNumerique 
          ? "Format : PDF haute résolution\nRéception : sous 72h par email\nImpression : illimitée\nProduit physique : non inclus"
          : "Nos créations sont réalisées avec des matériaux soigneusement sélectionnés : papier premium 300g, impressions haute définition, finitions brillantes ou mates selon le produit, et dorures à chaud pour les collections premium. Nous privilégions des matériaux durables et résistants pour que vos souvenirs traversent le temps.",
    },
    {
      id: "avis",
      title: "AVIS",
      icon: Star,
      content: "Les avis clients seront bientôt disponibles pour ce produit."
    },
    {
      id: "personnalisation",
      title: "PERSONNALISATION",
      icon: Ruler,
      content:
        "Chaque produit est entièrement personnalisable :\n\nChoix du thème (mariage, baptême, anniversaire...)\nChoix des couleurs\nTexte personnalisé (prénoms, date, message)\nChoix de la police d'écriture\n\nAprès commande, vous recevrez un aperçu maquette sous 24h pour validation avant réalisation.",
    },
    {
      id: "creation",
      title: "CRÉATION",
      icon: Heart,
      content:
        "Chaque commande est une création unique, pensée et réalisée avec passion. Après validation de votre commande, nous concevons un visuel personnalisé selon votre thème, vos couleurs et vos envies. Un aperçu maquette vous est envoyé sous 24h pour validation. Aucune impression n'est lancée sans votre accord.",
    },
    {
      id: "livraison",
      title: "LIVRAISON & DÉLAIS",
      icon: Truck,
      content:
        "Délai de réalisation : 15 à 25 jours ouvrés selon la date de votre événement. Nous traitons les commandes par date d'événement pour vous garantir une livraison à temps.\n\nLivraison en France métropolitaine. Vous recevrez un email avec votre numéro de suivi dès l'expédition.",
    },
    {
      id: "retours",
      title: "RETOURS & CONDITIONS",
      icon: RotateCcw,
      content:
        "Chaque produit étant personnalisé et réalisé sur-mesure, les retours et échanges ne sont pas acceptés sauf en cas de défaut de fabrication avéré.\n\nContactez-nous dans les 48h suivant la réception à jayscreations.d@gmail.com ou au 07 49 07 28 61.",
    },
    {
      id: "faq-inline",
      title: "QUESTIONS FRÉQUENTES",
      icon: MessageCircle,
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
