'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Setup mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle auth check after component is mounted safely
  useEffect(() => {
    if (mounted) {
      try {
        const { isAuthenticated } = useAuth();
        if (isAuthenticated) {
          router.push('/products');
        }
        setAuthChecked(true);
      } catch (error) {
        // If useAuth throws an error (e.g., provider not ready), we'll just render children
        console.log('Auth provider not ready yet');
        setAuthChecked(true);
      }
    }
  }, [mounted, router]);

  // Show a blank screen during initial SSR to prevent hydration issues
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-400"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-primary-300"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-400"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-red-500"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 