

'use client'




import useUserStore from '@/app/store/user_id/userStore';
import { Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const VerifyOtp: React.FC = () => {


    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);



    const router = useRouter();

 const user_id = useUserStore((state) => state.userId); // Access userId from the store
// const setUserId = useUserStore((state) => state.setUserId); // Access setUserId function from the store
 // const clearUserId = useUserStore((state) => state.clearUserId); // Access clearUserId function



  //  const searchParams = useSearchParams();
  //  const ot = searchParams.get('otp') || ''; // Access the message parameter

 //   const user_id = searchParams.get('user_id') || ''; // Access the message parameter

    useEffect(() => {
        if (!user_id) {
          router.push('/login'); // Redirect to the forgot password page
        }
      }, [user_id, router]); // Dependency array includes user_id and router


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        // Ensure the value is a single digit number
        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input box if it's not the last one
            if (index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (value === '') {
            // If the user clears the input, reset the current value
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            if (otp[index]) {
                // Clear the current input
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                // Focus on the previous input if the current one is empty
                inputRefs.current[index - 1]?.focus();
            }
        } else if (/^\d$/.test(e.key) && index < 5) {
            // If a digit is entered, ensure the next input is focused
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleFocus = (index: number) => {
        const firstEmptyIndex = otp.findIndex((val) => val === '');
        if (index > firstEmptyIndex) {
            inputRefs.current[firstEmptyIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        console.log('Entered OTP:', otpValue);



        // Show loading toast
        const loadingToastId = toast.loading("Submitting...");

        try {
            // Make POST request to the API
            const response = await fetch('https://api.helpcircle.in/api/customer/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    otp,

                    user_id


                }), // Send the email in the request body
            });

            if (response.ok) {
                const res = await response.json();

                if (res.success) {
                    console.log("OTP verified successfully!", res.message);
                    toast.success("OTP verified successfully!", { id: loadingToastId }); // Success toast
                  router.replace('/change-password'); // Replace with your success page path
                 // router.replace(`/change-password?user_id=${encodeURIComponent(user_id)}`); 

                } else {
                    console.log("OTP verification failed!", res.message);
                    toast.error("OTP verification failed! " + res.message, { id: loadingToastId }); // Error toast
                }
                // Handle success (e.g., show a success message)

            } else {
                // Handle error responses
                const errorData = await response.json();
                console.error("Error:", errorData);
                toast.error("Failed to verify OTP!", { id: loadingToastId }); // Error toast
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error. Please try again later.", { id: loadingToastId }); // Error toast
        }

    };

    return (
        <div className="flex items-center justify-center  rounded-2xl   bg-gray-100 py-6 px-4">
            <div className="max-w-md w-full   overflow-hidden text-sm mx-4">
                <h2 className="flex items-center gap-x-2  text-2xl font-semibold text-black  p-4"><Mail /> Check Your Email</h2>
                <p className='px-4'>we send reset link on your email  </p>
                <p className='px-4'>enter 6 digit code mentioned in the email </p>
                <form onSubmit={handleSubmit} className="flex justify-center space-x-2 p-4 mt-4">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={() => handleFocus(index)}
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 text-center text-xl font-semibold bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:scale-105"
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                        />
                    ))}
                </form>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className=" w-full px-4 mt-8 py-2 btn_bg  text-white rounded-md "
                >
                    Verify OTP
                </button>

                <div className='p-6'>have&apos;t got the email yet ?  <span className='font-bold cursor-pointer underline'>Resend Email </span> </div>

            </div>
        </div>
    );
};

export default VerifyOtp;





