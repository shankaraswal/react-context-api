import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6">Products</h1>
        <p className="mb-10 text-black">
          This is a placeholder for the products page. Soon, we will implement a product list with infinite scrolling.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-zinc-200 transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-48 bg-zinc-200"></div>
              <div className="p-4">
                <div className="h-4 bg-zinc-200 rounded mb-2"></div>
                <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-6 bg-zinc-200 rounded w-1/4"></div>
                  <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-lg">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/login" 
            className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg font-medium shadow-md hover:bg-slate-900 transition-colors duration-200 text-lg"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 