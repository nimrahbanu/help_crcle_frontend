 'use client'
// import React, { useState } from 'react';
// import { ChevronUp, ChevronDown } from 'lucide-react'; // Assuming you're using lucide-react for icons

// interface AccordionItem {
//   icon: React.ReactNode;
//   title: string;
//   content: React.ReactNode;
// }

// interface AccordionProps {
//   data: AccordionItem[];
//   active: number
// }

// const Accordion: React.FC<AccordionProps> = ({ data, active }) => {



//   const [activeIndex, setActiveIndex] = useState<number | null>(active);

//   const handleToggle = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);


//     console.log("Index ......",data)
//   };

//   return (
//     <div className="space-y-2 mx-2">
//       {data.map((item, index) => (
//         <div key={index} className="bg-white rounded-lg ">

//           <button
//             className="w-full flex justify-between items-center text-left p-4 font-semibold text-gray-800 border-b border-gray-200 hover:bg-gray-100"
//             onClick={() => handleToggle(index)}
//           >
//             <div className='flex items-center  space-x-2'>
//               <span className='bg-[#ffc37e] p-2 rounded-lg'>  {item.icon}</span> <span>
//                 {item.title}
//             <div className="overflow-hidden w-full">
//               {index === active &&index === 2 && (
//                   <p className="text-red-500 animate-scroll">
//                     Please open this and confirm the user's payment.
//                   </p>
//                 )}
//               </div>

//               <div className="overflow-hidden w-full">
//               {index === active && active === 3   && (
//                   <p className="text-red-500 animate-scroll">
//                     Please open this and confirm the user's payment.
//                   </p>
//                 )}
//               </div>



//               </span>
//             </div>

//             <span>
//               {activeIndex === index ? (
//                 <ChevronUp size={24} className=" text-gray-800" />
//               ) : (
//                 <ChevronDown size={24} className=" text-gray-800" />
//               )}
//             </span>
//           </button>
//           <div
//             className={`transition-max-height duration-500 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-screen' : 'max-h-0'
//               }`}
//           >
//             <div className="p-2">{item.content}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Accordion;



'use client';
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react'; // Assuming you're using lucide-react for icons

interface AccordionItem {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  data: AccordionItem[];
  active: number[]; // Changed to array to support multiple active states
}

const Accordion: React.FC<AccordionProps> = ({ data, active }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([0,1]);

  const handleToggle = (index: number) => {
    setActiveIndices(prevIndices =>
      prevIndices.includes(index)
        ? prevIndices.filter(i => i !== index) // Remove index if it is already active
        : [...prevIndices, index] // Add index if it is not active
    );

    console.log("Current active indices: ", activeIndices);
  };

  return (
    <div className="space-y-2 mx-2">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg">
          <button
            className="w-full flex justify-between items-center text-left p-4 font-semibold text-gray-800 border-b border-gray-200 hover:bg-gray-100"
            onClick={() => handleToggle(index)}
          >
            <div className='flex items-center space-x-2'>
              <span className='bg-[#ffc37e] p-2 rounded-lg'>{item.icon}</span>
              <span>
                {item.title}
                {/* {activeIndices.includes(index) && (
                  <div className="overflow-hidden w-full">
                    <p className="text-red-500 animate-scroll">
                      Please open this and confirm the user's payment.
                    </p>
                  </div>
                )} */}
              </span>
            </div>
            <span>
              {activeIndices.includes(index) ? (
                <ChevronUp size={24} className="text-gray-800" />
              ) : (
                <ChevronDown size={24} className="text-gray-800" />
              )}
            </span>
          </button>
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${activeIndices.includes(index) ? 'max-h-screen' : 'max-h-0'}`}
          >
            <div className="p-2">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
