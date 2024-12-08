'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";


const supportTicketSchema = z.object({  
    
    user_id: z.string().min(9, { message: "User ID is required" }), // Add user_id validation


    department_id: z.string().min(1, { message: "Please select a department" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    user_message: z.string().min(1, { message: "Message is required" }),
    priority: z.string().min(1, { message: "Please select a priority" }),

});

type FormData = z.infer<typeof supportTicketSchema>;



const SupportTicketForm = ({ user_id }: any) => {

    console.log("User id",user_id)








  
    // Set default values including user_id
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(supportTicketSchema),
        defaultValues: {
            user_id :user_id  , // Use the passed user_id as default
        }
    });
   


    const onSubmit = async (data1:FormData) => {
        const loadingToast = toast.loading("Submitting..."); // Show loading toast



      

        try {
            const response = await fetch('https://api.helpcircle.in/api/customer/support-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                 ...   data1
                 ,user_id


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
                toast.success(data.message || 'Support Ticket Added successfully!'); // Use Hot Toast for success messages

                // Reset the form after successful submission
                reset();
            } else {
                // Handle cases where success is false
                toast.error(data.message || 'Failed to Support Ticket.'); // Show error if success is false
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
        <div className="w-full p-6 mx-auto bg-white shadow rounded-md">
            <h1 className="text-2xl font-bold mb-4">Create Support Ticket</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

            <label className="block text-sm font-medium mb-1 " htmlFor="department_id">
                       User Id
                    </label>
            <input 
            disabled
                type="text"
                {...register("user_id")}

                className="w-full border  border-gray-300 rounded-3xl bg-[#D9D9D9] pl-4 pr-10 h-[50px] p-2 appearance-none"

                // Hidden input to store user_id
            />  {errors.user_id && (
                <span className="text-red-500 text-sm">{errors.user_id?.message}</span>
            )}
                {/* Department Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="department_id">
                        Department Name
                    </label>
                    <div className="relative w-full">
                        <select
                            id="department_id"
                            {...register("department_id")}
                            className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-4 pr-10 h-[50px] p-2 appearance-none"
                        >
                            <option className="p-2" value="">
                                Select Dept Name
                            </option>
                            <option className="p-2 hover:bg-gray-200" value="1">
                                Information Technology (IT)
                            </option>
                            <option className="p-2 hover:bg-gray-200" value="2">
                                Human Resources (HR)
                            </option>
                            <option className="p-2 hover:bg-gray-200" value="3">
                                Finance Department
                            </option>
                        </select>
                        {/* Chevron Down Icon */}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                    {errors.department_id && (
                        <span className="text-red-500 text-sm">{errors.department_id.message}</span>
                    )}
                </div>

                {/* Subject */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        id="subject"
                        type="text"
                        {...register("subject")}
                        className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] p-2"
                        placeholder="Enter subject"
                    />
                    {errors.subject && (
                        <span className="text-red-500 text-sm">{errors.subject.message}</span>
                    )}
                </div>

                {/* Message */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="user_message">
                        Message
                    </label>
                    <textarea
                        id="user_message"
                        {...register("user_message")}
                        className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 h-[100px] p-2"
                        placeholder="Enter your message"
                    />
                    {errors.user_message && (
                        <span className="text-red-500 text-sm">{errors.user_message.message}</span>
                    )}
                </div>

                {/* Priority */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="priority">
                        Priority
                    </label>
                    <div className="relative w-full">
                        <select
                            id="priority"
                            {...register("priority")}
                            className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 pr-10 h-[50px] p-2 appearance-none"
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        {/* Chevron Down Icon */}
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                    {errors.priority && (
                        <span className="text-red-500 text-sm">{errors.priority.message}</span>
                    )}
                </div>

                {/* Attachment */}
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="attachment">
                        Attachment
                    </label>
                    <input
                        id="attachment"
                        type="file"
                        {...register("attachment")}
                        className="w-full border border-gray-300 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] p-2"
                    />
                    {errors.attachment?.message && (
                        <span className="text-red-500 text-sm">{String(errors.attachment.message)}</span>
                    )}
                </div> */}

                {/* Buttons */}
                <div className="flex gap-2">
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

export default SupportTicketForm;
