import { Calendar } from "lucide-react";

const FilterDateHelpHistory = () => {
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
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border border-gray-200 mx-4 mt-2" />

      {/* Status Selection and Filter Button */}
      <div className="flex items-center justify-between mx-8 mt-4 gap-x-4">
      

        <div className="flex gap-x-4 bg-black text-white p-1 rounded-lg px-4 cursor-pointer">
          Filter
        </div>
      </div>
    </div>
  );
};

export default FilterDateHelpHistory;
