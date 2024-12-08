'use client'

import useProfileStore from '@/app/store/profileUpdate/useProfileStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, ChevronUp, Landmark, MapPin, TextSelect } from 'lucide-react';
import  { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';




const schema = z.object({
  user_id: z.string().min(1, 'User ID is required'),
 // state: z.string().min(1, 'State is required'),
 // district: z.string().min(1, 'District is required'),
  address: z.string().min(1, 'Address is required'),
 // pin_code: z.string()
  //  .min(1, 'Pin Code is required')
  //  .regex(/^\d{6}$/, 'Pin Code must be 6 digits'),
  bank_name: z.string().min(1, 'Bank Name is required'),
  account_number: z.string().min(1, 'Account Number is required'),
  ifsc_code: z.string().min(1, 'IFSC Code is required'),
  branch: z.string().min(1, 'Branch is required'),
  account_holder_name: z.string().min(1, 'Account Holder Name is required'),
  upi: z.string().min(1, 'UPI ID is required'),
  paytm: z.string().optional(),
  phone_pe: z.string().optional(),
  google_pay: z.string().optional(),
 // trx_rc20: z.string().optional(),
  usdt_bep20: z.string().optional(),
});



type FormData = z.infer<typeof schema>;


const AccordionForm = ({ profile }: any) => {
  const [activeSection, setActiveSection] = useState(null);
  const { isLoading, successMessage, errorMessage, submitProfile, resetMessages } = useProfileStore();


  const router = useRouter();

  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    // Show loading toast when isLoading is true
    if (isLoading) {
      toast.loading("Submitting...");
    } else {
      // Dismiss loading toast when isLoading is false
      toast.dismiss(); // Dismiss all toasts including loading
    }

    // Show success message if present
    if (successMessage) {
      toast.success(successMessage);
      resetMessages(); // Reset messages after showing
    }

    // Show error message if present
    if (errorMessage) {
      toast.error(errorMessage);
      resetMessages(); // Reset messages after showing
    }

  }, [successMessage, errorMessage, resetMessages, isLoading]);

  const {
    control,
   
    handleSubmit,
    formState: { errors },

  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_id: profile?.user?.user_id || '', // Assuming user_id is part of profile
     // state: profile?.bank_details?.state || '',
    //  district: profile?.bank_details?.district || '',
      address: profile?.bank_details?.address || '',
     // pin_code: profile?.bank_details?.pin_code || '',
      bank_name: profile?.bank_details?.bank_name || '',
      account_number: profile?.bank_details?.account_number || '',
      ifsc_code: profile?.bank_details?.ifsc_code || '',
      branch: profile?.bank_details?.branch || '',
      account_holder_name: profile?.bank_details?.account_holder_name || '',
      upi: profile?.bank_details?.upi || '',
      paytm: profile?.bank_details?.paytm || '',
      phone_pe: profile?.bank_details?.phone_pe || '',
      google_pay: profile?.bank_details?.google_pay || '',
    //  trx_rc20: profile?.bank_details?.trx_rc20 || '',
      usdt_bep20: profile?.bank_details?.usdt_bep20 || '',
    }

  });



  console.log("Form Errors: ", errors); // Log any validation errors


  // const onSubmit = async (formData: any) => {
  //   const loadingToast = toast.loading("Submitting..."); // Show loading toast

  //   const user_id = profile?.bank_details?.user_id;



  //   try {
  //     const response = await fetch('https://api.helpcircle.in/api/customer/profile-update', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({

  //         ...formData,
  //         user_id




  //       }),

  //     });

  //     const data = await response.json();


  //     console.log(
  //       "  USer is ", data
  //     )

  //     // Check if the response is not OK
  //     if (!response.ok) {
  //       // Handle non-200 responses
  //       throw new Error(data.message || 'An error occurred during submission.');
  //     }

  //     // Show success message only if success is true
  //     if (data.success) {
  //       toast.success(data.message || 'Support Ticket Added successfully!'); // Use Hot Toast for success messages
  //        router.refresh;
  //       // Reset the form after successful submission
  //       reset();
  //     } else {
  //       // Handle cases where success is false
  //       toast.error(data.message || 'Failed to Support Ticket.'); // Show error if success is false
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);

  //     // Check if error is an instance of Error to safely access message
  //     if (error instanceof Error) {
  //       toast.error(error.message || 'An unexpected error occurred.'); // Use Hot Toast for error messages
  //     } else {
  //       toast.error('An unexpected error occurred.'); // Fallback error message
  //     }
  //   } finally {
  //     toast.dismiss(loadingToast); // Dismiss loading toast
  //   }
  // };
 

 
 
  const onSubmit = async (formData: any) => {
    const user_id = profile?.user?.user_id;


   

    console.log("Data hext  .....",formData)

    await submitProfile(formData, user_id);

    
  };
 
 
  return (
    // <div className="mx-1">
    //     {/* Profile Update Card Form */}
    //     <div className="bg-white rounded-xl mb-3">
    //         <div
    //             className="p-4 text-[14px] cursor-pointer"
    //             onClick={() => toggleSection('addressInfo')}
    //         >
    //             <div className='flex items-center justify-between cursor-default'>

    //             <h1 className="flex ml-2 font-bold gap-x-2"> <MapPin /> Address Info</h1>
    //                 {activeSection === 'addressInfo' ? <ChevronUp /> : <ChevronDown />}
    //             </div>
    //         </div>
    //         {activeSection === 'addressInfo' && (
    //             <div className="p-4 space-y-3 text-[14px]">
    //                 <div>
    //                     <h1>State</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill State name"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>District</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill District name"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Address</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill Address name"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Pin Code</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill Pin Code"
    //                     />
    //                 </div>
    //             </div>
    //         )}
    //     </div>

    //     {/* Bank Info */}
    //     <div className="bg-white rounded-xl mb-3">
    //         <div
    //             className="p-4 text-[14px] cursor-pointer"
    //             onClick={() => toggleSection('bankInfo')}
    //         >
    //             <div className='flex items-center justify-between cursor-default'>
    //                 <h1 className="flex ml-2 font-bold gap-x-2">    <Landmark />
    //                 Bank Info</h1>
    //                 {activeSection === 'bankInfo' ? <ChevronUp /> : <ChevronDown />}
    //             </div>        </div>
    //         {activeSection === 'bankInfo' && (
    //             <div className="p-4 space-y-3 text-[14px]">
    //                 <div>
    //                     <h1>Bank Name</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill Bank Name"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Account Number</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill Account Number"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>IFSC Code</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill IFSC Code"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Branch</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill Branch"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Account Holder Name</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Fill Account Holder Name"
    //                     />
    //                 </div>
    //             </div>
    //         )}
    //     </div>

    //     {/* UPI Info */}
    //     <div className="bg-white rounded-xl mb-3">
    //         <div
    //             className="p-4 text-[14px] cursor-pointer"
    //             onClick={() => toggleSection('upiInfo')}
    //         >
    //             <div className='flex items-center justify-between cursor-default'>
    //                 <h1 className="flex ml-2 font-bold gap-x-2">    <TextSelect />
    //                 Upi Info</h1>
    //                 {activeSection === 'upiInfo' ? <ChevronUp /> : <ChevronDown />}
    //             </div>
    //         </div>
    //         {activeSection === 'upiInfo' && (
    //             <div className="p-4 space-y-3 text-[14px]">
    //                 <div>
    //                     <h1>UPI</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="UPI ID"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Paytm</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Paytm ID"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>PhonePe</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="PhonePe UPI ID"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>Google Pay</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="Google Pay UPI ID"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>TRX TRC20</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="TRX TRC20"
    //                     />
    //                 </div>
    //                 <div>
    //                     <h1>USDT BEP20</h1>
    //                     <input
    //                         className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
    //                         type="text"
    //                         placeholder="USDT BEP20"
    //                     />
    //                 </div>
    //                 <div className="h-4" />
    //                 <div className="flex items-center justify-center btn_bg p-3 mx-8 mt-16 text-white">
    //                     Submit
    //                 </div>

    //             </div>
    //         )}
    //     </div>
    // </div>
    <div className='mx-1'>




      <form onSubmit={handleSubmit(onSubmit)} className="mx-1">
        {/* Profile Update Card Form */}
        <div className="bg-white rounded-xl mb-3">
          <div
            className="p-4 text-[14px] cursor-pointer"
            onClick={() => toggleSection('addressInfo')}
          >
            <div className='flex items-center justify-between cursor-default'>
              <h1 className="flex ml-2 font-bold gap-x-2"> <MapPin /> Address Info</h1>
              {activeSection === 'addressInfo' ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          {activeSection === 'addressInfo' && (
            <div className="p-4 space-y-3 text-[14px]">
              {/* <div>
                <h1>State</h1>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill State name"
                    />
                  )}
                />
                {errors.state && <p className="text-red-500">{errors?.state?.message}</p>}
              </div>
              <div>
                <h1>District</h1>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill District name"
                    />
                  )}
                />
                {errors.district && <p className="text-red-500">{errors.district.message}</p>}
              </div> */}
              <div>
                <h1>Address</h1>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill Address name"
                    />
                  )}
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
              </div>
              {/* <div>
                <h1>Pin Code</h1>
                <Controller
                  name="pinCode"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill Pin Code"
                    />
                  )}
                />
                {errors.pinCode && <p className="text-red-500">{errors.pinCode.message}</p>}
              </div> */}
            </div>
          )}
        </div>

        {/* Bank Info */}
        <div className="bg-white rounded-xl mb-3">
          <div
            className="p-4 text-[14px] cursor-pointer"
            onClick={() => toggleSection('bankInfo')}
          >
            <div className='flex items-center justify-between cursor-default'>
              <h1 className="flex ml-2 font-bold gap-x-2"> <Landmark /> Bank Info</h1>
              {activeSection === 'bankInfo' ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          {activeSection === 'bankInfo' && (
            <div className="p-4 space-y-3 text-[14px]">
              <div>
                <h1>Bank Name</h1>
                <Controller
                  name="bank_name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill Bank Name"
                    />
                  )}
                />
                {errors.bank_name && <p className="text-red-500">{errors.bank_name.message}</p>}
              </div>
              <div>
                <h1>Account Number</h1>
                <Controller
                  name="account_number"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill Account Number"
                    />
                  )}
                />
                {errors.account_number && <p className="text-red-500">{errors.account_number.message}</p>}
              </div>
              <div>
                <h1>IFSC Code</h1>
                <Controller
                  name="ifsc_code"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill IFSC Code"
                    />
                  )}
                />
                {errors.ifsc_code && <p className="text-red-500">{errors.ifsc_code.message}</p>}
              </div>
              <div>
                <h1>Branch</h1>
                <Controller
                  name="branch"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill Branch"
                    />
                  )}
                />
                {errors.branch && <p className="text-red-500">{errors.branch.message}</p>}
              </div>
              <div>
                <h1>Account Holder Name</h1>
                <Controller
                  name="account_holder_name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Fill Account Holder Name"
                    />
                  )}
                />
                {errors.account_holder_name && <p className="text-red-500">{errors.account_holder_name.message}</p>}
              </div>
            </div>
          )}
        </div>

        {/* UPI Info */}
        <div className="bg-white rounded-xl mb-3">
          <div
            className="p-4 text-[14px] cursor-pointer"
            onClick={() => toggleSection('upiInfo')}
          >
            <div className='flex items-center justify-between cursor-default'>
              <h1 className="flex ml-2 font-bold gap-x-2"> <TextSelect /> UPI Info</h1>
              {activeSection === 'upiInfo' ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
          {activeSection === 'upiInfo' && (
            <div className="p-4 space-y-3 text-[14px]">
              <div>
                <h1>UPI</h1>
                <Controller
                  name="upi"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="UPI ID"
                    />
                  )}
                />
                {errors.upi && <p className="text-red-500">{errors.upi.message}</p>}
              </div>
              <div>
                <h1>Paytm</h1>
                <Controller
                  name="paytm"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Paytm ID"
                    />
                  )}
                />
                {errors.paytm && <p className="text-red-500">{errors.paytm.message}</p>}
              </div>
              <div>
                <h1>PhonePe</h1>
                <Controller
                  name="phone_pe"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="PhonePe UPI ID"
                    />
                  )}
                />
                {errors.phone_pe && <p className="text-red-500">{errors.phone_pe.message}</p>}
              </div>
              <div>
                <h1>Google Pay</h1>
                <Controller
                  name="google_pay"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="Google Pay UPI ID"
                    />
                  )}
                />
                {errors.google_pay && <p className="text-red-500">{errors.google_pay.message}</p>}
              </div>
              {/* <div>
                <h1>TRX TRC20</h1>
                <Controller
                  name="trxTRC20"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="TRX TRC20"
                    />
                  )}
                />
                {errors.trxTRC20 && <p className="text-red-500">{errors.trxTRC20.message}</p>}
              </div> */}
              <div>
                <h1>USDT </h1>
                <Controller
                  name="usdt_bep20"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="p-2 w-full rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]"
                      type="text"
                      placeholder="USDT"
                    />
                  )}
                />
                {errors.usdt_bep20 && <p className="text-red-500">{errors.usdt_bep20.message}</p>}
              </div>
              <div className="h-4" />
              {/* <div className="flex items-center justify-center btn_bg p-3 mx-8 mt-16 text-white">
                <button type="submit">Submit</button>
              </div> */}
            </div>
          )}
        </div>

        <button type="submit" className="flex items-center justify-center w-full btn_bg p-3 rounded mt-4 text-white">
          <div >Submit</div>
        </button>
      </form>
    </div>

  );
};

export default AccordionForm;
