'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router, mounted]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted) {
    return <div className="min-h-screen bg-zinc-50"></div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-zinc-50"></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/products" className="flex-shrink-0">
                <div className="h-14 w-14 bg-red-700 text-white flex items-center justify-center rounded-full text-xl font-bold shadow-md border-[3px] border-primary-400">
                  EC
                </div>
              </Link>
              <nav className="ml-6 space-x-4 flex">
                <Link
                  href="/products"
                  className="px-3 py-2 rounded-md text-sm font-medium text-zinc-900 hover:bg-zinc-100"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Categories
                </Link>
                <Link
                  href="/cart"
                  className="px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  Cart
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-sm text-zinc-600">
                Hello, {user?.name || 'User'}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 