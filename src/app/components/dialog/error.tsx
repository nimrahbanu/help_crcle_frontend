'use client';
import { X } from 'lucide-react';
import React from 'react';


interface ErrorProps {
    errorMessage: string | null; // Accepts the error message or null for no error
    onRetry: () => void; 

}
  

const Error: React.FC<ErrorProps> = ({errorMessage, onRetry}) => {

    if (!errorMessage) return null; // Don't render the component if there's no error

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center mx-4">
        <X size={60} color="red" />
        <div className="mt-4 text-lg font-semibold text-red-600 mx-4 text-[10px]">{errorMessage}</div>
        <div className="mt-2 text-gray-600">Please try again later.</div>
        <button onClick={()=>onRetry()} className='bg-black p-2 text-white rounded-lg px-4 mt-2'>Close </button>
      </div>
    </div>
  );
};

export default Error;
