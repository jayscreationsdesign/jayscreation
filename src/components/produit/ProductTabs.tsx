"use client";

import { useState } from "react";
import { type Product } from "@/data/products";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "informations", label: "Informations complementaires" },
    { id: "avis", label: "Avis" }
  ];

  return (
    <div className="w-full">
      {/* Conteneur des onglets */}
      <div className="border-b border-[#e8e0d0]">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-[#C8A96E] border-b-2 border-[#C8A96E]"
                  : "text-[#6B6B6B] hover:text-[#8B4513]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="bg-white p-6" style={{ minHeight: '200px' }}>
        {/* Onglet Description */}
        {activeTab === "description" && (
          <div className="space-y-3 text-sm text-[#6B6B6B]" style={{ lineHeight: '1.8' }}>
            <p>Etiquette au format PDF pour une impression sur feuille A4</p>
            <p>Fichier haute resolution</p>
            <p>Aucun produit physique n est vendu, le contenu est entierement digital</p>
            <p>Nous n apportons pas de modifications a nos conceptions ou aux mesures de nos produits</p>
            <p>Vous serez responsable de l impression et de l assemblage</p>
            <p>Pour une qualite optimale, privilegiez du papier brillant</p>
            <p>Apres l envoi du lien de telechargement, nous ne procedons a aucun retour, modification ou remboursement</p>
            <p>Veuillez lire la description avant achat</p>
          </div>
        )}

        {/* Onglet Informations complementaires */}
        {activeTab === "informations" && (
          <div className="space-y-4">
            <table className="w-full text-sm text-[#6B6B6B]">
              <tbody>
                <tr className="border-b border-[#e8e0d0]">
                  <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Format</td>
                  <td className="py-3">PDF haute resolution</td>
                </tr>
                <tr className="border-b border-[#e8e0d0]">
                  <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Reception</td>
                  <td className="py-3">sous 72h par email</td>
                </tr>
                <tr className="border-b border-[#e8e0d0]">
                  <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Impression</td>
                  <td className="py-3">illimitee</td>
                </tr>
                <tr className="border-b border-[#e8e0d0]">
                  <td className="py-3 font-medium text-[#2C2C2C] w-1/3">Produit physique</td>
                  <td className="py-3">non inclus</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Onglet Avis */}
        {activeTab === "avis" && (
          <div className="text-center text-sm text-[#6B6B6B]">
            <p>Aucun avis pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
