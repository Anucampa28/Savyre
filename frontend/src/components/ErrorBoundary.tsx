import React from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ErrorBoundaryProps {
  error: string | Error;
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  error, 
  title = "Something went wrong", 
  message = "We're having trouble loading the content. Please try again.",
  onRetry 
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Technical Details
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">
              {error instanceof Error ? error.message : error}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
