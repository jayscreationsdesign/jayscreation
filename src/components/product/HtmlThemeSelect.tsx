"use client"

import * as React from "react"
import type { ThemeCategory } from "@/config/themes"

interface HtmlThemeSelectProps {
  value?: string
  onChange: (value: string) => void
  categories: ThemeCategory[]
  label?: string
  placeholder?: string
}

export function HtmlThemeSelect({ value, onChange, categories, label, placeholder = "Sélectionnez un thème..." }: HtmlThemeSelectProps) {
  console.log("HtmlThemeSelect rendered", { value, categories: categories.length })
  
  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base font-semibold text-[#2C2C2C] flex items-center gap-2">
          <span className="inline-block w-1 h-4 bg-[#8B4513] rounded-full" />
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        <select
          value={value ?? ""}
          onChange={(e) => {
            console.log("Select changed to:", e.target.value)
            onChange(e.target.value)
          }}
          className="w-full rounded-full border-2 border-blue-500 bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          style={{ minHeight: '40px' }}
        >
          <option value="">
            {placeholder}
          </option>

          {categories.map((category) => (
            <optgroup key={category.id} label={category.label}>
              {category.themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* petite flèche à droite */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-blue-500">
          ▼
        </div>
      </div>
    </div>
  )
}

export default HtmlThemeSelect
