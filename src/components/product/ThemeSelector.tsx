"use client"

import { useState } from "react"
import { Palette, ChevronDown } from "lucide-react"
import type { ThemeCategory } from "@/config/themes"

interface ThemeSelectorProps {
  value?: string
  onChange: (value: string | null) => void
  categories: ThemeCategory[]
  label?: string
  placeholder?: string
}

export function ThemeSelector({ value, onChange, categories, label = "Choisissez votre thème", placeholder = " Sélectionnez un thème..." }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  console.log("ThemeSelector rendu", { value, categories: categories.length })

  // Fonction pour trouver le label du thème sélectionné
  const getSelectedThemeLabel = (themeId: string): string => {
    if (!themeId) return ""
    
    for (const category of categories) {
      const theme = category.themes.find(t => t.id === themeId)
      if (theme) {
        return theme.label
      }
    }
    
    // Fallback: capitaliser l'ID
    return themeId.charAt(0).toUpperCase() + themeId.slice(1).replace(/-/g, ' ')
  }

  const handleSelect = (themeId: string) => {
    onChange(themeId)
    setIsOpen(false)
  }

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base font-semibold text-[#2C2C2C] flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Palette size={16} className="text-[#8B4513]" />
            <span className="inline-block w-1 h-4 bg-[#8B4513] rounded-full" />
          </div>
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-2xl border-2 border-[#8B4513] bg-white px-4 py-3 text-sm text-[#2C2C2C] hover:border-[#8B4513] focus:border-2 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/10 transition-all duration-200 shadow-sm flex items-center justify-between"
        >
          <span className={value ? "text-[#2C2C2C]" : "text-[#999]"}>
            {value ? getSelectedThemeLabel(value) : "\ud83c\udfa8 Sélectionnez un thème..."}
          </span>
          <ChevronDown 
            size={20} 
            className={`text-[#8B4513] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-[#8B4513] rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <div className="p-2">
              {categories.map((category) => (
                <div key={category.id} className="mb-4 last:mb-0">
                  {/* Category Header */}
                  <div className="px-3 py-2 bg-[#FAF7F2] rounded-md mb-2 border border-[#E8E4DF]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#8B4513]" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#8B4513]">
                        {category.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Theme Items */}
                  <div className="space-y-1 ml-4">
                    {category.themes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleSelect(theme.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-150 ${
                          value === theme.id 
                            ? "bg-[#8B4513] text-white" 
                            : "text-[#2C2C2C] hover:bg-[#FAF7F2] focus:bg-[#8B4513]/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            value === theme.id 
                              ? "bg-white" 
                              : "bg-[#e8e0d4]"
                          }`} />
                          <span>{theme.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemeSelector
