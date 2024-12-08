'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Compass, PanelBottomClose } from 'lucide-react';
import DataTable, { Header } from '../dashboard/wallet/DataTable';
import { ApiResponse, Pagination } from '@/app/(dashboard)/(routes)/dashboard/help/[tab]/page';
import AccordionCard from '../dashboard/wallet/AccordionCard';
import ShimmerEffect from '../SimmerEffect/SimmerEffect';



// Interface for CardData to match the UI needs
interface GivingHelpLevel {
  id: number;
  level: string;
  name: string;
  phone: string;
  phone_pay_no: string;
  user_id: string;
  status: string; // You might want to consider using a more specific type like '0' | '1' or 'active' | 'inactive'
  commitment_date: string | null; // Can be a string or null
  confirm_date: string | null;    // Can be a string or null
  amount: number;
}




// Headers for DataTable
const headersGivingLevel: Header<GivingHelpLevel>[] = [
  { key: 'id', label: 'Sr. No.' },
  { key: 'user_id', label: 'User ID' },
  { key: 'name', label: 'Name' },
  { key: 'level', label: 'Level' },

  { key: 'phone', label: 'Phone' },
  { key: 'phone_pay_no', label: 'Payment Phone No' },

  { key: 'commitment_date', label: 'Commitment Date' },
  { key: 'confirm_date', label: 'Confirm Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];



interface ReceivingHelpLevelData {
    id: number; // Sr. No.
              
    level: string;            // e.g., "First Level"
    name: string;             // e.g., "israr4"
    phone: string;            // e.g., "7793814798"
    user_id: string;          // e.g., "PHC315968"
    status: string;           // e.g., "Pending"
    commitment_date: string;  // e.g., "17 Sep, 2024 01:28 PM"
    confirm_date: string;     // e.g., "N/A"
    amount: number | string;   // e.g., 100 or "N/A"
}


const receivingHeader: Header<ReceivingHelpLevelData>[] = [

  { key: 'id', label: 'Sr. No.' },
  { key: 'level', label: 'Level' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'user_id', label: 'User ID' },
  { key: 'status', label: 'Status' },
  { key: 'commitment_date', label: 'Commitment Date' },
  { key: 'confirm_date', label: 'Confirm Date' },
  { key: 'amount', label: 'Amount' },



]




// Function to fetch data from API
const fetchData = async (user_id: string, status: string, page: number): Promise<{ data: GivingHelpLevel[]; pagination: Pagination }> => {
  const res = await fetch(`https://api.helpcircle.in/api/customer/giving-help-level?page=${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache', // Prevent caching

    },
    cache: 'no-store', // Prevent storing the response
    next: { revalidate: 3600 }, // Revalidate every hour

    body: JSON.stringify({ user_id, status, page }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ApiResponse = await res.json();

  if (data.success) {
    const cardData: GivingHelpLevel[] = data.data.map((item: GivingHelpLevel, index: number) => ({
      id: index + 1 + (page - 1) * 10, // Adjust sno based on current page
      level: item.level ?? 'N/A', // Fallback to 'N/A' if undefined
      name: item.name ?? 'N/A', // Fallback to 'N/A' if undefined
      phone: item.phone ?? 'N/A', // Fallback to 'N/A' if undefined
      phone_pay_no: item.phone_pay_no ?? 'N/A', // Fallback to 'N/A' if undefined
      user_id: item.user_id ?? 'N/A', // Fallback to 'N/A' if undefined
      status: item.status ?? 'N/A', // Fallback to 'N/A' if undefined
      commitment_date: item.commitment_date ?? 'N/A', // Fallback to 'N/A' if null
      confirm_date: item.confirm_date ?? 'N/A', // Fallback to 'N/A' if null
      amount: item.amount ?? 'N/A' // Fallback to 'N/A' if undefined
    }));

    return { data: cardData, pagination: data.pagination };
  } else {
    console.error(data.message || 'Failed to fetch data');
    return { data: [], pagination: { current_page: 0, last_page: 0, per_page: 0, total: 0 } };
  }
};



const fetchReceivingHelLevel = async (user_id: string, status: string, page: number): Promise<{ data: ReceivingHelpLevelData[]; pagination: Pagination }> => {
  const res = await fetch(`https://api.helpcircle.in/api/customer/receiving-help-level?page=${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache', // Prevent caching

    },
    cache: 'no-store', // Prevent storing the response
    next: { revalidate: 3600 }, // Revalidate every hour

    body: JSON.stringify({ user_id, status, page }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ApiResponse = await res.json();

  if (data.success) {
    const cardData: ReceivingHelpLevelData[] = data.data.map((item: ReceivingHelpLevelData, index: number) => ({
      id: index + 1 + (page - 1) * 10, // Adjust sno based on current page
      level: item.level ?? 'N/A', // Fallback to 'N/A' if undefined
      name: item.name ?? 'N/A', // Fallback to 'N/A' if undefined
      phone: item.phone ?? 'N/A', // Fallback to 'N/A' if undefined
      user_id: item.user_id ?? 'N/A', // Fallback to 'N/A' if undefined
      status: item.status ?? 'N/A', // Fallback to 'N/A' if undefined
      commitment_date: item.commitment_date ?? 'N/A', // Fallback to 'N/A' if null
      confirm_date: item.confirm_date ?? 'N/A', // Fallback to 'N/A' if null
      amount: item.amount ?? 'N/A' // Fallback to 'N/A' if undefined
    }));

    return { data: cardData, pagination: data.pagination };
  } else {
    console.error(data.message || 'Failed to fetch data');
    return { data: [], pagination: { current_page: 0, last_page: 0, per_page: 0, total: 0 } };
  }
};



const HelpLevelTabs = ({ user_id }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const param = useSearchParams();

  const status = param.get('status') || '';
  const page = Number(param.get('page')) || 1;

  // Extract the tab name from the URL
  const tabname = pathname.split('/').pop()?.toLowerCase();

  // State to track active tab
  const [activeTab, setActiveTab] = useState<string>(tabname || 'tabone');



  const [givingHelpLevel, setData] = useState<GivingHelpLevel[]>([]);
  const [receivingHelpLevel, setReceivingHelpLevel] = useState<ReceivingHelpLevelData[]>([]);

  const [pagination1, setPagination1] = useState<Pagination>({ current_page: 0, last_page: 0, per_page: 0, total: 0 });

  const [paginationReceivingHelLevel, setPaginationReceivingHelLevel] = useState<Pagination>({ current_page: 0, last_page: 0, per_page: 0, total: 0 });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);





  // Update the active tab when URL changes
  useEffect(() => {
    setActiveTab(tabname || 'tabone');
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
        const fetchedData = await fetchReceivingHelLevel(user_id, status, page);
        setReceivingHelpLevel(fetchedData.data);
        setPaginationReceivingHelLevel(fetchedData.pagination);
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
    router.push(`/dashboard/level_income/${tab}`);  // Update the URL
  };


  if(loading){


    return <ShimmerEffect/>
  }

  if (error){

    return <p className='p-2 text-red-600'>Error {error}</p>


}

  // Render the correct content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'tabone':
        return (
          <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
            <div className="space-y-4 p-4 text-[11px] lg:hidden">
           { givingHelpLevel.length > 0 && <AccordionCard pagination={pagination1} data={givingHelpLevel} headers={headersGivingLevel} />}
            </div>
            <div className='hidden lg:block'>
            {givingHelpLevel.length > 0 && <DataTable pagination={pagination1} data={givingHelpLevel} headers={headersGivingLevel} />}
            </div>
          </div>
        );
      case 'tabtwo':



        return (
          <div className='bg-white mt-2 py-4 rounded-xl mx-1'>
            <div className="space-y-4 p-4 text-[11px] lg:hidden">
              <AccordionCard pagination={paginationReceivingHelLevel} data={receivingHelpLevel} headers={receivingHeader} />
            </div>
            <div className='hidden lg:block'>
              <DataTable pagination={paginationReceivingHelLevel} data={receivingHelpLevel} headers={receivingHeader} />
            </div>
          </div>
        );




      default:
        return <div>Select a valid tab from the URL!</div>;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}


      <div className='flex items-center justify-between bg-white py-4 rounded-xl mx-1 '>
        <div
          className={`flex items-center justify-center gap-x-2 px-8 p-1 ${activeTab === 'tabone' ? 'btn_bg text-white' : 'bg-gray-200'
            } rounded-3xl mx-auto px-3 cursor-pointer`}
          onClick={() => handleTabClick('tabone')}
        >
          <Compass size={18} />
          Giving Help Level
        </div>
        <div
          className={`flex items-center justify-center gap-x-2 p-1 px-8 ${activeTab === 'tabtwo' ? 'btn_bg text-white' : 'bg-gray-200'
            } rounded-3xl mx-auto px-3 cursor-pointer`}
          onClick={() => handleTabClick('tabtwo')}
        >
          <PanelBottomClose size={18} />
          Receiving Help Level
        </div>

      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HelpLevelTabs;
