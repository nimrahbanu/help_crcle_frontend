'use client';

import { Compass, PanelBottomClose } from 'lucide-react';
import { useEffect, useState } from 'react';
import AccordionCard from '../wallet/AccordionCard';
import DataTable from '../wallet/DataTable';
import FilterDateComp from '../../FilterDateComp';
import FilterDateDownline from '../../FilterDateDownline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TabComponent = ({ data, headers, downlineData, downlineHeaders, pagination, directPagination, }: any) => {
    const pathname = usePathname();
    const router = useRouter();
    const param = useSearchParams();
    const status = param.get('status') || '';

    // Extract the tab name from the URL
    const tabname = pathname.split('/').pop()?.toLowerCase();

    // State to track active tab
    const [activeTab, setActiveTab] = useState<string>(tabname || 'direct');

    useEffect(() => {
        setActiveTab(tabname || 'direct');
    }, [tabname]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(`/dashboard/details/${tab}`);
    };

    // Function to render content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'direct':
                return (
                    <>
                        <FilterDateComp />
                        <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
                            {/* Accordion for mobile */}
                            <div className="space-y-4 p-4 text-[11px] lg:hidden">
                                <AccordionCard  pagination={directPagination} data={data} headers={headers} />
                            </div>

                            {/* DataTable for desktop */}
                            <div className='hidden lg:block'>
                                <DataTable
                                    data={data}
                                    headers={headers}
                                    pagination={directPagination}
                                />
                            </div>
                        </div>
                    </>
                );

            case 'downline':
                return (
                    <>
                        <FilterDateDownline />
                        <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
                            {/* Accordion for mobile */}
                            <div className="space-y-4 p-4 text-[11px] lg:hidden">
                                <AccordionCard   pagination={pagination} data={downlineData} headers={downlineHeaders} />
                            </div>

                            {/* DataTable for desktop */}
                            <div className='hidden lg:block'>
                                <DataTable
                                    data={downlineData}
                                    headers={downlineHeaders}
                                    pagination={pagination}
                                />
                            </div>
                        </div>
                    </>
                );

            case 'helptree':
                return <div>Helptree Content</div>;

            default:
                return null;
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between bg-white py-4 rounded-xl mx-1'>
                <div
                    className={`flex items-center justify-center gap-x-2 px-8 p-1 ${activeTab === 'direct' ? 'btn_bg text-white' : 'bg-gray-200'} rounded-3xl mx-auto px-3 cursor-pointer`}
                    onClick={() => handleTabClick('direct')}
                >
                    <Compass size={18} />
                    Direct
                </div>
                <div
                    className={`flex items-center justify-center gap-x-2 p-1 px-8 ${activeTab === 'downline' ? 'btn_bg text-white' : 'bg-gray-200'} rounded-3xl mx-auto px-3 cursor-pointer`}
                    onClick={() => handleTabClick('downline')}
                >
                    <PanelBottomClose size={18} />
                    Downline
                </div>
            </div>

            {/* Render the content based on the active tab */}
            <div className="mt-2">
                {renderContent()}
            </div>
        </div>
    );
};

export default TabComponent;
