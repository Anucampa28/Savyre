import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-gray-200 to-gray-300 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-300 rounded-lg mb-6 mx-auto max-w-4xl"></div>
            <div className="h-8 bg-gray-300 rounded-lg mb-8 mx-auto max-w-3xl"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="h-12 bg-gray-300 rounded-lg w-48 mx-auto"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-48 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="h-16 bg-gray-300 rounded-lg"></div>
              <div className="h-16 bg-gray-300 rounded-lg"></div>
              <div className="h-16 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded-lg mb-4 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-gray-300 rounded-lg mx-auto max-w-xl"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More skeleton sections... */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded-lg mb-4 mx-auto max-w-2xl"></div>
            <div className="h-6 bg-gray-300 rounded-lg mx-auto max-w-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingSkeleton;
