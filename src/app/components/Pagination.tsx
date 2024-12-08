// import React from 'react';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   handlePageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
//   const maxVisiblePages = 5;

//   const getPageRange = () => {
//     const pageRange: number[] = [];

//     if (totalPages <= maxVisiblePages) {
//       return Array.from({ length: totalPages }, (_, index) => index + 1);
//     }

//     let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
//     let end = start + maxVisiblePages - 1;

//     if (end > totalPages) {
//       end = totalPages;
//       start = Math.max(end - maxVisiblePages + 1, 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pageRange.push(i);
//     }

//     if (!pageRange.includes(currentPage)) {
//       pageRange.push(currentPage);
//     }

//     return [...new Set(pageRange) as any].sort((a, b) => a - b);
//   };

//   const pageRange = getPageRange();

//   return (
//     <div className="flex justify-center space-x-2 items-center mt-4 flex-wrap">
//       <button
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full disabled:opacity-50 transition duration-300 ease-in-out hover:bg-gray-400"
//       >
//         Previous
//       </button>
//       <div className="flex gap-1 items-center">
//         {pageRange.map(page => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-1 border rounded-md font-bold transition duration-300 ease-in-out ${
//               currentPage === page ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>
//       <button
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full disabled:opacity-50 transition duration-300 ease-in-out hover:bg-gray-400"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;



import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const getPageRange = () => {
    const pageRange: number[] = [];
    const maxVisiblePages = Math.min(totalPages, 5); // Adjust the maximum visible pages based on total pages

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pageRange.push(i);
    }

    return [...new Set(pageRange) as any].sort((a, b) => a - b);
  };

  const pageRange = getPageRange();



  // Logging the current pagination state
  console.log('Current Page:', currentPage);
  console.log('Total Pages:', totalPages);
  console.log('Page Range:', pageRange);


  return (
    <div className="flex justify-center space-x-2 items-center mt-4 flex-wrap">
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
            className={`px-3 py-1 border rounded-md font-bold transition duration-300 ease-in-out ${
              currentPage === page ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
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
    </div>
  );
};

export default Pagination;
