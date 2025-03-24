'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      setLoading(true);
      
      if (type === 'register') {
        if (password !== confirmPassword) {
          setFormError('Passwords do not match');
          return;
        }
        
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      
      router.push('/products');
    } catch {
      setFormError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-[1.5rem] shadow-card">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#800000] text-white font-bold text-2xl mb-6">
            EC
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {type === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-500">
            {type === 'login' 
              ? 'Please enter your credentials to sign in' 
              : 'Fill in the information below to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {formError && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
              {formError}
            </div>
          )}
          
          {type === 'register' && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          {type === 'register' && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                type === 'login' ? 'Sign in' : 'Create account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 