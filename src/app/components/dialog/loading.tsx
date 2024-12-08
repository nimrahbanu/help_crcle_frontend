'use client';
import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <BounceLoader color="#f4b000" size={60} />
        <div className="mt-4 text-lg font-semibold">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
