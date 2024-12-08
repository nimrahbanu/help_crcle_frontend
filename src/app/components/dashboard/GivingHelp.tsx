'use client';

import React, { useState } from 'react';
import { CheckCircle, Phone, XCircle } from 'lucide-react';


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
          <div className="text-red-600 mb-4">  {errorMessage}</div>
        )}

        {loading ? (
          <div className="flex justify-center ">

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



const GivingHelp= ({ giving_help, userId }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = (action: string) => {
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages
    const url = 'https://api.helpcircle.in/api/customer/giving-person-confirmation';
    const payload = {
      user_id: userId,
      id: giving_help?.id,
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
    <div className="max-w-md my-4 p-6 bg-gradient-to-r from-[#ffc37e] to-black text-white rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <div className="text-sm font-bold text-gray-900">Receiver ID: {giving_help?.receiver_id}</div>
          <div className={`text-xs font-semibold ${giving_help?.status === 'Completed' ? 'text-green-600' : 'text-red-500'}`}>
            {giving_help?.status === 'Completed' ? '✅ Completed' : '❌ Pending'}
          </div>
        </div>

        {/* Amount & Phone Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-900">Amount: </span>
            <span className="text-sm font-bold text-gray-800">₹{giving_help?.amount}</span>
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-900">Receiver Name: </span>
            <span className="text-sm font-bold text-gray-800 capitalize"> {giving_help?.receiver_name}</span>
          </div>
        </div>

   
        <div className="grid grid-cols-1 gap-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between space-x-2">
            {/* Label */}
            <span className="text-sm font-bold text-gray-900">Receiver Phone:</span>

            {/* Phone Number */}

            <div className='flex items-center justify-between'>


              <span className="text-sm font-bold text-gray-800 capitalize">
                {giving_help?.receiver_phone}
              </span>

           
            </div>
               {/* Phone Icon - Clickable */}
               <a
                href={`tel:${giving_help?.receiver_phone}`}
                className="bg-green-500 hover:bg-green-400 text-white p-2 rounded-full flex items-center"
                aria-label="Call Receiver"
              >
                <Phone size={20} />
              </a>

          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-900">Phone Pay No: </span>
            <span className="text-sm font-bold text-gray-800 capitalize"> {giving_help?.receiver_phone_pay_no}</span>
          </div>
        </div>

    
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

export default GivingHelp;
