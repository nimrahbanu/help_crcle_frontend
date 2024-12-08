'use client'
import React from 'react';

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
        <p className="mt-4 text-lg text-gray-700">Error: {error.message}</p>
        <p className="mt-2 text-gray-500">Please try refreshing the page or come back later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
