import ForgotForm from '@/app/components/auth/ForgotForm'


const page = () => {
    return (
        <main className="sm:flex  min-h-screen   items-center justify-evenly  lg:p-24 mx-2 ">
            <div className="flex flex-col items-center space-y-2">
                {/* <div className="text-red-600 text-4xl font-bold">Welcome back!</div> */}
                {/* <div className="text-black text-4xl font-bold text-start">Forgot Password ?</div>
                <div>Fill All info carefully and change password </div> */}

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




            <ForgotForm />




            {/* <div className="  bg-white rounded-2xl shadow-sm ">
                        <div className="md:flex">

                            <div className="lg:p-4  lg:w-[500px]">
                                <div className="flex flex-col  mt-8 mx-6 space-y-8" >

                                    <span className='mt-4'>Email</span>

                                    <input className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px] " type="text" placeholder="email id" />

                                    <div className='flex items-center justify-center gap-2'>


                                        <div className='space-y-4'>


                                            <span>Registered Mobile No</span>
                                            <input className="p-2 rounded-3xl bg-[#D9D9D9] w-full  sm:w-48 pl-6 h-[50px]" type="text" placeholder="Registered Mobile" />
                                        </div>

                                        <div className='space-y-4 '>




                                            <span className='pl-4'> OTP </span>

                                            <input className="p-2 rounded-3xl bg-[#D9D9D9] w-full sm:w-48 pl-6 h-[50px] " type="text" placeholder="OTP" />

                                        </div>


                                    </div>

                                    <span>New Password</span>

                                    <input className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="password" />
                                    <span>Confirm Password</span>

                                    <input className="p-2 rounded-3xl bg-[#D9D9D9] pl-6 h-[50px]" type="text" placeholder="Confirm Password" />


                                    <button className="bg p-2 rounded-3xl text-white mt-8">Submit</button>


                                    <span className="text-center ">Send me back again in 				<Link href='/login'>
                                        <span className="text-black font-bold">Sign In Screen</span></Link> </span>

                                    <div className='h-1'>



                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> */}










        </main>
    )
}

export default page