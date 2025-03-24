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
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated && mounted) {
      router.push('/login');
    }
  }, [isAuthenticated, router, mounted]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Only render after client-side hydration to avoid mismatches
  if (!mounted) return null;

  // Don't render protected content if not authenticated
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/products" className="flex-shrink-0">
                <div className="h-10 w-10 bg-primary-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  EC
                </div>
              </Link>
              <nav className="ml-6 space-x-4 flex">
                <Link
                  href="/products"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Categories
                </Link>
                <Link
                  href="/cart"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  Cart
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-sm text-gray-600">
                Hello, {user?.name || 'User'}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-maroon-600 hover:bg-maroon-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 