import ChangePasswordPopUp from '@/app/components/dashboard/account/ChangePasswordPopUp'
import ContactDetails from '@/app/components/dashboard/account/UserDetails'
import AccordionForm from '@/app/components/dashboard/form/AccordionForm'
import LogoutComp from '@/app/components/LogoutComp'
import { getUserId } from '@/app/utils/getUserId'
import { Contact, UserRoundPen } from 'lucide-react'
import React from 'react'




interface User {
  id: number;
  user_id: string;
  name: string;
  email: string;
  // phone: string | null;
  sponsor_id: string;
  phone_pay_no: string;
  registration_code: string;
  photo: string | null;
  is_active: string;
  is_green: string;
  package_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface BankDetails {
  id: number;
  user_id: string;
  district: string | null;
  state: string | null;
  address: string | null;
  pin_code: string | null;
  bank_name: string | null;
  account_number: string ;
  ifsc_code: string;
  branch: string;
  account_holder_name: string;
  upi: string;
  paytm: string | null;
  phone_pe: string;
  google_pay: string | null;
 
  

}

interface UserProfile {
  user: User;
  bank_details: BankDetails;
}


async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const res = await fetch('https://api.helpcircle.in/api/customer/my-profile', {
      method: 'POST', // Use POST request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId, // Pass user_id in the request body
      }),
      cache: 'no-store', // Ensure no caching to get fresh data
    });
    const data = await res.json();

    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch profile:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

const page = async () => {
  const userId = getUserId() // Example user_id to pass this is hard coded value you need to change

  const profile = await getUserProfile(userId);


 


  if (!profile) {
    return <div className='mt-48 flex items-center justify-center'>Failed to load profile data</div>;
  }




  return (
    <div className=' text-black   space-y-3'>

      <div className='bg-white h-[170px] mx-1 rounded-xl '>

        <div className='flex items-center  justify-between mx-8 py-4 '>
          <div className=' space-y-2  '>




            <div className='rounded-full bg-gray-300 w-fit p-8'>

              <UserRoundPen size={45} />

            </div>

            <h1 className='flex items-center justify-center  font-medium '>{profile.user.name}</h1>
          </div>
          <div className='space-y-2'>
            <h1>{profile.user.user_id}</h1>


            < ChangePasswordPopUp profile={profile} />



          </div>

        </div>

      </div>


      {/* Person Info */}


      <div className='bg-white  mx-1 rounded-xl p-4 '>
        <div className='flex  gap-x-2 p-3 '>
          <Contact />
          <h1 className='font-bold'> Conatct</h1>
        </div>

        <ContactDetails  profile={profile} />

      </div>
      <AccordionForm  profile={profile} />

      <LogoutComp/>

      <div className='h-24'>


      </div>






    </div>
  )
}

export default page