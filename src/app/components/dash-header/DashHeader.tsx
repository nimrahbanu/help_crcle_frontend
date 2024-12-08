'use client'

import { useTransactionStore } from "@/app/store/userTotalTransaction";
import { ChartNoAxesCombined, GitGraph } from "lucide-react";

   import React, { useEffect } from 'react'


   
   const DashHeader = ({userId,name}:any) => {

    const { data, loading, error, fetchTransactions } = useTransactionStore();

    useEffect(() => {
        fetchTransactions(userId);
      }, [fetchTransactions, userId]);
    
    //   if (loading) {
    //     return <p>Loading...</p>;
    //   }
    
      if (error) {
        return <p>Error: {error}</p>;
      }

     return (
       <div>{/* Toolbar */}
       <header className="btn_bg mb-1  ">
       <div className='flex items-center justify-between mx-4'>
    <div className='p-2 font-bold text-white mt-24 lg:pl-[300px]'>
    
    </div>
    <div className="flex flex-row lg:flex-row lg:space-x-8 mt-8 text-center lg:text-left mx-auto space-x-2">
    <div className="flex items-center justify-center gap-2 p-2 bg-white text-black rounded-lg shadow-md">
      <ChartNoAxesCombined size={32} />
      <div>
        <div className="text-sm font-medium">Total Giving Help</div>
        <div className="text-lg font-bold">₹ {data?.total_giving_help_count ?? 0}.00</div>
        </div>
    </div>
    <div className="flex items-center justify-center gap-2 p-2 bg-white text-black rounded-lg shadow-md lg:mt-0">
      <GitGraph size={32} />
      <div>
        <div className="text-sm font-medium">Total Received Help</div>
        <div className="text-lg font-bold">₹ {data?.total_receiving_help_count ?? 0}.00</div>
        </div>
    </div>
    </div>
    </div>
    <div className='lg:pl-96 pl-8 font-bold text-white text-2xl mt-4 capitalize'>{name} ({userId})</div>
    <div className='divide-y h-[1px] bg-[#A9A9A9] my-2' />
    
    </header></div>
     )
   }
   
   export default DashHeader