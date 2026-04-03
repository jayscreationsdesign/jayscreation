import Link from 'next/link'
import { Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-3 sm:mb-4" aria-label="Fil d'Ariane">
      <ol className="flex items-center flex-wrap text-xs sm:text-sm text-[#666666] font-inter">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isHome = index === 0 && item.label === "Accueil"
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-[#666666]">/</span>
              )}
              
              {isHome && (
                <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-[#666666]" />
              )}
              
              {item.href && !isLast ? (
                <Link 
                  href={item.href}
                  className="text-[#666666] hover:text-[#C8A96E] transition-colors duration-200 no-underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#666666] font-medium">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
