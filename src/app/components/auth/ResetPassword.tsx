'use client';

import { Mail } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import useUserStore from '@/app/store/user_id/userStore';

// Define a Zod schema for validation
const passwordSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long.' }),
    // .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    // .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    // .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    // .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character.' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password.' })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'], // Set the error on confirmPassword field
});

// Define the form data type
type PasswordForm = {
    password: string;
    confirmPassword: string;
};

const ResetPassword: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
    });

    const user_id = useUserStore((state) => state.userId); // Access userId from the store
    const clearUserId = useUserStore((state) => state.clearUserId); // Access clearUserId function

    const router = useRouter();



    //   const searchParams = useSearchParams();
    // const ot = searchParams.get('otp') || ''; // Access the message parameter

    // const user_id = searchParams.get('user_id') || ''; // Access the message parameter

    useEffect(() => {
        if (!user_id) {
            router.push('/login'); // Redirect to the forgot password page
        }
    }, [user_id, router]); // Dependency array includes user_id and router

    const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
        console.log('New Password:', data.password);


        // Show loading toast
        const loadingToastId = toast.loading("Verifying OTP...");

        try {
            const response = await fetch('https://api.helpcircle.in/api/customer/verify-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id,

                    password: data.password,
                    password_confirmation: data.confirmPassword



                }), // Send the OTP in the request body
            });

            if (response.ok) {
                const res = await response.json();

                if (res.success) {
                    console.log("Password updated successfully!", res.message);
                    toast.success("Password updated successfully!", { id: loadingToastId });

                    clearUserId()

                    // Navigate to the verify-otp page with encoded query parameters
                    router.replace(`/login`);
                } else {
                    console.log("Password updated failed!", res.message);
                    toast.error("Password updated failed! " + res.message, { id: loadingToastId });
                }
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                toast.error("Failed to Password updated!", { id: loadingToastId });
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error. Please try again later.", { id: loadingToastId });
        }





    };

    return (
        <div className="flex items-center justify-center rounded-2xl bg-gray-100 py-6 px-8">
            <div className="max-w-md w-full overflow-hidden text-sm">
                <h2 className="flex items-center gap-x-2 text-2xl font-semibold text-black p-4">
                    <Mail /> Set New Password
                </h2>
                <p className='px-4'>Please enter your new password below.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4 space-y-4">
                    <label htmlFor="password" className='px-4'>New Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        placeholder="New Password"
                        className={`p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] ${errors.password ? 'border border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 px-4 text-[12px]">{errors.password.message}</p>}

                    <label htmlFor="confirmPassword" className='px-4'>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password"
                        className={`p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 px-4 text-[12px]">{errors.confirmPassword.message}</p>}

                    <button type="submit" className="bg p-2 mt-4 rounded-3xl text-white">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
