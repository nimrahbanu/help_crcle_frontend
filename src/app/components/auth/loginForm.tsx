'use client'
import Error from "@/app/components/dialog/error";
import Loading from "@/app/components/dialog/loading";
import { useLoginStore } from "@/app/store/useLoginStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const loginSchema = z.object({

    user_id: z
        .string().min(4, "user id required"),

    password: z.string().min(1, "Password is required"),

}
);



export type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {

    const { loading, error, success, login, reset } = useLoginStore();


    const router = useRouter()




    useEffect(() => {
        if (success) {
            router.push('/dashboard'); // Redirect to dashboard if login is successful
            router.refresh()

            resetForm()

        }
    }, [success, router]);



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetForm,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (event: React.FormEvent, data: LoginFormValues) => {




        event.preventDefault();

        await login(data); // Call the login function from the store








    };



    const handleRetry = () => {

        reset();



    };


    return (
        <main className="sm:flex  min-h-screen   items-center justify-evenly  lg:p-24 ">
            <div className="flex flex-col items-center space-y-2">
                {/* <div className="text-red-600 text-4xl font-bold">Welcome back!</div> */}
                {/* <div className="text-black text-4xl font-bold text-start mt-8">Login</div>
                <div>Login With Credential & Continue</div> */}


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
                <form


                    onSubmit={(event) =>
                        handleSubmit((data) => onSubmit(event, data))(event)
                    }
                >
                    <div>

                        <div className=" max-w-md mx-auto h-auto  bg-white rounded-2xl shadow-sm overflow-hidden md:max-w-2xl text-sm">
                            <div className="md:flex">

                                <div className="h-fit  lg:w-[450px] px-4">
                                    <div className="pl-6">


                                          <div className="text-black text-4xl font-bold text-start mt-8">Login</div>
                                <div className="mt-2">Login With Credential & Continue</div>
                                    </div>
                              
                                    <div className="flex flex-col space-y-4 mt-16 mx-4 px-2  gap-y-1" >

                                        <span>User Id</span>

                                        <input {...register("user_id")} className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="userid" />
                                        {errors.user_id && (
                                            <span className="text-red-600 text-sm">{errors.user_id.message}</span>
                                        )}

                                        <span>Password</span>

                                        <input  {...register("password")} className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="password" />
                                        {errors.password && (
                                            <span className="text-red-600 text-sm">{errors.password.message}</span>
                                        )}
                                        <span className="text-end "> 	<Link href='/forgot-password'>Forgot password?</Link></span>

                                        <button className="bg p-2 rounded-3xl text-white">
                                            {loading ? 'Logging in...' : 'Login Now'}
                                        </button>


                                        <span className="text-center ">Don’t  have an account? 				<Link href='/register'>
                                            <span className="text-black font-bold ">Create Account</span></Link> </span>
                                        <div className="p-4">

                                        </div>

                                    </div>

                                </div>
                            </div>

                            {

                                loading ? <Loading /> : <></>
                            }
                        </div>

                    </div>
                </form>
                {/* Error message */}
                {error && <Error errorMessage={error} onRetry={handleRetry} />}



            </div>




        </main>
    );
}
