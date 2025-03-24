'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthenticated, router, mounted]);

  return (
    <div className="relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-maroon-400"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-primary-300"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-400"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-maroon-500"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 