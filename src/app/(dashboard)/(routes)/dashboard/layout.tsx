
import DashHeader from '@/app/components/dash-header/DashHeader';
import BottomNav from '@/app/components/dashboard/nav/BottomNav';
import SideBarProfile from '@/app/components/SideBarProfile';
import { getName } from '@/app/utils/getName';
import { getUserId } from '@/app/utils/getUserId';
import { ChartNoAxesCombined, GitGraph } from 'lucide-react';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  
  const user_id = getUserId();

  const name = getName();





  return (
    <div className="flex flex-col lg:flex-row   ">
      {/* Sidebar */}
       <SideBarProfile user_id ={user_id} name={name}/>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-auto" style={{ height: '100vh' }}>

        {/* Toolbar */}
        {/* <header className="btn_bg mb-1  ">
                      <div className='flex items-center justify-between mx-4'>
               <div className='p-2 font-bold text-white mt-24 lg:pl-[300px]'>

                </div>
                 <div className="flex flex-row lg:flex-row lg:space-x-8 mt-8 text-center lg:text-left mx-auto space-x-2">
                   <div className="flex items-center justify-center gap-2 p-2 bg-white text-black rounded-lg shadow-md">
                     <ChartNoAxesCombined size={32} />
                     <div>
                       <div className="text-sm font-medium">Total Giving Help</div>
                       <div className="text-lg font-bold">₹ 300.00</div>
                     </div>
                   </div>
                   <div className="flex items-center justify-center gap-2 p-2 bg-white text-black rounded-lg shadow-md lg:mt-0">
                     <GitGraph size={32} />
                     <div>
                       <div className="text-sm font-medium">Total Received Help</div>
                       <div className="text-lg font-bold">₹ 100.00</div>
                     </div>
                   </div>
                 </div>
               </div>
               <div className='lg:pl-96 pl-8 font-bold text-white text-2xl mt-4 capitalize'>{name} ({user_id})</div>
               <div className='divide-y h-[1px] bg-[#A9A9A9] my-2' />
        
         </header> */}

         <DashHeader userId= {user_id} name ={name} />

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto">

          {children}
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl">
        <BottomNav />
       </div>
     </div>
     
    </div>
  );
};

export default Layout;

