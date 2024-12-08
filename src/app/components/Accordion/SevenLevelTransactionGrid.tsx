

'use client';

import { Phone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface TransactionItem {
 
  name: string;
  phone:string;
  id:number;
  sender_id: string;
  amount: number;
  level: string;
}

interface SevenLevelTransactionGridProps {
  taking_seven_level_transaction: TransactionItem[];
  userId: string;
}

const Modal = ({ message, onConfirm, onCancel, loading, errorMessage }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center transition-transform transform scale-95 hover:scale-100">
        {loading ? (
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Please wait...</h2>
        ) : (
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{message}</h2>
        )}

        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}

        {loading ? (
          <div className="flex justify-center">
            {/* Add loading spinner or animation here if needed */}
          </div>
        ) : (
          <div className="flex justify-center space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SevenLevelTransactionGrid: React.FC<SevenLevelTransactionGridProps> = ({ taking_seven_level_transaction, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<{ id: number; level: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();  // useRouter hook to access Next.js router

  const handleConfirm = (id: number, level: string) => {
    setSelectedTransaction({ id, level });


    console.log("Index id ",id,level)
    setIsModalOpen(true);
  };

  const handleModalConfirm = async () => {
    if (selectedTransaction) {
      const { id, level } = selectedTransaction;
      const payload = {
        user_id: userId,
        level_key: level,
        id,
      };

      setLoading(true);
      setErrorMessage('');

      try {
        const response = await fetch('https://api.helpcircle.in/api/customer/seven-level-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success === false && data.message) {
          setErrorMessage('Message ' + data.message);
        } else {
          // Handle success case
          console.log('Success:', data);
          setIsModalOpen(false); // Close the modal on success
          // Optionally reset or update your state
          setErrorMessage('');

        }

        if (data.success){

          toast.success("Confirmed Succeed")

          // Refresh the page data using router.refresh()
      router.refresh();
        }

        setSelectedTransaction(null);
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Failed to confirm transaction. Please try again.');
        // Do not close the modal here; it will stay open
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className="relative  max-h-screen  mx-1 py-4 overflow-y-auto scrollbar-custom bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {taking_seven_level_transaction?.map((item, index) => (
          <div
            key={index}
            className='bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-200'
            // className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${index % 5 === 0
            //   ? 'bg-gradient-to-r from-yellow-100 to-yellow-300'
            //   : index % 5 === 1
            //     ? 'bg-gradient-to-r from-blue-100 to-blue-300'
            //     : index % 5 === 2
            //       ? 'bg-gradient-to-r from-green-100 to-green-300'
            //       : index % 5 === 3
            //         ? 'bg-gradient-to-r from-purple-100 to-purple-300'
            //         : 'bg-gradient-to-r from-pink-100 to-pink-300'
            // }`}
          >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800 ">  Level: {item.level.replace(/_/g, ' ')}
                </span>
                <a
                  href={`tel:${item?.phone}`}
                  className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full flex items-center"
                  aria-label="Call Receiver"
                >
                  <Phone size={20} />
                </a>

                <a
                  href={`https://wa.me/${item?.phone}`}
                  className="bg-green-400 hover:bg-green-300 text-white p-1 rounded-full flex items-center"
                  aria-label="Chat on WhatsApp"
                >
                  <Image src={'./wp.svg'} height={35} width={35} alt={'whatsapp'} />
                  </a>

              </div>
              <div className="flex items-center justify-between ">
                <span className="text-sm font-semibold text-gray-800">Name: {item.name}</span>
              </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between ">
                <span className="text-sm font-semibold text-gray-800">Receiver Id: {item.sender_id}</span>
                
              </div>
              <div className="flex items-center justify-between ">
              <span className=" text-sm font-semibold text-gray-800">Phone: {''}
                

              <a href={`tel:${item.phone}`} className="text-blue-600 hover:underline">
                  {item.phone}
                </a>
              </span>

                
              </div>
              <div className="flex items-center justify-between ">
                <span className="text-sm font-semibold text-gray-800">Amount: ₹{item.amount}</span>
              </div>
              <button onClick={() => handleConfirm(item.id, item.level)}
                className="mt-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">
                Confirm
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          message="Are you sure you want to confirm this transaction?"
          onConfirm={handleModalConfirm}
          onCancel={() => {


            setIsModalOpen(false),
              setErrorMessage('')
          }}
          loading={loading}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default SevenLevelTransactionGrid;
