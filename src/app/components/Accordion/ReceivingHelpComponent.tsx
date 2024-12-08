'use client'

import { CheckCircle, Phone, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface TakingHelpItem {


  id: number;
  sender_id: string;
  receiver_id: string;
  amount: number;
  commitment_date: string;
  confirm_date: string | null;
  status: string;
  title: string;
  sender_name: string;
  sender_phone: string;
  sender_phone_pay_no: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_phone_pay_no: string;
}

interface TakingHelpProps {
  taking_help: TakingHelpItem[];
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

const ReceivingHelpComponent: React.FC<TakingHelpProps> = ({ taking_help, userId }) => {

  const router = useRouter();  // useRouter hook to access Next.js router



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null); // Add selectedId state



  const openModal = (id: number, action: string) => {
    setActionType(action);
    setSelectedId(id); // Set the selected item's id
    setIsModalOpen(true);
  };


  const handleConfirm = async () => {

    if (!selectedId) return; // Prevent execution if no id is selected

    setLoading(true);
    setErrorMessage(''); // Clear previous error messages
    const url = 'https://api.helpcircle.in/api/customer/giving-person-confirmation';
    const payload = {
      user_id: userId,
      id: selectedId, // Use the selectedId from state

      status: actionType === 'Accept' ? 'Active' : 'Rejected',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if response is not okay
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.success === false && errorData.data) {
          const validationErrors = errorData.data.id.join(', '); // Join errors in the array
          const fullErrorMessage = `${errorData.message}: ${validationErrors}`;
          setErrorMessage(fullErrorMessage); // Show validation errors in the modal
          console.error('Validation Error:', fullErrorMessage); // Log error to console
          return; // Exit the function to prevent further execution
        }
        throw new Error(errorData.message || 'An unknown error occurred');
      }

      const data = await response.json();

      // Check if the success status in the data is false
      if (data.success === false) {
        const errorMessage = data.message || 'An unknown error occurred';
        setErrorMessage(errorMessage); // Show error message in modal
        console.error('Error from API:', errorMessage); // Log error to console
        return; // Exit the function to prevent further execution
      }

      console.log('Response data:', data);
      router.refresh();
      setIsModalOpen(false);


      // Handle successful confirmation here (e.g., update UI)
    } catch (error: any) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Something went wrong.'); // Set error message
      // Keep the modal open to show the error
    } finally {
      setLoading(false);
      // Keep the modal open for user feedback
    }
  };





  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative  max-h-screen  mx-1 py-4 overflow-y-auto scrollbar-custom bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        {taking_help && taking_help.map((item, index) => (


          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-200"
          >


            <div className="flex flex-col gap-3">

              <div className='flex items-center justify-between'>



                <div className="text-xl font-bold text-gray-800">{item.title}</div>


                <a
                  href={`tel:${item?.sender_phone}`}
                  className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full flex items-center"
                  aria-label="Call Receiver"
                >
                  <Phone size={20} />
                </a>

                <a
                  href={`https://wa.me/${item?.sender_phone}`}
                  className="bg-green-400 hover:bg-green-300 text-white p-1 rounded-full flex items-center"
                  aria-label="Chat on WhatsApp"
                >
                  <Image src={'./wp.svg'} height={35} width={35} alt={'whatsapp'} />

                </a>


              </div>

              <div className="text-sm text-gray-900 font-bold">
                <span >Sender ID:</span> {item.sender_id}
              </div>
              <div className="text-sm text-gray-900 font-bold">
                <span >Amount:</span> ₹{item.amount}
              </div>
              <div className="text-sm text-gray-900 font-bold">
                <span >Commitment Date:</span> {item.commitment_date}
              </div>
              <div className="text-sm text-gray-900 font-bold">
                <span >Status:</span> {item.status}
              </div>
              <div className="text-sm text-gray-900 font-bold">
                <span >Sender Name:</span> {item.sender_name}
              </div>
              <div className="text-sm text-gray-900 font-bold">
                <span >Sender Phone:</span>
                {' '}
                <a href={`tel:${item.sender_phone}`} className="text-blue-600 hover:underline">
                  {item.sender_phone}
                </a>
              </div>
            </div>
            <div className="flex justify-between mt-4 space-x-4">
              <button
                className="flex items-center justify-center w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition ease-in-out duration-300"
                onClick={() => openModal(item.id, 'Accept')}
              >
                <CheckCircle className="mr-2" /> Accept
              </button>
              {/* <button
                className="flex items-center justify-center w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition ease-in-out duration-300"
                onClick={() => openModal(item.id, 'Reject')}
              >
                <XCircle className="mr-2" /> Reject
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <Modal
          message={`Are you sure you want to ${actionType.toLowerCase()} this transaction?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          loading={loading}
          errorMessage={errorMessage} // Pass the error message to Modal
        />
      )}

    </div>










  );
};



export default ReceivingHelpComponent;
