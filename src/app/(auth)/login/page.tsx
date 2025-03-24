import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-maroon-700 text-white flex items-center justify-center rounded-full text-2xl font-bold shadow-lg border-4 border-primary-300">
            EC
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
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
        <div className="bg-white py-8 px-6 shadow-card rounded-2xl border border-gray-100">
          <AuthForm type="login" />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Need help?
                </span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="#" 
                className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </div>
    </div>
  );
} 