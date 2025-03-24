import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-800">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600">
          Or{' '}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
          >
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm type="register" />
        
        <div className="mt-6 text-center space-x-2">
          <Link 
            href="#" 
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <span className="text-zinc-500">and</span>
          <Link 
            href="#" 
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
        
        <div className="mt-6 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </div>
    </div>
  );
} 