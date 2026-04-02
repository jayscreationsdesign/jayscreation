"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Comment fonctionne la personnalisation ?",
    a: "Après votre commande, nous vous envoyons un aperçu maquette sous 24h par email. Vous pouvez demander autant de modifications que nécessaire avant de valider la version finale.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "Le délai de réalisation est de 15 à 25 jours ouvrés. Nous traitons les commandes par date d'événement pour garantir une livraison à temps.",
  },
  {
    q: "Puis-je annuler ou modifier ma commande ?",
    a: "Vous pouvez modifier ou annuler votre commande tant que la réalisation n'a pas commencé. Contactez-nous le plus tôt possible à jayscreations.d@gmail.com.",
  },
  {
    q: "Livrez-vous en dehors de la France ?",
    a: "Pour le moment, nous livrons uniquement en France métropolitaine. Contactez-nous pour toute demande spécifique.",
  },
];

function FAQRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E4DF]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="font-heading text-lg font-medium text-[#2C2C2C] md:text-xl">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-[#8B4513] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-6 text-base leading-relaxed text-[#6B6B6B]" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>{a}</p>
      )}
    </div>
  );
}

export default function ProductFAQ() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-2xl text-[#2C2C2C] md:text-3xl">
          Questions fréquentes
        </h2>
        <div className="mt-8 border-t border-[#E8E4DF]">
          {FAQS.map((faq) => (
            <FAQRow key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
