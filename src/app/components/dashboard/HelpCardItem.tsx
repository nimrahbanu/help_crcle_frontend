'use client'
import { Copy, Facebook, Home, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const HelpCardItem = ({ data }:any) => {

  console.log("datataatatta",data.user.user_id)
  const pathname = usePathname(); // Get the current pathname

  console.log("Pathanme",pathname)

  const fullUrl = `https://helpcircle.in/register?code=${data.user.user_id}`;



  const makeCopy = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      console.log("Text copied to clipboard");
     
      toast.success("Copied success")
    }).catch((err) => {
      console.log("Failed to copy text: ", err);
      toast.error("Copied failed",err)
    });
  };

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(fullUrl); // Encode the message to be URL-friendly
    const url = `https://wa.me/?text=${encodedMessage}`; // WhatsApp URL without phone number but with a message
    window.open(url, '_blank'); // Opens WhatsApp, allowing the user to select a contact and send the message
  };

  return (
    <div className='bg-white p-2 mb-4 text-sm rounded shadow mx-2 '>
      <div className='flex items-center mb-2'>
        <div className="bg-gradient-to-r from-[#FF1010] to-black p-2 h-12 w-12 rounded-xl flex items-center justify-center mr-4">
          <Home className="text-white" />
        </div>
        <div className='flex-1'>
          <div className='flex items-center justify-evenly   font-bold text-xl mb-2'>
            <div>

              Referral Link
            </div>
            <div className='flex items-center justify-between space-x-4' >
              <Copy className='cursor-pointer' onClick={makeCopy} color='black' />

             
          <div onClick={()=>handleClick()} className='flex cursor-pointer'>
          <MessageCircle color='green' /> Share On Whatsapp
          </div>


            </div>
          </div>
          <div className='flex items-center justify-evenly'>
            <div className='text-blue-600 mr-16 '>
              Refer Code
            </div>
            <div>
              {data?.user.user_id}
            </div>
          </div>
        </div>
      </div>

      <div className='divide-y h-[1px] bg-[#A9A9A9] my-2' />

      <div className='flex items-center justify-between w-full'>
        <div className='text-black text-[12px]'>
          {fullUrl}
        </div>

      </div>
    </div>

   
  );
};

export default HelpCardItem;
