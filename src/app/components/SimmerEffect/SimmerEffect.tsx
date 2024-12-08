// components/Shimmer.tsx

import React from 'react';

const Shimmer: React.FC = () => {
  return (

    <div className='bg-white p-2 mx-2 rounded-lg'>


 
    <div className="animate-pulse overflow-x-auto mx-1 text-[12px]  text-black capitalize">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            {/* Simulating table headers */}
            <th className="text-left py-3 px-2 border border-gray-300">
              <div className="h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="text-left py-3 px-4 border border-gray-300">
              <div className="h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="text-left py-3 px-4 border border-gray-300">
              <div className="h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="text-left py-3 px-4 border border-gray-300">
              <div className="h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="text-left py-3 px-4 border border-gray-300">
              <div className="h-4 bg-gray-300 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {/* Simulating multiple rows */}
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <tr key={rowIndex} className={`border border-gray-300 ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              <td className="py-3 px-4 border border-gray-300">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4 border border-gray-300">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4 border border-gray-300">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4 border border-gray-300">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4 border border-gray-300">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>   </div>
  );
};

export default Shimmer;
