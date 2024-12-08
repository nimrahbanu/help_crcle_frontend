'use client'
import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useLogout } from '../hooks/useLogout';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Modal = ({ message, onConfirm, onCancel }: any) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg mx-2 max-w-sm w-full text-center">
                <h2 className="text-lg font-bold mb-4">{message}</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-red-500 hover:bg-red-600  text-white font-bold py-2 px-4 rounded-lg"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const LogoutComp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const handleLogout = useLogout();
    const router = useRouter();

    const logout = async () => {
        // Remove the token from cookies
        Cookies.remove('token');
        Cookies.remove('user_id');

        // Ensure the token is removed first before navigating
        await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure cookie removal

        // Redirect to the login page
        router.push('/login');
        router.refresh();

        toast.success('LogOut Successfully!');
    };



    // const handleLogout = async () => {
    //     const response = await fetch('/api/logout', {
    //         method: 'POST',
    //     });

    //     if (response.ok) {
    //         router.push('/login'); // Redirect to login page after logout
    //         router.refresh()

    //     } else {
    //         toast.error("failed")
    //     }
    // };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="flex bg-red-500  mx-auto px-16 mt-16 text-white p-2 rounded">
              <LogOut  /> Logout
            </button>

            {isModalOpen && (
                <Modal
                    message="Are you sure you want to log out?"
                    onConfirm={()=>{
                        
                        logout() ,
                        setIsModalOpen(false)
                        


                    }}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default LogoutComp;