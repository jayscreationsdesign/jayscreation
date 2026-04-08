"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette } from "lucide-react"
import type { ThemeCategory } from "@/config/themes"

interface ThemeSelectorProps {
  value?: string
  onChange: (value: string | null) => void
  categories: ThemeCategory[]
  label?: string
  placeholder?: string
}

export function ThemeSelector({ value, onChange, categories, label = "Choisissez votre thème", placeholder = "Sélectionnez un thème..." }: ThemeSelectorProps) {
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
      
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger 
          className="w-full group rounded-2xl border-2 border-[#E8E4DF] bg-white px-5 py-3 text-sm text-[#2C1A0E] hover:border-[#8B4513]/50 focus:border-[#8B4513] focus:ring-2 focus:ring-[#8B4513]/10 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <SelectValue placeholder={placeholder}>
            {value ? getSelectedThemeLabel(value) : placeholder}
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent 
          className="rounded-2xl border-2 border-[#E8E4DF] shadow-xl max-h-96 overflow-y-auto" 
          style={{
            background: "linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 50%, #F5E6D3 100%)",
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%"
          }}
        >
          <div className="p-3">
            {categories.map((category) => (
              <div key={category.id} className="mb-4 last:mb-0">
                <div className="px-3 py-2 bg-gradient-to-r from-[#FAF7F2] to-[#F5F0E6] rounded-lg mb-2 border border-[#E8E4DF]/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#8B4513] rounded-full" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B4513]">
                      {category.label}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  {category.themes.map((theme) => (
                    <SelectItem 
                      key={theme.id} 
                      value={theme.id}
                      className="rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#FAF7F2] hover:text-[#8B4513] focus:bg-[#8B4513]/10 focus:text-[#8B4513] py-3 px-4 text-sm w-full"
                    >
                      <div className="flex items-center gap-3 w-full min-w-0">
                        <div className="w-1.5 h-1.5 bg-[#D4A574] rounded-full opacity-60 flex-shrink-0" />
                        <span className="font-medium text-left truncate flex-1">{theme.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}

export default ThemeSelector
