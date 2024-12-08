import VerifyOtp from '@/app/components/auth/VerifyOtp'
import { Suspense } from 'react';


const page = () => {
    return (
        <main className="sm:flex  min-h-screen   items-center justify-evenly  lg:p-24 mx-2 ">
            <div className="flex flex-col items-center space-y-2">
                {/* <div className="text-red-600 text-4xl font-bold">Welcome back!</div> */}
                <div className="text-black text-4xl font-bold text-start py-4">Verify Otp</div>
                {/* <div>Verify Your OTP, Change Your Password, Secure Your Account! </div> */}

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



            <Suspense fallback={<></>}>

                <VerifyOtp />
            </Suspense>
        </main>

    )
}

export default page;