'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/store/user_id/userStore';

// Define Zod schema
const schema = z.object({
    email_or_mobile: z.string().min(1, { message: "Email is required!" }).email("Please enter a valid email address!"),
});

// Define form types based on Zod schema
type FormData = z.infer<typeof schema>;

const ForgotForm: React.FC = () => {
  // Initialize React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const setUserId = useUserStore((state) => state.setUserId); // Access setUserId function from the store

  
  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
  
    // Show loading toast
    const loadingToastId = toast.loading("Submitting...");
  
    try {
      // Make POST request to the API
      const response = await fetch('https://api.helpcircle.in/api/customer/forget-passowrd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_or_mobile: data.email_or_mobile }), // Send the email in the request body
      });
  
      if (response.ok) {
        const res = await response.json();
  
        if (res.success) {
          console.log("Password reset email sent!", res.message);

          const {user_id} = res.data
          toast.success("Password reset email sent successfully!", { id: loadingToastId }); // Success toast

          setUserId(user_id)

         // const ot = encodeURIComponent(otp);
         // const usr = encodeURIComponent(user_id);
          router.push('/verify-otp'); // Replace with your success page path
        //  router.push(`/verify-otp?user_id=${usr}`);


        } else {
          console.log("Password reset email failed!", res.message);
          toast.error("Password reset email failed! " + res.message, { id: loadingToastId }); // Error toast
        }
        // Handle success (e.g., show a success message)
  
      } else {
        // Handle error responses
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error("Failed to send password reset email!", { id: loadingToastId }); // Error toast
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please try again later.", { id: loadingToastId }); // Error toast
    }
  };






  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="md:flex">
        <div className="lg:p-4 lg:w-[400px]">
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-8 mx-6 space-y-8">
            {/* Email Field */}
            <div>

        
            <div className="text-black text-3xl font-bold text-start">Forgot Password ?</div>
            <p className='text-black text-sm mt-1'>Please Enter your email to reset password </p>
    </div>
            <label className="mt-4">Email</label>
            <input
              className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
              type="email"
              placeholder="email id"
              {...register('email_or_mobile')}
            />
            {/* Show error if email validation fails */}
            {errors.email_or_mobile && (
              <span className="text-red-500">{errors.email_or_mobile.message}</span>
            )}

            {/* Submit Button */}
            <button className="bg p-2 rounded-3xl text-white mt-8" type="submit">
              Submit
            </button>

            {/* Link to Login */}
            <span className="text-center pb-8">
              Send me back again to{' '}
              <Link href="/login">
                <span className="text-black font-bold">Sign In Screen</span>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotForm;
