'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AdminPageDetectorProps {
  children: ReactNode;
}

export default function AdminPageDetector({ children }: AdminPageDetectorProps) {
  const pathname = usePathname();
  
  // Masquer les composants sur les pages admin
  const isAdminPage = pathname?.startsWith('/admin');
  
  if (isAdminPage) {
    return null;
  }
  
  return <>{children}</>;
}
