'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const EpinTransfer = ({ pin }: any) => {

  const { user, e_pin } = pin;

  const [totalAvailablePin, setTotalAvailablePin] = useState(e_pin || 0);






  // Define the schema
  const packageFormSchema = z.object({
    totalAvailablePin: z
      .number()
      .nonnegative({ message: "Total Available Pin must be 0 or more" })
      .refine((val) => val >= 0, { message: "Total Available Pin cannot be negative" }),
    member_id: z.string()
      .length(9, { message: "Member ID must be exactly 9 characters long" }),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    user_id: z.string().min(1, { message: "User ID is required" }), // Add user_id validation
  });



  // Define form types
  type PackageFormData = z.infer<typeof packageFormSchema>;

  // Use React Hook Form with Zod resolver
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PackageFormData>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      totalAvailablePin: totalAvailablePin || 0, // set the default value from props
      user_id: user?.user_id || ''
    }
  });




  const onSubmit = async ({ user_id, member_id, quantity }: PackageFormData) => {
    const loadingToast = toast.loading("Submitting..."); // Show loading toast

    try {
      const response = await fetch('https://api.helpcircle.in/api/customer/epin-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,    // Ensure user_id is passed correctly
          member_id,  // Use memberID from form
          quantity,
        }),
      });

      const data = await response.json();

      // Check if the response is not OK
      if (!response.ok) {
        // Handle non-200 responses
        throw new Error(data.message || 'An error occurred during submission.');
      }

      // Show success message only if success is true
      if (data.success) {

        setTotalAvailablePin((prev: number) => prev - quantity); // Update by subtracting the transferred quantity


        toast.success(data.message || 'EPin transferred successfully!'); // Use Hot Toast for success messages
        // fetchTotalPins(user_id)
        // Reset the form after successful submission
        reset();
      } else {
        // Handle cases where success is false
        toast.error(data.message || 'Failed to transfer EPin.'); // Show error if success is false
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Check if error is an instance of Error to safely access message
      if (error instanceof Error) {
        toast.error(error.message || 'An unexpected error occurred.'); // Use Hot Toast for error messages
      } else {
        toast.error('An unexpected error occurred.'); // Fallback error message
      }
    } finally {
      toast.dismiss(loadingToast); // Dismiss loading toast
    }
  };









  return (
    <div className="w-full p-6 mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Package Form </h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Total Available Pin */}

        <label className="block text-sm font-medium mb-1" htmlFor="total_pin">
        Total Available Pin
          </label>
        <input
          id="totalAvailablePin"
          type="number"
          readOnly // Use readOnly instead of disabled
          value={totalAvailablePin} // Bind state value here
          className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] p-2"
        />
        {totalAvailablePin < 0 && (
          <span className="text-red-500 text-sm">Total Available Pin cannot be negative</span>
        )}


        {/* Member ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="memberID">
            Member ID
          </label>
          <input
            id="memberID"
            type="text"
            {...register("member_id")}
            className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] p-2"
            placeholder="Enter Member ID"
          />
          {errors.member_id && <span className="text-red-500 text-sm">{errors.member_id.message}</span>}
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] p-2"
            placeholder="Enter Quantity"
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm">{errors.quantity.message}</span>
          )}
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn_bg text-white px-6 py-2 rounded-md">
            Submit
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-600 text-white px-6 py-2 rounded-md"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EpinTransfer;
