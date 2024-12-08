'use client';

import { useEffect, useState } from 'react';
import AccordionCard from '../wallet/AccordionCard';
import DataTable, { Header } from '../wallet/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ApiResponse, Pagination } from '@/app/(dashboard)/(routes)/dashboard/help/[tab]/page';
import Shimmer from '../../SimmerEffect/SimmerEffect';


// Interface for CardData to match the UI needs
interface CardData {
    id: number;
    sender_name: string;
    sender_phone: string;
    sender_user_id: string;
    amount: number;
    commitment_date: string;
    confirm_date: string | null;
    status: string;
}



interface SponsorData {
    id:number;
    name: string;
    doner_id: string;
    doner_phone: string;
    amount: number;
    package_name: string;
    status: string;
    confirm_date: string;
    commitment_date: string;
}


const sponsorHeader: Header<SponsorData>[] = [

    { key: 'id', label: 'Sr. No.' },

    { key: 'doner_id', label: 'Donor ID' },
    { key: 'name', label: 'Name' },
    { key: 'doner_phone', label: 'Donor Phone' },
    { key: 'package_name', label: 'Package Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'confirm_date', label: 'Confirm Date' },
    { key: 'commitment_date', label: 'Commitment Date' },
    { key: 'status', label: 'Status' },

]



// Headers for DataTable
const headersHelp: Header<CardData>[] = [
    { key: 'id', label: 'Sr. No.' },
    { key: 'sender_name', label: 'Sender Name' },
    { key: 'sender_phone', label: 'Sender Phone' },
    { key: 'sender_user_id', label: 'Sender ID' },
    { key: 'amount', label: 'Commitment Amount' },
    { key: 'commitment_date', label: 'Commitment Date' },
    { key: 'confirm_date', label: 'Confirm Date' },
    { key: 'status', label: 'Commitment Status' },
];

// Function to fetch data from API
const fetchData = async (user_id: string, status: string, page: number): Promise<{ data: CardData[]; pagination: Pagination }> => {
    const res = await fetch(`https://api.helpcircle.in/api/customer/taking-help?page=${page}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, status, page }),
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    const data: ApiResponse = await res.json();

    if (data.success) {
        const cardData: CardData[] = data.data.map((item: CardData, index: number) => ({
            id: index + 1 + (page - 1) * 10, // Adjust sno based on current page
            sender_name: item.sender_name,
            sender_phone: item.sender_phone,
            sender_user_id: item.sender_user_id,
            amount: item.amount,
            commitment_date: item.commitment_date,
            confirm_date: item.confirm_date || 'N/A',
            status: item.status,
        }));

        return { data: cardData, pagination: data.pagination };
    } else {
        console.error(data.message || 'Failed to fetch data');
        return { data: [], pagination: { current_page: 0, last_page: 0, per_page: 0, total: 0 } };
    }
};


const fetchSponsorData = async (user_id: string, status: string, page: number): Promise<{ data: SponsorData[]; pagination: Pagination }> => {
    const res = await fetch(`https://api.helpcircle.in/api/customer/sponser-help?page=${page}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, status, page }),
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    const data: ApiResponse = await res.json();






    if (data.success) {
        const cardData: SponsorData[] = data.data.map((item: SponsorData, index: number) => ({
            id: index + 1 + (page - 1) * 10, // Adjust Sr. No based on the current page
            name: item.name,  // Fallback to 'N/A' if any field is undefined

            doner_id: item.doner_id,
            doner_phone: item.doner_phone,
            amount: item.amount,
            package_name: item.package_name,
            status: item.status,
            confirm_date: item.confirm_date,
            commitment_date: item.commitment_date
          }));
          
        return { data: cardData, pagination: data.pagination };
    } else {
        console.error(data.message || 'Failed to fetch data');
        return { data: [], pagination: { current_page: 0, last_page: 0, per_page: 0, total: 0 } };
    }
};



//

const HelpTab = ({ data, headers, user_id, pagination }: any) => {
    const pathname = usePathname();
    const router = useRouter();
    const param = useSearchParams();

    const status = param.get('status') || '';
    const page = Number(param.get('page')) || 1;

    const tabname = pathname.split('/').pop()?.toLowerCase() || 'giving';

    const [activeTab, setActiveTab] = useState<string>(tabname);
    const [takingHelp, setData] = useState<CardData[]>([]);
    const [sponsorHelp, setSponsorHelp] = useState<SponsorData[]>([]);

    const [pagination1, setPagination1] = useState<Pagination>({ current_page: 0, last_page: 0, per_page: 0, total: 0 });

    const [paginationSponsor, setPaginationSponsor] = useState<Pagination>({ current_page: 0, last_page: 0, per_page: 0, total: 0 });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setActiveTab(tabname);
    }, [tabname]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const fetchedData = await fetchData(user_id, status, page);
                setData(fetchedData.data);
                setPagination1(fetchedData.pagination);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDataAsync();
    }, [user_id, status, page]);




    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const fetchedData = await fetchSponsorData(user_id, status, page);
                setSponsorHelp(fetchedData.data);
                setPaginationSponsor(fetchedData.pagination);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDataAsync();
    }, [user_id, status, page]);


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        router.push(`/dashboard/help/${tab}`);
    };

    const renderContent = () => {
        if (loading) {
            return <>
            <Shimmer/>
            </>; // Loading state
        }

        if (error) {
            return <div className="text-red-500 text-center">{error}</div>; // Error state
        }



        switch (activeTab) {
            case 'giving':

                return (
                    <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
                        <div className="space-y-4 p-4 text-[11px] lg:hidden">
                            <AccordionCard pagination={pagination} data={data} headers={headers} />
                        </div>
                        <div className='hidden lg:block'>
                            <DataTable pagination={pagination} data={data} headers={headers} />
                        </div>
                    </div>
                );


            case 'sponsor':
                return (
                    <>

                        {/* 
                        <FilterDateHelpHistory /> */}


                        <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
                            <div className="space-y-4 p-4 text-[11px] lg:hidden">
                                <AccordionCard pagination={paginationSponsor} data={sponsorHelp} headers={sponsorHeader} />
                            </div>
                            <div className='hidden lg:block'>
                                <DataTable pagination={paginationSponsor} data={sponsorHelp} headers={sponsorHeader} />
                            </div>
                        </div>
                    </>
                );

            case 'receiving':

                return (<>

                    <div className='bg-white mt-2 py-4 rounded-xl mx-1 capitalize'>
                        <div className="space-y-4 p-4 text-[11px] lg:hidden">
                            <AccordionCard pagination={pagination1} data={takingHelp} headers={headersHelp} />
                        </div>
                        <div className='hidden lg:block'>
                            <DataTable pagination={pagination1} data={takingHelp} headers={headersHelp} />
                        </div>
                    </div>

                </>)







            default:
                return null;
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between bg-white py-4 rounded-xl mx-1 '>
                {['giving', 'receiving', 'sponsor'].map(tab => (
                    <div
                        key={tab}
                        className={`flex items-center justify-center gap-x-2 p-1 ${activeTab === tab ? 'btn_bg text-white' : 'bg-gray-200'} rounded-3xl mx-auto px-3 cursor-pointer`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Help
                    </div>
                ))}
            </div>

            {/* Render the content based on the active tab */}
            <div className="mt-2 ">
                {renderContent()}
            </div>
        </div>
    );
};

export default HelpTab;
