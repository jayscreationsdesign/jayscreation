import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * PrimaryCtaButton - Composant CTA principal standardisé pour Jay's Creations Design
 * 
 * TOUS les nouveaux CTA principaux doivent utiliser ce composant afin d'avoir automatiquement :
 * - fond #8b4513 (brun)
 * - texte #FFFFFF (blanc) 
 * - forme pilule (rounded-full)
 * - padding px-8 py-4
 * - font-medium
 * - inline-flex items-center gap-3
 * - hover:bg-[#6b3410] + hover:scale-[1.02]
 * - transition-all duration-300
 * - focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b4513]
 */
interface PrimaryCtaButtonProps {
  children: React.ReactNode;
  href?: string;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function PrimaryCtaButton({ 
  children, 
  className, 
  href, 
  showArrow = true,
  onClick,
  disabled = false
}: PrimaryCtaButtonProps) {
  const baseClasses = "inline-flex items-center gap-3 rounded-full bg-[#8b4513] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#6b3410] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b4513] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const buttonContent = (
    <>
      <span className="text-lg">{children}</span>
      {showArrow && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={cn(baseClasses, className)}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
}
