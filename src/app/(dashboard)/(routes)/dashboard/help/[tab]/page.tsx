

// import HelpTab from '@/app/components/dashboard/TabComponent/HelpTab';
// import { getUserId } from '@/app/utils/getUserId';

// // Define the TransactionData interface based on the new API response structure
// interface TransactionData {
//   sno: number;
//   name: string;
//   amount: number;
//   receiver_id: string;
//   status: string;
//   receiver_phone: string;
//   commitment_date: string;
//   confirm_date: string | null;
// }

// export interface Pagination {
//   current_page: number;  // Current page number
//   last_page: number;     // Last page number
//   per_page: number;      // Number of items per page
//   total: number;         // Total number of items
// }




// // Define the API response interface
// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: TransactionData[];
//   pagination: Pagination[]; // Use the Pagination interface

// }

// // Define the CardData interface for HelpTab
// interface CardData {
//   sno: number;
//   ReceiverDetail: string;
//   Amount: number;
//   commitmentDate: string;
//   ConfirmDate: string | null;
//   Status: string;
// }

// // Define headers for the HelpTab
// const headers = [
//   { key: 'sno', label: 'Sr.No.' },
//   { key: 'ReceiverDetail', label: 'Receiver' },
//   { key: 'Amount', label: 'Amount' },
//   { key: 'commitmentDate', label: 'Commitment Date' },
//   { key: 'ConfirmDate', label: 'Confirm Date' },
//   { key: 'Status', label: 'Status' },
// ];
// interface SearchParams {
//   status?: string;
//   page?: number;
// }
// // Fetch data directly within the component
// const fetchData = async (searchParams:SearchParams): Promise<{ data: CardData[]; pagination: Pagination }> => {
//   const user_id = getUserId();




//  const  status=   searchParams.status;

//  const page = searchParams.page || 1



//  const res = await fetch(`https://api.helpcircle.in/api/customer/help-history?page=${page}`, {
//   method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ user_id,status }),
//     next: { revalidate: 3600 }, // Revalidate every hour
//   });

//   if (!res.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data: ApiResponse = await res.json();
  


//   console.log("dsdsadfsf ...............",data.pagination)

//   if (data.success) {
//     // Map data to match CardData interface
//     return data.data.map((item: TransactionData, index: number) => ({
//       sno: index + 1,
//       ReceiverDetail: `${item.receiver_id} - ${item.name} - ${item.receiver_phone}`, // Format receiver detail
//       Amount: item?.amount, // Use member_name as memberName
//       commitmentDate: item?.commitment_date, // Assuming this is the commitment date
//       ConfirmDate: item?.confirm_date, // Assuming this is the commitment date
//       Status: item?.status,
//     }));
//   } else {
//     console.error(data.message || 'Failed to fetch data');
//     return [];
//   }
// };

// const Page = async ({searchParams}:any) => {
//   const user_id = getUserId();
//   const data = await fetchData(searchParams);
//   return (
//     <div>
//       <HelpTab  data={data} headers={headers} user_id={user_id} />
//       <div className='h-16'></div>
//     </div>
//   );
// };

// export default Page;



// import HelpTab from '@/app/components/dashboard/TabComponent/HelpTab';
// import { getUserId } from '@/app/utils/getUserId';

// // Define the TransactionData interface based on the new API response structure
// interface TransactionData {
//   sno: number;
//   name: string;
//   amount: number;
//   receiver_id: string;
//   status: string;
//   receiver_phone: string;
//   commitment_date: string;
//   confirm_date: string | null;
// }

// // Define the Pagination interface
// export interface Pagination {
//   current_page: number;  // Current page number
//   last_page: number;     // Last page number
//   per_page: number;      // Number of items per page
//   total: number;         // Total number of items
// }

// // Define the API response interface
// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: TransactionData[];
//   pagination: Pagination; // Use a single Pagination object
// }

// // Define the CardData interface for HelpTab
// interface CardData {
//   sno: number;
//   ReceiverDetail: string;
//   Amount: number;
//   commitmentDate: string;
//   ConfirmDate: string | null;
//   Status: string;
// }

// // Define headers for the HelpTab
// const headers = [
//   { key: 'sno', label: 'Sr.No.' },
//   { key: 'ReceiverDetail', label: 'Receiver' },
//   { key: 'Amount', label: 'Amount' },
//   { key: 'commitmentDate', label: 'Commitment Date' },
//   { key: 'ConfirmDate', label: 'Confirm Date' },
//   { key: 'Status', label: 'Status' },
// ];

// // Define search parameters interface
// interface SearchParams {
//   status?: string;
//   page?: number;
// }


// export interface Pagination {
//   current_page: number;
//   last_page: number;
//   per_page: number;
//   total: number;
// }

// // Fetch data directly within the component
// const fetchData = async (searchParams: SearchParams): Promise<{ data: CardData[]; pagination: Pagination }> => {
//   const user_id = getUserId();
//   const status = searchParams.status;
//   const page = searchParams.page || 1;

//   const res = await fetch(`https://api.helpcircle.in/api/customer/help-history?page=${page}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ user_id, status }),
//     next: { revalidate: 3600 }, // Revalidate every hour
//   });

//   if (!res.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data: ApiResponse = await res.json();


//   if (data.success) {
//     // Map data to match CardData interface
//     const cardData: CardData[] = data.data.map((item: TransactionData, index: number) => ({
//       sno: index + 1,
//       ReceiverDetail: `${item.receiver_id} - ${item.name} - ${item.receiver_phone}`, // Format receiver detail
//       Amount: item.amount || 0, // Use a default value if amount is undefined
//       commitmentDate: item.commitment_date, // Assuming this is the commitment date
//       ConfirmDate: item.confirm_date, // Assuming this is the confirm date
//       Status: item.status,
//     }));

//     return { data: cardData, pagination: data.pagination }; // Return both data and pagination
//   } else {
//     console.error(data.message || 'Failed to fetch data');
//     return { data: [], pagination: { current_page: 0, last_page: 0, per_page: 0, total: 0 } }; // Return default pagination
//   }
// };

// const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
//   const user_id = getUserId();
//   const { data, pagination } = await fetchData(searchParams); // Destructure data and pagination


//   console.log("open datt .......",pagination,data)

//   return (
//     <div>
//       <HelpTab data={data} headers={headers} user_id={user_id} pagination={pagination} /> {/* Pass pagination as a prop */}
//       <div className='h-16'></div>
//     </div>
//   );
// };

// export default Page;



import HelpTab from '@/app/components/dashboard/TabComponent/HelpTab';
import { getUserId } from '@/app/utils/getUserId';

// Define interfaces
interface TransactionData {
  sno: number;
  name: string;
  amount: number;
  receiver_id: string;
  status: string;
  receiver_phone: string;
  commitment_date: string;
  confirm_date: string | null;
}

export interface Pagination {
  current_page: number;  
  last_page: number;     
  per_page: number;      
  total: number;         
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data:any;
  pagination: Pagination; 
}

interface CardData {
  sno: number;
  ReceiverDetail: string;
  Amount: number;
  commitmentDate: string;
  ConfirmDate: string | null;
  Status: string;
}

const headers = [
  { key: 'sno', label: 'Sr.No.' },
  { key: 'ReceiverDetail', label: 'Receiver' },
  { key: 'Amount', label: 'Amount' },
  { key: 'commitmentDate', label: 'Commitment Date' },
  { key: 'ConfirmDate', label: 'Confirm Date' },
  { key: 'Status', label: 'Status' },
];

// Fetch data based on the search parameters
const fetchData = async (searchParams: { status?: string; page?: number }): Promise<{ data: CardData[]; pagination: Pagination }> => {
  const user_id = getUserId();
  const status = searchParams.status;
  const page = searchParams.page || 1;

  const res = await fetch(`https://api.helpcircle.in/api/customer/help-history?page=${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, status }),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ApiResponse = await res.json();

  if (data.success) {
    const cardData: CardData[] = data.data.map((item: TransactionData, index: number) => ({
      sno: index + 1 + (page - 1) * 10, // Adjust sno based on current page
      ReceiverDetail: `${item.receiver_id} - ${item.name} - ${item.receiver_phone}`,
      Amount: item.amount || 0,
      commitmentDate: item.commitment_date,
      ConfirmDate: item.confirm_date,
      Status: item.status,
    }));

    return { data: cardData, pagination: data.pagination };
  } else {
    console.error(data.message || 'Failed to fetch data');
    return { data: [], pagination: { current_page: 0, last_page: 0, per_page: 0, total: 0 } };
  }
};

// Page Component
const Page = async ({ searchParams }: { searchParams: { status?: string; page?: string } }) => {
  const pageNumber = parseInt(searchParams.page || '1', 10); // Convert page from string to number
  const { data, pagination } = await fetchData({ status: searchParams.status, page: pageNumber });


  return (
    <div>
      <HelpTab 
        data={data} 
        headers={headers} 
        user_id={getUserId()} 
        pagination={pagination} 
      />
      <div className='h-16'></div>
    </div>
  );
};

export default Page;
