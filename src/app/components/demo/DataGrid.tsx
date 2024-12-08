
// import React from 'react';

// interface DataItem {
//     title: string;
//     date: string;
//     icon:React.ReactNode
// }

// interface DataGridProps {
//     data: DataItem[];
// }

// const DataGrid: React.FC<DataGridProps> = ({ data }) => {



//     return (<>
//         <div className="p-2">
//             <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
//                 {data.map((item, index) => (
//                     <div key={index} className="bg-white p-4  rounded ">
//                         <div className='flex flex-row items-center gap-3 '>
//                         <div className="bg-gradient-to-r from-[#FF1010] to-black p-2 text-white rounded-xl flex items-center justify-center ">

//                                 {item.icon}
//                             </div>

//                             <div>
//                                   <h2 className="text-lg font-semibold">{item.title}</h2>
//                             <p className="text-gray-700 text-[11px]">{item.date}</p>
//                             </div>

                          
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div></>
//     );
// };

// export default DataGrid;


'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

interface DataItem {
  title: string;
  date: string;
  icon: React.ReactNode;
  link?: string; // Add a link field for navigation
}

interface DataGridProps {
  data: DataItem[];
}

const DataGrid: React.FC<DataGridProps> = ({ data }) => {
  const router = useRouter();



  const handleNavigation = (link?: string) => {
    if (link) {
      router.push(link); // Navigate to the link if it exists
    }
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded cursor-pointer" 
            onClick={() => handleNavigation(item.link)} // Add click handler for navigation
          >
            <div className="flex flex-row items-center gap-3">
              <div className="bg-gradient-to-r from-[#FF1010] to-black p-2 text-white rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-700 text-[11px]">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataGrid;
