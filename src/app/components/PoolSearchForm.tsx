import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod Schema for validation
const schema = z.object({
  fromDate: z.string().nonempty('From Date is required'),
  toDate: z.string().nonempty('To Date is required'),
  donerId: z.string().nonempty('Doner ID is required').min(1, 'Doner ID must be at least 1 character long'),
  poolId: z.enum(['0', '1', '2', '3', '4', '5', '6', '7']).refine((val) => val !== '0', {
    message: 'Please select a valid Pool ID',
  }),
});

type FormData = z.infer<typeof schema>;

const PoolSearchForm = () => {
  // Use React Hook Form with Zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* From Date */}
        <div className="flex flex-col">
          <label htmlFor="fromDate">From Date</label>
          <input
            type="date"
            id="fromDate"
            className="bg-gray-200 rounded-lg p-2"
            {...register('fromDate')}
          />
          {errors.fromDate && <span className="text-red-500">{errors.fromDate.message}</span>}
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label htmlFor="toDate">To Date</label>
          <input
            type="date"
            id="toDate"
            className="bg-gray-200 rounded-lg p-2"
            {...register('toDate')}
          />
          {errors.toDate && <span className="text-red-500">{errors.toDate.message}</span>}
        </div>

        {/* Doner ID */}
        <div className="flex flex-col">
          <label htmlFor="donerId">Doner ID</label>
          <input
            type="text"
            id="donerId"
            placeholder="Enter Doner ID"
            className="bg-gray-200 rounded-lg p-2"
            {...register('donerId')}
          />
          {errors.donerId && <span className="text-red-500">{errors.donerId.message}</span>}
        </div>

        {/* Pool ID Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="poolId">Pool ID</label>
          <select
            id="poolId"
            className="bg-gray-200 rounded-lg p-2"
            {...register('poolId')}
          >
            <option value="0">--Select--</option>
            <option value="1">Star</option>
            <option value="2">Silver</option>
            <option value="3">Gold</option>
            <option value="4">Platinum</option>
            <option value="5">Ruby</option>
            <option value="6">Emerald</option>
            <option value="7">Diamond</option>
          </select>
          {errors.poolId && <span className="text-red-500">{errors.poolId.message}</span>}
        </div>

        {/* Search Button */}
        <div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-lg"
          >
           Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default PoolSearchForm;
