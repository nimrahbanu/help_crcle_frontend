import { Header } from '@/app/components/dashboard/wallet/DataTable'
import EPinTab from '@/app/components/e-pin/EPinTab'
import { getUserId } from '@/app/utils/getUserId';
import { getData } from '@/app/utils/utils/api';
import React from 'react'








interface EpinData {
  id: number;
  provided_by: string;
  member_id: string;
  member_name: string;
  balance: string;
  quantity: number;
  e_pin: string;
  status: string;
  flag: string;
  is_used: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  member_data: any;
  provided_by_data: any;
  epin_used: any;
}

// Interface for the API response
interface EpinApiResponse {
  success: boolean;
  message: string;
  data: EpinData[];
}




interface CardData {
  sno: number;
  memberId: string;
  memberName: string;
  balance: string;
  quantity: number;
  ePin: string;
  createdAt: string;
  status: 'Used' | 'Unused';
}








interface EpinData {
  sno: number;
  memberId: string;
  memberName: string;
  pinNumber: string;
  serialNumber: string;
  package: string;
  pinStatus: 'Active' | 'Inactive';
  generateDate: string; // Corrected property name
  useByMemberId?: string; // Optional
  useByMemberName?: string; // Optional
}


const headers: Header<CardData>[] = [
  { key: 'sno', label: 'Sr. No.' },
  { key: 'memberId', label: 'MemberID' },
  { key: 'memberName', label: 'Member Name' },
  { key: 'balance', label: 'Balance' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'ePin', label: 'E-PIN' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'status', label: 'Status' },
];




const page = async ({ searchParams }:any) => {

  const fetchData = async (user_id: string): Promise<CardData[]> => {
    const res = await fetch('https://api.helpcircle.in/api/customer/view-epin', {
      method: 'POST', // or POST if necessary
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }), // Pass user_id in the request body

    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data: EpinApiResponse = await res.json();

    if (data.success) {
      // Map data to match CardData interface
      return data.data.map((item: EpinData, index: number) => ({
        sno: index + 1,
        memberId: item.member_id,
        memberName: item.member_name,
        balance: item.balance,
        quantity: item.quantity,
        ePin: item.e_pin,
        createdAt: item.created_at,
        status: item.is_used === "1" ? 'Used' : 'Unused',
      }));
    } else {
      console.error(data.message || 'Failed to fetch data');
      return [];
    }
  };

  const user_id = getUserId();




  const data1 = await fetchData(user_id)





  const customer = await getData(user_id);


 const { data } = customer;


   







 
  



  return (
    <div className=' mx-2'>

      <EPinTab data={data1} headers={headers} pin={data}   />


      <div  className='h-16'>


      </div>










    </div>
  )
}

export default page