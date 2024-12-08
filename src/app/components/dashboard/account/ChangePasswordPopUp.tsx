'use client'

import { usePasswordUpdateStore } from '@/app/store/updatePasswordStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loading from '../../dialog/loading';
import Error from '../../dialog/error';
import { useRouter } from 'next/navigation';

import { useGlobalStore } from '@/app/store/useLogoutStore';



const passwordSchema = z.object({
    old_password: z.string().min(1, 'Current password is required'),
    password: z.string().min(1, 'New password is required '),
    password_confirmation: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'New password and confirm password do not match',
    path: ['password_confirmation'],
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;


const ChangePasswordPopUp = ({profile}:any) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const { loading, error, success, updatePassword, reset } = usePasswordUpdateStore();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const { logout } = useGlobalStore(); // Destructure logout
  
  
    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    // Close the popup when password update is successful
    useEffect(() => {
        const handleSuccess = async () => {
            if (success) {
                resetForm();  // Reset form fields after success
                setIsOpen(false);  // Close popup
    
                await logout(router); // Remove the token and redirect the user
            }
        };
    
        handleSuccess();
    }, [success, resetForm]);
    


    const onSubmit = async (event: React.FormEvent, data: PasswordFormValues) => {




        event.preventDefault();

        await updatePassword({
            user_id: profile?.user?.user_id,
            old_password: data.old_password,
            password: data.password,
            password_confirmation: data.password_confirmation,
        });

        if (success) {


            resetForm()

            setIsOpen(false);

        }

        if(error){
            setIsOpen(true);
        }
      

    };
    const handleRetry = () => {
        reset();
    };


    return (
        <div className="flex items-center justify-center  ">
            <button
                className="px-4 py-2 font-semibold text-white bg-red-600 rounded-lg"
                onClick={togglePopup}
            >
                Change Password
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <div className='flex items-center justify-between'>



                            <h1 className="flex text-lg font-bold mb-4 gap-x-2">


                                <LockKeyhole />
                                Change Password



                            </h1>
                            <button
                                className="p-2  text-white font-bold bg-red-600 rounded-lg"
                                onClick={togglePopup}
                            >
                                <X />
                            </button>

                        </div>
                        <p className="mb-4">
                            fill correct detail and change password
                        </p>

                        <form


                            onSubmit={(event) =>
                                handleSubmit((data) => onSubmit(event, data))(event)
                            }
                        >
                          

                            <div className='space-y-3 text-[13px]'>

                                <div>
                                    <h1 className='my-2'>Current Password</h1>
                                    <input
                                        {...register('old_password')}
                                        className={`p-2 w-full rounded-3xl pl-6 h-[50px] bg-[#D9D9D9] ${errors.old_password ? 'border-2 border-red-500' : ''
                                            }`}
                                        type="password" // Changed to 'password' to mask the input
                                        placeholder="Current Password"
                                    />
                                    {/* Display error message in the same <p> tag */}
                                    {errors.old_password && (
                                        <p className='text-red-500 text-[11px]'>{errors.old_password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <h1 className='my-2'>New Password</h1>
                                    <input
                                        {...register('password')}
                                        className={`p-2 w-full rounded-3xl pl-6 h-[50px] bg-[#D9D9D9] ${errors.password ? 'border-2 border-red-500' : ''
                                            }`}
                                        type="password" // Changed to 'password' to mask the input
                                        placeholder="New Password"
                                    />
                                    {/* Display error message in the same <p> tag */}
                                    {errors.password && (
                                        <p className='text-red-500 text-[11px]'>{errors.password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <h1 className='my-2'>Confirm Password</h1>
                                    <input
                                        {...register('password_confirmation')}
                                        className={`p-2 w-full rounded-3xl pl-6 h-[50px] bg-[#D9D9D9] ${errors.password_confirmation ? 'border-2 border-red-500' : ''
                                            }`}
                                        type="password" // Changed to 'password' to mask the input
                                        placeholder="Confirm Password"
                                    />
                                    {/* Display error message in the same <p> tag */}
                                    {errors.password_confirmation && (
                                        <p className='text-red-500 text-[11px]'>{errors.password_confirmation.message}</p>
                                    )}
                                </div>

                                <button className="flex items-center justify-center w-full btn_bg p-3 text-white">
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>

                            </div>



                        </form>
                        {loading && <Loading />}
                        {error && <Error errorMessage={error} onRetry={handleRetry} />}

                    </div>
                </div>
            )}
        </div>
    )
}

export default ChangePasswordPopUp