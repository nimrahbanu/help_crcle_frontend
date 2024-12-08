'use client'

import Error from "@/app/components/dialog/error";
import Loading from "@/app/components/dialog/loading";
import { useRegisterStore } from "@/app/store/useRegisterStore";
import useCustomerStore from "@/app/store/useStoreGetName";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const registerSchema = z.object({

    sponsor_id: z.string().min(1, "The sponsor id field is required."),
    name: z.string().min(1, "Name is required"),
    email: z.string()
        .min(1, "Email is required!")   // Ensure the field is not empty
        .regex(emailRegex, "Please enter a valid email address!"),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "The phone field must be 10 digits"),
    phone_pay_no: z
        .string()
        .regex(/^[0-9]{10}$/, "The phone pay no field must be 10 digits"),
    confirm_phone_pay_no: z.string().min(1, "required confirm phone pay no"),
    registration_code: z.string().min(1, "The registration code is required."),
    password: z.string().min(6, "Password is required and must be at least 6 characters long"),
    re_password: z.string().min(6, "Retype Password is required"),
}).refine((data) => data.phone_pay_no === data.confirm_phone_pay_no, {
    path: ["confirm_phone_pay_no"],
    message: "The phone pay numbers must match",
}).refine((data) => data.password === data.re_password, {
    path: ["re_password"],
    message: "Passwords must match",
});



export type FormValues = z.infer<typeof registerSchema>;



export default function Register() {


    const searchParams = useSearchParams();
    const code = searchParams.get('code') || ''; // Retrieves the 'code' query parameter

    const { loading, error, success, validationErrors, reset, create_account } = useRegisterStore();

    const { sponsor_name, load, err, fetchCustomerName } = useCustomerStore();
    const [showPassword, setShowPassword] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetForm,
    } = useForm<FormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            sponsor_id: code, // Set the default value for sponsor_id
        },
    });


    useEffect(() => {
        if (code) {
            fetchCustomerName(code);
        }
    }, [code]);



    const router = useRouter()




    useEffect(() => {
        if (success) {
            router.push('/dashboard'); // Redirect to dashboard if login is successful
            router.refresh()

            resetForm()

        }
    }, [success, router]);





    const onSubmit = async (event: React.FormEvent, data: FormValues) => {





        event.preventDefault();

        await create_account(data);


        console.log("Data", data)

    };


    const handleRetry = () => {

        reset();



    };


    const renderValidationErrors = () => {
        return Object.entries(validationErrors).map(([field, errors]) => (
            <div key={field} className="text-red-500">
                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                <ul className="text-black">
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>
        ));
    };




    return (
        <main className="sm:flex  min-h-screen   items-center justify-evenly  lg:p-24">
            <div className="flex flex-col items-center space-y-2">
                {/* <div className="text-red-600 text-4xl font-bold">Welcome back!</div> */}
                <div className="text-black text-4xl font-bold text-start mt-8">Register</div>
                <div className="p-4">Create Account With Credential & Continue</div>

                <div className="mt-8">
                    {/* <Image height={200} width={200} src={"./logo.svg"} alt={""} /> */}
                    <div className="w-full max-w-sm h-auto mb-4">
                        <video
                            src="./logo_video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className=" h-48 w-48 rounded-2xl"
                        />
                    </div>
                </div>
            </div>




            <div>

                <div>
                    <form


                        onSubmit={(event) =>
                            handleSubmit((data) => onSubmit(event, data))(event)
                        }
                    >
                        <div className=" max-w-md mx-auto bg-white rounded-2xl shadow-sm overflow-hidden md:max-w-2xl text-sm">
                            <div className="md:flex">

                                <div className="pt-4 lg:p-4  lg:w-[500px]">
                                    <div className="flex flex-col space-y-4  mx-6" >

                                        <span>SponsorID</span>
                                        <div className="flex flex-col">


                                            <input disabled   {...register("sponsor_id")} className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Fill SponsorID" />
                                            {load ? (
                                                <p>Loading...</p> // Show loading indicator when `load` is true
                                            ) : err ? (
                                                <span className="flex items-center text-[11px] px-2 bg-red-500 text-white rounded w-fit mt-2"> <X /> {err}</span> // Show error message when `err` is truthy
                                            ) : (
                                                <span className="text-sm p-1">{sponsor_name}</span> // Show name when neither loading nor error
                                            )}
                                            {errors.sponsor_id && (
                                                <span className="text-red-600 text-sm">{errors.sponsor_id.message}</span>
                                            )}
                                        </div>




                                        <div className="flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Name</span>
                                                <input   {...register("name")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Name" />
                                                {errors.name && (
                                                    <span className="text-red-600 text-sm">{errors.name.message}</span>
                                                )}
                                            </div>

                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Mobile No</span>
                                                <input {...register("phone")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Mobile No" />
                                                {errors.phone && (
                                                    <span className="text-red-600 text-sm">{errors.phone.message}</span>
                                                )}

                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Phone Pay No</span>
                                                <input      {...register("phone_pay_no")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Phone Pay" />
                                                {errors.phone_pay_no && (
                                                    <span className="text-red-600 text-sm">{errors.phone_pay_no.message}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Confirm Phone Pay No</span>
                                                <input   {...register("confirm_phone_pay_no")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Confirm Phone Pay" />

                                                {errors.confirm_phone_pay_no && (
                                                    <span className="text-red-600 text-sm">{errors.confirm_phone_pay_no.message}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* <span>Registration Code</span>
                                        <div className="flex flex-col">


                                            <input    {...register("registration_code")} className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Registration Code" />
                                            <span className="text-[12px] text-red-600 p-1"> * For Registration Code Contact your Upline</span>
                                            {errors.registration_code && (
                                                <span className="text-red-600 text-sm">{errors.registration_code.message}</span>
                                            )}

                                        </div> */}


                                        <div className="flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Registration Code</span>

                                                <input    {...register("registration_code")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Registration Code" />
                                                <span className="text-[12px] text-red-600 p-1">*For Code Contact your Upline</span>
                                                {errors.registration_code && (
                                                    <span className="text-red-600 text-sm">{errors.registration_code.message}</span>
                                                )}

                                            </div>

                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Email-ID</span>
                                                <input {...register("email")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Email-ID" />

                                                <span className=" h-6" ></span>
                                                {errors.email && (
                                                    <span className="text-red-600 text-sm ">{errors.email.message}</span>
                                                )}

                                            </div>
                                        </div>




                                        {/* Display a summary of validation errors */}
                                        {Object.keys(validationErrors).length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="text-red-500">Validation Errors:</h3>
                                                {renderValidationErrors()}
                                            </div>
                                        )}

                                        {/* <div className="flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-2 w-full">
                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Password</span>
                                                <input       {...register("password")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Password" />
                                                {errors.password && (
                                                    <span className="text-red-600 text-sm">{errors.password.message}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col w-full sm:w-auto">
                                                <span className="pb-2">Re Password</span>
                                                <div className="mb-6 relative">
                                                <input  {...register("re_password")} className="p-2 rounded-3xl w-full sm:w-48 bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Re Password" />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className=""
                                                >
                                                    {showPassword ? (
                                                        <EyeOffIcon className="h-6 w-6 text-gray-600" />
                                                    ) : (
                                                        <EyeIcon className="h-6 w-6 text-gray-600" />
                                                    )}
                                                </button>
</div>
                                                {errors.re_password && (
                                                    <span className="text-red-600 text-sm">{errors.re_password.message}</span>
                                                )}
                                             
                                            </div>
                                        </div> */}


<div className="flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-2 w-full">
  {/* Password Input */}
  <div className="flex flex-col w-full sm:w-auto">
    <span className="pb-2">Password</span>
    <div className="relative w-full sm:w-48">
      <input
        {...register("password")}
        className="p-2 rounded-3xl w-full bg-[#D9D9D9] pl-6 pr-12 h-[50px]"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 transform -translate-y-1/2 right-4"
      >
        {showPassword ? (
          <EyeOffIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <EyeIcon className="h-6 w-6 text-gray-600" />
        )}
      </button>
    </div>
    {errors.password && (
      <span className="text-red-600 text-sm">{errors.password.message}</span>
    )}
  </div>

  {/* Re Password Input */}
  <div className="flex flex-col w-full sm:w-auto">
    <span className="pb-2">Re Password</span>
    <div className="relative w-full sm:w-48">
      <input
        {...register("re_password")}
        className="p-2 rounded-3xl w-full bg-[#D9D9D9] pl-6 pr-12 h-[50px]"
        type={showPassword ? "text" : "password"}
        placeholder="Re Password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 transform -translate-y-1/2 right-4"
      >
        {showPassword ? (
          <EyeOffIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <EyeIcon className="h-6 w-6 text-gray-600" />
        )}
      </button>
    </div>
    {errors.re_password && (
      <span className="text-red-600 text-sm">{errors.re_password.message}</span>
    )}
  </div>
</div>


                                        {

                                            loading ? <Loading /> : <></>
                                        }


                                        <button className="bg p-2 rounded-3xl text-white">
                                            {loading ? 'Loading Wait...' : 'Create Account'}

                                        </button>



                                        <span className="text-center ">Already  have an account?				<Link href='/login'>
                                            <span className="text-black font-bold">Sign In</span></Link> </span>

                                        <div className="h-1">

                                        </div>



                                    </div>

                                </div>
                            </div>
                        </div>


                    </form>
                    {/* Error message */}
                    {error && <p style={{ color: 'red' }}>{<Error errorMessage={error} onRetry={handleRetry} />}</p>}

                    {/* Success message */}
                    {success && <p style={{ color: 'green' }}>Registration successful!</p>}
                </div>



            </div>





        </main>
    );
}




