"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { ALL_THEMES, Theme } from "@/config/themes";

interface ThemeSelectorProps {
  themes?: Theme[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ThemeSelector({
  themes,
  value,
  onChange,
  label = "Choisissez votre thème",
  placeholder = "Sélectionner un thème...",
}: ThemeSelectorProps) {
  // Si themes est vide, ne pas afficher le composant
  if (!themes || themes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base font-semibold text-[#2C2C2C] flex items-center gap-2">
          <span className="inline-block w-1 h-4 bg-[#C8A96E] rounded-full" />
          {label}
        </label>
      )}
      <div className="relative">
        <Select
          value={value}
          onValueChange={(newValue) => onChange(newValue || "")}
        >
          <SelectTrigger className="w-full h-12 px-4 border-[2px] border-[#C8A96E] bg-white text-[#2C2C2C] font-medium text-sm focus:ring-[#C8A96E] focus:ring-2 focus:ring-offset-2 hover:border-[#B89A5E] transition-all duration-200 shadow-sm">
            <SelectValue placeholder={placeholder} className="text-gray-500" />
            <ChevronDown className="ml-2 h-4 w-4 text-[#C8A96E] transition-transform duration-200" />
          </SelectTrigger>
          <SelectContent className="border-[2px] border-[#C8A96E] bg-white shadow-xl rounded-xl p-2">
            {themes.map((theme) => (
              <SelectItem 
                key={theme.id} 
                value={theme.id}
                className="px-4 py-3 text-[#2C2C2C] font-medium hover:bg-[#FAF7F2] hover:text-[#C8A96E] cursor-pointer transition-colors duration-150 rounded-lg"
              >
                {theme.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Indicateur de sélection */}
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-[#C8A96E] rounded-full animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Texte informatif */}
      <p className="text-xs text-[#6B6B6B] italic">
        Choisissez le style qui correspond le mieux à votre événement
      </p>
    </div>
  );
}
