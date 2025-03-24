'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { User } from '@/lib/types/auth';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
    loaded: boolean;
  }>({
    isAuthenticated: false,
    user: null,
    loaded: false
  });

  // Setup mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle auth check after component is mounted safely
  useEffect(() => {
    if (mounted) {
      try {
        const auth = useAuth();
        setAuthState({
          isAuthenticated: auth.isAuthenticated,
          user: auth.user,
          loaded: true
        });
        
        if (!auth.isAuthenticated) {
          router.push('/login');
        }
      } catch (error) {
        // If useAuth throws an error, we'll handle it gracefully
        console.log('Auth provider not ready yet');
        setAuthState(prev => ({ ...prev, loaded: true }));
      }
    }
  }, [mounted, router]);

  const handleLogout = async () => {
    try {
      const { logout } = useAuth();
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Show a blank screen during initial SSR to prevent hydration issues
  if (!mounted || !authState.loaded) {
    return null;
  }

  // Show minimal UI when not authenticated
  if (!authState.isAuthenticated) {
    return <div className="min-h-screen bg-zinc-50"></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/products" className="flex-shrink-0">
                <div className="h-14 w-14 bg-[#800000] text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md">
                  EC
                </div>
              </Link>
              <div className="hidden md:block ml-6">
                <div className="flex space-x-8">
                  <Link href="/products" className="text-zinc-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Products
                  </Link>
                  <Link href="/cart" className="text-zinc-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Cart
                  </Link>
                  <Link href="/orders" className="text-zinc-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Orders
                  </Link>
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#800000] hover:bg-red-800 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 