'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { useRouter } from 'next/navigation';

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
    } catch (error) {
      setFormError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {formError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
          {formError}
        </div>
      )}
      
      {type === 'register' && (
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-black">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:ring-slate-700 focus:border-slate-700"
            placeholder="Your full name"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none block w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:ring-slate-700 focus:border-slate-700"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-black">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none block w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:ring-slate-700 focus:border-slate-700"
          placeholder="••••••••"
        />
      </div>

      {type === 'register' && (
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="appearance-none block w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:ring-slate-700 focus:border-slate-700"
            placeholder="••••••••"
          />
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 transition-colors duration-200"
        >
          {loading ? 'Processing...' : type === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </div>
    </form>
  );
} 