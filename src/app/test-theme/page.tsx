"use client";

import { useState } from "react";
import ThemeSelector from "@/components/product/ThemeSelector";
import { THEME_CATEGORIES } from "@/config/themes";

export default function TestThemePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Test du composant ThemeSelector
            </h1>
            <p className="text-muted-foreground mb-8">
              Test du menu déroulant de sélection de thèmes personnalisables.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-xl p-8 border border-[#8B4513]">
            <ThemeSelector
              categories={THEME_CATEGORIES}
              value={selectedTheme}
              onChange={setSelectedTheme}
              label="Choisissez votre thème"
              placeholder="Sélectionner un thème..."
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">État actuel :</h2>
            <div className="space-y-2">
              <p><strong>Thème sélectionné :</strong> {selectedTheme || "Aucun"}</p>
              <p><strong>Valide :</strong> {selectedTheme ? "✅ Oui" : "❌ Non"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
