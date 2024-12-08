'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from './DataTable';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../../Pagination';

interface CardProps<T extends object> {  // Add `extends object` here
  data: T[];
  headers: Header<T>[];
  pagination: any;
}

const AccordionCard = <T extends object>({ data, headers, pagination }: CardProps<T>) => {  // Add `extends object` here as well
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };



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



  const maxVisiblePages = 5;

  // Function to get the range of pages to display
  const getPageRange = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const pageRange = getPageRange();


  return (
    <>

      <div>


        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <div className="text-gray-800 font-semibold text-xl">
                {headers[0]?.label}: {item[headers[0]?.key as keyof T] as any}
              </div>

              {/* Conditionally render the status if it exists */}
              {'status' in item && (
                <div
                  className={`font-medium text-lg ${(item as any).status === 'Active' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {(item as any).status}
                </div>
              )}
            </div>

            <div className="text-gray-700">
              {headers.slice(0, 3).map(({ key, label }) => (
                <div
                  key={String(key)}
                  className="flex justify-between py-2 border-b border-gray-300"
                >
                  <span className="font-semibold text-gray-600">{label}:</span>
                  <span className="text-gray-800">{item[key as keyof T] as any}</span>
                </div>
              ))}
              {openIndex === index && (
                <div className="flex flex-col">
                  {headers.slice(3).map(({ key, label }) => (
                    <div key={String(key)} className="flex justify-between py-2 border-b border-gray-300">
                      <span className="font-semibold text-gray-600">{label}:</span>
                      <span className="text-gray-800">{item[key as keyof T] as any}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleToggle(index)}
              className="flex items-center mt-4 text-blue-600 hover:text-blue-800 bg-blue-100 p-2 rounded-lg transition-colors duration-300"
            >
              {openIndex === index ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
              {openIndex === index ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ))}
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


{/* <div className="flex justify-center space-x-2 items-center mt-4 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full disabled:opacity-50 transition duration-300 ease-in-out hover:bg-gray-400"
      >
        Previous
      </button>
      <div className="flex gap-1 items-center">
        {pageRange.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md font-bold transition duration-300 ease-in-out ${currentPage === page ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full disabled:opacity-50 transition duration-300 ease-in-out hover:bg-gray-400"
      >
        Next
      </button>
    </div> */}


    {


data &&  <Pagination
currentPage={currentPage}
totalPages={totalPages}
handlePageChange={handlePageChange}
/>

    }


      </div>
      
    </>
  );
};

export default AccordionCard;



