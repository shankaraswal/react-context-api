import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-800">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600">
          Or{' '}
          <Link
            href="/register"
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm type="login" />
        
        <div className="mt-6 text-center">
          <Link 
            href="#" 
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>
        
        <div className="mt-6 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </div>
    </div>
  );
} 