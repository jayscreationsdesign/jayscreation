"use client";

import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, CheckCircle, Search, ChevronDown } from "lucide-react";
import { type Product } from "@/data/products";

// ─── Avis fictifs ─────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    id: 1,
    name: "Sophie M.",
    verified: true,
    rating: 5,
    title: "Excellent produit !",
    date: "18/03/2026",
    text: "Je suis vraiment ravie de ma commande ! La qualité est au rendez-vous et la personnalisation est parfaite. J'ai reçu ma maquette sous 24h comme promis, et le résultat final était encore mieux que ce que j'imaginais. Je recommande vivement !",
  },
  {
    id: 2,
    name: "Fatima B.",
    verified: true,
    rating: 5,
    title: "Parfait pour l'anniversaire de ma fille",
    date: "10/03/2026",
    text: "Commande passée pour l'anniversaire de ma fille, tout était magnifique. Les finitions sont soignées et les couleurs très fidèles à ce qu'on avait demandé. Les invités ont adoré ! Livraison rapide et bien emballée. Je vais recommander pour le prochain événement.",
  },
  {
    id: 3,
    name: "Amina K.",
    verified: true,
    rating: 5,
    title: "Service impeccable",
    date: "02/03/2026",
    text: "Très bonne expérience du début à la fin. L'équipe est réactive et à l'écoute. Les modifications ont été faites rapidement sans souci. Le produit est de très bonne qualité, conforme aux photos. Je suis une cliente fidèle depuis maintenant 2 ans !",
  },
  {
    id: 4,
    name: "Nadia L.",
    verified: true,
    rating: 4,
    title: "Très satisfaite",
    date: "22/02/2026",
    text: "Produit de qualité, personnalisation soignée. Le délai de livraison était un peu long mais le résultat valait l'attente. La maquette était exactement ce que je voulais. Je mets 4 étoiles car la livraison a pris un peu plus de temps que prévu, mais sinon parfait.",
  },
];

// ─── Utilitaires ──────────────────────────────────────────────────────────────

function getBreakdown(rating: number, total: number) {
  const r = Math.min(5, Math.max(1, rating));
  const five  = Math.round(total * ((r - 1) / 4) * 0.88);
  const four  = Math.round(total * 0.07);
  const three = Math.round(total * 0.025);
  const two   = Math.round(total * 0.015);
  const one   = Math.max(0, total - five - four - three - two);
  return [
    { star: 5, count: five },
    { star: 4, count: four },
    { star: 3, count: three },
    { star: 2, count: two },
    { star: 1, count: one },
  ];
}

function StarRow({ filled, size = 14 }: { filled: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={
            i < Math.round(filled)
              ? "fill-[#C8A96E] text-[#C8A96E]"
              : "fill-transparent text-[#C8A96E]"
          }
        />
      ))}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function ProductReviews({ product }: { product: Product }) {
  const rating    = product.rating ?? 4.8;
  const total     = product.reviewCount ?? 124;
  const breakdown = getBreakdown(rating, total);

  const [search, setSearch]       = useState("");
  const [notation, setNotation]   = useState("Toutes");
  const [withMedia, setWithMedia] = useState(false);
  const [notationOpen, setNotationOpen] = useState(false);

  const notationOptions = ["Toutes", "5 étoiles", "4 étoiles", "3 étoiles", "2 étoiles", "1 étoile"];

  const filtered = REVIEWS.filter((r) => {
    if (search && !r.text.toLowerCase().includes(search.toLowerCase()) && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (notation !== "Toutes" && r.rating !== parseInt(notation)) return false;
    return true;
  });

  return (
    <section className="bg-[#FAF7F2] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Titre ── */}
        <h2 className="font-heading text-center text-2xl text-[#2C2C2C] md:text-3xl">
          Avis clients
        </h2>

        {/* ── Résumé global ── */}
        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">

          {/* Note globale */}
          <div className="flex flex-col items-center gap-2 sm:min-w-[160px]">
            <span className="font-heading text-6xl font-bold text-[#2C2C2C]">
              {rating.toFixed(1)}
            </span>
            <StarRow filled={rating} />
            <span className="text-sm text-[#6B6B6B]">
              Basé sur {total.toLocaleString("fr-FR")} avis
            </span>
          </div>

          {/* Barres de répartition */}
          <div className="w-full max-w-md flex flex-col gap-2.5">
            {breakdown.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8 shrink-0">
                  <span className="text-xs text-[#6B6B6B]">{star}</span>
                  <Star size={11} className="fill-[#C8A96E] text-[#C8A96E]" />
                </div>
                <div className="flex-1 h-2 rounded-full bg-[#E8E4DF] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#C8A96E]"
                    style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-[#6B6B6B] w-8 text-right shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Bouton rédiger */}
          <div className="sm:min-w-[160px] flex sm:justify-end items-start">
            <button className="rounded-full border-2 border-[#2C2C2C] px-5 py-2.5 text-sm font-medium text-[#2C2C2C] transition-colors hover:bg-[#2C2C2C] hover:text-white">
              Rédiger un avis
            </button>
          </div>
        </div>

        {/* ── Séparateur ── */}
        <div className="my-10 border-t border-[#E8E4DF]" />

        {/* ── Les clients disent ── */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#2C2C2C]">Les clients disent</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-[#C8A96E]">
            <span>✦</span>
            <span>Généré à partir des avis clients.</span>
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6B6B6B]" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>
            {product.name} est plébiscité pour la qualité de sa personnalisation, ses finitions soignées et la réactivité du service client. Les clientes témoignent d'un résultat fidèle à leurs attentes, d'une livraison soignée et d'une expérience agréable du début à la fin. La maquette sous 24h est particulièrement appréciée.
          </p>
          <button className="mt-4 rounded-full border border-[#2C2C2C] px-4 py-2 text-sm text-[#2C2C2C] transition-colors hover:bg-[#2C2C2C] hover:text-white">
            Lire le résumé par sujet
          </button>
        </div>

        {/* ── Séparateur ── */}
        <div className="mb-6 border-t border-[#E8E4DF]" />

        {/* ── Filtres ── */}
        <div className="mb-4 flex flex-wrap items-center gap-3">

          {/* Recherche */}
          <div className="flex items-center gap-2 rounded-full border border-[#E8E4DF] bg-white px-4 py-2">
            <input
              type="text"
              placeholder="Avis de recherche"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-36 bg-transparent text-sm text-[#2C2C2C] placeholder-[#6B6B6B] outline-none"
            />
            <Search size={14} className="text-[#6B6B6B]" />
          </div>

          {/* Notation */}
          <div className="relative">
            <button
              onClick={() => setNotationOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-[#E8E4DF] bg-white px-4 py-2 text-sm text-[#2C2C2C]"
            >
              {notation}
              <ChevronDown size={14} className={`text-[#6B6B6B] transition-transform ${notationOpen ? "rotate-180" : ""}`} />
            </button>
            {notationOpen && (
              <div className="absolute left-0 top-full z-10 mt-1 min-w-[140px] rounded-xl bg-white py-2 shadow-lg border border-[#E8E4DF]">
                {notationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setNotation(opt); setNotationOpen(false); }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#FAF7F2] ${notation === opt ? "text-[#C8A96E] font-medium" : "text-[#2C2C2C]"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Avec les médias */}
          <button
            onClick={() => setWithMedia((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-[#E8E4DF] bg-white px-4 py-2 text-sm text-[#2C2C2C]"
          >
            Avec les médias
            <div className={`h-4 w-4 rounded-full border-2 ${withMedia ? "border-[#C8A96E] bg-[#C8A96E]" : "border-[#E8E4DF]"}`} />
          </button>

          {/* Trier par */}
          <div className="ml-auto text-sm text-[#6B6B6B]">
            Trier par : <span className="font-medium text-[#2C2C2C]">Achat vérifié ↓</span>
          </div>
        </div>

        {/* ── Liste des avis ── */}
        <div className="flex flex-col divide-y divide-[#E8E4DF]">
          {filtered.map((review) => (
            <div key={review.id} className="py-8">
              <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#E8E4DF] text-sm font-semibold text-[#C8A96E]">
                  {review.name.charAt(0)}
                </div>

                <div className="flex-1">
                  {/* Nom + vérifié */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-[#2C2C2C]">{review.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-[#6B6B6B]">
                        <CheckCircle size={12} className="text-[#C8A96E]" />
                        Acheteur vérifié
                      </span>
                    )}
                  </div>

                  {/* Étoiles + date */}
                  <div className="mt-1.5 flex items-center justify-between">
                    <StarRow filled={review.rating} />
                    <span className="text-xs text-[#6B6B6B]">{review.date}</span>
                  </div>

                  {/* Titre */}
                  <p className="mt-2 text-sm font-bold text-[#2C2C2C]">{review.title}</p>

                  {/* Texte */}
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]" style={{ textAlign: 'justify', textJustify: 'inter-word', wordSpacing: '0.1em', letterSpacing: '0.02em' }}>{review.text}</p>

                  {/* Produit évalué */}
                  <p className="mt-2 text-xs text-[#6B6B6B]">
                    Produit évalué : <span className="font-medium">{product.name}</span>
                  </p>

                  {/* Utile ? */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-[#6B6B6B]">
                    <span>Cet avis vous a-t-il été utile ?</span>
                    <button className="flex items-center gap-1 hover:text-[#C8A96E] transition-colors">
                      <ThumbsUp size={13} /> 0
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#C8A96E] transition-colors">
                      <ThumbsDown size={13} /> 0
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-[#6B6B6B]">
              Aucun avis ne correspond à votre recherche.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
