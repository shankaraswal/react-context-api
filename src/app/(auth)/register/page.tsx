import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 bg-red-700 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-xl border-[6px] border-slate-300">
            EC
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-black">
          Or{' '}
          <Link
            href="/login"
            className="font-medium text-slate-700 hover:text-slate-800 transition-colors duration-200"
          >
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border-2 border-zinc-200">
          <AuthForm type="register" />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-black">
                  By signing up, you agree to our
                </span>
              </div>
            </div>
            
            <div className="mt-2 text-center space-x-2">
              <Link 
                href="#" 
                className="text-sm font-medium text-slate-700 hover:text-slate-800 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <span className="text-black">and</span>
              <Link 
                href="#" 
                className="text-sm font-medium text-slate-700 hover:text-slate-800 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-black">
          &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </div>
    </div>
  );
} 