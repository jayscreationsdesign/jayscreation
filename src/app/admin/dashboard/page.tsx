'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF7F2]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A96E] mx-auto mb-4"></div>
        <p className="text-[#3C2415]">Redirection vers le dashboard...</p>
      </div>
    </div>
  );
}
