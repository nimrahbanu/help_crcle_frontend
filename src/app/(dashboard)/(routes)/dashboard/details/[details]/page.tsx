// import TabComponent from '@/app/components/dashboard/TabComponent/TabComponent';
// import { Header } from '@/app/components/dashboard/wallet/DataTable';
// import React from 'react';
// import { getUserId } from '@/app/utils/getUserId';

// interface DirectData {
//   sno: number;
//   user_id: string;
//   name: string;
//   phone: string;
//   created_at: string;
//   activated_date: string;
//   sponsor_id: string;
//   status: string;
// }

// interface Downline {
//   sno: number;
//   memberId: string;
//   memberName: string;
//   phone: string;
//   doj: string;
//   doa: string;
//   sponsorId: string;
//   memberStatus: string;
// }

// interface Props {
//   searchParams: any;
// }

// // Fetch Direct Data
// const fetchDirectData = async (
//   user_id: string, 
//   fromDate?: string, 
//   toDate?: string, 
//   status?: string,
//   page?:number,
// ): Promise<DirectData[] | null> => {
//   const body = { user_id, fromDate, toDate, status };
//   const res = await fetch(`https://api.helpcircle.in/api/customer/view-direct?page=${page}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) throw new Error('Failed to fetch direct data');
//   const data = await res.json();
//   return data.success ? data.data : null;
// };

// // Fetch Downline Data
// const fetchDownline = async (
//   user_id: string, 
//   fromDate?: string, 
//   toDate?: string, 
//   status?: string,
//   page?:number,
// ): Promise<Downline[] | null> => {
//   const body = { user_id, fromDate, toDate, status };
//   const res = await fetch(`https://api.helpcircle.in/api/customer/view-downline?page=${page}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body),
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) throw new Error('Failed to fetch downline data');
//   const data = await res.json();
//   return data.success ? data.data : null;
// };

// // Server Component
// const Page = async ({ searchParams }: Props) => {
//   const user_id = getUserId();

//   const page =  searchParams.page || 1 

//   // Fetch both Direct Data and Downline Data concurrently
//   const [directData,downline] = await Promise.all([
//     fetchDirectData(user_id, searchParams.fromDate, searchParams.toDate, searchParams.status,page),
//     fetchDownline(user_id, searchParams.fromDate, searchParams.toDate, searchParams.status,page),
//   ]);

//   if (!directData && !downline) return <p className='mt-48'>No data available</p>;

//   // Header configuration for Direct Data and Downline
//   const helpCardDataHeaders: Header<DirectData>[] = [
//     { key: 'sno', label: 'SNo' },
//     { key: 'user_id', label: 'MemberID' },
//     { key: 'name', label: 'MemberName' },
//     { key: 'phone', label: 'Mobile' },
//     { key: 'created_at', label: 'DOJ' },
//     { key: 'activated_date', label: 'DOA' },
//     { key: 'sponsor_id', label: 'SponsorID' },
//     { key: 'status', label: 'MemberStatus' },
//   ];

//   const downlineHeaders: Header<Downline>[] = [
//     { key: 'sno', label: 'SNo' },
//     { key: 'memberId', label: 'MemberID' },
//     { key: 'memberName', label: 'MemberName' },
//     { key: 'phone', label: 'Mobile' },
//     { key: 'doj', label: 'DOJ' },
//     { key: 'doa', label: 'DOA' },
//     { key: 'sponsorId', label: 'SponsorID' },
//     { key: 'memberStatus', label: 'MemberStatus' }
//   ];

//   // Map Direct Data
//   const helpCardData: DirectData[] = directData?.map((item: DirectData, index: number) => ({
//     sno: index + 1,
//     user_id: item.user_id,
//     name: item.name,
//     phone: item.phone,
//     created_at: item.created_at,
//     activated_date: item.activated_date,
//     sponsor_id: item.sponsor_id,
//     status: item.status, 
//   })) || [];

//   // Map Downline Data
//   const downlineData: Downline[] = downline?.map((item: any, index: number) => ({
//     sno: index + 1,
//     memberId: item.user_id,
//     memberName: item.name,
//     phone: item.phone,
//     doj: item.created_at,
//     doa: item.activated_date,
//     sponsorId: item.sponsor_id,
//     memberStatus: item.status,
//   })) || [];

//   return (
//     <div className=''>
//       <TabComponent 
//         data={helpCardData} 
//         headers={helpCardDataHeaders} 
//         downlineData={downlineData} 
//         downlineHeaders={downlineHeaders} 
//       />

//       <div className='h-16'></div>
//     </div>
//   );
// };

// export default Page;



import TabComponent from '@/app/components/dashboard/TabComponent/TabComponent';
import { Header } from '@/app/components/dashboard/wallet/DataTable';
import React from 'react';
import { getUserId } from '@/app/utils/getUserId';

interface DirectData {
  sno: number;
  user_id: string;
  name: string;
  phone: string;
  created_at: string;
  activated_date: string;
  sponsor_id: string;
  status: string;
}

interface Downline {
  sno: number;
  memberId: string;
  memberName: string;
  phone: string;
  doj: string;
  doa: string;
  sponsorId: string;
  memberStatus: string;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Props {
  searchParams: any;
}

// Fetch Direct Data
const fetchDirectData = async (
  user_id: string, 
  fromDate?: string, 
  toDate?: string, 
  status?: string,
  page?: number
): Promise<{ data: DirectData[] | null; pagination: Pagination }> => {
  const body = { user_id, fromDate, toDate, status };
  const res = await fetch(`https://api.helpcircle.in/api/customer/view-direct?page=${page}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch direct data');
  const data = await res.json();

  const pagination: Pagination = {
    current_page: data.current_page,
    last_page: data.last_page,
    per_page: data.per_page,
    total: data.total,
  };

  return { data: data.success ? data.data : null, pagination };
};

// Fetch Downline Data
const fetchDownline = async (
  user_id: string, 
  fromDate?: string, 
  toDate?: string, 
  status?: string,
  page?: number
): Promise<{ data: Downline[] | null; pagination: Pagination }> => {
  const body = { user_id, fromDate, toDate, status };
  const res = await fetch(`https://api.helpcircle.in/api/customer/view-downline?page=${page}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch downline data');
  const data = await res.json();

  const pagination: Pagination = {
    current_page: data.current_page,
    last_page: data.last_page,
    per_page: data.per_page,
    total: data.total,
  };

  return { data: data.success ? data.data : null, pagination };
};

// Server Component
const Page = async ({ searchParams }: Props) => {
  const user_id = getUserId();

  const page = searchParams.page || 1;

  // Fetch both Direct Data and Downline Data concurrently
  const [directResult, downlineResult] = await Promise.all([
    fetchDirectData(user_id, searchParams.fromDate, searchParams.toDate, searchParams.status, page),
    fetchDownline(user_id, searchParams.fromDate, searchParams.toDate, searchParams.status, page),
  ]);

  const { data: directData, pagination: directPagination } = directResult;
  const { data: downlineData, pagination: downlinePagination } = downlineResult;

  if (!directData && !downlineData) return <p className="mt-48">No data available</p>;

  // Header configuration for Direct Data and Downline
  const helpCardDataHeaders: Header<DirectData>[] = [
    { key: 'sno', label: 'SNo' },
    { key: 'user_id', label: 'MemberID' },
    { key: 'name', label: 'MemberName' },
    { key: 'phone', label: 'Mobile' },
    { key: 'created_at', label: 'DOJ' },
    { key: 'activated_date', label: 'DOA' },
    { key: 'sponsor_id', label: 'SponsorID' },
    { key: 'status', label: 'MemberStatus' },
  ];

  const downlineHeaders: Header<Downline>[] = [
    { key: 'sno', label: 'SNo' },
    { key: 'memberId', label: 'MemberID' },
    { key: 'memberName', label: 'MemberName' },
    { key: 'phone', label: 'Mobile' },
    { key: 'doj', label: 'DOJ' },
    { key: 'doa', label: 'DOA' },
    { key: 'sponsorId', label: 'SponsorID' },
    { key: 'memberStatus', label: 'MemberStatus' },
  ];

  // Map Direct Data
  const helpCardData: DirectData[] =
    directData?.map((item: DirectData, index: number) => ({
      sno: index + 1,
      user_id: item.user_id,
      name: item.name,
      phone: item.phone,
      created_at: item.created_at,
      activated_date: item.activated_date,
      sponsor_id: item.sponsor_id,
      status: item.status,
    })) || [];

  // Map Downline Data
  const downlineMappedData: Downline[] =
    downlineData?.map((item: any, index: number) => ({
      sno: index + 1,
      memberId: item.user_id,
      memberName: item.name,
      phone: item.phone,
      doj: item.created_at,
      doa: item.activated_date,
      sponsorId: item.sponsor_id,
      memberStatus: item.status,
    })) || [];

  return (
    <div className="">
      <TabComponent
        data={helpCardData}
        headers={helpCardDataHeaders}
        downlineData={downlineMappedData}
        downlineHeaders={downlineHeaders}
        pagination={downlinePagination} // Pass downline pagination
        directPagination={directPagination} // Pass direct pagination
      />
      <div className="h-16"></div>
    </div>
  );
};

export default Page;
