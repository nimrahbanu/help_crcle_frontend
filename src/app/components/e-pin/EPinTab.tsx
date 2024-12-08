'use client'

import { Compass, PanelBottomClose } from 'lucide-react';
import { useState } from 'react';
import AccordionCard from '../dashboard/wallet/AccordionCard';
import DataTable from '../dashboard/wallet/DataTable';
import EpinTransfer from './EpinTransfer';
import FilterViewEPin from '../FilterViewEPin';







const EPinTab = ({ data, headers,pin }: any) => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState('View E-Pin');






    // Function to render content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'View E-Pin':
                return <>
                    <FilterViewEPin />

                    <div className='bg-white  mt-2 py-4  rounded-xl  mx-1 '>

                        <div className="space-y-4 p-4 text-[11px] lg:hidden">

                            <AccordionCard pagination={undefined} data={data} headers={headers} />
                        </div>

                        <div className='hidden lg:block'>

                            <DataTable data={data} headers={headers} pagination={undefined} />

                        </div>




                        <div className='h-8'>


                        </div>















                    </div>



                </>



            case 'Pin Transfer':
                return <>
                    <EpinTransfer pin={pin}  />


                </>;

            default:
                return null;
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between bg-white py-4 rounded-xl mx-1 '>
                <div
                    className={`flex items-center justify-center gap-x-2 p-1 ${activeTab === 'View E-Pin' ? 'btn_bg text-white' : 'bg-gray-200'
                        } rounded-3xl mx-auto px-3 cursor-pointer`}
                    onClick={() => setActiveTab('View E-Pin')}
                >
                    <Compass size={18} />
                    View E-Pin
                </div>
                <div
                    className={`flex items-center justify-center gap-x-2 p-1 ${activeTab === 'Pin Transfer' ? 'btn_bg text-white' : 'bg-gray-200'
                        } rounded-3xl mx-auto px-3 cursor-pointer`}
                    onClick={() => setActiveTab('Pin Transfer')}
                >
                    <PanelBottomClose size={18} />
                    Pin Transfer
                </div>

            </div>

            {/* Render the content based on the active tab */}
            <div className="mt-2 ">
                {renderContent()}
            </div>
        </div>
    );
};

export default EPinTab;


// app/tabs/page.tsx
// import Link from 'next/link';
// import AccordionCard from '../dashboard/wallet/AccordionCard';
// import DataTable from '../dashboard/wallet/DataTable';
// import FilterViewEPin from '../FilterViewEPin';
// import EpinTransfer from './EpinTransfer';
// import { Compass, PanelBottomClose } from 'lucide-react';


// const EPinTab = ({ data, headers, pin, searchParams }:any) => {

//     // Extract the active tab from the URL
//     const activeTab = searchParams.activeTab || 'View E-Pin';

  

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'View E-Pin':
//                 return (
//                     <>
//                         <FilterViewEPin />
//                         <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
//                             <div className="space-y-4 p-4 text-[11px] lg:hidden">
//                                 <AccordionCard data={data} headers={headers} />
//                             </div>
//                             <div className='hidden lg:block'>
//                                 <DataTable data={data} headers={headers} />
//                             </div>
//                         </div>
//                     </>
//                 );
//             case 'Pin Transfer':
//                 return <EpinTransfer pin={pin} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div>
//           <div className='flex items-center justify-evenly  bg-white py-4 rounded-xl mx-1'>
//           <Link href="/dashboard/e-pin?activeTab=View E-Pin">

//                     <div
//                         className={`flex items-center justify-center gap-x-2 p-1 ${activeTab === 'View E-Pin' ? 'btn_bg text-white' : 'bg-gray-200'} rounded-3xl mx-auto px-3 cursor-pointer`}
//                     >
//                         <Compass size={18} />
//                         View E-Pin 
//                     </div>
//                 </Link>
//                 <Link href="/dashboard/e-pin?activeTab=Pin Transfer">
//                     <div
//                         className={`flex items-center justify-center gap-x-2 p-1 ${activeTab === 'Pin Transfer' ? 'btn_bg text-white' : 'bg-gray-200'} rounded-3xl mx-auto px-3 cursor-pointer`}
//                     >
//                         <PanelBottomClose size={18} />
//                         Pin Transfer
//                     </div>
//                 </Link>
//             </div>

//             {/* Render content based on the active tab */}
//             <div className="mt-2">
//                 {renderContent()}
//             </div>
//         </div>
//     );


// };

// export default EPinTab;
