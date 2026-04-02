"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base font-semibold text-[#2C2C2C] flex items-center gap-2">
          <span className="inline-block w-1 h-4 bg-[#8B4513] rounded-full" />
          {label}
        </label>
      )}
      
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger className="w-full rounded-full border border-[#E8E4DF] bg-white px-4 py-2 text-sm text-[#2C1A0E]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        
        <SelectContent>
          {categories.map((category) => (
            <div key={category.id} className="mb-2 last:mb-0">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#D4A574]/80">
                {category.label}
              </div>
              {category.themes.map((theme) => (
                <SelectItem key={theme.id} value={theme.id}>
                  {theme.label}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ThemeSelector
