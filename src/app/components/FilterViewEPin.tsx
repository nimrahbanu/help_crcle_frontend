// import { Calendar } from "lucide-react";

// const FilterViewEPin = () => {
//   return (
//     <div className="bg-white mt-2 py-4 rounded-xl mx-1">
//       {/* From Date Field */}
//       <div className="flex items-center divide-x justify-between mx-6">
//         <div className="flex gap-x-4 items-center">
//           <Calendar />
//           <label htmlFor="fromDate">From Date:</label>
//           <input
//             type="date"
//             id="fromDate"
//             className="bg-gray-200 rounded-xl p-2 pl-4"
//           />
//         </div>
//       </div>

//       {/* To Date Field */}
//       <div className="flex items-center divide-x justify-between mx-6 mt-4">
//         <div className="flex gap-x-4 items-center">
//           <Calendar />
//           <label htmlFor="toDate">To Date:</label>
//           <input
//             type="date"
//             id="toDate"
//             className="bg-gray-200 rounded-xl p-2 pl-4"
//           />
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border border-gray-200 mx-4 mt-2" />

//       {/* Status Selection and Filter Button */}
//       <div className="flex items-center justify-between mx-8 mt-4 gap-x-4">
//         <div className="flex gap-x-4 w-full">
//           <select className="bg-gray-200 rounded-xl p-2 w-full pl-4" defaultValue="">
//             <option value="" disabled>Select status</option>
//             <option value="0">Available</option>
//             <option value="1">Used</option>
//           </select>
//         </div>

//         <div className="flex gap-x-4 bg-black text-white p-1 rounded-lg px-4 cursor-pointer">
//           Filter
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterViewEPin;



'use client'

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { Calendar } from "lucide-react";

const FilterViewEPin = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const path = usePathname();

  // Handler for applying filters
  const handleFilter = () => {
    if (new Date(toDate) < new Date(fromDate)) {
      alert("To Date cannot be earlier than From Date.");
      return;
    }

    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (status) params.append("status", status);

    // Push new URL with filters to the router
    router.push(`${path}?${params.toString()}`);
  };

  // Handler for resetting the form
  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
    router.push(path); // Reset URL
  };

  return (
    <div className="bg-white mt-2 py-4 rounded-xl mx-1">
      {/* From Date Field */}
      <div className="flex items-center divide-x justify-between mx-6">
        <div className="flex gap-x-4 items-center">
          <Calendar />
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            className="bg-gray-200 rounded-xl p-2 pl-4"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
      </div>

      {/* To Date Field */}
      <div className="flex items-center divide-x justify-between mx-6 mt-4">
        <div className="flex gap-x-4 items-center">
          <Calendar />
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            className="bg-gray-200 rounded-xl p-2 pl-4"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border border-gray-200 mx-4 mt-2" />

      {/* Status Selection and Filter Button */}
      <div className="flex items-center justify-between mx-8 mt-4 gap-x-4">
        <div className="flex gap-x-4 w-full">
          <select
            className="bg-gray-200 rounded-xl p-2 w-full pl-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>Select status</option>
            <option value="0">Available</option>
            <option value="1">Used</option>
          </select>
        </div>

        {/* Filter Button */}
        <div
          onClick={handleFilter}
          className="flex gap-x-4 bg-black text-white p-1 rounded-lg px-4 cursor-pointer"
        >
          Filter
        </div>

        {/* Reset Button */}
        <div
          onClick={handleReset}
          className="flex gap-x-4 bg-gray-300 text-black p-1 rounded-lg px-4 cursor-pointer"
        >
          Reset
        </div>
      </div>
    </div>
  );
};

export default FilterViewEPin;
