'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import type { User, AuthState } from '@/lib/types/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedUser = safeLocalStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: parsedUser });
      }
    } catch {
      safeLocalStorage.removeItem('user');
    }
  }, []);

  const login = async (_email: string, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _password: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Perform a simulated authentication (would normally call API)
      // For now, just set the user to a demo account
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: _email,
        createdAt: new Date(),
      };
      
      // Storing token in localStorage for persistence
      localStorage.setItem('auth-token', 'dummy-token');
      safeLocalStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirect to products after login
      router.push('/products');
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Invalid credentials. Please try again.' });
      console.error('Login error:', error);
    }
  };

  const register = async (name: string, _email: string, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _password: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would typically be an API call to register the user
      // For demonstration, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        name,
        email: _email,
        createdAt: new Date(),
      };
      
      // Store token in localStorage
      localStorage.setItem('auth-token', 'dummy-token');
      safeLocalStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirect to products after registration
      router.push('/products');
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Registration failed. Please try again.' });
      console.error('Registration error:', error);
    }
  };

  const logout = async () => {
    safeLocalStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = {
    ...state,
    login,
    register,
    logout,
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 