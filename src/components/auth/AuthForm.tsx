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
    <div className="bg-white py-8 px-6 shadow-card rounded-2xl border border-zinc-100">
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {formError && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #fee2e2',
            fontSize: '0.875rem'
          }}>
            {formError}
          </div>
        )}
        
        {type === 'register' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="name" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Full Name
            </label>
            <div style={{
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '0.75rem',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <FiUser style={{
                  height: '1.25rem',
                  width: '1.25rem',
                  color: '#9ca3af'
                }} />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  appearance: 'none',
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  transition: 'all 200ms',
                  boxSizing: 'border-box'
                }}
                placeholder="John Doe"
              />
            </div>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label htmlFor="email" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Email Address
          </label>
          <div style={{
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0.75rem',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <FiMail style={{
                height: '1.25rem',
                width: '1.25rem',
                color: '#9ca3af'
              }} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                appearance: 'none',
                display: 'block',
                width: '100%',
                padding: '0.75rem 1rem',
                paddingLeft: '2.5rem',
                borderRadius: '0.75rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                transition: 'all 200ms',
                boxSizing: 'border-box'
              }}
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <label htmlFor="password" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Password
          </label>
          <div style={{
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0.75rem',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <FiLock style={{
                height: '1.25rem',
                width: '1.25rem',
                color: '#9ca3af'
              }} />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                appearance: 'none',
                display: 'block',
                width: '100%',
                padding: '0.75rem 1rem',
                paddingLeft: '2.5rem',
                borderRadius: '0.75rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                transition: 'all 200ms',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>
        </div>

        {type === 'register' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Confirm Password
            </label>
            <div style={{
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '0.75rem',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <FiLock style={{
                  height: '1.25rem',
                  width: '1.25rem',
                  color: '#9ca3af'
                }} />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  appearance: 'none',
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #d1d5db',
                  transition: 'all 200ms',
                  boxSizing: 'border-box'
                }}
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#800000',
              transition: 'all 200ms',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              border: 'none'
            }}
          >
            {loading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg style={{
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.75rem',
                  height: '1.25rem',
                  width: '1.25rem',
                  color: 'white'
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
  );
} 