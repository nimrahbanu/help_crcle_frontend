import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LevelsGrid = ({ levels }: { levels: any[] }) => {
  return (

   

    <div className="relative  max-h-screen  mx-1 py-4 overflow-y-auto scrollbar-custom bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((item, index) => (
          <div
            key={index}

            className='bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-200'

            // className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${index % 5 === 0
            //     ? 'bg-gradient-to-r from-yellow-100 to-yellow-300'
            //     : index % 5 === 1
            //       ? 'bg-gradient-to-r from-blue-100 to-blue-300'
            //       : index % 5 === 2
            //         ? 'bg-gradient-to-r from-green-100 to-green-300'
            //         : index % 5 === 3
            //           ? 'bg-gradient-to-r from-purple-100 to-purple-300'
            //           : 'bg-gradient-to-r from-pink-100 to-pink-300'
            //   }`}
          >
            <div className="flex flex-col gap-4">
              <div className='flex items-center justify-between'>
              <div className="text-lg font-semibold text-gray-800">{item.level}</div>

              <a href={`tel:${item?.phone}`} className='bg-green-500 hover:bg-green-400 text-white p-2 rounded-full '> <Phone size={24}/></a>

              <a
                  href={`https://wa.me/${item?.sender_phone}`}
                  className="bg-green-400 hover:bg-green-300 text-white p-1 rounded-full flex items-center"
                  aria-label="Chat on WhatsApp"
                >
                  <Image src={'./wp.svg'} height={35} width={35} alt={'whatsapp'} />

                </a>
              </div>
             
             
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-900">
                  <span className="text-sm font-semibold text-gray-800">User ID:</span> {item.user_id}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-sm font-semibold text-gray-800">Name:</span> {item.name}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-sm font-semibold text-gray-800">Amount:</span> ₹{item.amount}  
                </div>
              

                <div className="flex text-sm text-gray-600">
                  <span className="ftext-sm font-semibold text-gray-800">  
                  Phone:</span>  {' '}
                  <a href={`tel:${item?.phone}`} className="text-blue-600 hover:underline">
                    {item?.phone}
                  </a>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-sm font-semibold text-gray-800">Pay No:</span> {item.phone_pay_no}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default LevelsGrid;
