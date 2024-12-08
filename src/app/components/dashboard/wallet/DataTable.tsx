'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../../Pagination';



export interface Header<T> {
  key: keyof T;
  label: string;
}



interface DataTableProps<T> {
  data: T[];
  headers: Header<T>[];

  pagination: any
}
const DataTable = <T extends object>({ data, headers, pagination }: DataTableProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const status = searchParams.get('status') || '';





  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = pagination?.last_page;

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // Build the query string based on whether 'status' is present
      let queryString = `?page=${page}`;
      if (status) {
        queryString += `&status=${status}`;
      }

      // Navigate with the constructed query string
      router.push(queryString);
    }
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  return (

    
    <div className="overflow-x-auto mx-4 text-[12px] text-black capitalize">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)} className="text-left py-3 px-4 border border-gray-300">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className={`border border-gray-300 ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
              {headers.map((header) => (
                <td key={String(header.key)} className="py-3 px-4 border border-gray-300">
                  {(item as any)[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {/* <div className="flex justify-center space-x-4 items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-300 text-gray-800 rounded-3xl disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded-xl font-bold ${currentPage === page ? 'bg-black text-white' : 'bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-1 bg-gray-300 text-gray-800 rounded-3xl disabled:opacity-50"
        >
          Next
        </button>
      </div> */}

      {

        data && <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      }

    </div>
  );
};

export default DataTable;
