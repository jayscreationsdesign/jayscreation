"use client"

import React from "react"
import type { ThemeCategory } from "@/config/themes"

interface FakeThemeMenuProps {
  value?: string
  onChange: (value: string) => void
  categories: ThemeCategory[]
  label?: string
  placeholder?: string
}

export function FakeThemeMenu({ value, onChange, categories, label, placeholder = "Sélectionnez un thème..." }: FakeThemeMenuProps) {
  const [open, setOpen] = React.useState(false)

  console.log("FakeThemeMenu rendered", { value, categories: categories.length, open })

  const currentLabel =
    categories.flatMap(c => c.themes).find(t => t.id === value)?.label ||
    placeholder

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-base font-semibold text-[#2C2C2C] flex items-center gap-2">
          <span className="inline-block w-1 h-4 bg-[#8B4513] rounded-full" />
          {label}
        </label>
      )}
      
      <div className="relative w-full z-10">
        {/* bouton principal */}
        <button
          type="button"
          onClick={() => {
            console.log("Button clicked, current open:", open)
            setOpen(o => !o)
          }}
          className="flex w-full items-center justify-between rounded-full border-2 border-red-500 bg-white px-4 py-2 text-sm text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 relative z-20"
          style={{ minHeight: '44px' }}
        >
          <span>{currentLabel}</span>
          <span className="text-red-500">▼</span>
        </button>

        {/* liste déroulante simple */}
        {open && (
          <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border-2 border-red-500 bg-[#8B4513] p-2 max-h-80 overflow-y-auto shadow-lg">
            <div className="text-white text-sm mb-2">MENU OUVERT - {categories.length} catégories</div>
            {categories.map(category => (
              <div key={category.id} className="mb-2 last:mb-0">
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#D4A574]/80">
                  {category.label}
                </div>
                <div className="space-y-1">
                  {category.themes.map(theme => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        console.log("Theme clicked:", theme.id)
                        onChange(theme.id)
                        setOpen(false)
                      }}
                      className="block w-full text-left rounded-xl px-3 py-2 text-sm text-white transition-colors
                                 hover:bg-[#6b3410] hover:text-[#D4A574]"
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* overlay pour fermer au clic extérieur - SEULEMENT si menu ouvert */}
        {open && (
          <div 
            className="fixed inset-0 z-40 bg-red-500/10" 
            onClick={() => {
              console.log("Overlay clicked")
              setOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default FakeThemeMenu
