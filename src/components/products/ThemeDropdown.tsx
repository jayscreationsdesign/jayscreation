'use client'
import { useState, useRef, useEffect } from 'react'
import { THEME_CATEGORIES } from '@/config/themes'

interface ThemeDropdownProps {
  selected: string | null
  onSelect: (value: string) => void
}

export default function ThemeDropdown({ selected, onSelect }: ThemeDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Récupérer tous les thèmes de toutes les catégories
  const allThemes = THEME_CATEGORIES.flatMap(category => category.themes)

  const formatLabel = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #8B4513',
          borderRadius: '999px',
          fontSize: '14px',
          color: selected ? '#333333' : '#999999',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <span>{selected ? formatLabel(selected) : '\u{1F3A8} Sélectionnez un thème...'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: '0',
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #8B4513',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          zIndex: 9999,
          maxHeight: '280px',
          overflowY: 'auto',
          padding: '12px',
        }}>
          {THEME_CATEGORIES.map((category, categoryIndex) => (
            <div key={category.id} style={{ marginBottom: categoryIndex === THEME_CATEGORIES.length - 1 ? '0' : '16px' }}>
              {/* En-tête de catégorie */}
              <div style={{
                padding: '8px 12px',
                backgroundColor: '#FAF7F2',
                borderRadius: '8px',
                marginBottom: '8px',
                border: '1px solid #E8E4DF',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#8B4513'
                  }} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#8B4513'
                  }}>
                    {category.label}
                  </span>
                </div>
              </div>
              
              {/* Thèmes de la catégorie */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {category.themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => { onSelect(theme.id); setOpen(false) }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px 8px 32px',
                      fontSize: '14px',
                      color: selected === theme.id ? '#C8A96E' : '#333333',
                      fontWeight: selected === theme.id ? '600' : '400',
                      backgroundColor: selected === theme.id ? '#FAF7F2' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selected !== theme.id) {
                        e.currentTarget.style.backgroundColor = '#F5F0E6'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selected !== theme.id) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: selected === theme.id ? '#C8A96E' : '#E8E0D4'
                      }} />
                      {theme.label}
                    </span>
                    {selected === theme.id && <span style={{ color: '#C8A96E' }}>{'\u2713'}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
