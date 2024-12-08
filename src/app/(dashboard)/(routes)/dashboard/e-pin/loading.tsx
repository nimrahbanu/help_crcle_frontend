import Shimmer from '@/app/components/SimmerEffect/SimmerEffect';
import React from 'react';

const Loading = () => {
  return (
    // <div className="flex items-center justify-center  min-h-screen bg-gray-100">
    //   <div className="flex flex-col items-center">
    //     <div className="loader border-t-transparent border-solid rounded-full border-4 border-[#ffc37e] h-16 w-16 animate-spin"></div>
    //     <span className="mt-4 text-lg text-gray-800">Loading...</span>
    //   </div>
    // </div>

    <Shimmer/>
  );
};

export default Loading;
